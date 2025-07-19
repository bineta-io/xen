import "./index.css"
import { useNavigate } from "react-router-dom"
import { useOpenRouterAPIKey } from "~hooks/useOpenRouterAPIKey"

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
      
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 12,
          color: "#000",
          background: "#f0f0f0",
          border: "2px solid #000",
          borderRadius: 6,
          padding: "4px 8px",
          boxShadow: "3px 3px 0 #000",
          cursor: "pointer",
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1
        }}>
        ← Back
      </button>
      
      <div
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#000",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          marginTop: 20
        }}>
        Add your OpenRouter key
      </div>
      
      <input
        onChange={(e) => {
          setApiKey(e.target.value)
        }}
        value={apiKey ?? ""}
        placeholder="Enter your OpenRouter API key..."
        className="neo-input"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  )
}

export default OpenRouterKey
