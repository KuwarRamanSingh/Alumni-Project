const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  authorName: { type: String },
  
  // --- NEW FIELD: Category ---
  category: { 
    type: String, 
    enum: ['general', 'job', 'internship', 'event'], // Sirf ye values allowed hain
    default: 'general' 
  },
  // ---------------------------

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      posterName: String,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);