const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: {
    type: String,
    unique: true
  }
});

const Tags = mongoose.model("Tags", tagSchema);
module.exports = Tags;
