import { useState } from "preact/hooks";
import "./login.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLocation } from "preact-iso";

export function Login() {
  const { route } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      route("/home");
    } catch (err) {
      setError("Email hoặc mật khẩu không đúng");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Đăng nhập</h2>
        <p className="subtitle">Hệ thống phát hiện đối tượng tình nghi</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onInput={(e) => setPassword(e.currentTarget.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}