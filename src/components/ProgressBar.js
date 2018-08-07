import React from "react";
import moment from "moment";

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    // refs
    this.progressContainer = React.createRef();
    this.progressBar = React.createRef();

    this.handleProgressChange = this.handleProgressChange.bind(this);
    this.updateProgressBar = this.updateProgressBar.bind(this);
  }

  componentWillReceiveProps() {
    // update the progress bar based on props
    this.updateProgressBar();
  }

  updateProgressBar() {
    // convert currentTime and duration from H:mm:ss to seconds
    const currentTimeSeconds = moment
      .duration(this.props.currentTime)
      .asSeconds();
    const durationSeconds = moment.duration(this.props.duration).asSeconds();
    // multiply progressContainer width by decimal of progress
    this.progressBar.current.style.width = `${this.progressContainer.current
      .offsetWidth *
      (currentTimeSeconds / durationSeconds)}px`;
  }

  handleProgressChange(e) {
    if (this.props.canPlay) {
      const progress =
        e.nativeEvent.offsetX / this.progressContainer.current.offsetWidth;
      this.progressBar.current.style.width = `${e.nativeEvent.offsetX}px`;
      this.props.onProgressChange(progress);
    }
  }

  render() {
    return (
      <div
        ref={this.progressContainer}
        className="player__progress-container"
        onClick={this.handleProgressChange}
      >
        <div ref={this.progressBar} className="player__progress-bar" />
      </div>
    );
  }
}
