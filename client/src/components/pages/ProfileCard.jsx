import React, { useState, useEffect, useContext } from "react";
import { get, post } from "../../utilities";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../App";
import { GoogleLogin } from "@react-oauth/google";
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

  const [avatarError, setAvatarError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    const idToFetch = paramUserId || contextUserId;

    if (idToFetch) {
      get("/api/user", { userid: idToFetch }).then((userObj) => {
        setUser(userObj);
        setAssetId(userObj.asset_id);
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
                maxLength={10}
              />
              <button
                onClick={() => {
                  if (newName.trim() !== "") {
                    handleNameSave;
                  } else {
                    setNameError("Enter a valid Name!");
                  }
                }}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditingName(false);
                  setNameError(false);
                }}
              >
                Cancel
              </button>
              {nameError && (
                <p style={{ color: "red" }}>{nameError}</p> // Display the error message in red
              )}
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
            {avatarError && (
              <p style={{ color: "red" }}>{avatarError}</p> // Display the error message in red
            )}

            <AvatarList
              selectedAvatar={selectedAvatar}
              handleAvatarClick={(avatar) => {
                setSelectedAvatar(avatar);
              }}
            />

            <button
              onClick={() => {
                if (selectedAvatar === "") {
                  setAvatarError("Select an avatar to save it!");
                } else {
                  handleAvatarSave();
                  setIsAvatarPopupOpen(false);
                }
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsAvatarPopupOpen(false);
                setAvatarError("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
