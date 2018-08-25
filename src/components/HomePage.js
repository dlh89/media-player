import React from "react";

import LinkInput from "./LinkInput";
import Player from "./Player";
import Notification from "./Notification";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      link: "",
      error: "",
      playerOpen: false
    };
    this.handleErrorChange = this.handleErrorChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
  }
  componentDidMount() {
    let localState = "";

    if (localStorage.homePageState) {
      localState = JSON.parse(localStorage.homePageState);
    }
    // Get initial state from localStorage if it exists
    console.log(localState);
    if (localState !== "undefined") {
      this.setState({ ...localState });
    }
  }
  componentWillUnmount() {
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    localStorage.setItem("homePageState", JSON.stringify(this.state));
  }
  passLinkProp(params) {
    this.setState({ link: params, playerOpen: true }, this.saveToLocalStorage);
  }
  handleErrorChange(error) {
    this.setState({ error }, this.saveToLocalStorage);
  }
  handleClose() {
    this.setState({ playerOpen: false }, this.saveToLocalStorage);
  }
  render() {
    return (
      <div>
        <div className="link-box">
          <h1>Media Player</h1>
          <LinkInput callback={this.passLinkProp.bind(this)} />
          <Notification error={this.state.error} />
        </div>
        {this.state.playerOpen && (
          <Player
            link={this.state.link}
            onErrorChange={this.handleErrorChange}
            onClose={this.handleClose}
          />
        )}
      </div>
    );
  }
}
