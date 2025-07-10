import { useStorage } from "@plasmohq/storage/hook"

export type ReplyMode = "one" | "multiple"

export const useReplyMode = () => {
  const [replyMode, setReplyMode] = useStorage<ReplyMode>("xen_reply_mode", "one")
  return [replyMode, setReplyMode] as const
}
