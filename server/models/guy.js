const mongoose = require("mongoose");

const GuySchema = new mongoose.Schema({
  guy_name: String,
  asset_id: String,
  creator_id: String,
  sound: Object,
});

// compile model from schema
module.exports = mongoose.model("guy", GuySchema);
