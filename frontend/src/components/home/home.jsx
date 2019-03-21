import React, { Component } from "react";
import styles from "./home.module.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pledges: [],
      userInfo: {},
      userPledge: {}
    };
  }

  componentDidMount = async () => {
    var respPledges = await fetch("http://localhost:5000/pledges");
    var respUserInfo = await fetch("http://localhost:5000/user/arthur01");
    const pledges = await respPledges.json();
    const userInfo = await respUserInfo.json();
    console.log(pledges, userInfo);
    this.setState({
      pledges: pledges,
      userInfo: userInfo[0],
      userPledge: userInfo[1]
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
    // console.log(info);
    this.setState({ userInfo: info });
  };

  render() {
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.left}>
          <div className={styles.mainScore}>
            <div className={styles.personalScore}>
              <span>{this.state.userInfo.score}</span>
              <div className={styles.personalShadow} />
            </div>
            <div
              className={[styles.smallerScoreBorder, styles.leftScore].join(
                " "
              )}
            >
              <div className={styles.smallerScore}>
                <span>{this.state.userPledge.pledgeScore}</span>
              </div>
            </div>
            <div
              className={[styles.smallerScoreBorder, styles.middleScore].join(
                " "
              )}
            >
              <div className={styles.smallerScore}>
                <span>asdf</span>
              </div>
            </div>
            <div
              className={[styles.smallerScoreBorder, styles.rightScore].join(
                " "
              )}
            >
              <div className={styles.smallerScore}>
                <span>{this.state.userPledge.members}</span>
              </div>
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
