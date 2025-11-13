const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');
const auth = require('../middleware/auth');  // JWT middleware

// POST /api/feedback  → user submits feedback
router.post('/', auth, createFeedback);

// GET /api/feedback  → admin views all feedbacks
router.get('/', auth, getFeedbacks);

module.exports = router;
