import { useState } from "react"
import EditProfile from "./EditProfile"
import EditWritingStyle from "./EditWritingStyle"
import EditSystemPrompt from "./EditSystemPrompt"
import { useReplyMode } from "../hooks/useReplyMode"

// Helper function to create noise texture CSS
const createNoiseBackground = (opacity = 0.05) => {
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    backgroundBlendMode: "overlay",
    backgroundSize: "200px",
    opacity
  }
}

interface SettingsProps {
  onBack: () => void
}

function Settings({ onBack }: SettingsProps) {
  const [showProfileEditor, setShowProfileEditor] = useState(false)
  const [showWritingStyleEditor, setShowWritingStyleEditor] = useState(false)
  const [showSystemPromptEditor, setShowSystemPromptEditor] = useState(false)
  const [replyMode, setReplyMode] = useReplyMode()
  
  if (showProfileEditor) {
    return <EditProfile onSave={() => setShowProfileEditor(false)} />
  }
  
  if (showWritingStyleEditor) {
    return <EditWritingStyle onSave={() => setShowWritingStyleEditor(false)} />
  }
  
  if (showSystemPromptEditor) {
    return <EditSystemPrompt onSave={() => setShowSystemPromptEditor(false)} />
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
      
      {/* Back button */}
      <button
        onClick={onBack}
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
          zIndex: 1,
          marginTop: 20
        }}>
        Settings
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
        Customize your experience
      </div>

      {/* Profile section */}
      <button
        onClick={() => setShowProfileEditor(true)}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 12,
          color: "#000",
          background: "#7DEDFF",
          border: "2px solid #000",
          borderRadius: 6,
          padding: "4px 8px",
          boxShadow: "3px 3px 0 #000",
          cursor: "pointer",
          transform: "rotate(1deg)",
          position: "relative",
          zIndex: 1,
          marginBottom: "8px"
        }}>
        Edit profile
      </button>
      
      {/* Writing Style section */}
      <button
        onClick={() => setShowWritingStyleEditor(true)}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 12,
          color: "#000",
          background: "#90EE90",
          border: "2px solid #000",
          borderRadius: 6,
          padding: "4px 8px",
          boxShadow: "3px 3px 0 #000",
          cursor: "pointer",
          transform: "rotate(-1deg)",
          position: "relative",
          zIndex: 1,
          marginBottom: "8px"
        }}>
        Edit writing style
      </button>
      
      {/* System Prompt section */}
      <button
        onClick={() => setShowSystemPromptEditor(true)}
        style={{
          fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 12,
          color: "#000",
          background: "#E1BEE7",
          border: "2px solid #000",
          borderRadius: 6,
          padding: "4px 8px",
          boxShadow: "3px 3px 0 #000",
          cursor: "pointer",
          transform: "rotate(1deg)",
          position: "relative",
          zIndex: 1,
          marginBottom: "8px"
        }}>
        Edit system prompt
      </button>
      
      {/* Reply Mode section */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          position: "relative",
          zIndex: 1
        }}>
        <div
          style={{
            fontSize: 11,
            fontFamily: "'Space Mono', 'Courier New', monospace",
            fontWeight: 700,
            color: "#444",
            letterSpacing: 1,
            textTransform: "uppercase",
            transform: "rotate(-1deg)",
            alignSelf: "flex-start"
          }}>
          Reply Mode
        </div>
        <div
          style={{
            display: "flex",
            gap: 6,
            width: "100%"
          }}>
          <button
            onClick={() => setReplyMode("one")}
            style={{
              fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: "#000",
              background: replyMode === "one" ? "#FFD700" : "#f0f0f0",
              border: "2px solid #000",
              borderRadius: 6,
              padding: "6px 12px",
              boxShadow: replyMode === "one" ? "4px 4px 0 #000" : "2px 2px 0 #000",
              cursor: "pointer",
              transform: replyMode === "one" ? "rotate(-1deg)" : "rotate(0deg)",
              position: "relative",
              zIndex: 1,
              flex: 1
            }}>
            One Reply
          </button>
          <button
            onClick={() => setReplyMode("multiple")}
            style={{
              fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: "#000",
              background: replyMode === "multiple" ? "#FFD700" : "#f0f0f0",
              border: "2px solid #000",
              borderRadius: 6,
              padding: "6px 12px",
              boxShadow: replyMode === "multiple" ? "4px 4px 0 #000" : "2px 2px 0 #000",
              cursor: "pointer",
              transform: replyMode === "multiple" ? "rotate(1deg)" : "rotate(0deg)",
              position: "relative",
              zIndex: 1,
              flex: 1
            }}>
            Multiple Replies
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings
