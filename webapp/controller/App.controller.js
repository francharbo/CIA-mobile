sap.ui.define([
	"fr/ar/cia/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("fr.ar.cia.controller.App", {

		onInit: function() {
			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});
			this.setModel(oViewModel, "appView");

			fnSetAppNotBusy = function() {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};
			document.addEventListener("deviceready", onDeviceReady, false);

			function onDeviceReady() {
				console.log(navigator.camera);
			}
			// this.getOwnerComponent().getModel().metadataLoaded().
			//  	then(fnSetAppNotBusy);
			fnSetAppNotBusy();

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

		onAfterRendering: function() {
			if (sap.ui.Device.system.phone) {
				this.byId("app").setBackgroundImage("resource/background.png");
			} else {
				this.byId("app").setBackgroundImage("resource/full_background.jpg");
			}
		}
	});

});