import type { PlasmoCSConfig } from "plasmo"
import React from "react"
import { createRoot } from "react-dom/client"
import XenButton from "./components/XenButton"

// Plasmo Content Script UI: https://docs.plasmo.com/framework/content-scripts-ui
const Content = () => {
  React.useEffect(() => {
    function addXenButtons() {
      // Clean up orphaned .xen-btn-root elements (not next to a reply button)
      document.querySelectorAll('.xen-btn-root').forEach(xenEl => {
        // If the next sibling is not a reply button, remove this xen-btn-root
        if (!xenEl.nextElementSibling || !xenEl.nextElementSibling.matches('button[data-testid="tweetButtonInline"]')) {
          xenEl.remove();
        }
      });
      // Only inject if not already present
      document.querySelectorAll('button[data-testid="tweetButtonInline"]').forEach(replyBtn => {
        // Prevent duplicate injection: check if .xen-btn-root already exists immediately before this replyBtn
        if (replyBtn.previousElementSibling && replyBtn.previousElementSibling.classList.contains('xen-btn-root')) {
          return; // Already injected
        }
        const xenContainer = document.createElement('div');
        xenContainer.className = 'xen-btn-root';
        xenContainer.style.display = 'inline-block';
        xenContainer.style.verticalAlign = 'middle';
        replyBtn.parentElement.insertBefore(xenContainer, replyBtn);
        const root = createRoot(xenContainer);
        root.render(<XenButton />);
      });
    }
    // Initial injection
    addXenButtons();
    // Observe DOM changes
    const observer = new MutationObserver(addXenButtons);
    observer.observe(document.body, { childList: true, subtree: true });
    // Cleanup
    return () => observer.disconnect();
  }, []);
  return null;
}

export default Content;

export const config: PlasmoCSConfig = {
  matches: ["https://twitter.com/*", "https://x.com/*"],
  all_frames: true,
}