// 1. Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middleware
// Parse incoming JSON data from your frontend script.js
app.use(express.json()); 
// Serve all static files (HTML, CSS, JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// 3. MongoDB Connection
// Uses the hidden MONGODB_URI from your .env file
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 4. Database Schema & Model
// Defines what the feedback data should look like in the database
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// 5. Routes

// GET Route: Serve the main portfolio page when someone visits your URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POST Route: Receive form data from script.js and save it to MongoDB
app.post('/submit-feedback', async (req, res) => {
  try {
    // Create a new database entry with the data sent from the form
    const newFeedback = new Feedback({
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment
    });

    // Save it to the database
    await newFeedback.save();
    
    // Send a success response back to the frontend
    res.status(200).json({ message: 'Thanks for the feedback!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Oops! Something went wrong.' });
  }
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
