# Enhanced Markdown Editor for Standard Notes

> An **unofficial userscript** that replaces Standard Notes’ default plain-text editor with a **powerful Markdown editor**. It ships live preview, a formatting toolbar, advanced image handling (paste/upload/URL with auto-resize), PDF export, and a visual table editor. Everything runs **100% locally** in your browser.

---

## 📌 Overview

This userscript supercharges **Standard Notes (web)** with a feature-rich, privacy-respecting Markdown workflow: streaming preview for large notes, robust link & image handling, keyboard-first authoring, and print-ready output—without sending your data anywhere.

> ⚠️ This is an **unofficial userscript** and is not affiliated with Standard Notes, Inc.

---

## 🚀 Installation Guide

1. Install a userscript manager:
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Install the userscript:  
   👉 **[Click here to install](https://raw.githubusercontent.com/koyasi777/standardnotes-markdown-enhancer/main/standardnotes-markdown-enhancer.user.js)**
3. Visit `https://app.standardnotes.com/` — the enhanced Markdown editor activates automatically.

> 💡 It upgrades the default plain-text editor without touching official editors like Bold/Code.

---

## ✨ Key Features

### 🧭 View Modes & UX
- **Editor / Split / Preview** modes with synchronized scrolling
- **Toolbar toggle** and **mode persistence** via `localStorage`
- **Dark mode** & Standard Notes theme variables
- **Title → Editor focus**: press `Enter` in title to jump to the editor

### 🛠️ Formatting Toolbar
- Headings (H1–H4), **Bold**, *Italic*, ~~Strikethrough~~
- Inline code & fenced code blocks (auto-wrap multi-line selections)
- Quotes, bulleted/numbered lists, **checklists** (`- [ ]`)
- Links, images, tables, horizontal rules

### 🖼 Image Workflow
- **Paste from clipboard** → auto-resize to **max 1280px**, embed as Base64
- **Upload / From URL** via modal (with Alt text)
- **Animated GIFs preserved** (no re-encode)
- **Smart formats**: PNG/WebP for transparent; WebP→JPEG fallback for opaque
- **Auto-cleanup** of **unused embedded images**
- Uses a dedicated **Definitions** block to store image references

### 📊 Visual Table Editor
- Direct cell editing with keyboard navigation (Enter/Arrows/Tab)
- Add/Delete rows & columns; **drag-and-drop** reordering
- Column alignment: left/center/right → `:---`, `:---:`, `---:`
- Select an existing Markdown table to **re-open** and edit

### 🔍 Preview & Code
- **Live preview** via `marked.js` → sanitized with **DOMPurify**
- **Syntax highlighting** via `highlight.js` (lazy, viewport-aware)
- Each code block shows a **language label** and a **Copy** button
- **Checklist sync**: ticking in preview updates Markdown text

### 🖨 Print & PDF
- **Print-optimized** styles for clean PDF export
- Editor-only fallback for massive notes
- Global hotkey **`⌘/Ctrl + P`** to print/export

### ⌨️ Keyboard Experience
- **Global hotkeys** (work even when the editor isn’t focused, when possible)
  - `⌘/Ctrl + P` → Print/PDF
  - `⌘/Ctrl + B` / `⌘/Ctrl + I` → Bold / Italic
- **Enter**: smart list **continuation/termination** (quotes, ordered/unordered, tasks)
- **Tab / Shift+Tab**: **indent/outdent** for single- or multi-line selections

### ⚡ Performance Architecture
- **Streaming preview** for large notes: chunked rendering + idle-time pumping
- `content-visibility` with intrinsic sizing for off-screen efficiency
- **Device-aware thresholds** via `navigator.deviceMemory`
- **Lockdown mode**: temporarily disables Split/Preview on extremely large notes to keep the app responsive

---

## 🔐 Security & Privacy

- All processing is **local** — no external APIs, uploads, or analytics
- Strict sanitization with **DOMPurify**  
  - Safe schemes only (`https`, `mailto`, `tel`, same-origin paths, safe `data:image/*`)  
  - `style`, `iframe`, `form`, `srcset` are **forbidden**
  - External links get `target="_blank"` + `rel="noopener noreferrer"`
- Base64-embedded images live **inside your notes**
- Unused images are **automatically removed**

> Provided “as is”. Use at your own risk; no official support or endorsement.

---

## 🧰 Compatibility & Notes

- ✔ Works with the **default plain-text editor** at `https://app.standardnotes.com/`
- ❌ Not designed for official editors like **Bold** or **Code**
- 🔄 May break if Standard Notes changes its DOM structure

---

## ❓ FAQ

**Where are images stored?**  
In a hidden **Definitions** block at the end of the note as **Base64 data URIs**, referenced from the body. When the reference disappears, the definition is **auto-removed**.

**Why are Split/Preview disabled on a huge note?**  
**Lockdown mode** protects responsiveness. Consider splitting the note or reducing size.

**Can I keep my existing Markdown?**  
Yes. Your content stays intact; image references are centralized under the Definitions block.

**How do I revert to the original editor?**  
Disable or pause the userscript in your userscript manager.

---

## 🌍 Internationalization

UI strings: **en, ja, zh-CN, zh-TW, ko, fr, es, de, pt-BR, ru**  
Language is auto-selected via `navigator.language`.

---

## 🤝 Contributing

- License: **MIT**
- Feedback & PRs welcome
- GitHub: <https://github.com/koyasi777/standardnotes-markdown-enhancer>

---

## 💡 Why Use This?

Level-up Standard Notes with an intuitive, fast, and robust Markdown editor—**no extensions or cloud processing**, just pure productivity in your browser.
