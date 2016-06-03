sap.ui.define([
	"fr/ar/cia/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";
	var that;
	return BaseController.extend("fr.ar.cia.controller.Mail", {

		onInit: function() {
			that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("mail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function(oEvent) {
			that.visite = oEvent.getParameter("arguments").Id;
			that.usr = oEvent.getParameter("arguments").Id;
			that.infos = that.getOwnerComponent().getModel("injuries").getProperty("/injuries/" + that.visite);
			that.byId("site").setText(that.infos.Site);
			that.byId("atelier").setText(that.infos.atelier);
			that.byId("victime").setText(that.infos.victime);
			that.byId("phase").setText(that.infos.sujet);
			that.byId("description").setText(that.infos.description);
			that.byId("Date").setText(that.infos.Date);
			that.injuredParts = String.fromCharCode(13);
			var cpt = 0;
			for(var i in that.infos.PartiesBlessees){
				if(that.infos.PartiesBlessees[i]){
					that.injuredParts += Object.keys(that.infos.PartiesBlessees)[cpt] + String.fromCharCode(13);
				}
				cpt++;
			}
			that.byId("hurt").setValue(that.injuredParts);
			//get user
			this.getView().bindElement({
				path: "/loginData/" + that.usr,
				model: "login"
			});
		},
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
		sendMail: function() {
			
			this.text = "Site : " + that.byId("site").getText() + String.fromCharCode(13) +
			"Atelier : " + that.byId("atelier").getText() + String.fromCharCode(13) +
			"Victime : " + that.byId("victime").getText() +String.fromCharCode(13)+
			"Phase : " + that.byId("phase").getText() + String.fromCharCode(13) +
			"Description : " + that.byId("description").getText() + String.fromCharCode(13) +
			"Parties Blessées :" + that.byId("hurt").getValue();
			sap.m.MessageToast.show("CIA Envoyée");
			if(sap.ui.Device.system.phone){
					sap.m.URLHelper.triggerEmail(this.infos.destinataire, "Atelier Accident Travail", this.text);
			}else{
			    window.open(sap.m.URLHelper.normalizeEmail(this.infos.destinataire, "Atelier Accident Travail", this.text));
			}
			
		}
	});
});