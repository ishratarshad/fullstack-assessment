const express = require("express");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/api/data", (req, res) => {
  const results = [];
  fs.createReadStream("data.csv")
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", () => {
      res.json(results);
    });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
