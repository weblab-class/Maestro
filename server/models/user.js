const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  guy_list: [Object],
  asset_id: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
