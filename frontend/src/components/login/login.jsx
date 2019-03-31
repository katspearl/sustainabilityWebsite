import React, { Component } from "react";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
import styles from "./login.module.css";
import Avacado2 from "./RES.png";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formVisible: false,
      pledge: -1,
      loginUsername: "",
      loginPassword: "",
      signUpUsername: "",
      signUpPassword: "",
      signUpEmail: "",
      signUpError: false,
      loginError: false,
      route: false,
      signup: false,
      login: false // this is honestly so stupid lmao
    };
  }

  handleSignup = async () => {
    const signUpUsername = this.state.signUpUsername;
    const signUpPassword = this.state.signUpPassword;
    const signUpEmail = this.state.signUpEmail;
    const pledge = this.state.pledge;
    if (!this.state.formVisible) {
      this.setState({ formVisible: true });
    } else {
      if (pledge !== -1 && signUpPassword !== "" && signUpUsername !== "" && signUpEmail !== "") {
        const res = await fetch(
          `http://ec2-3-87-162-178.compute-1.amazonaws.com:5000/user/${
            this.state.signUpUsername
          }/${signUpPassword}/${pledge}`,
          {
            method: "POST"
          }
        );
        const accountMade = await res.json();
        console.log(accountMade);
        if (accountMade) {
          this.setState({ route: true, signup: true });
        } else {
          this.setState({ signUpError: true });
        }
      }
    }
  };

  handleLogin = async () => {
    const loginUsername = this.state.loginUsername;
    const loginPassword = this.state.loginPassword;

    if (loginPassword !== "" && loginUsername !== "") {
      const res = await fetch(
        `http://ec2-3-87-162-178.compute-1.amazonaws.com:5000/login/${
          this.state.loginUsername
        }`
      );
      const accountExists = await res.json();
      if (accountExists) {
        this.setState({ route: true, login: true });
      } else {
        this.setState({ loginError: true });
      }
    }
  };

  updateSignUpUsername = evt => {
    // console.log(evt.target.value);
    this.setState({
      signUpUsername: evt.target.value
    });
  };

  updateSignUpPassword = evt => {
    // console.log(evt.target.value);
    this.setState({
      signUpPassword: evt.target.value
    });
  };

  updateSignUpEmail = evt => {
    console.log(evt.target.value);
    this.setState({
      signUpEmail: evt.target.value
    });
  };

  updateLoginUsername = evt => {
    // console.log(evt.target.value);
    this.setState({
      loginUsername: evt.target.value
    });
  };

  updateLoginPassword = evt => {
    // console.log(evt.target.value);
    this.setState({
      loginPassword: evt.target.value
    });
  };

  setPledge = e => {
    const index = parseInt(e.currentTarget.getAttribute("data-index"));
    console.log(index);
    this.setState({ pledge: index });
  };

  render() {
    let signupForm = null;

    let errorMessage = (
      <div className={styles.errorMessage}>
        <span>Sorry username exists already</span>
      </div>
    );

    let loginError = (
      <div className={styles.loginErrorMessage}>
        <span>Username doesn't exist!</span>
      </div>
    );

    if (this.state.formVisible) {
      signupForm = (
        <div className={styles.signupForm}>
          {this.state.signUpError ? errorMessage : null}
          <input
            type="text"
            id="uname"
            name="username"
            placeholder="username..."
            onChange={e => this.updateSignUpUsername(e)}
          />
          <input
            type="password"
            id="pass"
            name="password"
            placeholder="password..."
            onChange={e => this.updateSignUpPassword(e)}
          />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="contact email..."
            onChange={e => this.updateSignUpEmail(e)}
          />
          s e l e c t a p l e d g e
          <div
            data-index="0"
            onClick={e => this.setPledge(e)}
            style={{ marginTop: "1vh" }}
            className={[
              styles.pledgeCheck,
              styles.c1,
              this.state.pledge === 0 ? styles.selectedPledge : ""
            ].join(" ")}
          >
            Eat more plant-based meals.
          </div>
          <div
            data-index="1"
            onClick={e => this.setPledge(e)}
            className={[
              styles.pledgeCheck,
              styles.c2,
              this.state.pledge === 1 ? styles.selectedPledge : ""
            ].join(" ")}
          >
            Use alternatives to cars.
          </div>
          <div
            data-index="2"
            onClick={e => this.setPledge(e)}
            className={[
              styles.pledgeCheck,
              styles.c3,
              this.state.pledge === 2 ? styles.selectedPledge : ""
            ].join(" ")}
          >
            Use fewer disposable items.
          </div>
        </div>
      );
    }

    return (
      <div className={styles.loginWrapper}>
        {this.state.route ? (
          <Redirect
            to={{
              pathname: "/dashboard",
              state: {
                username: this.state.signup
                  ? this.state.signUpUsername
                  : this.state.loginUsername
              }
            }}
          />
        ) : null}
        {/* <div className={styles.left}>
          <img src={Avacado2} alt="asdfasdf" width={300} height={300}/>
        </div> */}
        <div className={styles.right}>
          <div className={styles.loginForm}>
            <input
              type="text"
              id="uname"
              name="username"
              placeholder="username..."
              onChange={e => this.updateLoginUsername(e)}
            />
            <input
              type="password"
              id="pass"
              name="password"
              placeholder="password..."
              onChange={e => this.updateLoginPassword(e)}
            />
            <div onClick={this.handleLogin} className={styles.loginBtn}>
              Log in
            </div>
          </div>
          {this.state.loginError ? loginError : null}
          <div className={styles.res}>Rice Environmental Society</div>
          <img
            src={Avacado2}
            alt="asdfasdf"
            width={130}
            height={130}
            vspace={15}
          />
          <h2>Sustainability Month</h2>
          <div className={styles.expln}>
            Make a pledge and track your progress!
          </div>
          <div className={this.state.formVisible ? styles.signupWrapper : ""}>
            {signupForm}
            <div className={styles.signupBtn} onClick={this.handleSignup}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
