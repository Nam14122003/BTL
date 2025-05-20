const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // ...existing code...
  captcha: { type: String, required: true }, // thêm required cho captcha
  // ...existing code...
});

module.exports = mongoose.model('User', UserSchema);