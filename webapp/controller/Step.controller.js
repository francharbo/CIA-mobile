sap.ui.define([
	"fr/ar/cia/controller/BaseController"
], function(BaseController) {
	"use strict";
	var that;
	return BaseController.extend("fr.ar.cia.controller.Step", {

		onInit: function() {
			that = this;
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("step1").attachPatternMatched(this._onObjectMatched1, this);
			oRouter.getRoute("step2").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("step3").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function(oEvent) {
			that.infos = oEvent.getParameter("arguments").infos;
		},
		_onObjectMatched1: function(oEvent) {
			that.infos= {};
			that.infos.usr = oEvent.getParameter("arguments").infos;
		},
		/**
		 * Navigates back in the browser history, if the entry was created by this app.
		 * If not, it navigates to the Fiori Launchpad home page.
		 * @public
		 */
		onNavBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();
			//			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Navigate back to FLP home
				// oCrossAppNavigator.toExternal({
				// 	target: {
				// 		shellHash: "#Shell-home"
				// 	}
				// });
			}

		},

		onStep2: function() {
			that.infos.Site = this.byId("siteStep1").getValue();
			that.infos.Atelier = this.byId("atelierStep1").getValue();
			that.infos.date = this.byId("date").getValue();
			that.infos.sujet = this.byId("sujet").getValue();
			that.infos.desc = this.byId("desc").getValue();
			this.getRouter().navTo("step2", {
				infos: JSON.stringify(that.infos)
			});
		},

		onStep3: function() {
			this.getRouter().navTo("step3", {
				infos: that.infos
			});
		},

		onOtherButton: function() {
			var dialog = new sap.m.Dialog({
				title: "Envoi vers un nouveau destinataire",
				type: "Message",
				content: [
					new sap.m.ComboBox({
						id: "newEmail",
						width: "100%"
					})
				],
				beginButton: new sap.m.Button({
					text: "Valider",
					icon: "sap-icon://accept",
					type: "Accept",
					press: function() {
						//Close dialog
						var mail = sap.ui.getCore().byId("newEmail").getValue();
						var infos = JSON.parse(that.infos);
						infos.dest = mail;
						that.getRouter().navTo("mail", {
							infos: JSON.stringify(infos)
						});
						dialog.close();
						//self.onValiderBase("Va");
					}
				}),
				endButton: new sap.m.Button({
					text: "Annuler",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		}

	});

});