import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

import "../../utilities.css";
import "./Profile.css";

const Profile = () => {
  let props = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
  }, []);

  if (!user) {
    return <div> Loading!</div>;
  }
  return (
    <>
      <div className="Profile-avatarContainer" onClick={() => {}}>
        <div className="Profile-avatar" />
      </div>
      <h1 className="Profile-name u-textCenter">{user.name}</h1>
      <hr className="Profile-linejj" />
      <div className="u-flex">
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">About Me</h4>
          <div id="profile-description">
            I am really allergic to cats i don't know why i have a catbook
          </div>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">Cat Happiness</h4>
        </div>
        <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">My Favorite Type of Cat</h4>
          <div id="favorite-cat">corgi</div>
        </div>
      </div>
    </>
  );
};

export default Profile;
