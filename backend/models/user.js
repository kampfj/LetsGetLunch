const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  image: { type: String, required: true },
  hometown: { type: String, required: true },
  major: { type: String },
  school: { type: String },
  friends: [],
})

module.exports = model('User', userSchema)
