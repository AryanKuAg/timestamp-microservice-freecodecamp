// server.js
// where your node app starts

// init project
var express = require("express");
const request = require("request");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const { application } = require("express");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

let currentFunction = function (req, res) {
  // let url = `https://showcase.api.linx.twenty57.net/UnixTime/tounix?date=${date}`;
  let unix = new Date().getTime();
  unix = parseInt(unix);
  const utc = new Date(unix).toUTCString();
  res.json({ unix: unix, utc: utc });
  // console.log(today);
  // res.json({ unix: unix, utc: utcDate1.toUTCString() });
};

app.get("/api", currentFunction);
app.get("/api/timestamp", currentFunction);

// your first API endpoint...
let endPointFunction = function (req, res) {
  // res.json({ greeting: "hello API" });
  let date = req.params.date;
  console.log(date);

  // let url = `https://showcase.api.linx.twenty57.net/UnixTime/tounix?date=${date}`;
  if (date.includes(" ")) {
    console.log("space");
    try {
      let date = req.params.date;
      let unix = new Date(date).getTime();
      unix = Number(unix);
      const utc = new Date(unix);
      res.json({ unix: unix, utc: utc.toUTCString() });
    } catch (_) {
      res.json({ error: "Invalid Date" });
    }
  } else if (date.includes("-")) {
    let date = req.params.date;
    console.log("if");
    // console.log(response.toJSON());
    // console.log(parseInt(body));
    // console.log("nono");
    // let unix = parseInt(body.replace('"', "").replace('"', "")) * 1000;
    let unix = new Date(date).getTime();
    unix = parseInt(unix);
    // for utc

    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    // console.log(year);
    // console.log(month);
    // console.log(day);
    const utcDate1 = new Date(Date.UTC(year, month - 1, day));
    let successDateParse = new Date(date).toString();
    if (unix && successDateParse !== "Invalid Date") {
      res.json({ unix: unix, utc: utcDate1.toUTCString() });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    console.log("else");
    let date = req.params.date;

    let unix = parseInt(date);
    const utcDate1 = new Date(unix);
    // console.log({ unix: unix, utc: utcDate1.toUTCString() });333333333333
    try {
      let successDateParse = new Date(Number(date)).toString();

      if (unix && successDateParse !== "Invalid Date") {
        res.json({ unix: unix, utc: utcDate1.toUTCString() });
      } else {
        res.json({ error: "Invalid Date" });
      }
    } catch (e) {
      res.json({ error: "Invalid Date" });
    }
  }
};
app.get("/api/:date", endPointFunction);
app.get("/api/timestamp/:date", endPointFunction);
app.get("*", (req, res) => {
  res.send("Not Found");
});

const port = process.env.PORT || 1234;
// listen for requests :)
var listener = app.listen(port, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
