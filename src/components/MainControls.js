import React from "react";

export default class MainControls extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayingChange = this.handlePlayingChange.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
  }

  handlePlayingChange() {
    if (this.props.playing) {
      this.props.onPlayingChange(false);
    } else {
      this.props.onPlayingChange(true);
    }
  }

  handleCurrentTimeChange(time) {
    this.props.onCurrentTimeChange(time);
  }

  render() {
    return (
      <div>
        <button
          className="btn"
          onClick={() => this.handleCurrentTimeChange(-10)}
        >
          -10
        </button>
        <button className="btn" onClick={this.handlePlayingChange}>
          {this.props.playing ? (
            <i className="fas fa-pause" />
          ) : (
            <i className="fas fa-play" />
          )}
        </button>
        <button
          className="btn"
          onClick={() => this.handleCurrentTimeChange(10)}
        >
          +10
        </button>
      </div>
    );
  }
}
