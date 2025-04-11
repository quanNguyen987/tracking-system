import { useLocation } from "preact-iso";

export function Header() {
  const { url } = useLocation();

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
      <img src='/logo-iuh.png' alt="Logo" style={{ height: "40px" }} />
      <img src='logo-fet-iuh.jpg' alt="LogoFet" style={{ height: "40px" }} />

      <nav>
        <a href="/home" class={url == "/home" && "active"}>
          Home
        </a>
        {/* <a href="/404" class={url == '/404' && 'active'}>
					404
				</a> */}
      </nav>
    </header>
  );
}