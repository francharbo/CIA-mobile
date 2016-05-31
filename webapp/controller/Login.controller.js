sap.ui.define([
	"fr/ar/cia/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";
	var self;
	return BaseController.extend("fr.ar.cia.controller.Login", {

		onInit: function() {
			self = this;
			this.setModel(this.getOwnerComponent().getModel("login"));
		},

		onLog: function() {
			var login = this.byId("collabInput").getValue();
			var password = this.byId("pwd").getValue();
			var oModel = self.getModel("login").getProperty("/loginData");

			for (var i = 0; i < oModel.length; i++) {
				if (oModel[i]["login"] === login && oModel[i]["password"] === password) {
					if (oModel[i].admin) {
						this.getRouter().navTo("admin", {
							usrNumber: i
						});
					} else {
						this.getRouter().navTo("menu", {
							usrNumber: i
						});
					}
					return;
				}
			}

			sap.ui.commons.MessageBox.alert("Hello World from MessageBox.alert()!");

		}
	});

});