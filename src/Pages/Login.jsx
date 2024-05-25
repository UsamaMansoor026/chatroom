import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="form_container">
      <div className="form_wrapper">
        <span className="logo">Usama ChatRoom</span>
        <span className="title">LogIn</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email..." />
          <input type="password" placeholder="Password..." />

          <button>Log In</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Don't have an account? <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
