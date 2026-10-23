import{$ as Mp,$n as mo,$t as ZP,Ar as wm,B as K$2,Bn as il,Br as z$2,Bt as VE,Cn as de$1,Cr as ve,Ct as SI,D as HE,Dr as wc,Dt as Sp,En as dr,Fn as hD,Ft as Ue$1,H as KP,Hn as jh,Ht as Vh,In as hI,Mr as xe$2,Mt as Tl,N as Ic,Nn as gc,O as HI,On as eF,Or as wh,P as Iu,Pr as yD,Q as Me$2,Qn as mc,Qt as Yl,R as Jt$1,Rr as yp,S as Fh,St as Ry,Tn as dp,Tr as vr$1,U as Kh,Ur as r,V as KI,Vt as Ve$1,Wr as s,Wt as Wn$1,X as MI,Xt as Ye,Yn as lp,Z as Ma,Zn as mD,Zt as Yh,_ as Dp,_n as br,_r as th,an as Zv,at as OE,bn as co,br as ui$1,bt as Ro,cn as _e$1,ct as Op,d as C$2,dn as al,dr as rI,er as mp,et as N$2,f as Ce$1,fr as re,ft as Po,g as Dc,gn as bp,gr as tF,gt as Qc,h as DI,hn as bi$1,ht as QP,i as AE,ir as nh,it as O,j as Hp,jn as fr,k as Hg,kn as fD,kt as TI,ln as _p,lt as PE,m as DD,nn as Zh,on as _,pn as bI,pr as rm,q as Lh,qt as XP,rn as Zl,rt as Np,s as Bg,sn as _I,st as Oo,tn as Zc,tt as NI,ur as rF,ut as Ph,v as Ec,vn as cD,vt as Qt$1,wr as vp,wt as Se$1,xn as cu,y as Ep,yt as Rn$1,z as Jy,zn as iI,zr as yr$1}from"./chunk-D0X60q4r.js";import{h as p$2,l as b,m as l$2,o as T$4,p as g,r as L$2,v as y}from"./chunk-ZBANLYTH.js";import{C as h$1,D as le$1,F as xe$3,O as m$1,S as ge,c as He$1,m as Ve$2,p as Ue$2,r as C$3,x as ce$1}from"./chunk-CqFqzptk.js";import{B as qi$1,C as cv,E as fc,F as pn$1,I as pu,K as uy,M as ly,N as no,O as it$2,P as pa,R as qc,S as bv,T as ef,W as to,_ as Tv,a as Bm,f as Kc,g as Sa,i as Bi$1,j as lt$1,o as Ce$2,p as Ky,q as vd,r as Bd,s as Ea,t as $e,v as Xp,w as du}from"./chunk-B4vds-bF.js";import{a as H$1,b as wt,d as _i$1,h as me$1,i as F$2,l as Vt,m as le$2,n as Ct,p as j$1,r as Et,s as Pt,t as At,v as tt,x as xt$1,y as we$2}from"./chunk-Bdd8nQzP.js";import{t as h$2}from"./chunk-DKaAcARB.js";import{a as dr$1,o as le$3,r as Oo$1}from"./chunk-DTU6ATlO.js";import{t as n}from"./chunk-DIAJ47vC.js";import{t as a$1}from"./chunk-o6CS1sco.js";import"./chunk-COKJD5YO.js";import{a as x,i as q$2,n as N$3,r as O$1,t as H$2}from"./chunk-CCYPaE4z.js";import"./chunk-BW9pCRs0.js";import{t as c}from"./chunk-DZxzhlZl.js";import{n as g$1,r as u,t as f$2}from"./chunk-baECvtpI.js";import{t as E$1}from"./chunk-jhiT596Z.js";var l$1=class n{platformId=_(Hg);deferredPrompt=Oo(null);installed=Oo(!1);iosDevice=Oo(!1);standalone=Oo(!1);canInstall=DD(()=>this.deferredPrompt()!==null&&!this.installed());showIosHint=DD(()=>this.iosDevice()&&!this.standalone()&&!this.installed());constructor(){fc(this.platformId)&&(this.standalone.set(this.detectStandalone()),this.iosDevice.set(this.detectIos()),window.addEventListener(`beforeinstallprompt`,e=>{e.preventDefault(),this.deferredPrompt.set(e)}),window.addEventListener(`appinstalled`,()=>{this.deferredPrompt.set(null),this.installed.set(!0),this.standalone.set(!0)}))}async promptInstall(){let e=this.deferredPrompt();if(!e)return`unavailable`;this.deferredPrompt.set(null),await e.prompt();let{outcome:t}=await e.userChoice;return t===`accepted`&&this.installed.set(!0),t}detectStandalone(){let e=window.navigator;return window.matchMedia(`(display-mode: standalone)`).matches||e.standalone===!0}detectIos(){let e=window.navigator.userAgent;return/iPad|iPhone|iPod/.test(e)||navigator.platform===`MacIntel`&&navigator.maxTouchPoints>1}static ɵfac=function(t){return new(t||n)};static ɵprov=de$1({token:n,factory:n.ɵfac,providedIn:`root`})};var Xt=(()=>{class n{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,i){this._renderer=e,this._elementRef=i}setProperty(e,i){this._renderer.setProperty(this._elementRef.nativeElement,e,i)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty(`disabled`,e)}static ɵfac=function(i){return new(i||n)(br(Ma),br(vr$1))};static ɵdir=PE({type:n})}return n})();var ot$1=(()=>{class n extends Xt{static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,features:[lp]})}return n})();var Re$1=new O(``);var $n={provide:Re$1,useExisting:co(()=>Wn),multi:!0};var Wn=(()=>{class n extends ot$1{writeValue(e){this.setProperty(`checked`,e)}static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,selectors:[[`input`,`type`,`checkbox`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`checkbox`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`checkbox`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(i,r){i&1&&bp(`change`,function(s){return r.onChange(s.target.checked)})(`blur`,function(){return r.onTouched()})},standalone:!1,features:[cD([$n]),lp]})}return n})();var Kn={provide:Re$1,useExisting:co(()=>Qt),multi:!0};function Yn(){let n=it$2()?it$2().getUserAgent():``;return/android (\d+)/.test(n.toLowerCase())}var Xn=new O(``);var Qt=(()=>{class n extends Xt{_compositionMode;_composing=!1;constructor(e,i,r){super(e,i),this._compositionMode=r,this._compositionMode??=!Yn()}writeValue(e){let i=e??``;this.setProperty(`value`,i)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static ɵfac=function(i){return new(i||n)(br(Ma),br(vr$1),br(Xn,8))};static ɵdir=PE({type:n,selectors:[[`input`,`formControlName`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`formControl`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControl`,``,3,`ngNoCva`,``],[`input`,`ngModel`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`ngModel`,``,3,`ngNoCva`,``],[``,`ngDefaultControl`,``]],hostBindings:function(i,r){i&1&&bp(`input`,function(s){return r._handleInput(s.target.value)})(`blur`,function(){return r.onTouched()})(`compositionstart`,function(){return r._compositionStart()})(`compositionend`,function(s){return r._compositionEnd(s.target.value)})},standalone:!1,features:[cD([Kn]),lp]})}return n})();function at$1(n){return n==null||lt(n)===0}function lt(n){return n==null?null:Array.isArray(n)||typeof n==`string`?n.length:n instanceof Set?n.size:null}var q$1=new O(``);var st=new O(``);var Qn=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;var nt=class{static min(t){return Zt(t)}static max(t){return Jt(t)}static required(t){return en(t)}static requiredTrue(t){return Zn(t)}static email(t){return Jn(t)}static minLength(t){return ei(t)}static maxLength(t){return tn(t)}static pattern(t){return ti(t)}static nullValidator(t){return xe$1()}static compose(t){return sn(t)}static composeAsync(t){return dn(t)}};function Zt(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e<n?{min:{min:n,actual:t.value}}:null}}function Jt(n){return t=>{if(t.value==null||n==null)return null;let e=parseFloat(t.value);return!isNaN(e)&&e>n?{max:{max:n,actual:t.value}}:null}}function en(n){return at$1(n.value)?{required:!0}:null}function Zn(n){return n.value===!0?null:{required:!0}}function Jn(n){return at$1(n.value)||Qn.test(n.value)?null:{email:!0}}function ei(n){return t=>{let e=t.value?.length??lt(t.value);return e===null||e===0?null:e<n?{minlength:{requiredLength:n,actualLength:e}}:null}}function tn(n){return t=>{let e=t.value?.length??lt(t.value);return e!==null&&e>n?{maxlength:{requiredLength:n,actualLength:e}}:null}}function ti(n){if(!n)return xe$1;let t,e;return typeof n==`string`?(e=``,n.charAt(0)!==`^`&&(e+=`^`),e+=n,n.charAt(n.length-1)!==`$`&&(e+=`$`),t=new RegExp(e)):(e=n.toString(),t=n),i=>{if(at$1(i.value))return null;let r=i.value;return t.test(r)?null:{pattern:{requiredPattern:e,actualValue:r}}}}function xe$1(n){return null}function nn(n){return n!=null}function rn(n){return gc(n)?Ce$1(n):n}function on(n){let t={};return n.forEach(e=>{t=e!=null?r(r({},t),e):t}),Object.keys(t).length===0?null:t}function an(n,t){return t.map(e=>e(n))}function ni(n){return!n.validate}function ln(n){return n.map(t=>ni(t)?t:e=>t.validate(e))}function sn(n){if(!n)return null;let t=n.filter(nn);return t.length==0?null:function(e){return on(an(e,t))}}function dt(n){return n!=null?sn(ln(n)):null}function dn(n){if(!n)return null;let t=n.filter(nn);return t.length==0?null:function(e){let i=an(e,t).map(rn);return Ph(i).pipe(_e$1(on))}}function ct(n){return n!=null?dn(ln(n)):null}function Gt(n,t){return n===null?[t]:Array.isArray(n)?[...n,t]:[n,t]}function cn(n){return n._rawValidators}function un(n){return n._rawAsyncValidators}function it$1(n){return n?Array.isArray(n)?n:[n]:[]}function Ce(n,t){return Array.isArray(n)?n.includes(t):n===t}function Ht(n,t){let e=it$1(t);return it$1(n).forEach(r=>{Ce(e,r)||e.push(r)}),e}function Ut(n,t){return it$1(t).filter(e=>!Ce(n,e))}var Se=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=dt(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=ct(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t=void 0){this.control?.reset(t)}hasError(t,e){return this.control?this.control.hasError(t,e):!1}getError(t,e){return this.control?this.control.getError(t,e):null}};var j=class extends Se{name;get formDirective(){return null}get path(){return null}};var le=`VALID`;var _e=`INVALID`;var X=`PENDING`;var se=`DISABLED`;var z$1=class{};var Ne$1=class extends z$1{value;source;constructor(t,e){super(),this.value=t,this.source=e}};var ce=class extends z$1{pristine;source;constructor(t,e){super(),this.pristine=t,this.source=e}};var ue$1=class extends z$1{touched;source;constructor(t,e){super(),this.touched=t,this.source=e}};var Q=class extends z$1{status;source;constructor(t,e){super(),this.status=t,this.source=e}};var Me$1=class extends z$1{source;constructor(t){super(),this.source=t}};var Z$1=class extends z$1{source;constructor(t){super(),this.source=t}};function fn(n){return(Oe(n)?n.validators:n)||null}function ii(n){return Array.isArray(n)?dt(n):n||null}function mn(n,t){return(Oe(t)?t.asyncValidators:n)||null}function ri(n){return Array.isArray(n)?ct(n):n||null}function Oe(n){return n!=null&&!Array.isArray(n)&&typeof n==`object`}function oi(n,t,e){let i=n.controls;if(!(t?Object.keys(i):i).length)throw new N$2(1e3,``);if(!hn(i,e))throw new N$2(1001,``)}function ai(n,t,e){n._forEachChild((i,r)=>{if(e[r]===void 0)throw new N$2(-1002,``)})}var we$1=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=Oo(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(t,e){this._assignValidators(t),this._assignAsyncValidators(e)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get status(){return th(this.statusReactive)}set status(t){th(()=>this.statusReactive.set(t))}_status=DD(()=>this.statusReactive());statusReactive=Oo(void 0);get valid(){return this.status===le}get invalid(){return this.status===_e}get pending(){return this.status===X}get disabled(){return this.status===se}get enabled(){return this.status!==se}errors;get pristine(){return th(this.pristineReactive)}set pristine(t){th(()=>this.pristineReactive.set(t))}_pristine=DD(()=>this.pristineReactive());pristineReactive=Oo(!0);get dirty(){return!this.pristine}get touched(){return th(this.touchedReactive)}set touched(t){th(()=>this.touchedReactive.set(t))}_touched=DD(()=>this.touchedReactive());touchedReactive=Oo(!1);get untouched(){return!this.touched}_events=new K$2;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:`change`}setValidators(t){this._assignValidators(t)}setAsyncValidators(t){this._assignAsyncValidators(t)}addValidators(t){this.setValidators(Ht(t,this._rawValidators))}addAsyncValidators(t){this.setAsyncValidators(Ht(t,this._rawAsyncValidators))}removeValidators(t){this.setValidators(Ut(t,this._rawValidators))}removeAsyncValidators(t){this.setAsyncValidators(Ut(t,this._rawAsyncValidators))}hasValidator(t){return Ce(this._rawValidators,t)}hasAsyncValidator(t){return Ce(this._rawAsyncValidators,t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){let e=this.touched===!1;this.touched=!0;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsTouched(s(r({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new ue$1(!0,i))}markAllAsDirty(t={}){this.markAsDirty({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsDirty(t))}markAllAsTouched(t={}){this.markAsTouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:this}),this._forEachChild(e=>e.markAllAsTouched(t))}markAsUntouched(t={}){let e=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsUntouched({onlySelf:!0,emitEvent:t.emitEvent,sourceControl:i})}),t.onlySelf||this._parent?._updateTouched(t,i),e&&t.emitEvent!==!1&&this._events.next(new ue$1(!1,i))}markAsDirty(t={}){let e=this.pristine===!0;this.pristine=!1;let i=t.sourceControl??this;t.onlySelf||this._parent?.markAsDirty(s(r({},t),{sourceControl:i})),e&&t.emitEvent!==!1&&this._events.next(new ce(!1,i))}markAsPristine(t={}){let e=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let i=t.sourceControl??this;this._forEachChild(r=>{r.markAsPristine({onlySelf:!0,emitEvent:t.emitEvent})}),t.onlySelf||this._parent?._updatePristine(t,i),e&&t.emitEvent!==!1&&this._events.next(new ce(!0,i))}markAsPending(t={}){this.status=X;let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new Q(this.status,e)),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.markAsPending(s(r({},t),{sourceControl:e}))}disable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=se,this.errors=null,this._forEachChild(r$7=>{r$7.disable(s(r({},t),{onlySelf:!0}))}),this._updateValue();let i=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new Ne$1(this.value,i)),this._events.next(new Q(this.status,i)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(s(r({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(r=>r(!0))}enable(t={}){let e=this._parentMarkedDirty(t.onlySelf);this.status=le,this._forEachChild(i=>{i.enable(s(r({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(s(r({},t),{skipPristineCheck:e}),this),this._onDisabledChange.forEach(i=>i(!1))}_updateAncestors(t,e){t.onlySelf||(this._parent?.updateValueAndValidity(t),t.skipPristineCheck||this._parent?._updatePristine({},e),this._parent?._updateTouched({},e))}setParent(t){this._parent=t}getRawValue(){return this.value}updateValueAndValidity(t={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let i=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===le||this.status===X)&&this._runAsyncValidator(i,t.emitEvent)}let e=t.sourceControl??this;t.emitEvent!==!1&&(this._events.next(new Ne$1(this.value,e)),this._events.next(new Q(this.status,e)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),t.onlySelf||this._parent?.updateValueAndValidity(s(r({},t),{sourceControl:e}))}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?se:le}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t,e){if(this.asyncValidator){this.status=X,this._hasOwnPendingAsyncValidator={emitEvent:e!==!1,shouldHaveEmitted:t!==!1};let i=rn(this.asyncValidator(this));this._asyncValidationSubscription=i.subscribe(r=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(r,{emitEvent:e,shouldHaveEmitted:t})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let t=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,t}return!1}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(e.emitEvent!==!1,this,e.shouldHaveEmitted)}get(t){let e=t;return e==null||(Array.isArray(e)||(e=e.split(`.`)),e.length===0)?null:e.reduce((i,r)=>i&&i._find(r),this)}getError(t,e){let i=e?this.get(e):this;return i?.errors?i.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t,e,i){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),(t||i)&&this._events.next(new Q(this.status,e)),this._parent&&this._parent._updateControlsErrors(t,e,i)}_initObservables(){this.valueChanges=new Ve$1,this.statusChanges=new Ve$1}_calculateStatus(){return this._allControlsDisabled()?se:this.errors?_e:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(X)?X:this._anyControlsHaveStatus(_e)?_e:le}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t,e){let i=!this._anyControlsDirty(),r=this.pristine!==i;this.pristine=i,t.onlySelf||this._parent?._updatePristine(t,e),r&&this._events.next(new ce(this.pristine,e))}_updateTouched(t={},e){this.touched=this._anyControlsTouched(),this._events.next(new ue$1(this.touched,e)),t.onlySelf||this._parent?._updateTouched(t,e)}_onDisabledChange=[];_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){Oe(t)&&t.updateOn!=null&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(t){return null}_assignValidators(t){this._rawValidators=Array.isArray(t)?t.slice():t,this._composedValidatorFn=ii(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(t){this._rawAsyncValidators=Array.isArray(t)?t.slice():t,this._composedAsyncValidatorFn=ri(this._rawAsyncValidators)}_updateHasRequiredValidator(){th(()=>this._hasRequired.set(this.hasValidator(nt.required)))}};function hn(n,t){return Object.hasOwn(n,t)}function li(n){return n.tagName===`INPUT`||n.tagName===`SELECT`||n.tagName===`TEXTAREA`}function si(n,t,e,i){switch(e){case`name`:n.setAttribute(t,e,i);break;case`disabled`:case`readonly`:case`required`:i?n.setAttribute(t,e,``):n.removeAttribute(t,e);break;case`max`:case`min`:case`minLength`:case`maxLength`:i!==void 0?n.setAttribute(t,e,i.toString()):n.removeAttribute(t,e)}}var rt$1=class{kind;context;control;message;constructor({kind:t,context:e,control:i}){this.kind=t,this.context=e,this.control=i}};function di(n){return typeof n==`number`?n:parseInt(n,10)}function pn(n){return typeof n==`number`?n:parseFloat(n)}var Te$1=(()=>{class n{_validator=xe$1;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let i=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(i),this._validator=this._enabled?this.createValidator(i):xe$1,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n,features:[rm]})}return n})();var ci={provide:q$1,useExisting:co(()=>ui),multi:!0};var ui=(()=>{class n extends Te$1{max;inputName=`max`;normalizeInput=e=>pn(e);createValidator=e=>Jt(e);static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,selectors:[[`input`,`type`,`number`,`max`,``,`formControlName`,``],[`input`,`type`,`number`,`max`,``,`formControl`,``],[`input`,`type`,`number`,`max`,``,`ngModel`,``]],hostVars:1,hostBindings:function(i,r){i&2&&mp(`max`,r._enabled?r.max:null)},inputs:{max:`max`},standalone:!1,features:[cD([ci]),lp]})}return n})();var fi={provide:q$1,useExisting:co(()=>mi),multi:!0};var mi=(()=>{class n extends Te$1{min;inputName=`min`;normalizeInput=e=>pn(e);createValidator=e=>Zt(e);static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,selectors:[[`input`,`type`,`number`,`min`,``,`formControlName`,``],[`input`,`type`,`number`,`min`,``,`formControl`,``],[`input`,`type`,`number`,`min`,``,`ngModel`,``]],hostVars:1,hostBindings:function(i,r){i&2&&mp(`min`,r._enabled?r.min:null)},inputs:{min:`min`},standalone:!1,features:[cD([fi]),lp]})}return n})();var hi={provide:q$1,useExisting:co(()=>gn),multi:!0};var gn=(()=>{class n extends Te$1{required;inputName=`required`;normalizeInput=XP;createValidator=e=>en;enabled(e){return e}static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,selectors:[[``,`required`,``,`formControlName`,``,3,`type`,`checkbox`],[``,`required`,``,`formControl`,``,3,`type`,`checkbox`],[``,`required`,``,`ngModel`,``,3,`type`,`checkbox`]],hostVars:1,hostBindings:function(i,r){i&2&&mp(`required`,r._enabled?``:null)},inputs:{required:`required`},standalone:!1,features:[cD([hi]),lp]})}return n})();var pi={provide:q$1,useExisting:co(()=>gi),multi:!0};var gi=(()=>{class n extends Te$1{maxlength;inputName=`maxlength`;normalizeInput=e=>di(e);createValidator=e=>tn(e);static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,selectors:[[``,`maxlength`,``,`formControlName`,``],[``,`maxlength`,``,`formControl`,``],[``,`maxlength`,``,`ngModel`,``]],hostVars:1,hostBindings:function(i,r){i&2&&mp(`maxlength`,r._enabled?r.maxlength:null)},inputs:{maxlength:`maxlength`},standalone:!1,features:[cD([pi]),lp]})}return n})();var vi=new O(``);var ke$1=new O(``,{factory:()=>ut$2});var ut$2=`always`;function yi(n,t){return[...t.path,n]}function qt(n,t,e=ut$2){ft$1(n,t),t.valueAccessor.writeValue(n.value),(n.disabled||e===`always`)&&t.valueAccessor.setDisabledState?.(n.disabled),_i(n,t),Ci(n,t),xi(n,t),bi(n,t)}function $t(n,t,e=!0){let i=()=>{};t?.valueAccessor?.registerOnChange(i),t?.valueAccessor?.registerOnTouched(i),Ee$1(n,t),n&&(t._invokeOnDestroyCallbacks(),n._registerOnCollectionChange(()=>{}))}function De$1(n,t){n.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function bi(n,t){if(t.valueAccessor.setDisabledState){let e=i=>{t.valueAccessor.setDisabledState(i)};n.registerOnDisabledChange(e),t._registerOnDestroy(()=>{n._unregisterOnDisabledChange(e)})}}function ft$1(n,t){let e=cn(n);t.validator!==null?n.setValidators(Gt(e,t.validator)):typeof e==`function`&&n.setValidators([e]);let i=un(n);t.asyncValidator!==null?n.setAsyncValidators(Gt(i,t.asyncValidator)):typeof i==`function`&&n.setAsyncValidators([i]);let r=()=>n.updateValueAndValidity();De$1(t._rawValidators,r),De$1(t._rawAsyncValidators,r)}function Ee$1(n,t){let e=!1;if(n!==null){if(t.validator!==null){let r=cn(n);if(Array.isArray(r)&&r.length>0){let a=r.filter(s=>s!==t.validator);a.length!==r.length&&(e=!0,n.setValidators(a))}}if(t.asyncValidator!==null){let r=un(n);if(Array.isArray(r)&&r.length>0){let a=r.filter(s=>s!==t.asyncValidator);a.length!==r.length&&(e=!0,n.setAsyncValidators(a))}}}let i=()=>{};return De$1(t._rawValidators,i),De$1(t._rawAsyncValidators,i),e}function _i(n,t){t.valueAccessor.registerOnChange(e=>{n._pendingValue=e,n._pendingChange=!0,n._pendingDirty=!0,n.updateOn===`change`&&vn(n,t)})}function xi(n,t){t.valueAccessor.registerOnTouched(()=>{n._pendingTouched=!0,n.updateOn===`blur`&&n._pendingChange&&vn(n,t),n.updateOn!==`submit`&&n.markAsTouched()})}function vn(n,t){n._pendingDirty&&n.markAsDirty(),n.setValue(n._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(n._pendingValue),n._pendingChange=!1}function Ci(n,t){let e=(i,r)=>{t.valueAccessor.writeValue(i),r&&t.viewToModelUpdate(i)};n.registerOnChange(e),t._registerOnDestroy(()=>{n._unregisterOnChange(e)})}function yn(n,t){ft$1(n,t)}function Si(n,t){return Ee$1(n,t)}function Ni(n,t){if(!Object.hasOwn(n,`model`))return!1;let e=n.model;return e.isFirstChange()?!0:!Object.is(t,e.currentValue)}function Mi(n){return Object.getPrototypeOf(n.constructor)===ot$1}function bn(n,t){n._syncPendingControls(),t.forEach(e=>{let i=e.control;i.updateOn===`submit`&&i._pendingChange&&(e.viewToModelUpdate(i._pendingValue),i._pendingChange=!1)})}function wi(n,t){if(!t)return null;let e,i,r;return t.forEach(a=>{a.constructor===Qt?e=a:Mi(a)?i=a:r=a}),r||i||e||null}function Di(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}var Ei={provide:vi,useFactory:()=>{let n=_(J,{self:!0});return{setParseErrors:t=>{n.setParseErrorSource(t)},set onReset(t){n.onReset=t}}}};var J=class extends Se{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(t){this.userOnReset=t,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof Z$1&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=wi(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(t,e,i){super(),this.injector=t,this.renderer=e,this.rawValueAccessors=i,this.injector?.get(ve)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let t=this.injector?.get(KP);if(!this.control||!t)return;let e=t.markForCheck.bind(t);this.subscription=new z$2,this.subscription.add(this.control.valueChanges.subscribe(e)),this.subscription.add(this.control.statusChanges.subscribe(e)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(i=>{i instanceof Z$1&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(t){!t.nativeElement.hasAttribute?.(`ngNoCva`)&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!t.customControl||(this.isCustomControlBased=!0,t.listenToCustomControlModel(r=>{this.control?.markAsDirty(),this.control?.setValue(r,{emitModelToViewChange:!1}),this.viewToModelUpdate(r)}),t.listenToCustomControlOutput(`touch`,()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=li(t.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(r=>r instanceof gn))}ngControlUpdate(t,e){if(!this.isCustomControlBased)return;let i=this.control,r=this.customControlBindings;Object.is(r.value,i.value)||(r.value=i.value,t.setCustomControlModelInput(i.value)),this.bindControlProperty(t,r,`touched`,i.touched),this.bindControlProperty(t,r,`dirty`,i.dirty),this.bindControlProperty(t,r,`valid`,i.valid),this.bindControlProperty(t,r,`invalid`,i.invalid),this.bindControlProperty(t,r,`pending`,i.pending),this.bindControlProperty(t,r,`disabled`,i.disabled),this.shouldBindRequired&&this.bindControlProperty(t,r,`required`,this.isRequired);let a=i.errors;if(r.errors!==a){r.errors=a;let s=this._convertErrors(a);t.setInputOnDirectives(`errors`,s)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(t,e,i,r){if(e[i]===r)return;e[i]=r;let a=t.setInputOnDirectives(i,r);this.isNativeFormElement&&!a&&(i===`disabled`||i===`required`)&&this.renderer&&si(this.renderer,t.nativeElement,i,r)}_convertErrors(t){if(t===null)return[];let e=this.control;return Object.entries(t).map(([i,r])=>new rt$1({context:r,kind:i,control:e}))}setParseErrorSource(t){if(t===void 0)return;let e=null,i=DD(()=>{let r=t();return r.length===0?null:r.reduce((a,s)=>(a[s.kind]=s,a),{})});this.parseErrorsValidator=(()=>e).bind(this),Iu(()=>{e=i(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(t){this.parseErrorsValidator&&(t?.removeValidators(this.parseErrorsValidator),t?.updateValueAndValidity({emitEvent:!1}))}};var Fe$1=class{_cd;constructor(t){this._cd=t}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}};var hr=(()=>{class n extends Fe$1{constructor(e){super(e)}static ɵfac=function(i){return new(i||n)(br(J,2))};static ɵdir=PE({type:n,selectors:[[``,`formControlName`,``],[``,`ngModel`,``],[``,`formControl`,``]],hostVars:14,hostBindings:function(i,r){i&2&&Op(`ng-untouched`,r.isUntouched)(`ng-touched`,r.isTouched)(`ng-pristine`,r.isPristine)(`ng-dirty`,r.isDirty)(`ng-valid`,r.isValid)(`ng-invalid`,r.isInvalid)(`ng-pending`,r.isPending)},standalone:!1,features:[lp]})}return n})();var pr=(()=>{class n extends Fe$1{constructor(e){super(e)}static ɵfac=function(i){return new(i||n)(br(j,10))};static ɵdir=PE({type:n,selectors:[[``,`formGroupName`,``],[``,`formArrayName`,``],[``,`ngModelGroup`,``],[``,`formGroup`,``],[``,`formArray`,``],[`form`,3,`ngNoForm`,``],[``,`ngForm`,``]],hostVars:16,hostBindings:function(i,r){i&2&&Op(`ng-untouched`,r.isUntouched)(`ng-touched`,r.isTouched)(`ng-pristine`,r.isPristine)(`ng-dirty`,r.isDirty)(`ng-valid`,r.isValid)(`ng-invalid`,r.isInvalid)(`ng-pending`,r.isPending)(`ng-submitted`,r.isSubmitted)},standalone:!1,features:[lp]})}return n})();var Ae$1=class extends we$1{constructor(t,e,i){super(fn(e),mn(i,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(t,e){return this._find(t)||(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e,i={}){this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}removeControl(t,e={}){let i=this._find(t);i&&i._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity({emitEvent:e.emitEvent}),this._onCollectionChange()}setControl(t,e,i={}){let r=this._find(t);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity({emitEvent:i.emitEvent}),this._onCollectionChange()}contains(t){return this._find(t)?.enabled===!0}setValue(t,e={}){th(()=>{ai(this,!0,t),Object.keys(t).forEach(i=>{oi(this,!0,i),this.controls[i].setValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)})}patchValue(t,e={}){t!=null&&(Object.keys(t).forEach(i=>{let r=this._find(i);r&&r.patchValue(t[i],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e))}reset(t={},e={}){this._forEachChild((i,r$8)=>{i.reset(t?t[r$8]:null,s(r({},e),{onlySelf:!0}))}),this._updatePristine(e,this),this._updateTouched(e,this),this.updateValueAndValidity(e),e?.emitEvent!==!1&&this._events.next(new Z$1(this))}getRawValue(){return this._reduceChildren({},(t,e,i)=>(t[i]=e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(e,i)=>i._syncPendingControls()?!0:e);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_forEachChild(t){Object.keys(this.controls).forEach(e=>{let i=this.controls[e];i&&t(i,e)})}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(let[e,i]of Object.entries(this.controls))if(this.contains(e)&&t(i))return!0;return!1}_reduceValue(){return this._reduceChildren({},(e,i,r)=>((i.enabled||this.disabled)&&(e[r]=i.value),e))}_reduceChildren(t,e){let i=t;return this._forEachChild((r,a)=>{i=e(i,r,a)}),i}_allControlsDisabled(){for(let t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(t){return hn(this.controls,t)?this.controls[t]:null}};var Fi={provide:j,useExisting:co(()=>Ai)};var de=Promise.resolve();var Ai=(()=>{class n extends j{callSetDisabledState;get submitted(){return th(this.submittedReactive)}_submitted=DD(()=>this.submittedReactive());submittedReactive=Oo(!1);_directives=new Set;form;ngSubmit=new Ve$1;options;constructor(e,i,r){super(),this.callSetDisabledState=r,this.form=new Ae$1({},dt(e),ct(i))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){de.then(()=>{e.control=this._findContainer(e.path).registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){de.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){de.then(()=>{let i=this._findContainer(e.path),r=new Ae$1({});yn(r,e),i.registerControl(e.name,r),r.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){de.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,i){de.then(()=>{this.form.get(e.path).setValue(i)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),bn(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Me$1(this.control)),e?.target?.method===`dialog`}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static ɵfac=function(i){return new(i||n)(br(q$1,10),br(st,10),br(ke$1,8))};static ɵdir=PE({type:n,selectors:[[`form`,3,`ngNoForm`,``,3,`formGroup`,``,3,`formArray`,``],[`ng-form`],[``,`ngForm`,``]],hostBindings:function(i,r){i&1&&bp(`submit`,function(s){return r.onSubmit(s)})(`reset`,function(){return r.onReset()})},inputs:{options:[0,`ngFormOptions`,`options`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[cD([Fi]),lp]})}return n})();function Wt(n,t){let e=n.indexOf(t);e>-1&&n.splice(e,1)}function Kt(n){return typeof n==`object`&&n!==null&&Object.keys(n).length===2&&`value`in n&&`disabled`in n}var _n=class extends we$1{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(t=null,e,i){super(fn(e),mn(i,e)),this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Oe(e)&&(e.nonNullable||e.initialValueIsDefault)&&(Kt(t)?this.defaultValue=t.value:this.defaultValue=t)}setValue(t,e={}){th(()=>{this.value=this._pendingValue=t,this._onChange.length&&e.emitModelToViewChange!==!1&&this._onChange.forEach(i=>i(this.value,e.emitViewToModelChange!==!1)),this.updateValueAndValidity(e)})}patchValue(t,e={}){this.setValue(t,e)}reset(t=this.defaultValue,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),e.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,e?.emitEvent!==!1&&this._events.next(new Z$1(this))}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){Wt(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){Wt(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return this.updateOn===`submit`&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(t){Kt(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}};var Vi=n=>n instanceof _n;var Ii=(()=>{class n extends j{callSetDisabledState;get submitted(){return th(this._submittedReactive)}set submitted(e){this._submittedReactive.set(e)}_submitted=DD(()=>this._submittedReactive());_submittedReactive=Oo(!1);_oldForm;_onCollectionChange=()=>this._updateDomValue();directives=[];constructor(e,i,r){super(),this.callSetDisabledState=r,this._setValidators(e),this._setAsyncValidators(i)}ngOnChanges(e){this.onChanges(e)}ngOnDestroy(){this.onDestroy()}onChanges(e){if(!this.form)throw new N$2(1052,!1);Object.hasOwn(e,`form`)&&(this._updateValidators(),this._updateDomValue(),this._updateRegistrations(),this._oldForm=this.form)}onDestroy(){this.form&&(Ee$1(this.form,this),this.form._onCollectionChange===this._onCollectionChange&&this.form._registerOnCollectionChange(()=>{}))}get formDirective(){return this}get path(){return[]}addControl(e){let i=this.form.get(e.path);return e._setupWithForm(i,this.callSetDisabledState),i.updateValueAndValidity({emitEvent:!1}),this.directives.push(e),i}getControl(e){return this.form.get(e.path)}removeControl(e){$t(e.control||null,e,!1),Di(this.directives,e)}addFormGroup(e){this._setUpFormContainer(e)}removeFormGroup(e){this._cleanUpFormContainer(e)}getFormGroup(e){return this.form.get(e.path)}getFormArray(e){return this.form.get(e.path)}addFormArray(e){this._setUpFormContainer(e)}removeFormArray(e){this._cleanUpFormContainer(e)}updateModel(e,i){this.form.get(e.path).setValue(i)}onReset(){this.resetForm()}resetForm(e=void 0,i={}){this.form.reset(e,i),this._submittedReactive.set(!1)}onSubmit(e){return this.submitted=!0,bn(this.form,this.directives),this.ngSubmit.emit(e),this.form._events.next(new Me$1(this.control)),e?.target?.method===`dialog`}_updateDomValue(){this.directives.forEach(e=>{let i=e.control,r=this.form.get(e.path);i!==r&&($t(i||null,e),Vi(r)&&e._setupWithForm(r,this.callSetDisabledState))}),this.form._updateTreeValidity({emitEvent:!1})}_setUpFormContainer(e){let i=this.form.get(e.path);yn(i,e),i.updateValueAndValidity({emitEvent:!1})}_cleanUpFormContainer(e){let i=this.form?.get(e.path);i&&Si(i,e)&&i.updateValueAndValidity({emitEvent:!1})}_updateRegistrations(){this.form._registerOnCollectionChange(this._onCollectionChange),this._oldForm?._registerOnCollectionChange(()=>{})}_updateValidators(){ft$1(this.form,this),this._oldForm&&Ee$1(this._oldForm,this)}static ɵfac=function(i){return new(i||n)(br(q$1,10),br(st,10),br(ke$1,8))};static ɵdir=PE({type:n,features:[lp,rm]})}return n})();var Ri={provide:j,useExisting:co(()=>Oi)};var Oi=(()=>{class n extends Ii{form=null;ngSubmit=new Ve$1;get control(){return this.form}static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,selectors:[[``,`formGroup`,``]],hostBindings:function(i,r){i&1&&bp(`submit`,function(s){return r.onSubmit(s)})(`reset`,function(){return r.onReset()})},inputs:{form:[0,`formGroup`,`form`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[cD([Ri]),lp]})}return n})();var Ti={provide:J,useExisting:co(()=>ki)};var Yt=Promise.resolve();var ki=(()=>{class n extends J{_changeDetectorRef;callSetDisabledState;control=new _n;static ngAcceptInputType_isDisabled;_registered=!1;_ngModelInjector;viewModel;name=``;isDisabled;model;options;update=new Ve$1;constructor(e,i,r,a,s,g,B,ee){super(B,ee,a),this._changeDetectorRef=s,this.callSetDisabledState=g,this._parent=e,this._setValidators(i),this._setAsyncValidators(r)}ngOnChanges(e){if(this._registered,this._checkForErrors(),!this._registered||`name`in e){if(this._registered&&(this._checkName(),this.formDirective)){let i=e.name.previousValue;this.formDirective.removeControl({name:i,path:this._getPath(i)})}this._setUpControl()}`isDisabled`in e&&this._updateDisabled(e),Ni(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}ɵngControlCreate(e){super.ngControlCreate(e)}ɵngControlUpdate(e){super.ngControlUpdate(e,!1)}get shouldBindRequired(){return!1}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,qt(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:!1})}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,qt(this.control,this,e))}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){Yt.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let i=e.isDisabled.currentValue,r=i!==0&&XP(i);Yt.then(()=>{r&&!this.control.disabled?this.control.disable():!r&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?yi(e,this._parent):[e]}static ɵfac=function(i){return new(i||n)(br(j,9),br(q$1,10),br(st,10),br(Re$1,10),br(KP,8),br(ke$1,8),br(re,8),br(Ma,8))};static ɵdir=PE({type:n,selectors:[[``,`ngModel`,``,3,`formControlName`,``,3,`formControl`,``]],inputs:{name:`name`,isDisabled:[0,`disabled`,`isDisabled`],model:[0,`ngModel`,`model`],options:[0,`ngModelOptions`,`options`]},outputs:{update:`ngModelChange`},exportAs:[`ngModel`],standalone:!1,features:[cD([Ti,Ei]),lp,rm,HE(null)]})}return n})();var vr=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n,selectors:[[`form`,3,`ngNoForm`,``,3,`ngNativeValidate`,``]],hostAttrs:[`novalidate`,``],standalone:!1})}return n})();var Pi={provide:Re$1,useExisting:co(()=>Li),multi:!0};var Li=(()=>{class n extends ot$1{writeValue(e){let i=e??``;this.setProperty(`value`,i)}registerOnChange(e){this.onChange=i=>{e(i==``?null:parseFloat(i))}}static ɵfac=(()=>{let e;return function(r){return(e||(e=wm(n)))(r||n)}})();static ɵdir=PE({type:n,selectors:[[`input`,`type`,`number`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(i,r){i&1&&bp(`input`,function(s){return r.onChange(s.target.value)})(`blur`,function(){return r.onTouched()})},standalone:!1,features:[cD([Pi]),lp]})}return n})();var ji=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=OE({type:n});static ɵinj=Tl({})}return n})();var yr=(()=>{class n{static withConfig(e){return{ngModule:n,providers:[{provide:ke$1,useValue:e.callSetDisabledState??ut$2}]}}static ɵfac=function(i){return new(i||n)};static ɵmod=OE({type:n});static ɵinj=Tl({imports:[ji]})}return n})();var Cn$1=Symbol(`FIELD_TREE`);function fe$1(n){return typeof n==`function`&&n[Cn$1]===!0}var oo=new O(``);var mt=class{_box;_destroyed=new K$2;_resizeSubject=new K$2;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<`u`&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new C$2(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),i.unsubscribe(),this._elementObservables.delete(t)}}).pipe(Qt$1(e=>e.some(i=>i.target===t)),Yh({bufferSize:1,refCount:!0}),Kh(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}};var Nn=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=_(Se$1);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||`content-box`;return this._observers.has(r)||this._observers.set(r,new mt(r)),this._observers.get(r).observe(e)}static ɵfac=function(i){return new(i||n)};static ɵprov=yr$1({token:n,factory:n.ɵfac})}return n})();var ht=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n,selectors:[[`mat-label`]]})}return n})();var zi=new O(`MatError`);var pt$1=(()=>{class n{align=`start`;id=_(no).getId(`mat-mdc-hint-`);static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n,selectors:[[`mat-hint`]],hostAttrs:[1,`mat-mdc-form-field-hint`,`mat-mdc-form-field-bottom-align`],hostVars:4,hostBindings:function(i,r){i&2&&(Dp(`id`,r.id),mp(`align`,null),Op(`mat-mdc-form-field-hint-end`,r.align===`end`))},inputs:{align:`align`,id:`id`}})}return n})();var Vn=new O(`MatPrefix`);var Bi=(()=>{class n{set _isTextSelector(e){this._isText=!0}_isText=!1;static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n,selectors:[[``,`matPrefix`,``],[``,`matIconPrefix`,``],[``,`matTextPrefix`,``]],inputs:{_isTextSelector:[0,`matTextPrefix`,`_isTextSelector`]},features:[cD([{provide:Vn,useExisting:n}])]})}return n})();var Gi=new O(`MatSuffix`);var In=new O(`FloatingLabelParent`);var Mn=(()=>{class n{_elementRef=_(vr$1);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=_(Nn);_ngZone=_(Se$1);_parent=_(In);_resizeSubscription=new z$2;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return Hi(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:`border-box`}).subscribe(()=>this._handleResize())})}static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n,selectors:[[`label`,`matFormFieldFloatingLabel`,``]],hostAttrs:[1,`mdc-floating-label`,`mat-mdc-floating-label`],hostVars:2,hostBindings:function(i,r){i&2&&Op(`mdc-floating-label--float-above`,r.floating)},inputs:{floating:`floating`,monitorResize:`monitorResize`}})}return n})();function Hi(n){let t=n;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(!0);e.style.setProperty(`position`,`absolute`),e.style.setProperty(`transform`,`translate(-9999px, -9999px)`),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var wn$1=`mdc-line-ripple--active`;var Pe$1=`mdc-line-ripple--deactivating`;var Dn=(()=>{class n{_elementRef=_(vr$1);_cleanupTransitionEnd;constructor(){let e=_(Se$1),i=_(Ma);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,`transitionend`,this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(Pe$1),e.add(wn$1)}deactivate(){this._elementRef.nativeElement.classList.add(Pe$1)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(Pe$1);e.propertyName===`opacity`&&r&&i.remove(wn$1,Pe$1)};ngOnDestroy(){this._cleanupTransitionEnd()}static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n,selectors:[[`div`,`matFormFieldLineRipple`,``]],hostAttrs:[1,`mdc-line-ripple`]})}return n})();var En=(()=>{class n{_elementRef=_(vr$1);_ngZone=_(Se$1);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(`.mdc-floating-label`);i?(e.classList.add(`mdc-notched-outline--upgraded`),typeof requestAnimationFrame==`function`&&(i.style.transitionDuration=`0s`,this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration=``)}))):e.classList.add(`mdc-notched-outline--no-label`)}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width=``:i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty(`--mat-form-field-notch-max-width`,`calc(100% - ${e}px)`)}static ɵfac=function(i){return new(i||n)};static ɵcmp=(function(){let e=[`notch`];return AE({type:n,selectors:[[`div`,`matFormFieldNotchedOutline`,``]],viewQuery:function(a,s){if(a&1&&Np(e,5),a&2){let g;_I(g=NI())&&(s._notch=g.first)}},hostAttrs:[1,`mdc-notched-outline`],hostVars:2,hostBindings:function(a,s){a&2&&Op(`mdc-notched-outline--notched`,s.open)},inputs:{open:[0,`matFormFieldNotchedOutlineOpen`,`open`]},ngContentSelectors:[`*`],decls:5,vars:0,consts:[[`notch`,``],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__leading`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__notch`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__trailing`]],template:function(a,s){a&1&&(bI(),Ep(0,`div`,1),Ic(1,`div`,2,0),TI(3),Dc(),Ep(4,`div`,3))},encapsulation:2})})()}return n})();var Ui=(()=>{class n{id;ngField=null;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;stateChanges=null;value;static ɵfac=function(i){return new(i||n)};static ɵdir=PE({type:n})}return n})();var qi=new O(`MatFormField`);var $i=new O(`MAT_FORM_FIELD_DEFAULT_OPTIONS`);var Fn=`fill`;var Wi=`auto`;var An=`fixed`;var Ki=`translateY(-50%)`;var Rn=(()=>{class n{_elementRef=_(vr$1);_changeDetectorRef=_(KP);_platform=_(Ce$2);_idGenerator=_(no);_ngZone=_(Se$1);_defaults=_($i,{optional:!0});_currentDirection;_unwrapMaybeSignal(e){return Po(e)?e():e}_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=QP(`iconPrefixContainer`);_textPrefixContainerSignal=QP(`textPrefixContainer`);_iconSuffixContainerSignal=QP(`iconSuffixContainer`);_textSuffixContainerSignal=QP(`textSuffixContainer`);_prefixSuffixContainers=DD(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=ZP(ht);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=bv(e)}_hideRequiredMarker=!1;color=`primary`;get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||Wi}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||Fn;this._appearanceSignal.set(i)}_appearanceSignal=Oo(Fn);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||An}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||An}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel=``;_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId(`mat-mdc-form-field-label-`);_hintLabelId=this._idGenerator.getId(`mat-mdc-hint-`);_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new K$2;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=pn$1();constructor(){let e=this._defaults,i=_(ef);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Iu(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-form-field-animations-enabled`)},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=fe$1(this._control.ngField)?null:this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&!fe$1(this._control.ngField)&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=DD(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel=`always`)}_initializeControl(e){let i=this._control,r=`mat-mdc-form-field-type-`;e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges?.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges?.pipe(Qc([void 0,void 0]),_e$1(()=>[this._unwrapMaybeSignal(i.errorState),i.userAriaDescribedBy]),Zh(),Qt$1(([[a,s],[g,B]])=>a!==g||s!==B)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&!fe$1(i.ngField)&&(this._valueChanges=i.ngControl.valueChanges.pipe(Kh(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),jh(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._unwrapMaybeSignal(this._control.focused);e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle(`mat-focused`,e),this._textField?.nativeElement.classList.toggle(`mdc-text-field--focused`,e)}_syncOutlineLabelOffset(){tF({earlyRead:()=>{if(this._appearanceSignal()!==`outline`)return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:`border-box`})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel===`always`}_hasOutline(){return this.appearance===`outline`}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=DD(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._shouldAlwaysFloat()||this._unwrapMaybeSignal(this._control.shouldLabelFloat):!1}_shouldForward(e){let i=this._control?.ngField||this._control?.ngControl;if(!i)return!1;if(fe$1(i)){let r=i();return e===`valid`?r.valid():e===`dirty`?r.dirty():e===`touched`?r.touched():e===`pending`?r.pending():e===`untouched`?!r.touched():e===`pristine`?!r.dirty():e===`invalid`?!r.valid():!1}else{let r=i;return e===`valid`?r.valid:e===`dirty`?r.dirty:e===`touched`?r.touched:e===`pending`?r.pending:e===`untouched`?r.untouched:e===`pristine`?r.pristine:e===`invalid`?r.invalid:!1}}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._unwrapMaybeSignal(this._control.errorState)?`error`:`hint`}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy==`string`&&e.push(...this._control.userAriaDescribedBy.split(` `)),this._getSubscriptMessageType()===`hint`){let a=this._hintChildren?this._hintChildren.find(g=>g.align===`start`):null,s=this._hintChildren?this._hintChildren.find(g=>g.align===`end`):null;a?e.push(a.id):this._hintLabel&&e.push(this._hintLabelId),s&&e.push(s.id)}else this._errorChildren&&e.push(...this._errorChildren.map(a=>a.id));let i=this._control.describedByIds,r;if(i){let a=this._describedByIds||e;r=e.concat(i.filter(s=>s&&!a.includes(s)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return[``,null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,a=this._textSuffixContainer?.nativeElement,s=e?.getBoundingClientRect().width??0,g=i?.getBoundingClientRect().width??0,B=r?.getBoundingClientRect().width??0,ee=a?.getBoundingClientRect().width??0;return[`var(--mat-mdc-form-field-label-transform, ${Ki} translateX(${`calc(${this._currentDirection===`rtl`?`-1`:`1`} * (${`${s+g}px`} + var(--mat-mdc-form-field-label-offset-x, 0px)))`}))`,s+g+B+ee]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static ɵfac=function(i){return new(i||n)};static ɵcmp=(function(){let e=[`iconPrefixContainer`],i=[`textPrefixContainer`],r=[`iconSuffixContainer`],a=[`textSuffixContainer`],s=[`textField`],g=[`*`,[[`mat-label`]],[[``,`matPrefix`,``],[``,`matIconPrefix`,``]],[[``,`matTextPrefix`,``]],[[``,`matTextSuffix`,``]],[[``,`matSuffix`,``],[``,`matIconSuffix`,``]],[[`mat-error`],[``,`matError`,``]],[[`mat-hint`,3,`align`,`end`]],[[`mat-hint`,`align`,`end`]]],B=[`*`,`mat-label`,`[matPrefix], [matIconPrefix]`,`[matTextPrefix]`,`[matTextSuffix]`,`[matSuffix], [matIconSuffix]`,`mat-error, [matError]`,`mat-hint:not([align='end'])`,`mat-hint[align='end']`];function ee(l,d){l&1&&vp(0,`span`,21)}function Le(l,d){if(l&1&&(ui$1(0,`label`,20),TI(1,1),rI(2,ee,1,0,`span`,21),Ec()),l&2){let o=DI(2);yp(`floating`,o._shouldLabelFloat())(`monitorResize`,o._hasOutline())(`id`,o._labelId),mp(`for`,o._control.disableAutomaticLabeling?null:o._control.id),Jy(2),iI(!o.hideRequiredMarker&&o._unwrapMaybeSignal(o._control.required)?2:-1)}}function je(l,d){if(l&1&&rI(0,Le,3,5,`label`,20),l&2){let o=DI();iI(o._hasFloatingLabel()?0:-1)}}function gt(l,d){l&1&&vp(0,`div`,7)}function ze(l,d){}function Be(l,d){if(l&1&&dp(0,ze,0,0,`ng-template`,13),l&2){DI(2);let o=SI(1);yp(`ngTemplateOutlet`,o)}}function Ge(l,d){if(l&1&&(ui$1(0,`div`,9),rI(1,Be,1,1,null,13),Ec()),l&2){let o=DI();yp(`matFormFieldNotchedOutlineOpen`,o._shouldLabelFloat()),Jy(),iI(o._forceDisplayInfixLabel()?-1:1)}}function Tn(l,d){l&1&&(ui$1(0,`div`,10,2),TI(2,2),Ec())}function kn(l,d){l&1&&(ui$1(0,`div`,11,3),TI(2,3),Ec())}function Pn(l,d){}function Ln(l,d){if(l&1&&dp(0,Pn,0,0,`ng-template`,13),l&2){DI();let o=SI(1);yp(`ngTemplateOutlet`,o)}}function jn(l,d){l&1&&(ui$1(0,`div`,14,4),TI(2,4),Ec())}function zn(l,d){l&1&&(ui$1(0,`div`,15,5),TI(2,5),Ec())}function Bn(l,d){l&1&&vp(0,`div`,16)}function Gn(l,d){l&1&&(ui$1(0,`div`,18),TI(1,6),Ec())}function Hn(l,d){if(l&1&&(ui$1(0,`mat-hint`,22),KI(1),Ec()),l&2){let o=DI(2);yp(`id`,o._hintLabelId),Jy(),Hp(o.hintLabel)}}function Un(l,d){if(l&1&&(ui$1(0,`div`,19),rI(1,Hn,2,2,`mat-hint`,22),TI(2,7),vp(3,`div`,23),TI(4,8),Ec()),l&2){let o=DI();Jy(),iI(o.hintLabel?1:-1)}}return AE({type:n,selectors:[[`mat-form-field`]],contentQueries:function(d,o,c){if(d&1&&(Mp(c,o._labelChild,ht,5),_p(c,Ui,5)(c,Vn,5)(c,Gi,5)(c,zi,5)(c,pt$1,5)),d&2){MI();let v;_I(v=NI())&&(o._formFieldControl=v.first),_I(v=NI())&&(o._prefixChildren=v),_I(v=NI())&&(o._suffixChildren=v),_I(v=NI())&&(o._errorChildren=v),_I(v=NI())&&(o._hintChildren=v)}},viewQuery:function(d,o){if(d&1&&(Sp(o._iconPrefixContainerSignal,e,5)(o._textPrefixContainerSignal,i,5)(o._iconSuffixContainerSignal,r,5)(o._textSuffixContainerSignal,a,5),Np(s,5)(e,5)(i,5)(r,5)(a,5)(Mn,5)(En,5)(Dn,5)),d&2){MI(4);let c;_I(c=NI())&&(o._textField=c.first),_I(c=NI())&&(o._iconPrefixContainer=c.first),_I(c=NI())&&(o._textPrefixContainer=c.first),_I(c=NI())&&(o._iconSuffixContainer=c.first),_I(c=NI())&&(o._textSuffixContainer=c.first),_I(c=NI())&&(o._floatingLabel=c.first),_I(c=NI())&&(o._notchedOutline=c.first),_I(c=NI())&&(o._lineRipple=c.first)}},hostAttrs:[1,`mat-mdc-form-field`],hostVars:38,hostBindings:function(d,o){d&2&&Op(`mat-mdc-form-field-label-always-float`,o._shouldAlwaysFloat())(`mat-mdc-form-field-has-icon-prefix`,o._hasIconPrefix)(`mat-mdc-form-field-has-icon-suffix`,o._hasIconSuffix)(`mat-form-field-invalid`,o._unwrapMaybeSignal(o._control.errorState))(`mat-form-field-disabled`,o._unwrapMaybeSignal(o._control.disabled))(`mat-form-field-autofilled`,o._unwrapMaybeSignal(o._control.autofilled))(`mat-form-field-appearance-fill`,o.appearance==`fill`)(`mat-form-field-appearance-outline`,o.appearance==`outline`)(`mat-form-field-hide-placeholder`,o._hasFloatingLabel()&&!o._shouldLabelFloat())(`mat-primary`,o.color!==`accent`&&o.color!==`warn`)(`mat-accent`,o.color===`accent`)(`mat-warn`,o.color===`warn`)(`ng-untouched`,o._shouldForward(`untouched`))(`ng-touched`,o._shouldForward(`touched`))(`ng-pristine`,o._shouldForward(`pristine`))(`ng-dirty`,o._shouldForward(`dirty`))(`ng-valid`,o._shouldForward(`valid`))(`ng-invalid`,o._shouldForward(`invalid`))(`ng-pending`,o._shouldForward(`pending`))},inputs:{hideRequiredMarker:`hideRequiredMarker`,color:`color`,floatLabel:`floatLabel`,appearance:`appearance`,subscriptSizing:`subscriptSizing`,hintLabel:`hintLabel`},exportAs:[`matFormField`],features:[cD([{provide:qi,useExisting:n},{provide:In,useExisting:n}])],ngContentSelectors:B,decls:18,vars:21,consts:[[`labelTemplate`,``],[`textField`,``],[`iconPrefixContainer`,``],[`textPrefixContainer`,``],[`textSuffixContainer`,``],[`iconSuffixContainer`,``],[1,`mat-mdc-text-field-wrapper`,`mdc-text-field`,3,`click`],[1,`mat-mdc-form-field-focus-overlay`],[1,`mat-mdc-form-field-flex`],[`matFormFieldNotchedOutline`,``,3,`matFormFieldNotchedOutlineOpen`],[1,`mat-mdc-form-field-icon-prefix`],[1,`mat-mdc-form-field-text-prefix`],[1,`mat-mdc-form-field-infix`],[3,`ngTemplateOutlet`],[1,`mat-mdc-form-field-text-suffix`],[1,`mat-mdc-form-field-icon-suffix`],[`matFormFieldLineRipple`,``],[`aria-atomic`,`true`,`aria-live`,`polite`,1,`mat-mdc-form-field-subscript-wrapper`,`mat-mdc-form-field-bottom-align`],[1,`mat-mdc-form-field-error-wrapper`],[1,`mat-mdc-form-field-hint-wrapper`],[`matFormFieldFloatingLabel`,``,3,`floating`,`monitorResize`,`id`],[`aria-hidden`,`true`,1,`mat-mdc-form-field-required-marker`,`mdc-floating-label--required`],[3,`id`],[1,`mat-mdc-form-field-hint-spacer`]],template:function(d,o){if(d&1&&(bI(g),dp(0,je,1,1,`ng-template`,null,0,mD),ui$1(2,`div`,6,1),bp(`click`,function(v){return o._control.onContainerClick(v)}),rI(4,gt,1,0,`div`,7),ui$1(5,`div`,8),rI(6,Ge,2,2,`div`,9),rI(7,Tn,3,0,`div`,10),rI(8,kn,3,0,`div`,11),ui$1(9,`div`,12),rI(10,Ln,1,1,null,13),TI(11),Ec(),rI(12,jn,3,0,`div`,14),rI(13,zn,3,0,`div`,15),Ec(),rI(14,Bn,1,0,`div`,16),Ec(),ui$1(15,`div`,17),rI(16,Gn,2,0,`div`,18)(17,Un,5,1,`div`,19),Ec()),d&2){let c,v=o._unwrapMaybeSignal(o._control.disabled);Jy(2),Op(`mdc-text-field--filled`,!o._hasOutline())(`mdc-text-field--outlined`,o._hasOutline())(`mdc-text-field--no-label`,!o._hasFloatingLabel())(`mdc-text-field--disabled`,v)(`mdc-text-field--invalid`,o._unwrapMaybeSignal(o._control.errorState)),Jy(2),iI(!o._hasOutline()&&!v?4:-1),Jy(2),iI(o._hasOutline()?6:-1),Jy(),iI(o._hasIconPrefix?7:-1),Jy(),iI(o._hasTextPrefix?8:-1),Jy(2),iI(!o._hasOutline()||o._forceDisplayInfixLabel()?10:-1),Jy(2),iI(o._hasTextSuffix?12:-1),Jy(),iI(o._hasIconSuffix?13:-1),Jy(),iI(o._hasOutline()?-1:14),Jy(),Op(`mat-mdc-form-field-subscript-dynamic-size`,o.subscriptSizing===`dynamic`);let qn=o._getSubscriptMessageType();Jy(),iI((c=qn)===`error`?16:c===`hint`?17:-1)}},dependencies:[Mn,En,vd,Dn,pt$1],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-filled-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-outlined-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-filled-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-outlined-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-top-right-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) {
  background-color: var(--%NS%mat-form-field-filled-container-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--%NS%mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-hover-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-filled-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-filled-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-filled-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-filled-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-outlined-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-outlined-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-outlined-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-outlined-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-outline-color, var(--%NS%mat-sys-outline));
  border-width: var(--%NS%mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-hover-outline-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-focus-outline-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-hover-outline-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-focus-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--%NS%mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--%NS%mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--%NS%mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-active-indicator-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-hover-active-indicator-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-active-indicator-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-hover-active-indicator-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--%NS%mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-focus-active-indicator-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-focus-active-indicator-color, var(--%NS%mat-sys-error));
}

.mdc-line-ripple--%NS%active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--%NS%deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--%NS%no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --%NS%mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--%NS%mat-form-field-container-height, 56px);
  padding-top: var(--%NS%mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--%NS%mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--%NS%mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--%NS%mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--%NS%mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--%NS%mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --%NS%mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--%NS%mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--%NS%mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--%NS%mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--%NS%mat-form-field-error-text-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-subscript-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-form-field-subscript-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-form-field-subscript-text-size, var(--%NS%mat-sys-body-small-size));
  letter-spacing: var(--%NS%mat-form-field-subscript-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  font-weight: var(--%NS%mat-form-field-subscript-text-weight, var(--%NS%mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--%NS%mat-form-field-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--%NS%mat-form-field-select-option-text-color, var(--%NS%mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--%NS%mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--%NS%mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--%NS%mat-form-field-enabled-select-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-focus-select-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --%NS%mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-container-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-form-field-container-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-form-field-container-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-form-field-container-text-tracking, var(--%NS%mat-sys-body-large-tracking));
  font-weight: var(--%NS%mat-form-field-container-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--%NS%mat-form-field-outlined-label-text-populated-size) * var(--%NS%mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--%NS%mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-trailing-icon-color, var(--%NS%mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-hover-trailing-icon-color, var(--%NS%mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-focus-trailing-icon-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--%NS%filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})})()}return n})();var Bo=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=OE({type:n});static ɵinj=Tl({imports:[Kc,Rn,Ea]})}return n})();var Ho=(()=>{class n{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}isSignalErrorState(e){if(!e)return!1;let i=e().invalid(),r=e().touched();return i&&r}static ɵfac=function(i){return new(i||n)};static ɵprov=yr$1({token:n,factory:n.ɵfac})}return n})();var On=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(t,e,i,r,a){this._defaultMatcher=t,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=a,e?Po(e.field)&&!e.updateValueAndValidity?(this.formField=e,this.ngControl=null):(this.formField=null,this.ngControl=e):this.ngControl=this.formField=null}updateErrorState(){let t=this.errorState,e=this._getCurrentErrorState(this.matcher||this._defaultMatcher);e!==t&&(this.errorState=e,this._stateChanges.next())}_getCurrentErrorState(t){if(this.formField&&t?.isSignalErrorState)return t.isSignalErrorState(this.formField.field())??!1;let e=this._parentFormGroup||this._parentForm,i=this.ngControl?this.ngControl.control:null;return t?.isErrorState(i,e)??!1}};var at=(()=>{class o{_animationsDisabled=pn$1();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(t){return new(t||o)};static ɵcmp=AE({type:o,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(t,i){t&2&&Op(`mat-pseudo-checkbox-indeterminate`,i.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,i.state===`checked`)(`mat-pseudo-checkbox-disabled`,i.disabled)(`mat-pseudo-checkbox-minimal`,i.appearance===`minimal`)(`mat-pseudo-checkbox-full`,i.appearance===`full`)(`_mat-animation-noopable`,i._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(t,i){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return o})();var pe=new O(`MAT_OPTION_PARENT_COMPONENT`);var he=new O(`MatOptgroup`);var me=class{source;isUserInput;constructor(n,e=!1){this.source=n,this.isUserInput=e}};var te=(()=>{class o{_element=_(vr$1);_changeDetectorRef=_(KP);_parent=_(pe,{optional:!0});group=_(he,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue=``;get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=_(no).getId(`mat-option-`);get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=Oo(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new Ve$1;_text;_stateChanges=new K$2;constructor(){let e=_(lt$1);e.load(du),e.load(pa),this._signalDisableRipple=!!this._parent&&Po(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||``).trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let i=this._getHostElement();typeof i.focus==`function`&&i.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!qc(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?`-1`:`0`}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new me(this,e))}static ɵfac=function(t){return new(t||o)};static ɵcmp=(function(){let e=[`text`],t=[[[`mat-icon`]],`*`],i=[`mat-icon`,`*`];function r(d,u){if(d&1&&vp(0,`mat-pseudo-checkbox`,1),d&2){let l=DI();yp(`disabled`,l.disabled)(`state`,l.selected?`checked`:`unchecked`)}}function p(d,u){if(d&1&&vp(0,`mat-pseudo-checkbox`,3),d&2){let l=DI();yp(`disabled`,l.disabled)}}function _(d,u){if(d&1&&(ui$1(0,`span`,4),KI(1),Ec()),d&2){let l=DI();Jy(),wc(`(`,l.group.label,`)`)}}return AE({type:o,selectors:[[`mat-option`]],viewQuery:function(u,l){if(u&1&&Np(e,7),u&2){let c;_I(c=NI())&&(l._text=c.first)}},hostAttrs:[`role`,`option`,1,`mat-mdc-option`,`mdc-list-item`],hostVars:11,hostBindings:function(u,l){u&1&&bp(`click`,function(){return l._selectViaInteraction()})(`keydown`,function(h){return l._handleKeydown(h)}),u&2&&(Dp(`id`,l.id),mp(`aria-selected`,l.selected)(`aria-disabled`,l.disabled.toString()),Op(`mdc-list-item--selected`,l.selected)(`mat-mdc-option-multiple`,l.multiple)(`mat-mdc-option-active`,l.active)(`mdc-list-item--disabled`,l.disabled))},inputs:{value:`value`,id:`id`,disabled:[2,`disabled`,`disabled`,XP]},outputs:{onSelectionChange:`onSelectionChange`},exportAs:[`matOption`],ngContentSelectors:i,decls:8,vars:5,consts:[[`text`,``],[`aria-hidden`,`true`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`,`state`],[1,`mdc-list-item__primary-text`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,1,`mat-mdc-option-pseudo-checkbox`,3,`disabled`],[1,`cdk-visually-hidden`],[`aria-hidden`,`true`,`mat-ripple`,``,1,`mat-mdc-option-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`]],template:function(u,l){u&1&&(bI(t),rI(0,r,1,2,`mat-pseudo-checkbox`,1),TI(1),ui$1(2,`span`,2,0),TI(4,1),Ec(),rI(5,p,1,1,`mat-pseudo-checkbox`,3),rI(6,_,2,1,`span`,4),vp(7,`div`,5)),u&2&&(iI(l.multiple?0:-1),Jy(5),iI(!l.multiple&&l.selected&&!l.hideSingleSelectionIndicator?5:-1),Jy(),iI(l.group&&l.group._inert?6:-1),Jy(),yp(`matRippleTrigger`,l._getHostElement())(`matRippleDisabled`,l.disabled||l.disableRipple))},dependencies:[at,Tv],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--%NS%mat-option-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-option-label-text-font, var(--%NS%mat-sys-label-large-font));
  line-height: var(--%NS%mat-option-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-size: var(--%NS%mat-option-label-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-option-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
  font-weight: var(--%NS%mat-option-label-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--%NS%mat-option-hover-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--%NS%mat-option-focus-state-layer-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) calc(var(--%NS%mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--%NS%mat-option-selected-state-layer-color, var(--%NS%mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--%NS%selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-option-selected-state-label-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--%NS%selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --%NS%mat-list-list-item-selected-container-color: var(--%NS%mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})})()}return o})();function it(o,n,e){if(e.length){let t=n.toArray(),i=e.toArray(),r=0;for(let p=0;p<o+1;p++)t[p].group&&t[p].group===i[r]&&r++;return r}return 0}function ot(o,n,e,t){return o<e?o:o+n>e+t?Math.max(0,o-t+n):e}var K$1=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new K$2;bulk={select:n=>this._select(n),deselect:n=>this._deselect(n),setSelection:n=>this._setSelection(n)};constructor(n=!1,e,t=!0,i){this._multiple=n,this._emitChanges=t,this.compareWith=i,e&&e.length&&(n?e.forEach(r=>this._markSelected(r)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...n){return this._select(n)}deselect(...n){return this._deselect(n)}setSelection(...n){return this._setSelection(n)}toggle(n){return this.isSelected(n)?this.deselect(n):this.select(n)}clear(n=!0){this._unmarkAll();let e=this._hasQueuedChanges();return n&&this._emitChangeEvent(),e}isSelected(n){return this._selection.has(this._getConcreteValue(n))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(n){this._multiple&&this.selected&&this._selected.sort(n)}isMultipleSelection(){return this._multiple}_select(n){this._verifyValueAssignment(n),n.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_deselect(n){this._verifyValueAssignment(n),n.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}_setSelection(n){this._verifyValueAssignment(n);let e=this.selected,t=new Set(n.map(r=>this._getConcreteValue(r)));n.forEach(r=>this._markSelected(r)),e.filter(r=>!t.has(this._getConcreteValue(r,t))).forEach(r=>this._unmarkSelected(r));let i=this._hasQueuedChanges();return this._emitChangeEvent(),i}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(n){n=this._getConcreteValue(n),this.isSelected(n)||(this._multiple||this._unmarkAll(),this.isSelected(n)||this._selection.add(n),this._emitChanges&&this._selectedToEmit.push(n))}_unmarkSelected(n){n=this._getConcreteValue(n),this.isSelected(n)&&(this._selection.delete(n),this._emitChanges&&this._deselectedToEmit.push(n))}_unmarkAll(){this.isEmpty()||this._selection.forEach(n=>this._unmarkSelected(n))}_verifyValueAssignment(n){n.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(n,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(n,t))return t;return n}else return n}};var rt=(()=>{class o{static ɵfac=function(t){return new(t||o)};static ɵmod=OE({type:o});static ɵinj=Tl({imports:[Ea]})}return o})();var ue=(()=>{class o{static ɵfac=function(t){return new(t||o)};static ɵmod=OE({type:o});static ɵinj=Tl({imports:[pu,rt,te,Ea]})}return o})();var ut$1=new O(`mat-select-scroll-strategy`,{providedIn:`root`,factory:()=>{let o=_(re);return()=>Pt(o)}});var ft=new O(`MAT_SELECT_CONFIG`);var gt$1=new O(`MatSelectTrigger`);var fe=class{source;value;constructor(n,e){this.source=n,this.value=e}};var Cn=(()=>{class o{_viewportRuler=_(F$2);_changeDetectorRef=_(KP);_elementRef=_(vr$1);_dir=_(ef,{optional:!0});_idGenerator=_(no);_renderer=_(Ma);_parentFormField=_(qi,{optional:!0});ngControl=_(J,{self:!0,optional:!0});_liveAnnouncer=_(Bm);_defaultOptions=_(ft,{optional:!0});_animationsDisabled=pn$1();_popoverLocation;_initialized=new K$2;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:`start`,originY:`bottom`,overlayX:`start`,overlayY:`top`},{originX:`end`,originY:`bottom`,overlayX:`end`,overlayY:`top`},{originX:`start`,originY:`top`,overlayX:`start`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`},{originX:`end`,originY:`top`,overlayX:`end`,overlayY:`bottom`,panelClass:`mat-mdc-select-panel-above`}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let i=this.panel.nativeElement,r=it(e,this.options,this.optionGroups),p=t._getHostElement();e===0&&r===1?i.scrollTop=0:i.scrollTop=ot(p.offsetTop,p.offsetHeight,i.scrollTop,i.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new fe(this,e)}_scrollStrategyFactory=_(ut$1);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId(`mat-select-`);_triggerAriaLabelledBy=null;_previousControl;_destroy=new K$2;_errorStateTracker;stateChanges=new K$2;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId(`mat-select-value-`);_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||``;get focused(){return this._focused||this._panelOpen}_focused=!1;controlType=`mat-select`;trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=Oo(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(nt.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel=``;ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<`u`?this._defaultOptions.panelWidth:`auto`;canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=Lh(()=>{let e=this.options;return e?e.changes.pipe(Qc(e),Zc(()=>jh(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(Zc(()=>this.optionSelectionChanges))});openedChange=new Ve$1;_openedStream=this.openedChange.pipe(Qt$1(e=>e),_e$1(()=>{}));_closedStream=this.openedChange.pipe(Qt$1(e=>!e),_e$1(()=>{}));selectionChange=new Ve$1;valueChange=new Ve$1;constructor(){let e=_(Ho),t=_(Ai,{optional:!0}),i=_(Oi,{optional:!0}),r=_(new nh(`tabindex`),{optional:!0}),p=_(Vt,{optional:!0}),_$1=_(oo,{optional:!0,self:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new On(e,_$1||this.ngControl,i,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=r==null?0:parseInt(r)||0,this._popoverLocation=p?.usePopover===!1?null:`inline`,this.id=this.id}ngOnInit(){this._selectionModel=new K$1(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(Kh(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(Kh(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(Qc(null),Kh(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let i=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?i.setAttribute(`aria-labelledby`,e):i.removeAttribute(`aria-labelledby`)}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._panelOpen=!0,this._overlayDir.positionChange.pipe(Jt$1(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(i),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,`animationend`,r=>{r.animationName===`_mat-select-exit`&&(this._cleanupDetach?.(),this._detachOverlay())}),i=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add(`mat-select-panel-exit`)}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return``;if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(`, `)}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value===`rtl`:!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,i=t===40||t===38||t===37||t===39,r=t===13||t===32,p=this._keyManager;if(!p.isTyping()&&r&&!qc(e)||(this.multiple||e.altKey)&&i)e.preventDefault(),this.open();else if(!this.multiple){let _=this.selected;p.onKeydown(e);let d=this.selected;d&&_!==d&&this._liveAnnouncer.announce(d.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,i=e.keyCode,r=i===40||i===38,p=t.isTyping();if(r&&e.altKey)e.preventDefault(),this.close();else if(!p&&(i===13||i===32)&&t.activeItem&&!qc(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!p&&this._multiple&&i===65&&e.ctrlKey){e.preventDefault();let _=this.options.some(d=>!d.disabled&&!d.selected);this.options.forEach(d=>{d.disabled||(_?d.select():d.deselect())})}else{let _=t.activeItemIndex;t.onKeydown(e),this._multiple&&r&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==_&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!qc(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(i=>{if(this._selectionModel.isSelected(i))return!1;try{return(i.value!=null||this.canSelectNullableOptions)&&this._compareWith(i.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth===`auto`?(e instanceof xt$1?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?``:this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new to(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?`rtl`:`ltr`).withHomeAndEnd().withPageUpDown().withAllowedModifierKeys([`shiftKey`]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=jh(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(Kh(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),jh(...this.options.map(t=>t._stateChanges)).pipe(Kh(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let i=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(i!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),i!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,i)=>this.sortComparator?this.sortComparator(t,i,e):e.indexOf(t)-e.indexOf(i)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(i=>i.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+` `:``;return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||``;return this.ariaLabelledby&&(e+=` `+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute(`aria-describedby`,e.join(` `)):t.removeAttribute(`aria-describedby`)}onContainerClick(e){let t=$e(e);t&&(t.tagName===`MAT-OPTION`||t.classList.contains(`cdk-overlay-backdrop`)||t.closest(`.mat-mdc-select-panel`))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static ɵfac=function(t){return new(t||o)};static ɵcmp=(function(){let e=[`trigger`],t=[`panel`],i=[[[`mat-select-trigger`]],`*`],r=[`mat-select-trigger`,`*`];function p(c,h){if(c&1&&(ui$1(0,`span`,4),KI(1),Ec()),c&2){let a=DI();Jy(),Hp(a.placeholder)}}function _(c,h){c&1&&TI(0)}function d(c,h){if(c&1&&(ui$1(0,`span`,11),KI(1),Ec()),c&2){let a=DI(2);Jy(),Hp(a.triggerValue)}}function u(c,h){if(c&1&&(ui$1(0,`span`,5),rI(1,_,1,0)(2,d,2,1,`span`,11),Ec()),c&2){let a=DI();Jy(),iI(a.customTrigger?1:2)}}function l(c,h){if(c&1){let a=hI();ui$1(0,`div`,12,1),bp(`keydown`,function(f){Zl(a);let ct=DI();return Yl(ct._handleKeydown(f))}),TI(2,1),Ec()}if(c&2){let a=DI();HI(a.panelClass),Op(`mat-select-panel-animations-enabled`,!a._animationsDisabled)(`mat-primary`,a._parentFormField?.color===`primary`)(`mat-accent`,a._parentFormField?.color===`accent`)(`mat-warn`,a._parentFormField?.color===`warn`)(`mat-undefined`,!a._parentFormField?.color),mp(`id`,a.id+`-panel`)(`aria-multiselectable`,a.multiple)(`aria-label`,a.ariaLabel||null)(`aria-labelledby`,a._getPanelAriaLabelledby())}}return AE({type:o,selectors:[[`mat-select`]],contentQueries:function(h,a,m){if(h&1&&_p(m,gt$1,5)(m,te,5)(m,he,5),h&2){let f;_I(f=NI())&&(a.customTrigger=f.first),_I(f=NI())&&(a.options=f),_I(f=NI())&&(a.optionGroups=f)}},viewQuery:function(h,a){if(h&1&&Np(e,5)(t,5)(me$1,5),h&2){let m;_I(m=NI())&&(a.trigger=m.first),_I(m=NI())&&(a.panel=m.first),_I(m=NI())&&(a._overlayDir=m.first)}},hostAttrs:[`role`,`combobox`,`aria-haspopup`,`listbox`,1,`mat-mdc-select`],hostVars:21,hostBindings:function(h,a){h&1&&bp(`keydown`,function(f){return a._handleKeydown(f)})(`focus`,function(){return a._onFocus()})(`blur`,function(){return a._onBlur()}),h&2&&(mp(`id`,a.id)(`tabindex`,a.disabled?-1:a.tabIndex)(`aria-controls`,a.panelOpen?a.id+`-panel`:null)(`aria-expanded`,a.panelOpen)(`aria-label`,a.ariaLabel||null)(`aria-required`,a.required.toString())(`aria-disabled`,a.disabled.toString())(`aria-invalid`,a.errorState)(`aria-activedescendant`,a._getAriaActiveDescendant()),Op(`mat-mdc-select-disabled`,a.disabled)(`mat-mdc-select-invalid`,a.errorState)(`mat-mdc-select-required`,a.required)(`mat-mdc-select-empty`,a.empty)(`mat-mdc-select-multiple`,a.multiple)(`mat-select-open`,a.panelOpen))},inputs:{userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],panelClass:`panelClass`,disabled:[2,`disabled`,`disabled`,XP],disableRipple:[2,`disableRipple`,`disableRipple`,XP],tabIndex:[2,`tabIndex`,`tabIndex`,c=>c==null?0:eF(c)],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,XP],placeholder:`placeholder`,required:[2,`required`,`required`,XP],multiple:[2,`multiple`,`multiple`,XP],disableOptionCentering:[2,`disableOptionCentering`,`disableOptionCentering`,XP],compareWith:`compareWith`,value:`value`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],errorStateMatcher:`errorStateMatcher`,typeaheadDebounceInterval:[2,`typeaheadDebounceInterval`,`typeaheadDebounceInterval`,eF],sortComparator:`sortComparator`,id:`id`,panelWidth:`panelWidth`,canSelectNullableOptions:[2,`canSelectNullableOptions`,`canSelectNullableOptions`,XP]},outputs:{openedChange:`openedChange`,_openedStream:`opened`,_closedStream:`closed`,selectionChange:`selectionChange`,valueChange:`valueChange`},exportAs:[`matSelect`],features:[cD([{provide:Ui,useExisting:o},{provide:pe,useExisting:o}]),rm],ngContentSelectors:r,decls:11,vars:10,consts:[[`fallbackOverlayOrigin`,`cdkOverlayOrigin`,`trigger`,``],[`panel`,``],[`cdk-overlay-origin`,``,1,`mat-mdc-select-trigger`,3,`click`],[1,`mat-mdc-select-value`],[1,`mat-mdc-select-placeholder`,`mat-mdc-select-min-line`],[1,`mat-mdc-select-value-text`],[1,`mat-mdc-select-arrow-wrapper`],[1,`mat-mdc-select-arrow`],[`viewBox`,`0 0 24 24`,`width`,`24px`,`height`,`24px`,`focusable`,`false`,`aria-hidden`,`true`],[`d`,`M7 10l5 5 5-5z`],[`cdk-connected-overlay`,``,`cdkConnectedOverlayHasBackdrop`,``,`cdkConnectedOverlayBackdropClass`,`cdk-overlay-transparent-backdrop`,3,`detach`,`backdropClick`,`overlayKeydown`,`cdkConnectedOverlayDisableClose`,`cdkConnectedOverlayPanelClass`,`cdkConnectedOverlayScrollStrategy`,`cdkConnectedOverlayOrigin`,`cdkConnectedOverlayPositions`,`cdkConnectedOverlayWidth`,`cdkConnectedOverlayFlexibleDimensions`,`cdkConnectedOverlayUsePopover`],[1,`mat-mdc-select-min-line`],[`role`,`listbox`,`tabindex`,`-1`,1,`mat-mdc-select-panel`,`mdc-menu-surface`,`mdc-menu-surface--open`,3,`keydown`]],template:function(h,a){if(h&1&&(bI(i),ui$1(0,`div`,2,0),bp(`click`,function(){return a.open()}),ui$1(3,`div`,3),rI(4,p,2,1,`span`,4)(5,u,3,1,`span`,5),Ec(),ui$1(6,`div`,6)(7,`div`,7),cu(),ui$1(8,`svg`,8),vp(9,`path`,9),Ec()()()(),dp(10,l,3,16,`ng-template`,10),bp(`detach`,function(){return a.close()})(`backdropClick`,function(){return a.close()})(`overlayKeydown`,function(f){return a._handleOverlayKeydown(f)})),h&2){let m=SI(1);Jy(3),mp(`id`,a._valueId),Jy(),iI(a.empty?4:5),Jy(6),yp(`cdkConnectedOverlayDisableClose`,!0)(`cdkConnectedOverlayPanelClass`,a._overlayPanelClass)(`cdkConnectedOverlayScrollStrategy`,a._scrollStrategy)(`cdkConnectedOverlayOrigin`,a._preferredOverlayOrigin||m)(`cdkConnectedOverlayPositions`,a._positions)(`cdkConnectedOverlayWidth`,a._overlayWidth)(`cdkConnectedOverlayFlexibleDimensions`,!0)(`cdkConnectedOverlayUsePopover`,a._popoverLocation)}},dependencies:[xt$1,me$1],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--%NS%mat-select-enabled-trigger-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-select-trigger-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-select-trigger-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-select-trigger-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-select-trigger-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-select-trigger-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--%NS%mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--%NS%mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-select-invalid-arrow-color, var(--%NS%mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--%NS%mat-select-enabled-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-focused-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--%NS%mat-select-disabled-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  box-sizing: border-box;
  transform-origin: top center;
  border-radius: 0 0 4px 4px;
  position: relative;
  background-color: var(--%NS%mat-select-panel-background-color, var(--%NS%mat-sys-surface-container));
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-radius: 4px 4px 0 0;
  transform-origin: bottom center;
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear forwards;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--%NS%mat-select-placeholder-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--%NS%mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2})})()}return o})();var wn=(()=>{class o{static ɵfac=function(t){return new(t||o)};static ɵmod=OE({type:o});static ɵinj=Tl({imports:[we$2,ue,Ea,wt,Bo,ue]})}return o})();function a(){if(typeof window>`u`)return!1;try{let t=window.Capacitor;if(typeof t?.isNativePlatform==`function`)return t.isNativePlatform()}catch{}return!1}function v(){if(!(typeof window>`u`))try{window.location.reload()}catch{window.location.assign(window.location.href)}}var d=class e{platformId=_(Hg);version=Oo(`0.0.0`);async refreshInstalledVersion(){if(!fc(this.platformId))return this.version();try{let r=await p$2(`assets/version.json?t=${Date.now()}`,{cache:`no-store`,headers:{"Cache-Control":`no-cache, no-store, must-revalidate`,Pragma:`no-cache`}});if(!r.ok)return this.version();let o=await r.json();typeof o.version==`string`&&o.version.trim()&&this.version.set(o.version.trim())}catch{}return this.version()}static ɵfac=function(o){return new(o||e)};static ɵprov=de$1({token:e,factory:e.ɵfac,providedIn:`root`})};var kt=Math.pow(2,31)-1;var f$1=class{_overlayRef;instance;containerInstance;_afterDismissed=new K$2;_afterOpened=new K$2;_onAction=new K$2;_durationTimeoutId;_dismissedByAction=!1;constructor(s,t){this._overlayRef=t,this.containerInstance=s,s._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(s){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(s,kt))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}};var pt=new O(`MatSnackBarData`);var p$1=class{politeness=`polite`;announcementMessage=``;viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition=`center`;verticalPosition=`bottom`};var _t=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵdir=PE({type:i,selectors:[[``,`matSnackBarLabel`,``]],hostAttrs:[1,`mat-mdc-snack-bar-label`,`mdc-snackbar__label`]})}return i})();var vt=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵdir=PE({type:i,selectors:[[``,`matSnackBarActions`,``]],hostAttrs:[1,`mat-mdc-snack-bar-actions`,`mdc-snackbar__actions`]})}return i})();var gt=(()=>{class i{static ɵfac=function(n){return new(n||i)};static ɵdir=PE({type:i,selectors:[[``,`matSnackBarAction`,``]],hostAttrs:[1,`mat-mdc-snack-bar-action`,`mdc-snackbar__action`]})}return i})();var yt=(()=>{class i{snackBarRef=_(f$1);data=_(pt);action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){function t(n,a){if(n&1){let e=hI();ui$1(0,`div`,1)(1,`button`,2),bp(`click`,function(){Zl(e);let o=DI();return Yl(o.action())}),KI(2),Ec()()}if(n&2){let e=DI();Jy(2),wc(` `,e.data.action,` `)}}return AE({type:i,selectors:[[`simple-snack-bar`]],hostAttrs:[1,`mat-mdc-simple-snack-bar`],exportAs:[`matSnackBar`],decls:3,vars:2,consts:[[`matSnackBarLabel`,``],[`matSnackBarActions`,``],[`matButton`,``,`matSnackBarAction`,``,3,`click`]],template:function(a,e){a&1&&(ui$1(0,`div`,0),KI(1),Ec(),rI(2,t,3,1,`div`,1)),a&2&&(Jy(),wc(` `,e.data.message,`
`),Jy(),iI(e.hasAction?2:-1))},dependencies:[uy,_t,vt,gt],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2})})()}return i})();var R$1=`_mat-snack-bar-enter`;var I$1=`_mat-snack-bar-exit`;var xt=(()=>{class i extends tt{_ngZone=_(Se$1);_elementRef=_(vr$1);_changeDetectorRef=_(KP);_platform=_(Ce$2);_animationsDisabled=pn$1();snackBarConfig=_(p$1);_document=_(Ro);_trackedModals=new Set;_enterFallback;_exitFallback;_injector=_(re);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new K$2;_onExit=new K$2;_onEnter=new K$2;_animationState=`void`;_live;_label;_role;_liveElementId=_(no).getId(`mat-snack-bar-container-live-`);constructor(){super();let t=this.snackBarConfig;t.politeness===`assertive`&&!t.announcementMessage?this._live=`assertive`:t.politeness===`off`?this._live=`off`:this._live=`polite`,this._platform.FIREFOX&&(this._live===`polite`&&(this._role=`status`),this._live===`assertive`&&(this._role=`alert`))}attachComponentPortal(t){this._assertNotAttached();let n=this._portalOutlet.attachComponentPortal(t);return this._afterPortalAttached(),n}attachTemplatePortal(t){this._assertNotAttached();let n=this._portalOutlet.attachTemplatePortal(t);return this._afterPortalAttached(),n}attachDomPortal=t=>{this._assertNotAttached();let n=this._portalOutlet.attachDomPortal(t);return this._afterPortalAttached(),n};onAnimationEnd(t){t===I$1?this._completeExit():t===R$1&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState=`visible`,this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Ry(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(R$1)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-snack-bar-fallback-visible`),this.onAnimationEnd(R$1)},200)))}exit(){return this._destroyed?wh(void 0):(this._ngZone.run(()=>{this._animationState=`hidden`,this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute(`mat-exit`,``),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Ry(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(I$1)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(I$1),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let t=this._elementRef.nativeElement,n=this.snackBarConfig.panelClass;n&&(Array.isArray(n)?n.forEach(r=>t.classList.add(r)):t.classList.add(n)),this._exposeToModals();let a=this._label.nativeElement,e=`mdc-snackbar__label`;a.classList.toggle(e,!a.querySelector(`.${e}`))}_exposeToModals(){let t=this._liveElementId,n=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let a=0;a<n.length;a++){let e=n[a],r=e.getAttribute(`aria-owns`);this._trackedModals.add(e),r?r.indexOf(t)===-1&&e.setAttribute(`aria-owns`,r+` `+t):e.setAttribute(`aria-owns`,t)}}_clearFromModals(){this._trackedModals.forEach(t=>{let n=t.getAttribute(`aria-owns`);if(n){let a=n.replace(this._liveElementId,``).trim();a.length>0?t.setAttribute(`aria-owns`,a):t.removeAttribute(`aria-owns`)}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let t=this._elementRef.nativeElement,n=t.querySelector(`[aria-hidden]`),a=t.querySelector(`[aria-live]`);if(n&&a){let e=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&n.contains(document.activeElement)&&(e=document.activeElement),n.removeAttribute(`aria-hidden`),a.appendChild(n),e?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static ɵfac=function(n){return new(n||i)};static ɵcmp=(function(){let t=[`label`];function n(a,e){}return AE({type:i,selectors:[[`mat-snack-bar-container`]],viewQuery:function(e,r){if(e&1&&Np(_i$1,7)(t,7),e&2){let o;_I(o=NI())&&(r._portalOutlet=o.first),_I(o=NI())&&(r._label=o.first)}},hostAttrs:[1,`mdc-snackbar`,`mat-mdc-snack-bar-container`],hostVars:6,hostBindings:function(e,r){e&1&&bp(`animationend`,function(l){return r.onAnimationEnd(l.animationName)})(`animationcancel`,function(l){return r.onAnimationEnd(l.animationName)}),e&2&&Op(`mat-snack-bar-container-enter`,r._animationState===`visible`)(`mat-snack-bar-container-exit`,r._animationState===`hidden`)(`mat-snack-bar-container-animations-enabled`,!r._animationsDisabled)},features:[lp],decls:6,vars:3,consts:[[`label`,``],[1,`mdc-snackbar__surface`,`mat-mdc-snackbar-surface`],[1,`mat-mdc-snack-bar-label`],[`aria-hidden`,`true`],[`cdkPortalOutlet`,``]],template:function(e,r){e&1&&(ui$1(0,`div`,1)(1,`div`,2,0)(3,`div`,3),dp(4,n,0,0,`ng-template`,4),Ec(),vp(5,`div`),Ec()()),e&2&&(Jy(5),mp(`aria-live`,r._live)(`role`,r._role)(`id`,r._liveElementId))},dependencies:[_i$1],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--%NS%mat-snack-bar-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));
  border-radius: var(--%NS%mat-snack-bar-container-shape, var(--%NS%mat-sys-corner-extra-small));
  background-color: var(--%NS%mat-snack-bar-container-color, var(--%NS%mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--%NS%mat-snack-bar-supporting-text-font, var(--%NS%mat-sys-body-medium-font));
  font-size: var(--%NS%mat-snack-bar-supporting-text-size, var(--%NS%mat-sys-body-medium-size));
  font-weight: var(--%NS%mat-snack-bar-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  line-height: var(--%NS%mat-snack-bar-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--%NS%mat-snack-bar-button-color, var(--%NS%mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --%NS%mat-button-text-state-layer-color: currentColor;
  --%NS%mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2,changeDetection:1})})()}return i})();var St=new O(`mat-snack-bar-default-options`,{providedIn:`root`,factory:()=>new p$1});var bt=(()=>{class i{_live=_(Bm);_injector=_(re);_breakpointObserver=_(qi$1);_parentSnackBar=_(i,{optional:!0,skipSelf:!0});_defaultConfig=_(St);_animationsDisabled=pn$1();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=yt;snackBarContainerComponent=xt;handsetCssClass=`mat-mdc-snack-bar-handset`;get _openedSnackBarRef(){let t=this._parentSnackBar;return t?t._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(t){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=t:this._snackBarRefAtThisLevel=t}openFromComponent(t,n){return this._attach(t,n)}openFromTemplate(t,n){return this._attach(t,n)}open(t,n=``,a){let e=r(r({},this._defaultConfig),a);return e.data={message:t,action:n},e.announcementMessage===t&&(e.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,e)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(t,n){let a=n&&n.viewContainerRef&&n.viewContainerRef.injector,e=re.create({parent:a||this._injector,providers:[{provide:p$1,useValue:n}]}),r=new Ct(this.snackBarContainerComponent,n.viewContainerRef,e),o=t.attach(r);return o.instance.snackBarConfig=n,o.instance}_attach(t,n){let a=r(r(r({},new p$1),this._defaultConfig),n),e=this._createOverlay(a),r$6=this._attachSnackBarContainer(e,a),o=new f$1(r$6,e);if(t instanceof dr){let l=new H$1(t,null,{$implicit:a.data,snackBarRef:o});o.instance=r$6.attachTemplatePortal(l)}else{let l=this._createInjector(a,o),v=new Ct(t,void 0,l);o.instance=r$6.attachComponentPortal(v).instance}return this._breakpointObserver.observe(cv.HandsetPortrait).pipe(Kh(e.detachments())).subscribe(l=>{e.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),a.announcementMessage&&r$6._onAnnounce.subscribe(()=>{this._live.announce(a.announcementMessage,a.politeness)}),this._animateSnackBar(o,a),this._openedSnackBarRef=o,this._openedSnackBarRef}_animateSnackBar(t,n){t.afterDismissed().subscribe(()=>{this._openedSnackBarRef==t&&(this._openedSnackBarRef=null),n.announcementMessage&&this._live.clear()}),n.duration&&n.duration>0&&t.afterOpened().subscribe(()=>t._dismissAfter(n.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{t.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):t.containerInstance.enter()}_createOverlay(t){let n=new j$1;n.direction=t.direction;let a=le$2(this._injector),e=t.direction===`rtl`,r=t.horizontalPosition===`left`||t.horizontalPosition===`start`&&!e||t.horizontalPosition===`end`&&e,o=!r&&t.horizontalPosition!==`center`;return r?a.left(`0`):o?a.right(`0`):a.centerHorizontally(),t.verticalPosition===`top`?a.top(`0`):a.bottom(`0`),n.positionStrategy=a,n.disableAnimations=this._animationsDisabled,At(this._injector,n)}_createInjector(t,n){let a=t&&t.viewContainerRef&&t.viewContainerRef.injector;return re.create({parent:a||this._injector,providers:[{provide:f$1,useValue:n},{provide:pt,useValue:t.data}]})}static ɵfac=function(n){return new(n||i)};static ɵprov=yr$1({token:i,factory:i.ɵfac})}return i})();var ut=class i{constructor(s){this.snackBar=s}snackBar;success(s){this.show(s,`OK`,`success`)}error(s){this.show(s,`Dismiss`,`error`,6e3)}info(s){this.show(s,`OK`,`info`)}warning(s){this.show(s,`Dismiss`,`warning`,6e3)}withAction(s,t,n,a=`info`,e=0,r){let o={duration:e,horizontalPosition:`center`,verticalPosition:`bottom`,panelClass:[`app-snackbar`,`app-snackbar--${a}`]},l=this.snackBar.open(s,t,o);l.onAction().subscribe(()=>n()),r&&l.afterDismissed().subscribe(({dismissedByAction:v})=>{v||r()})}offline(s){this.show(s,`OK`,`offline`,5e3)}weatherWarning(s){this.show(s,`Dismiss`,`weather`,6e3)}show(s,t,n,a=4e3){let e={duration:a,horizontalPosition:`center`,verticalPosition:`bottom`,panelClass:[`app-snackbar`,`app-snackbar--${n}`]};this.snackBar.open(s,t,e)}static ɵfac=function(t){return new(t||i)(Me$2(bt))};static ɵprov=de$1({token:i,factory:i.ɵfac,providedIn:`root`})};var T$3=`Service workers are disabled or not supported by this browser`;var f=class{serviceWorker;worker;registration;events;constructor(e,r){if(this.serviceWorker=e,!e)this.worker=this.events=this.registration=new C$2(i=>i.error(new N$2(5601,!1)));else{let i=null,t=new K$2;this.worker=new C$2(p=>(i!==null&&p.next(i),t.subscribe(b=>p.next(b))));let o=()=>{let{controller:p}=e;p!==null&&(i=p,t.next(i))};e.addEventListener(`controllerchange`,o),o(),this.registration=this.worker.pipe(Zc(()=>e.getRegistration().then(p=>{if(!p)throw new N$2(5601,!1);return p})));let s=new K$2;this.events=s.asObservable();let d=p=>{let{data:b}=p;b?.type&&s.next(b)};e.addEventListener(`message`,d),r?.get(bi$1,null,{optional:!0})?.onDestroy(()=>{e.removeEventListener(`controllerchange`,o),e.removeEventListener(`message`,d)})}}postMessage(e,r$5){return new Promise(i=>{this.worker.pipe(Jt$1(1)).subscribe(t=>{t.postMessage(r({action:e},r$5)),i()})})}postMessageWithOperation(e,r,i){let t=this.waitForOperationCompleted(i),o=this.postMessage(e,r);return Promise.all([o,t]).then(([,s])=>s)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(e){let r;return typeof e==`string`?r=i=>i.type===e:r=i=>e.includes(i.type),this.events.pipe(Qt$1(r))}nextEventOfType(e){return this.eventsOfType(e).pipe(Jt$1(1))}waitForOperationCompleted(e){return new Promise((r,i)=>{this.eventsOfType(`OPERATION_COMPLETED`).pipe(Qt$1(t=>t.nonce===e),Jt$1(1),_e$1(t=>{if(t.result!==void 0)return t.result;throw new Error(t.error)})).subscribe({next:r,error:i})})}get isEnabled(){return!!this.serviceWorker}};var Y=(()=>{class n{sw;messages;notificationClicks;notificationCloses;pushSubscriptionChanges;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new K$2;constructor(r){if(this.sw=r,!r.isEnabled){this.messages=Vh,this.notificationClicks=Vh,this.notificationCloses=Vh,this.pushSubscriptionChanges=Vh,this.subscription=Vh;return}this.messages=this.sw.eventsOfType(`PUSH`).pipe(_e$1(t=>t.data)),this.notificationClicks=this.sw.eventsOfType(`NOTIFICATION_CLICK`).pipe(_e$1(t=>t.data)),this.notificationCloses=this.sw.eventsOfType(`NOTIFICATION_CLOSE`).pipe(_e$1(t=>t.data)),this.pushSubscriptionChanges=this.sw.eventsOfType(`PUSH_SUBSCRIPTION_CHANGE`).pipe(_e$1(t=>t.data)),this.pushManager=this.sw.registration.pipe(_e$1(t=>t.pushManager));let i=this.pushManager.pipe(Zc(t=>t.getSubscription()));this.subscription=new C$2(t=>{let o=i.subscribe(t),s=this.subscriptionChanges.subscribe(t);return()=>{o.unsubscribe(),s.unsubscribe()}})}requestSubscription(r){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(T$3));let i={userVisibleOnly:!0},t=this.decodeBase64(r.serverPublicKey.replace(/_/g,`/`).replace(/-/g,`+`)),o=new Uint8Array(new ArrayBuffer(t.length));for(let s=0;s<t.length;s++)o[s]=t.charCodeAt(s);return i.applicationServerKey=o,new Promise((s,d)=>{this.pushManager.pipe(Zc(g=>g.subscribe(i)),Jt$1(1)).subscribe({next:g=>{this.subscriptionChanges.next(g),s(g)},error:d})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(T$3));let r=i=>{if(i===null)throw new N$2(5602,!1);return i.unsubscribe().then(t=>{if(!t)throw new N$2(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((i,t)=>{this.subscription.pipe(Jt$1(1),Zc(r)).subscribe({next:i,error:t})})}decodeBase64(r){return atob(r)}static ɵfac=function(i){return new(i||n)(Me$2(f))};static ɵprov=de$1({token:n,factory:n.ɵfac})}return n})();var k=(()=>{class n{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}ongoingCheckForUpdate=null;constructor(r){if(this.sw=r,!r.isEnabled){this.versionUpdates=Vh,this.unrecoverable=Vh;return}this.versionUpdates=this.sw.eventsOfType([`VERSION_DETECTED`,`VERSION_INSTALLATION_FAILED`,`VERSION_READY`,`NO_NEW_VERSION_DETECTED`]),this.unrecoverable=this.sw.eventsOfType(`UNRECOVERABLE_STATE`)}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(T$3));if(this.ongoingCheckForUpdate)return this.ongoingCheckForUpdate;let r=this.sw.generateNonce();return this.ongoingCheckForUpdate=this.sw.postMessageWithOperation(`CHECK_FOR_UPDATES`,{nonce:r},r).finally(()=>{this.ongoingCheckForUpdate=null}),this.ongoingCheckForUpdate}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new N$2(5601,!1));let r=this.sw.generateNonce();return this.sw.postMessageWithOperation(`ACTIVATE_UPDATE`,{nonce:r},r)}static ɵfac=function(i){return new(i||n)(Me$2(f))};static ɵprov=de$1({token:n,factory:n.ɵfac})}return n})();var K=new O(``);function Z(){let n=_(m);if(!(`serviceWorker`in navigator&&n.enabled!==!1))return;let e=_(K),r=_(Se$1),i=_(bi$1);r.runOutsideAngular(()=>{let t=navigator.serviceWorker,o=()=>t.controller?.postMessage({action:`INITIALIZE`});t.addEventListener(`controllerchange`,o),i.onDestroy(()=>{t.removeEventListener(`controllerchange`,o)})}),r.runOutsideAngular(()=>{let t,{registrationStrategy:o}=n;if(typeof o==`function`)t=new Promise(s=>o().subscribe(()=>s()));else{let[s,...d]=(o||`registerWhenStable:30000`).split(`:`);switch(s){case`registerImmediately`:t=Promise.resolve();break;case`registerWithDelay`:t=B(+d[0]||0);break;case`registerWhenStable`:t=Promise.race([i.whenStable(),B(+d[0])]);break;default:throw new N$2(5600,!1)}}t.then(()=>{i.destroyed||navigator.serviceWorker.register(e,{scope:n.scope,updateViaCache:n.updateViaCache,type:n.type}).catch(s=>console.error(Wn$1(5604,!1)))})})}function B(n){return new Promise(e=>setTimeout(e,n))}function z(){let n=_(m),e=_(re);return new f(n.enabled!==!1?navigator.serviceWorker:void 0,e)}var m=class{enabled;updateViaCache;type;scope;registrationStrategy};function ne(n,e={}){return mo([Y,k,{provide:K,useValue:n},{provide:m,useValue:e},{provide:f,useFactory:z},VE(Z)])}var q=1e4;var H=class n{swUpdate=_(k);notifier=_(ut);i18n=_(m$1);platformId=_(Hg);checkIntervalMs=3e5;updatePromptOpen=!1;constructor(){if(!fc(this.platformId)||a()||!this.swUpdate.isEnabled){fc(this.platformId)&&a()&&this.unregisterStaleServiceWorkersOnce();return}this.checkForUpdatesNow(),Fh(this.checkIntervalMs).subscribe(()=>{this.checkForUpdatesNow()}),this.swUpdate.versionUpdates.subscribe(e=>{this.handleVersionEvent(e)})}async checkForUpdatesNow(){if(!fc(this.platformId)||a()||!this.swUpdate.isEnabled)return!1;try{return await this.swUpdate.checkForUpdate(),!0}catch(e){return console.error(`[SW] update check failed`,e),!1}}showUpdatePrompt(){this.updatePromptOpen||(this.updatePromptOpen=!0,this.notifier.withAction(this.i18n.t(`pwa.updateAvailable`),this.i18n.t(`pwa.updateNow`),()=>{this.applyUpdate()},`info`,0,()=>{this.updatePromptOpen=!1,setTimeout(()=>this.showUpdatePrompt(),q)}))}handleVersionEvent(e){if(e.type===`VERSION_READY`){this.showUpdatePrompt();return}e.type===`VERSION_INSTALLATION_FAILED`&&(console.error(`[SW] version installation failed`,e.error),this.notifier.warning(this.i18n.t(`pwa.updateFailed`)))}async applyUpdate(){try{if(!await this.swUpdate.activateUpdate()){this.updatePromptOpen=!1,this.notifier.warning(this.i18n.t(`pwa.updateFailed`));return}await new Promise(r=>setTimeout(r,250)),v()}catch(e){this.updatePromptOpen=!1,console.error(`[SW] update activation failed`,e),this.notifier.warning(this.i18n.t(`pwa.updateFailed`))}}async unregisterStaleServiceWorkersOnce(){if(`serviceWorker`in navigator)try{if(localStorage.getItem(`ft.nativeSwCleared`)===`1`)return;let e=await navigator.serviceWorker.getRegistrations();if(e.length===0){localStorage.setItem(xe$3,`1`);return}await Promise.all(e.map(r=>r.unregister())),localStorage.setItem(xe$3,`1`)}catch(e){console.warn(`[SW] failed to unregister native service workers`,e)}}static ɵfac=function(r){return new(r||n)};static ɵprov=de$1({token:n,factory:n.ɵfac,providedIn:`root`})};function w(i){let t=i.split(`?`)[0];return t===`/`||t===``}function S(i){if(!i||typeof i!=`string`||!i.startsWith(`/`)||i.startsWith(`//`)||i.includes(`://`))return!1;let t=i.split(`?`)[0].split(`#`)[0];return!(t.startsWith(`/pin/`)||t===`/mode-select`||t.startsWith(`/mode-select/`))}function I(i){if(!S(i))return;let t=sessionStorage.getItem(Ve$2);t&&S(t)&&!w(t)&&w(i)||sessionStorage.setItem(`fish-tracker-return-url`,i)}function M(){let i=sessionStorage.getItem(Ve$2);return i&&S(i)?i:`/`}function R(){sessionStorage.removeItem(Ve$2)}function D$1(){let i=M();return R(),i}var C$1=class i{settings=_(h$1);vault=_(h$2);router=_(le$3);lockedSignal=Oo(!0);lockState=r({},le$1);activityListenerAttached=!1;lockChangeCallback;isLocked=this.lockedSignal.asReadonly();constructor(){this.ensureActivityListener()}initializeFromStorage(){if(!this.hasPinConfigured()){this.lockedSignal.set(!1);return}this.lockState=this.loadLockState();let t=this.hasUnlockSession(),e=this.settings.get().lockTimeoutMinutes*60*1e3,s=this.lockState.lastActivityAt?new Date(this.lockState.lastActivityAt).getTime():0;if(!t){this.lockState.isLocked=!0,this.vault.lock(),this.persistLockState(),this.lockedSignal.set(!0),rF()&&console.debug(`[PinLock] locked on cold start (no unlock session)`);return}if(s>0&&Date.now()-s>e){this.lockState.isLocked=!0,this.clearUnlockSession(),this.vault.lock(),this.persistLockState(),this.lockedSignal.set(!0),rF()&&console.debug(`[PinLock] Session expired due to inactivity`);return}this.lockedSignal.set(this.lockState.isLocked),this.lockState.isLocked?(this.clearUnlockSession(),this.vault.lock()):this.vault.restoreFromSession(),rF()&&console.debug(`[PinLock] initialized from storage`,{isLocked:this.lockState.isLocked})}subscribeToLockChanges(t){this.lockChangeCallback=t}hasPinConfigured(){let t=this.settings.get();return!!(t.pinHash&&t.pinSalt)}isAppLocked(){return this.hasPinConfigured()?this.lockedSignal():!1}getLockoutRemainingMs(){let t=this.lockState.lockoutUntil;return t?Math.max(0,t-Date.now()):0}unlock(){this.lockedSignal.set(!1),this.lockState=s(r({},this.lockState),{isLocked:!1,unlockedAt:new Date().toISOString(),lastActivityAt:new Date().toISOString(),failedAttempts:0,lockoutCount:0,lockoutUntil:void 0}),this.setUnlockSession(),this.persistLockState(),rF()&&console.debug(`[PinLock] unlocked`)}lock(){if(!this.hasPinConfigured())return;this.lockedSignal.set(!0),this.lockState=s(r({},this.lockState),{isLocked:!0}),this.clearUnlockSession(),this.vault.lock(),this.persistLockState(),rF()&&console.debug(`[PinLock] locked`);let t=this.router.url;t.startsWith(`/pin/`)||(I(t),this.router.navigate([`/pin/unlock`])),this.lockChangeCallback?.(!0)}touchActivity(){!this.hasPinConfigured()||this.lockedSignal()||(this.lockState.lastActivityAt=new Date().toISOString(),this.persistLockState())}checkInactivity(){if(!this.hasPinConfigured()||this.lockedSignal())return;let t=this.settings.get().lockTimeoutMinutes*60*1e3,e=this.lockState.lastActivityAt?new Date(this.lockState.lastActivityAt).getTime():Date.now();Date.now()-e>t&&this.lock()}async setupPin(t){let e=crypto.getRandomValues(new Uint8Array(16)),s=await this.hashPin(t,e);this.settings.update({pinHash:this.toBase64(s),pinSalt:this.toBase64(e),pinEnabled:!0}),await this.vault.unlockWithPin(t),this.unlock()}async verifyPin(t){let e=this.getLockoutRemainingMs();if(e>0)return{ok:!1,reason:`lockout`,lockoutRemainingMs:e};let s=this.settings.get();if(!s.pinHash||!s.pinSalt)return{ok:!1,reason:`incorrect`};let o=this.fromBase64(s.pinSalt),r=await this.hashPin(t,o),g=this.fromBase64(s.pinHash);if(r.length!==g.length)return this.recordFailedAttempt();let p=!0;for(let h=0;h<r.length;h++)r[h]!==g[h]&&(p=!1);return p?(await this.vault.unlockWithPin(t),this.unlock(),{ok:!0}):this.recordFailedAttempt()}async changePin(t,e){if(!(await this.verifyPin(t)).ok)return!1;let o=crypto.getRandomValues(new Uint8Array(16)),r=await this.hashPin(e,o);return this.settings.update({pinHash:this.toBase64(r),pinSalt:this.toBase64(o),pinEnabled:!0}),await this.vault.rewrapWithPin(e),!0}recordFailedAttempt(){let t=(this.lockState.failedAttempts??0)+1;if(this.lockState.failedAttempts=t,t>=5){let e=this.lockState.lockoutCount??0,s=Math.min(ge*Math.pow(2,e),ce$1);return this.lockState.lockoutUntil=Date.now()+s,this.lockState.lockoutCount=e+1,this.lockState.failedAttempts=0,this.persistLockState(),{ok:!1,reason:`lockout`,lockoutRemainingMs:s}}return this.persistLockState(),{ok:!1,reason:`incorrect`}}ensureActivityListener(){if(this.activityListenerAttached)return;this.activityListenerAttached=!0;let t=()=>this.touchActivity();document.addEventListener(`pointerdown`,t),document.addEventListener(`keydown`,t),setInterval(()=>this.checkInactivity(),3e4),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`visible`&&(this.checkInactivity(),this.lockedSignal()||this.touchActivity())})}hasUnlockSession(){try{return sessionStorage.getItem(Ue$2)===`1`}catch{return!1}}setUnlockSession(){try{sessionStorage.setItem(Ue$2,`1`)}catch{}}clearUnlockSession(){try{sessionStorage.removeItem(Ue$2)}catch{}}loadLockState(){try{let t=localStorage.getItem(He$1);return t?r(r({},le$1),JSON.parse(t)):r({},le$1)}catch{return r({},le$1)}}persistLockState(){localStorage.setItem(He$1,JSON.stringify(this.lockState))}async hashPin(t,e){let s=new TextEncoder,o=await crypto.subtle.importKey(`raw`,s.encode(t),`PBKDF2`,!1,[`deriveBits`]),r=await crypto.subtle.deriveBits({name:`PBKDF2`,salt:e,iterations:1e5,hash:`SHA-256`},o,256);return new Uint8Array(r)}toBase64(t){return btoa(String.fromCharCode(...t))}fromBase64(t){let e=atob(t),s=new Uint8Array(e.length);for(let o=0;o<e.length;o++)s[o]=e.charCodeAt(o);return s}static ɵfac=function(e){return new(e||i)};static ɵprov=de$1({token:i,factory:i.ɵfac,providedIn:`root`})};var F$1=class l{constructor(e){this.repo=e}repo;watchBySession(e){return this.repo.watchBySession(e)}async getBySession(e){return this.repo.getBySession(e)}async record(e){let t={id:y(),sessionId:e.sessionId,type:e.type,rodId:e.rodId,sessionSpotId:e.sessionSpotId,description:e.description,occurredAt:e.occurredAt??L$2()};return await this.repo.put(t),t}async deleteBySession(e){await this.repo.deleteBySession(e)}static ɵfac=function(t){return new(t||l)(Me$2(x))};static ɵprov=de$1({token:l,factory:l.ɵfac,providedIn:`root`})};var D=class l{constructor(e,t,i,s,o,n){this.sessionRepo=e;this.biteRepo=t;this.fishSpottedRepo=i;this.catchRepo=s;this.historyRepo=o;this.sessionEvents=n}sessionRepo;biteRepo;fishSpottedRepo;catchRepo;historyRepo;sessionEvents;createRodRecords(e,t){let i=[];for(let s=1;s<=t;s++)i.push({id:y(),sessionId:e,rodNumber:s,name:`Rod ${s}`,biteCount:0,fishSpottedCount:0,isActive:!0,visible:!0});return i}async ensureRods(e,t){let i=await this.loadFull(e);if(b(i.rods??[]).length>=t)return i;let s=[],o=await this.modifyRods(i,n=>{let a=this.growRods(i.id,n,t);return s=a.created,a.rods});for(let n of s)await this.sessionEvents.record({sessionId:i.id,type:`rod-created`,rodId:n.id,description:`${n.name} created`});return o}growRods(e,t,i){let s$1=i-b(t).length;if(s$1<=0)return{rods:t,created:[]};let o=t.map(c=>r({},c)),n=o.filter(c=>c.visible===!1).sort((c,d)=>c.rodNumber-d.rodNumber);for(let c of n){if(s$1<=0)break;o=o.map(d=>d.id===c.id?s(r({},d),{visible:!0,isActive:!0}):d),s$1-=1}let a=b(o),r$1=Math.max(0,...o.map(c=>c.rodNumber),a.length)+1,h=[];for(;s$1>0;){let c=this.createRodRecords(e,1)[0];c.rodNumber=r$1,c.name=`Rod ${r$1}`,r$1+=1,o.push(c),h.push(c),s$1-=1}return{rods:o,created:h}}async resizeRodCount(e,t,i=!1){let s=await this.loadFull(e),o=s.rods??[],n=b(o).sort((d,u)=>d.rodNumber-u.rodNumber);if(t<1)throw new Error(`Rod count must be at least 1`);if(t>=n.length)return{session:await this.ensureRods(s,t),requiresConfirm:!1,affectedRodIds:[]};let a=n.slice(t),r=[];for(let d of a){let u=await this.biteRepo.countByRod(d.id),v=await this.fishSpottedRepo.countByRod(d.id),w=(await this.catchRepo.getBySession(s.id)).filter(m=>m.rodId===d.id);(u>0||v>0||w.length>0)&&r.push(d.id)}if(r.length>0&&!i)return{session:s,requiresConfirm:!0,affectedRodIds:r};let h=new Set(a.map(d=>d.id));return{session:await this.modifyRods(s,d=>d.map(u=>h.has(u.id)?g(u):u)),requiresConfirm:!1,affectedRodIds:r}}async assignSpot(e,t,i){let s$2=await this.loadFull(e),n=(s$2.rods??[]).find(d=>d.id===t);if(!n)return s$2;let a=n.sessionSpotId;if(a===i)return s$2;let r$2=await this.modifyRods(s$2,d=>d.map(u=>u.id===t?s(r({},u),{sessionSpotId:i}):u)),h={id:y(),rodId:t,fromSessionSpotId:a,toSessionSpotId:i??``,changedAt:L$2()};i&&await this.historyRepo.put(h);let c=b(s$2.sessionSpots??[]).find(d=>d.id===i)?.name??`unassigned`;return await this.sessionEvents.record({sessionId:s$2.id,type:`rod-moved`,rodId:t,sessionSpotId:i,description:`${n.name} moved to ${c}`}),r$2}async recast(e,t,i){let s=await this.loadFull(e),o=(s.rods??[]).find(r=>r.id===t);if(!o)return s;let n=i||void 0,a=s;return(o.sessionSpotId??``)!==(n??``)&&(a=await this.assignSpot(a,t,n)),this.updateRod(a,t,{castAt:L$2(),sessionSpotId:n})}async updateRod(e,t,i){let s$3=await this.loadFull(e),n=(s$3.rods??[]).find(r=>r.id===t),a=await this.modifyRods(s$3,r$3=>r$3.map(h=>h.id===t?s(r(r({},h),i),{id:t,sessionId:s$3.id}):h));if(i.castAt){let r=n?.name??t,h=i.sessionSpotId??n?.sessionSpotId,c=b(s$3.sessionSpots??[]).find(d=>d.id===h)?.name??`unassigned`;await this.sessionEvents.record({sessionId:s$3.id,type:`rod-cast`,rodId:t,sessionSpotId:h,description:`${r} cast at ${c}`,occurredAt:i.castAt})}return a}async syncRodCounts(e){let t=await this.loadFull(e),i=new Map;for(let s of t.rods??[])i.set(s.id,{biteCount:await this.biteRepo.countByRod(s.id),fishSpottedCount:await this.fishSpottedRepo.countByRod(s.id)});return this.modifyRods(t,s=>s.map(o=>{let n=i.get(o.id);return n?r(r({},o),n):o}))}snapshotFromLakeSpot(e){return{id:y(),lakeSpotId:e.id,name:e.name,latitude:e.latitude,longitude:e.longitude,depth:e.waterDepthM,bottomType:e.bottomType,notes:e.notes,visible:!0}}async saveSessionRods(e,t){return this.modifyRods(e,()=>t)}async modifyRods(e,t){return await this.sessionRepo.modify(e.id,s=>{s.rods=t(s.rods??[])})??s(r({},e),{rods:t(e.rods??[])})}getRodCatchCount(e,t,i){return i.filter(s=>s.rodId===t).length}async loadFull(e){return await this.sessionRepo.getById(e.id)??e}static ɵfac=function(t){return new(t||l)(Me$2(u),Me$2(N$3),Me$2(O$1),Me$2(f$2),Me$2(q$2),Me$2(F$1))};static ɵprov=de$1({token:l,factory:l.ɵfac,providedIn:`root`})};var C=class extends Error{constructor(e){super(e),this.name=`SessionValidationError`}};var V=class l{constructor(e,t,i,s,o,n,a,r,h,c,d,u,v,w,m,g){this.sessionRepo=e;this.catchRepo=t;this.lakeRepo=i;this.geo=s;this.weather=o;this.image=n;this.settings=a;this.fishingMode=r;this.rodService=h;this.sessionEvents=c;this.biteEventRepo=d;this.fishSpottedRepo=u;this.rodSpotHistoryRepo=v;this.sessionEventRepo=w;this.sessionWeather=m;this.i18n=g}sessionRepo;catchRepo;lakeRepo;geo;weather;image;settings;fishingMode;rodService;sessionEvents;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;sessionWeather;i18n;watchAll(){return this.sessionRepo.watchAll().pipe(_e$1(e=>e.map(t=>this.projectSession(t))))}watchById(e){return this.sessionRepo.watchById(e).pipe(_e$1(t=>t?this.projectSession(t):void 0))}watchByIdIncludingHidden(e){return this.sessionRepo.watchById(e)}watchActive(){return this.sessionRepo.watchActive().pipe(_e$1(e=>e?this.projectSession(e):void 0))}async getActive(){let e=await this.sessionRepo.getActive();return e?this.projectSession(e):void 0}async getById(e){let t=await this.sessionRepo.getById(e);return t?this.projectSession(t):void 0}async start(e){let t=await this.sessionRepo.getActive();if(t)return this.projectSession(t);let{name:i,startDate:s,lakeId:o,sessionSpots:n}=e,a=o?await this.lakeRepo.getById(o):void 0,r=L$2(),h=y(),c=this.settings.get().maxRodCount??10,d=e.rodCount!=null?this.rodService.createRodRecords(h,Math.min(Math.max(1,e.rodCount),c)):[],u,v,w=null;try{let g=await this.geo.getCurrentPosition();g&&(u=g.latitude,v=g.longitude,w=this.weather.getCachedSnapshotFor(g.latitude,g.longitude))}catch{}let m={id:h,name:i.trim()||(a?this.i18n.t(`sessions.defaultNameAtLake`,{lake:a.name}):this.i18n.t(`sessions.defaultName`)),lakeId:o,status:`active`,startDate:s,latitude:u,longitude:v,weather:w??void 0,sessionSpots:n??[],rods:d,photoIds:[],catchCount:0,totalCatchWeightKg:0,coverImageId:l$2(a),createdAt:r,updatedAt:r};await this.sessionRepo.put(m),w&&await this.sessionWeather.record(m.id,w),await this.sessionEvents.record({sessionId:m.id,type:`session-start`,description:`${m.name} started`,occurredAt:s});for(let g of d)await this.sessionEvents.record({sessionId:m.id,type:`rod-created`,rodId:g.id,description:`${g.name} created`});return o&&this.fishingMode.updateActivePreferences({lastLakeId:o}),u!=null&&v!=null&&this.refreshWeather(m.id),this.projectSession(m)}async complete(e){let t=await this.sessionRepo.getById(e);if(!t)return;let i=await this.catchRepo.getBySession(e),s$4=i.reduce((a,r)=>a+(r.weightKg??0),0),o=i.reduce((a,r)=>Math.max(a,r.weightKg??0),0),n=s(r({},t),{status:`completed`,endDate:L$2(),catchCount:i.length,totalCatchWeightKg:s$4,biggestFishKg:o>0?o:void 0,updatedAt:L$2()});return await this.sessionRepo.put(n),await this.sessionEvents.record({sessionId:e,type:`session-end`,description:`${t.name} completed`}),this.projectSession(n)}async update(e,t){let i=await this.sessionRepo.modify(e,s=>{Object.assign(s,t,{id:e})});return i?this.projectSession(i):void 0}async updateSession(e,t,i=!1){let s$5=await this.sessionRepo.getById(e);if(!s$5)throw new C(`Session not found`);let o=t.startDate??s$5.startDate,n=t.endDate!==void 0?t.endDate:s$5.endDate;if(n&&new Date(n).getTime()<new Date(o).getTime())throw new C(`End date cannot be earlier than start date`);let a=t.status??s$5.status;if(a===`active`&&s$5.status!==`active`){let m=await this.sessionRepo.getActive();if(m&&m.id!==e)throw new C(`Another active session already exists`)}let r$4=t.sessionSpots??s$5.sessionSpots??[],h=s$5.rods??[];if(t.rodCount!=null){let m=await this.rodService.resizeRodCount(s(r({},s$5),{sessionSpots:r$4,rods:h}),t.rodCount,i);if(m.requiresConfirm)throw new C(`Reducing rod count will remove rods with activity. Confirm to proceed.`);h=m.session.rods??[]}let c=s(r(r({},s$5),t),{startDate:o,endDate:n,status:a,sessionSpots:r$4,rods:h,id:e,updatedAt:L$2()}),d=await this.catchRepo.getBySession(e),u=d.reduce((m,g)=>m+(g.weightKg??0),0),v=d.reduce((m,g)=>Math.max(m,g.weightKg??0),0);c.catchCount=d.length,c.totalCatchWeightKg=u,c.biggestFishKg=v>0?v:void 0;let w=c.lakeId?await this.lakeRepo.getById(c.lakeId):void 0;return c.coverImageId=T$4(d,w),await this.sessionRepo.put(c),this.projectSession(c)}async resolveCoverImageId(e){let t=await this.catchRepo.getBySession(e.id),i=e.lakeId?await this.lakeRepo.getById(e.lakeId):void 0;return T$4(t,i)}async refreshWeather(e){let t=await this.sessionRepo.getById(e);if(!t)return;let s=this.settings.get().useGpsForWeather?await this.geo.getCurrentPosition():null,o=s?.latitude??t.latitude,n=s?.longitude??t.longitude;if(o==null||n==null)return;let a=await this.weather.getSnapshot(o,n),r={};s&&(r.latitude=s.latitude,r.longitude=s.longitude),a&&(r.weather=a),Object.keys(r).length!==0&&(await this.update(e,r),a&&!a.isCached&&await this.appendWeatherHistory(e,a))}async appendWeatherHistory(e,t){await this.sessionWeather.record(e,t),await this.sessionEvents.record({sessionId:e,type:`weather`,description:`Weather updated`})}async addSessionPhoto(e,t){let i=await this.sessionRepo.getById(e);if(!i)return;let s=await this.image.processFile(t,`session`,e);await this.update(e,{photoIds:[...i.photoIds,s]})}async delete(e){await this.catchRepo.deleteBySession(e),await this.biteEventRepo.deleteBySession(e),await this.fishSpottedRepo.deleteBySession(e),await this.sessionEventRepo.deleteBySession(e),await this.sessionWeather.deleteBySession(e);let t=await this.sessionRepo.getById(e);if(t?.rods)for(let i of t.rods)await this.rodSpotHistoryRepo.deleteByRod(i.id);await this.sessionRepo.delete(e)}getDurationMs(e){return(e.endDate?new Date(e.endDate).getTime():Date.now())-new Date(e.startDate).getTime()}projectSession(e){return s(r({},e),{rods:b(e.rods??[]),sessionSpots:b(e.sessionSpots??[])})}static ɵfac=function(t){return new(t||l)(Me$2(u),Me$2(f$2),Me$2(g$1),Me$2(n),Me$2(H$2),Me$2(E$1),Me$2(h$1),Me$2(Sa),Me$2(D),Me$2(F$1),Me$2(N$3),Me$2(O$1),Me$2(q$2),Me$2(x),Me$2(c),Me$2(m$1))};static ɵprov=de$1({token:l,factory:l.ɵfac,providedIn:`root`})};function U$1(n){n||(n=_(ve));let e=new C$2(t=>{if(n.destroyed){t.next();return}return n.onDestroy(t.next.bind(t))});return t=>t.pipe(Kh(e))}function T$2(n,e){let t=e?.injector??_(re),o=new Rn$1(1),c=Iu(()=>{let r;try{r=n()}catch(i){th(()=>o.error(i));return}th(()=>o.next(r))},{injector:t,manualCleanup:!0});return t.get(ve).onDestroy(()=>{c.destroy(),o.complete()}),o.asObservable()}function F(n,e){let o=!e?.manualCleanup?e?.injector?.get(ve)??_(ve):null,c=h(e?.equal),r;e?.requireSync?r=Oo({kind:0},{equal:c}):r=Oo({kind:1,value:e?.initialValue},{equal:c});let i,v=n.subscribe({next:s=>r.set({kind:1,value:s}),error:s=>{r.set({kind:2,error:s}),i?.()},complete:()=>{i?.()}});if(e?.requireSync&&r().kind===0)throw new N$2(601,!1);return i=o?.onDestroy(v.unsubscribe.bind(v)),DD(()=>{let s=r();switch(s.kind){case 1:return s.value;case 2:throw s.error;case 0:throw new N$2(601,!1)}},{equal:e?.equal})}function h(n=Object.is){return(e,t)=>e.kind===1&&t.kind===1&&n(e.value,t.value)}var E=5;function L$1(n){return`${n.type}:${n.severity}`}function N$1(n,e){let i=[];for(let t of e){let r=L$1(t);if(n.has(r))continue;let o=n.has(`${t.type}:danger`),h=n.has(`${t.type}:warning`);t.severity===`danger`&&o||t.severity===`warning`&&(h||o)||i.push(t)}n.clear();for(let t of e)n.add(L$1(t));return i}var p=class n{sessionService=_(V);weatherService=_(H$2);settings=_(h$1);notifications=_(ut);sessionEvents=_(F$1);connectivity=_(a$1);activeSession$=T$2(_(Sa).selectedMode).pipe(Zc(()=>this.sessionService.watchActive()));started=!1;sessionSub;connectivitySub;pollTimerId;activeSessionId=null;fingerprintsBySession=new Map;refreshInFlight=!1;start(){this.started||(this.started=!0,this.sessionSub=this.activeSession$.subscribe(e=>{this.onActiveSession(e)}),this.connectivitySub=this.connectivity.online$.pipe(il(),al(1),Qt$1(e=>e)).subscribe(()=>{this.activeSessionId&&this.settings.get().autoLoadWeather&&this.pollRefresh()}))}ngOnDestroy(){this.sessionSub?.unsubscribe(),this.connectivitySub?.unsubscribe(),this.clearPollTimer()}async onActiveSession(e){if(!e){this.activeSessionId=null,this.clearPollTimer();return}let i=e.id!==this.activeSessionId;this.activeSessionId=e.id,i&&(this.fingerprintsBySession.delete(e.id),this.evaluateAndAlert(e.id,e.weather),this.restartPollTimer(),this.settings.get().autoLoadWeather&&this.pollRefresh())}restartPollTimer(){this.clearPollTimer();let{autoLoadWeather:e,weatherRefreshMinutes:i}=this.settings.get();if(!e||!this.activeSessionId)return;let t=Math.max(E,i||E);this.pollTimerId=setInterval(()=>{this.pollRefresh()},t*60*1e3)}clearPollTimer(){this.pollTimerId!=null&&(clearInterval(this.pollTimerId),this.pollTimerId=void 0)}async pollRefresh(){let e=this.activeSessionId;if(!(!e||this.refreshInFlight)&&this.settings.get().autoLoadWeather&&this.connectivity.isOnline()){this.refreshInFlight=!0;try{await this.sessionService.refreshWeather(e);let i=await this.sessionService.getById(e);i?.weather&&this.evaluateAndAlert(e,i.weather)}finally{this.refreshInFlight=!1}}}evaluateAndAlert(e,i){if(!i||!this.settings.get().showWeatherWarnings)return;let t=this.weatherService.getWarnings(i),r=this.fingerprintsBySession.get(e);r||(r=new Set,this.fingerprintsBySession.set(e,r));let o=N$1(r,t);if(o.length===0)return;let h=o.find(u=>u.severity===`danger`)??o[0];this.notifications.weatherWarning(h.message);for(let u of o.filter(U=>U.severity===`danger`))this.sessionEvents.record({sessionId:e,type:`weather`,description:`Weather alert: ${u.message}`})}static ɵfac=function(i){return new(i||n)};static ɵprov=de$1({token:n,factory:n.ɵfac,providedIn:`root`})};var T$1=class n{pinLock=_(C$1);fishingMode=_(Sa);sessionRepo=_(u);weatherMonitor=_(p);router=_(le$3);readySignal=Oo(!1);dbOpenErrorSignal=Oo(null);dbRecoveryKindSignal=Oo(null);dbRetryingSignal=Oo(!1);initialNavigationDone=!1;postOpenInitDone=!1;pinScreenRedirect;isReady=this.readySignal.asReadonly();dbOpenError=this.dbOpenErrorSignal.asReadonly();dbRecoveryKind=this.dbRecoveryKindSignal.asReadonly();dbRetrying=this.dbRetryingSignal.asReadonly();async initialize(){await this.tryOpenDb()&&this.finishPostOpenInit()}async retryOpenDb(){if(this.readySignal())return!0;this.dbRetryingSignal.set(!0);try{return await this.tryOpenDb()?(this.finishPostOpenInit(),!0):!1}finally{this.dbRetryingSignal.set(!1)}}async tryOpenDb(){try{return await Promise.race([Ky.open(),new Promise((e,i)=>{setTimeout(()=>i(new Error(`IndexedDB open timed out`)),8e3)})]),this.dbOpenErrorSignal.set(null),this.dbRecoveryKindSignal.set(null),!0}catch(e){let i=this.classifyDbOpenError(e),t=e instanceof Error?e.message:String(e);return this.dbRecoveryKindSignal.set(i),this.dbOpenErrorSignal.set(t),rF()&&console.error(`[AppStartup] db.open failed`,i,e),!1}}classifyDbOpenError(e){if((e instanceof Error?e.message:String(e)).includes(`timed out`))return`unknown`;let t=e instanceof Error?e.name:``;return t===`VersionError`?`versionMismatch`:t===`UpgradeError`?`upgradeFailed`:`unknown`}finishPostOpenInit(){if(this.postOpenInitDone){this.readySignal.set(!0);return}this.postOpenInitDone=!0,this.pinLock.initializeFromStorage(),this.weatherMonitor.start(),this.pinLock.subscribeToLockChanges(e=>{e&&(this.pinScreenRedirect=void 0)}),this.readySignal.set(!0),rF()&&console.debug(`[AppStartup] initialized`)}async performInitialNavigation(){if(this.initialNavigationDone)return;this.initialNavigationDone=!0;let e=this.getIntendedPath(),i=await this.resolveInitialRoute(e);rF()&&console.debug(`[AppStartup] initial navigation`,{intendedPath:e,target:i}),this.router.url.split(`?`)[0]!==i.split(`?`)[0]&&await this.router.navigateByUrl(i)}async resolveInitialRoute(e){let i=e??`/`,t=this.pinLock.hasPinConfigured(),r=this.pinLock.isAppLocked();if(i.startsWith(`/pin/`)){if(i.startsWith(`/pin/setup`))return t?r?`/pin/unlock`:this.resolveAfterLeavingPinScreen():`/pin/setup`;if(i.startsWith(`/pin/unlock`))return t?r?`/pin/unlock`:this.resolveAfterLeavingPinScreen():`/pin/setup`}return t?r?(this.storeReturnUrl(i),this.pinScreenRedirect=void 0,`/pin/unlock`):this.resolveUnlockedDestination(i):`/pin/setup`}storeReturnUrl(e){I(e),this.pinScreenRedirect=void 0}consumeReturnUrl(){return D$1()}waitUntilReady(){return this.readySignal()?Promise.resolve():new Promise(e=>{let i=()=>{this.readySignal()?e():setTimeout(i,10)};i()})}getIntendedPath(){let e=window.location.pathname||`/`,i=new URLSearchParams(window.location.search);i.delete(`_reload`);let t=i.toString(),r=t?`${e}?${t}`:e;return e&&e!==`/`?r:`/`}resolveAfterLeavingPinScreen(){return this.pinScreenRedirect||(this.pinScreenRedirect=this.resolveUnlockedDestination(this.consumeReturnUrl())),this.pinScreenRedirect}async resolveUnlockedDestination(e){return e.startsWith(`/pin/`)&&(e=`/`),this.fishingMode.hasMode()?(e.startsWith(`/mode-select`)&&(e=`/`),this.isPreservableDeepLink(e)?e:await this.getActiveSession()?`/sessions/active`:`/`):(this.isPreservableDeepLink(e)&&this.storeReturnUrl(e),`/mode-select`)}isPreservableDeepLink(e){let i=e.split(`?`)[0];return i===`/`||i===``||i===`/mode-select`?!1:!!(i===`/sessions/active`||[`/sessions`,`/lakes`,`/gallery`,`/statistics`,`/settings`,`/profile`,`/release-notes`,`/privacy`,`/assistant`].some(r=>i===r||i.startsWith(r+`/`)))}async getActiveSession(){let e=await this.sessionRepo.getAllActive();if(e.length!==0)return e.length>1&&(console.warn(`[AppStartup] Multiple active sessions found; using most recently updated`,e.map(i=>i.id)),e.sort((i,t)=>new Date(t.updatedAt).getTime()-new Date(i.updatedAt).getTime())),e[0]}static ɵfac=function(i){return new(i||n)};static ɵprov=de$1({token:n,factory:n.ɵfac,providedIn:`root`})};var l=class a{settings=_(h$1);overlayContainer=_(Et);mediaQuery=typeof window<`u`&&window.matchMedia?window.matchMedia(`(prefers-color-scheme: dark)`):null;resolvedTheme=Oo(`dark`);constructor(){Iu(()=>{let t=this.settings.settings().themeMode;this.applyTheme(t)}),this.mediaQuery?.addEventListener(`change`,()=>{this.settings.settings().themeMode===`system`&&this.applyTheme(`system`)})}setTheme(t){this.settings.update({themeMode:t})}getSelectPanelClass(){return this.resolvedTheme()===`dark`?`theme-dark-select-panel`:`theme-light-select-panel`}applyTheme(t){let e=t===`system`?this.mediaQuery?.matches??!0?`dark`:`light`:t;this.resolvedTheme.set(e),document.documentElement.setAttribute(`data-theme`,e),document.documentElement.style.colorScheme=e;let r=this.overlayContainer.getContainerElement();r.classList.remove(`theme-dark`,`theme-light`,`dark-theme`,`light-theme`),r.classList.add(e===`dark`?`theme-dark`:`theme-light`),r.setAttribute(`data-theme`,e),r.style.colorScheme=e;let s=document.querySelector(`meta[name="theme-color"]`);s&&s.setAttribute(`content`,e===`dark`?`#0b0b0b`:`#f7faff`)}static ɵfac=function(e){return new(e||a)};static ɵprov=de$1({token:a,factory:a.ɵfac,providedIn:`root`})};var Ne=`@`;var Te=(()=>{class e{doc;delegate;zone;animationType;moduleImpl;_rendererFactoryPromise=null;scheduler=null;injector=_(re);loadingSchedulerFn=_(Ue,{optional:!0});_engine;constructor(t,i,o,d,v){this.doc=t,this.delegate=i,this.zone=o,this.animationType=d,this.moduleImpl=v}ngOnDestroy(){this._engine?.flush()}loadImpl(){let t=()=>this.moduleImpl??import(`./chunk-xFgbzYtH.js`).then(o=>o),i;return this.loadingSchedulerFn?i=this.loadingSchedulerFn(t):i=t(),i.catch(o=>{throw new N$2(5300,!1)}).then(({ɵcreateEngine:o,ɵAnimationRendererFactory:d})=>{this._engine=o(this.animationType,this.doc);let v=new d(this.delegate,this._engine,this.zone);return this.delegate=v,v})}createRenderer(t,i){let o=this.delegate.createRenderer(t,i);if(o.ɵtype===0)return o;Xp(o);let d=new L(o);return i?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(v=>{let Ie=v.createRenderer(t,i);d.use(Ie),this.scheduler??=this.injector.get(xe$2,null,{optional:!0}),this.scheduler?.notify(10)}).catch(v=>{d.use(o)}),d}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}componentReplaced(t){this._engine?.flush(),this.delegate.componentReplaced?.(t)}static ɵfac=function(i){Zv()};static ɵprov=de$1({token:e,factory:e.ɵfac})}return e})();var L=class{delegate;replay=[];ɵtype=1;constructor(n){this.delegate=n}use(n){if(this.delegate=n,this.replay!==null){for(let t of this.replay)t(n);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(n,t){return this.delegate.createElement(n,t)}createComment(n){return this.delegate.createComment(n)}createText(n){return this.delegate.createText(n)}get destroyNode(){return this.delegate.destroyNode}appendChild(n,t){this.delegate.appendChild(n,t)}insertBefore(n,t,i,o){this.delegate.insertBefore(n,t,i,o)}removeChild(n,t,i,o){this.delegate.removeChild(n,t,i,o)}selectRootElement(n,t){return this.delegate.selectRootElement(n,t)}parentNode(n){return this.delegate.parentNode(n)}nextSibling(n){return this.delegate.nextSibling(n)}setAttribute(n,t,i,o){this.delegate.setAttribute(n,t,i,o)}removeAttribute(n,t,i){this.delegate.removeAttribute(n,t,i)}addClass(n,t){this.delegate.addClass(n,t)}removeClass(n,t){this.delegate.removeClass(n,t)}setStyle(n,t,i,o){this.delegate.setStyle(n,t,i,o)}removeStyle(n,t,i){this.delegate.removeStyle(n,t,i)}setProperty(n,t,i){this.shouldReplay(t)&&this.replay.push(o=>o.setProperty(n,t,i)),this.delegate.setProperty(n,t,i)}setValue(n,t){this.delegate.setValue(n,t)}listen(n,t,i,o){return this.shouldReplay(t)&&this.replay.push(d=>d.listen(n,t,i,o)),this.delegate.listen(n,t,i,o)}shouldReplay(n){return this.replay!==null&&n.startsWith(Ne)}};var Ue=new O(``);function xe(e=`animations`){return Ye(`NgAsyncAnimations`),mo([{provide:fr,useFactory:()=>new Te(_(Ro),_(Bi$1),_(Se$1),e)},{provide:Bg,useValue:e===`noop`?`NoopAnimations`:`BrowserAnimations`}])}var G=async(e,n)=>{let t=_(T$1),i=_(C$1),o=_(le$3);return await t.waitUntilReady(),i.hasPinConfigured()?i.isAppLocked()?(t.storeReturnUrl(n.url),o.createUrlTree([`/pin/unlock`])):!0:o.createUrlTree([`/pin/setup`])};var Ae=async(e,n)=>{let t=_(T$1),i=_(C$1),o=_(Sa),d=_(le$3);return await t.waitUntilReady(),i.hasPinConfigured()?i.isAppLocked()?(t.storeReturnUrl(n.url),d.createUrlTree([`/pin/unlock`])):o.hasMode()?!0:(t.storeReturnUrl(n.url),d.createUrlTree([`/mode-select`])):d.createUrlTree([`/pin/setup`])};var we=async()=>{let e=_(T$1),n=_(Sa),t=_(le$3);return await e.waitUntilReady(),n.hasMode()?t.parseUrl(await e.resolveUnlockedDestination(`/`)):!0};var ke=async()=>{let e=_(u),n=_(le$3);return await e.getActive()?!0:n.createUrlTree([`/`])};var Re=async()=>{let e=_(T$1),n=_(C$1),t=_(le$3);return await e.waitUntilReady(),n.hasPinConfigured()?t.createUrlTree([`/`]):!0};var Pe=async()=>{let e=_(T$1),n=_(C$1),t=_(le$3);if(await e.waitUntilReady(),!n.hasPinConfigured())return t.createUrlTree([`/pin/setup`]);if(!n.isAppLocked()){let i=await e.resolveInitialRoute(`/pin/unlock`);return t.parseUrl(i)}return!0};var Me=[{path:`pin/setup`,loadComponent:()=>import(`./chunk-DBE0uw1Q.js`).then(e=>e.PinSetupComponent),canActivate:[Re]},{path:`pin/unlock`,loadComponent:()=>import(`./chunk-DaRDT5kS.js`).then(e=>e.PinUnlockComponent),canActivate:[Pe]},{path:`mode-select`,loadComponent:()=>import(`./chunk-Clz_9ULl.js`).then(e=>e.ModeSelectComponent),canActivate:[G,we]},{path:``,loadComponent:()=>import(`./chunk-D5WENSCH.js`).then(e=>e.ShellComponent),canActivate:[G,Ae],children:[{path:``,loadComponent:()=>import(`./chunk-bHoBNmI6.js`).then(e=>e.DashboardComponent)},{path:`sessions`,loadComponent:()=>import(`./chunk-B9m1ClpS.js`).then(e=>e.SessionsListComponent)},{path:`sessions/active`,loadComponent:()=>import(`./chunk-C2mZovGe.js`).then(e=>e.ActiveSessionComponent),canActivate:[ke]},{path:`sessions/:id/edit`,loadComponent:()=>import(`./chunk-CAOZQctn.js`).then(e=>e.SessionEditComponent)},{path:`sessions/:id/catches/new`,loadComponent:()=>import(`./chunk-CeL4Bok5.js`).then(e=>e.CatchFormComponent)},{path:`sessions/:id/catches/:catchId/edit`,loadComponent:()=>import(`./chunk-CeL4Bok5.js`).then(e=>e.CatchFormComponent)},{path:`sessions/:id/weather-history`,loadComponent:()=>import(`./chunk-Bur3HBW1.js`).then(e=>e.WeatherHistoryPageComponent)},{path:`sessions/:id`,loadComponent:()=>import(`./chunk-Cd5h6KCV.js`).then(e=>e.SessionDetailComponent)},{path:`lakes`,loadComponent:()=>import(`./chunk-BgY0QsQ2.js`).then(e=>e.LakesListComponent)},{path:`lakes/:id`,loadComponent:()=>import(`./chunk-0YdlX1Dr.js`).then(e=>e.LakeDetailComponent)},{path:`gallery`,loadComponent:()=>import(`./chunk-B-vfdsLL.js`).then(e=>e.GalleryComponent)},{path:`statistics`,loadComponent:()=>import(`./chunk-Cqrs0HNT.js`).then(e=>e.StatisticsComponent)},{path:`assistant`,loadComponent:()=>import(`./chunk-TnaX-aKa.js`).then(e=>e.AssistantComponent)},{path:`settings`,loadComponent:()=>import(`./chunk-BFMfdB3V.js`).then(e=>e.SettingsComponent)},{path:`profile`,loadComponent:()=>import(`./chunk-BOle9pEG.js`).then(e=>e.ProfileComponent)},{path:`profile/documents`,loadComponent:()=>import(`./chunk-C0D5bQ9G.js`).then(e=>e.ProfileDocumentsComponent)},{path:`release-notes`,loadComponent:()=>import(`./chunk-CG4sWJ2k.js`).then(e=>e.ReleaseNotesComponent)},{path:`privacy`,loadComponent:()=>import(`./chunk-DBnf3f7n.js`).then(e=>e.PrivacyComponent)}]},{path:`**`,redirectTo:``}];var N=class e{notifications=_(ut);handleError(n){if(console.error(`[GlobalErrorHandler]`,n),n instanceof Error&&n.message.includes(`NG0100`))return;let t=rF()&&n instanceof Error&&n.message?n.message:`An unexpected error occurred`;this.notifications.error(t)}static ɵfac=function(t){return new(t||e)};static ɵprov=de$1({token:e,factory:e.ɵfac})};function De(e){return()=>e.initialize()}function Ee(){return rF()?!1:!a()}var Fe={providers:[yD(),Oo$1(Me),xe(),ne(`ngsw-worker.js`,{enabled:Ee(),registrationStrategy:`registerWhenStable:30000`}),{provide:St,useValue:{horizontalPosition:`center`,verticalPosition:`bottom`,panelClass:[`app-snackbar`]}},{provide:ft,useValue:{overlayPanelClass:`app-select-panel`}},{provide:Ue$1,useClass:N},{provide:mc,useFactory:De,deps:[T$1],multi:!0}]};function je(e,n){e&1&&(ui$1(0,`p`,7),KI(1),fD(2,`tr`),Ec(),ui$1(3,`p`,12),KI(4),fD(5,`tr`),Ec()),e&2&&(Jy(),Hp(hD(2,2,`dbRecovery.versionMismatch`)),Jy(3),Hp(hD(5,4,`dbRecovery.dataSafe`)))}function Le(e,n){e&1&&(ui$1(0,`p`,7),KI(1),fD(2,`tr`),Ec()),e&2&&(Jy(),Hp(hD(2,1,`dbRecovery.upgradeFailed`)))}function Be(e,n){e&1&&(ui$1(0,`p`,7),KI(1),fD(2,`tr`),Ec()),e&2&&(Jy(),Hp(hD(2,1,`dbRecovery.unknown`)))}function Ge(e,n){if(e&1&&(ui$1(0,`p`,8),KI(1),Ec()),e&2){let t=DI(2);Jy(),Hp(t.detail())}}function Ve(e,n){if(e&1){let t=hI();ui$1(0,`button`,13),bp(`click`,function(){Zl(t);let o=DI(2);return Yl(o.checkForUpdates())}),KI(1),fD(2,`tr`),fD(3,`tr`),Ec()}if(e&2){let t=DI(2);yp(`disabled`,t.checkingUpdates()||t.retrying()),Jy(),wc(` `,t.checkingUpdates()?hD(2,2,`dbRecovery.checkingUpdates`):hD(3,4,`dbRecovery.checkForUpdates`),` `)}}function ze(e,n){if(e&1){let t=hI();ui$1(0,`button`,13),bp(`click`,function(){Zl(t);let o=DI(2);return Yl(o.retry())}),KI(1),fD(2,`tr`),fD(3,`tr`),Ec()}if(e&2){let t=DI(2);yp(`disabled`,t.retrying()||t.checkingUpdates()),Jy(),wc(` `,t.retrying()?hD(2,2,`dbRecovery.retrying`):hD(3,4,`dbRecovery.retry`),` `)}}function He(e,n){if(e&1){let t=hI();ui$1(0,`div`,4)(1,`p`,6),KI(2),fD(3,`tr`),Ec(),rI(4,je,6,6)(5,Le,3,3,`p`,7)(6,Be,3,3,`p`,7),rI(7,Ge,2,1,`p`,8),ui$1(8,`div`,9),rI(9,Ve,4,6,`button`,10)(10,ze,4,6,`button`,10),ui$1(11,`button`,11),bp(`click`,function(){Zl(t);let o=DI();return Yl(o.reload())}),KI(12),fD(13,`tr`),Ec()()()}if(e&2){let t=n,i=DI();Jy(2),Hp(hD(3,6,`dbRecovery.title`)),Jy(2),iI(t===`versionMismatch`?4:t===`upgradeFailed`?5:6),Jy(3),iI(i.detail()?7:-1),Jy(2),iI(t===`versionMismatch`?9:10),Jy(2),yp(`disabled`,i.retrying()||i.checkingUpdates()),Jy(),wc(` `,hD(13,8,`dbRecovery.reload`),` `)}}function We(e,n){e&1&&vp(0,`div`,5)}var T=class e{platformId=_(Hg);startup=_(T$1);swUpdate=_(H);version=Oo(`0.0.0`);checkingUpdates=Oo(!1);recoveryKind=this.startup.dbRecoveryKind;detail=this.startup.dbOpenError;retrying=this.startup.dbRetrying;constructor(){fc(this.platformId)&&this.loadVersion()}async retry(){await this.startup.retryOpenDb()}async checkForUpdates(){this.checkingUpdates.set(!0);try{await this.swUpdate.checkForUpdatesNow(),await this.loadVersion(!1)}finally{this.checkingUpdates.set(!1)}}reload(){v()}async loadVersion(n=!1){try{let t=n?`assets/version.json?ngsw-bypass=true&t=${Date.now()}`:`assets/version.json?t=${Date.now()}`,i=await p$2(t,{cache:`no-store`});if(!i.ok)return;let o=await i.json();typeof o.version==`string`&&o.version.trim()&&this.version.set(o.version)}catch{}}static ɵfac=function(t){return new(t||e)};static ɵcmp=AE({type:e,selectors:[[`app-startup-splash`]],decls:12,vars:13,consts:[[`role`,`status`,`aria-live`,`polite`,1,`splash`],[`src`,`icons/icon-192x192.png`,1,`logo`,3,`alt`],[1,`label`],[1,`version`],[`role`,`alert`,1,`recovery`],[`aria-hidden`,`true`,1,`spinner`],[1,`recovery-title`],[1,`recovery-body`],[1,`recovery-detail`],[1,`recovery-actions`],[`mat-flat-button`,``,`type`,`button`,`color`,`primary`,3,`disabled`],[`mat-stroked-button`,``,`type`,`button`,3,`click`,`disabled`],[1,`recovery-hint`],[`mat-flat-button`,``,`type`,`button`,`color`,`primary`,3,`click`,`disabled`]],template:function(t,i){if(t&1&&(ui$1(0,`div`,0),fD(1,`tr`),fD(2,`tr`),vp(3,`img`,1),fD(4,`tr`),ui$1(5,`p`,2),KI(6),fD(7,`tr`),Ec(),ui$1(8,`p`,3),KI(9),Ec(),rI(10,He,14,10,`div`,4)(11,We,1,0,`div`,5),Ec()),t&2){let o;mp(`aria-label`,i.recoveryKind()?hD(1,5,`dbRecovery.title`):hD(2,7,`splash.loading`)),Jy(3),yp(`alt`,hD(4,9,`splash.logoAlt`)),Jy(3),Hp(hD(7,11,`splash.appName`)),Jy(3),wc(`v`,i.version()),Jy(),iI((o=i.recoveryKind())?10:11,o)}},dependencies:[ly,uy,C$3],styles:[`.splash[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100dvh;background:var(--%NS%background-primary, #0b0b0b);color:var(--%NS%text-primary, #fff);gap:12px;padding:24px;box-sizing:border-box}.logo[_ngcontent-%COMP%]{width:84px;height:84px;border-radius:var(--%NS%radius-lg);box-shadow:0 8px 20px #00000059}.label[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:600;color:var(--%NS%primary, #ff6b00);margin:0}.version[_ngcontent-%COMP%]{font-size:.8rem;color:var(--%NS%text-secondary, #bbb);margin:0;letter-spacing:.02em}.spinner[_ngcontent-%COMP%]{width:32px;height:32px;border:3px solid var(--%NS%border-primary, #333);border-top-color:var(--%NS%primary, #ff6b00);border-radius:50%;animation:_ngcontent-%COMP%_spin .8s linear infinite;margin-top:8px}.recovery[_ngcontent-%COMP%]{max-width:28rem;text-align:center;margin-top:8px;display:flex;flex-direction:column;gap:8px}.recovery-title[_ngcontent-%COMP%]{margin:0;font-size:1rem;font-weight:600}.recovery-body[_ngcontent-%COMP%], .recovery-hint[_ngcontent-%COMP%]{margin:0;font-size:.9rem;color:var(--%NS%text-secondary, #bbb);line-height:1.4}.recovery-detail[_ngcontent-%COMP%]{margin:0;font-size:.75rem;color:var(--%NS%text-secondary, #888);word-break:break-word}.recovery-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:8px}@keyframes _ngcontent-%COMP%_spin{to{transform:rotate(360deg)}}`],changeDetection:1})};function Ke(e,n){e&1&&vp(0,`app-startup-splash`)}function Ze(e,n){e&1&&vp(0,`router-outlet`)}var U=class e{startup=_(T$1);constructor(){_(l),_(m$1),_(H),_(l$1),Iu(()=>{this.startup.isReady()&&this.startup.performInitialNavigation()})}static ɵfac=function(t){return new(t||e)};static ɵcmp=AE({type:e,selectors:[[`app-root`]],decls:2,vars:1,template:function(t,i){t&1&&rI(0,Ke,1,0,`app-startup-splash`)(1,Ze,1,0,`router-outlet`),t&2&&iI(i.startup.isReady()?1:0)},dependencies:[dr$1,T],styles:[`[_nghost-%COMP%]{display:block;height:100dvh}`],changeDetection:1})};Bd(U,Fe).catch(e=>console.error(e));export{Oi as A,ht as B,wn as C,Ho as D,Bo as E,Ui as F,pr as G,mi as H,Wn as I,ui as J,q$1 as K,gi as L,Qt as M,Re$1 as N,J as O,Rn as P,gn as R,ue as S,Bi as T,nt as U,ki as V,oo as W,yr as X,vr as Y,l$1 as Z,it as _,U$1 as a,pe as b,F$1 as c,H as d,ut as f,he as g,Cn as h,T$2 as i,On as j,Li as k,V as l,a as m,T$1 as n,C as o,d as p,qi as q,F as r,D as s,l as t,C$1 as u,me as v,Ai as w,te as x,ot as y,hr as z};