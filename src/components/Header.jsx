import { useLocation } from "preact-iso";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export function Header() {
  const { url, route } = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      route("/");
    } catch (err) {
      console.error("Đăng xuất thất bại:", err);
    }
  };

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "0.5rem",
        justifyContent: "space-between",
        backgroundColor: "#282c34",
        color: "#fff",
      }}
    >
      <img src="/logo-iuh.png" alt="Logo" style={{ height: "40px" }} />
      <img src="/logo-fet-iuh.jpg" alt="LogoFet" style={{ height: "40px" }} />

      <nav>
        <button onClick={handleLogout} style={{
          background: "none",
          border: "1px solid #fff",
          color: "#fff",
          padding: "0.3rem 0.6rem",
          borderRadius: "4px",
          cursor: "pointer"
        }}>
          Đăng xuất
        </button>
      </nav>
    </header>
  );
}