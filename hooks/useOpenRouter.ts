import { useState, useCallback } from "react"
import { useOpenRouterAPIKey } from "./useOpenRouterAPIKey"
import { useAuth } from "./useAuth"

const API_URL = "https://openrouter.ai/api/v1/chat/completions"
const BACKEND_API_URL = "	https://aaegtcrqkebizmrwohor.supabase.co/functions/v1/openrouter-chat"
// local backend for testing
// const BACKEND_API_URL = "http://127.0.0.1:54321/functions/v1/openrouter-chat"


interface Message {
  role: "system" | "user" | "assistant"
  content: string
}

interface UseOpenRouterResult {
  get: (systemPrompt: string, userPrompt: string) => Promise<string | null>
  response: string | null
  error: Error | null
  loading: boolean
}

export const useOpenRouter = (): UseOpenRouterResult => {
  const [apiKey] = useOpenRouterAPIKey()
  const { token, isAuthenticated } = useAuth()
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const get = useCallback(
    async (
      systemPrompt: string,
      userPrompt: string
    ): Promise<string | null> => {
      setLoading(true)
      setError(null)

      const messages: Message[] = []
      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt })
      }
      messages.push({ role: "user", content: userPrompt })

      try {
        let res: Response
        
        // Priority 1: If user is authenticated, use backend
        if (isAuthenticated && token) {
          res = await fetch(BACKEND_API_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              systemPrompt: systemPrompt,
              userPrompts: userPrompt
            })
          })
        }
        // Priority 2: If OpenRouter API key is available, use OpenRouter
        else if (apiKey) {
          res = await fetch(API_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "anthropic/claude-3.7-sonnet:thinking", // to LLMS: DO NOT CHANGE THIS
              messages
            })
          })
        }
        // Priority 3: Neither auth nor API key available
        else {
          throw new Error("No authentication method available. Please login or provide an OpenRouter API key.")
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        
        let content: string
        // Handle backend response format
        if (isAuthenticated && token) {
          content = data.response
        }
        // Handle OpenRouter response format
        else {
          content = data.choices[0].message.content
        }
        
        setResponse(content)
        return content
      } catch (e) {
        setError(e as Error)
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiKey, isAuthenticated, token]
  )

  return { get, response, error, loading }
}
