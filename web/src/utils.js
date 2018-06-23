import sampleSize from "lodash/sampleSize";

export const MAX_SEQUENCE_LENGTH = 256;

const ignore = "'!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~/\t/\n'";

function getWords(text) {
  const words = text
    .toLowerCase()
    .split("")
    .filter(char => !ignore.includes(char))
    .join("")
    .split(" ");
  return words;
}

function tokenizer(words, wordIndex) {
  return words.map(word => wordIndex[word] ? wordIndex[word] : 0)
}

function padSequence(maxLen, sequence) {
  const zeros = Array(maxLen - sequence.length).fill(0);
  return zeros.concat(sequence);
}

export function getVector(text, wordIndex) {
  const words = getWords(text);
  return padSequence(MAX_SEQUENCE_LENGTH, tokenizer(words, wordIndex));
}

export const pallet = {
  textColor: "#FAFAFA",
  initial: [
    "#8b53f3",
    "#673AB7",
    "#7B1FA2",
    "#6A1B9A",
    "#AA00FF",
  ],
  "+": [
    "#B2EBF2",
    "#90CAF9",
    "#1DE9B6",
    "#A5D6A7",
    "#80CBC4",
    "#81D4FA",
    "#80DEEA",
    "#4FC3F7",
    "#64B5F6",
    "#18FFFF",
    "#66BB6A",
    "#43A047",
    "#4DB6AC"
  ],
  "-": [
    "#ED493d",
    "#EF5350",
    "#FF5252",
    "#F50057",
    "#FF6004",
    "#FF3D00",
    "#FFAB40",
    "#E65100",
    "#FF430a",
    "#F01d63",
  ]
}

export const changeBackground = (colors) => {
  const colLength = colors.length;
  const colSample = sampleSize(colors, colLength)
  document.body.style = `
      width: 100wh;
      height: 90vh;
      color: #fff;
      background: linear-gradient(-90deg, ${colSample.join(', ')});
      background-size: ${colLength}00% ${colLength}00%;
      -webkit-animation: Gradient ${colLength + 5}s ease infinite;
      -moz-animation: Gradient ${colLength + 5}s ease infinite;
      animation: Gradient ${colLength + 5}s ease infinite;
  `;
};