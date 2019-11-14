var __extends=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function i(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}();!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","./lessScanner","./cssScanner","./cssParser","./cssNodes","./cssErrors"],e)}((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./lessScanner"),i=e("./cssScanner"),s=e("./cssParser"),n=e("./cssNodes"),a=e("./cssErrors"),o=function(e){function t(){return e.call(this,new r.LESSScanner)||this}return __extends(t,e),t.prototype._parseStylesheetStatement=function(){return this._tryParseMixinDeclaration()||this._tryParseMixinReference(!0)||e.prototype._parseStylesheetStatement.call(this)||this._parseVariableDeclaration()},t.prototype._parseImport=function(){if(!this.peekKeyword("@import")&&!this.peekKeyword("@import-once"))return null;var e=this.create(n.Import);if(this.consumeToken(),this.accept(i.TokenType.ParenthesisL)){if(!this.accept(i.TokenType.Ident))return this.finish(e,a.ParseError.IdentifierExpected,[i.TokenType.SemiColon]);do{if(!this.accept(i.TokenType.Comma))break}while(this.accept(i.TokenType.Ident));if(!this.accept(i.TokenType.ParenthesisR))return this.finish(e,a.ParseError.RightParenthesisExpected,[i.TokenType.SemiColon])}return e.addChild(this._parseURILiteral())||e.addChild(this._parseStringLiteral())?(this.peek(i.TokenType.SemiColon)||this.peek(i.TokenType.EOF)||e.setMedialist(this._parseMediaQueryList()),this.finish(e)):this.finish(e,a.ParseError.URIOrStringExpected,[i.TokenType.SemiColon])},t.prototype._parseMediaQuery=function(t){var r=e.prototype._parseMediaQuery.call(this,t);if(!r){var i=this.create(n.MediaQuery);return i.addChild(this._parseVariable())?this.finish(i):null}return r},t.prototype._parseMediaDeclaration=function(e){return void 0===e&&(e=!1),this._tryParseRuleset(e)||this._tryToParseDeclaration()||this._tryParseMixinDeclaration()||this._tryParseMixinReference()||this._parseDetachedRuleSetMixin()||this._parseStylesheetStatement()},t.prototype._parseMediaFeatureName=function(){return this._parseIdent()||this._parseVariable()},t.prototype._parseVariableDeclaration=function(e){void 0===e&&(e=[]);var t=this.create(n.VariableDeclaration),r=this.mark();return t.setVariable(this._parseVariable())?this.accept(i.TokenType.Colon)?(t.colonPosition=this.prevToken.offset,t.setValue(this._parseDetachedRuleSet()||this._parseExpr())?(t.addChild(this._parsePrio()),this.peek(i.TokenType.SemiColon)&&(t.semicolonPosition=this.token.offset),this.finish(t)):this.finish(t,a.ParseError.VariableValueExpected,[],e)):(this.restoreAtMark(r),null):null},t.prototype._parseDetachedRuleSet=function(){if(!this.peek(i.TokenType.CurlyL))return null;var e=this.create(n.BodyDeclaration);return this._parseBody(e,this._parseDetachedRuleSetBody.bind(this)),this.finish(e)},t.prototype._parseDetachedRuleSetBody=function(){return this._tryParseKeyframeSelector()||e.prototype._parseRuleSetDeclaration.call(this)},t.prototype._parseVariable=function(){if(!this.peekDelim("@")&&!this.peek(i.TokenType.AtKeyword))return null;for(var e=this.create(n.Variable),t=this.mark();this.acceptDelim("@");)if(this.hasWhitespace())return this.restoreAtMark(t),null;return this.accept(i.TokenType.AtKeyword)?e:(this.restoreAtMark(t),null)},t.prototype._parseTerm=function(){var t=e.prototype._parseTerm.call(this);return t||((t=this.create(n.Term)).setExpression(this._parseVariable())||t.setExpression(this._parseEscaped())?this.finish(t):null)},t.prototype._parseEscaped=function(){if(this.peek(i.TokenType.EscapedJavaScript)||this.peek(i.TokenType.BadEscapedJavaScript)){var e=this.createNode(n.NodeType.EscapedValue);return this.consumeToken(),this.finish(e)}if(this.peekDelim("~")){e=this.createNode(n.NodeType.EscapedValue);return this.consumeToken(),this.finish(e,this.accept(i.TokenType.String)?null:a.ParseError.TermExpected)}return null},t.prototype._parseOperator=function(){var t=this._parseGuardOperator();return t||e.prototype._parseOperator.call(this)},t.prototype._parseGuardOperator=function(){if(this.peekDelim(">")){var e=this.createNode(n.NodeType.Operator);return this.consumeToken(),this.acceptDelim("="),e}if(this.peekDelim("=")){e=this.createNode(n.NodeType.Operator);return this.consumeToken(),this.acceptDelim("<"),e}if(this.peekDelim("<")){e=this.createNode(n.NodeType.Operator);return this.consumeToken(),this.acceptDelim("="),e}return null},t.prototype._parseRuleSetDeclaration=function(){return this.peek(i.TokenType.AtKeyword)?this._parseKeyframe()||this._parseMedia(!0)||this._parseImport()||this._parseSupports(!0)||this._parseDetachedRuleSetMixin()||this._parseVariableDeclaration():this._tryParseMixinDeclaration()||this._tryParseRuleset(!0)||this._tryParseMixinReference()||this._parseExtend()||e.prototype._parseRuleSetDeclaration.call(this)},t.prototype._parseKeyframeIdent=function(){return this._parseIdent([n.ReferenceType.Keyframe])||this._parseVariable()},t.prototype._parseKeyframeSelector=function(){return this._parseDetachedRuleSetMixin()||e.prototype._parseKeyframeSelector.call(this)},t.prototype._parseSimpleSelectorBody=function(){return this._parseSelectorCombinator()||e.prototype._parseSimpleSelectorBody.call(this)},t.prototype._parseSelector=function(e){var t=this.create(n.Selector),r=!1;for(e&&(r=t.addChild(this._parseCombinator()));t.addChild(this._parseSimpleSelector());){r=!0;var s=this.mark();if(t.addChild(this._parseGuard())&&this.peek(i.TokenType.CurlyL))break;this.restoreAtMark(s),t.addChild(this._parseCombinator())}return r?this.finish(t):null},t.prototype._parseSelectorCombinator=function(){if(this.peekDelim("&")){var e=this.createNode(n.NodeType.SelectorCombinator);for(this.consumeToken();!this.hasWhitespace()&&(this.acceptDelim("-")||this.accept(i.TokenType.Num)||this.accept(i.TokenType.Dimension)||e.addChild(this._parseIdent())||this.acceptDelim("&")););return this.finish(e)}return null},t.prototype._parseSelectorIdent=function(){if(!this.peekInterpolatedIdent())return null;var e=this.createNode(n.NodeType.SelectorInterpolation);return this._acceptInterpolatedIdent(e)?this.finish(e):null},t.prototype._parsePropertyIdentifier=function(){if(!this.peekInterpolatedIdent())return null;var e=this.create(n.Identifier);e.isCustomProperty=this.peekRegExp(i.TokenType.Ident,/^--/);var t=this._acceptInterpolatedIdent(e);return t&&!this.hasWhitespace()&&(this.acceptDelim("+"),this.hasWhitespace()||this.acceptIdent("_")),t?this.finish(e):null},t.prototype.peekInterpolatedIdent=function(){return this.peek(i.TokenType.Ident)||this.peekDelim("@")||this.peekDelim("-")},t.prototype._acceptInterpolatedIdent=function(e){for(var t=this,r=!1,s=function(){return t.acceptDelim("-")?(!t.hasWhitespace()&&t.acceptDelim("-"),t.hasWhitespace()?null:t._parseInterpolation()):null};(this.accept(i.TokenType.Ident)||e.addChild(this._parseInterpolation()||this.try(s)))&&(r=!0,!this.hasWhitespace()&&this.acceptDelim("-"),!this.hasWhitespace()););return r},t.prototype._parseInterpolation=function(){var e=this.mark();if(this.peekDelim("@")){var t=this.createNode(n.NodeType.Interpolation);return this.consumeToken(),this.hasWhitespace()||!this.accept(i.TokenType.CurlyL)?(this.restoreAtMark(e),null):t.addChild(this._parseIdent())?this.accept(i.TokenType.CurlyR)?this.finish(t):this.finish(t,a.ParseError.RightCurlyExpected):this.finish(t,a.ParseError.IdentifierExpected)}return null},t.prototype._tryParseMixinDeclaration=function(){var e=this.mark(),t=this.create(n.MixinDeclaration);if(!t.setIdentifier(this._parseMixinDeclarationIdentifier())||!this.accept(i.TokenType.ParenthesisL))return this.restoreAtMark(e),null;if(t.getParameters().addChild(this._parseMixinParameter()))for(;(this.accept(i.TokenType.Comma)||this.accept(i.TokenType.SemiColon))&&!this.peek(i.TokenType.ParenthesisR);)t.getParameters().addChild(this._parseMixinParameter())||this.markError(t,a.ParseError.IdentifierExpected,[],[i.TokenType.ParenthesisR]);return this.accept(i.TokenType.ParenthesisR)?(t.setGuard(this._parseGuard()),this.peek(i.TokenType.CurlyL)?this._parseBody(t,this._parseMixInBodyDeclaration.bind(this)):(this.restoreAtMark(e),null)):(this.restoreAtMark(e),null)},t.prototype._parseMixInBodyDeclaration=function(){return this._parseFontFace()||this._parseRuleSetDeclaration()},t.prototype._parseMixinDeclarationIdentifier=function(){var e;if(this.peekDelim("#")||this.peekDelim(".")){if(e=this.create(n.Identifier),this.consumeToken(),this.hasWhitespace()||!e.addChild(this._parseIdent()))return null}else{if(!this.peek(i.TokenType.Hash))return null;e=this.create(n.Identifier),this.consumeToken()}return e.referenceTypes=[n.ReferenceType.Mixin],this.finish(e)},t.prototype._parsePseudo=function(){if(!this.peek(i.TokenType.Colon))return null;var t=this.mark(),r=this.create(n.ExtendsReference);return this.consumeToken(),this.acceptIdent("extend")?this._completeExtends(r):(this.restoreAtMark(t),e.prototype._parsePseudo.call(this))},t.prototype._parseExtend=function(){if(!this.peekDelim("&"))return null;var e=this.mark(),t=this.create(n.ExtendsReference);return this.consumeToken(),!this.hasWhitespace()&&this.accept(i.TokenType.Colon)&&this.acceptIdent("extend")?this._completeExtends(t):(this.restoreAtMark(e),null)},t.prototype._completeExtends=function(e){if(!this.accept(i.TokenType.ParenthesisL))return this.finish(e,a.ParseError.LeftParenthesisExpected);var t=e.getSelectors();if(!t.addChild(this._parseSelector(!0)))return this.finish(e,a.ParseError.SelectorExpected);for(;this.accept(i.TokenType.Comma);)if(!t.addChild(this._parseSelector(!0)))return this.finish(e,a.ParseError.SelectorExpected);return this.accept(i.TokenType.ParenthesisR)?this.finish(e):this.finish(e,a.ParseError.RightParenthesisExpected)},t.prototype._parseDetachedRuleSetMixin=function(){if(!this.peek(i.TokenType.AtKeyword))return null;var e=this.mark(),t=this.create(n.MixinReference);return t.addChild(this._parseVariable())&&this.accept(i.TokenType.ParenthesisL)?this.accept(i.TokenType.ParenthesisR)?this.finish(t):this.finish(t,a.ParseError.RightParenthesisExpected):(this.restoreAtMark(e),null)},t.prototype._tryParseMixinReference=function(e){void 0===e&&(e=!1);for(var t=this.mark(),r=this.create(n.MixinReference),s=this._parseMixinDeclarationIdentifier();s;){this.acceptDelim(">");var o=this._parseMixinDeclarationIdentifier();if(!o)break;r.getNamespaces().addChild(s),s=o}if(!r.setIdentifier(s))return this.restoreAtMark(t),null;var p=!1;if(!this.hasWhitespace()&&this.accept(i.TokenType.ParenthesisL)){if(p=!0,r.getArguments().addChild(this._parseMixinArgument()))for(;(this.accept(i.TokenType.Comma)||this.accept(i.TokenType.SemiColon))&&!this.peek(i.TokenType.ParenthesisR);)if(!r.getArguments().addChild(this._parseMixinArgument()))return this.finish(r,a.ParseError.ExpressionExpected);if(!this.accept(i.TokenType.ParenthesisR))return this.finish(r,a.ParseError.RightParenthesisExpected);s.referenceTypes=[n.ReferenceType.Mixin]}else s.referenceTypes=[n.ReferenceType.Mixin,n.ReferenceType.Rule];return r.addChild(this._parsePrio()),p||this.peek(i.TokenType.SemiColon)||this.peek(i.TokenType.CurlyR)||this.peek(i.TokenType.EOF)?this.finish(r):(this.restoreAtMark(t),null)},t.prototype._parseMixinArgument=function(){var e=this.create(n.FunctionArgument),t=this.mark(),r=this._parseVariable();return r&&(this.accept(i.TokenType.Colon)?e.setIdentifier(r):this.restoreAtMark(t)),e.setValue(this._parseDetachedRuleSet()||this._parseExpr(!0))?this.finish(e):(this.restoreAtMark(t),null)},t.prototype._parseMixinParameter=function(){var e=this.create(n.FunctionParameter);if(this.peekKeyword("@rest")){var t=this.create(n.Node);return this.consumeToken(),this.accept(r.Ellipsis)?(e.setIdentifier(this.finish(t)),this.finish(e)):this.finish(e,a.ParseError.DotExpected,[],[i.TokenType.Comma,i.TokenType.ParenthesisR])}if(this.peek(r.Ellipsis)){var s=this.create(n.Node);return this.consumeToken(),e.setIdentifier(this.finish(s)),this.finish(e)}var o=!1;return e.setIdentifier(this._parseVariable())&&(this.accept(i.TokenType.Colon),o=!0),e.setDefaultValue(this._parseExpr(!0))||o?this.finish(e):null},t.prototype._parseGuard=function(){if(!this.peekIdent("when"))return null;var e=this.create(n.LessGuard);if(this.consumeToken(),e.isNegated=this.acceptIdent("not"),!e.getConditions().addChild(this._parseGuardCondition()))return this.finish(e,a.ParseError.ConditionExpected);for(;this.acceptIdent("and")||this.accept(i.TokenType.Comma);)if(!e.getConditions().addChild(this._parseGuardCondition()))return this.finish(e,a.ParseError.ConditionExpected);return this.finish(e)},t.prototype._parseGuardCondition=function(){if(!this.peek(i.TokenType.ParenthesisL))return null;var e=this.create(n.GuardCondition);return this.consumeToken(),e.addChild(this._parseExpr()),this.accept(i.TokenType.ParenthesisR)?this.finish(e):this.finish(e,a.ParseError.RightParenthesisExpected)},t.prototype._parseFunctionIdentifier=function(){if(this.peekDelim("%")){var t=this.create(n.Identifier);return t.referenceTypes=[n.ReferenceType.Function],this.consumeToken(),this.finish(t)}return e.prototype._parseFunctionIdentifier.call(this)},t.prototype._parseURLArgument=function(){var t=this.mark(),r=e.prototype._parseURLArgument.call(this);if(!r||!this.peek(i.TokenType.ParenthesisR)){this.restoreAtMark(t);var s=this.create(n.Node);return s.addChild(this._parseBinaryExpr()),this.finish(s)}return r},t}(s.Parser);t.LESSParser=o}));