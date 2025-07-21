import { useNavigate } from "react-router-dom";
import { useAuth } from "~hooks/useAuth";
import { Header } from "~popup/components/Header"

// Helper function to create noise texture CSS (consistent with index.tsx)
const createNoiseBackground = (opacity = 0.05) => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "200px",
    opacity
  };
};
function Onboarding() {
  const navigate = useNavigate();
  const { openAuthUrl } = useAuth();

  const handleLogin = () => {
    openAuthUrl("https://xen.bineta.io/");
    // openAuthUrl("http://localhost:3000/") // for local testing
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
      {/* Free trial */}
      <button
        onClick={() => navigate("/key")}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#000",
          background: "#7EC8E3",
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
        Use free trial
        <br />
        <span
          style={{
            fontSize: 12,
            fontWeight: 500,
            display: "block",
            marginTop: 4,
          }}
        >
          Test it out with 20 replies
        </span>
      </button>

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          background: "#90EE90",
          border: "3px solid #000",
          borderRadius: 8,
          padding: "12px 14px",
          boxShadow: "5px 5px 0 #000",
          cursor: "pointer",
          textAlign: "center",
          transform: "rotate(-1deg)",
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          position: "relative",
          zIndex: 1,
          marginTop: 4,
          transition: "transform 0.1s, box-shadow 0.1s",
        }}
      >
        <div
          style={{
            fontWeight: 800,
            fontSize: 16,
            padding: "2px 8px",
            transform: "rotate(0.5deg)",
            marginBottom: 4,
          }}
        >
          🚀 Login & Subscribe Pro
        </div>
        <div style={{ fontSize: 12, marginTop: 4, fontWeight: 600 }}>
          €10/month • 1K replies monthly
        </div>
      </button>

      {/* Advanced users link */}
      <button
        onClick={() => navigate("/key")}
        style={{
          background: "#c2f0ff",
          border: "2px solid #000",
          borderRadius: 6,
          color: "#000",
          fontSize: 12,
          cursor: "pointer",
          marginTop: 10,
          padding: "6px 10px",
          fontFamily: "'Space Mono', 'Courier New', monospace",
          fontWeight: 700,
          position: "relative",
          zIndex: 1,
          boxShadow: "3px 3px 0 #000",
          transform: "rotate(0.5deg)",
        }}
      >
        Use your own Open Router API key
      </button>
    </div>
  );
}

export default Onboarding;
