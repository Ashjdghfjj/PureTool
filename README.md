# PureTool - Secure Client-Side Developer Toolbox

PureTool is a comprehensive collection of developer tools designed with **privacy as the top priority**. All processing happens locally in your browser using WebAssembly and JavaScript—**no data is ever sent to a server**.

🌐 **[Live Demo](https://pure-tool-git-main-sams-projects-89c7b300.vercel.app/)**

## ✨ Features

- **📸 Image Compressor**: Compress JPG, PNG, and WebP images locally with high efficiency.
- **📄 PDF Tools**: Merge multiple PDFs or convert Images to PDF instantly.
- **⚙️ JSON Formatter**: Prettify, minify, and validate JSON data.
- **🔑 Password Generator**: Generate secure, random passwords with custom rules.
- **📱 QR Code Generator**: Create custom QR codes for URLs, text, and Wi-Fi.
- **⏰ Timestamp Converter**: Convert between Unix timestamps and human-readable dates.
- **🔠 Text Encoders**: Base64 and URL encoding/decoding.
- **🎨 Color Converter**: Convert between HEX, RGB, and HSL formats.
- **📝 Diff Checker**: Compare text or code to spot differences.

## 🚀 Ways to Use

### 1. Web App
Visit the website directly: **[PureTool.app](https://pure-tool-git-main-sams-projects-89c7b300.vercel.app/)**

### 2. Chrome Extension
You can install PureTool as a Chrome Extension to access it anywhere:

1. Clone this repository or download the source code.
2. Run `npm install` then `npm run build:extension`.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable **Developer mode** (top right).
5. Click **Load unpacked** and select the `dist` folder generated in step 2.

### 3. PWA (Progressive Web App)
Install it on your phone or desktop by clicking the "Install" button in your browser's address bar when visiting the website.

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **I18n**: i18next (English & Chinese)
- **PDF Processing**: pdf-lib & jspdf
- **Diff Engine**: diff

## 💻 Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashjdghfjj/PureTool.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📄 License

MIT © [Ashjdghfjj](./LICENSE)
