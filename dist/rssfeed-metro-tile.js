var RssfeedMetroTile=function(e){"use strict";function t(e,t,i,o){var s,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,o);else for(var r=e.length-1;r>=0;r--)(s=e[r])&&(n=(a<3?s(n):a>3?s(t,i,n):s(t,i))||n);return a>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,o=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(o&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=a.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(i,e,s)},l=o?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:d,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,g=globalThis,f=g.trustedTypes,_=f?f.emptyScript:"",y=g.reactiveElementPolyfillSupport,v=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},x=(e,t)=>!d(e,t),w={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=w){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=o?.call(this);s?.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const e=this.properties,t=[...u(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(o)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const o of t){const t=document.createElement("style"),s=i.litNonce;void 0!==s&&t.setAttribute("nonce",s),t.textContent=o.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=o;const a=s.fromAttribute(t,e.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(e,t,i,o=!1,s){if(void 0!==e){const a=this.constructor;if(!1===o&&(s=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??x)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:s},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==s||void 0!==a)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[v("elementProperties")]=new Map,$[v("finalized")]=new Map,y?.({ReactiveElement:$}),(g.reactiveElementVersions??=[]).push("2.1.2");const S=globalThis,k=e=>e,A=S.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,C="$lit$",M=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+M,L=`<${T}>`,z=document,P=()=>z.createComment(""),O=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,H="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,U=/>/g,N=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,V=/^(?:script|style|textarea|title)$/i,q=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),W=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),X=new WeakMap,F=z.createTreeWalker(z,129);function K(e,t){if(!R(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,o=[];let s,a=2===t?"<svg>":3===t?"<math>":"",n=D;for(let t=0;t<i;t++){const i=e[t];let r,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===D?"!--"===l[1]?n=I:void 0!==l[1]?n=U:void 0!==l[2]?(V.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=s??D,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,r=l[1],n=void 0===l[3]?N:'"'===l[3]?B:j):n===B||n===j?n=N:n===I||n===U?n=D:(n=N,s=void 0);const h=n===N&&e[t+1].startsWith("/>")?" ":"";a+=n===D?i+L:d>=0?(o.push(r),i.slice(0,d)+C+i.slice(d)+M+h):i+M+(-2===d?t:h)}return[K(e,a+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class G{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,a=0;const n=e.length-1,r=this.parts,[l,d]=J(e,t);if(this.el=G.createElement(l,i),F.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=F.nextNode())&&r.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(C)){const t=d[a++],i=o.getAttribute(e).split(M),n=/([.?@])?(.*)/.exec(t);r.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ie:"?"===n[1]?oe:"@"===n[1]?se:te}),o.removeAttribute(e)}else e.startsWith(M)&&(r.push({type:6,index:s}),o.removeAttribute(e));if(V.test(o.tagName)){const e=o.textContent.split(M),t=e.length-1;if(t>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],P()),F.nextNode(),r.push({type:2,index:++s});o.append(e[t],P())}}}else if(8===o.nodeType)if(o.data===T)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(M,e+1));)r.push({type:7,index:s}),e+=M.length-1}s++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,o){if(t===W)return t;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const a=O(t)?void 0:t._$litDirective$;return s?.constructor!==a&&(s?._$AO?.(!1),void 0===a?s=void 0:(s=new a(e),s._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(t=Z(e,s._$AS(e,t.values),s,o)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??z).importNode(t,!0);F.currentNode=o;let s=F.nextNode(),a=0,n=0,r=i[0];for(;void 0!==r;){if(a===r.index){let t;2===r.type?t=new ee(s,s.nextSibling,this,e):1===r.type?t=new r.ctor(s,r.name,r.strings,this,e):6===r.type&&(t=new ae(s,this,e)),this._$AV.push(t),r=i[++n]}a!==r?.index&&(s=F.nextNode(),a++)}return F.currentNode=z,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),O(e)?e===Y||null==e||""===e?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>R(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Y&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=G.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=X.get(e.strings);return void 0===t&&X.set(e.strings,t=new G(e)),t}k(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new ee(this.O(P()),this.O(P()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=k(e).nextSibling;k(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,s){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Y}_$AI(e,t=this,i,o){const s=this.strings;let a=!1;if(void 0===s)e=Z(this,e,t,0),a=!O(e)||e!==this._$AH&&e!==W,a&&(this._$AH=e);else{const o=e;let n,r;for(e=s[0],n=0;n<s.length-1;n++)r=Z(this,o[i+n],t,n),r===W&&(r=this._$AH[n]),a||=!O(r)||r!==this._$AH[n],r===Y?e=Y:e!==Y&&(e+=(r??"")+s[n+1]),this._$AH[n]=r}a&&!o&&this.j(e)}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Y?void 0:e}}class oe extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Y)}}class se extends te{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??Y)===W)return;const i=this._$AH,o=e===Y&&i!==Y||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==Y&&(i===Y||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ae{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const ne=S.litHtmlPolyfillSupport;ne?.(G,ee),(S.litHtmlVersions??=[]).push("3.3.2");const re=globalThis;let le=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let s=o._$litPart$;if(void 0===s){const e=i?.renderBefore??null;o._$litPart$=s=new ee(t.insertBefore(P(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};le._$litElement$=!0,le.finalized=!0,re.litElementHydrateSupport?.({LitElement:le});const de=re.litElementPolyfillSupport;de?.({LitElement:le}),(re.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:x},ue=(e=he,t,i)=>{const{kind:o,metadata:s}=i;let a=globalThis.litPropertyMetadata.get(s);if(void 0===a&&globalThis.litPropertyMetadata.set(s,a=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),a.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,s,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];t.call(this,i),this.requestUpdate(o,s,e,!0,i)}}throw Error("Unsupported decorator location: "+o)};function pe(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function me(e){return pe({...e,state:!0,attribute:!1})}const ge=1,fe=e=>(...t)=>({_$litDirective$:e,values:t});let _e=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const ye="important",ve=" !"+ye,be=fe(class extends _e{constructor(e){if(super(e),e.type!==ge||"style"!==e.name||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const o=e[i];return null==o?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(t)),this.render(t);for(const e of this.ft)null==t[e]&&(this.ft.delete(e),e.includes("-")?i.removeProperty(e):i[e]=null);for(const e in t){const o=t[e];if(null!=o){this.ft.add(e);const t="string"==typeof o&&o.endsWith(ve);e.includes("-")||t?i.setProperty(e,t?o.slice(0,-11):o,t?ye:""):i[e]=o}}return W}}),xe=fe(class extends _e{constructor(e){if(super(e),e.type!==ge||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}const i=e.element.classList;for(const e of this.st)e in t||(i.remove(e),this.st.delete(e));for(const e in t){const o=!!t[e];o===this.st.has(e)||this.nt?.has(e)||(o?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return W}}),we={slide_duration_sec:5,show_images:!0,row_limit:0,transition:"slide-vertical",image_layout:"background",aspect_ratio:"16:9",lazy_load_images:!0,pause_on_hover:!0,auto_play:!0,show_navigation:!0,show_indicators:!0,keyboard_navigation:!0,grid_rows:4,grid_columns:4,performance_warning:20,open_in_modal:!0,modal_type:"custom",modal_size:"medium",modal_width:"",modal_height:"",modal_animation:"fade",modal_close_on_backdrop:!0,modal_show_close_button:!0,modal_close_on_esc:!0,modal_show_loading:!0,modal_iframe_sandbox:!0,modal_fallback_to_external:!0},$e={"1:1":100,"16:9":56.25,"4:3":75},Se={small:{width:"50vw",height:"60vh"},medium:{width:"70vw",height:"75vh"},large:{width:"90vw",height:"85vh"},fullscreen:{width:"95vw",height:"95vh"}},ke=[{quote:"Space: the final frontier.",author:"Captain James T. Kirk"},{quote:"Live long and prosper.",author:"Spock"},{quote:"Resistance is futile.",author:"The Borg"},{quote:"Make it so.",author:"Captain Jean-Luc Picard"},{quote:"I'm a doctor, not a feed parser!",author:"Dr. Leonard McCoy"},{quote:"Insufficient data does not compute.",author:"Data"},{quote:"The needs of the many outweigh the needs of the few.",author:"Spock"},{quote:"Engage!",author:"Captain Jean-Luc Picard"},{quote:"Logic is the beginning of wisdom, not the end.",author:"Spock"},{quote:"Things are only impossible until they're not.",author:"Captain Jean-Luc Picard"}],Ae="Entity is required. Please configure an entity.",Ee=e=>`Entity "${e}" not found in Home Assistant.`,Ce=e=>`Entity "${e}" does not have an "entries" attribute. Make sure it's an RSS feed sensor.`,Me=(e,t)=>`Warning: ${e} feed items detected. Consider limiting to ${t} items for better performance.`;class Te{constructor(e,t,i){this.duration=e,this.onChange=i,this.state={currentIndex:0,timeRemaining:e,isPaused:!1,totalSlides:t}}start(){this.stop(),this.state.timeRemaining=this.duration,this.state.isPaused=!1,this.interval=window.setInterval(()=>{this.state.isPaused||(this.state.timeRemaining--,this.state.timeRemaining<=0?this.next():this.onChange(this.state))},1e3)}stop(){this.interval&&(clearInterval(this.interval),this.interval=void 0)}pause(){this.state.isPaused=!0,this.onChange(this.state)}resume(){this.state.isPaused=!1,this.onChange(this.state)}next(){this.state.currentIndex=(this.state.currentIndex+1)%this.state.totalSlides,this.state.timeRemaining=this.duration,this.onChange(this.state)}previous(){this.state.currentIndex=(this.state.currentIndex-1+this.state.totalSlides)%this.state.totalSlides,this.state.timeRemaining=this.duration,this.onChange(this.state)}goTo(e){e>=0&&e<this.state.totalSlides&&(this.state.currentIndex=e,this.state.timeRemaining=this.duration,this.onChange(this.state))}reset(){this.state.currentIndex=0,this.state.timeRemaining=this.duration,this.state.isPaused=!1,this.onChange(this.state)}updateLength(e){this.state.totalSlides=e,this.state.currentIndex>=e&&(this.state.currentIndex=0),this.onChange(this.state)}getState(){return{...this.state}}}class Le{constructor(e,t,i,o,s){this.element=e,this.onSwipeLeft=t,this.onSwipeRight=i,this.onSwipeStart=o,this.onSwipeEnd=s,this.touchState={startX:0,startY:0,currentX:0,currentY:0,isDragging:!1},this.attachListeners()}attachListeners(){this.element.addEventListener("touchstart",this.handleTouchStart.bind(this),{passive:!1}),this.element.addEventListener("touchmove",this.handleTouchMove.bind(this),{passive:!1}),this.element.addEventListener("touchend",this.handleTouchEnd.bind(this)),this.element.addEventListener("mousedown",this.handleMouseDown.bind(this)),this.element.addEventListener("mousemove",this.handleMouseMove.bind(this)),this.element.addEventListener("mouseup",this.handleMouseUp.bind(this)),this.element.addEventListener("mouseleave",this.handleMouseUp.bind(this))}handleTouchStart(e){const t=e.touches[0];this.touchState={startX:t.clientX,startY:t.clientY,currentX:t.clientX,currentY:t.clientY,isDragging:!0},this.onSwipeStart()}handleTouchMove(e){if(!this.touchState.isDragging)return;const t=e.touches[0];this.touchState.currentX=t.clientX,this.touchState.currentY=t.clientY;Math.abs(this.touchState.currentX-this.touchState.startX)>Math.abs(this.touchState.currentY-this.touchState.startY)&&e.preventDefault()}handleTouchEnd(){if(!this.touchState.isDragging)return;const e=this.touchState.currentX-this.touchState.startX,t=this.touchState.currentY-this.touchState.startY,i=Math.abs(e),o=Math.abs(t);i>o?i>50&&(e>0?this.onSwipeRight():this.onSwipeLeft()):o>50&&(t>0?this.onSwipeRight():this.onSwipeLeft()),this.touchState.isDragging=!1,this.onSwipeEnd()}handleMouseDown(e){this.touchState={startX:e.clientX,startY:e.clientY,currentX:e.clientX,currentY:e.clientY,isDragging:!0},this.onSwipeStart()}handleMouseMove(e){this.touchState.isDragging&&(this.touchState.currentX=e.clientX,this.touchState.currentY=e.clientY)}handleMouseUp(){this.handleTouchEnd()}destroy(){this.element.removeEventListener("touchstart",this.handleTouchStart.bind(this)),this.element.removeEventListener("touchmove",this.handleTouchMove.bind(this)),this.element.removeEventListener("touchend",this.handleTouchEnd.bind(this)),this.element.removeEventListener("mousedown",this.handleMouseDown.bind(this)),this.element.removeEventListener("mousemove",this.handleMouseMove.bind(this)),this.element.removeEventListener("mouseup",this.handleMouseUp.bind(this)),this.element.removeEventListener("mouseleave",this.handleMouseUp.bind(this))}}function ze(e){if(!e)return"";try{return new Date(e).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}catch{return e}}function Pe(e){if(!e)return 0;if(e in $e)return $e[e];const[t,i]=e.split(":").map(Number);return t&&i?i/t*100:0}function Oe(e){return!!e.aspect_ratio&&""!==e.aspect_ratio}var Re,He;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Re||(Re={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(He||(He={}));var De=function(e,t,i,o){o=o||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return s.detail=i,e.dispatchEvent(s),s};class Ie{constructor(e,t,i){this.element=e,this.hass=t,this.config=i}open(e,t){this._openWithFireDomEvent(e,t),setTimeout(()=>{this._isDialogOpen()||this._openWithHassAction(e,t)},100)}close(){try{const e=new CustomEvent("close-dialog",{bubbles:!0,composed:!0});this.element.dispatchEvent(e)}catch(e){}}_isDialogOpen(){return!!document.querySelector("ha-dialog, ha-more-info-dialog, browser-mod-popup")}_openWithFireDomEvent(e,t){try{De(this.element,"fire-dom-event",{browser_mod:{service:"browser_mod.popup",data:{title:t||"RSS Feed",size:this._mapSizeToHASize(this.config.size),dismissable:this.config.closeOnBackdrop,timeout:0,content:{type:"iframe",url:e,aspect_ratio:"16x9"}}}})}catch(e){}}_openWithHassAction(e,t){try{const t=new CustomEvent("hass-action",{bubbles:!0,composed:!0,detail:{config:{action:"url",url_path:e,navigation_path:e},action:"tap"}});this.element.dispatchEvent(t)}catch(e){}}_mapSizeToHASize(e){switch(e){case"small":return"normal";case"medium":default:return"wide";case"large":case"fullscreen":return"fullscreen"}}_openWithShowDialog(e,t){try{const i=new CustomEvent("show-dialog",{bubbles:!0,composed:!0,detail:{dialogTag:"ha-dialog",dialogImport:()=>Promise.resolve(),dialogParams:{title:t||"RSS Feed",content:Ue`<iframe
              src="${e}"
              style="width: 100%; height: 80vh; border: none;"
            ></iframe>`,large:"large"===this.config.size||"fullscreen"===this.config.size}}});this.element.dispatchEvent(i)}catch(e){}}_isBrowserModAvailable(){return!(!this.hass.services||!this.hass.services.browser_mod)}async _callBrowserModService(e,t){if(this._isBrowserModAvailable())try{await this.hass.callService("browser_mod","popup",{title:t||"RSS Feed",size:this._mapSizeToHASize(this.config.size),dismissable:this.config.closeOnBackdrop,content:{type:"iframe",url:e,aspect_ratio:"16x9"}})}catch(e){}}}function Ue(e,...t){return e.reduce((e,i,o)=>e+i+(t[o]||""),"")}class Ne{constructor(e,t,i){this.element=e,this.config=t,this.hass=i,this._type="custom"}setType(e){this._type=e}open(e,t){Ne._activeModal&&Ne._activeModal!==this&&Ne._activeModal.close(),Ne._activeModal=this,"custom"===this._type?this._openCustomModal(e,t):this._openHADialog(e,t)}close(){this._customModal&&this._customModal.close(),this._haDialog&&this._haDialog.close(),Ne._activeModal===this&&(Ne._activeModal=null)}isOpen(){return!!this._customModal&&this._customModal.isOpen()}destroy(){this.close(),this._customModal&&this._customModal.parentElement&&this._customModal.remove(),this._customModal=void 0,this._haDialog=void 0,Ne._activeModal===this&&(Ne._activeModal=null)}_openCustomModal(e,t){this._customModal||(this._customModal=document.createElement("rssfeed-modal"),this._customModal.config=this.config,this._customModal.addEventListener("modal-closed",()=>{Ne._activeModal===this&&(Ne._activeModal=null)}),document.body.appendChild(this._customModal)),this._customModal.open(e,t)}_openHADialog(e,t){this.hass?(this._haDialog||(this._haDialog=new Ie(this.element,this.hass,this.config)),this._haDialog.open(e,t)):this._openCustomModal(e,t)}static getActiveModal(){return Ne._activeModal}static closeActiveModal(){Ne._activeModal&&Ne._activeModal.close()}}function je(e){return!1!==e.open_in_modal}function Be(e){return e.modal_type||"custom"}Ne._activeModal=null;const Ve=r`
  :host {
    display: block;
  }

  ha-card {
    overflow: hidden;
    height: 100%;
  }

  /* Aspect Ratio Container */
  .aspect-ratio-box {
    position: relative;
    width: 100%;
    padding-bottom: var(--aspect-ratio-padding, 100%);
  }

  .aspect-ratio-box > .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* Fixed Height Container - uses container height with minimum */
  .fixed-height {
    min-height: 300px;
    height: 100%;
  }

  /* Carousel Wrapper */
  .carousel-wrapper {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    background: var(--ha-card-background, var(--card-background-color));
  }

  .carousel {
    width: 100%;
    height: 100%;
  }

  /* Slide Base */
  .slide {
    position: relative;
    display: flex;
    align-items: flex-end;
    background: var(--ha-card-background, var(--card-background-color));
    overflow: hidden;
  }

  .slide a {
    color: inherit;
    text-decoration: none;
    width: 100%;
  }

  .slide a:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }

  /* Image Base */
  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slide-image[loading='lazy'] {
    background: var(--secondary-background-color);
  }

  /* Content Base */
  .slide-content {
    padding: 16px;
  }

  .slide-title {
    margin: 0 0 8px 0;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.2;
  }

  .slide-description {
    margin: 0 0 8px 0;
    font-size: 0.9em;
    line-height: 1.4;
    opacity: 0.9;
  }

  .slide-date {
    font-size: 0.75em;
    opacity: 0.7;
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .carousel,
    .slide {
      transition: none !important;
    }
  }

  /* Responsive Typography */
  @media (max-width: 600px) {
    .slide-title {
      font-size: 1.2em;
    }

    .slide-description {
      font-size: 0.85em;
    }
  }
`,qe=r`
  /* Background Image Layout */
  .layout-background .slide {
    color: white;
  }

  .layout-background .slide-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.5) blur(5px);
    z-index: 0;
  }

  .layout-background .slide-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  .layout-background .slide-image-fallback {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      var(--primary-color, #03a9f4) 0%,
      var(--accent-color, #ff9800) 100%
    );
    opacity: 0.3;
    z-index: 0;
  }
`,We=r`
  /* Split Layout */
  .layout-split .slide {
    flex-direction: column;
    align-items: stretch;
  }

  .layout-split .slide-image {
    flex-shrink: 0;
    height: 50%;
    width: 100%;
    object-fit: cover;
  }

  .layout-split .slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
    overflow-y: auto;
  }

  .layout-split .slide-image-fallback {
    height: 50%;
    background: var(--secondary-background-color);
  }
`,Ye=r`
  /* Vertical Slide Transition */
  .transition-slide-vertical .carousel {
    transition: transform 0.6s ease-in-out;
  }

  .transition-slide-vertical .slide {
    width: 100%;
    height: 100%;
    min-height: 300px;
  }
`,Xe=r`
  /* Horizontal Slide Transition */
  .transition-slide-horizontal .carousel {
    display: flex;
    transition: transform 0.6s ease-in-out;
  }

  .transition-slide-horizontal .slide {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
  }
`,Fe=r`
  /* Fade Transition */
  .transition-fade .carousel {
    position: relative;
  }

  .transition-fade .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }

  .transition-fade .slide.active {
    opacity: 1;
    position: relative;
  }
`,Ke=r`
  /* Navigation Buttons */
  .navigation-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: all 0.2s ease;
    font-size: 20px;
  }

  .navigation-button:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  .navigation-button:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .navigation-button.prev {
    left: 10px;
  }

  .navigation-button.next {
    right: 10px;
  }

  /* Vertical Navigation for slide-vertical transition */
  .transition-slide-vertical .navigation-button {
    left: 50%;
    transform: translateX(-50%);
  }

  .transition-slide-vertical .navigation-button:hover {
    transform: translateX(-50%) scale(1.1);
  }

  .transition-slide-vertical .navigation-button.prev {
    top: 10px;
    left: 50%;
  }

  .transition-slide-vertical .navigation-button.next {
    top: auto;
    bottom: 10px;
    left: 50%;
    right: auto;
  }

  .navigation-button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* Indicators (Dots) */
  .indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 1;
  }

  /* Vertical Indicators for slide-vertical transition */
  .transition-slide-vertical .indicators {
    flex-direction: column;
    bottom: auto;
    left: auto;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.2);
  }

  .indicator.active {
    background: white;
    width: 24px;
    border-radius: 4px;
  }

  /* Active indicator in vertical mode */
  .transition-slide-vertical .indicator.active {
    width: 8px;
    height: 24px;
  }

  .indicator:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  /* Timer Bubble */
  .timer-bubble {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    font-size: 12px;
    font-weight: bold;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
  }

  .timer-bubble.paused {
    opacity: 0.5;
  }

  .timer-bubble.hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* Accessibility */
  @media (prefers-reduced-motion: reduce) {
    .navigation-button,
    .indicator,
    .timer-bubble {
      transition: none;
    }
  }

  /* Touch-friendly larger hit areas */
  @media (pointer: coarse) {
    .navigation-button {
      width: 48px;
      height: 48px;
    }

    .indicator {
      width: 8px;
      height: 8px;
    }

    .indicator.active {
      width: 32px;
    }

    .transition-slide-vertical .indicator.active {
      width: 8px;
      height: 32px;
    }
  }
