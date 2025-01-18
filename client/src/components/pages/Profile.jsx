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
        <img
          src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${user.asset_id}/512.webp`}
          width="200px"
          height="200px"
        />
      </div>
      <h1 className="Profile-name u-textCenter">{user.name}</h1>
    </>
  );
};

export default Profile;
