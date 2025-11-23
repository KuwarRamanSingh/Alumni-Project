🎓 College Alumni & Placement Portal (MERN Stack)
A full-stack web application designed to bridge the gap between Students and Alumni. It allows Alumni to post job/internship opportunities, and students to network, search for seniors, and seek guidance.

🚀 Key Features
Role-Based Authentication: Separate registration for Students and Alumni.

Job & Internship Portal: Alumni can post jobs, internships, or general updates. Students can view and filter them.

Interactive Feed: Users can Like and Comment on posts.

Alumni Directory: A search feature to find alumni/students by name.

User Profiles: Editable profiles with Bio, Skills, Graduation Year, and Profile Picture.

Image Upload: Users can upload profile photos (stored locally on the server).

Responsive Design: Professional UI inspired by top institutes (REC/IISc styling).

📂 Project Structure & File Explanation
1. Backend (/server folder)
server.js: The main entry point. connects to MongoDB, sets up the images folder as public, and manages API routes.

images/: A folder where uploaded profile pictures are saved automatically.

models/: Database Schemas (Structure of data).

User.js: Stores Name, Email, Role, Bio, Skills, ProfilePic.

Post.js: Stores Title, Description, Category (Job/Internship), Likes, Comments.

routes/: API Endpoints.

auth.js: Handles Login & Registration (with password hashing).

posts.js: Handles Creating, Deleting, Liking, and Commenting on posts.

users.js: Handles Profile updates, Search logic, and Fetching user details.

2. Frontend (/client folder)
src/App.js: Main routing file. Decides which page to show based on the URL.

src/App.css: Contains all the styling (Blue/Yellow theme inspired by REC Sonbhadra).

src/components/:

Register.js: Sign-up page with image upload support.

Login.js: Sign-in page.

Dashboard.js: The main feed. Shows posts, filters (Job/Internship), and Navbar.

Profile.js: Displays user details. Allows editing bio, skills, and photo.

AllUsers.js: The "Find People" page with a search bar.

🛠️ Installation & Setup Guide
If you are cloning this repo, follow these steps to run it locally.

Step 1: Clone and Install Dependencies
Bash

# 1. Clone the repo
git clone <your-repo-link>

# 2. Setup Backend
cd server
npm install  # Installs express, mongoose, multer, etc.

# 3. Setup Frontend
cd ../client
npm install  # Installs react, axios, router
Step 2: Configure Database (Important ⚠️)
Go to the server/ folder.

Create a file named .env.

Paste the following code inside .env:

Code snippet

MONGO_URL=mongodb://127.0.0.1:27017/AlumniPortal
JWT_SECRET=MySecretKey123
Note: If using MongoDB Atlas (Cloud), replace the URL with your cloud connection string.

Step 3: Create Images Folder
Inside the server/ directory, create an empty folder named images. (This is required for file uploads to work).

Step 4: Run the Project
You need two terminals:

Terminal 1 (Backend):

Bash

cd server
nodemon server.js
# Should say: "Backend Server is running on port 5000" and "DB Connection Successful"
Terminal 2 (Frontend):

Bash

cd client
npm start
# Opens the website at http://localhost:3000
📝 VERSION 2: Hindi Documentation (Developer Guide)
Isse tum ya tumhare dost padh kar logic samajh sakte hain.

🎓 Alumni Portal - Kaise Kaam Karta Hai?
Bhai, ye ek MERN stack project hai jahan Seniors (Alumni) aur Juniors (Students) interact kar sakte hain. Niche saari files aur setup ka details hai.

📂 Files Ka Matlab (Kaunsi file kya kar rahi hai?)
Backend (Server Side)
server.js: Ye Engine hai. Yahan se server start hota hai. Isme humne Multer lagaya hai jo photos ko images folder me save karta hai.

models/User.js: Ye Database ko batata hai ki User kaisa dikhega (Naam, Email, Role, Bio, Skills, Photo).

routes/auth.js: Yahan Register aur Login ka logic hai. Password ko encrypt (bcrypt) yahi karta hai.

routes/posts.js: Post dalne ka, delete karne ka, like aur comment karne ka logic yahan hai.

routes/users.js: Profile update karne aur search (Find Alumni) karne ka code yahan hai.

Frontend (Client Side)
App.css: Isme poore project ki design hai (REC College wali styling).

Dashboard.js: Ye Main Page hai.

Isme Navbar hai.

Yahan Posts dikhti hain.

"Jobs" aur "Internships" ke buttons (Filters) yahi hain.

Profile.js: Jab tum apne naam pe click karte ho.

Yahan tum photo upload karte ho aur Bio/Skills edit karte ho.

AllUsers.js: "Find People" wala page. Yahan search bar laga hai user dhoondhne ke liye.

⚙️ Setup Kaise Karein (Database Link Kahan Daalein?)
Agar tumne code download kiya hai, toh ye karna padega:

1. Database Link Set karna: Sabse pehle server folder ke andar jao. Wahan ek .env file banao (agar nahi hai toh). Us file me ye likho: MONGO_URL=mongodb://127.0.0.1:27017/AlumniPortal

Agar tumhara MongoDB laptop pe install nahi hai aur tum Cloud (Atlas) use kar rahe ho, toh wahan se link copy karke yahan paste kar dena.

2. Images Folder: server folder ke andar ek khali folder banao jiska naam images rakhna. Agar ye nahi banaoge toh photo upload fail ho jayegi.

3. Run Karna:

Pehle server folder me nodemon server.js chalao (Database connect hona chahiye).

Fir client folder me npm start chalao.

💡 Important Notes for Developer
Images: Abhi images tumhare laptop ke server/images folder me save ho rahi hain. Agar isko internet par deploy karoge (Render/Vercel pe), toh images delete ho sakti hain. Future me isko Cloudinary pe shift karna padega.

Delete User: Agar kisi user ko delete karna hai, toh MongoDB Compass kholo, users collection me jao aur delete icon daba do.
