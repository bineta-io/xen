import { useStorage } from "@plasmohq/storage/hook"

const defaultProfile = `By day, I'm a software engineer. 
By night, I'm the same, just in lower lighting and with more existential dread. 
I once explained a memory leak to a client using only interpretive dance. 
They didn't understand, but they did increase the budget by 20%.

My code has been described as 'functional,' which is the same word people use for airport architecture. 
I am a leading expert in my own custom-built framework, which currently has a user base of one and a half (my cat sometimes steps on the keyboard).

I don't 'work hard,' I work 'weird.' I solve problems by taking long, contemplative walks and asking squirrels for their input. 
Their advice is usually nuts, but occasionally, a gem slips through.

My ultimate career goal is to automate my own job so I can focus on my true passion: competitive napping. 
I am currently ranked 3rd in my time zone.
`

export const useProfile = () => {
  const [profile, setProfile] = useStorage<string>("xen_profile", (v) => v === "" ? defaultProfile : v)
  return [profile, setProfile] as const
}