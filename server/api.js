/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Guy = require("./models/guy");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/randomGuysGet", async (req, res) => {
  const randomGuys = await Guy.aggregate([{ $sample: { size: 36 } }]);
  res.send(randomGuys);
});

router.get("/user", (req, res) => {
  // Check if creator_id is provided
  const creatorId = req.query.creator_id;
  if (!creatorId) {
    return res.status(400).send("creator_id is required");
  }

  // Find the user by ID and handle potential errors
  User.findById(creatorId)
    .then((user) => {
      if (!user) {
        // If no user is found, send a 404 response
        return res.status(404).send("User not found");
      }
      console.log(user);

      // Send the user data, you can send only the necessary fields if needed
      res.send({ name: user.name });
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      // Send a 500 internal server error if something goes wrong
      res.status(500).send("Internal server error");
    });
});

router.get("/pfpget", (req, res) => {
  if (req.user) {
    res.send({ pfp: req.user.asset_id });
  } else {
    res.send({ pfp: "2795" });
  }
});

router.get("/guyListGet", async (req, res) => {
  if (req.user) {
    const guyList = await Promise.all(req.user.guy_list.map((guy_id) => Guy.findById(guy_id)));
    res.send({ guyList });
  } else {
    res.send({ guyList: [] });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
