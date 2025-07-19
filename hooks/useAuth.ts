import { useStorage } from "@plasmohq/storage/hook"
import { useEffect, useState } from "react"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export const useAuth = () => {
  const [token, setToken] = useStorage<string | null>("xen_jwt_token")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Simple JWT token validation (check if token exists and is not expired)
  const validateToken = (token: string | null): boolean => {
    if (!token) return false
    
    try {
      // Parse JWT token to check expiry
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Math.floor(Date.now() / 1000)
      
      // Check if token is expired
      if (payload.exp && payload.exp < currentTime) {
        return false
      }
      
      return true
    } catch (error) {
      console.error("Invalid JWT token:", error)
      return false
    }
  }

  // Check authentication status when token changes
  useEffect(() => {
    setIsLoading(true)
    const isValid = validateToken(token)
    setIsAuthenticated(isValid)
    setIsLoading(false)
    
    // If token is invalid/expired, remove it
    if (!isValid && token) {
      setToken(null)
    }
  }, [token, setToken])

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
  }

  const openAuthUrl = (authUrl: string) => {
    chrome.tabs.create({ url: authUrl })
  }

  return {
    token,
    isAuthenticated,
    isLoading,
    logout,
    openAuthUrl
  }
}
