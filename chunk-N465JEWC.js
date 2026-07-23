import{a as $,b as _t}from"./chunk-ZXWV4WQG.js";import{b as Le}from"./chunk-SON744WW.js";import{a as gt}from"./chunk-RFUXU34C.js";import{a as Xe}from"./chunk-3LRP5VIW.js";import{a as Je}from"./chunk-J2YKMKSV.js";import{a as ut,b as vt,c as ft}from"./chunk-JC3ZP23I.js";import{a as ht}from"./chunk-G53EZPEC.js";import{a as $e}from"./chunk-PFA2N35Q.js";import{a as lt,b as ct}from"./chunk-DJZ5CYQK.js";import{d as dt,h as mt,i as pt}from"./chunk-DHFDQYSB.js";import"./chunk-DR3UZJ4F.js";import{a as Qe,c as Ye,d as Ze,g as et,i as tt,j as it,o as nt,p as at,q as st,u as rt,v as ot}from"./chunk-GRXGMZPS.js";import{a as X}from"./chunk-7LNVFYYO.js";import{a as Ve}from"./chunk-43UJX64R.js";import"./chunk-KXJNBHTT.js";import{A as De,D as ze,E as We,H as He,I as je,f as Oe,q as Fe}from"./chunk-DN5WZ2ZN.js";import{a as Ge,b as K,c as V,d as q,e as G}from"./chunk-BH4E36ML.js";import{c as qe}from"./chunk-THDFTCPJ.js";import{a as j,b as N}from"./chunk-FWIYJOL3.js";import{a as U}from"./chunk-MM3A7HXR.js";import{a as H}from"./chunk-2BFT5V65.js";import"./chunk-T3O53AXP.js";import{a as Ke}from"./chunk-ARNLYBJN.js";import{e as Pe}from"./chunk-JGIAOLL7.js";import{a as W}from"./chunk-H6LPS52F.js";import{D as Ue,p as ie,v as ne,w as ae,x as v,y as Ae}from"./chunk-QPC6YNGT.js";import{b as f,d as z,e as Ne}from"./chunk-LGTHGJE4.js";import{$b as Ce,Aa as ve,Ac as Re,Bb as ee,Cb as L,Db as O,Eb as p,Fb as i,Gb as n,Gc as Te,Hb as y,Ic as S,Jc as Be,Lb as _e,Mb as be,Pb as h,Rb as I,Sb as ye,Tb as we,Va as t,Vb as Se,Wb as ke,Xb as xe,Y as ce,Z as M,_ as de,a as C,aa as me,b as E,ba as b,bc as te,ca as u,cc as Ie,dc as s,ec as d,fc as w,gc as Ee,ha as pe,ia as ge,ib as T,ja as he,jb as fe,jc as A,kc as F,lc as D,nc as Me,pa as Z,qc as r,rc as o,ta as R,xa as ue,xb as x,yb as B,zb as P}from"./chunk-W7TOWTEY.js";var xt=["switch"],Ct=["*"];function It(g,c){g&1&&(i(0,"span",11),he(),i(1,"svg",13),y(2,"path",14),n(),i(3,"svg",15),y(4,"path",16),n()())}var Et=new me("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),J=class{source;checked;constructor(c,a){this.source=c,this.checked=a}},Mt=(()=>{class g{_elementRef=u(ve);_focusMonitor=u(Oe);_changeDetectorRef=u(Te);defaults=u(Et);_onChange=a=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(a){return new J(this,a)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=De();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(a){this._checked=a,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Z;toggleChange=new Z;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(Ae).load(We);let a=u(new Re("tabindex"),{optional:!0}),e=this.defaults;this.tabIndex=a==null?0:parseInt(a)||0,this.color=e.color||"accent",this.id=this._uniqueId=u(Fe).getId("mat-mdc-slide-toggle-"),this.hideIcon=e.hideIcon??!1,this.disabledInteractive=e.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(a=>{a==="keyboard"||a==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):a||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(a){a.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(a){this.checked=!!a}registerOnChange(a){this._onChange=a}registerOnTouched(a){this._onTouched=a}validate(a){return this.required&&a.value!==!0?{required:!0}:null}registerOnValidatorChange(a){this._validatorOnChange=a}setDisabledState(a){this.disabled=a,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new J(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(e){return new(e||g)};static \u0275cmp=T({type:g,selectors:[["mat-slide-toggle"]],viewQuery:function(e,l){if(e&1&&Se(xt,5),e&2){let m;ke(m=xe())&&(l._switchElement=m.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(e,l){e&2&&(be("id",l.id),x("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Ie(l.color?"mat-"+l.color:""),te("mat-mdc-slide-toggle-focused",l._focused)("mat-mdc-slide-toggle-checked",l.checked)("_mat-animation-noopable",l._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",S],color:"color",disabled:[2,"disabled","disabled",S],disableRipple:[2,"disableRipple","disableRipple",S],tabIndex:[2,"tabIndex","tabIndex",a=>a==null?0:Be(a)],checked:[2,"checked","checked",S],hideIcon:[2,"hideIcon","hideIcon",S],disabledInteractive:[2,"disabledInteractive","disabledInteractive",S]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Me([{provide:Qe,useExisting:ce(()=>g),multi:!0},{provide:Ze,useExisting:g,multi:!0}]),ue],ngContentSelectors:Ct,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(e,l){if(e&1&&(ye(),i(0,"div",1)(1,"button",2,0),h("click",function(){return l._handleClick()}),y(3,"div",3)(4,"span",4),i(5,"span",5)(6,"span",6)(7,"span",7),y(8,"span",8),n(),i(9,"span",9),y(10,"span",10),n(),B(11,It,5,0,"span",11),n()()(),i(12,"label",12),h("click",function(k){return k.stopPropagation()}),we(13),n()()),e&2){let m=Ce(2);p("labelPosition",l.labelPosition),t(),te("mdc-switch--selected",l.checked)("mdc-switch--unselected",!l.checked)("mdc-switch--checked",l.checked)("mdc-switch--disabled",l.disabled)("mat-mdc-slide-toggle-disabled-interactive",l.disabledInteractive),p("tabIndex",l.disabled&&!l.disabledInteractive?-1:l.tabIndex)("disabled",l.disabled&&!l.disabledInteractive),x("id",l.buttonId)("name",l.name)("aria-label",l.ariaLabel)("aria-labelledby",l._getAriaLabelledBy())("aria-describedby",l.ariaDescribedby)("aria-required",l.required||null)("aria-checked",l.checked)("aria-disabled",l.disabled&&l.disabledInteractive?"true":null),t(9),p("matRippleTrigger",m)("matRippleDisabled",l.disableRipple||l.disabled)("matRippleCentered",!0),t(),P(l.hideIcon?-1:11),t(),p("for",l.buttonId),x("id",l._labelId)}},dependencies:[ze,ut],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return g})(),bt=(()=>{class g{static \u0275fac=function(e){return new(e||g)};static \u0275mod=fe({type:g});static \u0275inj=de({imports:[Mt,Ue]})}return g})();var Q=class g{constructor(c,a,e,l,m,k,re,oe,le){this.sessionRepo=c;this.catchRepo=a;this.lakeRepo=e;this.imageRepo=l;this.biteEventRepo=m;this.fishSpottedRepo=k;this.rodSpotHistoryRepo=re;this.sessionEventRepo=oe;this.userOptionRepo=le}sessionRepo;catchRepo;lakeRepo;imageRepo;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;userOptionRepo;async export(){let c=await this.sessionRepo.getAll(),a=await this.catchRepo.getAll(),e=await this.lakeRepo.getAll(),l=await this.imageRepo.getAll(),m=await this.biteEventRepo.getAll(),k=await v.fishSpottedEvents.toArray(),re=await v.rodSpotHistory.toArray(),oe=await v.sessionEvents.toArray(),le=await this.userOptionRepo.getAll(),kt=await Promise.all(l.map(async _=>({id:_.id,type:_.type,parentId:_.parentId,fileName:_.fileName,mimeType:_.mimeType,data:await ne(_.blob),thumbnail:await ne(_.thumbnailBlob),createdAt:_.createdAt,isFavorite:_.isFavorite,isHomepageImage:_.isHomepageImage})));return{version:3,exportedAt:ie(),sessions:c,catches:a,lakes:e,images:kt,biteEvents:m,fishSpottedEvents:k,rodSpotHistory:re,sessionEvents:oe,userOptions:le}}async import(c){if(!c.version||!c.sessions||!c.catches||!c.lakes)throw new Error("Invalid backup file");let a=c.sessions.filter(e=>e.status==="active");a.length>1&&a.slice(1).forEach(e=>{e.status="completed",e.endDate=e.endDate??ie()}),await v.transaction("rw",[v.sessions,v.catches,v.lakes,v.images,v.biteEvents,v.fishSpottedEvents,v.rodSpotHistory,v.sessionEvents,v.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear();for(let e of c.lakes)await this.lakeRepo.put(e);for(let e of c.sessions)await this.sessionRepo.put(E(C({},e),{sessionSpots:e.sessionSpots??[],rods:e.rods??[]}));for(let e of c.catches)await this.catchRepo.put(e);for(let e of c.images??[])await this.imageRepo.put({id:e.id,type:e.type,parentId:e.parentId,fileName:e.fileName??`${e.id}.jpg`,blob:ae(e.data,e.mimeType),thumbnailBlob:ae(e.thumbnail,e.mimeType),mimeType:e.mimeType,createdAt:e.createdAt,isFavorite:e.isFavorite??!1,isHomepageImage:e.isHomepageImage??!1});for(let e of c.biteEvents??[])await this.biteEventRepo.put(e);for(let e of c.fishSpottedEvents??[])await this.fishSpottedRepo.put(e);for(let e of c.rodSpotHistory??[])await this.rodSpotHistoryRepo.put(e);for(let e of c.sessionEvents??[])await this.sessionEventRepo.put(e);for(let e of c.userOptions??[])await this.userOptionRepo.put(e)})}downloadJson(c){let a=new Blob([JSON.stringify(c,null,2)],{type:"application/json"}),e=URL.createObjectURL(a),l=document.createElement("a");l.href=e,l.download=`fish-tracker-backup-${new Date().toISOString().slice(0,10)}.json`,l.click(),URL.revokeObjectURL(e)}static \u0275fac=function(a){return new(a||g)(b(W),b(U),b(H),b(j),b(K),b(V),b(q),b(G),b($))};static \u0275prov=M({token:g,factory:g.\u0275fac,providedIn:"root"})};var yt="fish-tracker-weather-cache",wt="fish-tracker-filter-presets",Rt="fish-tracker-lock-state",Y=class g{settings=u(z);theme=u(X);filterService=u(gt);userOptions=u(_t);imageService=u(N);sessionRepo=u(W);catchRepo=u(U);lakeRepo=u(H);imageRepo=u(j);biteEventRepo=u(K);fishSpottedRepo=u(V);rodSpotHistoryRepo=u(q);sessionEventRepo=u(G);userOptionRepo=u($);async resetCustomOptionsCategory(c,a=!0){await this.userOptions.resetCategory(c,a)}async resetAllCustomOptions(c=!0){await this.userOptions.resetAllCustom(c)}async restoreDefaultOptions(c){await this.userOptions.restoreDefaults(c)}resetFilters(){localStorage.removeItem(wt),this.filterService.clearActive()}async resetAppearance(){this.theme.setTheme(f.themeMode),this.settings.update({gallerySortDefault:f.gallerySortDefault,galleryThumbnailSize:f.galleryThumbnailSize,galleryFavoritesFirst:f.galleryFavoritesFirst}),await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(yt),this.settings.update({detailedWeatherEnabled:f.detailedWeatherEnabled,autoLoadWeather:f.autoLoadWeather,weatherRefreshMinutes:f.weatherRefreshMinutes,useGpsForWeather:f.useGpsForWeather,showWeatherWarnings:f.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:f.lockTimeoutMinutes})}async resetAllSettings(){let c=this.settings.get().pinHash,a=this.settings.get().pinSalt,e=this.settings.get().pinEnabled;this.settings.update(E(C({},f),{pinHash:c,pinSalt:a,pinEnabled:e})),this.resetFilters(),await this.resetAppearance(),this.resetWeather(),this.resetSecurity()}async resetFullApplication(){await v.transaction("rw",[v.sessions,v.catches,v.lakes,v.images,v.profiles,v.profileDocuments,v.biteEvents,v.fishSpottedEvents,v.rodSpotHistory,v.sessionEvents,v.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await v.profiles.clear(),await v.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear()}),localStorage.removeItem(wt),localStorage.removeItem(yt),localStorage.removeItem(Rt),this.clearExpandStates(),this.settings.update(C({},f)),await this.userOptions.restoreDefaults()}clearExpandStates(){let c=[];for(let a=0;a<localStorage.length;a++){let e=localStorage.key(a);e?.startsWith("expand-")&&c.push(e)}for(let a of c)localStorage.removeItem(a)}static \u0275fac=function(a){return new(a||g)};static \u0275prov=M({token:g,factory:g.\u0275fac,providedIn:"root"})};var Tt=(g,c)=>c.id;function Bt(g,c){if(g&1&&(i(0,"mat-option",11),s(1),n()),g&2){let a=c.$implicit,e=I();p("value",a),t(),d(e.languageLabel(a))}}function Pt(g,c){if(g&1&&(i(0,"mat-option",11),s(1),n()),g&2){let a=c.$implicit;p("value",a.id),t(),d(a.name)}}function Lt(g,c){if(g&1){let a=_e();i(0,"button",34),h("click",function(){let l=pe(a).$implicit,m=I();return ge(m.resetOptionCategory(l))}),s(1),r(2,"tr"),n()}if(g&2){let a=c.$implicit,e=I();t(),Ee("",o(2,2,"common.reset")," ",e.categoryLabel(a))}}function Ot(g,c){if(g&1&&(i(0,"p",59),s(1),n()),g&2){let a=I();t(),d(a.message())}}var St=class g{settingsService=u(z);backupService=u(Q);pinLock=u(Le);confirm=u(ht);theme=u(X);imageService=u(N);weatherService=u(Ge);lakeService=u(Xe);notifications=u(Ve);resetService=u(Y);i18n=u(Ne);settings=this.settingsService.settings;supportedLanguages=this.i18n.supportedLanguages;lakes=qe(this.lakeService.watchAll(),{initialValue:[]});message=R("");exporting=R(!1);fullResetInput=R("");optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";updateUnits(c,a){this.settingsService.update({[c]:a})}updateTheme(c){this.theme.setTheme(c)}updateLanguage(c){this.i18n.setLanguage(c)}updateSetting(c,a){this.settingsService.update({[c]:a})}updateLockTimeout(c){this.settingsService.update({lockTimeoutMinutes:c})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let c=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(c?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}logout(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let c=await this.backupService.export();this.backupService.downloadJson(c),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async importBackup(c){let a=c.target,e=a.files?.[0];if(!(!e||!await this.confirm.confirm({title:"Import backup?",message:"This will replace all data. This action cannot be undone.",confirmLabel:"Import"}))){try{let m=await e.text(),k=JSON.parse(m);await this.backupService.import(k),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}a.value=""}}clearWeatherCache(){localStorage.removeItem("fish-tracker-weather-cache"),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(c){let a=this.categoryLabel(c);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${a}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(c,!0),this.notifications.success(`${a} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")))}languageLabel(c){return c==="nl"?"Nederlands":c==="en"?"English":"Deutsch"}categoryLabel(c){return this.i18n.t(`options.category.${c}`)}static \u0275fac=function(a){return new(a||g)};static \u0275cmp=T({type:g,selectors:[["app-settings"]],decls:328,vars:278,consts:[["title","common.settings"],[1,"section","app-card"],["sectionId","settings-appearance","persistKey","settings-appearance","label","appearance",3,"defaultExpanded","flat"],["expandHeader",""],[1,"section-title"],[1,"submenu-content"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],[1,"theme-preview"],["sectionId","settings-units","persistKey","settings-units","label","units",3,"flat"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["sectionId","settings-general","persistKey","settings-general","label","general",3,"flat"],["value",""],["matInput","","type","number",3,"ngModelChange","ngModel"],["value","24h"],["value","12h"],["sectionId","settings-gallery","persistKey","settings-gallery","label","gallery",3,"flat"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["mat-stroked-button","","type","button",3,"click"],["sectionId","settings-weather","persistKey","settings-weather","label","weather",3,"flat"],["sectionId","settings-security","persistKey","settings-security","label","security",3,"flat"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],[1,"action-row"],["sectionId","settings-data","persistKey","settings-data","label","data",3,"flat"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],["sectionId","settings-reset","persistKey","settings-reset","label","reset",3,"flat"],[1,"reset-desc"],[1,"subsection"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],["mat-stroked-button","","color","warn","type","button",3,"click"],[1,"section","app-card","about"],["sectionId","settings-about","persistKey","settings-about","label","about",3,"flat"],["routerLink","/profile"],["routerLink","/profile/documents"],["sectionId","settings-changelog","persistKey","settings-changelog","label","changelog",3,"flat"],["mat-stroked-button","","routerLink","/release-notes"],[1,"message"]],template:function(a,e){a&1&&(y(0,"app-page-title",0),i(1,"section",1)(2,"app-expandable-section",2)(3,"div",3)(4,"h2",4),s(5),r(6,"tr"),n()(),i(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),s(10),r(11,"tr"),n(),i(12,"mat-select",7),h("ngModelChange",function(m){return e.updateTheme(m)}),i(13,"mat-option",8),s(14),r(15,"tr"),n(),i(16,"mat-option",9),s(17),r(18,"tr"),n(),i(19,"mat-option",10),s(20),r(21,"tr"),n()()(),i(22,"mat-form-field",6)(23,"mat-label"),s(24),r(25,"tr"),n(),i(26,"mat-select",7),h("ngModelChange",function(m){return e.updateLanguage(m)}),L(27,Bt,2,2,"mat-option",11,ee),n()(),i(29,"div",12),s(30),r(31,"tr"),n()()()(),i(32,"section",1)(33,"app-expandable-section",13)(34,"div",3)(35,"h2",4),s(36),r(37,"tr"),n()(),i(38,"div",5)(39,"mat-form-field",6)(40,"mat-label"),s(41),r(42,"tr"),n(),i(43,"mat-select",7),h("ngModelChange",function(m){return e.updateUnits("weightUnit",m)}),i(44,"mat-option",14),s(45),r(46,"tr"),n(),i(47,"mat-option",15),s(48),r(49,"tr"),n()()(),i(50,"mat-form-field",6)(51,"mat-label"),s(52),r(53,"tr"),n(),i(54,"mat-select",7),h("ngModelChange",function(m){return e.updateUnits("lengthUnit",m)}),i(55,"mat-option",16),s(56),r(57,"tr"),n(),i(58,"mat-option",17),s(59),r(60,"tr"),n()()(),i(61,"mat-form-field",6)(62,"mat-label"),s(63),r(64,"tr"),n(),i(65,"mat-select",7),h("ngModelChange",function(m){return e.updateUnits("temperatureUnit",m)}),i(66,"mat-option",18),s(67),r(68,"tr"),n(),i(69,"mat-option",19),s(70),r(71,"tr"),n()()(),i(72,"mat-form-field",6)(73,"mat-label"),s(74),r(75,"tr"),n(),i(76,"mat-select",7),h("ngModelChange",function(m){return e.updateUnits("distanceUnit",m)}),i(77,"mat-option",20),s(78),r(79,"tr"),n(),i(80,"mat-option",21),s(81),r(82,"tr"),n()()()()()(),i(83,"section",1)(84,"app-expandable-section",22)(85,"div",3)(86,"h2",4),s(87),r(88,"tr"),n()(),i(89,"div",5)(90,"mat-form-field",6)(91,"mat-label"),s(92),r(93,"tr"),n(),i(94,"mat-select",7),h("ngModelChange",function(m){return e.updateSetting("defaultLakeId",m||void 0)}),i(95,"mat-option",23),s(96),r(97,"tr"),n(),L(98,Pt,2,2,"mat-option",11,Tt),n()(),i(100,"mat-form-field",6)(101,"mat-label"),s(102),r(103,"tr"),n(),i(104,"input",24),h("ngModelChange",function(m){return e.updateSetting("maxRodCount",+m)}),n()(),i(105,"mat-form-field",6)(106,"mat-label"),s(107),r(108,"tr"),n(),i(109,"mat-select",7),h("ngModelChange",function(m){return e.updateSetting("timeFormat",m)}),i(110,"mat-option",25),s(111),r(112,"tr"),n(),i(113,"mat-option",26),s(114),r(115,"tr"),n()()(),i(116,"mat-form-field",6)(117,"mat-label"),s(118),r(119,"tr"),n(),i(120,"mat-select",7),h("ngModelChange",function(m){return e.updateSetting("firstDayOfWeek",m===0?0:1)}),i(121,"mat-option",11),s(122),r(123,"tr"),n(),i(124,"mat-option",11),s(125),r(126,"tr"),n()()()()()(),i(127,"section",1)(128,"app-expandable-section",27)(129,"div",3)(130,"h2",4),s(131),r(132,"tr"),n()(),i(133,"div",5)(134,"mat-form-field",6)(135,"mat-label"),s(136),r(137,"tr"),n(),i(138,"mat-select",7),h("ngModelChange",function(m){return e.updateSetting("gallerySortDefault",m)}),i(139,"mat-option",28),s(140),r(141,"tr"),n(),i(142,"mat-option",29),s(143),r(144,"tr"),n(),i(145,"mat-option",30),s(146),r(147,"tr"),n()()(),i(148,"mat-form-field",6)(149,"mat-label"),s(150),r(151,"tr"),n(),i(152,"mat-select",7),h("ngModelChange",function(m){return e.updateSetting("galleryThumbnailSize",m)}),i(153,"mat-option",31),s(154),r(155,"tr"),n(),i(156,"mat-option",32),s(157),r(158,"tr"),n(),i(159,"mat-option",33),s(160),r(161,"tr"),n()()(),i(162,"mat-checkbox",7),h("ngModelChange",function(m){return e.updateSetting("galleryFavoritesFirst",m)}),s(163),r(164,"tr"),n(),i(165,"button",34),h("click",function(){return e.clearHomepageImage()}),s(166),r(167,"tr"),n()()()(),i(168,"section",1)(169,"app-expandable-section",35)(170,"div",3)(171,"h2",4),s(172),r(173,"tr"),n()(),i(174,"div",5)(175,"mat-checkbox",7),h("ngModelChange",function(m){return e.updateSetting("detailedWeatherEnabled",m)}),s(176),r(177,"tr"),n(),i(178,"mat-checkbox",7),h("ngModelChange",function(m){return e.updateSetting("autoLoadWeather",m)}),s(179),r(180,"tr"),n(),i(181,"mat-checkbox",7),h("ngModelChange",function(m){return e.updateSetting("useGpsForWeather",m)}),s(182),r(183,"tr"),n(),i(184,"mat-checkbox",7),h("ngModelChange",function(m){return e.updateSetting("showWeatherWarnings",m)}),s(185),r(186,"tr"),n(),i(187,"mat-form-field",6)(188,"mat-label"),s(189),r(190,"tr"),n(),i(191,"input",24),h("ngModelChange",function(m){return e.updateSetting("weatherRefreshMinutes",+m)}),n()(),i(192,"button",34),h("click",function(){return e.clearWeatherCache()}),s(193),r(194,"tr"),n()()()(),i(195,"section",1)(196,"app-expandable-section",36)(197,"div",3)(198,"h2",4),s(199),r(200,"tr"),n()(),i(201,"div",5)(202,"mat-form-field",6)(203,"mat-label"),s(204),r(205,"tr"),n(),i(206,"input",24),h("ngModelChange",function(m){return e.updateLockTimeout(+m)}),n()(),i(207,"mat-form-field",6)(208,"mat-label"),s(209),r(210,"tr"),n(),i(211,"input",37),D("ngModelChange",function(m){return F(e.oldPin,m)||(e.oldPin=m),m}),n()(),i(212,"mat-form-field",6)(213,"mat-label"),s(214),r(215,"tr"),n(),i(216,"input",37),D("ngModelChange",function(m){return F(e.newPin,m)||(e.newPin=m),m}),n()(),i(217,"mat-form-field",6)(218,"mat-label"),s(219),r(220,"tr"),n(),i(221,"input",37),D("ngModelChange",function(m){return F(e.confirmPin,m)||(e.confirmPin=m),m}),n()(),i(222,"div",38)(223,"button",34),h("click",function(){return e.changePin()}),s(224),r(225,"tr"),n(),i(226,"button",34),h("click",function(){return e.logout()}),s(227),r(228,"tr"),n()()()()(),i(229,"section",1)(230,"app-expandable-section",39)(231,"div",3)(232,"h2",4),s(233),r(234,"tr"),n()(),i(235,"div",5)(236,"button",40),h("click",function(){return e.exportBackup()}),s(237),r(238,"tr"),r(239,"tr"),n(),i(240,"label",41)(241,"input",42),h("change",function(m){return e.importBackup(m)}),n(),i(242,"span",43),s(243),r(244,"tr"),n()()()()(),i(245,"section",1)(246,"app-expandable-section",44)(247,"div",3)(248,"h2",4),s(249),r(250,"tr"),n()(),i(251,"div",5)(252,"p",45),s(253),r(254,"tr"),n(),i(255,"h3",46),s(256),r(257,"tr"),n(),i(258,"div",47),L(259,Lt,3,4,"button",48,ee),i(261,"button",34),h("click",function(){return e.resetAllCustomOptions()}),s(262),r(263,"tr"),n()(),i(264,"h3",46),s(265),r(266,"tr"),n(),i(267,"div",47)(268,"button",34),h("click",function(){return e.resetFilters()}),s(269),r(270,"tr"),n(),i(271,"button",34),h("click",function(){return e.resetAppearance()}),s(272),r(273,"tr"),n(),i(274,"button",34),h("click",function(){return e.resetWeatherSettings()}),s(275),r(276,"tr"),n(),i(277,"button",34),h("click",function(){return e.resetSecuritySettings()}),s(278),r(279,"tr"),n(),i(280,"button",34),h("click",function(){return e.resetAllSettings()}),s(281),r(282,"tr"),n()(),i(283,"h3",49),s(284),r(285,"tr"),n(),i(286,"p",50),s(287),r(288,"tr"),n(),i(289,"mat-form-field",6)(290,"mat-label"),s(291),r(292,"tr"),n(),i(293,"input",51),h("ngModelChange",function(m){return e.fullResetInput.set(m)}),n()(),i(294,"button",52),h("click",function(){return e.resetFullApplication()}),s(295),r(296,"tr"),n()()()(),i(297,"section",53)(298,"app-expandable-section",54)(299,"div",3)(300,"h2",4),s(301),r(302,"tr"),n()(),i(303,"div",5)(304,"p"),s(305),r(306,"tr"),n(),i(307,"a",55),s(308),r(309,"tr"),n(),s(310," \xB7 "),i(311,"a",56),s(312),r(313,"tr"),n()()()(),i(314,"section",1)(315,"app-expandable-section",57)(316,"div",3)(317,"h2",4),s(318),r(319,"tr"),n()(),i(320,"div",5)(321,"p"),s(322),r(323,"tr"),n(),i(324,"a",58),s(325),r(326,"tr"),n()()()(),B(327,Ot,2,1,"p",59)),a&2&&(t(2),p("defaultExpanded",!0)("flat",!0),t(3),d(o(6,118,"settings.appearance")),t(5),d(o(11,120,"settings.theme")),t(2),p("ngModel",e.settings().themeMode),t(2),d(o(15,122,"settings.darkMode")),t(3),d(o(18,124,"settings.lightMode")),t(3),d(o(21,126,"settings.systemPreference")),t(4),d(o(25,128,"settings.language")),t(2),p("ngModel",e.settings().language),t(),O(e.supportedLanguages),t(2),x("data-theme",e.settings().themeMode==="system"?null:e.settings().themeMode),t(),w(" ",o(31,130,"settings.preview")," "),t(3),p("flat",!0),t(3),d(o(37,132,"settings.units")),t(5),d(o(42,134,"settings.weight")),t(2),p("ngModel",e.settings().weightUnit),t(2),d(o(46,136,"settings.kilograms")),t(3),d(o(49,138,"settings.pounds")),t(4),d(o(53,140,"settings.length")),t(2),p("ngModel",e.settings().lengthUnit),t(2),d(o(57,142,"settings.centimeters")),t(3),d(o(60,144,"settings.inches")),t(4),d(o(64,146,"settings.temperature")),t(2),p("ngModel",e.settings().temperatureUnit),t(2),d(o(68,148,"settings.celsius")),t(3),d(o(71,150,"settings.fahrenheit")),t(4),d(o(75,152,"settings.distance")),t(2),p("ngModel",e.settings().distanceUnit),t(2),d(o(79,154,"settings.meters")),t(3),d(o(82,156,"settings.feet")),t(3),p("flat",!0),t(3),d(o(88,158,"settings.general")),t(5),d(o(93,160,"settings.defaultLake")),t(2),p("ngModel",e.settings().defaultLakeId),t(2),d(o(97,162,"common.none")),t(2),O(e.lakes()),t(4),d(o(103,164,"settings.maxRods")),t(2),p("ngModel",e.settings().maxRodCount),t(3),d(o(108,166,"settings.timeFormat")),t(2),p("ngModel",e.settings().timeFormat),t(2),d(o(112,168,"settings.hour24")),t(3),d(o(115,170,"settings.hour12")),t(4),d(o(119,172,"settings.firstDayWeek")),t(2),p("ngModel",e.settings().firstDayOfWeek),t(),p("value",0),t(),d(o(123,174,"settings.sunday")),t(2),p("value",1),t(),d(o(126,176,"settings.monday")),t(3),p("flat",!0),t(3),d(o(132,178,"settings.gallery")),t(5),d(o(137,180,"settings.defaultSorting")),t(2),p("ngModel",e.settings().gallerySortDefault),t(2),d(o(141,182,"settings.newest")),t(3),d(o(144,184,"settings.oldest")),t(3),d(o(147,186,"settings.favoriteFirst")),t(4),d(o(151,188,"settings.thumbnailSize")),t(2),p("ngModel",e.settings().galleryThumbnailSize),t(2),d(o(155,190,"settings.small")),t(3),d(o(158,192,"settings.medium")),t(3),d(o(161,194,"settings.large")),t(2),p("ngModel",e.settings().galleryFavoritesFirst),t(),w(" ",o(164,196,"settings.showFavoritesFirst")," "),t(3),d(o(167,198,"settings.clearHomepageImage")),t(3),p("flat",!0),t(3),d(o(173,200,"settings.weather")),t(3),p("ngModel",e.settings().detailedWeatherEnabled),t(),w(" ",o(177,202,"settings.enableDetailedWeather")," "),t(2),p("ngModel",e.settings().autoLoadWeather),t(),w(" ",o(180,204,"settings.autoLoadWeather")," "),t(2),p("ngModel",e.settings().useGpsForWeather),t(),w(" ",o(183,206,"settings.useGps")," "),t(2),p("ngModel",e.settings().showWeatherWarnings),t(),w(" ",o(186,208,"settings.showWarnings")," "),t(4),d(o(190,210,"settings.refreshMinutes")),t(2),p("ngModel",e.settings().weatherRefreshMinutes),t(2),d(o(194,212,"settings.deleteCachedWeather")),t(3),p("flat",!0),t(3),d(o(200,214,"settings.security")),t(5),d(o(205,216,"settings.lockAfter")),t(2),p("ngModel",e.settings().lockTimeoutMinutes),t(3),d(o(210,218,"settings.currentPin")),t(2),A("ngModel",e.oldPin),t(3),d(o(215,220,"settings.newPin")),t(2),A("ngModel",e.newPin),t(3),d(o(220,222,"settings.confirmPin")),t(2),A("ngModel",e.confirmPin),t(3),d(o(225,224,"settings.changePin")),t(3),d(o(228,226,"settings.logout")),t(3),p("flat",!0),t(3),d(o(234,228,"settings.data")),t(3),p("disabled",e.exporting()),t(),w(" ",e.exporting()?o(238,230,"settings.exporting"):o(239,232,"settings.exportJson")," "),t(6),d(o(244,234,"settings.importJson")),t(3),p("flat",!0),t(3),d(o(250,236,"settings.resetSection")),t(4),d(o(254,238,"settings.resetDesc")),t(3),d(o(257,240,"settings.customOptions")),t(3),O(e.optionCategories),t(3),d(o(263,242,"settings.resetAllCustom")),t(3),d(o(266,244,"settings.preferences")),t(4),d(o(270,246,"settings.resetFilters")),t(3),d(o(273,248,"settings.resetAppearance")),t(3),d(o(276,250,"settings.resetWeather")),t(3),d(o(279,252,"settings.resetSecurity")),t(3),d(o(282,254,"settings.resetAllSettings")),t(3),d(o(285,256,"settings.fullReset")),t(3),d(o(288,258,"settings.fullResetWarn")),t(4),d(o(292,260,"settings.confirmation")),t(2),p("ngModel",e.fullResetInput()),t(2),d(o(296,262,"settings.resetEntire")),t(3),p("flat",!0),t(3),d(o(302,264,"settings.about")),t(4),d(o(306,266,"settings.aboutText")),t(3),d(o(309,268,"settings.profile")),t(4),d(o(313,270,"settings.documents")),t(3),p("flat",!0),t(3),d(o(319,272,"settings.changelog")),t(4),d(o(323,274,"settings.changelogDesc")),t(3),d(o(326,276,"settings.openChangelog")),t(2),P(e.message()?327:-1))},dependencies:[at,Ye,it,et,nt,tt,Pe,je,He,ot,rt,st,pt,mt,dt,ct,lt,ft,vt,bt,Je,$e,Ke],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.submenu-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.section-title[_ngcontent-%COMP%]{margin:0;font-size:1rem}.action-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}@media(max-width:768px){.section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md)}.action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .reset-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{width:100%;margin-right:0}}"]})};export{St as SettingsComponent};
