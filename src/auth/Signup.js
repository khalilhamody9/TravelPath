import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const API = process.env.REACT_APP_API_BASE || "http://localhost:5000";

export default function Signup() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!name || !email || !pwd) return setErr("נא למלא שם, אימייל וסיסמה.");
    if (pwd.length < 6) return setErr("סיסמה חייבת להיות באורך 6 תווים לפחות.");
    if (pwd !== confirm) return setErr("הסיסמאות אינן תואמות.");

    try {
      setLoading(true);
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Signup failed");

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
        <h2>Create your account</h2>
        <p className="muted">Join TravelPath and start planning</p>

        {err && <div className="alert">{err}</div>}

        <div className="field">
          <label>Full name</label>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required />
        </div>

        <div className="field">
          <label>Email</label>
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>

        <div className="field">
          <label>Password</label>
          <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} required />
        </div>

        <div className="field">
          <label>Confirm password</label>
          <input type="password" value={confirm} onChange={(e)=>setConfirm(e.target.value)} required />
        </div>

        <button className="btn wide" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </button>

        <div className="divider"><span>or</span></div>

        <div className="socials">
          <button type="button" className="btn-outline wide">Sign up with Google</button>
          <button type="button" className="btn-outline wide">Sign up with Facebook</button>
        </div>

        <div className="switch-link">
          <span className="muted">Already have an account?</span>{" "}
          <Link to="/login" className="link">Sign in</Link>
        </div>

        {/* כפתור חזרה בתחתית */}

      </form>
    </div>
  );
}
