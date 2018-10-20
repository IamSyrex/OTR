const express = require("express");
const bodyParser = require("body-parser");
const apiHelpers = require("./apiHelpers");

const port = process.env.PORT || 3000;
const app = express();
const jsonParser = bodyParser.json();

app.use(express.json());

let records = [];

app.get("/records/gender", (req, res) => {
  if (records) res.send(records.sort(apiHelpers.dynamicSort("gender")));
  return;
});

app.get("/records/birthdate", (req, res) => {
  if (records) res.send(records.sort(apiHelpers.dynamicSort("date_of_birth")));
  return;
});

app.get("/records/name", (req, res) => {
  if (records) res.send(records.sort(apiHelpers.dynamicSort("first_name")));
  return;
});

app.post("/records", jsonParser, (req, res) => {
  if (req.body.length) {
    let data = req.body;
    let tempRecords = [];
    for (var i in data) {
      let record = apiHelpers.postBodyParser(data[i], records);
      if (record.error) {
        if (i > 0) {
          for (var count in i) {
            records.pop();
          }
        }
        res.status(400).send({ error: record.error });
        return;
      }
      tempRecords.push(record.record);
      records.push(record.record);
    }
    res.send(tempRecords);
  } else {
    let record = apiHelpers.postBodyParser(req.body, records);
    if (record.error) {
      res.status(400).send({ error: record.error });
      return;
    }
    records.push(record.record);
    res.send(record.record);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});

// app.get("/records/:order", (req, res) => {
//   if (records) res.send(records.sort(apiHelpers.dynamicSort(req.params.order)));
//   return;
// });
