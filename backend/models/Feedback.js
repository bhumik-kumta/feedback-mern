// backend/models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, trim: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ✅ add this
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
