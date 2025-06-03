import { useState, useEffect } from "preact/hooks";
import "./login.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useLocation } from "preact-iso";

export function Login() {
  const { route } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        route("/home");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      <form onSubmit={handleSubmit} class="login-form">
        <h2 style={{ color: "black" }}>🔐 Đăng nhập</h2>
        <h3 style={{ color: "black" }}>
          Hệ thống phát hiện đối tượng tình nghi{" "}
        </h3>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            
            padding: "1rem",
            borderRadius: "8px",
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#333",
            maxWidth: "400px",
          }}
        >
          <div>
            <strong>Sinh viên 1:</strong> Nguyễn Minh Quân
          </div>
          <div>
            <strong>Sinh viên 2:</strong> Nguyễn Đức Bảo Quốc
          </div>
          <div>
            <strong>GVHD:</strong> ThS. Tôn Thất Phùng
          </div>
        </div>

        {error && <p class="error">{error}</p>}
      </form>
    </div>
  );
}