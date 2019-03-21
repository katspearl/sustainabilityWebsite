import React, { Component } from "react";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
import { FormControl, Button } from "react-bootstrap";
import styles from "./login.module.css";
import Avacado from "./avacado.jpg";
import Avacado2 from "./YUM2.png";

class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      formVisible: false,
    };
  }

  handleSignup = () => {
    this.setState({ formVisible: true });
  };

  handleLogin = () => {};

  render() {

    let signupForm = null;
    
    if (this.state.formVisible) {
      signupForm = (<div className={styles.signupForm}>
        <input type="text" id="uname" name="username" placeholder="username..." /> 
        <input type="text" id="uname" name="username" placeholder="password..." /> 
        <div className={[styles.pledgeCheck, styles.c1].join(' ')}>Eat more plant-based meals.</div>
        <div className={[styles.pledgeCheck, styles.c2].join(' ')}>Use more alternative transportation.</div>
        <div className={[styles.pledgeCheck, styles.c3].join(' ')}>Replace disposable items with reusables.</div>
      </div>);
    }
    
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.left}>
          <img src={Avacado2} alt="asdfasdf"/>
        </div>

        <div className={styles.right}>
          <div className={styles.loginForm}>
            <input type="text" id="uname" name="username" placeholder="username..." /> 
            <input type="text" id="pass" name="password" placeholder="password..." />  
            <div className={styles.loginBtn} >Log in</div>
          </div>

          <h2>s u s t a i n a b i l i t y</h2>
          <div className={(this.state.formVisible ? styles.signupWrapper : "")}>
            {signupForm}
            <div className={styles.signupBtn} onClick={this.handleSignup}>Sign Up</div>
          </div>
        </div>
      </div>
    );
  }
}

{/* <div className={styles.loginWrapper}>
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
      </div> */}

export default Login;
