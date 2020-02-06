const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sneakersSchema = new Schema({
    name: String,
    ref: String,
    sizes: Number,
    description: String,
    price: Number,
    category: {type: String, enum: ["men","women","kids"]},
    id_Tags: [{type: Schema.Types.ObjectId, ref: 'Tags'}]
    // id_Tags: {[type: Schema.Types.ObjectId, ref: 'Tags']} ----> frank's code
});

const sneakersModel = mongoose.model("Sneakers", sneakersSchema);

module.exports = sneakersModel;