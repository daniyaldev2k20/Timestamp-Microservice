// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/:date?', (req, res) => {
  let date_string = req.params.date;

  if(!date_string){
    return res.json({
      unix: Date.now(),
      utc: Date()
    })
  }

  if(Number.isNaN(date_string)){
    date_string = new Date(date_string);
  }
  else{
    date_string = new Date(parseInt(date_string))
  }

  if (date_string.toString() === 'Invalid Date') {
    res.send({
      error: date_string.toString(),
    });
  } else {
    res.send({
      unix: date_string,
      utc: date_string.toUTCString(),
    });
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
