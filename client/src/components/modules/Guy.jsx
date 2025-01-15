import React, { useState, useEffect, useContext } from "react";
import { get } from "../../utilities";
import "./Guy.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} guy
 */
const Guy = (props) => {
  const guy = props.guy;

  const Hover = (event) => {
    event.target.setAttribute("src", guy.gif);
  };
  const Unhover = (event) => {
    event.target.setAttribute("src", guy.img);
  };

  return (
    <img
      src={guy.img}
      onMouseOver={Hover}
      onMouseOut={Unhover}
      onClick={props.onGuyClick(guy)}
      weight="100"
      height="100"
    />
  );
};

export default Guy;
