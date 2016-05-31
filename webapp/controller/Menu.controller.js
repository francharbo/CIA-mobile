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
		_onObjectMatched: function(oEvent) {
			that.usr = oEvent.getParameter("arguments").usrNumber;
			this.getView().bindElement({
				path:"/login/" + that.usr,
				model:"usr"
			});
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