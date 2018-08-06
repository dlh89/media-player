import React from "react";
import ArrayFrom from "array.from";

export default class PlaybackRateControls extends React.Component {
  constructor(props) {
    super(props);

    this.playbackRateControls = React.createRef();

    this.togglePlaybackRateControls = this.togglePlaybackRateControls.bind(
      this
    );
    this.handlePlaybackRateChange = this.handlePlaybackRateChange.bind(this);
  }

  togglePlaybackRateControls() {
    if (
      this.playbackRateControls.current.style.maxHeight &&
      this.playbackRateControls.current.style.maxHeight !== "0px"
    ) {
      this.playbackRateControls.current.style.maxHeight = 0;
    } else {
      const buttonCount = document.querySelectorAll(
        ".player__playback-rate-btn"
      ).length;
      this.playbackRateControls.current.style.maxHeight = `${document.querySelector(
        ".player__playback-rate-btn"
      ).scrollHeight *
        buttonCount -
        1}px`;
    }
  }

  handlePlaybackRateChange(e) {
    this.props.onPlaybackRateChange(e.target.value);
    this.togglePlaybackRateControls();

    // remove the active class from any other buttons and add to the one clicked
    const activeButtons = ArrayFrom(
      document.querySelectorAll(".player__playback-rate-btn--active")
    );
    activeButtons.forEach(button => {
      button.classList.remove("player__playback-rate-btn--active");
    });
    e.target.classList.add("player__playback-rate-btn--active");
  }

  render() {
    return (
      <div className="player__playback-rate">
        <button
          className="player__playback-rate-btn player__playback-rate-btn--primary"
          onClick={this.togglePlaybackRateControls}
        >
          {this.props.playbackRate}x
        </button>
        <div
          className="player__playback-rate-controls"
          ref={this.playbackRateControls}
        >
          <button
            className="player__playback-rate-btn"
            value="0.25"
            onClick={this.handlePlaybackRateChange}
          >
            0.25x
          </button>
          <button
            className="player__playback-rate-btn"
            value="0.5"
            onClick={this.handlePlaybackRateChange}
          >
            0.5x
          </button>
          <button
            className="player__playback-rate-btn"
            value="0.75"
            onClick={this.handlePlaybackRateChange}
          >
            0.75x
          </button>
          <button
            className="player__playback-rate-btn player__playback-rate-btn--active"
            value="1"
            onClick={this.handlePlaybackRateChange}
          >
            1x
          </button>
          <button
            className="player__playback-rate-btn"
            value="1.25"
            onClick={this.handlePlaybackRateChange}
          >
            1.25x
          </button>
          <button
            className="player__playback-rate-btn"
            value="1.5"
            onClick={this.handlePlaybackRateChange}
          >
            1.5x
          </button>
          <button
            className="player__playback-rate-btn"
            value="2"
            onClick={this.handlePlaybackRateChange}
          >
            2x
          </button>
        </div>
      </div>
    );
  }
}
