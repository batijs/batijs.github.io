const d={context:void 0,registry:void 0};function ee(e){d.context=e}function Je(){return{...d.context,id:`${d.context.id}${d.context.count++}-`,count:0}}const Qe=(e,t)=>e===t,P=Symbol("solid-proxy"),te=Symbol("solid-track"),ze=Symbol("solid-dev-component"),q={equals:Qe};let ve=ke;const L=1,W=2,Ee={owned:null,cleanups:null,context:null,owner:null};var y=null;let z=null,b=null,w=null,N=null,J=0;function K(e,t){const n=b,i=y,s=e.length===0,r=s?Ee:{owned:null,cleanups:null,context:null,owner:t===void 0?i:t},l=s?e:()=>e(()=>x(()=>Q(r)));y=r,b=null;try{return B(l,!0)}finally{b=n,y=i}}function ce(e,t){t=t?Object.assign({},q,t):q;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},i=s=>(typeof s=="function"&&(s=s(n.value)),Le(n,s));return[Te.bind(n),i]}function k(e,t,n){const i=ue(e,t,!1,L);U(i)}function un(e,t,n){ve=st;const i=ue(e,t,!1,L);(!n||!n.render)&&(i.user=!0),N?N.push(i):U(i)}function S(e,t,n){n=n?Object.assign({},q,n):q;const i=ue(e,t,!0,0);return i.observers=null,i.observerSlots=null,i.comparator=n.equals||void 0,U(i),Te.bind(i)}function je(e){return B(e,!1)}function x(e){if(b===null)return e();const t=b;b=null;try{return e()}finally{b=t}}function an(e,t,n){const i=Array.isArray(e);let s,r=n&&n.defer;return l=>{let o;if(i){o=Array(e.length);for(let u=0;u<e.length;u++)o[u]=e[u]()}else o=e();if(r){r=!1;return}const c=x(()=>t(o,s,l));return s=o,c}}function Ze(e){return y===null||(y.cleanups===null?y.cleanups=[e]:y.cleanups.push(e)),e}function $e(){return b}function Ne(e,t){const n=Symbol("context");return{id:n,Provider:lt(n),defaultValue:e}}function et(e){let t;return(t=Me(y,e.id))!==void 0?t:e.defaultValue}function tt(e){const t=S(e),n=S(()=>ne(t()));return n.toArray=()=>{const i=n();return Array.isArray(i)?i:i!=null?[i]:[]},n}function Te(){if(this.sources&&this.state)if(this.state===L)U(this);else{const e=w;w=null,B(()=>X(this),!1),w=e}if(b){const e=this.observers?this.observers.length:0;b.sources?(b.sources.push(this),b.sourceSlots.push(e)):(b.sources=[this],b.sourceSlots=[e]),this.observers?(this.observers.push(b),this.observerSlots.push(b.sources.length-1)):(this.observers=[b],this.observerSlots=[b.sources.length-1])}return this.value}function Le(e,t,n){let i=e.value;return(!e.comparator||!e.comparator(i,t))&&(e.value=t,e.observers&&e.observers.length&&B(()=>{for(let s=0;s<e.observers.length;s+=1){const r=e.observers[s],l=z&&z.running;l&&z.disposed.has(r),(l?!r.tState:!r.state)&&(r.pure?w.push(r):N.push(r),r.observers&&De(r)),l||(r.state=L)}if(w.length>1e6)throw w=[],new Error},!1)),t}function U(e){if(!e.fn)return;Q(e);const t=y,n=b,i=J;b=y=e,nt(e,e.value,i),b=n,y=t}function nt(e,t,n){let i;try{i=e.fn(t)}catch(s){return e.pure&&(e.state=L,e.owned&&e.owned.forEach(Q),e.owned=null),e.updatedAt=n+1,_e(s)}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?Le(e,i):e.value=i,e.updatedAt=n)}function ue(e,t,n,i=L,s){const r={fn:e,state:i,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:y,context:null,pure:n};return y===null||y!==Ee&&(y.owned?y.owned.push(r):y.owned=[r]),r}function Y(e){if(e.state===0)return;if(e.state===W)return X(e);if(e.suspense&&x(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<J);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===L)U(e);else if(e.state===W){const i=w;w=null,B(()=>X(e,t[0]),!1),w=i}}function B(e,t){if(w)return e();let n=!1;t||(w=[]),N?n=!0:N=[],J++;try{const i=e();return it(n),i}catch(i){n||(N=null),w=null,_e(i)}}function it(e){if(w&&(ke(w),w=null),e)return;const t=N;N=null,t.length&&B(()=>ve(t),!1)}function ke(e){for(let t=0;t<e.length;t++)Y(e[t])}function st(e){let t,n=0;for(t=0;t<e.length;t++){const i=e[t];i.user?e[n++]=i:Y(i)}if(d.context){if(d.count){d.effects||(d.effects=[]),d.effects.push(...e.slice(0,n));return}else d.effects&&(e=[...d.effects,...e],n+=d.effects.length,delete d.effects);ee()}for(t=0;t<n;t++)Y(e[t])}function X(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];if(i.sources){const s=i.state;s===L?i!==t&&(!i.updatedAt||i.updatedAt<J)&&Y(i):s===W&&X(i,t)}}}function De(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=W,n.pure?w.push(n):N.push(n),n.observers&&De(n))}}function Q(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),i=e.sourceSlots.pop(),s=n.observers;if(s&&s.length){const r=s.pop(),l=n.observerSlots.pop();i<s.length&&(r.sourceSlots[l]=i,s[i]=r,n.observerSlots[i]=l)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)Q(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0,e.context=null}function rt(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function _e(e,t=y){throw rt(e)}function Me(e,t){return e?e.context&&e.context[t]!==void 0?e.context[t]:Me(e.owner,t):void 0}function ne(e){if(typeof e=="function"&&!e.length)return ne(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const i=ne(e[n]);Array.isArray(i)?t.push.apply(t,i):t.push(i)}return t}return e}function lt(e,t){return function(i){let s;return k(()=>s=x(()=>(y.context={[e]:i.value},tt(()=>i.children))),void 0),s}}const ot=Symbol("fallback");function ge(e){for(let t=0;t<e.length;t++)e[t]()}function ft(e,t,n={}){let i=[],s=[],r=[],l=0,o=t.length>1?[]:null;return Ze(()=>ge(r)),()=>{let c=e()||[],u,f;return c[te],x(()=>{let h=c.length,g,m,p,C,j,O,v,$,D;if(h===0)l!==0&&(ge(r),r=[],i=[],s=[],l=0,o&&(o=[])),n.fallback&&(i=[ot],s[0]=K(Xe=>(r[0]=Xe,n.fallback())),l=1);else if(l===0){for(s=new Array(h),f=0;f<h;f++)i[f]=c[f],s[f]=K(a);l=h}else{for(p=new Array(h),C=new Array(h),o&&(j=new Array(h)),O=0,v=Math.min(l,h);O<v&&i[O]===c[O];O++);for(v=l-1,$=h-1;v>=O&&$>=O&&i[v]===c[$];v--,$--)p[$]=s[v],C[$]=r[v],o&&(j[$]=o[v]);for(g=new Map,m=new Array($+1),f=$;f>=O;f--)D=c[f],u=g.get(D),m[f]=u===void 0?-1:u,g.set(D,f);for(u=O;u<=v;u++)D=i[u],f=g.get(D),f!==void 0&&f!==-1?(p[f]=s[u],C[f]=r[u],o&&(j[f]=o[u]),f=m[f],g.set(D,f)):r[u]();for(f=O;f<h;f++)f in p?(s[f]=p[f],r[f]=C[f],o&&(o[f]=j[f],o[f](f))):s[f]=K(a);s=s.slice(0,l=h),i=c.slice(0)}return s});function a(h){if(r[f]=h,o){const[g,m]=ce(f);return o[f]=m,t(c[f],g)}return t(c[f])}}}let Ie=!1;function ct(){Ie=!0}function E(e,t){if(Ie&&d.context){const n=d.context;ee(Je());const i=x(()=>e(t||{}));return ee(n),i}return x(()=>e(t||{}))}function V(){return!0}const ie={get(e,t,n){return t===P?n:e.get(t)},has(e,t){return t===P?!0:e.has(t)},set:V,deleteProperty:V,getOwnPropertyDescriptor(e,t){return{configurable:!0,enumerable:!0,get(){return e.get(t)},set:V,deleteProperty:V}},ownKeys(e){return e.keys()}};function Z(e){return(e=typeof e=="function"?e():e)?e:{}}function ut(){for(let e=0,t=this.length;e<t;++e){const n=this[e]();if(n!==void 0)return n}}function at(...e){let t=!1;for(let r=0;r<e.length;r++){const l=e[r];t=t||!!l&&P in l,e[r]=typeof l=="function"?(t=!0,S(l)):l}if(t)return new Proxy({get(r){for(let l=e.length-1;l>=0;l--){const o=Z(e[l])[r];if(o!==void 0)return o}},has(r){for(let l=e.length-1;l>=0;l--)if(r in Z(e[l]))return!0;return!1},keys(){const r=[];for(let l=0;l<e.length;l++)r.push(...Object.keys(Z(e[l])));return[...new Set(r)]}},ie);const n={},i={},s=new Set;for(let r=e.length-1;r>=0;r--){const l=e[r];if(!l)continue;const o=Object.getOwnPropertyNames(l);for(let c=0,u=o.length;c<u;c++){const f=o[c];if(f==="__proto__"||f==="constructor")continue;const a=Object.getOwnPropertyDescriptor(l,f);if(!s.has(f))a.get?(s.add(f),Object.defineProperty(n,f,{enumerable:!0,configurable:!0,get:ut.bind(i[f]=[a.get.bind(l)])})):(a.value!==void 0&&s.add(f),n[f]=a.value);else{const h=i[f];h?a.get?h.push(a.get.bind(l)):a.value!==void 0&&h.push(()=>a.value):n[f]===void 0&&(n[f]=a.value)}}}return n}function dt(e,...t){if(P in e){const s=new Set(t.length>1?t.flat():t[0]),r=t.map(l=>new Proxy({get(o){return l.includes(o)?e[o]:void 0},has(o){return l.includes(o)&&o in e},keys(){return l.filter(o=>o in e)}},ie));return r.push(new Proxy({get(l){return s.has(l)?void 0:e[l]},has(l){return s.has(l)?!1:l in e},keys(){return Object.keys(e).filter(l=>!s.has(l))}},ie)),r}const n={},i=t.map(()=>({}));for(const s of Object.getOwnPropertyNames(e)){const r=Object.getOwnPropertyDescriptor(e,s),l=!r.get&&!r.set&&r.enumerable&&r.writable&&r.configurable;let o=!1,c=0;for(const u of t)u.includes(s)&&(o=!0,l?i[c][s]=r.value:Object.defineProperty(i[c],s,r)),++c;o||(l?n[s]=r.value:Object.defineProperty(n,s,r))}return[...i,n]}const ht=e=>`Stale read from <${e}>.`;function dn(e){const t="fallback"in e&&{fallback:()=>e.fallback};return S(ft(()=>e.each,e.children,t||void 0))}function hn(e){const t=e.keyed,n=S(()=>e.when,void 0,{equals:(i,s)=>t?i===s:!i==!s});return S(()=>{const i=n();if(i){const s=e.children;return typeof s=="function"&&s.length>0?x(()=>s(t?i:()=>{if(!x(n))throw ht("Show");return e.when})):s}return e.fallback},void 0,void 0)}const gt=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"],bt=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...gt]),yt=new Set(["innerHTML","textContent","innerText","children"]),wt=Object.assign(Object.create(null),{className:"class",htmlFor:"for"}),mt=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function pt(e,t){const n=mt[e];return typeof n=="object"?n[t]?n.$:void 0:n}const At=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]),St=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]),xt={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};function Pt(e,t,n){let i=n.length,s=t.length,r=i,l=0,o=0,c=t[s-1].nextSibling,u=null;for(;l<s||o<r;){if(t[l]===n[o]){l++,o++;continue}for(;t[s-1]===n[r-1];)s--,r--;if(s===l){const f=r<i?o?n[o-1].nextSibling:n[r-o]:c;for(;o<r;)e.insertBefore(n[o++],f)}else if(r===o)for(;l<s;)(!u||!u.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[r-1]&&n[o]===t[s-1]){const f=t[--s].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--r],f),t[s]=n[r]}else{if(!u){u=new Map;let a=o;for(;a<r;)u.set(n[a],a++)}const f=u.get(t[l]);if(f!=null)if(o<f&&f<r){let a=l,h=1,g;for(;++a<s&&a<r&&!((g=u.get(t[a]))==null||g!==f+h);)h++;if(h>f-o){const m=t[l];for(;o<f;)e.insertBefore(n[o++],m)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const be="_$DX_DELEGATE";function Fe(e,t,n,i={}){let s;return K(r=>{s=r,t===document?e():Be(t,e(),t.firstChild?null:void 0,n)},i.owner),()=>{s(),t.textContent=""}}function Ct(e,t,n){let i;const s=()=>{const l=document.createElement("template");return l.innerHTML=e,n?l.content.firstChild.firstChild:l.content.firstChild},r=t?()=>x(()=>document.importNode(i||(i=s()),!0)):()=>(i||(i=s())).cloneNode(!0);return r.cloneNode=r,r}function Ot(e,t=window.document){const n=t[be]||(t[be]=new Set);for(let i=0,s=e.length;i<s;i++){const r=e[i];n.has(r)||(n.add(r),t.addEventListener(r,Re))}}function se(e,t,n){n==null?e.removeAttribute(t):e.setAttribute(t,n)}function vt(e,t,n,i){i==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,i)}function Et(e,t){t==null?e.removeAttribute("class"):e.className=t}function jt(e,t,n,i){if(i)Array.isArray(n)?(e[`$$${t}`]=n[0],e[`$$${t}Data`]=n[1]):e[`$$${t}`]=n;else if(Array.isArray(n)){const s=n[0];e.addEventListener(t,n[0]=r=>s.call(e,n[1],r))}else e.addEventListener(t,n)}function $t(e,t,n={}){const i=Object.keys(t||{}),s=Object.keys(n);let r,l;for(r=0,l=s.length;r<l;r++){const o=s[r];!o||o==="undefined"||t[o]||(ye(e,o,!1),delete n[o])}for(r=0,l=i.length;r<l;r++){const o=i[r],c=!!t[o];!o||o==="undefined"||n[o]===c||!c||(ye(e,o,!0),n[o]=c)}return n}function Nt(e,t,n){if(!t)return n?se(e,"style"):t;const i=e.style;if(typeof t=="string")return i.cssText=t;typeof n=="string"&&(i.cssText=n=void 0),n||(n={}),t||(t={});let s,r;for(r in n)t[r]==null&&i.removeProperty(r),delete n[r];for(r in t)s=t[r],s!==n[r]&&(i.setProperty(r,s),n[r]=s);return n}function Tt(e,t={},n,i){const s={};return i||k(()=>s.children=I(e,t.children,s.children)),k(()=>t.ref&&t.ref(e)),k(()=>Lt(e,t,n,!0,s,!0)),s}function gn(e,t,n){return x(()=>e(t,n))}function Be(e,t,n,i){if(n!==void 0&&!i&&(i=[]),typeof t!="function")return I(e,t,i,n);k(s=>I(e,t(),s,n),i)}function Lt(e,t,n,i,s={},r=!1){t||(t={});for(const l in s)if(!(l in t)){if(l==="children")continue;s[l]=we(e,l,null,s[l],n,r)}for(const l in t){if(l==="children"){i||I(e,t.children);continue}const o=t[l];s[l]=we(e,l,o,s[l],n,r)}}function kt(e,t,n={}){d.completed=globalThis._$HY.completed,d.events=globalThis._$HY.events,d.load=globalThis._$HY.load,d.gather=s=>pe(t,s),d.registry=new Map,d.context={id:n.renderId||"",count:0},pe(t,n.renderId);const i=Fe(e,t,[...t.childNodes],n);return d.context=null,i}function He(e){let t,n;if(!d.context||!(t=d.registry.get(n=_t()))){if(d.context&&console.warn("Unable to find DOM nodes for hydration key:",n),!e)throw new Error("Unrecoverable Hydration Mismatch. No template for key: "+n);return e()}return d.completed&&d.completed.add(t),d.registry.delete(n),t}function bn(e){let t=e,n=0,i=[];if(d.context)for(;t;){if(t.nodeType===8){const s=t.nodeValue;if(s==="#")n++;else if(s==="/"){if(n===0)return[t,i];n--}}i.push(t),t=t.nextSibling}return[t,i]}function yn(){d.events&&!d.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=d;for(t.queued=!1;t.length;){const[n,i]=t[0];if(!e.has(n))return;Re(i),t.shift()}}),d.events.queued=!0)}function Dt(e){return e.toLowerCase().replace(/-([a-z])/g,(t,n)=>n.toUpperCase())}function ye(e,t,n){const i=t.trim().split(/\s+/);for(let s=0,r=i.length;s<r;s++)e.classList.toggle(i[s],n)}function we(e,t,n,i,s,r){let l,o,c,u,f;if(t==="style")return Nt(e,n,i);if(t==="classList")return $t(e,n,i);if(n===i)return i;if(t==="ref")r||n(e);else if(t.slice(0,3)==="on:"){const a=t.slice(3);i&&e.removeEventListener(a,i),n&&e.addEventListener(a,n)}else if(t.slice(0,10)==="oncapture:"){const a=t.slice(10);i&&e.removeEventListener(a,i,!0),n&&e.addEventListener(a,n,!0)}else if(t.slice(0,2)==="on"){const a=t.slice(2).toLowerCase(),h=At.has(a);if(!h&&i){const g=Array.isArray(i)?i[0]:i;e.removeEventListener(a,g)}(h||n)&&(jt(e,a,n,h),h&&Ot([a]))}else if(t.slice(0,5)==="attr:")se(e,t.slice(5),n);else if((f=t.slice(0,5)==="prop:")||(c=yt.has(t))||!s&&((u=pt(t,e.tagName))||(o=bt.has(t)))||(l=e.nodeName.includes("-")))f&&(t=t.slice(5),o=!0),t==="class"||t==="className"?Et(e,n):l&&!o&&!c?e[Dt(t)]=n:e[u||t]=n;else{const a=s&&t.indexOf(":")>-1&&xt[t.split(":")[0]];a?vt(e,a,t,n):se(e,wt[t]||t,n)}return n}function Re(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),d.registry&&!d.done&&(d.done=_$HY.done=!0);n;){const i=n[t];if(i&&!n.disabled){const s=n[`${t}Data`];if(s!==void 0?i.call(n,s,e):i.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function I(e,t,n,i,s){if(d.context){!n&&(n=[...e.childNodes]);let o=[];for(let c=0;c<n.length;c++){const u=n[c];u.nodeType===8&&u.data.slice(0,2)==="!$"?u.remove():o.push(u)}n=o}for(;typeof n=="function";)n=n();if(t===n)return n;const r=typeof t,l=i!==void 0;if(e=l&&n[0]&&n[0].parentNode||e,r==="string"||r==="number"){if(d.context)return n;if(r==="number"&&(t=t.toString()),l){let o=n[0];o&&o.nodeType===3?o.data=t:o=document.createTextNode(t),n=_(e,n,i,o)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||r==="boolean"){if(d.context)return n;n=_(e,n,i)}else{if(r==="function")return k(()=>{let o=t();for(;typeof o=="function";)o=o();n=I(e,o,n,i)}),()=>n;if(Array.isArray(t)){const o=[],c=n&&Array.isArray(n);if(re(o,t,n,s))return k(()=>n=I(e,o,n,i,!0)),()=>n;if(d.context){if(!o.length)return n;for(let u=0;u<o.length;u++)if(o[u].parentNode)return n=o}if(o.length===0){if(n=_(e,n,i),l)return n}else c?n.length===0?me(e,o,i):Pt(e,n,o):(n&&_(e),me(e,o));n=o}else if(t.nodeType){if(d.context&&t.parentNode)return n=l?[t]:t;if(Array.isArray(n)){if(l)return n=_(e,n,i,t);_(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}else console.warn("Unrecognized value. Skipped inserting",t)}return n}function re(e,t,n,i){let s=!1;for(let r=0,l=t.length;r<l;r++){let o=t[r],c=n&&n[r],u;if(!(o==null||o===!0||o===!1))if((u=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))s=re(e,o,c)||s;else if(u==="function")if(i){for(;typeof o=="function";)o=o();s=re(e,Array.isArray(o)?o:[o],Array.isArray(c)?c:[c])||s}else e.push(o),s=!0;else{const f=String(o);c&&c.nodeType===3&&c.data===f?e.push(c):e.push(document.createTextNode(f))}}return s}function me(e,t,n=null){for(let i=0,s=t.length;i<s;i++)e.insertBefore(t[i],n)}function _(e,t,n,i){if(n===void 0)return e.textContent="";const s=i||document.createTextNode("");if(t.length){let r=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(s!==o){const c=o.parentNode===e;!r&&!l?c?e.replaceChild(s,o):e.insertBefore(s,n):c&&o.remove()}else r=!0}}else e.insertBefore(s,n);return[s]}function pe(e,t){const n=e.querySelectorAll("*[data-hk]");for(let i=0;i<n.length;i++){const s=n[i],r=s.getAttribute("data-hk");(!t||r.startsWith(t))&&!d.registry.has(r)&&d.registry.set(r,s)}}function _t(){const e=d.context;return`${e.id}${e.count++}`}const Mt="http://www.w3.org/2000/svg";function It(e,t=!1){return t?document.createElementNS(Mt,e):document.createElement(e)}const Ft=(...e)=>(ct(),kt(...e));function ae(e){const[t,n]=dt(e,["component"]),i=S(()=>t.component);return S(()=>{const s=i();switch(typeof s){case"function":return Object.assign(s,{[ze]:!0}),x(()=>s(n));case"string":const r=St.has(s),l=d.context?He():It(s,r);return Tt(l,n,r),l}})}function Bt(e,t){const n=globalThis.__vite_plugin_ssr=globalThis.__vite_plugin_ssr||{};return n[e]=n[e]||t}const{Context:Ue}=Bt("PageContextProvider.ts",{Context:Ne()});function Ht(e){if(!e.pageContext)throw new Error("Argument pageContext missing");return E(Ue.Provider,{get value(){return e.pageContext},get children(){return e.children}})}function de(){const e=et(Ue);if(!e)throw new Error("<PageContextProvider> is needed for being able to use usePageContext()");return e}const le=Symbol("store-raw"),R=Symbol("store-node");function Ve(e){let t=e[P];if(!t&&(Object.defineProperty(e,P,{value:t=new Proxy(e,Vt)}),!Array.isArray(e))){const n=Object.keys(e),i=Object.getOwnPropertyDescriptors(e);for(let s=0,r=n.length;s<r;s++){const l=n[s];i[l].get&&Object.defineProperty(e,l,{enumerable:i[l].enumerable,get:i[l].get.bind(t)})}}return t}function T(e){let t;return e!=null&&typeof e=="object"&&(e[P]||!(t=Object.getPrototypeOf(e))||t===Object.prototype||Array.isArray(e))}function F(e,t=new Set){let n,i,s,r;if(n=e!=null&&e[le])return n;if(!T(e)||t.has(e))return e;if(Array.isArray(e)){Object.isFrozen(e)?e=e.slice(0):t.add(e);for(let l=0,o=e.length;l<o;l++)s=e[l],(i=F(s,t))!==s&&(e[l]=i)}else{Object.isFrozen(e)?e=Object.assign({},e):t.add(e);const l=Object.keys(e),o=Object.getOwnPropertyDescriptors(e);for(let c=0,u=l.length;c<u;c++)r=l[c],!o[r].get&&(s=e[r],(i=F(s,t))!==s&&(e[r]=i))}return e}function he(e){let t=e[R];return t||Object.defineProperty(e,R,{value:t=Object.create(null)}),t}function oe(e,t,n){return e[t]||(e[t]=Ke(n))}function Rt(e,t){const n=Reflect.getOwnPropertyDescriptor(e,t);return!n||n.get||!n.configurable||t===P||t===R||(delete n.value,delete n.writable,n.get=()=>e[P][t]),n}function Ge(e){if($e()){const t=he(e);(t._||(t._=Ke()))()}}function Ut(e){return Ge(e),Reflect.ownKeys(e)}function Ke(e){const[t,n]=ce(e,{equals:!1,internal:!0});return t.$=n,t}const Vt={get(e,t,n){if(t===le)return e;if(t===P)return n;if(t===te)return Ge(e),n;const i=he(e),s=i[t];let r=s?s():e[t];if(t===R||t==="__proto__")return r;if(!s){const l=Object.getOwnPropertyDescriptor(e,t);$e()&&(typeof r!="function"||e.hasOwnProperty(t))&&!(l&&l.get)&&(r=oe(i,t,r)())}return T(r)?Ve(r):r},has(e,t){return t===le||t===P||t===te||t===R||t==="__proto__"?!0:(this.get(e,t,e),t in e)},set(){return!0},deleteProperty(){return!0},ownKeys:Ut,getOwnPropertyDescriptor:Rt};function A(e,t,n,i=!1){if(!i&&e[t]===n)return;const s=e[t],r=e.length;n===void 0?delete e[t]:e[t]=n;let l=he(e),o;if((o=oe(l,t,s))&&o.$(()=>n),Array.isArray(e)&&e.length!==r){for(let c=e.length;c<r;c++)(o=l[c])&&o.$();(o=oe(l,"length",r))&&o.$(e.length)}(o=l._)&&o.$()}function qe(e,t){const n=Object.keys(t);for(let i=0;i<n.length;i+=1){const s=n[i];A(e,s,t[s])}}function Gt(e,t){if(typeof t=="function"&&(t=t(e)),t=F(t),Array.isArray(t)){if(e===t)return;let n=0,i=t.length;for(;n<i;n++){const s=t[n];e[n]!==s&&A(e,n,s)}A(e,"length",i)}else qe(e,t)}function H(e,t,n=[]){let i,s=e;if(t.length>1){i=t.shift();const l=typeof i,o=Array.isArray(e);if(Array.isArray(i)){for(let c=0;c<i.length;c++)H(e,[i[c]].concat(t),n);return}else if(o&&l==="function"){for(let c=0;c<e.length;c++)i(e[c],c)&&H(e,[c].concat(t),n);return}else if(o&&l==="object"){const{from:c=0,to:u=e.length-1,by:f=1}=i;for(let a=c;a<=u;a+=f)H(e,[a].concat(t),n);return}else if(t.length>1){H(e[i],t,[i].concat(n));return}s=e[i],n=[i].concat(n)}let r=t[0];typeof r=="function"&&(r=r(s,n),r===s)||i===void 0&&r==null||(r=F(r),i===void 0||T(s)&&T(r)&&!Array.isArray(r)?qe(s,r):A(e,i,r))}function We(...[e,t]){const n=F(e||{}),i=Array.isArray(n),s=Ve(n);function r(...l){je(()=>{i&&l.length===1?Gt(n,l[0]):H(n,l)})}return[s,r]}const fe=Symbol("store-root");function M(e,t,n,i,s){const r=t[n];if(e===r)return;if(n!==fe&&(!T(e)||!T(r)||s&&e[s]!==r[s])){A(t,n,e);return}if(Array.isArray(e)){if(e.length&&r.length&&(!i||s&&e[0]&&e[0][s]!=null)){let c,u,f,a,h,g,m,p;for(f=0,a=Math.min(r.length,e.length);f<a&&(r[f]===e[f]||s&&r[f]&&e[f]&&r[f][s]===e[f][s]);f++)M(e[f],r,f,i,s);const C=new Array(e.length),j=new Map;for(a=r.length-1,h=e.length-1;a>=f&&h>=f&&(r[a]===e[h]||s&&r[f]&&e[f]&&r[a][s]===e[h][s]);a--,h--)C[h]=r[a];if(f>h||f>a){for(u=f;u<=h;u++)A(r,u,e[u]);for(;u<e.length;u++)A(r,u,C[u]),M(e[u],r,u,i,s);r.length>e.length&&A(r,"length",e.length);return}for(m=new Array(h+1),u=h;u>=f;u--)g=e[u],p=s&&g?g[s]:g,c=j.get(p),m[u]=c===void 0?-1:c,j.set(p,u);for(c=f;c<=a;c++)g=r[c],p=s&&g?g[s]:g,u=j.get(p),u!==void 0&&u!==-1&&(C[u]=r[c],u=m[u],j.set(p,u));for(u=f;u<e.length;u++)u in C?(A(r,u,C[u]),M(e[u],r,u,i,s)):A(r,u,e[u])}else for(let c=0,u=e.length;c<u;c++)M(e[c],r,c,i,s);r.length>e.length&&A(r,"length",e.length);return}const l=Object.keys(e);for(let c=0,u=l.length;c<u;c++)M(e[l[c]],r,l[c],i,s);const o=Object.keys(r);for(let c=0,u=o.length;c<u;c++)e[o[c]]===void 0&&A(r,o[c],void 0)}function Kt(e,t={}){const{merge:n,key:i="id"}=t,s=F(e);return r=>{if(!T(r)||!T(s))return s;const l=M(s,{[fe]:r},fe,n,i);return l===void 0?r:l}}function qt(e){if(typeof e.title=="string")return e.title;if(e.title)throw new Error("pageContext.title should be a string");const{title:t}=e.config;if(typeof t=="string")return t;if(!t)return null;const{configDefinedAt:n}=e.configEntries.title[0];if(typeof t=="function"){const i=t(e);if(typeof i=="string")return i;if(i)throw new Error(n+" should return a string")}throw new Error(n+" should be a string or a function returning a string")}function Ae(e){return E(Ht,{pageContext:e,get children(){return E(Wt,{get children(){return E(Yt,{get children(){return E(Xt,{})}})}})}})}function Wt(e){const t=de();return E(ae,{get component(){return t.config.Wrapper??Ye},get children(){return e.children}})}function Yt(e){const t=de();return E(ae,{get component(){return t.config.Layout??Ye},get children(){return e.children}})}function Xt(){const e=de();return E(ae,at({get component(){return e.Page}},()=>e.pageProps??{}))}function Ye(e){return S(()=>e.children)}const[Se,xe]=We({});let G,Pe=!1;async function wn(e){if(Pe)xe(Kt(e));else{G&&G(),xe(e);const n=document.getElementById("page-view");e.isHydration?G=Ft(()=>Ae(Se),n):G=Fe(()=>Ae(Se),n),Pe=!0}const t=qt(e);t!==null&&(document.title=t)}const Jt={label:"Framework",inview:!0,features:[{label:"SolidJS ★",value:"solid",selected:!0},{label:"React",value:"react"},{label:"Vue - Coming Soon",value:"vue",disabled:!0}]},Qt={label:"Auth",features:[{label:"AuthJS ★",value:"authjs",selected:!0},{label:"Auth0 - Coming Soon",value:"auth0",disabled:!0},{label:"Firebase - Coming Soon",value:"firebase",disabled:!0}]},zt={label:"RPC",features:[{label:"Telefunc ★",value:"telefunc",selected:!0},{label:"tRPC - Coming Soon",value:"trpc",disabled:!0}]},Zt={label:"Server",features:[{label:"Hattip ★",value:"hattip",selected:!0},{label:"Express",value:"express"}]},en={label:"CSS",features:[{label:"TailwindCSS",value:"tailwindcss",selected:!0},{label:"UnoCSS - Coming Soon",value:"unocss",disabled:!0},{label:"MUI - Coming Soon",value:"mui",disabled:!0}]},tn={label:"Database",features:[{label:"Prisma",value:"prisma",selected:!0},{label:"EdgeDB",value:"edgedb"}]},nn={disabled:!0,label:"Hosting",features:[{label:"Coming Soon",selected:!0},{label:"Vercel - Coming Soon",value:"vercel",disabled:!0},{label:"Netlify - Coming Soon",value:"netlify",disabled:!0}]},sn={label:"Analytics",features:[{label:"Plausible.io",value:"plausible.io",selected:!0},{label:"Google Analytics - Coming Soon",value:"google-analytics",disabled:!0},{label:"Segment - Coming Soon",value:"segment",disabled:!0}]},rn={disabled:!0,label:"Error tracking",features:[{label:"Coming Soon",selected:!0},{label:"Sentry - Coming Soon",value:"sentry",disabled:!0},{label:"Logrocket - Coming Soon",value:"logrocket",disabled:!0}]},Ce={framework:Jt,auth:Qt,rpc:zt,server:Zt,uikit:en,db:tn,hosting:nn,analytics:sn,error:rn};function Oe(e,t){return Object.keys(e).reduce(function(n,i){return t(e,i)&&(n[i]=e[i]),n},{})}function ln(){const[e,t]=We(Ce),n=S(()=>Oe(e,(f,a)=>!!f[a].inview)),i=S(()=>Oe(e,(f,a)=>!f[a].inview));function s(f){t(f,"inview",a=>!a)}function r(f,a){t(f,"features",h=>h.map(g=>{var m;return{...g,selected:a?a===g.value:(m=Ce[f].features.find(p=>p.value===g.value))==null?void 0:m.selected}}))}const l=S(()=>Object.assign({},...Object.entries(n()).map(([f,a])=>{var h;return{[f]:(h=a.features.find(g=>g.selected))==null?void 0:h.value}}))),[o,c]=ce(0);function u(f){je(()=>{Object.keys(e).forEach(a=>{t(a,"inview",f.includes(a))}),c(1)})}return{inViewFeatures:n,drawerFeatures:i,moveFeature:s,selectFeature:r,featuresValues:l,currentFeatures:e,getBottomPanel:o,setBottomPanel:c,selectPreset:u}}const on=Ne(void 0);function fn(e){const t=ln();return E(on.Provider,{value:t,get children(){return e.children}})}const cn=Ct('<div class="flex flex-col mx-auto">');function mn(e){return E(fn,{get children(){const t=He(cn);return Be(t,()=>e.children),t}})}export{dn as F,mn as L,on as S,Et as a,bn as b,k as c,dt as d,Tt as e,E as f,He as g,Ot as h,Be as i,et as j,$t as k,Ze as l,at as m,ce as n,wn as o,un as p,an as q,yn as r,se as s,Ct as t,gn as u,S as v,hn as w,Ce as x};
