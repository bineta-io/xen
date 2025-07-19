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

function AuthenticatedDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
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
      
      {/* Welcome message */}
      <div
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#000",
          background: "#90EE90",
          border: "4px solid #000",
          borderRadius: 8,
          padding: "12px 16px",
          boxShadow: "5px 5px 0 #000",
          width: "95%",
          textAlign: "center",
          transform: "rotate(1deg)",
          position: "relative",
          zIndex: 1
        }}
      >
        ✓ You're logged in!
        <div style={{ fontSize: 12, marginTop: 4, fontWeight: 500 }}>
          Ready to generate AI replies
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12, position: "relative", zIndex: 1 }}>
        {/* Settings button */}
        <button
          onClick={() => navigate("/settings")}
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#FFD700",
            border: "3px solid #000",
            borderRadius: 8,
            padding: "12px 16px",
            boxShadow: "5px 5px 0 #000",
            cursor: "pointer",
            transform: "rotate(-0.5deg)",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
        >
          ⚙️ Settings
        </button>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#FFB6C1",
            border: "3px solid #000",
            borderRadius: 8,
            padding: "12px 16px",
            boxShadow: "5px 5px 0 #000",
            cursor: "pointer",
            transform: "rotate(0.5deg)",
            transition: "transform 0.1s, box-shadow 0.1s",
          }}
        >
          🚪 Logout
        </button>
      </div>

      {/* Usage info */}
      <div
        style={{
          fontSize: 11,
          fontFamily: "'Space Mono', 'Courier New', monospace",
          fontWeight: 700,
          color: "#666",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          background: "#f5f5f5",
          border: "2px solid #ccc",
          borderRadius: 4,
          padding: "6px 8px",
          transform: "rotate(-0.5deg)",
        }}
      >
        Navigate to X/Twitter and start<br />
        replying with AI assistance!
      </div>
    </div>
  );
}

export default AuthenticatedDashboard;
