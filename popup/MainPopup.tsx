import { useNavigate } from "react-router-dom";
import { useAuth } from "~hooks/useAuth";
import { Header } from "~popup/components/Header";

// Helper function to create noise texture CSS
const createNoiseBackground = (opacity = 0.05) => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "200px",
    opacity
  };
};

function MainPopup() {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthUrl, logout } = useAuth();

  const handleLogin = () => {
    openAuthUrl("https://xen-web-sable.vercel.app");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      style={{
        padding: 28,
        width: 260,
        background: "#fffbe6",
        minWidth: 200,
        maxWidth: 340,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        border: "4px solid #000",
        borderRadius: 8,
        boxShadow: "8px 8px 0 #000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          ...createNoiseBackground(0.08),
        }}
      />
      
      <Header />
      
      {/* Option 1: Login/Logout */}
      <button
        onClick={isAuthenticated ? handleLogout : handleLogin}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#000",
          background: isAuthenticated ? "#FFB6C1" : "#90EE90",
          border: "4px solid #000",
          borderRadius: 8,
          padding: "14px 18px",
          boxShadow: "6px 6px 0 #000",
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          transform: "rotate(1deg)",
          position: "relative",
          zIndex: 1,
          transition: "transform 0.1s, box-shadow 0.1s",
        }}
      >
        {isAuthenticated ? (
          <>
            🚪 Log out
          </>
        ) : (
          <>
            🚀 Log in
            <br />
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                display: "block",
                marginTop: 4,
              }}
            >
              10 free replies for new users
            </span>
          </>
        )}
      </button>

      {/* Option 2: Use your own OpenRouter API key */}
      <button
        onClick={() => navigate("/key")}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 500,
          fontSize: 12,
          color: "#666",
          background: "#f5f5f5",
          border: "2px solid #ccc",
          borderRadius: 6,
          padding: "8px 12px",
          boxShadow: "2px 2px 0 #ccc",
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
          transition: "transform 0.1s, box-shadow 0.1s",
        }}
      >
        Use your own OpenRouter API key
      </button>

      {/* Option 3: Settings */}
      <button
        onClick={() => navigate("/settings")}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#000",
          background: "#FFD700",
          border: "4px solid #000",
          borderRadius: 8,
          padding: "14px 18px",
          boxShadow: "6px 6px 0 #000",
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          transform: "rotate(0.5deg)",
          position: "relative",
          zIndex: 1,
          transition: "transform 0.1s, box-shadow 0.1s",
        }}
      >
        ⚙️ Settings
      </button>
    </div>
  );
}

export default MainPopup;
