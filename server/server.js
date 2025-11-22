const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer'); // 1. Import Multer
const path = require('path');     // 2. Import Path module
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// --- 3. IMAGES FOLDER KO PUBLIC BANAO ---
// Taaki frontend browser me image khul sake (e.g. localhost:5000/images/pic.jpg)
app.use("/images", express.static(path.join(__dirname, "/images")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err));

// --- 4. MULTER STORAGE ENGINE (Logic ki file kaise save hogi) ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Folder ka naam jahan save karna hai
  },
  filename: (req, file, cb) => {
    // File ka naam: Current Time + Original Name (taaki naam duplicate na ho)
    cb(null, Date.now() + file.originalname); 
  },
});

const upload = multer({ storage: storage });

// --- 5. UPLOAD API ROUTE ---
// Frontend yahan file bhejega, aur ye route file ka naam wapas karega
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json(req.file.filename); 
  } catch (error) {
    console.error(error);
  }
});

// Routes Use karna
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.listen(5000, () => {
  console.log("Backend Server is running on port 5000");
});