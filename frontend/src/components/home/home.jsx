import React, { Component } from "react";
import styles from "./home.module.css";
import stylesR from "./homeRight.module.css";

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
        <div className={stylesR.right}>
          <Title title={"Pledge Totals"} />
          <div className={stylesR.pledgeWrapper}>
            <Pledge val={11}> alternative modes of transportation used</Pledge>
            <Pledge val={23}> plant based meals eaten</Pledge>
            <Pledge val={333}> disposable items replaced with reusable items</Pledge>
          </div>
          <Title title={"Sustainability Checklist"} />
          <div className={stylesR.checklistWrapper}>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Take
              your number 6 plastic to the station during Willy Week
            </div>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Buy
              one Fair Trade certified product (<a href="https://pin.it/gjtwq5tmyjfiis">link</a>).
            </div>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Take
              your e-waste to a Rice e-waste station (<a href="https://facilities.rice.edu/recycling/special">link</a>).
            </div>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Visit
              the Rice Farmers Market (<a href="https://farmersmarket.rice.edu/">link</a>).
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
              one meal for yourself (<a href="https://www.favfamilyrecipes.com/easy-college-recipes-for-college-students/">link</a>).
            </div>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" /> &nbsp; Admire
              our newly made recycling bin signs!
            </div>
          </div>
          <Title title={"Leaderboard"} />
          <div>
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf laasasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf laasasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf laasasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la

            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la
            asasdfjasdj asdjfla sjdflkaj dlfjalkd fjalskjf lasdjf lasdjf lkasjdf lasjdlf ajsdlfk jasdlfj alskdjf laksdjf la



          </div>
        </div>
      </div>
    );
  }
}

function Title(props) {
  return (<div className={stylesR.title} >{props.title}</div>);
}

function Pledge(props) {
  return (<div className={stylesR.pledge}><span className={stylesR.pledgeVal}>{props.val}</span>{props.children}</div>);
}

export default Home;
