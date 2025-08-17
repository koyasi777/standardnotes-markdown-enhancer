# Enhanced Markdown Editor for Standard Notes

> **非公式ユーザースクリプト**として、Standard Notes の既定プレーンテキストエディタを**高機能な Markdown エディタ**に置き換えます。ライブプレビュー、装飾ツールバー、画像の貼り付け＆自動リサイズ、PDF出力、ビジュアル表エディタを搭載。すべて**100%ローカル**で動作します。

---

## 📌 概要

本スクリプトは **Standard Notes（Web）** を、プライバシー重視の Markdown 執筆環境へ拡張します。巨大ノートに強いストリーミングプレビュー、堅牢なリンク／画像処理、キーボード中心の編集体験、印刷最適化まで、データ送信なしで完結します。

> ⚠️ **Standard Notes, Inc. 非公式**です。

---

## 🚀 インストール手順

1. ユーザースクリプトマネージャをインストール:
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [Tampermonkey for Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
   - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. ユーザースクリプトをインストール:  
   👉 **[こちらをクリック](https://raw.githubusercontent.com/koyasi777/standardnotes-markdown-enhancer/main/standardnotes-markdown-enhancer.user.js)**
3. `https://app.standardnotes.com/` を開くと自動で有効化されます。

> 💡 既定のプレーンテキストエディタのみ置き換え、公式エディタ（Bold/Code）には干渉しません。

---

## ✨ 主な機能

### 🧭 表示モード & 使い勝手
- **Editor / Split / Preview**（スクロール同期）
- **ツールバー表示切替**・**表示モードの記憶**（`localStorage`）
- **ダークモード** & SN テーマ変数対応
- **タイトル → 本文へフォーカス**：タイトルで `Enter`

### 🛠️ 装飾ツールバー
- 見出し（H1–H4）、**太字**、*斜体*、~~取り消し~~
- インラインコード／コードブロック（複数行選択は自動的にフェンス）
- 引用、箇条書き／番号付き、**チェックリスト**（`- [ ]`）
- リンク、画像、表、水平線

### 🖼 画像ワークフロー
- **貼り付け**：**最大 1280px に自動リサイズ**して Base64 埋め込み
- **アップロード／URL**：モーダルで挿入（Alt テキスト対応）
- **アニメ GIF は再エンコードしない**で保持
- **スマート保存形式**：透過は PNG/WebP、非透過は WebP→JPEG へフォールバック
- **未使用画像の自動クリーンアップ**
- ノート末尾の **Definitions** ブロックに画像参照を管理

### 📊 ビジュアル表エディタ
- セル直接編集 + キーボード操作（Enter/矢印/Tab）
- 行・列の追加／削除、**ドラッグ＆ドロップ**並び替え
- 列揃え：左／中央／右 → `:---`、`:---:`、`---:`
- 既存の Markdown テーブル選択を**再編集**可能

### 🔍 プレビュー & コード
- `marked.js` → **DOMPurify** でサニタイズした **ライブプレビュー**
- **highlight.js** によるシンタックスハイライト（遅延・ビューポート検出）
- 各コードブロックに **言語ラベル** と **Copy** ボタン
- **チェックリスト同期**：プレビューのチェック操作が Markdown に反映

### 🖨 印刷 & PDF
- **印刷最適化スタイル**で PDF 出力が綺麗
- 超巨大ノートではエディタのみの**フォールバック**印刷
- グローバルホットキー **`⌘/Ctrl + P`** で即時印刷

### ⌨️ キーボード体験
- **グローバルホットキー**（可能な限りフォーカス外でも有効）
  - `⌘/Ctrl + P` → 印刷/PDF
  - `⌘/Ctrl + B` / `⌘/Ctrl + I` → 太字 / 斜体
- **Enter**：リストの**自動継続／終了**（引用・番号付き・チェック付き対応）
- **Tab / Shift+Tab**：**インデント／アウトデント**（単一行・複数行どちらも）

### ⚡ パフォーマンス設計
- **ストリーミングプレビュー**：チャンク分割 + Idle タイム描画
- `content-visibility` と内在サイズでオフスクリーンを軽量化
- `navigator.deviceMemory` に基づく**閾値自動調整**
- **ロックダウンモード**：極端に大きいノートで Split/Preview を一時停止し応答性を確保

---

## 🔐 セキュリティ & プライバシー

- すべて**ローカル処理**（外部 API・アップロード・解析なし）
- **DOMPurify** による厳格サニタイズ  
  - 安全なスキームのみ（`https`、`mailto`、`tel`、同一オリジンのパス、`data:image/*`）  
  - `style`、`iframe`、`form`、`srcset` は**禁止**
  - 外部リンクに `target="_blank"` + `rel="noopener noreferrer"`
- Base64 画像は**ノート内**に保持
- 未使用画像は**自動削除**

> 本スクリプトは現状有姿で提供されます。自己責任でご利用ください。

---

## 🧰 互換性・注意点

- ✔ 対象：`https://app.standardnotes.com/` の**既定プレーンテキストエディタ**
- ❌ 非対象：公式エディタ（**Bold** / **Code** など）
- 🔄 SN 側 DOM の変更で動作が変わる可能性あり

---

## ❓ FAQ

**画像はどこに保存されますか？**  
ノート末尾の **Definitions** ブロックに **Base64 データ URI** として保存され、本文から参照されます。参照が消えると定義は**自動削除**されます。

**巨大ノートで Split/Preview が無効化されるのは？**  
応答性を守るための **ロックダウンモード**です。ノート分割やサイズ縮小をご検討ください。

**既存の Markdown をそのまま使えますか？**  
はい。本文はそのままで、画像参照のみ Definitions に集約されます。

**元のエディタに戻すには？**  
ユーザースクリプトマネージャで本スクリプトを無効化／一時停止してください。

---

## 🌍 多言語

UI 文字列：**en, ja, zh-CN, zh-TW, ko, fr, es, de, pt-BR, ru**  
`navigator.language` により自動選択します。

---

## 🤝 コントリビュート

- ライセンス：**MIT**
- Issue / PR 歓迎
- GitHub：<https://github.com/koyasi777/standardnotes-markdown-enhancer>
