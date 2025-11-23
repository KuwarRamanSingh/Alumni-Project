import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "student", 
    graduationYear: "",
    skills: "",
    bio: "",
    profilePic: "" // Photo ka naam yahan aayega
  });
  
  const [file, setFile] = useState(null); // File store karne ke liye
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let updatedFormData = { ...formData };

    // --- 1. IMAGE UPLOAD LOGIC ---
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      
      try {
        const uploadRes = await axios.post("http://localhost:5000/api/upload", data);
        // Image upload hone ke baad, filename form data me add karo
        updatedFormData.profilePic = uploadRes.data; 
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }
    // -----------------------------

    // --- 2. REGISTER API CALL ---
    try {
      await axios.post("http://localhost:5000/api/auth/register", updatedFormData);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error registering user.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>📝 Register</h2>
        <form onSubmit={handleSubmit}>
          
          {/* --- PROFILE PHOTO INPUT --- */}
          <div className="form-group" style={{textAlign:'center', marginBottom:'15px'}}>
            <label style={{cursor:'pointer', color:'#003366', fontWeight:'bold'}}>
               {file ? "✅ Photo Selected: " + file.name : "📷 Upload Profile Photo"}
               <input 
                 type="file" 
                 style={{display:'none'}} 
                 onChange={(e) => setFile(e.target.files[0])} 
               />
            </label>
          </div>
          {/* --------------------------- */}

          <div className="form-group">
            <label>Full Name</label>
            <input className="form-input" type="text" onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>College Email</label>
            <input className="form-input" type="email" onChange={(e)=>setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-input" type="password" onChange={(e)=>setFormData({...formData, password: e.target.value})} required />
          </div>
          
          <div className="form-group">
            <label>I am a:</label>
            <select className="form-select" onChange={(e)=>setFormData({...formData, role: e.target.value})}>
              <option value="student">Current Student</option>
              <option value="alumni">Alumni (Graduated)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Graduation Year</label>
            <input className="form-input" type="text" placeholder="e.g. 2024" onChange={(e)=>setFormData({...formData, graduationYear: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Skills (Comma separated)</label>
            <input className="form-input" type="text" placeholder="e.g. React, Node, Java" onChange={(e)=>setFormData({...formData, skills: e.target.value})} />
          </div>

          <div className="form-group">
            <label>Short Bio</label>
            <textarea className="form-input" placeholder="Tell us about yourself..." onChange={(e)=>setFormData({...formData, bio: e.target.value})} />
          </div>
          
          <button className="btn-primary" type="submit">Register</button>
        </form>
        <div className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
}