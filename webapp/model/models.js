sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createLoginModel: function() {
			var path = jQuery.sap.getModulePath("fr.ar.cia");
			return new JSONModel([path, "model/login.json"].join("/"));
		},
		createVisitesModel: function() {
			var path = jQuery.sap.getModulePath("fr.ar.cia");
			return new JSONModel([path, "model/Visites.json"].join("/"));
		}

	};

});