import React from "react";
import moment from "moment";

import MainControls from "./MainControls";
import TimeDisplay from "./TimeDisplay";
import PlaybackRateControls from "./PlaybackRateControls";
import VolumeControls from "./VolumeControls";
import ProgressBar from "./ProgressBar";

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    // refs
    this.player = React.createRef();

    this.state = {
      volume: 100,
      prevVolume: "",
      playbackRate: 1,
      currentTime: "",
      duration: "",
      playing: false,
      muted: false,
      canPlay: false
    };

    this.handlePlayingChange = this.handlePlayingChange.bind(this);
    this.handleCurrentTimeChange = this.handleCurrentTimeChange.bind(this);
    this.handlePlaybackRateChange = this.handlePlaybackRateChange.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.handleMutedChange = this.handleMutedChange.bind(this);

    this.handleProgressChange = this.handleProgressChange.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.canPlay = this.canPlay.bind(this);
    this.linkError = this.linkError.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    this.player.current.addEventListener("timeupdate", this.handleProgress);
    this.player.current.addEventListener("canplay", this.canPlay);
    this.player.current.addEventListener("error", this.linkError);
  }

  linkError() {
    this.props.onErrorChange(
      "There was an error loading the URL provided. Please check the URL and try again."
    );
  }

  canPlay() {
    console.log("canplay");
    if (this.player.current.duration) {
      this.setState({
        duration: moment()
          .startOf("day")
          .seconds(this.player.current.duration)
          .format("H:mm:ss"),
        canPlay: true
      });
    }
    // call the callback function to clear error in parent state
    this.props.onErrorChange("");
  }

  handleProgress() {
    this.setState({
      currentTime: moment()
        .startOf("day")
        .seconds(this.player.current.currentTime)
        .format("H:mm:ss")
    });
    if (!this.player.current.paused && !this.state.playing) {
      this.setState({ playing: true });
    }
  }

  handleProgressChange(progress) {
    this.player.current.currentTime = this.player.current.duration * progress;
  }

  handleVolumeChange(volume) {
    this.setState(
      {
        volume
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
    this.player.current.volume = volume / 100;
  }

  handleMutedChange(muted) {
    if (muted) {
      this.setState(prevState => {
        return { muted: true, volume: 0, prevVolume: prevState.volume };
      });
    } else {
      this.setState(
        { muted: false, volume: this.state.prevVolume },
        () => (this.player.current.volume = this.state.volume / 100)
      );
    }

    this.player.current.muted = muted;
  }

  handlePlaybackRateChange(playbackRate) {
    this.setState({ playbackRate });
    this.player.current.playbackRate = playbackRate;
  }

  handlePlayingChange(playing) {
    this.setState(
      { playing },
      () =>
        this.state.playing
          ? this.player.current.play()
          : this.player.current.pause()
    );
  }

  handleCurrentTimeChange(time) {
    this.player.current.currentTime += time;
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    return (
      <div className="player">
        <ProgressBar
          currentTime={this.state.currentTime}
          duration={this.state.duration}
          onProgressChange={this.handleProgressChange}
          canPlay={this.state.canPlay}
        />

        <audio ref={this.player} autoPlay src={this.props.link} />

        <div className="player__controls-container">
          <MainControls
            playing={this.state.playing}
            onPlayingChange={this.handlePlayingChange}
            onCurrentTimeChange={this.handleCurrentTimeChange}
          />

          <TimeDisplay
            currentTime={this.state.currentTime}
            duration={this.state.duration}
          />

          <PlaybackRateControls
            playbackRate={this.state.playbackRate}
            onPlaybackRateChange={this.handlePlaybackRateChange}
          />

          <VolumeControls
            volume={this.state.volume}
            muted={this.state.muted}
            onVolumeChange={this.handleVolumeChange}
            onMutedChange={this.handleMutedChange}
          />

          <a href={this.props.link} download target="_blank">
            <i className="fas fa-download" />
          </a>
          <button className="player__close" onClick={this.handleClose}>
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
    );
  }
}
