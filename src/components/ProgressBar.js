import React from "react";

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    // refs
    this.progressContainer = React.createRef();
    this.progressBar = React.createRef();

    this.handleProgressChange = this.handleProgressChange.bind(this);
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
