import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./Composer.css";
import Guy from "../modules/Guy";
import Keyboard from "../modules/Keyboard";
import guyIds from "../../assets/guyIds";

const Composer = () => {
  const soundPath = "../../../src/assets/";

  const defaultGuy = {
    guy_name: "default_guy",
    guy_id: "default",
    asset_id: "2795",
    creator_name: "Smelvin",
    description: "Default guy",
    sound: soundPath + "default.mp3",
  };

  const keyboardKeys = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
  const defaultBinds = keyboardKeys.split("").map((key) => {
    return { key: key, guy: defaultGuy };
  });

  const guyList = [
    {
      guy_name: "monkey_guy",
      guy_id: "monkey",
      asset_id: "1f412",
      creator_name: "Smelvin",
      description: "Monkey guy",
      sound: soundPath + "monkey.mp3",
    },

    {
      guy_name: "goat_guy",
      guy_id: "goat",
      asset_id: "1f410",
      creator_name: "Smelvin",
      description: "Goat guy",
      sound: soundPath + "goat.mp3",
    },
    {
      guy_name: "dog_guy",
      guy_id: "dog",
      asset_id: "1f415",
      creator_name: "Smelvin",
      description: "Dog guy",
      sound: soundPath + "dog.mp3",
    },
  ];

  const [buttonBinds, setButtonBinds] = useState(defaultBinds);
  const [selectedGuy, setSelectedGuy] = useState(null);
  const [guyVisibility, setGuyVisibility] = useState(false);

  const onButtonClick = (key) => {
    return () => {
      if (selectedGuy !== null) {
        setButtonBinds((prevBinds) => {
          return prevBinds.map((bind) =>
            bind.key === key && bind.guy.key === defaultGuy.key
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

  const onCaps = () => {
    setGuyVisibility(!guyVisibility);
  };

  const specialKeys = {
    "CapsLock": onCaps,
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

    if (/[a-z]/.test(inputKey)) {
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

    let keyPass = keyboardKeys.includes(pressedKey) || specialKeys.hasOwnProperty(pressedKey);
    const isShiftPressed = event.shiftKey;

    if (event.key in specialKeys) {
      specialKeys[event.key]();
    }

    if (selectedGuy !== null && keyPass) {
      console.log("Passed");
      setButtonBinds((prevBinds) => {
        return prevBinds.map((bind) =>
          bind.key === pressedKey ? { key: pressedKey, guy: selectedGuy } : bind
        );
      });
      if (!isShiftPressed) {
        setSelectedGuy(null);
      }
    } else if (keyPass) {
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
      <Keyboard buttonBinds={buttonBinds} onButtonClick={onButtonClick} guyVis={guyVisibility} />
      <div>
        {guyList.map((guy) => {
          return <Guy key={guy.guy_id} guy={guy} onGuyClick={onGuyClick} />;
        })}
      </div>
    </div>
  );
};

export default Composer;
