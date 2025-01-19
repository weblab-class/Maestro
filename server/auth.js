const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "755479868382-tunoraa77oa1skp6dg05m3g0ttvho489.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const soundPath = "../../../src/assets/";

// Define a template for the objects
const guyTemplates = [
  {
    guy_name: "default_guy",
    _id: "default",
    asset_id: "2795",
    sound: "default.mp3",
  },
  {
    guy_name: "monkey_guy",
    _id: "monkey",
    asset_id: "1f412",
    sound: "monkey.mp3",
  },
  {
    guy_name: "goat_guy",
    _id: "goat",
    asset_id: "1f410",
    sound: "goat.mp3",
  },
  {
    guy_name: "dog_guy",
    _id: "dog",
    asset_id: "1f415",
    sound: "dog.mp3",
  },
];

// Generate the defaultGuyList dynamically
const defaultGuyList = Array.from({ length: 38 }, (_, index) => {
  const template = guyTemplates[index % guyTemplates.length];
  return {
    ...template,
    creator_id: "Smelvin",
    sound: soundPath + template.sound,
  };
});

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// gets user from DB, or makes a new account if it doesn't exist yet
function getOrCreateUser(user) {
  // the "sub" field means "subject", which is a unique identifier for each user
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
      asset_id: "2795",
      guy_list: defaultGuyList,
    });

    return newUser.save();
  });
}

function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      // persist user in the session
      req.session.user = user;
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

function logout(req, res) {
  req.session.user = null;
  res.send({});
}

function populateCurrentUser(req, res, next) {
  // simply populate "req.user" for convenience
  req.user = req.session.user;
  next();
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
};
