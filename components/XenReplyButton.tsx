import React, { useRef } from "react"

import { useOpenRouter } from "../hooks/useOpenRouter"
import { Prompt } from "../prompts"
import { extractTweetText, insertTextIntoTextField } from "./domUtils"
import XenButton from "./XenButton"

export const XenReplyButton: React.FC = () => {
  const { get, loading } = useOpenRouter()
  const buttonRef = useRef<HTMLDivElement>(null)

  const handleXenButtonClick = async () => {
    const tweetText = extractTweetText(buttonRef.current)
    if (!tweetText) {
      console.log("Xen: Could not find tweet text.")
      return
    }
    const response = await get(Prompt.system, tweetText)
    if (response) {
      insertTextIntoTextField(buttonRef.current, response)
    }
  }

  return (
    <div ref={buttonRef}>
      <XenButton onClick={handleXenButtonClick} loading={loading} />
    </div>
  )
}
