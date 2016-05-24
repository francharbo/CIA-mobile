sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("fr.ar.cia.controller.Step3", {

		onInit: function() {
		},
		
		/**
		 * Navigates back in the browser history, if the entry was created by this app.
		 * If not, it navigates to the Fiori Launchpad home page.
		 * @public
		 */
		onNavBack: function() {
			var oHistory = sap.ui.core.routing.History.getInstance(),
				sPreviousHash = oHistory.getPreviousHash();
			var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Navigate back to FLP home
				oCrossAppNavigator.toExternal({
					target: {
						shellHash: "#Shell-home"
					}
				});
			}
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