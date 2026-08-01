import{a as pt,c as ht}from"./chunk-ZQU4IG3M.js";import{a as ut,b as dt}from"./chunk-2DBUMJOQ.js";import{e as mt}from"./chunk-JX7AP4CG.js";import"./chunk-JVJZJU6X.js";import"./chunk-65BND63O.js";import"./chunk-JNNPAJU4.js";import"./chunk-5HFCZLRE.js";import{a as je}from"./chunk-NHVWHWRA.js";import{a as Ne,c as He,d as Ve,e as ze,f as Ye}from"./chunk-AKA4RH4V.js";import"./chunk-UQ5P4QJ6.js";import{d as Je,f as $e,k as et,l as tt,o as nt,r as it,u as at}from"./chunk-MCS5UJGG.js";import"./chunk-QBGMWYIV.js";import{$ as st,G as Ue,I as Ke,J as Ge,Q as qe,U as Ze,W as se,Y as ot,Z as rt,ba as lt,n as We,o as Xe,u as re,v as Qe}from"./chunk-4XLVBEVA.js";import{t as ct}from"./chunk-4XCJ7JVJ.js";import{$a as Ce,$b as Ae,A as N,Aa as j,Ac as Le,Ba as Me,C as H,Eb as y,Fb as o,Gb as l,H as pe,Hb as E,Ib as ae,Ic as K,Jb as Oe,Kc as S,Lb as W,Mb as Re,Pb as A,Qb as Te,R as C,Rb as _,S as ne,Sb as oe,T as he,Tb as X,Ub as Ee,Va as m,Vb as Q,Wb as M,Xb as x,_ as ge,_a as xe,a as ee,aa as R,b as de,bb as ke,bc as P,ca as r,cc as Fe,db as we,dc as c,eb as Pe,ec as g,f as B,ha as b,i as L,ia as v,ib as T,ja as _e,jb as Se,kb as ie,la as V,ma as fe,n as te,na as be,nb as Ie,oc as Be,pa as z,pb as De,pc as U,qa as ve,sc as d,ta as Y,tc as p,wa as ye,xb as h,yb as k,zb as w}from"./chunk-YLCVSZIS.js";var Pt=["mat-menu-item",""],St=[[["mat-icon"],["","matMenuItemIcon",""]],"*"],It=["mat-icon, [matMenuItemIcon]","*"];function Dt(i,u){i&1&&(_e(),o(0,"svg",2),E(1,"polygon",3),l())}var Ot=["*"];function Rt(i,u){if(i&1){let e=W();ae(0,"div",0),Te("click",function(){b(e);let n=_();return v(n.closed.emit("click"))})("animationstart",function(n){b(e);let a=_();return v(a._onAnimationStart(n.animationName))})("animationend",function(n){b(e);let a=_();return v(a._onAnimationDone(n.animationName))})("animationcancel",function(n){b(e);let a=_();return v(a._onAnimationDone(n.animationName))}),ae(1,"div",1),X(2),Oe()()}if(i&2){let e=_();Fe(e._classList),P("mat-menu-panel-animations-disabled",e._animationsDisabled)("mat-menu-panel-exit-animation",e._panelAnimationState==="void")("mat-menu-panel-animating",e._isAnimating()),Re("id",e.panelId),h("aria-label",e.ariaLabel||null)("aria-labelledby",e.ariaLabelledby||null)("aria-describedby",e.ariaDescribedby||null)}}var me=new R("MAT_MENU_PANEL"),F=(()=>{class i{_elementRef=r(j);_document=r(fe);_focusMonitor=r(re);_parentMenu=r(me,{optional:!0});_changeDetectorRef=r(K);role="menuitem";disabled=!1;disableRipple=!1;_hovered=new L;_focused=new L;_highlighted=!1;_triggersSubmenu=!1;constructor(){r(Qe).load(rt),this._parentMenu?.addItem?.(this)}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._getHostElement(),e,t):this._getHostElement().focus(t),this._focused.next(this)}ngAfterViewInit(){this._focusMonitor&&this._focusMonitor.monitor(this._elementRef,!1)}ngOnDestroy(){this._focusMonitor&&this._focusMonitor.stopMonitoring(this._elementRef),this._parentMenu&&this._parentMenu.removeItem&&this._parentMenu.removeItem(this),this._hovered.complete(),this._focused.complete()}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._elementRef.nativeElement}_checkDisabled(e){this.disabled&&(e.preventDefault(),e.stopPropagation())}_handleMouseEnter(){this._hovered.next(this)}getLabel(){let e=this._elementRef.nativeElement.cloneNode(!0),t=e.querySelectorAll("mat-icon, .material-icons");for(let n=0;n<t.length;n++)t[n].remove();return e.textContent?.trim()||""}_setHighlighted(e){this._highlighted=e,this._changeDetectorRef.markForCheck()}_setTriggersSubmenu(e){this._triggersSubmenu=e,this._changeDetectorRef.markForCheck()}_hasFocus(){return this._document&&this._document.activeElement===this._getHostElement()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=T({type:i,selectors:[["","mat-menu-item",""]],hostAttrs:[1,"mat-mdc-menu-item","mat-focus-indicator"],hostVars:8,hostBindings:function(t,n){t&1&&A("click",function(s){return n._checkDisabled(s)})("mouseenter",function(){return n._handleMouseEnter()}),t&2&&(h("role",n.role)("tabindex",n._getTabIndex())("aria-disabled",n.disabled)("disabled",n.disabled||null),P("mat-mdc-menu-item-highlighted",n._highlighted)("mat-mdc-menu-item-submenu-trigger",n._triggersSubmenu))},inputs:{role:"role",disabled:[2,"disabled","disabled",S],disableRipple:[2,"disableRipple","disableRipple",S]},exportAs:["matMenuItem"],attrs:Pt,ngContentSelectors:It,decls:5,vars:3,consts:[[1,"mat-mdc-menu-item-text"],["matRipple","",1,"mat-mdc-menu-ripple",3,"matRippleDisabled","matRippleTrigger"],["viewBox","0 0 5 10","focusable","false","aria-hidden","true",1,"mat-mdc-menu-submenu-icon"],["points","0,0 5,5 0,10"]],template:function(t,n){t&1&&(oe(St),X(0),o(1,"span",0),X(2,1),l(),E(3,"div",1),k(4,Dt,2,0,":svg:svg",2)),t&2&&(m(3),y("matRippleDisabled",n.disableRipple||n.disabled)("matRippleTrigger",n._getHostElement()),m(),w(n._triggersSubmenu?4:-1))},dependencies:[ot],encapsulation:2,changeDetection:0})}return i})();var Tt=new R("MatMenuContent");var Et=new R("mat-menu-default-options",{providedIn:"root",factory:()=>({overlapTrigger:!1,xPosition:"after",yPosition:"below",backdropClass:"cdk-overlay-transparent-backdrop"})}),le="_mat-menu-enter",G="_mat-menu-exit",D=(()=>{class i{_elementRef=r(j);_changeDetectorRef=r(K);_injector=r(V);_keyManager;_xPosition;_yPosition;_firstItemFocusRef;_exitFallbackTimeout;_animationsDisabled=se();_allItems;_directDescendantItems=new Me;_classList={};_panelAnimationState="void";_animationDone=new L;_isAnimating=Y(!1);parentMenu;direction;overlayPanelClass;backdropClass;ariaLabel;ariaLabelledby;ariaDescribedby;get xPosition(){return this._xPosition}set xPosition(e){this._xPosition=e,this.setPositionClasses()}get yPosition(){return this._yPosition}set yPosition(e){this._yPosition=e,this.setPositionClasses()}templateRef;items;lazyContent;overlapTrigger=!1;hasBackdrop;set panelClass(e){let t=this._previousPanelClass,n=ee({},this._classList);t&&t.length&&t.split(" ").forEach(a=>{n[a]=!1}),this._previousPanelClass=e,e&&e.length&&(e.split(" ").forEach(a=>{n[a]=!0}),this._elementRef.nativeElement.className=""),this._classList=n}_previousPanelClass;get classList(){return this.panelClass}set classList(e){this.panelClass=e}closed=new z;close=this.closed;panelId=r(Ge).getId("mat-menu-panel-");constructor(){let e=r(Et);this.overlayPanelClass=e.overlayPanelClass||"",this._xPosition=e.xPosition,this._yPosition=e.yPosition,this.backdropClass=e.backdropClass,this.overlapTrigger=e.overlapTrigger,this.hasBackdrop=e.hasBackdrop}ngOnInit(){this.setPositionClasses()}ngAfterContentInit(){this._updateDirectDescendants(),this._keyManager=new Ke(this._directDescendantItems).withWrap().withTypeAhead().withHomeAndEnd(),this._keyManager.tabOut.subscribe(()=>this.closed.emit("tab")),this._directDescendantItems.changes.pipe(C(this._directDescendantItems),ne(e=>N(...e.map(t=>t._focused)))).subscribe(e=>this._keyManager.updateActiveItem(e)),this._directDescendantItems.changes.subscribe(e=>{let t=this._keyManager;if(this._panelAnimationState==="enter"&&t.activeItem?._hasFocus()){let n=e.toArray(),a=Math.max(0,Math.min(n.length-1,t.activeItemIndex||0));n[a]&&!n[a].disabled?t.setActiveItem(a):t.setNextItemActive()}})}ngOnDestroy(){this._keyManager?.destroy(),this._directDescendantItems.destroy(),this.closed.complete(),this._firstItemFocusRef?.destroy(),clearTimeout(this._exitFallbackTimeout)}_hovered(){return this._directDescendantItems.changes.pipe(C(this._directDescendantItems),ne(t=>N(...t.map(n=>n._hovered))))}addItem(e){}removeItem(e){}_handleKeydown(e){let t=e.keyCode,n=this._keyManager;switch(t){case 27:Ue(e)||(e.preventDefault(),this.closed.emit("keydown"));break;case 37:this.parentMenu&&this.direction==="ltr"&&this.closed.emit("keydown");break;case 39:this.parentMenu&&this.direction==="rtl"&&this.closed.emit("keydown");break;default:(t===38||t===40)&&n.setFocusOrigin("keyboard"),n.onKeydown(e);return}}focusFirstItem(e="program"){this._firstItemFocusRef?.destroy(),this._firstItemFocusRef=xe(()=>{let t=this._resolvePanel();if(!t||!t.contains(document.activeElement)){let n=this._keyManager;n.setFocusOrigin(e).setFirstItemActive(),!n.activeItem&&t&&t.focus()}},{injector:this._injector})}resetActiveItem(){this._keyManager.setActiveItem(-1)}setElevation(e){}setPositionClasses(e=this.xPosition,t=this.yPosition){this._classList=de(ee({},this._classList),{"mat-menu-before":e==="before","mat-menu-after":e==="after","mat-menu-above":t==="above","mat-menu-below":t==="below"}),this._changeDetectorRef.markForCheck()}_onAnimationDone(e){let t=e===G;(t||e===le)&&(t&&(clearTimeout(this._exitFallbackTimeout),this._exitFallbackTimeout=void 0),this._animationDone.next(t?"void":"enter"),this._isAnimating.set(!1))}_onAnimationStart(e){(e===le||e===G)&&this._isAnimating.set(!0)}_setIsOpen(e){if(this._panelAnimationState=e?"enter":"void",e){if(this._keyManager.activeItemIndex===0){let t=this._resolvePanel();t&&(t.scrollTop=0)}}else this._animationsDisabled||(this._exitFallbackTimeout=setTimeout(()=>this._onAnimationDone(G),200));this._animationsDisabled&&setTimeout(()=>{this._onAnimationDone(e?le:G)}),this._changeDetectorRef.markForCheck()}_updateDirectDescendants(){this._allItems.changes.pipe(C(this._allItems)).subscribe(e=>{this._directDescendantItems.reset(e.filter(t=>t._parentMenu===this)),this._directDescendantItems.notifyOnChanges()})}_resolvePanel(){let e=null;return this._directDescendantItems.length&&(e=this._directDescendantItems.first._getHostElement().closest('[role="menu"]')),e}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=T({type:i,selectors:[["mat-menu"]],contentQueries:function(t,n,a){if(t&1&&Ee(a,Tt,5)(a,F,5)(a,F,4),t&2){let s;M(s=x())&&(n.lazyContent=s.first),M(s=x())&&(n._allItems=s),M(s=x())&&(n.items=s)}},viewQuery:function(t,n){if(t&1&&Q(Ce,5),t&2){let a;M(a=x())&&(n.templateRef=a.first)}},hostVars:3,hostBindings:function(t,n){t&2&&h("aria-label",null)("aria-labelledby",null)("aria-describedby",null)},inputs:{backdropClass:"backdropClass",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],xPosition:"xPosition",yPosition:"yPosition",overlapTrigger:[2,"overlapTrigger","overlapTrigger",S],hasBackdrop:[2,"hasBackdrop","hasBackdrop",e=>e==null?null:S(e)],panelClass:[0,"class","panelClass"],classList:"classList"},outputs:{closed:"closed",close:"close"},exportAs:["matMenu"],features:[Be([{provide:me,useExisting:i}])],ngContentSelectors:Ot,decls:1,vars:0,consts:[["tabindex","-1","role","menu",1,"mat-mdc-menu-panel",3,"click","animationstart","animationend","animationcancel","id"],[1,"mat-mdc-menu-content"]],template:function(t,n){t&1&&(oe(),De(0,Rt,3,12,"ng-template"))},styles:[`mat-menu {
  display: none;
}

.mat-mdc-menu-content {
  margin: 0;
  padding: 8px 0;
  outline: 0;
}
.mat-mdc-menu-content,
.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  flex: 1;
  white-space: normal;
  font-family: var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight));
}

@keyframes _mat-menu-enter {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-menu-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-menu-panel {
  min-width: 112px;
  max-width: 280px;
  overflow: auto;
  box-sizing: border-box;
  outline: 0;
  animation: _mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);
  border-radius: var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));
  background-color: var(--mat-menu-container-color, var(--mat-sys-surface-container));
  box-shadow: var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
  will-change: transform, opacity;
}
.mat-mdc-menu-panel.mat-menu-panel-exit-animation {
  animation: _mat-menu-exit 100ms 25ms linear forwards;
}
.mat-mdc-menu-panel.mat-menu-panel-animations-disabled {
  animation: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating {
  pointer-events: none;
}
.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty) {
  display: none;
}
@media (forced-colors: active) {
  .mat-mdc-menu-panel {
    outline: solid 1px;
  }
}
.mat-mdc-menu-panel .mat-divider {
  border-top-color: var(--mat-menu-divider-color, var(--mat-sys-surface-variant));
  margin-bottom: var(--mat-menu-divider-bottom-spacing, 8px);
  margin-top: var(--mat-menu-divider-top-spacing, 8px);
}

.mat-mdc-menu-item {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
  box-sizing: border-box;
  color: inherit;
  font-size: inherit;
  background: none;
  text-decoration: none;
  margin: 0;
  min-height: 48px;
  padding-left: var(--mat-menu-item-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-trailing-spacing, 12px);
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-menu-item::-moz-focus-inner {
  border: 0;
}
[dir=rtl] .mat-mdc-menu-item {
  padding-left: var(--mat-menu-item-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-leading-spacing, 12px);
}
.mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-leading-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-item:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding-left: var(--mat-menu-item-with-icon-trailing-spacing, 12px);
  padding-right: var(--mat-menu-item-with-icon-leading-spacing, 12px);
}
.mat-mdc-menu-item, .mat-mdc-menu-item:visited, .mat-mdc-menu-item:link {
  color: var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-menu-item .mat-icon-no-color,
.mat-mdc-menu-item .mat-mdc-menu-submenu-icon {
  color: var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-menu-item[disabled] {
  cursor: default;
  opacity: 0.38;
}
.mat-mdc-menu-item[disabled]::after {
  display: block;
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.mat-mdc-menu-item:focus {
  outline: 0;
}
.mat-mdc-menu-item .mat-icon {
  flex-shrink: 0;
  margin-right: var(--mat-menu-item-spacing, 12px);
  height: var(--mat-menu-item-icon-size, 24px);
  width: var(--mat-menu-item-icon-size, 24px);
}
[dir=rtl] .mat-mdc-menu-item {
  text-align: right;
}
[dir=rtl] .mat-mdc-menu-item .mat-icon {
  margin-right: 0;
  margin-left: var(--mat-menu-item-spacing, 12px);
}
.mat-mdc-menu-item:not([disabled]):hover {
  background-color: var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-menu-item:not([disabled]).cdk-program-focused, .mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused, .mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted {
  background-color: var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
}
@media (forced-colors: active) {
  .mat-mdc-menu-item {
    margin-top: 1px;
  }
}

.mat-mdc-menu-submenu-icon {
  width: var(--mat-menu-item-icon-size, 24px);
  height: 10px;
  fill: currentColor;
  padding-left: var(--mat-menu-item-spacing, 12px);
}
[dir=rtl] .mat-mdc-menu-submenu-icon {
  padding-right: var(--mat-menu-item-spacing, 12px);
  padding-left: 0;
}
[dir=rtl] .mat-mdc-menu-submenu-icon polygon {
  transform: scaleX(-1);
  transform-origin: center;
}
@media (forced-colors: active) {
  .mat-mdc-menu-submenu-icon {
    fill: CanvasText;
  }
}

.mat-mdc-menu-item .mat-mdc-menu-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
`],encapsulation:2,changeDetection:0})}return i})(),At=new R("mat-menu-scroll-strategy",{providedIn:"root",factory:()=>{let i=r(V);return()=>et(i)}});var I=new WeakMap,Ft=(()=>{class i{_canHaveBackdrop;_element=r(j);_viewContainerRef=r(Pe);_menuItemInstance=r(F,{optional:!0,self:!0});_dir=r(qe,{optional:!0});_focusMonitor=r(re);_ngZone=r(ve);_injector=r(V);_scrollStrategy=r(At);_changeDetectorRef=r(K);_animationsDisabled=se();_portal;_overlayRef=null;_menuOpen=!1;_closingActionsSubscription=B.EMPTY;_menuCloseSubscription=B.EMPTY;_pendingRemoval;_parentMaterialMenu;_parentInnerPadding;_openedBy=void 0;get _menu(){return this._menuInternal}set _menu(e){e!==this._menuInternal&&(this._menuInternal=e,this._menuCloseSubscription.unsubscribe(),e&&(this._parentMaterialMenu,this._menuCloseSubscription=e.close.subscribe(t=>{this._destroyMenu(t),(t==="click"||t==="tab")&&this._parentMaterialMenu&&this._parentMaterialMenu.closed.emit(t)})),this._menuItemInstance?._setTriggersSubmenu(this._triggersSubmenu()))}_menuInternal=null;constructor(e){this._canHaveBackdrop=e;let t=r(me,{optional:!0});this._parentMaterialMenu=t instanceof D?t:void 0}ngOnDestroy(){this._menu&&this._ownsMenu(this._menu)&&I.delete(this._menu),this._pendingRemoval?.unsubscribe(),this._menuCloseSubscription.unsubscribe(),this._closingActionsSubscription.unsubscribe(),this._overlayRef&&(this._overlayRef.dispose(),this._overlayRef=null)}get menuOpen(){return this._menuOpen}get dir(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_triggersSubmenu(){return!!(this._menuItemInstance&&this._parentMaterialMenu&&this._menu)}_closeMenu(){this._menu?.close.emit()}_openMenu(e){if(this._triggerIsAriaDisabled())return;let t=this._menu;if(this._menuOpen||!t)return;this._pendingRemoval?.unsubscribe();let n=I.get(t);I.set(t,this),n&&n!==this&&n._closeMenu();let a=this._createOverlay(t),s=a.getConfig(),f=s.positionStrategy;this._setPosition(t,f),this._canHaveBackdrop?s.hasBackdrop=t.hasBackdrop==null?!this._triggersSubmenu():t.hasBackdrop:s.hasBackdrop=t.hasBackdrop??!1,a.hasAttached()||(a.attach(this._getPortal(t)),t.lazyContent?.attach(this.menuData)),this._closingActionsSubscription=this._menuClosingActions().subscribe(()=>this._closeMenu()),t.parentMenu=this._triggersSubmenu()?this._parentMaterialMenu:void 0,t.direction=this.dir,e&&t.focusFirstItem(this._openedBy||"program"),this._setIsMenuOpen(!0),t instanceof D&&(t._setIsOpen(!0),t._directDescendantItems.changes.pipe(he(t.close)).subscribe(()=>{f.withLockedPosition(!1).reapplyLastPosition(),f.withLockedPosition(!0)}))}focus(e,t){this._focusMonitor&&e?this._focusMonitor.focusVia(this._element,e,t):this._element.nativeElement.focus(t)}_destroyMenu(e){let t=this._overlayRef,n=this._menu;!t||!this.menuOpen||(this._closingActionsSubscription.unsubscribe(),this._pendingRemoval?.unsubscribe(),n instanceof D&&this._ownsMenu(n)?(this._pendingRemoval=n._animationDone.pipe(pe(1)).subscribe(()=>{t.detach(),I.has(n)||n.lazyContent?.detach()}),n._setIsOpen(!1)):(t.detach(),n?.lazyContent?.detach()),n&&this._ownsMenu(n)&&I.delete(n),this.restoreFocus&&(e==="keydown"||!this._openedBy||!this._triggersSubmenu())&&this.focus(this._openedBy),this._openedBy=void 0,this._setIsMenuOpen(!1))}_setIsMenuOpen(e){e!==this._menuOpen&&(this._menuOpen=e,this._menuOpen?this.menuOpened.emit():this.menuClosed.emit(),this._triggersSubmenu()&&this._menuItemInstance._setHighlighted(e),this._changeDetectorRef.markForCheck())}_createOverlay(e){if(!this._overlayRef){let t=this._getOverlayConfig(e);this._subscribeToPositions(e,t.positionStrategy),this._overlayRef=it(this._injector,t),this._overlayRef.keydownEvents().subscribe(n=>{this._menu instanceof D&&this._menu._handleKeydown(n)})}return this._overlayRef}_getOverlayConfig(e){return new tt({positionStrategy:nt(this._injector,this._getOverlayOrigin()).withLockedPosition().withGrowAfterOpen().withTransformOriginOn(".mat-menu-panel, .mat-mdc-menu-panel"),backdropClass:e.backdropClass||"cdk-overlay-transparent-backdrop",panelClass:e.overlayPanelClass,scrollStrategy:this._scrollStrategy(),direction:this._dir||"ltr",disableAnimations:this._animationsDisabled})}_subscribeToPositions(e,t){e.setPositionClasses&&t.positionChanges.subscribe(n=>{this._ngZone.run(()=>{let a=n.connectionPair.overlayX==="start"?"after":"before",s=n.connectionPair.overlayY==="top"?"below":"above";e.setPositionClasses(a,s)})})}_setPosition(e,t){let[n,a]=e.xPosition==="before"?["end","start"]:["start","end"],[s,f]=e.yPosition==="above"?["bottom","top"]:["top","bottom"],[q,Z]=[s,f],[J,$]=[n,a],O=0;if(this._triggersSubmenu()){if($=n=e.xPosition==="before"?"start":"end",a=J=n==="end"?"start":"end",this._parentMaterialMenu){if(this._parentInnerPadding==null){let ue=this._parentMaterialMenu.items.first;this._parentInnerPadding=ue?ue._getHostElement().offsetTop:0}O=s==="bottom"?this._parentInnerPadding:-this._parentInnerPadding}}else e.overlapTrigger||(q=s==="top"?"bottom":"top",Z=f==="top"?"bottom":"top");t.withPositions([{originX:n,originY:q,overlayX:J,overlayY:s,offsetY:O},{originX:a,originY:q,overlayX:$,overlayY:s,offsetY:O},{originX:n,originY:Z,overlayX:J,overlayY:f,offsetY:-O},{originX:a,originY:Z,overlayX:$,overlayY:f,offsetY:-O}])}_menuClosingActions(){let e=this._getOutsideClickStream(this._overlayRef),t=this._overlayRef.detachments(),n=this._parentMaterialMenu?this._parentMaterialMenu.closed:te(),a=this._parentMaterialMenu?this._parentMaterialMenu._hovered().pipe(H(s=>this._menuOpen&&s!==this._menuItemInstance)):te();return N(e,n,a,t)}_getPortal(e){return(!this._portal||this._portal.templateRef!==e.templateRef)&&(this._portal=new $e(e.templateRef,this._viewContainerRef)),this._portal}_ownsMenu(e){return I.get(e)===this}_triggerIsAriaDisabled(){return S(this._element.nativeElement.getAttribute("aria-disabled"))}static \u0275fac=function(t){we()};static \u0275dir=ie({type:i})}return i})(),ft=(()=>{class i extends Ft{_cleanupTouchstart;_hoverSubscription=B.EMPTY;get _deprecatedMatMenuTriggerFor(){return this.menu}set _deprecatedMatMenuTriggerFor(e){this.menu=e}get menu(){return this._menu}set menu(e){this._menu=e}menuData;restoreFocus=!0;menuOpened=new z;onMenuOpen=this.menuOpened;menuClosed=new z;onMenuClose=this.menuClosed;constructor(){super(!0);let e=r(ke);this._cleanupTouchstart=e.listen(this._element.nativeElement,"touchstart",t=>{Xe(t)||(this._openedBy="touch")},{passive:!0})}triggersSubmenu(){return super._triggersSubmenu()}toggleMenu(){return this.menuOpen?this.closeMenu():this.openMenu()}openMenu(){this._openMenu(!0)}closeMenu(){this._closeMenu()}updatePosition(){this._overlayRef?.updatePosition()}ngAfterContentInit(){this._handleHover()}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTouchstart(),this._hoverSubscription.unsubscribe()}_getOverlayOrigin(){return this._element}_getOutsideClickStream(e){return e.backdropClick()}_handleMousedown(e){We(e)||(this._openedBy=e.button===0?"mouse":void 0,this.triggersSubmenu()&&e.preventDefault())}_handleKeydown(e){let t=e.keyCode;(t===13||t===32)&&(this._openedBy="keyboard"),this.triggersSubmenu()&&(t===39&&this.dir==="ltr"||t===37&&this.dir==="rtl")&&(this._openedBy="keyboard",this.openMenu())}_handleClick(e){this.triggersSubmenu()?(e.stopPropagation(),this.openMenu()):this.toggleMenu()}_handleHover(){this.triggersSubmenu()&&this._parentMaterialMenu&&(this._hoverSubscription=this._parentMaterialMenu._hovered().subscribe(e=>{e===this._menuItemInstance&&!e.disabled&&this._parentMaterialMenu?._panelAnimationState!=="void"&&(this._openedBy="mouse",this._openMenu(!1))}))}static \u0275fac=function(t){return new(t||i)};static \u0275dir=ie({type:i,selectors:[["","mat-menu-trigger-for",""],["","matMenuTriggerFor",""]],hostAttrs:[1,"mat-mdc-menu-trigger"],hostVars:3,hostBindings:function(t,n){t&1&&A("click",function(s){return n._handleClick(s)})("mousedown",function(s){return n._handleMousedown(s)})("keydown",function(s){return n._handleKeydown(s)}),t&2&&h("aria-haspopup",n.menu?"menu":null)("aria-expanded",n.menuOpen)("aria-controls",n.menuOpen?n.menu==null?null:n.menu.panelId:null)},inputs:{_deprecatedMatMenuTriggerFor:[0,"mat-menu-trigger-for","_deprecatedMatMenuTriggerFor"],menu:[0,"matMenuTriggerFor","menu"],menuData:[0,"matMenuTriggerData","menuData"],restoreFocus:[0,"matMenuTriggerRestoreFocus","restoreFocus"]},outputs:{menuOpened:"menuOpened",onMenuOpen:"onMenuOpen",menuClosed:"menuClosed",onMenuClose:"onMenuClose"},exportAs:["matMenuTrigger"],features:[Ie]})}return i})();var bt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=Se({type:i});static \u0275inj=ge({imports:[st,at,Ze,Je]})}return i})();var Lt=["content"],ce=()=>({exact:!0});function Nt(i,u){if(i&1){let e=W();o(0,"div",3)(1,"mat-icon",15),c(2,"cloud_off"),l(),o(3,"span",16),c(4),d(5,"tr"),l(),o(6,"button",17),d(7,"tr"),A("click",function(){b(e);let n=_();return v(n.dismissOfflineBanner())}),o(8,"mat-icon",18),c(9,"close"),l()()()}i&2&&(m(4),g(p(5,2,"connectivity.offlineBanner")),m(2),h("aria-label",p(7,4,"connectivity.dismissBanner")))}function Ht(i,u){if(i&1&&(o(0,"a",19)(1,"mat-icon"),c(2,"play_circle"),l(),o(3,"span"),c(4),d(5,"tr"),l()(),o(6,"a",20)(7,"mat-icon"),c(8,"smart_toy"),l(),o(9,"span"),c(10),d(11,"tr"),l()()),i&2){let e=_();y("routerLinkActiveOptions",U(9,ce)),h("aria-current",e.router.url.startsWith("/sessions/active")?"page":null),m(4),g(p(5,5,"nav.current")),m(2),h("aria-current",e.router.url.startsWith("/assistant")?"page":null),m(4),g(p(11,7,"nav.assistant"))}}function Vt(i,u){i&1&&(o(0,"a",11)(1,"mat-icon"),c(2,"smart_toy"),l(),o(3,"span"),c(4),d(5,"tr"),l()()),i&2&&(m(4),g(p(5,1,"nav.assistant")))}var vt=class i{router=r(Ve);destroyRef=r(be);sessionService=r(mt);connectivity=r(je);contentRef;activeSession=ht(this.sessionService.watchActive(),{initialValue:void 0});bannerDismissed=Y(!1);showOfflineBanner=Le(()=>!this.connectivity.isOnline()&&!this.bannerDismissed());constructor(){ye(()=>{this.connectivity.isOnline()&&this.bannerDismissed.set(!1)})}dismissOfflineBanner(){this.bannerDismissed.set(!0)}isMoreRouteActive(){let u=this.router.url.split("?")[0];return u.startsWith("/gallery")||u.startsWith("/statistics")||u.startsWith("/settings")||u.startsWith("/assistant")||u.startsWith("/profile")||u.startsWith("/release-notes")}ngAfterViewInit(){this.router.events.pipe(H(u=>u instanceof Ne),C(null),pt(this.destroyRef)).subscribe(()=>{let u=this.contentRef?.nativeElement;u&&(typeof u.scrollTo=="function"?u.scrollTo({top:0,left:0,behavior:"auto"}):u.scrollTop=0,u.focus({preventScroll:!0}))})}static \u0275fac=function(e){return new(e||i)};static \u0275cmp=T({type:i,selectors:[["app-shell"]],viewQuery:function(e,t){if(e&1&&Q(Lt,7),e&2){let n;M(n=x())&&(t.contentRef=n.first)}},decls:53,vars:40,consts:[["content",""],["moreMenu","matMenu"],[1,"shell"],["role","status",1,"offline-banner"],["tabindex","-1",1,"content"],["aria-label","Main",1,"bottom-nav"],["routerLink","/","routerLinkActive","active",3,"routerLinkActiveOptions"],["routerLink","/sessions","routerLinkActive","active",3,"routerLinkActiveOptions"],["routerLink","/lakes","routerLinkActive","active"],["type","button",1,"more-trigger",3,"matMenuTriggerFor"],[1,"more-nav-menu"],["mat-menu-item","","routerLink","/assistant"],["mat-menu-item","","routerLink","/gallery"],["mat-menu-item","","routerLink","/statistics"],["mat-menu-item","","routerLink","/settings"],["aria-hidden","true",1,"offline-banner-icon"],[1,"offline-banner-text"],["type","button",1,"offline-banner-dismiss",3,"click"],["aria-hidden","true"],["routerLink","/sessions/active","routerLinkActive","active",3,"routerLinkActiveOptions"],["routerLink","/assistant","routerLinkActive","active"]],template:function(e,t){if(e&1&&(o(0,"div",2),k(1,Nt,10,6,"div",3),o(2,"main",4,0),E(4,"router-outlet"),l(),o(5,"nav",5)(6,"a",6)(7,"mat-icon"),c(8,"home"),l(),o(9,"span"),c(10),d(11,"tr"),l()(),k(12,Ht,12,10),o(13,"a",7)(14,"mat-icon"),c(15,"event"),l(),o(16,"span"),c(17),d(18,"tr"),l()(),o(19,"a",8)(20,"mat-icon"),c(21,"water"),l(),o(22,"span"),c(23),d(24,"tr"),l()(),o(25,"button",9),d(26,"tr"),o(27,"mat-icon"),c(28,"more_horiz"),l(),o(29,"span"),c(30),d(31,"tr"),l()(),o(32,"mat-menu",10,1),k(34,Vt,6,3,"a",11),o(35,"a",12)(36,"mat-icon"),c(37,"photo_library"),l(),o(38,"span"),c(39),d(40,"tr"),l()(),o(41,"a",13)(42,"mat-icon"),c(43,"bar_chart"),l(),o(44,"span"),c(45),d(46,"tr"),l()(),o(47,"a",14)(48,"mat-icon"),c(49,"settings"),l(),o(50,"span"),c(51),d(52,"tr"),l()()()()()),e&2){let n=Ae(33);m(),w(t.showOfflineBanner()?1:-1),m(4),P("with-current",!!t.activeSession()),m(),y("routerLinkActiveOptions",U(38,ce)),h("aria-current",t.router.url==="/"||t.router.url.startsWith("/?")?"page":null),m(4),g(p(11,22,"nav.home")),m(2),w(t.activeSession()?12:-1),m(),y("routerLinkActiveOptions",U(39,ce)),h("aria-current",t.router.url==="/sessions"||t.router.url.startsWith("/sessions?")?"page":null),m(4),g(p(18,24,"nav.sessions")),m(2),h("aria-current",t.router.url.startsWith("/lakes")?"page":null),m(4),g(p(24,26,"nav.lakes")),m(2),P("active",t.isMoreRouteActive()),y("matMenuTriggerFor",n),h("aria-label",p(26,28,"nav.more"))("aria-current",t.isMoreRouteActive()?"page":null),m(5),g(p(31,30,"nav.more")),m(4),w(t.activeSession()?-1:34),m(5),g(p(40,32,"nav.gallery")),m(6),g(p(46,34,"nav.stats")),m(6),g(p(52,36,"nav.settings"))}},dependencies:[He,ze,Ye,dt,ut,bt,D,F,ft,lt,ct],styles:[".shell[_ngcontent-%COMP%]{display:flex;flex-direction:column;height:100dvh;background:var(--background-primary);color:var(--text-primary)}.offline-banner[_ngcontent-%COMP%]{display:flex;align-items:center;gap:var(--spacing-sm, 8px);flex-shrink:0;padding:8px 12px;padding-top:calc(8px + env(safe-area-inset-top));background:color-mix(in srgb,var(--warning) 22%,var(--background-secondary));border-bottom:1px solid color-mix(in srgb,var(--warning) 45%,transparent);color:var(--text-primary);font-size:.8125rem;line-height:1.3;z-index:110}.offline-banner-icon[_ngcontent-%COMP%]{flex-shrink:0;font-size:18px;width:18px;height:18px;color:var(--warning)}.offline-banner-text[_ngcontent-%COMP%]{flex:1;min-width:0}.offline-banner-dismiss[_ngcontent-%COMP%]{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:36px;height:36px;padding:0;border:none;border-radius:8px;background:transparent;color:var(--text-muted);cursor:pointer}.offline-banner-dismiss[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.offline-banner-dismiss[_ngcontent-%COMP%]:hover{color:var(--text-primary);background:color-mix(in srgb,var(--text-primary) 8%,transparent)}.content[_ngcontent-%COMP%]{flex:1;overflow-y:auto;padding:var(--spacing-md);padding-bottom:calc(72px + env(safe-area-inset-bottom))}.content[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--border-active);outline-offset:-2px}.bottom-nav[_ngcontent-%COMP%]{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;align-items:center;height:calc(64px + env(safe-area-inset-bottom));padding-bottom:env(safe-area-inset-bottom);background:var(--background-secondary);border-top:1px solid var(--border-primary);z-index:100}.bottom-nav[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .bottom-nav[_ngcontent-%COMP%]   .more-trigger[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:2px;color:var(--text-muted);text-decoration:none;font-size:.65rem;min-width:48px;min-height:48px;justify-content:center;padding:4px 8px;background:transparent;border:none;cursor:pointer;font-family:inherit}.bottom-nav[_ngcontent-%COMP%]   a.active[_ngcontent-%COMP%], .bottom-nav[_ngcontent-%COMP%]   .more-trigger.active[_ngcontent-%COMP%]{color:var(--primary)}.bottom-nav[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:22px;width:22px;height:22px}.bottom-nav.with-current[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .bottom-nav.with-current[_ngcontent-%COMP%]   .more-trigger[_ngcontent-%COMP%]{min-width:40px;padding:4px;font-size:.6rem}@media(min-width:769px){.bottom-nav.with-current[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .bottom-nav.with-current[_ngcontent-%COMP%]   .more-trigger[_ngcontent-%COMP%]{min-width:48px;padding:4px 8px;font-size:.65rem}}"]})};export{vt as ShellComponent};
