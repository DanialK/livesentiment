import React from "react";
import ReactDOM from "react-dom";
import * as tf from "@tensorflow/tfjs";
import App from "./src/App";

const staticServerUrl = "http://localhost:2222";

async function loadModel(params) {
    const wordIndex = await (await fetch(`${staticServerUrl}/word_index.json`)).json();
    const model = await tf.loadModel(`${staticServerUrl}/sentiment_js_model/model.json`);    
    return { model, wordIndex };
}

loadModel().then(({model, wordIndex}) => {
    ReactDOM.render(
        <App model={model} wordIndex={wordIndex} />,
        document.getElementById("main")
    );
});





