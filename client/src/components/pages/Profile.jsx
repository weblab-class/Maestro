import React, { useState, useEffect } from "react";
import { get } from "../../utilities";
import { useParams } from "react-router-dom";

import "../../utilities.css";
import "./Profile.css";

const Profile = () => {
  let props = useParams();
  const [user, setUser] = useState();
  const [guyList, setGuyList] = useState([]);

  useEffect(() => {
    get("/api/user", { userid: props.userId }).then((userObj) => {
      setUser(userObj);
    });
  }, []);

  useEffect(() => {
    if (user) {
      get("/api/profileGuyList", { guy_list: user.guy_list }).then((guyListResponse) => {
        setGuyList(guyListResponse.guyList);
      });
    }
  }, [user]);

  if (!user) {
    return <div>Loading!</div>;
  }

  console.log("Current guyList:", guyList); // Debugging guyList

  return (
    <>
      <img
        src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${user.asset_id}/512.webp`}
        alt="User Avatar"
      />
      <div>{user.name}</div>
      <ul>
        {Array.isArray(guyList) && guyList.length > 0 ? (
          guyList.map((guy) => (
            <li key={guy._id || guy.name || Math.random()}>{guy.name || "Unnamed Guy"}</li>
          ))
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </>
  );
};

export default Profile;
