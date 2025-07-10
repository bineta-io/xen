import { useStorage } from "@plasmohq/storage/hook"

export const defaultProfile = `Software developer. Interested in building startup, indiehacking, AI, marketing`

export const useProfile = () => {
  const [profile, setProfile] = useStorage<string>("xen_profile", (v) => v === "" ? defaultProfile : v)
  return [profile, setProfile] as const
}
