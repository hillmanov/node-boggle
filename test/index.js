var nb = require('../');

describe("Test the boggle solver", function() { 
  it("Should solve the board and print all the word on the screen", function(done) {
    var boggleSolver = new nb.BoggleSolver({
      letters: ['b', 'e', 'r', 't', 'g', 'h', 'n', 'm', 'a', 'e', 'w', 'p', 'l', 'e', 't', 'f'],
      minWordLength: 3
    }, function(err, data) {
      console.log(err, data, data.length);
      done();
    });
  })
});

