import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "sentiment_db.db";

const db = SQLite.openDatabase({ name: database_name, createFromLocation: 1 },
  () => console.log("success"), () => console.log("error"));

const MAX_SEQUENCE_LENGTH = 256;
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

function getQuery(words) {
  let baseQuery = "SELECT * from word_index WHERE ";
  return baseQuery + words.map((word) => `key="${word}"`).join(" OR ");
}

export function getVector(text) {
  const words = getWords(text);
  return new Promise(resolve => {
    db.transaction((tx) => {
      tx.executeSql(getQuery(words), [],
        function (tx, results) {
          const wordIndex = {};
          const len = results.rows.length;
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            wordIndex[row.key] = row.value;
          }
          resolve(padSequence(MAX_SEQUENCE_LENGTH, tokenizer(words, wordIndex)));
        },
        function (error) {
          console.log("error", error);
        })
    })
  });
}

export const pallet = {
  textColor: "#FAFAFA",
  initial: [
    "#B39DDB",
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
    "#EF9A9A",
    "#FF3D00",
    "#FFAB40",
    "#E65100",
    "#FFAB91",
    "#F48FB1",
  ]
};
