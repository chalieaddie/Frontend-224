import './Home.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);

  // Format date nicely
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown time";
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can customize formatting
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3000/getposts');
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='posts_container'>
      <h2>Home Page</h2>

      {posts.length === 0 && <p>No posts available.</p>}

      {posts.map(post => (
        <Link to={`/post/${post._id}`} className='post' key={post._id}>
          
          {/* CLOUDINARY IMAGE */}
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title || "Post Image"}
              style={{ width: '300px', height: 'auto' }}
            />
          )}

          <div className="posts_container">
            <h2 className='post'>{post.title || "Untitled"}</h2>
            <div className="post">{post.subtitle || ""}</div>
            <div className="post">{post.content || ""}</div>
            <div className="post">Author: {post.author || "Unknown"}</div>

            {/* DISPLAY CREATED TIME */}
            <div  className="post"style={{ fontSize: "0.9rem", color: "gray" }}>
              Posted: {formatDate(post.createdAt)}
            </div>
          </div>

        </Link>
      ))}
    </div>
  );
};

export default Home;