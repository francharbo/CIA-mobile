sap.ui.define([
	"fr/ar/cia/controller/BaseController"
], function(BaseController) {
	"use strict";
	var that;
	return BaseController.extend("fr.ar.cia.controller.Menu", {

		onInit: function() {
			that = this;
			
			this.getView().setModel(this.getOwnerComponent().getModel("ComboBox"));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("menu").attachPatternMatched(this._onObjectMatched, this);
			this.getRouter().initialize();
		},
		onAfterRendering: function() {
			var header = this.byId("header");
			var headerLength = header.getHeight().length;
			var textLogo = this.byId("textLogo");
			textLogo.setHeight($(window).height() * header.getHeight().substring(0, headerLength - 1) / 100 + "px");
			var phoneLogo = this.byId("phoneLogo");
			phoneLogo.setHeight($(window).height() * header.getHeight().substring(0, headerLength - 1) / 100 + "px");

			var footer = this.byId("footer");
			var footerLength = footer.getHeight().length;
			var avrilLogo = this.byId("avrilLogo");
			avrilLogo.setHeight($(window).height() * footer.getHeight().substring(0, footerLength - 1) / 100 + "px");
		},
		_onObjectMatched: function(oEvent) {
			that.usr = oEvent.getParameter("arguments").usrNumber;
			that.visite = parseInt(oEvent.getParameter("arguments").Id) - 1;
			if (!isNaN(that.visite)) {
				this.getView().bindElement({
					path: "/injuries/" + that.visite,
					model: "injuries"
				});
			} else {
				var login = that.getOwnerComponent().getModel("login").getProperty("/loginData/" + that.usr);
				var model = that.getOwnerComponent().getModel("injuries").getProperty("/injuries");
				that.visite = model.length;
				model.push({
					"Id": that.visite,
					"Auteur": login.login,
					"Site": "",
					"atelier": "",
					"victime": "",
					"phase": "",
					"description": "",
					"destinataire": "",
					"Date": "",
					"gravite": "",
					"PartiesBlessees": {
						"Tete": false,
						"Epaule": false,
						"Torse": false,
						"Main": false,
						"Jambes": false,
						"pied": false
					}
				});
				this.getOwnerComponent().getModel("injuries").setProperty("/injuries", model);
				this.getView().bindElement({
					path: "/injuries/" + that.visite,
					model: "injuries"
				});
			}
			this.getView().bindElement({
				path: "/login/" + that.usr,
				model: "login"
			});
		},

		onStep1: function() {
			this.getRouter().navTo("step1", {
				usrNumber: that.usr,
				Id: that.visite
			});
		},
		onStep2: function() {
			var oModel = that.getOwnerComponent().getModel("login").getProperty("/loginData/" + that.usr);
			var oModelvisite = that.getOwnerComponent().getModel("injuries").getProperty("/injuries/" + that.visite);
			if (this.getView().getViewName().indexOf("Step1") > -1 || (oModel.admin && oModelvisite.gravite !== "")) {
				this.getRouter().navTo("step2", {
					usrNumber: that.usr,
					Id: that.visite
				});
			} else {
				sap.ui.commons.MessageBox.alert("Veuillez commencer par l'étape 1");
			}
		},
		onStep3: function() {
			var oModel = that.getOwnerComponent().getModel("login").getProperty("/loginData/" + that.usr);
			var oModelvisite = that.getOwnerComponent().getModel("injuries").getProperty("/injuries/" + that.visite);
			if (this.getView().getViewName().indexOf("Step2") > -1 || (oModel.admin && oModelvisite.gravite !== "")) {
				this.getRouter().navTo("step3", {
					usrNumber: that.usr,
					Id: that.visite
				});
			}else {
				sap.ui.commons.MessageBox.alert("Veuillez commencer par l'étape 1");
			}
		},
		onChangeSociety:function(){
			var Id = this.getView().byId("societe").getSelectedKey() - 1;
			
			var oItemTemplate = new sap.ui.core.ListItem({text:"{type}"});
			this.getView().byId("domain").bindText("/Entreprise/" + Id + "/composants/Domaine",oItemTemplate);
			
			oItemTemplate = new sap.ui.core.ListItem({text:"{nom}"});
			this.getView().byId("site").bindItems("/Entreprise/" + Id + "/composants/Site",oItemTemplate);
			
			oItemTemplate = new sap.ui.core.ListItem({text:"{nom}"});
			this.getView().byId("atelier").bindItems("/Entreprise/" + Id + "/composants/Atelier",oItemTemplate);
			
		}
	});

});