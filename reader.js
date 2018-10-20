const fs = require("fs");
const csvString = require("csv-string");

function collectAll(location) {
  let files = fs.readdirSync(location);
  let tempCombined = [];
  for (var i in files) {
    console.log(i + ": " + files[i]);
    var fileContents = fs.readFileSync(location + files[i]);
    var lines = fileContents.toString().split("\n");
    for (var n in lines) {
      tempCombined.push(
        lines[n]
          .trim()
          .toString()
          .split(csvString.detect(lines[n]))
      );
    }
  }
  return tempCombined;
}

function orderByColumn(data, column, asc = true) {
  let sorted = data.sort(function(a, b) {
    if (a[column] === b[column]) {
      return 0;
    } else {
      if (asc) return a[column] < b[column] ? -1 : 1;
      else return a[column] > b[column] ? -1 : 1;
    }
  });

  displayIt(sorted);
}

function displayIt(data) {
  if (data && data.length > 0) {
    for (var i in data) {
      console.log(data[i].toString());
    }
    console.log();
  }
}

module.exports = { collectAll, orderByColumn };
