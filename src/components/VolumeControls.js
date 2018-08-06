import React from "react";

export default class VolumeControls extends React.Component {
  constructor(props) {
    super(props);

    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleMutedChange = this.handleMutedChange.bind(this);
  }

  handleVolumeChange(e) {
    this.props.onVolumeChange(e.target.value);
  }

  handleMutedChange() {
    this.props.onMutedChange(!this.props.muted);
  }

  render() {
    return (
      <div className="player__volume-controls">
        <button className="btn" onClick={this.handleMutedChange}>
          {this.props.muted ? (
            <i className="fas fa-volume-off" />
          ) : (
            <i className="fas fa-volume-up" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={this.props.volume}
          onChange={this.handleVolumeChange}
          className="player__volume-slider"
        />
      </div>
    );
  }
}
