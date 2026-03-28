// 1. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 3. MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 4. Schema & Model
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// 5. Routes

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Save feedback
app.post('/submit-feedback', async (req, res) => {
  try {
    const { name, email, comment } = req.body;

    const newFeedback = new Feedback({ name, email, comment });
    await newFeedback.save();

    res.status(200).json({ message: 'Thanks for the feedback! ✅' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong ❌' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(🚀 Server running on port ${PORT});
});
// 6. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
