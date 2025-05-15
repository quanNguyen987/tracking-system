import { useEffect, useState } from "preact/hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation } from "preact-iso";

export function Home() {
  const [events, setEvents] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const { route } = useLocation();
  const formatTimestamp = (timestamp) => {
     const date = timestamp?.toDate();
    return date?.toLocaleString();
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        route("/");
      }
    });

    return () => unsubscribeAuth();
  }, [route]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tracking"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  const handleImageClick = (imgSrc) => {
    setFullscreenImage(imgSrc);
  };

  const handleCloseFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", color: "#fff", minHeight: "100vh" }}>
      <h1 class="home-title">🔍 Real-time Face Detection</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((event) => (
          <li
            key={event?.id}
            style={{
              background: "#1e1e1e",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(255,255,255,0.1)",
            }}
          >
            <img
              src={event?.img}
              alt="Motion thumbnail"
              style={{
                width: "120px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
                marginRight: "1rem",
                cursor: "pointer",
              }}
              onClick={() => handleImageClick(event.img)}
            />
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                ⏰ {formatTimestamp(event.timestamp)}
              </p>
              <p style={{ margin: 0, color: "#bbb" }}>📍 {event.location}</p>
            </div>
          </li>
        ))}
      </ul>

      {fullscreenImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={handleCloseFullscreen}
        >
          <img
            src={fullscreenImage}
            alt="Full Screen"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;