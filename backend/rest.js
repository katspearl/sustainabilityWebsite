require("dotenv").load();
var express = require("express");
var app = express();
var connection = require("./connection");

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.post("/increment/:username", async function(req, res) {
  const username = req.params.username.split("+").join(" ");
  const resp = await connection.updateScores(username, true);
  res.json(resp);
});

app.post("/decrement/:username", async function(req, res) {
  const username = req.params.username.split("+").join(" ");
  const resp = await connection.updateScores(username, false);
  res.json(resp);
});

app.get("/user/:username", async function(req, res) {
  const username = req.params.username.split("+").join(" ");
  const resp = await connection.getInfo(username);
  res.json(resp);
});

app.post("/user/:username/:password/:email/:pledgeNumber", async function(req, res) {
  const username = req.params.username.split("+").join(" ");
  const password = req.params.password.split("+").join(" ");
  const pledgeNumber = parseInt(req.params.pledgeNumber);
  const resp = await connection.createUser(username, password, pledgeNumber, email);
  res.json(resp);
});

app.get("/pledges", async function(req, res) {
  const resp = await connection.getPledges();
  res.json(resp);
});

app.get("/login/:username", async function(req, res) {
  const username = req.params.username.split("+").join(" ");
  const resp = await connection.login(username);
  res.json(resp);
});

app.post("/check/:username/:checkIndex", async function(req, res) {
  const username = req.params.username.split("+").join(" ");
  const checkIndex = parseInt(req.params.checkIndex);
  console.log(checkIndex);
  const resp = await connection.updateCheck(username, checkIndex);
  res.json(resp);
});

app.listen(5000, function() {
  console.log("Example app listening on port 5000!");
});

app.get("/percentile/:username", async function(req, res) {
  const username = req.params.username.split("+").join(" ");
  const resp = await connection.percentile(username);
  res.json(resp);
});
