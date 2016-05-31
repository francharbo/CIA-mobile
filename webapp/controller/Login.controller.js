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
		
		onLog: function() {
			var login = this.byId("collabInput").getValue();
			var password = this.byId("pwd").getValue();
			var oModel = self.getModel("login").getProperty("/loginData");
			
			for (var i = 0; i < oModel.length; i++) {
				if (oModel[i]["login"] === login && oModel[i]["password"] === password) {
					this.getRouter().navTo("menu",{
						usrNumber:i
					});
					return;
				}
			}
			
			sap.ui.commons.MessageBox.alert("Login/Mot de passe incorrect");	
			
		}
	});

});