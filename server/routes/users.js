const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// 1. GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. GET ALL USERS (Search Logic)
router.get("/", async (req, res) => {
  const query = req.query.user;
  try {
    const users = query 
      ? await User.find({ name: { $regex: query, $options: "i" } }) 
      : await User.find();
    
    const usersList = users.map(u => {
      const { password, ...other } = u._doc;
      return other;
    });
    res.status(200).json(usersList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 3. UPDATE USER (Fixed Logic)
router.put("/:id", async (req, res) => {
  // ID ko String me convert karke compare karo
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    
    // Password Update Logic
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, { new: true }); // new: true se updated data wapas milta hai
      
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

module.exports = router;