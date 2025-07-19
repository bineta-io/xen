import "./index.css"
import { useState } from "react"
import { useOpenRouterAPIKey } from "~hooks/useOpenRouterAPIKey"
import { useAuth } from "~hooks/useAuth"
import Settings from "./Settings"

// Helper function to create noise texture CSS
const createNoiseBackground = (opacity = 0.05) => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "200px",
    opacity
  }
}

function IndexPopup() {
  const [apiKey, setApiKey] = useOpenRouterAPIKey()
  const { isAuthenticated, isLoading, logout, openAuthUrl } = useAuth()
  const [showSettings, setShowSettings] = useState(false)
  
  if (showSettings) {
    return <Settings onBack={() => setShowSettings(false)} />
  }

  // TODO: Replace with your actual auth URL
  const handleLogin = () => {
    openAuthUrl("https://xen-web-sable.vercel.app")
    // openAuthUrl("http://localhost:3000/") // for local testing
  }

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
      <h2
        style={{
          fontFamily: "'Archivo Black', 'Bebas Neue', Impact, sans-serif",
          fontWeight: 900,
          fontSize: 32,
          color: "#000",
          marginBottom: 0,
          letterSpacing: 2.5,
          alignSelf: "flex-start",
          transform: "rotate(-1.5deg)",
          textTransform: "uppercase",
          textShadow: "1px 1px 0 #FF3C38",
          position: "relative",
          zIndex: 1
        }}>
        Welcome to Xen
      </h2>
      <div
        style={{
          alignSelf: "flex-start",
          fontSize: 13,
          color: "#444",
          marginBottom: 2,
          fontFamily: "'Space Mono', 'Courier New', monospace",
          fontWeight: 700,
          letterSpacing: 2,
          marginTop: -14,
          transform: "rotate(-2deg)",
          backgroundColor: "#ffeb3b",
          padding: "1px 6px",
          position: "relative",
          zIndex: 1
        }}>
        by Bineta
      </div>

      {/* Authentication Status */}
      {isLoading ? (
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#f0f0f0",
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
          Loading...
        </div>
      ) : isAuthenticated ? (
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#90EE90",
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
          ✓ Logged in with subscription
        </div>
      ) : (
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
          {apiKey ? "Using OpenRouter API key" : "Login or enter OpenRouter API key"}
        </div>
      )}

      {/* Authentication Actions */}
      {!isAuthenticated && (
        <button
          onClick={handleLogin}
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#7DEDFF",
            border: "3px solid #000",
            borderRadius: 8,
            padding: "8px 16px",
            boxShadow: "5px 5px 0 #000",
            cursor: "pointer",
            transform: "rotate(0.5deg)",
            position: "relative",
            zIndex: 1,
            marginBottom: "8px"
          }}>
          Login with Subscription
        </button>
      )}

      {isAuthenticated && (
        <button
          onClick={logout}
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#FFB6C1",
            border: "3px solid #000",
            borderRadius: 8,
            padding: "8px 16px",
            boxShadow: "5px 5px 0 #000",
            cursor: "pointer",
            transform: "rotate(-0.5deg)",
            position: "relative",
            zIndex: 1,
            marginBottom: "8px"
          }}>
          Logout
        </button>
      )}

      {/* OpenRouter API Key section - only show if not authenticated */}
      {!isAuthenticated && (
        <>
          <div
            style={{
              fontSize: 11,
              fontFamily: "'Space Mono', 'Courier New', monospace",
              fontWeight: 700,
              color: "#444",
              letterSpacing: 1,
              textTransform: "uppercase",
              transform: "rotate(-1deg)",
              alignSelf: "flex-start",
              position: "relative",
              zIndex: 1
            }}>
            Or use OpenRouter:
          </div>
          <input
            onChange={(e) => {
              setApiKey(e.target.value)
            }}
            value={apiKey ?? ""}
            placeholder="API Key"
            className="neo-input"
          />
        </>
      )}

      {/* Settings button */}
      <button
        onClick={() => setShowSettings(true)}
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

export default IndexPopup
