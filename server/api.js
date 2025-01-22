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
const mongoose = require("mongoose");

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
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.get("/username", (req, res) => {
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
        return res.send("someone");
      }

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
    console.log(req.user.guy_list);
    const guyList = await Promise.all(req.user.guy_list.map((guy_id) => Guy.findById(guy_id)));
    res.send({ guyList });
  } else {
    res.send({ guyList: [] });
  }
});

router.get("/profileGuyList", async (req, res) => {
  try {
    let profileGuyList = [];

    // Parse or split guy_list from query string
    if (req.query.guy_list) {
      if (Array.isArray(req.query.guy_list)) {
        profileGuyList = req.query.guy_list;
      } else if (typeof req.query.guy_list === "string") {
        if (req.query.guy_list.startsWith("[") && req.query.guy_list.endsWith("]")) {
          profileGuyList = JSON.parse(req.query.guy_list); // Handle JSON format
        } else {
          profileGuyList = req.query.guy_list.split(","); // Handle comma-separated format
        }
      }
    }

    // console.log("Parsed profileGuyList:", profileGuyList);

    if (profileGuyList.length > 0) {
      const guyListResponse = await Promise.all(
        profileGuyList.map(async (guy_id) => {
          return Guy.findById(guy_id); // Assuming guy_id is valid
        })
      );
      // console.log("Guy List Response:", guyListResponse);
      res.send({ guyList: guyListResponse });
    } else {
      res.send({ guyList: [] });
    }
  } catch (error) {
    console.error("Error in /profileGuyList:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const nameRegex = req.query.name ? new RegExp(req.query.name, "i") : null;
    const usernameRegex = req.query.username ? new RegExp(req.query.username, "i") : null;

    const query = {};

    if (nameRegex) {
      query.name = nameRegex;
    }

    if (usernameRegex) {
      const userIds = await User.find({ name: usernameRegex }).select("_id");
      if (userIds.length === 0) {
        // Return an empty list if no users match the username query
        return res.send([]);
      }
      query["creator_id"] = { $in: userIds };
    }

    // Handle pagination
    const page = req.query.page ? parseInt(req.query.page, 10) : 1; // Default to page 1 if not provided
    const size = 10; // Number of results per page
    const skip = (page - 1) * size;

    // Get the total number of matching results
    const totalResults = await Guy.countDocuments(query);
    const totalPages = Math.ceil(totalResults / size);

    // If the requested page exceeds the total pages, return an empty list
    if (page > totalPages) {
      return res.send([]);
    }

    // Fetch the results for the current page
    const results = await Guy.find(query)
      .populate("creator_id", "name")
      .sort({ name: 1 })
      .skip(skip)
      .limit(size);

    // Return results with pagination info
    res.send({ results, totalResults, totalPages });
  } catch (error) {
    console.error("Error while querying the database:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/switchGuys", async (req, res) => {
  const { newGuyId, oldGuyId } = req.body;
  const userId = req.user._id;

  try {
    // Find the user in the database using their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure `guy_list` items are treated as ObjectId for comparison
    user.guy_list = user.guy_list.map((id) => new mongoose.Types.ObjectId(id));

    // Convert the input IDs to ObjectId
    const newGuyObjectId = new mongoose.Types.ObjectId(newGuyId);
    const oldGuyObjectId = new mongoose.Types.ObjectId(oldGuyId);

    // Check if the newGuyId is already in the guy_list
    if (user.guy_list.some((id) => id.equals(newGuyObjectId))) {
      const oldGuy = await Guy.findById(oldGuyObjectId);
      if (!oldGuy) {
        return res.status(404).json({ message: "Old guy not found" });
      }

      return res.status(400).json({ message: "New guy is already in the list", oldGuy });
    }

    // Replace the oldGuyId with the newGuyId in the guy_list array
    console.log("Hello");
    const index = user.guy_list.findIndex((id) => id.equals(oldGuyObjectId));
    if (index !== -1) {
      console.log("Before Update:", user.guy_list);

      // Update the guy_list directly
      user.guy_list[index] = newGuyObjectId;
      req.user.guy_list[index] = newGuyObjectId;
      await User.updateOne(
        { _id: userId }, // Filter
        { $set: { [`guy_list.${index}`]: newGuyObjectId } } // Update specific index
      );

      // Reload the user from the database to confirm changes
      const updatedUser = await User.findById(userId);
      console.log("After Update:", updatedUser.guy_list);

      // Find the new guy object based on newGuyId
      const newGuy = await Guy.findById(newGuyObjectId);
      if (!newGuy) {
        return res.status(404).json({ message: "New guy not found" });
      }

      return res.status(200).json({ message: "Guy switched successfully!", newGuy });
    } else {
      return res.status(404).json({ message: "Old guy ID not found in the list" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
