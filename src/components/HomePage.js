import React from "react";

import LinkInput from "./LinkInput";
import Player from "./Player";
import Notification from "./Notification";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      link: "",
      error: ""
    };
    this.handleErrorChange = this.handleErrorChange.bind(this);
  }
  passLinkProp(params) {
    this.setState({ link: params });
  }
  handleErrorChange(error) {
    this.setState({ error });
  }
  render() {
    return (
      <div>
        <div className="link-box">
          <h1>Media Player</h1>
          <LinkInput callback={this.passLinkProp.bind(this)} />
          <Notification error={this.state.error} />
        </div>
        <div>
          <Player
            link={this.state.link}
            onErrorChange={this.handleErrorChange}
          />
        </div>
      </div>
    );
  }
}
