import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", description: "", category: "general" });
  const [commentText, setCommentText] = useState({});
  const [filter, setFilter] = useState("all");

  const PF = "http://localhost:5000/images/";
  const defaultPic = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    } catch (err) { console.error(err); }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const postData = { ...newPost, author: user._id, authorName: user.name };
    try {
      await axios.post("http://localhost:5000/api/posts", postData);
      fetchPosts(); 
      setNewPost({ title: "", description: "", category: "general" });
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (postId) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, { data: { userId: user._id } });
      setPosts(posts.filter(p => p._id !== postId));
    } catch (err) { alert("Access Denied"); }
  };

  const handleLike = async (postId) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}/like`, { userId: user._id });
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    const text = commentText[postId];
    if(!text) return;
    try {
      await axios.put(`http://localhost:5000/api/posts/${postId}/comment`, { 
        userId: user._id, userName: user.name, text 
      });
      setCommentText({...commentText, [postId]: ""});
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const filteredPosts = filter === "all" ? posts : posts.filter(p => p.category === filter);

  return (
    <div>
      {/* 1. NEW NAVBAR STRUCTURE (IISc Style) */}
      <nav className="navbar">
         <div className="logo" style={{ display:"flex", alignItems:"center", gap:"10px" }}>
         <img 
      src="http://recsonbhadra.ac.in/static/media/Collegelogo.96cbe2da1f0150aefe6d.png"
      alt="College Logo"
      style={{ width:"40px", height:"40px" }}
         />
        REC Alumni
        </div>
        
        <div className="nav-links">
          <Link to="/users" className="nav-item">🔍 Find Alumni</Link>
          
          <Link to={`/profile/${user._id}`} className="nav-item" style={{display:'flex', alignItems:'center', gap:'5px'}}>
             <img 
               src={user.profilePic ? PF + user.profilePic : defaultPic} 
               style={{width:'30px', height:'30px', borderRadius:'50%', border:'2px solid white'}} alt="" 
             />
             Profile
          </Link>

          <button className="nav-btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* 2. NEW HERO SECTION (Banner like IISc/REC) */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to REC Sonbhadra Alumni Portal</h1>
        <p className="hero-subtitle">Connect, Network, and Grow with your Alma Mater.</p>
      </div>

      <div className="dashboard-container">
        
        {/* Filter Tabs */}
        <div className="filter-container">
          <button className={`filter-btn ${filter==='all' && 'active'}`} onClick={()=>setFilter('all')}>All Feeds</button>
          <button className={`filter-btn ${filter==='job' && 'active'}`} onClick={()=>setFilter('job')}>💼 Jobs</button>
          <button className={`filter-btn ${filter==='internship' && 'active'}`} onClick={()=>setFilter('internship')}>🎓 Internships</button>
        </div>

        {/* Create Post (Only Alumni) */}
        {user.role === 'alumni' && (
          <div className="create-post-card">
            <h3 style={{marginBottom:'15px', color:'#002366'}}>✍️ Share an Opportunity</h3>
            <form onSubmit={handlePostSubmit}>
              <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
                <input className="form-input" placeholder="Title (e.g. Hiring at Microsoft)" 
                       value={newPost.title} onChange={(e)=>setNewPost({...newPost, title: e.target.value})} required style={{flex: 2}}/>
                
                <select className="form-select" value={newPost.category} onChange={(e)=>setNewPost({...newPost, category: e.target.value})} style={{flex: 1}}>
                  <option value="general">🗣️ General</option>
                  <option value="job">💼 Job</option>
                  <option value="internship">🎓 Internship</option>
                  <option value="event">📅 Event</option>
                </select>
              </div>
              
              <textarea className="form-input" placeholder="Write details here..." value={newPost.description} onChange={(e)=>setNewPost({...newPost, description: e.target.value})} required rows="3"/>
              <button className="btn-primary" style={{width:'auto', marginTop:'10px'}} type="submit">Post Update</button>
            </form>
          </div>
        )}

        {/* Posts Feed */}
        {filteredPosts.map((p) => (
          <div key={p._id} className="post-card">
            <div className="post-header">
              <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                {/* Author Info */}
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                     <h3 style={{fontSize:'1.2rem', color:'#002366', margin:0}}>{p.title}</h3>
                     <span className={`badge-${p.category}`}>{p.category.toUpperCase()}</span>
                  </div>
                  <Link to={`/profile/${p.author}`} style={{textDecoration:'none'}}>
                    <small style={{color:'#777', fontWeight:'bold'}}>Posted by @{p.authorName}</small>
                  </Link>
                </div>
              </div>
              
              {p.author === user._id && (
                <button onClick={() => handleDelete(p._id)} style={{color:'red', background:'none', border:'none', cursor:'pointer'}}>🗑️</button>
              )}
            </div>
            
            <p style={{color:'#444', lineHeight:'1.6', marginBottom:'15px', whiteSpace:'pre-wrap'}}>{p.description}</p>

            <div style={{display:'flex', alignItems:'center', gap:'20px', borderTop:'1px solid #eee', paddingTop:'15px'}}>
              <button onClick={() => handleLike(p._id)} style={{background:'none', border:'none', cursor:'pointer', fontSize:'1rem', color:'#555', display:'flex', alignItems:'center', gap:'5px'}}>
                {p.likes.includes(user._id) ? "❤️" : "🤍"} {p.likes.length} Likes
              </button>
              <span style={{color:'#555', fontSize:'0.9rem'}}>💬 {p.comments.length} Comments</span>
            </div>

            {/* Comments Section */}
            {/* ... Comments logic same as before ... */}
            <div style={{marginTop:'15px', background:'#f8f9fa', padding:'10px', borderRadius:'5px'}}>
               {/* Comment form same rahega... */}
               <form onSubmit={(e) => handleComment(e, p._id)} style={{display:'flex', marginTop:'5px'}}>
                  <input type="text" placeholder="Write a comment..." value={commentText[p._id] || ""} 
                         onChange={(e) => setCommentText({...commentText, [p._id]: e.target.value})}
                         style={{flex:1, padding:'8px', marginRight:'5px', border:'1px solid #ddd', borderRadius:'4px'}} />
                  <button type="submit" style={{background:'#002366', color:'white', border:'none', padding:'5px 15px', borderRadius:'4px', cursor:'pointer'}}>Send</button>
                </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}