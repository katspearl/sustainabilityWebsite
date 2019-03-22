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
    var respUserInfo = await fetch(`http://localhost:5000/user/${username}`);
    var respPercentile = await fetch(
      `http://localhost:5000/percentile/${username}`
    );
    var respPledgeScores = await fetch(`http://localhost:5000/pledges`);

    // const pledges = await respPledges.json();
    const userInfo = await respUserInfo.json();
    const percentile = await respPercentile.json();
    const pledgeScores = await respPledgeScores.json();
    const checkNames = [
      "Take your number 6 plastic to the station during Willy Week",
      "Buy one Fair Trade certified product",
      "Take your e-waste to a Rice e-waste station",
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
      `http://localhost:5000/${type}/${this.state.username}`,
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
      `http://localhost:5000/check/${this.state.username}/${index}`,
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
            <div className={styles.pledgeName}>
              {this.state.pledges[this.state.userInfo.pledgeNumber]}
            </div>
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
              <div className={styles.smallerScoreName}>Group Pledge Score</div>
            </div>
            <div
              className={[
                styles.smallerScoreContainer,
                styles.middleScore
              ].join(" ")}
            >
              <div className={[styles.smallerScoreBorder].join(" ")}>
                <div className={styles.smallerScore}>
                  <span>{this.state.percentile}</span>
                </div>
              </div>
              <div className={styles.smallerScoreName}>Percentile</div>
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
              <div className={styles.smallerScoreName}>Number of Members</div>
            </div>
            {/* <Button onClick={e => this.updateScore(true)}>Increment!</Button>
            <Button onClick={e => this.updateScore(false)}>Decrement!</Button> */}
          </div>
          <div className={styles.secondaryScores} />
        </div>
        <div className={stylesR.right}>
          <Card title={"Pledges"}>
            <Pledge
              val={this.state.pledgeScores[0].pledgeScore}
              ppl={this.state.pledgeScores[0].members}
            >
              plant based meals eaten by
            </Pledge>
            <Pledge
              val={this.state.pledgeScores[1].pledgeScore}
              ppl={this.state.pledgeScores[1].members}
            >
              alternative modes of transportation used by
            </Pledge>
            <Pledge
              val={this.state.pledgeScores[2].pledgeScore}
              ppl={this.state.pledgeScores[2].members}
            >
              disposable items replaced with reusable items by
            </Pledge>
          </Card>
          <Card title={"Sustainability Checklist"} alignRight={true}>
            {this.state.checkNames.map((name, index) => {
              return (
                <div key={index}>
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
          </Card>
        </div>
      </div>
    );
  }
}

function Card(props) {
  var c = "";
  if (props.alignRight) {
    c += stylesR.alignRight;
  }
  return (
    <div className={[stylesR.card, c].join(" ")}>
      <div className={stylesR.cardTitle}>{props.title}</div>
      <div className={stylesR.cardContent}>{props.children}</div>
    </div>
  );
}

function Pledge(props) {
  return (
    <div className={stylesR.pledge}>
      <span className={stylesR.pledgeVal}>{props.val}</span>
      {props.children} {props.ppl} people.
    </div>
  );
}

export default Home;
