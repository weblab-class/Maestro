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
  const GuyListTemp = [
    {
      guy_name: "default_guy",
      _id: "default",
      asset_id: "2795",
      creator_id: "Smelvin",
      sound: soundPath + "default.mp3",
    },
  ];

  const [guyList, setGuyList] = useState(GuyListTemp);

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
      setGuyList(user.guy_list);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setGuyList(GuyListTemp);
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
