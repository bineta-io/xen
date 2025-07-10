export class Prompt {
  static generate(profile: string, tweet: string, writingStyle: string, systemPrompt: string) {
    return {
      system: systemPrompt
        .replace('[This will be replaced with user\'s profile]', profile)
        .replace('[This will be replaced with user\'s writing style]', writingStyle),
      user: `# ORIGINAL TWEET TO REPLY TO:
${tweet}

# YOUR TASK:
Generate 1 best reply. Think deeply abut it before responding. It MUST NOT include anything else except the reply itself, and no quotations. Think deeply before writing a reply that's funny, clever, shareable and likable by the audience of the tweety. Be concise and to the point. One sentence max.

## Important: Never, ever, ever mention anything about the profile, past experience or make any references related to the profile. Your reply should embody this persona, not talk about it.
`
    }
  }
}
