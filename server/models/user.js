const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  asset_id: String,
  guy_list: [Object],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
