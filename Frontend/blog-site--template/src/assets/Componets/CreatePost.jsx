import './CreatePost.css';
import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [createdPost, setCreatedPost] = useState(null);

  const navigate = useNavigate();
  const { username, email } = useContext(userContext); // get username directly from context

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!username) {
      navigate("/login");
    }
  }, [username, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("file", file);

    try {
      const res = await axios.post("https://frontend-224.onrender.com/create", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success") {
        setCreatedPost(res.data.post);
        alert("Post created successfully!");
        navigate("/"); // redirect to homepage after creation
      } else {
        alert("Error creating post");
      }
    } catch (err) {
      console.error("Error uploading post:", err);
      alert("Error uploading post");
    } finally {
      setLoading(false);
    }
  };

  if (!username) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="create-post-container">
      <form onSubmit={handleSubmit} className="post_form">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Subtitle"
          value={subtitle}
          onChange={e => setSubTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          cols="30"
          rows="10"
          required
        />
        <input
          type="text"
          placeholder="Author (username)"
          value={username}
          readOnly
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          accept="image/*"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Create Post"}
        </button>

        {createdPost && (
          <div className="post-info">
            <p><strong>Author ObjectId:</strong> {createdPost.author}</p>
            <p><strong>Author Username:</strong> {username}</p>
            <p><strong>Post ID:</strong> {createdPost._id}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;



