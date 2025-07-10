import React, { useRef, useState } from "react"

import { useOpenRouter } from "~hooks/useOpenRouter"
import { extractTweetText } from "./domUtils"
import XenButton from "./XenButton"
import { useOpenRouterAPIKey } from "~hooks/useOpenRouterAPIKey"
import { Prompt } from "~Prompt"
import { useProfile } from "~hooks/useProfile"
import { useWritingStyle } from "~hooks/useWritingStyle"
import { useSystemPrompt } from "~hooks/useSystemPrompt"
import { useReplyMode } from "~hooks/useReplyMode"
import { useEditor } from "~hooks/useEditor"

export const XenInteractionButton: React.FC = () => {
  const [apiKey] = useOpenRouterAPIKey()
  const [profile] = useProfile()
  const [writingStyle] = useWritingStyle()
  const [systemPrompt] = useSystemPrompt()
  const [replyMode] = useReplyMode()
  const { get, loading } = useOpenRouter()
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const [showError, setShowError] = useState(false)
  const {insertText} = useEditor()

  const handleXenButtonClick = async () => {
    if (!apiKey) {
      setShowError(true)
      return
    }
    
    const tweetText = extractTweetText()
    if (!tweetText) {
      console.debug("Xen: Could not find tweet text.")
      return
    }
    const prompt = Prompt.generate(profile, tweetText, writingStyle, systemPrompt, replyMode)
    
    // Log the final prompts for validation
    console.debug('=== XEN PROMPT DEBUG ===')
    console.debug('System Prompt:', prompt.system)
    console.debug('User Prompt:', prompt.user)
    console.debug('========================')

    // const response = "test"
    const response = await get(prompt.system, prompt.user)
    insertText(response)
  }

  return (
    <div ref={buttonContainerRef}>
      <XenButton 
        onClick={handleXenButtonClick} 
        loading={loading} 
        hasError={!apiKey && showError}
        errorMessage="API key required"
      />
      {!apiKey && showError && (
        <div className="xen-error-tooltip">
          <div className="xen-error-message">API key required</div>
        </div>
      )}
      <style>{`
        .xen-error-tooltip {
          position: absolute;
          z-index: 100;
          margin-top: 8px;
          transform: translateX(-50%);
          left: 50%;
        }
        .xen-error-message {
          background: #ff3333;
          color: #fff;
          border: 3px solid #000;
          padding: 8px 12px;
          font-family: 'Space Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          box-shadow: 4px 4px 0px #000;
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
          transform: rotate(-1deg);
          white-space: nowrap;
        }
        @keyframes shake {
          0%, 100% { transform: rotate(-1deg); }
          20%, 60% { transform: translate(-2px, 0) rotate(-2deg); }
          40%, 80% { transform: translate(2px, 0) rotate(0deg); }
        }
      `}</style>
    </div>
  )
}
