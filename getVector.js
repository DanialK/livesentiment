// const wordIndex = require('./data.json');

// import wordIndex from './data.json';
const wordIndex = {
    "love": 147,
    "hate": 1480,
    "pizza": 2239,
};

const MAX_SEQUENCE_LENGTH = 1000;
const ignore = "'!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~/\t/\n'";


function tokenizer(text) {
  const filteredText = text.split('')
  .filter(char => !ignore.includes(char))
  .join('');
  const words = filteredText.split(' ');
  return words.map(word => wordIndex[word] ? wordIndex[word] : 0)
}

function padSequence(maxLen, sequence) {
  const zeros = Array(maxLen - sequence.length).fill(0);
  return zeros.concat(sequence);
}

export default function getVector(text) {
  return padSequence(MAX_SEQUENCE_LENGTH, tokenizer(text));
}
