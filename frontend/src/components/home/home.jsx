import React, { Component } from "react";
import styles from "./home.module.css";
import stylesR from "./homeRight.module.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pledges: [
        "Eat more plant-based meals",
        "Use more alternative transportation",
        "Replace disposable items with reusables"
      ],
      userInfo: {},
      userPledge: {},
      percentile: 0,
      pledgeScores: [
        { pledgeScore: 0 },
        { pledgeScore: 0 },
        { pledgeScore: 0 }
      ],
      checkNames: [],
      username: ""
    };
  }

  componentDidMount = async () => {
    console.log(this.props);
    // var respPledges = await fetch("http://localhost:5000/pledges");
    var username = this.props.location.state.username;
    await this.setState({ username: username });
    var respUserInfo = await fetch(`http://ec2-3-87-162-178.compute-1.amazonaws.com:5000/user/${username}`);
    var respPercentile = await fetch(
      `http://ec2-3-87-162-178.compute-1.amazonaws.com:5000/percentile/${username}`
    );
    var respPledgeScores = await fetch(`http://ec2-3-87-162-178.compute-1.amazonaws.com:5000/pledges`);

    // const pledges = await respPledges.json();
    const userInfo = await respUserInfo.json();
    const percentile = await respPercentile.json();
    const pledgeScores = await respPledgeScores.json();
    const checkNames = [
      "Take your number 6 plastic to the station during Willy Week",
      "Buy one Fair Trade certified product",
      "Take your e-waste to a Rice e-waste station https://facilities.rice.edu/recycling/special/",
      "Visit the Rice Farmers Market",
      "Bring your own cup to a party",
      "Bring your own mug to Coffeehouse or East West",
      "Sign up for a weekly fact with RISE Today",
      "Wash your clothes with cold water",
      "Cook one meal for yourself",
      "Admire our newly made recycling bin signs!"
    ];
    this.setState({
      userInfo: userInfo[0],
      userPledge: userInfo[1],
      percentile: percentile,
      pledgeScores: pledgeScores,
      checkNames: checkNames
    });
  };

  updateScore = async isIncrement => {
    var type = isIncrement ? "increment" : "decrement";
    const res = await fetch(
      `http://ec2-3-87-162-178.compute-1.amazonaws.com:5000/${type}/${this.state.username}`,
      {
        method: "POST"
      }
    );
    var resp = await res.json();
    // console.log(resp);
    var info = this.state.userInfo;
    info.score = resp;
    var pledge = this.state.userPledge;
    pledge.pledgeScore = isIncrement
      ? pledge.pledgeScore + 1
      : pledge.pledgeScore === 0
      ? pledge.pledgeScore
      : pledge.pledgeScore - 1;
    // console.log(info);
    this.setState({ userInfo: info, userPledge: pledge });
  };

  checkBox = async (event, index) => {
    const resp = await fetch(
      `http://ec2-3-87-162-178.compute-1.amazonaws.com:5000/check/${this.state.username}/${index}`,
      {
        method: "POST"
      }
    );
    const res = await resp.json();
    var info = this.state.userInfo;
    info.checkList = res;
    this.setState({ userInfo: info });
  };

  render() {
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.left}>
          <div className={styles.mainScore}>
            <div className={styles.screenshot}>
              <p>Come back to this page easily with</p>
              <p><u>tinyurl.com/owlbesustainable-2019</u></p>
            </div>
            <PledgeDisplay val={this.state.userInfo.pledgeNumber} back={this.state.pledges[this.state.userInfo.pledgeNumber]} />
            <div className={styles.scoreContainer}>
              <div
                onClick={e => this.updateScore(false)}
                className={styles.leftCircle}
              />
              <div
                onClick={e => this.updateScore(true)}
                className={styles.rightCircle}
              />
              <span
                onClick={e => this.updateScore(false)}
                style={{ marginRight: "0.5vw", left: "0.5vw" }}
              >
                -
              </span>
              <div className={styles.personalScore}>
                <span>{this.state.userInfo.score}</span>
              </div>
              <span
                onClick={e => this.updateScore(true)}
                style={{ marginLeft: "0.5vw", right: "0.5vw" }}
              >
                +
              </span>
            </div>

            <div
              className={[styles.smallerScoreContainer, styles.leftScore].join(
                " "
              )}
            >
              <div className={[styles.smallerScoreBorder].join(" ")}>
                <div className={styles.smallerScore}>
                  <span>{this.state.userPledge.pledgeScore}</span>
                </div>
              </div>
              <div className={styles.smallerScoreName}>Group Total</div>
            </div>
            <div
              className={[styles.smallerScoreContainer, styles.middleScore].join(" ")}
            >
              <div className={[styles.smallerScoreBorder].join(" ")}>
                <div className={styles.smallerScore}>
                  <span>{this.state.percentile}</span>
                </div>
              </div>
              <div className={styles.smallerScoreName}>My Percentile</div>
            </div>
            <div
              className={[styles.smallerScoreContainer, styles.rightScore].join(
                " "
              )}
            >
              <div className={[styles.smallerScoreBorder].join(" ")}>
                <div className={styles.smallerScore}>
                  <span>{this.state.userPledge.members}</span>
                </div>
              </div>
              <div className={styles.smallerScoreName}>Participants</div>
            </div>
            {/* <Button onClick={e => this.updateScore(true)}>Increment!</Button>
            <Button onClick={e => this.updateScore(false)}>Decrement!</Button> */}
          </div>
          {/* <div className={styles.secondaryScores} /> */}
        </div>
        <div className={stylesR.right}>
          <div className={styles.screenshot}>
            <p>Screenshot and share your progress</p>
            <p>with <b>#owlbesustainable</b> !</p>
          </div>
          <PledgeCard title={"2019 Pledges"}>
            <Pledge
              val={this.state.pledgeScores[0].pledgeScore}
              ppl={this.state.pledgeScores[0].members}
            >
              plant-based meals eaten by
            </Pledge>
            <Pledge
              val={this.state.pledgeScores[1].pledgeScore}
              ppl={this.state.pledgeScores[1].members}
            >
              car rides saved by
            </Pledge>
            <Pledge
              val={this.state.pledgeScores[2].pledgeScore}
              ppl={this.state.pledgeScores[2].members}
            >
              disposable items replaced by
            </Pledge>
          </PledgeCard>
          <Bucket title={"Bucket List"} alignRight={true}>
            {this.state.checkNames.map((name, index) => {
              return (
                <div key={index} className={stylesR.bucketItem}>
                  <input
                    key={index}
                    onChange={e => this.checkBox(e, index)}
                    type="checkbox"
                    checked={this.state.userInfo.checkList[index]}
                  />
                  &nbsp; {name} 
                </div>
              );
            })}
          </Bucket>
        </div>
      </div>
    );
  }
}


