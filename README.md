# Xen

Xen is a browser extension designed to help you craft replies on X/Twitter via AI.

## ✨ Features

*   **AI-Powered Replies:** Generate clever and relevant replies to tweets using advanced AI models.
*   **Seamless Integration:** A "Xen" button appears next to the standard reply button on X/Twitter for quick access.
*   **Customizable AI Persona:** The AI is prompted to act as a "witty and insightful commentator," ensuring unique and engaging responses.
*   **API Key Management:** Easily configure your OpenRouter API key through a simple popup interface.

## 🚀 Installation & Setup

Xen is built as a Plasmo extension. To use it, you'll need to load it as an unpacked extension in your browser.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bineta-io/xen.git
    cd xen
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the extension:**
    ```bash
    npm run build
    ```
    This will create a `build/chrome-mv3-prod` directory (or similar for other browsers).
4.  **Load in your browser:**
    *   **Chrome/Brave/Edge:**
        1.  Go to `chrome://extensions` (or `brave://extensions`, `edge://extensions`).
        2.  Enable "Developer mode" in the top right corner.
        3.  Click "Load unpacked" and select the `build/chrome-mv3-prod` directory.
    *   **Firefox:**
        1.  Go to `about:debugging#/runtime/this-firefox`.
        2.  Click "Load Temporary Add-on..." and select any file inside the `build/firefox-mv3-prod` directory (e.g., `manifest.json`).

## 💡 Usage

1.  **Enter your OpenRouter API Key:** After installing the extension, click on the Xen extension icon in your browser toolbar. A popup will appear where you can enter your OpenRouter API key. This key is stored locally and securely.
2.  **Generate Replies:** Navigate to X/Twitter. You will see a new "Xen" button next to the reply button on tweets. Click this button, and Xen will generate a witty reply based on the tweet's content and automatically populate the reply box.

## 🛠️ Development

To set up the project for development:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/bineta-io/xen.git
    cd xen
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start a development server and automatically rebuild the extension on changes. You can then load the `build/chrome-mv3-dev` (or equivalent) directory as an unpacked extension in your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.