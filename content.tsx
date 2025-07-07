import type { PlasmoCSConfig } from "plasmo"
import React from "react"
import { createRoot } from "react-dom/client"
import XenButton from "./components/XenButton"

// Plasmo Content Script UI: https://docs.plasmo.com/framework/content-scripts-ui
const Content = () => {
  React.useEffect(() => {
    function addXenButtons() {
      document.querySelectorAll('button[data-testid="tweetButtonInline"]').forEach(replyBtn => {
        if (replyBtn.parentElement.querySelector('.xen-btn-root')) return;
        const xenContainer = document.createElement('div');
        xenContainer.className = 'xen-btn-root';
        xenContainer.style.display = 'inline-block';
        xenContainer.style.verticalAlign = 'middle';
        replyBtn.parentElement.insertBefore(xenContainer, replyBtn);
        const root = createRoot(xenContainer);
        const btnHeight = getComputedStyle(replyBtn).height;
        root.render(<XenButton height={btnHeight} />);
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