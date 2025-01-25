import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../App";
import { GoogleLogin } from "@react-oauth/google";
import assetIds from "../../assets/assetIds";
import AvatarList from "../modules/AvatarList";

import "../../utilities.css";
import "./ProfileCard.css";

const ProfileCard = () => {
  const { userId: paramUserId } = useParams();
  const [user, setUser] = useState();
  const { userId: contextUserId, handleLogin, setAssetId } = useContext(UserContext);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  useEffect(() => {
    const idToFetch = paramUserId || contextUserId;

    if (idToFetch) {
      get("/api/user", { userid: idToFetch }).then((userObj) => {
        setUser(userObj);
      });
    } else {
      setUser(null);
    }
  }, [paramUserId, contextUserId]);

  const checkAssetId = (id) => {
    // Check if the id is directly in the list
    if (assetIds.includes(id)) {
      return id; // Return the id as is if it's found in the list
    }

    // Check if the id without the "u" at the start is in the list
    const idWithoutU = id.startsWith("u") ? id.slice(1) : id;
    if (assetIds.includes(idWithoutU)) {
      return idWithoutU; // Return the id without "u" if it's found in the list
    }

    // If neither condition is met, return false
    return false;
  };

  const handleNameSave = () => {
    post("/api/nameSet", { newName: newName, userId: contextUserId }).then(({ newName }) => {
      setUser((prev) => ({ ...prev, name: newName }));
    });
    setIsEditingName(false);
  };

  const handleAvatarSave = () => {
    post("/api/pfpset", { newPfp: selectedAvatar, userId: contextUserId }).then(({ newPfp }) => {
      setUser((prev) => ({ ...prev, asset_id: newPfp }));
      setAssetId(newPfp);
      setSelectedAvatar("");
      setIsAvatarPopupOpen(false);
    });
  };

  if (!user && !paramUserId) {
    return (
      <div className="profile-login-container">
        <GoogleLogin
          text="signin_with"
          onSuccess={handleLogin}
          onFailure={(err) => console.log(err)}
          containerProps={{ className: "NavBar-link NavBar-login" }}
        />
      </div>
    );
  }

  if (!user) {
    return <div>Loading!</div>;
  }
  const isCurrentUser = contextUserId === user._id;
  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="profile-card-header">
          <img
            className="profile-card-avatar"
            src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${user.asset_id}/512.webp`}
            alt="User Avatar"
            onClick={() => isCurrentUser && setIsAvatarPopupOpen(true)}
            style={{ cursor: isCurrentUser ? "pointer" : "default" }}
          />
          {isEditingName ? (
            <div className="profile-card-name-editor">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
              />
              <button onClick={handleNameSave}>Save</button>
              <button onClick={() => setIsEditingName(false)}>Cancel</button>
            </div>
          ) : (
            <div
              className="profile-card-name"
              onClick={() => isCurrentUser && setIsEditingName(true)}
              style={{ cursor: isCurrentUser ? "pointer" : "default" }}
            >
              {user.name}
            </div>
          )}
        </div>
        <div className="profile-card-id">{user._id}</div>
        <Link
          to={`/search/?username=${encodeURIComponent(user.name)}`}
          className="profile-card-link"
        >
          Browse my guys!
        </Link>
      </div>

      {isAvatarPopupOpen && (
        <div className="avatar-popup">
          <div className="avatar-popup-content">
            <h3>Change Avatar</h3>

            <AvatarList
              selectedAvatar={selectedAvatar}
              handleAvatarClick={(avatar) => {
                setSelectedAvatar(avatar);
              }}
            />

            <button
              onClick={() => {
                handleAvatarSave();
                setIsAvatarPopupOpen(false);
              }}
            >
              Save
            </button>
            <button onClick={() => setIsAvatarPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
