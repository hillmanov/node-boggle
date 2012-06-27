var nb = require('./')
  , ROW = 0
  , COL = 1
  ;

function BoggleSolver(config, cb) {
  var self = this
    , dictionary = config.dictionary || "dictionary.txt"
    , minWordLength = config.minWordLength || 3
    ;

  process.nextTick(function() {
    self.boggleBoard = new nb.BoggleBoard(config.letters);
    self.size = self.boggleBoard.size;

    self.dictionary = new nb.Dictionary(dictionary);
    self.minWordLength = minWordLength;
    self._foundWords = {};
    self._foundWordsList = [];

    self._solve(cb);
  });
}

BoggleSolver.prototype._solve = function(cb) {
  var row
    , column
    , word
    ;
  for (row = 0; row < this.size; row++) {
    for (column = 0; column < this.size; column++) {
      this._findWords(nb.Word.newInstance(row, column), row, column);
    }
  }

  for (word in this._foundWords) {
    if (this._foundWords.hasOwnProperty(word)) {
      this._foundWordsList.push(word);
    }
  }

  this._foundWordsList.sort();
 
  if (cb) {
    cb(null, this._foundWordsList);
  }
}

BoggleSolver.prototype._findWords = function(word, row, column) {
  var validCoordsForWord
    , i
    , coords
    ;

  word.addLetter(this.boggleBoard.get(row, column), row, column);
  if (this._isValidWord(word)) {
    this._foundWords[word.letters] = true;
  }

  validCoordsForWord = this._getValidCoordsForWord(word, row, column);
  for (i = 0; i < validCoordsForWord.length; i++) {
    coords = validCoordsForWord[i];
    if (this.dictionary.isValidPrefix(word.letters + this.boggleBoard.get(coords[ROW], coords[COL]))) {
      this._findWords(nb.Word.createFromWord(word), coords[ROW], coords[COL]);
    }
  }
}

BoggleSolver.prototype._isValidWord = function(word) {
  return word.letters.length >= this.minWordLength && this.dictionary.isValidWord(word.letters);
}

BoggleSolver.prototype._getValidCoordsForWord = function(word, row, column) {
  var validCoordsForWord = []
    , loopRow
    , loopCol
    ;
    for (loopRow = row -1; loopRow < row + 2; loopRow++) {
      for (loopCol = column - 1; loopCol < column + 2; loopCol++) {
        if (loopRow >= 0 && loopRow < this.size && loopCol >= 0 && loopCol < this.size) {
          if (!word.containsCoords([loopRow, loopCol])) {
            validCoordsForWord.push([loopRow, loopCol]);
          }
        }
      }
    }
    return validCoordsForWord;
}

module.exports = BoggleSolver;
