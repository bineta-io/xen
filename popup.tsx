import { useState } from "react"
import "./popup.css"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        padding: 20,
        width: 240,
        background: '#fffbe6',
        minWidth: 180,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8
      }}>
      <h2
        style={{
          fontFamily: 'Montserrat, Arial Black, sans-serif',
          fontWeight: 900,
          fontSize: 15,
          color: '#222',
          textShadow: '1px 1px 0 #ff5e5b, 2px 2px 0 #222',
          marginBottom: 2,
          letterSpacing: 0.5
        }}
      >
        Welcome to Xen by Bineta
      </h2>
      <p
        style={{
          fontFamily: 'Montserrat, Arial Black, sans-serif',
          fontWeight: 600,
          fontSize: 11,
          color: '#222',
          background: '#ff5e5b',
          border: '2px solid #222',
          borderRadius: 5,
          padding: '2px 6px',
          boxShadow: '2px 2px 0 #222',
          margin: 0
        }}
      >
        Enter your OpenRouter API key to get started
      </p>
      <input
        onChange={(e) => setData(e.target.value)}
        value={data}
        placeholder="API Key"
        style={{
          fontFamily: 'inherit',
          fontWeight: 700,
          fontSize: 12,
          color: '#222',
          background: '#fff',
          border: '2px solid #222',
          borderRadius: 5,
          padding: '4px 8px',
          boxShadow: '2px 2px 0 #222',
          outline: 'none',
          marginTop: 4,
          width: 160
        }}
      />
    </div>
  )
}

export default IndexPopup
