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
    event.target.setAttribute(
      "src",
      `https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.webp`
    );
  };
  const Unhover = (event) => {
    event.target.setAttribute(
      "src",
      `https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.png`
    );
  };

  return (
    <img
      className="guy-icon"
      src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.png`}
      onMouseOver={Hover}
      onMouseOut={Unhover}
      onClick={props.onGuyClick(guy)}
      weight="100"
      height="100"
    />
  );
};

export default Guy;
