import { useEffect, useState } from "preact/hooks";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // Import Firebase DB
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { useLocation } from "preact-iso"; // Import useLocation for routing

export function Home() {
  const [events, setEvents] = useState([]);
  const [fullscreenImage, setFullscreenImage] = useState(null); // Trạng thái để kiểm tra ảnh full screen
  const { route } = useLocation();
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    let date;

    // Firestore Timestamp object (has .toDate())
    if (typeof timestamp.toDate === "function") {
      date = timestamp.toDate();
    }
    // String (try parsing)
    else if (typeof timestamp === "string") {
      date = new Date(timestamp);
    }
    // Fallback for raw Date object
    else if (timestamp instanceof Date) {
      date = timestamp;
    }

    return date instanceof Date && !isNaN(date.getTime())
      ? date.toLocaleString()
      : "";
  };

  // Kiểm tra trạng thái đăng nhập của người dùng
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        route("/"); // Chuyển hướng người dùng nếu chưa đăng nhập
      }
    });

    return () => unsubscribeAuth(); // Cleanup khi component unmount
  }, [route]);

  // Lắng nghe sự thay đổi từ Firestore
  useEffect(() => {
    const q = query(
      collection(db, "tracking"),
      orderBy("timestamp", "desc") // "asc" cho tăng dần, "desc" cho giảm dần
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(data);
    });

    return () => unsubscribe();
  }, []);

  // Hàm mở full screen khi bấm vào ảnh
  const handleImageClick = (imgSrc) => {
    setFullscreenImage(imgSrc); // Set ảnh full screen
  };

  // Hàm đóng full screen
  const handleCloseFullscreen = () => {
    setFullscreenImage(null); // Đóng ảnh full screen
  };

  return (
    <div
      class="home"
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        color: "#fff", // Text color for dark mode
      }}
    >
      <h1
        style={{
          fontSize: "1.8rem",
          marginBottom: "1.5rem",
          color: "#fff", // Title text color
        }}
      >
        🔍 Danh sách phát hiện đối tượng tình nghi
      </h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {events.map((event) => (
          <li
            key={event?.id}
            style={{
              background: "#1e1e1e", // Darker card background
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              boxShadow: "0 2px 6px rgba(255,255,255,0.1)", // Light shadow for dark mode
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
            <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                ⏰ {formatTimestamp(event.timestamp)}
              </p>
              <p style={{ margin: 0, color: "#bbb" }}>👤 {event?.full_name}</p>
              <p style={{ margin: 0, color: "#bbb" }}>⭐  {event?.id}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal Full Screen */}
      {fullscreenImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Màu nền đen mờ
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999, // Đảm bảo modal luôn nằm trên cùng
          }}
          onClick={handleCloseFullscreen} // Đóng full screen khi bấm vào vùng ngoài ảnh
        >
          <img
            src={fullscreenImage}
            alt="Full Screen"
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              cursor: "pointer", // Thêm cursor pointer khi hover
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;