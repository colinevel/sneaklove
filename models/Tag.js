const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    enum: ["casual", "running", "lifestyle", "tennistable", "basketball"]
  }
});

const Tags = mongoose.model("Tags", tagSchema);
module.exports = Tags;
