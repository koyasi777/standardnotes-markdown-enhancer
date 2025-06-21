// ==UserScript==
// @name         Enhanced Markdown Editor for Standard Notes
// @name:ja      Standard Notes用 高機能Markdownエディタ拡張
// @name:en      Enhanced Markdown Editor for Standard Notes
// @name:zh-CN   为Standard Notes增强Markdown编辑器
// @name:zh-TW   為Standard Notes強化Markdown編輯器
// @name:ko      Standard Notes용 고급 Markdown 에디터 확장
// @name:fr      Éditeur Markdown amélioré pour Standard Notes
// @name:es      Editor Markdown mejorado para Standard Notes
// @name:de      Erweiterter Markdown-Editor für Standard Notes
// @name:pt-BR   Editor Markdown avançado para Standard Notes
// @name:ru      Улучшенный редактор Markdown для Standard Notes
// @version      2.6.0
// @description         Boost Standard Notes with a powerful, unofficial Markdown editor featuring live preview, formatting toolbar, image pasting/uploading with auto-resize, and PDF export. Unused images are auto-cleaned for efficiency.
// @description:ja      Standard Notesを強化する非公式の高機能Markdownエディタ！ライブプレビュー、装飾ツールバー、画像の貼り付け・アップロード（自動リサイズ）、PDF出力に対応。未使用画像は自動でクリーンアップされます。
// @description:zh-CN   非官方增强的Markdown编辑器，为Standard Notes添加实时预览、工具栏、自动调整大小的图像粘贴/上传、PDF导出等功能，并自动清理未使用的图像。
// @description:zh-TW   非官方強化Markdown編輯器，為Standard Notes新增即時預覽、工具列、自動縮放圖片貼上/上傳、PDF匯出等功能，並自動清除未使用圖片。
// @description:ko      Standard Notes를 위한 강력한 비공식 Markdown 에디터! 실시간 미리보기, 서식 툴바, 이미지 붙여넣기/업로드(자동 리사이즈), PDF 내보내기 지원. 사용하지 않는 이미지는 자동 정리됩니다.
// @description:fr      Améliorez Standard Notes avec un éditeur Markdown puissant et non officiel : aperçu en direct, barre d’outils, collage/téléversement d’images redimensionnées automatiquement, export PDF. Nettoyage automatique des images inutilisées.
// @description:es      Mejora Standard Notes con un potente editor Markdown no oficial: vista previa en vivo, barra de herramientas, pegado/carga de imágenes con redimensionado automático y exportación a PDF. Las imágenes no usadas se eliminan automáticamente.
// @description:de      Erweitern Sie Standard Notes mit einem leistungsstarken, inoffiziellen Markdown-Editor: Live-Vorschau, Formatierungsleiste, Bild-Einfügen/-Hochladen mit automatischer Größenanpassung und PDF-Export. Nicht verwendete Bilder werden automatisch bereinigt.
// @description:pt-BR   Potencialize o Standard Notes com um editor Markdown poderoso e não oficial: visualização ao vivo, barra de formatação, colagem/envio de imagens com redimensionamento automático e exportação para PDF. Imagens não utilizadas são removidas automaticamente.
// @description:ru      Улучшите Standard Notes с помощью мощного неофициального редактора Markdown: живая превью, панель форматирования, вставка/загрузка изображений с автоизменением размера и экспорт в PDF. Неиспользуемые изображения автоматически удаляются.
// @namespace    https://github.com/koyasi777/standardnotes-markdown-enhancer
// @author       koyasi777
// @match        https://app.standardnotes.com/*
// @grant        GM_addStyle
// @require      https://cdn.jsdelivr.net/npm/marked/marked.min.js
// @require      https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js
// @require      https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js
// @license      MIT
// @homepageURL  https://github.com/koyasi777/standardnotes-markdown-enhancer
// @supportURL   https://github.com/koyasi777/standardnotes-markdown-enhancer/issues
// @icon         https://app.standardnotes.com/favicon/favicon-32x32.png
// ==/UserScript==

