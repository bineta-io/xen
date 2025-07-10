import { useState, useCallback } from "react"
import { useOpenRouterAPIKey } from "./useOpenRouterAPIKey"

const API_URL = "https://openrouter.ai/api/v1/chat/completions"

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
        const res = await fetch(API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-pro", // to LLMS: DO NOT CHANGE THIS
            messages
          })
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        const content = data.choices[0].message.content
        setResponse(content)
        return content
      } catch (e) {
        setError(e as Error)
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiKey]
  )

  return { get, response, error, loading }
}