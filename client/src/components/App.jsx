import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";

import jwt_decode from "jwt-decode";

import "../utilities.css";

import { socket } from "../client-socket";

import { get, post } from "../utilities";

export const UserContext = createContext(null);
export const GuyContext = createContext(null);

import NavBar from "./modules/NavBar";
import { useNavigate } from "react-router-dom";


/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [guyVisibility, setGuyVisibility] = useState(false);

  const [assetId, setAssetId] = useState("1fae5");

  const navigate = useNavigate();

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setAssetId(user.asset_id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      setAssetId(user.asset_id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    console.log('asdfasdf');
    setAssetId("1fae5");
    post("/api/logout");
    navigate("/")
  };

  const authContextValue = {
    userId,
    handleLogin,
    handleLogout,
    assetId,
    setAssetId,
  };

  return (
    <div>
      <GuyContext.Provider value={{ guyVisibility, setGuyVisibility }}>
        <UserContext.Provider value={authContextValue}>
          <NavBar />
          <Outlet />
        </UserContext.Provider>
      </GuyContext.Provider>
    </div>
  );
};

export default App;
