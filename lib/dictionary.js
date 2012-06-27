var fs = require('fs')
  , nb = require('./')
  ;

function Dictionary(dictionaryFileName) {
  this.words = fs.readFileSync(dictionaryFileName).toString().split("\n");
}

Dictionary.searchType = {
  WORD : 0,
  PREFIX : 1
}

Dictionary.prototype.isValidWord = function(word) {
  return this._isValidElement(Dictionary.searchType.WORD, word);
}

Dictionary.prototype.isValidPrefix = function(prefix) {
  return this._isValidElement(Dictionary.searchType.PREFIX, prefix);
}

Dictionary.prototype._isValidElement = function(type, str) {
  var high = this.words.length
    , low = 0
    , mid
    , element
    ;

  while (low <= high) {
    mid = Math.round((high + low) / 2)

    element = this.words[mid].toLowerCase();  
    
    if (type == Dictionary.searchType.PREFIX) {
      element = element.substr(0, str.length);
    }
    
    if (element == str) {
      return true;
    }
    else {
      if (element < str) {
        low = mid + 1;
      }
      else {
        high = mid - 1;
      }
    }
  }
  return false;
}

module.exports = Dictionary;