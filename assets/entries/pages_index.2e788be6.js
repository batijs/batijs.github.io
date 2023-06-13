import{g as u,s as S,c as b,a as F,t as f,b as w,u as L,i as o,d as O,e as T,m as z,f as v,F as j,r as A,h as P,S as E,j as M,o as R,k as D,l as V,n as H,_ as U,L as q}from"../chunks/chunk-f1e5ad6b.js";const G="/batijs.github.io/assets/static/logo.059a8ea3.svg",I=f('<img alt="Bâti logo">');function J(l){return(()=>{const t=u(I);return S(t,"src",G),b(s=>{const n=l.size,i=l.size,e=l.class;return n!==s._v$&&S(t,"height",s._v$=n),i!==s._v$2&&S(t,"width",s._v$2=i),e!==s._v$3&&F(t,s._v$3=e),s},{_v$:void 0,_v$2:void 0,_v$3:void 0}),t})()}function K(l,t){const s=t();s&&(l.setAttribute("data-flip-name",s),l.style.viewTransitionName=s)}const Q=f('<div><label class="label"><span class="label-text"></span></label><!#><!/>');function W(l){return(()=>{const t=u(Q),s=t.firstChild,n=s.firstChild,i=s.nextSibling,[e,a]=w(i.nextSibling);return L(K,t,()=>l.flipLabel),o(n,()=>l.label),o(t,()=>l.children,e,a),b(()=>F(t,"form-control max-w-xs "+(l.class??""))),t})()}const X=f("<select>"),Y=f("<option>");function Z(l){const[t,s]=O(l,["options","class"]);return(()=>{const n=u(X);return T(n,z(s,{get class(){return"select max-w-xs "+(t.class??"")}}),!1,!0),o(n,v(j,{get each(){return t.options},children:i=>(()=>{const e=u(Y);return o(e,()=>i.label),b(a=>{const d=i.disabled,c=i.selected;return d!==a._v$&&(e.disabled=a._v$=d),c!==a._v$2&&(e.selected=a._v$2=c),a},{_v$:void 0,_v$2:void 0}),b(()=>e.value=i.value??""),e})()})),A(),n})()}const ee=f('<ul class="flex flex-wrap gap-4 px-4 w-full">'),te=f('<div class="join group"><div class="join-item flex justify-center items-center px-2 border border-solid bg-base-100"><input type="checkbox" class="checkbox rounded bg-base-100"></div><!#><!/>');function le(){const{currentFeatures:l,selectFeature:t,moveFeature:s}=P(E);return(()=>{const n=u(ee);return o(n,v(j,{get each(){return Object.keys(l)},children:i=>{const e=l[i];return v(W,{get label(){return e.label},flipLabel:i,get children(){const a=u(te),d=a.firstChild,c=d.firstChild,y=d.nextSibling,[C,_]=w(y.nextSibling);return c.addEventListener("change",()=>s(i)),o(a,v(Z,{class:"text-xs join-item border-l-0 pl-1",get classList(){return{"select-primary":!e.inview,"select-success":!!e.inview}},get disabled(){return e.disabled},onChange:r=>{t(i,r.target.value||void 0)},get options(){return e.features}}),C,_),b(r=>{const k={"border-success":!!e.inview,"border-base-200 bg-base-200 opacity-70":!!e.disabled,"border-primary":!e.inview&&!e.disabled},$=!!e.inview,p=!e.disabled,x=e.disabled;return r._v$=M(d,k,r._v$),$!==r._v$2&&c.classList.toggle("checkbox-success",r._v$2=$),p!==r._v$3&&c.classList.toggle("border-solid",r._v$3=p),x!==r._v$4&&(c.disabled=r._v$4=x),r},{_v$:void 0,_v$2:void 0,_v$3:void 0,_v$4:void 0}),b(()=>c.checked=e.inview),a}})}})),n})()}function se(l){let t;async function s(){clearTimeout(t);const n=window.getSelection();if(n){const i=n.toString().replaceAll(`
`," ");await navigator.clipboard.writeText(i),l.classList.add("tooltip","tooltip-open"),t=setTimeout(()=>{l.classList.remove("tooltip","tooltip-open")},3e3)}}l.addEventListener("click",s),R(()=>l.removeEventListener("click",s))}const ie=f('<div class="w-full items-center flex justify-center gap-8"><a class="inline-block" href="/"></a><h1 class="font-sans font-bold text-8xl pb-4">Bâti'),ne=f('<div class="container mt-8"><!#><!/><div class="w-full items-center flex justify-center mt-8"><div class="w-4/5 flex flex-col bg-base-300 px-4 py-8 rounded-xl shadow-2xl relative"><div class="px-4 flex"><kbd class="group relative flex-1 justify-start pl-10 tooltip-primary inline-flex tooltip-bottom kbd kbd-lg select-all flex-wrap leading-10 gap-2.5" data-tip="Copied to clipboard!"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right absolute top-2.5 left-2.5 opacity-50"><polyline points="9 18 15 12 9 6"></polyline></svg><!#><!/></kbd></div><div class="divider"></div><div class="flex flex-row flex-wrap flex-1 justify-center gap-4">'),re=f('<span class="relative whitespace-nowrap">');function g(l,t){return{word:l,ns:t}}function ae(l){const{featuresValues:t}=P(E),s=Object.keys(H);function n(){return s.filter(e=>t()[e]).map(e=>g(`--${t()[e]}`,e))}const i=D(()=>[g("pnpm"),g("create"),g("@batijs/app"),...n(),g("my-app")]);return(()=>{const e=u(ne),a=e.firstChild,[d,c]=w(a.nextSibling),y=d.nextSibling,C=y.firstChild,_=C.firstChild,r=_.firstChild,k=r.firstChild,$=k.nextSibling,[p,x]=w($.nextSibling),B=_.nextSibling,N=B.nextSibling;return o(e,v(V,{get when(){return!l.widget},get children(){const m=u(ie),h=m.firstChild;return o(h,v(J,{size:96})),m}}),d,c),L(se,r,()=>!0),o(r,v(j,{get each(){return i()},children:({word:m})=>(()=>{const h=u(re);return o(h,m),h})()}),p,x),o(N,v(le,{})),e})()}const oe=Object.freeze(Object.defineProperty({__proto__:null,default:ae},Symbol.toStringTag,{value:"Module"})),de=[{configName:"onRenderClient",codeFilePath:"vike-solid/renderer/+onRenderClient.js",isPlusFile:!0,codeFileExports:U},{configName:"Page",codeFilePath:"/pages/index/+Page.tsx",isPlusFile:!0,codeFileExports:oe},{configName:"Layout",codeFilePath:"/layouts/LayoutDefault.tsx",isPlusFile:!1,codeFileExportValue:q}];export{de as default};
