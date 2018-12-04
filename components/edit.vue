<template>
  <div id="note" class="wrapper">
      <div class="contents" :class="viewMode">
        <div class="contents__edit"><textarea :value="editText" @input="$emit('editMemo',$event.target.value)"></textarea></div>
        <div class="contents__view"><div v-html="compiledMarkdown"></div></div>
      </div>
  </div>
</template>

<script>
import Marked from 'marked'
import HighlightJs from 'highlight.js'
export default {
  props:['viewMode','editText'],
  data() {
    return {
      activeIndex: '',
      memoIndex: '',
    };
  },
  computed: {
    //markdownを変換する
    compiledMarkdown: function () {
      let memo;
      if(this.editText){

        var renderer = new Marked.Renderer;
        renderer.code = function(code, language) {
          return '<pre'+'><code class="hljs language-'+ language +'">' + HighlightJs.highlightAuto(code).value + '</code></pre>';
        };
        Marked.setOptions({
          breaks: true,
          langPrefix: 'language-',
          sanitize: true,
          renderer: renderer
        })
        return Marked(this.editText)
      }
    }
  }
}
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  height: 100%;
  background-color: #fff;
}
.contents {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}
.contents__edit,
.contents__view {
  width: 50%;

  transition: width .3s;
}
.contents__edit {
  background-color: #f8f8f8;
}
.contents__edit textarea {
  background-color: #f8f8f8;
    padding: 10px;
    border: none;
    width: 100%;
    min-height: 100%;
    height: auto;
    flex-grow: 1;
    outline: none;
    resize: none;
    line-height: 160%;
    overflow: inherit;
}
.contents__view div {
  height: 100%;
  overflow: auto;
  padding: 10px;
}
.contents.edit .contents__edit {
  width: 100%;

}
.contents.edit .contents__view {
  width: 0;
  padding: 0;
  overflow: hidden;
}
.contents.view .contents__edit {
  width: 0;
  padding: 0;
  overflow: hidden;
}
.contents.view .contents__view {
  width: 100%;
}
.contents__view .pl-c {
  color: #6a737d;
}
.contents__view .pl-c1,
.contents__view .pl-s .pl-v {
  color: #005cc5;
}
.contents__view .pl-e,
.contents__view .pl-en {
  color: #6f42c1;
}
.contents__view .pl-smi,
.contents__view .pl-s .pl-s1 {
  color: #24292e;
}
.contents__view .pl-ent {
  color: #22863a;
}
.contents__view .pl-k {
  color: #d73a49;
}
.contents__view .pl-s,
.contents__view .pl-pds,
.contents__view .pl-s .pl-pse .pl-s1,
.contents__view .pl-sr,
.contents__view .pl-sr .pl-cce,
.contents__view .pl-sr .pl-sre,
.contents__view .pl-sr .pl-sra {
  color: #032f62;
}
.contents__view .pl-v,
.contents__view .pl-smw {
  color: #e36209;
}
.contents__view .pl-bu {
  color: #b31d28;
}
.contents__view .pl-ii {
  color: #fafbfc;
  background-color: #b31d28;
}
.contents__view .pl-c2 {
  color: #fafbfc;
  background-color: #d73a49;
}
.contents__view .pl-c2::before {
  content: "^M";
}
.contents__view .pl-sr .pl-cce {
  font-weight: bold;
  color: #22863a;
}
.contents__view .pl-ml {
  color: #735c0f;
}
.contents__view .pl-mh,
.contents__view .pl-mh .pl-en,
.contents__view .pl-ms {
  font-weight: bold;
  color: #005cc5;
}
.contents__view .pl-mi {
  font-style: italic;
  color: #24292e;
}
.contents__view .pl-mb {
  font-weight: bold;
  color: #24292e;
}
.contents__view .pl-md {
  color: #b31d28;
  background-color: #ffeef0;
}
.contents__view .pl-mi1 {
  color: #22863a;
  background-color: #f0fff4;
}
.contents__view .pl-mc {
  color: #e36209;
  background-color: #ffebda;
}
.contents__view .pl-mi2 {
  color: #f6f8fa;
  background-color: #005cc5;
}
.contents__view .pl-mdr {
  font-weight: bold;
  color: #6f42c1;
}
.contents__view .pl-ba {
  color: #586069;
}
.contents__view .pl-sg {
  color: #959da5;
}
.contents__view .pl-corl {
  text-decoration: underline;
  color: #032f62;
}
.contents__view .octicon {
  display: inline-block;
  vertical-align: text-top;
  fill: currentColor;
}
.contents__view a {
  background-color: transparent;
}
.contents__view a:active,
.contents__view a:hover {
  outline-width: 0;
}
.contents__view strong {
  font-weight: inherit;
}
.contents__view strong {
  font-weight: bolder;
}
.contents__view h1 {
  font-size: 2em;
  margin: 0.67em 0;
}
.contents__view img {
  border-style: none;
}
.contents__view code,
.contents__view kbd,
.contents__view pre {
  font-family: monospace, monospace;
  font-size: 1em;
}
.contents__view hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}
.contents__view input {
  font: inherit;
  margin: 0;
}
.contents__view input {
  overflow: visible;
}
.contents__view [type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}
.contents__view * {
  box-sizing: border-box;
}
.contents__view input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.contents__view a {
  color: #0366d6;
  text-decoration: none;
}
.contents__view a:hover {
  text-decoration: underline;
}
.contents__view strong {
  font-weight: 600;
}
.contents__view hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #dfe2e5;
}
.contents__view hr::before {
  display: table;
  content: "";
}
.contents__view hr::after {
  display: table;
  clear: both;
  content: "";
}
.contents__view table {
  border-spacing: 0;
  border-collapse: collapse;
}
.contents__view td,
.contents__view th {
  padding: 0;
}
.contents__view h1,
.contents__view h2,
.contents__view h3,
.contents__view h4,
.contents__view h5,
.contents__view h6 {
  margin-top: 0;
  margin-bottom: 0;
}
.contents__view h1 {
  font-size: 32px;
  font-weight: 600;
}
.contents__view h2 {
  font-size: 24px;
  font-weight: 600;
}
.contents__view h3 {
  font-size: 20px;
  font-weight: 600;
}
.contents__view h4 {
  font-size: 16px;
  font-weight: 600;
}
.contents__view h5 {
  font-size: 14px;
  font-weight: 600;
}
.contents__view h6 {
  font-size: 12px;
  font-weight: 600;
}
.contents__view p {
  margin-top: 0;
  margin-bottom: 10px;
}
.contents__view blockquote {
  margin: 0;
}
.contents__view ul,
.contents__view ol {
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
}
.contents__view ol ol,
.contents__view ul ol {
  list-style-type: lower-roman;
}
.contents__view ul ul ol,
.contents__view ul ol ol,
.contents__view ol ul ol,
.contents__view ol ol ol {
  list-style-type: lower-alpha;
}
.contents__view dd {
  margin-left: 0;
}
.contents__view code {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}
.contents__view pre {
  margin-top: 0;
  margin-bottom: 0;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}
