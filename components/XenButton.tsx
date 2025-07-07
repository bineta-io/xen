import React from "react"

type XenButtonProps = {
}

const XenButton: React.FC<XenButtonProps> = () => (
  <button
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fcee09",
      color: "#111",
      border: "1.3px solid #111",
      borderRadius: "50%",
      cursor: "pointer",
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize: "15px",
      boxShadow: "2px 2px 0px #111",
      transition: "all 0.1s cubic-bezier(.17,.67,.83,.67)",
      outline: "none",
      position: "relative",
      minHeight: '36px',
      minWidth: '36px'
    }}
    onMouseDown={e => {
      (e.target as HTMLButtonElement).style.boxShadow = "0.7px 0.7px 0px #111";
      (e.target as HTMLButtonElement).style.transform = "translate(1.3px, 1.3px)";
    }}
    onMouseUp={e => {
      (e.target as HTMLButtonElement).style.boxShadow = "2px 2px 0px #111";
      (e.target as HTMLButtonElement).style.transform = "none";
    }}
    onMouseLeave={e => {
      (e.target as HTMLButtonElement).style.boxShadow = "2px 2px 0px #111";
      (e.target as HTMLButtonElement).style.transform = "none";
    }}
    onClick={(e) => {
      e.stopPropagation();
      // const tweet = replyBtn.closest('[data-testid="tweet"]');
      // const replyBox = tweet?.querySelector('[data-testid="tweetTextarea_0"], textarea');
      // if (replyBox) {
      //   (replyBox as HTMLTextAreaElement).value = "Hello, World";
      //   replyBox.dispatchEvent(new Event('input', { bubbles: true }));
      // }
    }}
  >
    𝕏<span style={{ fontWeight: 100, fontSize: '12px' }}>en</span>
  </button>
)

export default XenButton
