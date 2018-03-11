import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const database_name = "sentiment_db.sqlite";

const db = SQLite.openDatabase({name : database_name, location: 'Documents'},
  () => console.log('success'), () => console.log("error"));

const MAX_SEQUENCE_LENGTH = 1000;
const ignore = "'!\"#$%&()*+,-./:;<=>?@[\\]^_`{|}~/\t/\n'";

function getWords(text) {
  const words = text
    .toLowerCase()
    .split('')
    .filter(char => !ignore.includes(char))
    .join('')
    .split(' ');
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
  let baseQuery = 'SELECT * from word_index ';
  return baseQuery + words.map((word) => `WHERE key="${word}"`).join(' OR ');
}

export default function getVector(text) {
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
          console.log('error', error);
        })      
    })
  });
}
