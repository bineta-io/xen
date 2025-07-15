export const Header = () => {
  return (
    <>

      <h2
        style={{
          fontFamily: "'Archivo Black', 'Bebas Neue', Impact, sans-serif",
          fontWeight: 900,
          fontSize: 28,
          color: "#000",
          marginBottom: 0,
          letterSpacing: 2,
          alignSelf: "flex-start",
          textTransform: "uppercase",
          textShadow: "1px 1px 0 #FF3C38",
          position: "relative",
          zIndex: 1,
          transform: "rotate(-1.5deg)",
        }}
      >
        Welcome to Xen
      </h2>

      <div
        style={{
          alignSelf: "flex-start",
          fontSize: 12,
          color: "#444",
          fontFamily: "'Space Mono', 'Courier New', monospace",
          fontWeight: 700,
          letterSpacing: 2,
          backgroundColor: "#ffeb3b",
          padding: "1px 6px",
          marginTop: -14,
          transform: "rotate(-2deg)",
          position: "relative",
          zIndex: 1,
        }}
      >
        by Bineta
      </div>
    </>
  )
}