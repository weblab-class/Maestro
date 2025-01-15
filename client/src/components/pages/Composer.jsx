import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Composer.css";
import Guy from "../modules/Guy";
import Keyboard from "../modules/Keyboard";

const Composer = () => {
  const soundPath = "../../../src/assets/";

  const errorGuy = {
    key: "error",
    name: "error",
    sound: soundPath + "error.mp3",
    img: "https://fonts.gstatic.com/s/e/notoemoji/latest/2795/512.png",
    gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/2795/512.gif",
  };

  const keyboardKeys = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
  const defaultBinds = keyboardKeys.split("").map((key) => {
    return { key: key, guy: errorGuy };
  });

  const guyList = [
    {
      name: "monkey",
      key: "guy1",
      sound: soundPath + "monkey.mp3",
      img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f412/512.png",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f412/512.gif",
    },

    {
      name: "sheep",
      key: "guy2",
      sound: soundPath + "sheep.mp3",
      img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f410/512.png",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f410/512.gif",
    },
    {
      name: "dog",
      key: "guy3",
      sound: soundPath + "dog.mp3",
      img: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f415/512.png",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f415/512.gif",
    },
  ];

  const [buttonBinds, setButtonBinds] = useState(defaultBinds);
  const [selectedGuy, setSelectedGuy] = useState(null);

  const onButtonClick = (key) => {
    return () => {
      if (selectedGuy !== null) {
        setButtonBinds((prevBinds) => {
          return prevBinds.map((bind) =>
            bind.key === key && bind.guy.key === errorGuy.key
              ? { key: key, guy: selectedGuy }
              : bind
          );
        });
        setSelectedGuy(null);
      } else {
        var sound = new Audio(buttonBinds.find((button) => button.key === key).guy.sound);
        sound.play();
      }
    };
  };

  const onGuyClick = (guy) => {
    return () => {
      setSelectedGuy(guy);
    };
  };

  const handleKeyDown = (event) => {
    const pressedKey = event.key.toUpperCase();
    if (selectedGuy !== null) {
      setButtonBinds((prevBinds) => {
        return prevBinds.map((bind) =>
          bind.key === pressedKey && bind.guy.key === errorGuy.key
            ? { key: pressedKey, guy: selectedGuy }
            : bind
        );
      });
      setSelectedGuy(null);
    } else {
      const bind = buttonBinds.find((button) => button.key === pressedKey);
      if (bind && bind.guy && bind.guy.sound) {
        const sound = new Audio(bind.guy.sound);
        sound.play().catch((error) => {
          console.error("Playback failed:", error);
        });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      <Keyboard buttonBinds={buttonBinds} onButtonClick={onButtonClick} />
      <div>
        {guyList.map((guy) => {
          return <Guy key={guy.key} guy={guy} onGuyClick={onGuyClick} />;
        })}
      </div>
    </div>
  );
};

export default Composer;
