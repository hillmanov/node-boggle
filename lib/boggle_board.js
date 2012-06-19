var nb = require('./');

function BoggleBoard(letters) {
  var i
    , row
    , column
    ;
  
  this.size = Math.sqrt(letters.length);
  if (this.size != Math.round(this.size)) {
    throw Error("Board must have equal sides (4x4, 5x5...)");
  }

  i = 0;
  this.grid = [];
  for (row = 0; row < this.size; row++) {
    this.grid.push([]);
    for (column = 0; column < this.size; column++) {
      this.grid[row].push(letters[i++]);
    }
  }
}

BoggleBoard.prototype.get = function(row, column) {
  return this.grid[row][column];
}

module.exports = BoggleBoard;