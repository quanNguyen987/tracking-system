import { useState } from "preact/hooks";
import "./login.css";
import { auth } from "../../firebase"; // Import Firebase
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
      // Gọi Firebase Authentication API
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
    <div class="login-container">
      <h2 style={{ color: "black" }}>🔐 Đăng nhập</h2>
      <form onSubmit={handleSubmit} class="login-form">
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
        {error && <p class="error">{error}</p>}
      </form>
    </div>
  );
}