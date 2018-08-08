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
  }
  passLinkProp(params) {
    this.setState({ link: params, playerOpen: true });
  }
  handleErrorChange(error) {
    this.setState({ error });
  }
  handleClose() {
    this.setState({ playerOpen: false });
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
