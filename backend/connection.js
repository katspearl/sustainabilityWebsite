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
mongoose.set('useFindAndModify', false);

const user = new Schema({
  username: String,
  pledgeNumber: Number,
  score: Number,
  checkList: [Boolean],
  email: String
});

const pledge = new Schema({
  pledge: String,
  pledgeNumber: Number,
  pledgeScore: Number,
  members: Number
});

const pledgeMapping = [];

const Users = mongoose.model("kUsers", user);
const Pledges = mongoose.model("Pledges", pledge);

async function getInfo(username) {
  const user = await Users.findOne({
    username: username
  });
  const pledge = await Pledges.findOne({
    pledgeNumber: user.pledgeNumber
  });
  //   console.log([user, pledge]);
  return [user, pledge];
}

async function getPledges() {
  const resp = await Pledges.find();
  //   console.log(resp);
  return resp;
}

async function createPledge(pledge, pledgeNumber) {
  await Pledges.create({
    pledge: pledge,
    pledgeNumber: pledgeNumber,
    pledgeScore: 0,
    members: 0,
    checkList: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ]
  });
  return true;
}

async function createUser(username, password, pledgeNumber) {
  const find = await Users.findOne({ username: username });
  if (!find) {
    await Users.create({
      username: username,
      pledgeNumber: pledgeNumber,
      score: 0,
      // email: email
    }).catch(err => {
      return false;
    });
    // console.log(resp);
    await Pledges.findOneAndUpdate(
      { pledgeNumber: pledgeNumber },
      {
        $inc: {
          members: 1
        }
      },
      {
        upsert: true
      }
    );
    return true;
  }
  return false;
}

async function login(username) {
  const find = await Users.findOne({ username: username });
  if (!find) return false;
  else return true;
}

async function percentile(username) {
  const user = await Users.findOne({ username: username });
  const numUsers = await Users.find({
    pledgeNumber: user.pledgeNumber
  }).countDocuments();
  const lessThanUser = await Users.find({
    score: { $lte: user.score },
    pledgeNumber: user.pledgeNumber
  }).countDocuments();
  //   console.log(numUsers);
  //   console.log(lessThanUser);
  const percentile = (lessThanUser / (numUsers * 1.0)) * 100;
  const rounded = Math.round(percentile);
  return rounded;
}

async function updateCheck(username, checkIndex) {
  var key = "checkList." + checkIndex;
  var user = await Users.findOne({
    username: username
  });

  var newCheckList = user.checkList;
  newCheckList[parseInt(checkIndex)] = !newCheckList[parseInt(checkIndex)];
  await Users.findOneAndUpdate(
    {
      username: username
    },
    {
      $set: { checkList: newCheckList }
    },
    {
      upsert: true
    }
  );
  return newCheckList;
}

async function updateScores(username, isIncrement) {
  var resp = await Users.findOne({
    username: username
  });

  var val = isIncrement ? 1 : -1;
  if (resp.score <= 0 && !isIncrement) val = 0;
  //   console.log(val);
  var promises = [
    Users.findOneAndUpdate(
      { username: username },
      {
        $inc: {
          score: val
        }
      },
      {
        upsert: true
      }
    ),
    Pledges.findOneAndUpdate(
      { pledgeNumber: resp.pledgeNumber },
      {
        $inc: {
          pledgeScore: val
        }
      },
      {
        upsert: true
      }
    )
  ];
  await Promise.all(promises);

  //   console.log(resp.score + val);
  return resp.score + val;
}

async function top3(pledgeNumber) {
  const top3 = await Users.aggregate([
    { $match: { pledgeNumber: pledgeNumber } },
    { $sort: { score: -1 } },
    { $limit: 3 },
  ]);
  console.log(top3);
}

// updateScores("arthur01", false);
// createUser("arthur01", "chen", 0);
// createPledge("Eat more plant-based meals", 0);
// createPledge("Use more alternative transportation", 1);
// createPledge("Replace disposables with reusables", 2);
// getPledges();
// getInfo("arthur01");
module.exports = {
  getInfo: getInfo,
  updateScores: updateScores,
  createUser: createUser,
  getPledges: getPledges,
  login: login,
  percentile: percentile,
  updateCheck: updateCheck
};

// percentile("arthur01");
