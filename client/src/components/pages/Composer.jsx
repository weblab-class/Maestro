import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import "./Composer.css";
import { UserContext } from "../App";
import { useState, useEffect } from "react";
import react from "react";

import Guy from "../modules/Guy";
import Key from "../modules/Key";

const Composer = () => {
  const soundPath = "../../../";
  const imgPath = "../../../";
  const gifPath = "../../../";

  const errorGuy = {
    key: "error",
    name: "error",
    sound: soundPath + "error.mp3",
    img: imgPath + "error.svg",
    gif: gifPath + "error.gif",
  };

  const defaultBinds = [
    {
      key: "q",
      guy: errorGuy,
    },
    {
      key: "w",
      guy: errorGuy,
    },
    {
      key: "e",
      guy: errorGuy,
    },
  ];

  const guyList = [
    {
      name: "monkey",
      key: "guy1",
      sound: soundPath + "monkey.mp3",
      img: imgPath + "monkey.svg",
      gif: gifPath + "monkey.gif",
    },
    {
      name: "sheep",
      key: "guy2",
      sound: soundPath + "sheep.mp3",
      img: imgPath + "goat.svg",
      gif: gifPath + "sheep.gif",
    },
    {
      name: "dog",
      key: "guy3",
      sound: soundPath + "dog.mp3",
      img: imgPath + "dog.svg",
      gif: gifPath + "dog.gif",
    },
  ];

  const [buttonBinds, setButtonBinds] = useState(defaultBinds);
  const [selectedGuy, setSelectedGuy] = useState(null);

  // const onButtonClick = (key, guy) => {
  //   if (selectedGuy !== null) {
  //     let curlist = buttonBinds.filter((binds) => binds.key !== key);
  //     curlist.push({ key: key, guy: guy });
  //     setButtonBinds(curlist);
  //     const sound = new Audio(guy.sound);
  //     sound.play();
  //     setSelectedGuy(null);
  //   } else {
  //     var sound = new Audio(guy.sound);
  //     console.log("error");
  //     sound.play().catch((error) => {
  //       console.error("Playback failed:", error);
  //     });
  //   }
  // };

  const onGuyClick = (guy) => {
    return () => {
      setSelectedGuy(guy);
      console.log(selectedGuy);
    };
  };

  return (
    <div>
      <div>
        {buttonBinds.map((bind) => (
          <Key
            buttonKey={bind.key}
            key={bind.key}
            guy={bind.guy}
            onButtonClick={() => {
              console.log("Hello");
            }}
          />
        ))}
      </div>

      <div>
        {guyList.map((guy) => {
          return <Guy key={guy.key} guy={guy} onGuyClick={onGuyClick} />;
        })}
      </div>
    </div>
  );
};

export default Composer;
