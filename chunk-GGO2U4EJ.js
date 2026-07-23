import{a as H,b as pt}from"./chunk-4YBLNVA5.js";import{b as xe}from"./chunk-TTGMWIE2.js";import{a as rt}from"./chunk-YKIBIKTA.js";import{a as lt}from"./chunk-M3SVTOJ7.js";import{a as He}from"./chunk-EEVW2OW3.js";import{a as Ve}from"./chunk-Z7VERAJN.js";import{a as ct,b as dt,c as mt}from"./chunk-YCYH3M6Q.js";import{a as Ue,b as z,c as W,d as B,e as N}from"./chunk-R3DWRJOB.js";import{b as Ne}from"./chunk-6QFZFNGE.js";import{a as A,b as D}from"./chunk-JB424N6W.js";import{a as it,b as nt}from"./chunk-ZG6GO2VU.js";import{a as O}from"./chunk-3APFSQXF.js";import{d as at,h as ot,i as st}from"./chunk-XRX3NOVO.js";import"./chunk-7ARWIEIE.js";import{a as qe,c as Ge,d as Xe,g as Ke,i as Je,j as Ye,o as Qe,p as $e,q as Ze,u as et,v as tt}from"./chunk-O32AP3SG.js";import{a as F}from"./chunk-33C2D2R7.js";import{a as U}from"./chunk-GHWSNM2E.js";import{a as je}from"./chunk-HWSM3MHS.js";import"./chunk-IVXZQBNL.js";import{a as L}from"./chunk-5YKDPWLQ.js";import{H as Oe,R as Fe,U as Ae,V as De,Y as We,Z as Be,b as g,d as P,i as Z,o as ee,p as te,q as h,w as Pe}from"./chunk-RNHKJV2Z.js";import{d as Te}from"./chunk-ELFGQXLG.js";import{l as Le,q as ze}from"./chunk-4B44B5WX.js";import{$ as le,$b as ke,Bb as ue,Cb as X,Db as K,Eb as p,Fb as t,Fc as Me,Gb as i,Hb as v,Hc as _,Ic as Ie,Lb as fe,Mb as ve,Pb as c,Rb as J,Sb as _e,Tb as be,Ua as l,Vb as ye,Wb as we,X as se,Xb as Se,Y as k,Z as re,a as w,aa as f,b as S,ba as m,bc as Y,cc as Ce,dc as n,ec as Q,fc as $,ga as ce,ha as de,hb as E,ia as me,ib as ge,ic as I,jc as T,kc as x,mc as Ee,oa as G,sa as C,wa as pe,xb as y,yb as R,za as he,zb as M,zc as Re}from"./chunk-EDKRMITB.js";var _t=["switch"],bt=["*"];function yt(d,s){d&1&&(t(0,"span",11),me(),t(1,"svg",13),v(2,"path",14),i(),t(3,"svg",15),v(4,"path",16),i()())}var wt=new le("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),j=class{source;checked;constructor(s,a){this.source=s,this.checked=a}},St=(()=>{class d{_elementRef=m(he);_focusMonitor=m(Pe);_changeDetectorRef=m(Me);defaults=m(wt);_onChange=a=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(a){return new j(this,a)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Fe();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(a){this._checked=a,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new G;toggleChange=new G;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){m(Le).load(De);let a=m(new Re("tabindex"),{optional:!0}),e=this.defaults;this.tabIndex=a==null?0:parseInt(a)||0,this.color=e.color||"accent",this.id=this._uniqueId=m(Oe).getId("mat-mdc-slide-toggle-"),this.hideIcon=e.hideIcon??!1,this.disabledInteractive=e.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(a=>{a==="keyboard"||a==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):a||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(a){a.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(a){this.checked=!!a}registerOnChange(a){this._onChange=a}registerOnTouched(a){this._onTouched=a}validate(a){return this.required&&a.value!==!0?{required:!0}:null}registerOnValidatorChange(a){this._validatorOnChange=a}setDisabledState(a){this.disabled=a,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new j(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(e){return new(e||d)};static \u0275cmp=E({type:d,selectors:[["mat-slide-toggle"]],viewQuery:function(e,o){if(e&1&&ye(_t,5),e&2){let r;we(r=Se())&&(o._switchElement=r.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(e,o){e&2&&(ve("id",o.id),y("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Ce(o.color?"mat-"+o.color:""),Y("mat-mdc-slide-toggle-focused",o._focused)("mat-mdc-slide-toggle-checked",o.checked)("_mat-animation-noopable",o._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",_],color:"color",disabled:[2,"disabled","disabled",_],disableRipple:[2,"disableRipple","disableRipple",_],tabIndex:[2,"tabIndex","tabIndex",a=>a==null?0:Ie(a)],checked:[2,"checked","checked",_],hideIcon:[2,"hideIcon","hideIcon",_],disabledInteractive:[2,"disabledInteractive","disabledInteractive",_]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[Ee([{provide:qe,useExisting:se(()=>d),multi:!0},{provide:Xe,useExisting:d,multi:!0}]),pe],ngContentSelectors:bt,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(e,o){if(e&1&&(_e(),t(0,"div",1)(1,"button",2,0),c("click",function(){return o._handleClick()}),v(3,"div",3)(4,"span",4),t(5,"span",5)(6,"span",6)(7,"span",7),v(8,"span",8),i(),t(9,"span",9),v(10,"span",10),i(),R(11,yt,5,0,"span",11),i()()(),t(12,"label",12),c("click",function(b){return b.stopPropagation()}),be(13),i()()),e&2){let r=ke(2);p("labelPosition",o.labelPosition),l(),Y("mdc-switch--selected",o.checked)("mdc-switch--unselected",!o.checked)("mdc-switch--checked",o.checked)("mdc-switch--disabled",o.disabled)("mat-mdc-slide-toggle-disabled-interactive",o.disabledInteractive),p("tabIndex",o.disabled&&!o.disabledInteractive?-1:o.tabIndex)("disabled",o.disabled&&!o.disabledInteractive),y("id",o.buttonId)("name",o.name)("aria-label",o.ariaLabel)("aria-labelledby",o._getAriaLabelledBy())("aria-describedby",o.ariaDescribedby)("aria-required",o.required||null)("aria-checked",o.checked)("aria-disabled",o.disabled&&o.disabledInteractive?"true":null),l(9),p("matRippleTrigger",r)("matRippleDisabled",o.disableRipple||o.disabled)("matRippleCentered",!0),l(),M(o.hideIcon?-1:11),l(),p("for",o.buttonId),y("id",o._labelId)}},dependencies:[Ae,ct],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return d})(),ht=(()=>{class d{static \u0275fac=function(e){return new(e||d)};static \u0275mod=ge({type:d});static \u0275inj=re({imports:[St,ze]})}return d})();var V=class d{constructor(s,a,e,o,r,b,ne,ae,oe){this.sessionRepo=s;this.catchRepo=a;this.lakeRepo=e;this.imageRepo=o;this.biteEventRepo=r;this.fishSpottedRepo=b;this.rodSpotHistoryRepo=ne;this.sessionEventRepo=ae;this.userOptionRepo=oe}sessionRepo;catchRepo;lakeRepo;imageRepo;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;userOptionRepo;async export(){let s=await this.sessionRepo.getAll(),a=await this.catchRepo.getAll(),e=await this.lakeRepo.getAll(),o=await this.imageRepo.getAll(),r=await this.biteEventRepo.getAll(),b=await h.fishSpottedEvents.toArray(),ne=await h.rodSpotHistory.toArray(),ae=await h.sessionEvents.toArray(),oe=await this.userOptionRepo.getAll(),vt=await Promise.all(o.map(async u=>({id:u.id,type:u.type,parentId:u.parentId,fileName:u.fileName,mimeType:u.mimeType,data:await ee(u.blob),thumbnail:await ee(u.thumbnailBlob),createdAt:u.createdAt,isFavorite:u.isFavorite,isHomepageImage:u.isHomepageImage})));return{version:3,exportedAt:Z(),sessions:s,catches:a,lakes:e,images:vt,biteEvents:r,fishSpottedEvents:b,rodSpotHistory:ne,sessionEvents:ae,userOptions:oe}}async import(s){if(!s.version||!s.sessions||!s.catches||!s.lakes)throw new Error("Invalid backup file");let a=s.sessions.filter(e=>e.status==="active");a.length>1&&a.slice(1).forEach(e=>{e.status="completed",e.endDate=e.endDate??Z()}),await h.transaction("rw",[h.sessions,h.catches,h.lakes,h.images,h.biteEvents,h.fishSpottedEvents,h.rodSpotHistory,h.sessionEvents,h.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear();for(let e of s.lakes)await this.lakeRepo.put(e);for(let e of s.sessions)await this.sessionRepo.put(S(w({},e),{sessionSpots:e.sessionSpots??[],rods:e.rods??[]}));for(let e of s.catches)await this.catchRepo.put(e);for(let e of s.images??[])await this.imageRepo.put({id:e.id,type:e.type,parentId:e.parentId,fileName:e.fileName??`${e.id}.jpg`,blob:te(e.data,e.mimeType),thumbnailBlob:te(e.thumbnail,e.mimeType),mimeType:e.mimeType,createdAt:e.createdAt,isFavorite:e.isFavorite??!1,isHomepageImage:e.isHomepageImage??!1});for(let e of s.biteEvents??[])await this.biteEventRepo.put(e);for(let e of s.fishSpottedEvents??[])await this.fishSpottedRepo.put(e);for(let e of s.rodSpotHistory??[])await this.rodSpotHistoryRepo.put(e);for(let e of s.sessionEvents??[])await this.sessionEventRepo.put(e);for(let e of s.userOptions??[])await this.userOptionRepo.put(e)})}downloadJson(s){let a=new Blob([JSON.stringify(s,null,2)],{type:"application/json"}),e=URL.createObjectURL(a),o=document.createElement("a");o.href=e,o.download=`fish-tracker-backup-${new Date().toISOString().slice(0,10)}.json`,o.click(),URL.revokeObjectURL(e)}static \u0275fac=function(a){return new(a||d)(f(L),f(O),f(F),f(A),f(z),f(W),f(B),f(N),f(H))};static \u0275prov=k({token:d,factory:d.\u0275fac,providedIn:"root"})};var gt="fish-tracker-weather-cache",ut="fish-tracker-filter-presets",kt="fish-tracker-lock-state",q=class d{settings=m(P);theme=m(U);filterService=m(rt);userOptions=m(pt);imageService=m(D);sessionRepo=m(L);catchRepo=m(O);lakeRepo=m(F);imageRepo=m(A);biteEventRepo=m(z);fishSpottedRepo=m(W);rodSpotHistoryRepo=m(B);sessionEventRepo=m(N);userOptionRepo=m(H);async resetCustomOptionsCategory(s,a=!0){await this.userOptions.resetCategory(s,a)}async resetAllCustomOptions(s=!0){await this.userOptions.resetAllCustom(s)}async restoreDefaultOptions(s){await this.userOptions.restoreDefaults(s)}resetFilters(){localStorage.removeItem(ut),this.filterService.clearActive()}async resetAppearance(){this.theme.setTheme(g.themeMode),this.settings.update({gallerySortDefault:g.gallerySortDefault,galleryThumbnailSize:g.galleryThumbnailSize,galleryFavoritesFirst:g.galleryFavoritesFirst}),await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(gt),this.settings.update({detailedWeatherEnabled:g.detailedWeatherEnabled,autoLoadWeather:g.autoLoadWeather,weatherRefreshMinutes:g.weatherRefreshMinutes,useGpsForWeather:g.useGpsForWeather,showWeatherWarnings:g.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:g.lockTimeoutMinutes})}async resetAllSettings(){let s=this.settings.get().pinHash,a=this.settings.get().pinSalt,e=this.settings.get().pinEnabled;this.settings.update(S(w({},g),{pinHash:s,pinSalt:a,pinEnabled:e})),this.resetFilters(),await this.resetAppearance(),this.resetWeather(),this.resetSecurity()}async resetFullApplication(){await h.transaction("rw",[h.sessions,h.catches,h.lakes,h.images,h.profiles,h.profileDocuments,h.biteEvents,h.fishSpottedEvents,h.rodSpotHistory,h.sessionEvents,h.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await h.profiles.clear(),await h.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear()}),localStorage.removeItem(ut),localStorage.removeItem(gt),localStorage.removeItem(kt),this.clearExpandStates(),this.settings.update(w({},g)),await this.userOptions.restoreDefaults()}clearExpandStates(){let s=[];for(let a=0;a<localStorage.length;a++){let e=localStorage.key(a);e?.startsWith("expand-")&&s.push(e)}for(let a of s)localStorage.removeItem(a)}static \u0275fac=function(a){return new(a||d)};static \u0275prov=k({token:d,factory:d.\u0275fac,providedIn:"root"})};var Ct=(d,s)=>s.id;function Et(d,s){if(d&1&&(t(0,"mat-option",27),n(1),i()),d&2){let a=s.$implicit;p("value",a.id),l(),Q(a.name)}}function Rt(d,s){if(d&1){let a=fe();t(0,"button",19),c("click",function(){let o=ce(a).$implicit,r=J();return de(r.resetOptionCategory(o))}),n(1),i()}if(d&2){let a=s.$implicit;l(),$("Reset ",a)}}function Mt(d,s){if(d&1&&(t(0,"p",46),n(1),i()),d&2){let a=J();l(),Q(a.message())}}var ft=class d{settingsService=m(P);backupService=m(V);pinLock=m(xe);confirm=m(lt);theme=m(U);imageService=m(D);weatherService=m(Ue);lakeService=m(He);notifications=m(je);resetService=m(q);settings=this.settingsService.settings;lakes=Ne(this.lakeService.watchAll(),{initialValue:[]});message=C("");exporting=C(!1);fullResetInput=C("");optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";updateUnits(s,a){this.settingsService.update({[s]:a})}updateTheme(s){this.theme.setTheme(s)}updateSetting(s,a){this.settingsService.update({[s]:a})}updateLockTimeout(s){this.settingsService.update({lockTimeoutMinutes:s})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set("PIN must be 6 digits and match confirmation");return}let s=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(s?"PIN changed":"Current PIN incorrect"),this.oldPin=this.newPin=this.confirmPin=""}lockNow(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let s=await this.backupService.export();this.backupService.downloadJson(s),this.message.set("Backup exported")}catch{this.message.set("Export failed")}finally{this.exporting.set(!1)}}async importBackup(s){let a=s.target,e=a.files?.[0];if(!(!e||!await this.confirm.confirm({title:"Import backup?",message:"This will replace all data. This action cannot be undone.",confirmLabel:"Import"}))){try{let r=await e.text(),b=JSON.parse(r);await this.backupService.import(b),this.message.set("Backup restored successfully")}catch{this.message.set("Import failed \u2014 invalid backup file")}a.value=""}}clearWeatherCache(){localStorage.removeItem("fish-tracker-weather-cache"),this.notifications.success("Weather cache cleared")}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success("Homepage image cleared")}async resetOptionCategory(s){await this.confirm.confirm({title:`Reset ${s} options?`,message:"Custom options in this category will be removed. Defaults are restored.",confirmLabel:"Reset"})&&(await this.resetService.resetCustomOptionsCategory(s,!0),this.notifications.success(`${s} options reset`))}async resetAllCustomOptions(){await this.confirm.confirm({title:"Reset all custom options?",message:"All custom dropdown options will be removed. Favorites are kept where possible.",confirmLabel:"Reset all"})&&(await this.resetService.resetAllCustomOptions(!0),this.notifications.success("Custom options reset"))}async resetFilters(){await this.confirm.confirm({title:"Reset filters?",message:"Saved filter presets and active filters will be cleared.",confirmLabel:"Reset filters"})&&(this.resetService.resetFilters(),this.notifications.success("Filters reset"))}async resetAppearance(){await this.confirm.confirm({title:"Reset appearance?",message:"Theme, gallery preferences, expanded card states, and homepage image will be reset.",confirmLabel:"Reset"})&&(await this.resetService.resetAppearance(),this.notifications.success("Appearance reset"))}async resetWeatherSettings(){await this.confirm.confirm({title:"Reset weather settings?",message:"Weather cache and provider settings will be restored to defaults.",confirmLabel:"Reset"})&&(this.resetService.resetWeather(),this.notifications.success("Weather settings reset"))}async resetSecuritySettings(){await this.confirm.confirm({title:"Reset security settings?",message:"Auto-lock timeout will reset. Your PIN is kept unless you remove it separately.",confirmLabel:"Reset"})&&(this.resetService.resetSecurity(),this.notifications.success("Security settings reset"))}async resetAllSettings(){await this.confirm.confirm({title:"Reset all settings?",message:"All preferences will reset to defaults. Fishing data is not deleted.",confirmLabel:"Reset settings"})&&(await this.resetService.resetAllSettings(),this.notifications.success("All settings reset"))}async resetFullApplication(){if(await this.confirm.confirm({title:"Export before reset?",message:"Full reset permanently deletes all locally stored data. Export a backup first?",confirmLabel:"Export backup"})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error("Type RESET to confirm full application reset.");return}await this.confirm.confirm({title:"Reset entire application?",message:"This permanently removes all sessions, catches, lakes, images, profile, and settings.",confirmLabel:"Delete everything"})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success("Application reset complete"))}static \u0275fac=function(a){return new(a||d)};static \u0275cmp=E({type:d,selectors:[["app-settings"]],decls:207,vars:28,consts:[["title","Settings"],[1,"section","app-card"],[1,"section-title"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[1,"theme-preview"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["matInput","","type","number",3,"ngModelChange","ngModel"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],["mat-stroked-button","","type","button",3,"click"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["value",""],[3,"value"],["value","24h"],["value","12h"],[1,"reset-desc"],[1,"subsection"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],["mat-stroked-button","","color","warn","type","button",3,"click"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],[1,"section","app-card","about"],["routerLink","/profile"],["routerLink","/profile/documents"],["routerLink","/release-notes"],[1,"message"]],template:function(a,e){a&1&&(v(0,"app-page-title",0),t(1,"section",1)(2,"h2",2),n(3,"Appearance"),i(),t(4,"mat-form-field",3)(5,"mat-label"),n(6,"Theme"),i(),t(7,"mat-select",4),c("ngModelChange",function(r){return e.updateTheme(r)}),t(8,"mat-option",5),n(9,"Dark mode"),i(),t(10,"mat-option",6),n(11,"Light mode"),i(),t(12,"mat-option",7),n(13,"System preference"),i()()(),t(14,"div",8),n(15," Preview "),i()(),t(16,"section",1)(17,"h2",2),n(18,"Units"),i(),t(19,"mat-form-field",3)(20,"mat-label"),n(21,"Weight"),i(),t(22,"mat-select",4),c("ngModelChange",function(r){return e.updateUnits("weightUnit",r)}),t(23,"mat-option",9),n(24,"Kilograms (kg)"),i(),t(25,"mat-option",10),n(26,"Pounds (lbs)"),i()()(),t(27,"mat-form-field",3)(28,"mat-label"),n(29,"Length"),i(),t(30,"mat-select",4),c("ngModelChange",function(r){return e.updateUnits("lengthUnit",r)}),t(31,"mat-option",11),n(32,"Centimeters (cm)"),i(),t(33,"mat-option",12),n(34,"Inches (inch)"),i()()(),t(35,"mat-form-field",3)(36,"mat-label"),n(37,"Temperature"),i(),t(38,"mat-select",4),c("ngModelChange",function(r){return e.updateUnits("temperatureUnit",r)}),t(39,"mat-option",13),n(40,"Celsius"),i(),t(41,"mat-option",14),n(42,"Fahrenheit"),i()()(),t(43,"mat-form-field",3)(44,"mat-label"),n(45,"Distance"),i(),t(46,"mat-select",4),c("ngModelChange",function(r){return e.updateUnits("distanceUnit",r)}),t(47,"mat-option",15),n(48,"Meters"),i(),t(49,"mat-option",16),n(50,"Feet"),i()()()(),t(51,"section",1)(52,"h2",2),n(53,"Security"),i(),t(54,"mat-form-field",3)(55,"mat-label"),n(56,"Lock after (minutes)"),i(),t(57,"input",17),c("ngModelChange",function(r){return e.updateLockTimeout(+r)}),i()(),t(58,"mat-form-field",3)(59,"mat-label"),n(60,"Current PIN"),i(),t(61,"input",18),x("ngModelChange",function(r){return T(e.oldPin,r)||(e.oldPin=r),r}),i()(),t(62,"mat-form-field",3)(63,"mat-label"),n(64,"New PIN"),i(),t(65,"input",18),x("ngModelChange",function(r){return T(e.newPin,r)||(e.newPin=r),r}),i()(),t(66,"mat-form-field",3)(67,"mat-label"),n(68,"Confirm PIN"),i(),t(69,"input",18),x("ngModelChange",function(r){return T(e.confirmPin,r)||(e.confirmPin=r),r}),i()(),t(70,"button",19),c("click",function(){return e.changePin()}),n(71,"Change PIN"),i(),t(72,"button",19),c("click",function(){return e.lockNow()}),n(73,"Lock application now"),i()(),t(74,"section",1)(75,"h2",2),n(76,"Weather"),i(),t(77,"mat-checkbox",4),c("ngModelChange",function(r){return e.updateSetting("detailedWeatherEnabled",r)}),n(78," Enable detailed weather "),i(),t(79,"mat-checkbox",4),c("ngModelChange",function(r){return e.updateSetting("autoLoadWeather",r)}),n(80," Auto-load weather "),i(),t(81,"mat-checkbox",4),c("ngModelChange",function(r){return e.updateSetting("useGpsForWeather",r)}),n(82," Use GPS location "),i(),t(83,"mat-checkbox",4),c("ngModelChange",function(r){return e.updateSetting("showWeatherWarnings",r)}),n(84," Show weather warnings "),i(),t(85,"mat-form-field",3)(86,"mat-label"),n(87,"Refresh interval (minutes)"),i(),t(88,"input",17),c("ngModelChange",function(r){return e.updateSetting("weatherRefreshMinutes",+r)}),i()(),t(89,"button",19),c("click",function(){return e.clearWeatherCache()}),n(90,"Delete cached weather"),i()(),t(91,"section",1)(92,"h2",2),n(93,"Gallery"),i(),t(94,"mat-form-field",3)(95,"mat-label"),n(96,"Default sorting"),i(),t(97,"mat-select",4),c("ngModelChange",function(r){return e.updateSetting("gallerySortDefault",r)}),t(98,"mat-option",20),n(99,"Newest"),i(),t(100,"mat-option",21),n(101,"Oldest"),i(),t(102,"mat-option",22),n(103,"Favorite first"),i()()(),t(104,"mat-form-field",3)(105,"mat-label"),n(106,"Thumbnail size"),i(),t(107,"mat-select",4),c("ngModelChange",function(r){return e.updateSetting("galleryThumbnailSize",r)}),t(108,"mat-option",23),n(109,"Small"),i(),t(110,"mat-option",24),n(111,"Medium"),i(),t(112,"mat-option",25),n(113,"Large"),i()()(),t(114,"mat-checkbox",4),c("ngModelChange",function(r){return e.updateSetting("galleryFavoritesFirst",r)}),n(115," Show favorites first "),i(),t(116,"button",19),c("click",function(){return e.clearHomepageImage()}),n(117,"Clear homepage image"),i()(),t(118,"section",1)(119,"h2",2),n(120,"General"),i(),t(121,"mat-form-field",3)(122,"mat-label"),n(123,"Default lake"),i(),t(124,"mat-select",4),c("ngModelChange",function(r){return e.updateSetting("defaultLakeId",r||void 0)}),t(125,"mat-option",26),n(126,"None"),i(),X(127,Et,2,2,"mat-option",27,Ct),i()(),t(129,"mat-form-field",3)(130,"mat-label"),n(131,"Max rods per session"),i(),t(132,"input",17),c("ngModelChange",function(r){return e.updateSetting("maxRodCount",+r)}),i()(),t(133,"mat-form-field",3)(134,"mat-label"),n(135,"Time format"),i(),t(136,"mat-select",4),c("ngModelChange",function(r){return e.updateSetting("timeFormat",r)}),t(137,"mat-option",28),n(138,"24 hour"),i(),t(139,"mat-option",29),n(140,"12 hour"),i()()(),t(141,"mat-form-field",3)(142,"mat-label"),n(143,"First day of week"),i(),t(144,"mat-select",4),c("ngModelChange",function(r){return e.updateSetting("firstDayOfWeek",r===0?0:1)}),t(145,"mat-option",27),n(146,"Sunday"),i(),t(147,"mat-option",27),n(148,"Monday"),i()()()(),t(149,"section",1)(150,"h2",2),n(151,"Reset"),i(),t(152,"p",30),n(153,"Every reset requires confirmation. Settings resets do not delete fishing records."),i(),t(154,"h3",31),n(155,"Custom options"),i(),t(156,"div",32),X(157,Rt,2,1,"button",33,ue),t(159,"button",19),c("click",function(){return e.resetAllCustomOptions()}),n(160,"Reset all custom options"),i()(),t(161,"h3",31),n(162,"Preferences"),i(),t(163,"div",32)(164,"button",19),c("click",function(){return e.resetFilters()}),n(165,"Reset filters"),i(),t(166,"button",19),c("click",function(){return e.resetAppearance()}),n(167,"Reset appearance"),i(),t(168,"button",19),c("click",function(){return e.resetWeatherSettings()}),n(169,"Reset weather"),i(),t(170,"button",19),c("click",function(){return e.resetSecuritySettings()}),n(171,"Reset security"),i(),t(172,"button",19),c("click",function(){return e.resetAllSettings()}),n(173,"Reset all settings"),i()(),t(174,"h3",34),n(175,"Full application reset"),i(),t(176,"p",35),n(177,"Permanently removes all locally stored data. Type RESET to continue."),i(),t(178,"mat-form-field",3)(179,"mat-label"),n(180,"Confirmation"),i(),t(181,"input",36),c("ngModelChange",function(r){return e.fullResetInput.set(r)}),i()(),t(182,"button",37),c("click",function(){return e.resetFullApplication()}),n(183,"Reset entire application"),i()(),t(184,"section",1)(185,"h2",2),n(186,"Data"),i(),t(187,"button",38),c("click",function(){return e.exportBackup()}),n(188),i(),t(189,"label",39)(190,"input",40),c("change",function(r){return e.importBackup(r)}),i(),t(191,"span",41),n(192,"Import JSON Backup"),i()()(),t(193,"section",42)(194,"h2",2),n(195,"About"),i(),t(196,"p"),n(197,"Fish Tracker \u2014 offline-first fishing register."),i(),t(198,"a",43),n(199,"Profile"),i(),n(200," \xB7 "),t(201,"a",44),n(202,"Documents"),i(),n(203," \xB7 "),t(204,"a",45),n(205,"Release Notes"),i()(),R(206,Mt,2,1,"p",46)),a&2&&(l(7),p("ngModel",e.settings().themeMode),l(7),y("data-theme",e.settings().themeMode==="system"?null:e.settings().themeMode),l(8),p("ngModel",e.settings().weightUnit),l(8),p("ngModel",e.settings().lengthUnit),l(8),p("ngModel",e.settings().temperatureUnit),l(8),p("ngModel",e.settings().distanceUnit),l(11),p("ngModel",e.settings().lockTimeoutMinutes),l(4),I("ngModel",e.oldPin),l(4),I("ngModel",e.newPin),l(4),I("ngModel",e.confirmPin),l(8),p("ngModel",e.settings().detailedWeatherEnabled),l(2),p("ngModel",e.settings().autoLoadWeather),l(2),p("ngModel",e.settings().useGpsForWeather),l(2),p("ngModel",e.settings().showWeatherWarnings),l(5),p("ngModel",e.settings().weatherRefreshMinutes),l(9),p("ngModel",e.settings().gallerySortDefault),l(10),p("ngModel",e.settings().galleryThumbnailSize),l(7),p("ngModel",e.settings().galleryFavoritesFirst),l(10),p("ngModel",e.settings().defaultLakeId),l(3),K(e.lakes()),l(5),p("ngModel",e.settings().maxRodCount),l(4),p("ngModel",e.settings().timeFormat),l(8),p("ngModel",e.settings().firstDayOfWeek),l(),p("value",0),l(2),p("value",1),l(10),K(e.optionCategories),l(24),p("ngModel",e.fullResetInput()),l(6),p("disabled",e.exporting()),l(),$(" ",e.exporting()?"Exporting...":"Export JSON Backup"," "),l(18),M(e.message()?206:-1))},dependencies:[$e,Ge,Ye,Ke,Qe,Je,Te,Be,We,tt,et,Ze,st,ot,at,nt,it,mt,dt,ht,Ve],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}"]})};export{ft as SettingsComponent};
