import{a as K,b as vt}from"./chunk-DRWK57OR.js";import{b as Pe}from"./chunk-4WSUDK3L.js";import{a as pt}from"./chunk-ZUN3X2IM.js";import{a as gt}from"./chunk-GFDZSYHP.js";import{a as Xe}from"./chunk-QBAEJZM3.js";import{a as Ke}from"./chunk-ULYLUKH5.js";import{a as ht,b as ut,c as ft}from"./chunk-BPX4O3IN.js";import{a as Ge,b as V,c as q,d as G,e as X}from"./chunk-U2CZ7I3B.js";import{b as qe}from"./chunk-H34C6QAI.js";import{a as j,b as N}from"./chunk-TN6CP5N3.js";import{a as ot,b as lt}from"./chunk-6W6ER725.js";import{a as U}from"./chunk-DML7ZD4F.js";import{d as ct,h as dt,i as mt}from"./chunk-2GNNMW2Z.js";import"./chunk-JA64WFCW.js";import{a as Je,c as Qe,d as Ye,g as Ze,i as et,j as tt,o as it,p as nt,q as at,u as st,v as rt}from"./chunk-I6FDIWUI.js";import{a as H}from"./chunk-2QEOQI4G.js";import{a as $}from"./chunk-QKT2PXVF.js";import{a as $e}from"./chunk-763KWCB6.js";import"./chunk-BOFMYYJG.js";import{a as W}from"./chunk-K4446A6A.js";import{D as Fe,N as De,Q as ze,R as We,U as He,V as je,e as ie,k as ne,l as ae,m as f,s as Oe}from"./chunk-C3CYID3G.js";import{a as Ve}from"./chunk-RLSHDG7L.js";import{d as Le}from"./chunk-7TBPAPVY.js";import{l as Ae,q as Ue}from"./chunk-4M4KXXHO.js";import{b as v,d as z,e as Ne}from"./chunk-T3FJV3UI.js";import{$b as xe,Aa as fe,Ac as Re,Bb as ee,Cb as P,Db as O,Eb as u,Fb as i,Gb as n,Gc as Te,Hb as y,Ic as S,Jc as Be,Lb as _e,Mb as be,Pb as g,Rb as I,Sb as ye,Tb as we,Va as t,Vb as Se,Wb as ke,Xb as Ce,Y as ce,Z as M,_ as de,a as x,aa as me,b as E,ba as b,bc as te,ca as h,cc as Ie,dc as s,ec as d,fc as w,gc as Ee,ha as pe,ia as ge,ib as T,ja as he,jb as ve,jc as A,kc as F,lc as D,nc as Me,pa as Z,qc as o,rc as l,ta as R,xa as ue,xb as C,yb as B,zb as L}from"./chunk-QJAOB4F7.js";var kt=["switch"],Ct=["*"];function xt(p,c){p&1&&(i(0,"span",11),he(),i(1,"svg",13),y(2,"path",14),n(),i(3,"svg",15),y(4,"path",16),n()())}var It=new me("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),J=class{source;checked;constructor(c,a){this.source=c,this.checked=a}},Et=(()=>{class p{_elementRef=h(fe);_focusMonitor=h(Oe);_changeDetectorRef=h(Te);defaults=h(It);_onChange=a=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(a){return new J(this,a)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=De();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(a){this._checked=a,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Z;toggleChange=new Z;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){h(Ae).load(We);let a=h(new Re("tabindex"),{optional:!0}),e=this.defaults;this.tabIndex=a==null?0:parseInt(a)||0,this.color=e.color||"accent",this.id=this._uniqueId=h(Fe).getId("mat-mdc-slide-toggle-"),this.hideIcon=e.hideIcon??!1,this.disabledInteractive=e.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(a=>{a==="keyboard"||a==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):a||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(a){a.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(a){this.checked=!!a}registerOnChange(a){this._onChange=a}registerOnTouched(a){this._onTouched=a}validate(a){return this.required&&a.value!==!0?{required:!0}:null}registerOnValidatorChange(a){this._validatorOnChange=a}setDisabledState(a){this.disabled=a,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new J(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(e){return new(e||p)};static \u0275cmp=T({type:p,selectors:[["mat-slide-toggle"]],viewQuery:function(e,r){if(e&1&&Se(kt,5),e&2){let m;ke(m=Ce())&&(r._switchElement=m.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(e,r){e&2&&(be("id",r.id),C("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Ie(r.color?"mat-"+r.color:""),te("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",S],color:"color",disabled:[2,"disabled","disabled",S],disableRipple:[2,"disableRipple","disableRipple",S],tabIndex:[2,"tabIndex","tabIndex",a=>a==null?0:Be(a)],checked:[2,"checked","checked",S],hideIcon:[2,"hideIcon","hideIcon",S],disabledInteractive:[2,"disabledInteractive","disabledInteractive",S]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Me([{provide:Je,useExisting:ce(()=>p),multi:!0},{provide:Ye,useExisting:p,multi:!0}]),ue],ngContentSelectors:Ct,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(e,r){if(e&1&&(ye(),i(0,"div",1)(1,"button",2,0),g("click",function(){return r._handleClick()}),y(3,"div",3)(4,"span",4),i(5,"span",5)(6,"span",6)(7,"span",7),y(8,"span",8),n(),i(9,"span",9),y(10,"span",10),n(),B(11,xt,5,0,"span",11),n()()(),i(12,"label",12),g("click",function(k){return k.stopPropagation()}),we(13),n()()),e&2){let m=xe(2);u("labelPosition",r.labelPosition),t(),te("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),u("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),C("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),t(9),u("matRippleTrigger",m)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),t(),L(r.hideIcon?-1:11),t(),u("for",r.buttonId),C("id",r._labelId)}},dependencies:[ze,ht],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return p})(),_t=(()=>{class p{static \u0275fac=function(e){return new(e||p)};static \u0275mod=ve({type:p});static \u0275inj=de({imports:[Et,Ue]})}return p})();var Q=class p{constructor(c,a,e,r,m,k,re,oe,le){this.sessionRepo=c;this.catchRepo=a;this.lakeRepo=e;this.imageRepo=r;this.biteEventRepo=m;this.fishSpottedRepo=k;this.rodSpotHistoryRepo=re;this.sessionEventRepo=oe;this.userOptionRepo=le}sessionRepo;catchRepo;lakeRepo;imageRepo;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;userOptionRepo;async export(){let c=await this.sessionRepo.getAll(),a=await this.catchRepo.getAll(),e=await this.lakeRepo.getAll(),r=await this.imageRepo.getAll(),m=await this.biteEventRepo.getAll(),k=await f.fishSpottedEvents.toArray(),re=await f.rodSpotHistory.toArray(),oe=await f.sessionEvents.toArray(),le=await this.userOptionRepo.getAll(),St=await Promise.all(r.map(async _=>({id:_.id,type:_.type,parentId:_.parentId,fileName:_.fileName,mimeType:_.mimeType,data:await ne(_.blob),thumbnail:await ne(_.thumbnailBlob),createdAt:_.createdAt,isFavorite:_.isFavorite,isHomepageImage:_.isHomepageImage})));return{version:3,exportedAt:ie(),sessions:c,catches:a,lakes:e,images:St,biteEvents:m,fishSpottedEvents:k,rodSpotHistory:re,sessionEvents:oe,userOptions:le}}async import(c){if(!c.version||!c.sessions||!c.catches||!c.lakes)throw new Error("Invalid backup file");let a=c.sessions.filter(e=>e.status==="active");a.length>1&&a.slice(1).forEach(e=>{e.status="completed",e.endDate=e.endDate??ie()}),await f.transaction("rw",[f.sessions,f.catches,f.lakes,f.images,f.biteEvents,f.fishSpottedEvents,f.rodSpotHistory,f.sessionEvents,f.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear();for(let e of c.lakes)await this.lakeRepo.put(e);for(let e of c.sessions)await this.sessionRepo.put(E(x({},e),{sessionSpots:e.sessionSpots??[],rods:e.rods??[]}));for(let e of c.catches)await this.catchRepo.put(e);for(let e of c.images??[])await this.imageRepo.put({id:e.id,type:e.type,parentId:e.parentId,fileName:e.fileName??`${e.id}.jpg`,blob:ae(e.data,e.mimeType),thumbnailBlob:ae(e.thumbnail,e.mimeType),mimeType:e.mimeType,createdAt:e.createdAt,isFavorite:e.isFavorite??!1,isHomepageImage:e.isHomepageImage??!1});for(let e of c.biteEvents??[])await this.biteEventRepo.put(e);for(let e of c.fishSpottedEvents??[])await this.fishSpottedRepo.put(e);for(let e of c.rodSpotHistory??[])await this.rodSpotHistoryRepo.put(e);for(let e of c.sessionEvents??[])await this.sessionEventRepo.put(e);for(let e of c.userOptions??[])await this.userOptionRepo.put(e)})}downloadJson(c){let a=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),e=URL.createObjectURL(a),r=document.createElement("a");r.href=e,r.download=`fish-tracker-backup-${new Date().toISOString().slice(0,10)}.json`,r.click(),URL.revokeObjectURL(e)}static \u0275fac=function(a){return new(a||p)(b(W),b(U),b(H),b(j),b(V),b(q),b(G),b(X),b(K))};static \u0275prov=M({token:p,factory:p.\u0275fac,providedIn:"root"})};var bt="fish-tracker-weather-cache",yt="fish-tracker-filter-presets",Mt="fish-tracker-lock-state",Y=class p{settings=h(z);theme=h($);filterService=h(pt);userOptions=h(vt);imageService=h(N);sessionRepo=h(W);catchRepo=h(U);lakeRepo=h(H);imageRepo=h(j);biteEventRepo=h(V);fishSpottedRepo=h(q);rodSpotHistoryRepo=h(G);sessionEventRepo=h(X);userOptionRepo=h(K);async resetCustomOptionsCategory(c,a=!0){await this.userOptions.resetCategory(c,a)}async resetAllCustomOptions(c=!0){await this.userOptions.resetAllCustom(c)}async restoreDefaultOptions(c){await this.userOptions.restoreDefaults(c)}resetFilters(){localStorage.removeItem(yt),this.filterService.clearActive()}async resetAppearance(){this.theme.setTheme(v.themeMode),this.settings.update({gallerySortDefault:v.gallerySortDefault,galleryThumbnailSize:v.galleryThumbnailSize,galleryFavoritesFirst:v.galleryFavoritesFirst}),await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(bt),this.settings.update({detailedWeatherEnabled:v.detailedWeatherEnabled,autoLoadWeather:v.autoLoadWeather,weatherRefreshMinutes:v.weatherRefreshMinutes,useGpsForWeather:v.useGpsForWeather,showWeatherWarnings:v.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:v.lockTimeoutMinutes})}async resetAllSettings(){let c=this.settings.get().pinHash,a=this.settings.get().pinSalt,e=this.settings.get().pinEnabled;this.settings.update(E(x({},v),{pinHash:c,pinSalt:a,pinEnabled:e})),this.resetFilters(),await this.resetAppearance(),this.resetWeather(),this.resetSecurity()}async resetFullApplication(){await f.transaction("rw",[f.sessions,f.catches,f.lakes,f.images,f.profiles,f.profileDocuments,f.biteEvents,f.fishSpottedEvents,f.rodSpotHistory,f.sessionEvents,f.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await f.profiles.clear(),await f.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear()}),localStorage.removeItem(yt),localStorage.removeItem(bt),localStorage.removeItem(Mt),this.clearExpandStates(),this.settings.update(x({},v)),await this.userOptions.restoreDefaults()}clearExpandStates(){let c=[];for(let a=0;a<localStorage.length;a++){let e=localStorage.key(a);e?.startsWith("expand-")&&c.push(e)}for(let a of c)localStorage.removeItem(a)}static \u0275fac=function(a){return new(a||p)};static \u0275prov=M({token:p,factory:p.\u0275fac,providedIn:"root"})};var Rt=(p,c)=>c.id;function Tt(p,c){if(p&1&&(i(0,"mat-option",8),s(1),n()),p&2){let a=c.$implicit,e=I();u("value",a),t(),d(e.languageLabel(a))}}function Bt(p,c){if(p&1&&(i(0,"mat-option",8),s(1),n()),p&2){let a=c.$implicit;u("value",a.id),t(),d(a.name)}}function Lt(p,c){if(p&1){let a=_e();i(0,"button",20),g("click",function(){let r=pe(a).$implicit,m=I();return ge(m.resetOptionCategory(r))}),s(1),o(2,"tr"),n()}if(p&2){let a=c.$implicit,e=I();t(),Ee("",l(2,2,"common.reset")," ",e.categoryLabel(a))}}function Pt(p,c){if(p&1&&(i(0,"p",46),s(1),n()),p&2){let a=I();t(),d(a.message())}}var wt=class p{settingsService=h(z);backupService=h(Q);pinLock=h(Pe);confirm=h(gt);theme=h($);imageService=h(N);weatherService=h(Ge);lakeService=h(Xe);notifications=h($e);resetService=h(Y);i18n=h(Ne);settings=this.settingsService.settings;supportedLanguages=this.i18n.supportedLanguages;lakes=qe(this.lakeService.watchAll(),{initialValue:[]});message=R("");exporting=R(!1);fullResetInput=R("");optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";updateUnits(c,a){this.settingsService.update({[c]:a})}updateTheme(c){this.theme.setTheme(c)}updateLanguage(c){this.i18n.setLanguage(c)}updateSetting(c,a){this.settingsService.update({[c]:a})}updateLockTimeout(c){this.settingsService.update({lockTimeoutMinutes:c})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let c=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(c?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}lockNow(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let c=await this.backupService.export();this.backupService.downloadJson(c),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async importBackup(c){let a=c.target,e=a.files?.[0];if(!(!e||!await this.confirm.confirm({title:"Import backup?",message:"This will replace all data. This action cannot be undone.",confirmLabel:"Import"}))){try{let m=await e.text(),k=JSON.parse(m);await this.backupService.import(k),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}a.value=""}}clearWeatherCache(){localStorage.removeItem("fish-tracker-weather-cache"),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(c){let a=this.categoryLabel(c);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${a}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(c,!0),this.notifications.success(`${a} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")))}languageLabel(c){return c==="nl"?"Nederlands":c==="en"?"English":"Deutsch"}categoryLabel(c){return this.i18n.t(`options.category.${c}`)}static \u0275fac=function(a){return new(a||p)};static \u0275cmp=T({type:p,selectors:[["app-settings"]],decls:291,vars:261,consts:[["title","common.settings"],[1,"section","app-card"],[1,"section-title"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],[1,"theme-preview"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["matInput","","type","number",3,"ngModelChange","ngModel"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],["mat-stroked-button","","type","button",3,"click"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["value",""],["value","24h"],["value","12h"],[1,"reset-desc"],[1,"subsection"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],["mat-stroked-button","","color","warn","type","button",3,"click"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],[1,"section","app-card","about"],["routerLink","/profile"],["routerLink","/profile/documents"],["routerLink","/release-notes"],[1,"message"]],template:function(a,e){a&1&&(y(0,"app-page-title",0),i(1,"section",1)(2,"h2",2),s(3),o(4,"tr"),n(),i(5,"mat-form-field",3)(6,"mat-label"),s(7),o(8,"tr"),n(),i(9,"mat-select",4),g("ngModelChange",function(m){return e.updateTheme(m)}),i(10,"mat-option",5),s(11),o(12,"tr"),n(),i(13,"mat-option",6),s(14),o(15,"tr"),n(),i(16,"mat-option",7),s(17),o(18,"tr"),n()()(),i(19,"mat-form-field",3)(20,"mat-label"),s(21),o(22,"tr"),n(),i(23,"mat-select",4),g("ngModelChange",function(m){return e.updateLanguage(m)}),P(24,Tt,2,2,"mat-option",8,ee),n()(),i(26,"div",9),s(27),o(28,"tr"),n()(),i(29,"section",1)(30,"h2",2),s(31),o(32,"tr"),n(),i(33,"mat-form-field",3)(34,"mat-label"),s(35),o(36,"tr"),n(),i(37,"mat-select",4),g("ngModelChange",function(m){return e.updateUnits("weightUnit",m)}),i(38,"mat-option",10),s(39),o(40,"tr"),n(),i(41,"mat-option",11),s(42),o(43,"tr"),n()()(),i(44,"mat-form-field",3)(45,"mat-label"),s(46),o(47,"tr"),n(),i(48,"mat-select",4),g("ngModelChange",function(m){return e.updateUnits("lengthUnit",m)}),i(49,"mat-option",12),s(50),o(51,"tr"),n(),i(52,"mat-option",13),s(53),o(54,"tr"),n()()(),i(55,"mat-form-field",3)(56,"mat-label"),s(57),o(58,"tr"),n(),i(59,"mat-select",4),g("ngModelChange",function(m){return e.updateUnits("temperatureUnit",m)}),i(60,"mat-option",14),s(61),o(62,"tr"),n(),i(63,"mat-option",15),s(64),o(65,"tr"),n()()(),i(66,"mat-form-field",3)(67,"mat-label"),s(68),o(69,"tr"),n(),i(70,"mat-select",4),g("ngModelChange",function(m){return e.updateUnits("distanceUnit",m)}),i(71,"mat-option",16),s(72),o(73,"tr"),n(),i(74,"mat-option",17),s(75),o(76,"tr"),n()()()(),i(77,"section",1)(78,"h2",2),s(79),o(80,"tr"),n(),i(81,"mat-form-field",3)(82,"mat-label"),s(83),o(84,"tr"),n(),i(85,"input",18),g("ngModelChange",function(m){return e.updateLockTimeout(+m)}),n()(),i(86,"mat-form-field",3)(87,"mat-label"),s(88),o(89,"tr"),n(),i(90,"input",19),D("ngModelChange",function(m){return F(e.oldPin,m)||(e.oldPin=m),m}),n()(),i(91,"mat-form-field",3)(92,"mat-label"),s(93),o(94,"tr"),n(),i(95,"input",19),D("ngModelChange",function(m){return F(e.newPin,m)||(e.newPin=m),m}),n()(),i(96,"mat-form-field",3)(97,"mat-label"),s(98),o(99,"tr"),n(),i(100,"input",19),D("ngModelChange",function(m){return F(e.confirmPin,m)||(e.confirmPin=m),m}),n()(),i(101,"button",20),g("click",function(){return e.changePin()}),s(102),o(103,"tr"),n(),i(104,"button",20),g("click",function(){return e.lockNow()}),s(105),o(106,"tr"),n()(),i(107,"section",1)(108,"h2",2),s(109),o(110,"tr"),n(),i(111,"mat-checkbox",4),g("ngModelChange",function(m){return e.updateSetting("detailedWeatherEnabled",m)}),s(112),o(113,"tr"),n(),i(114,"mat-checkbox",4),g("ngModelChange",function(m){return e.updateSetting("autoLoadWeather",m)}),s(115),o(116,"tr"),n(),i(117,"mat-checkbox",4),g("ngModelChange",function(m){return e.updateSetting("useGpsForWeather",m)}),s(118),o(119,"tr"),n(),i(120,"mat-checkbox",4),g("ngModelChange",function(m){return e.updateSetting("showWeatherWarnings",m)}),s(121),o(122,"tr"),n(),i(123,"mat-form-field",3)(124,"mat-label"),s(125),o(126,"tr"),n(),i(127,"input",18),g("ngModelChange",function(m){return e.updateSetting("weatherRefreshMinutes",+m)}),n()(),i(128,"button",20),g("click",function(){return e.clearWeatherCache()}),s(129),o(130,"tr"),n()(),i(131,"section",1)(132,"h2",2),s(133),o(134,"tr"),n(),i(135,"mat-form-field",3)(136,"mat-label"),s(137),o(138,"tr"),n(),i(139,"mat-select",4),g("ngModelChange",function(m){return e.updateSetting("gallerySortDefault",m)}),i(140,"mat-option",21),s(141),o(142,"tr"),n(),i(143,"mat-option",22),s(144),o(145,"tr"),n(),i(146,"mat-option",23),s(147),o(148,"tr"),n()()(),i(149,"mat-form-field",3)(150,"mat-label"),s(151),o(152,"tr"),n(),i(153,"mat-select",4),g("ngModelChange",function(m){return e.updateSetting("galleryThumbnailSize",m)}),i(154,"mat-option",24),s(155),o(156,"tr"),n(),i(157,"mat-option",25),s(158),o(159,"tr"),n(),i(160,"mat-option",26),s(161),o(162,"tr"),n()()(),i(163,"mat-checkbox",4),g("ngModelChange",function(m){return e.updateSetting("galleryFavoritesFirst",m)}),s(164),o(165,"tr"),n(),i(166,"button",20),g("click",function(){return e.clearHomepageImage()}),s(167),o(168,"tr"),n()(),i(169,"section",1)(170,"h2",2),s(171),o(172,"tr"),n(),i(173,"mat-form-field",3)(174,"mat-label"),s(175),o(176,"tr"),n(),i(177,"mat-select",4),g("ngModelChange",function(m){return e.updateSetting("defaultLakeId",m||void 0)}),i(178,"mat-option",27),s(179),o(180,"tr"),n(),P(181,Bt,2,2,"mat-option",8,Rt),n()(),i(183,"mat-form-field",3)(184,"mat-label"),s(185),o(186,"tr"),n(),i(187,"input",18),g("ngModelChange",function(m){return e.updateSetting("maxRodCount",+m)}),n()(),i(188,"mat-form-field",3)(189,"mat-label"),s(190),o(191,"tr"),n(),i(192,"mat-select",4),g("ngModelChange",function(m){return e.updateSetting("timeFormat",m)}),i(193,"mat-option",28),s(194),o(195,"tr"),n(),i(196,"mat-option",29),s(197),o(198,"tr"),n()()(),i(199,"mat-form-field",3)(200,"mat-label"),s(201),o(202,"tr"),n(),i(203,"mat-select",4),g("ngModelChange",function(m){return e.updateSetting("firstDayOfWeek",m===0?0:1)}),i(204,"mat-option",8),s(205),o(206,"tr"),n(),i(207,"mat-option",8),s(208),o(209,"tr"),n()()()(),i(210,"section",1)(211,"h2",2),s(212),o(213,"tr"),n(),i(214,"p",30),s(215),o(216,"tr"),n(),i(217,"h3",31),s(218),o(219,"tr"),n(),i(220,"div",32),P(221,Lt,3,4,"button",33,ee),i(223,"button",20),g("click",function(){return e.resetAllCustomOptions()}),s(224),o(225,"tr"),n()(),i(226,"h3",31),s(227),o(228,"tr"),n(),i(229,"div",32)(230,"button",20),g("click",function(){return e.resetFilters()}),s(231),o(232,"tr"),n(),i(233,"button",20),g("click",function(){return e.resetAppearance()}),s(234),o(235,"tr"),n(),i(236,"button",20),g("click",function(){return e.resetWeatherSettings()}),s(237),o(238,"tr"),n(),i(239,"button",20),g("click",function(){return e.resetSecuritySettings()}),s(240),o(241,"tr"),n(),i(242,"button",20),g("click",function(){return e.resetAllSettings()}),s(243),o(244,"tr"),n()(),i(245,"h3",34),s(246),o(247,"tr"),n(),i(248,"p",35),s(249),o(250,"tr"),n(),i(251,"mat-form-field",3)(252,"mat-label"),s(253),o(254,"tr"),n(),i(255,"input",36),g("ngModelChange",function(m){return e.fullResetInput.set(m)}),n()(),i(256,"button",37),g("click",function(){return e.resetFullApplication()}),s(257),o(258,"tr"),n()(),i(259,"section",1)(260,"h2",2),s(261),o(262,"tr"),n(),i(263,"button",38),g("click",function(){return e.exportBackup()}),s(264),o(265,"tr"),o(266,"tr"),n(),i(267,"label",39)(268,"input",40),g("change",function(m){return e.importBackup(m)}),n(),i(269,"span",41),s(270),o(271,"tr"),n()()(),i(272,"section",42)(273,"h2",2),s(274),o(275,"tr"),n(),i(276,"p"),s(277),o(278,"tr"),n(),i(279,"a",43),s(280),o(281,"tr"),n(),s(282," \xB7 "),i(283,"a",44),s(284),o(285,"tr"),n(),s(286," \xB7 "),i(287,"a",45),s(288),o(289,"tr"),n()(),B(290,Pt,2,1,"p",46)),a&2&&(t(3),d(l(4,105,"settings.appearance")),t(4),d(l(8,107,"settings.theme")),t(2),u("ngModel",e.settings().themeMode),t(2),d(l(12,109,"settings.darkMode")),t(3),d(l(15,111,"settings.lightMode")),t(3),d(l(18,113,"settings.systemPreference")),t(4),d(l(22,115,"settings.language")),t(2),u("ngModel",e.settings().language),t(),O(e.supportedLanguages),t(2),C("data-theme",e.settings().themeMode==="system"?null:e.settings().themeMode),t(),w(" ",l(28,117,"settings.preview")," "),t(4),d(l(32,119,"settings.units")),t(4),d(l(36,121,"settings.weight")),t(2),u("ngModel",e.settings().weightUnit),t(2),d(l(40,123,"settings.kilograms")),t(3),d(l(43,125,"settings.pounds")),t(4),d(l(47,127,"settings.length")),t(2),u("ngModel",e.settings().lengthUnit),t(2),d(l(51,129,"settings.centimeters")),t(3),d(l(54,131,"settings.inches")),t(4),d(l(58,133,"settings.temperature")),t(2),u("ngModel",e.settings().temperatureUnit),t(2),d(l(62,135,"settings.celsius")),t(3),d(l(65,137,"settings.fahrenheit")),t(4),d(l(69,139,"settings.distance")),t(2),u("ngModel",e.settings().distanceUnit),t(2),d(l(73,141,"settings.meters")),t(3),d(l(76,143,"settings.feet")),t(4),d(l(80,145,"settings.security")),t(4),d(l(84,147,"settings.lockAfter")),t(2),u("ngModel",e.settings().lockTimeoutMinutes),t(3),d(l(89,149,"settings.currentPin")),t(2),A("ngModel",e.oldPin),t(3),d(l(94,151,"settings.newPin")),t(2),A("ngModel",e.newPin),t(3),d(l(99,153,"settings.confirmPin")),t(2),A("ngModel",e.confirmPin),t(2),d(l(103,155,"settings.changePin")),t(3),d(l(106,157,"settings.lockNow")),t(4),d(l(110,159,"settings.weather")),t(2),u("ngModel",e.settings().detailedWeatherEnabled),t(),w(" ",l(113,161,"settings.enableDetailedWeather")," "),t(2),u("ngModel",e.settings().autoLoadWeather),t(),w(" ",l(116,163,"settings.autoLoadWeather")," "),t(2),u("ngModel",e.settings().useGpsForWeather),t(),w(" ",l(119,165,"settings.useGps")," "),t(2),u("ngModel",e.settings().showWeatherWarnings),t(),w(" ",l(122,167,"settings.showWarnings")," "),t(4),d(l(126,169,"settings.refreshMinutes")),t(2),u("ngModel",e.settings().weatherRefreshMinutes),t(2),d(l(130,171,"settings.deleteCachedWeather")),t(4),d(l(134,173,"settings.gallery")),t(4),d(l(138,175,"settings.defaultSorting")),t(2),u("ngModel",e.settings().gallerySortDefault),t(2),d(l(142,177,"settings.newest")),t(3),d(l(145,179,"settings.oldest")),t(3),d(l(148,181,"settings.favoriteFirst")),t(4),d(l(152,183,"settings.thumbnailSize")),t(2),u("ngModel",e.settings().galleryThumbnailSize),t(2),d(l(156,185,"settings.small")),t(3),d(l(159,187,"settings.medium")),t(3),d(l(162,189,"settings.large")),t(2),u("ngModel",e.settings().galleryFavoritesFirst),t(),w(" ",l(165,191,"settings.showFavoritesFirst")," "),t(3),d(l(168,193,"settings.clearHomepageImage")),t(4),d(l(172,195,"settings.general")),t(4),d(l(176,197,"settings.defaultLake")),t(2),u("ngModel",e.settings().defaultLakeId),t(2),d(l(180,199,"common.none")),t(2),O(e.lakes()),t(4),d(l(186,201,"settings.maxRods")),t(2),u("ngModel",e.settings().maxRodCount),t(3),d(l(191,203,"settings.timeFormat")),t(2),u("ngModel",e.settings().timeFormat),t(2),d(l(195,205,"settings.hour24")),t(3),d(l(198,207,"settings.hour12")),t(4),d(l(202,209,"settings.firstDayWeek")),t(2),u("ngModel",e.settings().firstDayOfWeek),t(),u("value",0),t(),d(l(206,211,"settings.sunday")),t(2),u("value",1),t(),d(l(209,213,"settings.monday")),t(4),d(l(213,215,"settings.resetSection")),t(3),d(l(216,217,"settings.resetDesc")),t(3),d(l(219,219,"settings.customOptions")),t(3),O(e.optionCategories),t(3),d(l(225,221,"settings.resetAllCustom")),t(3),d(l(228,223,"settings.preferences")),t(4),d(l(232,225,"settings.resetFilters")),t(3),d(l(235,227,"settings.resetAppearance")),t(3),d(l(238,229,"settings.resetWeather")),t(3),d(l(241,231,"settings.resetSecurity")),t(3),d(l(244,233,"settings.resetAllSettings")),t(3),d(l(247,235,"settings.fullReset")),t(3),d(l(250,237,"settings.fullResetWarn")),t(4),d(l(254,239,"settings.confirmation")),t(2),u("ngModel",e.fullResetInput()),t(2),d(l(258,241,"settings.resetEntire")),t(4),d(l(262,243,"settings.data")),t(2),u("disabled",e.exporting()),t(),w(" ",e.exporting()?l(265,245,"settings.exporting"):l(266,247,"settings.exportJson")," "),t(6),d(l(271,249,"settings.importJson")),t(4),d(l(275,251,"settings.about")),t(3),d(l(278,253,"settings.aboutText")),t(3),d(l(281,255,"settings.profile")),t(4),d(l(285,257,"settings.documents")),t(4),d(l(289,259,"settings.releaseNotes")),t(2),L(e.message()?290:-1))},dependencies:[nt,Qe,tt,Ze,it,et,Le,je,He,rt,st,at,mt,dt,ct,lt,ot,ft,ut,_t,Ke,Ve],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}"]})};export{wt as SettingsComponent};
