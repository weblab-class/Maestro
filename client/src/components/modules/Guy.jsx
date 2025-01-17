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

  return (
    <button className="guy-button tooltip" width="120" height="120">
      <span className="tooltiptext">{guy.guy_name + " by " + guy.creator_name} </span>
      <img
        className="guy-icon"
        src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${guy.asset_id}/512.webp`}
        onClick={props.onGuyClick(guy)}
        width="100"
        height="100"
      />
    </button>
  );
};

export default Guy;
