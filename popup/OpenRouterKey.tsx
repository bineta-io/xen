import "./index.css"
import { useNavigate } from "react-router-dom"
import { useOpenRouterAPIKey } from "~hooks/useOpenRouterAPIKey"
import { Header } from "~popup/components/Header"

// Helper function to create noise texture CSS
const createNoiseBackground = (opacity = 0.05) => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "200px",
    opacity
  }
}

function OpenRouterKey() {
  const [apiKey, setApiKey] = useOpenRouterAPIKey()
  const navigate = useNavigate()
  return (
    <div
      style={{
        padding: 28,
        width: 240,
        background: "#fffbe6",
        minWidth: 180,
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        border: "4px solid #000",
        borderRadius: 8,
        boxShadow: "8px 8px 0 #000",
        position: "relative",
        overflow: "hidden"
      }}>
      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          ...createNoiseBackground(0.08)
        }}
      />
      <Header />
      <div
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: "#000",
          background: "#FF3C38",
          border: "4px solid #000",
          borderRadius: 8,
          padding: "10px 14px",
          boxShadow: "5px 5px 0 #000",
          margin: "6px 0",
          width: "95%",
          textAlign: "center",
          transform: "rotate(1deg)",
          position: "relative",
          zIndex: 1
        }}>
        Enter your OpenRouter API key to get started
      </div>
      <input
        onChange={(e) => {
          setApiKey(e.target.value)
        }}
        value={apiKey ?? ""}
        placeholder="API Key"
        className="neo-input"
      />

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
          padding: "8px 16px",
          boxShadow: "5px 5px 0 #000",
          cursor: "pointer",
          transform: "rotate(-0.5deg)",
          position: "relative",
          zIndex: 1,
          marginTop: "8px"
        }}>
        Settings
      </button>
    </div>
  )
}

export default OpenRouterKey