const mongoose = require('mongoose');

const BookerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  classTeacher: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  class_date: {
    type: Date,
    required: true,
  },
  class_booked: {
    type: String,
    required: true,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Booker = mongoose.model('attendee', BookerSchema);
