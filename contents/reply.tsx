import type { PlasmoCSConfig } from "plasmo";
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";

import { XenReplyButton } from "~components/XenReplyButton"

const ReplyInjector = () => {
  useEffect(() => {
    const addXenButtons = () => {
      document.querySelectorAll(".xen-btn-root").forEach((xenEl) => {
        if (
          !xenEl.nextElementSibling ||
          !xenEl.nextElementSibling.matches(
            'button[data-testid="tweetButtonInline"]'
          )
        ) {
          xenEl.remove()
        }
      })

      document
        .querySelectorAll('button[data-testid="tweetButtonInline"]')
        .forEach((replyBtn) => {
          if (
            replyBtn.previousElementSibling &&
            replyBtn.previousElementSibling.classList.contains("xen-btn-root")
          ) {
            return
          }

          const xenContainer = document.createElement("div")
          xenContainer.className = "xen-btn-root"
          xenContainer.style.display = "inline-block"
          xenContainer.style.verticalAlign = "middle"
          replyBtn.parentElement.insertBefore(xenContainer, replyBtn)

          const root = createRoot(xenContainer)
          root.render(<XenReplyButton />)
        })
    }

    addXenButtons()

    const observer = new MutationObserver(addXenButtons)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}

export default ReplyInjector

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}