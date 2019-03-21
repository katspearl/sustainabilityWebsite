import React, { Component } from "react";
import styles from "./home.module.css";

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
      percentile: 0
    };
  }

  componentDidMount = async () => {
    var respPledges = await fetch("http://localhost:5000/pledges");
    var respUserInfo = await fetch("http://localhost:5000/user/arthur01");
    var respPercentile = await fetch(
      "http://localhost:5000/percentile/arthur01"
    );
    const pledges = await respPledges.json();
    const userInfo = await respUserInfo.json();
    const percentile = await respPercentile.json();
    console.log(pledges, userInfo);
    this.setState({
      userInfo: userInfo[0],
      userPledge: userInfo[1],
      percentile: percentile
    });
  };

  updateScore = async isIncrement => {
    var type = isIncrement ? "increment" : "decrement";
    const res = await fetch(`http://localhost:5000/${type}/arthur01`, {
      method: "POST"
    });
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
        <div className={styles.right}>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Take
            your number 6 plastic to the station during Willy Week
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Buy
            one Fair Trade certified product (https://pin.it/gjtwq5tmyjfiis)
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Take
            your e-waste to a Rice e-waste station
            (https://facilities.rice.edu/recycling/special)
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Visit
            the Rice Farmers Market (https://farmersmarket.rice.edu/)
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Bring
            your own cup to a party
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Bring
            your own mug to Coffeehouse or East West
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Sign
            up for a weekly fact with RISE Today
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Wash
            your clothes with cold water
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Cook
            one meal for yourself
            (https://www.favfamilyrecipes.com/easy-college-recipes-for-college-students/)
          </div>
          <div>
            <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Admire
            our newly made recycling bin signs!
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
