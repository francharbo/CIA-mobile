sap.ui.define([
	"fr/ar/cia/controller/BaseController"
], function(BaseController) {
	"use strict";
var that; 
	return BaseController.extend("fr.ar.cia.controller.Menu", {

		onInit: function() {
			that=this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("menu").attachPatternMatched(this._onObjectMatched, this);
		},
		onAfterRendering: function() {
			var header = this.byId("header");
			var headerLength = header.getHeight().length;
			var textLogo = this.byId("textLogo");
			textLogo.setHeight($(window).height()*header.getHeight().substring(0, headerLength-1)/100+ "px");
			var phoneLogo = this.byId("phoneLogo");
			phoneLogo.setHeight($(window).height()*header.getHeight().substring(0, headerLength-1)/100+ "px");
			
			var footer = this.byId("footer");
			var footerLength = footer.getHeight().length;
			var avrilLogo = this.byId("avrilLogo");
			avrilLogo.setHeight($(window).height()*footer.getHeight().substring(0, footerLength-1)/100+ "px");
		},
		_onObjectMatched: function(oEvent) {
			that.usr = oEvent.getParameter("arguments").usrNumber;
		},
		
		onStep1: function() {
		
			this.getRouter().navTo("step1",{
				infos:that.usr
			});	
		},
		onStep2: function() {
			this.getRouter().navTo("step2");	
		},
		onStep3: function() {
			this.getRouter().navTo("step3");	
		}
	});

});