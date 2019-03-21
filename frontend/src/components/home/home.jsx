import React, { Component } from "react";
import Button from "react-bootstrap/Button";
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
            {/* <Button onClick={e => this.updateScore(true)}>Increment!</Button>
            <Button onClick={e => this.updateScore(false)}>Decrement!</Button> */}
          </div>
          <div className={styles.secondaryScores}>
            <div className={styles.smallerScore} />
            <div className={styles.smallerScore} />
            <div className={styles.smallerScore} />
          </div>
        </div>
        <div className={styles.right} />
      </div>
    );
  }
}

export default Home;
