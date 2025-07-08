import "./popup.css"
import { useOpenRouterAPIKey } from "~hooks/useOpenRouterAPIKey"

function IndexPopup() {
  const [apiKey, setApiKey] = useOpenRouterAPIKey()
  return (
    <div
      style={{
        padding: 24,
        width: 240,
        background: "#fffbe6",
        minWidth: 180,
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        border: "3px solid #000",
        borderRadius: 8,
        boxShadow: "6px 6px 0 #000",
      }}>
      <h2
        style={{
          fontFamily: "Montserrat, Arial Black, sans-serif",
          fontWeight: 900,
          fontSize: 28,
          color: "#000",
          marginBottom: 0,
          letterSpacing: 2,
          alignSelf: "flex-start",
          transform: "rotate(-1deg)",
          textTransform: "uppercase",
        }}>
        Welcome to Xen
      </h2>
      <div
        style={{
          alignSelf: "flex-start",
          fontSize: 12,
          color: "#444",
          marginBottom: 2,
          fontFamily: "Montserrat, Arial, sans-serif",
          fontWeight: 500,
          letterSpacing: 1.8,
          marginTop: -12,
          transform: "rotate(-1deg)",
        }}>
        by Bineta
      </div>
      <div
        style={{
          fontFamily: "Montserrat, Arial Black, sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: "#000",
          background: "#FF3C38",
          border: "3px solid #000",
          borderRadius: 6,
          padding: "8px 12px",
          boxShadow: "4px 4px 0 #000",
          margin: "4px 0",
          width: "90%",
          textAlign: "center",
          transform: "rotate(0.5deg)",
        }}>
        Enter your OpenRouter API key to get started
      </div>
      <input
        onChange={(e) => {
          setApiKey(e.target.value)
        }}
        value={apiKey ?? ""}
        placeholder="API Key"
        style={{
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: 14,
          color: "#000",
          background: "#fff",
          border: "3px solid #000",
          borderRadius: 6,
          padding: "8px 12px",
          boxShadow: "4px 4px 0 #000",
          outline: "none",
          marginTop: 8,
          width: "85%",
          transition: "transform 0.1s, box-shadow 0.1s",
          ":focus": {
            transform: "translate(2px, 2px)",
            boxShadow: "2px 2px 0 #000",
          }
        }}
      />
    </div>
  )
}

export default IndexPopup