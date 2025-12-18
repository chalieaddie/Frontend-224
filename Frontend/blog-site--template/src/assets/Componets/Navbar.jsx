
import "./Navbar.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import axios from "axios";

const Navbar = () => {
  const { username, setUser } = useContext(userContext); // get username and setUser
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/logout", { withCredentials: true });
      setUser({}); // immediately clear user context
      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar-header">
      <div><h3>Developers Blog</h3></div>
      <div>
        <Link to="/" className="link">Home</Link>
        {username && <Link to="/createPost" className="link">Create Post</Link>}
      </div>

      {username ? (
        <div>
          <input
            type="button"
            value="Logout"
            onClick={handleLogout}
            className="btn_input"
          />
        </div>
      ) : (
        <div>
          <h5>
            <Link to="/register" className="link">Register/Login</Link>
          </h5>
        </div>
      )}
    </div>
  );
};

export default Navbar;