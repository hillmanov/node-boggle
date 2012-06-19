var fs = require('fs')
  , nb = require('./')
  ;

function Dictionary(dictionaryFileName) {
  this.prefixes = {};
  this.words = {};

  var rawWords = fs.readFileSync(dictionaryFileName).toString().split("\n")
    , i
    , j
    , word
    ;

  for (i = 0; i < rawWords.length; i++) {
    word = rawWords[i].toLowerCase();
    this.words[word] = true;
    for (j = 0; j < word.length + 1; j++) {
      this.prefixes[word.substring(0, j)] = true;
    } 
  }
}

Dictionary.prototype._isValidWord = function(word) {
  return this.words[word] == true;
}

Dictionary.prototype._isValidPrefix = function(prefix) {
  return this.prefixes[prefix] == true;
}

module.exports = Dictionary;