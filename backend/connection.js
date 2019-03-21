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
  score: Number,
  checkList: [Boolean]
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
      password: password,
      pledgeNumber: pledgeNumber,
      score: 0
    }).catch(err => {
      return false;
    });

    const resp = await Pledges.findOne({ pledgeNumber: pledgeNumber });
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

  console.log(resp.score + val);
  return resp.score + val;
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
  getPledges: getPledges
};
