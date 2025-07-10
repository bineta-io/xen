import React from "react"
import { useProfile, defaultProfile } from "~hooks/useProfile"
import "./index.css"

// Helper function to create noise texture CSS (consistent with index.tsx)
const createNoiseBackground = (opacity = 0.05) => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "200px",
    opacity
  }
}

interface EditProfileProps {
  onSave: () => void
}

const EditProfile: React.FC<EditProfileProps> = ({ onSave }) => {
  const [profile, setProfile] = useProfile()
  
  const handleReset = () => {
    setProfile(defaultProfile)
  }
  
  const handleSave = () => {
    onSave()
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
        overflow: "hidden",
      }}>
      {/* Noise texture overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        ...createNoiseBackground(0.08)
      }} />
      <h2
        style={{
          fontFamily: "'Archivo Black', 'Bebas Neue', Impact, sans-serif",
          fontWeight: 900,
          fontSize: 28,
          color: "#000",
          marginBottom: 0,
          letterSpacing: 2,
          alignSelf: "flex-start",
          transform: "rotate(-1.5deg)",
          textTransform: "uppercase",
          textShadow: "1px 1px 0 #FF3C38",
          position: "relative",
          zIndex: 1,
        }}>
        Edit Profile
      </h2>
      
      <div
        style={{
          alignSelf: "flex-start",
          fontSize: 13,
          color: "#444",
          marginBottom: 10,
          fontFamily: "'Space Mono', 'Courier New', monospace",
          fontWeight: 700,
          letterSpacing: 1,
          transform: "rotate(-1deg)",
          backgroundColor: "#ffeb3b",
          padding: "1px 6px",
          position: "relative",
          zIndex: 1,
        }}>
        Your profile description
      </div>
      
      <textarea
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
        placeholder={defaultProfile}
        className="neo-input"
        style={{
          width: "100%",
          minHeight: "200px",
          resize: "vertical",
          fontFamily: "'Space Grotesk', 'Arial', sans-serif",
          padding: "10px",
          border: "3px solid #000",
          borderRadius: "6px",
          backgroundColor: "#fff",
          boxShadow: "4px 4px 0 #000",
          lineHeight: "1.5",
          overflowY: "auto"
        }}
      />
      
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        width: "100%",
        marginTop: "10px",
        gap: "10px"
      }}>
        <button
          onClick={handleReset}
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#ff9800",
            border: "3px solid #000",
            borderRadius: 6,
            padding: "8px 12px",
            boxShadow: "4px 4px 0 #000",
            cursor: "pointer",
            transform: "rotate(-1deg)",
            position: "relative",
            zIndex: 1,
          }}>
          Reset
        </button>
        <button
          onClick={handleSave}
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: "#000",
            background: "#4caf50",
            border: "3px solid #000",
            borderRadius: 6,
            padding: "8px 12px",
            boxShadow: "4px 4px 0 #000",
            cursor: "pointer",
            transform: "rotate(1deg)",
            position: "relative",
            zIndex: 1,
          }}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditProfile
