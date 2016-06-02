sap.ui.define([
	"fr/ar/cia/controller/BaseController"
], function(BaseController) {
	"use strict";
	var that;
	return BaseController.extend("fr.ar.cia.controller.Step", {

		onInit: function() {
			that = this;
			this.getView().setModel(this.getOwnerComponent().getModel("injuries"));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("admin").attachPatternMatched(this._onObjectMatchedAdmin, this);
			oRouter.getRoute("step1").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("step2").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("step3").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function(oEvent) {
			that.usr = oEvent.getParameter("arguments").usrNumber;
			that.visite = oEvent.getParameter("arguments").Id;
			this.getView().bindElement({
				path: "/injuries/" + that.visite,
				model: "injuries"
			});
		},
		_onObjectMatchedAdmin: function(oEvent) {
			that.usrNumber = oEvent.getParameter("arguments").usrNumber;
		},

		onAfterRendering: function() {
			if (this.getView().getViewName().indexOf("Step2") > -1) {
				
				var middleHeight = this.getView().byId("rowMiddle").$().height() + "px";
				var bottomHeight = this.getView().byId("rowBottom").$().height() + "px";
				this.getView().byId("Tete").setHeight(this.getView().byId("rowHead").$().height() + "px");
				this.getView().byId("Bras").setHeight(middleHeight);
				this.getView().byId("Torse").setHeight(middleHeight);
				this.getView().byId("Main").setHeight(middleHeight);
				this.getView().byId("Jambe").setHeight(bottomHeight);
				this.getView().byId("Pied").setHeight(bottomHeight);
			}
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
			this.getRouter().navTo("step2", {
				usrNumber: that.usr,
				Id: that.visite
			});
		},

		onStep3: function() {
			this.getRouter().navTo("step3", {
				usrNumber: that.usr,
				Id: that.visite
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
						var infos = that.getOwnerComponent().getModel("injuries").getProperty("/injuries/" + that.visite);
						infos.destinataire = mail;
						that.getRouter().navTo("mail", {
							usrNumber: that.usr,
							Id: that.visite
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
		},
		goToMenu: function() {
			this.getRouter().navTo("menu", {
				usrNumber: that.usrNumber
			});
		},
		updateInjury: function(oEvent) {
			var id = oEvent.getSource().data("Id");
			this.getRouter().navTo("menu", {
				usrNumber: that.usrNumber,
				Id: id
			});
		},

		//To CSV 
		JSONToCSVConvertor: function(JSONData, ReportTitle) {

			// If JSONData is not an object then JSON.parse will parse the JSON
			// string in an Object

			var arrData = JSONData.injuries;
			var CSV = '';
			// Set Report title in first row or line
			CSV += ReportTitle + '\r\n\n';

			CSV += "Site, Victime, Gravité, Date" + "\r\n";

			//loop is to extract each row

			for (var i = 0; i < arrData.length; i++) {

				var row = "";
				row += arrData[i].Site + ',' + arrData[i].victime + ',' + arrData[i].gravite + ',' + arrData[i].Date + ',';
				row.slice(0, row.length - 1);
				CSV += row + '\r\n';

			}

			if (CSV === "") {

				alert("Invalid data");
				return;
			}

			// Generate a file name

			var fileName = "MyReport_";
			fileName += ReportTitle.replace(/ /g, "_");

			// Initialize file format you want csv or xls
			var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

			// Now the little tricky part.
			// you can use either>> window.open(uri);
			// but this will not work in some browsers
			// or you will not get the correct file extension
			// this trick will generate a temp <a /> tag
			var link = document.createElement("a");
			link.href = uri;

			// set the visibility hidden so it will not effect on your web layout

			link.style = "visibility:hidden";
			link.download = fileName + ".csv";

			// this part will append the anchor tag and remove it after automatic
			// click
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

		},
		Export: function() {

			var data = this.getOwnerComponent().getModel("injuries").getData();
			this.JSONToCSVConvertor(data, "Report");

		},
		InjurySelect: function(oEvent) {
			var part = oEvent.getSource().data("desc");
			var status = oEvent.getSource().data("status");
			var select = ".png";
			if (status === false) {
				select = "Select.png";
				oEvent.getSource().data("status", true);
			} else {
				oEvent.getSource().data("status", false);
			}
			this.getView().byId(part).setSrc("resource/" + part + select);

		}

	});

});