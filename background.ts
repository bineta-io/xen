import { Storage } from "@plasmohq/storage"

const storage = new Storage()

// Listen for external messages from your web app
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log("External message received:", request, "from:", sender)
    
    if (request.type === "AUTH_TOKEN") {
      // Validate the message has the required token
      if (request.token && typeof request.token === "string") {
        // Store the JWT token
        storage.set("xen_jwt_token", request.token)
          .then(() => {
            console.log("JWT token stored successfully")
            sendResponse({ success: true, message: "Token stored successfully" })
          })
          .catch((error) => {
            console.error("Failed to store JWT token:", error)
            sendResponse({ success: false, message: "Failed to store token" })
          })
      } else {
        console.error("Invalid token in external message")
        sendResponse({ success: false, message: "Invalid token" })
      }
      return true // Keep the message channel open for async response
    }
    
    if (request.type === "LOGOUT") {
      // Remove the stored token
      storage.remove("xen_jwt_token")
        .then(() => {
          console.log("JWT token removed successfully")
          sendResponse({ success: true, message: "Logged out successfully" })
        })
        .catch((error) => {
          console.error("Failed to remove JWT token:", error)
          sendResponse({ success: false, message: "Failed to logout" })
        })
      return true // Keep the message channel open for async response
    }
    
    // Unknown message type
    sendResponse({ success: false, message: "Unknown message type" })
    return false
  }
)

// Optional: Listen for tab updates to detect when auth is complete
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // This can be used to detect when user completes auth flow
  // and potentially close the auth tab automatically
  if (changeInfo.status === 'complete' && tab.url?.includes('your-auth-success-url')) {
    // You can add logic here to close the auth tab after successful login
    console.log("Auth flow potentially completed")
  }
})

export {}
