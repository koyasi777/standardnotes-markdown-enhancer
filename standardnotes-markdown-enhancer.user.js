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
// @version              5.3.2
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
// @license              MIT
// @homepageURL          https://github.com/koyasi777/standardnotes-markdown-enhancer
// @supportURL           https://github.com/koyasi777/standardnotes-markdown-enhancer/issues
// @icon                 https://app.standardnotes.com/favicon/favicon-32x32.png
// ==/UserScript==

(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/highlight.js/lib/core.js
  var require_core = __commonJS({
    "node_modules/highlight.js/lib/core.js"(exports, module) {
      function deepFreeze(obj) {
        if (obj instanceof Map) {
          obj.clear = obj.delete = obj.set = function() {
            throw new Error("map is read-only");
          };
        } else if (obj instanceof Set) {
          obj.add = obj.clear = obj.delete = function() {
            throw new Error("set is read-only");
          };
        }
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach((name) => {
          const prop = obj[name];
          const type = typeof prop;
          if ((type === "object" || type === "function") && !Object.isFrozen(prop)) {
            deepFreeze(prop);
          }
        });
        return obj;
      }
      var Response = class {
        /**
         * @param {CompiledMode} mode
         */
        constructor(mode) {
          if (mode.data === void 0) mode.data = {};
          this.data = mode.data;
          this.isMatchIgnored = false;
        }
        ignoreMatch() {
          this.isMatchIgnored = true;
        }
      };
      function escapeHTML(value) {
        return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
      }
      function inherit$1(original, ...objects) {
        const result = /* @__PURE__ */ Object.create(null);
        for (const key in original) {
          result[key] = original[key];
        }
        objects.forEach(function(obj) {
          for (const key in obj) {
            result[key] = obj[key];
          }
        });
        return (
          /** @type {T} */
          result
        );
      }
      var SPAN_CLOSE = "</span>";
      var emitsWrappingTags = (node) => {
        return !!node.scope;
      };
      var scopeToCSSClass = (name, { prefix }) => {
        if (name.startsWith("language:")) {
          return name.replace("language:", "language-");
        }
        if (name.includes(".")) {
          const pieces = name.split(".");
          return [
            `${prefix}${pieces.shift()}`,
            ...pieces.map((x, i) => `${x}${"_".repeat(i + 1)}`)
          ].join(" ");
        }
        return `${prefix}${name}`;
      };
      var HTMLRenderer = class {
        /**
         * Creates a new HTMLRenderer
         *
         * @param {Tree} parseTree - the parse tree (must support `walk` API)
         * @param {{classPrefix: string}} options
         */
        constructor(parseTree, options) {
          this.buffer = "";
          this.classPrefix = options.classPrefix;
          parseTree.walk(this);
        }
        /**
         * Adds texts to the output stream
         *
         * @param {string} text */
        addText(text2) {
          this.buffer += escapeHTML(text2);
        }
        /**
         * Adds a node open to the output stream (if needed)
         *
         * @param {Node} node */
        openNode(node) {
          if (!emitsWrappingTags(node)) return;
          const className = scopeToCSSClass(
            node.scope,
            { prefix: this.classPrefix }
          );
          this.span(className);
        }
        /**
         * Adds a node close to the output stream (if needed)
         *
         * @param {Node} node */
        closeNode(node) {
          if (!emitsWrappingTags(node)) return;
          this.buffer += SPAN_CLOSE;
        }
        /**
         * returns the accumulated buffer
        */
        value() {
          return this.buffer;
        }
        // helpers
        /**
         * Builds a span element
         *
         * @param {string} className */
        span(className) {
          this.buffer += `<span class="${className}">`;
        }
      };
      var newNode = (opts = {}) => {
        const result = { children: [] };
        Object.assign(result, opts);
        return result;
      };
      var TokenTree = class _TokenTree {
        constructor() {
          this.rootNode = newNode();
          this.stack = [this.rootNode];
        }
        get top() {
          return this.stack[this.stack.length - 1];
        }
        get root() {
          return this.rootNode;
        }
        /** @param {Node} node */
        add(node) {
          this.top.children.push(node);
        }
        /** @param {string} scope */
        openNode(scope) {
          const node = newNode({ scope });
          this.add(node);
          this.stack.push(node);
        }
        closeNode() {
          if (this.stack.length > 1) {
            return this.stack.pop();
          }
          return void 0;
        }
        closeAllNodes() {
          while (this.closeNode()) ;
        }
        toJSON() {
          return JSON.stringify(this.rootNode, null, 4);
        }
        /**
         * @typedef { import("./html_renderer").Renderer } Renderer
         * @param {Renderer} builder
         */
        walk(builder) {
          return this.constructor._walk(builder, this.rootNode);
        }
        /**
         * @param {Renderer} builder
         * @param {Node} node
         */
        static _walk(builder, node) {
          if (typeof node === "string") {
            builder.addText(node);
          } else if (node.children) {
            builder.openNode(node);
            node.children.forEach((child) => this._walk(builder, child));
            builder.closeNode(node);
          }
          return builder;
        }
        /**
         * @param {Node} node
         */
        static _collapse(node) {
          if (typeof node === "string") return;
          if (!node.children) return;
          if (node.children.every((el) => typeof el === "string")) {
            node.children = [node.children.join("")];
          } else {
            node.children.forEach((child) => {
              _TokenTree._collapse(child);
            });
          }
        }
      };
      var TokenTreeEmitter = class extends TokenTree {
        /**
         * @param {*} options
         */
        constructor(options) {
          super();
          this.options = options;
        }
        /**
         * @param {string} text
         */
        addText(text2) {
          if (text2 === "") {
            return;
          }
          this.add(text2);
        }
        /** @param {string} scope */
        startScope(scope) {
          this.openNode(scope);
        }
        endScope() {
          this.closeNode();
        }
        /**
         * @param {Emitter & {root: DataNode}} emitter
         * @param {string} name
         */
        __addSublanguage(emitter, name) {
          const node = emitter.root;
          if (name) node.scope = `language:${name}`;
          this.add(node);
        }
        toHTML() {
          const renderer = new HTMLRenderer(this, this.options);
          return renderer.value();
        }
        finalize() {
          this.closeAllNodes();
          return true;
        }
      };
      function source(re2) {
        if (!re2) return null;
        if (typeof re2 === "string") return re2;
        return re2.source;
      }
      function lookahead(re2) {
        return concat("(?=", re2, ")");
      }
      function anyNumberOfTimes(re2) {
        return concat("(?:", re2, ")*");
      }
      function optional(re2) {
        return concat("(?:", re2, ")?");
      }
      function concat(...args) {
        const joined = args.map((x) => source(x)).join("");
        return joined;
      }
      function stripOptionsFromArgs(args) {
        const opts = args[args.length - 1];
        if (typeof opts === "object" && opts.constructor === Object) {
          args.splice(args.length - 1, 1);
          return opts;
        } else {
          return {};
        }
      }
      function either(...args) {
        const opts = stripOptionsFromArgs(args);
        const joined = "(" + (opts.capture ? "" : "?:") + args.map((x) => source(x)).join("|") + ")";
        return joined;
      }
      function countMatchGroups(re2) {
        return new RegExp(re2.toString() + "|").exec("").length - 1;
      }
      function startsWith(re2, lexeme) {
        const match = re2 && re2.exec(lexeme);
        return match && match.index === 0;
      }
      var BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
      function _rewriteBackreferences(regexps, { joinWith }) {
        let numCaptures = 0;
        return regexps.map((regex) => {
          numCaptures += 1;
          const offset = numCaptures;
          let re2 = source(regex);
          let out = "";
          while (re2.length > 0) {
            const match = BACKREF_RE.exec(re2);
            if (!match) {
              out += re2;
              break;
            }
            out += re2.substring(0, match.index);
            re2 = re2.substring(match.index + match[0].length);
            if (match[0][0] === "\\" && match[1]) {
              out += "\\" + String(Number(match[1]) + offset);
            } else {
              out += match[0];
              if (match[0] === "(") {
                numCaptures++;
              }
            }
          }
          return out;
        }).map((re2) => `(${re2})`).join(joinWith);
      }
      var MATCH_NOTHING_RE = /\b\B/;
      var IDENT_RE2 = "[a-zA-Z]\\w*";
      var UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
      var NUMBER_RE = "\\b\\d+(\\.\\d+)?";
      var C_NUMBER_RE = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
      var BINARY_NUMBER_RE = "\\b(0b[01]+)";
      var RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
      var SHEBANG = (opts = {}) => {
        const beginShebang = /^#![ ]*\//;
        if (opts.binary) {
          opts.begin = concat(
            beginShebang,
            /.*\b/,
            opts.binary,
            /\b.*/
          );
        }
        return inherit$1({
          scope: "meta",
          begin: beginShebang,
          end: /$/,
          relevance: 0,
          /** @type {ModeCallback} */
          "on:begin": (m2, resp) => {
            if (m2.index !== 0) resp.ignoreMatch();
          }
        }, opts);
      };
      var BACKSLASH_ESCAPE = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
      };
      var APOS_STRING_MODE = {
        scope: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [BACKSLASH_ESCAPE]
      };
      var QUOTE_STRING_MODE = {
        scope: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [BACKSLASH_ESCAPE]
      };
      var PHRASAL_WORDS_MODE = {
        begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
      };
      var COMMENT = function(begin, end, modeOptions = {}) {
        const mode = inherit$1(
          {
            scope: "comment",
            begin,
            end,
            contains: []
          },
          modeOptions
        );
        mode.contains.push({
          scope: "doctag",
          // hack to avoid the space from being included. the space is necessary to
          // match here to prevent the plain text rule below from gobbling up doctags
          begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
          end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
          excludeBegin: true,
          relevance: 0
        });
        const ENGLISH_WORD = either(
          // list of common 1 and 2 letter words in English
          "I",
          "a",
          "is",
          "so",
          "us",
          "to",
          "at",
          "if",
          "in",
          "it",
          "on",
          // note: this is not an exhaustive list of contractions, just popular ones
          /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
          // contractions - can't we'd they're let's, etc
          /[A-Za-z]+[-][a-z]+/,
          // `no-way`, etc.
          /[A-Za-z][a-z]{2,}/
          // allow capitalized words at beginning of sentences
        );
        mode.contains.push(
          {
            // TODO: how to include ", (, ) without breaking grammars that use these for
            // comment delimiters?
            // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
            // ---
            // this tries to find sequences of 3 english words in a row (without any
            // "programming" type syntax) this gives us a strong signal that we've
            // TRULY found a comment - vs perhaps scanning with the wrong language.
            // It's possible to find something that LOOKS like the start of the
            // comment - but then if there is no readable text - good chance it is a
            // false match and not a comment.
            //
            // for a visual example please see:
            // https://github.com/highlightjs/highlight.js/issues/2827
            begin: concat(
              /[ ]+/,
              // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
              "(",
              ENGLISH_WORD,
              /[.]?[:]?([.][ ]|[ ])/,
              "){3}"
            )
            // look for 3 words in a row
          }
        );
        return mode;
      };
      var C_LINE_COMMENT_MODE = COMMENT("//", "$");
      var C_BLOCK_COMMENT_MODE = COMMENT("/\\*", "\\*/");
      var HASH_COMMENT_MODE = COMMENT("#", "$");
      var NUMBER_MODE = {
        scope: "number",
        begin: NUMBER_RE,
        relevance: 0
      };
      var C_NUMBER_MODE = {
        scope: "number",
        begin: C_NUMBER_RE,
        relevance: 0
      };
      var BINARY_NUMBER_MODE = {
        scope: "number",
        begin: BINARY_NUMBER_RE,
        relevance: 0
      };
      var REGEXP_MODE = {
        scope: "regexp",
        begin: /\/(?=[^/\n]*\/)/,
        end: /\/[gimuy]*/,
        contains: [
          BACKSLASH_ESCAPE,
          {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [BACKSLASH_ESCAPE]
          }
        ]
      };
      var TITLE_MODE = {
        scope: "title",
        begin: IDENT_RE2,
        relevance: 0
      };
      var UNDERSCORE_TITLE_MODE = {
        scope: "title",
        begin: UNDERSCORE_IDENT_RE,
        relevance: 0
      };
      var METHOD_GUARD = {
        // excludes method names from keyword processing
        begin: "\\.\\s*" + UNDERSCORE_IDENT_RE,
        relevance: 0
      };
      var END_SAME_AS_BEGIN = function(mode) {
        return Object.assign(
          mode,
          {
            /** @type {ModeCallback} */
            "on:begin": (m2, resp) => {
              resp.data._beginMatch = m2[1];
            },
            /** @type {ModeCallback} */
            "on:end": (m2, resp) => {
              if (resp.data._beginMatch !== m2[1]) resp.ignoreMatch();
            }
          }
        );
      };
      var MODES2 = /* @__PURE__ */ Object.freeze({
        __proto__: null,
        APOS_STRING_MODE,
        BACKSLASH_ESCAPE,
        BINARY_NUMBER_MODE,
        BINARY_NUMBER_RE,
        COMMENT,
        C_BLOCK_COMMENT_MODE,
        C_LINE_COMMENT_MODE,
        C_NUMBER_MODE,
        C_NUMBER_RE,
        END_SAME_AS_BEGIN,
        HASH_COMMENT_MODE,
        IDENT_RE: IDENT_RE2,
        MATCH_NOTHING_RE,
        METHOD_GUARD,
        NUMBER_MODE,
        NUMBER_RE,
        PHRASAL_WORDS_MODE,
        QUOTE_STRING_MODE,
        REGEXP_MODE,
        RE_STARTERS_RE,
        SHEBANG,
        TITLE_MODE,
        UNDERSCORE_IDENT_RE,
        UNDERSCORE_TITLE_MODE
      });
      function skipIfHasPrecedingDot(match, response) {
        const before = match.input[match.index - 1];
        if (before === ".") {
          response.ignoreMatch();
        }
      }
      function scopeClassName(mode, _parent) {
        if (mode.className !== void 0) {
          mode.scope = mode.className;
          delete mode.className;
        }
      }
      function beginKeywords(mode, parent) {
        if (!parent) return;
        if (!mode.beginKeywords) return;
        mode.begin = "\\b(" + mode.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)";
        mode.__beforeBegin = skipIfHasPrecedingDot;
        mode.keywords = mode.keywords || mode.beginKeywords;
        delete mode.beginKeywords;
        if (mode.relevance === void 0) mode.relevance = 0;
      }
      function compileIllegal(mode, _parent) {
        if (!Array.isArray(mode.illegal)) return;
        mode.illegal = either(...mode.illegal);
      }
      function compileMatch(mode, _parent) {
        if (!mode.match) return;
        if (mode.begin || mode.end) throw new Error("begin & end are not supported with match");
        mode.begin = mode.match;
        delete mode.match;
      }
      function compileRelevance(mode, _parent) {
        if (mode.relevance === void 0) mode.relevance = 1;
      }
      var beforeMatchExt = (mode, parent) => {
        if (!mode.beforeMatch) return;
        if (mode.starts) throw new Error("beforeMatch cannot be used with starts");
        const originalMode = Object.assign({}, mode);
        Object.keys(mode).forEach((key) => {
          delete mode[key];
        });
        mode.keywords = originalMode.keywords;
        mode.begin = concat(originalMode.beforeMatch, lookahead(originalMode.begin));
        mode.starts = {
          relevance: 0,
          contains: [
            Object.assign(originalMode, { endsParent: true })
          ]
        };
        mode.relevance = 0;
        delete originalMode.beforeMatch;
      };
      var COMMON_KEYWORDS = [
        "of",
        "and",
        "for",
        "in",
        "not",
        "or",
        "if",
        "then",
        "parent",
        // common variable name
        "list",
        // common variable name
        "value"
        // common variable name
      ];
      var DEFAULT_KEYWORD_SCOPE = "keyword";
      function compileKeywords(rawKeywords, caseInsensitive, scopeName = DEFAULT_KEYWORD_SCOPE) {
        const compiledKeywords = /* @__PURE__ */ Object.create(null);
        if (typeof rawKeywords === "string") {
          compileList(scopeName, rawKeywords.split(" "));
        } else if (Array.isArray(rawKeywords)) {
          compileList(scopeName, rawKeywords);
        } else {
          Object.keys(rawKeywords).forEach(function(scopeName2) {
            Object.assign(
              compiledKeywords,
              compileKeywords(rawKeywords[scopeName2], caseInsensitive, scopeName2)
            );
          });
        }
        return compiledKeywords;
        function compileList(scopeName2, keywordList) {
          if (caseInsensitive) {
            keywordList = keywordList.map((x) => x.toLowerCase());
          }
          keywordList.forEach(function(keyword) {
            const pair = keyword.split("|");
            compiledKeywords[pair[0]] = [scopeName2, scoreForKeyword(pair[0], pair[1])];
          });
        }
      }
      function scoreForKeyword(keyword, providedScore) {
        if (providedScore) {
          return Number(providedScore);
        }
        return commonKeyword(keyword) ? 0 : 1;
      }
      function commonKeyword(keyword) {
        return COMMON_KEYWORDS.includes(keyword.toLowerCase());
      }
      var seenDeprecations = {};
      var error = (message) => {
        console.error(message);
      };
      var warn = (message, ...args) => {
        console.log(`WARN: ${message}`, ...args);
      };
      var deprecated = (version2, message) => {
        if (seenDeprecations[`${version2}/${message}`]) return;
        console.log(`Deprecated as of ${version2}. ${message}`);
        seenDeprecations[`${version2}/${message}`] = true;
      };
      var MultiClassError = new Error();
      function remapScopeNames(mode, regexes, { key }) {
        let offset = 0;
        const scopeNames = mode[key];
        const emit = {};
        const positions = {};
        for (let i = 1; i <= regexes.length; i++) {
          positions[i + offset] = scopeNames[i];
          emit[i + offset] = true;
          offset += countMatchGroups(regexes[i - 1]);
        }
        mode[key] = positions;
        mode[key]._emit = emit;
        mode[key]._multi = true;
      }
      function beginMultiClass(mode) {
        if (!Array.isArray(mode.begin)) return;
        if (mode.skip || mode.excludeBegin || mode.returnBegin) {
          error("skip, excludeBegin, returnBegin not compatible with beginScope: {}");
          throw MultiClassError;
        }
        if (typeof mode.beginScope !== "object" || mode.beginScope === null) {
          error("beginScope must be object");
          throw MultiClassError;
        }
        remapScopeNames(mode, mode.begin, { key: "beginScope" });
        mode.begin = _rewriteBackreferences(mode.begin, { joinWith: "" });
      }
      function endMultiClass(mode) {
        if (!Array.isArray(mode.end)) return;
        if (mode.skip || mode.excludeEnd || mode.returnEnd) {
          error("skip, excludeEnd, returnEnd not compatible with endScope: {}");
          throw MultiClassError;
        }
        if (typeof mode.endScope !== "object" || mode.endScope === null) {
          error("endScope must be object");
          throw MultiClassError;
        }
        remapScopeNames(mode, mode.end, { key: "endScope" });
        mode.end = _rewriteBackreferences(mode.end, { joinWith: "" });
      }
      function scopeSugar(mode) {
        if (mode.scope && typeof mode.scope === "object" && mode.scope !== null) {
          mode.beginScope = mode.scope;
          delete mode.scope;
        }
      }
      function MultiClass(mode) {
        scopeSugar(mode);
        if (typeof mode.beginScope === "string") {
          mode.beginScope = { _wrap: mode.beginScope };
        }
        if (typeof mode.endScope === "string") {
          mode.endScope = { _wrap: mode.endScope };
        }
        beginMultiClass(mode);
        endMultiClass(mode);
      }
      function compileLanguage(language) {
        function langRe(value, global) {
          return new RegExp(
            source(value),
            "m" + (language.case_insensitive ? "i" : "") + (language.unicodeRegex ? "u" : "") + (global ? "g" : "")
          );
        }
        class MultiRegex {
          constructor() {
            this.matchIndexes = {};
            this.regexes = [];
            this.matchAt = 1;
            this.position = 0;
          }
          // @ts-ignore
          addRule(re2, opts) {
            opts.position = this.position++;
            this.matchIndexes[this.matchAt] = opts;
            this.regexes.push([opts, re2]);
            this.matchAt += countMatchGroups(re2) + 1;
          }
          compile() {
            if (this.regexes.length === 0) {
              this.exec = () => null;
            }
            const terminators = this.regexes.map((el) => el[1]);
            this.matcherRe = langRe(_rewriteBackreferences(terminators, { joinWith: "|" }), true);
            this.lastIndex = 0;
          }
          /** @param {string} s */
          exec(s) {
            this.matcherRe.lastIndex = this.lastIndex;
            const match = this.matcherRe.exec(s);
            if (!match) {
              return null;
            }
            const i = match.findIndex((el, i2) => i2 > 0 && el !== void 0);
            const matchData = this.matchIndexes[i];
            match.splice(0, i);
            return Object.assign(match, matchData);
          }
        }
        class ResumableMultiRegex {
          constructor() {
            this.rules = [];
            this.multiRegexes = [];
            this.count = 0;
            this.lastIndex = 0;
            this.regexIndex = 0;
          }
          // @ts-ignore
          getMatcher(index) {
            if (this.multiRegexes[index]) return this.multiRegexes[index];
            const matcher = new MultiRegex();
            this.rules.slice(index).forEach(([re2, opts]) => matcher.addRule(re2, opts));
            matcher.compile();
            this.multiRegexes[index] = matcher;
            return matcher;
          }
          resumingScanAtSamePosition() {
            return this.regexIndex !== 0;
          }
          considerAll() {
            this.regexIndex = 0;
          }
          // @ts-ignore
          addRule(re2, opts) {
            this.rules.push([re2, opts]);
            if (opts.type === "begin") this.count++;
          }
          /** @param {string} s */
          exec(s) {
            const m2 = this.getMatcher(this.regexIndex);
            m2.lastIndex = this.lastIndex;
            let result = m2.exec(s);
            if (this.resumingScanAtSamePosition()) {
              if (result && result.index === this.lastIndex) ;
              else {
                const m22 = this.getMatcher(0);
                m22.lastIndex = this.lastIndex + 1;
                result = m22.exec(s);
              }
            }
            if (result) {
              this.regexIndex += result.position + 1;
              if (this.regexIndex === this.count) {
                this.considerAll();
              }
            }
            return result;
          }
        }
        function buildModeRegex(mode) {
          const mm = new ResumableMultiRegex();
          mode.contains.forEach((term) => mm.addRule(term.begin, { rule: term, type: "begin" }));
          if (mode.terminatorEnd) {
            mm.addRule(mode.terminatorEnd, { type: "end" });
          }
          if (mode.illegal) {
            mm.addRule(mode.illegal, { type: "illegal" });
          }
          return mm;
        }
        function compileMode(mode, parent) {
          const cmode = (
            /** @type CompiledMode */
            mode
          );
          if (mode.isCompiled) return cmode;
          [
            scopeClassName,
            // do this early so compiler extensions generally don't have to worry about
            // the distinction between match/begin
            compileMatch,
            MultiClass,
            beforeMatchExt
          ].forEach((ext) => ext(mode, parent));
          language.compilerExtensions.forEach((ext) => ext(mode, parent));
          mode.__beforeBegin = null;
          [
            beginKeywords,
            // do this later so compiler extensions that come earlier have access to the
            // raw array if they wanted to perhaps manipulate it, etc.
            compileIllegal,
            // default to 1 relevance if not specified
            compileRelevance
          ].forEach((ext) => ext(mode, parent));
          mode.isCompiled = true;
          let keywordPattern = null;
          if (typeof mode.keywords === "object" && mode.keywords.$pattern) {
            mode.keywords = Object.assign({}, mode.keywords);
            keywordPattern = mode.keywords.$pattern;
            delete mode.keywords.$pattern;
          }
          keywordPattern = keywordPattern || /\w+/;
          if (mode.keywords) {
            mode.keywords = compileKeywords(mode.keywords, language.case_insensitive);
          }
          cmode.keywordPatternRe = langRe(keywordPattern, true);
          if (parent) {
            if (!mode.begin) mode.begin = /\B|\b/;
            cmode.beginRe = langRe(cmode.begin);
            if (!mode.end && !mode.endsWithParent) mode.end = /\B|\b/;
            if (mode.end) cmode.endRe = langRe(cmode.end);
            cmode.terminatorEnd = source(cmode.end) || "";
            if (mode.endsWithParent && parent.terminatorEnd) {
              cmode.terminatorEnd += (mode.end ? "|" : "") + parent.terminatorEnd;
            }
          }
          if (mode.illegal) cmode.illegalRe = langRe(
            /** @type {RegExp | string} */
            mode.illegal
          );
          if (!mode.contains) mode.contains = [];
          mode.contains = [].concat(...mode.contains.map(function(c) {
            return expandOrCloneMode(c === "self" ? mode : c);
          }));
          mode.contains.forEach(function(c) {
            compileMode(
              /** @type Mode */
              c,
              cmode
            );
          });
          if (mode.starts) {
            compileMode(mode.starts, parent);
          }
          cmode.matcher = buildModeRegex(cmode);
          return cmode;
        }
        if (!language.compilerExtensions) language.compilerExtensions = [];
        if (language.contains && language.contains.includes("self")) {
          throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        }
        language.classNameAliases = inherit$1(language.classNameAliases || {});
        return compileMode(
          /** @type Mode */
          language
        );
      }
      function dependencyOnParent(mode) {
        if (!mode) return false;
        return mode.endsWithParent || dependencyOnParent(mode.starts);
      }
      function expandOrCloneMode(mode) {
        if (mode.variants && !mode.cachedVariants) {
          mode.cachedVariants = mode.variants.map(function(variant) {
            return inherit$1(mode, { variants: null }, variant);
          });
        }
        if (mode.cachedVariants) {
          return mode.cachedVariants;
        }
        if (dependencyOnParent(mode)) {
          return inherit$1(mode, { starts: mode.starts ? inherit$1(mode.starts) : null });
        }
        if (Object.isFrozen(mode)) {
          return inherit$1(mode);
        }
        return mode;
      }
      var version = "11.11.1";
      var HTMLInjectionError = class extends Error {
        constructor(reason, html2) {
          super(reason);
          this.name = "HTMLInjectionError";
          this.html = html2;
        }
      };
      var escape = escapeHTML;
      var inherit = inherit$1;
      var NO_MATCH = Symbol("nomatch");
      var MAX_KEYWORD_HITS = 7;
      var HLJS = function(hljs) {
        const languages = /* @__PURE__ */ Object.create(null);
        const aliases = /* @__PURE__ */ Object.create(null);
        const plugins = [];
        let SAFE_MODE = true;
        const LANGUAGE_NOT_FOUND = "Could not find the language '{}', did you forget to load/include a language module?";
        const PLAINTEXT_LANGUAGE = { disableAutodetect: true, name: "Plain text", contains: [] };
        let options = {
          ignoreUnescapedHTML: false,
          throwUnescapedHTML: false,
          noHighlightRe: /^(no-?highlight)$/i,
          languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
          classPrefix: "hljs-",
          cssSelector: "pre code",
          languages: null,
          // beta configuration options, subject to change, welcome to discuss
          // https://github.com/highlightjs/highlight.js/issues/1086
          __emitter: TokenTreeEmitter
        };
        function shouldNotHighlight(languageName) {
          return options.noHighlightRe.test(languageName);
        }
        function blockLanguage(block) {
          let classes = block.className + " ";
          classes += block.parentNode ? block.parentNode.className : "";
          const match = options.languageDetectRe.exec(classes);
          if (match) {
            const language = getLanguage(match[1]);
            if (!language) {
              warn(LANGUAGE_NOT_FOUND.replace("{}", match[1]));
              warn("Falling back to no-highlight mode for this block.", block);
            }
            return language ? match[1] : "no-highlight";
          }
          return classes.split(/\s+/).find((_class) => shouldNotHighlight(_class) || getLanguage(_class));
        }
        function highlight2(codeOrLanguageName, optionsOrCode, ignoreIllegals) {
          let code = "";
          let languageName = "";
          if (typeof optionsOrCode === "object") {
            code = codeOrLanguageName;
            ignoreIllegals = optionsOrCode.ignoreIllegals;
            languageName = optionsOrCode.language;
          } else {
            deprecated("10.7.0", "highlight(lang, code, ...args) has been deprecated.");
            deprecated("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277");
            languageName = codeOrLanguageName;
            code = optionsOrCode;
          }
          if (ignoreIllegals === void 0) {
            ignoreIllegals = true;
          }
          const context = {
            code,
            language: languageName
          };
          fire("before:highlight", context);
          const result = context.result ? context.result : _highlight(context.language, context.code, ignoreIllegals);
          result.code = context.code;
          fire("after:highlight", result);
          return result;
        }
        function _highlight(languageName, codeToHighlight, ignoreIllegals, continuation) {
          const keywordHits = /* @__PURE__ */ Object.create(null);
          function keywordData(mode, matchText) {
            return mode.keywords[matchText];
          }
          function processKeywords() {
            if (!top.keywords) {
              emitter.addText(modeBuffer);
              return;
            }
            let lastIndex = 0;
            top.keywordPatternRe.lastIndex = 0;
            let match = top.keywordPatternRe.exec(modeBuffer);
            let buf = "";
            while (match) {
              buf += modeBuffer.substring(lastIndex, match.index);
              const word = language.case_insensitive ? match[0].toLowerCase() : match[0];
              const data = keywordData(top, word);
              if (data) {
                const [kind, keywordRelevance] = data;
                emitter.addText(buf);
                buf = "";
                keywordHits[word] = (keywordHits[word] || 0) + 1;
                if (keywordHits[word] <= MAX_KEYWORD_HITS) relevance += keywordRelevance;
                if (kind.startsWith("_")) {
                  buf += match[0];
                } else {
                  const cssClass = language.classNameAliases[kind] || kind;
                  emitKeyword(match[0], cssClass);
                }
              } else {
                buf += match[0];
              }
              lastIndex = top.keywordPatternRe.lastIndex;
              match = top.keywordPatternRe.exec(modeBuffer);
            }
            buf += modeBuffer.substring(lastIndex);
            emitter.addText(buf);
          }
          function processSubLanguage() {
            if (modeBuffer === "") return;
            let result2 = null;
            if (typeof top.subLanguage === "string") {
              if (!languages[top.subLanguage]) {
                emitter.addText(modeBuffer);
                return;
              }
              result2 = _highlight(top.subLanguage, modeBuffer, true, continuations[top.subLanguage]);
              continuations[top.subLanguage] = /** @type {CompiledMode} */
              result2._top;
            } else {
              result2 = highlightAuto(modeBuffer, top.subLanguage.length ? top.subLanguage : null);
            }
            if (top.relevance > 0) {
              relevance += result2.relevance;
            }
            emitter.__addSublanguage(result2._emitter, result2.language);
          }
          function processBuffer() {
            if (top.subLanguage != null) {
              processSubLanguage();
            } else {
              processKeywords();
            }
            modeBuffer = "";
          }
          function emitKeyword(keyword, scope) {
            if (keyword === "") return;
            emitter.startScope(scope);
            emitter.addText(keyword);
            emitter.endScope();
          }
          function emitMultiClass(scope, match) {
            let i = 1;
            const max = match.length - 1;
            while (i <= max) {
              if (!scope._emit[i]) {
                i++;
                continue;
              }
              const klass = language.classNameAliases[scope[i]] || scope[i];
              const text2 = match[i];
              if (klass) {
                emitKeyword(text2, klass);
              } else {
                modeBuffer = text2;
                processKeywords();
                modeBuffer = "";
              }
              i++;
            }
          }
          function startNewMode(mode, match) {
            if (mode.scope && typeof mode.scope === "string") {
              emitter.openNode(language.classNameAliases[mode.scope] || mode.scope);
            }
            if (mode.beginScope) {
              if (mode.beginScope._wrap) {
                emitKeyword(modeBuffer, language.classNameAliases[mode.beginScope._wrap] || mode.beginScope._wrap);
                modeBuffer = "";
              } else if (mode.beginScope._multi) {
                emitMultiClass(mode.beginScope, match);
                modeBuffer = "";
              }
            }
            top = Object.create(mode, { parent: { value: top } });
            return top;
          }
          function endOfMode(mode, match, matchPlusRemainder) {
            let matched = startsWith(mode.endRe, matchPlusRemainder);
            if (matched) {
              if (mode["on:end"]) {
                const resp = new Response(mode);
                mode["on:end"](match, resp);
                if (resp.isMatchIgnored) matched = false;
              }
              if (matched) {
                while (mode.endsParent && mode.parent) {
                  mode = mode.parent;
                }
                return mode;
              }
            }
            if (mode.endsWithParent) {
              return endOfMode(mode.parent, match, matchPlusRemainder);
            }
          }
          function doIgnore(lexeme) {
            if (top.matcher.regexIndex === 0) {
              modeBuffer += lexeme[0];
              return 1;
            } else {
              resumeScanAtSamePosition = true;
              return 0;
            }
          }
          function doBeginMatch(match) {
            const lexeme = match[0];
            const newMode = match.rule;
            const resp = new Response(newMode);
            const beforeCallbacks = [newMode.__beforeBegin, newMode["on:begin"]];
            for (const cb of beforeCallbacks) {
              if (!cb) continue;
              cb(match, resp);
              if (resp.isMatchIgnored) return doIgnore(lexeme);
            }
            if (newMode.skip) {
              modeBuffer += lexeme;
            } else {
              if (newMode.excludeBegin) {
                modeBuffer += lexeme;
              }
              processBuffer();
              if (!newMode.returnBegin && !newMode.excludeBegin) {
                modeBuffer = lexeme;
              }
            }
            startNewMode(newMode, match);
            return newMode.returnBegin ? 0 : lexeme.length;
          }
          function doEndMatch(match) {
            const lexeme = match[0];
            const matchPlusRemainder = codeToHighlight.substring(match.index);
            const endMode = endOfMode(top, match, matchPlusRemainder);
            if (!endMode) {
              return NO_MATCH;
            }
            const origin = top;
            if (top.endScope && top.endScope._wrap) {
              processBuffer();
              emitKeyword(lexeme, top.endScope._wrap);
            } else if (top.endScope && top.endScope._multi) {
              processBuffer();
              emitMultiClass(top.endScope, match);
            } else if (origin.skip) {
              modeBuffer += lexeme;
            } else {
              if (!(origin.returnEnd || origin.excludeEnd)) {
                modeBuffer += lexeme;
              }
              processBuffer();
              if (origin.excludeEnd) {
                modeBuffer = lexeme;
              }
            }
            do {
              if (top.scope) {
                emitter.closeNode();
              }
              if (!top.skip && !top.subLanguage) {
                relevance += top.relevance;
              }
              top = top.parent;
            } while (top !== endMode.parent);
            if (endMode.starts) {
              startNewMode(endMode.starts, match);
            }
            return origin.returnEnd ? 0 : lexeme.length;
          }
          function processContinuations() {
            const list = [];
            for (let current = top; current !== language; current = current.parent) {
              if (current.scope) {
                list.unshift(current.scope);
              }
            }
            list.forEach((item) => emitter.openNode(item));
          }
          let lastMatch = {};
          function processLexeme(textBeforeMatch, match) {
            const lexeme = match && match[0];
            modeBuffer += textBeforeMatch;
            if (lexeme == null) {
              processBuffer();
              return 0;
            }
            if (lastMatch.type === "begin" && match.type === "end" && lastMatch.index === match.index && lexeme === "") {
              modeBuffer += codeToHighlight.slice(match.index, match.index + 1);
              if (!SAFE_MODE) {
                const err = new Error(`0 width match regex (${languageName})`);
                err.languageName = languageName;
                err.badRule = lastMatch.rule;
                throw err;
              }
              return 1;
            }
            lastMatch = match;
            if (match.type === "begin") {
              return doBeginMatch(match);
            } else if (match.type === "illegal" && !ignoreIllegals) {
              const err = new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.scope || "<unnamed>") + '"');
              err.mode = top;
              throw err;
            } else if (match.type === "end") {
              const processed = doEndMatch(match);
              if (processed !== NO_MATCH) {
                return processed;
              }
            }
            if (match.type === "illegal" && lexeme === "") {
              modeBuffer += "\n";
              return 1;
            }
            if (iterations > 1e5 && iterations > match.index * 3) {
              const err = new Error("potential infinite loop, way more iterations than matches");
              throw err;
            }
            modeBuffer += lexeme;
            return lexeme.length;
          }
          const language = getLanguage(languageName);
          if (!language) {
            error(LANGUAGE_NOT_FOUND.replace("{}", languageName));
            throw new Error('Unknown language: "' + languageName + '"');
          }
          const md = compileLanguage(language);
          let result = "";
          let top = continuation || md;
          const continuations = {};
          const emitter = new options.__emitter(options);
          processContinuations();
          let modeBuffer = "";
          let relevance = 0;
          let index = 0;
          let iterations = 0;
          let resumeScanAtSamePosition = false;
          try {
            if (!language.__emitTokens) {
              top.matcher.considerAll();
              for (; ; ) {
                iterations++;
                if (resumeScanAtSamePosition) {
                  resumeScanAtSamePosition = false;
                } else {
                  top.matcher.considerAll();
                }
                top.matcher.lastIndex = index;
                const match = top.matcher.exec(codeToHighlight);
                if (!match) break;
                const beforeMatch = codeToHighlight.substring(index, match.index);
                const processedCount = processLexeme(beforeMatch, match);
                index = match.index + processedCount;
              }
              processLexeme(codeToHighlight.substring(index));
            } else {
              language.__emitTokens(codeToHighlight, emitter);
            }
            emitter.finalize();
            result = emitter.toHTML();
            return {
              language: languageName,
              value: result,
              relevance,
              illegal: false,
              _emitter: emitter,
              _top: top
            };
          } catch (err) {
            if (err.message && err.message.includes("Illegal")) {
              return {
                language: languageName,
                value: escape(codeToHighlight),
                illegal: true,
                relevance: 0,
                _illegalBy: {
                  message: err.message,
                  index,
                  context: codeToHighlight.slice(index - 100, index + 100),
                  mode: err.mode,
                  resultSoFar: result
                },
                _emitter: emitter
              };
            } else if (SAFE_MODE) {
              return {
                language: languageName,
                value: escape(codeToHighlight),
                illegal: false,
                relevance: 0,
                errorRaised: err,
                _emitter: emitter,
                _top: top
              };
            } else {
              throw err;
            }
          }
        }
        function justTextHighlightResult(code) {
          const result = {
            value: escape(code),
            illegal: false,
            relevance: 0,
            _top: PLAINTEXT_LANGUAGE,
            _emitter: new options.__emitter(options)
          };
          result._emitter.addText(code);
          return result;
        }
        function highlightAuto(code, languageSubset) {
          languageSubset = languageSubset || options.languages || Object.keys(languages);
          const plaintext = justTextHighlightResult(code);
          const results = languageSubset.filter(getLanguage).filter(autoDetection).map(
            (name) => _highlight(name, code, false)
          );
          results.unshift(plaintext);
          const sorted = results.sort((a3, b2) => {
            if (a3.relevance !== b2.relevance) return b2.relevance - a3.relevance;
            if (a3.language && b2.language) {
              if (getLanguage(a3.language).supersetOf === b2.language) {
                return 1;
              } else if (getLanguage(b2.language).supersetOf === a3.language) {
                return -1;
              }
            }
            return 0;
          });
          const [best, secondBest] = sorted;
          const result = best;
          result.secondBest = secondBest;
          return result;
        }
        function updateClassName(element, currentLang, resultLang) {
          const language = currentLang && aliases[currentLang] || resultLang;
          element.classList.add("hljs");
          element.classList.add(`language-${language}`);
        }
        function highlightElement(element) {
          let node = null;
          const language = blockLanguage(element);
          if (shouldNotHighlight(language)) return;
          fire(
            "before:highlightElement",
            { el: element, language }
          );
          if (element.dataset.highlighted) {
            console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", element);
            return;
          }
          if (element.children.length > 0) {
            if (!options.ignoreUnescapedHTML) {
              console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk.");
              console.warn("https://github.com/highlightjs/highlight.js/wiki/security");
              console.warn("The element with unescaped HTML:");
              console.warn(element);
            }
            if (options.throwUnescapedHTML) {
              const err = new HTMLInjectionError(
                "One of your code blocks includes unescaped HTML.",
                element.innerHTML
              );
              throw err;
            }
          }
          node = element;
          const text2 = node.textContent;
          const result = language ? highlight2(text2, { language, ignoreIllegals: true }) : highlightAuto(text2);
          element.innerHTML = result.value;
          element.dataset.highlighted = "yes";
          updateClassName(element, language, result.language);
          element.result = {
            language: result.language,
            // TODO: remove with version 11.0
            re: result.relevance,
            relevance: result.relevance
          };
          if (result.secondBest) {
            element.secondBest = {
              language: result.secondBest.language,
              relevance: result.secondBest.relevance
            };
          }
          fire("after:highlightElement", { el: element, result, text: text2 });
        }
        function configure(userOptions) {
          options = inherit(options, userOptions);
        }
        const initHighlighting = () => {
          highlightAll();
          deprecated("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
        };
        function initHighlightingOnLoad() {
          highlightAll();
          deprecated("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
        }
        let wantsHighlight = false;
        function highlightAll() {
          function boot() {
            highlightAll();
          }
          if (document.readyState === "loading") {
            if (!wantsHighlight) {
              window.addEventListener("DOMContentLoaded", boot, false);
            }
            wantsHighlight = true;
            return;
          }
          const blocks = document.querySelectorAll(options.cssSelector);
          blocks.forEach(highlightElement);
        }
        function registerLanguage(languageName, languageDefinition) {
          let lang = null;
          try {
            lang = languageDefinition(hljs);
          } catch (error$1) {
            error("Language definition for '{}' could not be registered.".replace("{}", languageName));
            if (!SAFE_MODE) {
              throw error$1;
            } else {
              error(error$1);
            }
            lang = PLAINTEXT_LANGUAGE;
          }
          if (!lang.name) lang.name = languageName;
          languages[languageName] = lang;
          lang.rawDefinition = languageDefinition.bind(null, hljs);
          if (lang.aliases) {
            registerAliases(lang.aliases, { languageName });
          }
        }
        function unregisterLanguage(languageName) {
          delete languages[languageName];
          for (const alias of Object.keys(aliases)) {
            if (aliases[alias] === languageName) {
              delete aliases[alias];
            }
          }
        }
        function listLanguages() {
          return Object.keys(languages);
        }
        function getLanguage(name) {
          name = (name || "").toLowerCase();
          return languages[name] || languages[aliases[name]];
        }
        function registerAliases(aliasList, { languageName }) {
          if (typeof aliasList === "string") {
            aliasList = [aliasList];
          }
          aliasList.forEach((alias) => {
            aliases[alias.toLowerCase()] = languageName;
          });
        }
        function autoDetection(name) {
          const lang = getLanguage(name);
          return lang && !lang.disableAutodetect;
        }
        function upgradePluginAPI(plugin) {
          if (plugin["before:highlightBlock"] && !plugin["before:highlightElement"]) {
            plugin["before:highlightElement"] = (data) => {
              plugin["before:highlightBlock"](
                Object.assign({ block: data.el }, data)
              );
            };
          }
          if (plugin["after:highlightBlock"] && !plugin["after:highlightElement"]) {
            plugin["after:highlightElement"] = (data) => {
              plugin["after:highlightBlock"](
                Object.assign({ block: data.el }, data)
              );
            };
          }
        }
        function addPlugin(plugin) {
          upgradePluginAPI(plugin);
          plugins.push(plugin);
        }
        function removePlugin(plugin) {
          const index = plugins.indexOf(plugin);
          if (index !== -1) {
            plugins.splice(index, 1);
          }
        }
        function fire(event, args) {
          const cb = event;
          plugins.forEach(function(plugin) {
            if (plugin[cb]) {
              plugin[cb](args);
            }
          });
        }
        function deprecateHighlightBlock(el) {
          deprecated("10.7.0", "highlightBlock will be removed entirely in v12.0");
          deprecated("10.7.0", "Please use highlightElement now.");
          return highlightElement(el);
        }
        Object.assign(hljs, {
          highlight: highlight2,
          highlightAuto,
          highlightAll,
          highlightElement,
          // TODO: Remove with v12 API
          highlightBlock: deprecateHighlightBlock,
          configure,
          initHighlighting,
          initHighlightingOnLoad,
          registerLanguage,
          unregisterLanguage,
          listLanguages,
          getLanguage,
          registerAliases,
          autoDetection,
          inherit,
          addPlugin,
          removePlugin
        });
        hljs.debugMode = function() {
          SAFE_MODE = false;
        };
        hljs.safeMode = function() {
          SAFE_MODE = true;
        };
        hljs.versionString = version;
        hljs.regex = {
          concat,
          lookahead,
          either,
          optional,
          anyNumberOfTimes
        };
        for (const key in MODES2) {
          if (typeof MODES2[key] === "object") {
            deepFreeze(MODES2[key]);
          }
        }
        Object.assign(hljs, MODES2);
        return hljs;
      };
      var highlight = HLJS({});
      highlight.newInstance = () => HLJS({});
      module.exports = highlight;
      highlight.HighlightJS = highlight;
      highlight.default = highlight;
    }
  });

  // node_modules/marked/lib/marked.esm.js
  function M() {
    return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
  }
  var w = M();
  function H(a3) {
    w = a3;
  }
  var C = { exec: () => null };
  function h(a3, e = "") {
    let t = typeof a3 == "string" ? a3 : a3.source, n = { replace: (s, i) => {
      let r = typeof i == "string" ? i : i.source;
      return r = r.replace(m.caret, "$1"), t = t.replace(s, r), n;
    }, getRegex: () => new RegExp(t, e) };
    return n;
  }
  var m = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (a3) => new RegExp(`^( {0,3}${a3})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (a3) => new RegExp(`^ {0,${Math.min(3, a3 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (a3) => new RegExp(`^ {0,${Math.min(3, a3 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (a3) => new RegExp(`^ {0,${Math.min(3, a3 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (a3) => new RegExp(`^ {0,${Math.min(3, a3 - 1)}}#`), htmlBeginRegex: (a3) => new RegExp(`^ {0,${Math.min(3, a3 - 1)}}<(?:[a-z].*>|!--)`, "i") };
  var xe = /^(?:[ \t]*(?:\n|$))+/;
  var be = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var Te = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var I = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var we = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var j = /(?:[*+-]|\d{1,9}[.)])/;
  var re = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var ie = h(re).replace(/bull/g, j).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var ye = h(re).replace(/bull/g, j).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var F = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var Re = /^[^\n]+/;
  var Q = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var Se = h(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Q).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var $e = h(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, j).getRegex();
  var v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var U = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var _e = h("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var oe = h(F).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var Le = h(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", oe).getRegex();
  var K = { blockquote: Le, code: be, def: Se, fences: Te, heading: we, hr: I, html: _e, lheading: ie, list: $e, newline: xe, paragraph: oe, table: C, text: Re };
  var se = h("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
  var ze = { ...K, lheading: ye, table: se, paragraph: h(F).replace("hr", I).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", se).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex() };
  var Me = { ...K, html: h(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: C, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h(F).replace("hr", I).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", ie).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
  var Pe = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var Ae = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var le = /^( {2,}|\\)\n(?!\s*$)/;
  var Ee = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var D = /[\p{P}\p{S}]/u;
  var X = /[\s\p{P}\p{S}]/u;
  var ae = /[^\s\p{P}\p{S}]/u;
  var Ce = h(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, X).getRegex();
  var ce = /(?!~)[\p{P}\p{S}]/u;
  var Ie = /(?!~)[\s\p{P}\p{S}]/u;
  var Oe = /(?:[^\s\p{P}\p{S}]|~)/u;
  var Be = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
  var pe = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var qe = h(pe, "u").replace(/punct/g, D).getRegex();
  var ve = h(pe, "u").replace(/punct/g, ce).getRegex();
  var ue = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var De = h(ue, "gu").replace(/notPunctSpace/g, ae).replace(/punctSpace/g, X).replace(/punct/g, D).getRegex();
  var Ze = h(ue, "gu").replace(/notPunctSpace/g, Oe).replace(/punctSpace/g, Ie).replace(/punct/g, ce).getRegex();
  var Ge = h("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ae).replace(/punctSpace/g, X).replace(/punct/g, D).getRegex();
  var He = h(/\\(punct)/, "gu").replace(/punct/g, D).getRegex();
  var Ne = h(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var je = h(U).replace("(?:-->|$)", "-->").getRegex();
  var Fe = h("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", je).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var q = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var Qe = h(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var he = h(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", Q).getRegex();
  var ke = h(/^!?\[(ref)\](?:\[\])?/).replace("ref", Q).getRegex();
  var Ue = h("reflink|nolink(?!\\()", "g").replace("reflink", he).replace("nolink", ke).getRegex();
  var W = { _backpedal: C, anyPunctuation: He, autolink: Ne, blockSkip: Be, br: le, code: Ae, del: C, emStrongLDelim: qe, emStrongRDelimAst: De, emStrongRDelimUnd: Ge, escape: Pe, link: Qe, nolink: ke, punctuation: Ce, reflink: he, reflinkSearch: Ue, tag: Fe, text: Ee, url: C };
  var Ke = { ...W, link: h(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: h(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
  var N = { ...W, emStrongRDelimAst: Ze, emStrongLDelim: ve, url: h(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/, text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/ };
  var Xe = { ...N, br: h(le).replace("{2,}", "*").getRegex(), text: h(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
  var O = { normal: K, gfm: ze, pedantic: Me };
  var P = { normal: W, gfm: N, breaks: Xe, pedantic: Ke };
  var We = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  var ge = (a3) => We[a3];
  function R(a3, e) {
    if (e) {
      if (m.escapeTest.test(a3)) return a3.replace(m.escapeReplace, ge);
    } else if (m.escapeTestNoEncode.test(a3)) return a3.replace(m.escapeReplaceNoEncode, ge);
    return a3;
  }
  function J(a3) {
    try {
      a3 = encodeURI(a3).replace(m.percentDecode, "%");
    } catch {
      return null;
    }
    return a3;
  }
  function V(a3, e) {
    let t = a3.replace(m.findPipe, (i, r, o) => {
      let l = false, c = r;
      for (; --c >= 0 && o[c] === "\\"; ) l = !l;
      return l ? "|" : " |";
    }), n = t.split(m.splitPipe), s = 0;
    if (n[0].trim() || n.shift(), n.length > 0 && !n.at(-1)?.trim() && n.pop(), e) if (n.length > e) n.splice(e);
    else for (; n.length < e; ) n.push("");
    for (; s < n.length; s++) n[s] = n[s].trim().replace(m.slashPipe, "|");
    return n;
  }
  function A(a3, e, t) {
    let n = a3.length;
    if (n === 0) return "";
    let s = 0;
    for (; s < n; ) {
      let i = a3.charAt(n - s - 1);
      if (i === e && !t) s++;
      else if (i !== e && t) s++;
      else break;
    }
    return a3.slice(0, n - s);
  }
  function fe(a3, e) {
    if (a3.indexOf(e[1]) === -1) return -1;
    let t = 0;
    for (let n = 0; n < a3.length; n++) if (a3[n] === "\\") n++;
    else if (a3[n] === e[0]) t++;
    else if (a3[n] === e[1] && (t--, t < 0)) return n;
    return t > 0 ? -2 : -1;
  }
  function de(a3, e, t, n, s) {
    let i = e.href, r = e.title || null, o = a3[1].replace(s.other.outputLinkReplace, "$1");
    n.state.inLink = true;
    let l = { type: a3[0].charAt(0) === "!" ? "image" : "link", raw: t, href: i, title: r, text: o, tokens: n.inlineTokens(o) };
    return n.state.inLink = false, l;
  }
  function Je(a3, e, t) {
    let n = a3.match(t.other.indentCodeCompensation);
    if (n === null) return e;
    let s = n[1];
    return e.split(`
`).map((i) => {
      let r = i.match(t.other.beginningSpace);
      if (r === null) return i;
      let [o] = r;
      return o.length >= s.length ? i.slice(s.length) : i;
    }).join(`
`);
  }
  var S = class {
    options;
    rules;
    lexer;
    constructor(e) {
      this.options = e || w;
    }
    space(e) {
      let t = this.rules.block.newline.exec(e);
      if (t && t[0].length > 0) return { type: "space", raw: t[0] };
    }
    code(e) {
      let t = this.rules.block.code.exec(e);
      if (t) {
        let n = t[0].replace(this.rules.other.codeRemoveIndent, "");
        return { type: "code", raw: t[0], codeBlockStyle: "indented", text: this.options.pedantic ? n : A(n, `
`) };
      }
    }
    fences(e) {
      let t = this.rules.block.fences.exec(e);
      if (t) {
        let n = t[0], s = Je(n, t[3] || "", this.rules);
        return { type: "code", raw: n, lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2], text: s };
      }
    }
    heading(e) {
      let t = this.rules.block.heading.exec(e);
      if (t) {
        let n = t[2].trim();
        if (this.rules.other.endingHash.test(n)) {
          let s = A(n, "#");
          (this.options.pedantic || !s || this.rules.other.endingSpaceChar.test(s)) && (n = s.trim());
        }
        return { type: "heading", raw: t[0], depth: t[1].length, text: n, tokens: this.lexer.inline(n) };
      }
    }
    hr(e) {
      let t = this.rules.block.hr.exec(e);
      if (t) return { type: "hr", raw: A(t[0], `
`) };
    }
    blockquote(e) {
      let t = this.rules.block.blockquote.exec(e);
      if (t) {
        let n = A(t[0], `
`).split(`
`), s = "", i = "", r = [];
        for (; n.length > 0; ) {
          let o = false, l = [], c;
          for (c = 0; c < n.length; c++) if (this.rules.other.blockquoteStart.test(n[c])) l.push(n[c]), o = true;
          else if (!o) l.push(n[c]);
          else break;
          n = n.slice(c);
          let p = l.join(`
`), u = p.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
          s = s ? `${s}
${p}` : p, i = i ? `${i}
${u}` : u;
          let d = this.lexer.state.top;
          if (this.lexer.state.top = true, this.lexer.blockTokens(u, r, true), this.lexer.state.top = d, n.length === 0) break;
          let g = r.at(-1);
          if (g?.type === "code") break;
          if (g?.type === "blockquote") {
            let x = g, f = x.raw + `
` + n.join(`
`), y = this.blockquote(f);
            r[r.length - 1] = y, s = s.substring(0, s.length - x.raw.length) + y.raw, i = i.substring(0, i.length - x.text.length) + y.text;
            break;
          } else if (g?.type === "list") {
            let x = g, f = x.raw + `
` + n.join(`
`), y = this.list(f);
            r[r.length - 1] = y, s = s.substring(0, s.length - g.raw.length) + y.raw, i = i.substring(0, i.length - x.raw.length) + y.raw, n = f.substring(r.at(-1).raw.length).split(`
`);
            continue;
          }
        }
        return { type: "blockquote", raw: s, tokens: r, text: i };
      }
    }
    list(e) {
      let t = this.rules.block.list.exec(e);
      if (t) {
        let n = t[1].trim(), s = n.length > 1, i = { type: "list", raw: "", ordered: s, start: s ? +n.slice(0, -1) : "", loose: false, items: [] };
        n = s ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`, this.options.pedantic && (n = s ? n : "[*+-]");
        let r = this.rules.other.listItemRegex(n), o = false;
        for (; e; ) {
          let c = false, p = "", u = "";
          if (!(t = r.exec(e)) || this.rules.block.hr.test(e)) break;
          p = t[0], e = e.substring(p.length);
          let d = t[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (Z) => " ".repeat(3 * Z.length)), g = e.split(`
`, 1)[0], x = !d.trim(), f = 0;
          if (this.options.pedantic ? (f = 2, u = d.trimStart()) : x ? f = t[1].length + 1 : (f = t[2].search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, u = d.slice(f), f += t[1].length), x && this.rules.other.blankLine.test(g) && (p += g + `
`, e = e.substring(g.length + 1), c = true), !c) {
            let Z = this.rules.other.nextBulletRegex(f), ee = this.rules.other.hrRegex(f), te = this.rules.other.fencesBeginRegex(f), ne = this.rules.other.headingBeginRegex(f), me = this.rules.other.htmlBeginRegex(f);
            for (; e; ) {
              let G = e.split(`
`, 1)[0], E;
              if (g = G, this.options.pedantic ? (g = g.replace(this.rules.other.listReplaceNesting, "  "), E = g) : E = g.replace(this.rules.other.tabCharGlobal, "    "), te.test(g) || ne.test(g) || me.test(g) || Z.test(g) || ee.test(g)) break;
              if (E.search(this.rules.other.nonSpaceChar) >= f || !g.trim()) u += `
` + E.slice(f);
              else {
                if (x || d.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te.test(d) || ne.test(d) || ee.test(d)) break;
                u += `
` + g;
              }
              !x && !g.trim() && (x = true), p += G + `
`, e = e.substring(G.length + 1), d = E.slice(f);
            }
          }
          i.loose || (o ? i.loose = true : this.rules.other.doubleBlankLine.test(p) && (o = true));
          let y = null, Y;
          this.options.gfm && (y = this.rules.other.listIsTask.exec(u), y && (Y = y[0] !== "[ ] ", u = u.replace(this.rules.other.listReplaceTask, ""))), i.items.push({ type: "list_item", raw: p, task: !!y, checked: Y, loose: false, text: u, tokens: [] }), i.raw += p;
        }
        let l = i.items.at(-1);
        if (l) l.raw = l.raw.trimEnd(), l.text = l.text.trimEnd();
        else return;
        i.raw = i.raw.trimEnd();
        for (let c = 0; c < i.items.length; c++) if (this.lexer.state.top = false, i.items[c].tokens = this.lexer.blockTokens(i.items[c].text, []), !i.loose) {
          let p = i.items[c].tokens.filter((d) => d.type === "space"), u = p.length > 0 && p.some((d) => this.rules.other.anyLine.test(d.raw));
          i.loose = u;
        }
        if (i.loose) for (let c = 0; c < i.items.length; c++) i.items[c].loose = true;
        return i;
      }
    }
    html(e) {
      let t = this.rules.block.html.exec(e);
      if (t) return { type: "html", block: true, raw: t[0], pre: t[1] === "pre" || t[1] === "script" || t[1] === "style", text: t[0] };
    }
    def(e) {
      let t = this.rules.block.def.exec(e);
      if (t) {
        let n = t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), s = t[2] ? t[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
        return { type: "def", tag: n, raw: t[0], href: s, title: i };
      }
    }
    table(e) {
      let t = this.rules.block.table.exec(e);
      if (!t || !this.rules.other.tableDelimiter.test(t[2])) return;
      let n = V(t[1]), s = t[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t[3]?.trim() ? t[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], r = { type: "table", raw: t[0], header: [], align: [], rows: [] };
      if (n.length === s.length) {
        for (let o of s) this.rules.other.tableAlignRight.test(o) ? r.align.push("right") : this.rules.other.tableAlignCenter.test(o) ? r.align.push("center") : this.rules.other.tableAlignLeft.test(o) ? r.align.push("left") : r.align.push(null);
        for (let o = 0; o < n.length; o++) r.header.push({ text: n[o], tokens: this.lexer.inline(n[o]), header: true, align: r.align[o] });
        for (let o of i) r.rows.push(V(o, r.header.length).map((l, c) => ({ text: l, tokens: this.lexer.inline(l), header: false, align: r.align[c] })));
        return r;
      }
    }
    lheading(e) {
      let t = this.rules.block.lheading.exec(e);
      if (t) return { type: "heading", raw: t[0], depth: t[2].charAt(0) === "=" ? 1 : 2, text: t[1], tokens: this.lexer.inline(t[1]) };
    }
    paragraph(e) {
      let t = this.rules.block.paragraph.exec(e);
      if (t) {
        let n = t[1].charAt(t[1].length - 1) === `
` ? t[1].slice(0, -1) : t[1];
        return { type: "paragraph", raw: t[0], text: n, tokens: this.lexer.inline(n) };
      }
    }
    text(e) {
      let t = this.rules.block.text.exec(e);
      if (t) return { type: "text", raw: t[0], text: t[0], tokens: this.lexer.inline(t[0]) };
    }
    escape(e) {
      let t = this.rules.inline.escape.exec(e);
      if (t) return { type: "escape", raw: t[0], text: t[1] };
    }
    tag(e) {
      let t = this.rules.inline.tag.exec(e);
      if (t) return !this.lexer.state.inLink && this.rules.other.startATag.test(t[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t[0] };
    }
    link(e) {
      let t = this.rules.inline.link.exec(e);
      if (t) {
        let n = t[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n)) {
          if (!this.rules.other.endAngleBracket.test(n)) return;
          let r = A(n.slice(0, -1), "\\");
          if ((n.length - r.length) % 2 === 0) return;
        } else {
          let r = fe(t[2], "()");
          if (r === -2) return;
          if (r > -1) {
            let l = (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + r;
            t[2] = t[2].substring(0, r), t[0] = t[0].substring(0, l).trim(), t[3] = "";
          }
        }
        let s = t[2], i = "";
        if (this.options.pedantic) {
          let r = this.rules.other.pedanticHrefTitle.exec(s);
          r && (s = r[1], i = r[3]);
        } else i = t[3] ? t[3].slice(1, -1) : "";
        return s = s.trim(), this.rules.other.startAngleBracket.test(s) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n) ? s = s.slice(1) : s = s.slice(1, -1)), de(t, { href: s && s.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t[0], this.lexer, this.rules);
      }
    }
    reflink(e, t) {
      let n;
      if ((n = this.rules.inline.reflink.exec(e)) || (n = this.rules.inline.nolink.exec(e))) {
        let s = (n[2] || n[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t[s.toLowerCase()];
        if (!i) {
          let r = n[0].charAt(0);
          return { type: "text", raw: r, text: r };
        }
        return de(n, i, n[0], this.lexer, this.rules);
      }
    }
    emStrong(e, t, n = "") {
      let s = this.rules.inline.emStrongLDelim.exec(e);
      if (!s || s[3] && n.match(this.rules.other.unicodeAlphaNumeric)) return;
      if (!(s[1] || s[2] || "") || !n || this.rules.inline.punctuation.exec(n)) {
        let r = [...s[0]].length - 1, o, l, c = r, p = 0, u = s[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        for (u.lastIndex = 0, t = t.slice(-1 * e.length + r); (s = u.exec(t)) != null; ) {
          if (o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6], !o) continue;
          if (l = [...o].length, s[3] || s[4]) {
            c += l;
            continue;
          } else if ((s[5] || s[6]) && r % 3 && !((r + l) % 3)) {
            p += l;
            continue;
          }
          if (c -= l, c > 0) continue;
          l = Math.min(l, l + c + p);
          let d = [...s[0]][0].length, g = e.slice(0, r + s.index + d + l);
          if (Math.min(r, l) % 2) {
            let f = g.slice(1, -1);
            return { type: "em", raw: g, text: f, tokens: this.lexer.inlineTokens(f) };
          }
          let x = g.slice(2, -2);
          return { type: "strong", raw: g, text: x, tokens: this.lexer.inlineTokens(x) };
        }
      }
    }
    codespan(e) {
      let t = this.rules.inline.code.exec(e);
      if (t) {
        let n = t[2].replace(this.rules.other.newLineCharGlobal, " "), s = this.rules.other.nonSpaceChar.test(n), i = this.rules.other.startingSpaceChar.test(n) && this.rules.other.endingSpaceChar.test(n);
        return s && i && (n = n.substring(1, n.length - 1)), { type: "codespan", raw: t[0], text: n };
      }
    }
    br(e) {
      let t = this.rules.inline.br.exec(e);
      if (t) return { type: "br", raw: t[0] };
    }
    del(e) {
      let t = this.rules.inline.del.exec(e);
      if (t) return { type: "del", raw: t[0], text: t[2], tokens: this.lexer.inlineTokens(t[2]) };
    }
    autolink(e) {
      let t = this.rules.inline.autolink.exec(e);
      if (t) {
        let n, s;
        return t[2] === "@" ? (n = t[1], s = "mailto:" + n) : (n = t[1], s = n), { type: "link", raw: t[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    url(e) {
      let t;
      if (t = this.rules.inline.url.exec(e)) {
        let n, s;
        if (t[2] === "@") n = t[0], s = "mailto:" + n;
        else {
          let i;
          do
            i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? "";
          while (i !== t[0]);
          n = t[0], t[1] === "www." ? s = "http://" + t[0] : s = t[0];
        }
        return { type: "link", raw: t[0], text: n, href: s, tokens: [{ type: "text", raw: n, text: n }] };
      }
    }
    inlineText(e) {
      let t = this.rules.inline.text.exec(e);
      if (t) {
        let n = this.lexer.state.inRawBlock;
        return { type: "text", raw: t[0], text: t[0], escaped: n };
      }
    }
  };
  var b = class a {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(e) {
      this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e || w, this.options.tokenizer = this.options.tokenizer || new S(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
      let t = { other: m, block: O.normal, inline: P.normal };
      this.options.pedantic ? (t.block = O.pedantic, t.inline = P.pedantic) : this.options.gfm && (t.block = O.gfm, this.options.breaks ? t.inline = P.breaks : t.inline = P.gfm), this.tokenizer.rules = t;
    }
    static get rules() {
      return { block: O, inline: P };
    }
    static lex(e, t) {
      return new a(t).lex(e);
    }
    static lexInline(e, t) {
      return new a(t).inlineTokens(e);
    }
    lex(e) {
      e = e.replace(m.carriageReturn, `
`), this.blockTokens(e, this.tokens);
      for (let t = 0; t < this.inlineQueue.length; t++) {
        let n = this.inlineQueue[t];
        this.inlineTokens(n.src, n.tokens);
      }
      return this.inlineQueue = [], this.tokens;
    }
    blockTokens(e, t = [], n = false) {
      for (this.options.pedantic && (e = e.replace(m.tabCharGlobal, "    ").replace(m.spaceLine, "")); e; ) {
        let s;
        if (this.options.extensions?.block?.some((r) => (s = r.call({ lexer: this }, e, t)) ? (e = e.substring(s.raw.length), t.push(s), true) : false)) continue;
        if (s = this.tokenizer.space(e)) {
          e = e.substring(s.raw.length);
          let r = t.at(-1);
          s.raw.length === 1 && r !== void 0 ? r.raw += `
` : t.push(s);
          continue;
        }
        if (s = this.tokenizer.code(e)) {
          e = e.substring(s.raw.length);
          let r = t.at(-1);
          r?.type === "paragraph" || r?.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.at(-1).src = r.text) : t.push(s);
          continue;
        }
        if (s = this.tokenizer.fences(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        if (s = this.tokenizer.heading(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        if (s = this.tokenizer.hr(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        if (s = this.tokenizer.blockquote(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        if (s = this.tokenizer.list(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        if (s = this.tokenizer.html(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        if (s = this.tokenizer.def(e)) {
          e = e.substring(s.raw.length);
          let r = t.at(-1);
          r?.type === "paragraph" || r?.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.raw, this.inlineQueue.at(-1).src = r.text) : this.tokens.links[s.tag] || (this.tokens.links[s.tag] = { href: s.href, title: s.title });
          continue;
        }
        if (s = this.tokenizer.table(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        if (s = this.tokenizer.lheading(e)) {
          e = e.substring(s.raw.length), t.push(s);
          continue;
        }
        let i = e;
        if (this.options.extensions?.startBlock) {
          let r = 1 / 0, o = e.slice(1), l;
          this.options.extensions.startBlock.forEach((c) => {
            l = c.call({ lexer: this }, o), typeof l == "number" && l >= 0 && (r = Math.min(r, l));
          }), r < 1 / 0 && r >= 0 && (i = e.substring(0, r + 1));
        }
        if (this.state.top && (s = this.tokenizer.paragraph(i))) {
          let r = t.at(-1);
          n && r?.type === "paragraph" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(s), n = i.length !== e.length, e = e.substring(s.raw.length);
          continue;
        }
        if (s = this.tokenizer.text(e)) {
          e = e.substring(s.raw.length);
          let r = t.at(-1);
          r?.type === "text" ? (r.raw += `
` + s.raw, r.text += `
` + s.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = r.text) : t.push(s);
          continue;
        }
        if (e) {
          let r = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(r);
            break;
          } else throw new Error(r);
        }
      }
      return this.state.top = true, t;
    }
    inline(e, t = []) {
      return this.inlineQueue.push({ src: e, tokens: t }), t;
    }
    inlineTokens(e, t = []) {
      let n = e, s = null;
      if (this.tokens.links) {
        let o = Object.keys(this.tokens.links);
        if (o.length > 0) for (; (s = this.tokenizer.rules.inline.reflinkSearch.exec(n)) != null; ) o.includes(s[0].slice(s[0].lastIndexOf("[") + 1, -1)) && (n = n.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (s = this.tokenizer.rules.inline.anyPunctuation.exec(n)) != null; ) n = n.slice(0, s.index) + "++" + n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      for (; (s = this.tokenizer.rules.inline.blockSkip.exec(n)) != null; ) n = n.slice(0, s.index) + "[" + "a".repeat(s[0].length - 2) + "]" + n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      let i = false, r = "";
      for (; e; ) {
        i || (r = ""), i = false;
        let o;
        if (this.options.extensions?.inline?.some((c) => (o = c.call({ lexer: this }, e, t)) ? (e = e.substring(o.raw.length), t.push(o), true) : false)) continue;
        if (o = this.tokenizer.escape(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.tag(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.link(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.reflink(e, this.tokens.links)) {
          e = e.substring(o.raw.length);
          let c = t.at(-1);
          o.type === "text" && c?.type === "text" ? (c.raw += o.raw, c.text += o.text) : t.push(o);
          continue;
        }
        if (o = this.tokenizer.emStrong(e, n, r)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.codespan(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.br(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.del(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (o = this.tokenizer.autolink(e)) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        if (!this.state.inLink && (o = this.tokenizer.url(e))) {
          e = e.substring(o.raw.length), t.push(o);
          continue;
        }
        let l = e;
        if (this.options.extensions?.startInline) {
          let c = 1 / 0, p = e.slice(1), u;
          this.options.extensions.startInline.forEach((d) => {
            u = d.call({ lexer: this }, p), typeof u == "number" && u >= 0 && (c = Math.min(c, u));
          }), c < 1 / 0 && c >= 0 && (l = e.substring(0, c + 1));
        }
        if (o = this.tokenizer.inlineText(l)) {
          e = e.substring(o.raw.length), o.raw.slice(-1) !== "_" && (r = o.raw.slice(-1)), i = true;
          let c = t.at(-1);
          c?.type === "text" ? (c.raw += o.raw, c.text += o.text) : t.push(o);
          continue;
        }
        if (e) {
          let c = "Infinite loop on byte: " + e.charCodeAt(0);
          if (this.options.silent) {
            console.error(c);
            break;
          } else throw new Error(c);
        }
      }
      return t;
    }
  };
  var $ = class {
    options;
    parser;
    constructor(e) {
      this.options = e || w;
    }
    space(e) {
      return "";
    }
    code({ text: e, lang: t, escaped: n }) {
      let s = (t || "").match(m.notSpaceStart)?.[0], i = e.replace(m.endingNewline, "") + `
`;
      return s ? '<pre><code class="language-' + R(s) + '">' + (n ? i : R(i, true)) + `</code></pre>
` : "<pre><code>" + (n ? i : R(i, true)) + `</code></pre>
`;
    }
    blockquote({ tokens: e }) {
      return `<blockquote>
${this.parser.parse(e)}</blockquote>
`;
    }
    html({ text: e }) {
      return e;
    }
    heading({ tokens: e, depth: t }) {
      return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`;
    }
    hr(e) {
      return `<hr>
`;
    }
    list(e) {
      let t = e.ordered, n = e.start, s = "";
      for (let o = 0; o < e.items.length; o++) {
        let l = e.items[o];
        s += this.listitem(l);
      }
      let i = t ? "ol" : "ul", r = t && n !== 1 ? ' start="' + n + '"' : "";
      return "<" + i + r + `>
` + s + "</" + i + `>
`;
    }
    listitem(e) {
      let t = "";
      if (e.task) {
        let n = this.checkbox({ checked: !!e.checked });
        e.loose ? e.tokens[0]?.type === "paragraph" ? (e.tokens[0].text = n + " " + e.tokens[0].text, e.tokens[0].tokens && e.tokens[0].tokens.length > 0 && e.tokens[0].tokens[0].type === "text" && (e.tokens[0].tokens[0].text = n + " " + R(e.tokens[0].tokens[0].text), e.tokens[0].tokens[0].escaped = true)) : e.tokens.unshift({ type: "text", raw: n + " ", text: n + " ", escaped: true }) : t += n + " ";
      }
      return t += this.parser.parse(e.tokens, !!e.loose), `<li>${t}</li>
`;
    }
    checkbox({ checked: e }) {
      return "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens: e }) {
      return `<p>${this.parser.parseInline(e)}</p>
`;
    }
    table(e) {
      let t = "", n = "";
      for (let i = 0; i < e.header.length; i++) n += this.tablecell(e.header[i]);
      t += this.tablerow({ text: n });
      let s = "";
      for (let i = 0; i < e.rows.length; i++) {
        let r = e.rows[i];
        n = "";
        for (let o = 0; o < r.length; o++) n += this.tablecell(r[o]);
        s += this.tablerow({ text: n });
      }
      return s && (s = `<tbody>${s}</tbody>`), `<table>
<thead>
` + t + `</thead>
` + s + `</table>
`;
    }
    tablerow({ text: e }) {
      return `<tr>
${e}</tr>
`;
    }
    tablecell(e) {
      let t = this.parser.parseInline(e.tokens), n = e.header ? "th" : "td";
      return (e.align ? `<${n} align="${e.align}">` : `<${n}>`) + t + `</${n}>
`;
    }
    strong({ tokens: e }) {
      return `<strong>${this.parser.parseInline(e)}</strong>`;
    }
    em({ tokens: e }) {
      return `<em>${this.parser.parseInline(e)}</em>`;
    }
    codespan({ text: e }) {
      return `<code>${R(e, true)}</code>`;
    }
    br(e) {
      return "<br>";
    }
    del({ tokens: e }) {
      return `<del>${this.parser.parseInline(e)}</del>`;
    }
    link({ href: e, title: t, tokens: n }) {
      let s = this.parser.parseInline(n), i = J(e);
      if (i === null) return s;
      e = i;
      let r = '<a href="' + e + '"';
      return t && (r += ' title="' + R(t) + '"'), r += ">" + s + "</a>", r;
    }
    image({ href: e, title: t, text: n, tokens: s }) {
      s && (n = this.parser.parseInline(s, this.parser.textRenderer));
      let i = J(e);
      if (i === null) return R(n);
      e = i;
      let r = `<img src="${e}" alt="${n}"`;
      return t && (r += ` title="${R(t)}"`), r += ">", r;
    }
    text(e) {
      return "tokens" in e && e.tokens ? this.parser.parseInline(e.tokens) : "escaped" in e && e.escaped ? e.text : R(e.text);
    }
  };
  var _ = class {
    strong({ text: e }) {
      return e;
    }
    em({ text: e }) {
      return e;
    }
    codespan({ text: e }) {
      return e;
    }
    del({ text: e }) {
      return e;
    }
    html({ text: e }) {
      return e;
    }
    text({ text: e }) {
      return e;
    }
    link({ text: e }) {
      return "" + e;
    }
    image({ text: e }) {
      return "" + e;
    }
    br() {
      return "";
    }
  };
  var T = class a2 {
    options;
    renderer;
    textRenderer;
    constructor(e) {
      this.options = e || w, this.options.renderer = this.options.renderer || new $(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new _();
    }
    static parse(e, t) {
      return new a2(t).parse(e);
    }
    static parseInline(e, t) {
      return new a2(t).parseInline(e);
    }
    parse(e, t = true) {
      let n = "";
      for (let s = 0; s < e.length; s++) {
        let i = e[s];
        if (this.options.extensions?.renderers?.[i.type]) {
          let o = i, l = this.options.extensions.renderers[o.type].call({ parser: this }, o);
          if (l !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(o.type)) {
            n += l || "";
            continue;
          }
        }
        let r = i;
        switch (r.type) {
          case "space": {
            n += this.renderer.space(r);
            continue;
          }
          case "hr": {
            n += this.renderer.hr(r);
            continue;
          }
          case "heading": {
            n += this.renderer.heading(r);
            continue;
          }
          case "code": {
            n += this.renderer.code(r);
            continue;
          }
          case "table": {
            n += this.renderer.table(r);
            continue;
          }
          case "blockquote": {
            n += this.renderer.blockquote(r);
            continue;
          }
          case "list": {
            n += this.renderer.list(r);
            continue;
          }
          case "html": {
            n += this.renderer.html(r);
            continue;
          }
          case "paragraph": {
            n += this.renderer.paragraph(r);
            continue;
          }
          case "text": {
            let o = r, l = this.renderer.text(o);
            for (; s + 1 < e.length && e[s + 1].type === "text"; ) o = e[++s], l += `
` + this.renderer.text(o);
            t ? n += this.renderer.paragraph({ type: "paragraph", raw: l, text: l, tokens: [{ type: "text", raw: l, text: l, escaped: true }] }) : n += l;
            continue;
          }
          default: {
            let o = 'Token with "' + r.type + '" type was not found.';
            if (this.options.silent) return console.error(o), "";
            throw new Error(o);
          }
        }
      }
      return n;
    }
    parseInline(e, t = this.renderer) {
      let n = "";
      for (let s = 0; s < e.length; s++) {
        let i = e[s];
        if (this.options.extensions?.renderers?.[i.type]) {
          let o = this.options.extensions.renderers[i.type].call({ parser: this }, i);
          if (o !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
            n += o || "";
            continue;
          }
        }
        let r = i;
        switch (r.type) {
          case "escape": {
            n += t.text(r);
            break;
          }
          case "html": {
            n += t.html(r);
            break;
          }
          case "link": {
            n += t.link(r);
            break;
          }
          case "image": {
            n += t.image(r);
            break;
          }
          case "strong": {
            n += t.strong(r);
            break;
          }
          case "em": {
            n += t.em(r);
            break;
          }
          case "codespan": {
            n += t.codespan(r);
            break;
          }
          case "br": {
            n += t.br(r);
            break;
          }
          case "del": {
            n += t.del(r);
            break;
          }
          case "text": {
            n += t.text(r);
            break;
          }
          default: {
            let o = 'Token with "' + r.type + '" type was not found.';
            if (this.options.silent) return console.error(o), "";
            throw new Error(o);
          }
        }
      }
      return n;
    }
  };
  var L = class {
    options;
    block;
    constructor(e) {
      this.options = e || w;
    }
    static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
    preprocess(e) {
      return e;
    }
    postprocess(e) {
      return e;
    }
    processAllTokens(e) {
      return e;
    }
    provideLexer() {
      return this.block ? b.lex : b.lexInline;
    }
    provideParser() {
      return this.block ? T.parse : T.parseInline;
    }
  };
  var B = class {
    defaults = M();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = T;
    Renderer = $;
    TextRenderer = _;
    Lexer = b;
    Tokenizer = S;
    Hooks = L;
    constructor(...e) {
      this.use(...e);
    }
    walkTokens(e, t) {
      let n = [];
      for (let s of e) switch (n = n.concat(t.call(this, s)), s.type) {
        case "table": {
          let i = s;
          for (let r of i.header) n = n.concat(this.walkTokens(r.tokens, t));
          for (let r of i.rows) for (let o of r) n = n.concat(this.walkTokens(o.tokens, t));
          break;
        }
        case "list": {
          let i = s;
          n = n.concat(this.walkTokens(i.items, t));
          break;
        }
        default: {
          let i = s;
          this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((r) => {
            let o = i[r].flat(1 / 0);
            n = n.concat(this.walkTokens(o, t));
          }) : i.tokens && (n = n.concat(this.walkTokens(i.tokens, t)));
        }
      }
      return n;
    }
    use(...e) {
      let t = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return e.forEach((n) => {
        let s = { ...n };
        if (s.async = this.defaults.async || s.async || false, n.extensions && (n.extensions.forEach((i) => {
          if (!i.name) throw new Error("extension name required");
          if ("renderer" in i) {
            let r = t.renderers[i.name];
            r ? t.renderers[i.name] = function(...o) {
              let l = i.renderer.apply(this, o);
              return l === false && (l = r.apply(this, o)), l;
            } : t.renderers[i.name] = i.renderer;
          }
          if ("tokenizer" in i) {
            if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
            let r = t[i.level];
            r ? r.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : i.level === "inline" && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]));
          }
          "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens);
        }), s.extensions = t), n.renderer) {
          let i = this.defaults.renderer || new $(this.defaults);
          for (let r in n.renderer) {
            if (!(r in i)) throw new Error(`renderer '${r}' does not exist`);
            if (["options", "parser"].includes(r)) continue;
            let o = r, l = n.renderer[o], c = i[o];
            i[o] = (...p) => {
              let u = l.apply(i, p);
              return u === false && (u = c.apply(i, p)), u || "";
            };
          }
          s.renderer = i;
        }
        if (n.tokenizer) {
          let i = this.defaults.tokenizer || new S(this.defaults);
          for (let r in n.tokenizer) {
            if (!(r in i)) throw new Error(`tokenizer '${r}' does not exist`);
            if (["options", "rules", "lexer"].includes(r)) continue;
            let o = r, l = n.tokenizer[o], c = i[o];
            i[o] = (...p) => {
              let u = l.apply(i, p);
              return u === false && (u = c.apply(i, p)), u;
            };
          }
          s.tokenizer = i;
        }
        if (n.hooks) {
          let i = this.defaults.hooks || new L();
          for (let r in n.hooks) {
            if (!(r in i)) throw new Error(`hook '${r}' does not exist`);
            if (["options", "block"].includes(r)) continue;
            let o = r, l = n.hooks[o], c = i[o];
            L.passThroughHooks.has(r) ? i[o] = (p) => {
              if (this.defaults.async) return Promise.resolve(l.call(i, p)).then((d) => c.call(i, d));
              let u = l.call(i, p);
              return c.call(i, u);
            } : i[o] = (...p) => {
              let u = l.apply(i, p);
              return u === false && (u = c.apply(i, p)), u;
            };
          }
          s.hooks = i;
        }
        if (n.walkTokens) {
          let i = this.defaults.walkTokens, r = n.walkTokens;
          s.walkTokens = function(o) {
            let l = [];
            return l.push(r.call(this, o)), i && (l = l.concat(i.call(this, o))), l;
          };
        }
        this.defaults = { ...this.defaults, ...s };
      }), this;
    }
    setOptions(e) {
      return this.defaults = { ...this.defaults, ...e }, this;
    }
    lexer(e, t) {
      return b.lex(e, t ?? this.defaults);
    }
    parser(e, t) {
      return T.parse(e, t ?? this.defaults);
    }
    parseMarkdown(e) {
      return (n, s) => {
        let i = { ...s }, r = { ...this.defaults, ...i }, o = this.onError(!!r.silent, !!r.async);
        if (this.defaults.async === true && i.async === false) return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        if (typeof n > "u" || n === null) return o(new Error("marked(): input parameter is undefined or null"));
        if (typeof n != "string") return o(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n) + ", string expected"));
        r.hooks && (r.hooks.options = r, r.hooks.block = e);
        let l = r.hooks ? r.hooks.provideLexer() : e ? b.lex : b.lexInline, c = r.hooks ? r.hooks.provideParser() : e ? T.parse : T.parseInline;
        if (r.async) return Promise.resolve(r.hooks ? r.hooks.preprocess(n) : n).then((p) => l(p, r)).then((p) => r.hooks ? r.hooks.processAllTokens(p) : p).then((p) => r.walkTokens ? Promise.all(this.walkTokens(p, r.walkTokens)).then(() => p) : p).then((p) => c(p, r)).then((p) => r.hooks ? r.hooks.postprocess(p) : p).catch(o);
        try {
          r.hooks && (n = r.hooks.preprocess(n));
          let p = l(n, r);
          r.hooks && (p = r.hooks.processAllTokens(p)), r.walkTokens && this.walkTokens(p, r.walkTokens);
          let u = c(p, r);
          return r.hooks && (u = r.hooks.postprocess(u)), u;
        } catch (p) {
          return o(p);
        }
      };
    }
    onError(e, t) {
      return (n) => {
        if (n.message += `
Please report this to https://github.com/markedjs/marked.`, e) {
          let s = "<p>An error occurred:</p><pre>" + R(n.message + "", true) + "</pre>";
          return t ? Promise.resolve(s) : s;
        }
        if (t) return Promise.reject(n);
        throw n;
      };
    }
  };
  var z = new B();
  function k(a3, e) {
    return z.parse(a3, e);
  }
  k.options = k.setOptions = function(a3) {
    return z.setOptions(a3), k.defaults = z.defaults, H(k.defaults), k;
  };
  k.getDefaults = M;
  k.defaults = w;
  k.use = function(...a3) {
    return z.use(...a3), k.defaults = z.defaults, H(k.defaults), k;
  };
  k.walkTokens = function(a3, e) {
    return z.walkTokens(a3, e);
  };
  k.parseInline = z.parseInline;
  k.Parser = T;
  k.parser = T.parse;
  k.Renderer = $;
  k.TextRenderer = _;
  k.Lexer = b;
  k.lexer = b.lex;
  k.Tokenizer = S;
  k.Hooks = L;
  k.parse = k;
  var Dt = k.options;
  var Zt = k.setOptions;
  var Gt = k.use;
  var Ht = k.walkTokens;
  var Nt = k.parseInline;
  var jt = k;
  var Ft = T.parse;
  var Qt = b.lex;

  // node_modules/dompurify/dist/purify.es.mjs
  var {
    entries,
    setPrototypeOf,
    isFrozen,
    getPrototypeOf,
    getOwnPropertyDescriptor
  } = Object;
  var {
    freeze,
    seal,
    create
  } = Object;
  var {
    apply,
    construct
  } = typeof Reflect !== "undefined" && Reflect;
  if (!freeze) {
    freeze = function freeze2(x) {
      return x;
    };
  }
  if (!seal) {
    seal = function seal2(x) {
      return x;
    };
  }
  if (!apply) {
    apply = function apply2(fun, thisValue, args) {
      return fun.apply(thisValue, args);
    };
  }
  if (!construct) {
    construct = function construct2(Func, args) {
      return new Func(...args);
    };
  }
  var arrayForEach = unapply(Array.prototype.forEach);
  var arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
  var arrayPop = unapply(Array.prototype.pop);
  var arrayPush = unapply(Array.prototype.push);
  var arraySplice = unapply(Array.prototype.splice);
  var stringToLowerCase = unapply(String.prototype.toLowerCase);
  var stringToString = unapply(String.prototype.toString);
  var stringMatch = unapply(String.prototype.match);
  var stringReplace = unapply(String.prototype.replace);
  var stringIndexOf = unapply(String.prototype.indexOf);
  var stringTrim = unapply(String.prototype.trim);
  var objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  var regExpTest = unapply(RegExp.prototype.test);
  var typeErrorCreate = unconstruct(TypeError);
  function unapply(func) {
    return function(thisArg) {
      if (thisArg instanceof RegExp) {
        thisArg.lastIndex = 0;
      }
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return apply(func, thisArg, args);
    };
  }
  function unconstruct(func) {
    return function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return construct(func, args);
    };
  }
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      setPrototypeOf(set, null);
    }
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === "string") {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }
  function clone(object) {
    const newObject = create(null);
    for (const [property, value] of entries(object)) {
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (Array.isArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === "object" && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === "function") {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }
  var html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
  var svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
  var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
  var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
  var mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
  var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
  var text = freeze(["#text"]);
  var html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns", "slot"]);
  var svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
  var mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
  var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
  var MUSTACHE_EXPR = seal(/\{\{[\w\W]*|[\w\W]*\}\}/gm);
  var ERB_EXPR = seal(/<%[\w\W]*|[\w\W]*%>/gm);
  var TMPLIT_EXPR = seal(/\$\{[\w\W]*/gm);
  var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
  var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
  var IS_ALLOWED_URI = seal(
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    // eslint-disable-line no-useless-escape
  );
  var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  var ATTR_WHITESPACE = seal(
    /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
    // eslint-disable-line no-control-regex
  );
  var DOCTYPE_NAME = seal(/^html$/i);
  var CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
  var EXPRESSIONS = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    ARIA_ATTR,
    ATTR_WHITESPACE,
    CUSTOM_ELEMENT,
    DATA_ATTR,
    DOCTYPE_NAME,
    ERB_EXPR,
    IS_ALLOWED_URI,
    IS_SCRIPT_OR_DATA,
    MUSTACHE_EXPR,
    TMPLIT_EXPR
  });
  var NODE_TYPE = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    // Deprecated
    entityNode: 6,
    // Deprecated
    progressingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12
    // Deprecated
  };
  var getGlobal = function getGlobal2() {
    return typeof window === "undefined" ? null : window;
  };
  var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
      return null;
    }
    let suffix = null;
    const ATTR_NAME = "data-tt-policy-suffix";
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = "dompurify" + (suffix ? "#" + suffix : "");
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html2) {
          return html2;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_2) {
      console.warn("TrustedTypes policy " + policyName + " could not be created.");
      return null;
    }
  };
  var _createHooksMap = function _createHooksMap2() {
    return {
      afterSanitizeAttributes: [],
      afterSanitizeElements: [],
      afterSanitizeShadowDOM: [],
      beforeSanitizeAttributes: [],
      beforeSanitizeElements: [],
      beforeSanitizeShadowDOM: [],
      uponSanitizeAttribute: [],
      uponSanitizeElement: [],
      uponSanitizeShadowNode: []
    };
  };
  function createDOMPurify() {
    let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
    const DOMPurify = (root) => createDOMPurify(root);
    DOMPurify.version = "3.2.6";
    DOMPurify.removed = [];
    if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let {
      document: document2
    } = window2;
    const originalDocument = document2;
    const currentScript = originalDocument.currentScript;
    const {
      DocumentFragment,
      HTMLTemplateElement,
      Node: Node2,
      Element,
      NodeFilter,
      NamedNodeMap = window2.NamedNodeMap || window2.MozNamedAttrMap,
      HTMLFormElement,
      DOMParser,
      trustedTypes
    } = window2;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
    const remove = lookupGetter(ElementPrototype, "remove");
    const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
    const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
    const getParentNode = lookupGetter(ElementPrototype, "parentNode");
    if (typeof HTMLTemplateElement === "function") {
      const template = document2.createElement("template");
      if (template.content && template.content.ownerDocument) {
        document2 = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = "";
    const {
      implementation,
      createNodeIterator,
      createDocumentFragment,
      getElementsByTagName
    } = document2;
    const {
      importNode
    } = originalDocument;
    let hooks = _createHooksMap();
    DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
    const {
      MUSTACHE_EXPR: MUSTACHE_EXPR2,
      ERB_EXPR: ERB_EXPR2,
      TMPLIT_EXPR: TMPLIT_EXPR2,
      DATA_ATTR: DATA_ATTR2,
      ARIA_ATTR: ARIA_ATTR2,
      IS_SCRIPT_OR_DATA: IS_SCRIPT_OR_DATA2,
      ATTR_WHITESPACE: ATTR_WHITESPACE2,
      CUSTOM_ELEMENT: CUSTOM_ELEMENT2
    } = EXPRESSIONS;
    let {
      IS_ALLOWED_URI: IS_ALLOWED_URI$1
    } = EXPRESSIONS;
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    let FORBID_TAGS = null;
    let FORBID_ATTR = null;
    let ALLOW_ARIA_ATTR = true;
    let ALLOW_DATA_ATTR = true;
    let ALLOW_UNKNOWN_PROTOCOLS = false;
    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    let SAFE_FOR_TEMPLATES = false;
    let SAFE_FOR_XML = true;
    let WHOLE_DOCUMENT = false;
    let SET_CONFIG = false;
    let FORCE_BODY = false;
    let RETURN_DOM = false;
    let RETURN_DOM_FRAGMENT = false;
    let RETURN_TRUSTED_TYPE = false;
    let SANITIZE_DOM = true;
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
    let KEEP_CONTENT = true;
    let IN_PLACE = false;
    let USE_PROFILES = {};
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
    const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
    const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
    const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
    let HTML_INTEGRATION_POINTS = addToSet({}, ["annotation-xml"]);
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
    const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
    let transformCaseFunc = null;
    let CONFIG = null;
    const formElement = document2.createElement("form");
    const isRegexOrFunction = function isRegexOrFunction2(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    const _parseConfig = function _parseConfig2() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      if (!cfg || typeof cfg !== "object") {
        cfg = {};
      }
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
      transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
      ALLOWED_TAGS = objectHasOwnProperty(cfg, "ALLOWED_TAGS") ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, "ALLOWED_ATTR") ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, "ALLOWED_NAMESPACES") ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, "ADD_DATA_URI_TAGS") ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, "FORBID_CONTENTS") ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, "FORBID_TAGS") ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
      FORBID_ATTR = objectHasOwnProperty(cfg, "FORBID_ATTR") ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
      USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
      SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
      RETURN_DOM = cfg.RETURN_DOM || false;
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
      FORCE_BODY = cfg.FORCE_BODY || false;
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
      IN_PLACE = cfg.IN_PLACE || false;
      IS_ALLOWED_URI$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI;
      NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
      MATHML_TEXT_INTEGRATION_POINTS = cfg.MATHML_TEXT_INTEGRATION_POINTS || MATHML_TEXT_INTEGRATION_POINTS;
      HTML_INTEGRATION_POINTS = cfg.HTML_INTEGRATION_POINTS || HTML_INTEGRATION_POINTS;
      CUSTOM_ELEMENT_HANDLING = cfg.CUSTOM_ELEMENT_HANDLING || {};
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
      }
      if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = [];
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      if (cfg.ADD_TAGS) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
      if (cfg.ADD_ATTR) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
      if (cfg.ADD_URI_SAFE_ATTR) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (cfg.FORBID_CONTENTS) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      if (KEEP_CONTENT) {
        ALLOWED_TAGS["#text"] = true;
      }
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
      }
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ["tbody"]);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
        emptyHTML = trustedTypesPolicy.createHTML("");
      } else {
        if (trustedTypesPolicy === void 0) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }
        if (trustedTypesPolicy !== null && typeof emptyHTML === "string") {
          emptyHTML = trustedTypesPolicy.createHTML("");
        }
      }
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
    const _checkValidNamespace = function _checkValidNamespace2(element) {
      let parent = getParentNode(element);
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: "template"
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "svg";
        }
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === "math";
        }
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
        }
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }
      return false;
    };
    const _forceRemove = function _forceRemove2(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        getParentNode(node).removeChild(node);
      } catch (_2) {
        remove(node);
      }
    };
    const _removeAttribute = function _removeAttribute2(name, element) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: element.getAttributeNode(name),
          from: element
        });
      } catch (_2) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: element
        });
      }
      element.removeAttribute(name);
      if (name === "is") {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(element);
          } catch (_2) {
          }
        } else {
          try {
            element.setAttribute(name, "");
          } catch (_2) {
          }
        }
      }
    };
    const _initDocument = function _initDocument2(dirty) {
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = "<remove></remove>" + dirty;
      } else {
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_2) {
        }
      }
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, "template", null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_2) {
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    const _createNodeIterator = function _createNodeIterator2(root) {
      return createNodeIterator.call(
        root.ownerDocument || root,
        root,
        // eslint-disable-next-line no-bitwise
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
        null
      );
    };
    const _isClobbered = function _isClobbered2(element) {
      return element instanceof HTMLFormElement && (typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || !(element.attributes instanceof NamedNodeMap) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function");
    };
    const _isNode = function _isNode2(value) {
      return typeof Node2 === "function" && value instanceof Node2;
    };
    function _executeHooks(hooks2, currentNode, data) {
      arrayForEach(hooks2, (hook) => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    }
    const _sanitizeElements = function _sanitizeElements2(currentNode) {
      let content = null;
      _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      const tagName = transformCaseFunc(currentNode.nodeName);
      _executeHooks(hooks.uponSanitizeElement, currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
        _forceRemove(currentNode);
        return true;
      }
      if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1; i >= 0; --i) {
              const childClone = cloneNode(childNodes[i], true);
              childClone.__removalCount = (currentNode.__removalCount || 0) + 1;
              parentNode.insertBefore(childClone, getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }
      if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          content = stringReplace(content, expr, " ");
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      _executeHooks(hooks.afterSanitizeElements, currentNode, null);
      return false;
    };
    const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
      if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
        return false;
      }
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR2, lcName)) ;
      else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR2, lcName)) ;
      else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
        if (
          // First condition does a very basic check if a) it's basically a valid custom element tagname AND
          // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
          _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || // Alternative, second condition checks if it's an `is`-attribute, AND
          // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
        ) ;
        else {
          return false;
        }
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
      else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
      else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
      else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA2, stringReplace(value, ATTR_WHITESPACE2, ""))) ;
      else if (value) {
        return false;
      } else ;
      return true;
    };
    const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
      return tagName !== "annotation-xml" && stringMatch(tagName, CUSTOM_ELEMENT2);
    };
    const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
      _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
      const {
        attributes
      } = currentNode;
      if (!attributes || _isClobbered(currentNode)) {
        return;
      }
      const hookEvent = {
        attrName: "",
        attrValue: "",
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR,
        forceKeepAttr: void 0
      };
      let l = attributes.length;
      while (l--) {
        const attr = attributes[l];
        const {
          name,
          namespaceURI,
          value: attrValue
        } = attr;
        const lcName = transformCaseFunc(name);
        const initValue = attrValue;
        let value = name === "value" ? initValue : stringTrim(initValue);
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = void 0;
        _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
        value = hookEvent.attrValue;
        if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name")) {
          _removeAttribute(name, currentNode);
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|title)/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (hookEvent.forceKeepAttr) {
          continue;
        }
        if (!hookEvent.keepAttr) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
            value = stringReplace(value, expr, " ");
          });
        }
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function") {
          if (namespaceURI) ;
          else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case "TrustedHTML": {
                value = trustedTypesPolicy.createHTML(value);
                break;
              }
              case "TrustedScriptURL": {
                value = trustedTypesPolicy.createScriptURL(value);
                break;
              }
            }
          }
        }
        if (value !== initValue) {
          try {
            if (namespaceURI) {
              currentNode.setAttributeNS(namespaceURI, name, value);
            } else {
              currentNode.setAttribute(name, value);
            }
            if (_isClobbered(currentNode)) {
              _forceRemove(currentNode);
            } else {
              arrayPop(DOMPurify.removed);
            }
          } catch (_2) {
            _removeAttribute(name, currentNode);
          }
        }
      }
      _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
    };
    const _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);
      _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
        _sanitizeElements(shadowNode);
        _sanitizeAttributes(shadowNode);
        if (shadowNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM2(shadowNode.content);
        }
      }
      _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
    };
    DOMPurify.sanitize = function(dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = "<!-->";
      }
      if (typeof dirty !== "string" && !_isNode(dirty)) {
        if (typeof dirty.toString === "function") {
          dirty = dirty.toString();
          if (typeof dirty !== "string") {
            throw typeErrorCreate("dirty is not a string, aborting");
          }
        } else {
          throw typeErrorCreate("toString is not a function");
        }
      }
      if (!DOMPurify.isSupported) {
        return dirty;
      }
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      DOMPurify.removed = [];
      if (typeof dirty === "string") {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        if (dirty.nodeName) {
          const tagName = transformCaseFunc(dirty.nodeName);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
          }
        }
      } else if (dirty instanceof Node2) {
        body = _initDocument("<!---->");
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
          body = importedNode;
        } else if (importedNode.nodeName === "HTML") {
          body = importedNode;
        } else {
          body.appendChild(importedNode);
        }
      } else {
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf("<") === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        body = _initDocument(dirty);
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
        }
      }
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
      while (currentNode = nodeIterator.nextNode()) {
        _sanitizeElements(currentNode);
        _sanitizeAttributes(currentNode);
        if (currentNode.content instanceof DocumentFragment) {
          _sanitizeShadowDOM(currentNode.content);
        }
      }
      if (IN_PLACE) {
        return dirty;
      }
      if (RETURN_DOM) {
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
      }
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR2, ERB_EXPR2, TMPLIT_EXPR2], (expr) => {
          serializedHTML = stringReplace(serializedHTML, expr, " ");
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function() {
      let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };
    DOMPurify.clearConfig = function() {
      CONFIG = null;
      SET_CONFIG = false;
    };
    DOMPurify.isValidAttribute = function(tag, attr, value) {
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    DOMPurify.addHook = function(entryPoint, hookFunction) {
      if (typeof hookFunction !== "function") {
        return;
      }
      arrayPush(hooks[entryPoint], hookFunction);
    };
    DOMPurify.removeHook = function(entryPoint, hookFunction) {
      if (hookFunction !== void 0) {
        const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
        return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
      }
      return arrayPop(hooks[entryPoint]);
    };
    DOMPurify.removeHooks = function(entryPoint) {
      hooks[entryPoint] = [];
    };
    DOMPurify.removeAllHooks = function() {
      hooks = _createHooksMap();
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();

  // node_modules/highlight.js/es/core.js
  var import_core = __toESM(require_core(), 1);
  var core_default = import_core.default;

  // node_modules/highlight.js/es/languages/javascript.js
  var IDENT_RE = "[A-Za-z$_][0-9A-Za-z$_]*";
  var KEYWORDS = [
    "as",
    // for exports
    "in",
    "of",
    "if",
    "for",
    "while",
    "finally",
    "var",
    "new",
    "function",
    "do",
    "return",
    "void",
    "else",
    "break",
    "catch",
    "instanceof",
    "with",
    "throw",
    "case",
    "default",
    "try",
    "switch",
    "continue",
    "typeof",
    "delete",
    "let",
    "yield",
    "const",
    "class",
    // JS handles these with a special rule
    // "get",
    // "set",
    "debugger",
    "async",
    "await",
    "static",
    "import",
    "from",
    "export",
    "extends",
    // It's reached stage 3, which is "recommended for implementation":
    "using"
  ];
  var LITERALS = [
    "true",
    "false",
    "null",
    "undefined",
    "NaN",
    "Infinity"
  ];
  var TYPES = [
    // Fundamental objects
    "Object",
    "Function",
    "Boolean",
    "Symbol",
    // numbers and dates
    "Math",
    "Date",
    "Number",
    "BigInt",
    // text
    "String",
    "RegExp",
    // Indexed collections
    "Array",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Int32Array",
    "Uint16Array",
    "Uint32Array",
    "BigInt64Array",
    "BigUint64Array",
    // Keyed collections
    "Set",
    "Map",
    "WeakSet",
    "WeakMap",
    // Structured data
    "ArrayBuffer",
    "SharedArrayBuffer",
    "Atomics",
    "DataView",
    "JSON",
    // Control abstraction objects
    "Promise",
    "Generator",
    "GeneratorFunction",
    "AsyncFunction",
    // Reflection
    "Reflect",
    "Proxy",
    // Internationalization
    "Intl",
    // WebAssembly
    "WebAssembly"
  ];
  var ERROR_TYPES = [
    "Error",
    "EvalError",
    "InternalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError"
  ];
  var BUILT_IN_GLOBALS = [
    "setInterval",
    "setTimeout",
    "clearInterval",
    "clearTimeout",
    "require",
    "exports",
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "escape",
    "unescape"
  ];
  var BUILT_IN_VARIABLES = [
    "arguments",
    "this",
    "super",
    "console",
    "window",
    "document",
    "localStorage",
    "sessionStorage",
    "module",
    "global"
    // Node.js
  ];
  var BUILT_INS = [].concat(
    BUILT_IN_GLOBALS,
    TYPES,
    ERROR_TYPES
  );
  function javascript(hljs) {
    const regex = hljs.regex;
    const hasClosingTag = (match, { after }) => {
      const tag = "</" + match[0].slice(1);
      const pos = match.input.indexOf(tag, after);
      return pos !== -1;
    };
    const IDENT_RE$1 = IDENT_RE;
    const FRAGMENT = {
      begin: "<>",
      end: "</>"
    };
    const XML_SELF_CLOSING = /<[A-Za-z0-9\\._:-]+\s*\/>/;
    const XML_TAG = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      /**
       * @param {RegExpMatchArray} match
       * @param {CallbackResponse} response
       */
      isTrulyOpeningTag: (match, response) => {
        const afterMatchIndex = match[0].length + match.index;
        const nextChar = match.input[afterMatchIndex];
        if (
          // HTML should not include another raw `<` inside a tag
          // nested type?
          // `<Array<Array<number>>`, etc.
          nextChar === "<" || // the , gives away that this is not HTML
          // `<T, A extends keyof T, V>`
          nextChar === ","
        ) {
          response.ignoreMatch();
          return;
        }
        if (nextChar === ">") {
          if (!hasClosingTag(match, { after: afterMatchIndex })) {
            response.ignoreMatch();
          }
        }
        let m2;
        const afterMatch = match.input.substring(afterMatchIndex);
        if (m2 = afterMatch.match(/^\s*=/)) {
          response.ignoreMatch();
          return;
        }
        if (m2 = afterMatch.match(/^\s+extends\s+/)) {
          if (m2.index === 0) {
            response.ignoreMatch();
            return;
          }
        }
      }
    };
    const KEYWORDS$1 = {
      $pattern: IDENT_RE,
      keyword: KEYWORDS,
      literal: LITERALS,
      built_in: BUILT_INS,
      "variable.language": BUILT_IN_VARIABLES
    };
    const decimalDigits = "[0-9](_?[0-9])*";
    const frac = `\\.(${decimalDigits})`;
    const decimalInteger = `0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*`;
    const NUMBER = {
      className: "number",
      variants: [
        // DecimalLiteral
        { begin: `(\\b(${decimalInteger})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})\\b` },
        { begin: `\\b(${decimalInteger})\\b((${frac})\\b|\\.)?|(${frac})\\b` },
        // DecimalBigIntegerLiteral
        { begin: `\\b(0|[1-9](_?[0-9])*)n\\b` },
        // NonDecimalIntegerLiteral
        { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
        { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
        { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
        // LegacyOctalIntegerLiteral (does not include underscore separators)
        // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
        { begin: "\\b0[0-7]+n?\\b" }
      ],
      relevance: 0
    };
    const SUBST = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: KEYWORDS$1,
      contains: []
      // defined later
    };
    const HTML_TEMPLATE = {
      begin: ".?html`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "xml"
      }
    };
    const CSS_TEMPLATE = {
      begin: ".?css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "css"
      }
    };
    const GRAPHQL_TEMPLATE = {
      begin: ".?gql`",
      end: "",
      starts: {
        end: "`",
        returnEnd: false,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          SUBST
        ],
        subLanguage: "graphql"
      }
    };
    const TEMPLATE_STRING = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [
        hljs.BACKSLASH_ESCAPE,
        SUBST
      ]
    };
    const JSDOC_COMMENT = hljs.COMMENT(
      /\/\*\*(?!\/)/,
      "\\*/",
      {
        relevance: 0,
        contains: [
          {
            begin: "(?=@[A-Za-z]+)",
            relevance: 0,
            contains: [
              {
                className: "doctag",
                begin: "@[A-Za-z]+"
              },
              {
                className: "type",
                begin: "\\{",
                end: "\\}",
                excludeEnd: true,
                excludeBegin: true,
                relevance: 0
              },
              {
                className: "variable",
                begin: IDENT_RE$1 + "(?=\\s*(-)|$)",
                endsParent: true,
                relevance: 0
              },
              // eat spaces (not newlines) so we can find
              // types or variables
              {
                begin: /(?=[^\n])\s/,
                relevance: 0
              }
            ]
          }
        ]
      }
    );
    const COMMENT = {
      className: "comment",
      variants: [
        JSDOC_COMMENT,
        hljs.C_BLOCK_COMMENT_MODE,
        hljs.C_LINE_COMMENT_MODE
      ]
    };
    const SUBST_INTERNALS = [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      HTML_TEMPLATE,
      CSS_TEMPLATE,
      GRAPHQL_TEMPLATE,
      TEMPLATE_STRING,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      NUMBER
      // This is intentional:
      // See https://github.com/highlightjs/highlight.js/issues/3288
      // hljs.REGEXP_MODE
    ];
    SUBST.contains = SUBST_INTERNALS.concat({
      // we need to pair up {} inside our subst to prevent
      // it from ending too early by matching another }
      begin: /\{/,
      end: /\}/,
      keywords: KEYWORDS$1,
      contains: [
        "self"
      ].concat(SUBST_INTERNALS)
    });
    const SUBST_AND_COMMENTS = [].concat(COMMENT, SUBST.contains);
    const PARAMS_CONTAINS = SUBST_AND_COMMENTS.concat([
      // eat recursive parens in sub expressions
      {
        begin: /(\s*)\(/,
        end: /\)/,
        keywords: KEYWORDS$1,
        contains: ["self"].concat(SUBST_AND_COMMENTS)
      }
    ]);
    const PARAMS = {
      className: "params",
      // convert this to negative lookbehind in v12
      begin: /(\s*)\(/,
      // to match the parms with
      end: /\)/,
      excludeBegin: true,
      excludeEnd: true,
      keywords: KEYWORDS$1,
      contains: PARAMS_CONTAINS
    };
    const CLASS_OR_EXTENDS = {
      variants: [
        // class Car extends vehicle
        {
          match: [
            /class/,
            /\s+/,
            IDENT_RE$1,
            /\s+/,
            /extends/,
            /\s+/,
            regex.concat(IDENT_RE$1, "(", regex.concat(/\./, IDENT_RE$1), ")*")
          ],
          scope: {
            1: "keyword",
            3: "title.class",
            5: "keyword",
            7: "title.class.inherited"
          }
        },
        // class Car
        {
          match: [
            /class/,
            /\s+/,
            IDENT_RE$1
          ],
          scope: {
            1: "keyword",
            3: "title.class"
          }
        }
      ]
    };
    const CLASS_REFERENCE = {
      relevance: 0,
      match: regex.either(
        // Hard coded exceptions
        /\bJSON/,
        // Float32Array, OutT
        /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
        // CSSFactory, CSSFactoryT
        /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
        // FPs, FPsT
        /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
        // P
        // single letters are not highlighted
        // BLAH
        // this will be flagged as a UPPER_CASE_CONSTANT instead
      ),
      className: "title.class",
      keywords: {
        _: [
          // se we still get relevance credit for JS library classes
          ...TYPES,
          ...ERROR_TYPES
        ]
      }
    };
    const USE_STRICT = {
      label: "use_strict",
      className: "meta",
      relevance: 10,
      begin: /^\s*['"]use (strict|asm)['"]/
    };
    const FUNCTION_DEFINITION = {
      variants: [
        {
          match: [
            /function/,
            /\s+/,
            IDENT_RE$1,
            /(?=\s*\()/
          ]
        },
        // anonymous function
        {
          match: [
            /function/,
            /\s*(?=\()/
          ]
        }
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      label: "func.def",
      contains: [PARAMS],
      illegal: /%/
    };
    const UPPER_CASE_CONSTANT = {
      relevance: 0,
      match: /\b[A-Z][A-Z_0-9]+\b/,
      className: "variable.constant"
    };
    function noneOf(list) {
      return regex.concat("(?!", list.join("|"), ")");
    }
    const FUNCTION_CALL = {
      match: regex.concat(
        /\b/,
        noneOf([
          ...BUILT_IN_GLOBALS,
          "super",
          "import"
        ].map((x) => `${x}\\s*\\(`)),
        IDENT_RE$1,
        regex.lookahead(/\s*\(/)
      ),
      className: "title.function",
      relevance: 0
    };
    const PROPERTY_ACCESS = {
      begin: regex.concat(/\./, regex.lookahead(
        regex.concat(IDENT_RE$1, /(?![0-9A-Za-z$_(])/)
      )),
      end: IDENT_RE$1,
      excludeBegin: true,
      keywords: "prototype",
      className: "property",
      relevance: 0
    };
    const GETTER_OR_SETTER = {
      match: [
        /get|set/,
        /\s+/,
        IDENT_RE$1,
        /(?=\()/
      ],
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        {
          // eat to avoid empty params
          begin: /\(\)/
        },
        PARAMS
      ]
    };
    const FUNC_LEAD_IN_RE = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + hljs.UNDERSCORE_IDENT_RE + ")\\s*=>";
    const FUNCTION_VARIABLE = {
      match: [
        /const|var|let/,
        /\s+/,
        IDENT_RE$1,
        /\s*/,
        /=\s*/,
        /(async\s*)?/,
        // async is optional
        regex.lookahead(FUNC_LEAD_IN_RE)
      ],
      keywords: "async",
      className: {
        1: "keyword",
        3: "title.function"
      },
      contains: [
        PARAMS
      ]
    };
    return {
      name: "JavaScript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: KEYWORDS$1,
      // this will be extended by TypeScript
      exports: { PARAMS_CONTAINS, CLASS_REFERENCE },
      illegal: /#(?![$_A-z])/,
      contains: [
        hljs.SHEBANG({
          label: "shebang",
          binary: "node",
          relevance: 5
        }),
        USE_STRICT,
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        HTML_TEMPLATE,
        CSS_TEMPLATE,
        GRAPHQL_TEMPLATE,
        TEMPLATE_STRING,
        COMMENT,
        // Skip numbers when they are part of a variable name
        { match: /\$\d+/ },
        NUMBER,
        CLASS_REFERENCE,
        {
          scope: "attr",
          match: IDENT_RE$1 + regex.lookahead(":"),
          relevance: 0
        },
        FUNCTION_VARIABLE,
        {
          // "value" container
          begin: "(" + hljs.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
          keywords: "return throw case",
          relevance: 0,
          contains: [
            COMMENT,
            hljs.REGEXP_MODE,
            {
              className: "function",
              // we have to count the parens to make sure we actually have the
              // correct bounding ( ) before the =>.  There could be any number of
              // sub-expressions inside also surrounded by parens.
              begin: FUNC_LEAD_IN_RE,
              returnBegin: true,
              end: "\\s*=>",
              contains: [
                {
                  className: "params",
                  variants: [
                    {
                      begin: hljs.UNDERSCORE_IDENT_RE,
                      relevance: 0
                    },
                    {
                      className: null,
                      begin: /\(\s*\)/,
                      skip: true
                    },
                    {
                      begin: /(\s*)\(/,
                      end: /\)/,
                      excludeBegin: true,
                      excludeEnd: true,
                      keywords: KEYWORDS$1,
                      contains: PARAMS_CONTAINS
                    }
                  ]
                }
              ]
            },
            {
              // could be a comma delimited list of params to a function call
              begin: /,/,
              relevance: 0
            },
            {
              match: /\s+/,
              relevance: 0
            },
            {
              // JSX
              variants: [
                { begin: FRAGMENT.begin, end: FRAGMENT.end },
                { match: XML_SELF_CLOSING },
                {
                  begin: XML_TAG.begin,
                  // we carefully check the opening tag to see if it truly
                  // is a tag and not a false positive
                  "on:begin": XML_TAG.isTrulyOpeningTag,
                  end: XML_TAG.end
                }
              ],
              subLanguage: "xml",
              contains: [
                {
                  begin: XML_TAG.begin,
                  end: XML_TAG.end,
                  skip: true,
                  contains: ["self"]
                }
              ]
            }
          ]
        },
        FUNCTION_DEFINITION,
        {
          // prevent this from getting swallowed up by function
          // since they appear "function like"
          beginKeywords: "while if switch catch for"
        },
        {
          // we have to count the parens to make sure we actually have the correct
          // bounding ( ).  There could be any number of sub-expressions inside
          // also surrounded by parens.
          begin: "\\b(?!function)" + hljs.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
          // end parens
          returnBegin: true,
          label: "func.def",
          contains: [
            PARAMS,
            hljs.inherit(hljs.TITLE_MODE, { begin: IDENT_RE$1, className: "title.function" })
          ]
        },
        // catch ... so it won't trigger the property rule below
        {
          match: /\.\.\./,
          relevance: 0
        },
        PROPERTY_ACCESS,
        // hack: prevents detection of keywords in some circumstances
        // .keyword()
        // $keyword = x
        {
          match: "\\$" + IDENT_RE$1,
          relevance: 0
        },
        {
          match: [/\bconstructor(?=\s*\()/],
          className: { 1: "title.function" },
          contains: [PARAMS]
        },
        FUNCTION_CALL,
        UPPER_CASE_CONSTANT,
        CLASS_OR_EXTENDS,
        GETTER_OR_SETTER,
        {
          match: /\$[(.]/
          // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
        }
      ]
    };
  }

  // node_modules/highlight.js/es/languages/xml.js
  function xml2(hljs) {
    const regex = hljs.regex;
    const TAG_NAME_RE = regex.concat(/[\p{L}_]/u, regex.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u);
    const XML_IDENT_RE = /[\p{L}0-9._:-]+/u;
    const XML_ENTITIES = {
      className: "symbol",
      begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
    };
    const XML_META_KEYWORDS = {
      begin: /\s/,
      contains: [
        {
          className: "keyword",
          begin: /#?[a-z_][a-z1-9_-]+/,
          illegal: /\n/
        }
      ]
    };
    const XML_META_PAR_KEYWORDS = hljs.inherit(XML_META_KEYWORDS, {
      begin: /\(/,
      end: /\)/
    });
    const APOS_META_STRING_MODE = hljs.inherit(hljs.APOS_STRING_MODE, { className: "string" });
    const QUOTE_META_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, { className: "string" });
    const TAG_INTERNALS = {
      endsWithParent: true,
      illegal: /</,
      relevance: 0,
      contains: [
        {
          className: "attr",
          begin: XML_IDENT_RE,
          relevance: 0
        },
        {
          begin: /=\s*/,
          relevance: 0,
          contains: [
            {
              className: "string",
              endsParent: true,
              variants: [
                {
                  begin: /"/,
                  end: /"/,
                  contains: [XML_ENTITIES]
                },
                {
                  begin: /'/,
                  end: /'/,
                  contains: [XML_ENTITIES]
                },
                { begin: /[^\s"'=<>`]+/ }
              ]
            }
          ]
        }
      ]
    };
    return {
      name: "HTML, XML",
      aliases: [
        "html",
        "xhtml",
        "rss",
        "atom",
        "xjb",
        "xsd",
        "xsl",
        "plist",
        "wsf",
        "svg"
      ],
      case_insensitive: true,
      unicodeRegex: true,
      contains: [
        {
          className: "meta",
          begin: /<![a-z]/,
          end: />/,
          relevance: 10,
          contains: [
            XML_META_KEYWORDS,
            QUOTE_META_STRING_MODE,
            APOS_META_STRING_MODE,
            XML_META_PAR_KEYWORDS,
            {
              begin: /\[/,
              end: /\]/,
              contains: [
                {
                  className: "meta",
                  begin: /<![a-z]/,
                  end: />/,
                  contains: [
                    XML_META_KEYWORDS,
                    XML_META_PAR_KEYWORDS,
                    QUOTE_META_STRING_MODE,
                    APOS_META_STRING_MODE
                  ]
                }
              ]
            }
          ]
        },
        hljs.COMMENT(
          /<!--/,
          /-->/,
          { relevance: 10 }
        ),
        {
          begin: /<!\[CDATA\[/,
          end: /\]\]>/,
          relevance: 10
        },
        XML_ENTITIES,
        // xml processing instructions
        {
          className: "meta",
          end: /\?>/,
          variants: [
            {
              begin: /<\?xml/,
              relevance: 10,
              contains: [
                QUOTE_META_STRING_MODE
              ]
            },
            {
              begin: /<\?[a-z][a-z0-9]+/
            }
          ]
        },
        {
          className: "tag",
          /*
          The lookahead pattern (?=...) ensures that 'begin' only matches
          '<style' as a single word, followed by a whitespace or an
          ending bracket.
          */
          begin: /<style(?=\s|>)/,
          end: />/,
          keywords: { name: "style" },
          contains: [TAG_INTERNALS],
          starts: {
            end: /<\/style>/,
            returnEnd: true,
            subLanguage: [
              "css",
              "xml"
            ]
          }
        },
        {
          className: "tag",
          // See the comment in the <style tag about the lookahead pattern
          begin: /<script(?=\s|>)/,
          end: />/,
          keywords: { name: "script" },
          contains: [TAG_INTERNALS],
          starts: {
            end: /<\/script>/,
            returnEnd: true,
            subLanguage: [
              "javascript",
              "handlebars",
              "xml"
            ]
          }
        },
        // we need this for now for jSX
        {
          className: "tag",
          begin: /<>|<\/>/
        },
        // open tag
        {
          className: "tag",
          begin: regex.concat(
            /</,
            regex.lookahead(regex.concat(
              TAG_NAME_RE,
              // <tag/>
              // <tag>
              // <tag ...
              regex.either(/\/>/, />/, /\s/)
            ))
          ),
          end: /\/?>/,
          contains: [
            {
              className: "name",
              begin: TAG_NAME_RE,
              relevance: 0,
              starts: TAG_INTERNALS
            }
          ]
        },
        // close tag
        {
          className: "tag",
          begin: regex.concat(
            /<\//,
            regex.lookahead(regex.concat(
              TAG_NAME_RE,
              />/
            ))
          ),
          contains: [
            {
              className: "name",
              begin: TAG_NAME_RE,
              relevance: 0
            },
            {
              begin: />/,
              relevance: 0,
              endsParent: true
            }
          ]
        }
      ]
    };
  }

  // node_modules/highlight.js/es/languages/css.js
  var MODES = (hljs) => {
    return {
      IMPORTANT: {
        scope: "meta",
        begin: "!important"
      },
      BLOCK_COMMENT: hljs.C_BLOCK_COMMENT_MODE,
      HEXCOLOR: {
        scope: "number",
        begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
      },
      FUNCTION_DISPATCH: {
        className: "built_in",
        begin: /[\w-]+(?=\()/
      },
      ATTRIBUTE_SELECTOR_MODE: {
        scope: "selector-attr",
        begin: /\[/,
        end: /\]/,
        illegal: "$",
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE
        ]
      },
      CSS_NUMBER_MODE: {
        scope: "number",
        begin: hljs.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        relevance: 0
      },
      CSS_VARIABLE: {
        className: "attr",
        begin: /--[A-Za-z_][A-Za-z0-9_-]*/
      }
    };
  };
  var HTML_TAGS = [
    "a",
    "abbr",
    "address",
    "article",
    "aside",
    "audio",
    "b",
    "blockquote",
    "body",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "dd",
    "del",
    "details",
    "dfn",
    "div",
    "dl",
    "dt",
    "em",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "label",
    "legend",
    "li",
    "main",
    "mark",
    "menu",
    "nav",
    "object",
    "ol",
    "optgroup",
    "option",
    "p",
    "picture",
    "q",
    "quote",
    "samp",
    "section",
    "select",
    "source",
    "span",
    "strong",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "tr",
    "ul",
    "var",
    "video"
  ];
  var SVG_TAGS = [
    "defs",
    "g",
    "marker",
    "mask",
    "pattern",
    "svg",
    "switch",
    "symbol",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feFlood",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMorphology",
    "feOffset",
    "feSpecularLighting",
    "feTile",
    "feTurbulence",
    "linearGradient",
    "radialGradient",
    "stop",
    "circle",
    "ellipse",
    "image",
    "line",
    "path",
    "polygon",
    "polyline",
    "rect",
    "text",
    "use",
    "textPath",
    "tspan",
    "foreignObject",
    "clipPath"
  ];
  var TAGS = [
    ...HTML_TAGS,
    ...SVG_TAGS
  ];
  var MEDIA_FEATURES = [
    "any-hover",
    "any-pointer",
    "aspect-ratio",
    "color",
    "color-gamut",
    "color-index",
    "device-aspect-ratio",
    "device-height",
    "device-width",
    "display-mode",
    "forced-colors",
    "grid",
    "height",
    "hover",
    "inverted-colors",
    "monochrome",
    "orientation",
    "overflow-block",
    "overflow-inline",
    "pointer",
    "prefers-color-scheme",
    "prefers-contrast",
    "prefers-reduced-motion",
    "prefers-reduced-transparency",
    "resolution",
    "scan",
    "scripting",
    "update",
    "width",
    // TODO: find a better solution?
    "min-width",
    "max-width",
    "min-height",
    "max-height"
  ].sort().reverse();
  var PSEUDO_CLASSES = [
    "active",
    "any-link",
    "blank",
    "checked",
    "current",
    "default",
    "defined",
    "dir",
    // dir()
    "disabled",
    "drop",
    "empty",
    "enabled",
    "first",
    "first-child",
    "first-of-type",
    "fullscreen",
    "future",
    "focus",
    "focus-visible",
    "focus-within",
    "has",
    // has()
    "host",
    // host or host()
    "host-context",
    // host-context()
    "hover",
    "indeterminate",
    "in-range",
    "invalid",
    "is",
    // is()
    "lang",
    // lang()
    "last-child",
    "last-of-type",
    "left",
    "link",
    "local-link",
    "not",
    // not()
    "nth-child",
    // nth-child()
    "nth-col",
    // nth-col()
    "nth-last-child",
    // nth-last-child()
    "nth-last-col",
    // nth-last-col()
    "nth-last-of-type",
    //nth-last-of-type()
    "nth-of-type",
    //nth-of-type()
    "only-child",
    "only-of-type",
    "optional",
    "out-of-range",
    "past",
    "placeholder-shown",
    "read-only",
    "read-write",
    "required",
    "right",
    "root",
    "scope",
    "target",
    "target-within",
    "user-invalid",
    "valid",
    "visited",
    "where"
    // where()
  ].sort().reverse();
  var PSEUDO_ELEMENTS = [
    "after",
    "backdrop",
    "before",
    "cue",
    "cue-region",
    "first-letter",
    "first-line",
    "grammar-error",
    "marker",
    "part",
    "placeholder",
    "selection",
    "slotted",
    "spelling-error"
  ].sort().reverse();
  var ATTRIBUTES = [
    "accent-color",
    "align-content",
    "align-items",
    "align-self",
    "alignment-baseline",
    "all",
    "anchor-name",
    "animation",
    "animation-composition",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-range",
    "animation-range-end",
    "animation-range-start",
    "animation-timeline",
    "animation-timing-function",
    "appearance",
    "aspect-ratio",
    "backdrop-filter",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-position-x",
    "background-position-y",
    "background-repeat",
    "background-size",
    "baseline-shift",
    "block-size",
    "border",
    "border-block",
    "border-block-color",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-style",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-style",
    "border-block-start-width",
    "border-block-style",
    "border-block-width",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-end-end-radius",
    "border-end-start-radius",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-inline",
    "border-inline-color",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-style",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-style",
    "border-inline-start-width",
    "border-inline-style",
    "border-inline-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-start-end-radius",
    "border-start-start-radius",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-align",
    "box-decoration-break",
    "box-direction",
    "box-flex",
    "box-flex-group",
    "box-lines",
    "box-ordinal-group",
    "box-orient",
    "box-pack",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "clear",
    "clip",
    "clip-path",
    "clip-rule",
    "color",
    "color-interpolation",
    "color-interpolation-filters",
    "color-profile",
    "color-rendering",
    "color-scheme",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "contain",
    "contain-intrinsic-block-size",
    "contain-intrinsic-height",
    "contain-intrinsic-inline-size",
    "contain-intrinsic-size",
    "contain-intrinsic-width",
    "container",
    "container-name",
    "container-type",
    "content",
    "content-visibility",
    "counter-increment",
    "counter-reset",
    "counter-set",
    "cue",
    "cue-after",
    "cue-before",
    "cursor",
    "cx",
    "cy",
    "direction",
    "display",
    "dominant-baseline",
    "empty-cells",
    "enable-background",
    "field-sizing",
    "fill",
    "fill-opacity",
    "fill-rule",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "float",
    "flood-color",
    "flood-opacity",
    "flow",
    "font",
    "font-display",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-language-override",
    "font-optical-sizing",
    "font-palette",
    "font-size",
    "font-size-adjust",
    "font-smooth",
    "font-smoothing",
    "font-stretch",
    "font-style",
    "font-synthesis",
    "font-synthesis-position",
    "font-synthesis-small-caps",
    "font-synthesis-style",
    "font-synthesis-weight",
    "font-variant",
    "font-variant-alternates",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-emoji",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-variant-position",
    "font-variation-settings",
    "font-weight",
    "forced-color-adjust",
    "gap",
    "glyph-orientation-horizontal",
    "glyph-orientation-vertical",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-start",
    "grid-gap",
    "grid-row",
    "grid-row-end",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "hanging-punctuation",
    "height",
    "hyphenate-character",
    "hyphenate-limit-chars",
    "hyphens",
    "icon",
    "image-orientation",
    "image-rendering",
    "image-resolution",
    "ime-mode",
    "initial-letter",
    "initial-letter-align",
    "inline-size",
    "inset",
    "inset-area",
    "inset-block",
    "inset-block-end",
    "inset-block-start",
    "inset-inline",
    "inset-inline-end",
    "inset-inline-start",
    "isolation",
    "justify-content",
    "justify-items",
    "justify-self",
    "kerning",
    "left",
    "letter-spacing",
    "lighting-color",
    "line-break",
    "line-height",
    "line-height-step",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-block",
    "margin-block-end",
    "margin-block-start",
    "margin-bottom",
    "margin-inline",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin-trim",
    "marker",
    "marker-end",
    "marker-mid",
    "marker-start",
    "marks",
    "mask",
    "mask-border",
    "mask-border-mode",
    "mask-border-outset",
    "mask-border-repeat",
    "mask-border-slice",
    "mask-border-source",
    "mask-border-width",
    "mask-clip",
    "mask-composite",
    "mask-image",
    "mask-mode",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "mask-type",
    "masonry-auto-flow",
    "math-depth",
    "math-shift",
    "math-style",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-width",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "mix-blend-mode",
    "nav-down",
    "nav-index",
    "nav-left",
    "nav-right",
    "nav-up",
    "none",
    "normal",
    "object-fit",
    "object-position",
    "offset",
    "offset-anchor",
    "offset-distance",
    "offset-path",
    "offset-position",
    "offset-rotate",
    "opacity",
    "order",
    "orphans",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-anchor",
    "overflow-block",
    "overflow-clip-margin",
    "overflow-inline",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "overlay",
    "overscroll-behavior",
    "overscroll-behavior-block",
    "overscroll-behavior-inline",
    "overscroll-behavior-x",
    "overscroll-behavior-y",
    "padding",
    "padding-block",
    "padding-block-end",
    "padding-block-start",
    "padding-bottom",
    "padding-inline",
    "padding-inline-end",
    "padding-inline-start",
    "padding-left",
    "padding-right",
    "padding-top",
    "page",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "paint-order",
    "pause",
    "pause-after",
    "pause-before",
    "perspective",
    "perspective-origin",
    "place-content",
    "place-items",
    "place-self",
    "pointer-events",
    "position",
    "position-anchor",
    "position-visibility",
    "print-color-adjust",
    "quotes",
    "r",
    "resize",
    "rest",
    "rest-after",
    "rest-before",
    "right",
    "rotate",
    "row-gap",
    "ruby-align",
    "ruby-position",
    "scale",
    "scroll-behavior",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-snap-type",
    "scroll-timeline",
    "scroll-timeline-axis",
    "scroll-timeline-name",
    "scrollbar-color",
    "scrollbar-gutter",
    "scrollbar-width",
    "shape-image-threshold",
    "shape-margin",
    "shape-outside",
    "shape-rendering",
    "speak",
    "speak-as",
    "src",
    // @font-face
    "stop-color",
    "stop-opacity",
    "stroke",
    "stroke-dasharray",
    "stroke-dashoffset",
    "stroke-linecap",
    "stroke-linejoin",
    "stroke-miterlimit",
    "stroke-opacity",
    "stroke-width",
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-all",
    "text-align-last",
    "text-anchor",
    "text-combine-upright",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-skip",
    "text-decoration-skip-ink",
    "text-decoration-style",
    "text-decoration-thickness",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-indent",
    "text-justify",
    "text-orientation",
    "text-overflow",
    "text-rendering",
    "text-shadow",
    "text-size-adjust",
    "text-transform",
    "text-underline-offset",
    "text-underline-position",
    "text-wrap",
    "text-wrap-mode",
    "text-wrap-style",
    "timeline-scope",
    "top",
    "touch-action",
    "transform",
    "transform-box",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-behavior",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "translate",
    "unicode-bidi",
    "user-modify",
    "user-select",
    "vector-effect",
    "vertical-align",
    "view-timeline",
    "view-timeline-axis",
    "view-timeline-inset",
    "view-timeline-name",
    "view-transition-name",
    "visibility",
    "voice-balance",
    "voice-duration",
    "voice-family",
    "voice-pitch",
    "voice-range",
    "voice-rate",
    "voice-stress",
    "voice-volume",
    "white-space",
    "white-space-collapse",
    "widows",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "x",
    "y",
    "z-index",
    "zoom"
  ].sort().reverse();
  function css(hljs) {
    const regex = hljs.regex;
    const modes = MODES(hljs);
    const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
    const AT_MODIFIERS = "and or not only";
    const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/;
    const IDENT_RE2 = "[a-zA-Z-][a-zA-Z0-9_-]*";
    const STRINGS = [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ];
    return {
      name: "CSS",
      case_insensitive: true,
      illegal: /[=|'\$]/,
      keywords: { keyframePosition: "from to" },
      classNameAliases: {
        // for visual continuity with `tag {}` and because we
        // don't have a great class for this?
        keyframePosition: "selector-tag"
      },
      contains: [
        modes.BLOCK_COMMENT,
        VENDOR_PREFIX,
        // to recognize keyframe 40% etc which are outside the scope of our
        // attribute value mode
        modes.CSS_NUMBER_MODE,
        {
          className: "selector-id",
          begin: /#[A-Za-z0-9_-]+/,
          relevance: 0
        },
        {
          className: "selector-class",
          begin: "\\." + IDENT_RE2,
          relevance: 0
        },
        modes.ATTRIBUTE_SELECTOR_MODE,
        {
          className: "selector-pseudo",
          variants: [
            { begin: ":(" + PSEUDO_CLASSES.join("|") + ")" },
            { begin: ":(:)?(" + PSEUDO_ELEMENTS.join("|") + ")" }
          ]
        },
        // we may actually need this (12/2020)
        // { // pseudo-selector params
        //   begin: /\(/,
        //   end: /\)/,
        //   contains: [ hljs.CSS_NUMBER_MODE ]
        // },
        modes.CSS_VARIABLE,
        {
          className: "attribute",
          begin: "\\b(" + ATTRIBUTES.join("|") + ")\\b"
        },
        // attribute values
        {
          begin: /:/,
          end: /[;}{]/,
          contains: [
            modes.BLOCK_COMMENT,
            modes.HEXCOLOR,
            modes.IMPORTANT,
            modes.CSS_NUMBER_MODE,
            ...STRINGS,
            // needed to highlight these as strings and to avoid issues with
            // illegal characters that might be inside urls that would tigger the
            // languages illegal stack
            {
              begin: /(url|data-uri)\(/,
              end: /\)/,
              relevance: 0,
              // from keywords
              keywords: { built_in: "url data-uri" },
              contains: [
                ...STRINGS,
                {
                  className: "string",
                  // any character other than `)` as in `url()` will be the start
                  // of a string, which ends with `)` (from the parent mode)
                  begin: /[^)]/,
                  endsWithParent: true,
                  excludeEnd: true
                }
              ]
            },
            modes.FUNCTION_DISPATCH
          ]
        },
        {
          begin: regex.lookahead(/@/),
          end: "[{;]",
          relevance: 0,
          illegal: /:/,
          // break on Less variables @var: ...
          contains: [
            {
              className: "keyword",
              begin: AT_PROPERTY_RE
            },
            {
              begin: /\s/,
              endsWithParent: true,
              excludeEnd: true,
              relevance: 0,
              keywords: {
                $pattern: /[a-z-]+/,
                keyword: AT_MODIFIERS,
                attribute: MEDIA_FEATURES.join(" ")
              },
              contains: [
                {
                  begin: /[a-z-]+(?=:)/,
                  className: "attribute"
                },
                ...STRINGS,
                modes.CSS_NUMBER_MODE
              ]
            }
          ]
        },
        {
          className: "selector-tag",
          begin: "\\b(" + TAGS.join("|") + ")\\b"
        }
      ]
    };
  }

  // src/userscript.entry.js
  core_default.registerLanguage("javascript", javascript);
  core_default.registerLanguage("html", xml2);
  core_default.registerLanguage("css", css);
  (function() {
    "use strict";
    const MAX_IMAGE_DIMENSION = 1280;
    const JPEG_QUALITY = 0.8;
    const INDENT_SPACES = "  ";
    const DEFINITIONS_HEADER = "<!-- sn-markdown-enhancer-definitions";
    const DEFINITIONS_FOOTER = "-->";
    let activeEditorInstance = null;
    let debouncedInputHandler = () => {
    };
    let isInternallyUpdating = false;
    const nativeTextareaSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    const I18N = {
      en: {
        editor: "Editor",
        split: "Split",
        preview: "Preview",
        toggleToolbar: "Toggle Toolbar",
        exportPDF: "Print / Export as PDF",
        paragraph: "Paragraph",
        heading1: "Heading 1",
        heading2: "Heading 2",
        heading3: "Heading 3",
        heading4: "Heading 4",
        bold: "Bold",
        italic: "Italic",
        strikethrough: "Strikethrough",
        inlineCode: "Inline Code",
        quote: "Quote",
        list: "Bulleted List",
        numberedList: "Numbered List",
        checklist: "Checklist",
        codeBlock: "Code Block",
        link: "Link",
        insertTable: "Insert/Edit Table",
        horizontalRule: "Horizontal Rule",
        image: "Image",
        linkPrompt: "Enter the link URL:",
        boldPlaceholder: "bold text",
        italicPlaceholder: "italic text",
        strikethroughPlaceholder: "strikethrough",
        codePlaceholder: "code",
        quotePlaceholder: "quote",
        listItemPlaceholder: "item",
        taskPlaceholder: "task",
        linkTextPlaceholder: "link text",
        copy: "Copy",
        copied: "Copied!",
        copyError: "Error",
        copyAriaLabel: "Copy code to clipboard",
        previewErrorTitle: "An error occurred while updating the preview:",
        printPDF: "PDF",
        pastedImageAltText: "Pasted Image at",
        insertImage: "Insert Image",
        fromURL: "From URL",
        uploadFile: "Upload File",
        imageURL: "Image URL",
        altText: "Alt Text (optional)",
        chooseFile: "Choose a file...",
        insert: "Insert",
        close: "Close",
        processing: "Processing...",
        errorImageProcessing: "Failed to process image.",
        tableEditor: "Interactive Table Editor",
        addRow: "Add Row",
        addCol: "Add Column",
        deleteRow: "Delete Row",
        deleteCol: "Delete Column",
        alignLeft: "Align Left",
        alignCenter: "Align Center",
        alignRight: "Align Right"
      },
      ja: {
        editor: "\u30A8\u30C7\u30A3\u30BF",
        split: "\u5206\u5272",
        preview: "\u30D7\u30EC\u30D3\u30E5\u30FC",
        toggleToolbar: "\u30C4\u30FC\u30EB\u30D0\u30FC\u8868\u793A\u5207\u66FF",
        exportPDF: "PDF\u3068\u3057\u3066\u5370\u5237/\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8",
        paragraph: "\u6BB5\u843D",
        heading1: "\u898B\u51FA\u3057 1",
        heading2: "\u898B\u51FA\u3057 2",
        heading3: "\u898B\u51FA\u3057 3",
        heading4: "\u898B\u51FA\u3057 4",
        bold: "\u592A\u5B57",
        italic: "\u659C\u4F53",
        strikethrough: "\u6253\u3061\u6D88\u3057\u7DDA",
        inlineCode: "\u30A4\u30F3\u30E9\u30A4\u30F3\u30B3\u30FC\u30C9",
        quote: "\u5F15\u7528",
        list: "\u30EA\u30B9\u30C8",
        numberedList: "\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8",
        checklist: "\u30C1\u30A7\u30C3\u30AF\u30EA\u30B9\u30C8",
        codeBlock: "\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF",
        link: "\u30EA\u30F3\u30AF",
        insertTable: "\u30C6\u30FC\u30D6\u30EB\u3092\u633F\u5165/\u7DE8\u96C6",
        horizontalRule: "\u6C34\u5E73\u7DDA",
        image: "\u753B\u50CF",
        linkPrompt: "\u30EA\u30F3\u30AF\u5148\u306EURL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044:",
        boldPlaceholder: "\u592A\u5B57",
        italicPlaceholder: "\u659C\u4F53",
        strikethroughPlaceholder: "\u6253\u3061\u6D88\u3057",
        codePlaceholder: "code",
        quotePlaceholder: "\u5F15\u7528\u6587",
        listItemPlaceholder: "\u9805\u76EE",
        taskPlaceholder: "\u30BF\u30B9\u30AF",
        linkTextPlaceholder: "\u30EA\u30F3\u30AF\u30C6\u30AD\u30B9\u30C8",
        copy: "\u30B3\u30D4\u30FC",
        copied: "\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F!",
        copyError: "\u30A8\u30E9\u30FC",
        copyAriaLabel: "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30FC\u30C9\u3092\u30B3\u30D4\u30FC",
        previewErrorTitle: "\u30D7\u30EC\u30D3\u30E5\u30FC\u306E\u66F4\u65B0\u4E2D\u306B\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F:",
        printPDF: "PDF",
        pastedImageAltText: "\u8CBC\u308A\u4ED8\u3051\u3089\u308C\u305F\u753B\u50CF",
        insertImage: "\u753B\u50CF\u3092\u633F\u5165",
        fromURL: "URL\u304B\u3089",
        uploadFile: "\u30D5\u30A1\u30A4\u30EB\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
        imageURL: "\u753B\u50CF\u306EURL",
        altText: "\u4EE3\u66FF\u30C6\u30AD\u30B9\u30C8\uFF08\u4EFB\u610F\uFF09",
        chooseFile: "\u30D5\u30A1\u30A4\u30EB\u3092\u9078\u629E...",
        insert: "\u633F\u5165",
        close: "\u9589\u3058\u308B",
        processing: "\u51E6\u7406\u4E2D...",
        errorImageProcessing: "\u753B\u50CF\u306E\u51E6\u7406\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002",
        tableEditor: "\u30A4\u30F3\u30BF\u30E9\u30AF\u30C6\u30A3\u30D6 \u30C6\u30FC\u30D6\u30EB\u30A8\u30C7\u30A3\u30BF",
        addRow: "\u884C\u3092\u8FFD\u52A0",
        addCol: "\u5217\u3092\u8FFD\u52A0",
        deleteRow: "\u3053\u306E\u884C\u3092\u524A\u9664",
        deleteCol: "\u3053\u306E\u5217\u3092\u524A\u9664",
        alignLeft: "\u5DE6\u63C3\u3048",
        alignCenter: "\u4E2D\u592E\u63C3\u3048",
        alignRight: "\u53F3\u63C3\u3048"
      }
    };
    const lang = navigator.language.startsWith("ja") ? "ja" : "en";
    const T2 = I18N[lang] || I18N.en;
    const STORAGE_KEY_MODE = "snMarkdownEditorMode";
    const STORAGE_KEY_TOOLBAR_VISIBLE = "snMarkdownToolbarVisible";
    const PREVIEW_CONTAINER_CLASS = "sn-markdown-preview-container";
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
        /* [BESTPRACTICE] \u30B3\u30F3\u30C6\u30CA\u5185\u306E\u5168\u8981\u7D20\u306B\u8272\u306E\u7D99\u627F\u3092\u5F37\u5236\u3057\u3001\u672C\u4F53CSS\u304B\u3089\u306E\u610F\u56F3\u3057\u306A\u3044\u4E0A\u66F8\u304D\u3092\u9632\u3050 */
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
    function createIcon(pathData) {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg2 = document.createElementNS(svgNS, "svg");
      svg2.setAttribute("viewBox", "0 0 24 24");
      const path = document.createElementNS(svgNS, "path");
      path.setAttribute("d", pathData);
      path.setAttribute("fill", "currentColor");
      svg2.appendChild(path);
      return svg2;
    }
    function setupTitleEnterListener() {
      const titleSelector = 'textarea[aria-label*="Note title"], #note-title-editor';
      const titleInput = document.querySelector(titleSelector);
      if (titleInput && !titleInput.dataset.enterKeyHandlerAttached) {
        console.log("Markdown Editor: Attaching Enter key handler to title input.");
        titleInput.dataset.enterKeyHandlerAttached = "true";
        let isComposing = false;
        titleInput.addEventListener("compositionstart", () => {
          isComposing = true;
        });
        titleInput.addEventListener("compositionend", () => {
          isComposing = false;
        });
        titleInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter" && !isComposing && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey) {
            e.preventDefault();
            handleFocusToEditor();
          }
        });
      }
    }
    function handleFocusToEditor() {
      console.log("Request received to focus custom editor.");
      if (activeEditorInstance) {
        const { textarea, switchMode } = activeEditorInstance;
        const currentMode = localStorage.getItem(STORAGE_KEY_MODE) || "split";
        if (currentMode === "preview") {
          switchMode("split", true);
        } else {
          textarea.focus();
        }
        requestAnimationFrame(() => {
          const len = textarea.value.length;
          textarea.setSelectionRange(len, len);
          textarea.scrollTop = textarea.scrollHeight;
        });
      } else {
        console.warn("Could not focus editor: activeEditorInstance is not available.");
      }
    }
    function setupMarkdownEditor(originalTextarea, isNewNoteSetup = false) {
      if (!originalTextarea || !originalTextarea.parentElement) {
        console.warn("Markdown Editor: Setup aborted. Target textarea is not attached to the DOM.");
        return;
      }
      if (originalTextarea.dataset.markdownReady) return;
      originalTextarea.dataset.markdownReady = "true";
      Zt({ gfm: true, breaks: true, smartLists: true, langPrefix: "language-" });
      const definitionsRegex = new RegExp(`\\n*${DEFINITIONS_HEADER}[\\s\\S]*?${DEFINITIONS_FOOTER}`, "g");
      const editorWrapper = originalTextarea.parentElement;
      editorWrapper.classList.add("sn-markdown-hidden", "sn-markdown-full-height");
      const container = document.createElement("div");
      container.className = "markdown-editor-container";
      const markdownTextarea = document.createElement("textarea");
      markdownTextarea.className = originalTextarea.className + " custom-markdown-textarea";
      markdownTextarea.spellcheck = false;
      let definitionsText = "";
      const extractAndSetContent = (fullText) => {
        const match = fullText.match(definitionsRegex);
        if (match) {
          definitionsText = match.join("\n\n");
          markdownTextarea.value = fullText.replace(definitionsRegex, "").trimEnd();
        } else {
          definitionsText = "";
          markdownTextarea.value = fullText;
        }
      };
      const getFullContent = () => {
        const mainContent = markdownTextarea.value.trim();
        const defs = definitionsText.replace(DEFINITIONS_HEADER, "").replace(DEFINITIONS_FOOTER, "").trim();
        if (defs) {
          return `${mainContent}

${DEFINITIONS_HEADER}
${defs}
${DEFINITIONS_FOOTER}`;
        }
        return mainContent;
      };
      const resizeAndEncodeImage = (file) => {
        return new Promise((resolve, reject) => {
          if (!file.type.startsWith("image/")) {
            return reject(new Error("File is not an image."));
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
              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(0, 0, width, height);
              ctx.drawImage(img, 0, 0, width, height);
              const dataUrl = canvas.toDataURL("image/jpeg", JPEG_QUALITY);
              resolve(dataUrl);
            };
            img.onerror = () => reject(new Error("Failed to load image."));
            img.src = event.target.result;
          };
          reader.onerror = () => reject(new Error("Failed to read file."));
          reader.readAsDataURL(file);
        });
      };
      function applyMarkdown(textarea, prefix, suffix = "", placeholder = "") {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        let selectedText = textarea.value.substring(start, end);
        const textBefore = textarea.value.substring(start - prefix.length, start);
        const textAfter = textarea.value.substring(end, end + suffix.length);
        if (textBefore === prefix && textAfter === suffix) {
          textarea.setRangeText(selectedText, start - prefix.length, end + suffix.length, "select");
        } else if (selectedText.startsWith(prefix) && selectedText.endsWith(suffix)) {
          const unwrappedText = selectedText.slice(prefix.length, -suffix.length || void 0);
          textarea.setRangeText(unwrappedText, start, end, "select");
        } else {
          if (selectedText) {
            textarea.setRangeText(prefix + selectedText + suffix, start, end, "select");
          } else {
            textarea.setRangeText(prefix + placeholder + suffix, start, end, "end");
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
        const timestamp = /* @__PURE__ */ new Date();
        const finalAltText = altText || `${T2.pastedImageAltText} ${timestamp.toLocaleString(lang)}`;
        const refId = `image-ref-${timestamp.getTime()}`;
        const markdownImageRef = `![${finalAltText}][${refId}]`;
        applyMarkdown(markdownTextarea, markdownImageRef);
        const markdownImageDef = `[${refId}]: ${base64data}`;
        let currentDefs = definitionsText.replace(DEFINITIONS_HEADER, "").replace(DEFINITIONS_FOOTER, "").trim();
        currentDefs = (currentDefs ? currentDefs + "\n" : "") + markdownImageDef;
        definitionsText = `${DEFINITIONS_HEADER}
${currentDefs}
${DEFINITIONS_FOOTER}`;
        debouncedInputHandler();
      };
      const textToTable = (text2) => {
        const rows = text2.trim().split("\n").map((row) => row.split("	"));
        const colCount = Math.max(...rows.map((row) => row.length));
        let markdown = `| ${rows[0].map((h2) => h2 || " ").join(" | ")} |
`;
        markdown += `|${" :--- |".repeat(colCount)}
`;
        for (let i = 1; i < rows.length; i++) {
          markdown += `| ${rows[i].map((c) => c || " ").join(" | ")} |
`;
        }
        return markdown;
      };
      const handlePaste = async (event) => {
        const clipboardData = event.clipboardData;
        const imageItem = Array.from(clipboardData.items).find((item) => item.type.startsWith("image/"));
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
        const text2 = clipboardData.getData("text/plain");
        if (text2.includes("	") && text2.includes("\n")) {
          event.preventDefault();
          const tableMd = textToTable(text2);
          document.execCommand("insertText", false, tableMd);
        }
      };
      const parseMarkdownTable = (text2) => {
        if (!text2 || typeof text2 !== "string" || !text2.includes("|")) return null;
        const lines = text2.trim().split("\n").map((l) => l.trim()).filter((l) => l.includes("|"));
        if (lines.length < 2) return null;
        const headerLine = lines[0];
        const separatorLine = lines[1];
        const dataLines = lines.slice(2);
        const parseRow = (rowString) => {
          const trimmed = rowString.trim();
          const content = trimmed.startsWith("|") && trimmed.endsWith("|") ? trimmed.slice(1, -1) : trimmed;
          return content.split("|").map((cell) => cell.trim());
        };
        const separatorParts = parseRow(separatorLine);
        if (!separatorParts.every((part) => /^:?-+:?$/.test(part))) return null;
        const header = parseRow(headerLine);
        const numCols = header.length;
        if (separatorParts.length !== numCols) return null;
        const alignments = separatorParts.map((part) => {
          const left = part.startsWith(":");
          const right = part.endsWith(":");
          if (left && right) return "center";
          if (right) return "right";
          return "left";
        });
        const rows = [header, ...dataLines.map((line) => {
          const rowData = parseRow(line);
          while (rowData.length < numCols) rowData.push("");
          return rowData.slice(0, numCols);
        })];
        return { rows, alignments };
      };
      const openImageInserterModal = (onInsertCallback) => {
        const modalOverlay = document.createElement("div");
        modalOverlay.className = "sn-modal-overlay";
        modalOverlay.innerHTML = `<div class="sn-modal-content sn-modal-content-image"><div class="sn-modal-header"><h3>${T2.insertImage}</h3><button class="sn-modal-close" title="${T2.close}">&times;</button></div><div class="sn-modal-body"><div class="sn-modal-tabs"><div class="sn-modal-tab active" data-tab="url">${T2.fromURL}</div><div class="sn-modal-tab" data-tab="upload">${T2.uploadFile}</div></div><div class="sn-modal-tab-content active" data-tab-content="url"><div class="sn-modal-form-group"><label for="sn-image-url">${T2.imageURL}</label><input type="text" id="sn-image-url" class="sn-modal-input" placeholder="https://example.com/image.jpg"></div></div><div class="sn-modal-tab-content" data-tab-content="upload"><div class="sn-modal-form-group"><label class="sn-modal-file-wrapper"><span class="sn-modal-file-label">${T2.chooseFile}</span><input type="file" class="sn-modal-file-input" accept="image/*"></label><div class="sn-modal-processing-indicator"></div></div></div><div class="sn-modal-form-group"><label for="sn-image-alt">${T2.altText}</label><input type="text" id="sn-image-alt" class="sn-modal-input" placeholder="A description of the image"></div></div><div class="sn-modal-footer"><button class="sn-modal-insert-btn">${T2.insert}</button></div></div>`;
        document.body.appendChild(modalOverlay);
        const content = modalOverlay.querySelector(".sn-modal-content");
        const urlInput = modalOverlay.querySelector("#sn-image-url");
        const altInput = modalOverlay.querySelector("#sn-image-alt");
        const fileInput = modalOverlay.querySelector(".sn-modal-file-input");
        const fileLabel = modalOverlay.querySelector(".sn-modal-file-label");
        const processingIndicator = modalOverlay.querySelector(".sn-modal-processing-indicator");
        const insertBtn = modalOverlay.querySelector(".sn-modal-insert-btn");
        const closeModal = () => document.body.contains(modalOverlay) && document.body.removeChild(modalOverlay);
        let base64data = null;
        let currentTab = "url";
        modalOverlay.querySelectorAll(".sn-modal-tab").forEach((tab) => {
          tab.onclick = () => {
            currentTab = tab.dataset.tab;
            modalOverlay.querySelectorAll(".sn-modal-tab").forEach((t) => t.classList.remove("active"));
            modalOverlay.querySelectorAll(".sn-modal-tab-content").forEach((c) => c.classList.remove("active"));
            tab.classList.add("active");
            modalOverlay.querySelector(`.sn-modal-tab-content[data-tab-content="${currentTab}"]`).classList.add("active");
            base64data = null;
            fileInput.value = "";
            fileLabel.textContent = T2.chooseFile;
            processingIndicator.innerHTML = "";
          };
        });
        fileInput.onchange = async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          fileLabel.textContent = file.name;
          processingIndicator.innerHTML = `<span>${T2.processing}</span>`;
          insertBtn.disabled = true;
          try {
            base64data = await resizeAndEncodeImage(file);
            processingIndicator.innerHTML = "";
            const imgPreview = document.createElement("img");
            imgPreview.src = base64data;
            imgPreview.className = "sn-modal-image-preview";
            processingIndicator.appendChild(imgPreview);
          } catch (error) {
            console.error(error);
            processingIndicator.innerHTML = `<span>${T2.errorImageProcessing}</span>`;
            base64data = null;
          } finally {
            insertBtn.disabled = false;
          }
        };
        insertBtn.onclick = () => {
          const altText = altInput.value.trim();
          if (currentTab === "url") {
            const url = urlInput.value.trim();
            if (url) {
              onInsertCallback(url, altText, false);
              closeModal();
            }
          } else {
            if (base64data) {
              onInsertCallback(base64data, altText, true);
              closeModal();
            }
          }
        };
        modalOverlay.querySelector(".sn-modal-close").onclick = closeModal;
        content.onclick = (e) => e.stopPropagation();
        modalOverlay.onclick = closeModal;
        urlInput.focus();
      };
      const openTableEditorModal = (initialData, onInsertCallback) => {
        let tableData;
        if (initialData && initialData.rows.length > 0) {
          tableData = JSON.parse(JSON.stringify(initialData));
        } else {
          tableData = { rows: [["", ""], ["", ""]], alignments: ["left", "left"] };
        }
        const modalOverlay = document.createElement("div");
        modalOverlay.className = "sn-modal-overlay";
        const render = () => {
          const colCount = tableData.rows[0]?.length || 0;
          const rowCount = tableData.rows.length;
          let headerHtml = "";
          for (let c = 0; c < colCount; c++) {
            const align = tableData.alignments[c];
            let alignIcon;
            switch (align) {
              case "center":
                alignIcon = "\u21CC";
                break;
              case "right":
                alignIcon = "\u2192";
                break;
              default:
                alignIcon = "\u2190";
            }
            headerHtml += `<th data-col="${c}"><div class="col-header-content" draggable="true"><span class="drag-handle">\u2059</span><div class="col-header" title="${T2.alignLeft}/${T2.alignCenter}/${T2.alignRight}"><span class="align-icon">${alignIcon}</span></div></div><div class="delete-btn delete-col-btn" title="${T2.deleteCol}">\u{1F5D1}\uFE0F</div></th>`;
          }
          let bodyHtml = "";
          for (let r = 0; r < rowCount; r++) {
            bodyHtml += `<tr data-row="${r}"><td class="control-cell"><span class="drag-handle" draggable="true">\u2059</span><div class="delete-btn delete-row-btn" title="${T2.deleteRow}">\u{1F5D1}\uFE0F</div></td>`;
            for (let c = 0; c < colCount; c++) {
              const cellValue = tableData.rows[r][c] || "";
              const placeholder = r === 0 ? "Header" : "Cell";
              bodyHtml += `<td><input class="cell-input" type="text" value="${cellValue.replace(/"/g, "&quot;")}" placeholder="${placeholder}" data-row="${r}" data-col="${c}"></td>`;
            }
            bodyHtml += `<td class="control-cell"></td></tr>`;
          }
          const tableHtml = `<table class="sn-table-editor"><thead><tr><th class="control-cell"></th>${headerHtml}<th class="control-cell"><div class="add-btn add-col-btn" title="${T2.addCol}">+</div></th></tr></thead><tbody>${bodyHtml}<tr><td class="control-cell"></td><td colspan="${colCount}" class="control-cell"><div class="add-btn add-row-btn" title="${T2.addRow}">+</div></td><td class="control-cell"></td></tr></tbody></table>`;
          modalOverlay.innerHTML = `<div class="sn-modal-content sn-modal-content-table"><div class="sn-modal-header"><h3>${T2.tableEditor}</h3><button class="sn-modal-close" title="${T2.close}">&times;</button></div><div class="sn-modal-body"><div class="sn-table-editor-container"><div class="sn-table-scroll-container">${tableHtml}</div></div></div><div class="sn-modal-footer"><button class="sn-modal-insert-btn">${T2.insert}</button></div></div>`;
          attachEventListeners();
        };
        const attachEventListeners = () => {
          const content = modalOverlay.querySelector(".sn-modal-content");
          const closeModal = () => document.body.contains(modalOverlay) && document.body.removeChild(modalOverlay);
          let draggedItem = null;
          modalOverlay.querySelector(".sn-modal-close").onclick = closeModal;
          content.onclick = (e) => e.stopPropagation();
          modalOverlay.onclick = closeModal;
          modalOverlay.querySelector(".sn-modal-insert-btn").onclick = () => {
            let markdown = "";
            const colCount = tableData.rows[0]?.length || 0;
            if (colCount > 0 && tableData.rows.some((row) => row.some((cell) => cell.trim() !== ""))) {
              markdown += "| " + tableData.rows[0].map((c) => c.trim() || " ").join(" | ") + " |\n";
              markdown += "|" + tableData.alignments.map((a3) => {
                if (a3 === "center") return " :---: ";
                if (a3 === "right") return " ---: ";
                return " :--- ";
              }).join("|") + "|\n";
              for (let i = 1; i < tableData.rows.length; i++) {
                markdown += "| " + tableData.rows[i].map((c) => c.trim() || " ").join(" | ") + " |\n";
              }
            }
            onInsertCallback(markdown);
            closeModal();
          };
          modalOverlay.querySelector(".add-row-btn").onclick = () => {
            if (tableData.rows.length === 0) {
              tableData.rows.push([""]);
              tableData.alignments = ["left"];
            } else {
              tableData.rows.push(new Array(tableData.rows[0]?.length || 1).fill(""));
            }
            render();
          };
          modalOverlay.querySelector(".add-col-btn").onclick = () => {
            if (tableData.rows.length === 0) {
              tableData.rows.push([""]);
              tableData.alignments = ["left"];
            } else {
              tableData.rows.forEach((row) => row.push(""));
              tableData.alignments.push("left");
            }
            render();
          };
          modalOverlay.querySelectorAll(".delete-row-btn").forEach((btn) => {
            btn.onclick = (e) => {
              const row = parseInt(e.target.closest("tr").dataset.row, 10);
              if (tableData.rows.length > 1) {
                tableData.rows.splice(row, 1);
                render();
              }
            };
          });
          modalOverlay.querySelectorAll(".delete-col-btn").forEach((btn) => {
            btn.onclick = (e) => {
              const col = parseInt(e.target.closest("th").dataset.col, 10);
              if (tableData.rows[0].length > 1) {
                tableData.rows.forEach((row) => row.splice(col, 1));
                tableData.alignments.splice(col, 1);
                render();
              }
            };
          });
          modalOverlay.querySelectorAll(".col-header").forEach((header) => {
            header.onclick = (e) => {
              const col = parseInt(e.currentTarget.closest("th").dataset.col, 10);
              const aligns = ["left", "center", "right"];
              tableData.alignments[col] = aligns[(aligns.indexOf(tableData.alignments[col]) + 1) % aligns.length];
              render();
            };
          });
          modalOverlay.querySelectorAll(".cell-input").forEach((input) => {
            input.oninput = (e) => {
              const { row, col } = e.target.dataset;
              tableData.rows[row][col] = e.target.value;
            };
            input.onkeydown = (e) => {
              const { row, col } = e.target.dataset;
              const r = parseInt(row, 10);
              const c = parseInt(col, 10);
              let nextCell = null;
              if (e.key === "Enter" || e.key === "ArrowDown") {
                e.preventDefault();
                nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r + 1}"][data-col="${c}"]`);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r - 1}"][data-col="${c}"]`);
              } else if (e.key === "Tab") {
                e.preventDefault();
                if (e.shiftKey) {
                  nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r}"][data-col="${c - 1}"]`) || modalOverlay.querySelector(`.cell-input[data-row="${r - 1}"][data-col="${(tableData.rows[0]?.length || 1) - 1}"]`);
                } else {
                  nextCell = modalOverlay.querySelector(`.cell-input[data-row="${r}"][data-col="${c + 1}"]`) || modalOverlay.querySelector(`.cell-input[data-row="${r + 1}"][data-col="0"]`);
                }
              }
              if (nextCell) {
                nextCell.focus();
              }
            };
          });
          modalOverlay.querySelectorAll('tbody tr .drag-handle[draggable="true"]').forEach((handle) => {
            const row = handle.closest("tr");
            handle.addEventListener("dragstart", (e) => {
              e.stopPropagation();
              draggedItem = row;
              const rowIndex = parseInt(draggedItem.dataset.row, 10);
              e.dataTransfer.setData("text/plain", rowIndex);
              e.dataTransfer.effectAllowed = "move";
              setTimeout(() => draggedItem.classList.add("dragging"), 0);
            });
            handle.addEventListener("dragend", () => {
              draggedItem?.classList.remove("dragging");
              modalOverlay.querySelectorAll(".drag-over-row").forEach((el) => el.classList.remove("drag-over-row"));
              draggedItem = null;
            });
          });
          modalOverlay.querySelectorAll("tbody tr").forEach((row) => {
            row.addEventListener("dragover", (e) => {
              e.preventDefault();
              const targetRow = e.currentTarget;
              if (targetRow && targetRow !== draggedItem) {
                modalOverlay.querySelectorAll(".drag-over-row").forEach((el) => el.classList.remove("drag-over-row"));
                targetRow.classList.add("drag-over-row");
              }
            });
            row.addEventListener("dragleave", (e) => {
              e.currentTarget.classList.remove("drag-over-row");
            });
            row.addEventListener("drop", (e) => {
              e.preventDefault();
              const targetRow = e.currentTarget;
              targetRow.classList.remove("drag-over-row");
              if (!targetRow || targetRow === draggedItem) return;
              const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
              const targetIndex = parseInt(targetRow.dataset.row, 10);
              const [removedRowData] = tableData.rows.splice(sourceIndex, 1);
              tableData.rows.splice(targetIndex, 0, removedRowData);
              render();
            });
          });
          modalOverlay.querySelectorAll('th .col-header-content[draggable="true"]').forEach((handle) => {
            const headerCell = handle.closest("th");
            handle.addEventListener("dragstart", (e) => {
              e.stopPropagation();
              draggedItem = headerCell;
              const colIndex = parseInt(draggedItem.dataset.col, 10);
              e.dataTransfer.setData("text/plain", colIndex);
              e.dataTransfer.effectAllowed = "move";
              setTimeout(() => draggedItem.classList.add("dragging"), 0);
            });
            handle.addEventListener("dragend", (e) => {
              e.stopPropagation();
              draggedItem?.classList.remove("dragging");
              modalOverlay.querySelectorAll(".drag-over-col").forEach((el) => el.classList.remove("drag-over-col"));
              draggedItem = null;
            });
          });
          modalOverlay.querySelectorAll("thead th[data-col]").forEach((headerCell) => {
            headerCell.addEventListener("dragover", (e) => {
              e.preventDefault();
              const targetCol = e.target.closest("th[data-col]");
              if (targetCol && targetCol !== draggedItem) {
                modalOverlay.querySelectorAll(".drag-over-col").forEach((el) => el.classList.remove("drag-over-col"));
                targetCol.classList.add("drag-over-col");
              }
            });
            headerCell.addEventListener("dragleave", (e) => {
              e.target.closest("th[data-col]")?.classList.remove("drag-over-col");
            });
            headerCell.addEventListener("drop", (e) => {
              e.preventDefault();
              e.stopPropagation();
              const targetCol = e.target.closest("th[data-col]");
              if (!targetCol || targetCol === draggedItem) return;
              const sourceIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
              const targetIndex = parseInt(targetCol.dataset.col, 10);
              const [removedAlign] = tableData.alignments.splice(sourceIndex, 1);
              tableData.alignments.splice(targetIndex, 0, removedAlign);
              tableData.rows.forEach((row) => {
                const [removedCell] = row.splice(sourceIndex, 1);
                row.splice(targetIndex, 0, removedCell);
              });
              render();
            });
          });
        };
        document.body.appendChild(modalOverlay);
        render();
        modalOverlay.querySelector(".cell-input")?.focus();
      };
      const modeBar = document.createElement("div");
      modeBar.className = "mode-toggle-bar";
      const editorButton = document.createElement("button");
      editorButton.className = "mode-toggle-button";
      editorButton.textContent = T2.editor;
      const splitButton = document.createElement("button");
      splitButton.className = "mode-toggle-button";
      splitButton.textContent = T2.split;
      const previewButton = document.createElement("button");
      previewButton.className = "mode-toggle-button";
      previewButton.textContent = T2.preview;
      const toolbarToggleButton = document.createElement("button");
      toolbarToggleButton.className = "mode-toggle-button toolbar-toggle-button";
      toolbarToggleButton.title = T2.toggleToolbar;
      toolbarToggleButton.appendChild(createIcon("M3 18h18v-2H3v2z m0-5h18v-2H3v2z m0-7v2h18V6H3z"));
      const printButton = document.createElement("button");
      printButton.className = "mode-toggle-button pdf-export-button";
      printButton.textContent = T2.printPDF;
      printButton.title = T2.exportPDF;
      const toolbar = document.createElement("div");
      toolbar.className = "markdown-toolbar";
      const previewContainer = document.createElement("div");
      previewContainer.className = PREVIEW_CONTAINER_CLASS;
      markdownTextarea.addEventListener("paste", handlePaste);
      const toolbarButtons = [
        { type: "select", name: "heading", options: [{ value: "p", text: T2.paragraph }, { value: "h1", text: T2.heading1 }, { value: "h2", text: T2.heading2 }, { value: "h3", text: T2.heading3 }, { value: "h4", text: T2.heading4 }], action: (prefix) => {
          const start = markdownTextarea.selectionStart;
          let lineStart = markdownTextarea.value.lastIndexOf("\n", start - 1) + 1;
          let lineEnd = markdownTextarea.value.indexOf("\n", start);
          if (lineEnd === -1) lineEnd = markdownTextarea.value.length;
          const originalLine = markdownTextarea.value.substring(lineStart, lineEnd);
          const cleanedLine = originalLine.replace(/^\s*#+\s*/, "");
          const newText = prefix ? `${prefix} ${cleanedLine}` : cleanedLine;
          markdownTextarea.setRangeText(newText, lineStart, lineEnd, "end");
          debouncedInputHandler();
          markdownTextarea.focus();
        } },
        { type: "button", name: "B", title: T2.bold, action: () => applyMarkdown(markdownTextarea, "**", "**", T2.boldPlaceholder) },
        { type: "button", name: "I", title: T2.italic, action: () => applyMarkdown(markdownTextarea, "*", "*", T2.italicPlaceholder) },
        { type: "button", name: "S", title: T2.strikethrough, action: () => applyMarkdown(markdownTextarea, "~~", "~~", T2.strikethroughPlaceholder) },
        { type: "button", name: "`", title: T2.inlineCode, action: () => applyMarkdown(markdownTextarea, "`", "`", T2.codePlaceholder) },
        { type: "button", name: "\u201C \u201D", title: T2.quote, action: () => applyMarkdown(markdownTextarea, "> ", "", T2.quotePlaceholder) },
        { type: "button", name: "\u2022", title: T2.list, action: () => applyMarkdown(markdownTextarea, "- ", "", T2.listItemPlaceholder) },
        { type: "button", name: "1.", title: T2.numberedList, action: () => applyMarkdown(markdownTextarea, "1. ", "", T2.listItemPlaceholder) },
        { type: "button", name: "\u2611", title: T2.checklist, action: () => applyMarkdown(markdownTextarea, "- [ ] ", "", T2.taskPlaceholder) },
        { type: "button", name: "</>", title: T2.codeBlock, action: () => applyMarkdown(markdownTextarea, "```\n", "\n```", T2.codePlaceholder) },
        { type: "icon", title: T2.image, path: "M21 19V5 c 0 -1.1 -0.9 -2 -2 -2 H5 c -1.1 0 -2 0.9 -2 2 v14 c 0 1.1 0.9 2 2 2 h14 c 1.1 0 2 -0.9 2 -2 z M8.5 13.5 l 2.5 3.01 L14.5 12 l 4.5 6 H5 l 3.5 -4.5 z", action: () => {
          openImageInserterModal((data, altText, isReference) => {
            if (isReference) {
              insertImageAsReference(data, altText);
            } else {
              const markdown = `![${altText}](${data})`;
              applyMarkdown(markdownTextarea, markdown);
            }
          });
        } },
        { type: "icon", title: T2.link, path: "M3.9 12 c 0 -1.71 1.39 -3.1 3.1 -3.1 h4 V7 H7 c -2.76 0 -5 2.24 -5 5 s2.24 5 5 5 h4 v-1.9 H7 c -1.71 0 -3.1 -1.39 -3.1 -3.1 z M8 13 h8 v-2 H8 v2 z m9 -6 h-4 v1.9 h4 c 1.71 0 3.1 1.39 3.1 3.1 s -1.39 3.1 -3.1 3.1 h-4 V17 h4 c 2.76 0 -5 -2.24 -5 -5 s -2.24 -5 -5 -5 z", action: () => {
          const url = prompt(T2.linkPrompt, "https://");
          if (url) applyMarkdown(markdownTextarea, "[", `](${url})`, T2.linkTextPlaceholder);
        } },
        { type: "icon", title: T2.insertTable, path: "M20 4 H4 c -1.1 0 -2 0.9 -2 2 v12 c 0 1.1 0.9 2 2 2 h16 c 1.1 0 2 -0.9 2 -2 V6 c 0 -1.1 -0.9 -2 -2 -2 z M8 10 H4 V6 h4 v4 z m6 0 h-4 V6 h4 v4 z m6 0 h-4 V6 h4 v4 z M8 14 H4 v4 h4 v-4 z m6 0 h-4 v4 h4 v-4 z m6 0 h-4 v4 h4 v-4 z", action: () => {
          const start = markdownTextarea.selectionStart;
          const end = markdownTextarea.selectionEnd;
          const selectedText = markdownTextarea.value.substring(start, end);
          const existingTableData = parseMarkdownTable(selectedText);
          openTableEditorModal(existingTableData, (markdown) => {
            markdownTextarea.setRangeText(markdown, start, end, "select");
            markdownTextarea.focus();
            debouncedInputHandler();
          });
        } },
        { type: "button", name: "\u2015", title: T2.horizontalRule, action: () => applyMarkdown(markdownTextarea, "\n---\n") }
      ];
      toolbarButtons.forEach((item) => {
        if (item.type === "select") {
          const select = document.createElement("select");
          select.className = "toolbar-select heading-select";
          item.options.forEach((opt) => {
            const option = document.createElement("option");
            option.value = opt.value;
            option.textContent = opt.text;
            select.appendChild(option);
          });
          select.onchange = (e) => {
            let prefix = "";
            switch (e.target.value) {
              case "h1":
                prefix = "#";
                break;
              case "h2":
                prefix = "##";
                break;
              case "h3":
                prefix = "###";
                break;
              case "h4":
                prefix = "####";
                break;
            }
            item.action(prefix);
            updateHeadingSelector();
          };
          toolbar.appendChild(select);
        } else {
          const button = document.createElement("button");
          button.className = "toolbar-button";
          button.title = item.title;
          button.onclick = item.action;
          if (item.type === "icon") {
            button.classList.add("icon-button");
            button.appendChild(createIcon(item.path));
          } else {
            button.textContent = item.name;
          }
          toolbar.appendChild(button);
        }
      });
      const headingSelect = toolbar.querySelector(".heading-select");
      const updateHeadingSelector = () => {
        if (!headingSelect) return;
        const pos = markdownTextarea.selectionStart;
        const text2 = markdownTextarea.value;
        const lineStart = text2.lastIndexOf("\n", pos - 1) + 1;
        let lineEnd = text2.indexOf("\n", lineStart);
        if (lineEnd === -1) {
          lineEnd = text2.length;
        }
        const line = text2.substring(lineStart, lineEnd);
        let headingLevel = "p";
        if (line.startsWith("#### ")) {
          headingLevel = "h4";
        } else if (line.startsWith("### ")) {
          headingLevel = "h3";
        } else if (line.startsWith("## ")) {
          headingLevel = "h2";
        } else if (line.startsWith("# ")) {
          headingLevel = "h1";
        }
        if (headingSelect.value !== headingLevel) {
          headingSelect.value = headingLevel;
        }
      };
      const debouncedUpdateHeadingSelector = debounce(updateHeadingSelector, 150);
      markdownTextarea.addEventListener("keyup", debouncedUpdateHeadingSelector);
      markdownTextarea.addEventListener("click", debouncedUpdateHeadingSelector);
      markdownTextarea.addEventListener("focus", debouncedUpdateHeadingSelector);
      const contentWrapper = document.createElement("div");
      contentWrapper.className = "editor-preview-wrapper";
      contentWrapper.append(markdownTextarea, previewContainer);
      modeBar.append(editorButton, splitButton, previewButton, toolbarToggleButton, printButton);
      container.append(modeBar, toolbar, contentWrapper);
      editorWrapper.after(container);
      const updatePreview = () => {
        try {
          const mainContent = markdownTextarea.value;
          const unwrappedDefs = definitionsText.replace(DEFINITIONS_HEADER, "").replace(DEFINITIONS_FOOTER, "").trim();
          const contentForPreview = `${mainContent}

${unwrappedDefs}`;
          const dirtyHtml = jt(contentForPreview);
          const sanitizedHtml = purify.sanitize(dirtyHtml, { USE_PROFILES: { html: true }, ADD_ATTR: ["class", "type", "disabled", "checked", "data-task-index", "data-processed", "data-explicit-lang"], ADD_TAGS: ["span", "input"] });
          previewContainer.innerHTML = sanitizedHtml;
          previewContainer.querySelectorAll('pre > code[class*="language-"]').forEach((codeEl) => {
            const langMatch = Array.from(codeEl.classList).find((cls) => cls.startsWith("language-"));
            if (langMatch) {
              const lang2 = langMatch.replace("language-", "");
              if (lang2) {
                codeEl.parentElement.dataset.explicitLang = lang2;
              }
            }
          });
          previewContainer.querySelectorAll("pre code").forEach(core_default.highlightElement);
          previewContainer.querySelectorAll("pre").forEach((preEl) => {
            if (preEl.dataset.processed) return;
            preEl.dataset.processed = "true";
            const codeEl = preEl.querySelector("code");
            if (!codeEl) return;
            const langLabel = document.createElement("div");
            langLabel.className = "code-language-label";
            langLabel.textContent = preEl.dataset.explicitLang || "code";
            preEl.appendChild(langLabel);
            const copyButton = document.createElement("button");
            copyButton.className = "copy-code-button";
            copyButton.textContent = T2.copy;
            copyButton.setAttribute("aria-label", T2.copyAriaLabel);
            preEl.appendChild(copyButton);
            copyButton.addEventListener("click", (e) => {
              e.stopPropagation();
              navigator.clipboard.writeText(codeEl.innerText).then(() => {
                copyButton.textContent = T2.copied;
                copyButton.classList.add("copied");
                setTimeout(() => {
                  copyButton.textContent = T2.copy;
                  copyButton.classList.remove("copied");
                }, 2e3);
              }).catch((err) => {
                console.error("Failed to copy code block.", err);
                copyButton.textContent = T2.copyError;
                setTimeout(() => {
                  copyButton.textContent = T2.copy;
                }, 2e3);
              });
            });
          });
          previewContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
            const listItem = checkbox.closest("li");
            if (listItem) {
              listItem.classList.add("task-list-item");
              if (checkbox.checked) {
                listItem.classList.add("completed");
              }
              checkbox.addEventListener("click", (e) => {
                e.preventDefault();
                handlePreviewChecklistToggle(index);
              });
            }
          });
        } catch (e) {
          console.error("Error updating preview:", e);
          previewContainer.innerHTML = `<div class="preview-error"><strong>${T2.previewErrorTitle}</strong><br><pre>${e.stack || e}</pre></div>`;
        }
      };
      const debouncedUpdatePreview = debounce(updatePreview, 250);
      const handlePreviewChecklistToggle = (toggledIndex) => {
        const text2 = markdownTextarea.value;
        const regex = /^\s*(?:-|\*|\d+\.)\s+\[( |x)\]/gm;
        let currentIndex = 0;
        const newText = text2.replace(regex, (original) => {
          if (currentIndex === toggledIndex) {
            currentIndex++;
            return original.includes("[ ]") ? original.replace("[ ]", "[x]") : original.replace("[x]", "[ ]");
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
      markdownTextarea.addEventListener("mousedown", (e) => {
        mouseDownTime = Date.now();
        mouseDownPos = { x: e.clientX, y: e.clientY };
      });
      const handleEditorClick = (e) => {
        const textarea = e.target;
        const mouseUpTime = Date.now();
        const distance = Math.sqrt(Math.pow(e.clientX - mouseDownPos.x, 2) + Math.pow(e.clientY - mouseDownPos.y, 2));
        if (mouseUpTime - mouseDownTime > 250 || distance > 5 || textarea.selectionStart !== textarea.selectionEnd) {
          return;
        }
        const pos = textarea.selectionStart;
        const text2 = textarea.value;
        const lineStart = text2.lastIndexOf("\n", pos - 1) + 1;
        const lineEnd = text2.indexOf("\n", pos);
        const effectiveLineEnd = lineEnd === -1 ? text2.length : lineEnd;
        const line = text2.substring(lineStart, effectiveLineEnd);
        const checklistRegex = /^(\s*)(?:-|\*|\d+\.)\s\[( |x)\]/;
        const match = line.match(checklistRegex);
        if (match && pos - lineStart <= match[0].length) {
          e.preventDefault();
          const replacement = line.includes("[ ]") ? "[x]" : "[ ]";
          const newLine = line.replace(/\[( |x)\]/, replacement);
          markdownTextarea.value = text2.substring(0, lineStart) + newLine + text2.substring(effectiveLineEnd);
          textarea.selectionStart = textarea.selectionEnd = pos;
          debouncedInputHandler();
        }
      };
      markdownTextarea.addEventListener("click", handleEditorClick);
      const handleEnterKey = (e) => {
        const textarea = e.target;
        const pos = textarea.selectionStart;
        const text2 = textarea.value;
        const lineStart = text2.lastIndexOf("\n", pos - 1) + 1;
        const line = text2.substring(lineStart, pos);
        const listRegex = /^(\s*)((?:-|\*|\d+\.)\s(?:\[[ x]\]\s)?)(\s*.*)/;
        const match = line.match(listRegex);
        if (match) {
          const content = match[3];
          if (!content.trim()) {
            e.preventDefault();
            textarea.setRangeText("", lineStart, pos, "end");
            debouncedInputHandler();
            return;
          }
          e.preventDefault();
          const indent = match[1];
          let listMarker = match[2];
          const numberedMatch = listMarker.match(/^(\d+)\.\s/);
          if (numberedMatch) {
            listMarker = `${parseInt(numberedMatch[1], 10) + 1}. `;
          } else if (listMarker.includes("[x]")) {
            listMarker = listMarker.replace("[x]", "[ ]");
          }
          textarea.setRangeText(`
${indent}${listMarker}`, pos, pos, "end");
          debouncedInputHandler();
        }
      };
      markdownTextarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey && !e.metaKey) {
          handleEnterKey(e);
        }
      });
      const cleanupOrphanedImageRefs = () => {
        const contentValue = markdownTextarea.value;
        const usedRefs = /* @__PURE__ */ new Set();
        const referenceRegex = /!\[.*?\]\[(image-ref-\d+)\]/g;
        let match;
        while ((match = referenceRegex.exec(contentValue)) !== null) {
          usedRefs.add(match[1]);
        }
        const currentDefsContent = definitionsText.replace(DEFINITIONS_HEADER, "").replace(DEFINITIONS_FOOTER, "").trim();
        if (!currentDefsContent) return false;
        const defLines = currentDefsContent.split("\n");
        const keptDefLines = defLines.filter((line) => {
          const defMatch = line.match(/^\[(image-ref-\d+)\]:/);
          return defMatch && usedRefs.has(defMatch[1]);
        });
        const newDefsContent = keptDefLines.join("\n");
        if (newDefsContent !== currentDefsContent) {
          if (newDefsContent) {
            definitionsText = `${DEFINITIONS_HEADER}
${newDefsContent}
${DEFINITIONS_FOOTER}`;
          } else {
            definitionsText = "";
          }
          return true;
        }
        return false;
      };
      const handleInput = () => {
        cleanupOrphanedImageRefs();
        isInternallyUpdating = true;
        nativeTextareaSetter.call(originalTextarea, getFullContent());
        if (!document.hidden) {
          originalTextarea.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
        }
        if (container.classList.contains("mode-split") || container.classList.contains("mode-preview")) {
          debouncedUpdatePreview();
        }
        requestAnimationFrame(() => {
          isInternallyUpdating = false;
        });
      };
      markdownTextarea.addEventListener('input', handleInput);
      const observer = new MutationObserver(() => {
        if (isInternallyUpdating) {
          return;
        }
        console.log("Markdown Editor: External change detected. Syncing to custom editor.");
        isInternallyUpdating = true;
        extractAndSetContent(originalTextarea.value);
        if (container.classList.contains("mode-split") || container.classList.contains("mode-preview")) {
          updatePreview();
        }
        requestAnimationFrame(() => {
          isInternallyUpdating = false;
        });
      });
      observer.observe(originalTextarea, { attributes: true, childList: true, subtree: true, characterData: true });
      let scrollRequest;
      const handleScroll = (source, target) => {
        if (source.isSyncing) {
          source.isSyncing = false;
          return;
        }
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
        container.classList.remove("mode-editor", "mode-split", "mode-preview");
        container.classList.add(`mode-${mode}`);
        Object.values(modeButtons).forEach((btn) => btn.classList.remove("active"));
        modeButtons[mode].classList.add("active");
        localStorage.setItem(STORAGE_KEY_MODE, mode);
        markdownTextarea.removeEventListener("scroll", onEditorScroll);
        previewContainer.removeEventListener("scroll", onPreviewScroll);
        if (mode === "split") {
          markdownTextarea.addEventListener("scroll", onEditorScroll, { passive: true });
          previewContainer.addEventListener("scroll", onPreviewScroll, { passive: true });
        }
        if (mode === "preview" || mode === "split") {
          updatePreview();
        }
        if (shouldFocus && mode !== "preview") {
          markdownTextarea.focus();
        }
        updateHeadingSelector();
      };
      editorButton.addEventListener("click", () => switchMode("editor"));
      splitButton.addEventListener("click", () => switchMode("split"));
      previewButton.addEventListener("click", () => switchMode("preview"));
      const toggleToolbar = (visible) => {
        container.classList.toggle("toolbar-hidden", !visible);
        toolbarToggleButton.classList.toggle("active", visible);
        localStorage.setItem(STORAGE_KEY_TOOLBAR_VISIBLE, visible);
      };
      toolbarToggleButton.addEventListener("click", () => {
        const isVisible = container.classList.contains("toolbar-hidden");
        toggleToolbar(isVisible);
      });
      const handlePrint = () => {
        const printContainer = document.createElement("div");
        printContainer.className = "print-container";
        if (container.classList.contains("mode-editor")) {
          const pre = document.createElement("pre");
          pre.className = "raw-text-print";
          pre.textContent = markdownTextarea.value;
          printContainer.appendChild(pre);
        } else {
          const printContent = document.createElement("div");
          printContent.className = "print-content";
          const printStyle = document.createElement("style");
          printStyle.textContent = SCOPED_PREVIEW_STYLES.replace(new RegExp(`\\.${PREVIEW_CONTAINER_CLASS}`, "g"), "");
          printContent.innerHTML = previewContainer.innerHTML;
          printContainer.append(printStyle, printContent);
        }
        document.body.appendChild(printContainer);
        window.print();
        document.body.removeChild(printContainer);
      };
      printButton.addEventListener("click", handlePrint);
      extractAndSetContent(originalTextarea.value);
      const initialToolbarVisible = localStorage.getItem(STORAGE_KEY_TOOLBAR_VISIBLE) !== "false";
      toggleToolbar(initialToolbarVisible);
      const savedMode = localStorage.getItem(STORAGE_KEY_MODE);
      activeEditorInstance = { textarea: markdownTextarea, switchMode };
      switchMode(savedMode || "split", isNewNoteSetup);
      console.log(`Markdown Editor for Standard Notes (v${GM_info.script.version}, Robust Edition) has been initialized.`);
      if (isNewNoteSetup) {
        console.log("New note detected, focusing editor.");
      }
    }
    function initiateEditorSetup(editor, attempts = 0) {
      const MAX_ATTEMPTS = 40;
      const RETRY_INTERVAL = 50;
      if (!editor.isConnected) {
        console.log("Markdown Editor: Polling stopped. Editor was detached from DOM during initialization.");
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
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue;
            const editor = node.matches("#note-text-editor") ? node : node.querySelector("#note-text-editor");
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
        const oldCustomEditor = document.querySelector(".markdown-editor-container");
        if (oldCustomEditor) oldCustomEditor.remove();
        initiateEditorSetup(editorInstance);
      }
      setupTitleEnterListener();
      const customEditor = document.querySelector(".markdown-editor-container");
      if (customEditor && !document.querySelector("#note-text-editor")) {
        customEditor.remove();
        activeEditorInstance = null;
        const hiddenWrapper = document.querySelector("#editor-content.sn-markdown-hidden");
        if (hiddenWrapper) {
          hiddenWrapper.classList.remove("sn-markdown-hidden");
        }
      }
    });
    mainObserver.observe(document.body, { childList: true, subtree: true });
  })();
})();
// @license              MIT
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.2.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.6/LICENSE *)
*/
