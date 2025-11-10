import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // אייקון מודרני (מותאם לשימוש עם shadcn או lucide-react)

const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) return setErr("נא למלא אימייל וסיסמה.");

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      {/* 🔹 כפתור חזרה למעלה משמאל */}
      <button
        onClick={() => nav("/")}
        className="back-top-btn"
        aria-label="Back to Home"
      >
        <ArrowLeft size={22} />
      </button>

      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Welcome back</h2>
        <p className="muted">Log in to continue planning your trip</p>

        {err && <div className="alert">{err}</div>}

        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>

        <div className="field">
          <label>Password</label>
          <div className="pwd-box">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e)=>setPwd(e.target.value)}
              required
            />
            <button type="button" className="tiny" onClick={()=>setShowPwd(s=>!s)}>
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="row">
          <label className="chk">
            <input type="checkbox" defaultChecked /> <span>Remember me</span>
          </label>
          <button type="button" className="link" onClick={()=>alert("Forgot password (later)")}>
            Forgot password?
          </button>
        </div>

        <button className="btn wide" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>

        <div className="divider"><span>or</span></div>

        <div className="socials">
          <button type="button" className="btn-outline wide">Continue with Google</button>
          <button type="button" className="btn-outline wide">Continue with Facebook</button>
        </div>

        <div className="switch-link">
          <span className="muted">New here?</span>{" "}
          <Link to="/signup" className="link">Create an account</Link>
        </div>

        {/* כפתור חזרה בתחתית */}

      </form>
    </div>
  );
}
