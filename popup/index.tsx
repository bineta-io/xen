import { HashRouter, Route, Routes } from "react-router-dom"

import { useAuth } from "~hooks/useAuth"
import OpenRouterKey from "~popup/OpenRouterKey"

import MainPopup from "./MainPopup"
import Settings from "./Settings"

import "./index.css"

function PopupRouter() {
  const { isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
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
          justifyContent: "center",
          gap: 16,
          border: "4px solid #000",
          borderRadius: 8,
          boxShadow: "8px 8px 0 #000",
          position: "relative",
        }}
      >
        <div
          style={{
            fontFamily: "'Space Grotesk', 'Arial Black', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: "#000",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPopup />} />
        <Route path="/key" element={<OpenRouterKey />} />
        <Route path="/settings" element={<Settings onBack={() => window.history.back()} />} />
      </Routes>
    </HashRouter>
  );
}

export default PopupRouter
