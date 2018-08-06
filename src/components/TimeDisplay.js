import React from "react";

const TimeDisplay = props => (
  <div className="btn" className="player__time">
    <p>
      {props.currentTime} / {props.duration}
    </p>
  </div>
);

export default TimeDisplay;
