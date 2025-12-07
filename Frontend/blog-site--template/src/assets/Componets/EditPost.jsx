import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";
import "./EditPost.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useContext(userContext);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    file: null,
    preview: "",
  });

  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState(false);

  // Fetch post data
  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:3000/getpostbyid/${id}`, { withCredentials: true })
      .then((res) => {
        const post = res.data;

        setFormData({
          title: post.title,
          subtitle: post.subtitle,
          content: post.content,
          file: null,
          preview: post.imageUrl,
        });

        setAuthor(post.author);
        setOwner(user.email === post.authorEmail); // only owner can edit/delete
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id, user]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        file: files[0],
        preview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("subtitle", formData.subtitle);
    data.append("content", formData.content);
    if (formData.file) data.append("file", formData.file);

    try {
      await axios.put(`http://localhost:3000/editpost/${id}`, data, {
        withCredentials: true,
      });
      alert("Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (err) {
      console.log(err);
      alert("Failed to update post.");
    }
  };

  // Delete post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:3000/deletepost/${id}`, {
        withCredentials: true,
      });
      alert("Post deleted successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Failed to delete post.");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logout", { withCredentials: true });
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Logout failed!");
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (!owner) return <div>You cannot edit this post.</div>;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">My Blog</div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Edit Post Form */}
      <div className="editpost-container">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Subtitle</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input type="text" value={author} disabled />
          </div>

          <div className="form-group">
            <label>Image (optional)</label>
            <input type="file" name="file" onChange={handleChange} />
            {formData.preview && (
              <img src={formData.preview} alt="Preview" className="image-preview" />
            )}
          </div>

          <button type="submit">Save Changes</button>
          <button type="button" className="delete-button" onClick={handleDelete}>
            Delete Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;









