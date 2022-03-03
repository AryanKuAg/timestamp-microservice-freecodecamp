// server.js
// where your node app starts

// init project
var express = require("express");
const request = require("request");
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
app.get("/api/:date", function (req, res) {
  // res.json({ greeting: "hello API" });
  let date = req.params.date;
  let url = `https://showcase.api.linx.twenty57.net/UnixTime/tounix?date=${date}`;
  if (date.includes("/") || date.includes("-")) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        let date = req.params.date;
        // console.log(response.toJSON());
        // console.log(parseInt(body));
        // console.log("nono");
        let unix = parseInt(body.replace('"', "").replace('"', ""));
        // for utc

        let year = date.slice(0, 4);
        let month = date.slice(5, 7);
        let day = date.slice(8, 10);
        // console.log(year);
        // console.log(month);
        // console.log(day);
        const utcDate1 = new Date(Date.UTC(year, month, day));

        res.json({ unix: unix, utc: utcDate1.toUTCString() });
      }
    });
  } else {
    console.log("else part");

    let date = req.params.date;

    let unix = parseInt(date);
    const utcDate1 = new Date(date * 1000);
    // console.log({ unix: unix, utc: utcDate1.toUTCString() });
    res.json({ unix: unix, utc: utcDate1.toUTCString() });
  }
});

const port = process.env.PORT || 1234;
// listen for requests :)
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
