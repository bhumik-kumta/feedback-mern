// backend/controllers/feedbackController.js
const Feedback = require('../models/Feedback');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, email, rating, comments } = req.body;
    if (!rating) {
      return res.status(400).json({ message: 'Rating is required' });
    }

    // ✅ Updated section (this is where your snippet goes)
    const feedback = new Feedback({
      name: name || req.user?.username,     // prefer provided name, else logged-in user's username
      email: email || '',                   // optional email
      rating,
      comments,
      createdBy: req.user?.id               // store user ID who created the feedback
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error('Error creating feedback:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all feedback (admin only)
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('createdBy', 'username')  // optional: shows who submitted it
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
