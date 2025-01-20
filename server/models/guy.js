const mongoose = require("mongoose");

const GuySchema = new mongoose.Schema({
  name: String,
  asset_id: String,
  creator_id: mongoose.Schema.Types.ObjectId,
  sound: String,
});

// compile model from schema
module.exports = mongoose.model("guy", GuySchema);
