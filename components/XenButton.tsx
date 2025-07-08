import React from "react"

type XenButtonProps = {
  onClick?: () => void
  loading?: boolean
  hasError?: boolean
  errorMessage?: string
}

const XenButton: React.FC<XenButtonProps> = ({ onClick, loading, hasError = false, errorMessage = "Error" }) => (
  <>
    <button
      className={`xen-btn ${hasError ? 'xen-btn-error' : ''}`}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
      }}
      disabled={loading}
      title={hasError ? errorMessage : undefined}>
      <div className="xen-btn-content">
        {loading ? (
          <div className="xen-loader">𝕏</div>
        ) : (
          <span>
            <span className="xen-btn-suffix">𝕏en</span>
          </span>
        )}
      </div>
    </button>
    <style>{`
      .xen-btn {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fcee09;
        color: #000;
        border: 3px solid #000;
        border-radius: 50%;
        cursor: pointer;
        font-family: 'Archivo Black', 'Space Grotesk', Arial, sans-serif;
        font-size: 1px;
        font-weight: 900;
        box-shadow: 2px 2px 0px #000;
        transition: all 0.15s cubic-bezier(.17,.67,.83,.67);
        outline: none;
        min-height: 36px;
        min-width: 36px;
        transform: rotate(-1deg);
        overflow: hidden;
      }
      
      .xen-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        background-blend-mode: overlay;
        background-size: 100px;
        opacity: 0.07;
        pointer-events: none;
        z-index: 0;
      }
      
      .xen-btn-content {
        position: relative;
        z-index: 1;
      }
      
      .xen-btn-suffix {
        font-weight: 700;
        font-size: 12px;
        font-family: 'Space Mono', monospace;
        letter-spacing: 0.5px;
      }
      
      .xen-btn:disabled {
        cursor: not-allowed;
        background: #ccc;
        color: #666;
        transform: rotate(0deg);
      }
      
      .xen-btn-error {
        background: #ff3333;
        animation: pulse 1.5s infinite;
      }
      
      @keyframes pulse {
        0% { box-shadow: 2px 2px 0px #000; }
        50% { box-shadow: 4px 4px 0px #000; }
        100% { box-shadow: 2px 2px 0px #000; }
      }
      
      .xen-btn:active {
        box-shadow: 0.7px 0.7px 0px #000;
        transform: translate(1.3px, 1.3px) rotate(-1deg);
      }
      
      .xen-btn:hover:not(:disabled) {
        transform: translate(0.5px, 0.5px) rotate(-1deg);
        box-shadow: 1.5px 1.5px 0px #000;
        filter: brightness(1.05);
      }
      
      .xen-btn:focus {
        outline: none;
      }

      .xen-loader {
        animation: spin 1.5s cubic-bezier(.45,.05,.55,.95) infinite;
        display: inline-block;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </>
)

export default XenButton
