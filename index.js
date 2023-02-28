const express = require('express'); //Import the express dependency
const fs = require('fs');
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 4848;                  //Save the port number where your server will be listening

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
  res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                      //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});


// File parsing
const fileName = 'data-full-formatted.json';
const records = JSON.parse(fs.readFileSync(fileName).toString());

const step = 32000;
const allRecordsLength = records.length;

let currentMinRange = 0;
let currentMaxRange = Math.min(allRecordsLength, step);

while (currentMinRange < allRecordsLength) {
  const newRecords = records.slice(currentMinRange, currentMaxRange);

  fs.writeFileSync(`${currentMinRange}-${currentMaxRange}.json`, JSON.stringify(newRecords));

  currentMinRange += step;
  currentMaxRange += Math.min(allRecordsLength - currentMaxRange, step);
}

return;


// const newRecords = records.slice(32000);

// const newRecords = [];

records.forEach((record) => {
  return record[1];
  record[1].domain = record[1].domain.replaceAll("\n", " -- ");

  console.log(record);
  // newRecords.push(record);
});

console.log(records, records.length);

// fs.writeFileSync('data-full-formatted.json', JSON.stringify(newRecords));