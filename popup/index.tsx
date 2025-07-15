import { HashRouter, Navigate, Route, Routes } from "react-router-dom"

import { useSubscriptionsEnabled } from "~hooks/useSubscriptionEnabled"
import OpenRouterKey from "~popup/OpenRouterKey"

import Onboarding from "./Onboarding"
import Settings from "./Settings"

import "./index.css"

function PopupRouter() {
  const subscriptionsEnabled = useSubscriptionsEnabled();

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            subscriptionsEnabled ? (
              <Navigate replace to="/onboarding" />
            ) : (
              <Navigate replace to="/key" />
            )
          }
        />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route
          path="/key"
          element={<OpenRouterKey />}
        />
        <Route path="/settings" element={<Settings onBack={() => window.history.back()} />} />
      </Routes>
    </HashRouter>
  );
}

export default PopupRouter
