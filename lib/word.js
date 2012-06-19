var nb = require('./');

function Word() {
  this.letters = "";
  this.usedCoords = [];
}

Word.prototype.addLetter = function(letter, row, column) {
  this.letters += letter;
  if (!this.containsCoords([row, column])) {
    this.usedCoords.push([row, column]);
  }
}

Word.prototype.containsCoords = function(coords) {
  return JSON.stringify(this.usedCoords).indexOf(JSON.stringify(coords)) > -1;
}

Word.prototype.toString = function() {
  return this.letters;
}

Word.newInstance = function(row, column) {
  var word = new Word();
  word.usedCoords.push([row, column]);
  return word;
}

Word.createFromWord = function(word) {
  var newWord = new Word();
  newWord.letters = word.letters;
  newWord.usedCoords = word.usedCoords.slice(); // Create a copy
  return newWord;
}

module.exports = Word;