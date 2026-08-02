import{a as Yt,b as Jt,c as Qt}from"./chunk-PUL5ECRE.js";import{a as Zt}from"./chunk-BXTNG6L4.js";import{a as ge}from"./chunk-EFBVWBIC.js";import{c as Et}from"./chunk-I75OS2ZN.js";import{a as se}from"./chunk-PPSNERJT.js";import{a as zt,b as Ht}from"./chunk-NT2YBTHP.js";import{a as Kt}from"./chunk-KFP5B7GV.js";import{a as jt}from"./chunk-E2XD5CJX.js";import{a as Vt}from"./chunk-NVPVMZK6.js";import"./chunk-UFMTHTCO.js";import"./chunk-JO5QEITD.js";import{a as Ut}from"./chunk-EEDWE5QS.js";import{a as Gt,b as Xt}from"./chunk-FKWKIS5I.js";import{a as qt}from"./chunk-SW32I25H.js";import{a as Nt}from"./chunk-356HQFAN.js";import{a as $t}from"./chunk-BTJRGHHR.js";import{d as bt,i as wt,j as St}from"./chunk-QTXM5H6X.js";import{a as lt,c as dt,d as ct,g as pt,i as mt,j as gt,o as ht,p as ut,q as vt,r as ft,v as _t,y as yt}from"./chunk-XFUQM5TX.js";import{a as Ft}from"./chunk-NDUPLQPH.js";import"./chunk-VHU42FZC.js";import{a as Lt}from"./chunk-42EL6DA4.js";import{b as Tt}from"./chunk-AKFYPRU5.js";import"./chunk-4HUU5M2D.js";import{c as Wt}from"./chunk-C3G2TMVW.js";import{a as he}from"./chunk-NCOX7WRR.js";import"./chunk-GQ5OOUOY.js";import{a as oe,b as Bt,c as pe,d as me,e as Pt}from"./chunk-BADP3XNF.js";import{a as Dt}from"./chunk-BSTZOGYO.js";import"./chunk-6S624IVU.js";import"./chunk-UILBAVU3.js";import{d as Je,e as Qe}from"./chunk-MUUD632R.js";import"./chunk-MVBERM2C.js";import{a as re,b as le,c as de}from"./chunk-AN5UL4MR.js";import{a as Rt,b as ce}from"./chunk-K6BSEG2V.js";import{$ as Mt,E as tt,P as it,R as nt,T as at,U as st,X as rt,Y as ot,_ as xt,aa as It,ba as Se,fa as ke,ha as _,ia as U,q as Ze,r as et}from"./chunk-UVSPDF3I.js";import{j as k}from"./chunk-I3IB64RX.js";import{g as kt,i as Ct,j as w,n as ae,r as At,s as Ot}from"./chunk-A6NU4TKN.js";import{Aa as Fe,Ab as O,Cb as Z,Db as H,Dc as Ge,Eb as K,Fb as h,Gb as t,Hb as n,Ib as B,Jc as Xe,Lc as F,Mb as ee,Mc as Ye,Nb as We,Qb as g,Sb as M,Tb as ze,Ub as He,Wa as e,Wb as Ke,Xb as Ue,Y as Re,Yb as Ne,Z as X,_ as Pe,a as V,aa as De,ac as Ve,b as be,ba as T,ca as u,cc as we,dc as je,ec as s,fc as c,gc as y,ha as Y,hc as $e,ia as J,ja as Ae,jb as Q,kb as Le,kc as te,lc as ie,mc as ne,pa as ye,pc as qe,ta as D,tc as r,uc as o,xa as Oe,yb as z,zb as A}from"./chunk-GH2SYADN.js";var ri=["switch"],oi=["*"];function li(m,l){m&1&&(t(0,"span",11),Ae(),t(1,"svg",13),B(2,"path",14),n(),t(3,"svg",15),B(4,"path",16),n()())}var di=new De("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),ue=class{source;checked;constructor(l,a){this.source=l,this.checked=a}},xe=(()=>{class m{_elementRef=u(Fe);_focusMonitor=u(Ze);_changeDetectorRef=u(Xe);defaults=u(di);_onChange=a=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(a){return new ue(this,a)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=nt();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(a){this._checked=a,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new ye;toggleChange=new ye;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(et).load(st);let a=u(new Ge("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=a==null?0:parseInt(a)||0,this.color=i.color||"accent",this.id=this._uniqueId=u(tt).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(a=>{a==="keyboard"||a==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):a||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(a){a.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(a){this.checked=!!a}registerOnChange(a){this._onChange=a}registerOnTouched(a){this._onTouched=a}validate(a){return this.required&&a.value!==!0?{required:!0}:null}registerOnValidatorChange(a){this._validatorOnChange=a}setDisabledState(a){this.disabled=a,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new ue(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||m)};static \u0275cmp=Q({type:m,selectors:[["mat-slide-toggle"]],viewQuery:function(i,d){if(i&1&&Ke(ri,5),i&2){let p;Ue(p=Ne())&&(d._switchElement=p.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,d){i&2&&(We("id",d.id),z("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),je(d.color?"mat-"+d.color:""),we("mat-mdc-slide-toggle-focused",d._focused)("mat-mdc-slide-toggle-checked",d.checked)("_mat-animation-noopable",d._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",F],color:"color",disabled:[2,"disabled","disabled",F],disableRipple:[2,"disableRipple","disableRipple",F],tabIndex:[2,"tabIndex","tabIndex",a=>a==null?0:Ye(a)],checked:[2,"checked","checked",F],hideIcon:[2,"hideIcon","hideIcon",F],disabledInteractive:[2,"disabledInteractive","disabledInteractive",F]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[qe([{provide:lt,useExisting:Re(()=>m),multi:!0},{provide:ct,useExisting:m,multi:!0}]),Oe],ngContentSelectors:oi,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,d){if(i&1&&(ze(),t(0,"div",1)(1,"button",2,0),g("click",function(){return d._handleClick()}),B(3,"div",3)(4,"span",4),t(5,"span",5)(6,"span",6)(7,"span",7),B(8,"span",8),n(),t(9,"span",9),B(10,"span",10),n(),A(11,li,5,0,"span",11),n()()(),t(12,"label",12),g("click",function(C){return C.stopPropagation()}),He(13),n()()),i&2){let p=Ve(2);h("labelPosition",d.labelPosition),e(),we("mdc-switch--selected",d.checked)("mdc-switch--unselected",!d.checked)("mdc-switch--checked",d.checked)("mdc-switch--disabled",d.disabled)("mat-mdc-slide-toggle-disabled-interactive",d.disabledInteractive),h("tabIndex",d.disabled&&!d.disabledInteractive?-1:d.tabIndex)("disabled",d.disabled&&!d.disabledInteractive),z("id",d.buttonId)("name",d.name)("aria-label",d.ariaLabel)("aria-labelledby",d._getAriaLabelledBy())("aria-describedby",d.ariaDescribedby)("aria-required",d.required||null)("aria-checked",d.checked)("aria-disabled",d.disabled&&d.disabledInteractive?"true":null),e(9),h("matRippleTrigger",p)("matRippleDisabled",d.disableRipple||d.disabled)("matRippleCentered",!0),e(),O(d.hideIcon?-1:11),e(),h("for",d.buttonId),z("id",d._labelId)}},dependencies:[at,Yt],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return m})(),ei=(()=>{class m{static \u0275fac=function(i){return new(i||m)};static \u0275mod=Le({type:m});static \u0275inj=Pe({imports:[xe,it]})}return m})();var ve=class m{settings=u(ae);fishingMode=u(U);vault=u(se);theme=u(he);filterService=u(Lt);userOptions=u(ge);imageService=u(ce);sessionRepo=u(re);catchRepo=u(le);lakeRepo=u(de);imageRepo=u(Rt);biteEventRepo=u(pe);fishSpottedRepo=u(me);rodSpotHistoryRepo=u(Pt);sessionEventRepo=u(oe);sessionWeatherRepo=u(Dt);userOptionRepo=u(Ft);chatRepo=u(Vt);async resetCustomOptionsCategory(l,a=!0){await this.userOptions.resetCategory(l,a)}async resetAllCustomOptions(l=!0){await this.userOptions.resetAllCustom(l)}async restoreDefaultOptions(l){await this.userOptions.restoreDefaults(l)}resetFilters(){this.filterService.clearActive(),this.clearFilterPresetKeys()}async resetAppearance(l){this.theme.setTheme(w.themeMode),this.settings.update({gallerySortDefault:w.gallerySortDefault,galleryThumbnailSize:w.galleryThumbnailSize,galleryFavoritesFirst:w.galleryFavoritesFirst}),l?.clearHomepage!==!1&&this.fishingMode.hasMode()&&await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(Se),this.settings.update({detailedWeatherEnabled:w.detailedWeatherEnabled,autoLoadWeather:w.autoLoadWeather,weatherRefreshMinutes:w.weatherRefreshMinutes,useGpsForWeather:w.useGpsForWeather,showWeatherWarnings:w.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:w.lockTimeoutMinutes})}async resetAllSettings(){let l=this.settings.get(),a=l.pinHash,i=l.pinSalt,d=l.pinEnabled,p=l.modePreferences??{};this.settings.replace(be(V({},w),{pinHash:a,pinSalt:i,pinEnabled:d,modePreferences:p})),await this.vault.clearAiApiKey(),this.resetFilters(),await this.resetAppearance({clearHomepage:!1}),this.resetWeather(),this.resetSecurity()}async resetCurrentMode(){let l=this.fishingMode.requireMode();await _.transaction("rw",[_.sessions,_.catches,_.lakes,_.images,_.biteEvents,_.fishSpottedEvents,_.rodSpotHistory,_.sessionEvents,_.sessionWeather,_.userOptions,_.chatThreads,_.chatMessages],async()=>{await this.sessionRepo.clearCurrentMode(),await this.catchRepo.clearCurrentMode(),await this.lakeRepo.clearCurrentMode(),await this.imageRepo.clearCurrentMode(),await this.biteEventRepo.clearCurrentMode(),await this.fishSpottedRepo.clearCurrentMode(),await this.rodSpotHistoryRepo.clearCurrentMode(),await this.sessionEventRepo.clearCurrentMode(),await this.sessionWeatherRepo.clearCurrentMode(),await this.userOptionRepo.clearCurrentMode(),await this.chatRepo.clearCurrentMode()}),this.filterService.clearActive(),localStorage.removeItem(`${ke}:${l}`),this.fishingMode.updatePreferences(l,Ct(l)),await this.userOptions.ensureDefaultsForCurrentMode()}async resetFullApplication(){await _.transaction("rw",[_.sessions,_.catches,_.lakes,_.images,_.profiles,_.profileDocuments,_.biteEvents,_.fishSpottedEvents,_.rodSpotHistory,_.sessionEvents,_.sessionWeather,_.userOptions,_.chatThreads,_.chatMessages],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await _.profiles.clear(),await _.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.sessionWeatherRepo.clear(),await this.userOptionRepo.clear(),await this.chatRepo.clear()}),this.clearFilterPresetKeys(),localStorage.removeItem(Se),localStorage.removeItem(xt);try{sessionStorage.removeItem(Mt),sessionStorage.removeItem(It)}catch{}this.clearExpandStates(),this.settings.replace(be(V({},w),{modePreferences:{}})),this.vault.lock(),this.fishingMode.clearMode()}clearFilterPresetKeys(){let l=[];for(let a=0;a<localStorage.length;a++){let i=localStorage.key(a);(i==="fish-tracker-filter-presets"||i?.startsWith(`${ke}:`))&&l.push(i)}for(let a of l)localStorage.removeItem(a)}clearExpandStates(){let l=[];for(let a=0;a<localStorage.length;a++){let i=localStorage.key(a);i?.startsWith("expand-")&&l.push(i)}for(let a of l)localStorage.removeItem(a)}static \u0275fac=function(a){return new(a||m)};static \u0275prov=X({token:m,factory:m.\u0275fac,providedIn:"root"})};var fe=class m{constructor(l,a,i,d,p,C,j){this.lakes=l;this.sessions=a;this.catches=i;this.bites=d;this.fishSpotted=p;this.sessionEvents=C;this.fishingMode=j}lakes;sessions;catches;bites;fishSpotted;sessionEvents;fishingMode;async generateForActiveMode(){let l=this.fishingMode.requireMode(),a=kt[l],i=a.favoriteSpecies,d=a.favoriteBaits,p=a.favoriteRigs,C=Date.now(),j=[{name:"Demo Lake North",country:"NL",latitude:52.37,longitude:4.89,address:"Amsterdam area",isFavorite:!0,spots:[{name:"Dam wall",waterDepthM:3.2,bottomType:"Clay"},{name:"Reed bed",waterDepthM:1.8,bottomType:"Silt"},{name:"Far margin",waterDepthM:2.5,bottomType:"Gravel"}]},{name:"Demo Lake South",country:"BE",latitude:51.05,longitude:3.72,address:"Ghent area",isFavorite:!1,spots:[{name:"Point",waterDepthM:4,bottomType:"Sand"},{name:"Bay",waterDepthM:2.1,bottomType:"Mud"}]},{name:"Demo Canal Stretch",country:"NL",latitude:51.92,longitude:5.57,address:"Riverland",isFavorite:!0,spots:[{name:"Bridge peg",waterDepthM:2.8,bottomType:"Gravel"},{name:"Tree line",waterDepthM:1.5,bottomType:"Silt"}]}],S=[];for(let f of j){let x=k(),I=pi(C,40+S.length*3),L=f.spots.map(W=>({id:k(),name:W.name,waterDepthM:W.waterDepthM,bottomType:W.bottomType,isFavorite:!1,visible:!0})),R={id:x,name:f.name,address:f.address,country:f.country,latitude:f.latitude,longitude:f.longitude,isFavorite:f.isFavorite,description:`Sample ${l} venue for AI testing`,averageDepthM:2.5,maximumDepthM:5,surfaceAreaHa:12+S.length*4,spots:L,photoIds:[],visible:!0,createdAt:I,updatedAt:I};await this.lakes.put(R),S.push(R)}this.fishingMode.updateActivePreferences({lastLakeId:S[0].id});let ai=[{lake:S[0],daysAgo:28,durationHours:48,rodCount:3,catchCount:4,name:"Weekend North Bank",status:"completed"},{lake:S[0],daysAgo:18,durationHours:12,rodCount:2,catchCount:2,name:"Evening reeds",status:"completed"},{lake:S[1],daysAgo:12,durationHours:36,rodCount:4,catchCount:5,name:"South bay campaign",status:"completed"},{lake:S[2],daysAgo:6,durationHours:8,rodCount:2,catchCount:1,name:"Canal day trip",status:"completed"},{lake:S[1],daysAgo:2,durationHours:24,rodCount:3,catchCount:3,name:"Cold front session",status:"completed"},{lake:S[0],daysAgo:0,durationHours:0,rodCount:2,catchCount:0,name:"Planned demo trip",status:"planned"}],Me=0,Ie=0,Ee=0,Te=0;for(let f of ai){let x=k(),I=C-f.daysAgo*24*60*60*1e3,L=new Date(I).toISOString(),R=f.status==="completed"?new Date(I+f.durationHours*60*60*1e3).toISOString():void 0,W=f.lake.spots,$=W.slice(0,Math.min(2,W.length)).map(v=>({id:k(),lakeSpotId:v.id,name:v.name,latitude:f.lake.latitude,longitude:f.lake.longitude,depth:v.waterDepthM,bottomType:v.bottomType,visible:!0})),P=[];for(let v=1;v<=f.rodCount;v++){let b=$[(v-1)%Math.max($.length,1)];P.push({id:k(),sessionId:x,rodNumber:v,name:`Rod ${v}`,sessionSpotId:b?.id,bait:d[(v-1)%d.length],rig:p[(v-1)%p.length],castAt:f.status==="planned"?void 0:L,biteCount:0,fishSpottedCount:0,isActive:!0,visible:!0})}let q=[];for(let v=0;v<f.catchCount;v++){let b=P[v%P.length],E=new Date(I+(v+1)/(f.catchCount+1)*f.durationHours*60*60*1e3).toISOString(),N=ti(1.2+(v*1.7+f.rodCount)%9),_e={id:k(),sessionId:x,rodId:b.id,sessionSpotId:b.sessionSpotId,species:i[v%i.length],caughtAt:E,weightKg:N,lengthCm:Math.round(35+N*8),bait:b.bait??d[v%d.length],rig:b.rig??p[v%p.length],method:v%2===0?"Bottom":"Margin",released:v%3!==0,isPersonalRecord:v===0&&f.catchCount>=3,notes:v===0?"Demo catch for AI context":void 0,latitude:f.lake.latitude,longitude:f.lake.longitude,waterDepthM:$[0]?.depth,visible:!0,createdAt:E,updatedAt:E};q.push(_e),await this.catches.put(_e),Me+=1,await this.sessionEvents.put({id:k(),sessionId:x,type:"catch",description:`${_e.species} ${N}kg`,rodId:b.id,sessionSpotId:b.sessionSpotId,occurredAt:E,visible:!0})}for(let v=0;v<Math.min(f.rodCount,3)&&f.status!=="planned";v++){let b=P[v],E=new Date(I+(v+1)*90*60*1e3).toISOString(),N={id:k(),sessionId:x,rodId:b.id,sessionSpotId:b.sessionSpotId,occurredAt:E,notes:"Demo bite",visible:!0};await this.bites.put(N),b.biteCount+=1,Ie+=1}if(f.status!=="planned"&&P.length>0){let v=P[0],b=new Date(I+10800*1e3).toISOString(),E={id:k(),sessionId:x,rodId:v.id,sessionSpotId:v.sessionSpotId,latitude:f.lake.latitude,longitude:f.lake.longitude,spottedAt:b,notes:"Shows near far margin",visible:!0};await this.fishSpotted.put(E),v.fishSpottedCount+=1,Ee+=1}let si=q.reduce((v,b)=>v+(b.weightKg??0),0),Be=q.reduce((v,b)=>Math.max(v,b.weightKg??0),0),G={id:x,name:f.name,lakeId:f.lake.id,status:f.status,startDate:f.status==="planned"?new Date(C+4320*60*1e3).toISOString():L,endDate:R,latitude:f.lake.latitude,longitude:f.lake.longitude,waterTemperatureC:12+f.daysAgo%8,prebait:d[0],notes:`Demo ${l} session for assistant testing`,tags:["demo",l],sessionSpots:$,rods:P,photoIds:[],catchCount:q.length,biggestFishKg:Be>0?Be:void 0,totalCatchWeightKg:ti(si),visible:!0,createdAt:L,updatedAt:R??L};await this.sessions.put(G),Te+=1,await this.sessionEvents.put({id:k(),sessionId:x,type:"session-start",description:`${G.name} started`,occurredAt:G.startDate,visible:!0}),R&&await this.sessionEvents.put({id:k(),sessionId:x,type:"session-end",description:`${G.name} completed`,occurredAt:R,visible:!0})}return{lakes:S.length,sessions:Te,catches:Me,bites:Ie,fishSpotted:Ee}}static \u0275fac=function(a){return new(a||m)(T(de),T(re),T(le),T(pe),T(me),T(oe),T(U))};static \u0275prov=X({token:m,factory:m.\u0275fac,providedIn:"root"})};function pi(m,l){return new Date(m-l*24*60*60*1e3).toISOString()}function ti(m){return Math.round(m*10)/10}var ni=(m,l)=>l.id;function mi(m,l){if(m&1&&(t(0,"mat-option",11),s(1),n()),m&2){let a=l.$implicit,i=M();h("value",a),e(),c(i.languageLabel(a))}}function gi(m,l){if(m&1&&(t(0,"mat-option",11),s(1),n()),m&2){let a=l.$implicit;h("value",a.id),e(),c(a.name)}}function hi(m,l){if(m&1){let a=ee();t(0,"li",73)(1,"span",74),s(2),n(),t(3,"button",35),g("click",function(){let d=Y(a).$implicit,p=M(3);return J(p.renameOption(d))}),s(4),r(5,"tr"),n()()}if(m&2){let a=l.$implicit;e(2),c(a.value),e(2),y(" ",o(5,2,"common.rename")," ")}}function ui(m,l){if(m&1&&(t(0,"div",70)(1,"h4",71),s(2),n(),t(3,"ul",72),H(4,hi,6,4,"li",73,ni),n()()),m&2){let a=M().$implicit,i=M();e(2),c(i.categoryLabel(a)),e(2),K(i.managedOptions()[a])}}function vi(m,l){if(m&1&&A(0,ui,6,1,"div",70),m&2){let a=l.$implicit,i=M();O(i.managedOptions()[a].length>0?0:-1)}}function fi(m,l){if(m&1){let a=ee();t(0,"button",35),g("click",function(){let d=Y(a).$implicit,p=M();return J(p.resetOptionCategory(d))}),s(1),r(2,"tr"),n()}if(m&2){let a=l.$implicit,i=M();e(),$e("",o(2,2,"common.reset")," ",i.categoryLabel(a))}}function _i(m,l){if(m&1){let a=ee();t(0,"button",35),g("click",function(){Y(a);let d=M();return J(d.installApp())}),s(1),r(2,"tr"),n()}m&2&&(e(),c(o(2,1,"settings.installApp")))}function bi(m,l){m&1&&(t(0,"p",38),s(1),r(2,"tr"),n()),m&2&&(e(),c(o(2,1,"settings.iosInstallHint")))}function yi(m,l){if(m&1&&(t(0,"p",69),s(1),n()),m&2){let a=M();e(),c(a.message())}}var wi=50*1024*1024,ii=class m{settingsService=u(ae);backupService=u(jt);pinLock=u(Et);vault=u(se);confirm=u($t);theme=u(he);imageService=u(ce);photoPick=u(Kt);weatherService=u(Bt);lakeService=u(qt);notifications=u(Tt);resetService=u(ve);demoData=u(fe);i18n=u(At);pwaInstall=u(Zt);share=u(Ht);userOptions=u(ge);fishingMode=u(U);router=u(Je);settings=this.settingsService.settings;modePreferences=()=>this.fishingMode.getActivePreferences();aiApiKey=this.vault.aiApiKey;supportedLanguages=this.i18n.supportedLanguages;lakes=Wt(this.lakeService.watchAll(),{initialValue:[]});message=D("");exporting=D(!1);generatingDemo=D(!1);changingHomepage=D(!1);fullResetInput=D("");managedOptions=D({species:[],bait:[],baitFlavor:[],rig:[],hookSize:[],lineType:[],method:[],weatherType:[],tag:[]});optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";ngOnInit(){this.reloadManagedOptions()}updateUnits(l,a){this.settingsService.update({[l]:a})}updateTheme(l){this.theme.setTheme(l)}updateLanguage(l){this.i18n.setLanguage(l)}async installApp(){await this.pwaInstall.promptInstall()}sendFeedback(){zt(this.i18n.t("settings.feedbackSubject"))}shareViaWhatsApp(){this.share.shareAppViaWhatsApp()}updateSetting(l,a){this.settingsService.update({[l]:a})}updateDefaultLake(l){this.fishingMode.updateActivePreferences({defaultLakeId:l})}updateLockTimeout(l){this.settingsService.update({lockTimeoutMinutes:l})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let l=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(l?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}logout(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let l=await this.backupService.export();this.backupService.downloadJson(l),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async generateDemoData(){if(await this.confirm.confirm({title:this.i18n.t("settings.generateDemoTitle"),message:this.i18n.t("settings.generateDemoMessage"),confirmLabel:this.i18n.t("settings.generateDemoConfirm")})){this.generatingDemo.set(!0);try{let a=await this.demoData.generateForActiveMode();this.notifications.success(this.i18n.t("settings.generateDemoSuccess",{lakes:String(a.lakes),sessions:String(a.sessions),catches:String(a.catches)}))}catch(a){console.error("[Settings] Demo data generation failed",a),this.notifications.error(this.i18n.t("settings.generateDemoFailed"))}finally{this.generatingDemo.set(!1)}}}async importBackup(l){let a=l.target,i=a.files?.[0];if(i){try{if(i.size>wi)throw new Error("Backup file is too large");let d=await i.text(),p=JSON.parse(d),C=this.backupService.validate(p),j=this.i18n.t("settings.importPreview",{sessions:String(C.sessionCount),catches:String(C.catchCount),lakes:String(C.lakeCount),images:String(C.imageCount)});if(!await this.confirm.confirm({title:this.i18n.t("settings.importConfirmTitle"),message:`${j}

${this.i18n.t("settings.importConfirmMessage")}`,confirmLabel:this.i18n.t("common.import")})){a.value="";return}await this.backupService.import(p),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}a.value=""}}clearWeatherCache(){this.weatherService.clearCache(),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}updateAiApiKey(l){this.vault.setAiApiKey(l||void 0)}clearAiKey(){this.vault.clearAiApiKey().then(()=>{this.notifications.success(this.i18n.t("settings.aiKeyCleared"))})}async changeHomepageImage(){if(this.changingHomepage())return;let l=await this.photoPick.pickImage({capture:!1});if(l){this.changingHomepage.set(!0);try{let a=await this.imageService.processFile(l,"cover");await this.imageService.setHomepageImage(a),this.notifications.success(this.i18n.t("gallery.homepageUpdated"))}catch{this.notifications.error(this.i18n.t("images.uploadFailed"))}finally{this.changingHomepage.set(!1)}}}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(l){let a=this.categoryLabel(l);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${a}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(l,!0),await this.reloadManagedOptions(),this.notifications.success(`${a} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),await this.reloadManagedOptions(),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async renameOption(l){let a=window.prompt(this.i18n.t("settings.renameOptionPrompt",{value:l.value}),l.value);if(a==null)return;let i=a.trim();if(!(!i||i===l.value))try{await this.userOptions.rename(l.id,i),await this.reloadManagedOptions(),this.notifications.success(this.i18n.t("settings.optionRenamed"))}catch(d){console.error("[Settings] rename option failed",d),this.notifications.error(this.i18n.t("common.errorGeneric"))}}async reloadManagedOptions(){let l=V({},this.managedOptions());for(let a of this.optionCategories)l[a]=await this.userOptions.getSortedOptions(a);this.managedOptions.set(l)}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetCurrentMode(){await this.confirm.confirm({title:this.i18n.t("settings.resetCurrentModeTitle"),message:this.i18n.t("settings.resetCurrentModeMessage"),confirmLabel:this.i18n.t("settings.resetCurrentModeConfirm")})&&(await this.resetService.resetCurrentMode(),await this.reloadManagedOptions(),this.notifications.success(this.i18n.t("settings.currentModeReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")),await this.router.navigateByUrl("/mode-select"))}languageLabel(l){return l==="nl"?"Nederlands":l==="en"?"English":"Deutsch"}categoryLabel(l){return this.i18n.t(`options.category.${l}`)}static \u0275fac=function(a){return new(a||m)};static \u0275cmp=Q({type:m,selectors:[["app-settings"]],decls:408,vars:352,consts:[["title","common.settings"],[1,"section","app-card"],["sectionId","settings-appearance","persistKey","settings-appearance","label","appearance",3,"defaultExpanded","flat"],["expandHeader",""],[1,"section-title"],[1,"submenu-content"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],[1,"theme-preview"],["sectionId","settings-units","persistKey","settings-units","label","units",3,"flat"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["sectionId","settings-general","persistKey","settings-general","label","general",3,"flat"],["value",""],["matInput","","type","number",3,"ngModelChange","ngModel"],["value","24h"],["value","12h"],["sectionId","settings-gallery","persistKey","settings-gallery","label","gallery",3,"flat"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["mat-stroked-button","","type","button",3,"click","disabled"],["mat-stroked-button","","type","button",3,"click"],["sectionId","settings-weather","persistKey","settings-weather","label","weather",3,"flat"],["sectionId","settings-assistant","persistKey","settings-assistant","label","assistant",3,"flat"],[1,"hint"],[1,"hint","warn-hint"],["matInput","","type","password","autocomplete","off",3,"ngModelChange","ngModel"],["matInput","",3,"ngModelChange","ngModel"],["mat-stroked-button","","routerLink","/assistant"],["sectionId","settings-security","persistKey","settings-security","label","security",3,"flat"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],[1,"action-row"],["sectionId","settings-data","persistKey","settings-data","label","data",3,"flat"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],[1,"reset-desc"],["sectionId","settings-reset","persistKey","settings-reset","label","reset",3,"flat"],[1,"subsection"],[1,"manage-options"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["mat-stroked-button","","color","warn","type","button",3,"click"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],[1,"section","app-card","about"],["sectionId","settings-about","persistKey","settings-about","label","about",3,"flat"],["routerLink","/profile"],["routerLink","/profile/documents"],["routerLink","/privacy"],["mat-stroked-button","","routerLink","/privacy"],["sectionId","settings-changelog","persistKey","settings-changelog","label","changelog",3,"flat"],["mat-stroked-button","","routerLink","/release-notes"],[1,"message"],[1,"manage-category"],[1,"manage-category-title"],[1,"option-list"],[1,"option-row"],[1,"option-value"]],template:function(a,i){a&1&&(B(0,"app-page-title",0),t(1,"section",1)(2,"app-expandable-section",2)(3,"div",3)(4,"h2",4),s(5),r(6,"tr"),n()(),t(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),s(10),r(11,"tr"),n(),t(12,"mat-select",7),g("ngModelChange",function(p){return i.updateTheme(p)}),t(13,"mat-option",8),s(14),r(15,"tr"),n(),t(16,"mat-option",9),s(17),r(18,"tr"),n(),t(19,"mat-option",10),s(20),r(21,"tr"),n()()(),t(22,"mat-form-field",6)(23,"mat-label"),s(24),r(25,"tr"),n(),t(26,"mat-select",7),g("ngModelChange",function(p){return i.updateLanguage(p)}),H(27,mi,2,2,"mat-option",11,Z),n()(),t(29,"div",12),s(30),r(31,"tr"),n()()()(),t(32,"section",1)(33,"app-expandable-section",13)(34,"div",3)(35,"h2",4),s(36),r(37,"tr"),n()(),t(38,"div",5)(39,"mat-form-field",6)(40,"mat-label"),s(41),r(42,"tr"),n(),t(43,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("weightUnit",p)}),t(44,"mat-option",14),s(45),r(46,"tr"),n(),t(47,"mat-option",15),s(48),r(49,"tr"),n()()(),t(50,"mat-form-field",6)(51,"mat-label"),s(52),r(53,"tr"),n(),t(54,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("lengthUnit",p)}),t(55,"mat-option",16),s(56),r(57,"tr"),n(),t(58,"mat-option",17),s(59),r(60,"tr"),n()()(),t(61,"mat-form-field",6)(62,"mat-label"),s(63),r(64,"tr"),n(),t(65,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("temperatureUnit",p)}),t(66,"mat-option",18),s(67),r(68,"tr"),n(),t(69,"mat-option",19),s(70),r(71,"tr"),n()()(),t(72,"mat-form-field",6)(73,"mat-label"),s(74),r(75,"tr"),n(),t(76,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("distanceUnit",p)}),t(77,"mat-option",20),s(78),r(79,"tr"),n(),t(80,"mat-option",21),s(81),r(82,"tr"),n()()()()()(),t(83,"section",1)(84,"app-expandable-section",22)(85,"div",3)(86,"h2",4),s(87),r(88,"tr"),n()(),t(89,"div",5)(90,"mat-form-field",6)(91,"mat-label"),s(92),r(93,"tr"),n(),t(94,"mat-select",7),g("ngModelChange",function(p){return i.updateDefaultLake(p||void 0)}),t(95,"mat-option",23),s(96),r(97,"tr"),n(),H(98,gi,2,2,"mat-option",11,ni),n()(),t(100,"mat-form-field",6)(101,"mat-label"),s(102),r(103,"tr"),n(),t(104,"input",24),g("ngModelChange",function(p){return i.updateSetting("maxRodCount",+p)}),n()(),t(105,"mat-form-field",6)(106,"mat-label"),s(107),r(108,"tr"),n(),t(109,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("timeFormat",p)}),t(110,"mat-option",25),s(111),r(112,"tr"),n(),t(113,"mat-option",26),s(114),r(115,"tr"),n()()(),t(116,"mat-form-field",6)(117,"mat-label"),s(118),r(119,"tr"),n(),t(120,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("firstDayOfWeek",p===0?0:1)}),t(121,"mat-option",11),s(122),r(123,"tr"),n(),t(124,"mat-option",11),s(125),r(126,"tr"),n()()()()()(),t(127,"section",1)(128,"app-expandable-section",27)(129,"div",3)(130,"h2",4),s(131),r(132,"tr"),n()(),t(133,"div",5)(134,"mat-form-field",6)(135,"mat-label"),s(136),r(137,"tr"),n(),t(138,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("gallerySortDefault",p)}),t(139,"mat-option",28),s(140),r(141,"tr"),n(),t(142,"mat-option",29),s(143),r(144,"tr"),n(),t(145,"mat-option",30),s(146),r(147,"tr"),n()()(),t(148,"mat-form-field",6)(149,"mat-label"),s(150),r(151,"tr"),n(),t(152,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("galleryThumbnailSize",p)}),t(153,"mat-option",31),s(154),r(155,"tr"),n(),t(156,"mat-option",32),s(157),r(158,"tr"),n(),t(159,"mat-option",33),s(160),r(161,"tr"),n()()(),t(162,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("galleryFavoritesFirst",p)}),s(163),r(164,"tr"),n(),t(165,"button",34),g("click",function(){return i.changeHomepageImage()}),s(166),r(167,"tr"),n(),t(168,"button",35),g("click",function(){return i.clearHomepageImage()}),s(169),r(170,"tr"),n()()()(),t(171,"section",1)(172,"app-expandable-section",36)(173,"div",3)(174,"h2",4),s(175),r(176,"tr"),n()(),t(177,"div",5)(178,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("detailedWeatherEnabled",p)}),s(179),r(180,"tr"),n(),t(181,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("autoLoadWeather",p)}),s(182),r(183,"tr"),n(),t(184,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("useGpsForWeather",p)}),s(185),r(186,"tr"),n(),t(187,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("showWeatherWarnings",p)}),s(188),r(189,"tr"),n(),t(190,"mat-form-field",6)(191,"mat-label"),s(192),r(193,"tr"),n(),t(194,"input",24),g("ngModelChange",function(p){return i.updateSetting("weatherRefreshMinutes",+p)}),n()(),t(195,"button",35),g("click",function(){return i.clearWeatherCache()}),s(196),r(197,"tr"),n()()()(),t(198,"section",1)(199,"app-expandable-section",37)(200,"div",3)(201,"h2",4),s(202),r(203,"tr"),n()(),t(204,"div",5)(205,"p",38),s(206),r(207,"tr"),n(),t(208,"p",39),s(209),r(210,"tr"),n(),t(211,"mat-slide-toggle",7),g("ngModelChange",function(p){return i.updateSetting("aiChatEnabled",p)}),s(212),r(213,"tr"),n(),t(214,"mat-form-field",6)(215,"mat-label"),s(216),r(217,"tr"),n(),t(218,"input",40),g("ngModelChange",function(p){return i.updateAiApiKey(p)}),n()(),t(219,"mat-form-field",6)(220,"mat-label"),s(221),r(222,"tr"),n(),t(223,"input",41),g("ngModelChange",function(p){return i.updateSetting("aiBaseUrl",p||void 0)}),n(),t(224,"mat-hint"),s(225),r(226,"tr"),n()(),t(227,"mat-form-field",6)(228,"mat-label"),s(229),r(230,"tr"),n(),t(231,"input",41),g("ngModelChange",function(p){return i.updateSetting("aiModel",p||void 0)}),n()(),t(232,"button",35),g("click",function(){return i.clearAiKey()}),s(233),r(234,"tr"),n(),t(235,"a",42),s(236),r(237,"tr"),n()()()(),t(238,"section",1)(239,"app-expandable-section",43)(240,"div",3)(241,"h2",4),s(242),r(243,"tr"),n()(),t(244,"div",5)(245,"p",38),s(246),r(247,"tr"),n(),t(248,"mat-form-field",6)(249,"mat-label"),s(250),r(251,"tr"),n(),t(252,"input",24),g("ngModelChange",function(p){return i.updateLockTimeout(+p)}),n()(),t(253,"mat-form-field",6)(254,"mat-label"),s(255),r(256,"tr"),n(),t(257,"input",44),ne("ngModelChange",function(p){return ie(i.oldPin,p)||(i.oldPin=p),p}),n()(),t(258,"mat-form-field",6)(259,"mat-label"),s(260),r(261,"tr"),n(),t(262,"input",44),ne("ngModelChange",function(p){return ie(i.newPin,p)||(i.newPin=p),p}),n()(),t(263,"mat-form-field",6)(264,"mat-label"),s(265),r(266,"tr"),n(),t(267,"input",44),ne("ngModelChange",function(p){return ie(i.confirmPin,p)||(i.confirmPin=p),p}),n()(),t(268,"div",45)(269,"button",35),g("click",function(){return i.changePin()}),s(270),r(271,"tr"),n(),t(272,"button",35),g("click",function(){return i.logout()}),s(273),r(274,"tr"),n()()()()(),t(275,"section",1)(276,"app-expandable-section",46)(277,"div",3)(278,"h2",4),s(279),r(280,"tr"),n()(),t(281,"div",5)(282,"button",47),g("click",function(){return i.exportBackup()}),s(283),r(284,"tr"),r(285,"tr"),n(),t(286,"label",48)(287,"input",49),g("change",function(p){return i.importBackup(p)}),n(),t(288,"span",50),s(289),r(290,"tr"),n()(),t(291,"p",51),s(292),r(293,"tr"),n(),t(294,"button",34),g("click",function(){return i.generateDemoData()}),s(295),r(296,"tr"),r(297,"tr"),n()()()(),t(298,"section",1)(299,"app-expandable-section",52)(300,"div",3)(301,"h2",4),s(302),r(303,"tr"),n()(),t(304,"div",5)(305,"p",51),s(306),r(307,"tr"),n(),t(308,"h3",53),s(309),r(310,"tr"),n(),t(311,"p",51),s(312),r(313,"tr"),n(),t(314,"div",54),H(315,vi,1,1,null,null,Z),n(),t(317,"div",55),H(318,fi,3,4,"button",56,Z),t(320,"button",35),g("click",function(){return i.resetAllCustomOptions()}),s(321),r(322,"tr"),n()(),t(323,"h3",53),s(324),r(325,"tr"),n(),t(326,"div",55)(327,"button",35),g("click",function(){return i.resetFilters()}),s(328),r(329,"tr"),n(),t(330,"button",35),g("click",function(){return i.resetAppearance()}),s(331),r(332,"tr"),n(),t(333,"button",35),g("click",function(){return i.resetWeatherSettings()}),s(334),r(335,"tr"),n(),t(336,"button",35),g("click",function(){return i.resetSecuritySettings()}),s(337),r(338,"tr"),n(),t(339,"button",35),g("click",function(){return i.resetAllSettings()}),s(340),r(341,"tr"),n()(),t(342,"h3",57),s(343),r(344,"tr"),n(),t(345,"p",58),s(346),r(347,"tr"),n(),t(348,"button",59),g("click",function(){return i.resetCurrentMode()}),s(349),r(350,"tr"),n(),t(351,"mat-form-field",6)(352,"mat-label"),s(353),r(354,"tr"),n(),t(355,"input",60),g("ngModelChange",function(p){return i.fullResetInput.set(p)}),n()(),t(356,"button",59),g("click",function(){return i.resetFullApplication()}),s(357),r(358,"tr"),n()()()(),t(359,"section",61)(360,"app-expandable-section",62)(361,"div",3)(362,"h2",4),s(363),r(364,"tr"),n()(),t(365,"div",5)(366,"p"),s(367),r(368,"tr"),n(),A(369,_i,3,3,"button",56),A(370,bi,3,3,"p",38),t(371,"button",35),g("click",function(){return i.shareViaWhatsApp()}),s(372),r(373,"tr"),n(),t(374,"button",35),g("click",function(){return i.sendFeedback()}),s(375),r(376,"tr"),n(),t(377,"a",63),s(378),r(379,"tr"),n(),s(380," \xB7 "),t(381,"a",64),s(382),r(383,"tr"),n(),s(384," \xB7 "),t(385,"a",65),s(386),r(387,"tr"),n(),t(388,"p"),s(389),r(390,"tr"),n(),t(391,"a",66),s(392),r(393,"tr"),n()()()(),t(394,"section",1)(395,"app-expandable-section",67)(396,"div",3)(397,"h2",4),s(398),r(399,"tr"),n()(),t(400,"div",5)(401,"p"),s(402),r(403,"tr"),n(),t(404,"a",68),s(405),r(406,"tr"),n()()()(),A(407,yi,2,1,"p",69)),a&2&&(e(2),h("defaultExpanded",!0)("flat",!0),e(3),c(o(6,148,"settings.appearance")),e(5),c(o(11,150,"settings.theme")),e(2),h("ngModel",i.settings().themeMode),e(2),c(o(15,152,"settings.darkMode")),e(3),c(o(18,154,"settings.lightMode")),e(3),c(o(21,156,"settings.systemPreference")),e(4),c(o(25,158,"settings.language")),e(2),h("ngModel",i.settings().language),e(),K(i.supportedLanguages),e(2),z("data-theme",i.settings().themeMode==="system"?null:i.settings().themeMode),e(),y(" ",o(31,160,"settings.preview")," "),e(3),h("flat",!0),e(3),c(o(37,162,"settings.units")),e(5),c(o(42,164,"settings.weight")),e(2),h("ngModel",i.settings().weightUnit),e(2),c(o(46,166,"settings.kilograms")),e(3),c(o(49,168,"settings.pounds")),e(4),c(o(53,170,"settings.length")),e(2),h("ngModel",i.settings().lengthUnit),e(2),c(o(57,172,"settings.centimeters")),e(3),c(o(60,174,"settings.inches")),e(4),c(o(64,176,"settings.temperature")),e(2),h("ngModel",i.settings().temperatureUnit),e(2),c(o(68,178,"settings.celsius")),e(3),c(o(71,180,"settings.fahrenheit")),e(4),c(o(75,182,"settings.distance")),e(2),h("ngModel",i.settings().distanceUnit),e(2),c(o(79,184,"settings.meters")),e(3),c(o(82,186,"settings.feet")),e(3),h("flat",!0),e(3),c(o(88,188,"settings.general")),e(5),c(o(93,190,"settings.defaultLake")),e(2),h("ngModel",i.modePreferences().defaultLakeId),e(2),c(o(97,192,"common.none")),e(2),K(i.lakes()),e(4),c(o(103,194,"settings.maxRods")),e(2),h("ngModel",i.settings().maxRodCount),e(3),c(o(108,196,"settings.timeFormat")),e(2),h("ngModel",i.settings().timeFormat),e(2),c(o(112,198,"settings.hour24")),e(3),c(o(115,200,"settings.hour12")),e(4),c(o(119,202,"settings.firstDayWeek")),e(2),h("ngModel",i.settings().firstDayOfWeek),e(),h("value",0),e(),c(o(123,204,"settings.sunday")),e(2),h("value",1),e(),c(o(126,206,"settings.monday")),e(3),h("flat",!0),e(3),c(o(132,208,"settings.gallery")),e(5),c(o(137,210,"settings.defaultSorting")),e(2),h("ngModel",i.settings().gallerySortDefault),e(2),c(o(141,212,"settings.newest")),e(3),c(o(144,214,"settings.oldest")),e(3),c(o(147,216,"settings.favoriteFirst")),e(4),c(o(151,218,"settings.thumbnailSize")),e(2),h("ngModel",i.settings().galleryThumbnailSize),e(2),c(o(155,220,"settings.small")),e(3),c(o(158,222,"settings.medium")),e(3),c(o(161,224,"settings.large")),e(2),h("ngModel",i.settings().galleryFavoritesFirst),e(),y(" ",o(164,226,"settings.showFavoritesFirst")," "),e(2),h("disabled",i.changingHomepage()),e(),y(" ",o(167,228,"settings.changeHomepageImage")," "),e(3),c(o(170,230,"settings.clearHomepageImage")),e(3),h("flat",!0),e(3),c(o(176,232,"settings.weather")),e(3),h("ngModel",i.settings().detailedWeatherEnabled),e(),y(" ",o(180,234,"settings.enableDetailedWeather")," "),e(2),h("ngModel",i.settings().autoLoadWeather),e(),y(" ",o(183,236,"settings.autoLoadWeather")," "),e(2),h("ngModel",i.settings().useGpsForWeather),e(),y(" ",o(186,238,"settings.useGps")," "),e(2),h("ngModel",i.settings().showWeatherWarnings),e(),y(" ",o(189,240,"settings.showWarnings")," "),e(4),c(o(193,242,"settings.refreshMinutes")),e(2),h("ngModel",i.settings().weatherRefreshMinutes),e(2),c(o(197,244,"settings.deleteCachedWeather")),e(3),h("flat",!0),e(3),c(o(203,246,"settings.assistant")),e(4),c(o(207,248,"settings.assistantHint")),e(3),c(o(210,250,"settings.assistantPrivacyWarning")),e(2),h("ngModel",i.settings().aiChatEnabled),e(),y(" ",o(213,252,"settings.enableAiChat")," "),e(4),c(o(217,254,"settings.aiApiKey")),e(2),h("ngModel",i.aiApiKey()??""),e(3),c(o(222,256,"settings.aiBaseUrl")),e(2),h("ngModel",i.settings().aiBaseUrl??""),e(2),c(o(226,258,"settings.aiBaseUrlHint")),e(4),c(o(230,260,"settings.aiModel")),e(2),h("ngModel",i.settings().aiModel??""),e(2),c(o(234,262,"settings.clearAiKey")),e(3),c(o(237,264,"settings.openAssistant")),e(3),h("flat",!0),e(3),c(o(243,266,"settings.security")),e(4),c(o(247,268,"settings.pinPrivacyHint")),e(4),c(o(251,270,"settings.lockAfter")),e(2),h("ngModel",i.settings().lockTimeoutMinutes),e(3),c(o(256,272,"settings.currentPin")),e(2),te("ngModel",i.oldPin),e(3),c(o(261,274,"settings.newPin")),e(2),te("ngModel",i.newPin),e(3),c(o(266,276,"settings.confirmPin")),e(2),te("ngModel",i.confirmPin),e(3),c(o(271,278,"settings.changePin")),e(3),c(o(274,280,"settings.logout")),e(3),h("flat",!0),e(3),c(o(280,282,"settings.data")),e(3),h("disabled",i.exporting()),e(),y(" ",i.exporting()?o(284,284,"settings.exporting"):o(285,286,"settings.exportJson")," "),e(6),c(o(290,288,"settings.importJson")),e(3),c(o(293,290,"settings.generateDemoDesc")),e(2),h("disabled",i.generatingDemo()),e(),y(" ",i.generatingDemo()?o(296,292,"settings.generatingDemo"):o(297,294,"settings.generateDemo")," "),e(4),h("flat",!0),e(3),c(o(303,296,"settings.resetSection")),e(4),c(o(307,298,"settings.resetDesc")),e(3),c(o(310,300,"settings.customOptions")),e(3),c(o(313,302,"settings.manageOptionsDesc")),e(3),K(i.optionCategories),e(3),K(i.optionCategories),e(3),c(o(322,304,"settings.resetAllCustom")),e(3),c(o(325,306,"settings.preferences")),e(4),c(o(329,308,"settings.resetFilters")),e(3),c(o(332,310,"settings.resetAppearance")),e(3),c(o(335,312,"settings.resetWeather")),e(3),c(o(338,314,"settings.resetSecurity")),e(3),c(o(341,316,"settings.resetAllSettings")),e(3),c(o(344,318,"settings.fullReset")),e(3),c(o(347,320,"settings.fullResetWarn")),e(3),y(" ",o(350,322,"settings.resetCurrentMode")," "),e(4),c(o(354,324,"settings.confirmation")),e(2),h("ngModel",i.fullResetInput()),e(2),c(o(358,326,"settings.resetEntire")),e(3),h("flat",!0),e(3),c(o(364,328,"settings.about")),e(4),c(o(368,330,"settings.aboutText")),e(2),O(i.pwaInstall.canInstall()?369:-1),e(),O(i.pwaInstall.showIosHint()?370:-1),e(2),c(o(373,332,"settings.shareWhatsApp")),e(3),c(o(376,334,"settings.sendFeedback")),e(3),c(o(379,336,"settings.profile")),e(4),c(o(383,338,"settings.documents")),e(4),c(o(387,340,"settings.privacy")),e(3),c(o(390,342,"settings.privacyDesc")),e(3),c(o(393,344,"settings.openPrivacy")),e(3),h("flat",!0),e(3),c(o(399,346,"settings.changelog")),e(4),c(o(403,348,"settings.changelogDesc")),e(3),c(o(406,350,"settings.openChangelog")),e(2),O(i.message()?407:-1))},dependencies:[ut,dt,gt,pt,ht,mt,Qe,ot,rt,yt,_t,vt,ft,St,wt,bt,Xt,Gt,Qt,Jt,ei,xe,Nt,Ut,Ot],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.submenu-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.section-title[_ngcontent-%COMP%]{margin:0;font-size:1rem}.action-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.hint[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary);margin:0 0 var(--spacing-sm)}.warn-hint[_ngcontent-%COMP%]{color:var(--warning, #c47a00)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}.manage-options[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-md);margin-bottom:var(--spacing-md)}.manage-category-title[_ngcontent-%COMP%]{margin:0 0 var(--spacing-xs);font-size:.9rem;color:var(--text-secondary)}.option-list[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--spacing-xs)}.option-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-sm)}.option-value[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media(max-width:768px){.section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md)}.action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .reset-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{width:100%;margin-right:0}}"]})};export{ii as SettingsComponent};
