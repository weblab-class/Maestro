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
          <div className="profile-card-avatar-container">
            <img
              className="profile-card-avatar"
              src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${user.asset_id}/512.webp`}
              alt="User Avatar"
            />
            {isCurrentUser && (
              <button
                className="edit-avatar-button"
                onClick={() => setIsAvatarPopupOpen(true)}
                aria-label="Edit Avatar"
              >
                ✏️
              </button>
            )}
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
              <div className="profile-card-name">
                {user.name}
                {isCurrentUser && (
                  <button
                    className="edit-name-button"
                    onClick={() => setIsEditingName(true)}
                    aria-label="Edit Name"
                  >
                    ✏️
                  </button>
                )}
              </div>
            )}
          </div>
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
