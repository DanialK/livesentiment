import React from "react";
import { Text, View, TextInput, KeyboardAvoidingView } from "react-native";
import debounce from "lodash/debounce";
import isEmpty from "lodash/isEmpty";
import { NativeModules } from "react-native";
import AnimatedLinearGradient from "./AnimatedLinearGradient";
import { pallet, getVector } from "./utils";
import styles from "./styles";

const { Sentiment } = NativeModules;

export default class App extends React.Component {
  state = {
    text: "",
    probability: undefined,
    sentiment: undefined,
    colors: pallet.initial,
  };

  checkSentiment = debounce(text => {
    const isTextEmpty = isEmpty(text.trim());

    if (isTextEmpty) {
      this.setState({
        probability: undefined,
        sentiment: undefined,
        colors: pallet.initial
      });
      return;
    }

    getVector(text).then(vectors => {
      Sentiment.check(vectors, (err, score) => {
        if (err) return;
        const sentiment = score > 0.5 ? "+" : "-";
        this.setState({
          sentiment,
          probability: Math.abs(score - 0.5) / 0.5,
          colors: pallet[sentiment]
        });
      });
    });
  }, 500);

  handleTextChange = (text) => {
    this.setState({text}, () => this.checkSentiment(text));
  };

  render() {
    const { text, sentiment, probability, colors, error } = this.state;

    return (
      <AnimatedLinearGradient customColors={colors} speed={2000}>
        <View style={[styles.container]}>
          <View style={styles.info}>
            <Text style={styles.probability}>
              {sentiment && `Sentiment: ${sentiment}`}
            </Text>
            <Text style={styles.probability}>
              {probability && `Probability: ${Math.round(probability * 100)}%`}
            </Text>
            <Text style={styles.probability}>
              {error && `Error: ${error}`}
            </Text>
          </View>
          <KeyboardAvoidingView style={styles.contentContainer} behavior="padding">
            <TextInput
              multiline
              numberOfLines={Infinity}
              style={[styles.textInput, {color: pallet.textColor, opacity: text.length ? 1 : 0.5}]}
              placeholderTextColor={pallet.textColor}
              underlineColorAndroid="transparent"
              placeholder="Type here"
              onChangeText={this.handleTextChange}
              value={text}
              autocorrect={false}
              textBreakStrategy="highQuality"
            />
          </KeyboardAvoidingView>
        </View>
      </AnimatedLinearGradient>
    );
  }
}

