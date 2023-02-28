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
const fileName = 'data-2.json';
const records = JSON.parse(fs.readFileSync(fileName).toString());

const formattedRecords = records.map((record) => {
  return record[1];
  // record[1].domain = record[1].domain.replaceAll("\n", " -- ");
});

fs.writeFileSync('data-2-new.json', JSON.stringify(formattedRecords));