`,Je=r`
  .error-container,
  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 24px;
    text-align: center;
    background: var(--ha-card-background, var(--card-background-color));
    color: var(--primary-text-color);
  }

  .error-container {
    background: var(--error-color, #db4437);
    color: white;
  }

  .error-icon,
  .empty-icon {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.6;
  }

  .error-title,
  .empty-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .error-message,
  .empty-message {
    font-size: 14px;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  .error-details {
    font-size: 12px;
    opacity: 0.6;
    margin-top: 12px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    max-width: 400px;
    word-wrap: break-word;
  }

  .star-trek-quote {
    margin-top: 24px;
    padding: 16px;
    background: var(--secondary-background-color);
    border-left: 4px solid var(--primary-color);
    border-radius: 4px;
    font-style: italic;
    max-width: 400px;
  }

  .star-trek-quote-text {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .star-trek-quote-author {
    font-size: 12px;
    opacity: 0.7;
    text-align: right;
  }

  .performance-warning {
    position: absolute;
    top: 50px;
    right: 10px;
    background: var(--warning-color, #ffa500);
    color: var(--text-primary-color, #fff);
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 11px;
    z-index: 100;
    max-width: 200px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  /* Fallback for missing image */
  .slide-image-fallback {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      var(--primary-color, #03a9f4) 0%,
      var(--accent-color, #ff9800) 100%
    );
    opacity: 0.3;
    z-index: 0;
  }
`,Ge=r`
  /* Modal Backdrop */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9998;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }

  .modal-backdrop.hidden {
    display: none;
  }

  /* Modal Container */
  .modal-container {
    position: relative;
    background: var(--card-background-color, #fff);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    max-width: 95vw;
    max-height: 95vh;
    overflow: hidden;
    z-index: 9999;
  }

  /* Size variants */
  .modal-container.size-small {
    width: 50vw;
    height: 60vh;
  }

  .modal-container.size-medium {
    width: 70vw;
    height: 75vh;
  }

  .modal-container.size-large {
    width: 90vw;
    height: 85vh;
  }

  .modal-container.size-fullscreen {
    width: 95vw;
    height: 95vh;
  }

  /* Mobile: Auto-fullscreen under 720px */
  @media (max-width: 720px) {
    .modal-container {
      width: 95vw !important;
      height: 95vh !important;
      border-radius: 8px;
    }
  }

  /* Modal Header */
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
    flex-shrink: 0;
  }

  .modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    padding-right: 16px;
  }

  .modal-close-button {
    background: none;
    border: none;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
    color: var(--secondary-text-color, #757575);
    padding: 4px 8px;
    border-radius: 4px;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .modal-close-button:hover {
    background: var(--divider-color, #e0e0e0);
    color: var(--primary-text-color, #212121);
  }

  .modal-close-button:focus {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  /* Modal Body */
  .modal-body {
    position: relative;
    flex: 1;
    overflow: hidden;
    background: var(--card-background-color, #fff);
  }

  /* iframe */
  .modal-iframe {
    width: 100%;
    height: 100%;
    border: none;
    display: block;
  }

  .modal-iframe.hidden {
    display: none;
  }

  /* Loading State */
  .modal-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: var(--card-background-color, #fff);
    z-index: 1;
  }

  .modal-loading ha-circular-progress {
    --md-circular-progress-size: 48px;
  }

  .modal-loading-text {
    font-size: 14px;
    color: var(--secondary-text-color, #757575);
  }

  /* Error State */
  .modal-error {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 32px;
    background: var(--card-background-color, #fff);
    text-align: center;
    z-index: 1;
  }

  .modal-error-icon {
    font-size: 48px;
    opacity: 0.5;
  }

  .modal-error-title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--primary-text-color, #212121);
  }

  .modal-error-message {
    margin: 8px 0 0;
    font-size: 14px;
    color: var(--secondary-text-color, #757575);
    max-width: 400px;
  }

  .modal-error-button {
    margin-top: 16px;
    padding: 10px 24px;
    background: var(--primary-color, #03a9f4);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .modal-error-button:hover {
    background: var(--dark-primary-color, #0288d1);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .modal-error-button:active {
    transform: translateY(0);
  }

  .modal-error-button:focus {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }

  /* Animations */

  /* Fade Animation */
  .modal-animation-fade.modal-backdrop {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-fade.modal-backdrop.closing {
    animation: fadeOut 0.15s ease-in;
  }

  .modal-animation-fade .modal-container {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-fade.closing .modal-container {
    animation: fadeOut 0.15s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  /* Slide-up Animation */
  .modal-animation-slide-up.modal-backdrop {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-slide-up.modal-backdrop.closing {
    animation: fadeOut 0.15s ease-in;
  }

  .modal-animation-slide-up .modal-container {
    animation: slideUp 0.3s ease-out;
  }

  .modal-animation-slide-up.closing .modal-container {
    animation: slideDown 0.2s ease-in;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(50px);
    }
  }

  /* Scale Animation */
  .modal-animation-scale.modal-backdrop {
    animation: fadeIn 0.2s ease-out;
  }

  .modal-animation-scale.modal-backdrop.closing {
    animation: fadeOut 0.15s ease-in;
  }

  .modal-animation-scale .modal-container {
    animation: scaleIn 0.2s ease-out;
  }

  .modal-animation-scale.closing .modal-container {
    animation: scaleOut 0.15s ease-in;
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.9);
    }
  }

  /* None Animation */
  .modal-animation-none .modal-backdrop,
  .modal-animation-none .modal-container {
    animation: none !important;
  }

  /* Accessibility */
  .modal-container:focus {
    outline: none;
  }

  .modal-container:focus-visible {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: -2px;
  }

  /* Prevent body scroll when modal is open */
  body.modal-open {
    overflow: hidden;
  }
`;let Ze=class extends le{constructor(){super(...arguments),this._state={isOpen:!1,isLoading:!1,hasError:!1},this._isClosing=!1}connectedCallback(){super.connectedCallback(),this._setupKeyboardHandler(),this._preventBodyScroll()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupKeyboardHandler(),this._allowBodyScroll(),this._iframeLoadTimeout&&window.clearTimeout(this._iframeLoadTimeout)}open(e,t){this._state={isOpen:!0,isLoading:this.config.showLoading,hasError:!1,url:e,title:t},this._isClosing=!1,this.config.showLoading&&(this._iframeLoadTimeout=window.setTimeout(()=>{this._state.isLoading&&this._handleLoadTimeout()},1e4)),this.updateComplete.then(()=>{const e=this.shadowRoot?.querySelector(".modal-container");e?.focus()})}close(){if(!this._state.isOpen)return;this._isClosing=!0;const e="none"===this.config.animation?0:200;setTimeout(()=>{this._state={isOpen:!1,isLoading:!1,hasError:!1},this._isClosing=!1,this.dispatchEvent(new CustomEvent("modal-closed",{bubbles:!0,composed:!0}))},e)}isOpen(){return this._state.isOpen}_setupKeyboardHandler(){this.config.closeOnEsc&&(this._keydownHandler=e=>{"Escape"===e.key&&this._state.isOpen&&(e.preventDefault(),this.close())},document.addEventListener("keydown",this._keydownHandler))}_cleanupKeyboardHandler(){this._keydownHandler&&(document.removeEventListener("keydown",this._keydownHandler),this._keydownHandler=void 0)}_preventBodyScroll(){document.body.classList.add("modal-open")}_allowBodyScroll(){document.body.classList.remove("modal-open")}_handleBackdropClick(e){if(!this.config.closeOnBackdrop)return;e.target.classList.contains("modal-backdrop")&&this.close()}_handleCloseClick(){this.close()}_handleIframeLoad(){this._iframeLoadTimeout&&window.clearTimeout(this._iframeLoadTimeout),this._state={...this._state,isLoading:!1,hasError:!1}}_handleIframeError(){this._iframeLoadTimeout&&window.clearTimeout(this._iframeLoadTimeout),this._state={...this._state,isLoading:!1,hasError:!0,errorType:"cors"},this.config.fallbackToExternal&&setTimeout(()=>{this._openExternal(),this.close()},2e3)}_handleLoadTimeout(){this._state={...this._state,isLoading:!1,hasError:!0,errorType:"network"}}_openExternal(){this._state.url&&window.open(this._state.url,"_blank","noopener,noreferrer")}_getErrorMessage(){switch(this._state.errorType){case"cors":return"This website cannot be displayed in a frame due to security restrictions. Opening in a new tab...";case"network":return"Failed to load the website. Please check your internet connection.";default:return"An error occurred while loading the website."}}_getModalSize(){return window.innerWidth<720?Se.fullscreen:this.config.width&&this.config.height?{width:this.config.width,height:this.config.height}:Se[this.config.size]}render(){if(!this._state.isOpen)return q``;const e={"modal-backdrop":!0,[`modal-animation-${this.config.animation}`]:!0,closing:this._isClosing},t={"modal-container":!0,[`size-${this.config.size}`]:!this.config.width},i=this._getModalSize(),o=this.config.width&&this.config.height?{width:i.width,height:i.height}:{},s={"modal-iframe":!0,hidden:this._state.isLoading||this._state.hasError},a=this.config.iframeSandbox?"allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation":"";return q`
      <div
        class=${xe(e)}
        @click=${this._handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          class=${xe(t)}
          style=${be(o)}
          tabindex="-1"
          @click=${e=>e.stopPropagation()}
        >
          <!-- Header -->
          <div class="modal-header">
            <h2 id="modal-title" class="modal-title">${this._state.title||"RSS Feed"}</h2>
            ${this.config.showCloseButton?q`
                  <button
                    class="modal-close-button"
                    @click=${this._handleCloseClick}
                    aria-label="Close modal"
                  >
                    ×
                  </button>
                `:""}
          </div>

          <!-- Body -->
          <div class="modal-body">
            ${this._state.isLoading?this._renderLoading():""}
            ${this._state.hasError?this._renderError():""}
            <iframe
              class=${xe(s)}
              src="${this._state.url}"
              title="${this._state.title||"RSS Feed Content"}"
              sandbox="${a}"
              @load=${this._handleIframeLoad}
              @error=${this._handleIframeError}
            ></iframe>
          </div>
        </div>
      </div>
    `}_renderLoading(){return q`
      <div class="modal-loading">
        <ha-circular-progress active></ha-circular-progress>
        <p class="modal-loading-text">Loading website...</p>
      </div>
    `}_renderError(){return q`
      <div class="modal-error">
        <div class="modal-error-icon">⚠️</div>
        <h3 class="modal-error-title">Cannot Load Website</h3>
        <p class="modal-error-message">${this._getErrorMessage()}</p>
        ${this.config.fallbackToExternal&&"cors"===this._state.errorType?"":q`
              <button class="modal-error-button" @click=${this._openExternal}>
                Open in New Tab
              </button>
            `}
      </div>
    `}};Ze.styles=Ge,t([pe({type:Object})],Ze.prototype,"config",void 0),t([me()],Ze.prototype,"_state",void 0),t([me()],Ze.prototype,"_isClosing",void 0),Ze=t([ce("rssfeed-modal")],Ze);const Qe={basic:"Entity",layout:"Layout",carousel:"Carousel",content:"Content",navigation:"Navigation",grid:"Grid Layout (Sections View)",modal:"Modal Settings",advanced:"Advanced"},et=[{id:"entity",label:"RSS Feed Entity",type:"entity-picker",category:"basic",includeDomains:["sensor"]},{id:"aspect_ratio",label:"Aspect Ratio",type:"select",category:"layout",options:[{value:"",label:"Dynamic (Auto Height)"},...Object.keys($e).map(e=>({value:e,label:e}))]},{id:"image_layout",label:"Image Layout",type:"select",category:"layout",options:[{value:"background",label:"Background with Blur"},{value:"split",label:"Split (Image Top, Text Bottom)"}]},{id:"slide_duration_sec",label:"Slide Duration (seconds)",type:"number",category:"carousel",min:1,max:60},{id:"transition",label:"Transition Effect",type:"select",category:"carousel",options:["slide-vertical","slide-horizontal","fade"].map(e=>({value:e,label:e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}))},{id:"auto_play",label:"Auto Play",type:"checkbox",category:"carousel"},{id:"pause_on_hover",label:"Pause on Hover/Touch",type:"checkbox",category:"carousel"},{id:"row_limit",label:"Row Limit (0 = all)",type:"number",category:"content",min:0,max:100},{id:"show_images",label:"Show Images",type:"checkbox",category:"content"},{id:"lazy_load_images",label:"Lazy Load Images",type:"checkbox",category:"content",dependency:"show_images",dependencyValue:!0},{id:"show_navigation",label:"Show Navigation Arrows",type:"checkbox",category:"navigation"},{id:"show_indicators",label:"Show Indicators (Dots)",type:"checkbox",category:"navigation"},{id:"keyboard_navigation",label:"Keyboard Navigation",type:"checkbox",category:"navigation"},{id:"grid_rows",label:"Grid Rows",type:"number",category:"grid",min:1,max:12},{id:"grid_columns",label:"Grid Columns",type:"number",category:"grid",min:1,max:12},{id:"open_in_modal",label:"Open Links in Modal",type:"checkbox",category:"modal"},{id:"modal_type",label:"Modal Type",type:"select",category:"modal",dependency:"open_in_modal",dependencyValue:!0,options:[{value:"custom",label:"Custom Modal (iframe)"},{value:"none",label:"Direct External Link (No Modal)"}]},{id:"modal_size",label:"Modal Size",type:"select",category:"modal",dependency:"open_in_modal",dependencyValue:!0,options:Object.keys(Se).map(e=>({value:e,label:e.charAt(0).toUpperCase()+e.slice(1)}))},{id:"modal_width",label:"Custom Width (optional)",type:"text",category:"modal",dependency:"open_in_modal",dependencyValue:!0,helper:"e.g. 800px or 80%"},{id:"modal_height",label:"Custom Height (optional)",type:"text",category:"modal",dependency:"open_in_modal",dependencyValue:!0,helper:"e.g. 600px or 70%"},{id:"modal_animation",label:"Animation",type:"select",category:"modal",dependency:"open_in_modal",dependencyValue:!0,options:Object.keys({fade:{enter:"fadeIn 0.2s ease-out",exit:"fadeOut 0.15s ease-in"},"slide-up":{enter:"slideUp 0.3s ease-out",exit:"slideDown 0.2s ease-in"},scale:{enter:"scaleIn 0.2s ease-out",exit:"scaleOut 0.15s ease-in"},none:{enter:"none",exit:"none"}}).map(e=>({value:e,label:e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}))},{id:"modal_show_loading",label:"Show Loading Spinner",type:"checkbox",category:"modal",dependency:"open_in_modal",dependencyValue:!0},{id:"modal_iframe_sandbox",label:"Enable iframe Sandbox Security",type:"checkbox",category:"modal",dependency:"open_in_modal",dependencyValue:!0,helper:"Adds security restrictions to iframe content"},{id:"modal_fallback_to_external",label:"Fallback to External Link (CORS)",type:"checkbox",category:"modal",dependency:"open_in_modal",dependencyValue:!0},{id:"modal_close_on_backdrop",label:"Close on Backdrop Click",type:"checkbox",category:"modal",dependency:"open_in_modal",dependencyValue:!0},{id:"modal_show_close_button",label:"Show Close Button",type:"checkbox",category:"modal",dependency:"open_in_modal",dependencyValue:!0},{id:"modal_close_on_esc",label:"Close on ESC Key",type:"checkbox",category:"modal",dependency:"open_in_modal",dependencyValue:!0},{id:"performance_warning",label:"Performance Warning Threshold",type:"number",category:"advanced",min:5,max:100,helper:"Show warning when feed has more items than this"},{id:"style",label:"Custom CSS",type:"textarea",category:"advanced",helper:"Advanced: Add custom CSS styles"}];let tt=class extends le{setConfig(e){this._config={...we,...e}}render(){if(!this.hass||!this._config)return q``;const e=function(){const e=new Map;return et.forEach(t=>{e.has(t.category)||e.set(t.category,[]),e.get(t.category).push(t)}),e}();return q`
      <div class="card-config">
        ${Array.from(e.entries()).map(([e,t])=>this._renderSection(e,t))}
      </div>
    `}_renderSection(e,t){const i=Qe[e],o=t.filter(e=>{return t=e,i=this._config,!t.dependency||i[t.dependency]===t.dependencyValue;var t,i});if("advanced"===e)return q`
        <details class="config-section">
          <summary class="section-title">${i}</summary>
          ${o.map(e=>this._renderControl(e))}
        </details>
      `;if("grid"===e)return q`
        <div class="config-section">
          <h3 class="section-title">${i}</h3>
          <div class="grid-inputs">
            ${o.map(e=>this._renderControl(e))}
          </div>
        </div>
      `;const s="modal"===e&&o.some(e=>"modal_width"===e.id)&&o.some(e=>"modal_height"===e.id);if(s){const e=o.filter(e=>"modal_width"===e.id||"modal_height"===e.id),t=o.filter(e=>"modal_width"!==e.id&&"modal_height"!==e.id);return q`
        <div class="config-section">
          <h3 class="section-title">${i}</h3>
          ${t.map(t=>"modal_size"===t.id?q`
                ${this._renderControl(t)}
                <div class="grid-inputs">
                  ${e.map(e=>this._renderControl(e))}
                </div>
              `:this._renderControl(t))}
        </div>
      `}return q`
      <div class="config-section">
        <h3 class="section-title">${i}</h3>
        ${o.map(e=>this._renderControl(e))}
      </div>
    `}_renderControl(e){const t=this._config?.[e.id];switch(e.type){case"entity-picker":return q`
          <ha-entity-picker
            label=${e.label}
            .hass=${this.hass}
            .value=${t}
            .configValue=${e.id}
            @value-changed=${this._valueChanged}
            allow-custom-entity
            .includeDomains=${e.includeDomains||[]}
          ></ha-entity-picker>
        `;case"text":return q`
          <ha-textfield
            label=${e.label}
            .value=${t||""}
            .configValue=${e.id}
            @input=${this._valueChanged}
            helper=${e.helper||""}
          ></ha-textfield>
        `;case"number":return q`
          <ha-textfield
            label=${e.label}
            type="number"
            min=${e.min??0}
            max=${e.max??100}
            .value=${t??e.min??0}
            .configValue=${e.id}
            @input=${this._valueChanged}
            helper=${e.helper||""}
          ></ha-textfield>
        `;case"checkbox":return q`
          <ha-formfield label=${e.label}>
            <ha-switch
              .checked=${!1!==t}
              .configValue=${e.id}
              @change=${this._valueChanged}
            ></ha-switch>
          </ha-formfield>
        `;case"select":return q`
          <ha-select
            label=${e.label}
            .value=${t??e.options?.[0]?.value??""}
            .configValue=${e.id}
            @selected=${this._valueChanged}
            @closed=${e=>e.stopPropagation()}
          >
            ${e.options?.map(e=>q`<mwc-list-item value=${e.value}>${e.label}</mwc-list-item>`)}
          </ha-select>
        `;case"textarea":return q`
          <ha-textarea
            label=${e.label}
            .value=${t||""}
            .configValue=${e.id}
            @input=${this._valueChanged}
            rows="5"
            helper=${e.helper||""}
          ></ha-textarea>
        `;default:return q``}}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target,i=t.configValue;if(!i)return;let o;if(o="checkbox"===t.type||"HA-SWITCH"===t.tagName?t.checked:"number"===t.type?Number(t.value):(t.tagName,t.value),this._config[i]===o)return;const s={...this._config,[i]:o};""!==o&&void 0!==o||delete s[i],this._config=s,De(this,"config-changed",{config:this._config})}};return tt.styles=r`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .config-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
      background: var(--secondary-background-color);
      border-radius: 8px;
    }

    .section-title {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 600;
      color: var(--primary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    details.config-section {
      cursor: pointer;
    }

    details.config-section summary {
      cursor: pointer;
      user-select: none;
    }

    ha-entity-picker,
    ha-textfield,
    ha-select,
    ha-textarea,
    ha-formfield {
      display: block;
      width: 100%;
    }

    ha-formfield {
      margin: 8px 0;
    }

    .grid-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    /* Mobile responsive */
    @media (max-width: 600px) {
      .config-section {
        padding: 12px;
      }

      .grid-inputs {
        grid-template-columns: 1fr;
      }
    }
  `,t([pe({attribute:!1})],tt.prototype,"hass",void 0),t([me()],tt.prototype,"_config",void 0),tt=t([ce("rssfeed-metro-tile-editor")],tt),e.RssfeedMetroTile=class extends le{constructor(){super(...arguments),this._feed=[],this._carouselState={currentIndex:0,timeRemaining:0,isPaused:!1,totalSlides:0},this._errorState={type:"none",message:""},this._performanceWarning=null,this._isHovering=!1,this._handleKeyDown=e=>{if(this._config?.keyboard_navigation)switch(e.key){case"ArrowLeft":case"ArrowUp":e.preventDefault(),this._handlePrevious();break;case"ArrowRight":case"ArrowDown":e.preventDefault(),this._handleNext()}}}setConfig(e){if(!e.entity)throw new Error("You need to define an entity");this._config={...we,...e},e.dynamic_height&&e.aspect_ratio}getCardSize(){if(!this._config)return 1;if(Oe(this._config)){const e=Pe(this._config.aspect_ratio);return Math.ceil(e/50)}return 6}static getStubConfig(){return{type:"custom:rssfeed-metro-tile",entity:"",...we}}static getConfigElement(){return document.createElement("rssfeed-metro-tile-editor")}willUpdate(e){var t,i;if((super.willUpdate(e),this.hass&&this._config)&&((e.has("hass")||e.has("_config"))&&(this._errorState=function(e,t){if(!t)return{type:"entity",message:Ae};const i=e.states[t];return i?i.attributes.entries&&Array.isArray(i.attributes.entries)?{type:"none",message:""}:{type:"entity",message:Ce(t),details:`Expected an RSS feed sensor with "entries" attribute. Found: ${Object.keys(i.attributes).join(", ")}`}:{type:"entity",message:Ee(t),details:"Check that the entity exists and is available."}}(this.hass,this._config.entity),"none"===this._errorState.type))){const e=function(e,t,i){const o=e.states[t];if(!o?.attributes.entries)return[];const s=o.attributes.entries,a=i||s.length;return s.slice(0,a)}(this.hass,this._config.entity,this._config.row_limit||0);JSON.stringify(e)!==JSON.stringify(this._feed)&&(this._feed=e,this._performanceWarning=(t=this._feed.length,i=this._config.performance_warning||20,t>i?Me(t,i):null),this._carousel&&this._carousel.updateLength(this._feed.length))}}updated(e){super.updated(e),e.has("_feed")&&this._feed.length>0&&(this._setupCarousel(),this._setupTouchHandler(),this._setupKeyboardNavigation()),e.has("_config")&&this._config&&this._setupModalController()}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._cleanupCarousel(),this._cleanupTouchHandler(),this._cleanupKeyboardNavigation(),this._cleanupModalController()}_setupModalController(){var e;if(this._config&&(this._cleanupModalController(),je(this._config))){const t={url:"",title:"",size:(e=this._config).modal_size||"medium",width:e.modal_width,height:e.modal_height,animation:e.modal_animation||"fade",closeOnBackdrop:!1!==e.modal_close_on_backdrop,showCloseButton:!1!==e.modal_show_close_button,closeOnEsc:!1!==e.modal_close_on_esc,showLoading:!1!==e.modal_show_loading,iframeSandbox:!1!==e.modal_iframe_sandbox,fallbackToExternal:!1!==e.modal_fallback_to_external};this._modalController=new Ne(this,t,this.hass),this._modalController.setType(Be(this._config))}}_cleanupModalController(){this._modalController&&(this._modalController.destroy(),this._modalController=void 0)}_setupCarousel(){this._cleanupCarousel(),this._feed.length&&this._config&&(this._carousel=new Te(this._config.slide_duration_sec||5,this._feed.length,e=>{this._carouselState={...e}}),this._config.auto_play&&this._carousel.start())}_cleanupCarousel(){this._carousel&&(this._carousel.stop(),this._carousel=void 0)}_setupTouchHandler(){this._carouselWrapper&&this._config&&(this._cleanupTouchHandler(),this._touchHandler=new Le(this._carouselWrapper,()=>this._handleNext(),()=>this._handlePrevious(),()=>this._handleSwipeStart(),()=>this._handleSwipeEnd()))}_cleanupTouchHandler(){this._touchHandler&&(this._touchHandler.destroy(),this._touchHandler=void 0)}_setupKeyboardNavigation(){this._config?.keyboard_navigation&&document.addEventListener("keydown",this._handleKeyDown)}_cleanupKeyboardNavigation(){document.removeEventListener("keydown",this._handleKeyDown)}_handlePrevious(){this._carousel&&this._carousel.previous()}_handleNext(){this._carousel&&this._carousel.next()}_handleGoTo(e){this._carousel&&this._carousel.goTo(e)}_handleSwipeStart(){this._config?.pause_on_hover&&this._carousel&&this._carousel.pause()}_handleSwipeEnd(){this._config?.pause_on_hover&&this._carousel&&!this._isHovering&&this._carousel.resume()}_handleMouseEnter(){this._isHovering=!0,this._config?.pause_on_hover&&this._carousel&&this._carousel.pause()}_handleMouseLeave(){this._isHovering=!1,this._config?.pause_on_hover&&this._carousel&&this._carousel.resume()}_handleSlideClick(e,t){if(!this._config||!je(this._config))return;if("none"===Be(this._config))return t.preventDefault(),t.stopPropagation(),void window.open(e.link,"_blank","noopener,noreferrer");t.preventDefault(),t.stopPropagation(),this._modalController&&e.link&&this._modalController.open(e.link,e.title||"RSS Feed")}render(){return this._config&&this.hass?"none"!==this._errorState.type?this._renderError():0===this._feed.length?this._renderEmpty():this._renderCarousel():q``}_renderError(){return q`
      <ha-card>
        <div class="error-container">
          <div class="error-icon">⚠️</div>
          <div class="error-title">Configuration Error</div>
          <div class="error-message">${this._errorState.message}</div>
          ${this._errorState.details?q`<div class="error-details">${this._errorState.details}</div>`:""}
        </div>
      </ha-card>
    `}_renderEmpty(){const e=ke[Math.floor(Math.random()*ke.length)];return q`
      <ha-card>
        <div class="empty-container">
          <div class="empty-icon">📡</div>
          <div class="empty-title">No Feed Items</div>
          <div class="empty-message">The feed is currently empty.</div>
          <div class="star-trek-quote">
            <div class="star-trek-quote-text">"${e.quote}"</div>
            <div class="star-trek-quote-author">— ${e.author}</div>
          </div>
        </div>
      </ha-card>
    `}_renderCarousel(){const e=Oe(this._config),t=e?Pe(this._config.aspect_ratio):0,i=e?{"--aspect-ratio-padding":`${t}%`}:{};return q`
      ${e?q`<style>
            :host {
              --aspect-ratio-padding: ${t}%;
            }
          </style>`:""}
      <ha-card>
        <div class=${xe({"aspect-ratio-box":e,"fixed-height":!e})} style=${be(i)}>
          <div class="content">
            ${this._renderCarouselContent()}
            ${this._performanceWarning?q`<div class="performance-warning">${this._performanceWarning}</div>`:""}
          </div>
        </div>
      </ha-card>
    `}_renderCarouselContent(){const e={"carousel-wrapper":!0,[`layout-${this._config.image_layout}`]:!0,[`transition-${this._config.transition}`]:!0};return q`
      <div
        class=${xe(e)}
        tabindex="0"
        role="region"
        aria-label="RSS Feed Carousel"
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        ${this._renderSlides()} ${this._renderControls()}
      </div>
    `}_renderSlides(){const{currentIndex:e}=this._carouselState,t=this._config.transition||"slide-vertical";let i={};return"slide-vertical"===t?i={transform:`translateY(-${100*e}%)`}:"slide-horizontal"===t&&(i={transform:`translateX(-${100*e}%)`}),q`
      <div class="carousel" style=${be(i)}>
        ${this._feed.map((e,t)=>this._renderSlide(e,t))}
      </div>
    `}_renderSlide(e,t){const{currentIndex:i}=this._carouselState,o=t===i,s=this._config.transition||"slide-vertical",a={slide:!0,active:o&&"fade"===s},n=function(e){const t=e.links?.find(e=>e.type?.includes("image"));return t?.href||null}(e),r=!1!==this._config.show_images&&!!n,l=je(this._config),d={cursor:l?"pointer":"default"};return q`
      <div
        class=${xe(a)}
        style=${be(d)}
        @click=${t=>this._handleSlideClick(e,t)}
      >
        ${this._renderSlideImage(n,r)}
        <div class="slide-content">
          ${l?q`
                <div>
                  ${e.title?q`<h3 class="slide-title">${e.title}</h3>`:""}
                  ${e.description||e.summary?q`<p class="slide-description">${e.description||e.summary}</p>`:""}
                  ${e.published?q`<small class="slide-date">${ze(e.published)}</small>`:""}
                </div>
              `:q`
                <a href="${e.link}" target="_blank" rel="noopener noreferrer">
                  ${e.title?q`<h3 class="slide-title">${e.title}</h3>`:""}
                  ${e.description||e.summary?q`<p class="slide-description">${e.description||e.summary}</p>`:""}
                  ${e.published?q`<small class="slide-date">${ze(e.published)}</small>`:""}
                </a>
              `}
        </div>
      </div>
    `}_renderSlideImage(e,t){if(!t||!e)return q`<div class="slide-image-fallback"></div>`;const i=!1!==this._config.lazy_load_images;return q`
      <img
        class="slide-image"
        src="${e}"
        alt=""
        loading="${i?"lazy":"eager"}"
        @error=${this._handleImageError}
      />
    `}_handleImageError(e){const t=e.target,i=t.parentElement?.querySelector(".slide-image-fallback");if(!i){const e=document.createElement("div");e.className="slide-image-fallback",t.parentElement?.appendChild(e)}t.style.display="none"}_renderControls(){const{timeRemaining:e,isPaused:t}=this._carouselState,i=this._config.show_navigation,o=this._config.show_indicators,s=this._config.transition||"slide-vertical",a="slide-vertical"===s?"∧":"‹",n="slide-vertical"===s?"∨":"›";return q`
      ${i?q`
            <button
              class="navigation-button prev"
              @click=${this._handlePrevious}
              aria-label="Previous slide"
            >
              ${a}
            </button>
            <button
              class="navigation-button next"
              @click=${this._handleNext}
              aria-label="Next slide"
            >
              ${n}
            </button>
          `:""}
      ${o?this._renderIndicators():""}
      <div class="timer-bubble ${t?"paused":""}">${e}</div>
    `}_renderIndicators(){const{currentIndex:e}=this._carouselState,t=this._feed.length;return q`
      <div class="indicators">
        ${Array.from({length:t},(t,i)=>q`
            <button
              class="indicator ${i===e?"active":""}"
              @click=${()=>this._handleGoTo(i)}
              aria-label="Go to slide ${i+1}"
            ></button>
          `)}
      </div>
    `}},e.RssfeedMetroTile.styles=[Ve,qe,We,Ye,Xe,Fe,Ke,Je],t([pe({attribute:!1})],e.RssfeedMetroTile.prototype,"hass",void 0),t([me()],e.RssfeedMetroTile.prototype,"_config",void 0),t([me()],e.RssfeedMetroTile.prototype,"_feed",void 0),t([me()],e.RssfeedMetroTile.prototype,"_carouselState",void 0),t([me()],e.RssfeedMetroTile.prototype,"_errorState",void 0),t([me()],e.RssfeedMetroTile.prototype,"_performanceWarning",void 0),t([function(e){return(t,i,o)=>((e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i))(t,i,{get(){return(t=>t.renderRoot?.querySelector(e)??null)(this)}})}(".carousel-wrapper")],e.RssfeedMetroTile.prototype,"_carouselWrapper",void 0),e.RssfeedMetroTile=t([ce("rssfeed-metro-tile")],e.RssfeedMetroTile),window.customCards=window.customCards||[],window.customCards.push({type:"rssfeed-metro-tile",name:"RSS Feed Metro Tile",description:"Display RSS feed entries as animated Metro-style tiles",preview:!0}),e}({});
