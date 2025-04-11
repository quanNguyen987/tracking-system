import { useEffect } from "preact/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation } from "preact-iso";

export function Home() {
  const { route } = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) route("/");
    });
    return () => unsubscribeAuth();
  }, [route]);

  return (
    <div class="home" style={{ padding: "2rem", fontFamily: "Arial, sans-serif", minHeight: "100vh", color: "#fff" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "1.5rem", color: "#fff" }}>
        🔍 Real-time Face Detection
      </h1>
      <img
        src="http://192.168.1.147:5000/video_feed"
        alt="Real-time video"
        style={{ width: "640px", height: "480px", objectFit: "cover", borderRadius: "8px" }}
      />
    </div>
  );
}

export default Home;