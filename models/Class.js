const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  classId: {
    type: String,
    required: true,
  },
  classTeacher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  class_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Class = mongoose.model('class', ClassSchema);
