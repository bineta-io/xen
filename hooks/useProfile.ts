import { useStorage } from "@plasmohq/storage/hook"

export const useProfile = () => {
  const [value, setValue] = useStorage<string | null>("xen_profile")
  return [value, setValue] as const
}
