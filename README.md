# Add Markdown Editor to Standard Notes ✨

## 📌 Overview

This userscript enhances **Standard Notes** (web version) by seamlessly replacing the default editor with a **full-featured Markdown editor**. It offers a rich formatting toolbar, live preview, split view, image support, print-friendly styles, and PDF export—all client-side and privacy-safe.

---

## ✨ Key Features

- 🛠️ Toolbar buttons for **headings, bold, italic, lists, checkboxes, quotes, code blocks, links, tables, horizontal rules, and more**
- 🔀 Switch between **Editor**, **Split**, and **Preview** modes
- 🖨 One-click **Print / Export to PDF**
- 🌙 **Dark mode–aware**, responsive design
- 🖼 **Image insertion**:
  - Paste from clipboard → automatically resizes (max 1280px) + base64 embed
  - Upload via UI or insert via URL
  - **Garbage-collector**: automatically removes unused pasted image data
- 🧼 Clean print layout & syntax highlighting with copy-to-clipboard support
- 🔐 Fully **client-side**, with no external data leaks (processed entirely in-browser)
- 🧹 Uses `marked.js`, `DOMPurify`, and `highlight.js` for safe and rich Markdown rendering

> ⚠️ **Unofficial enhancement**, not affiliated with Standard Notes, Inc.

---

## 🚀 Installation Guide

1. Install a userscript manager:
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Install the userscript:
   👉 **[Click to install](https://raw.githubusercontent.com/koyasi777/standardnotes-markdown-enhancer/main/standardnotes-markdown-enhancer.user.js)**
3. Navigate to `https://app.standardnotes.com/` – the enhanced Markdown editor activates automatically.

> 💡 The script detects the default plain‑text editor and injects the Markdown UI.

---

## 🔍 Feature Overview

| Feature | Description |
|--------|-------------|
| **Toolbar** | Insert headings, bold/italic, lists, checkboxes, quotes, code blocks, links, tables, HR |
| **Modes** | Editor / Split / Preview views with live sync |
| **Preview** | Sanitized HTML rendering with syntax highlighting and clipboard support |
| **Image Handling** | Paste or upload → resized + embedded; unused images auto‑removed |
| **PDF / Print** | Clean-page styles; copy-to-clipboard for code; print-friendly output |
| **Performance** | Debounced image garbage collection and live rendering |
| **Customizable** | Theme-aware CSS uses Standard Notes variables; no external dependencies |

---

## 🔐 Security & Privacy

- ✋ 100% **local processing** — no external calls or data uploads
- ✔ Syntax-safe and sanitized via `DOMPurify`
- 🛡 Full control over image data—embedded only as base64, cleaned automatically

> Use at your own risk; no affiliation with Standard Notes, Inc.

---

## 📝 Limitations & Notes

- Supports **only the default plain-text editor** at `app.standardnotes.com`
- Incompatible with other official editors (e.g. Bold, Code)
- DOM changes in Standard Notes may require script updates

---

## 🌍 Community & Contribution

- ⭐ **MIT License** — free to use, modify, distribute
- Welcome feedback, issues, and pull requests via GitHub

🔗 **Repository**: https://github.com/koyasi777/standardnotes-markdown-enhancer

---

## 💡 Why Use This?

> Transform Standard Notes into a powerful Markdown workspace with live preview, clean exports, and intuitive image workflows—all while preserving privacy and staying lightweight.

---

## 🛠 Changelog Highlights (v2.6.0)

- 📸 **Automatic image resizing** with quality control (max 1280px, JPEG quality 0.8)
- 🧹 **Image garbage collection**: unused embedded images are removed automatically
- 🖼 Added **image upload UI** and modal for URL/file insertion
- 🧹 UI consistency improvements; tooltips and accessibility labels added
