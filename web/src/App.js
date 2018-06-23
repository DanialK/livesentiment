import React from "react";
import * as tf from "@tensorflow/tfjs";
import debounce from "lodash/debounce";
import styles from "./style.scss";
import { MAX_SEQUENCE_LENGTH, getVector, pallet, changeBackground } from "./utils";

export default class App extends React.Component {
    state = {
        probability: undefined,
        sentiment: undefined,
    };

    componentWillMount() {
        this.changeBgColor(pallet.initial);
    }

    changeBgColor(colors) {

        if (this.interval) {
            clearInterval(this.interval);
        }

        changeBackground(colors);

        this.interval = setInterval(() => changeBackground(colors), (colors.length + 5) * 1000);
    }

    predict = debounce(async (text) => {
        if (!text) {
            this.changeBgColor(pallet.initial);
            return this.setState({sentiment: undefined, probability: undefined});
        }

        const vector = getVector(text, this.props.wordIndex);
        const input = tf.tensor(vector, [1, MAX_SEQUENCE_LENGTH], "float32");
        const prediction = await this.props.model.predict(input);
        const score = prediction.dataSync()[0];
        const sentiment = score > 0.5 ? "+" : "-";

        this.setState({ probability: score, sentiment });
        this.changeBgColor(pallet[sentiment]);

        prediction.dispose();
    }, 300);

    handleChange = (e) => {
        this.predict(e.target.value)
    };

    render() {
        const { probability, sentiment } = this.state;

        return (
            <div className={styles.container}>
                <span> {sentiment && `Sentiment: ${sentiment}`} </span>
                <span> {probability && `Probability: ${Math.round(probability * 100)}%`} </span>
                <div>
                    <textarea
                        autoFocus
                        onChange={this.handleChange}
                        className={styles.text_input}
                        placeholder="Type here"
                    />
                </div>
            </div>
        );
    }
}
