import{a as Mt}from"./chunk-SRULHE2V.js";import{a as Et}from"./chunk-FSBDLQM7.js";import{a as Q,b as It}from"./chunk-VKP3D7K2.js";import{a as Y}from"./chunk-C2NYHEKX.js";import{c as Ue}from"./chunk-4PIK6HRM.js";import{a as wt}from"./chunk-MZQ4SBRV.js";import{a as nt}from"./chunk-UR5WD6DN.js";import{a as it}from"./chunk-EW7YK6UA.js";import{a as kt,b as Ct,c as xt}from"./chunk-EDZYM5GZ.js";import{a as St}from"./chunk-XXZBT7JT.js";import{a as tt}from"./chunk-UEREHUJX.js";import{d as _t,h as bt,i as yt}from"./chunk-AHJFVQ6M.js";import{a as ft,b as vt}from"./chunk-WO7WNLVX.js";import"./chunk-PFBBTLOO.js";import{a as at,c as st,d as rt,g as ot,i as lt,j as ct,o as dt,p as pt,q as mt,r as gt,v as ht,w as ut}from"./chunk-K2P54XAU.js";import{a as J}from"./chunk-WEDCUQLJ.js";import{a as Je}from"./chunk-GAF6UKIV.js";import{c as et}from"./chunk-ZQU4IG3M.js";import"./chunk-2DBUMJOQ.js";import{a as H,b as Qe,c as q,d as $,e as G,f as X}from"./chunk-JVJZJU6X.js";import"./chunk-JNNPAJU4.js";import{a as N,b as V}from"./chunk-5HFCZLRE.js";import"./chunk-NHVWHWRA.js";import{e as We}from"./chunk-AKA4RH4V.js";import{a as U,b as j}from"./chunk-UQ5P4QJ6.js";import"./chunk-MCS5UJGG.js";import{a as K}from"./chunk-QBGMWYIV.js";import{J as Ke,U as Ne,W as Ve,Y as qe,Z as $e,aa as Ge,ba as Xe,m as u,u as He,v as je}from"./chunk-4XLVBEVA.js";import{b as v,c as ze,d as re,f as z,k as oe,q as le,r as ce,s as Ye,t as Ze}from"./chunk-4XCJ7JVJ.js";import{$b as Te,Aa as Se,Bb as ae,Cb as O,Cc as Le,Db as L,Eb as m,Fb as n,Gb as a,Hb as S,Ic as De,Kc as k,Lb as Ce,Lc as Fe,Mb as xe,Pb as g,Rb as I,Sb as Ie,Tb as Ee,Va as e,Vb as Me,Wb as Re,Xb as Be,Y as ue,Z as R,_ as fe,a as x,aa as ve,b as M,ba as _,bc as se,ca as h,cc as Pe,dc as o,ec as d,fc as w,gc as Ae,ha as _e,ia as be,ib as T,ja as ye,jb as ke,jc as D,kc as F,lc as W,oc as Oe,pa as ne,sc as l,ta as B,tc as c,xa as we,xb as C,yb as P,zb as A}from"./chunk-YLCVSZIS.js";var Ft=["switch"],Wt=["*"];function zt(f,p){f&1&&(n(0,"span",11),ye(),n(1,"svg",13),S(2,"path",14),a(),n(3,"svg",15),S(4,"path",16),a()())}var Ut=new ve("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),Z=class{source;checked;constructor(p,s){this.source=p,this.checked=s}},pe=(()=>{class f{_elementRef=h(Se);_focusMonitor=h(He);_changeDetectorRef=h(De);defaults=h(Ut);_onChange=s=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(s){return new Z(this,s)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Ve();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(s){this._checked=s,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new ne;toggleChange=new ne;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){h(je).load($e);let s=h(new Le("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=s==null?0:parseInt(s)||0,this.color=i.color||"accent",this.id=this._uniqueId=h(Ke).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(s=>{s==="keyboard"||s==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):s||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(s){s.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(s){this.checked=!!s}registerOnChange(s){this._onChange=s}registerOnTouched(s){this._onTouched=s}validate(s){return this.required&&s.value!==!0?{required:!0}:null}registerOnValidatorChange(s){this._validatorOnChange=s}setDisabledState(s){this.disabled=s,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Z(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||f)};static \u0275cmp=T({type:f,selectors:[["mat-slide-toggle"]],viewQuery:function(i,r){if(i&1&&Me(Ft,5),i&2){let t;Re(t=Be())&&(r._switchElement=t.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,r){i&2&&(xe("id",r.id),C("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Pe(r.color?"mat-"+r.color:""),se("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",k],color:"color",disabled:[2,"disabled","disabled",k],disableRipple:[2,"disableRipple","disableRipple",k],tabIndex:[2,"tabIndex","tabIndex",s=>s==null?0:Fe(s)],checked:[2,"checked","checked",k],hideIcon:[2,"hideIcon","hideIcon",k],disabledInteractive:[2,"disabledInteractive","disabledInteractive",k]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Oe([{provide:at,useExisting:ue(()=>f),multi:!0},{provide:rt,useExisting:f,multi:!0}]),we],ngContentSelectors:Wt,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,r){if(i&1&&(Ie(),n(0,"div",1)(1,"button",2,0),g("click",function(){return r._handleClick()}),S(3,"div",3)(4,"span",4),n(5,"span",5)(6,"span",6)(7,"span",7),S(8,"span",8),a(),n(9,"span",9),S(10,"span",10),a(),P(11,zt,5,0,"span",11),a()()(),n(12,"label",12),g("click",function(y){return y.stopPropagation()}),Ee(13),a()()),i&2){let t=Te(2);m("labelPosition",r.labelPosition),e(),se("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),m("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),C("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),e(9),m("matRippleTrigger",t)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),e(),A(r.hideIcon?-1:11),e(),m("for",r.buttonId),C("id",r._labelId)}},dependencies:[qe,kt],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return f})(),Rt=(()=>{class f{static \u0275fac=function(i){return new(i||f)};static \u0275mod=ke({type:f});static \u0275inj=fe({imports:[pe,Ne]})}return f})();var ee=class f{constructor(p,s,i,r,t,y,E,ie,me,ge,he){this.sessionRepo=p;this.catchRepo=s;this.lakeRepo=i;this.imageRepo=r;this.biteEventRepo=t;this.fishSpottedRepo=y;this.rodSpotHistoryRepo=E;this.sessionEventRepo=ie;this.sessionWeatherRepo=me;this.userOptionRepo=ge;this.chatRepo=he}sessionRepo;catchRepo;lakeRepo;imageRepo;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;sessionWeatherRepo;userOptionRepo;chatRepo;profileRepo=h(Mt);profileDocumentRepo=h(Et);async export(){let p=await this.sessionRepo.getAll(),s=await this.catchRepo.getAll(),i=await this.lakeRepo.getAll(),r=await this.imageRepo.getAll(),t=await this.biteEventRepo.getAll(),y=await u.fishSpottedEvents.toArray(),E=await u.rodSpotHistory.toArray(),ie=await u.sessionEvents.toArray(),me=await this.sessionWeatherRepo.getAll(),ge=await this.userOptionRepo.getAll(),he=await this.chatRepo.getAllThreads(),At=await this.chatRepo.getAllMessages(),Ot=await this.profileRepo.get(),Lt=await this.profileDocumentRepo.getAll(),Dt=await Promise.all(r.map(async b=>({id:b.id,type:b.type,parentId:b.parentId,fileName:b.fileName,mimeType:b.mimeType,data:await le(b.blob),thumbnail:await le(b.thumbnailBlob),createdAt:b.createdAt,isFavorite:b.isFavorite,isHomepageImage:b.isHomepageImage})));return{version:ze,exportedAt:oe(),sessions:p,catches:s,lakes:i,images:Dt,biteEvents:t,fishSpottedEvents:y,rodSpotHistory:E,sessionEvents:ie,sessionWeather:me,userOptions:ge,chatThreads:he,chatMessages:At,profiles:[Ot],profileDocuments:Lt}}validate(p){if(!p||typeof p!="object")throw new Error("Invalid backup file");let s=p;if(typeof s.version!="number")throw new Error("Invalid backup file: missing version");if(!re.includes(s.version))throw new Error(`Unsupported backup version ${s.version}. Supported: ${re.join(", ")}`);if(!Array.isArray(s.sessions)||!Array.isArray(s.catches)||!Array.isArray(s.lakes))throw new Error("Invalid backup file: sessions, catches, and lakes must be arrays");if(s.images!==void 0&&!Array.isArray(s.images))throw new Error("Invalid backup file: images must be an array");for(let i of["biteEvents","fishSpottedEvents","rodSpotHistory","sessionEvents","sessionWeather","userOptions","chatThreads","chatMessages","profiles","profileDocuments"]){let r=s[i];if(r!==void 0&&!Array.isArray(r))throw new Error(`Invalid backup file: ${i} must be an array`)}for(let i of s.sessions)if(!i||typeof i!="object"||typeof i.id!="string")throw new Error("Invalid backup file: session entries must have an id");return{version:s.version,exportedAt:typeof s.exportedAt=="string"?s.exportedAt:void 0,sessionCount:s.sessions.length,catchCount:s.catches.length,lakeCount:s.lakes.length,imageCount:s.images?.length??0,profileCount:s.profiles?.length??0,profileDocumentCount:s.profileDocuments?.length??0}}async import(p){let s=this.validate(p),i=p.sessions.filter(r=>r.status==="active");return i.length>1&&i.slice(1).forEach(r=>{r.status="completed",r.endDate=r.endDate??oe()}),await u.transaction("rw",[u.sessions,u.catches,u.lakes,u.images,u.profiles,u.profileDocuments,u.biteEvents,u.fishSpottedEvents,u.rodSpotHistory,u.sessionEvents,u.sessionWeather,u.userOptions,u.chatThreads,u.chatMessages],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await u.profiles.clear(),await u.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.sessionWeatherRepo.clear(),await this.userOptionRepo.clear(),await this.chatRepo.clear();for(let t of p.lakes)await this.lakeRepo.put(t);for(let t of p.sessions)await this.sessionRepo.put(M(x({},t),{sessionSpots:t.sessionSpots??[],rods:t.rods??[]}));for(let t of p.catches)await this.catchRepo.put(t);for(let t of p.images??[]){if(typeof t.data!="string"||typeof t.thumbnail!="string")throw new Error("Invalid backup file: image entries require data and thumbnail");await this.imageRepo.put({id:t.id,type:t.type,parentId:t.parentId,fileName:t.fileName??`${t.id}.jpg`,blob:ce(t.data,t.mimeType),thumbnailBlob:ce(t.thumbnail,t.mimeType),mimeType:t.mimeType,createdAt:t.createdAt,isFavorite:t.isFavorite??!1,isHomepageImage:t.isHomepageImage??!1})}for(let t of p.biteEvents??[])await this.biteEventRepo.put(t);for(let t of p.fishSpottedEvents??[])await this.fishSpottedRepo.put(t);for(let t of p.rodSpotHistory??[])await this.rodSpotHistoryRepo.put(t);for(let t of p.sessionEvents??[])await this.sessionEventRepo.put(t);let r=p.sessionWeather??[];if(r.length>0)for(let t of r)await this.sessionWeatherRepo.put(t);else for(let t of p.sessions)t.weather&&await this.sessionWeatherRepo.put({id:t.id+"-weather-seed",sessionId:t.id,capturedAt:t.weather.capturedAt??t.updatedAt??t.createdAt,weather:t.weather});for(let t of p.userOptions??[])await this.userOptionRepo.put(t);for(let t of p.chatThreads??[])await this.chatRepo.putThread(t);for(let t of p.chatMessages??[])await this.chatRepo.putMessage(t);for(let t of p.profiles??[])t&&typeof t.id=="string"&&await this.profileRepo.put(t);for(let t of p.profileDocuments??[])t&&typeof t.id=="string"&&await this.profileDocumentRepo.put(t)}),s}downloadJson(p){let s=new Blob([JSON.stringify(p,null,2)],{type:"application/json"}),i=URL.createObjectURL(s),r=document.createElement("a");r.href=i,r.download=`fish-tracker-backup-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(i)}static \u0275fac=function(s){return new(s||f)(_(U),_(j),_(K),_(N),_(q),_($),_(G),_(H),_(X),_(Q),_(Y))};static \u0275prov=R({token:f,factory:f.\u0275fac,providedIn:"root"})};var Bt="fish-tracker-weather-cache",Tt="fish-tracker-filter-presets",jt="fish-tracker-lock-state",te=class f{settings=h(z);theme=h(J);filterService=h(wt);userOptions=h(It);imageService=h(V);sessionRepo=h(U);catchRepo=h(j);lakeRepo=h(K);imageRepo=h(N);biteEventRepo=h(q);fishSpottedRepo=h($);rodSpotHistoryRepo=h(G);sessionEventRepo=h(H);sessionWeatherRepo=h(X);userOptionRepo=h(Q);chatRepo=h(Y);async resetCustomOptionsCategory(p,s=!0){await this.userOptions.resetCategory(p,s)}async resetAllCustomOptions(p=!0){await this.userOptions.resetAllCustom(p)}async restoreDefaultOptions(p){await this.userOptions.restoreDefaults(p)}resetFilters(){localStorage.removeItem(Tt),this.filterService.clearActive()}async resetAppearance(){this.theme.setTheme(v.themeMode),this.settings.update({gallerySortDefault:v.gallerySortDefault,galleryThumbnailSize:v.galleryThumbnailSize,galleryFavoritesFirst:v.galleryFavoritesFirst}),await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(Bt),this.settings.update({detailedWeatherEnabled:v.detailedWeatherEnabled,autoLoadWeather:v.autoLoadWeather,weatherRefreshMinutes:v.weatherRefreshMinutes,useGpsForWeather:v.useGpsForWeather,showWeatherWarnings:v.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:v.lockTimeoutMinutes})}async resetAllSettings(){let p=this.settings.get().pinHash,s=this.settings.get().pinSalt,i=this.settings.get().pinEnabled;this.settings.replace(M(x({},v),{pinHash:p,pinSalt:s,pinEnabled:i})),this.resetFilters(),await this.resetAppearance(),this.resetWeather(),this.resetSecurity()}async resetFullApplication(){await u.transaction("rw",[u.sessions,u.catches,u.lakes,u.images,u.profiles,u.profileDocuments,u.biteEvents,u.fishSpottedEvents,u.rodSpotHistory,u.sessionEvents,u.sessionWeather,u.userOptions,u.chatThreads,u.chatMessages],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await u.profiles.clear(),await u.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.sessionWeatherRepo.clear(),await this.userOptionRepo.clear(),await this.chatRepo.clear()}),localStorage.removeItem(Tt),localStorage.removeItem(Bt),localStorage.removeItem(jt);try{sessionStorage.removeItem("fish-tracker-unlock-session")}catch{}this.clearExpandStates(),this.settings.replace(x({},v)),await this.userOptions.restoreDefaults()}clearExpandStates(){let p=[];for(let s=0;s<localStorage.length;s++){let i=localStorage.key(s);i?.startsWith("expand-")&&p.push(i)}for(let s of p)localStorage.removeItem(s)}static \u0275fac=function(s){return new(s||f)};static \u0275prov=R({token:f,factory:f.\u0275fac,providedIn:"root"})};var Kt=(f,p)=>p.id;function Nt(f,p){if(f&1&&(n(0,"mat-option",11),o(1),a()),f&2){let s=p.$implicit,i=I();m("value",s),e(),d(i.languageLabel(s))}}function Vt(f,p){if(f&1&&(n(0,"mat-option",11),o(1),a()),f&2){let s=p.$implicit;m("value",s.id),e(),d(s.name)}}function qt(f,p){if(f&1){let s=Ce();n(0,"button",34),g("click",function(){let r=_e(s).$implicit,t=I();return be(t.resetOptionCategory(r))}),o(1),l(2,"tr"),a()}if(f&2){let s=p.$implicit,i=I();e(),Ae("",c(2,2,"common.reset")," ",i.categoryLabel(s))}}function $t(f,p){if(f&1&&(n(0,"p",65),o(1),a()),f&2){let s=I();e(),d(s.message())}}var Pt=class f{settingsService=h(z);backupService=h(ee);pinLock=h(Ue);confirm=h(St);theme=h(J);imageService=h(V);weatherService=h(Qe);lakeService=h(nt);notifications=h(Je);resetService=h(te);i18n=h(Ye);settings=this.settingsService.settings;supportedLanguages=this.i18n.supportedLanguages;lakes=et(this.lakeService.watchAll(),{initialValue:[]});message=B("");exporting=B(!1);fullResetInput=B("");optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";updateUnits(p,s){this.settingsService.update({[p]:s})}updateTheme(p){this.theme.setTheme(p)}updateLanguage(p){this.i18n.setLanguage(p)}updateSetting(p,s){this.settingsService.update({[p]:s})}updateLockTimeout(p){this.settingsService.update({lockTimeoutMinutes:p})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let p=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(p?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}logout(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let p=await this.backupService.export();this.backupService.downloadJson(p),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async importBackup(p){let s=p.target,i=s.files?.[0];if(i){try{let r=await i.text(),t=JSON.parse(r),y=this.backupService.validate(t),E=this.i18n.t("settings.importPreview",{sessions:String(y.sessionCount),catches:String(y.catchCount),lakes:String(y.lakeCount),images:String(y.imageCount)});if(!await this.confirm.confirm({title:this.i18n.t("settings.importConfirmTitle"),message:`${E}

${this.i18n.t("settings.importConfirmMessage")}`,confirmLabel:this.i18n.t("common.import")})){s.value="";return}await this.backupService.import(t),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}s.value=""}}clearWeatherCache(){this.weatherService.clearCache(),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}clearAiKey(){this.settingsService.update({aiApiKey:void 0}),this.notifications.success(this.i18n.t("settings.aiKeyCleared"))}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(p){let s=this.categoryLabel(p);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${s}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(p,!0),this.notifications.success(`${s} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")))}languageLabel(p){return p==="nl"?"Nederlands":p==="en"?"English":"Deutsch"}categoryLabel(p){return this.i18n.t(`options.category.${p}`)}static \u0275fac=function(s){return new(s||f)};static \u0275cmp=T({type:f,selectors:[["app-settings"]],decls:371,vars:316,consts:[["title","common.settings"],[1,"section","app-card"],["sectionId","settings-appearance","persistKey","settings-appearance","label","appearance",3,"defaultExpanded","flat"],["expandHeader",""],[1,"section-title"],[1,"submenu-content"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],[1,"theme-preview"],["sectionId","settings-units","persistKey","settings-units","label","units",3,"flat"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["sectionId","settings-general","persistKey","settings-general","label","general",3,"flat"],["value",""],["matInput","","type","number",3,"ngModelChange","ngModel"],["value","24h"],["value","12h"],["sectionId","settings-gallery","persistKey","settings-gallery","label","gallery",3,"flat"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["mat-stroked-button","","type","button",3,"click"],["sectionId","settings-weather","persistKey","settings-weather","label","weather",3,"flat"],["sectionId","settings-assistant","persistKey","settings-assistant","label","assistant",3,"flat"],[1,"hint"],[1,"hint","warn-hint"],["matInput","","type","password","autocomplete","off",3,"ngModelChange","ngModel"],["matInput","",3,"ngModelChange","ngModel"],["mat-stroked-button","","routerLink","/assistant"],["sectionId","settings-security","persistKey","settings-security","label","security",3,"flat"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],[1,"action-row"],["sectionId","settings-data","persistKey","settings-data","label","data",3,"flat"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],["sectionId","settings-reset","persistKey","settings-reset","label","reset",3,"flat"],[1,"reset-desc"],[1,"subsection"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],["mat-stroked-button","","color","warn","type","button",3,"click"],[1,"section","app-card","about"],["sectionId","settings-about","persistKey","settings-about","label","about",3,"flat"],["routerLink","/profile"],["routerLink","/profile/documents"],["sectionId","settings-changelog","persistKey","settings-changelog","label","changelog",3,"flat"],["mat-stroked-button","","routerLink","/release-notes"],[1,"message"]],template:function(s,i){s&1&&(S(0,"app-page-title",0),n(1,"section",1)(2,"app-expandable-section",2)(3,"div",3)(4,"h2",4),o(5),l(6,"tr"),a()(),n(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),o(10),l(11,"tr"),a(),n(12,"mat-select",7),g("ngModelChange",function(t){return i.updateTheme(t)}),n(13,"mat-option",8),o(14),l(15,"tr"),a(),n(16,"mat-option",9),o(17),l(18,"tr"),a(),n(19,"mat-option",10),o(20),l(21,"tr"),a()()(),n(22,"mat-form-field",6)(23,"mat-label"),o(24),l(25,"tr"),a(),n(26,"mat-select",7),g("ngModelChange",function(t){return i.updateLanguage(t)}),O(27,Nt,2,2,"mat-option",11,ae),a()(),n(29,"div",12),o(30),l(31,"tr"),a()()()(),n(32,"section",1)(33,"app-expandable-section",13)(34,"div",3)(35,"h2",4),o(36),l(37,"tr"),a()(),n(38,"div",5)(39,"mat-form-field",6)(40,"mat-label"),o(41),l(42,"tr"),a(),n(43,"mat-select",7),g("ngModelChange",function(t){return i.updateUnits("weightUnit",t)}),n(44,"mat-option",14),o(45),l(46,"tr"),a(),n(47,"mat-option",15),o(48),l(49,"tr"),a()()(),n(50,"mat-form-field",6)(51,"mat-label"),o(52),l(53,"tr"),a(),n(54,"mat-select",7),g("ngModelChange",function(t){return i.updateUnits("lengthUnit",t)}),n(55,"mat-option",16),o(56),l(57,"tr"),a(),n(58,"mat-option",17),o(59),l(60,"tr"),a()()(),n(61,"mat-form-field",6)(62,"mat-label"),o(63),l(64,"tr"),a(),n(65,"mat-select",7),g("ngModelChange",function(t){return i.updateUnits("temperatureUnit",t)}),n(66,"mat-option",18),o(67),l(68,"tr"),a(),n(69,"mat-option",19),o(70),l(71,"tr"),a()()(),n(72,"mat-form-field",6)(73,"mat-label"),o(74),l(75,"tr"),a(),n(76,"mat-select",7),g("ngModelChange",function(t){return i.updateUnits("distanceUnit",t)}),n(77,"mat-option",20),o(78),l(79,"tr"),a(),n(80,"mat-option",21),o(81),l(82,"tr"),a()()()()()(),n(83,"section",1)(84,"app-expandable-section",22)(85,"div",3)(86,"h2",4),o(87),l(88,"tr"),a()(),n(89,"div",5)(90,"mat-form-field",6)(91,"mat-label"),o(92),l(93,"tr"),a(),n(94,"mat-select",7),g("ngModelChange",function(t){return i.updateSetting("defaultLakeId",t||void 0)}),n(95,"mat-option",23),o(96),l(97,"tr"),a(),O(98,Vt,2,2,"mat-option",11,Kt),a()(),n(100,"mat-form-field",6)(101,"mat-label"),o(102),l(103,"tr"),a(),n(104,"input",24),g("ngModelChange",function(t){return i.updateSetting("maxRodCount",+t)}),a()(),n(105,"mat-form-field",6)(106,"mat-label"),o(107),l(108,"tr"),a(),n(109,"mat-select",7),g("ngModelChange",function(t){return i.updateSetting("timeFormat",t)}),n(110,"mat-option",25),o(111),l(112,"tr"),a(),n(113,"mat-option",26),o(114),l(115,"tr"),a()()(),n(116,"mat-form-field",6)(117,"mat-label"),o(118),l(119,"tr"),a(),n(120,"mat-select",7),g("ngModelChange",function(t){return i.updateSetting("firstDayOfWeek",t===0?0:1)}),n(121,"mat-option",11),o(122),l(123,"tr"),a(),n(124,"mat-option",11),o(125),l(126,"tr"),a()()()()()(),n(127,"section",1)(128,"app-expandable-section",27)(129,"div",3)(130,"h2",4),o(131),l(132,"tr"),a()(),n(133,"div",5)(134,"mat-form-field",6)(135,"mat-label"),o(136),l(137,"tr"),a(),n(138,"mat-select",7),g("ngModelChange",function(t){return i.updateSetting("gallerySortDefault",t)}),n(139,"mat-option",28),o(140),l(141,"tr"),a(),n(142,"mat-option",29),o(143),l(144,"tr"),a(),n(145,"mat-option",30),o(146),l(147,"tr"),a()()(),n(148,"mat-form-field",6)(149,"mat-label"),o(150),l(151,"tr"),a(),n(152,"mat-select",7),g("ngModelChange",function(t){return i.updateSetting("galleryThumbnailSize",t)}),n(153,"mat-option",31),o(154),l(155,"tr"),a(),n(156,"mat-option",32),o(157),l(158,"tr"),a(),n(159,"mat-option",33),o(160),l(161,"tr"),a()()(),n(162,"mat-checkbox",7),g("ngModelChange",function(t){return i.updateSetting("galleryFavoritesFirst",t)}),o(163),l(164,"tr"),a(),n(165,"button",34),g("click",function(){return i.clearHomepageImage()}),o(166),l(167,"tr"),a()()()(),n(168,"section",1)(169,"app-expandable-section",35)(170,"div",3)(171,"h2",4),o(172),l(173,"tr"),a()(),n(174,"div",5)(175,"mat-checkbox",7),g("ngModelChange",function(t){return i.updateSetting("detailedWeatherEnabled",t)}),o(176),l(177,"tr"),a(),n(178,"mat-checkbox",7),g("ngModelChange",function(t){return i.updateSetting("autoLoadWeather",t)}),o(179),l(180,"tr"),a(),n(181,"mat-checkbox",7),g("ngModelChange",function(t){return i.updateSetting("useGpsForWeather",t)}),o(182),l(183,"tr"),a(),n(184,"mat-checkbox",7),g("ngModelChange",function(t){return i.updateSetting("showWeatherWarnings",t)}),o(185),l(186,"tr"),a(),n(187,"mat-form-field",6)(188,"mat-label"),o(189),l(190,"tr"),a(),n(191,"input",24),g("ngModelChange",function(t){return i.updateSetting("weatherRefreshMinutes",+t)}),a()(),n(192,"button",34),g("click",function(){return i.clearWeatherCache()}),o(193),l(194,"tr"),a()()()(),n(195,"section",1)(196,"app-expandable-section",36)(197,"div",3)(198,"h2",4),o(199),l(200,"tr"),a()(),n(201,"div",5)(202,"p",37),o(203),l(204,"tr"),a(),n(205,"p",38),o(206),l(207,"tr"),a(),n(208,"mat-slide-toggle",7),g("ngModelChange",function(t){return i.updateSetting("aiChatEnabled",t)}),o(209),l(210,"tr"),a(),n(211,"mat-form-field",6)(212,"mat-label"),o(213),l(214,"tr"),a(),n(215,"input",39),g("ngModelChange",function(t){return i.updateSetting("aiApiKey",t||void 0)}),a()(),n(216,"mat-form-field",6)(217,"mat-label"),o(218),l(219,"tr"),a(),n(220,"input",40),g("ngModelChange",function(t){return i.updateSetting("aiBaseUrl",t||void 0)}),a(),n(221,"mat-hint"),o(222),l(223,"tr"),a()(),n(224,"mat-form-field",6)(225,"mat-label"),o(226),l(227,"tr"),a(),n(228,"input",40),g("ngModelChange",function(t){return i.updateSetting("aiModel",t||void 0)}),a()(),n(229,"button",34),g("click",function(){return i.clearAiKey()}),o(230),l(231,"tr"),a(),n(232,"a",41),o(233),l(234,"tr"),a()()()(),n(235,"section",1)(236,"app-expandable-section",42)(237,"div",3)(238,"h2",4),o(239),l(240,"tr"),a()(),n(241,"div",5)(242,"p",37),o(243),l(244,"tr"),a(),n(245,"mat-form-field",6)(246,"mat-label"),o(247),l(248,"tr"),a(),n(249,"input",24),g("ngModelChange",function(t){return i.updateLockTimeout(+t)}),a()(),n(250,"mat-form-field",6)(251,"mat-label"),o(252),l(253,"tr"),a(),n(254,"input",43),W("ngModelChange",function(t){return F(i.oldPin,t)||(i.oldPin=t),t}),a()(),n(255,"mat-form-field",6)(256,"mat-label"),o(257),l(258,"tr"),a(),n(259,"input",43),W("ngModelChange",function(t){return F(i.newPin,t)||(i.newPin=t),t}),a()(),n(260,"mat-form-field",6)(261,"mat-label"),o(262),l(263,"tr"),a(),n(264,"input",43),W("ngModelChange",function(t){return F(i.confirmPin,t)||(i.confirmPin=t),t}),a()(),n(265,"div",44)(266,"button",34),g("click",function(){return i.changePin()}),o(267),l(268,"tr"),a(),n(269,"button",34),g("click",function(){return i.logout()}),o(270),l(271,"tr"),a()()()()(),n(272,"section",1)(273,"app-expandable-section",45)(274,"div",3)(275,"h2",4),o(276),l(277,"tr"),a()(),n(278,"div",5)(279,"button",46),g("click",function(){return i.exportBackup()}),o(280),l(281,"tr"),l(282,"tr"),a(),n(283,"label",47)(284,"input",48),g("change",function(t){return i.importBackup(t)}),a(),n(285,"span",49),o(286),l(287,"tr"),a()()()()(),n(288,"section",1)(289,"app-expandable-section",50)(290,"div",3)(291,"h2",4),o(292),l(293,"tr"),a()(),n(294,"div",5)(295,"p",51),o(296),l(297,"tr"),a(),n(298,"h3",52),o(299),l(300,"tr"),a(),n(301,"div",53),O(302,qt,3,4,"button",54,ae),n(304,"button",34),g("click",function(){return i.resetAllCustomOptions()}),o(305),l(306,"tr"),a()(),n(307,"h3",52),o(308),l(309,"tr"),a(),n(310,"div",53)(311,"button",34),g("click",function(){return i.resetFilters()}),o(312),l(313,"tr"),a(),n(314,"button",34),g("click",function(){return i.resetAppearance()}),o(315),l(316,"tr"),a(),n(317,"button",34),g("click",function(){return i.resetWeatherSettings()}),o(318),l(319,"tr"),a(),n(320,"button",34),g("click",function(){return i.resetSecuritySettings()}),o(321),l(322,"tr"),a(),n(323,"button",34),g("click",function(){return i.resetAllSettings()}),o(324),l(325,"tr"),a()(),n(326,"h3",55),o(327),l(328,"tr"),a(),n(329,"p",56),o(330),l(331,"tr"),a(),n(332,"mat-form-field",6)(333,"mat-label"),o(334),l(335,"tr"),a(),n(336,"input",57),g("ngModelChange",function(t){return i.fullResetInput.set(t)}),a()(),n(337,"button",58),g("click",function(){return i.resetFullApplication()}),o(338),l(339,"tr"),a()()()(),n(340,"section",59)(341,"app-expandable-section",60)(342,"div",3)(343,"h2",4),o(344),l(345,"tr"),a()(),n(346,"div",5)(347,"p"),o(348),l(349,"tr"),a(),n(350,"a",61),o(351),l(352,"tr"),a(),o(353," \xB7 "),n(354,"a",62),o(355),l(356,"tr"),a()()()(),n(357,"section",1)(358,"app-expandable-section",63)(359,"div",3)(360,"h2",4),o(361),l(362,"tr"),a()(),n(363,"div",5)(364,"p"),o(365),l(366,"tr"),a(),n(367,"a",64),o(368),l(369,"tr"),a()()()(),P(370,$t,2,1,"p",65)),s&2&&(e(2),m("defaultExpanded",!0)("flat",!0),e(3),d(c(6,134,"settings.appearance")),e(5),d(c(11,136,"settings.theme")),e(2),m("ngModel",i.settings().themeMode),e(2),d(c(15,138,"settings.darkMode")),e(3),d(c(18,140,"settings.lightMode")),e(3),d(c(21,142,"settings.systemPreference")),e(4),d(c(25,144,"settings.language")),e(2),m("ngModel",i.settings().language),e(),L(i.supportedLanguages),e(2),C("data-theme",i.settings().themeMode==="system"?null:i.settings().themeMode),e(),w(" ",c(31,146,"settings.preview")," "),e(3),m("flat",!0),e(3),d(c(37,148,"settings.units")),e(5),d(c(42,150,"settings.weight")),e(2),m("ngModel",i.settings().weightUnit),e(2),d(c(46,152,"settings.kilograms")),e(3),d(c(49,154,"settings.pounds")),e(4),d(c(53,156,"settings.length")),e(2),m("ngModel",i.settings().lengthUnit),e(2),d(c(57,158,"settings.centimeters")),e(3),d(c(60,160,"settings.inches")),e(4),d(c(64,162,"settings.temperature")),e(2),m("ngModel",i.settings().temperatureUnit),e(2),d(c(68,164,"settings.celsius")),e(3),d(c(71,166,"settings.fahrenheit")),e(4),d(c(75,168,"settings.distance")),e(2),m("ngModel",i.settings().distanceUnit),e(2),d(c(79,170,"settings.meters")),e(3),d(c(82,172,"settings.feet")),e(3),m("flat",!0),e(3),d(c(88,174,"settings.general")),e(5),d(c(93,176,"settings.defaultLake")),e(2),m("ngModel",i.settings().defaultLakeId),e(2),d(c(97,178,"common.none")),e(2),L(i.lakes()),e(4),d(c(103,180,"settings.maxRods")),e(2),m("ngModel",i.settings().maxRodCount),e(3),d(c(108,182,"settings.timeFormat")),e(2),m("ngModel",i.settings().timeFormat),e(2),d(c(112,184,"settings.hour24")),e(3),d(c(115,186,"settings.hour12")),e(4),d(c(119,188,"settings.firstDayWeek")),e(2),m("ngModel",i.settings().firstDayOfWeek),e(),m("value",0),e(),d(c(123,190,"settings.sunday")),e(2),m("value",1),e(),d(c(126,192,"settings.monday")),e(3),m("flat",!0),e(3),d(c(132,194,"settings.gallery")),e(5),d(c(137,196,"settings.defaultSorting")),e(2),m("ngModel",i.settings().gallerySortDefault),e(2),d(c(141,198,"settings.newest")),e(3),d(c(144,200,"settings.oldest")),e(3),d(c(147,202,"settings.favoriteFirst")),e(4),d(c(151,204,"settings.thumbnailSize")),e(2),m("ngModel",i.settings().galleryThumbnailSize),e(2),d(c(155,206,"settings.small")),e(3),d(c(158,208,"settings.medium")),e(3),d(c(161,210,"settings.large")),e(2),m("ngModel",i.settings().galleryFavoritesFirst),e(),w(" ",c(164,212,"settings.showFavoritesFirst")," "),e(3),d(c(167,214,"settings.clearHomepageImage")),e(3),m("flat",!0),e(3),d(c(173,216,"settings.weather")),e(3),m("ngModel",i.settings().detailedWeatherEnabled),e(),w(" ",c(177,218,"settings.enableDetailedWeather")," "),e(2),m("ngModel",i.settings().autoLoadWeather),e(),w(" ",c(180,220,"settings.autoLoadWeather")," "),e(2),m("ngModel",i.settings().useGpsForWeather),e(),w(" ",c(183,222,"settings.useGps")," "),e(2),m("ngModel",i.settings().showWeatherWarnings),e(),w(" ",c(186,224,"settings.showWarnings")," "),e(4),d(c(190,226,"settings.refreshMinutes")),e(2),m("ngModel",i.settings().weatherRefreshMinutes),e(2),d(c(194,228,"settings.deleteCachedWeather")),e(3),m("flat",!0),e(3),d(c(200,230,"settings.assistant")),e(4),d(c(204,232,"settings.assistantHint")),e(3),d(c(207,234,"settings.assistantPrivacyWarning")),e(2),m("ngModel",i.settings().aiChatEnabled),e(),w(" ",c(210,236,"settings.enableAiChat")," "),e(4),d(c(214,238,"settings.aiApiKey")),e(2),m("ngModel",i.settings().aiApiKey??""),e(3),d(c(219,240,"settings.aiBaseUrl")),e(2),m("ngModel",i.settings().aiBaseUrl??""),e(2),d(c(223,242,"settings.aiBaseUrlHint")),e(4),d(c(227,244,"settings.aiModel")),e(2),m("ngModel",i.settings().aiModel??""),e(2),d(c(231,246,"settings.clearAiKey")),e(3),d(c(234,248,"settings.openAssistant")),e(3),m("flat",!0),e(3),d(c(240,250,"settings.security")),e(4),d(c(244,252,"settings.pinPrivacyHint")),e(4),d(c(248,254,"settings.lockAfter")),e(2),m("ngModel",i.settings().lockTimeoutMinutes),e(3),d(c(253,256,"settings.currentPin")),e(2),D("ngModel",i.oldPin),e(3),d(c(258,258,"settings.newPin")),e(2),D("ngModel",i.newPin),e(3),d(c(263,260,"settings.confirmPin")),e(2),D("ngModel",i.confirmPin),e(3),d(c(268,262,"settings.changePin")),e(3),d(c(271,264,"settings.logout")),e(3),m("flat",!0),e(3),d(c(277,266,"settings.data")),e(3),m("disabled",i.exporting()),e(),w(" ",i.exporting()?c(281,268,"settings.exporting"):c(282,270,"settings.exportJson")," "),e(6),d(c(287,272,"settings.importJson")),e(3),m("flat",!0),e(3),d(c(293,274,"settings.resetSection")),e(4),d(c(297,276,"settings.resetDesc")),e(3),d(c(300,278,"settings.customOptions")),e(3),L(i.optionCategories),e(3),d(c(306,280,"settings.resetAllCustom")),e(3),d(c(309,282,"settings.preferences")),e(4),d(c(313,284,"settings.resetFilters")),e(3),d(c(316,286,"settings.resetAppearance")),e(3),d(c(319,288,"settings.resetWeather")),e(3),d(c(322,290,"settings.resetSecurity")),e(3),d(c(325,292,"settings.resetAllSettings")),e(3),d(c(328,294,"settings.fullReset")),e(3),d(c(331,296,"settings.fullResetWarn")),e(4),d(c(335,298,"settings.confirmation")),e(2),m("ngModel",i.fullResetInput()),e(2),d(c(339,300,"settings.resetEntire")),e(3),m("flat",!0),e(3),d(c(345,302,"settings.about")),e(4),d(c(349,304,"settings.aboutText")),e(3),d(c(352,306,"settings.profile")),e(4),d(c(356,308,"settings.documents")),e(3),m("flat",!0),e(3),d(c(362,310,"settings.changelog")),e(4),d(c(366,312,"settings.changelogDesc")),e(3),d(c(369,314,"settings.openChangelog")),e(2),A(i.message()?370:-1))},dependencies:[pt,st,ct,ot,dt,lt,We,Xe,Ge,ut,ht,mt,gt,yt,bt,_t,vt,ft,xt,Ct,Rt,pe,it,tt,Ze],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.submenu-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.section-title[_ngcontent-%COMP%]{margin:0;font-size:1rem}.action-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.hint[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary);margin:0 0 var(--spacing-sm)}.warn-hint[_ngcontent-%COMP%]{color:var(--warning, #c47a00)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}@media(max-width:768px){.section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md)}.action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .reset-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{width:100%;margin-right:0}}"]})};export{Pt as SettingsComponent};
