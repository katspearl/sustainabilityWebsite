import React, { Component } from "react";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
import styles from "./login.module.css";
import Avacado2 from "./YUM2.png";

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
      error: false
    };
  }

  handleSignup = async () => {
    const signUpUsername = this.state.signUpUsername;
    const signUpPassword = this.state.signUpPassword;
    const pledge = this.state.pledge;
    if (!this.state.formVisible) {
      this.setState({ formVisible: true });
    } else {
      if (pledge != -1 && signUpPassword !== "" && signUpUsername !== "") {
        const res = await fetch(
          `http://localhost:5000/user/${
            this.state.signUpUsername
          }/${signUpPassword}/${pledge}`,
          {
            method: "POST"
          }
        );
        const accountMade = await res.json();
        console.log(accountMade);
        if (accountMade) {
          this.props.history.replace("/dashboard");
        } else {
          this.setState({ error: true });
        }
      }
    }
  };

  handleLogin = () => {};

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

    if (this.state.formVisible) {
      signupForm = (
        <div className={styles.signupForm}>
          {this.state.error ? errorMessage : null}
          <input
            type="text"
            id="uname"
            name="username"
            placeholder="username..."
            onChange={e => this.updateSignUpUsername(e)}
          />
          <input
            type="text"
            id="uname"
            name="username"
            placeholder="password..."
            onChange={e => this.updateSignUpPassword(e)}
          />
          <div
            data-index="0"
            onClick={e => this.setPledge(e)}
            className={[styles.pledgeCheck, styles.c1].join(" ")}
          >
            Eat more plant-based meals.
          </div>
          <div
            data-index="1"
            onClick={e => this.setPledge(e)}
            className={[styles.pledgeCheck, styles.c2].join(" ")}
          >
            Use more alternative transportation.
          </div>
          <div
            data-index="2"
            onClick={e => this.setPledge(e)}
            className={[styles.pledgeCheck, styles.c3].join(" ")}
          >
            Replace disposable items with reusables.
          </div>
        </div>
      );
    }

    return (
      <div className={styles.loginWrapper}>
        <div className={styles.left}>
          <img src={Avacado2} alt="asdfasdf" />
        </div>

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
              type="text"
              id="pass"
              name="password"
              placeholder="password..."
              onChange={e => this.updateLoginPassword(e)}
            />
            <div className={styles.loginBtn}>Log in</div>
          </div>

          <h2>s u s t a i n a b i l i t y</h2>
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

{
  /* <div className={styles.loginWrapper}>
        <form onSubmit={this.handleSubmit} className={styles.login}>
          <h1>Sign Up!</h1>
          <FormControl
            placeholder="username"
            className={styles.form}
            type="username"
            inputRef={ref => (this.usernameField = ref)}
          />
          <FormControl
            placeholder="password"
            className={styles.form}
            type="password"
            inputRef={ref => (this.passwordField = ref)}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </div> */
}

export default Login;
