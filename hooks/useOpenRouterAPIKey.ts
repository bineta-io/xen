import { useStorage } from "@plasmohq/storage/hook"

export const useOpenRouterAPIKey = () => {
  const [apiKey, setApiKey] = useStorage<string | null>("xen_openrouter_api_key")
  return [apiKey, setApiKey] as const
}
