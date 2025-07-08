import type { PlasmoCSConfig } from "plasmo"
import React, { useCallback, useEffect } from "react"
import { createRoot } from "react-dom/client"
import { useStorage } from "@plasmohq/storage/hook"

import XenButton from "../components/XenButton"
import { useOpenRouter } from "~hooks/useOpenRouter"

// Plasmo Content Script UI: https://docs.plasmo.com/framework/content-scripts-ui
const Reply = () => {
  const [apiKey] = useStorage("xen_openrouter_api_key")
  const { get, loading } = useOpenRouter(apiKey);
  const extractTweetText = useCallback(() => {
    const tweetTextEl = document.querySelector('[data-testid="tweetText"]')
    if (tweetTextEl && tweetTextEl.firstChild) {
      if (tweetTextEl.firstChild.nodeType === Node.TEXT_NODE) {
        return tweetTextEl.firstChild.textContent || ""
      } else if ((tweetTextEl.firstChild as HTMLElement).textContent) {
        return (tweetTextEl.firstChild as HTMLElement).textContent || ""
      }
    }
    return ""
  }, [])

  const insertTextIntoTextField = (xenBtnRoot: HTMLElement, text: string) => {
    // Find the closest .DraftEditor-root from the button
    // This context is inside the injected button, so we need to find the root near the button
    // The button is inside xen-btn-root, which is inserted before replyBtn
    let root = xenBtnRoot.closest(
      ".DraftEditor-root"
    ) as HTMLElement | null
    if (!root) {
      // Try to find the nearest .DraftEditor-root after the replyBtn
      let candidate = xenBtnRoot.nextElementSibling
      while (candidate) {
        if (
          candidate.classList &&
          candidate.classList.contains("DraftEditor-root")
        ) {
          root = candidate as HTMLElement
          break
        }
        candidate = candidate.nextElementSibling
      }
      if (!root) {
        // As a fallback, find the first one on the page
        root = document.querySelector(".DraftEditor-root")
      }
    }
    if (!root) return
    // Find all <br data-text="true"> elements
    const brEls = root.querySelectorAll('br[data-text="true"]')
    brEls.forEach((brEl) => {
      const span = document.createElement("span")
      span.setAttribute("data-text", "true")
      span.textContent = text
      brEl.replaceWith(span)
      // Simulate typing events
      const editor =
        root.querySelector('[contenteditable="true"]') || root
      // Focus the editor
      if (
        editor &&
        typeof (editor as HTMLElement).focus === "function"
      ) {
        ;(editor as HTMLElement).focus()
      }
      // Dispatch keydown, input, and keyup events
      const events = [
        new KeyboardEvent("keydown", { key: "H", bubbles: true }),
        new InputEvent("input", { bubbles: true }),
        new KeyboardEvent("keyup", { key: "H", bubbles: true })
      ]
      events.forEach((e) => editor && editor.dispatchEvent(e))
    })
  }

  const handleXenButtonClick = useCallback(
    async (xenBtnRoot: HTMLElement) => {
      const tweetText = extractTweetText()
      // const response = await get(
      //   "You are a commentator on Twitter. Write a comment for the following tweet.",
      //   tweetText
      // )
      const response = "Filler text"
      if (response) {
        insertTextIntoTextField(xenBtnRoot, response)
      }
    },
    [extractTweetText, get]
  )

  useEffect(() => {
    function addXenButtons() {
      // Clean up orphaned .xen-btn-root elements (not next to a reply button)
      document.querySelectorAll(".xen-btn-root").forEach((xenEl) => {
        // If the next sibling is not a reply button, remove this xen-btn-root
        if (
          !xenEl.nextElementSibling ||
          !xenEl.nextElementSibling.matches(
            'button[data-testid="tweetButtonInline"]'
          )
        ) {
          xenEl.remove()
        }
      })
      // Only inject if not already present
      document
        .querySelectorAll('button[data-testid="tweetButtonInline"]')
        .forEach((replyBtn) => {
          // Prevent duplicate injection: check if .xen-btn-root already exists immediately before this replyBtn
          if (
            replyBtn.previousElementSibling &&
            replyBtn.previousElementSibling.classList.contains("xen-btn-root")
          ) {
            return // Already injected
          }
          const xenContainer = document.createElement("div")
          xenContainer.className = "xen-btn-root"
          xenContainer.style.display = "inline-block"
          xenContainer.style.verticalAlign = "middle"
          replyBtn.parentElement.insertBefore(xenContainer, replyBtn)
          const root = createRoot(xenContainer)
          root.render(
            <XenButton
              onClick={() => {
                handleXenButtonClick(xenContainer)
              }}
              loading={true}
            />
          )
        })
    }

    // Initial injection
    addXenButtons()
    // Observe DOM changes
    const observer = new MutationObserver(addXenButtons)
    observer.observe(document.body, { childList: true, subtree: true })
    // Cleanup
    return () => observer.disconnect()
  }, [extractTweetText, handleXenButtonClick, loading])
  // tweetText state now contains the tweet text, can be used in the component as needed
  return null
}

export default Reply

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true
}