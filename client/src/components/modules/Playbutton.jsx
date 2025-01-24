import React from "react";
import "./Playbutton.css"

const PlayButton = ({ onClick }) => {
  return <button className="play-button" onClick={onClick}>Play Note</button>;
};

export default PlayButton;
