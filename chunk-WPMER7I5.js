import{a as J,b as kt}from"./chunk-FW7YG3ZG.js";import{a as Q}from"./chunk-NRRHF7QE.js";import{c as De}from"./chunk-IDTZTSZM.js";import{a as _t}from"./chunk-UPBTJ5YH.js";import{a as Ze}from"./chunk-OVYTXWRY.js";import{a as tt}from"./chunk-6GNFCEN2.js";import{a as yt,b as wt,c as St}from"./chunk-QGPG4BAU.js";import{a as bt}from"./chunk-4BEDH3X3.js";import{a as et}from"./chunk-VNS5JGU4.js";import{d as ut,h as ft,i as vt}from"./chunk-YGZGKJSH.js";import{a as gt,b as ht}from"./chunk-F6MSRPSB.js";import"./chunk-I35XXBH7.js";import{a as it,c as nt,d as at,g as st,i as rt,j as ot,o as lt,p as dt,q as ct,u as pt,v as mt}from"./chunk-IMYALPB3.js";import{a as $}from"./chunk-XKD4LC5J.js";import{a as Xe}from"./chunk-3EKEANSX.js";import"./chunk-RBJ2GIIB.js";import{B as Ke,D as Ne,E as Ve,H as qe,I as Ge,f as ze,q as He}from"./chunk-D4ZL6JEA.js";import{c as Ye}from"./chunk-FRI7AEFW.js";import"./chunk-B3J734SH.js";import{a as U,b as $e,c as V,d as q,e as G,f as X}from"./chunk-OFYNZ5FR.js";import{a as K,b as N}from"./chunk-BR53DXQA.js";import{e as We}from"./chunk-VFLZSFTQ.js";import{a as z,b as H}from"./chunk-CWRLOAS2.js";import{a as j}from"./chunk-CDQE4IRM.js";import{m as f,n as Ue,s as je}from"./chunk-VFRKHYN5.js";import{b as v,d as D,i as ae,o as se,p as re,q as Je,r as Qe}from"./chunk-4JMQGZ52.js";import{$b as Te,Aa as we,Bb as ie,Cb as A,Cc as Le,Db as L,Eb as m,Fb as n,Gb as a,Hb as w,Ic as Oe,Kc as S,Lb as ke,Lc as Fe,Mb as Ce,Pb as g,Rb as I,Sb as xe,Tb as Ie,Va as e,Vb as Me,Wb as Ee,Xb as Re,Y as he,Z as E,_ as ue,a as x,aa as fe,b as M,ba as _,bc as ne,ca as u,cc as Be,dc as s,ec as d,fc as y,gc as Pe,ha as ve,ia as _e,ib as T,ja as be,jb as Se,jc as O,kc as F,lc as W,oc as Ae,pa as te,sc as r,ta as R,tc as o,xa as ye,xb as C,yb as B,zb as P}from"./chunk-UIKT7675.js";var Tt=["switch"],Bt=["*"];function Pt(h,c){h&1&&(n(0,"span",11),be(),n(1,"svg",13),w(2,"path",14),a(),n(3,"svg",15),w(4,"path",16),a()())}var At=new fe("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Y=class{source;checked;constructor(c,l){this.source=c,this.checked=l}},le=(()=>{class h{_elementRef=u(we);_focusMonitor=u(ze);_changeDetectorRef=u(Oe);defaults=u(At);_onChange=l=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(l){return new Y(this,l)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Ke();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(l){this._checked=l,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new te;toggleChange=new te;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(Ue).load(Ve);let l=u(new Le("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=l==null?0:parseInt(l)||0,this.color=i.color||"accent",this.id=this._uniqueId=u(He).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(l=>{l==="keyboard"||l==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):l||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(l){l.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(l){this.checked=!!l}registerOnChange(l){this._onChange=l}registerOnTouched(l){this._onTouched=l}validate(l){return this.required&&l.value!==!0?{required:!0}:null}registerOnValidatorChange(l){this._validatorOnChange=l}setDisabledState(l){this.disabled=l,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Y(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||h)};static \u0275cmp=T({type:h,selectors:[["mat-slide-toggle"]],viewQuery:function(i,t){if(i&1&&Me(Tt,5),i&2){let p;Ee(p=Re())&&(t._switchElement=p.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,t){i&2&&(Ce("id",t.id),C("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Be(t.color?"mat-"+t.color:""),ne("mat-mdc-slide-toggle-focused",t._focused)("mat-mdc-slide-toggle-checked",t.checked)("_mat-animation-noopable",t._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",S],color:"color",disabled:[2,"disabled","disabled",S],disableRipple:[2,"disableRipple","disableRipple",S],tabIndex:[2,"tabIndex","tabIndex",l=>l==null?0:Fe(l)],checked:[2,"checked","checked",S],hideIcon:[2,"hideIcon","hideIcon",S],disabledInteractive:[2,"disabledInteractive","disabledInteractive",S]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Ae([{provide:it,useExisting:he(()=>h),multi:!0},{provide:at,useExisting:h,multi:!0}]),ye],ngContentSelectors:Bt,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,t){if(i&1&&(xe(),n(0,"div",1)(1,"button",2,0),g("click",function(){return t._handleClick()}),w(3,"div",3)(4,"span",4),n(5,"span",5)(6,"span",6)(7,"span",7),w(8,"span",8),a(),n(9,"span",9),w(10,"span",10),a(),B(11,Pt,5,0,"span",11),a()()(),n(12,"label",12),g("click",function(k){return k.stopPropagation()}),Ie(13),a()()),i&2){let p=Te(2);m("labelPosition",t.labelPosition),e(),ne("mdc-switch--selected",t.checked)("mdc-switch--unselected",!t.checked)("mdc-switch--checked",t.checked)("mdc-switch--disabled",t.disabled)("mat-mdc-slide-toggle-disabled-interactive",t.disabledInteractive),m("tabIndex",t.disabled&&!t.disabledInteractive?-1:t.tabIndex)("disabled",t.disabled&&!t.disabledInteractive),C("id",t.buttonId)("name",t.name)("aria-label",t.ariaLabel)("aria-labelledby",t._getAriaLabelledBy())("aria-describedby",t.ariaDescribedby)("aria-required",t.required||null)("aria-checked",t.checked)("aria-disabled",t.disabled&&t.disabledInteractive?"true":null),e(9),m("matRippleTrigger",p)("matRippleDisabled",t.disableRipple||t.disabled)("matRippleCentered",!0),e(),P(t.hideIcon?-1:11),e(),m("for",t.buttonId),C("id",t._labelId)}},dependencies:[Ne,yt],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return h})(),Ct=(()=>{class h{static \u0275fac=function(i){return new(i||h)};static \u0275mod=Se({type:h});static \u0275inj=ue({imports:[le,je]})}return h})();var Z=class h{constructor(c,l,i,t,p,k,de,ce,pe,me,ge){this.sessionRepo=c;this.catchRepo=l;this.lakeRepo=i;this.imageRepo=t;this.biteEventRepo=p;this.fishSpottedRepo=k;this.rodSpotHistoryRepo=de;this.sessionEventRepo=ce;this.sessionWeatherRepo=pe;this.userOptionRepo=me;this.chatRepo=ge}sessionRepo;catchRepo;lakeRepo;imageRepo;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;sessionWeatherRepo;userOptionRepo;chatRepo;async export(){let c=await this.sessionRepo.getAll(),l=await this.catchRepo.getAll(),i=await this.lakeRepo.getAll(),t=await this.imageRepo.getAll(),p=await this.biteEventRepo.getAll(),k=await f.fishSpottedEvents.toArray(),de=await f.rodSpotHistory.toArray(),ce=await f.sessionEvents.toArray(),pe=await this.sessionWeatherRepo.getAll(),me=await this.userOptionRepo.getAll(),ge=await this.chatRepo.getAllThreads(),Et=await this.chatRepo.getAllMessages(),Rt=await Promise.all(t.map(async b=>({id:b.id,type:b.type,parentId:b.parentId,fileName:b.fileName,mimeType:b.mimeType,data:await se(b.blob),thumbnail:await se(b.thumbnailBlob),createdAt:b.createdAt,isFavorite:b.isFavorite,isHomepageImage:b.isHomepageImage})));return{version:5,exportedAt:ae(),sessions:c,catches:l,lakes:i,images:Rt,biteEvents:p,fishSpottedEvents:k,rodSpotHistory:de,sessionEvents:ce,sessionWeather:pe,userOptions:me,chatThreads:ge,chatMessages:Et}}async import(c){if(!c.version||!c.sessions||!c.catches||!c.lakes)throw new Error("Invalid backup file");let l=c.sessions.filter(i=>i.status==="active");l.length>1&&l.slice(1).forEach(i=>{i.status="completed",i.endDate=i.endDate??ae()}),await f.transaction("rw",[f.sessions,f.catches,f.lakes,f.images,f.biteEvents,f.fishSpottedEvents,f.rodSpotHistory,f.sessionEvents,f.sessionWeather,f.userOptions,f.chatThreads,f.chatMessages],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.sessionWeatherRepo.clear(),await this.userOptionRepo.clear(),await this.chatRepo.clear();for(let t of c.lakes)await this.lakeRepo.put(t);for(let t of c.sessions)await this.sessionRepo.put(M(x({},t),{sessionSpots:t.sessionSpots??[],rods:t.rods??[]}));for(let t of c.catches)await this.catchRepo.put(t);for(let t of c.images??[])await this.imageRepo.put({id:t.id,type:t.type,parentId:t.parentId,fileName:t.fileName??`${t.id}.jpg`,blob:re(t.data,t.mimeType),thumbnailBlob:re(t.thumbnail,t.mimeType),mimeType:t.mimeType,createdAt:t.createdAt,isFavorite:t.isFavorite??!1,isHomepageImage:t.isHomepageImage??!1});for(let t of c.biteEvents??[])await this.biteEventRepo.put(t);for(let t of c.fishSpottedEvents??[])await this.fishSpottedRepo.put(t);for(let t of c.rodSpotHistory??[])await this.rodSpotHistoryRepo.put(t);for(let t of c.sessionEvents??[])await this.sessionEventRepo.put(t);let i=c.sessionWeather??[];if(i.length>0)for(let t of i)await this.sessionWeatherRepo.put(t);else for(let t of c.sessions)t.weather&&await this.sessionWeatherRepo.put({id:t.id+"-weather-seed",sessionId:t.id,capturedAt:t.weather.capturedAt??t.updatedAt??t.createdAt,weather:t.weather});for(let t of c.userOptions??[])await this.userOptionRepo.put(t);for(let t of c.chatThreads??[])await this.chatRepo.putThread(t);for(let t of c.chatMessages??[])await this.chatRepo.putMessage(t)})}downloadJson(c){let l=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),i=URL.createObjectURL(l),t=document.createElement("a");t.href=i,t.download=`fish-tracker-backup-${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(i)}static \u0275fac=function(l){return new(l||h)(_(z),_(H),_(j),_(K),_(V),_(q),_(G),_(U),_(X),_(J),_(Q))};static \u0275prov=E({token:h,factory:h.\u0275fac,providedIn:"root"})};var xt="fish-tracker-weather-cache",It="fish-tracker-filter-presets",Ot="fish-tracker-lock-state",ee=class h{settings=u(D);theme=u($);filterService=u(_t);userOptions=u(kt);imageService=u(N);sessionRepo=u(z);catchRepo=u(H);lakeRepo=u(j);imageRepo=u(K);biteEventRepo=u(V);fishSpottedRepo=u(q);rodSpotHistoryRepo=u(G);sessionEventRepo=u(U);sessionWeatherRepo=u(X);userOptionRepo=u(J);chatRepo=u(Q);async resetCustomOptionsCategory(c,l=!0){await this.userOptions.resetCategory(c,l)}async resetAllCustomOptions(c=!0){await this.userOptions.resetAllCustom(c)}async restoreDefaultOptions(c){await this.userOptions.restoreDefaults(c)}resetFilters(){localStorage.removeItem(It),this.filterService.clearActive()}async resetAppearance(){this.theme.setTheme(v.themeMode),this.settings.update({gallerySortDefault:v.gallerySortDefault,galleryThumbnailSize:v.galleryThumbnailSize,galleryFavoritesFirst:v.galleryFavoritesFirst}),await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(xt),this.settings.update({detailedWeatherEnabled:v.detailedWeatherEnabled,autoLoadWeather:v.autoLoadWeather,weatherRefreshMinutes:v.weatherRefreshMinutes,useGpsForWeather:v.useGpsForWeather,showWeatherWarnings:v.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:v.lockTimeoutMinutes})}async resetAllSettings(){let c=this.settings.get().pinHash,l=this.settings.get().pinSalt,i=this.settings.get().pinEnabled;this.settings.update(M(x({},v),{pinHash:c,pinSalt:l,pinEnabled:i})),this.resetFilters(),await this.resetAppearance(),this.resetWeather(),this.resetSecurity()}async resetFullApplication(){await f.transaction("rw",[f.sessions,f.catches,f.lakes,f.images,f.profiles,f.profileDocuments,f.biteEvents,f.fishSpottedEvents,f.rodSpotHistory,f.sessionEvents,f.sessionWeather,f.userOptions,f.chatThreads,f.chatMessages],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await f.profiles.clear(),await f.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.sessionWeatherRepo.clear(),await this.userOptionRepo.clear(),await this.chatRepo.clear()}),localStorage.removeItem(It),localStorage.removeItem(xt),localStorage.removeItem(Ot),this.clearExpandStates(),this.settings.update(x({},v)),await this.userOptions.restoreDefaults()}clearExpandStates(){let c=[];for(let l=0;l<localStorage.length;l++){let i=localStorage.key(l);i?.startsWith("expand-")&&c.push(i)}for(let l of c)localStorage.removeItem(l)}static \u0275fac=function(l){return new(l||h)};static \u0275prov=E({token:h,factory:h.\u0275fac,providedIn:"root"})};var Ft=(h,c)=>c.id;function Wt(h,c){if(h&1&&(n(0,"mat-option",11),s(1),a()),h&2){let l=c.$implicit,i=I();m("value",l),e(),d(i.languageLabel(l))}}function Dt(h,c){if(h&1&&(n(0,"mat-option",11),s(1),a()),h&2){let l=c.$implicit;m("value",l.id),e(),d(l.name)}}function zt(h,c){if(h&1){let l=ke();n(0,"button",34),g("click",function(){let t=ve(l).$implicit,p=I();return _e(p.resetOptionCategory(t))}),s(1),r(2,"tr"),a()}if(h&2){let l=c.$implicit,i=I();e(),Pe("",o(2,2,"common.reset")," ",i.categoryLabel(l))}}function Ut(h,c){if(h&1&&(n(0,"p",64),s(1),a()),h&2){let l=I();e(),d(l.message())}}var Mt=class h{settingsService=u(D);backupService=u(Z);pinLock=u(De);confirm=u(bt);theme=u($);imageService=u(N);weatherService=u($e);lakeService=u(Ze);notifications=u(Xe);resetService=u(ee);i18n=u(Je);settings=this.settingsService.settings;supportedLanguages=this.i18n.supportedLanguages;lakes=Ye(this.lakeService.watchAll(),{initialValue:[]});message=R("");exporting=R(!1);fullResetInput=R("");optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";updateUnits(c,l){this.settingsService.update({[c]:l})}updateTheme(c){this.theme.setTheme(c)}updateLanguage(c){this.i18n.setLanguage(c)}updateSetting(c,l){this.settingsService.update({[c]:l})}updateLockTimeout(c){this.settingsService.update({lockTimeoutMinutes:c})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let c=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(c?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}logout(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let c=await this.backupService.export();this.backupService.downloadJson(c),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async importBackup(c){let l=c.target,i=l.files?.[0];if(!(!i||!await this.confirm.confirm({title:"Import backup?",message:"This will replace all data. This action cannot be undone.",confirmLabel:"Import"}))){try{let p=await i.text(),k=JSON.parse(p);await this.backupService.import(k),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}l.value=""}}clearWeatherCache(){this.weatherService.clearCache(),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}clearAiKey(){this.settingsService.update({aiApiKey:void 0}),this.notifications.success(this.i18n.t("settings.aiKeyCleared"))}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(c){let l=this.categoryLabel(c);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${l}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(c,!0),this.notifications.success(`${l} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")))}languageLabel(c){return c==="nl"?"Nederlands":c==="en"?"English":"Deutsch"}categoryLabel(c){return this.i18n.t(`options.category.${c}`)}static \u0275fac=function(l){return new(l||h)};static \u0275cmp=T({type:h,selectors:[["app-settings"]],decls:362,vars:307,consts:[["title","common.settings"],[1,"section","app-card"],["sectionId","settings-appearance","persistKey","settings-appearance","label","appearance",3,"defaultExpanded","flat"],["expandHeader",""],[1,"section-title"],[1,"submenu-content"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],[1,"theme-preview"],["sectionId","settings-units","persistKey","settings-units","label","units",3,"flat"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["sectionId","settings-general","persistKey","settings-general","label","general",3,"flat"],["value",""],["matInput","","type","number",3,"ngModelChange","ngModel"],["value","24h"],["value","12h"],["sectionId","settings-gallery","persistKey","settings-gallery","label","gallery",3,"flat"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["mat-stroked-button","","type","button",3,"click"],["sectionId","settings-weather","persistKey","settings-weather","label","weather",3,"flat"],["sectionId","settings-assistant","persistKey","settings-assistant","label","assistant",3,"flat"],[1,"hint"],["matInput","","type","password","autocomplete","off",3,"ngModelChange","ngModel"],["matInput","",3,"ngModelChange","ngModel"],["mat-stroked-button","","routerLink","/assistant"],["sectionId","settings-security","persistKey","settings-security","label","security",3,"flat"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],[1,"action-row"],["sectionId","settings-data","persistKey","settings-data","label","data",3,"flat"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],["sectionId","settings-reset","persistKey","settings-reset","label","reset",3,"flat"],[1,"reset-desc"],[1,"subsection"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],["mat-stroked-button","","color","warn","type","button",3,"click"],[1,"section","app-card","about"],["sectionId","settings-about","persistKey","settings-about","label","about",3,"flat"],["routerLink","/profile"],["routerLink","/profile/documents"],["sectionId","settings-changelog","persistKey","settings-changelog","label","changelog",3,"flat"],["mat-stroked-button","","routerLink","/release-notes"],[1,"message"]],template:function(l,i){l&1&&(w(0,"app-page-title",0),n(1,"section",1)(2,"app-expandable-section",2)(3,"div",3)(4,"h2",4),s(5),r(6,"tr"),a()(),n(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),s(10),r(11,"tr"),a(),n(12,"mat-select",7),g("ngModelChange",function(p){return i.updateTheme(p)}),n(13,"mat-option",8),s(14),r(15,"tr"),a(),n(16,"mat-option",9),s(17),r(18,"tr"),a(),n(19,"mat-option",10),s(20),r(21,"tr"),a()()(),n(22,"mat-form-field",6)(23,"mat-label"),s(24),r(25,"tr"),a(),n(26,"mat-select",7),g("ngModelChange",function(p){return i.updateLanguage(p)}),A(27,Wt,2,2,"mat-option",11,ie),a()(),n(29,"div",12),s(30),r(31,"tr"),a()()()(),n(32,"section",1)(33,"app-expandable-section",13)(34,"div",3)(35,"h2",4),s(36),r(37,"tr"),a()(),n(38,"div",5)(39,"mat-form-field",6)(40,"mat-label"),s(41),r(42,"tr"),a(),n(43,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("weightUnit",p)}),n(44,"mat-option",14),s(45),r(46,"tr"),a(),n(47,"mat-option",15),s(48),r(49,"tr"),a()()(),n(50,"mat-form-field",6)(51,"mat-label"),s(52),r(53,"tr"),a(),n(54,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("lengthUnit",p)}),n(55,"mat-option",16),s(56),r(57,"tr"),a(),n(58,"mat-option",17),s(59),r(60,"tr"),a()()(),n(61,"mat-form-field",6)(62,"mat-label"),s(63),r(64,"tr"),a(),n(65,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("temperatureUnit",p)}),n(66,"mat-option",18),s(67),r(68,"tr"),a(),n(69,"mat-option",19),s(70),r(71,"tr"),a()()(),n(72,"mat-form-field",6)(73,"mat-label"),s(74),r(75,"tr"),a(),n(76,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("distanceUnit",p)}),n(77,"mat-option",20),s(78),r(79,"tr"),a(),n(80,"mat-option",21),s(81),r(82,"tr"),a()()()()()(),n(83,"section",1)(84,"app-expandable-section",22)(85,"div",3)(86,"h2",4),s(87),r(88,"tr"),a()(),n(89,"div",5)(90,"mat-form-field",6)(91,"mat-label"),s(92),r(93,"tr"),a(),n(94,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("defaultLakeId",p||void 0)}),n(95,"mat-option",23),s(96),r(97,"tr"),a(),A(98,Dt,2,2,"mat-option",11,Ft),a()(),n(100,"mat-form-field",6)(101,"mat-label"),s(102),r(103,"tr"),a(),n(104,"input",24),g("ngModelChange",function(p){return i.updateSetting("maxRodCount",+p)}),a()(),n(105,"mat-form-field",6)(106,"mat-label"),s(107),r(108,"tr"),a(),n(109,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("timeFormat",p)}),n(110,"mat-option",25),s(111),r(112,"tr"),a(),n(113,"mat-option",26),s(114),r(115,"tr"),a()()(),n(116,"mat-form-field",6)(117,"mat-label"),s(118),r(119,"tr"),a(),n(120,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("firstDayOfWeek",p===0?0:1)}),n(121,"mat-option",11),s(122),r(123,"tr"),a(),n(124,"mat-option",11),s(125),r(126,"tr"),a()()()()()(),n(127,"section",1)(128,"app-expandable-section",27)(129,"div",3)(130,"h2",4),s(131),r(132,"tr"),a()(),n(133,"div",5)(134,"mat-form-field",6)(135,"mat-label"),s(136),r(137,"tr"),a(),n(138,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("gallerySortDefault",p)}),n(139,"mat-option",28),s(140),r(141,"tr"),a(),n(142,"mat-option",29),s(143),r(144,"tr"),a(),n(145,"mat-option",30),s(146),r(147,"tr"),a()()(),n(148,"mat-form-field",6)(149,"mat-label"),s(150),r(151,"tr"),a(),n(152,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("galleryThumbnailSize",p)}),n(153,"mat-option",31),s(154),r(155,"tr"),a(),n(156,"mat-option",32),s(157),r(158,"tr"),a(),n(159,"mat-option",33),s(160),r(161,"tr"),a()()(),n(162,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("galleryFavoritesFirst",p)}),s(163),r(164,"tr"),a(),n(165,"button",34),g("click",function(){return i.clearHomepageImage()}),s(166),r(167,"tr"),a()()()(),n(168,"section",1)(169,"app-expandable-section",35)(170,"div",3)(171,"h2",4),s(172),r(173,"tr"),a()(),n(174,"div",5)(175,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("detailedWeatherEnabled",p)}),s(176),r(177,"tr"),a(),n(178,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("autoLoadWeather",p)}),s(179),r(180,"tr"),a(),n(181,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("useGpsForWeather",p)}),s(182),r(183,"tr"),a(),n(184,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("showWeatherWarnings",p)}),s(185),r(186,"tr"),a(),n(187,"mat-form-field",6)(188,"mat-label"),s(189),r(190,"tr"),a(),n(191,"input",24),g("ngModelChange",function(p){return i.updateSetting("weatherRefreshMinutes",+p)}),a()(),n(192,"button",34),g("click",function(){return i.clearWeatherCache()}),s(193),r(194,"tr"),a()()()(),n(195,"section",1)(196,"app-expandable-section",36)(197,"div",3)(198,"h2",4),s(199),r(200,"tr"),a()(),n(201,"div",5)(202,"p",37),s(203),r(204,"tr"),a(),n(205,"mat-slide-toggle",7),g("ngModelChange",function(p){return i.updateSetting("aiChatEnabled",p)}),s(206),r(207,"tr"),a(),n(208,"mat-form-field",6)(209,"mat-label"),s(210),r(211,"tr"),a(),n(212,"input",38),g("ngModelChange",function(p){return i.updateSetting("aiApiKey",p||void 0)}),a()(),n(213,"mat-form-field",6)(214,"mat-label"),s(215),r(216,"tr"),a(),n(217,"input",39),g("ngModelChange",function(p){return i.updateSetting("aiBaseUrl",p||void 0)}),a()(),n(218,"mat-form-field",6)(219,"mat-label"),s(220),r(221,"tr"),a(),n(222,"input",39),g("ngModelChange",function(p){return i.updateSetting("aiModel",p||void 0)}),a()(),n(223,"button",34),g("click",function(){return i.clearAiKey()}),s(224),r(225,"tr"),a(),n(226,"a",40),s(227),r(228,"tr"),a()()()(),n(229,"section",1)(230,"app-expandable-section",41)(231,"div",3)(232,"h2",4),s(233),r(234,"tr"),a()(),n(235,"div",5)(236,"mat-form-field",6)(237,"mat-label"),s(238),r(239,"tr"),a(),n(240,"input",24),g("ngModelChange",function(p){return i.updateLockTimeout(+p)}),a()(),n(241,"mat-form-field",6)(242,"mat-label"),s(243),r(244,"tr"),a(),n(245,"input",42),W("ngModelChange",function(p){return F(i.oldPin,p)||(i.oldPin=p),p}),a()(),n(246,"mat-form-field",6)(247,"mat-label"),s(248),r(249,"tr"),a(),n(250,"input",42),W("ngModelChange",function(p){return F(i.newPin,p)||(i.newPin=p),p}),a()(),n(251,"mat-form-field",6)(252,"mat-label"),s(253),r(254,"tr"),a(),n(255,"input",42),W("ngModelChange",function(p){return F(i.confirmPin,p)||(i.confirmPin=p),p}),a()(),n(256,"div",43)(257,"button",34),g("click",function(){return i.changePin()}),s(258),r(259,"tr"),a(),n(260,"button",34),g("click",function(){return i.logout()}),s(261),r(262,"tr"),a()()()()(),n(263,"section",1)(264,"app-expandable-section",44)(265,"div",3)(266,"h2",4),s(267),r(268,"tr"),a()(),n(269,"div",5)(270,"button",45),g("click",function(){return i.exportBackup()}),s(271),r(272,"tr"),r(273,"tr"),a(),n(274,"label",46)(275,"input",47),g("change",function(p){return i.importBackup(p)}),a(),n(276,"span",48),s(277),r(278,"tr"),a()()()()(),n(279,"section",1)(280,"app-expandable-section",49)(281,"div",3)(282,"h2",4),s(283),r(284,"tr"),a()(),n(285,"div",5)(286,"p",50),s(287),r(288,"tr"),a(),n(289,"h3",51),s(290),r(291,"tr"),a(),n(292,"div",52),A(293,zt,3,4,"button",53,ie),n(295,"button",34),g("click",function(){return i.resetAllCustomOptions()}),s(296),r(297,"tr"),a()(),n(298,"h3",51),s(299),r(300,"tr"),a(),n(301,"div",52)(302,"button",34),g("click",function(){return i.resetFilters()}),s(303),r(304,"tr"),a(),n(305,"button",34),g("click",function(){return i.resetAppearance()}),s(306),r(307,"tr"),a(),n(308,"button",34),g("click",function(){return i.resetWeatherSettings()}),s(309),r(310,"tr"),a(),n(311,"button",34),g("click",function(){return i.resetSecuritySettings()}),s(312),r(313,"tr"),a(),n(314,"button",34),g("click",function(){return i.resetAllSettings()}),s(315),r(316,"tr"),a()(),n(317,"h3",54),s(318),r(319,"tr"),a(),n(320,"p",55),s(321),r(322,"tr"),a(),n(323,"mat-form-field",6)(324,"mat-label"),s(325),r(326,"tr"),a(),n(327,"input",56),g("ngModelChange",function(p){return i.fullResetInput.set(p)}),a()(),n(328,"button",57),g("click",function(){return i.resetFullApplication()}),s(329),r(330,"tr"),a()()()(),n(331,"section",58)(332,"app-expandable-section",59)(333,"div",3)(334,"h2",4),s(335),r(336,"tr"),a()(),n(337,"div",5)(338,"p"),s(339),r(340,"tr"),a(),n(341,"a",60),s(342),r(343,"tr"),a(),s(344," \xB7 "),n(345,"a",61),s(346),r(347,"tr"),a()()()(),n(348,"section",1)(349,"app-expandable-section",62)(350,"div",3)(351,"h2",4),s(352),r(353,"tr"),a()(),n(354,"div",5)(355,"p"),s(356),r(357,"tr"),a(),n(358,"a",63),s(359),r(360,"tr"),a()()()(),B(361,Ut,2,1,"p",64)),l&2&&(e(2),m("defaultExpanded",!0)("flat",!0),e(3),d(o(6,131,"settings.appearance")),e(5),d(o(11,133,"settings.theme")),e(2),m("ngModel",i.settings().themeMode),e(2),d(o(15,135,"settings.darkMode")),e(3),d(o(18,137,"settings.lightMode")),e(3),d(o(21,139,"settings.systemPreference")),e(4),d(o(25,141,"settings.language")),e(2),m("ngModel",i.settings().language),e(),L(i.supportedLanguages),e(2),C("data-theme",i.settings().themeMode==="system"?null:i.settings().themeMode),e(),y(" ",o(31,143,"settings.preview")," "),e(3),m("flat",!0),e(3),d(o(37,145,"settings.units")),e(5),d(o(42,147,"settings.weight")),e(2),m("ngModel",i.settings().weightUnit),e(2),d(o(46,149,"settings.kilograms")),e(3),d(o(49,151,"settings.pounds")),e(4),d(o(53,153,"settings.length")),e(2),m("ngModel",i.settings().lengthUnit),e(2),d(o(57,155,"settings.centimeters")),e(3),d(o(60,157,"settings.inches")),e(4),d(o(64,159,"settings.temperature")),e(2),m("ngModel",i.settings().temperatureUnit),e(2),d(o(68,161,"settings.celsius")),e(3),d(o(71,163,"settings.fahrenheit")),e(4),d(o(75,165,"settings.distance")),e(2),m("ngModel",i.settings().distanceUnit),e(2),d(o(79,167,"settings.meters")),e(3),d(o(82,169,"settings.feet")),e(3),m("flat",!0),e(3),d(o(88,171,"settings.general")),e(5),d(o(93,173,"settings.defaultLake")),e(2),m("ngModel",i.settings().defaultLakeId),e(2),d(o(97,175,"common.none")),e(2),L(i.lakes()),e(4),d(o(103,177,"settings.maxRods")),e(2),m("ngModel",i.settings().maxRodCount),e(3),d(o(108,179,"settings.timeFormat")),e(2),m("ngModel",i.settings().timeFormat),e(2),d(o(112,181,"settings.hour24")),e(3),d(o(115,183,"settings.hour12")),e(4),d(o(119,185,"settings.firstDayWeek")),e(2),m("ngModel",i.settings().firstDayOfWeek),e(),m("value",0),e(),d(o(123,187,"settings.sunday")),e(2),m("value",1),e(),d(o(126,189,"settings.monday")),e(3),m("flat",!0),e(3),d(o(132,191,"settings.gallery")),e(5),d(o(137,193,"settings.defaultSorting")),e(2),m("ngModel",i.settings().gallerySortDefault),e(2),d(o(141,195,"settings.newest")),e(3),d(o(144,197,"settings.oldest")),e(3),d(o(147,199,"settings.favoriteFirst")),e(4),d(o(151,201,"settings.thumbnailSize")),e(2),m("ngModel",i.settings().galleryThumbnailSize),e(2),d(o(155,203,"settings.small")),e(3),d(o(158,205,"settings.medium")),e(3),d(o(161,207,"settings.large")),e(2),m("ngModel",i.settings().galleryFavoritesFirst),e(),y(" ",o(164,209,"settings.showFavoritesFirst")," "),e(3),d(o(167,211,"settings.clearHomepageImage")),e(3),m("flat",!0),e(3),d(o(173,213,"settings.weather")),e(3),m("ngModel",i.settings().detailedWeatherEnabled),e(),y(" ",o(177,215,"settings.enableDetailedWeather")," "),e(2),m("ngModel",i.settings().autoLoadWeather),e(),y(" ",o(180,217,"settings.autoLoadWeather")," "),e(2),m("ngModel",i.settings().useGpsForWeather),e(),y(" ",o(183,219,"settings.useGps")," "),e(2),m("ngModel",i.settings().showWeatherWarnings),e(),y(" ",o(186,221,"settings.showWarnings")," "),e(4),d(o(190,223,"settings.refreshMinutes")),e(2),m("ngModel",i.settings().weatherRefreshMinutes),e(2),d(o(194,225,"settings.deleteCachedWeather")),e(3),m("flat",!0),e(3),d(o(200,227,"settings.assistant")),e(4),d(o(204,229,"settings.assistantHint")),e(2),m("ngModel",i.settings().aiChatEnabled),e(),y(" ",o(207,231,"settings.enableAiChat")," "),e(4),d(o(211,233,"settings.aiApiKey")),e(2),m("ngModel",i.settings().aiApiKey??""),e(3),d(o(216,235,"settings.aiBaseUrl")),e(2),m("ngModel",i.settings().aiBaseUrl??""),e(3),d(o(221,237,"settings.aiModel")),e(2),m("ngModel",i.settings().aiModel??""),e(2),d(o(225,239,"settings.clearAiKey")),e(3),d(o(228,241,"settings.openAssistant")),e(3),m("flat",!0),e(3),d(o(234,243,"settings.security")),e(5),d(o(239,245,"settings.lockAfter")),e(2),m("ngModel",i.settings().lockTimeoutMinutes),e(3),d(o(244,247,"settings.currentPin")),e(2),O("ngModel",i.oldPin),e(3),d(o(249,249,"settings.newPin")),e(2),O("ngModel",i.newPin),e(3),d(o(254,251,"settings.confirmPin")),e(2),O("ngModel",i.confirmPin),e(3),d(o(259,253,"settings.changePin")),e(3),d(o(262,255,"settings.logout")),e(3),m("flat",!0),e(3),d(o(268,257,"settings.data")),e(3),m("disabled",i.exporting()),e(),y(" ",i.exporting()?o(272,259,"settings.exporting"):o(273,261,"settings.exportJson")," "),e(6),d(o(278,263,"settings.importJson")),e(3),m("flat",!0),e(3),d(o(284,265,"settings.resetSection")),e(4),d(o(288,267,"settings.resetDesc")),e(3),d(o(291,269,"settings.customOptions")),e(3),L(i.optionCategories),e(3),d(o(297,271,"settings.resetAllCustom")),e(3),d(o(300,273,"settings.preferences")),e(4),d(o(304,275,"settings.resetFilters")),e(3),d(o(307,277,"settings.resetAppearance")),e(3),d(o(310,279,"settings.resetWeather")),e(3),d(o(313,281,"settings.resetSecurity")),e(3),d(o(316,283,"settings.resetAllSettings")),e(3),d(o(319,285,"settings.fullReset")),e(3),d(o(322,287,"settings.fullResetWarn")),e(4),d(o(326,289,"settings.confirmation")),e(2),m("ngModel",i.fullResetInput()),e(2),d(o(330,291,"settings.resetEntire")),e(3),m("flat",!0),e(3),d(o(336,293,"settings.about")),e(4),d(o(340,295,"settings.aboutText")),e(3),d(o(343,297,"settings.profile")),e(4),d(o(347,299,"settings.documents")),e(3),m("flat",!0),e(3),d(o(353,301,"settings.changelog")),e(4),d(o(357,303,"settings.changelogDesc")),e(3),d(o(360,305,"settings.openChangelog")),e(2),P(i.message()?361:-1))},dependencies:[dt,nt,ot,st,lt,rt,We,Ge,qe,mt,pt,ct,vt,ft,ut,ht,gt,St,wt,Ct,le,tt,et,Qe],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.submenu-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.section-title[_ngcontent-%COMP%]{margin:0;font-size:1rem}.action-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.hint[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary);margin:0 0 var(--spacing-sm)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}@media(max-width:768px){.section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md)}.action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .reset-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{width:100%;margin-right:0}}"]})};export{Mt as SettingsComponent};
