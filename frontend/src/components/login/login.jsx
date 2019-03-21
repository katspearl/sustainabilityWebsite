import React, { Component } from "react";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
import { FormControl, Button } from "react-bootstrap";
import styles from "./login.module.css";
class Login extends Component {
  state = {};
  usernameField;
  passwordField;

  handleSignup = () => {};

  handleLogin = () => {};

  render() {
    return (
      <div className={styles.loginWrapper}>
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
      </div>
    );
  }
}

export default Login;