function PledgeDisplay(props) {
  
  if (props.val ==0) {
    return (
      <div className={styles.pledgeCont}>
        <div className={styles.pledgeName}>
          +1 every time you eat a plant-based meal!
        </div>
        <div className={styles.pledgeEx}>
          (or when you try a plant-based protein)
        </div>
      </div>
      )
  }

  if (props.val ==1) {
    return (
      <div className={styles.pledgeCont}>
        <div className={styles.pledgeName}>
          +1 every time you travel OC without a car!
        </div>
        <div className={styles.pledgeEx}>
          (walk, bike, metro, etc.)
        </div>
      </div>
      )
  }

  if (props.val ==2) {
    return (
      <div className={styles.pledgeCont}>
        <div className={styles.pledgeName}>
          +1 every time you use a reusable item!
        </div>
        <div className={styles.pledgeEx}>
          (bottles, utensils, bags, razors, etc.)
        </div>
      </div>
      )
  }

  else {
    return (
      <div className={styles.pledgeName}>
        {props.back}
      </div>
      )
    }
}


function PledgeCard(props) {
  var c = "";
  if (props.alignRight) {
    c += stylesR.alignRight;
  }
  return (
    <div className={[stylesR.card, c].join(" ")}>
      <div className={stylesR.cardTitle}>{props.title}</div>
      <div className={stylesR.pledgeContent}>{props.children}</div>
    </div>
  );
}

function Bucket(props) {
  var c = "";
  if (props.alignRight) {
    c += stylesR.alignRight;
  }
  return (
    <div className={[stylesR.bucketCard, c].join(" ")}>
      <div className={stylesR.cardTitle}>{props.title}</div>
      <div className={stylesR.cardContent}>{props.children}</div>
    </div>
  );
}

function Pledge(props) {
  return (
    <div className={stylesR.pledge}>
      <span className={stylesR.pledgeVal}>{props.val}&nbsp;</span>
      {props.children} {props.ppl} people.
    </div>
  );
}

export default Home;
