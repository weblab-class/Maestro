import React, { useState, useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import "../../utilities.css";
import "./Composer.css";
import Keyboard from "../modules/Keyboard";
import GuyList from "../modules/GuyList";
import { get } from "../../utilities";
import NavigatorButtons from "../modules/NavigatorButtons";
import { UserContext } from "../App";

const Composer = () => {
  const [guyVisibility, setGuyVisibility] = useState(false);

  const keyboardKeys = "1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
  const [buttonBinds, setButtonBinds] = useState([]);
  const [selectedGuy, setSelectedGuy] = useState(null);

  const [lasers, setLasers] = useState([]);
  const { isAnimated } = useContext(UserContext);
  const maxLasers = 20;

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

    if (lasers.length >= maxLasers) return; // Prevent spawning if at limit

    const newLaser = {
      id: Date.now(),
      left: Math.random() * 100, // Random position across screen
      color: `hsl(${Math.random() * 360}, 100%, 70%)`, // Random color
    };

    setLasers((prevLasers) => [...prevLasers, newLaser]);

    // Remove the laser after it moves off-screen
    setTimeout(() => {
      setLasers((prevLasers) => prevLasers.filter((laser) => laser.id !== newLaser.id));
    }, 2000); // Adjust time to match laser animation duration
  };

  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Limit the total number of sparkles on the screen
      if (sparkles.length < 10) {
        // Adjust this value for more or fewer sparkles
        const newSparkle = {
          id: Date.now(),
          left: Math.random() * 100, // Random horizontal position (0 to 100%)
          size: Math.random() * 5 + 2, // Random size (between 2px and 7px)
          duration: Math.random() * 2 + 3, // Random fall duration (3s to 5s)
        };
        setSparkles((prevSparkles) => [...prevSparkles, newSparkle]);
      }
    }, 1000); // Generate a new sparkle every 500ms (can increase to reduce sparkles)

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [sparkles]);

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

  return (
    <div className={`background`}>
      <Keyboard
        buttonBinds={buttonBinds}
        onButtonClick={onButtonClick}
        guyVisibility={guyVisibility}
      />
      <NavigatorButtons></NavigatorButtons>
      <GuyList setSelectedGuy={setSelectedGuy} selectedGuy={selectedGuy} />

      <div className="laser-container">
        {isAnimated &&
          lasers.map((laser) => (
            <motion.div
              key={laser.id}
              className="laser"
              style={{
                boxShadow: `0 0 30px ${laser.color}`, // Use the laser's color for the shadow
                backgroundColor: laser.color, // Set the background to the laser's color
                left: `${laser.left}%`, // Random horizontal position
              }}
              initial={{ top: "-300px" }} // Start above the screen
              animate={{ top: "100vh" }} // Move to just past the bottom of the screen
              transition={{ duration: 2, ease: "linear" }}
            />
          ))}
        {/* Render each sparkle */}
        {isAnimated &&
          sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.left}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                animationDuration: `${sparkle.duration}s`, // Random fall duration
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default Composer;
