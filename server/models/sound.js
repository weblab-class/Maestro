const mongoose = require("mongoose");

const SoundSchema = new mongoose.Schema({
  note: String, 
  parameters: {
    harmonicity: Number,
    oscillator: {
      type: String,
      enum: ["sine", "square", "triangle", "sawtooth"], 
    },
    modulation: {
      type: String,
      enum: ["sine", "square", "triangle", "sawtooth"], 
    },
    envelope: {
      attack: { type: Number, default: 0.1 },
      decay: { type: Number, default: 0.1 },
      sustain: { type: Number, default: 0.7 },
      release: { type: Number, default: 1.0 },
    },
    modulationEnvelope: {
      attack: { type: Number, default: 0.1 },
      decay: { type: Number, default: 0.1 },
      sustain: { type: Number, default: 0.7 },
      release: { type: Number, default: 1.0 },
    }
  }
});


// compile model from schema
module.exports = mongoose.model("sound", SoundSchema);
