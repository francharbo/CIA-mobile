sap.ui.define([
	"fr/ar/cia/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("fr.ar.cia.controller.Menu", {

		onInit: function() {
			
		},
		
		onStep1: function() {
			this.getRouter().navTo("step1");	
		},
		onStep2: function() {
			this.getRouter().navTo("step2");	
		},
		onStep3: function() {
			this.getRouter().navTo("step3");	
		}
	});

});