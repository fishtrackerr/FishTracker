import{a as we,b as Tt}from"./chunk-MQIG6OBT.js";import{b as qe}from"./chunk-IUMSSY7W.js";import{a as St}from"./chunk-R2V4HFMQ.js";import{a as nt}from"./chunk-KUCLAMTU.js";import{a as ot}from"./chunk-LY7Z5H6N.js";import{a as It,b as Ct,c as Mt}from"./chunk-ASUSOVSU.js";import{a as xt}from"./chunk-OC6MKWDL.js";import{a as at}from"./chunk-IZCN2EXE.js";import{a as it,b as he,c as be,d as fe,e as ve}from"./chunk-RIOKAGX7.js";import{b as tt}from"./chunk-JZLTDQUV.js";import{a as ge,b as ue}from"./chunk-K7KLDMDN.js";import{a as bt,b as ft}from"./chunk-JLFPVMUM.js";import{a as me}from"./chunk-3VSITYC7.js";import{a as vt,b as _t,f as yt,j as wt,k as kt}from"./chunk-HNFVKJTI.js";import"./chunk-TBJ4NC4F.js";import{a as ye,c as rt,d as st,g as lt,i as ct,j as dt,o as mt,p as pt,q as gt,u as ut,v as ht}from"./chunk-YKMEDBIU.js";import{a as pe}from"./chunk-KCEV3AHS.js";import{a as _e}from"./chunk-2QIBXPGH.js";import{a as et}from"./chunk-HBHZPEAD.js";import"./chunk-V4WPDATK.js";import{a as ae}from"./chunk-QHFYRISC.js";import{B as Ke,D as W,N as se,Q as le,R as ce,T as $e,U as Xe,V as Je,e as Te,k as Ee,l as Re,m as b,s as oe}from"./chunk-4E3JZC42.js";import"./chunk-H6VIIGFD.js";import{a as Ze}from"./chunk-ZZXW5KX3.js";import{d as je}from"./chunk-AX2ESMTE.js";import{l as re,p as Qe,q as de}from"./chunk-WXONBRA5.js";import{b as _,d as ne,e as Ye}from"./chunk-7O4ZR52I.js";import{$b as J,Aa as j,Ac as ie,Bb as K,Cb as A,Db as F,Eb as u,Fb as a,Gb as o,Gc as G,Hb as w,Ic as v,Jc as He,Lb as Ge,Mb as We,Pb as h,Rb as I,Sb as Q,Tb as $,Ub as Ue,Va as n,Vb as X,Wb as D,Xb as z,Y as V,Z as N,_ as H,a as P,aa as L,b as U,ba as S,bc as O,ca as g,cc as Ve,dc as s,ec as m,fc as C,gc as Ne,ha as Le,ia as Ae,ib as E,ja as Fe,jb as q,jc as Y,kb as ze,kc as Z,lc as ee,nc as te,pa as M,qc as c,rc as d,ta as T,xa as De,xb as y,yb as R,zb as B}from"./chunk-7MD2CZFG.js";var Dt=["switch"],zt=["*"];function Gt(p,l){p&1&&(a(0,"span",11),Fe(),a(1,"svg",13),w(2,"path",14),o(),a(3,"svg",15),w(4,"path",16),o()())}var Wt=new L("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),ke=class{source;checked;constructor(l,e){this.source=l,this.checked=e}},Ut=(()=>{class p{_elementRef=g(j);_focusMonitor=g(oe);_changeDetectorRef=g(G);defaults=g(Wt);_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new ke(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=se();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new M;toggleChange=new M;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){g(re).load(ce);let e=g(new ie("tabindex"),{optional:!0}),t=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=t.color||"accent",this.id=this._uniqueId=g(W).getId("mat-mdc-slide-toggle-"),this.hideIcon=t.hideIcon??!1,this.disabledInteractive=t.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e==="keyboard"||e==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new ke(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(t){return new(t||p)};static \u0275cmp=E({type:p,selectors:[["mat-slide-toggle"]],viewQuery:function(t,i){if(t&1&&X(Dt,5),t&2){let r;D(r=z())&&(i._switchElement=r.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(t,i){t&2&&(We("id",i.id),y("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Ve(i.color?"mat-"+i.color:""),O("mat-mdc-slide-toggle-focused",i._focused)("mat-mdc-slide-toggle-checked",i.checked)("_mat-animation-noopable",i._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",v],color:"color",disabled:[2,"disabled","disabled",v],disableRipple:[2,"disableRipple","disableRipple",v],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:He(e)],checked:[2,"checked","checked",v],hideIcon:[2,"hideIcon","hideIcon",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[te([{provide:ye,useExisting:V(()=>p),multi:!0},{provide:st,useExisting:p,multi:!0}]),De],ngContentSelectors:zt,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(t,i){if(t&1&&(Q(),a(0,"div",1)(1,"button",2,0),h("click",function(){return i._handleClick()}),w(3,"div",3)(4,"span",4),a(5,"span",5)(6,"span",6)(7,"span",7),w(8,"span",8),o(),a(9,"span",9),w(10,"span",10),o(),R(11,Gt,5,0,"span",11),o()()(),a(12,"label",12),h("click",function(f){return f.stopPropagation()}),$(13),o()()),t&2){let r=J(2);u("labelPosition",i.labelPosition),n(),O("mdc-switch--selected",i.checked)("mdc-switch--unselected",!i.checked)("mdc-switch--checked",i.checked)("mdc-switch--disabled",i.disabled)("mat-mdc-slide-toggle-disabled-interactive",i.disabledInteractive),u("tabIndex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("disabled",i.disabled&&!i.disabledInteractive),y("id",i.buttonId)("name",i.name)("aria-label",i.ariaLabel)("aria-labelledby",i._getAriaLabelledBy())("aria-describedby",i.ariaDescribedby)("aria-required",i.required||null)("aria-checked",i.checked)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),n(9),u("matRippleTrigger",r)("matRippleDisabled",i.disableRipple||i.disabled)("matRippleCentered",!0),n(),B(i.hideIcon?-1:11),n(),u("for",i.buttonId),y("id",i._labelId)}},dependencies:[le,It],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return p})(),Et=(()=>{class p{static \u0275fac=function(t){return new(t||p)};static \u0275mod=q({type:p});static \u0275inj=H({imports:[Ut,de]})}return p})();var Qt=["button"],$t=["*"];function Xt(p,l){if(p&1&&(a(0,"div",2),w(1,"mat-pseudo-checkbox",6),o()),p&2){let e=I();n(),u("disabled",e.disabled)}}var Rt=new L("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS",{providedIn:"root",factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})}),Bt=new L("MatButtonToggleGroup"),Jt={provide:ye,useExisting:V(()=>Be),multi:!0},xe=class{source;value;constructor(l,e){this.source=l,this.value=e}},Be=(()=>{class p{_changeDetector=g(G);_dir=g(Qe,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(e){this._name=e,this._markButtonsForCheck()}_name=g(W).getId("mat-button-toggle-group-");vertical=!1;get value(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e.map(t=>t.value):e[0]?e[0].value:void 0}set value(e){this._setSelectionByValue(e),this.valueChange.emit(this.value)}valueChange=new M;get selected(){let e=this._selectionModel?this._selectionModel.selected:[];return this.multiple?e:e[0]||null}get multiple(){return this._multiple}set multiple(e){this._multiple=e,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}change=new M;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(e){this._hideMultipleSelectionIndicator=e,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let e=g(Rt,{optional:!0});this.appearance=e&&e.appearance?e.appearance:"standard",this._hideSingleSelectionIndicator=e?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=e?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new vt(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(e=>e.checked)),this.multiple||this._initializeTabIndex()}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}_keydown(e){if(this.multiple||this.disabled||Ke(e))return;let i=e.target.id,r=this._buttonToggles.toArray().findIndex(x=>x.buttonId===i),f=null;switch(e.keyCode){case 32:case 13:f=this._buttonToggles.get(r)||null;break;case 38:f=this._getNextButton(r,-1);break;case 37:f=this._getNextButton(r,this.dir==="ltr"?-1:1);break;case 40:f=this._getNextButton(r,1);break;case 39:f=this._getNextButton(r,this.dir==="ltr"?1:-1);break;default:return}f&&(e.preventDefault(),f._onButtonClick(),f.focus())}_emitChangeEvent(e){let t=new xe(e,this.value);this._rawValue=t.value,this._controlValueAccessorChangeFn(t.value),this.change.emit(t)}_syncButtonToggle(e,t,i=!1,r=!1){!this.multiple&&this.selected&&!e.checked&&(this.selected.checked=!1),this._selectionModel?t?this._selectionModel.select(e):this._selectionModel.deselect(e):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(e,i)):this._updateModelValue(e,i)}_isSelected(e){return this._selectionModel&&this._selectionModel.isSelected(e)}_isPrechecked(e){return typeof this._rawValue>"u"?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(t=>e.value!=null&&t===e.value):e.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(e=>{e.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let e=0;e<this._buttonToggles.length;e++){let t=this._buttonToggles.get(e);if(!t.disabled){t.tabIndex=0;break}}}_getNextButton(e,t){let i=this._buttonToggles;for(let r=1;r<=i.length;r++){let f=(e+t*r+i.length)%i.length,x=i.get(f);if(x&&!x.disabled)return x}return null}_setSelectionByValue(e){if(this._rawValue=e,!this._buttonToggles)return;let t=this._buttonToggles.toArray();if(this.multiple&&e?(Array.isArray(e),this._clearSelection(),e.forEach(i=>this._selectValue(i,t))):(this._clearSelection(),this._selectValue(e,t)),!this.multiple&&t.every(i=>i.tabIndex===-1)){for(let i of t)if(!i.disabled){i.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(e=>{e.checked=!1,this.multiple||(e.tabIndex=-1)})}_selectValue(e,t){for(let i of t)if(i.value===e){i.checked=!0,this._selectionModel.select(i),this.multiple||(i.tabIndex=0);break}}_updateModelValue(e,t){t&&this._emitChangeEvent(e),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(e=>e._markForCheck())}static \u0275fac=function(t){return new(t||p)};static \u0275dir=ze({type:p,selectors:[["mat-button-toggle-group"]],contentQueries:function(t,i,r){if(t&1&&Ue(r,Ie,5),t&2){let f;D(f=z())&&(i._buttonToggles=f)}},hostAttrs:[1,"mat-button-toggle-group"],hostVars:6,hostBindings:function(t,i){t&1&&h("keydown",function(f){return i._keydown(f)}),t&2&&(y("role",i.multiple?"group":"radiogroup")("aria-disabled",i.disabled),O("mat-button-toggle-vertical",i.vertical)("mat-button-toggle-group-appearance-standard",i.appearance==="standard"))},inputs:{appearance:"appearance",name:"name",vertical:[2,"vertical","vertical",v],value:"value",multiple:[2,"multiple","multiple",v],disabled:[2,"disabled","disabled",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",v],hideMultipleSelectionIndicator:[2,"hideMultipleSelectionIndicator","hideMultipleSelectionIndicator",v]},outputs:{valueChange:"valueChange",change:"change"},exportAs:["matButtonToggleGroup"],features:[te([Jt,{provide:Bt,useExisting:p}])]})}return p})(),Ie=(()=>{class p{_changeDetectorRef=g(G);_elementRef=g(j);_focusMonitor=g(oe);_idGenerator=g(W);_animationDisabled=se();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(e){this._tabIndex.set(e)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(e){this._appearance=e}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(e){e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(e){this._disabled=e}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new M;constructor(){g(re).load(ce);let e=g(Bt,{optional:!0}),t=g(new ie("tabindex"),{optional:!0})||"",i=g(Rt,{optional:!0});this._tabIndex=T(parseInt(t)||0),this.buttonToggleGroup=e,this._appearance=i&&i.appearance?i.appearance:"standard",this._disabledInteractive=i?.disabledInteractive??!1}ngOnInit(){let e=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId("mat-button-toggle-"),e&&(e._isPrechecked(this)?this.checked=!0:e._isSelected(this)!==this._checked&&e._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add("mat-button-toggle-animations-enabled"),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let e=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),e&&e._isSelected(this)&&e._syncButtonToggle(this,!1,!1,!0)}focus(e){this._buttonElement.nativeElement.focus(e)}_onButtonClick(){if(this.disabled)return;let e=this.isSingleSelector()?!0:!this._checked;if(e!==this._checked&&(this._checked=e,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let t=this.buttonToggleGroup._buttonToggles.find(i=>i.tabIndex===0);t&&(t.tabIndex=-1),this.tabIndex=0}this.change.emit(new xe(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static \u0275fac=function(t){return new(t||p)};static \u0275cmp=E({type:p,selectors:[["mat-button-toggle"]],viewQuery:function(t,i){if(t&1&&X(Qt,5),t&2){let r;D(r=z())&&(i._buttonElement=r.first)}},hostAttrs:["role","presentation",1,"mat-button-toggle"],hostVars:14,hostBindings:function(t,i){t&1&&h("focus",function(){return i.focus()}),t&2&&(y("aria-label",null)("aria-labelledby",null)("id",i.id)("name",null),O("mat-button-toggle-standalone",!i.buttonToggleGroup)("mat-button-toggle-checked",i.checked)("mat-button-toggle-disabled",i.disabled)("mat-button-toggle-disabled-interactive",i.disabledInteractive)("mat-button-toggle-appearance-standard",i.appearance==="standard"))},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],id:"id",name:"name",value:"value",tabIndex:"tabIndex",disableRipple:[2,"disableRipple","disableRipple",v],appearance:"appearance",checked:[2,"checked","checked",v],disabled:[2,"disabled","disabled",v],disabledInteractive:[2,"disabledInteractive","disabledInteractive",v]},outputs:{change:"change"},exportAs:["matButtonToggle"],ngContentSelectors:$t,decls:7,vars:13,consts:[["button",""],["type","button",1,"mat-button-toggle-button","mat-focus-indicator",3,"click","id","disabled"],[1,"mat-button-toggle-checkbox-wrapper"],[1,"mat-button-toggle-label-content"],[1,"mat-button-toggle-focus-overlay"],["matRipple","",1,"mat-button-toggle-ripple",3,"matRippleTrigger","matRippleDisabled"],["state","checked","aria-hidden","true","appearance","minimal",3,"disabled"]],template:function(t,i){if(t&1&&(Q(),a(0,"button",1,0),h("click",function(){return i._onButtonClick()}),R(2,Xt,2,1,"div",2),a(3,"span",3),$(4),o()(),w(5,"span",4)(6,"span",5)),t&2){let r=J(1);u("id",i.buttonId)("disabled",i.disabled&&!i.disabledInteractive||null),y("role",i.isSingleSelector()?"radio":"button")("tabindex",i.disabled&&!i.disabledInteractive?-1:i.tabIndex)("aria-pressed",i.isSingleSelector()?null:i.checked)("aria-checked",i.isSingleSelector()?i.checked:null)("name",i._getButtonName())("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledby)("aria-disabled",i.disabled&&i.disabledInteractive?"true":null),n(2),B(i.buttonToggleGroup&&(!i.buttonToggleGroup.multiple&&!i.buttonToggleGroup.hideSingleSelectionIndicator||i.buttonToggleGroup.multiple&&!i.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),n(4),u("matRippleTrigger",r)("matRippleDisabled",i.disableRipple||i.disabled)}},dependencies:[le,_t],styles:[`.mat-button-toggle-standalone,
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
`],encapsulation:2,changeDetection:0})}return p})(),Ot=(()=>{class p{static \u0275fac=function(t){return new(t||p)};static \u0275mod=q({type:p});static \u0275inj=H({imports:[$e,Ie,de]})}return p})();var Ce=class p{constructor(l,e,t,i,r,f,x,Oe,Pe){this.sessionRepo=l;this.catchRepo=e;this.lakeRepo=t;this.imageRepo=i;this.biteEventRepo=r;this.fishSpottedRepo=f;this.rodSpotHistoryRepo=x;this.sessionEventRepo=Oe;this.userOptionRepo=Pe}sessionRepo;catchRepo;lakeRepo;imageRepo;biteEventRepo;fishSpottedRepo;rodSpotHistoryRepo;sessionEventRepo;userOptionRepo;async export(){let l=await this.sessionRepo.getAll(),e=await this.catchRepo.getAll(),t=await this.lakeRepo.getAll(),i=await this.imageRepo.getAll(),r=await this.biteEventRepo.getAll(),f=await b.fishSpottedEvents.toArray(),x=await b.rodSpotHistory.toArray(),Oe=await b.sessionEvents.toArray(),Pe=await this.userOptionRepo.getAll(),Ft=await Promise.all(i.map(async k=>({id:k.id,type:k.type,parentId:k.parentId,fileName:k.fileName,mimeType:k.mimeType,data:await Ee(k.blob),thumbnail:await Ee(k.thumbnailBlob),createdAt:k.createdAt,isFavorite:k.isFavorite,isHomepageImage:k.isHomepageImage})));return{version:3,exportedAt:Te(),sessions:l,catches:e,lakes:t,images:Ft,biteEvents:r,fishSpottedEvents:f,rodSpotHistory:x,sessionEvents:Oe,userOptions:Pe}}async import(l){if(!l.version||!l.sessions||!l.catches||!l.lakes)throw new Error("Invalid backup file");let e=l.sessions.filter(t=>t.status==="active");e.length>1&&e.slice(1).forEach(t=>{t.status="completed",t.endDate=t.endDate??Te()}),await b.transaction("rw",[b.sessions,b.catches,b.lakes,b.images,b.biteEvents,b.fishSpottedEvents,b.rodSpotHistory,b.sessionEvents,b.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear();for(let t of l.lakes)await this.lakeRepo.put(t);for(let t of l.sessions)await this.sessionRepo.put(U(P({},t),{sessionSpots:t.sessionSpots??[],rods:t.rods??[]}));for(let t of l.catches)await this.catchRepo.put(t);for(let t of l.images??[])await this.imageRepo.put({id:t.id,type:t.type,parentId:t.parentId,fileName:t.fileName??`${t.id}.jpg`,blob:Re(t.data,t.mimeType),thumbnailBlob:Re(t.thumbnail,t.mimeType),mimeType:t.mimeType,createdAt:t.createdAt,isFavorite:t.isFavorite??!1,isHomepageImage:t.isHomepageImage??!1});for(let t of l.biteEvents??[])await this.biteEventRepo.put(t);for(let t of l.fishSpottedEvents??[])await this.fishSpottedRepo.put(t);for(let t of l.rodSpotHistory??[])await this.rodSpotHistoryRepo.put(t);for(let t of l.sessionEvents??[])await this.sessionEventRepo.put(t);for(let t of l.userOptions??[])await this.userOptionRepo.put(t)})}downloadJson(l){let e=new Blob([JSON.stringify(l,null,2)],{type:"application/json"}),t=URL.createObjectURL(e),i=document.createElement("a");i.href=t,i.download=`fish-tracker-backup-${new Date().toISOString().slice(0,10)}.json`,i.click(),URL.revokeObjectURL(t)}static \u0275fac=function(e){return new(e||p)(S(ae),S(me),S(pe),S(ge),S(he),S(be),S(fe),S(ve),S(we))};static \u0275prov=N({token:p,factory:p.\u0275fac,providedIn:"root"})};var Pt="fish-tracker-weather-cache",Lt="fish-tracker-filter-presets",Zt="fish-tracker-lock-state",Me=class p{settings=g(ne);theme=g(_e);filterService=g(St);userOptions=g(Tt);imageService=g(ue);sessionRepo=g(ae);catchRepo=g(me);lakeRepo=g(pe);imageRepo=g(ge);biteEventRepo=g(he);fishSpottedRepo=g(be);rodSpotHistoryRepo=g(fe);sessionEventRepo=g(ve);userOptionRepo=g(we);async resetCustomOptionsCategory(l,e=!0){await this.userOptions.resetCategory(l,e)}async resetAllCustomOptions(l=!0){await this.userOptions.resetAllCustom(l)}async restoreDefaultOptions(l){await this.userOptions.restoreDefaults(l)}resetFilters(){localStorage.removeItem(Lt),this.filterService.clearActive()}async resetAppearance(){this.theme.setTheme(_.themeMode),this.settings.update({gallerySortDefault:_.gallerySortDefault,galleryThumbnailSize:_.galleryThumbnailSize,galleryFavoritesFirst:_.galleryFavoritesFirst}),await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(Pt),this.settings.update({detailedWeatherEnabled:_.detailedWeatherEnabled,autoLoadWeather:_.autoLoadWeather,weatherRefreshMinutes:_.weatherRefreshMinutes,useGpsForWeather:_.useGpsForWeather,showWeatherWarnings:_.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:_.lockTimeoutMinutes})}async resetAllSettings(){let l=this.settings.get().pinHash,e=this.settings.get().pinSalt,t=this.settings.get().pinEnabled;this.settings.update(U(P({},_),{pinHash:l,pinSalt:e,pinEnabled:t})),this.resetFilters(),await this.resetAppearance(),this.resetWeather(),this.resetSecurity()}async resetFullApplication(){await b.transaction("rw",[b.sessions,b.catches,b.lakes,b.images,b.profiles,b.profileDocuments,b.biteEvents,b.fishSpottedEvents,b.rodSpotHistory,b.sessionEvents,b.userOptions],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await b.profiles.clear(),await b.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.userOptionRepo.clear()}),localStorage.removeItem(Lt),localStorage.removeItem(Pt),localStorage.removeItem(Zt),this.clearExpandStates(),this.settings.update(P({},_)),await this.userOptions.restoreDefaults()}clearExpandStates(){let l=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t?.startsWith("expand-")&&l.push(t)}for(let e of l)localStorage.removeItem(e)}static \u0275fac=function(e){return new(e||p)};static \u0275prov=N({token:p,factory:p.\u0275fac,providedIn:"root"})};var ei=(p,l)=>l.id;function ti(p,l){if(p&1&&(a(0,"mat-option",11),s(1),o()),p&2){let e=l.$implicit,t=I();u("value",e),n(),m(t.languageLabel(e))}}function ii(p,l){if(p&1&&(a(0,"mat-button-toggle",11),s(1),o()),p&2){let e=l.$implicit,t=I();u("value",e),n(),m(t.languageLabel(e))}}function ni(p,l){if(p&1&&(a(0,"mat-option",11),s(1),o()),p&2){let e=l.$implicit;u("value",e.id),n(),m(e.name)}}function ai(p,l){if(p&1){let e=Ge();a(0,"button",37),h("click",function(){let i=Le(e).$implicit,r=I();return Ae(r.resetOptionCategory(i))}),s(1),c(2,"tr"),o()}if(p&2){let e=l.$implicit,t=I();n(),Ne("",d(2,2,"common.reset")," ",t.categoryLabel(e))}}function oi(p,l){if(p&1&&(a(0,"p",61),s(1),o()),p&2){let e=I();n(),m(e.message())}}var At=class p{settingsService=g(ne);backupService=g(Ce);pinLock=g(qe);confirm=g(xt);theme=g(_e);imageService=g(ue);weatherService=g(it);lakeService=g(nt);notifications=g(et);resetService=g(Me);i18n=g(Ye);settings=this.settingsService.settings;supportedLanguages=this.i18n.supportedLanguages;lakes=tt(this.lakeService.watchAll(),{initialValue:[]});message=T("");exporting=T(!1);fullResetInput=T("");optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";updateUnits(l,e){this.settingsService.update({[l]:e})}updateTheme(l){this.theme.setTheme(l)}updateLanguage(l){this.i18n.setLanguage(l)}updateSetting(l,e){this.settingsService.update({[l]:e})}updateLockTimeout(l){this.settingsService.update({lockTimeoutMinutes:l})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let l=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(l?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}logout(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let l=await this.backupService.export();this.backupService.downloadJson(l),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async importBackup(l){let e=l.target,t=e.files?.[0];if(!(!t||!await this.confirm.confirm({title:"Import backup?",message:"This will replace all data. This action cannot be undone.",confirmLabel:"Import"}))){try{let r=await t.text(),f=JSON.parse(r);await this.backupService.import(f),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}e.value=""}}clearWeatherCache(){localStorage.removeItem("fish-tracker-weather-cache"),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(l){let e=this.categoryLabel(l);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${e}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(l,!0),this.notifications.success(`${e} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")))}languageLabel(l){return l==="nl"?"Nederlands":l==="en"?"English":"Deutsch"}categoryLabel(l){return this.i18n.t(`options.category.${l}`)}static \u0275fac=function(e){return new(e||p)};static \u0275cmp=E({type:p,selectors:[["app-settings"]],decls:327,vars:278,consts:[["title","common.settings"],[1,"section","app-card"],["sectionId","settings-appearance","persistKey","settings-appearance","label","appearance",3,"defaultExpanded","flat"],["expandHeader",""],[1,"section-title"],[1,"submenu-content"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],["role","group",1,"language-switch"],[1,"language-switch-label"],["name","language-switch","aria-label","Language switch",3,"ngModelChange","ngModel"],[1,"theme-preview"],["sectionId","settings-units","persistKey","settings-units","label","units",3,"flat"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["sectionId","settings-general","persistKey","settings-general","label","general",3,"flat"],["value",""],["matInput","","type","number",3,"ngModelChange","ngModel"],["value","24h"],["value","12h"],["sectionId","settings-gallery","persistKey","settings-gallery","label","gallery",3,"flat"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["mat-stroked-button","","type","button",3,"click"],["sectionId","settings-weather","persistKey","settings-weather","label","weather",3,"flat"],["sectionId","settings-security","persistKey","settings-security","label","security",3,"flat"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],[1,"action-row"],["sectionId","settings-data","persistKey","settings-data","label","data",3,"flat"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],["sectionId","settings-reset","persistKey","settings-reset","label","reset",3,"flat"],[1,"reset-desc"],[1,"subsection"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],["mat-stroked-button","","color","warn","type","button",3,"click"],[1,"section","app-card","about"],["sectionId","settings-about","persistKey","settings-about","label","about",3,"flat"],["routerLink","/profile"],["routerLink","/profile/documents"],["routerLink","/release-notes"],[1,"message"]],template:function(e,t){e&1&&(w(0,"app-page-title",0),a(1,"section",1)(2,"app-expandable-section",2)(3,"div",3)(4,"h2",4),s(5),c(6,"tr"),o()(),a(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),s(10),c(11,"tr"),o(),a(12,"mat-select",7),h("ngModelChange",function(r){return t.updateTheme(r)}),a(13,"mat-option",8),s(14),c(15,"tr"),o(),a(16,"mat-option",9),s(17),c(18,"tr"),o(),a(19,"mat-option",10),s(20),c(21,"tr"),o()()(),a(22,"mat-form-field",6)(23,"mat-label"),s(24),c(25,"tr"),o(),a(26,"mat-select",7),h("ngModelChange",function(r){return t.updateLanguage(r)}),A(27,ti,2,2,"mat-option",11,K),o()(),a(29,"div",12),c(30,"tr"),a(31,"span",13),s(32),c(33,"tr"),o(),a(34,"mat-button-toggle-group",14),h("ngModelChange",function(r){return t.updateLanguage(r)}),A(35,ii,2,2,"mat-button-toggle",11,K),o()(),a(37,"div",15),s(38),c(39,"tr"),o()()()(),a(40,"section",1)(41,"app-expandable-section",16)(42,"div",3)(43,"h2",4),s(44),c(45,"tr"),o()(),a(46,"div",5)(47,"mat-form-field",6)(48,"mat-label"),s(49),c(50,"tr"),o(),a(51,"mat-select",7),h("ngModelChange",function(r){return t.updateUnits("weightUnit",r)}),a(52,"mat-option",17),s(53),c(54,"tr"),o(),a(55,"mat-option",18),s(56),c(57,"tr"),o()()(),a(58,"mat-form-field",6)(59,"mat-label"),s(60),c(61,"tr"),o(),a(62,"mat-select",7),h("ngModelChange",function(r){return t.updateUnits("lengthUnit",r)}),a(63,"mat-option",19),s(64),c(65,"tr"),o(),a(66,"mat-option",20),s(67),c(68,"tr"),o()()(),a(69,"mat-form-field",6)(70,"mat-label"),s(71),c(72,"tr"),o(),a(73,"mat-select",7),h("ngModelChange",function(r){return t.updateUnits("temperatureUnit",r)}),a(74,"mat-option",21),s(75),c(76,"tr"),o(),a(77,"mat-option",22),s(78),c(79,"tr"),o()()(),a(80,"mat-form-field",6)(81,"mat-label"),s(82),c(83,"tr"),o(),a(84,"mat-select",7),h("ngModelChange",function(r){return t.updateUnits("distanceUnit",r)}),a(85,"mat-option",23),s(86),c(87,"tr"),o(),a(88,"mat-option",24),s(89),c(90,"tr"),o()()()()()(),a(91,"section",1)(92,"app-expandable-section",25)(93,"div",3)(94,"h2",4),s(95),c(96,"tr"),o()(),a(97,"div",5)(98,"mat-form-field",6)(99,"mat-label"),s(100),c(101,"tr"),o(),a(102,"mat-select",7),h("ngModelChange",function(r){return t.updateSetting("defaultLakeId",r||void 0)}),a(103,"mat-option",26),s(104),c(105,"tr"),o(),A(106,ni,2,2,"mat-option",11,ei),o()(),a(108,"mat-form-field",6)(109,"mat-label"),s(110),c(111,"tr"),o(),a(112,"input",27),h("ngModelChange",function(r){return t.updateSetting("maxRodCount",+r)}),o()(),a(113,"mat-form-field",6)(114,"mat-label"),s(115),c(116,"tr"),o(),a(117,"mat-select",7),h("ngModelChange",function(r){return t.updateSetting("timeFormat",r)}),a(118,"mat-option",28),s(119),c(120,"tr"),o(),a(121,"mat-option",29),s(122),c(123,"tr"),o()()(),a(124,"mat-form-field",6)(125,"mat-label"),s(126),c(127,"tr"),o(),a(128,"mat-select",7),h("ngModelChange",function(r){return t.updateSetting("firstDayOfWeek",r===0?0:1)}),a(129,"mat-option",11),s(130),c(131,"tr"),o(),a(132,"mat-option",11),s(133),c(134,"tr"),o()()()()()(),a(135,"section",1)(136,"app-expandable-section",30)(137,"div",3)(138,"h2",4),s(139),c(140,"tr"),o()(),a(141,"div",5)(142,"mat-form-field",6)(143,"mat-label"),s(144),c(145,"tr"),o(),a(146,"mat-select",7),h("ngModelChange",function(r){return t.updateSetting("gallerySortDefault",r)}),a(147,"mat-option",31),s(148),c(149,"tr"),o(),a(150,"mat-option",32),s(151),c(152,"tr"),o(),a(153,"mat-option",33),s(154),c(155,"tr"),o()()(),a(156,"mat-form-field",6)(157,"mat-label"),s(158),c(159,"tr"),o(),a(160,"mat-select",7),h("ngModelChange",function(r){return t.updateSetting("galleryThumbnailSize",r)}),a(161,"mat-option",34),s(162),c(163,"tr"),o(),a(164,"mat-option",35),s(165),c(166,"tr"),o(),a(167,"mat-option",36),s(168),c(169,"tr"),o()()(),a(170,"mat-checkbox",7),h("ngModelChange",function(r){return t.updateSetting("galleryFavoritesFirst",r)}),s(171),c(172,"tr"),o(),a(173,"button",37),h("click",function(){return t.clearHomepageImage()}),s(174),c(175,"tr"),o()()()(),a(176,"section",1)(177,"app-expandable-section",38)(178,"div",3)(179,"h2",4),s(180),c(181,"tr"),o()(),a(182,"div",5)(183,"mat-checkbox",7),h("ngModelChange",function(r){return t.updateSetting("detailedWeatherEnabled",r)}),s(184),c(185,"tr"),o(),a(186,"mat-checkbox",7),h("ngModelChange",function(r){return t.updateSetting("autoLoadWeather",r)}),s(187),c(188,"tr"),o(),a(189,"mat-checkbox",7),h("ngModelChange",function(r){return t.updateSetting("useGpsForWeather",r)}),s(190),c(191,"tr"),o(),a(192,"mat-checkbox",7),h("ngModelChange",function(r){return t.updateSetting("showWeatherWarnings",r)}),s(193),c(194,"tr"),o(),a(195,"mat-form-field",6)(196,"mat-label"),s(197),c(198,"tr"),o(),a(199,"input",27),h("ngModelChange",function(r){return t.updateSetting("weatherRefreshMinutes",+r)}),o()(),a(200,"button",37),h("click",function(){return t.clearWeatherCache()}),s(201),c(202,"tr"),o()()()(),a(203,"section",1)(204,"app-expandable-section",39)(205,"div",3)(206,"h2",4),s(207),c(208,"tr"),o()(),a(209,"div",5)(210,"mat-form-field",6)(211,"mat-label"),s(212),c(213,"tr"),o(),a(214,"input",27),h("ngModelChange",function(r){return t.updateLockTimeout(+r)}),o()(),a(215,"mat-form-field",6)(216,"mat-label"),s(217),c(218,"tr"),o(),a(219,"input",40),ee("ngModelChange",function(r){return Z(t.oldPin,r)||(t.oldPin=r),r}),o()(),a(220,"mat-form-field",6)(221,"mat-label"),s(222),c(223,"tr"),o(),a(224,"input",40),ee("ngModelChange",function(r){return Z(t.newPin,r)||(t.newPin=r),r}),o()(),a(225,"mat-form-field",6)(226,"mat-label"),s(227),c(228,"tr"),o(),a(229,"input",40),ee("ngModelChange",function(r){return Z(t.confirmPin,r)||(t.confirmPin=r),r}),o()(),a(230,"div",41)(231,"button",37),h("click",function(){return t.changePin()}),s(232),c(233,"tr"),o(),a(234,"button",37),h("click",function(){return t.logout()}),s(235),c(236,"tr"),o()()()()(),a(237,"section",1)(238,"app-expandable-section",42)(239,"div",3)(240,"h2",4),s(241),c(242,"tr"),o()(),a(243,"div",5)(244,"button",43),h("click",function(){return t.exportBackup()}),s(245),c(246,"tr"),c(247,"tr"),o(),a(248,"label",44)(249,"input",45),h("change",function(r){return t.importBackup(r)}),o(),a(250,"span",46),s(251),c(252,"tr"),o()()()()(),a(253,"section",1)(254,"app-expandable-section",47)(255,"div",3)(256,"h2",4),s(257),c(258,"tr"),o()(),a(259,"div",5)(260,"p",48),s(261),c(262,"tr"),o(),a(263,"h3",49),s(264),c(265,"tr"),o(),a(266,"div",50),A(267,ai,3,4,"button",51,K),a(269,"button",37),h("click",function(){return t.resetAllCustomOptions()}),s(270),c(271,"tr"),o()(),a(272,"h3",49),s(273),c(274,"tr"),o(),a(275,"div",50)(276,"button",37),h("click",function(){return t.resetFilters()}),s(277),c(278,"tr"),o(),a(279,"button",37),h("click",function(){return t.resetAppearance()}),s(280),c(281,"tr"),o(),a(282,"button",37),h("click",function(){return t.resetWeatherSettings()}),s(283),c(284,"tr"),o(),a(285,"button",37),h("click",function(){return t.resetSecuritySettings()}),s(286),c(287,"tr"),o(),a(288,"button",37),h("click",function(){return t.resetAllSettings()}),s(289),c(290,"tr"),o()(),a(291,"h3",52),s(292),c(293,"tr"),o(),a(294,"p",53),s(295),c(296,"tr"),o(),a(297,"mat-form-field",6)(298,"mat-label"),s(299),c(300,"tr"),o(),a(301,"input",54),h("ngModelChange",function(r){return t.fullResetInput.set(r)}),o()(),a(302,"button",55),h("click",function(){return t.resetFullApplication()}),s(303),c(304,"tr"),o()()()(),a(305,"section",56)(306,"app-expandable-section",57)(307,"div",3)(308,"h2",4),s(309),c(310,"tr"),o()(),a(311,"div",5)(312,"p"),s(313),c(314,"tr"),o(),a(315,"a",58),s(316),c(317,"tr"),o(),s(318," \xB7 "),a(319,"a",59),s(320),c(321,"tr"),o(),s(322," \xB7 "),a(323,"a",60),s(324),c(325,"tr"),o()()()(),R(326,oi,2,1,"p",61)),e&2&&(n(2),u("defaultExpanded",!0)("flat",!0),n(3),m(d(6,118,"settings.appearance")),n(5),m(d(11,120,"settings.theme")),n(2),u("ngModel",t.settings().themeMode),n(2),m(d(15,122,"settings.darkMode")),n(3),m(d(18,124,"settings.lightMode")),n(3),m(d(21,126,"settings.systemPreference")),n(4),m(d(25,128,"settings.language")),n(2),u("ngModel",t.settings().language),n(),F(t.supportedLanguages),n(2),y("aria-label",d(30,130,"settings.languageSwitch")),n(3),m(d(33,132,"settings.languageSwitch")),n(2),u("ngModel",t.settings().language),n(),F(t.supportedLanguages),n(2),y("data-theme",t.settings().themeMode==="system"?null:t.settings().themeMode),n(),C(" ",d(39,134,"settings.preview")," "),n(3),u("flat",!0),n(3),m(d(45,136,"settings.units")),n(5),m(d(50,138,"settings.weight")),n(2),u("ngModel",t.settings().weightUnit),n(2),m(d(54,140,"settings.kilograms")),n(3),m(d(57,142,"settings.pounds")),n(4),m(d(61,144,"settings.length")),n(2),u("ngModel",t.settings().lengthUnit),n(2),m(d(65,146,"settings.centimeters")),n(3),m(d(68,148,"settings.inches")),n(4),m(d(72,150,"settings.temperature")),n(2),u("ngModel",t.settings().temperatureUnit),n(2),m(d(76,152,"settings.celsius")),n(3),m(d(79,154,"settings.fahrenheit")),n(4),m(d(83,156,"settings.distance")),n(2),u("ngModel",t.settings().distanceUnit),n(2),m(d(87,158,"settings.meters")),n(3),m(d(90,160,"settings.feet")),n(3),u("flat",!0),n(3),m(d(96,162,"settings.general")),n(5),m(d(101,164,"settings.defaultLake")),n(2),u("ngModel",t.settings().defaultLakeId),n(2),m(d(105,166,"common.none")),n(2),F(t.lakes()),n(4),m(d(111,168,"settings.maxRods")),n(2),u("ngModel",t.settings().maxRodCount),n(3),m(d(116,170,"settings.timeFormat")),n(2),u("ngModel",t.settings().timeFormat),n(2),m(d(120,172,"settings.hour24")),n(3),m(d(123,174,"settings.hour12")),n(4),m(d(127,176,"settings.firstDayWeek")),n(2),u("ngModel",t.settings().firstDayOfWeek),n(),u("value",0),n(),m(d(131,178,"settings.sunday")),n(2),u("value",1),n(),m(d(134,180,"settings.monday")),n(3),u("flat",!0),n(3),m(d(140,182,"settings.gallery")),n(5),m(d(145,184,"settings.defaultSorting")),n(2),u("ngModel",t.settings().gallerySortDefault),n(2),m(d(149,186,"settings.newest")),n(3),m(d(152,188,"settings.oldest")),n(3),m(d(155,190,"settings.favoriteFirst")),n(4),m(d(159,192,"settings.thumbnailSize")),n(2),u("ngModel",t.settings().galleryThumbnailSize),n(2),m(d(163,194,"settings.small")),n(3),m(d(166,196,"settings.medium")),n(3),m(d(169,198,"settings.large")),n(2),u("ngModel",t.settings().galleryFavoritesFirst),n(),C(" ",d(172,200,"settings.showFavoritesFirst")," "),n(3),m(d(175,202,"settings.clearHomepageImage")),n(3),u("flat",!0),n(3),m(d(181,204,"settings.weather")),n(3),u("ngModel",t.settings().detailedWeatherEnabled),n(),C(" ",d(185,206,"settings.enableDetailedWeather")," "),n(2),u("ngModel",t.settings().autoLoadWeather),n(),C(" ",d(188,208,"settings.autoLoadWeather")," "),n(2),u("ngModel",t.settings().useGpsForWeather),n(),C(" ",d(191,210,"settings.useGps")," "),n(2),u("ngModel",t.settings().showWeatherWarnings),n(),C(" ",d(194,212,"settings.showWarnings")," "),n(4),m(d(198,214,"settings.refreshMinutes")),n(2),u("ngModel",t.settings().weatherRefreshMinutes),n(2),m(d(202,216,"settings.deleteCachedWeather")),n(3),u("flat",!0),n(3),m(d(208,218,"settings.security")),n(5),m(d(213,220,"settings.lockAfter")),n(2),u("ngModel",t.settings().lockTimeoutMinutes),n(3),m(d(218,222,"settings.currentPin")),n(2),Y("ngModel",t.oldPin),n(3),m(d(223,224,"settings.newPin")),n(2),Y("ngModel",t.newPin),n(3),m(d(228,226,"settings.confirmPin")),n(2),Y("ngModel",t.confirmPin),n(3),m(d(233,228,"settings.changePin")),n(3),m(d(236,230,"settings.logout")),n(3),u("flat",!0),n(3),m(d(242,232,"settings.data")),n(3),u("disabled",t.exporting()),n(),C(" ",t.exporting()?d(246,234,"settings.exporting"):d(247,236,"settings.exportJson")," "),n(6),m(d(252,238,"settings.importJson")),n(3),u("flat",!0),n(3),m(d(258,240,"settings.resetSection")),n(4),m(d(262,242,"settings.resetDesc")),n(3),m(d(265,244,"settings.customOptions")),n(3),F(t.optionCategories),n(3),m(d(271,246,"settings.resetAllCustom")),n(3),m(d(274,248,"settings.preferences")),n(4),m(d(278,250,"settings.resetFilters")),n(3),m(d(281,252,"settings.resetAppearance")),n(3),m(d(284,254,"settings.resetWeather")),n(3),m(d(287,256,"settings.resetSecurity")),n(3),m(d(290,258,"settings.resetAllSettings")),n(3),m(d(293,260,"settings.fullReset")),n(3),m(d(296,262,"settings.fullResetWarn")),n(4),m(d(300,264,"settings.confirmation")),n(2),u("ngModel",t.fullResetInput()),n(2),m(d(304,266,"settings.resetEntire")),n(3),u("flat",!0),n(3),m(d(310,268,"settings.about")),n(4),m(d(314,270,"settings.aboutText")),n(3),m(d(317,272,"settings.profile")),n(4),m(d(321,274,"settings.documents")),n(4),m(d(325,276,"settings.releaseNotes")),n(2),B(t.message()?326:-1))},dependencies:[pt,rt,dt,lt,mt,ct,je,Je,Xe,ht,ut,gt,kt,wt,yt,ft,bt,Mt,Ct,Et,Ot,Be,Ie,ot,at,Ze],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.submenu-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.section-title[_ngcontent-%COMP%]{margin:0;font-size:1rem}.action-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.language-switch[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-xs);margin:0 0 var(--spacing-sm)}.language-switch-label[_ngcontent-%COMP%]{font-size:.85rem;color:var(--text-secondary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}@media(max-width:768px){.section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md)}.action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .reset-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{width:100%;margin-right:0}}"]})};export{At as SettingsComponent};
