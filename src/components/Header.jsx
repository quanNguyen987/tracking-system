import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"; // Thêm onAuthStateChanged

export function Header() {
  const { url, route } = useLocation();
  const [user, setUser] = useState(null); // Trạng thái người dùng

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Cập nhật trạng thái người dùng
    });

    return () => unsubscribe(); // Cleanup khi component unmount
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Đăng xuất khỏi Firebase
      route("/"); // Chuyển hướng về trang đăng nhập
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
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
      <img src="logo-fet-iuh.jpg" alt="LogoFet" style={{ height: "40px" }} />

      <nav>
        <a href="/home" class={url == "/home" && "active"}>
          Home
        </a>
        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              padding: "0.75rem",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Đăng xuất
          </button>
        )}
      </nav>
    </header>
  );
}