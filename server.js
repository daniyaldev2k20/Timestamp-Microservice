// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// API endpoint as requested in user stories
app.get("/api/timestamp/:dateString?", (req, res) => {
  const dateString = req.params.dateString;
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    if (Number.isNaN(dateString)) {
      date = new Date(dateString);
    } else {
      date = new Date(parseInt(dateString));
    }
  }

  // if the date is invalid send the error response
  // else send the response in the requested format
  if (date.toString() === "Invalid Date") {
    res.send({
      error: date.toString(),
    });
  } else {
    res.send({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
