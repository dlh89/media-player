import React from "react";
import moment from "moment";
import ArrayFrom from "array.from";

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: 100,
      playbackRate: 1,
      currentTime: "",
      duration: "",
      playing: false,
      muted: false
    };

    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleSkipBackward = this.handleSkipBackward.bind(this);
    this.handleSkipForward = this.handleSkipForward.bind(this);
    this.handleMuteUnmute = this.handleMuteUnmute.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handlePlaybackRateChange = this.handlePlaybackRateChange.bind(this);
    this.handleProgressChange = this.handleProgressChange.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.canPlay = this.canPlay.bind(this);
    this.togglePlaybackRateControls = this.togglePlaybackRateControls.bind(
      this
    );
  }
  componentDidMount() {
    let mousedown = false;
    this.refs.progressContainer.addEventListener(
      "mousedown",
      () => (mousedown = true)
    );
    this.refs.progressContainer.addEventListener(
      "mouseup",
      () => (mousedown = false)
    );
    this.refs.progressContainer.addEventListener(
      "mouseleave",
      () => (mousedown = false)
    );
    this.refs.progressContainer.addEventListener("mousemove", e => {
      mousedown && this.handleProgressChange(e);
    });
    this.refs.progressContainer.addEventListener(
      "click",
      this.handleProgressChange
    );
    this.refs.player.addEventListener("timeupdate", this.handleProgress);
  }
  componentWillReceiveProps() {
    this.refs.player.addEventListener("canplay", this.canPlay);
    this.refs.player.addEventListener("error", this.linkError);
  }
  linkError() {
    alert("There was an error loading the URL you provided.");
  }
  canPlay() {
    if (this.refs.player.duration) {
      this.setState({
        duration: moment()
          .startOf("day")
          .seconds(this.refs.player.duration)
          .format("H:mm:ss")
      });
    }
  }
  handleProgress() {
    this.setState({
      currentTime: moment()
        .startOf("day")
        .seconds(this.refs.player.currentTime)
        .format("H:mm:ss")
    });
    const progress = this.refs.player.currentTime / this.refs.player.duration;
    this.refs.progressBar.style.width = `${this.refs.progressContainer
      .offsetWidth * progress}px`;
    if (!this.refs.player.paused && !this.state.playing) {
      this.setState({ playing: true });
    }
  }
  handleProgressChange(e) {
    const progress = e.offsetX / this.refs.progressContainer.offsetWidth;
    this.refs.player.currentTime = this.refs.player.duration * progress;
    this.refs.progressBar.style.width = `${e.offsetX}px`;
  }
  handlePlayPause() {
    if (this.refs.player.error) {
      console.log(this.refs.player.error.message);
    }
    if (this.refs.player.paused) {
      this.refs.player.play();
      this.setState({ playing: true });
    } else {
      this.refs.player.pause();
      this.setState({ playing: false });
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
      this.setState({ muted: false });
    } else {
      this.refs.player.volume = 0;
      this.refs.player.muted = true;
      this.setState({ muted: true });
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

    // remove the active class from any other buttons and add to the one clicked
    const activeButtons = ArrayFrom(
      document.querySelectorAll(".player__playback-rate-btn--active")
    );
    activeButtons.forEach(button => {
      button.classList.remove("player__playback-rate-btn--active");
    });
    e.target.classList.add("player__playback-rate-btn--active");

    this.togglePlaybackRateControls();
  }
  togglePlaybackRateControls() {
    if (
      this.refs.playbackRateControls.style.maxHeight &&
      this.refs.playbackRateControls.style.maxHeight !== "0px"
    ) {
      this.refs.playbackRateControls.style.maxHeight = 0;
    } else {
      const buttonCount = document.querySelectorAll(
        ".player__playback-rate-btn"
      ).length;
      this.refs.playbackRateControls.style.maxHeight = `${document.querySelector(
        ".player__playback-rate-btn"
      ).scrollHeight *
        buttonCount -
        1}px`;
    }
  }
  render() {
    return (
      <div className="player">
        <div ref="progressContainer" className="player__progress-container">
          <div ref="progressBar" className="player__progress-bar" />
        </div>
        <audio ref="player" autoPlay src={this.props.link} />
        <div className="player__controls-container">
          <div>
            <button className="btn" onClick={this.handleSkipBackward}>
              -10
            </button>
            <button className="btn" onClick={this.handlePlayPause}>
              {this.state.playing ? (
                <i className="fas fa-pause" />
              ) : (
                <i className="fas fa-play" />
              )}
            </button>
            <button className="btn" onClick={this.handleSkipForward}>
              +10
            </button>
          </div>
          <div className="btn" className="player__time">
            <p>
              {this.state.currentTime} / {this.state.duration}
            </p>
          </div>
          <div className="player__playback-rate">
            <button
              className="player__playback-rate-btn player__playback-rate-btn--primary"
              onClick={this.togglePlaybackRateControls}
            >
              {this.state.playbackRate}x
            </button>
            <div
              ref="playbackRateControls"
              className="player__playback-rate-controls"
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
          <div className="player__volume-controls">
            <button className="btn" onClick={this.handleMuteUnmute}>
              {this.state.muted ? (
                <i className="fas fa-volume-off" />
              ) : (
                <i className="fas fa-volume-up" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={this.state.volume}
              onChange={this.handleVolumeChange}
              className="player__volume-slider"
            />
          </div>
          <a href={this.props.link} download target="_blank">
            <i className="fas fa-download" />
          </a>
        </div>
      </div>
    );
  }
}
