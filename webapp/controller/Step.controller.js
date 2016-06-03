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

			if (this.getView().getViewName().indexOf("Step2") > -1) {
				var head = this.getView().byId("rowHead");
				var middle = this.getView().byId("rowMiddle");
				var middleunder = this.getView().byId("rowMiddleUnder");
				var bottom = this.getView().byId("rowBottom");
				var bottomfoot = this.getView().byId("rowBottomFoot");

				var headHeight = $(window).height() * head.getHeight().substring(0, head.getHeight().length - 1) / 100 + "px";
				var middleHeight = $(window).height() * middle.getHeight().substring(0, middle.getHeight().length - 1) / 100 + "px";
				var middleunderHeight = $(window).height() * middleunder.getHeight().substring(0, middleunder.getHeight().length - 1) / 100 + "px";
				var bottomHeight = $(window).height() * bottom.getHeight().substring(0, bottom.getHeight().length - 1) / 100 + "px";
				var bottomfootHeight = $(window).height() * bottomfoot.getHeight().substring(0, bottomfoot.getHeight().length - 1) / 100 + "px";

				this.getView().byId("Tete").setHeight(headHeight);
				this.renderHurtStickMan("Tete");

				this.getView().byId("BrasGauche").setHeight(middleHeight);
				this.renderHurtStickMan("BrasGauche");

				this.getView().byId("BrasDroit").setHeight(middleHeight);
				this.renderHurtStickMan("BrasDroit");

				this.getView().byId("Torse").setHeight(middleHeight);
				this.renderHurtStickMan("Torse");

				this.getView().byId("Ventre").setHeight(middleunderHeight);
				this.renderHurtStickMan("Ventre");

				this.getView().byId("MainGauche").setHeight(middleunderHeight);
				this.renderHurtStickMan("MainGauche");

				this.getView().byId("MainDroite").setHeight(middleunderHeight);
				this.renderHurtStickMan("MainDroite");

				this.getView().byId("JambeGauche").setHeight(bottomHeight);
				this.renderHurtStickMan("JambeGauche");

				this.getView().byId("JambeDroite").setHeight(bottomHeight);
				this.renderHurtStickMan("JambeDroite");

				this.getView().byId("PiedGauche").setHeight(bottomfootHeight);
				this.renderHurtStickMan("PiedGauche");

				this.getView().byId("PiedDroit").setHeight(bottomfootHeight);
				this.renderHurtStickMan("PiedDroit");
			}
		},
		renderHurtStickMan: function(bodypart) {
			var part;
			if (bodypart.indexOf("Jambe") === -1) {
				if (bodypart.indexOf("Gauche") > -1) {
					part = bodypart.replace("Gauche", "");
				} else if (bodypart.indexOf("Droit") > -1) {
					if (bodypart.indexOf("Droite") > -1) {
						part = bodypart.replace("Droite", "");
					} else {
						part = bodypart.replace("Droit", "");
					}
				} else {
					part = bodypart;
				}
			} else {
				part = bodypart;
			}
			if (this.getView().byId(bodypart).data("status")) {
				this.getView().byId(bodypart).setSrc("resource/" + part + "Select.png");
			} else {
				this.getView().byId(bodypart).setSrc("resource/" + part + ".png");
			}

		},

		_onObjectMatched: function(oEvent) {
			that.usr = oEvent.getParameter("arguments").usrNumber;
			that.visite = oEvent.getParameter("arguments").Id;
			this.getView().setModel(this.getOwnerComponent().getModel("ComboBox"));
			this.getView().bindElement({
				path: "/injuries/" + that.visite,
				model: "injuries"
			});
		},
		_onObjectMatchedAdmin: function(oEvent) {
			that.usrNumber = oEvent.getParameter("arguments").usrNumber;
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

		onPerson: function() {
			var dialog = new sap.m.Dialog({
				title: "Sélectionner la victime",
				type: "Standard",
				content: [
					new sap.m.Input({
						id: "firstname",
						placeholder: "Nom"
					}),
					new sap.m.Input({
						id: "lastname",
						placeholder: "Prénom"
					}),
					new sap.m.Input({
						id: "company",
						placeholder: "Société"
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
			var id = part;
			var status = oEvent.getSource().data("status");
			var select = ".png";
			if (status === false) {
				select = "Select.png";
				oEvent.getSource().data("status", true);
			} else {
				oEvent.getSource().data("status", false);
			}
			if (part.indexOf("Jambe") === -1) {
				if (part.indexOf("Gauche") > -1) {
					part = part.replace("Gauche", "");
				}
				if (part.indexOf("Droit") > -1) {
					if (part.indexOf("Droite") > -1) {
						part = part.replace("Droite", "");
					} else {
						part = part.replace("Droit", "");
					}
				}
			}
			this.getView().byId(id).setSrc("resource/" + part + select);

		},
		picture: function() {
			document.addEventListener("deviceready", onDeviceReady, false);

			function onDeviceReady() {
				var options = {
					// Some common settings are 20, 50, and 100
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI,
					// In this app, dynamically set the picture source, Camera or photo gallery
					sourceType: srcType,
					encodingType: Camera.EncodingType.JPEG,
					mediaType: Camera.MediaType.PICTURE,
					allowEdit: true,
					correctOrientation: true //Corrects Android orientation quirks
				}

				navigator.camera.getPicture(onSuccess, onFail, {
					quality: 50,
					destinationType: Camera.DestinationType.FILE_URI
				}, options);

				function onSuccess(imageURI) {
					var image = document.getElementById('myImage');
					image.src = imageURI;
				}

				function onFail(message) {
					alert('Failed because: ' + message);
				}
			}
		}
	});

});