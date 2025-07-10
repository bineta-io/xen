import { useCallback, useEffect } from "react"

export const getEditor = () => {
  const editor = document.querySelector('[contenteditable="true"]')
  if (editor) return editor as HTMLElement

  const root = document.querySelector(".DraftEditor-root")
  if (!root) return null

  return root.querySelector('[contenteditable="true"]') as HTMLElement
}

export const useEditor = () => {
  const editor = getEditor()

  useEffect(() => {
    editor.focus({preventScroll: true})
  }, [editor])

  const insertText = useCallback((text: string) => {
    editor.click()

    // Select all text before inserting
    document.execCommand('selectAll', false, null)

    // Insert text at cursor position (or replace selected text)
    document.execCommand('insertText', false, text)
  }, [editor])

  return {insertText}
}
