import { useStorage } from "@plasmohq/storage/hook"

const defaultWritingStyle = `tone: professional
formality: balanced
length: concise
customInstructions: `

export const useWritingStyle = () => {
  const [writingStyle, setWritingStyle] = useStorage<string>("xen_writing_style", (v) => v === "" || v === undefined || v === null ? defaultWritingStyle : v)
  return [writingStyle, setWritingStyle] as const
}
