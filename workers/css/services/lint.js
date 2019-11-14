!function(e){if("object"==typeof module&&"object"==typeof module.exports){var t=e(require,exports);void 0!==t&&(module.exports=t)}else"function"==typeof define&&define.amd&&define(["require","exports","./languageFacts","./lintRules","../parser/cssNodes","vscode-nls"],e)}((function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./languageFacts"),n=e("./lintRules"),i=e("../parser/cssNodes"),o=e("vscode-nls").loadMessageBundle(),a=function(e,t){this.name=e,this.node=t},s=function(){function e(){this.data={}}return e.prototype.add=function(e,t,r){var n=this.data[e];n||(n={nodes:[],names:[]},this.data[e]=n),n.names.push(t),r&&n.nodes.push(r)},e}(),l=function(){function e(e,t){this.warnings=[],this.settings=t,this.documentText=e.getText(),this.keyframes=new s}return e.entries=function(t,r,n,i){var o=new e(r,n);return t.acceptVisitor(o),o.completeValidations(),o.getEntries(i)},e.prototype.fetch=function(e,t){for(var r=[],n=0,i=e;n<i.length;n++){var o=i[n];o.name===t&&r.push(o)}return r},e.prototype.fetchWithValue=function(e,t,r){for(var n=[],i=0,o=e;i<o.length;i++){var a=o[i];if(a.name===t){var s=a.node.getValue();s&&this.findValueInExpression(s,r)&&n.push(a)}}return n},e.prototype.findValueInExpression=function(e,t){var r=!1;return e.accept((function(e){return e.type===i.NodeType.Identifier&&e.getText()===t&&(r=!0),!r})),r},e.prototype.getEntries=function(e){return void 0===e&&(e=i.Level.Warning|i.Level.Error),this.warnings.filter((function(t){return 0!=(t.getLevel()&e)}))},e.prototype.addEntry=function(e,t,r){var n=new i.Marker(e,t,this.settings.get(t),r);this.warnings.push(n)},e.prototype.getMissingNames=function(e,t){e=e.slice(0);for(var r=0;r<t.length;r++){var n=e.indexOf(t[r]);-1!==n&&(e[n]=null)}var i=null;for(r=0;r<e.length;r++){var a=e[r];a&&(i=null===i?o("namelist.single","'{0}'",a):o("namelist.concatenated","{0}, '{1}'",i,a))}return i},e.prototype.visitNode=function(e){switch(e.type){case i.NodeType.Keyframe:return this.visitKeyframe(e);case i.NodeType.FontFace:return this.visitFontFace(e);case i.NodeType.Ruleset:return this.visitRuleSet(e);case i.NodeType.SimpleSelector:return this.visitSimpleSelector(e);case i.NodeType.Function:return this.visitFunction(e);case i.NodeType.NumericValue:return this.visitNumericValue(e);case i.NodeType.Import:return this.visitImport(e);case i.NodeType.HexColorValue:return this.visitHexColorValue(e);case i.NodeType.Prio:return this.visitPrio(e)}return!0},e.prototype.completeValidations=function(){this.validateKeyframes()},e.prototype.visitKeyframe=function(e){var t=e.getKeyword(),r=t.getText();return this.keyframes.add(e.getName(),r,"@keyframes"!==r?t:null),!0},e.prototype.validateKeyframes=function(){var e=["@-webkit-keyframes","@-moz-keyframes","@-o-keyframes"];for(var t in this.keyframes.data){var r=this.keyframes.data[t].names,i=-1===r.indexOf("@keyframes");if(i||1!==r.length){var a=this.getMissingNames(e,r);if(a||i)for(var s=0,l=this.keyframes.data[t].nodes;s<l.length;s++){var d=l[s];if(i){var u=o("keyframes.standardrule.missing","Always define standard rule '@keyframes' when defining keyframes.");this.addEntry(d,n.Rules.IncludeStandardPropertyWhenUsingVendorPrefix,u)}if(a){u=o("keyframes.vendorspecific.missing","Always include all vendor specific rules: Missing: {0}",a);this.addEntry(d,n.Rules.AllVendorPrefixes,u)}}}}return!0},e.prototype.visitSimpleSelector=function(e){var t=this.documentText.charAt(e.offset);return 1===e.length&&"*"===t&&this.addEntry(e,n.Rules.UniversalSelector),"#"===t&&this.addEntry(e,n.Rules.AvoidIdSelector),!0},e.prototype.visitImport=function(e){return this.addEntry(e,n.Rules.ImportStatemement),!0},e.prototype.visitRuleSet=function(t){var l=t.getDeclarations();if(!l)return!1;l.hasChildren()||this.addEntry(t.getSelectors(),n.Rules.EmptyRuleSet);for(var d=[],u=0,f=l.getChildren();u<f.length;u++){if((U=f[u])instanceof i.Declaration){var h=U;d.push(new a(h.getFullPropertyName().toLowerCase(),h))}}if(0===this.fetch(d,"box-sizing").length){var p=this.fetch(d,"width");if(p.length>0){for(var c=!1,y=0,g=["border","border-left","border-right","padding","padding-left","padding-right"];y<g.length;y++)for(var v=g[y],m=0,w=this.fetch(d,v);m<w.length;m++){(W=(U=w[m]).node.getValue())&&!W.matches("none")&&(this.addEntry(U.node,n.Rules.BewareOfBoxModelSize),c=!0)}if(c)for(var x=0,E=p;x<E.length;x++){var P=E[x];this.addEntry(P.node,n.Rules.BewareOfBoxModelSize)}}var R=this.fetch(d,"height");if(R.length>0){c=!1;for(var k=0,V=["border","border-top","border-bottom","padding","padding-top","padding-bottom"];k<V.length;k++){v=V[k];for(var b=0,S=this.fetch(d,v);b<S.length;b++){(W=(U=S[b]).node.getValue())&&!W.matches("none")&&(this.addEntry(U.node,n.Rules.BewareOfBoxModelSize),c=!0)}}if(c)for(var N=0,I=R;N<I.length;N++){var T=I[N];this.addEntry(T.node,n.Rules.BewareOfBoxModelSize)}}}var D=this.fetchWithValue(d,"display","inline");if(D.length>0)for(var F=0,A=["width","height","margin-top","margin-bottom","float"];F<A.length;F++)for(var C=A[F],B=this.fetch(d,C),M=0;M<B.length;M++){var K=B[M].node,W=K.getValue();("float"!==C||W&&!W.matches("none"))&&this.addEntry(K,n.Rules.PropertyIgnoredDueToDisplay,o("rule.propertyIgnoredDueToDisplayInline","Property is ignored due to the display. With 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect."))}if((D=this.fetchWithValue(d,"display","inline-block")).length>0)for(B=this.fetch(d,"float"),M=0;M<B.length;M++){var L=B[M].node;(W=L.getValue())&&!W.matches("none")&&this.addEntry(L,n.Rules.PropertyIgnoredDueToDisplay,o("rule.propertyIgnoredDueToDisplayInlineBlock","inline-block is ignored due to the float. If 'float' has a value other than 'none', the box is floated and 'display' is treated as 'block'"))}if((D=this.fetchWithValue(d,"display","block")).length>0)for(B=this.fetch(d,"vertical-align"),M=0;M<B.length;M++)this.addEntry(B[M].node,n.Rules.PropertyIgnoredDueToDisplay,o("rule.propertyIgnoredDueToDisplayBlock","Property is ignored due to the display. With 'display: block', vertical-align should not be used."));var O=this.fetch(d,"float");for(M=0;M<O.length;M++)this.addEntry(O[M].node,n.Rules.AvoidFloat);for(var z=0;z<d.length;z++){var U;if("background"!==(U=d[z]).name)if((W=U.node.getValue())&&"-"!==this.documentText.charAt(W.offset)){var H=this.fetch(d,U.name);if(H.length>1)for(var j=0;j<H.length;j++){var q=H[j].node.getValue();q&&"-"!==this.documentText.charAt(q.offset)&&H[j]!==U&&this.addEntry(U.node,n.Rules.DuplicateDeclarations)}}}for(var _=new s,Z=!1,G=0,J=l.getChildren();G<J.length;G++){var Q=J[G];if(this.isCSSDeclaration(Q)){var X=(h=Q).getFullPropertyName(),Y=X.charAt(0);if("-"===Y){if("-"!==X.charAt(1)){r.isKnownProperty(X)||this.addEntry(h.getProperty(),n.Rules.UnknownVendorSpecificProperty);var $=h.getNonPrefixedPropertyName();_.add($,X,h.getProperty())}}else"*"!==Y&&"_"!==Y||(this.addEntry(h.getProperty(),n.Rules.IEStarHack),X=X.substr(1)),r.isKnownProperty(X)||this.addEntry(h.getProperty(),n.Rules.UnknownProperty,o("property.unknownproperty.detailed","Unknown property: '{0}'",X)),_.add(X,X,null)}else Z=!0}if(!Z)for(var ee in _.data){var te=_.data[ee],re=te.names,ne=r.isKnownProperty(ee)&&-1===re.indexOf(ee);if(ne||1!==re.length){for(var ie=[],oe=(z=0,e.prefixes.length);z<oe;z++){var ae=e.prefixes[z];r.isKnownProperty(ae+ee)&&ie.push(ae+ee)}var se=this.getMissingNames(ie,re);if(se||ne)for(var le=0,de=te.nodes;le<de.length;le++){var ue=de[le];if(ne){var fe=o("property.standard.missing","Also define the standard property '{0}' for compatibility",ee);this.addEntry(ue,n.Rules.IncludeStandardPropertyWhenUsingVendorPrefix,fe)}if(se){fe=o("property.vendorspecific.missing","Always include all vendor specific properties: Missing: {0}",se);this.addEntry(ue,n.Rules.AllVendorPrefixes,fe)}}}}return!0},e.prototype.visitPrio=function(e){return this.addEntry(e,n.Rules.AvoidImportant),!0},e.prototype.visitNumericValue=function(e){var t=e.getValue();return!t.unit||-1===r.units.length.indexOf(t.unit.toLowerCase())||(0===parseFloat(t.value)&&t.unit&&this.addEntry(e,n.Rules.ZeroWithUnit),!0)},e.prototype.visitFontFace=function(e){var t=e.getDeclarations();if(t){for(var r=!1,i=!1,o=!1,a=0,s=t.getChildren();a<s.length;a++){var l=s[a];if(this.isCSSDeclaration(l)){var d=l.getProperty().getName().toLowerCase();"src"===d&&(r=!0),"font-family"===d&&(i=!0)}else o=!0}return o||r&&i||this.addEntry(e,n.Rules.RequiredPropertiesForFontFace),!0}},e.prototype.isCSSDeclaration=function(e){if(e instanceof i.Declaration){if(!e.getValue())return!1;var t=e.getProperty();return!(!t||t.getIdentifier().containsInterpolation())}return!1},e.prototype.visitHexColorValue=function(e){var t=e.length;return 9!==t&&7!==t&&5!==t&&4!==t&&this.addEntry(e,n.Rules.HexColorLength),!1},e.prototype.visitFunction=function(e){var t=e.getName().toLowerCase(),r=-1,o=0;switch(t){case"rgb(":case"hsl(":r=3;break;case"rgba(":case"hsla(":r=4}return-1!==r&&(e.getArguments().accept((function(e){return!(e instanceof i.BinaryExpression)||(o+=1,!1)})),o!==r&&this.addEntry(e,n.Rules.ArgsInColorFunction)),!0},e.prefixes=["-ms-","-moz-","-o-","-webkit-"],e}();t.LintVisitor=l}));