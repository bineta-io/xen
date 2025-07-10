import { getEditor } from "~hooks/useEditor"

export const extractTweetText = (): string => {
  const editor = getEditor()
  const modal = editor.closest('[role="dialog"]')
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

  const article = editor.closest("article")
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
