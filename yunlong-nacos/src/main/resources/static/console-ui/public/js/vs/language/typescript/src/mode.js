/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-typescript version: 2.3.0(fd172013f77fa599e03a1c17b79aab62637569fa)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-typescript/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vs/language/typescript/src/tokenization",["require","exports","../lib/typescriptServices"],function(e, t, n){"use strict";function r(e){var t=n.createClassifier(),r=e===a.TypeScript?c:l,i=e===a.TypeScript?u:p;return{getInitialState:function(){return new s(e,n.EndOfLineState.None,(!1))},tokenize:function(e, n){return o(r,i,t,n,e)}}}function o(e, t, r, o, c){function u(e, t){0!==l.tokens.length&&l.tokens[l.tokens.length-1].scopes===t||l.tokens.push({startIndex:e,scopes:t})}var l={tokens:[],endState:new s(o.language,n.EndOfLineState.None,(!1))},p=o.language===a.TypeScript;if(!p&&i(0,c,u))return l;var d=r.getClassificationsForLine(c,o.eolState,!0),g=0;l.endState.eolState=d.finalLexState,l.endState.inJsDocComment=d.finalLexState===n.EndOfLineState.InMultiLineCommentTrivia&&(o.inJsDocComment||/\/\*\*.*$/.test(c));for(var m=0,f=d.entries; m<f.length; m++){var h,v=f[m];if(v.classification===n.TokenClass.Punctuation){var y=c.charCodeAt(g);h=e[y]||t[v.classification],u(g,h)}else v.classification===n.TokenClass.Comment?l.endState.inJsDocComment||/\/\*\*.*\*\//.test(c.substr(g,v.length))?u(g,p?"comment.doc.ts":"comment.doc.js"):u(g,p?"comment.ts":"comment.js"):u(g,t[v.classification]||"");g+=v.length}return l}function i(e, t, n){if(0===t.indexOf("#!"))return n(e,"comment.shebang"),!0}Object.defineProperty(t,"__esModule",{value:!0});var a;!function(e){e[e.TypeScript=0]="TypeScript",e[e.EcmaScript5=1]="EcmaScript5"}(a=t.Language||(t.Language={})),t.createTokenizationSupport=r;var s=function(){function e(e, t, n){this.language=e,this.eolState=t,this.inJsDocComment=n}return e.prototype.clone=function(){return new e(this.language,this.eolState,this.inJsDocComment)},e.prototype.equals=function(t){return t===this||!!(t&&t instanceof e)&&(this.eolState===t.eolState&&this.inJsDocComment===t.inJsDocComment)},e}(),c=Object.create(null);c["(".charCodeAt(0)]="delimiter.parenthesis.ts",c[")".charCodeAt(0)]="delimiter.parenthesis.ts",c["{".charCodeAt(0)]="delimiter.bracket.ts",c["}".charCodeAt(0)]="delimiter.bracket.ts",c["[".charCodeAt(0)]="delimiter.array.ts",c["]".charCodeAt(0)]="delimiter.array.ts";var u=Object.create(null);u[n.TokenClass.Identifier]="identifier.ts",u[n.TokenClass.Keyword]="keyword.ts",u[n.TokenClass.Operator]="delimiter.ts",u[n.TokenClass.Punctuation]="delimiter.ts",u[n.TokenClass.NumberLiteral]="number.ts",u[n.TokenClass.RegExpLiteral]="regexp.ts",u[n.TokenClass.StringLiteral]="string.ts";var l=Object.create(null);l["(".charCodeAt(0)]="delimiter.parenthesis.js",l[")".charCodeAt(0)]="delimiter.parenthesis.js",l["{".charCodeAt(0)]="delimiter.bracket.js",l["}".charCodeAt(0)]="delimiter.bracket.js",l["[".charCodeAt(0)]="delimiter.array.js",l["]".charCodeAt(0)]="delimiter.array.js";var p=Object.create(null);p[n.TokenClass.Identifier]="identifier.js",p[n.TokenClass.Keyword]="keyword.js",p[n.TokenClass.Operator]="delimiter.js",p[n.TokenClass.Punctuation]="delimiter.js",p[n.TokenClass.NumberLiteral]="number.js",p[n.TokenClass.RegExpLiteral]="regexp.js",p[n.TokenClass.StringLiteral]="string.js"}),define("vs/language/typescript/src/workerManager",["require","exports"],function(e, t){"use strict";function n(e){var t,n,o=new r(function(e, r){t=e,n=r},function(){});return e.then(t,n),o}Object.defineProperty(t,"__esModule",{value:!0});var r=monaco.Promise,o=function(){function e(e, t){var n=this;this._modeId=e,this._defaults=t,this._worker=null,this._idleCheckInterval=setInterval(function(){return n._checkIfIdle()},3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return n._stopWorker()})}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){if(this._worker){var e=this._defaults.getWorkerMaxIdleTime(),t=Date.now()-this._lastUsedTime;e>0&&t>e&&this._stopWorker()}},e.prototype._getClient=function(){var e=this;if(this._lastUsedTime=Date.now(),!this._client){this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/typescript/src/worker",label:this._modeId,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs()}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then(function(t){return e._worker.withSyncedResources(monaco.editor.getModels().filter(function(t){return t.getModeId()===e._modeId}).map(function(e){return e.uri}))})),this._client=t}return this._client},e.prototype.getLanguageServiceWorker=function(){for(var e=this,t=[],r=0; r<arguments.length; r++)t[r]=arguments[r];var o;return n(this._getClient().then(function(e){o=e}).then(function(n){return e._worker.withSyncedResources(t)}).then(function(e){return o}))},e}();t.WorkerManager=o});var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e, t){e.__proto__=t}||function(e, t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])};return function(t, n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();define("vs/language/typescript/src/languageFeatures",["require","exports","../lib/typescriptServices"],function(e, t, n){"use strict";function r(e, t){return e.onCancellationRequested(function(){return t.cancel()}),t}Object.defineProperty(t,"__esModule",{value:!0});var o=monaco.Uri,i=monaco.Promise,a=function(){function e(e){this._worker=e}return e.prototype._positionToOffset=function(e, t){var n=monaco.editor.getModel(e);return n.getOffsetAt(t)},e.prototype._offsetToPosition=function(e, t){var n=monaco.editor.getModel(e);return n.getPositionAt(t)},e.prototype._textSpanToRange=function(e, t){var n=this._offsetToPosition(e,t.start),r=this._offsetToPosition(e,t.start+t.length),o=n.lineNumber,i=n.column,a=r.lineNumber,s=r.column;return{startLineNumber:o,startColumn:i,endLineNumber:a,endColumn:s}},e}();t.Adapter=a;var s=function(e){function t(t, n, r){var o=e.call(this,r)||this;o._defaults=t,o._selector=n,o._disposables=[],o._listener=Object.create(null);var i=function(e){if(e.getModeId()===n){var t,r=e.onDidChangeContent(function(){clearTimeout(t),t=setTimeout(function(){return o._doValidate(e.uri)},500)});o._listener[e.uri.toString()]={dispose:function(){r.dispose(),clearTimeout(t)}},o._doValidate(e.uri)}},a=function(e){monaco.editor.setModelMarkers(e,o._selector,[]);var t=e.uri.toString();o._listener[t]&&(o._listener[t].dispose(),delete o._listener[t])};return o._disposables.push(monaco.editor.onDidCreateModel(i)),o._disposables.push(monaco.editor.onWillDisposeModel(a)),o._disposables.push(monaco.editor.onDidChangeModelLanguage(function(e){a(e.model),i(e.model)})),o._disposables.push({dispose:function(){for(var e=0,t=monaco.editor.getModels(); e<t.length; e++){var n=t[e];a(n)}}}),o._disposables.push(o._defaults.onDidChange(function(){for(var e=0,t=monaco.editor.getModels(); e<t.length; e++){var n=t[e];a(n),i(n)}})),monaco.editor.getModels().forEach(i),o}return __extends(t,e),t.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},t.prototype._doValidate=function(e){var t=this;this._worker(e).then(function(n){if(!monaco.editor.getModel(e))return null;var r=[],o=t._defaults.getDiagnosticsOptions(),a=o.noSyntaxValidation,s=o.noSemanticValidation;return a||r.push(n.getSyntacticDiagnostics(e.toString())),s||r.push(n.getSemanticDiagnostics(e.toString())),i.join(r)}).then(function(n){if(!n||!monaco.editor.getModel(e))return null;var r=n.reduce(function(e, t){return t.concat(e)},[]).map(function(n){return t._convertDiagnostics(e,n)});monaco.editor.setModelMarkers(monaco.editor.getModel(e),t._selector,r)}).done(void 0,function(e){console.error(e)})},t.prototype._convertDiagnostics=function(e, t){var r=this._offsetToPosition(e,t.start),o=r.lineNumber,i=r.column,a=this._offsetToPosition(e,t.start+t.length),s=a.lineNumber,c=a.column;return{severity:monaco.Severity.Error,startLineNumber:o,startColumn:i,endLineNumber:s,endColumn:c,message:n.flattenDiagnosticMessageText(t.messageText,"\n")}},t}(a);t.DiagnostcsAdapter=s;var c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),Object.defineProperty(t.prototype,"triggerCharacters",{get:function(){return["."]},enumerable:!0,configurable:!0}),t.prototype.provideCompletionItems=function(e, n, o){var i=(e.getWordUntilPosition(n),e.uri),a=this._positionToOffset(i,n);return r(o,this._worker(i).then(function(e){return e.getCompletionsAtPosition(i.toString(),a)}).then(function(e){if(e){var r=e.entries.map(function(e){return{uri:i,position:n,label:e.name,sortText:e.sortText,kind:t.convertKind(e.kind)}});return r}}))},t.prototype.resolveCompletionItem=function(e, o){var i=this,a=e,s=a.uri,c=a.position;return r(o,this._worker(s).then(function(e){return e.getCompletionEntryDetails(s.toString(),i._positionToOffset(s,c),a.label)}).then(function(e){return e?{uri:s,position:c,label:e.name,kind:t.convertKind(e.kind),detail:n.displayPartsToString(e.displayParts),documentation:n.displayPartsToString(e.documentation)}:a}))},t.convertKind=function(e){switch(e){case f.primitiveType:case f.keyword:return monaco.languages.CompletionItemKind.Keyword;case f.variable:case f.localVariable:return monaco.languages.CompletionItemKind.Variable;case f.memberVariable:case f.memberGetAccessor:case f.memberSetAccessor:return monaco.languages.CompletionItemKind.Field;case f["function"]:case f.memberFunction:case f.constructSignature:case f.callSignature:case f.indexSignature:return monaco.languages.CompletionItemKind.Function;case f["enum"]:return monaco.languages.CompletionItemKind.Enum;case f.module:return monaco.languages.CompletionItemKind.Module;case f["class"]:return monaco.languages.CompletionItemKind.Class;case f["interface"]:return monaco.languages.CompletionItemKind.Interface;case f.warning:return monaco.languages.CompletionItemKind.File}return monaco.languages.CompletionItemKind.Property},t}(a);t.SuggestAdapter=c;var u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.signatureHelpTriggerCharacters=["(",","],t}return __extends(t,e),t.prototype.provideSignatureHelp=function(e, t, o){var i=this,a=e.uri;return r(o,this._worker(a).then(function(e){return e.getSignatureHelpItems(a.toString(),i._positionToOffset(a,t))}).then(function(e){if(e){var t={activeSignature:e.selectedItemIndex,activeParameter:e.argumentIndex,signatures:[]};return e.items.forEach(function(e){var r={label:"",documentation:null,parameters:[]};r.label+=n.displayPartsToString(e.prefixDisplayParts),e.parameters.forEach(function(t, o, i){var a=n.displayPartsToString(t.displayParts),s={label:a,documentation:n.displayPartsToString(t.documentation)};r.label+=a,r.parameters.push(s),o<i.length-1&&(r.label+=n.displayPartsToString(e.separatorDisplayParts))}),r.label+=n.displayPartsToString(e.suffixDisplayParts),t.signatures.push(r)}),t}}))},t}(a);t.SignatureHelpAdapter=u;var l=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideHover=function(e, t, o){var i=this,a=e.uri;return r(o,this._worker(a).then(function(e){return e.getQuickInfoAtPosition(a.toString(),i._positionToOffset(a,t))}).then(function(e){if(e){var t=n.displayPartsToString(e.documentation),r=e.tags?e.tags.map(function(e){var t="*@"+e.name+"*";return e.text?t+(e.text.match(/\r\n|\n/g)?" \n"+e.text:" - "+e.text):t}).join("  \n\n"):"",o=n.displayPartsToString(e.displayParts);return{range:i._textSpanToRange(a,e.textSpan),contents:[o,t+(r?"\n\n"+r:"")]}}}))},t}(a);t.QuickInfoAdapter=l;var p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDocumentHighlights=function(e, t, n){var o=this,i=e.uri;return r(n,this._worker(i).then(function(e){return e.getOccurrencesAtPosition(i.toString(),o._positionToOffset(i,t))}).then(function(e){if(e)return e.map(function(e){return{range:o._textSpanToRange(i,e.textSpan),kind:e.isWriteAccess?monaco.languages.DocumentHighlightKind.Write:monaco.languages.DocumentHighlightKind.Text}})}))},t}(a);t.OccurrencesAdapter=p;var d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDefinition=function(e, t, n){var i=this,a=e.uri;return r(n,this._worker(a).then(function(e){return e.getDefinitionAtPosition(a.toString(),i._positionToOffset(a,t))}).then(function(e){if(e){for(var t=[],n=0,r=e; n<r.length; n++){var a=r[n],s=o.parse(a.fileName);monaco.editor.getModel(s)&&t.push({uri:s,range:i._textSpanToRange(s,a.textSpan)})}return t}}))},t}(a);t.DefinitionAdapter=d;var g=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideReferences=function(e, t, n, i){var a=this,s=e.uri;return r(i,this._worker(s).then(function(e){return e.getReferencesAtPosition(s.toString(),a._positionToOffset(s,t))}).then(function(e){if(e){for(var t=[],n=0,r=e; n<r.length; n++){var i=r[n],s=o.parse(i.fileName);monaco.editor.getModel(s)&&t.push({uri:s,range:a._textSpanToRange(s,i.textSpan)})}return t}}))},t}(a);t.ReferenceAdapter=g;var m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDocumentSymbols=function(e, t){var n=this,o=e.uri;return r(t,this._worker(o).then(function(e){return e.getNavigationBarItems(o.toString())}).then(function(e){if(e){var t=function(e, r, i){var a={name:r.text,kind:h[r.kind]||monaco.languages.SymbolKind.Variable,location:{uri:o,range:n._textSpanToRange(o,r.spans[0])},containerName:i};if(r.childItems&&r.childItems.length>0)for(var s=0,c=r.childItems; s<c.length; s++){var u=c[s];t(e,u,a.name)}e.push(a)},r=[];return e.forEach(function(e){return t(r,e)}),r}}))},t}(a);t.OutlineAdapter=m;var f=function(){function e(){}return e.unknown="",e.keyword="keyword",e.script="script",e.module="module",e["class"]="class",e["interface"]="interface",e.type="type",e["enum"]="enum",e.variable="var",e.localVariable="local var",e["function"]="function",e.localFunction="local function",e.memberFunction="method",e.memberGetAccessor="getter",e.memberSetAccessor="setter",e.memberVariable="property",e.constructorImplementation="constructor",e.callSignature="call",e.indexSignature="index",e.constructSignature="construct",e.parameter="parameter",e.typeParameter="type parameter",e.primitiveType="primitive type",e.label="label",e.alias="alias",e["const"]="const",e["let"]="let",e.warning="warning",e}();t.Kind=f;var h=Object.create(null);h[f.module]=monaco.languages.SymbolKind.Module,h[f["class"]]=monaco.languages.SymbolKind.Class,h[f["enum"]]=monaco.languages.SymbolKind.Enum,h[f["interface"]]=monaco.languages.SymbolKind.Interface,h[f.memberFunction]=monaco.languages.SymbolKind.Method,h[f.memberVariable]=monaco.languages.SymbolKind.Property,h[f.memberGetAccessor]=monaco.languages.SymbolKind.Property,h[f.memberSetAccessor]=monaco.languages.SymbolKind.Property,h[f.variable]=monaco.languages.SymbolKind.Variable,h[f["const"]]=monaco.languages.SymbolKind.Variable,h[f.localVariable]=monaco.languages.SymbolKind.Variable,h[f.variable]=monaco.languages.SymbolKind.Variable,h[f["function"]]=monaco.languages.SymbolKind.Function,h[f.localFunction]=monaco.languages.SymbolKind.Function;var v=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t._convertOptions=function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:n.IndentStyle.Smart,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}},t.prototype._convertTextChanges=function(e, t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}},t}(a);t.FormatHelper=v;var y=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.provideDocumentRangeFormattingEdits=function(e, t, n, o){var i=this,a=e.uri;return r(o,this._worker(a).then(function(e){return e.getFormattingEditsForRange(a.toString(),i._positionToOffset(a,{lineNumber:t.startLineNumber,column:t.startColumn}),i._positionToOffset(a,{lineNumber:t.endLineNumber,column:t.endColumn}),v._convertOptions(n))}).then(function(e){if(e)return e.map(function(e){return i._convertTextChanges(a,e)})}))},t}(v);t.FormatAdapter=y;var _=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),Object.defineProperty(t.prototype,"autoFormatTriggerCharacters",{get:function(){return[";","}","\n"]},enumerable:!0,configurable:!0}),t.prototype.provideOnTypeFormattingEdits=function(e, t, n, o, i){var a=this,s=e.uri;return r(i,this._worker(s).then(function(e){return e.getFormattingEditsAfterKeystroke(s.toString(),a._positionToOffset(s,t),n,v._convertOptions(o))}).then(function(e){if(e)return e.map(function(e){return a._convertTextChanges(s,e)})}))},t}(v);t.FormatOnTypeAdapter=_}),define("vs/language/typescript/src/mode",["require","exports","./tokenization","./workerManager","./languageFeatures"],function(e, t, n, r, o){"use strict";function i(e){p=u(e,"typescript",n.Language.TypeScript)}function a(e){l=u(e,"javascript",n.Language.EcmaScript5)}function s(){return new monaco.Promise(function(e, t){return l?void e(l):t("JavaScript not registered!")})}function c(){return new monaco.Promise(function(e, t){return p?void e(p):t("TypeScript not registered!")})}function u(e, t, i){var a=[],s=new r.WorkerManager(t,e);a.push(s);var c=function(e){for(var t=[],n=1; n<arguments.length; n++)t[n-1]=arguments[n];return s.getLanguageServiceWorker.apply(s,[e].concat(t))};return a.push(monaco.languages.registerCompletionItemProvider(t,new o.SuggestAdapter(c))),a.push(monaco.languages.registerSignatureHelpProvider(t,new o.SignatureHelpAdapter(c))),a.push(monaco.languages.registerHoverProvider(t,new o.QuickInfoAdapter(c))),a.push(monaco.languages.registerDocumentHighlightProvider(t,new o.OccurrencesAdapter(c))),a.push(monaco.languages.registerDefinitionProvider(t,new o.DefinitionAdapter(c))),a.push(monaco.languages.registerReferenceProvider(t,new o.ReferenceAdapter(c))),a.push(monaco.languages.registerDocumentSymbolProvider(t,new o.OutlineAdapter(c))),a.push(monaco.languages.registerDocumentRangeFormattingEditProvider(t,new o.FormatAdapter(c))),a.push(monaco.languages.registerOnTypeFormattingEditProvider(t,new o.FormatOnTypeAdapter(c))),a.push(new o.DiagnostcsAdapter(e,t,c)),a.push(monaco.languages.setLanguageConfiguration(t,d)),a.push(monaco.languages.setTokensProvider(t,n.createTokenizationSupport(i))),c}Object.defineProperty(t,"__esModule",{value:!0});var l,p;t.setupTypeScript=i,t.setupJavaScript=a,t.getJavaScriptWorker=s,t.getTypeScriptWorker=c;var d={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],onEnterRules:[{beforeText:/^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,afterText:/^\s*\*\/$/,action:{indentAction:monaco.languages.IndentAction.IndentOutdent,appendText:" * "}},{beforeText:/^\s*\/\*\*(?!\/)([^\*]|\*(?!\/))*$/,action:{indentAction:monaco.languages.IndentAction.None,appendText:" * "}},{beforeText:/^(\t|(\ \ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,action:{indentAction:monaco.languages.IndentAction.None,appendText:"* "}},{beforeText:/^(\t|(\ \ ))*\ \*\/\s*$/,action:{indentAction:monaco.languages.IndentAction.None,removeText:1}}],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"',notIn:["string"]},{open:"'",close:"'",notIn:["string","comment"]},{open:"`",close:"`",notIn:["string","comment"]},{open:"/**",close:" */",notIn:["string"]}]}});