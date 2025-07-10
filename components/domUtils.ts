export const extractTweetText = (containerEl: HTMLElement | null): string => {
  if (!containerEl) return ""

  // Check if we're in a quote retweet modal
  const modal = containerEl.closest('[role="dialog"]')
  if (modal) {
    // In quote retweet modal, look for the quoted tweet content
    // First try to find the quoted tweet by looking for the attachments section
    const attachmentSection = modal.querySelector('[data-testid="attachments"]')
    if (attachmentSection) {
      const tweetTextEl = attachmentSection.querySelector('[data-testid="tweetText"]')
      if (tweetTextEl) {
        if (tweetTextEl.firstChild) {
          if (tweetTextEl.firstChild.nodeType === Node.TEXT_NODE) {
            return tweetTextEl.firstChild.textContent || ""
          } else if ((tweetTextEl.firstChild as HTMLElement).textContent) {
            return (tweetTextEl.firstChild as HTMLElement).textContent || ""
          }
        }
        return tweetTextEl.textContent ?? ""
      }
    }
    
    // Fallback: try to find any tweet text in the modal
    const quotedTweet = modal.querySelector('[data-testid="quoteTweet"]')
    if (quotedTweet) {
      const tweetTextEl = quotedTweet.querySelector('[data-testid="tweetText"]')
      if (tweetTextEl) {
        if (tweetTextEl.firstChild) {
          if (tweetTextEl.firstChild.nodeType === Node.TEXT_NODE) {
            return tweetTextEl.firstChild.textContent || ""
          } else if ((tweetTextEl.firstChild as HTMLElement).textContent) {
            return (tweetTextEl.firstChild as HTMLElement).textContent || ""
          }
        }
        return tweetTextEl.textContent ?? ""
      }
    }
  }

  const article = containerEl.closest("article")
  if (!article) {
    const tweetTextEl = document.querySelector('[data-testid="tweetText"]')
    return tweetTextEl?.textContent ?? ""
  }

  const tweetTextEl = article.querySelector('[data-testid="tweetText"]')
  if (tweetTextEl && tweetTextEl.firstChild) {
    if (tweetTextEl.firstChild.nodeType === Node.TEXT_NODE) {
      return tweetTextEl.firstChild.textContent || ""
    } else if ((tweetTextEl.firstChild as HTMLElement).textContent) {
      return (tweetTextEl.firstChild as HTMLElement).textContent || ""
    }
  }
  return tweetTextEl?.textContent ?? ""
}

export const insertTextIntoTextField = (
  containerEl: HTMLElement | null,
  text: string
) => {
  if (!containerEl) return

  // Find the editor element
  let editor = containerEl.closest('[contenteditable="true"]') as HTMLElement | null
  if (!editor) {
    const root = containerEl.closest(".DraftEditor-root") as HTMLElement | null
      || document.querySelector(".DraftEditor-root") as HTMLElement | null
    if (!root) return
    editor = root.querySelector('[contenteditable="true"]') as HTMLElement | null
    if (!editor) return
  }

  // Focus the editor
  editor.focus()

  // Insert text at cursor position
  document.execCommand('insertText', false, text)
}
