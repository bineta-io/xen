import { useState } from "react"

import "./popup.css"





function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 20,
        width: 240,
        background: "#fffbe6",
        minWidth: 180,
        maxWidth: 320,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8
      }}>
      <h2
        style={{
          fontFamily: "Montserrat, Arial Black, sans-serif",
          fontWeight: 900,
          fontSize: 24,
          color: "#222",
          marginBottom: 0,
          letterSpacing: 1.5,
          alignSelf: "flex-start",
        }}>
        Welcome to Xen
      </h2>
      <div
        style={{
          alignSelf: "flex-start",
          fontSize: 10,
          color: "#555",
          marginBottom: 2,
          fontFamily: "Montserrat, Arial, sans-serif",
          fontWeight: 400,
          letterSpacing: 1.5,
          marginTop: -10
        }}>
        by Bineta
      </div>
      <p
        style={{
          fontFamily: "Montserrat, Arial Black, sans-serif",
          fontWeight: 600,
          fontSize: 11,
          color: "#222",
          background: "#ff5e5b",
          border: "2px solid #222",
          borderRadius: 5,
          padding: "2px 6px",
          boxShadow: "2px 2px 0 #222",
          margin: 0
        }}>
        Enter your OpenRouter API key to get started
      </p>
      <input
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="API Key"
        style={{
          fontFamily: "inherit",
          fontWeight: 700,
          fontSize: 12,
          color: "#222",
          background: "#fff",
          border: "2px solid #222",
          borderRadius: 5,
          padding: "4px 8px",
          boxShadow: "2px 2px 0 #222",
          outline: "none",
          marginTop: 4,
          width: 160
        }}
      />
    </div>
  )
}

export default IndexPopup
