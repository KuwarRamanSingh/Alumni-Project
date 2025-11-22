const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'alumni'], 
    default: 'student' 
  },
  graduationYear: { type: String },
  
  // --- YE DO LINE ADD KARNI HAI ---
  bio: { type: String, default: "" },
  skills: { type: String, default: "" },
  // --------------------------------

  profilePic: { type: String, default: "" },
  
}, { timestamps: true }); // timestamps: true se created_at automatic aa jata hai

module.exports = mongoose.model('User', UserSchema);