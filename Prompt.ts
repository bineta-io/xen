export class Prompt {
  static generate(profile: string, tweet: string, writingStyle: string, systemPrompt: string) {
    return {
      system: systemPrompt
        .replace('[This will be replaced with user\'s profile]', profile)
        .replace('[This will be replaced with user\'s writing style]', writingStyle),
      user: `# ORIGINAL TWEET TO REPLY TO:
${tweet}

# YOUR TASK:
Follow the instructions and generate 1 reply. Think deeply and validate you followed the instructions before responding. It MUST NOT include anything else except the reply itself. `
    }
  }
}
