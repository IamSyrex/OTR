const reader = require("./reader");
const folderLocation = "./files/";

let collectedData = reader.collectAll(folderLocation);

if (collectedData) {
  console.log("Output 1: Gender Ascending");
  reader.orderByColumn(collectedData, 2);
  console.log("Output 2: Birth Date Ascending");
  reader.orderByColumn(collectedData, 4);
  console.log("Output 3: Last Name Descending");
  reader.orderByColumn(collectedData, 1, false);
}
