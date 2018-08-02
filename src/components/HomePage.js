import React from "react";
import LinkInput from "./LinkInput";

import Player from "./Player";

export default class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      link: ""
    };
  }
  passLinkProp(params) {
    this.setState({ link: params });
  }
  render() {
    return (
      <div>
        <div className="link-box">
          <h1>Media Player</h1>
          <LinkInput callback={this.passLinkProp.bind(this)} />
        </div>
        <div>
          <Player link={this.state.link} />
        </div>
      </div>
    );
  }
}
