require("dotenv").load();
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const mongoURI =
  "mongodb://" +
  process.env.user +
  ":" +
  process.env.password +
  "@ds047207.mlab.com:47207/ac99db";
// console.log(mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true });

const user = new Schema({
  username: String,
  password: String,
  pledgeNumber: Number,
  score: Number
});

const pledge = new Schema({
  pledge: String,
  pledgeNumber: Number,
  pledgeScore: Number,
  members: Number
});

const Users = mongoose.model("Users", user);
const Pledges = mongoose.model("Leagues", pledge);

async function getUserInfo(username, password) {
  const resp = await Users.findOne({
    username: username,
    password: password
  });
  return resp;
}

async function getPledgeInfo(pledgeNumber) {
  const resp = await Pledges.findOne({
    pledgeNumber: pledgeNumber
  });
  return resp;
}

async function createGroup(pledge, pledgeNumber) {
  Pledges.create({
    pledge: pledge,
    pledgeNumber: pledgeNumber,
    pledgeScore: 0,
    members: 0
  });
}

async function createUser(username, password, pledgeNumber) {
  await Users.create({
    username: username,
    password: password,
    pledgeNumber: pledgeNumber,
    score: 0
  });
  return true;
}

async function updateUser(username, isIncrement) {}

async function updateGroup() {}
