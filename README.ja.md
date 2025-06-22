# Standard Notes 高機能Markdownエディタ拡張

## 📌 概要

このユーザースクリプトは、**Standard Notes（Web版）** のプレーンテキストエディタを置き換え、**高機能なMarkdownエディタ**を提供します。ライブプレビュー、装飾ツールバー、画像挿入、PDFエクスポート、インタラクティブなテーブルエディタなど、豊富な機能をすべてブラウザ内で実現。完全ローカル処理でプライバシーも安心です。

---

## ✨ 主な機能

- 🛠️ **装飾ツールバー**（見出し、太字、斜体、打消線、引用、リスト、チェックリスト、コード、リンク、画像、テーブル、水平線など）
- 🔀 表示モード切替：**エディタ / 分割ビュー / プレビュー**
- 🔍 `marked.js` + `DOMPurify` + `highlight.js` による**リアルタイムプレビュー**（安全なHTML生成とシンタックスハイライト）
- 🖼 **画像機能**：
  - クリップボードから貼り付け → 最大1280pxに自動リサイズしてBase64埋め込み
  - UIからファイルアップロード／URL挿入可能
  - **未使用の埋め込み画像は自動削除**
- 📋 **コードブロックのコピー機能**（「Copy」ボタン付き）
- 🔠 **インタラクティブなテーブル作成・編集機能**
- 🖨 **PDFエクスポートと印刷用クリーンスタイル**
- 🌙 **ダークモード対応**、Standard Notesのテーマと統合
- 💾 表示モードやツールバーの状態はローカルに保存され、自動復元

> ⚠️ このスクリプトは **非公式の拡張** であり、Standard Notes社とは無関係です。

---

## 🚀 インストール方法

1. 以下のいずれかのユーザースクリプト管理拡張をインストール：
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Tampermonkey（Firefox）](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Tampermonkey（Chrome）](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. スクリプトをインストール：
   👉 **[ここをクリックしてインストール](https://raw.githubusercontent.com/koyasi777/standardnotes-markdown-enhancer/main/standardnotes-markdown-enhancer.user.js)**
3. `https://app.standardnotes.com/` にアクセスすると、自動的にエディタが有効化されます。

> 💡 プレーンテキストエディタを自動検出してMarkdown UIを注入します。

---

## 🔍 機能サマリー

| 機能 | 内容 |
|------|------|
| **ツールバー** | Markdown記法をワンクリックで挿入 |
| **表示モード** | エディタ / 分割 / プレビュー切り替え可能 |
| **プレビュー** | 安全なHTML出力 + コピー機能付きコード |
| **画像対応** | 貼り付け / アップロード / URL挿入に対応、未使用画像は自動削除 |
| **テーブル** | GUIでMarkdownテーブルを作成・編集 |
| **エクスポート** | 印刷／PDF出力に最適化されたスタイル |
| **高速処理** | レンダリングや画像処理はデバウンスで効率化 |
| **テーマ対応** | SNのCSS変数に連動し、ダークモードにも完全対応 |

---

## 🔐 セキュリティとプライバシー

- 🔒 **すべてローカル処理** — 外部送信やAPI通信なし
- ✔ `DOMPurify`による安全なHTMLサニタイズ
- 🖼 画像はBase64形式でノート内に埋め込み、**未使用時は自動削除**

> 自己責任でご利用ください（Standard Notes社の公式サポートはありません）

---

## 📝 注意点

- 対応するのは **Standard Notesのプレーンテキストエディタのみ**
- **Bold / Code** などの公式エディタとは併用不可
- Standard Notes側のDOM仕様が変わると、スクリプトの修正が必要になる場合があります

---

## 🌍 コミュニティ・貢献

- 📜 **MITライセンス** — 商用・改変・再配布すべてOK
- 🛠 GitHubでのフィードバックやPRも歓迎です！

🔗 [GitHubリポジトリ](https://github.com/koyasi777/standardnotes-markdown-enhancer)
