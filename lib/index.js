var fs = require('fs');

loadDir(__dirname);

function loadDir(path) {
  var files = fs.readdirSync(path)
    , fullPath
    , stats
    ;
  files.forEach(function inspectFile(file) {
    fullPath = path + '/' + file;
    stats = fs.statSync(fullPath);
    if (stats.isFile()) {
      matchFile(fullPath.replace(__dirname, ''));
    } else if (stats.isDirectory()) {
      loadDir(fullPath);
    }
  });
}

function matchFile(file) {
  var match
    , name
    , fileModule
    ;
  if (file === '/index.js') { 
    return; 
  } // Don't include this file
  match = /^(.*?\/([A-Za-z_]*))\.js$/.exec(file);
  if (match) {
    name = match[2].split('_').map(function(v) {
      return v.charAt(0).toUpperCase() + v.slice(1);
    }).join('');
    fileModule = require('./' + file);
    module.exports[name] = fileModule; 
  }
}
