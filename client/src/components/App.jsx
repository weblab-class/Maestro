import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);
export const GuyContext = createContext(null);

import NavBar from "./modules/NavBar";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [guyVisibility, setGuyVisibility] = useState(false);

  const soundPath = "../../../src/assets/";
  const defaultGuyList = [
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
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
    {
      guy_name: "default_guy",
      guy_id: "default",
      asset_id: "2795",
      creator_name: "Smelvin",
      description: "Default guy",
      sound: soundPath + "default.mp3",
    },
    {
      guy_name: "monkey_guy",
      guy_id: "monkey",
      asset_id: "1f412",
      creator_name: "Smelvin",
      description: "Monkey guy",
      sound: soundPath + "monkey.mp3",
    },
  ];

  const [guyList, setGuyList] = useState(defaultGuyList);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
  };

  return (
    <div>
      <GuyContext.Provider value={{ guyVisibility, setGuyVisibility, guyList }}>
        <NavBar
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          userId={userId}
          guyVisibility={guyVisibility}
          setGuyVisibility={setGuyVisibility}
        />
        <UserContext.Provider value={authContextValue}>
          <Outlet />
        </UserContext.Provider>
      </GuyContext.Provider>
    </div>
  );
};

export default App;
