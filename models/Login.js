const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  }
});

module.exports = Login = mongoose.model('login', LoginSchema);
