import React, { Component } from "react";

class Checkbox extends Component {
  state = {};
  render() {
    return (
      <div>
        <input
          onClick={this.checkBox(8)}
          type="checkbox"
          name="vehicle1"
          value="Bike"
        />
        &nbsp; Cook one meal for yourself (
        <a href="https://www.favfamilyrecipes.com/easy-college-recipes-for-college-students/">
          link
        </a>
        ).
      </div>
    );
  }
}

export default Checkbox;
