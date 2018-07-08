import React from "react";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleSkipBackward = this.handleSkipBackward.bind(this);
    this.handleSkipForward = this.handleSkipForward.bind(this);
  }
  handlePlayPause() {
    if (this.refs.player.error) {
      console.log(this.refs.player.error.message);
    }
    if (this.refs.player.paused) {
      this.refs.player.play();
    } else {
      this.refs.player.pause();
    }
  }
  handleSkipBackward() {
    this.refs.player.currentTime -= 10;
  }
  handleSkipForward() {
    this.refs.player.currentTime += 10;
  }
  render() {
    return (
      <div>
        <audio ref="player" controls autoPlay src={this.props.link} />
        <button onClick={this.handleSkipBackward}>-10</button>
        <button onClick={this.handlePlayPause}>Play/Pause</button>
        <button onClick={this.handleSkipForward}>+10</button>
      </div>
    );
  }
}
