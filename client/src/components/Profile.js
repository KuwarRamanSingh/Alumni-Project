import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  
  // Logic to check if it's my profile
  const isOwnProfile = currentUser && (currentUser._id === id);

  // --- NEW STATE FOR FILE ---
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "", bio: "", skills: "", graduationYear: "", profilePic: ""
  });

  // Image Paths
  const PF = "http://localhost:5000/images/";
  const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUserProfile(res.data);
        setFormData({
          name: res.data.name || "",
          bio: res.data.bio || "",
          skills: res.data.skills || "",
          graduationYear: res.data.graduationYear || "",
          profilePic: res.data.profilePic || ""
        });
      } catch (err) { console.log(err); }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = { userId: currentUser._id, ...formData };

    // --- UPLOAD LOGIC START ---
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name; 
      data.append("name", filename);
      data.append("file", file);
      
      try {
        const res = await axios.post("http://localhost:5000/api/upload", data);
        updatedData.profilePic = res.data; 
      } catch (err) {
        console.log(err);
      }
    }
    // --- UPLOAD LOGIC END ---

    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, updatedData);
      setIsEditing(false);
      window.location.reload(); 
    } catch (err) { console.error(err); }
  };

  return (
    <div className="dashboard-container">
      <div className="auth-box" style={{maxWidth: '800px', margin: 'auto'}}>
        
        <div style={{textAlign:'center', marginBottom:'20px'}}>
            {/* --- CORRECT IMAGE DISPLAY --- */}
            <img 
              src={userProfile.profilePic ? PF + userProfile.profilePic : defaultPic} 
              alt="Profile" 
              style={{width:'120px', height:'120px', borderRadius:'50%', objectFit:'cover', border:'4px solid #003366'}}
            />
        </div>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
           <h2 style={{color: '#003366'}}>👤 {userProfile.name}'s Profile</h2>
           {isOwnProfile && !isEditing && (
             <button className="btn-primary" style={{width:'auto'}} onClick={() => setIsEditing(true)}>✏️ Edit Profile</button>
           )}
        </div>

        {!isEditing ? (
          // VIEW MODE
          <div style={{textAlign: 'left'}}>
             <div className="form-group">
              <label>Bio:</label>
              <p style={{background:'#f9f9f9', padding:'15px', borderRadius:'8px'}}>{userProfile.bio || "No bio added yet."}</p>
            </div>
            <div className="form-group">
              <label>Skills:</label>
              <p>{userProfile.skills || "No skills added."}</p>
            </div>
            <div className="form-group">
              <label>Graduation Year:</label>
              <p>{userProfile.graduationYear || "N/A"}</p>
            </div>
          </div>
        ) : (
          // EDIT MODE
          <form onSubmit={handleUpdate} style={{textAlign: 'left'}}>
             
             {/* --- FILE INPUT --- */}
             <div className="form-group" style={{background:'#e3f2fd', padding:'10px', borderRadius:'5px'}}>
                <label>Change Profile Photo</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
             </div>

             <div className="form-group">
              <label>Name</label>
              <input className="form-input" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea className="form-input" rows="3" value={formData.bio} onChange={(e)=>setFormData({...formData, bio: e.target.value})} />
            </div>
             <div className="form-group">
              <label>Skills</label>
              <input className="form-input" value={formData.skills} onChange={(e)=>setFormData({...formData, skills: e.target.value})} />
            </div>
            
            <div style={{display:'flex', gap:'10px', marginTop: '20px'}}>
              <button className="btn-primary" type="submit">💾 Save & Upload</button>
              <button className="btn-primary" type="button" style={{background:'#6c757d'}} onClick={() => setIsEditing(false)}>❌ Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}