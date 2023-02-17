/* Include to use .env file */
const express = require('express');

const app = express();

app.listen(3000, function () {
  const dotenv = require('dotenv');
  dotenv.config()

  const fs = require("fs");
  const {Pool} = require("pg");
  const fastcsv = require("fast-csv");

  const stream = fs.createReadStream("./seedData/items.csv");
  const csvData = [];
  const csvStream = fastcsv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      // remove the first line: header
      csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    });

    const query =
      `INSERT INTO items (itemname, cost, levelreq, imageid, damage, speed, durability, critrate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log(`inserted ${  res.rowCount  } row:`, row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

stream.pipe(csvStream);
})
