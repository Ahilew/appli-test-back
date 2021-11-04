const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: String,
    email: String,
    phone: String
})

module.exports = mongoose.model("Client", schema)