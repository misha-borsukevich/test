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
const fileName = 'data-0-125.json';
const records = JSON.parse(fs.readFileSync(fileName).toString());
let counter = 1;

const newRecords = records.slice(65000);

// const newRecords = [];

newRecords.forEach((record) => {
  if (counter > 65000) {
    // return;
  }

  counter++;

  // return record[1];
  // record.domain = record.domain.replaceAll("\n", " -- ");

  // newRecords.push(record);
});

console.log(newRecords, newRecords.length);

fs.writeFileSync('data-65-125.json', JSON.stringify(newRecords));