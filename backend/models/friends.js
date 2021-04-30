const { Schema, model } = require('mongoose')

const friendsSchema = new Schema({
  sender: String,
  getter: String,
  status: {
    type: Number, 
    enums: [
      0, // not yet friends
      1, // A requested to be friends with B
      2 // A is friends with B 
    ]
  }
}, {timestamps: true})

module.exports = model('Friends', friendsSchema)
