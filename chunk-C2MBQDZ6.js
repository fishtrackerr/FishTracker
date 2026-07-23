import{a as we,b as Mt}from"./chunk-D67LUC4K.js";import{b as qe}from"./chunk-D4POXLVT.js";import{a as kt}from"./chunk-ZUN3X2IM.js";import{a as St}from"./chunk-5ZNUKNZJ.js";import{a as it}from"./chunk-E2EJUFUO.js";import{a as at}from"./chunk-5KQ67PKU.js";import{a as xt,b as It,c as Ct}from"./chunk-DSN4J4UD.js";import{a as tt,b as he,c as be,d as fe,e as ve}from"./chunk-Z5P3OURK.js";import{b as et}from"./chunk-H34C6QAI.js";import{a as ge,b as ue}from"./chunk-LJCYLFFQ.js";import{a as ht,b as bt}from"./chunk-BLXMI5S4.js";import{a as me}from"./chunk-4EOMKFDT.js";import{a as ft,b as vt,f as _t,j as yt,k as wt}from"./chunk-SXPXSAY5.js";import"./chunk-MVJCEFDB.js";import{a as ye,c as ot,d as rt,g as st,i as lt,j as ct,o as dt,p as mt,q as pt,u as gt,v as ut}from"./chunk-X5CBPIOS.js";import{a as pe}from"./chunk-4HDRJFS3.js";import{a as _e}from"./chunk-UQ53YQDF.js";import{a as nt}from"./chunk-BNG43DYH.js";import"./chunk-T4LBOJVF.js";import{a as ae}from"./chunk-EJKUHK76.js";import{B as Qe,D as W,N as se,Q as le,R as ce,T as Xe,U as Ke,V as Je,e as Te,k as Ee,l as Re,m as b,s as oe}from"./chunk-AFW7V7FB.js";import{a as Ze}from"./chunk-33N563SM.js";import{d as je}from"./chunk-7TBPAPVY.js";import{l as re,p as $e,q as de}from"./chunk-4M4KXXHO.js";import{b as _,d as ne,e as Ye}from"./chunk-XX7JI3JP.js";import{$b as J,Aa as j,Ac as ie,Bb as Q,Cb as P,Db as F,Eb as h,Fb as a,Gb as o,Gc as G,Hb as w,Ic as v,Jc as He,Lb as Ge,Mb as We,Pb as u,Rb as I,Sb as $,Tb as X,Ub as Ne,Va as n,Vb as K,Wb as D,Xb as z,Y as U,Z as V,_ as H,a as O,aa as A,b as N,ba as S,bc as L,ca as g,cc as Ue,dc as s,ec as m,fc as C,gc as Ve,ha as Ae,ia as Pe,ib as E,ja as Fe,jb as q,jc as Y,kb as ze,kc as Z,lc as ee,nc as te,pa as M,qc as c,rc as d,ta as T,xa as De,xb as y,yb as R,zb as B}from"./chunk-QJAOB4F7.js";var Ft=["switch"],Dt=["*"];function zt(p,l){p&1&&(a(0,"span",11),Fe(),a(1,"svg",13),w(2,"path",14),o(),a(3,"svg",15),w(4,"path",16),o()())}var Gt=new A("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),ke=class{source;checked;constructor(l,e){this.source=l,this.checked=e}},Wt=(()=>{class p{_elementRef=g(j);_focusMonitor=g(oe);_changeDetectorRef=g(G);defaults=g(Gt);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new ke(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=se();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new M;toggleChange=new M;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){g(re).load(ce);let e=g(new ie("tabindex"),{optional:!0}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||"accent",this.id=this._uniqueId=g(W).getId("mat-mdc-slide-toggle-"),this.hideIcon=t.hideIcon??!1,this.disabledInteractive=t.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new ke(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(t){return new(t||p)};static \u0275cmp=E({type:p,selectors:[["mat-slide-toggle"]],viewQuery:function(t,i){if(t&1&&K(Ft,5),t&2){let r;D(r=z())&&(i._switchElement=r.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(t,i){t&2&&(We("id",i.id),y("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Ue(i.color?"mat-"+i.color:""),L("mat-mdc-slide-toggle-focused",i._focused)("mat-mdc-slide-toggle-checked",i.checked)("_mat-animation-noopable",i._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",v],color:"color",disabled:[2,"disabled","disabled",v],disableRipple:[2,"disableRipple","disableRipple",v],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:He(e)],checked:[2,"checked","checked",v],hideIcon:[2,"hideIcon","hideIcon",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[te([{provide:ye,useExisting:U(()=>p),multi:!0},{provide:rt,useExisting:p,multi:!0}]),De],ngContentSelectors:Dt,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(t,i){if(t&1&&($(),a(0,"div",1)(1,"button",2,0),u("click",function(){return i._handleClick()}),w(3,"div",3)(4,"span",4),a(5,"span",5)(6,"span",6)(7,"span",7),w(8,"span",8),o(),a(9,"span",9),w(10,"span",10),o(),R(11,zt,5,0,"span",11),o()()(),a(12,"label",12),u("click",function(f){return f.stopPropagation()}),X(13),o()()),t&2){let r=J(2);h("labelPosition",i.labelPosition),n(),L("mdc-switch--selected",i.checked)("mdc-switch--unselected",!i.checked)("mdc-switch--checked",i.checked)("mdc-switch--disabled",i.disabled)("mat-mdc-slide-toggle-disabled-interactive",i.disabledInteractive),h("tabIndex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("disabled",i.disabled&&!i.disabledInteractive),y("id",i.buttonId)("name",i.name)("aria-label",i.ariaLabel)("aria-labelledby",i._getAriaLabelledBy())("aria-describedby",i.ariaDescribedby)("aria-required",i.required||null)("aria-checked",i.checked)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),n(9),h("matRippleTrigger",r)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",!0),n(),B(i.hideIcon?-1:11),n(),h("for",i.buttonId),y("id",i._labelId)}},dependencies:[le,xt],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return p})(),Tt=(()=>{class p{static \u0275fac=function(t){return new(t||p)};static \u0275mod=q({type:p});static \u0275inj=H({imports:[Wt,de]})}return p})();var Qt=["button"],$t=["*"];function Xt(p,l){if(p&1&&(a(0,"div",2),w(1,"mat-pseudo-checkbox",6),o()),p&2){let e=I();n(),h("disabled",e.disabled)}}var Et=new A("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),Rt=new A("MatButtonToggleGroup"),Kt={provide:ye,useExisting:U(()=>Be),multi:!0},xe=class{source;value;constructor(l,e){this.source=l,this.value=e}},Be=(()=>{class p{_changeDetector=g(G);_dir=g($e,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=g(W).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(t=>t.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new M;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new M;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=g(Et,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new ft(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||Qe(e))return;let i=e.target.id,r=this._buttonToggles.toArray().findIndex(x=>x.buttonId===i),f=null;switch(e.keyCode){case 32:case 13:f=this._buttonToggles.get(r)||null;break;case 38:f=this._getNextButton(r,-1);break;case 37:f=this._getNextButton(r,this.dir==="ltr"?-1:1);break;case 40:f=this._getNextButton(r,1);break;case 39:f=this._getNextButton(r,this.dir==="ltr"?1:-1);break;default:return}f&&(e.preventDefault(),f._onButtonClick(),f.focus())}_emitChangeEvent(e){let t=new xe(e,this.value);this._rawValue=t.value,this._controlValueAccessorChangeFn(t.value),this.change.emit(t)}_syncButtonToggle(e,t,i=!1,r=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?t?this._selectionModel.select(e):this._selectionModel.deselect(e):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(e,i)):this._updateModelValue(e,i)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(t=>e.value!=null&&t===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let t=this._buttonToggles.get(e);if(!t.disabled){t.tabIndex=0;break}}}_getNextButton(e,t){let i=this._buttonToggles;for(let r=1;r<=i.length;r++){let f=(e+t*r+i.length)%i.length,x=i.get(f);if(x&&!x.disabled)return x}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let t=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(i=>this._selectValue(i,t))):(this._clearSelection(),this._selectValue(e,t)),!this.multiple&&t.every(i=>i.tabIndex===-1)){for(let i of t)if(!i.disabled){i.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,t){for(let i of t)if(i.value===e){i.checked=!0,this._selectionModel.select(i),this.multiple||(i.tabIndex=0);break}}_updateModelValue(e,t){t&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(t){return new(t||p)};static \u0275dir=ze({type:p,selectors:[["mat-button-toggle-group"]],contentQueries:function(t,i,r){if(t&1&&Ne(r,Ie,5),t&2){let f;D(f=z())&&(i._buttonToggles=f)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(t,i){t&1&&u("keydown",function(f){return i._keydown(f)}),t&2&&(y("role",i.multiple?"group":"radiogroup")("aria-disabled",i.disabled),L("mat-button-toggle-vertical",i.vertical)("mat-button-toggle-group-appearance-standard",i.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",v],value:"value",multiple:[2,"multiple","multiple",v],disabled:[2,"disabled","disabled",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",v],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",v]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[te([Kt,{provide:Rt,useExisting:p}])]})}return p})(),Ie=(()=>{class p{_changeDetectorRef=g(G);_elementRef=g(j);_focusMonitor=g(oe);_idGenerator=g(W);_animationDisabled=se();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new M;constructor(){g(re).load(ce);let e=g(Rt,{optional:!0}),t=g(new ie("tabindex"),{optional:!0})||"",i=g(Et,{optional:!0});this._tabIndex=T(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=i&&i.appearance?i.appearance:"standard",this._disabledInteractive=i?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(i=>i.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0}this.change.emit(new xe(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||p)};static \u0275cmp=E({type:p,selectors:[["mat-button-toggle"]],viewQuery:function(t,i){if(t&1&&K(Qt,5),t&2){let r;D(r=z())&&(i._buttonElement=r.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,i){t&1&&u("focus",function(){return i.focus()}),t&2&&(y("aria-label",null)("aria-labelledby",null)("id",i.id)("name",null),L("mat-button-toggle-standalone",!i.buttonToggleGroup)("mat-button-toggle-checked",i.checked)("mat-button-toggle-disabled",i.disabled)("mat-button-toggle-disabled-interactive",i.disabledInteractive)("mat-button-toggle-appearance-standard",i.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",v],appearance:"appearance",checked:[2,"checked","checked",v],disabled:[2,"disabled","disabled",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:$t,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,i){if(t&1&&($(),a(0,"button",1,0),u("click",function(){return i._onButtonClick()}),R(2,Xt,2,1,"div",2),a(3,"span",3),X(4),o()(),w(5,"span",4)(6,"span",5)),t&2){let r=J(1);h("id",i.buttonId)("disabled",i.disabled&&!i.disabledInteractive||null),y("role",i.isSingleSelector()?"radio":"button")("tabindex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("aria-pressed",i.isSingleSelector()?null:i.checked)("aria-checked",i.isSingleSelector()?i.checked:null)("name",i._getButtonName())("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledby)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),n(2),B(i.buttonToggleGroup&&(!i.buttonToggleGroup.multiple&&!i.buttonToggleGroup.hideSingleSelectionIndicator||i.buttonToggleGroup.multiple&&!i.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),n(4),h("matRippleTrigger",r)("matRippleDisabled",i.disableRipple||i.disabled)}},dependencies:[le,vt],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--mat-button-toggle-legacy-text-color);
  font-family: var(--mat-button-toggle-legacy-label-text-font);
  font-size: var(--mat-button-toggle-legacy-label-text-size);
  line-height: var(--mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--mat-button-toggle-legacy-label-text-tracking);
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--mat-button-toggle-legacy-disabled-state-background-color);
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--mat-button-toggle-text-color, var(--mat-sys-on-surface));
  background-color: var(--mat-button-toggle-background-color, transparent);
  font-family: var(--mat-button-toggle-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-toggle-label-text-size, var(--mat-sys-label-large-size));
  line-height: var(--mat-button-toggle-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-weight: var(--mat-button-toggle-label-text-weight, var(--mat-sys-label-large-weight));
  letter-spacing: var(--mat-button-toggle-label-text-tracking, var(--mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--mat-button-toggle-divider-color, var(--mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--mat-button-toggle-selected-state-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-toggle-selected-state-background-color, var(--mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--mat-button-toggle-state-layer-color, var(--mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--mat-button-toggle-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --mat-focus-indicator-border-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
  border-top-left-radius: var(--mat-button-toggle-shape, var(--mat-sys-corner-extra-large));
}
`],encapsulation:2,changeDetection:0})}return p})(),Bt=(()=>{class p{static \u0275fac=function(t){return new(t||p)};static \u0275mod=q({type:p});static \u0275inj=H({imports:[Xe,Ie,de]})}return p})();var Ce=class p{constructor(l,e,t,i,r,f,x,Le,Oe){this.sessionRepo=l;this.catchRepo=e;this.lakeRepo=t;this.imageRepo=i;this.biteEventRepo=r;this.fishSpottedRepo=f;this.rodSpotHistoryRepo=x;this.sessionEventRepo=Le;this.userOptionRepo=Oe}sessionRepo;catchRepo;lakeRepo;imageRepo;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;userOptionRepo;async export(){let l=await this.sessionRepo.getAll(),e=await this.catchRepo.getAll(),t=await this.lakeRepo.getAll(),i=await this.imageRepo.getAll(),r=await this.biteEventRepo.getAll(),f=await b.fishSpottedEvents.toArray(),x=await b.rodSpotHistory.toArray(),Le=await b.sessionEvents.toArray(),Oe=await this.userOptionRepo.getAll(),Pt=await Promise.all(i.map(async k=>({id:k.id,type:k.type,parentId:k.parentId,fileName:k.fileName,mimeType:k.mimeType,data:await Ee(k.blob),thumbnail:await Ee(k.thumbnailBlob),createdAt:k.createdAt,isFavorite:k.isFavorite,isHomepageImage:k.isHomepageImage})));return{version:3,exportedAt:Te(),sessions:l,catches:e,lakes:t,images:Pt,biteEvents:r,fishSpottedEvents:f,rodSpotHistory:x,sessionEvents:Le,userOptions:Oe}}async import(l){if(!l.version||!l.sessions||!l.catches||!l.lakes)throw new Error("Invalid backup file");let e=l.sessions.filter(t=>t.status==="active");e.length>1&&e.slice(1).forEach(t=>{t.status="completed",t.endDate=t.endDate??Te()}),await b.transaction("rw",[b.sessions,b.catches,b.lakes,b.images,b.biteEvents,b.fishSpottedEvents,b.rodSpotHistory,b.sessionEvents,b.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear();for(let t of l.lakes)await this.lakeRepo.put(t);for(let t of l.sessions)await this.sessionRepo.put(N(O({},t),{sessionSpots:t.sessionSpots??[],rods:t.rods??[]}));for(let t of l.catches)await this.catchRepo.put(t);for(let t of l.images??[])await this.imageRepo.put({id:t.id,type:t.type,parentId:t.parentId,fileName:t.fileName??`${t.id}.jpg`,blob:Re(t.data,t.mimeType),thumbnailBlob:Re(t.thumbnail,t.mimeType),mimeType:t.mimeType,createdAt:t.createdAt,isFavorite:t.isFavorite??!1,isHomepageImage:t.isHomepageImage??!1});for(let t of l.biteEvents??[])await this.biteEventRepo.put(t);for(let t of l.fishSpottedEvents??[])await this.fishSpottedRepo.put(t);for(let t of l.rodSpotHistory??[])await this.rodSpotHistoryRepo.put(t);for(let t of l.sessionEvents??[])await this.sessionEventRepo.put(t);for(let t of l.userOptions??[])await this.userOptionRepo.put(t)})}downloadJson(l){let e=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download=`fish-tracker-backup-${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(t)}static \u0275fac=function(e){return new(e||p)(S(ae),S(me),S(pe),S(ge),S(he),S(be),S(fe),S(ve),S(we))};static \u0275prov=V({token:p,factory:p.\u0275fac,providedIn:"root"})};var Lt="fish-tracker-weather-cache",Ot="fish-tracker-filter-presets",Yt="fish-tracker-lock-state",Me=class p{settings=g(ne);theme=g(_e);filterService=g(kt);userOptions=g(Mt);imageService=g(ue);sessionRepo=g(ae);catchRepo=g(me);lakeRepo=g(pe);imageRepo=g(ge);biteEventRepo=g(he);fishSpottedRepo=g(be);rodSpotHistoryRepo=g(fe);sessionEventRepo=g(ve);userOptionRepo=g(we);async resetCustomOptionsCategory(l,e=!0){await this.userOptions.resetCategory(l,e)}async resetAllCustomOptions(l=!0){await this.userOptions.resetAllCustom(l)}async restoreDefaultOptions(l){await this.userOptions.restoreDefaults(l)}resetFilters(){localStorage.removeItem(Ot),this.filterService.clearActive()}async resetAppearance(){this.theme.setTheme(_.themeMode),this.settings.update({gallerySortDefault:_.gallerySortDefault,galleryThumbnailSize:_.galleryThumbnailSize,galleryFavoritesFirst:_.galleryFavoritesFirst}),await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(Lt),this.settings.update({detailedWeatherEnabled:_.detailedWeatherEnabled,autoLoadWeather:_.autoLoadWeather,weatherRefreshMinutes:_.weatherRefreshMinutes,useGpsForWeather:_.useGpsForWeather,showWeatherWarnings:_.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:_.lockTimeoutMinutes})}async resetAllSettings(){let l=this.settings.get().pinHash,e=this.settings.get().pinSalt,t=this.settings.get().pinEnabled;this.settings.update(N(O({},_),{pinHash:l,pinSalt:e,pinEnabled:t})),this.resetFilters(),await this.resetAppearance(),this.resetWeather(),this.resetSecurity()}async resetFullApplication(){await b.transaction("rw",[b.sessions,b.catches,b.lakes,b.images,b.profiles,b.profileDocuments,b.biteEvents,b.fishSpottedEvents,b.rodSpotHistory,b.sessionEvents,b.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await b.profiles.clear(),await b.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear()}),localStorage.removeItem(Ot),localStorage.removeItem(Lt),localStorage.removeItem(Yt),this.clearExpandStates(),this.settings.update(O({},_)),await this.userOptions.restoreDefaults()}clearExpandStates(){let l=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t?.startsWith("expand-")&&l.push(t)}for(let e of l)localStorage.removeItem(e)}static \u0275fac=function(e){return new(e||p)};static \u0275prov=V({token:p,factory:p.\u0275fac,providedIn:"root"})};var Zt=(p,l)=>l.id;function ei(p,l){if(p&1&&(a(0,"mat-option",8),s(1),o()),p&2){let e=l.$implicit,t=I();h("value",e),n(),m(t.languageLabel(e))}}function ti(p,l){if(p&1&&(a(0,"mat-button-toggle",8),s(1),o()),p&2){let e=l.$implicit,t=I();h("value",e),n(),m(t.languageLabel(e))}}function ii(p,l){if(p&1&&(a(0,"mat-option",8),s(1),o()),p&2){let e=l.$implicit;h("value",e.id),n(),m(e.name)}}function ni(p,l){if(p&1){let e=Ge();a(0,"button",23),u("click",function(){let i=Ae(e).$implicit,r=I();return Pe(r.resetOptionCategory(i))}),s(1),c(2,"tr"),o()}if(p&2){let e=l.$implicit,t=I();n(),Ve("",d(2,2,"common.reset")," ",t.categoryLabel(e))}}function ai(p,l){if(p&1&&(a(0,"p",49),s(1),o()),p&2){let e=I();n(),m(e.message())}}var At=class p{settingsService=g(ne);backupService=g(Ce);pinLock=g(qe);confirm=g(St);theme=g(_e);imageService=g(ue);weatherService=g(tt);lakeService=g(it);notifications=g(nt);resetService=g(Me);i18n=g(Ye);settings=this.settingsService.settings;supportedLanguages=this.i18n.supportedLanguages;lakes=et(this.lakeService.watchAll(),{initialValue:[]});message=T("");exporting=T(!1);fullResetInput=T("");optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";updateUnits(l,e){this.settingsService.update({[l]:e})}updateTheme(l){this.theme.setTheme(l)}updateLanguage(l){this.i18n.setLanguage(l)}updateSetting(l,e){this.settingsService.update({[l]:e})}updateLockTimeout(l){this.settingsService.update({lockTimeoutMinutes:l})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let l=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(l?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}lockNow(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let l=await this.backupService.export();this.backupService.downloadJson(l),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async importBackup(l){let e=l.target,t=e.files?.[0];if(!(!t||!await this.confirm.confirm({title:"Import backup?",message:"This will replace all data. This action cannot be undone.",confirmLabel:"Import"}))){try{let r=await t.text(),f=JSON.parse(r);await this.backupService.import(f),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}e.value=""}}clearWeatherCache(){localStorage.removeItem("fish-tracker-weather-cache"),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(l){let e=this.categoryLabel(l);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${e}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(l,!0),this.notifications.success(`${e} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")))}languageLabel(l){return l==="nl"?"Nederlands":l==="en"?"English":"Deutsch"}categoryLabel(l){return this.i18n.t(`options.category.${l}`)}static \u0275fac=function(e){return new(e||p)};static \u0275cmp=E({type:p,selectors:[["app-settings"]],decls:299,vars:268,consts:[["title","common.settings"],[1,"section","app-card"],[1,"section-title"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],["role","group",1,"language-switch"],[1,"language-switch-label"],["name","language-switch","aria-label","Language switch",3,"ngModelChange","ngModel"],[1,"theme-preview"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["matInput","","type","number",3,"ngModelChange","ngModel"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],["mat-stroked-button","","type","button",3,"click"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["value",""],["value","24h"],["value","12h"],[1,"reset-desc"],[1,"subsection"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],["mat-stroked-button","","color","warn","type","button",3,"click"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],[1,"section","app-card","about"],["routerLink","/profile"],["routerLink","/profile/documents"],["routerLink","/release-notes"],[1,"message"]],template:function(e,t){e&1&&(w(0,"app-page-title",0),a(1,"section",1)(2,"h2",2),s(3),c(4,"tr"),o(),a(5,"mat-form-field",3)(6,"mat-label"),s(7),c(8,"tr"),o(),a(9,"mat-select",4),u("ngModelChange",function(r){return t.updateTheme(r)}),a(10,"mat-option",5),s(11),c(12,"tr"),o(),a(13,"mat-option",6),s(14),c(15,"tr"),o(),a(16,"mat-option",7),s(17),c(18,"tr"),o()()(),a(19,"mat-form-field",3)(20,"mat-label"),s(21),c(22,"tr"),o(),a(23,"mat-select",4),u("ngModelChange",function(r){return t.updateLanguage(r)}),P(24,ei,2,2,"mat-option",8,Q),o()(),a(26,"div",9),c(27,"tr"),a(28,"span",10),s(29),c(30,"tr"),o(),a(31,"mat-button-toggle-group",11),u("ngModelChange",function(r){return t.updateLanguage(r)}),P(32,ti,2,2,"mat-button-toggle",8,Q),o()(),a(34,"div",12),s(35),c(36,"tr"),o()(),a(37,"section",1)(38,"h2",2),s(39),c(40,"tr"),o(),a(41,"mat-form-field",3)(42,"mat-label"),s(43),c(44,"tr"),o(),a(45,"mat-select",4),u("ngModelChange",function(r){return t.updateUnits("weightUnit",r)}),a(46,"mat-option",13),s(47),c(48,"tr"),o(),a(49,"mat-option",14),s(50),c(51,"tr"),o()()(),a(52,"mat-form-field",3)(53,"mat-label"),s(54),c(55,"tr"),o(),a(56,"mat-select",4),u("ngModelChange",function(r){return t.updateUnits("lengthUnit",r)}),a(57,"mat-option",15),s(58),c(59,"tr"),o(),a(60,"mat-option",16),s(61),c(62,"tr"),o()()(),a(63,"mat-form-field",3)(64,"mat-label"),s(65),c(66,"tr"),o(),a(67,"mat-select",4),u("ngModelChange",function(r){return t.updateUnits("temperatureUnit",r)}),a(68,"mat-option",17),s(69),c(70,"tr"),o(),a(71,"mat-option",18),s(72),c(73,"tr"),o()()(),a(74,"mat-form-field",3)(75,"mat-label"),s(76),c(77,"tr"),o(),a(78,"mat-select",4),u("ngModelChange",function(r){return t.updateUnits("distanceUnit",r)}),a(79,"mat-option",19),s(80),c(81,"tr"),o(),a(82,"mat-option",20),s(83),c(84,"tr"),o()()()(),a(85,"section",1)(86,"h2",2),s(87),c(88,"tr"),o(),a(89,"mat-form-field",3)(90,"mat-label"),s(91),c(92,"tr"),o(),a(93,"input",21),u("ngModelChange",function(r){return t.updateLockTimeout(+r)}),o()(),a(94,"mat-form-field",3)(95,"mat-label"),s(96),c(97,"tr"),o(),a(98,"input",22),ee("ngModelChange",function(r){return Z(t.oldPin,r)||(t.oldPin=r),r}),o()(),a(99,"mat-form-field",3)(100,"mat-label"),s(101),c(102,"tr"),o(),a(103,"input",22),ee("ngModelChange",function(r){return Z(t.newPin,r)||(t.newPin=r),r}),o()(),a(104,"mat-form-field",3)(105,"mat-label"),s(106),c(107,"tr"),o(),a(108,"input",22),ee("ngModelChange",function(r){return Z(t.confirmPin,r)||(t.confirmPin=r),r}),o()(),a(109,"button",23),u("click",function(){return t.changePin()}),s(110),c(111,"tr"),o(),a(112,"button",23),u("click",function(){return t.lockNow()}),s(113),c(114,"tr"),o()(),a(115,"section",1)(116,"h2",2),s(117),c(118,"tr"),o(),a(119,"mat-checkbox",4),u("ngModelChange",function(r){return t.updateSetting("detailedWeatherEnabled",r)}),s(120),c(121,"tr"),o(),a(122,"mat-checkbox",4),u("ngModelChange",function(r){return t.updateSetting("autoLoadWeather",r)}),s(123),c(124,"tr"),o(),a(125,"mat-checkbox",4),u("ngModelChange",function(r){return t.updateSetting("useGpsForWeather",r)}),s(126),c(127,"tr"),o(),a(128,"mat-checkbox",4),u("ngModelChange",function(r){return t.updateSetting("showWeatherWarnings",r)}),s(129),c(130,"tr"),o(),a(131,"mat-form-field",3)(132,"mat-label"),s(133),c(134,"tr"),o(),a(135,"input",21),u("ngModelChange",function(r){return t.updateSetting("weatherRefreshMinutes",+r)}),o()(),a(136,"button",23),u("click",function(){return t.clearWeatherCache()}),s(137),c(138,"tr"),o()(),a(139,"section",1)(140,"h2",2),s(141),c(142,"tr"),o(),a(143,"mat-form-field",3)(144,"mat-label"),s(145),c(146,"tr"),o(),a(147,"mat-select",4),u("ngModelChange",function(r){return t.updateSetting("gallerySortDefault",r)}),a(148,"mat-option",24),s(149),c(150,"tr"),o(),a(151,"mat-option",25),s(152),c(153,"tr"),o(),a(154,"mat-option",26),s(155),c(156,"tr"),o()()(),a(157,"mat-form-field",3)(158,"mat-label"),s(159),c(160,"tr"),o(),a(161,"mat-select",4),u("ngModelChange",function(r){return t.updateSetting("galleryThumbnailSize",r)}),a(162,"mat-option",27),s(163),c(164,"tr"),o(),a(165,"mat-option",28),s(166),c(167,"tr"),o(),a(168,"mat-option",29),s(169),c(170,"tr"),o()()(),a(171,"mat-checkbox",4),u("ngModelChange",function(r){return t.updateSetting("galleryFavoritesFirst",r)}),s(172),c(173,"tr"),o(),a(174,"button",23),u("click",function(){return t.clearHomepageImage()}),s(175),c(176,"tr"),o()(),a(177,"section",1)(178,"h2",2),s(179),c(180,"tr"),o(),a(181,"mat-form-field",3)(182,"mat-label"),s(183),c(184,"tr"),o(),a(185,"mat-select",4),u("ngModelChange",function(r){return t.updateSetting("defaultLakeId",r||void 0)}),a(186,"mat-option",30),s(187),c(188,"tr"),o(),P(189,ii,2,2,"mat-option",8,Zt),o()(),a(191,"mat-form-field",3)(192,"mat-label"),s(193),c(194,"tr"),o(),a(195,"input",21),u("ngModelChange",function(r){return t.updateSetting("maxRodCount",+r)}),o()(),a(196,"mat-form-field",3)(197,"mat-label"),s(198),c(199,"tr"),o(),a(200,"mat-select",4),u("ngModelChange",function(r){return t.updateSetting("timeFormat",r)}),a(201,"mat-option",31),s(202),c(203,"tr"),o(),a(204,"mat-option",32),s(205),c(206,"tr"),o()()(),a(207,"mat-form-field",3)(208,"mat-label"),s(209),c(210,"tr"),o(),a(211,"mat-select",4),u("ngModelChange",function(r){return t.updateSetting("firstDayOfWeek",r===0?0:1)}),a(212,"mat-option",8),s(213),c(214,"tr"),o(),a(215,"mat-option",8),s(216),c(217,"tr"),o()()()(),a(218,"section",1)(219,"h2",2),s(220),c(221,"tr"),o(),a(222,"p",33),s(223),c(224,"tr"),o(),a(225,"h3",34),s(226),c(227,"tr"),o(),a(228,"div",35),P(229,ni,3,4,"button",36,Q),a(231,"button",23),u("click",function(){return t.resetAllCustomOptions()}),s(232),c(233,"tr"),o()(),a(234,"h3",34),s(235),c(236,"tr"),o(),a(237,"div",35)(238,"button",23),u("click",function(){return t.resetFilters()}),s(239),c(240,"tr"),o(),a(241,"button",23),u("click",function(){return t.resetAppearance()}),s(242),c(243,"tr"),o(),a(244,"button",23),u("click",function(){return t.resetWeatherSettings()}),s(245),c(246,"tr"),o(),a(247,"button",23),u("click",function(){return t.resetSecuritySettings()}),s(248),c(249,"tr"),o(),a(250,"button",23),u("click",function(){return t.resetAllSettings()}),s(251),c(252,"tr"),o()(),a(253,"h3",37),s(254),c(255,"tr"),o(),a(256,"p",38),s(257),c(258,"tr"),o(),a(259,"mat-form-field",3)(260,"mat-label"),s(261),c(262,"tr"),o(),a(263,"input",39),u("ngModelChange",function(r){return t.fullResetInput.set(r)}),o()(),a(264,"button",40),u("click",function(){return t.resetFullApplication()}),s(265),c(266,"tr"),o()(),a(267,"section",1)(268,"h2",2),s(269),c(270,"tr"),o(),a(271,"button",41),u("click",function(){return t.exportBackup()}),s(272),c(273,"tr"),c(274,"tr"),o(),a(275,"label",42)(276,"input",43),u("change",function(r){return t.importBackup(r)}),o(),a(277,"span",44),s(278),c(279,"tr"),o()()(),a(280,"section",45)(281,"h2",2),s(282),c(283,"tr"),o(),a(284,"p"),s(285),c(286,"tr"),o(),a(287,"a",46),s(288),c(289,"tr"),o(),s(290," \xB7 "),a(291,"a",47),s(292),c(293,"tr"),o(),s(294," \xB7 "),a(295,"a",48),s(296),c(297,"tr"),o()(),R(298,ai,2,1,"p",49)),e&2&&(n(3),m(d(4,108,"settings.appearance")),n(4),m(d(8,110,"settings.theme")),n(2),h("ngModel",t.settings().themeMode),n(2),m(d(12,112,"settings.darkMode")),n(3),m(d(15,114,"settings.lightMode")),n(3),m(d(18,116,"settings.systemPreference")),n(4),m(d(22,118,"settings.language")),n(2),h("ngModel",t.settings().language),n(),F(t.supportedLanguages),n(2),y("aria-label",d(27,120,"settings.languageSwitch")),n(3),m(d(30,122,"settings.languageSwitch")),n(2),h("ngModel",t.settings().language),n(),F(t.supportedLanguages),n(2),y("data-theme",t.settings().themeMode==="system"?null:t.settings().themeMode),n(),C(" ",d(36,124,"settings.preview")," "),n(4),m(d(40,126,"settings.units")),n(4),m(d(44,128,"settings.weight")),n(2),h("ngModel",t.settings().weightUnit),n(2),m(d(48,130,"settings.kilograms")),n(3),m(d(51,132,"settings.pounds")),n(4),m(d(55,134,"settings.length")),n(2),h("ngModel",t.settings().lengthUnit),n(2),m(d(59,136,"settings.centimeters")),n(3),m(d(62,138,"settings.inches")),n(4),m(d(66,140,"settings.temperature")),n(2),h("ngModel",t.settings().temperatureUnit),n(2),m(d(70,142,"settings.celsius")),n(3),m(d(73,144,"settings.fahrenheit")),n(4),m(d(77,146,"settings.distance")),n(2),h("ngModel",t.settings().distanceUnit),n(2),m(d(81,148,"settings.meters")),n(3),m(d(84,150,"settings.feet")),n(4),m(d(88,152,"settings.security")),n(4),m(d(92,154,"settings.lockAfter")),n(2),h("ngModel",t.settings().lockTimeoutMinutes),n(3),m(d(97,156,"settings.currentPin")),n(2),Y("ngModel",t.oldPin),n(3),m(d(102,158,"settings.newPin")),n(2),Y("ngModel",t.newPin),n(3),m(d(107,160,"settings.confirmPin")),n(2),Y("ngModel",t.confirmPin),n(2),m(d(111,162,"settings.changePin")),n(3),m(d(114,164,"settings.lockNow")),n(4),m(d(118,166,"settings.weather")),n(2),h("ngModel",t.settings().detailedWeatherEnabled),n(),C(" ",d(121,168,"settings.enableDetailedWeather")," "),n(2),h("ngModel",t.settings().autoLoadWeather),n(),C(" ",d(124,170,"settings.autoLoadWeather")," "),n(2),h("ngModel",t.settings().useGpsForWeather),n(),C(" ",d(127,172,"settings.useGps")," "),n(2),h("ngModel",t.settings().showWeatherWarnings),n(),C(" ",d(130,174,"settings.showWarnings")," "),n(4),m(d(134,176,"settings.refreshMinutes")),n(2),h("ngModel",t.settings().weatherRefreshMinutes),n(2),m(d(138,178,"settings.deleteCachedWeather")),n(4),m(d(142,180,"settings.gallery")),n(4),m(d(146,182,"settings.defaultSorting")),n(2),h("ngModel",t.settings().gallerySortDefault),n(2),m(d(150,184,"settings.newest")),n(3),m(d(153,186,"settings.oldest")),n(3),m(d(156,188,"settings.favoriteFirst")),n(4),m(d(160,190,"settings.thumbnailSize")),n(2),h("ngModel",t.settings().galleryThumbnailSize),n(2),m(d(164,192,"settings.small")),n(3),m(d(167,194,"settings.medium")),n(3),m(d(170,196,"settings.large")),n(2),h("ngModel",t.settings().galleryFavoritesFirst),n(),C(" ",d(173,198,"settings.showFavoritesFirst")," "),n(3),m(d(176,200,"settings.clearHomepageImage")),n(4),m(d(180,202,"settings.general")),n(4),m(d(184,204,"settings.defaultLake")),n(2),h("ngModel",t.settings().defaultLakeId),n(2),m(d(188,206,"common.none")),n(2),F(t.lakes()),n(4),m(d(194,208,"settings.maxRods")),n(2),h("ngModel",t.settings().maxRodCount),n(3),m(d(199,210,"settings.timeFormat")),n(2),h("ngModel",t.settings().timeFormat),n(2),m(d(203,212,"settings.hour24")),n(3),m(d(206,214,"settings.hour12")),n(4),m(d(210,216,"settings.firstDayWeek")),n(2),h("ngModel",t.settings().firstDayOfWeek),n(),h("value",0),n(),m(d(214,218,"settings.sunday")),n(2),h("value",1),n(),m(d(217,220,"settings.monday")),n(4),m(d(221,222,"settings.resetSection")),n(3),m(d(224,224,"settings.resetDesc")),n(3),m(d(227,226,"settings.customOptions")),n(3),F(t.optionCategories),n(3),m(d(233,228,"settings.resetAllCustom")),n(3),m(d(236,230,"settings.preferences")),n(4),m(d(240,232,"settings.resetFilters")),n(3),m(d(243,234,"settings.resetAppearance")),n(3),m(d(246,236,"settings.resetWeather")),n(3),m(d(249,238,"settings.resetSecurity")),n(3),m(d(252,240,"settings.resetAllSettings")),n(3),m(d(255,242,"settings.fullReset")),n(3),m(d(258,244,"settings.fullResetWarn")),n(4),m(d(262,246,"settings.confirmation")),n(2),h("ngModel",t.fullResetInput()),n(2),m(d(266,248,"settings.resetEntire")),n(4),m(d(270,250,"settings.data")),n(2),h("disabled",t.exporting()),n(),C(" ",t.exporting()?d(273,252,"settings.exporting"):d(274,254,"settings.exportJson")," "),n(6),m(d(279,256,"settings.importJson")),n(4),m(d(283,258,"settings.about")),n(3),m(d(286,260,"settings.aboutText")),n(3),m(d(289,262,"settings.profile")),n(4),m(d(293,264,"settings.documents")),n(4),m(d(297,266,"settings.releaseNotes")),n(2),B(t.message()?298:-1))},dependencies:[mt,ot,ct,st,dt,lt,je,Je,Ke,ut,gt,pt,wt,yt,_t,bt,ht,Ct,It,Tt,Bt,Be,Ie,at,Ze],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.language-switch[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-xs);margin:0 0 var(--spacing-sm)}.language-switch-label[_ngcontent-%COMP%]{font-size:.85rem;color:var(--text-secondary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}"]})};export{At as SettingsComponent};
