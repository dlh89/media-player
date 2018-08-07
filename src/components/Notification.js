import React from "react";

const Notification = props =>
  props.error && <div className="notification">{props.error}</div>;

export default Notification;
