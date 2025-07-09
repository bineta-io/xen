import type { PlasmoCSConfig } from "plasmo";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

import { XenQuoteButton } from "~components/XenQuoteButton"

const QuoteInjector = () => {
  useEffect(() => {
    const addXenButtons = () => {
      // Clean up any orphaned Xen buttons
      document.querySelectorAll(".xen-quote-btn-root").forEach((xenEl) => {
        if (
          !xenEl.nextElementSibling ||
          !xenEl.nextElementSibling.matches(
            'button[data-testid="tweetButton"]'
          )
        ) {
          xenEl.remove()
        }
      })

      // Find quote retweet modal Post buttons
      document
        .querySelectorAll('button[data-testid="tweetButton"]')
        .forEach((postBtn) => {
          // Check if this is in a quote retweet modal (contains "Post" text)
          if (!postBtn.textContent?.includes("Post")) {
            return
          }

          // Check if we're in a quote retweet context (modal with quote content)
          const modal = postBtn.closest('[role="dialog"]')
          if (!modal) {
            return
          }

          // Look for indicators that this is a quote retweet modal
          // Check for "Quote" text in the modal
          const hasQuoteText = modal.textContent?.includes("Quote")
          
          // Check for attachment section with quoted content
          const attachmentSection = modal.querySelector('[data-testid="attachments"]')
          const hasQuotedContent = attachmentSection && attachmentSection.textContent?.includes("Quote")
          
          if (!hasQuoteText && !hasQuotedContent) {
            return
          }

          // Skip if button already exists
          if (
            postBtn.previousElementSibling &&
            postBtn.previousElementSibling.classList.contains("xen-quote-btn-root")
          ) {
            return
          }

          const xenContainer = document.createElement("div")
          xenContainer.className = "xen-quote-btn-root"
          xenContainer.style.display = "inline-block"
          xenContainer.style.verticalAlign = "middle"
          xenContainer.style.marginRight = "8px"
          postBtn.parentElement.insertBefore(xenContainer, postBtn)

          const root = createRoot(xenContainer)
          root.render(<XenQuoteButton />)
        })
    }

    addXenButtons()

    const observer = new MutationObserver(addXenButtons)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}

export default QuoteInjector

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}
