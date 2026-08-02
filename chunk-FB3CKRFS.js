import{a as St,b as kt,c as Ct}from"./chunk-RE5WNWHM.js";import{a as xt}from"./chunk-EPOO5A5E.js";import{a as H}from"./chunk-WJQ4WAPJ.js";import{c as xe}from"./chunk-GEWUJYLR.js";import{a as z}from"./chunk-36B4TV3E.js";import{a as Je,b as Qe}from"./chunk-FE7QZN7E.js";import{a as it}from"./chunk-4JHIC3LA.js";import{a as tt}from"./chunk-5ZLE7LSL.js";import"./chunk-SV7HK7F2.js";import"./chunk-B5N4TDY2.js";import{a as Ze}from"./chunk-LIIXEXSS.js";import{a as at}from"./chunk-LGPRJCGE.js";import{a as ft,b as _t}from"./chunk-NK73TWRW.js";import{d as bt,h as yt,i as wt}from"./chunk-FAE4RRUM.js";import{a as et}from"./chunk-CPIVBWHP.js";import{a as nt}from"./chunk-27ER4FHS.js";import{a as st,c as rt,d as ot,g as lt,i as dt,j as ct,o as pt,p as mt,q as gt,r as ht,v as ut,w as vt}from"./chunk-UCIDKY3G.js";import{a as je}from"./chunk-WQSUPKSD.js";import"./chunk-K4YDMCE6.js";import{a as Xe}from"./chunk-SU2GWLDF.js";import{a as Fe}from"./chunk-DEFUTHG2.js";import{c as Ye}from"./chunk-C3G2TMVW.js";import"./chunk-NXLAXHUP.js";import{a as V}from"./chunk-VV7MDWE7.js";import"./chunk-U3WLDWGS.js";import{a as We,b as Ue,c as He,d as Ve,e as Ne,f as qe}from"./chunk-S36CFQ4C.js";import"./chunk-G5RIJZ2J.js";import"./chunk-UILBAVU3.js";import{a as Ke,b as K}from"./chunk-FPNNSM44.js";import{d as be,e as ye}from"./chunk-7YFG4ZB7.js";import"./chunk-XYKOZZAV.js";import{a as Me,b as De,c as ze}from"./chunk-ZJU6QDZY.js";import{D as Ie,E as Ee,R as Te,aa as Be,ca as Pe,ea as Re,fa as Oe,ia as Ae,ja as Le,m as Se,n as ke,o as Ce,p as X,t as Y,v,w as U}from"./chunk-UCB67P7A.js";import"./chunk-AOF2XK6F.js";import{h as we,i as f,m as D,q as $e,r as Ge}from"./chunk-GBQE37OP.js";import{Aa as ae,Ab as S,Cb as O,Db as M,Dc as ve,Eb as I,Fb as h,Gb as t,Hb as n,Ib as y,Jc as fe,Lc as k,Mb as A,Mc as _e,Nb as re,Qb as g,Sb as b,Tb as oe,Ub as le,Wa as e,Wb as de,Xb as ce,Y as Q,Yb as pe,Z,_ as ee,a as E,aa as te,ac as me,b as $,ca as u,cc as j,dc as ge,ec as a,fc as l,gc as _,ha as B,hc as he,ia as P,ja as ie,jb as R,kb as se,kc as L,lc as F,mc as W,pa as G,pc as ue,ta as T,tc as s,uc as r,xa as ne,yb as x,zb as w}from"./chunk-GH2SYADN.js";var Pt=["switch"],Rt=["*"];function Ot(m,c){m&1&&(t(0,"span",11),ie(),t(1,"svg",13),y(2,"path",14),n(),t(3,"svg",15),y(4,"path",16),n()())}var At=new te("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),N=class{source;checked;constructor(c,o){this.source=c,this.checked=o}},J=(()=>{class m{_elementRef=u(ae);_focusMonitor=u(Ie);_changeDetectorRef=u(fe);defaults=u(At);_onChange=o=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(o){return new N(this,o)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Pe();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(o){this._checked=o,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new G;toggleChange=new G;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(Ee).load(Oe);let o=u(new ve("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=o==null?0:parseInt(o)||0,this.color=i.color||"accent",this.id=this._uniqueId=u(Te).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(o=>{o==="keyboard"||o==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):o||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(o){o.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(o){this.checked=!!o}registerOnChange(o){this._onChange=o}registerOnTouched(o){this._onTouched=o}validate(o){return this.required&&o.value!==!0?{required:!0}:null}registerOnValidatorChange(o){this._validatorOnChange=o}setDisabledState(o){this.disabled=o,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new N(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||m)};static \u0275cmp=R({type:m,selectors:[["mat-slide-toggle"]],viewQuery:function(i,d){if(i&1&&de(Pt,5),i&2){let p;ce(p=pe())&&(d._switchElement=p.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,d){i&2&&(re("id",d.id),x("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),ge(d.color?"mat-"+d.color:""),j("mat-mdc-slide-toggle-focused",d._focused)("mat-mdc-slide-toggle-checked",d.checked)("_mat-animation-noopable",d._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",k],color:"color",disabled:[2,"disabled","disabled",k],disableRipple:[2,"disableRipple","disableRipple",k],tabIndex:[2,"tabIndex","tabIndex",o=>o==null?0:_e(o)],checked:[2,"checked","checked",k],hideIcon:[2,"hideIcon","hideIcon",k],disabledInteractive:[2,"disabledInteractive","disabledInteractive",k]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[ue([{provide:st,useExisting:Q(()=>m),multi:!0},{provide:ot,useExisting:m,multi:!0}]),ne],ngContentSelectors:Rt,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,d){if(i&1&&(oe(),t(0,"div",1)(1,"button",2,0),g("click",function(){return d._handleClick()}),y(3,"div",3)(4,"span",4),t(5,"span",5)(6,"span",6)(7,"span",7),y(8,"span",8),n(),t(9,"span",9),y(10,"span",10),n(),w(11,Ot,5,0,"span",11),n()()(),t(12,"label",12),g("click",function(C){return C.stopPropagation()}),le(13),n()()),i&2){let p=me(2);h("labelPosition",d.labelPosition),e(),j("mdc-switch--selected",d.checked)("mdc-switch--unselected",!d.checked)("mdc-switch--checked",d.checked)("mdc-switch--disabled",d.disabled)("mat-mdc-slide-toggle-disabled-interactive",d.disabledInteractive),h("tabIndex",d.disabled&&!d.disabledInteractive?-1:d.tabIndex)("disabled",d.disabled&&!d.disabledInteractive),x("id",d.buttonId)("name",d.name)("aria-label",d.ariaLabel)("aria-labelledby",d._getAriaLabelledBy())("aria-describedby",d.ariaDescribedby)("aria-required",d.required||null)("aria-checked",d.checked)("aria-disabled",d.disabled&&d.disabledInteractive?"true":null),e(9),h("matRippleTrigger",p)("matRippleDisabled",d.disableRipple||d.disabled)("matRippleCentered",!0),e(),S(d.hideIcon?-1:11),e(),h("for",d.buttonId),x("id",d._labelId)}},dependencies:[Re,St],styles:[`.mdc-switch {
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
`],encapsulation:2,changeDetection:0})}return m})(),It=(()=>{class m{static \u0275fac=function(i){return new(i||m)};static \u0275mod=se({type:m});static \u0275inj=ee({imports:[J,Be]})}return m})();var q=class m{settings=u(D);fishingMode=u(U);vault=u(z);theme=u(V);filterService=u(Xe);userOptions=u(H);imageService=u(K);sessionRepo=u(Me);catchRepo=u(De);lakeRepo=u(ze);imageRepo=u(Ke);biteEventRepo=u(He);fishSpottedRepo=u(Ve);rodSpotHistoryRepo=u(Ne);sessionEventRepo=u(We);sessionWeatherRepo=u(qe);userOptionRepo=u(je);chatRepo=u(tt);async resetCustomOptionsCategory(c,o=!0){await this.userOptions.resetCategory(c,o)}async resetAllCustomOptions(c=!0){await this.userOptions.resetAllCustom(c)}async restoreDefaultOptions(c){await this.userOptions.restoreDefaults(c)}resetFilters(){this.filterService.clearActive(),this.clearFilterPresetKeys()}async resetAppearance(c){this.theme.setTheme(f.themeMode),this.settings.update({gallerySortDefault:f.gallerySortDefault,galleryThumbnailSize:f.galleryThumbnailSize,galleryFavoritesFirst:f.galleryFavoritesFirst}),c?.clearHomepage!==!1&&this.fishingMode.hasMode()&&await this.imageService.clearHomepageImage(),this.clearExpandStates()}resetWeather(){localStorage.removeItem(X),this.settings.update({detailedWeatherEnabled:f.detailedWeatherEnabled,autoLoadWeather:f.autoLoadWeather,weatherRefreshMinutes:f.weatherRefreshMinutes,useGpsForWeather:f.useGpsForWeather,showWeatherWarnings:f.showWeatherWarnings})}resetSecurity(){this.settings.update({lockTimeoutMinutes:f.lockTimeoutMinutes})}async resetAllSettings(){let c=this.settings.get(),o=c.pinHash,i=c.pinSalt,d=c.pinEnabled,p=c.modePreferences??{};this.settings.replace($(E({},f),{pinHash:o,pinSalt:i,pinEnabled:d,modePreferences:p})),await this.vault.clearAiApiKey(),this.resetFilters(),await this.resetAppearance({clearHomepage:!1}),this.resetWeather(),this.resetSecurity()}async resetCurrentMode(){let c=this.fishingMode.requireMode();await v.transaction("rw",[v.sessions,v.catches,v.lakes,v.images,v.biteEvents,v.fishSpottedEvents,v.rodSpotHistory,v.sessionEvents,v.sessionWeather,v.userOptions,v.chatThreads,v.chatMessages],async()=>{await this.sessionRepo.clearCurrentMode(),await this.catchRepo.clearCurrentMode(),await this.lakeRepo.clearCurrentMode(),await this.imageRepo.clearCurrentMode(),await this.biteEventRepo.clearCurrentMode(),await this.fishSpottedRepo.clearCurrentMode(),await this.rodSpotHistoryRepo.clearCurrentMode(),await this.sessionEventRepo.clearCurrentMode(),await this.sessionWeatherRepo.clearCurrentMode(),await this.userOptionRepo.clearCurrentMode(),await this.chatRepo.clearCurrentMode()}),this.filterService.clearActive(),localStorage.removeItem(`${Y}:${c}`),this.fishingMode.updatePreferences(c,we(c)),await this.userOptions.ensureDefaultsForCurrentMode()}async resetFullApplication(){await v.transaction("rw",[v.sessions,v.catches,v.lakes,v.images,v.profiles,v.profileDocuments,v.biteEvents,v.fishSpottedEvents,v.rodSpotHistory,v.sessionEvents,v.sessionWeather,v.userOptions,v.chatThreads,v.chatMessages],async()=>{await this.sessionRepo.clear(),await this.catchRepo.clear(),await this.lakeRepo.clear(),await this.imageRepo.clear(),await v.profiles.clear(),await v.profileDocuments.clear(),await this.biteEventRepo.clear(),await this.fishSpottedRepo.clear(),await this.rodSpotHistoryRepo.clear(),await this.sessionEventRepo.clear(),await this.sessionWeatherRepo.clear(),await this.userOptionRepo.clear(),await this.chatRepo.clear()}),this.clearFilterPresetKeys(),localStorage.removeItem(X),localStorage.removeItem(Se);try{sessionStorage.removeItem(ke),sessionStorage.removeItem(Ce)}catch{}this.clearExpandStates(),this.settings.replace($(E({},f),{modePreferences:{}})),this.vault.lock(),this.fishingMode.clearMode()}clearFilterPresetKeys(){let c=[];for(let o=0;o<localStorage.length;o++){let i=localStorage.key(o);(i==="fish-tracker-filter-presets"||i?.startsWith(`${Y}:`))&&c.push(i)}for(let o of c)localStorage.removeItem(o)}clearExpandStates(){let c=[];for(let o=0;o<localStorage.length;o++){let i=localStorage.key(o);i?.startsWith("expand-")&&c.push(i)}for(let o of c)localStorage.removeItem(o)}static \u0275fac=function(o){return new(o||m)};static \u0275prov=Z({token:m,factory:m.\u0275fac,providedIn:"root"})};var Tt=(m,c)=>c.id;function Ft(m,c){if(m&1&&(t(0,"mat-option",11),a(1),n()),m&2){let o=c.$implicit,i=b();h("value",o),e(),l(i.languageLabel(o))}}function Wt(m,c){if(m&1&&(t(0,"mat-option",11),a(1),n()),m&2){let o=c.$implicit;h("value",o.id),e(),l(o.name)}}function Dt(m,c){if(m&1){let o=A();t(0,"li",72)(1,"span",73),a(2),n(),t(3,"button",34),g("click",function(){let d=B(o).$implicit,p=b(3);return P(p.renameOption(d))}),a(4),s(5,"tr"),n()()}if(m&2){let o=c.$implicit;e(2),l(o.value),e(2),_(" ",r(5,2,"common.rename")," ")}}function zt(m,c){if(m&1&&(t(0,"div",69)(1,"h4",70),a(2),n(),t(3,"ul",71),M(4,Dt,6,4,"li",72,Tt),n()()),m&2){let o=b().$implicit,i=b();e(2),l(i.categoryLabel(o)),e(2),I(i.managedOptions()[o])}}function Ut(m,c){if(m&1&&w(0,zt,6,1,"div",69),m&2){let o=c.$implicit,i=b();S(i.managedOptions()[o].length>0?0:-1)}}function Kt(m,c){if(m&1){let o=A();t(0,"button",34),g("click",function(){let d=B(o).$implicit,p=b();return P(p.resetOptionCategory(d))}),a(1),s(2,"tr"),n()}if(m&2){let o=c.$implicit,i=b();e(),he("",r(2,2,"common.reset")," ",i.categoryLabel(o))}}function Ht(m,c){if(m&1){let o=A();t(0,"button",34),g("click",function(){B(o);let d=b();return P(d.installApp())}),a(1),s(2,"tr"),n()}m&2&&(e(),l(r(2,1,"settings.installApp")))}function Vt(m,c){m&1&&(t(0,"p",37),a(1),s(2,"tr"),n()),m&2&&(e(),l(r(2,1,"settings.iosInstallHint")))}function Nt(m,c){if(m&1&&(t(0,"p",68),a(1),n()),m&2){let o=b();e(),l(o.message())}}var qt=50*1024*1024,Et=class m{settingsService=u(D);backupService=u(it);pinLock=u(xe);vault=u(z);confirm=u(nt);theme=u(V);imageService=u(K);weatherService=u(Ue);lakeService=u(at);notifications=u(Fe);resetService=u(q);i18n=u($e);pwaInstall=u(xt);share=u(Qe);userOptions=u(H);fishingMode=u(U);router=u(be);settings=this.settingsService.settings;modePreferences=()=>this.fishingMode.getActivePreferences();aiApiKey=this.vault.aiApiKey;supportedLanguages=this.i18n.supportedLanguages;lakes=Ye(this.lakeService.watchAll(),{initialValue:[]});message=T("");exporting=T(!1);fullResetInput=T("");managedOptions=T({species:[],bait:[],baitFlavor:[],rig:[],hookSize:[],lineType:[],method:[],weatherType:[],tag:[]});optionCategories=["species","bait","baitFlavor","rig","hookSize","lineType","method","weatherType","tag"];oldPin="";newPin="";confirmPin="";ngOnInit(){this.reloadManagedOptions()}updateUnits(c,o){this.settingsService.update({[c]:o})}updateTheme(c){this.theme.setTheme(c)}updateLanguage(c){this.i18n.setLanguage(c)}async installApp(){await this.pwaInstall.promptInstall()}sendFeedback(){Je(this.i18n.t("settings.feedbackSubject"))}shareViaWhatsApp(){this.share.shareAppViaWhatsApp()}updateSetting(c,o){this.settingsService.update({[c]:o})}updateDefaultLake(c){this.fishingMode.updateActivePreferences({defaultLakeId:c})}updateLockTimeout(c){this.settingsService.update({lockTimeoutMinutes:c})}async changePin(){if(this.newPin.length!==6||this.newPin!==this.confirmPin){this.message.set(this.i18n.t("messages.pinMismatch"));return}let c=await this.pinLock.changePin(this.oldPin,this.newPin);this.message.set(c?this.i18n.t("messages.pinChanged"):this.i18n.t("messages.pinIncorrect")),this.oldPin=this.newPin=this.confirmPin=""}logout(){this.pinLock.lock()}async exportBackup(){this.exporting.set(!0);try{let c=await this.backupService.export();this.backupService.downloadJson(c),this.message.set(this.i18n.t("messages.backupExported"))}catch{this.message.set(this.i18n.t("messages.exportFailed"))}finally{this.exporting.set(!1)}}async importBackup(c){let o=c.target,i=o.files?.[0];if(i){try{if(i.size>qt)throw new Error("Backup file is too large");let d=await i.text(),p=JSON.parse(d),C=this.backupService.validate(p),Bt=this.i18n.t("settings.importPreview",{sessions:String(C.sessionCount),catches:String(C.catchCount),lakes:String(C.lakeCount),images:String(C.imageCount)});if(!await this.confirm.confirm({title:this.i18n.t("settings.importConfirmTitle"),message:`${Bt}

${this.i18n.t("settings.importConfirmMessage")}`,confirmLabel:this.i18n.t("common.import")})){o.value="";return}await this.backupService.import(p),this.message.set(this.i18n.t("messages.backupRestored"))}catch{this.message.set(this.i18n.t("messages.importFailed"))}o.value=""}}clearWeatherCache(){this.weatherService.clearCache(),this.notifications.success(this.i18n.t("messages.weatherCacheCleared"))}updateAiApiKey(c){this.vault.setAiApiKey(c||void 0)}clearAiKey(){this.vault.clearAiApiKey().then(()=>{this.notifications.success(this.i18n.t("settings.aiKeyCleared"))})}async clearHomepageImage(){await this.imageService.clearHomepageImage(),this.notifications.success(this.i18n.t("settings.homepageImageCleared"))}async resetOptionCategory(c){let o=this.categoryLabel(c);await this.confirm.confirm({title:`${this.i18n.t("common.reset")} ${o}?`,message:this.i18n.t("settings.customOptions"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetCustomOptionsCategory(c,!0),await this.reloadManagedOptions(),this.notifications.success(`${o} ${this.i18n.t("common.reset")}`))}async resetAllCustomOptions(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllCustomTitle"),message:this.i18n.t("settings.resetAllCustomMessage"),confirmLabel:this.i18n.t("settings.resetAllCustomConfirm")})&&(await this.resetService.resetAllCustomOptions(!0),await this.reloadManagedOptions(),this.notifications.success(this.i18n.t("settings.customOptionsReset")))}async renameOption(c){let o=window.prompt(this.i18n.t("settings.renameOptionPrompt",{value:c.value}),c.value);if(o==null)return;let i=o.trim();if(!(!i||i===c.value))try{await this.userOptions.rename(c.id,i),await this.reloadManagedOptions(),this.notifications.success(this.i18n.t("settings.optionRenamed"))}catch(d){console.error("[Settings] rename option failed",d),this.notifications.error(this.i18n.t("common.errorGeneric"))}}async reloadManagedOptions(){let c=E({},this.managedOptions());for(let o of this.optionCategories)c[o]=await this.userOptions.getSortedOptions(o);this.managedOptions.set(c)}async resetFilters(){await this.confirm.confirm({title:this.i18n.t("settings.resetFiltersTitle"),message:this.i18n.t("settings.resetFiltersMessage"),confirmLabel:this.i18n.t("settings.resetFiltersConfirm")})&&(this.resetService.resetFilters(),this.notifications.success(this.i18n.t("settings.filtersReset")))}async resetAppearance(){await this.confirm.confirm({title:this.i18n.t("settings.resetAppearanceTitle"),message:this.i18n.t("settings.resetAppearanceMessage"),confirmLabel:this.i18n.t("common.reset")})&&(await this.resetService.resetAppearance(),this.notifications.success(this.i18n.t("settings.appearanceReset")))}async resetWeatherSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetWeatherTitle"),message:this.i18n.t("settings.resetWeatherMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetWeather(),this.notifications.success(this.i18n.t("settings.weatherSettingsReset")))}async resetSecuritySettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetSecurityTitle"),message:this.i18n.t("settings.resetSecurityMessage"),confirmLabel:this.i18n.t("common.reset")})&&(this.resetService.resetSecurity(),this.notifications.success(this.i18n.t("settings.securitySettingsReset")))}async resetAllSettings(){await this.confirm.confirm({title:this.i18n.t("settings.resetAllSettingsTitle"),message:this.i18n.t("settings.resetAllSettingsMessage"),confirmLabel:this.i18n.t("settings.resetSettingsConfirm")})&&(await this.resetService.resetAllSettings(),this.notifications.success(this.i18n.t("settings.allSettingsReset")))}async resetCurrentMode(){await this.confirm.confirm({title:this.i18n.t("settings.resetCurrentModeTitle"),message:this.i18n.t("settings.resetCurrentModeMessage"),confirmLabel:this.i18n.t("settings.resetCurrentModeConfirm")})&&(await this.resetService.resetCurrentMode(),await this.reloadManagedOptions(),this.notifications.success(this.i18n.t("settings.currentModeReset")))}async resetFullApplication(){if(await this.confirm.confirm({title:this.i18n.t("settings.exportBeforeResetTitle"),message:this.i18n.t("settings.exportBeforeResetMessage"),confirmLabel:this.i18n.t("settings.exportBackupConfirm")})&&await this.exportBackup(),this.fullResetInput().trim()!=="RESET"){this.notifications.error(this.i18n.t("messages.fullResetTypeReset"));return}await this.confirm.confirm({title:this.i18n.t("settings.resetEntireTitle"),message:this.i18n.t("settings.resetEntireMessage"),confirmLabel:this.i18n.t("settings.deleteEverythingConfirm")})&&(await this.resetService.resetFullApplication(),this.fullResetInput.set(""),this.notifications.success(this.i18n.t("messages.applicationResetComplete")),await this.router.navigateByUrl("/mode-select"))}languageLabel(c){return c==="nl"?"Nederlands":c==="en"?"English":"Deutsch"}categoryLabel(c){return this.i18n.t(`options.category.${c}`)}static \u0275fac=function(o){return new(o||m)};static \u0275cmp=R({type:m,selectors:[["app-settings"]],decls:398,vars:339,consts:[["title","common.settings"],[1,"section","app-card"],["sectionId","settings-appearance","persistKey","settings-appearance","label","appearance",3,"defaultExpanded","flat"],["expandHeader",""],[1,"section-title"],[1,"submenu-content"],["appearance","outline",1,"full"],[3,"ngModelChange","ngModel"],["value","dark"],["value","light"],["value","system"],[3,"value"],[1,"theme-preview"],["sectionId","settings-units","persistKey","settings-units","label","units",3,"flat"],["value","kg"],["value","lbs"],["value","cm"],["value","inch"],["value","celsius"],["value","fahrenheit"],["value","m"],["value","ft"],["sectionId","settings-general","persistKey","settings-general","label","general",3,"flat"],["value",""],["matInput","","type","number",3,"ngModelChange","ngModel"],["value","24h"],["value","12h"],["sectionId","settings-gallery","persistKey","settings-gallery","label","gallery",3,"flat"],["value","newest"],["value","oldest"],["value","favorite"],["value","small"],["value","medium"],["value","large"],["mat-stroked-button","","type","button",3,"click"],["sectionId","settings-weather","persistKey","settings-weather","label","weather",3,"flat"],["sectionId","settings-assistant","persistKey","settings-assistant","label","assistant",3,"flat"],[1,"hint"],[1,"hint","warn-hint"],["matInput","","type","password","autocomplete","off",3,"ngModelChange","ngModel"],["matInput","",3,"ngModelChange","ngModel"],["mat-stroked-button","","routerLink","/assistant"],["sectionId","settings-security","persistKey","settings-security","label","security",3,"flat"],["matInput","","type","password","maxlength","6",3,"ngModelChange","ngModel"],[1,"action-row"],["sectionId","settings-data","persistKey","settings-data","label","data",3,"flat"],["mat-flat-button","","type","button",1,"action-btn",3,"click","disabled"],[1,"import-btn"],["type","file","accept",".json","hidden","",3,"change"],["mat-stroked-button",""],["sectionId","settings-reset","persistKey","settings-reset","label","reset",3,"flat"],[1,"reset-desc"],[1,"subsection"],[1,"manage-options"],[1,"reset-actions"],["mat-stroked-button","","type","button"],[1,"subsection","danger"],[1,"reset-warning"],["mat-stroked-button","","color","warn","type","button",3,"click"],["matInput","","placeholder","RESET",3,"ngModelChange","ngModel"],[1,"section","app-card","about"],["sectionId","settings-about","persistKey","settings-about","label","about",3,"flat"],["routerLink","/profile"],["routerLink","/profile/documents"],["routerLink","/privacy"],["mat-stroked-button","","routerLink","/privacy"],["sectionId","settings-changelog","persistKey","settings-changelog","label","changelog",3,"flat"],["mat-stroked-button","","routerLink","/release-notes"],[1,"message"],[1,"manage-category"],[1,"manage-category-title"],[1,"option-list"],[1,"option-row"],[1,"option-value"]],template:function(o,i){o&1&&(y(0,"app-page-title",0),t(1,"section",1)(2,"app-expandable-section",2)(3,"div",3)(4,"h2",4),a(5),s(6,"tr"),n()(),t(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),a(10),s(11,"tr"),n(),t(12,"mat-select",7),g("ngModelChange",function(p){return i.updateTheme(p)}),t(13,"mat-option",8),a(14),s(15,"tr"),n(),t(16,"mat-option",9),a(17),s(18,"tr"),n(),t(19,"mat-option",10),a(20),s(21,"tr"),n()()(),t(22,"mat-form-field",6)(23,"mat-label"),a(24),s(25,"tr"),n(),t(26,"mat-select",7),g("ngModelChange",function(p){return i.updateLanguage(p)}),M(27,Ft,2,2,"mat-option",11,O),n()(),t(29,"div",12),a(30),s(31,"tr"),n()()()(),t(32,"section",1)(33,"app-expandable-section",13)(34,"div",3)(35,"h2",4),a(36),s(37,"tr"),n()(),t(38,"div",5)(39,"mat-form-field",6)(40,"mat-label"),a(41),s(42,"tr"),n(),t(43,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("weightUnit",p)}),t(44,"mat-option",14),a(45),s(46,"tr"),n(),t(47,"mat-option",15),a(48),s(49,"tr"),n()()(),t(50,"mat-form-field",6)(51,"mat-label"),a(52),s(53,"tr"),n(),t(54,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("lengthUnit",p)}),t(55,"mat-option",16),a(56),s(57,"tr"),n(),t(58,"mat-option",17),a(59),s(60,"tr"),n()()(),t(61,"mat-form-field",6)(62,"mat-label"),a(63),s(64,"tr"),n(),t(65,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("temperatureUnit",p)}),t(66,"mat-option",18),a(67),s(68,"tr"),n(),t(69,"mat-option",19),a(70),s(71,"tr"),n()()(),t(72,"mat-form-field",6)(73,"mat-label"),a(74),s(75,"tr"),n(),t(76,"mat-select",7),g("ngModelChange",function(p){return i.updateUnits("distanceUnit",p)}),t(77,"mat-option",20),a(78),s(79,"tr"),n(),t(80,"mat-option",21),a(81),s(82,"tr"),n()()()()()(),t(83,"section",1)(84,"app-expandable-section",22)(85,"div",3)(86,"h2",4),a(87),s(88,"tr"),n()(),t(89,"div",5)(90,"mat-form-field",6)(91,"mat-label"),a(92),s(93,"tr"),n(),t(94,"mat-select",7),g("ngModelChange",function(p){return i.updateDefaultLake(p||void 0)}),t(95,"mat-option",23),a(96),s(97,"tr"),n(),M(98,Wt,2,2,"mat-option",11,Tt),n()(),t(100,"mat-form-field",6)(101,"mat-label"),a(102),s(103,"tr"),n(),t(104,"input",24),g("ngModelChange",function(p){return i.updateSetting("maxRodCount",+p)}),n()(),t(105,"mat-form-field",6)(106,"mat-label"),a(107),s(108,"tr"),n(),t(109,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("timeFormat",p)}),t(110,"mat-option",25),a(111),s(112,"tr"),n(),t(113,"mat-option",26),a(114),s(115,"tr"),n()()(),t(116,"mat-form-field",6)(117,"mat-label"),a(118),s(119,"tr"),n(),t(120,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("firstDayOfWeek",p===0?0:1)}),t(121,"mat-option",11),a(122),s(123,"tr"),n(),t(124,"mat-option",11),a(125),s(126,"tr"),n()()()()()(),t(127,"section",1)(128,"app-expandable-section",27)(129,"div",3)(130,"h2",4),a(131),s(132,"tr"),n()(),t(133,"div",5)(134,"mat-form-field",6)(135,"mat-label"),a(136),s(137,"tr"),n(),t(138,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("gallerySortDefault",p)}),t(139,"mat-option",28),a(140),s(141,"tr"),n(),t(142,"mat-option",29),a(143),s(144,"tr"),n(),t(145,"mat-option",30),a(146),s(147,"tr"),n()()(),t(148,"mat-form-field",6)(149,"mat-label"),a(150),s(151,"tr"),n(),t(152,"mat-select",7),g("ngModelChange",function(p){return i.updateSetting("galleryThumbnailSize",p)}),t(153,"mat-option",31),a(154),s(155,"tr"),n(),t(156,"mat-option",32),a(157),s(158,"tr"),n(),t(159,"mat-option",33),a(160),s(161,"tr"),n()()(),t(162,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("galleryFavoritesFirst",p)}),a(163),s(164,"tr"),n(),t(165,"button",34),g("click",function(){return i.clearHomepageImage()}),a(166),s(167,"tr"),n()()()(),t(168,"section",1)(169,"app-expandable-section",35)(170,"div",3)(171,"h2",4),a(172),s(173,"tr"),n()(),t(174,"div",5)(175,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("detailedWeatherEnabled",p)}),a(176),s(177,"tr"),n(),t(178,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("autoLoadWeather",p)}),a(179),s(180,"tr"),n(),t(181,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("useGpsForWeather",p)}),a(182),s(183,"tr"),n(),t(184,"mat-checkbox",7),g("ngModelChange",function(p){return i.updateSetting("showWeatherWarnings",p)}),a(185),s(186,"tr"),n(),t(187,"mat-form-field",6)(188,"mat-label"),a(189),s(190,"tr"),n(),t(191,"input",24),g("ngModelChange",function(p){return i.updateSetting("weatherRefreshMinutes",+p)}),n()(),t(192,"button",34),g("click",function(){return i.clearWeatherCache()}),a(193),s(194,"tr"),n()()()(),t(195,"section",1)(196,"app-expandable-section",36)(197,"div",3)(198,"h2",4),a(199),s(200,"tr"),n()(),t(201,"div",5)(202,"p",37),a(203),s(204,"tr"),n(),t(205,"p",38),a(206),s(207,"tr"),n(),t(208,"mat-slide-toggle",7),g("ngModelChange",function(p){return i.updateSetting("aiChatEnabled",p)}),a(209),s(210,"tr"),n(),t(211,"mat-form-field",6)(212,"mat-label"),a(213),s(214,"tr"),n(),t(215,"input",39),g("ngModelChange",function(p){return i.updateAiApiKey(p)}),n()(),t(216,"mat-form-field",6)(217,"mat-label"),a(218),s(219,"tr"),n(),t(220,"input",40),g("ngModelChange",function(p){return i.updateSetting("aiBaseUrl",p||void 0)}),n(),t(221,"mat-hint"),a(222),s(223,"tr"),n()(),t(224,"mat-form-field",6)(225,"mat-label"),a(226),s(227,"tr"),n(),t(228,"input",40),g("ngModelChange",function(p){return i.updateSetting("aiModel",p||void 0)}),n()(),t(229,"button",34),g("click",function(){return i.clearAiKey()}),a(230),s(231,"tr"),n(),t(232,"a",41),a(233),s(234,"tr"),n()()()(),t(235,"section",1)(236,"app-expandable-section",42)(237,"div",3)(238,"h2",4),a(239),s(240,"tr"),n()(),t(241,"div",5)(242,"p",37),a(243),s(244,"tr"),n(),t(245,"mat-form-field",6)(246,"mat-label"),a(247),s(248,"tr"),n(),t(249,"input",24),g("ngModelChange",function(p){return i.updateLockTimeout(+p)}),n()(),t(250,"mat-form-field",6)(251,"mat-label"),a(252),s(253,"tr"),n(),t(254,"input",43),W("ngModelChange",function(p){return F(i.oldPin,p)||(i.oldPin=p),p}),n()(),t(255,"mat-form-field",6)(256,"mat-label"),a(257),s(258,"tr"),n(),t(259,"input",43),W("ngModelChange",function(p){return F(i.newPin,p)||(i.newPin=p),p}),n()(),t(260,"mat-form-field",6)(261,"mat-label"),a(262),s(263,"tr"),n(),t(264,"input",43),W("ngModelChange",function(p){return F(i.confirmPin,p)||(i.confirmPin=p),p}),n()(),t(265,"div",44)(266,"button",34),g("click",function(){return i.changePin()}),a(267),s(268,"tr"),n(),t(269,"button",34),g("click",function(){return i.logout()}),a(270),s(271,"tr"),n()()()()(),t(272,"section",1)(273,"app-expandable-section",45)(274,"div",3)(275,"h2",4),a(276),s(277,"tr"),n()(),t(278,"div",5)(279,"button",46),g("click",function(){return i.exportBackup()}),a(280),s(281,"tr"),s(282,"tr"),n(),t(283,"label",47)(284,"input",48),g("change",function(p){return i.importBackup(p)}),n(),t(285,"span",49),a(286),s(287,"tr"),n()()()()(),t(288,"section",1)(289,"app-expandable-section",50)(290,"div",3)(291,"h2",4),a(292),s(293,"tr"),n()(),t(294,"div",5)(295,"p",51),a(296),s(297,"tr"),n(),t(298,"h3",52),a(299),s(300,"tr"),n(),t(301,"p",51),a(302),s(303,"tr"),n(),t(304,"div",53),M(305,Ut,1,1,null,null,O),n(),t(307,"div",54),M(308,Kt,3,4,"button",55,O),t(310,"button",34),g("click",function(){return i.resetAllCustomOptions()}),a(311),s(312,"tr"),n()(),t(313,"h3",52),a(314),s(315,"tr"),n(),t(316,"div",54)(317,"button",34),g("click",function(){return i.resetFilters()}),a(318),s(319,"tr"),n(),t(320,"button",34),g("click",function(){return i.resetAppearance()}),a(321),s(322,"tr"),n(),t(323,"button",34),g("click",function(){return i.resetWeatherSettings()}),a(324),s(325,"tr"),n(),t(326,"button",34),g("click",function(){return i.resetSecuritySettings()}),a(327),s(328,"tr"),n(),t(329,"button",34),g("click",function(){return i.resetAllSettings()}),a(330),s(331,"tr"),n()(),t(332,"h3",56),a(333),s(334,"tr"),n(),t(335,"p",57),a(336),s(337,"tr"),n(),t(338,"button",58),g("click",function(){return i.resetCurrentMode()}),a(339),s(340,"tr"),n(),t(341,"mat-form-field",6)(342,"mat-label"),a(343),s(344,"tr"),n(),t(345,"input",59),g("ngModelChange",function(p){return i.fullResetInput.set(p)}),n()(),t(346,"button",58),g("click",function(){return i.resetFullApplication()}),a(347),s(348,"tr"),n()()()(),t(349,"section",60)(350,"app-expandable-section",61)(351,"div",3)(352,"h2",4),a(353),s(354,"tr"),n()(),t(355,"div",5)(356,"p"),a(357),s(358,"tr"),n(),w(359,Ht,3,3,"button",55),w(360,Vt,3,3,"p",37),t(361,"button",34),g("click",function(){return i.shareViaWhatsApp()}),a(362),s(363,"tr"),n(),t(364,"button",34),g("click",function(){return i.sendFeedback()}),a(365),s(366,"tr"),n(),t(367,"a",62),a(368),s(369,"tr"),n(),a(370," \xB7 "),t(371,"a",63),a(372),s(373,"tr"),n(),a(374," \xB7 "),t(375,"a",64),a(376),s(377,"tr"),n(),t(378,"p"),a(379),s(380,"tr"),n(),t(381,"a",65),a(382),s(383,"tr"),n()()()(),t(384,"section",1)(385,"app-expandable-section",66)(386,"div",3)(387,"h2",4),a(388),s(389,"tr"),n()(),t(390,"div",5)(391,"p"),a(392),s(393,"tr"),n(),t(394,"a",67),a(395),s(396,"tr"),n()()()(),w(397,Nt,2,1,"p",68)),o&2&&(e(2),h("defaultExpanded",!0)("flat",!0),e(3),l(r(6,143,"settings.appearance")),e(5),l(r(11,145,"settings.theme")),e(2),h("ngModel",i.settings().themeMode),e(2),l(r(15,147,"settings.darkMode")),e(3),l(r(18,149,"settings.lightMode")),e(3),l(r(21,151,"settings.systemPreference")),e(4),l(r(25,153,"settings.language")),e(2),h("ngModel",i.settings().language),e(),I(i.supportedLanguages),e(2),x("data-theme",i.settings().themeMode==="system"?null:i.settings().themeMode),e(),_(" ",r(31,155,"settings.preview")," "),e(3),h("flat",!0),e(3),l(r(37,157,"settings.units")),e(5),l(r(42,159,"settings.weight")),e(2),h("ngModel",i.settings().weightUnit),e(2),l(r(46,161,"settings.kilograms")),e(3),l(r(49,163,"settings.pounds")),e(4),l(r(53,165,"settings.length")),e(2),h("ngModel",i.settings().lengthUnit),e(2),l(r(57,167,"settings.centimeters")),e(3),l(r(60,169,"settings.inches")),e(4),l(r(64,171,"settings.temperature")),e(2),h("ngModel",i.settings().temperatureUnit),e(2),l(r(68,173,"settings.celsius")),e(3),l(r(71,175,"settings.fahrenheit")),e(4),l(r(75,177,"settings.distance")),e(2),h("ngModel",i.settings().distanceUnit),e(2),l(r(79,179,"settings.meters")),e(3),l(r(82,181,"settings.feet")),e(3),h("flat",!0),e(3),l(r(88,183,"settings.general")),e(5),l(r(93,185,"settings.defaultLake")),e(2),h("ngModel",i.modePreferences().defaultLakeId),e(2),l(r(97,187,"common.none")),e(2),I(i.lakes()),e(4),l(r(103,189,"settings.maxRods")),e(2),h("ngModel",i.settings().maxRodCount),e(3),l(r(108,191,"settings.timeFormat")),e(2),h("ngModel",i.settings().timeFormat),e(2),l(r(112,193,"settings.hour24")),e(3),l(r(115,195,"settings.hour12")),e(4),l(r(119,197,"settings.firstDayWeek")),e(2),h("ngModel",i.settings().firstDayOfWeek),e(),h("value",0),e(),l(r(123,199,"settings.sunday")),e(2),h("value",1),e(),l(r(126,201,"settings.monday")),e(3),h("flat",!0),e(3),l(r(132,203,"settings.gallery")),e(5),l(r(137,205,"settings.defaultSorting")),e(2),h("ngModel",i.settings().gallerySortDefault),e(2),l(r(141,207,"settings.newest")),e(3),l(r(144,209,"settings.oldest")),e(3),l(r(147,211,"settings.favoriteFirst")),e(4),l(r(151,213,"settings.thumbnailSize")),e(2),h("ngModel",i.settings().galleryThumbnailSize),e(2),l(r(155,215,"settings.small")),e(3),l(r(158,217,"settings.medium")),e(3),l(r(161,219,"settings.large")),e(2),h("ngModel",i.settings().galleryFavoritesFirst),e(),_(" ",r(164,221,"settings.showFavoritesFirst")," "),e(3),l(r(167,223,"settings.clearHomepageImage")),e(3),h("flat",!0),e(3),l(r(173,225,"settings.weather")),e(3),h("ngModel",i.settings().detailedWeatherEnabled),e(),_(" ",r(177,227,"settings.enableDetailedWeather")," "),e(2),h("ngModel",i.settings().autoLoadWeather),e(),_(" ",r(180,229,"settings.autoLoadWeather")," "),e(2),h("ngModel",i.settings().useGpsForWeather),e(),_(" ",r(183,231,"settings.useGps")," "),e(2),h("ngModel",i.settings().showWeatherWarnings),e(),_(" ",r(186,233,"settings.showWarnings")," "),e(4),l(r(190,235,"settings.refreshMinutes")),e(2),h("ngModel",i.settings().weatherRefreshMinutes),e(2),l(r(194,237,"settings.deleteCachedWeather")),e(3),h("flat",!0),e(3),l(r(200,239,"settings.assistant")),e(4),l(r(204,241,"settings.assistantHint")),e(3),l(r(207,243,"settings.assistantPrivacyWarning")),e(2),h("ngModel",i.settings().aiChatEnabled),e(),_(" ",r(210,245,"settings.enableAiChat")," "),e(4),l(r(214,247,"settings.aiApiKey")),e(2),h("ngModel",i.aiApiKey()??""),e(3),l(r(219,249,"settings.aiBaseUrl")),e(2),h("ngModel",i.settings().aiBaseUrl??""),e(2),l(r(223,251,"settings.aiBaseUrlHint")),e(4),l(r(227,253,"settings.aiModel")),e(2),h("ngModel",i.settings().aiModel??""),e(2),l(r(231,255,"settings.clearAiKey")),e(3),l(r(234,257,"settings.openAssistant")),e(3),h("flat",!0),e(3),l(r(240,259,"settings.security")),e(4),l(r(244,261,"settings.pinPrivacyHint")),e(4),l(r(248,263,"settings.lockAfter")),e(2),h("ngModel",i.settings().lockTimeoutMinutes),e(3),l(r(253,265,"settings.currentPin")),e(2),L("ngModel",i.oldPin),e(3),l(r(258,267,"settings.newPin")),e(2),L("ngModel",i.newPin),e(3),l(r(263,269,"settings.confirmPin")),e(2),L("ngModel",i.confirmPin),e(3),l(r(268,271,"settings.changePin")),e(3),l(r(271,273,"settings.logout")),e(3),h("flat",!0),e(3),l(r(277,275,"settings.data")),e(3),h("disabled",i.exporting()),e(),_(" ",i.exporting()?r(281,277,"settings.exporting"):r(282,279,"settings.exportJson")," "),e(6),l(r(287,281,"settings.importJson")),e(3),h("flat",!0),e(3),l(r(293,283,"settings.resetSection")),e(4),l(r(297,285,"settings.resetDesc")),e(3),l(r(300,287,"settings.customOptions")),e(3),l(r(303,289,"settings.manageOptionsDesc")),e(3),I(i.optionCategories),e(3),I(i.optionCategories),e(3),l(r(312,291,"settings.resetAllCustom")),e(3),l(r(315,293,"settings.preferences")),e(4),l(r(319,295,"settings.resetFilters")),e(3),l(r(322,297,"settings.resetAppearance")),e(3),l(r(325,299,"settings.resetWeather")),e(3),l(r(328,301,"settings.resetSecurity")),e(3),l(r(331,303,"settings.resetAllSettings")),e(3),l(r(334,305,"settings.fullReset")),e(3),l(r(337,307,"settings.fullResetWarn")),e(3),_(" ",r(340,309,"settings.resetCurrentMode")," "),e(4),l(r(344,311,"settings.confirmation")),e(2),h("ngModel",i.fullResetInput()),e(2),l(r(348,313,"settings.resetEntire")),e(3),h("flat",!0),e(3),l(r(354,315,"settings.about")),e(4),l(r(358,317,"settings.aboutText")),e(2),S(i.pwaInstall.canInstall()?359:-1),e(),S(i.pwaInstall.showIosHint()?360:-1),e(2),l(r(363,319,"settings.shareWhatsApp")),e(3),l(r(366,321,"settings.sendFeedback")),e(3),l(r(369,323,"settings.profile")),e(4),l(r(373,325,"settings.documents")),e(4),l(r(377,327,"settings.privacy")),e(3),l(r(380,329,"settings.privacyDesc")),e(3),l(r(383,331,"settings.openPrivacy")),e(3),h("flat",!0),e(3),l(r(389,333,"settings.changelog")),e(4),l(r(393,335,"settings.changelogDesc")),e(3),l(r(396,337,"settings.openChangelog")),e(2),S(i.message()?397:-1))},dependencies:[mt,rt,ct,lt,pt,dt,ye,Le,Ae,vt,ut,gt,ht,wt,yt,bt,_t,ft,Ct,kt,It,J,et,Ze,Ge],styles:[".section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-lg)}.full[_ngcontent-%COMP%]{width:100%}.action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{margin-right:var(--spacing-sm)}.submenu-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-sm)}.section-title[_ngcontent-%COMP%]{margin:0;font-size:1rem}.action-row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm)}.theme-preview[_ngcontent-%COMP%]{padding:var(--spacing-md);border-radius:var(--radius-sm);border:1px solid var(--border-primary);background:var(--background-secondary);text-align:center;color:var(--text-primary)}.message[_ngcontent-%COMP%]{margin-top:var(--spacing-md);color:var(--primary)}.reset-desc[_ngcontent-%COMP%], .reset-warning[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary)}.hint[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary);margin:0 0 var(--spacing-sm)}.warn-hint[_ngcontent-%COMP%]{color:var(--warning, #c47a00)}.subsection[_ngcontent-%COMP%]{font-size:1rem;margin:var(--spacing-md) 0 var(--spacing-sm);color:var(--text-primary)}.subsection.danger[_ngcontent-%COMP%]{color:var(--danger)}.reset-actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:var(--spacing-sm);margin-bottom:var(--spacing-md)}.manage-options[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:var(--spacing-md);margin-bottom:var(--spacing-md)}.manage-category-title[_ngcontent-%COMP%]{margin:0 0 var(--spacing-xs);font-size:.9rem;color:var(--text-secondary)}.option-list[_ngcontent-%COMP%]{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--spacing-xs)}.option-row[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-sm)}.option-value[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@media(max-width:768px){.section[_ngcontent-%COMP%]{margin-bottom:var(--spacing-md)}.action-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .reset-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%], .action-btn[_ngcontent-%COMP%], .import-btn[_ngcontent-%COMP%]{width:100%;margin-right:0}}"]})};export{Et as SettingsComponent};
