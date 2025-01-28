import React, { useState, useEffect, useContext, useRef } from "react";
import "../../utilities.css";
import "./Composer.css";
import Keyboard from "../modules/Keyboard";
import GuyList from "../modules/GuyList";
import { get } from "../../utilities";

const Composer = () => {
  const [guyVisibility, setGuyVisibility] = useState(false);

  const keyboardKeys = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
  const [buttonBinds, setButtonBinds] = useState([]);
  const [selectedGuy, setSelectedGuy] = useState(null);

  // Fetch random guys on first render and assign them to the keyboard keys
  useEffect(() => {
    // Fetch random guys when component mounts
    get("/api/randomGuysGet")
      .then((randomGuys) => {
        // Ensure the number of guys is always enough for the keys by repeating the list if necessary
        const extendedGuys = [];
        for (let i = 0; i < keyboardKeys.length; i++) {
          extendedGuys.push(randomGuys[i % randomGuys.length]); // Use modulus to loop through randomGuys
        }

        const defaultBinds = keyboardKeys.split("").map((key, index) => {
          return {
            key: key,
            guy: extendedGuys[index], // Assign a guy (repeated or not) to the key
          };
        });

        setButtonBinds(defaultBinds); // Update state with the new button binds
      })
      .catch((error) => {
        console.error("Error fetching random guys:", error);
      });
  }, []); // Empty dependency array ensures this runs only once, on component mount

  const onButtonClick = (key, fmSynth) => {
    if (selectedGuy !== null) {
      setButtonBinds((prevBinds) => {
        return prevBinds.map((bind) => (bind.key === key ? { key: key, guy: selectedGuy } : bind));
      });
      setSelectedGuy(null);
    } else {
      const sound = buttonBinds.find((bind) => bind.key === key).guy.sound;
      if (typeof sound === "string") {
        var audio = new Audio(sound);
        audio.play();
      } else {
        fmSynth.triggerAttackRelease(sound.note, "2n");
      }
    }
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
      return inputKey.toUpperCase();
    } else if (/[0-9]/.test(inputKey)) {
      return inputKey;
    } else if (shiftedKeys[inputKey]) {
      return shiftedKeys[inputKey];
    }
    return inputKey;
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

    if (pressedKey === " ") {
      setGuyVisibility(!guyVisibility);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [guyVisibility, selectedGuy]); // Re-run if guyVisibility or selectedGuy changes

  const handleInteraction = () => {
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 1000); // Reset the effect
  };

  return (
    <div onClick={handleInteraction} onKeyDown={handleInteraction} className={`dynamic-background`}>
      <Keyboard
        buttonBinds={buttonBinds}
        onButtonClick={onButtonClick}
        guyVisibility={guyVisibility}
      />
      <GuyList setSelectedGuy={setSelectedGuy} selectedGuy={selectedGuy} />
    </div>
  );
};

export default Composer;
