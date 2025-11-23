import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const PF = "http://localhost:5000/images/";
  const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    const fetchUsers = async () => {
      const res = search 
        ? await axios.get(`http://localhost:5000/api/users?user=${search}`)
        : await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, [search]);

  return (
    <div className="dashboard-container">
      <h2 style={{color: '#003366', marginBottom: '20px'}}>🔍 Find Alumni & Students</h2>
      
      <input 
        type="text"
        placeholder="Search by name..."
        className="form-input"
        style={{marginBottom: '30px', padding: '12px'}}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px'}}>
        {users.map((u) => (
          <div key={u._id} style={{
            background: 'white', 
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            
            {/* --- NEW IMAGE LOGIC --- */}
            <img 
              src={u.profilePic ? PF + u.profilePic : defaultPic} 
              alt={u.name}
              style={{
                width: '80px', height: '80px', 
                borderRadius: '50%', objectFit: 'cover', 
                margin: '0 auto 10px', display: 'block',
                border: '3px solid #eee'
              }} 
            />
            {/* ----------------------- */}

            <h3 style={{margin: '10px 0', color: '#333'}}>{u.name}</h3>
            
            <span style={{
              background: u.role === 'alumni' ? '#003366' : '#e3f2fd',
              color: u.role === 'alumni' ? 'white' : '#003366',
              padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold'
            }}>
              {u.role.toUpperCase()}
            </span>

            <p style={{fontSize: '0.9rem', color: '#666', margin: '10px 0'}}>
              {u.bio ? u.bio.substring(0, 50) + "..." : "No bio added"}
            </p>

            <Link to={`/profile/${u._id}`}>
              <button className="btn-primary" style={{marginTop: '10px', padding: '8px'}}>View Profile</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}