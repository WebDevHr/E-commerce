const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  time: {
    type: String,
    default: "10:00",
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  organizer: String,
  category: String,
  attendees: Array,
});

module.exports = mongoose.model("events", postSchema);
