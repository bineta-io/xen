export class Prompt {

  static taskPrompt1reply = `Follow the instructions and generate 1 reply. Think deeply and validate you followed the instructions before responding. It MUST NOT include anything else except the reply itself. `

  static taskPrompt3replies = `Follow the instructions and generate 3 replies. Think deeply and validate you followed the instructions before responding. It MUST NOT include anything else except the replies themselves. Separate each reply with a newline character.`


  static generate(profile: string, tweet: string, writingStyle: string, systemPrompt: string, replyMode: 'one' | 'multiple' = 'one') {
    const taskPrompt = replyMode === 'one' ? this.taskPrompt1reply : this.taskPrompt3replies
    
    return {
      system: systemPrompt
        .replace('[This will be replaced with user\'s profile]', profile)
        .replace('[This will be replaced with user\'s writing style]', writingStyle),
      user: ` 
<original tweet to reply to>
${tweet}
</original tweet to reply to>

YOUR TASK:
${taskPrompt}
`
    }
  }
}
