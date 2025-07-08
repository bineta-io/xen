import React from "react"

type XenButtonProps = {
  onClick?: () => void
  loading?: boolean
}

const XenButton: React.FC<XenButtonProps> = ({ onClick, loading }) => (
  <>
    <button
      className="xen-btn"
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      disabled={loading}>
      {loading ? (
        <div className="xen-loader">𝕏</div>
      ) : (
        <span>
          𝕏<span style={{ fontWeight: 100, fontSize: "12px" }}>en</span>
        </span>
      )}
    </button>
    <style>{`
      .xen-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fcee09;
        color: #111;
        border: 1.3px solid #111;
        border-radius: 50%;
        cursor: pointer;
        font-family: 'Inter', Arial, sans-serif;
        font-size: 15px;
        box-shadow: 2px 2px 0px #111;
        transition: all 0.1s cubic-bezier(.17,.67,.83,.67);
        outline: none;
        min-height: 36px;
        min-width: 36px;
      }
      .xen-btn:disabled {
        cursor: not-allowed;
        background: #ccc;
      }
      .xen-btn:active {
        box-shadow: 0.7px 0.7px 0px #111;
        transform: translate(1.3px, 1.3px);
      }
      .xen-btn:hover:not(:disabled) {
        filter: brightness(1.1);
      }

      .xen-loader {
        animation: spin 3s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </>
)

export default XenButton
