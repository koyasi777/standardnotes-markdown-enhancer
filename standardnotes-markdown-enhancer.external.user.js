// ==UserScript==
// @name                 Enhanced Markdown Editor for Standard Notes
// @name:ja              Standard Notes 高機能Markdownエディタ拡張
// @name:en              Enhanced Markdown Editor for Standard Notes
// @name:zh-CN           为Standard Notes增强Markdown编辑器
// @name:zh-TW           為Standard Notes強化Markdown編輯器
// @name:ko              Standard Notes용 고급 Markdown 에디터 확장
// @name:fr              Éditeur Markdown amélioré pour Standard Notes
// @name:es              Editor Markdown mejorado para Standard Notes
// @name:de              Erweiterter Markdown-Editor für Standard Notes
// @name:pt-BR           Editor Markdown avançado para Standard Notes
// @name:ru              Улучшенный редактор Markdown для Standard Notes
// @version              5.3.3
// @description          Boost Standard Notes with a powerful, unofficial Markdown editor featuring live preview, formatting toolbar, image pasting/uploading with auto-resize, and PDF export. Unused images are auto-cleaned for efficiency. This version features a new architecture for rock-solid sync reliability.
// @description:ja       Standard Notesを強化する非公式の高機能Markdownエディタ！ライブプレビュー、装飾ツールバー、画像の貼り付け・アップロード（自動リサイズ）、PDF出力に対応。未使用画像は自動でクリーンアップ。盤石な同期信頼性を実現する新アーキテクチャ版です。
// @description:zh-CN    非官方增强的Markdown编辑器，为Standard Notes添加实时预览、工具栏、自动调整大小的图像粘贴/上传、PDF导出等功能，并自动清理未使用的图像。此版本采用新架构，具有坚如磐石的同步可靠性。
// @description:zh-TW    非官方強化Markdown編輯器，為Standard Notes新增即時預覽、工具列、自動縮放圖片貼上/上傳、PDF匯出等功能，並自動清除未使用圖片。此版本採用新架構，具備堅如磐石的同步可靠性。
// @description:ko       Standard Notes를 위한 강력한 비공식 Markdown 에디터! 실시간 미리보기, 서식 툴바, 이미지 붙여넣기/업로드(자동 리사이즈), PDF 내보내기 지원. 사용하지 않는 이미지는 자동 정리됩니다. 확고한 동기화 신뢰성을 위한 새로운 아키텍처 버전입니다。
// @description:fr       Améliorez Standard Notes avec un éditeur Markdown puissant et non officiel : aperçu en direct, barre d’outils, collage/téléversement d’images redimensionnées automatiquement, export PDF. Nettoyage automatique des images inutilisées. Cette version présente une nouvelle architecture pour une fiabilité de synchronisation à toute épreuve.
// @description:es       Mejora Standard Notes con un potente editor Markdown no oficial: vista previa en vivo, barra de herramientas, pegado/carga de imágenes con redimensionado automático y exportación a PDF. Las imágenes no usadas se eliminan automáticamente. Esta versión presenta una nueva arquitectura para una fiabilidad de sincronización sólida como una roca.
// @description:de       Erweitern Sie Standard Notes mit einem leistungsstarken, inoffiziellen Markdown-Editor: Live-Vorschau, Formatierungsleiste, Bild-Einfügen/-Hochladen mit automatischer Größenanpassung und PDF-Export. Nicht verwendete Bilder werden automatisch bereinigt. Diese Version verfügt über eine neue Architektur für eine absolut zuverlässige Synchronisierung.
// @description:pt-BR    Potencialize o Standard Notes com um editor Markdown poderoso e não oficial: visualização ao vivo, barra de formatação, colagem/envio de imagens com redimensionamento automático e exportação para PDF. Imagens não utilizadas são removidas automaticamente. Esta versão apresenta uma nova arquitetura para uma confiabilidade de sincronização sólida.
// @description:ru       Улучшите Standard Notes с помощью мощного неофициального редактора Markdown: живая превью, панель форматирования, вставка/загрузка изображений с автоизменением размера и экспорт в PDF. Неиспользуемые изображения автоматически удаляются. Эта версия имеет новую архитектуру для надежной синхронизации.
// @namespace            https://github.com/koyasi777/standardnotes-markdown-enhancer
// @author               koyasi777
// @match                https://app.standardnotes.com/*
// @grant                GM_addStyle
// @grant                GM_info
// @require              https://cdn.jsdelivr.net/npm/marked/marked.min.js
// @require              https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js
// @require              https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/highlight.min.js
// @license              MIT
// @homepageURL          https://github.com/koyasi777/standardnotes-markdown-enhancer
// @supportURL           https://github.com/koyasi777/standardnotes-markdown-enhancer/issues
// @icon                 https://app.standardnotes.com/favicon/favicon-32x32.png
// ==/UserScript==

