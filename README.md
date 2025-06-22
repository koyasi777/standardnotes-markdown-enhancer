# Enhanced Markdown Editor for Standard Notes ✨

## 📌 Overview

This userscript supercharges **Standard Notes (web)** by replacing its default plain-text editor with a **feature-rich, privacy-respecting Markdown editor**. It includes a live preview, customizable toolbar, advanced image handling, PDF export, and a visual table editor—all running 100% in your browser.

---

## ✨ Key Features

- 🛠️ **Rich formatting toolbar** for headings, bold, italic, strikethrough, quotes, lists, checklists, code blocks, links, images, tables, and horizontal rules
- 🔀 **Editor / Split / Preview modes** with synchronized updates
- 🧠 **Live preview** with `marked.js`, `DOMPurify`, and `highlight.js`—fully sanitized and syntax-highlighted
- 🖼 **Smart image handling**:
  - Paste from clipboard → auto-resize to max 1280px, embedded as base64
  - Upload from file or insert via URL using a modal UI
  - Unused embedded images are **auto-cleaned**
- 📋 **Code block clipboard support** with "Copy" buttons
- 🔠 **Interactive table editor** with cell editing, row/column control, and alignment settings
- 🖨 **PDF export and print-friendly layout** with clean formatting
- 🌙 Fully supports **dark mode** and integrates with Standard Notes theme variables
- 💾 Remembers user preferences like view mode and toolbar visibility

> ⚠️ This is an **unofficial userscript** not affiliated with Standard Notes, Inc.

---

## 🚀 Installation Guide

1. Install a userscript manager:
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Install the userscript:
   👉 **[Click here to install](https://raw.githubusercontent.com/koyasi777/standardnotes-markdown-enhancer/main/standardnotes-markdown-enhancer.user.js)**
3. Visit `https://app.standardnotes.com/` — the enhanced Markdown editor activates automatically.

> 💡 The script detects and upgrades the default editor without affecting other editors.

---

## 🔍 Feature Summary

| Feature | Description |
|--------|-------------|
| **Toolbar** | One-click insertion of Markdown syntax |
| **View Modes** | Toggle between Edit, Split, and Preview layouts |
| **Preview** | Safe, real-time HTML rendering with copy-enabled code |
| **Image Support** | Pasting, uploading, and reference insertion; automatic cleanup |
| **Tables** | Visual Markdown table builder with cell navigation |
| **Export / Print** | PDF-ready styles and layout for clean hardcopies |
| **Performance** | Debounced rendering and efficient DOM interaction |
| **Theme Integration** | Uses SN-provided CSS variables; dark mode aware |

---

## 🔐 Security & Privacy

- 🛡 **All processing is local** — no external APIs, uploads, or analytics
- ✔ Sanitized Markdown via `DOMPurify`
- 🔒 Base64 image data is embedded, stored only inside your notes
- 🧹 Unused images are automatically deleted for cleanliness

> Use at your own risk; no official support or endorsement from Standard Notes.

---

## 📝 Compatibility & Notes

- ✔ Works with **default plain-text editor** only (`https://app.standardnotes.com/`)
- ❌ Incompatible with official editors like Bold or Code
- 🔄 Subject to breaking changes if Standard Notes updates its DOM structure

---

## 🌍 Contribution

- 🧑‍💻 **MIT Licensed** — free to use, adapt, and distribute
- ❤️ Feedback and pull requests welcome!

🔗 [GitHub Repository](https://github.com/koyasi777/standardnotes-markdown-enhancer)

---

## 💡 Why Use This?

> Elevate your Standard Notes experience with an intuitive, fast, and powerful Markdown editor—no extensions, no compromises, just pure productivity in your browser.
