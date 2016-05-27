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
			that.infos = oEvent.getParameter("arguments").infos;
			that.infos = JSON.parse(that.infos);
			that.byId("site").setText(that.infos.Site);
			that.byId("atelier").setText(that.infos.Atelier);
			that.byId("victime").setText(that.infos.victime);
			that.byId("phase").setText(that.infos.sujet);
			that.byId("description").setText(that.infos.desc);
			that.byId("Date").setText(that.infos.date);
			
			//get user
			this.getView().bindElement({
				path: "/Data/" + that.infos.usr,
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
			"Description : " + that.byId("description").getText();
			sap.m.URLHelper.triggerEmail(this.infos.dest, "Atelier Accident Travail", this.text);
		}
	});
});