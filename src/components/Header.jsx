import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export function Header() {
  const { url, route } = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      route("/");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <header>
      <div>
        <img src="/logo-iuh.png" alt="Logo" />
        <img src="logo-fet-iuh.jpg" alt="LogoFet" />
      </div>
      <nav>
        <a href="/home" class={url === "/home" ? "active" : ""}>
          Home
        </a>
        {user && <button onClick={handleLogout}>Đăng xuất</button>}
      </nav>
    </header>
  );
}