import React from "react";
import moment from "moment";
import ArrayFrom from "array.from";

import TimeDisplay from "./TimeDisplay";

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    // refs
    this.player = React.createRef();
    this.progressContainer = React.createRef();
    this.progressBar = React.createRef();
    this.playbackRateControls = React.createRef();

    this.state = {
      volume: 100,
      prevVolume: "",
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
    this.progressContainer.current.addEventListener(
      "mousedown",
      () => (mousedown = true)
    );
    this.progressContainer.current.addEventListener(
      "mouseup",
      () => (mousedown = false)
    );
    this.progressContainer.current.addEventListener(
      "mouseleave",
      () => (mousedown = false)
    );
    this.progressContainer.current.addEventListener("mousemove", e => {
      mousedown && this.handleProgressChange(e);
    });
    this.progressContainer.current.addEventListener(
      "click",
      this.handleProgressChange
    );
    this.player.current.addEventListener("timeupdate", this.handleProgress);
  }
  componentWillReceiveProps() {
    this.player.current.addEventListener("canplay", this.canPlay);
    this.player.current.addEventListener("error", this.linkError);
  }
  linkError() {
    alert("There was an error loading the URL you provided.");
  }
  canPlay() {
    if (this.player.current.duration) {
      this.setState({
        duration: moment()
          .startOf("day")
          .seconds(this.player.current.duration)
          .format("H:mm:ss")
      });
    }
  }
  handleProgress() {
    this.setState({
      currentTime: moment()
        .startOf("day")
        .seconds(this.player.current.currentTime)
        .format("H:mm:ss")
    });
    const progress =
      this.player.current.currentTime / this.player.current.duration;
    this.progressBar.current.style.width = `${this.progressContainer.current
      .offsetWidth * progress}px`;
    if (!this.player.current.paused && !this.state.playing) {
      this.setState({ playing: true });
    }
  }
  handleProgressChange(e) {
    const progress = e.offsetX / this.progressContainer.current.offsetWidth;
    this.player.current.currentTime = this.player.current.duration * progress;
    this.progressBar.current.style.width = `${e.offsetX}px`;
  }
  handlePlayPause() {
    if (this.player.current.error) {
      console.log(this.player.current.error.message);
    }
    if (this.player.current.paused) {
      this.player.current.play();
      this.setState({ playing: true });
    } else {
      this.player.current.pause();
      this.setState({ playing: false });
    }
  }
  handleSkipBackward() {
    this.player.current.currentTime -= 10;
  }
  handleSkipForward() {
    this.player.current.currentTime += 10;
  }
  handleMuteUnmute() {
    if (this.player.current.muted) {
      this.player.current.muted = false;
      this.setState(
        { muted: false, volume: this.state.prevVolume },
        () => (this.player.current.volume = this.state.volume / 100)
      );
    } else {
      this.player.current.volume = 0;
      this.player.current.muted = true;
      this.setState(prevState => {
        return { muted: true, volume: 0, prevVolume: prevState.volume };
      });
    }
  }
  handleVolumeChange(e) {
    this.setState(
      {
        volume: e.target.value
      },
      () => {
        if (this.state.volume === "0") {
          this.setState({ muted: true });
          this.player.current.muted = true;
        } else {
          this.setState({ muted: false });
          this.player.current.muted = false;
        }
      }
    );

    this.player.current.volume = e.target.value / 100;
  }
  handlePlaybackRateChange(e) {
    this.setState({
      playbackRate: e.target.value
    });
    this.player.current.playbackRate = e.target.value;

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
  render() {
    return (
      <div className="player">
        <div
          ref={this.progressContainer}
          className="player__progress-container"
        >
          <div ref={this.progressBar} className="player__progress-bar" />
        </div>
        <audio ref={this.player} autoPlay src={this.props.link} />
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
          <TimeDisplay
            currentTime={this.state.currentTime}
            duration={this.state.duration}
          />
          <div className="player__playback-rate">
            <button
              className="player__playback-rate-btn player__playback-rate-btn--primary"
              onClick={this.togglePlaybackRateControls}
            >
              {this.state.playbackRate}x
            </button>
            <div
              ref={this.playbackRateControls}
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