.contents__view .octicon {
  vertical-align: text-bottom;
}
.contents__view .pl-0 {
  padding-left: 0 !important;
}
.contents__view .pl-1 {
  padding-left: 4px !important;
}
.contents__view .pl-2 {
  padding-left: 8px !important;
}
.contents__view .pl-3 {
  padding-left: 16px !important;
}
.contents__view .pl-4 {
  padding-left: 24px !important;
}
.contents__view .pl-5 {
  padding-left: 32px !important;
}
.contents__view .pl-6 {
  padding-left: 40px !important;
}
.contents__view::before {
  display: table;
  content: "";
}
.contents__view::after {
  display: table;
  clear: both;
  content: "";
}
.contents__view>*:first-child {
  margin-top: 0 !important;
}
.contents__view>*:last-child {
  margin-bottom: 0 !important;
}
.contents__view a:not([href]) {
  color: inherit;
  text-decoration: none;
}
.contents__view .anchor {
  float: left;
  padding-right: 4px;
  margin-left: -20px;
  line-height: 1;
}
.contents__view .anchor:focus {
  outline: none;
}
.contents__view p,
.contents__view blockquote,
.contents__view ul,
.contents__view ol,
.contents__view dl,
.contents__view table,
.contents__view pre {
  margin-top: 0;
  margin-bottom: 16px;
}
.contents__view hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}
.contents__view blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
.contents__view blockquote>:first-child {
  margin-top: 0;
}
.contents__view blockquote>:last-child {
  margin-bottom: 0;
}
.contents__view kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: solid 1px #c6cbd1;
  border-bottom-color: #959da5;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #959da5;
}
.contents__view h1,
.contents__view h2,
.contents__view h3,
.contents__view h4,
.contents__view h5,
.contents__view h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}
.contents__view h1 .octicon-link,
.contents__view h2 .octicon-link,
.contents__view h3 .octicon-link,
.contents__view h4 .octicon-link,
.contents__view h5 .octicon-link,
.contents__view h6 .octicon-link {
  color: #1b1f23;
  vertical-align: middle;
  visibility: hidden;
}
.contents__view h1:hover .anchor,
.contents__view h2:hover .anchor,
.contents__view h3:hover .anchor,
.contents__view h4:hover .anchor,
.contents__view h5:hover .anchor,
.contents__view h6:hover .anchor {
  text-decoration: none;
}
.contents__view h1:hover .anchor .octicon-link,
.contents__view h2:hover .anchor .octicon-link,
.contents__view h3:hover .anchor .octicon-link,
.contents__view h4:hover .anchor .octicon-link,
.contents__view h5:hover .anchor .octicon-link,
.contents__view h6:hover .anchor .octicon-link {
  visibility: visible;
}
.contents__view h1 {
  padding-bottom: 0.3em;
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
}
.contents__view h2 {
  padding-bottom: 0.3em;
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
}
.contents__view h3 {
  font-size: 1.25em;
}
.contents__view h4 {
  font-size: 1em;
}
.contents__view h5 {
  font-size: 0.875em;
}
.contents__view h6 {
  font-size: 0.85em;
  color: #6a737d;
}
.contents__view ul,
.contents__view ol {
  padding-left: 2em;
}
.contents__view ul ul,
.contents__view ul ol,
.contents__view ol ol,
.contents__view ol ul {
  margin-top: 0;
  margin-bottom: 0;
}
.contents__view li {
  word-wrap: break-all;
}
.contents__view li>p {
  margin-top: 16px;
}
.contents__view li+li {
  margin-top: 0.25em;
}
.contents__view dl {
  padding: 0;
}
.contents__view dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: 600;
}
.contents__view dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}
.contents__view table {
  display: block;
  width: 100%;
  overflow: auto;
}
.contents__view table th {
  font-weight: 600;
}
.contents__view table th,
.contents__view table td {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}
.contents__view table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}
.contents__view table tr:nth-child(2n) {
  background-color: #f6f8fa;
}
.contents__view img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}
.contents__view img[align=right] {
  padding-left: 20px;
}
.contents__view img[align=left] {
  padding-right: 20px;
}
/* .contents__view code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
}
.contents__view pre {
  word-wrap: normal;
}
.contents__view pre>code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}*/
.contents__view .highlight {
  margin-bottom: 16px;
}
.contents__view .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}
.contents__view .full-commit .btn-outline:not(:disabled):hover {
  color: #005cc5;
  border-color: #005cc5;
}
.contents__view kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  line-height: 10px;
  color: #444d56;
  vertical-align: middle;
  background-color: #fafbfc;
  border: solid 1px #d1d5da;
  border-bottom-color: #c6cbd1;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #c6cbd1;
}
.contents__view :checked+.radio-label {
  position: relative;
  z-index: 1;
  border-color: #0366d6;
}
.contents__view .task-list-item {
  list-style-type: none;
}
.contents__view .task-list-item+.task-list-item {
  margin-top: 3px;
}
.contents__view .task-list-item input {
  margin: 0 0.2em 0.25em -1.6em;
  vertical-align: middle;
}
.contents__view hr {
  border-bottom-color: #eee;
}
</style>
