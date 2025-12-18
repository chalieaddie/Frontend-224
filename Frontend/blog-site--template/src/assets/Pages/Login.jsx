import "./Login.css";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(userContext); // to update context immediately

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update context immediately
        setUser({ username: res.data.username, email });
        navigate("/"); // redirect to home
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="Login_container">
      <div className="Login_form">
        <h2>Login</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="Login_form_input"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              className="Login_form_input"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="Login_button">Login</button>
        </form>

        <br />

        <p>Don't have an account?</p>
        <Link to="/register">
          <button className="signup_button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;



