(function() {
    'use strict';

    // --- グローバル設定値 ---
    const MAX_IMAGE_DIMENSION = 1280;
    const JPEG_QUALITY = 0.8;
    const INDENT_SPACES = '  ';

    // UserScriptエンジンの誤パースを避けるため、HTMLコメントに見える文字列を連結で生成
    const DEFINITIONS_HEADER = '<' + '!-- sn-markdown-enhancer-definitions';
    const DEFINITIONS_FOOTER = '--' + '>';

    // --- グローバル参照 ---
    let activeEditorInstance = null;
    let debouncedInputHandler = () => {};
    let isInternallyUpdating = false;

    // Reactなどのフレームワークに確実に入力変更を伝えるため、textareaのネイティブなセッターを取得しておく
    const nativeTextareaSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;

    // --- 国際化 (i18n) ---
    const I18N = {
        en: {
            editor: 'Editor', split: 'Split', preview: 'Preview', toggleToolbar: 'Toggle Toolbar',
            exportPDF: 'Print / Export as PDF', paragraph: 'Paragraph', heading1: 'Heading 1',
            heading2: 'Heading 2', heading3: 'Heading 3', heading4: 'Heading 4', bold: 'Bold',
            italic: 'Italic', strikethrough: 'Strikethrough', inlineCode: 'Inline Code', quote: 'Quote',
            list: 'Bulleted List', numberedList: 'Numbered List', checklist: 'Checklist',
            codeBlock: 'Code Block', link: 'Link', insertTable: 'Insert/Edit Table', horizontalRule: 'Horizontal Rule',
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
            tableEditor: 'Interactive Table Editor', addRow: 'Add Row', addCol: 'Add Column',
            deleteRow: 'Delete Row', deleteCol: 'Delete Column',
            alignLeft: 'Align Left', alignCenter: 'Align Center', alignRight: 'Align Right'
        },
        ja: {
            editor: 'エディタ', split: '分割', preview: 'プレビュー', toggleToolbar: 'ツールバー表示切替',
            exportPDF: 'PDFとして印刷/エクスポート', paragraph: '段落', heading1: '見出し 1',
            heading2: '見出し 2', heading3: '見出し 3', heading4: '見出し 4', bold: '太字',
            italic: '斜体', strikethrough: '打ち消し線', inlineCode: 'インラインコード', quote: '引用',
            list: 'リスト', numberedList: '番号付きリスト', checklist: 'チェックリスト',
            codeBlock: 'コードブロック', link: 'リンク', insertTable: 'テーブルを挿入/編集', horizontalRule: '水平線',
            image: '画像',
            linkPrompt: 'リンク先のURLを入力してください:', boldPlaceholder: '太字', italicPlaceholder: '斜体',
            strikethroughPlaceholder: '打ち消し', codePlaceholder: 'code', quotePlaceholder: '引用文',
            listItemPlaceholder: '項目', taskPlaceholder: 'タスク', linkTextPlaceholder: 'リンクテキスト',
            copy: 'コピー', copied: 'コピーしました!', copyError: 'エラー', copyAriaLabel: 'クリップボードにコードをコピー',
            previewErrorTitle: 'プレビューの更新中にエラーが発生しました:', printPDF: 'PDF',
            pastedImageAltText: '貼り付けられた画像',
            insertImage: '画像を挿入', fromURL: 'URLから', uploadFile: 'ファイルをアップロード',
            imageURL: '画像のURL', altText: '代替テキスト（任意）', chooseFile: 'ファイルを選択...',
            insert: '挿入', close: '閉じる', processing: '処理中...',
            errorImageProcessing: '画像の処理に失敗しました。',
            tableEditor: 'インタラクティブ テーブルエディタ', addRow: '行を追加', addCol: '列を追加',
            deleteRow: 'この行を削除', deleteCol: 'この列を削除',
            alignLeft: '左揃え', alignCenter: '中央揃え', alignRight: '右揃え'
        }
    };
    const lang = navigator.language.startsWith('ja') ? 'ja' : 'en';
    const T = I18N[lang] || I18N.en;

    const STORAGE_KEY_MODE = 'snMarkdownEditorMode';
    const STORAGE_KEY_TOOLBAR_VISIBLE = 'snMarkdownToolbarVisible';

    // プレビューコンテナ用のユニークなクラス名
    const PREVIEW_CONTAINER_CLASS = 'sn-markdown-preview-container';

    // スコープ化されたプレビュースタイル
    const SCOPED_PREVIEW_STYLES = `
        .${PREVIEW_CONTAINER_CLASS} {
            overflow-y: auto;
            height: 100%;
            -webkit-overflow-scrolling: touch;
            padding: 16px;
            line-height: 1.7;
            font-size: 1.05rem;
            color: var(--sn-stylekit-foreground-color, #333);
        }
        /* [BESTPRACTICE] コンテナ内の全要素に色の継承を強制し、本体CSSからの意図しない上書きを防ぐ */
        .${PREVIEW_CONTAINER_CLASS} * {
            color: inherit;
        }
        .${PREVIEW_CONTAINER_CLASS} h1, .${PREVIEW_CONTAINER_CLASS} h2, .${PREVIEW_CONTAINER_CLASS} h3, .${PREVIEW_CONTAINER_CLASS} h4, .${PREVIEW_CONTAINER_CLASS} h5, .${PREVIEW_CONTAINER_CLASS} h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; border-bottom: 1px solid var(--sn-stylekit-border-color, #eee); padding-bottom: .3em; }
        .${PREVIEW_CONTAINER_CLASS} h1 { font-size: 2em; }
        .${PREVIEW_CONTAINER_CLASS} h2 { font-size: 1.5em; }
        .${PREVIEW_CONTAINER_CLASS} h3 { font-size: 1.25em; }
        .${PREVIEW_CONTAINER_CLASS} p { margin-bottom: 16px; }
        .${PREVIEW_CONTAINER_CLASS} ul, .${PREVIEW_CONTAINER_CLASS} ol { padding-left: 2em; margin-bottom: 16px; }
        .${PREVIEW_CONTAINER_CLASS} blockquote { padding: 0 1em; color: var(--sn-stylekit-secondary-foreground-color, #6a737d) !important; border-left: .25em solid var(--sn-stylekit-border-color, #dfe2e5); margin: 0 0 16px 0; }
        .${PREVIEW_CONTAINER_CLASS} code { padding: .2em .4em; margin: 0; font-size: 85%; background-color: var(--sn-stylekit-secondary-background-color, rgba(200,200,200,0.3)); border-radius: 3px; font-family: var(--sn-stylekit-font-code, monospace); }
        .${PREVIEW_CONTAINER_CLASS} pre { position: relative; padding: 16px; padding-top: 40px; overflow: auto; font-size: 85%; line-height: 1.45; background-color: var(--sn-stylekit-secondary-background-color, rgba(200,200,200,0.3)); border-radius: 6px; word-wrap: normal; margin-bottom: 16px; }
        .${PREVIEW_CONTAINER_CLASS} pre code { background-color: transparent; padding: 0; margin: 0; }
        .${PREVIEW_CONTAINER_CLASS} img { max-width: 100%; height: auto; border-radius: 6px; }
        .${PREVIEW_CONTAINER_CLASS} table { border-collapse: collapse; width: 100%; margin-bottom: 16px; display: block; overflow: auto; }
        .${PREVIEW_CONTAINER_CLASS} th, .${PREVIEW_CONTAINER_CLASS} td { border: 2px solid var(--sn-stylekit-border-color, #adb5bd); padding: 6px 13px; }
        .${PREVIEW_CONTAINER_CLASS} tr:nth-child(2n) { background-color: var(--sn-stylekit-secondary-background-color, #f6f8fa); }
        .${PREVIEW_CONTAINER_CLASS} hr { height: .25em; padding: 0; margin: 24px 0; background-color: var(--sn-stylekit-border-color, #dfe2e5); border: 0; }
        .${PREVIEW_CONTAINER_CLASS} li.task-list-item { list-style-type: none; }
        .${PREVIEW_CONTAINER_CLASS} li.task-list-item input[type="checkbox"] { margin: 0 0.2em 0.25em -1.6em; vertical-align: middle; cursor: pointer; }
        .${PREVIEW_CONTAINER_CLASS} .copy-code-button { position: absolute; top: 10px; right: 10px; padding: 5px 8px; font-size: 12px; border: 1px solid var(--sn-stylekit-border-color, #ccc); border-radius: 4px; background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-secondary-foreground-color, #555) !important; cursor: pointer; opacity: 0; transition: opacity 0.2s, background-color 0.2s, color 0.2s; z-index: 1; }
        .${PREVIEW_CONTAINER_CLASS} pre:hover .copy-code-button { opacity: 1; }
        .${PREVIEW_CONTAINER_CLASS} .copy-code-button:hover { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); }
        .${PREVIEW_CONTAINER_CLASS} .copy-code-button.copied { background-color: var(--sn-stylekit-primary-color, #346df1); color: var(--sn-stylekit-primary-contrast-color, #fff) !important; border-color: var(--sn-stylekit-primary-color, #346df1); }
        .${PREVIEW_CONTAINER_CLASS} .code-language-label { position: absolute; top: 10px; left: 10px; padding: 3px 6px; font-size: 12px; color: var(--sn-stylekit-secondary-foreground-color, #6a737d) !important; background-color: rgba(255, 255, 255, 0.7); border-radius: 4px; opacity: 0.7; z-index: 1; pointer-events: none; }
        .${PREVIEW_CONTAINER_CLASS} .preview-error { padding: 1rem; color: #d73a49 !important; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: .25rem; }
        .${PREVIEW_CONTAINER_CLASS} .preview-error strong { font-weight: bold; }
        .${PREVIEW_CONTAINER_CLASS} .preview-error pre { white-space: pre-wrap; word-break: break-all; margin-top: 0.5rem; padding: 0; background: transparent; border: none; color: inherit; }
        .${PREVIEW_CONTAINER_CLASS} pre code.hljs { display: block; overflow-x: auto; padding: 0; color: var(--sn-stylekit-foreground-color, #333) !important; background: transparent; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-comment, .${PREVIEW_CONTAINER_CLASS} .hljs-quote { color: var(--sn-stylekit-secondary-foreground-color, #6a737d) !important; font-style: italic; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-keyword, .${PREVIEW_CONTAINER_CLASS} .hljs-selector-tag, .${PREVIEW_CONTAINER_CLASS} .hljs-subst, .${PREVIEW_CONTAINER_CLASS} .hljs-deletion, .${PREVIEW_CONTAINER_CLASS} .hljs-meta, .${PREVIEW_CONTAINER_CLASS} .hljs-selector-class { color: #d73a49 !important; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-number, .${PREVIEW_CONTAINER_CLASS} .hljs-literal, .${PREVIEW_CONTAINER_CLASS} .hljs-variable, .${PREVIEW_CONTAINER_CLASS} .hljs-template-variable, .${PREVIEW_CONTAINER_CLASS} .hljs-tag .hljs-attr { color: var(--sn-stylekit-primary-color, #005cc5) !important; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-string, .${PREVIEW_CONTAINER_CLASS} .hljs-doctag { color: #032f62 !important; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-title, .${PREVIEW_CONTAINER_CLASS} .hljs-section, .${PREVIEW_CONTAINER_CLASS} .hljs-selector-id, .${PREVIEW_CONTAINER_CLASS} .hljs-type, .${PREVIEW_CONTAINER_CLASS} .hljs-symbol, .${PREVIEW_CONTAINER_CLASS} .hljs-bullet, .${PREVIEW_CONTAINER_CLASS} .hljs-link { color: #6f42c1 !important; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-addition { color: #22863a !important; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-emphasis { font-style: italic; }
        .${PREVIEW_CONTAINER_CLASS} .hljs-strong { font-weight: bold; }
        .${PREVIEW_CONTAINER_CLASS} a {
            color: var(--sn-stylekit-primary-color, #007bff) !important;
            text-decoration: underline;
        }
        .${PREVIEW_CONTAINER_CLASS} a:hover {
            text-decoration: none;
        }
        @media (prefers-color-scheme: dark) {
            .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-keyword, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-selector-tag, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-subst, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-deletion, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-meta, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-selector-class { color: #ff7b72 !important; }
            .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-string, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-doctag { color: #a5d6ff !important; }
            .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-title, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-section, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-selector-id, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-type, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-symbol, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-bullet, .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-link { color: #d2a8ff !important; }
            .${PREVIEW_CONTAINER_CLASS} pre code.hljs .hljs-addition { color: #7ee787 !important; }
            .${PREVIEW_CONTAINER_CLASS} .code-language-label { background-color: rgba(0, 0, 0, 0.3); }
        }
    `;

    // --- スタイル定義 (UI部分とプレビュー部分) ---
    GM_addStyle(`
        /* UI STYLES */
        .sn-markdown-hidden { display: none !important; }
        .sn-markdown-full-height { height: 100%; }
        .markdown-editor-container { display: flex; flex-direction: column; height: 100%; overflow: hidden; border: 1px solid var(--sn-stylekit-border-color, #e0e0e0); border-radius: 4px; }
        .mode-toggle-bar { flex-shrink: 0; padding: 4px 10px; background-color: var(--sn-stylekit-editor-background-color, #f9f9f9); border-bottom: 1px solid var(--sn-stylekit-border-color, #e0e0e0); display: flex; align-items: center; gap: 5px; }
        .mode-toggle-button { padding: 5px 12px; border: 1px solid var(--sn-stylekit-border-color, #ccc); border-radius: 6px; cursor: pointer; background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-foreground-color, #333); font-size: 13px; }
        .mode-toggle-button.active { background-color: var(--sn-stylekit-primary-color, #346df1); color: var(--sn-stylekit-primary-contrast-color, #fff); border-color: var(--sn-stylekit-primary-color, #346df1); }
        .toolbar-toggle-button { margin-left: auto; padding: 5px 8px; font-size: 13px; display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; }
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
        .custom-markdown-textarea, .${PREVIEW_CONTAINER_CLASS} { flex-grow: 1; flex-shrink: 1; }
        .custom-markdown-textarea { border: none !important; outline: none !important; resize: none !important; box-shadow: none !important; padding: 16px !important; margin: 0 !important; width: 100% !important; background-color: transparent !important; color: var(--sn-stylekit-foreground-color, #333) !important; font-family: var(--sn-stylekit-font-editor, sans-serif) !important; line-height: var(--sn-stylekit-line-height-editor, 1.7) !important; height: 100%; overflow-y: auto; }
        .markdown-editor-container.mode-editor .${PREVIEW_CONTAINER_CLASS} { display: none; }
        .markdown-editor-container.mode-preview .markdown-toolbar, .markdown-editor-container.mode-preview .custom-markdown-textarea { display: none; }
        .markdown-editor-container.mode-preview .${PREVIEW_CONTAINER_CLASS} { display: block; }
        .markdown-editor-container.mode-split .custom-markdown-textarea, .markdown-editor-container.mode-split .${PREVIEW_CONTAINER_CLASS} { display: block !important; flex-basis: 50%; width: 50%; }
        .markdown-editor-container.mode-split .${PREVIEW_CONTAINER_CLASS} { border-left: 1px solid var(--sn-stylekit-border-color, #e0e0e0); }
        @media print {
            body > *:not(.print-container) { display: none !important; }
            .print-container > style { display: none !important; }
            .print-container, .print-container > .print-content, .print-container > .raw-text-print { display: block !important; width: 100% !important; height: auto !important; overflow: visible !important; }
            html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }
            .print-content { padding: 2cm !important; border: none !important; box-shadow: none !important; color: #000 !important; background-color: #fff !important; font-size: 12pt !important; line-height: 1.5 !important; }
            .print-content h1, .print-content h2, .print-content h3, .print-content h4, .print-content h5, .print-content h6 { color: #000 !important; border-bottom-color: #ccc !important; }
            .print-content pre, .print-content code { background-color: #f0f0f0 !important; color: #000 !important; border: 1px solid #ccc !important; }
            .print-content pre code.hljs { color: #000 !important; }
            .print-content blockquote { color: #333 !important; border-left-color: #ccc !important; }
            .print-content tr:nth-child(2n) { background-color: #f6f8fa !important; }
            .print-content th, .print-content td { border-color: #ccc !important; }
            .copy-code-button, .code-language-label { display: none !important; }
            .raw-text-print { margin: 0 !important; padding: 2cm !important; white-space: pre-wrap !important; word-wrap: break-word !important; font-family: 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace; font-size: 10pt !important; color: #000 !important; background: #fff !important; }
            pre, blockquote, table, img, h1, h2, h3, h4 { page-break-inside: avoid; }
            h1, h2, h3 { page-break-after: avoid; }
        }
        .sn-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; }
        .sn-modal-content { background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-foreground-color, #333); padding: 20px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); display: flex; flex-direction: column; max-height: 90vh; }
        .sn-modal-content-image { max-width: 500px; width: 90%; }
        .sn-modal-content-table { width: -moz-fit-content; width: fit-content; min-width: 360px; max-width: 90vw; }
        .sn-modal-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--sn-stylekit-border-color, #eee); padding-bottom: 10px; margin-bottom: 15px; flex-shrink: 0; }
        .sn-modal-header h3 { margin: 0; font-size: 18px; }
        .sn-modal-close { background: none; border: none; font-size: 24px; cursor: pointer; color: var(--sn-stylekit-secondary-foreground-color, #888); padding: 0 8px; }
        .sn-modal-body { flex-grow: 1; overflow-y: auto; position: relative; }
        .sn-modal-footer { text-align: right; margin-top: 15px; border-top: 1px solid var(--sn-stylekit-border-color, #eee); padding-top: 15px; flex-shrink: 0; }
        .sn-modal-insert-btn { padding: 8px 16px; border-radius: 5px; border: none; background-color: var(--sn-stylekit-primary-color, #346df1); color: var(--sn-stylekit-primary-contrast-color, #fff); cursor: pointer; }
        .sn-modal-insert-btn:disabled { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); color: var(--sn-stylekit-secondary-foreground-color, #a0a0a0); cursor: not-allowed; }
        .sn-modal-tabs { display: flex; border-bottom: 1px solid var(--sn-stylekit-border-color, #eee); margin-bottom: 15px; }
        .sn-modal-tab { padding: 10px 15px; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; }
        .sn-modal-tab.active { border-bottom-color: var(--sn-stylekit-primary-color, #346df1); font-weight: bold; }
        .sn-modal-tab-content { display: none; padding: 5px 0; }
        .sn-modal-tab-content.active { display: block; }
        .sn-modal-form-group { margin-bottom: 15px; }
        .sn-modal-form-group label { display: block; margin-bottom: 5px; font-weight: 500; }
        .sn-modal-input { width: 100%; padding: 8px; border: 1px solid var(--sn-stylekit-border-color, #ccc); border-radius: 4px; box-sizing: border-box; background-color: var(--sn-stylekit-background-color, #fff); color: var(--sn-stylekit-foreground-color, #333); }
        .sn-modal-file-wrapper { position: relative; }
        .sn-modal-file-label { display: block; padding: 12px; border: 2px dashed var(--sn-stylekit-border-color, #ccc); border-radius: 4px; text-align: center; cursor: pointer; transition: border-color 0.2s; }
        .sn-modal-file-label:hover { border-color: var(--sn-stylekit-primary-color, #346df1); }
        .sn-modal-file-input[type="file"] { display: none; }
        .sn-modal-processing-indicator { margin-top: 10px; font-style: italic; color: var(--sn-stylekit-secondary-foreground-color, #888); text-align: center; }
        .sn-modal-image-preview { max-height: 150px; max-width: 100%; border: 1px solid var(--sn-stylekit-border-color, #ccc); border-radius: 4px; margin-top: 10px; }
        .sn-modal-content-table .sn-modal-body { overflow: hidden; }
        .sn-table-editor-container { position: relative; height: 100%; display: flex; flex-direction: column; }
        .sn-table-scroll-container { overflow: auto; flex-grow: 1; padding: 40px 0 0 40px; }
        .sn-table-editor { border-collapse: collapse; }
        .sn-table-editor th, .sn-table-editor td { border: 1px solid var(--sn-stylekit-border-color, #ccc); padding: 2px; position: relative; }
        .sn-table-editor .cell-input { width: 100%; height: 100%; border: none; outline: none; padding: 8px; background: transparent; color: var(--sn-stylekit-foreground-color, #333); font-size: 14px; box-sizing: border-box; min-height: 38px; }
        .sn-table-editor .cell-input::placeholder { color: var(--sn-stylekit-secondary-foreground-color, #e8e8e8); opacity: 0.4; }
        .sn-table-editor .cell-input:focus { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); }
        .sn-table-editor th { background-color: var(--sn-stylekit-secondary-background-color, #f6f8fa); }
        .col-header { cursor: pointer; padding: 8px; display: flex; align-items: center; justify-content: center; gap: 4px; }
        .col-header:hover { background-color: var(--sn-stylekit-border-color, #e0e0e0); }
        .align-icon { font-size: 10px; font-weight: bold; }
        .delete-btn { position: absolute; cursor: pointer; background: #fff; border: 1px solid #ccc; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: #d73a49; font-size: 14px; line-height: 1; opacity: 0.2; transition: opacity 0.2s; z-index: 5; }
        .delete-btn:hover { opacity: 1; background-color: #d73a49; color: white; border-color: #d73a49; }
        .delete-col-btn { top: -30px; left: 50%; transform: translateX(-50%); }
        .delete-row-btn { left: -30px; top: 50%; transform: translateY(-50%); }
        .sn-table-editor tr:hover .delete-row-btn { opacity: 1; }
        .sn-table-editor th:hover .delete-col-btn { opacity: 1; }
        .add-btn { position: relative; cursor: pointer; background: var(--sn-stylekit-primary-color, #346df1); color: white; border: 1px solid white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; line-height: 1; z-index: 10; }
        .control-cell { border: none !important; background: transparent !important; text-align: center; vertical-align: middle; padding: 4px !important; }
        .sn-table-editor thead .control-cell { position: -webkit-sticky; position: sticky; left: 0; background-color: var(--sn-stylekit-editor-background-color, #f9f9f9) !important; }
        .sn-table-editor thead .control-cell:last-child { right: 0; left: auto; }
        .sn-table-editor .drag-handle { cursor: grab; color: var(--sn-stylekit-secondary-foreground-color, #888); padding: 0 8px; user-select: none; }
        .sn-table-editor .drag-handle:active { cursor: grabbing; }
        .sn-table-editor .dragging { opacity: 0.5; background: var(--sn-stylekit-secondary-background-color, #f0f0f0); }
        .sn-table-editor tr.drag-over-row { box-shadow: inset 0 2px var(--sn-stylekit-primary-color, #346df1); }
        .sn-table-editor th.drag-over-col { box-shadow: inset 2px 0 var(--sn-stylekit-primary-color, #346df1); }
        .col-header-content { display: flex; align-items: center; justify-content: center; }

        /* PREVIEW STYLES (Scoped) */
        ${SCOPED_PREVIEW_STYLES}
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

    // SVGアイコンを安全に生成するヘルパー関数
    function createIcon(pathData) {
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'currentColor');
        svg.appendChild(path);
        return svg;
    }

    // =========================================================================
    // ▼▼▼ タイトルからエディタへのフォーカス移動に関するロジック ▼▼▼
    // =========================================================================

    /**
     * ノートのタイトル入力欄を監視し、Enterキーでエディタにフォーカスを移すリスナーを設定する。
     * この関数はMutationObserverによって繰り返し呼ばれることを想定しており、
     * 冪等性（べきとうせい）を担保するため、既にリスナーが設定されていれば何もしない。
     */
    function setupTitleEnterListener() {
        // [BESTPRACTICE] 複数のセレクタ候補に対応し、UI変更に対する堅牢性を高める
        const titleSelector = 'textarea[aria-label*="Note title"], #note-title-editor';
        const titleInput = document.querySelector(titleSelector);

        // タイトル入力欄が存在し、かつ未処理の場合のみ実行
        if (titleInput && !titleInput.dataset.enterKeyHandlerAttached) {
            console.log('Markdown Editor: Attaching Enter key handler to title input.');
            titleInput.dataset.enterKeyHandlerAttached = 'true'; // 処理済みのマークを付ける

            // IME（日本語入力など）の変換状態を追跡するためのフラグ
            let isComposing = false;
            titleInput.addEventListener('compositionstart', () => { isComposing = true; });
            titleInput.addEventListener('compositionend', () => { isComposing = false; });

            titleInput.addEventListener('keydown', (e) => {
                // [IMPORTANT] IME変換確定のEnterキーを無視し、直接のEnterキー押下のみを捕捉する
                if (e.key === 'Enter' && !isComposing && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
                    // 本来の改行動作（もしあれば）をキャンセルする
                    e.preventDefault();

                    // エディタにフォーカスを移動するメインの関数を呼び出す
                    handleFocusToEditor();
                }
            });
        }
    }

    /**
     * エディタにフォーカスを移動し、カーソルを末尾に設定する。
     */
    function handleFocusToEditor() {
        console.log("Request received to focus custom editor.");
        if (activeEditorInstance) {
            const { textarea, switchMode } = activeEditorInstance;
            const currentMode = localStorage.getItem(STORAGE_KEY_MODE) || 'split';

            // プレビューモードの場合は、分割モードに切り替えてからフォーカスする
            if (currentMode === 'preview') {
                switchMode('split', true);
            } else {
                textarea.focus();
            }

            // [BESTPRACTICE] フォーカスとカーソル移動を確実に実行するため、次の描画サイクルに処理を遅延させる
            requestAnimationFrame(() => {
                const len = textarea.value.length;
                textarea.setSelectionRange(len, len);
                // 文末が表示されるようにスクロールも調整
                textarea.scrollTop = textarea.scrollHeight;
            });
        } else {
            console.warn("Could not focus editor: activeEditorInstance is not available.");
        }
    }

    // =========================================================================
    // ▲▲▲ ここまでがフォーカス移動関連ロジック ▲▲▲
    // =========================================================================

    function setupMarkdownEditor(originalTextarea, isNewNoteSetup = false) {
        if (!originalTextarea || !originalTextarea.parentElement) {
            console.warn('Markdown Editor: Setup aborted. Target textarea is not attached to the DOM.');
            return;
        }
        if (originalTextarea.dataset.markdownReady) return;
        originalTextarea.dataset.markdownReady = 'true';
        marked.setOptions({ gfm: true, breaks: true, smartLists: true, langPrefix: 'language-' });

        const definitionsRegex = new RegExp(`\\n*${DEFINITIONS_HEADER}[\\s\\S]*?${DEFINITIONS_FOOTER}`, 'g');

        const editorWrapper = originalTextarea.parentElement;
        editorWrapper.classList.add('sn-markdown-hidden', 'sn-markdown-full-height');

        const container = document.createElement('div');
        container.className = 'markdown-editor-container';
        const markdownTextarea = document.createElement('textarea');
        markdownTextarea.className = originalTextarea.className + ' custom-markdown-textarea';
        markdownTextarea.spellcheck = false;

        let definitionsText = '';

        const extractAndSetContent = (fullText) => {
            const match = fullText.match(definitionsRegex);
            if (match) {
                definitionsText = match.join('\n\n');
                markdownTextarea.value = fullText.replace(definitionsRegex, '').trimEnd();
            } else {
                definitionsText = '';
                markdownTextarea.value = fullText;
            }
        };

        const getFullContent = () => {
            const mainContent = markdownTextarea.value.trim();
            const defs = definitionsText.replace(DEFINITIONS_HEADER, '').replace(DEFINITIONS_FOOTER, '').trim();
            if (defs) {
                return `${mainContent}\n\n${DEFINITIONS_HEADER}\n${defs}\n${DEFINITIONS_FOOTER}`;
            }
            return mainContent;
        };

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
                        resolve(dataUrl);
                    };
                    img.onerror = () => reject(new Error('Failed to load image.'));
                    img.src = event.target.result;
                };
                reader.onerror = () => reject(new Error('Failed to read file.'));
                reader.readAsDataURL(file);
            });
        };

        function applyMarkdown(textarea, prefix, suffix = '', placeholder = '') {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            let selectedText = textarea.value.substring(start, end);
            const textBefore = textarea.value.substring(start - prefix.length, start);
            const textAfter = textarea.value.substring(end, end + suffix.length);
            if (textBefore === prefix && textAfter === suffix) {
                textarea.setRangeText(selectedText, start - prefix.length, end + suffix.length, 'select');
            } else if (selectedText.startsWith(prefix) && selectedText.endsWith(suffix)) {
                const unwrappedText = selectedText.slice(prefix.length, -suffix.length || undefined);
                textarea.setRangeText(unwrappedText, start, end, 'select');
            } else {
                if (selectedText) {
                    textarea.setRangeText(prefix + selectedText + suffix, start, end, 'select');
                } else {
                    textarea.setRangeText(prefix + placeholder + suffix, start, end, 'end');
                    if (placeholder) {
                        textarea.selectionStart = start + prefix.length;
                        textarea.selectionEnd = start + prefix.length + placeholder.length;
                    }
                }
            }
            textarea.focus();
            debouncedInputHandler();
        }

        const insertImageAsReference = (base64data, altText) => {
            const timestamp = new Date();
            const finalAltText = altText || `${T.pastedImageAltText} ${timestamp.toLocaleString(lang)}`;
            const refId = `image-ref-${timestamp.getTime()}`;
            const markdownImageRef = `![${finalAltText}][${refId}]`;
            applyMarkdown(markdownTextarea, markdownImageRef);
            const markdownImageDef = `[${refId}]: ${base64data}`;
            let currentDefs = definitionsText.replace(DEFINITIONS_HEADER, '').replace(DEFINITIONS_FOOTER, '').trim();
            currentDefs = (currentDefs ? currentDefs + '\n' : '') + markdownImageDef;
            definitionsText = `${DEFINITIONS_HEADER}\n${currentDefs}\n${DEFINITIONS_FOOTER}`;
            debouncedInputHandler();
        };

        const textToTable = (text) => {
            const rows = text.trim().split('\n').map(row => row.split('\t'));
            const colCount = Math.max(...rows.map(row => row.length));
            let markdown = `| ${rows[0].map(h => h || ' ').join(' | ')} |\n`;
            markdown += `|${' :--- |'.repeat(colCount)}\n`;
            for (let i = 1; i < rows.length; i++) {
                markdown += `| ${rows[i].map(c => c || ' ').join(' | ')} |\n`;
            }
            return markdown;
        };

        const handlePaste = async (event) => {
            const clipboardData = event.clipboardData;
            const imageItem = Array.from(clipboardData.items).find(item => item.type.startsWith('image/'));
            if (imageItem) {
                const file = imageItem.getAsFile();
                if (file) {
                    event.preventDefault();
                    try {
                        const resizedBase64 = await resizeAndEncodeImage(file);
                        insertImageAsReference(resizedBase64, null);
                    } catch (error) {
                        console.error("Image processing failed:", error);
                    }
                }
                return;
            }
            const text = clipboardData.getData('text/plain');
            if (text.includes('\t') && text.includes('\n')) {
                event.preventDefault();
                const tableMd = textToTable(text);
                document.execCommand('insertText', false, tableMd);
            }
        };

        const parseMarkdownTable = (text) => {
            if (!text || typeof text !== 'string' || !text.includes('|')) return null;
            const lines = text.trim().split('\n').map(l => l.trim()).filter(l => l.includes('|'));
            if (lines.length < 2) return null;
            const headerLine = lines[0];
            const separatorLine = lines[1];
            const dataLines = lines.slice(2);
            const parseRow = (rowString) => {
                const trimmed = rowString.trim();
                const content = (trimmed.startsWith('|') && trimmed.endsWith('|')) ? trimmed.slice(1, -1) : trimmed;
                return content.split('|').map(cell => cell.trim());
            };
            const separatorParts = parseRow(separatorLine);
            if (!separatorParts.every(part => /^:?-+:?$/.test(part))) return null;
            const header = parseRow(headerLine);
            const numCols = header.length;
            if (separatorParts.length !== numCols) return null;
            const alignments = separatorParts.map(part => {
                const left = part.startsWith(':');
                const right = part.endsWith(':');
                if (left && right) return 'center';
                if (right) return 'right';
                return 'left';
            });
            const rows = [header, ...dataLines.map(line => {
                const rowData = parseRow(line);
                while (rowData.length < numCols) rowData.push('');
                return rowData.slice(0, numCols);
            })];
            return { rows, alignments };
        };

        const openImageInserterModal = (onInsertCallback) => {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'sn-modal-overlay';
            modalOverlay.innerHTML = `<div class="sn-modal-content sn-modal-content-image"><div class="sn-modal-header"><h3>${T.insertImage}</h3><button class="sn-modal-close" title="${T.close}">&times;</button></div><div class="sn-modal-body"><div class="sn-modal-tabs"><div class="sn-modal-tab active" data-tab="url">${T.fromURL}</div><div class="sn-modal-tab" data-tab="upload">${T.uploadFile}</div></div><div class="sn-modal-tab-content active" data-tab-content="url"><div class="sn-modal-form-group"><label for="sn-image-url">${T.imageURL}</label><input type="text" id="sn-image-url" class="sn-modal-input" placeholder="https://example.com/image.jpg"></div></div><div class="sn-modal-tab-content" data-tab-content="upload"><div class="sn-modal-form-group"><label class="sn-modal-file-wrapper"><span class="sn-modal-file-label">${T.chooseFile}</span><input type="file" class="sn-modal-file-input" accept="image/*"></label><div class="sn-modal-processing-indicator"></div></div></div><div class="sn-modal-form-group"><label for="sn-image-alt">${T.altText}</label><input type="text" id="sn-image-alt" class="sn-modal-input" placeholder="A description of the image"></div></div><div class="sn-modal-footer"><button class="sn-modal-insert-btn">${T.insert}</button></div></div>`;
            document.body.appendChild(modalOverlay);
            const content = modalOverlay.querySelector('.sn-modal-content');
            const urlInput = modalOverlay.querySelector('#sn-image-url');
            const altInput = modalOverlay.querySelector('#sn-image-alt');
            const fileInput = modalOverlay.querySelector('.sn-modal-file-input');
            const fileLabel = modalOverlay.querySelector('.sn-modal-file-label');
            const processingIndicator = modalOverlay.querySelector('.sn-modal-processing-indicator');
            const insertBtn = modalOverlay.querySelector('.sn-modal-insert-btn');
            const closeModal = () => document.body.contains(modalOverlay) && document.body.removeChild(modalOverlay);
            let base64data = null;
            let currentTab = 'url';
            modalOverlay.querySelectorAll('.sn-modal-tab').forEach(tab => {
                tab.onclick = () => {
                    currentTab = tab.dataset.tab;
                    modalOverlay.querySelectorAll('.sn-modal-tab').forEach(t => t.classList.remove('active'));
                    modalOverlay.querySelectorAll('.sn-modal-tab-content').forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    modalOverlay.querySelector(`.sn-modal-tab-content[data-tab-content="${currentTab}"]`).classList.add('active');
                    base64data = null; fileInput.value = ''; fileLabel.textContent = T.chooseFile; processingIndicator.innerHTML = '';
                };
            });
            fileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                fileLabel.textContent = file.name;
                processingIndicator.innerHTML = `<span>${T.processing}</span>`;
                insertBtn.disabled = true;
                try {
                    base64data = await resizeAndEncodeImage(file);
                    processingIndicator.innerHTML = '';
                    const imgPreview = document.createElement('img');
                    imgPreview.src = base64data;
                    imgPreview.className = 'sn-modal-image-preview';
                    processingIndicator.appendChild(imgPreview);
                } catch (error) {
                    console.error(error);
                    processingIndicator.innerHTML = `<span>${T.errorImageProcessing}</span>`;
                    base64data = null;
                } finally {
                    insertBtn.disabled = false;
                }
            };
            insertBtn.onclick = () => {
                const altText = altInput.value.trim();
                if (currentTab === 'url') {
                    const url = urlInput.value.trim();
                    if (url) { onInsertCallback(url, altText, false); closeModal(); }
                } else {
                    if (base64data) { onInsertCallback(base64data, altText, true); closeModal(); }
                }
            };
            modalOverlay.querySelector('.sn-modal-close').onclick = closeModal;
            content.onclick = e => e.stopPropagation();
            modalOverlay.onclick = closeModal;
            urlInput.focus();
        };

        const openTableEditorModal = (initialData, onInsertCallback) => {
            let tableData;
            if (initialData && initialData.rows.length > 0) { tableData = JSON.parse(JSON.stringify(initialData)); }
            else { tableData = { rows: [['', ''], ['', '']], alignments: ['left', 'left'] }; }
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'sn-modal-overlay';
            const render = () => {
                const colCount = tableData.rows[0]?.length || 0;
                const rowCount = tableData.rows.length;
                let headerHtml = '';
                for (let c = 0; c < colCount; c++) {
                    const align = tableData.alignments[c];
                    let alignIcon;
                    switch (align) { case 'center': alignIcon = '⇌'; break; case 'right': alignIcon = '→'; break; default: alignIcon = '←'; }
                    headerHtml += `<th data-col="${c}"><div class="col-header-content" draggable="true"><span class="drag-handle">⁙</span><div class="col-header" title="${T.alignLeft}/${T.alignCenter}/${T.alignRight}"><span class="align-icon">${alignIcon}</span></div></div><div class="delete-btn delete-col-btn" title="${T.deleteCol}">🗑️</div></th>`;
                }
                let bodyHtml = '';
                for (let r = 0; r < rowCount; r++) {
                    bodyHtml += `<tr data-row="${r}"><td class="control-cell"><span class="drag-handle" draggable="true">⁙</span><div class="delete-btn delete-row-btn" title="${T.deleteRow}">🗑️</div></td>`;
                    for (let c = 0; c < colCount; c++) {
                        const cellValue = tableData.rows[r][c] || '';
                        const placeholder = r === 0 ? 'Header' : 'Cell';
                        bodyHtml += `<td><input class="cell-input" type="text" value="${cellValue.replace(/"/g, '&quot;')}" placeholder="${placeholder}" data-row="${r}" data-col="${c}"></td>`;
                    }
                    bodyHtml += `<td class="control-cell"></td></tr>`;
                }
                const tableHtml = `<table class="sn-table-editor"><thead><tr><th class="control-cell"></th>${headerHtml}<th class="control-cell"><div class="add-btn add-col-btn" title="${T.addCol}">+</div></th></tr></thead><tbody>${bodyHtml}<tr><td class="control-cell"></td><td colspan="${colCount}" class="control-cell"><div class="add-btn add-row-btn" title="${T.addRow}">+</div></td><td class="control-cell"></td></tr></tbody></table>`;
                modalOverlay.innerHTML = `<div class="sn-modal-content sn-modal-content-table"><div class="sn-modal-header"><h3>${T.tableEditor}</h3><button class="sn-modal-close" title="${T.close}">&times;</button></div><div class="sn-modal-body"><div class="sn-table-editor-container"><div class="sn-table-scroll-container">${tableHtml}</div></div></div><div class="sn-modal-footer"><button class="sn-modal-insert-btn">${T.insert}</button></div></div>`;
                attachEventListeners();
            };
            const attachEventListeners = () => {
                const content = modalOverlay.querySelector('.sn-modal-content');
                const closeModal = () => document.body.contains(modalOverlay) && document.body.removeChild(modalOverlay);
                let draggedItem = null;
                modalOverlay.querySelector('.sn-modal-close').onclick = closeModal;
                content.onclick = e => e.stopPropagation();
                modalOverlay.onclick = closeModal;
                modalOverlay.querySelector('.sn-modal-insert-btn').onclick = () => {
                    let markdown = '';
                    const colCount = tableData.rows[0]?.length || 0;
                    if (colCount > 0 && tableData.rows.some(row => row.some(cell => cell.trim() !== ''))) {
                        markdown += '| ' + tableData.rows[0].map(c => c.trim() || ' ').join(' | ') + ' |\n';
                        markdown += '|' + tableData.alignments.map(a => { if (a === 'center') return ' :---: '; if (a === 'right') return ' ---: '; return ' :--- '; }).join('|') + '|\n';
                        for (let i = 1; i < tableData.rows.length; i++) { markdown += '| ' + tableData.rows[i].map(c => c.trim() || ' ').join(' | ') + ' |\n'; }
                    }
                    onInsertCallback(markdown); closeModal();
                };
                modalOverlay.querySelector('.add-row-btn').onclick = () => {
                    if (tableData.rows.length === 0) { tableData.rows.push(['']); tableData.alignments = ['left']; }
                    else { tableData.rows.push(new Array(tableData.rows[0]?.length || 1).fill('')); }
                    render();
                };
                modalOverlay.querySelector('.add-col-btn').onclick = () => {
                    if (tableData.rows.length === 0) { tableData.rows.push(['']); tableData.alignments = ['left']; }
                    else { tableData.rows.forEach(row => row.push('')); tableData.alignments.push('left'); }
                    render();
                };
                modalOverlay.querySelectorAll('.delete-row-btn').forEach(btn => { btn.onclick = e => { const row = parseInt(e.target.closest('tr').dataset.row, 10); if (tableData.rows.length > 1) { tableData.rows.splice(row, 1); render(); } }; });
                modalOverlay.querySelectorAll('.delete-col-btn').forEach(btn => { btn.onclick = e => { const col = parseInt(e.target.closest('th').dataset.col, 10); if (tableData.rows[0].length > 1) { tableData.rows.forEach(row => row.splice(col, 1)); tableData.alignments.splice(col, 1); render(); } }; });
                modalOverlay.querySelectorAll('.col-header').forEach(header => { header.onclick = e => { const col = parseInt(e.currentTarget.closest('th').dataset.col, 10); const aligns = ['left', 'center', 'right']; tableData.alignments[col] = aligns[(aligns.indexOf(tableData.alignments[col]) + 1) % aligns.length]; render(); }; });
                modalOverlay.querySelectorAll('.cell-input').forEach(input => {
                    input.oninput = e => { const { row, col } = e.target.dataset; tableData.rows[row][col] = e.target.value; };
                    input.onkeydown = e => {
                        const { row, col } = e.target.dataset; const r = parseInt(row, 10); const c = parseInt(col, 10); let nextCell = null;
                        if (e.key === 'Enter' || e.key === 'ArrowDown') { e.preventDefault(); nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r + 1}"][data-col="${c}"]`); }
                        else if (e.key === 'ArrowUp') { e.preventDefault(); nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r - 1}"][data-col="${c}"]`); }
                        else if (e.key === 'Tab') { e.preventDefault(); if (e.shiftKey) { nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r}"][data-col="${c - 1}"]`) || modalOverlay.querySelector(`.cell-input[data-row="${r - 1}"][data-col="${(tableData.rows[0]?.length || 1) - 1}"]`); } else { nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r}"][data-col="${c + 1}"]`) || modalOverlay.querySelector(`.cell-input[data-row="${r + 1}"][data-col="0"]`); } }
                        if (nextCell) { nextCell.focus(); }
                    };
                });
                modalOverlay.querySelectorAll('tbody tr .drag-handle[draggable="true"]').forEach(handle => {
                    const row = handle.closest('tr');
                    handle.addEventListener('dragstart', (e) => { e.stopPropagation(); draggedItem = row; const rowIndex = parseInt(draggedItem.dataset.row, 10); e.dataTransfer.setData('text/plain', rowIndex); e.dataTransfer.effectAllowed = 'move'; setTimeout(() => draggedItem.classList.add('dragging'), 0); });
                    handle.addEventListener('dragend', () => { draggedItem?.classList.remove('dragging'); modalOverlay.querySelectorAll('.drag-over-row').forEach(el => el.classList.remove('drag-over-row')); draggedItem = null; });
                });
                modalOverlay.querySelectorAll('tbody tr').forEach(row => {
                    row.addEventListener('dragover', (e) => { e.preventDefault(); const targetRow = e.currentTarget; if (targetRow && targetRow !== draggedItem) { modalOverlay.querySelectorAll('.drag-over-row').forEach(el => el.classList.remove('drag-over-row')); targetRow.classList.add('drag-over-row'); } });
                    row.addEventListener('dragleave', (e) => { e.currentTarget.classList.remove('drag-over-row'); });
                    row.addEventListener('drop', (e) => { e.preventDefault(); const targetRow = e.currentTarget; targetRow.classList.remove('drag-over-row'); if (!targetRow || targetRow === draggedItem) return; const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10); const targetIndex = parseInt(targetRow.dataset.row, 10); const [removedRowData] = tableData.rows.splice(sourceIndex, 1); tableData.rows.splice(targetIndex, 0, removedRowData); render(); });
                });
                modalOverlay.querySelectorAll('th .col-header-content[draggable="true"]').forEach(handle => {
                    const headerCell = handle.closest('th');
                    handle.addEventListener('dragstart', (e) => { e.stopPropagation(); draggedItem = headerCell; const colIndex = parseInt(draggedItem.dataset.col, 10); e.dataTransfer.setData('text/plain', colIndex); e.dataTransfer.effectAllowed = 'move'; setTimeout(() => draggedItem.classList.add('dragging'), 0); });
                    handle.addEventListener('dragend', (e) => { e.stopPropagation(); draggedItem?.classList.remove('dragging'); modalOverlay.querySelectorAll('.drag-over-col').forEach(el => el.classList.remove('drag-over-col')); draggedItem = null; });
                });
                modalOverlay.querySelectorAll('thead th[data-col]').forEach(headerCell => {
                    headerCell.addEventListener('dragover', (e) => { e.preventDefault(); const targetCol = e.target.closest('th[data-col]'); if (targetCol && targetCol !== draggedItem) { modalOverlay.querySelectorAll('.drag-over-col').forEach(el => el.classList.remove('drag-over-col')); targetCol.classList.add('drag-over-col'); } });
                    headerCell.addEventListener('dragleave', (e) => { e.target.closest('th[data-col]')?.classList.remove('drag-over-col'); });
                    headerCell.addEventListener('drop', (e) => { e.preventDefault(); e.stopPropagation(); const targetCol = e.target.closest('th[data-col]'); if (!targetCol || targetCol === draggedItem) return; const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10); const targetIndex = parseInt(targetCol.dataset.col, 10); const [removedAlign] = tableData.alignments.splice(sourceIndex, 1); tableData.alignments.splice(targetIndex, 0, removedAlign); tableData.rows.forEach(row => { const [removedCell] = row.splice(sourceIndex, 1); row.splice(targetIndex, 0, removedCell); }); render(); });
                });
            };
            document.body.appendChild(modalOverlay);
            render();
            modalOverlay.querySelector('.cell-input')?.focus();
        };

        const modeBar = document.createElement('div');
        modeBar.className = 'mode-toggle-bar';
        const editorButton = document.createElement('button'); editorButton.className = 'mode-toggle-button'; editorButton.textContent = T.editor;
        const splitButton = document.createElement('button'); splitButton.className = 'mode-toggle-button'; splitButton.textContent = T.split;
        const previewButton = document.createElement('button'); previewButton.className = 'mode-toggle-button'; previewButton.textContent = T.preview;
        const toolbarToggleButton = document.createElement('button');
        toolbarToggleButton.className = 'mode-toggle-button toolbar-toggle-button';
        toolbarToggleButton.title = T.toggleToolbar;
        toolbarToggleButton.appendChild(createIcon('M3 18h18v-2H3v2z m0-5h18v-2H3v2z m0-7v2h18V6H3z'));

        const printButton = document.createElement('button'); printButton.className = 'mode-toggle-button pdf-export-button'; printButton.textContent = T.printPDF; printButton.title = T.exportPDF;
        const toolbar = document.createElement('div');
        toolbar.className = 'markdown-toolbar';

        const previewContainer = document.createElement('div');
        previewContainer.className = PREVIEW_CONTAINER_CLASS;

        markdownTextarea.addEventListener('paste', handlePaste);

        // SVGを安全なパスデータとして定義
        const toolbarButtons = [
            { type: 'select', name: 'heading', options: [{ value: 'p', text: T.paragraph }, { value: 'h1', text: T.heading1 }, { value: 'h2', text: T.heading2 }, { value: 'h3', text: T.heading3 }, { value: 'h4', text: T.heading4 }], action: (prefix) => { const start = markdownTextarea.selectionStart; let lineStart = markdownTextarea.value.lastIndexOf('\n', start - 1) + 1; let lineEnd = markdownTextarea.value.indexOf('\n', start); if (lineEnd === -1) lineEnd = markdownTextarea.value.length; const originalLine = markdownTextarea.value.substring(lineStart, lineEnd); const cleanedLine = originalLine.replace(/^\s*#+\s*/, ''); const newText = prefix ? `${prefix} ${cleanedLine}` : cleanedLine; markdownTextarea.setRangeText(newText, lineStart, lineEnd, 'end'); debouncedInputHandler(); markdownTextarea.focus(); } },
            { type: 'button', name: 'B', title: T.bold, action: () => applyMarkdown(markdownTextarea, '**', '**', T.boldPlaceholder) },
            { type: 'button', name: 'I', title: T.italic, action: () => applyMarkdown(markdownTextarea, '*', '*', T.italicPlaceholder) },
            { type: 'button', name: 'S', title: T.strikethrough, action: () => applyMarkdown(markdownTextarea, '~~', '~~', T.strikethroughPlaceholder) },
            { type: 'button', name: '`', title: T.inlineCode, action: () => applyMarkdown(markdownTextarea, '`', '`', T.codePlaceholder) },
            { type: 'button', name: '“ ”', title: T.quote, action: () => applyMarkdown(markdownTextarea, '> ', '', T.quotePlaceholder) },
            { type: 'button', name: '•', title: T.list, action: () => applyMarkdown(markdownTextarea, '- ', '', T.listItemPlaceholder) },
            { type: 'button', name: '1.', title: T.numberedList, action: () => applyMarkdown(markdownTextarea, '1. ', '', T.listItemPlaceholder) },
            { type: 'button', name: '☑', title: T.checklist, action: () => applyMarkdown(markdownTextarea, '- [ ] ', '', T.taskPlaceholder) },
            { type: 'button', name: '</>', title: T.codeBlock, action: () => applyMarkdown(markdownTextarea, '```\n', '\n```', T.codePlaceholder) },
            { type: 'icon', title: T.image, path: 'M21 19V5 c 0 -1.1 -0.9 -2 -2 -2 H5 c -1.1 0 -2 0.9 -2 2 v14 c 0 1.1 0.9 2 2 2 h14 c 1.1 0 2 -0.9 2 -2 z M8.5 13.5 l 2.5 3.01 L14.5 12 l 4.5 6 H5 l 3.5 -4.5 z', action: () => { openImageInserterModal((data, altText, isReference) => { if (isReference) { insertImageAsReference(data, altText); } else { const markdown = `![${altText}](${data})`; applyMarkdown(markdownTextarea, markdown); } }); } },
            { type: 'icon', title: T.link, path: 'M3.9 12 c 0 -1.71 1.39 -3.1 3.1 -3.1 h4 V7 H7 c -2.76 0 -5 2.24 -5 5 s2.24 5 5 5 h4 v-1.9 H7 c -1.71 0 -3.1 -1.39 -3.1 -3.1 z M8 13 h8 v-2 H8 v2 z m9 -6 h-4 v1.9 h4 c 1.71 0 3.1 1.39 3.1 3.1 s -1.39 3.1 -3.1 3.1 h-4 V17 h4 c 2.76 0 -5 -2.24 -5 -5 s -2.24 -5 -5 -5 z', action: () => { const url = prompt(T.linkPrompt, 'https://'); if (url) applyMarkdown(markdownTextarea, '[', `](${url})`, T.linkTextPlaceholder); } },
            { type: 'icon', title: T.insertTable, path: 'M20 4 H4 c -1.1 0 -2 0.9 -2 2 v12 c 0 1.1 0.9 2 2 2 h16 c 1.1 0 2 -0.9 2 -2 V6 c 0 -1.1 -0.9 -2 -2 -2 z M8 10 H4 V6 h4 v4 z m6 0 h-4 V6 h4 v4 z m6 0 h-4 V6 h4 v4 z M8 14 H4 v4 h4 v-4 z m6 0 h-4 v4 h4 v-4 z m6 0 h-4 v4 h4 v-4 z', action: () => { const start = markdownTextarea.selectionStart; const end = markdownTextarea.selectionEnd; const selectedText = markdownTextarea.value.substring(start, end); const existingTableData = parseMarkdownTable(selectedText); openTableEditorModal(existingTableData, (markdown) => { markdownTextarea.setRangeText(markdown, start, end, 'select'); markdownTextarea.focus(); debouncedInputHandler(); }); } },
            { type: 'button', name: '―', title: T.horizontalRule, action: () => applyMarkdown(markdownTextarea, '\n---\n') },
        ];

        toolbarButtons.forEach(item => {
            if (item.type === 'select') {
                const select = document.createElement('select');
                select.className = 'toolbar-select heading-select';
                item.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.text;
                    select.appendChild(option);
                });
                select.onchange = (e) => {
                    let prefix = '';
                    switch (e.target.value) {
                        case 'h1': prefix = '#'; break;
                        case 'h2': prefix = '##'; break;
                        case 'h3': prefix = '###'; break;
                        case 'h4': prefix = '####'; break;
                    }
                    item.action(prefix);
                    updateHeadingSelector();
                };
                toolbar.appendChild(select);
            } else {
                const button = document.createElement('button');
                button.className = 'toolbar-button';
                button.title = item.title;
                button.onclick = item.action;
                if (item.type === 'icon') {
                    button.classList.add('icon-button');
                    button.appendChild(createIcon(item.path));
                } else {
                    button.textContent = item.name;
                }
                toolbar.appendChild(button);
            }
        });

        const headingSelect = toolbar.querySelector('.heading-select');
        const updateHeadingSelector = () => {
            if (!headingSelect) return;
            const pos = markdownTextarea.selectionStart; const text = markdownTextarea.value;
            const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
            let lineEnd = text.indexOf('\n', lineStart);
            if (lineEnd === -1) { lineEnd = text.length; }
            const line = text.substring(lineStart, lineEnd);
            let headingLevel = 'p';
            if (line.startsWith('#### ')) { headingLevel = 'h4'; } else if (line.startsWith('### ')) { headingLevel = 'h3'; } else if (line.startsWith('## ')) { headingLevel = 'h2'; } else if (line.startsWith('# ')) { headingLevel = 'h1'; }
            if (headingSelect.value !== headingLevel) { headingSelect.value = headingLevel; }
        };
        const debouncedUpdateHeadingSelector = debounce(updateHeadingSelector, 150);
        markdownTextarea.addEventListener('keyup', debouncedUpdateHeadingSelector);
        markdownTextarea.addEventListener('click', debouncedUpdateHeadingSelector);
        markdownTextarea.addEventListener('focus', debouncedUpdateHeadingSelector);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'editor-preview-wrapper';
        contentWrapper.append(markdownTextarea, previewContainer);
        modeBar.append(editorButton, splitButton, previewButton, toolbarToggleButton, printButton);
        container.append(modeBar, toolbar, contentWrapper);
        editorWrapper.after(container);

        const updatePreview = () => {
            try {
                const mainContent = markdownTextarea.value;
                const unwrappedDefs = definitionsText.replace(DEFINITIONS_HEADER, '').replace(DEFINITIONS_FOOTER, '').trim();
                const contentForPreview = `${mainContent}\n\n${unwrappedDefs}`;
                const dirtyHtml = marked.parse(contentForPreview);
                const sanitizedHtml = DOMPurify.sanitize(dirtyHtml, { USE_PROFILES: { html: true }, ADD_ATTR: ['class', 'type', 'disabled', 'checked', 'data-task-index', 'data-processed', 'data-explicit-lang'], ADD_TAGS: ['span', 'input'], });
                previewContainer.innerHTML = sanitizedHtml;

                previewContainer.querySelectorAll('pre > code[class*="language-"]').forEach(codeEl => {
                    const langMatch = Array.from(codeEl.classList).find(cls => cls.startsWith('language-'));
                    if (langMatch) { const lang = langMatch.replace('language-', ''); if (lang) { codeEl.parentElement.dataset.explicitLang = lang; } }
                });
                previewContainer.querySelectorAll('pre code').forEach(hljs.highlightElement);
                previewContainer.querySelectorAll('pre').forEach(preEl => {
                    if (preEl.dataset.processed) return;
                    preEl.dataset.processed = 'true';
                    const codeEl = preEl.querySelector('code');
                    if (!codeEl) return;
                    const langLabel = document.createElement('div'); langLabel.className = 'code-language-label'; langLabel.textContent = preEl.dataset.explicitLang || 'code'; preEl.appendChild(langLabel);
                    const copyButton = document.createElement('button'); copyButton.className = 'copy-code-button'; copyButton.textContent = T.copy; copyButton.setAttribute('aria-label', T.copyAriaLabel); preEl.appendChild(copyButton);
                    copyButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(codeEl.innerText).then(() => {
                            copyButton.textContent = T.copied; copyButton.classList.add('copied');
                            setTimeout(() => { copyButton.textContent = T.copy; copyButton.classList.remove('copied'); }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy code block.', err); copyButton.textContent = T.copyError;
                            setTimeout(() => { copyButton.textContent = T.copy; }, 2000);
                        });
                    });
                });

                previewContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
                    const listItem = checkbox.closest('li');
                    if (listItem) {
                        listItem.classList.add('task-list-item');
                        if (checkbox.checked) {
                            listItem.classList.add('completed');
                        }
                        checkbox.addEventListener('click', (e) => {
                            e.preventDefault();
                            handlePreviewChecklistToggle(index);
                        });
                    }
                });
            } catch (e) {
                console.error("Error updating preview:", e);
                previewContainer.innerHTML = `<div class="preview-error"><strong>${T.previewErrorTitle}</strong><br><pre>${e.stack || e}</pre></div>`;
            }
        };

        const debouncedUpdatePreview = debounce(updatePreview, 250);

        const handlePreviewChecklistToggle = (toggledIndex) => {
            const text = markdownTextarea.value;
            const regex = /^\s*(?:-|\*|\d+\.)\s+\[( |x)\]/gm;
            let currentIndex = 0;
            const newText = text.replace(regex, (original) => {
                if (currentIndex === toggledIndex) {
                    currentIndex++;
                    return original.includes('[ ]') ? original.replace('[ ]', '[x]') : original.replace('[x]', '[ ]');
                }
                currentIndex++;
                return original;
            });
            if (markdownTextarea.value !== newText) {
                const cursorPos = markdownTextarea.selectionStart;
                markdownTextarea.value = newText;
                markdownTextarea.selectionStart = markdownTextarea.selectionEnd = cursorPos;
                debouncedInputHandler();
            }
        };

        let mouseDownTime = 0;
        let mouseDownPos = { x: 0, y: 0 };
        markdownTextarea.addEventListener('mousedown', (e) => { mouseDownTime = Date.now(); mouseDownPos = { x: e.clientX, y: e.clientY }; });
        const handleEditorClick = (e) => {
            const textarea = e.target;
            const mouseUpTime = Date.now();
            const distance = Math.sqrt(Math.pow(e.clientX - mouseDownPos.x, 2) + Math.pow(e.clientY - mouseDownPos.y, 2));
            if (mouseUpTime - mouseDownTime > 250 || distance > 5 || textarea.selectionStart !== textarea.selectionEnd) { return; }
            const pos = textarea.selectionStart;
            const text = textarea.value;
            const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
            const lineEnd = text.indexOf('\n', pos);
            const effectiveLineEnd = lineEnd === -1 ? text.length : lineEnd;
            const line = text.substring(lineStart, effectiveLineEnd);
            const checklistRegex = /^(\s*)(?:-|\*|\d+\.)\s\[( |x)\]/;
            const match = line.match(checklistRegex);
            if (match && pos - lineStart <= match[0].length) {
                e.preventDefault();
                const replacement = line.includes('[ ]') ? '[x]' : '[ ]';
                const newLine = line.replace(/\[( |x)\]/, replacement);
                markdownTextarea.value = text.substring(0, lineStart) + newLine + text.substring(effectiveLineEnd);
                textarea.selectionStart = textarea.selectionEnd = pos;
                debouncedInputHandler();
            }
        };
        markdownTextarea.addEventListener('click', handleEditorClick);

        const handleEnterKey = (e) => {
            const textarea = e.target;
            const pos = textarea.selectionStart;
            const text = textarea.value;
            const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
            const line = text.substring(lineStart, pos);
            const listRegex = /^(\s*)((?:-|\*|\d+\.)\s(?:\[[ x]\]\s)?)(\s*.*)/;
            const match = line.match(listRegex);
            if (match) {
                const content = match[3];
                if (!content.trim()) {
                    e.preventDefault();
                    textarea.setRangeText('', lineStart, pos, 'end');
                    debouncedInputHandler();
                    return;
                }
                e.preventDefault();
                const indent = match[1];
                let listMarker = match[2];
                const numberedMatch = listMarker.match(/^(\d+)\.\s/);
                if (numberedMatch) { listMarker = `${parseInt(numberedMatch[1], 10) + 1}. `; }
                else if (listMarker.includes('[x]')) { listMarker = listMarker.replace('[x]', '[ ]'); }
                textarea.setRangeText(`\n${indent}${listMarker}`, pos, pos, 'end');
                debouncedInputHandler();
            }
        };
        markdownTextarea.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.metaKey) { handleEnterKey(e); } });

        const cleanupOrphanedImageRefs = () => {
            const contentValue = markdownTextarea.value;
            const usedRefs = new Set();
            const referenceRegex = /!\[.*?\]\[(image-ref-\d+)\]/g;
            let match;
            while ((match = referenceRegex.exec(contentValue)) !== null) { usedRefs.add(match[1]); }
            const currentDefsContent = definitionsText.replace(DEFINITIONS_HEADER, '').replace(DEFINITIONS_FOOTER, '').trim();
            if (!currentDefsContent) return false;
            const defLines = currentDefsContent.split('\n');
            const keptDefLines = defLines.filter(line => {
                const defMatch = line.match(/^\[(image-ref-\d+)\]:/);
                return defMatch && usedRefs.has(defMatch[1]);
            });
            const newDefsContent = keptDefLines.join('\n');
            if (newDefsContent !== currentDefsContent) {
                if (newDefsContent) { definitionsText = `${DEFINITIONS_HEADER}\n${newDefsContent}\n${DEFINITIONS_FOOTER}`; }
                else { definitionsText = ''; }
                return true;
            }
            return false;
        };

        const handleInput = () => {
            cleanupOrphanedImageRefs();
            isInternallyUpdating = true;
            // 直接 .value を設定するだけではReactなどのフレームワークに無視されることがある。
            // ネイティブセッターを呼び出した上でinputイベントを発火させることで、確実な同期を実現する。
            nativeTextareaSetter.call(originalTextarea, getFullContent());

            if (!document.hidden) {
                originalTextarea.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            }
            if (container.classList.contains('mode-split') || container.classList.contains('mode-preview')) {
                debouncedUpdatePreview();
            }
            requestAnimationFrame(() => { isInternallyUpdating = false; });
        };
        debouncedInputHandler = debounce(handleInput, 300);
        markdownTextarea.addEventListener('input', debouncedInputHandler);

        const observer = new MutationObserver(() => {
            if (isInternallyUpdating) { return; }
            console.log('Markdown Editor: External change detected. Syncing to custom editor.');
            isInternallyUpdating = true;
            extractAndSetContent(originalTextarea.value);
            if (container.classList.contains('mode-split') || container.classList.contains('mode-preview')) {
                updatePreview();
            }
            requestAnimationFrame(() => { isInternallyUpdating = false; });
        });
        observer.observe(originalTextarea, { attributes: true, childList: true, subtree: true, characterData: true });

        let scrollRequest;
        const handleScroll = (source, target) => {
            if (source.isSyncing) { source.isSyncing = false; return; }
            cancelAnimationFrame(scrollRequest);
            scrollRequest = requestAnimationFrame(() => {
                const sourceScrollableDist = source.scrollHeight - source.clientHeight;
                if (sourceScrollableDist <= 0) return;
                const scrollRatio = source.scrollTop / sourceScrollableDist;
                const targetScrollableDist = target.scrollHeight - target.clientHeight;
                target.isSyncing = true;
                target.scrollTop = scrollRatio * targetScrollableDist;
            });
        };
        const onEditorScroll = () => handleScroll(markdownTextarea, previewContainer);
        const onPreviewScroll = () => handleScroll(previewContainer, markdownTextarea);

        const modeButtons = { editor: editorButton, split: splitButton, preview: previewButton };
        const switchMode = (mode, shouldFocus = true) => {
            container.classList.remove('mode-editor', 'mode-split', 'mode-preview');
            container.classList.add(`mode-${mode}`);
            Object.values(modeButtons).forEach(btn => btn.classList.remove('active'));
            modeButtons[mode].classList.add('active');
            localStorage.setItem(STORAGE_KEY_MODE, mode);
            markdownTextarea.removeEventListener('scroll', onEditorScroll);
            previewContainer.removeEventListener('scroll', onPreviewScroll);
            if (mode === 'split') {
                markdownTextarea.addEventListener('scroll', onEditorScroll, { passive: true });
                previewContainer.addEventListener('scroll', onPreviewScroll, { passive: true });
            }
            if (mode === 'preview' || mode === 'split') { updatePreview(); }
            if (shouldFocus && mode !== 'preview') { markdownTextarea.focus(); }
            updateHeadingSelector();
        };

        editorButton.addEventListener('click', () => switchMode('editor'));
        splitButton.addEventListener('click', () => switchMode('split'));
        previewButton.addEventListener('click', () => switchMode('preview'));
        const toggleToolbar = (visible) => {
            container.classList.toggle('toolbar-hidden', !visible);
            toolbarToggleButton.classList.toggle('active', visible);
            localStorage.setItem(STORAGE_KEY_TOOLBAR_VISIBLE, visible);
        };
        toolbarToggleButton.addEventListener('click', () => {
            const isVisible = container.classList.contains('toolbar-hidden');
            toggleToolbar(isVisible);
        });

        const handlePrint = () => {
            const printContainer = document.createElement('div');
            printContainer.className = 'print-container';
            if (container.classList.contains('mode-editor')) {
                const pre = document.createElement('pre');
                pre.className = 'raw-text-print';
                pre.textContent = markdownTextarea.value;
                printContainer.appendChild(pre);
            } else {
                const printContent = document.createElement('div');
                printContent.className = 'print-content';
                const printStyle = document.createElement('style');
                printStyle.textContent = SCOPED_PREVIEW_STYLES.replace(new RegExp(`\\.${PREVIEW_CONTAINER_CLASS}`, 'g'), '');
                printContent.innerHTML = previewContainer.innerHTML;
                printContainer.append(printStyle, printContent);
            }
            document.body.appendChild(printContainer);
            window.print();
            document.body.removeChild(printContainer);
        };
        printButton.addEventListener('click', handlePrint);

        // --- 初期化 ---
        extractAndSetContent(originalTextarea.value);
        const initialToolbarVisible = localStorage.getItem(STORAGE_KEY_TOOLBAR_VISIBLE) !== 'false';
        toggleToolbar(initialToolbarVisible);
        const savedMode = localStorage.getItem(STORAGE_KEY_MODE);

        activeEditorInstance = { textarea: markdownTextarea, switchMode: switchMode };

        switchMode(savedMode || 'split', isNewNoteSetup);
        console.log(`Markdown Editor for Standard Notes (v${GM_info.script.version}, Robust Edition) has been initialized.`);
        if (isNewNoteSetup) { console.log('New note detected, focusing editor.'); }
    }

    function initiateEditorSetup(editor, attempts = 0) {
        const MAX_ATTEMPTS = 40;
        const RETRY_INTERVAL = 50;
        if (!editor.isConnected) {
            console.log('Markdown Editor: Polling stopped. Editor was detached from DOM during initialization.');
            return;
        }
        if (editor.value || attempts > 5) {
            const isNewNote = !editor.value && attempts > 5;
            setupMarkdownEditor(editor, isNewNote);
        } else if (attempts < MAX_ATTEMPTS) {
            setTimeout(() => initiateEditorSetup(editor, attempts + 1), RETRY_INTERVAL);
        } else {
            console.warn(`Editor content loading timed out. Forcing setup with empty state.`);
            setupMarkdownEditor(editor, true);
        }
    }

    const mainObserver = new MutationObserver((mutations) => {
        let editorNeedsSetup = false;
        let editorInstance = null;

        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (const node of mutation.addedNodes) {
                    if (node.nodeType !== Node.ELEMENT_NODE) continue;
                    const editor = node.matches('#note-text-editor') ? node : node.querySelector('#note-text-editor');
                    if (editor && !editor.dataset.markdownReady) {
                        editorNeedsSetup = true;
                        editorInstance = editor;
                        break;
                    }
                }
            }
            if (editorNeedsSetup) break;
        }

        if (editorNeedsSetup) {
            const oldCustomEditor = document.querySelector('.markdown-editor-container');
            if (oldCustomEditor) oldCustomEditor.remove();
            initiateEditorSetup(editorInstance);
        }

        // [IMPORTANT] UIが更新されるたびに、タイトル欄の監視を試みる
        // これにより、ノート切り替え時にもリスナーが正しく設定される
        setupTitleEnterListener();

        // エディタがDOMから削除された場合のクリーンアップ処理
        const customEditor = document.querySelector('.markdown-editor-container');
        if (customEditor && !document.querySelector('#note-text-editor')) {
            customEditor.remove();
            activeEditorInstance = null;
            const hiddenWrapper = document.querySelector('#editor-content.sn-markdown-hidden');
            if (hiddenWrapper) {
                hiddenWrapper.classList.remove('sn-markdown-hidden');
            }
        }
    });

    mainObserver.observe(document.body, { childList: true, subtree: true });

})();
