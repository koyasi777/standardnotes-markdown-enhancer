// ==UserScript==
// @name         Add Markdown Editor to Standard Notes
// @name:ja      Standard NotesにMarkdownエディタを追加
// @name:en      Add Markdown Editor to Standard Notes
// @name:zh-CN   为Standard Notes添加Markdown编辑器
// @name:zh-TW   為Standard Notes新增Markdown編輯器
// @name:ko      Standard Notes에 Markdown 에디터 추가
// @name:fr      Ajouter un éditeur Markdown à Standard Notes
// @name:es      Añadir editor Markdown a Standard Notes
// @name:de      Markdown-Editor zu Standard Notes hinzufügen
// @name:pt-BR   Adicionar editor Markdown ao Standard Notes
// @name:ru      Добавить редактор Markdown в Standard Notes
// @version      1.8.0
// @description         Adds a rich Markdown editor with preview and toolbar to Standard Notes (unofficial). Fully client-side and secure.
// @description:ja      Standard Notesに装飾ツールバー＆プレビュー付きのMarkdownエディタを追加（非公式）。完全にローカルで動作。
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

    // --- スタイルの定義 ---
    GM_addStyle(`
        /* メインコンテナ */
        .markdown-editor-container {
            display: flex; flex-direction: column; height: 100%;
            overflow: hidden; border: 1px solid var(--sn-stylekit-border-color, #e0e0e0);
            border-radius: 4px;
        }

        /* モード切替タブ */
        .mode-toggle-bar {
            flex-shrink: 0; padding: 4px 10px;
            background-color: var(--sn-stylekit-editor-background-color, #f9f9f9);
            border-bottom: 1px solid var(--sn-stylekit-border-color, #e0e0e0);
            display: flex; gap: 5px;
        }
        .mode-toggle-button {
            padding: 5px 12px; border: 1px solid var(--sn-stylekit-border-color, #ccc);
            border-radius: 6px; cursor: pointer;
            background-color: var(--sn-stylekit-background-color, #fff);
            color: var(--sn-stylekit-foreground-color, #333); font-size: 13px;
        }
        .mode-toggle-button.active {
            background-color: var(--sn-stylekit-primary-color, #346df1);
            color: var(--sn-stylekit-primary-contrast-color, #fff);
            border-color: var(--sn-stylekit-primary-color, #346df1);
        }

        /* 編集ツールバー */
        .markdown-toolbar {
            flex-shrink: 0; display: flex; flex-wrap: wrap; align-items: center;
            padding: 8px 10px; gap: 8px;
            background-color: var(--sn-stylekit-editor-background-color, #f9f9f9);
            border-bottom: 1px solid var(--sn-stylekit-border-color, #e0e0e0);
        }
        .toolbar-button, .toolbar-select {
            padding: 4px 8px; border: 1px solid transparent; border-radius: 4px;
            cursor: pointer; background-color: var(--sn-stylekit-background-color, #fff);
            color: var(--sn-stylekit-foreground-color, #555); font-size: 14px;
            font-weight: bold; transition: all 0.2s;
        }
        .toolbar-button:hover, .toolbar-select:hover {
            background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0);
            border-color: var(--sn-stylekit-border-color, #ccc);
        }
        .toolbar-select {
            -webkit-appearance: none; -moz-appearance: none; appearance: none; padding-right: 20px;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20fill%3D%22%23555%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E');
            background-repeat: no-repeat; background-position: right 0px center;
        }

        /* プレビュー表示エリア */
        .markdown-preview {
            padding: 16px; flex-grow: 1; overflow-y: auto; line-height: 1.7;
            color: var(--sn-stylekit-foreground-color, #333);
            background-color: var(--sn-stylekit-editor-background-color, #fff);
            font-size: 1.05rem;
        }

        /* Markdownエディタ用のテキストエリア */
        .custom-markdown-textarea {
            flex-grow: 1; border: none !important; outline: none !important; resize: none !important;
            box-shadow: none !important; padding: 16px !important; margin: 0 !important; width: 100% !important;
            background-color: var(--sn-stylekit-editor-background-color, #fff) !important;
            color: var(--sn-stylekit-foreground-color, #333) !important;
            font-family: var(--sn-stylekit-font-editor, sans-serif) !important;
            line-height: var(--sn-stylekit-line-height-editor, 1.7) !important;
        }

        /* プレビュー内の基本スタイル */
        .markdown-preview h1, .markdown-preview h2, .markdown-preview h3, .markdown-preview h4, .markdown-preview h5, .markdown-preview h6 {
            margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25;
            border-bottom: 1px solid var(--sn-stylekit-border-color, #eee); padding-bottom: .3em;
        }
        .markdown-preview h1 { font-size: 2em; }
        .markdown-preview h2 { font-size: 1.5em; }
        .markdown-preview h3 { font-size: 1.25em; }
        .markdown-preview p { margin-bottom: 16px; }
        .markdown-preview ul, .markdown-preview ol { padding-left: 2em; margin-bottom: 16px; }
        .markdown-preview blockquote {
            padding: 0 1em; color: var(--sn-stylekit-secondary-foreground-color, #6a737d);
            border-left: .25em solid var(--sn-stylekit-border-color, #dfe2e5);
            margin: 0 0 16px 0;
        }
        .markdown-preview code {
            padding: .2em .4em; margin: 0; font-size: 85%;
            background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0);
            border-radius: 3px; font-family: var(--sn-stylekit-font-code, monospace);
        }
        .markdown-preview pre {
            position: relative; padding: 16px; overflow: auto; font-size: 85%; line-height: 1.45;
            background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0);
            border-radius: 6px; word-wrap: normal; margin-bottom: 16px;
        }
        .markdown-preview pre code { background-color: transparent; padding: 0; margin: 0; }
        .markdown-preview img { max-width: 100%; height: auto; border-radius: 6px; }
        .markdown-preview table {
            border-collapse: collapse; width: 100%; margin-bottom: 16px; display: block; overflow: auto;
        }
        .markdown-preview th, .markdown-preview td {
            border: 1px solid var(--sn-stylekit-border-color, #dfe2e5); padding: 6px 13px;
        }
        .markdown-preview tr:nth-child(2n) { background-color: var(--sn-stylekit-secondary-background-color, #f6f8fa); }

        .markdown-preview hr {
            height: .25em; padding: 0; margin: 24px 0;
            background-color: var(--sn-stylekit-border-color, #dfe2e5); border: 0;
        }
        .markdown-preview .task-list-item { list-style-type: none; }
        .markdown-preview .task-list-item-checkbox {
            margin: 0 .2em .25em -1.6em; vertical-align: middle;
        }

        /* コードコピーボタン */
        .copy-code-button {
            position: absolute; top: 10px; right: 10px; padding: 5px 8px; font-size: 12px;
            border: 1px solid var(--sn-stylekit-border-color, #ccc); border-radius: 4px;
            background-color: var(--sn-stylekit-background-color, #fff);
            color: var(--sn-stylekit-secondary-foreground-color, #555);
            cursor: pointer; opacity: 0; transition: opacity 0.2s, background-color 0.2s, color 0.2s;
        }
        .markdown-preview pre:hover .copy-code-button { opacity: 1; }
        .copy-code-button:hover { background-color: var(--sn-stylekit-secondary-background-color, #f0f0f0); }
        .copy-code-button.copied {
            background-color: var(--sn-stylekit-primary-color, #346df1);
            color: var(--sn-stylekit-primary-contrast-color, #fff);
            border-color: var(--sn-stylekit-primary-color, #346df1);
        }

        /* シンタックスハイライト (ライトモード用) */
        .markdown-preview pre code.hljs {
            display: block; overflow-x: auto; padding: 0;
            color: var(--sn-stylekit-foreground-color, #333); background: transparent;
        }
        .hljs-comment, .hljs-quote { color: var(--sn-stylekit-secondary-foreground-color, #6a737d); font-style: italic; }
        .hljs-keyword, .hljs-selector-tag, .hljs-subst, .hljs-deletion, .hljs-meta, .hljs-selector-class { color: #d73a49; }
        .hljs-number, .hljs-literal, .hljs-variable, .hljs-template-variable, .hljs-tag .hljs-attr { color: var(--sn-stylekit-primary-color, #005cc5); }
        .hljs-string, .hljs-doctag { color: #032f62; }
        .hljs-title, .hljs-section, .hljs-selector-id, .hljs-type, .hljs-symbol, .hljs-bullet, .hljs-link { color: #6f42c1; }
        .hljs-addition { color: #22863a; }
        .hljs-emphasis { font-style: italic; }
        .hljs-strong { font-weight: bold; }

        /* ダークモード用の配色 */
        @media (prefers-color-scheme: dark) {
            .markdown-preview pre code.hljs .hljs-keyword, .markdown-preview pre code.hljs .hljs-selector-tag,
            .markdown-preview pre code.hljs .hljs-subst, .markdown-preview pre code.hljs .hljs-deletion,
            .markdown-preview pre code.hljs .hljs-meta, .markdown-preview pre code.hljs .hljs-selector-class { color: #ff7b72; }
            .markdown-preview pre code.hljs .hljs-string, .markdown-preview pre code.hljs .hljs-doctag { color: #a5d6ff; }
            .markdown-preview pre code.hljs .hljs-title, .markdown-preview pre code.hljs .hljs-section,
            .markdown-preview pre code.hljs .hljs-selector-id, .markdown-preview pre code.hljs .hljs-type,
            .markdown-preview pre code.hljs .hljs-symbol, .markdown-preview pre code.hljs .hljs-bullet,
            .markdown-preview pre code.hljs .hljs-link { color: #d2a8ff; }
            .markdown-preview pre code.hljs .hljs-addition { color: #7ee787; }
        }
    `);

    /**
     * v1.7.1: 選択範囲のMarkdown装飾を適用または解除（トグル）する関数
     */
    function applyMarkdown(textarea, prefix, suffix = '', placeholder = '') {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        const textBefore = textarea.value.substring(start - prefix.length, start);
        const textAfter = textarea.value.substring(end, end + suffix.length);

        if (textBefore === prefix && textAfter === suffix) {
            textarea.setRangeText(selectedText, start - prefix.length, end + suffix.length, 'select');
        } else if (selectedText.startsWith(prefix) && selectedText.endsWith(suffix)) {
            const unwrappedText = selectedText.substring(prefix.length, selectedText.length - suffix.length);
            textarea.setRangeText(unwrappedText, start, end, 'select');
        } else {
            let newText;
            if (selectedText) {
                newText = prefix + selectedText + suffix;
            } else {
                newText = prefix + placeholder + suffix;
            }
            textarea.setRangeText(newText, start, end, 'end');

            if (!selectedText && placeholder) {
                textarea.selectionStart = start + prefix.length;
                textarea.selectionEnd = start + prefix.length + placeholder.length;
            }
        }
        textarea.focus();
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
    }


    function setupMarkdownEditor(originalTextarea) {
        if (originalTextarea.dataset.markdownReady) return;
        originalTextarea.dataset.markdownReady = 'true';

        marked.setOptions({
            gfm: true, breaks: true, smartLists: true,
            langPrefix: 'language-',
        });

        const editorWrapper = originalTextarea.parentElement;
        const container = document.createElement('div');
        container.className = 'markdown-editor-container';
        const modeBar = document.createElement('div');
        modeBar.className = 'mode-toggle-bar';
        const editorButton = document.createElement('button');
        editorButton.className = 'mode-toggle-button active';
        editorButton.textContent = 'エディタ';
        const previewButton = document.createElement('button');
        previewButton.className = 'mode-toggle-button';
        previewButton.textContent = 'プレビュー';
        const toolbar = document.createElement('div');
        toolbar.className = 'markdown-toolbar';
        const previewPane = document.createElement('div');
        previewPane.className = 'markdown-preview';
        previewPane.style.display = 'none';
        const markdownTextarea = document.createElement('textarea');
        markdownTextarea.className = originalTextarea.className + ' custom-markdown-textarea';
        markdownTextarea.value = originalTextarea.value;
        markdownTextarea.spellcheck = false;
        editorWrapper.style.display = 'none';
        editorWrapper.style.height = '100%';

        const toolbarButtons = [
            {
                type: 'select', name: '見出し', options: [ { value: 'p', text: '段落' }, { value: 'h1', text: '見出し 1' }, { value: 'h2', text: '見出し 2' }, { value: 'h3', text: '見出し 3' }, { value: 'h4', text: '見出し 4' } ],
                action: (prefix) => {
                    const start = markdownTextarea.selectionStart;
                    let lineStart = markdownTextarea.value.lastIndexOf('\n', start - 1) + 1;
                    let lineEnd = markdownTextarea.value.indexOf('\n', start);
                    if (lineEnd === -1) lineEnd = markdownTextarea.value.length;
                    const originalLine = markdownTextarea.value.substring(lineStart, lineEnd);
                    const cleanedLine = originalLine.replace(/^\s*#+\s*/, '');
                    const newText = prefix ? `${prefix} ${cleanedLine}` : cleanedLine;
                    // v1.8.0: カーソルを行末に移動させるため 'end' を指定
                    markdownTextarea.setRangeText(newText, lineStart, lineEnd, 'end');
                    markdownTextarea.dispatchEvent(new Event('input', { bubbles: true }));
                    markdownTextarea.focus();
                }
            },
            { type: 'button', name: 'B', title: '太字', action: () => applyMarkdown(markdownTextarea, '**', '**', '太字') },
            { type: 'button', name: 'I', title: '斜体', action: () => applyMarkdown(markdownTextarea, '*', '*', '斜体') },
            { type: 'button', name: 'S', title: '打ち消し線', action: () => applyMarkdown(markdownTextarea, '~~', '~~', '打ち消し') },
            { type: 'button', name: '`', title: 'インラインコード', action: () => applyMarkdown(markdownTextarea, '`', '`', 'code') },
            { type: 'button', name: '“ ”', title: '引用', action: () => applyMarkdown(markdownTextarea, '> ', '', '引用文') },
            { type: 'button', name: '•', title: 'リスト', action: () => applyMarkdown(markdownTextarea, '- ', '', '項目') },
            { type: 'button', name: '1.', title: '番号付きリスト', action: () => applyMarkdown(markdownTextarea, '1. ', '', '項目') },
            { type: 'button', name: '☑', title: 'チェックリスト', action: () => applyMarkdown(markdownTextarea, '- [ ] ', '', 'タスク') },
            { type: 'button', name: '</>', title: 'コードブロック', action: () => applyMarkdown(markdownTextarea, '```\n', '\n```', 'code') },
            { type: 'button', name: 'Link', title: 'リンク', action: () => { const url = prompt('リンク先のURLを入力してください:', 'https://'); if (url) applyMarkdown(markdownTextarea, '[', `](${url})`, 'リンクテキスト'); }},
            { type: 'button', name: '表', title: 'テーブル挿入', action: () => applyMarkdown(markdownTextarea, '| Column 1 | Column 2 |\n|---|---|\n|  |  |\n') },
            { type: 'button', name: '―', title: '水平線', action: () => applyMarkdown(markdownTextarea, '\n---\n') },
        ];

        toolbarButtons.forEach(item => {
            if (item.type === 'button') {
                const button = document.createElement('button');
                button.className = 'toolbar-button';
                button.textContent = item.name;
                button.title = item.title;
                button.onclick = item.action;
                toolbar.appendChild(button);
            } else if (item.type === 'select') {
                const select = document.createElement('select');
                select.className = 'toolbar-select heading-select'; // v1.8.0: 識別用クラス追加
                item.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.text;
                    select.appendChild(option);
                });
                select.onchange = (e) => {
                    let prefix = '';
                    switch (e.target.value) {
                        case 'h1': prefix = '#'; break; case 'h2': prefix = '##'; break;
                        case 'h3': prefix = '###'; break; case 'h4': prefix = '####'; break;
                    }
                    item.action(prefix);
                    // 状態はイベントリスナーで更新されるため、ここではselectedIndexをリセットしない
                };
                toolbar.appendChild(select);
            }
        });

        modeBar.append(editorButton, previewButton);
        container.append(modeBar, toolbar, markdownTextarea, previewPane);
        editorWrapper.after(container);

        // --- v1.8.0: ツールバー状態更新機能 ---
        const headerSelect = toolbar.querySelector('.heading-select');
        const updateToolbarState = () => {
            if (!headerSelect) return;
            const start = markdownTextarea.selectionStart;
            const lineStart = markdownTextarea.value.lastIndexOf('\n', start - 1) + 1;
            const currentLine = markdownTextarea.value.substring(lineStart).split('\n')[0];

            let currentStyle = 'p';
            if (/^#\s/.test(currentLine)) { currentStyle = 'h1'; }
            else if (/^##\s/.test(currentLine)) { currentStyle = 'h2'; }
            else if (/^###\s/.test(currentLine)) { currentStyle = 'h3'; }
            else if (/^####\s/.test(currentLine)) { currentStyle = 'h4'; }

            if (headerSelect.value !== currentStyle) {
                headerSelect.value = currentStyle;
            }
        };
        markdownTextarea.addEventListener('keyup', updateToolbarState);
        markdownTextarea.addEventListener('mouseup', updateToolbarState);
        markdownTextarea.addEventListener('focus', updateToolbarState);
        markdownTextarea.addEventListener('input', updateToolbarState);


        const updatePreview = () => {
            try {
                const markdownText = markdownTextarea.value;
                const dirtyHtml = marked.parse(markdownText);
                const sanitizedHtml = DOMPurify.sanitize(dirtyHtml, {
                    USE_PROFILES: { html: true },
                    ADD_ATTR: ['class', 'type', 'disabled', 'checked'],
                    ADD_TAGS: ['span', 'input'],
                });
                previewPane.innerHTML = sanitizedHtml;
                previewPane.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
                previewPane.querySelectorAll('pre').forEach(preEl => {
                    if (preEl.querySelector('.copy-code-button')) return;
                    const codeEl = preEl.querySelector('code');
                    if (!codeEl) return;
                    const copyButton = document.createElement('button');
                    copyButton.className = 'copy-code-button';
                    copyButton.textContent = 'Copy';
                    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
                    preEl.appendChild(copyButton);
                    copyButton.addEventListener('click', (e) => { e.stopPropagation(); navigator.clipboard.writeText(codeEl.innerText).then(() => { copyButton.textContent = 'Copied!'; copyButton.classList.add('copied'); setTimeout(() => { copyButton.textContent = 'Copy'; copyButton.classList.remove('copied'); }, 2000); }).catch(err => { console.error('Failed to copy code block.', err); copyButton.textContent = 'Error'; setTimeout(() => { copyButton.textContent = 'Copy'; }, 2000); }); });
                });
            } catch (e) {
                console.error("Error updating preview:", e);
                previewPane.innerHTML = `<div style="padding: 1rem; color: #d73a49; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: .25rem;"><strong>プレビューの更新中にエラーが発生しました:</strong><br><pre style="white-space: pre-wrap; word-break: break-all; margin-top: 0.5rem;">${e.stack}</pre></div>`;
            }
        };

        markdownTextarea.addEventListener('input', () => { originalTextarea.value = markdownTextarea.value; originalTextarea.dispatchEvent(new Event('input', { bubbles: true })); });
        const observer = new MutationObserver(() => { if (originalTextarea.value !== markdownTextarea.value) { markdownTextarea.value = originalTextarea.value; updateToolbarState(); } });
        observer.observe(originalTextarea, { attributes: true, childList: true, subtree: true, characterData: true });
        editorButton.addEventListener('click', () => { previewPane.style.display = 'none'; toolbar.style.display = 'flex'; markdownTextarea.style.display = 'block'; editorButton.classList.add('active'); previewButton.classList.remove('active'); markdownTextarea.focus(); });
        previewButton.addEventListener('click', () => { updatePreview(); previewPane.style.display = 'block'; toolbar.style.display = 'none'; markdownTextarea.style.display = 'none'; previewButton.classList.add('active'); editorButton.classList.remove('active'); });

        console.log('Markdown Editor for Standard Notes has been initialized (v1.8.0).');
    }

    // --- 全体監視ロジック ---
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

    mainObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
