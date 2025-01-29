import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../App";

import { get, post } from "../../utilities";

import AvatarList from "../modules/AvatarList";

import "./ProfileCard.css";

const ProfileCard = () => {
  const { userId: paramUserId } = useParams();
  const [user, setUser] = useState();
  const { userId: contextUserId, handleLogin, setAssetId, isAnimated } = useContext(UserContext);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");

  useEffect(() => {
    const idToFetch = paramUserId || contextUserId;

    if (idToFetch) {
      get("/api/user", { userid: idToFetch }).then((userObj) => {
        setUser(userObj);
        //FIX BUG HERE AAAAAAAAAAAA
        if (idToFetch === contextUserId) {
          setAssetId(userObj.asset_id);
        }
      });
    } else {
      setUser(null);
    }
  }, [paramUserId, contextUserId]);

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
    return <div className="profile-card-container"></div>;
  }

  if (!user) {
    return <div className="profile-card-container"></div>;
  }

  const isCurrentUser = contextUserId === user._id;

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="profile-card-header">
          <div className="profile-card-avatar-container">
            <img
              className={`profile-card-avatar ${isCurrentUser ? "u-pointer wiggling" : ""}`}
              src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${user.asset_id}/512.${
                +isAnimated ? "webp" : "png"
              }`}
              alt="User Avatar"
              onClick={isCurrentUser ? () => setIsAvatarPopupOpen(true) : undefined} // Make the image unclickable if the user is not logged in
            />
          </div>
          <div className="profile-card-name-container">
            {isEditingName ? (
              <div className="profile-card-name-editor">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                  maxLength={10}
                />
                <button
                  onClick={() => {
                    if (newName.trim() !== "") {
                      handleNameSave();
                    } else {
                      alert("Enter a valid Name!");
                    }
                  }}
                >
                  Save
                </button>
                <button onClick={() => setIsEditingName(false)}>Cancel</button>
              </div>
            ) : (
              <div
                className={`profile-card-name ${isCurrentUser ? "u-pointer wiggling" : ""}`}
                onClick={isCurrentUser ? () => setIsEditingName(true) : undefined}
              >
                {user.name}
              </div>
            )}
          </div>
        </div>
        <div className="profile-card-id">{`ID: ${user._id}`}</div>
        <Link
          to={`/search/?username=${encodeURIComponent(user.name)}`}
          className="profile-card-link"
        >
          Browse my Guys!
        </Link>
      </div>

      {isAvatarPopupOpen && (
        <div className="avatar-popup">
          <div className="avatar-popup-content">
            <h3>Change Avatar</h3>

            <AvatarList
              selectedAvatar={selectedAvatar}
              handleAvatarClick={(avatar) => setSelectedAvatar(avatar)}
            />

            <button
              onClick={() => {
                if (selectedAvatar === "") {
                  alert("Select an avatar to save it!");
                } else {
                  handleAvatarSave();
                  setIsAvatarPopupOpen(false);
                }
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