(function() {
    'use strict';

    // --- 設定値 ---
    const MAX_IMAGE_DIMENSION = 1280; // 画像の最大辺の長さ (これより大きい場合リサイズ)
    const JPEG_QUALITY = 0.8;         // JPEG圧縮の品質 (0.0 - 1.0)

    // --- 国際化 (i18n) のための文字列定義 ---
    const I18N = {
        en: {
            editor: 'Editor', split: 'Split', preview: 'Preview', toggleToolbar: 'Toggle Toolbar',
            exportPDF: 'Print / Export as PDF', paragraph: 'Paragraph', heading1: 'Heading 1',
            heading2: 'Heading 2', heading3: 'Heading 3', heading4: 'Heading 4', bold: 'Bold',
            italic: 'Italic', strikethrough: 'Strikethrough', inlineCode: 'Inline Code', quote: 'Quote',
            list: 'Bulleted List', numberedList: 'Numbered List', checklist: 'Checklist',
            codeBlock: 'Code Block', link: 'Link', insertTable: 'Insert Table', horizontalRule: 'Horizontal Rule',
            image: 'Image',
            linkPrompt: 'Enter the link URL:', boldPlaceholder: 'bold text', italicPlaceholder: 'italic text',
            strikethroughPlaceholder: 'strikethrough', codePlaceholder: 'code', quotePlaceholder: 'quote',
            listItemPlaceholder: 'item', taskPlaceholder: 'task', linkTextPlaceholder: 'link text',
            copy: 'Copy', copied: 'Copied!', copyError: 'Error', copyAriaLabel: 'Copy code to clipboard',
            previewErrorTitle: 'An error occurred while updating the preview:', printPDF: 'PDF',
            pastedImageAltText: 'Pasted Image at',
            insertImage: 'Insert Image', fromURL: 'From URL', uploadFile: 'Upload File',
            imageURL: 'Image URL', altText: 'Alt Text (optional)', chooseFile: 'Choose a file...',
            insert: 'Insert', close: 'Close', processing: 'Processing...',
            errorImageProcessing: 'Failed to process image.',
        },
        ja: {
            editor: 'エディタ', split: '分割', preview: 'プレビュー', toggleToolbar: 'ツールバー表示切替',
            exportPDF: 'PDFとして印刷/エクスポート', paragraph: '段落', heading1: '見出し 1',
            heading2: '見出し 2', heading3: '見出し 3', heading4: '見出し 4', bold: '太字',
            italic: '斜体', strikethrough: '打ち消し線', inlineCode: 'インラインコード', quote: '引用',
            list: 'リスト', numberedList: '番号付きリスト', checklist: 'チェックリスト',
            codeBlock: 'コードブロック', link: 'リンク', insertTable: 'テーブル挿入', horizontalRule: '水平線',
            image: '画像',
            linkPrompt: 'リンク先のURLを入力してください:', boldPlaceholder: '太字', italicPlaceholder: '斜体',
            strikethroughPlaceholder: '打ち消し', codePlaceholder: 'code', quotePlaceholder: '引用文',
            listItemPlaceholder: '項目', taskPlaceholder: 'タスク', linkTextPlaceholder: 'リンクテキスト',
            copy: 'Copy', copied: 'Copied!', copyError: 'Error', copyAriaLabel: 'クリップボードにコードをコピー',
            previewErrorTitle: 'プレビューの更新中にエラーが発生しました:', printPDF: 'PDF',
            pastedImageAltText: '貼り付けられた画像',
            insertImage: '画像を挿入', fromURL: 'URLから', uploadFile: 'ファイルをアップロード',
            imageURL: '画像のURL', altText: '代替テキスト（任意）', chooseFile: 'ファイルを選択...',
            insert: '挿入', close: '閉じる', processing: '処理中...',
            errorImageProcessing: '画像の処理に失敗しました。',
        }
    };
    const lang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    const T = I18N[lang] || I18N.en;

    const STORAGE_KEY_MODE = 'snMarkdownEditorMode';
    const STORAGE_KEY_TOOLBAR_VISIBLE = 'snMarkdownToolbarVisible';

    // --- スタイル定義 ---
    GM_addStyle(`
        .markdown-editor-container { display: flex; flex-direction: column; height: 100%; overflow: hidden; border: 1px solid var(--sn-stylekit-border-color, #e0e0e0); border-radius: 4px; }
        .mode-toggle-bar { flex-shrink: 0; padding: 4px 10px; background-color: var(--sn-stylekit-editor-background-color, #f9f9f9); border-bottom: 1px solid var(--sn-stylekit-border-color, #e0e0e0); display: flex; align-items: center; gap: 5px; }
        .mode-toggle-button { padding: 5px 12px; border: 1px solid var(--sn-stylekit-border-color, #ccc); border-radius: 6px; cursor: pointer; background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-foreground-color, #333); font-size: 13px; }
        .mode-toggle-button.active { background-color: var(--sn-stylekit-primary-color, #346df1); color: var(--sn-stylekit-primary-contrast-color, #fff); border-color: var(--sn-stylekit-primary-color, #346df1); }
        .toolbar-toggle-button { margin-left: auto; padding: 5px 8px; font-size: 13px; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; }
        .toolbar-toggle-button svg { width: 16px; height: 16px; fill: currentColor; }
        .toolbar-toggle-button.active { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); }
        .pdf-export-button { padding: 4px 10px; font-size: 12px; }
        .markdown-toolbar { flex-shrink: 0; display: flex; flex-wrap: wrap; align-items: center; padding: 8px 10px; gap: 8px; background-color: var(--sn-stylekit-editor-background-color, #f9f9f9); border-bottom: 1px solid var(--sn-stylekit-border-color, #e0e0e0); transition: display 0.2s; }
        .toolbar-button, .toolbar-select { padding: 4px 8px; border: 1px solid transparent; border-radius: 4px; cursor: pointer; background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-foreground-color, #555); font-size: 14px; transition: all 0.2s; }
        .toolbar-button:hover, .toolbar-select:hover { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); border-color: var(--sn-stylekit-border-color, #ccc); }
        .toolbar-button { font-weight: bold; }
        .toolbar-button.icon-button { font-weight: normal; padding: 5px; width: 30px; height: 30px; display: inline-flex; justify-content: center; align-items: center; }
        .toolbar-button.icon-button svg { width: 18px; height: 18px; fill: currentColor; }
        .toolbar-select { font-weight: bold; -webkit-appearance: none; -moz-appearance: none; appearance: none; padding-right: 20px; background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23555%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E'); background-repeat: no-repeat; background-position: right 0px center; }
        .markdown-editor-container.toolbar-hidden .markdown-toolbar { display: none; }
        .editor-preview-wrapper { display: flex; flex-grow: 1; overflow: hidden; background-color: var(--sn-stylekit-editor-background-color, #fff); }
        .custom-markdown-textarea, .markdown-preview { height: 100%; overflow-y: auto; flex-grow: 1; flex-shrink: 1; }
        .custom-markdown-textarea { border: none !important; outline: none !important; resize: none !important; box-shadow: none !important; padding: 16px !important; margin: 0 !important; width: 100% !important; background-color: transparent !important; color: var(--sn-stylekit-foreground-color, #333) !important; font-family: var(--sn-stylekit-font-editor, sans-serif) !important; line-height: var(--sn-stylekit-line-height-editor, 1.7) !important; }
        .markdown-preview { padding: 16px; line-height: 1.7; font-size: 1.05rem; color: var(--sn-stylekit-foreground-color, #333); }
        .markdown-editor-container.mode-editor .markdown-preview { display: none; }
        .markdown-editor-container.mode-preview .markdown-toolbar, .markdown-editor-container.mode-preview .custom-markdown-textarea { display: none; }
        .markdown-editor-container.mode-preview .markdown-preview { display: block; }
        .markdown-editor-container.mode-split .custom-markdown-textarea, .markdown-editor-container.mode-split .markdown-preview { display: block !important; flex-basis: 50%; width: 50%; }
        .markdown-editor-container.mode-split .markdown-preview { border-left: 1px solid var(--sn-stylekit-border-color, #e0e0e0); }
        .markdown-preview h1, .markdown-preview h2, .markdown-preview h3, .markdown-preview h4, .markdown-preview h5, .markdown-preview h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; border-bottom: 1px solid var(--sn-stylekit-border-color, #eee); padding-bottom: .3em; } .markdown-preview h1 { font-size: 2em; } .markdown-preview h2 { font-size: 1.5em; } .markdown-preview h3 { font-size: 1.25em; }
        .markdown-preview p { margin-bottom: 16px; } .markdown-preview ul, .markdown-preview ol { padding-left: 2em; margin-bottom: 16px; } .markdown-preview blockquote { padding: 0 1em; color: var(--sn-stylekit-secondary-foreground-color, #6a737d); border-left: .25em solid var(--sn-stylekit-border-color, #dfe2e5); margin: 0 0 16px 0; } .markdown-preview code { padding: .2em .4em; margin: 0; font-size: 85%; background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); border-radius: 3px; font-family: var(--sn-stylekit-font-code, monospace); } .markdown-preview pre { position: relative; padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); border-radius: 6px; word-wrap: normal; margin-bottom: 16px; } .markdown-preview pre code { background-color: transparent; padding: 0; margin: 0; } .markdown-preview img { max-width: 100%; height: auto; border-radius: 6px; } .markdown-preview table { border-collapse: collapse; width: 100%; margin-bottom: 16px; display: block; overflow: auto; } .markdown-preview th, .markdown-preview td { border: 1px solid var(--sn-stylekit-border-color, #dfe2e5); padding: 6px 13px; } .markdown-preview tr:nth-child(2n) { background-color: var(--sn-stylekit-secondary-background-color, #f6f8fa); } .markdown-preview hr { height: .25em; padding: 0; margin: 24px 0; background-color: var(--sn-stylekit-border-color, #dfe2e5); border: 0; } .markdown-preview .task-list-item { list-style-type: none; } .markdown-preview .task-list-item-checkbox { margin: 0 .2em .25em -1.6em; vertical-align: middle; }
        .copy-code-button { position: absolute; top: 10px; right: 10px; padding: 5px 8px; font-size: 12px; border: 1px solid var(--sn-stylekit-border-color, #ccc); border-radius: 4px; background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-secondary-foreground-color, #555); cursor: pointer; opacity: 0; transition: opacity 0.2s, background-color 0.2s, color 0.2s; z-index: 1; } .markdown-preview pre:hover .copy-code-button { opacity: 1; } .copy-code-button:hover { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); } .copy-code-button.copied { background-color: var(--sn-stylekit-primary-color, #346df1); color: var(--sn-stylekit-primary-contrast-color, #fff); border-color: var(--sn-stylekit-primary-color, #346df1); }
        .markdown-preview pre code.hljs { display: block; overflow-x: auto; padding: 0; color: var(--sn-stylekit-foreground-color, #333); background: transparent; } .hljs-comment, .hljs-quote { color: var(--sn-stylekit-secondary-foreground-color, #6a737d); font-style: italic; } .hljs-keyword, .hljs-selector-tag, .hljs-subst, .hljs-deletion, .hljs-meta, .hljs-selector-class { color: #d73a49; } .hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr { color: var(--sn-stylekit-primary-color, #005cc5); } .hljs-string, .hljs-doctag { color: #032f62; } .hljs-title, .hljs-section, .hljs-selector-id, .hljs-type, .hljs-symbol, .hljs-bullet, .hljs-link { color: #6f42c1; } .hljs-addition { color: #22863a; } .hljs-emphasis { font-style: italic; } .hljs-strong { font-weight: bold; }
        @media (prefers-color-scheme: dark) { .markdown-preview pre code.hljs .hljs-keyword, .markdown-preview pre code.hljs .hljs-selector-tag, .markdown-preview pre code.hljs .hljs-subst, .markdown-preview pre code.hljs .hljs-deletion, .markdown-preview pre code.hljs .hljs-meta, .markdown-preview pre code.hljs .hljs-selector-class { color: #ff7b72; } .markdown-preview pre code.hljs .hljs-string, .markdown-preview pre code.hljs .hljs-doctag { color: #a5d6ff; } .markdown-preview pre code.hljs .hljs-title, .markdown-preview pre code.hljs .hljs-section, .markdown-preview pre code.hljs .hljs-selector-id, .markdown-preview pre code.hljs .hljs-type, .markdown-preview pre code.hljs .hljs-symbol, .markdown-preview pre code.hljs .hljs-bullet, .markdown-preview pre code.hljs .hljs-link { color: #d2a8ff; } .markdown-preview pre code.hljs .hljs-addition { color: #7ee787; } }
        @media print { body > *:not(.print-container) { display: none !important; } .print-container, .print-container > * { display: block !important; width: 100% !important; height: auto !important; overflow: visible !important; } html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; } .markdown-preview { padding: 2cm !important; border: none !important; box-shadow: none !important; color: #000 !important; background-color: #fff !important; font-size: 12pt !important; line-height: 1.5 !important; } .markdown-preview h1, .markdown-preview h2, .markdown-preview h3, .markdown-preview h4, .markdown-preview h5, .markdown-preview h6 { color: #000 !important; border-bottom-color: #ccc !important; } .markdown-preview pre, .markdown-preview code { background-color: #f0f0f0 !important; color: #000 !important; border: 1px solid #ccc !important; } .markdown-preview pre code.hljs { color: #000 !important; } .markdown-preview blockquote { color: #333 !important; border-left-color: #ccc !important; } .markdown-preview tr:nth-child(2n) { background-color: #f6f8fa !important; } .markdown-preview th, .markdown-preview td { border-color: #ccc !important; } .copy-code-button { display: none !important; } .raw-text-print { margin: 0 !important; padding: 2cm !important; white-space: pre-wrap !important; word-wrap: break-word !important; font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace; font-size: 10pt !important; color: #000 !important; background: #fff !important; } pre, blockquote, table, img, h1, h2, h3, h4 { page-break-inside: avoid; } h1, h2, h3 { page-break-after: avoid; } }
        .sn-image-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .sn-image-modal-content { background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-foreground-color, #333); padding: 20px; border-radius: 8px; width: 90%; max-width: 500px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
        .sn-image-modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--sn-stylekit-border-color, #eee); padding-bottom: 10px; margin-bottom: 20px; }
        .sn-image-modal-header h3 { margin: 0; font-size: 18px; }
        .sn-image-modal-close { background: none; border: none; font-size: 24px; cursor: pointer; color: var(--sn-stylekit-secondary-foreground-color, #888); padding: 0 8px; }
        .sn-image-modal-tabs { display: flex; border-bottom: 1px solid var(--sn-stylekit-border-color, #ccc); margin-bottom: 20px; }
        .sn-image-modal-tab { padding: 10px 15px; cursor: pointer; border: none; background: none; border-bottom: 3px solid transparent; font-size: 15px; color: var(--sn-stylekit-secondary-foreground-color, #666); }
        .sn-image-modal-tab.active { color: var(--sn-stylekit-primary-color, #346df1); border-bottom-color: var(--sn-stylekit-primary-color, #346df1); }
        .sn-image-modal-panel { display: none; }
        .sn-image-modal-panel.active { display: block; }
        .sn-image-modal-body label { display: block; margin-bottom: 8px; font-weight: bold; font-size: 14px; }
        .sn-image-modal-body input[type="text"], .sn-image-modal-body input[type="file"] { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid var(--sn-stylekit-border-color, #ccc); background-color: var(--sn-stylekit-editor-background-color, #f9f9f9); color: var(--sn-stylekit-foreground-color, #333); box-sizing: border-box; margin-bottom: 15px; }
        .sn-image-modal-footer { text-align: right; margin-top: 20px; }
        .sn-image-modal-insert-btn { padding: 8px 16px; border-radius: 5px; border: none; background-color: var(--sn-stylekit-primary-color, #346df1); color: var(--sn-stylekit-primary-contrast-color, #fff); cursor: pointer; }
        .sn-image-modal-insert-btn:disabled { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); color: var(--sn-stylekit-secondary-foreground-color, #888); cursor: not-allowed; }
        .sn-image-upload-preview { margin-top: 10px; max-height: 150px; text-align: center; }
        .sn-image-upload-preview img { max-width: 100%; max-height: 150px; border-radius: 4px; border: 1px solid var(--sn-stylekit-border-color, #ccc); }
    `);

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function applyMarkdown(textarea, prefix, suffix = '', placeholder = '') {
        const start = textarea.selectionStart; const end = textarea.selectionEnd; const selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(start - prefix.length, start); const textAfter = textarea.value.substring(end, end + suffix.length);
        if (textBefore === prefix && textAfter === suffix) { textarea.setRangeText(selectedText, start - prefix.length, end + suffix.length, 'select'); }
        else if (selectedText.startsWith(prefix) && selectedText.endsWith(suffix)) { const unwrappedText = selectedText.substring(prefix.length, selectedText.length - suffix.length); textarea.setRangeText(unwrappedText, start, end, 'select'); }
        else { let newText; if (selectedText) { newText = prefix + selectedText + suffix; } else { newText = prefix + placeholder + suffix; } textarea.setRangeText(newText, start, end, 'end'); if (!selectedText && placeholder) { textarea.selectionStart = start + prefix.length; textarea.selectionEnd = start + prefix.length + placeholder.length; } }
        textarea.focus(); textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }

    function setupMarkdownEditor(originalTextarea) {
        if (originalTextarea.dataset.markdownReady) return;
        originalTextarea.dataset.markdownReady = 'true';

        marked.setOptions({ gfm: true, breaks: true, smartLists: true, langPrefix: 'language-' });

        const editorWrapper = originalTextarea.parentElement;
        editorWrapper.style.display = 'none';
        editorWrapper.style.height = '100%';

        const resizeAndEncodeImage = (file) => {
            return new Promise((resolve, reject) => {
                if (!file.type.startsWith('image/')) {
                    return reject(new Error('File is not an image.'));
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        let { width, height } = img;
                        if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
                            if (width > height) {
                                height = Math.round(height * (MAX_IMAGE_DIMENSION / width));
                                width = MAX_IMAGE_DIMENSION;
                            } else {
                                width = Math.round(width * (MAX_IMAGE_DIMENSION / height));
                                height = MAX_IMAGE_DIMENSION;
                            }
                        }
                        const canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.fillStyle = '#FFFFFF';
                        ctx.fillRect(0, 0, width, height);
                        ctx.drawImage(img, 0, 0, width, height);
                        const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
                        console.log(`Image resized: original=${(file.size / 1024).toFixed(1)}KB, new=${(dataUrl.length / 1024 * 0.75).toFixed(1)}KB (approx)`);
                        resolve(dataUrl);
                    };
                    img.onerror = (err) => reject(new Error('Failed to load image.'));
                    img.src = event.target.result;
                };
                reader.onerror = (err) => reject(new Error('Failed to read file.'));
                reader.readAsDataURL(file);
            });
        };

        const insertImageAsReference = (base64data, altText, textarea) => {
            const timestamp = new Date();
            const finalAltText = altText || `${T.pastedImageAltText} ${timestamp.toLocaleString(lang)}`;
            const refId = `image-ref-${timestamp.getTime()}`;
            const markdownImageRef = `![${finalAltText}][${refId}]\n`;
            const markdownImageDef = `\n\n[${refId}]: ${base64data}`;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const textBefore = textarea.value.substring(0, start);
            const textAfter = textarea.value.substring(end);
            textarea.value = textBefore + markdownImageRef + textAfter + markdownImageDef;
            const newCursorPos = start + markdownImageRef.length;
            textarea.selectionStart = textarea.selectionEnd = newCursorPos;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            textarea.focus();
        };

        const handlePaste = async (event) => {
            const items = event.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.startsWith('image/')) {
                    const file = items[i].getAsFile();
                    if (file) {
                        event.preventDefault();
                        try {
                            const resizedBase64 = await resizeAndEncodeImage(file);
                            insertImageAsReference(resizedBase64, null, event.target);
                        } catch (error) {
                            console.error("Image processing failed:", error);
                            alert(T.errorImageProcessing);
                        }
                    }
                    break;
                }
            }
        };

        const garbageCollectImageReferences = () => {
            const text = markdownTextarea.value;
            const usedRefs = new Set();
            const usageRegex = /!\[.*?\]\[(image-ref-\d+?)\]/g;
            let usageMatch;
            while ((usageMatch = usageRegex.exec(text)) !== null) {
                usedRefs.add(usageMatch[1]);
            }
            const lines = text.split('\n');
            const newLines = [];
            let definitionsRemoved = false;
            const definitionRegex = /^\[(image-ref-\d+?)\]:\s*data:image\//;
            for (const line of lines) {
                const defMatch = line.match(definitionRegex);
                if (defMatch) {
                    const defId = defMatch[1];
                    if (usedRefs.has(defId)) {
                        newLines.push(line);
                    } else {
                        definitionsRemoved = true;
                        console.log(`GC: Removing orphaned image reference: ${defId}`);
                    }
                } else {
                    newLines.push(line);
                }
            }
            if (definitionsRemoved) {
                const cleanedText = newLines.join('\n');
                const cursorPos = markdownTextarea.selectionStart;
                markdownTextarea.value = cleanedText;
                markdownTextarea.selectionStart = markdownTextarea.selectionEnd = cursorPos;
                originalTextarea.value = markdownTextarea.value;
                originalTextarea.dispatchEvent(new Event('input', { bubbles: true }));
            }
        };

        const debouncedGarbageCollector = debounce(garbageCollectImageReferences, 1500);

        const openImageModal = () => {
            let selectedFile = null;
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'sn-image-modal-overlay';
            modalOverlay.innerHTML = `
                <div class="sn-image-modal-content">
                    <div class="sn-image-modal-header">
                        <h3>${T.insertImage}</h3>
                        <button class="sn-image-modal-close" title="${T.close}">&times;</button>
                    </div>
                    <div class="sn-image-modal-tabs">
                        <button class="sn-image-modal-tab active" data-tab="url">${T.fromURL}</button>
                        <button class="sn-image-modal-tab" data-tab="upload">${T.uploadFile}</button>
                    </div>
                    <div class="sn-image-modal-body">
                        <div class="sn-image-modal-panel active" id="image-modal-panel-url">
                            <label for="image-url-input">${T.imageURL}</label>
                            <input type="text" id="image-url-input" placeholder="https://example.com/image.png">
                        </div>
                        <div class="sn-image-modal-panel" id="image-modal-panel-upload">
                            <input type="file" id="image-file-input" accept="image/*" style="display: none;">
                            <button type="button" onclick="document.getElementById('image-file-input').click()" class="mode-toggle-button">${T.chooseFile}</button>
                            <div class="sn-image-upload-preview"></div>
                        </div>
                        <label for="image-alt-input" style="margin-top: 15px;">${T.altText}</label>
                        <input type="text" id="image-alt-input" placeholder="${T.altText}">
                    </div>
                    <div class="sn-image-modal-footer">
                        <button class="sn-image-modal-insert-btn">${T.insert}</button>
                    </div>
                </div>`;
            document.body.appendChild(modalOverlay);
            const content = modalOverlay.querySelector('.sn-image-modal-content');
            const closeBtn = modalOverlay.querySelector('.sn-image-modal-close');
            const tabs = modalOverlay.querySelectorAll('.sn-image-modal-tab');
            const panels = modalOverlay.querySelectorAll('.sn-image-modal-panel');
            const insertBtn = modalOverlay.querySelector('.sn-image-modal-insert-btn');
            const urlInput = modalOverlay.querySelector('#image-url-input');
            const fileInput = modalOverlay.querySelector('#image-file-input');
            const altInput = modalOverlay.querySelector('#image-alt-input');
            const previewContainer = modalOverlay.querySelector('.sn-image-upload-preview');
            let activeTab = 'url';
            const closeModal = () => document.body.contains(modalOverlay) && document.body.removeChild(modalOverlay);
            closeBtn.onclick = closeModal;
            content.onclick = (e) => e.stopPropagation();
            modalOverlay.onclick = closeModal;
            tabs.forEach(tab => {
                tab.onclick = () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));
                    tab.classList.add('active');
                    activeTab = tab.dataset.tab;
                    modalOverlay.querySelector(`#image-modal-panel-${activeTab}`).classList.add('active');
                };
            });
            fileInput.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    selectedFile = file;
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        previewContainer.innerHTML = `<img src="${re.target.result}" alt="Preview">`;
                    };
                    reader.readAsDataURL(file);
                    if (!altInput.value) { altInput.value = file.name; }
                }
            };
            insertBtn.onclick = async () => {
                const alt = altInput.value.trim();
                if (activeTab === 'url') {
                    const url = urlInput.value.trim();
                    if (url) {
                        applyMarkdown(markdownTextarea, '', `![${alt}](${url})`);
                        closeModal();
                    }
                } else if (activeTab === 'upload') {
                    if (selectedFile) {
                        try {
                            insertBtn.textContent = T.processing;
                            insertBtn.disabled = true;
                            const resizedBase64 = await resizeAndEncodeImage(selectedFile);
                            insertImageAsReference(resizedBase64, alt, markdownTextarea);
                            closeModal();
                        } catch (error) {
                            console.error("Image processing failed:", error);
                            alert(T.errorImageProcessing);
                            insertBtn.textContent = T.insert;
                            insertBtn.disabled = false;
                        }
                    }
                }
            };
            urlInput.focus();
        };

        const container = document.createElement('div'); container.className = 'markdown-editor-container';
        const modeBar = document.createElement('div'); modeBar.className = 'mode-toggle-bar';
        const editorButton = document.createElement('button'); editorButton.className = 'mode-toggle-button'; editorButton.textContent = T.editor;
        const splitButton = document.createElement('button'); splitButton.className = 'mode-toggle-button'; splitButton.textContent = T.split;
        const previewButton = document.createElement('button'); previewButton.className = 'mode-toggle-button'; previewButton.textContent = T.preview;
        const toolbarToggleButton = document.createElement('button'); toolbarToggleButton.className = 'mode-toggle-button toolbar-toggle-button'; toolbarToggleButton.title = T.toggleToolbar; toolbarToggleButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`;
        const printButton = document.createElement('button'); printButton.className = 'mode-toggle-button pdf-export-button'; printButton.textContent = T.printPDF; printButton.title = T.exportPDF;
        const toolbar = document.createElement('div'); toolbar.className = 'markdown-toolbar';
        const markdownTextarea = document.createElement('textarea'); markdownTextarea.className = originalTextarea.className + ' custom-markdown-textarea'; markdownTextarea.value = originalTextarea.value; markdownTextarea.spellcheck = false;
        const previewPane = document.createElement('div'); previewPane.className = 'markdown-preview';

        markdownTextarea.addEventListener('paste', handlePaste);

        const toolbarButtons = [ { type: 'select', name: 'heading', options: [ { value: 'p', text: T.paragraph }, { value: 'h1', text: T.heading1 }, { value: 'h2', text: T.heading2 }, { value: 'h3', text: T.heading3 }, { value: 'h4', text: T.heading4 } ], action: (prefix) => { const start = markdownTextarea.selectionStart; let lineStart = markdownTextarea.value.lastIndexOf('\n', start - 1) + 1; let lineEnd = markdownTextarea.value.indexOf('\n', start); if (lineEnd === -1) lineEnd = markdownTextarea.value.length; const originalLine = markdownTextarea.value.substring(lineStart, lineEnd); const cleanedLine = originalLine.replace(/^\s*#+\s*/, ''); const newText = prefix ? `${prefix} ${cleanedLine}` : cleanedLine; markdownTextarea.setRangeText(newText, lineStart, lineEnd, 'end'); markdownTextarea.dispatchEvent(new Event('input', { bubbles: true })); markdownTextarea.focus(); } }, { type: 'button', name: 'B', title: T.bold, action: () => applyMarkdown(markdownTextarea, '**', '**', T.boldPlaceholder) }, { type: 'button', name: 'I', title: T.italic, action: () => applyMarkdown(markdownTextarea, '*', '*', T.italicPlaceholder) }, { type: 'button', name: 'S', title: T.strikethrough, action: () => applyMarkdown(markdownTextarea, '~~', '~~', T.strikethroughPlaceholder) }, { type: 'button', name: '`', title: T.inlineCode, action: () => applyMarkdown(markdownTextarea, '`', '`', T.codePlaceholder) }, { type: 'button', name: '“ ”', title: T.quote, action: () => applyMarkdown(markdownTextarea, '> ', '', T.quotePlaceholder) }, { type: 'button', name: '•', title: T.list, action: () => applyMarkdown(markdownTextarea, '- ', '', T.listItemPlaceholder) }, { type: 'button', name: '1.', title: T.numberedList, action: () => applyMarkdown(markdownTextarea, '1. ', '', T.listItemPlaceholder) }, { type: 'button', name: '☑', title: T.checklist, action: () => applyMarkdown(markdownTextarea, '- [ ] ', '', T.taskPlaceholder) }, { type: 'button', name: '</>', title: T.codeBlock, action: () => applyMarkdown(markdownTextarea, '```\n', '\n```', T.codePlaceholder) }, { type: 'icon-button', name: 'Image', title: T.image, icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path></svg>`, action: openImageModal }, { type: 'button', name: 'Link', title: T.link, action: () => { const url = prompt(T.linkPrompt, 'https://'); if (url) applyMarkdown(markdownTextarea, '[', `](${url})`, T.linkTextPlaceholder); }}, { type: 'button', name: T.insertTable, title: T.insertTable, action: () => applyMarkdown(markdownTextarea, '| Column 1 | Column 2 |\n|---|---|\n|  |  |\n') }, { type: 'button', name: '―', title: T.horizontalRule, action: () => applyMarkdown(markdownTextarea, '\n---\n') }, ];
        toolbarButtons.forEach(item => { if (item.type === 'select') { const select = document.createElement('select'); select.className = 'toolbar-select heading-select'; item.options.forEach(opt => { const option = document.createElement('option'); option.value = opt.value; option.textContent = opt.text; select.appendChild(option); }); select.onchange = (e) => { let prefix = ''; switch (e.target.value) { case 'h1': prefix = '#'; break; case 'h2': prefix = '##'; break; case 'h3': prefix = '###'; break; case 'h4': prefix = '####'; break; } item.action(prefix); }; toolbar.appendChild(select); } else { const button = document.createElement('button'); button.className = 'toolbar-button'; button.title = item.title; button.onclick = item.action; if (item.type === 'icon-button') { button.classList.add('icon-button'); button.innerHTML = item.icon; } else { button.textContent = item.name; } toolbar.appendChild(button); } });

        const contentWrapper = document.createElement('div'); contentWrapper.className = 'editor-preview-wrapper';
        contentWrapper.append(markdownTextarea, previewPane);
        modeBar.append(editorButton, splitButton, previewButton, toolbarToggleButton, printButton);
        container.append(modeBar, toolbar, contentWrapper);
        editorWrapper.after(container);

        const updatePreview = () => { try { const dirtyHtml = marked.parse(markdownTextarea.value); const sanitizedHtml = DOMPurify.sanitize(dirtyHtml, { USE_PROFILES: { html: true }, ADD_ATTR: ['class', 'type', 'disabled', 'checked'], ADD_TAGS: ['span', 'input'], }); previewPane.innerHTML = sanitizedHtml; previewPane.querySelectorAll('pre code').forEach(hljs.highlightElement); previewPane.querySelectorAll('pre').forEach(preEl => { if (preEl.querySelector('.copy-code-button')) return; const codeEl = preEl.querySelector('code'); if (!codeEl) return; const copyButton = document.createElement('button'); copyButton.className = 'copy-code-button'; copyButton.textContent = T.copy; copyButton.setAttribute('aria-label', T.copyAriaLabel); preEl.appendChild(copyButton); copyButton.addEventListener('click', (e) => { e.stopPropagation(); navigator.clipboard.writeText(codeEl.innerText).then(() => { copyButton.textContent = T.copied; copyButton.classList.add('copied'); setTimeout(() => { copyButton.textContent = T.copy; copyButton.classList.remove('copied'); }, 2000); }).catch(err => { console.error('Failed to copy code block.', err); copyButton.textContent = T.copyError; setTimeout(() => { copyButton.textContent = T.copy; }, 2000); }); }); }); } catch (e) { console.error("Error updating preview:", e); previewPane.innerHTML = `<div style="padding: 1rem; color: #d73a49; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: .25rem;"><strong>${T.previewErrorTitle}</strong><br><pre style="white-space: pre-wrap; word-break: break-all; margin-top: 0.5rem;">${e.stack}</pre></div>`; } };
        const updateToolbarState = () => { const headerSelect = toolbar.querySelector('.heading-select'); if (!headerSelect) return; const start = markdownTextarea.selectionStart; const lineStart = markdownTextarea.value.lastIndexOf('\n', start - 1) + 1; const currentLine = markdownTextarea.value.substring(lineStart).split('\n')[0]; let currentStyle = 'p'; if (/^#\s/.test(currentLine)) { currentStyle = 'h1'; } else if (/^##\s/.test(currentLine)) { currentStyle = 'h2'; } else if (/^###\s/.test(currentLine)) { currentStyle = 'h3'; } else if (/^####\s/.test(currentLine)) { currentStyle = 'h4'; } if (headerSelect.value !== currentStyle) { headerSelect.value = currentStyle; } };
        markdownTextarea.addEventListener('keyup', updateToolbarState);
        markdownTextarea.addEventListener('mouseup', updateToolbarState);
        markdownTextarea.addEventListener('focus', updateToolbarState);
        markdownTextarea.addEventListener('input', () => {
            updateToolbarState();
            originalTextarea.value = markdownTextarea.value;
            originalTextarea.dispatchEvent(new Event('input', { bubbles: true }));
            if (container.classList.contains('mode-split') || container.classList.contains('mode-preview')) { updatePreview(); }
            debouncedGarbageCollector();
        });
        const observer = new MutationObserver(() => {
            if (originalTextarea.value !== markdownTextarea.value) {
                const cursorPos = markdownTextarea.selectionStart;
                markdownTextarea.value = originalTextarea.value;
                markdownTextarea.selectionStart = markdownTextarea.selectionEnd = cursorPos;
                updateToolbarState();
                if(container.classList.contains('mode-split') || container.classList.contains('mode-preview')) { updatePreview(); }
                debouncedGarbageCollector();
            }
        });
        observer.observe(originalTextarea, { attributes: true, childList: true, subtree: true, characterData: true });

        const modeButtons = { editor: editorButton, split: splitButton, preview: previewButton };
        const switchMode = (mode) => { container.classList.remove('mode-editor', 'mode-split', 'mode-preview'); container.classList.add(`mode-${mode}`); Object.values(modeButtons).forEach(btn => btn.classList.remove('active')); modeButtons[mode].classList.add('active'); localStorage.setItem(STORAGE_KEY_MODE, mode); if (mode === 'preview' || mode === 'split') { updatePreview(); } if (mode !== 'preview') { markdownTextarea.focus(); } };
        editorButton.addEventListener('click', () => switchMode('editor')); splitButton.addEventListener('click', () => switchMode('split')); previewButton.addEventListener('click', () => switchMode('preview'));

        const toggleToolbar = (visible) => { container.classList.toggle('toolbar-hidden', !visible); toolbarToggleButton.classList.toggle('active', visible); localStorage.setItem(STORAGE_KEY_TOOLBAR_VISIBLE, visible); };
        toolbarToggleButton.addEventListener('click', () => { const isVisible = container.classList.contains('toolbar-hidden'); toggleToolbar(isVisible); });

        const handlePrint = () => { const printContainer = document.createElement('div'); printContainer.className = 'print-container'; if (container.classList.contains('mode-editor')) { const pre = document.createElement('pre'); pre.className = 'raw-text-print'; pre.textContent = markdownTextarea.value; printContainer.appendChild(pre); } else { updatePreview(); const previewClone = previewPane.cloneNode(true); printContainer.appendChild(previewClone); } document.body.appendChild(printContainer); window.print(); document.body.removeChild(printContainer); };
        printButton.addEventListener('click', handlePrint);

        const initialToolbarVisible = localStorage.getItem(STORAGE_KEY_TOOLBAR_VISIBLE) !== 'false';
        toggleToolbar(initialToolbarVisible);
        const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
        switchMode(savedMode || 'editor');

        console.log('Markdown Editor for Standard Notes has been initialized (v2.6.0 with Auto Image Resizing).');
    }

    const mainObserver = new MutationObserver(() => {
        const editor = document.querySelector('#note-text-editor');
        const customEditor = document.querySelector('.markdown-editor-container');
        if (editor && !editor.dataset.markdownReady) {
            if(customEditor) customEditor.remove();
            setupMarkdownEditor(editor);
        } else if (!editor && customEditor) {
            customEditor.remove();
            const hiddenWrapper = document.querySelector('#editor-content[style*="display: none"]');
            if(hiddenWrapper) hiddenWrapper.style.display = '';
        }
    });
    mainObserver.observe(document.body, { childList: true, subtree: true });

})();
