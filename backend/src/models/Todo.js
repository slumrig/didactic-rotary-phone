const mongoose = require("mongoose")

const schema = mongoose.Schema({
    id: String,
    name: String,
    isComplete: Boolean,
})

module.exports = mongoose.model("Todo", schema)