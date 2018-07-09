import React from "react";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 100,
      playbackRate: 1
    };

    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleSkipBackward = this.handleSkipBackward.bind(this);
    this.handleSkipForward = this.handleSkipForward.bind(this);
    this.handleMuteUnmute = this.handleMuteUnmute.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlaybackRateChange = this.handlePlaybackRateChange.bind(this);
    this.handleProgressChange = this.handleProgressChange.bind(this);
  }
  componentDidMount() {
    this.refs.progressContainer.addEventListener(
      "click",
      this.handleProgressChange
    );
  }
  handleProgressChange(e) {
    const progress = e.offsetX / e.target.clientWidth;
    console.log(`Progress: ${progress * 100}%`);
    this.refs.player.currentTime = this.refs.player.duration * progress;
    this.refs.progressBar.style.width = `${e.offsetX}px`;
  }
  handlePlayPause() {
    console.log(this.refs);

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
  handleMuteUnmute() {
    if (this.refs.player.muted) {
      this.refs.player.volume = this.state.volume / 100;
      this.refs.player.muted = false;
    } else {
      this.refs.player.volume = 0;
      this.refs.player.muted = true;
    }
  }
  handleVolumeChange(e) {
    this.setState({
      volume: e.target.value
    });
    this.refs.player.volume = e.target.value / 100;
  }
  handlePlaybackRateChange(e) {
    this.setState({
      playbackRate: e.target.value
    });
    this.refs.player.playbackRate = e.target.value;
  }
  render() {
    return (
      <div className="player">
        <div ref="progressContainer" className="player__progress-container">
          <div ref="progressBar" className="player__progress-bar" />
        </div>
        <audio ref="player" autoPlay src={this.props.link} />
        <div className="player__general-controls">
          <button onClick={this.handleSkipBackward}>-10</button>
          <button onClick={this.handlePlayPause}>Play/Pause</button>
          <button onClick={this.handleSkipForward}>+10</button>
          <div className="player__playback-rate">
            <button>{this.state.playbackRate}x</button>
            <div className="player__playback-rate-dropdown">
              <button value="0.25" onClick={this.handlePlaybackRateChange}>
                0.25x
              </button>
              <button value="0.5" onClick={this.handlePlaybackRateChange}>
                0.5x
              </button>
              <button value="0.75" onClick={this.handlePlaybackRateChange}>
                0.75x
              </button>
              <button value="1" onClick={this.handlePlaybackRateChange}>
                1x
              </button>
              <button value="1.25" onClick={this.handlePlaybackRateChange}>
                1.25x
              </button>
              <button value="1.5" onClick={this.handlePlaybackRateChange}>
                1.5x
              </button>
              <button value="2" onClick={this.handlePlaybackRateChange}>
                2x
              </button>
            </div>
          </div>
        </div>
        <div className="player__volume-controls">
          <button onClick={this.handleMuteUnmute}>Mute/Unmute</button>
          <input
            type="range"
            min="0"
            max="100"
            value={this.state.volume}
            onChange={this.handleVolumeChange}
            className="volume-slider"
          />
        </div>
        <a href={this.props.link} download target="_blank">
          Download
        </a>
      </div>
    );
  }
}
