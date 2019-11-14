!function(t){if("object"==typeof module&&"object"==typeof module.exports){var e=t(require,exports);void 0!==e&&(module.exports=e)}else"function"==typeof define&&define.amd&&define(["require","exports","./parser/htmlScanner","./parser/htmlParser","./services/htmlCompletion","./services/htmlHover","./services/htmlLinks","./services/htmlHighlighting","./services/htmlSymbolsProvider","vscode-languageserver-types"],t)}((function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("./parser/htmlScanner"),i=t("./parser/htmlParser"),o=t("./services/htmlCompletion"),r=t("./services/htmlHover"),a=t("./services/htmlLinks"),m=t("./services/htmlHighlighting"),s=t("./services/htmlSymbolsProvider"),g=t("vscode-languageserver-types");e.TextDocument=g.TextDocument,e.Position=g.Position,e.CompletionItem=g.CompletionItem,e.CompletionList=g.CompletionList,e.Range=g.Range,e.SymbolInformation=g.SymbolInformation,e.Diagnostic=g.Diagnostic,e.TextEdit=g.TextEdit,e.DocumentHighlight=g.DocumentHighlight,e.FormattingOptions=g.FormattingOptions,e.MarkedString=g.MarkedString,e.DocumentLink=g.DocumentLink,function(t){t[t.StartCommentTag=0]="StartCommentTag",t[t.Comment=1]="Comment",t[t.EndCommentTag=2]="EndCommentTag",t[t.StartTagOpen=3]="StartTagOpen",t[t.StartTagClose=4]="StartTagClose",t[t.StartTagSelfClose=5]="StartTagSelfClose",t[t.StartTag=6]="StartTag",t[t.EndTagOpen=7]="EndTagOpen",t[t.EndTagClose=8]="EndTagClose",t[t.EndTag=9]="EndTag",t[t.DelimiterAssign=10]="DelimiterAssign",t[t.AttributeName=11]="AttributeName",t[t.AttributeValue=12]="AttributeValue",t[t.StartDoctypeTag=13]="StartDoctypeTag",t[t.Doctype=14]="Doctype",t[t.EndDoctypeTag=15]="EndDoctypeTag",t[t.Content=16]="Content",t[t.Whitespace=17]="Whitespace",t[t.Unknown=18]="Unknown",t[t.Script=19]="Script",t[t.Styles=20]="Styles",t[t.EOS=21]="EOS"}(e.TokenType||(e.TokenType={})),function(t){t[t.WithinContent=0]="WithinContent",t[t.AfterOpeningStartTag=1]="AfterOpeningStartTag",t[t.AfterOpeningEndTag=2]="AfterOpeningEndTag",t[t.WithinDoctype=3]="WithinDoctype",t[t.WithinTag=4]="WithinTag",t[t.WithinEndTag=5]="WithinEndTag",t[t.WithinComment=6]="WithinComment",t[t.WithinScriptContent=7]="WithinScriptContent",t[t.WithinStyleContent=8]="WithinStyleContent",t[t.AfterAttributeName=9]="AfterAttributeName",t[t.BeforeAttributeValue=10]="BeforeAttributeValue"}(e.ScannerState||(e.ScannerState={})),e.getLanguageService=function(){return{createScanner:n.createScanner,parseHTMLDocument:function(t){return i.parse(t.getText())},doComplete:o.doComplete,doHover:r.doHover,findDocumentHighlights:m.findDocumentHighlights,findDocumentLinks:a.findDocumentLinks,findDocumentSymbols:s.findDocumentSymbols,doTagComplete:o.doTagComplete}}}));