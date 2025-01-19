import React, { useState, useEffect, useContext } from "react";
import "../../utilities.css";
import "./Composer.css";
import Keyboard from "../modules/Keyboard";
import GuyList from "../modules/GuyList";
import { GuyContext } from "../App";

const Composer = () => {
  const { guyVisibility, setGuyVisibility } = useContext(GuyContext);

  const keyboardKeys = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";

  const defaultBinds = keyboardKeys.split("").map((key) => {
    return {
      key: key,
      guy: {
        guy_name: "default_guy",
        _id: "default",
        asset_id: "2795",
        creator_id: "Smelvin",
        sound: "../../../src/assets/default.mp3",
      },
    };
  });

  const [buttonBinds, setButtonBinds] = useState(defaultBinds);
  const [selectedGuy, setSelectedGuy] = useState(null);

  const onButtonClick = (key) => {
    return () => {
      if (selectedGuy !== null) {
        setButtonBinds((prevBinds) => {
          return prevBinds.map((bind) =>
            bind.key === key ? { key: key, guy: selectedGuy } : bind
          );
        });
        setSelectedGuy(null);
      } else {
        const sound = buttonBinds.find((bind) => bind.key === key).guy.sound;
        console.log(sound);
        var audio = new Audio(sound);
        audio.play();
      }
    };
  };

  const onGuyClick = (guy) => {
    return () => {
      setSelectedGuy(guy);
    };
  };

  function convertKey(inputKey) {
    const shiftedKeys = {
      "!": "1",
      "@": "2",
      "#": "3",
      "$": "4",
      "%": "5",
      "^": "6",
      "&": "7",
      "*": "8",
      "(": "9",
      ")": "0",
    };

    if (/[a-z]/.test(inputKey) && inputKey.length === 1) {
      // Convert lowercase letters to uppercase
      return inputKey.toUpperCase();
    } else if (/[0-9]/.test(inputKey)) {
      // Return number as is
      return inputKey;
    } else if (shiftedKeys[inputKey]) {
      // If it's a shifted character, map it to the corresponding number
      return shiftedKeys[inputKey];
    }
    return inputKey; // Return any other character unchanged
  }

  const handleKeyDown = (event) => {
    const pressedKey = convertKey(event.key);
    const selectedGuy_temp = selectedGuy;

    if (keyboardKeys.includes(pressedKey) && !event.ctrlKey) {
      document.getElementById(pressedKey).click();
    }

    if (event.ctrlKey && "12345678".includes(pressedKey)) {
      document.getElementsByClassName("guy-icon")[pressedKey - 1].click();
    }

    if (event.shiftKey) {
      setSelectedGuy(selectedGuy_temp);
    }

    if (pressedKey === "CapsLock") {
      setGuyVisibility(!guyVisibility);
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
      <GuyList onGuyClick={onGuyClick} selectedGuy={selectedGuy} />
    </div>
  );
};

export default Composer;
