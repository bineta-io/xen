import { useStorage } from "@plasmohq/storage/hook"

export const defaultWritingStyle = `
Write in a "Conversational Professional" style with these characteristics:

## Tone & Voice
- Direct but warm and approachable
- Professional without being overly formal or academic
- Use subtle humor and relatable observations when appropriate
- Address the reader directly using "you" to create connection

## Sentence Structure
- Use smooth, connected sentences rather than choppy fragments
- Prefer flowing, natural sentence structure over short, punchy phrases
- Write in a way that feels like helpful advice from a knowledgeable friend

## Clarity & Communication
- Be straightforward and cut through unnecessary fluff
- Explain complex ideas using relatable analogies and familiar comparisons
- Focus on practical, actionable information
- Avoid jargon, academic language, or overly technical terms

## What to Avoid
- Excessive detail or flowery descriptions
- Overly casual slang or unprofessional expressions
- Fragmented, choppy writing
- Cold, impersonal, or bureaucratic tone
- Academic or corporate jargon

## Overall Goal
Write like a knowledgeable friend giving practical advice—professional enough for work contexts, personal enough to connect with readers, and clear enough that anyone can understand and act on the information.
`

export const useWritingStyle = () => {
  const [writingStyle, setWritingStyle] = useStorage<string>("xen_writing_style", (v) => v === "" || v === undefined || v === null ? defaultWritingStyle : v)
  return [writingStyle, setWritingStyle] as const
}
