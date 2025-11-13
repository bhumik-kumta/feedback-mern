// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedback');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/feedbackDB');

app.use('/api/feedback', feedbackRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => res.send('Feedback API is running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

