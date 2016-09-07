sap.ui.define([
	"fr/ar/cia/controller/BaseController"
], function(BaseController) {
	"use strict";
	var that;
	return BaseController.extend("fr.ar.cia.controller.Step", {

		onInit: function() {

			this.getView().setModel(this.getOwnerComponent().getModel("injuries"));
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("admin").attachPatternMatched(this._onObjectMatchedAdmin, this);
			oRouter.getRoute("step1").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("step2").attachPatternMatched(this._onObjectMatched, this);
			oRouter.getRoute("step3").attachPatternMatched(this._onObjectMatched, this);
		},

		onAfterRendering: function() {
			that = this;
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
			if (bodypart !== "Tete") {
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
			} else {
				var injurymodel = this.getOwnerComponent().getModel("injuries").getProperty("/injuries/" + this.visite);
				var tete = injurymodel.PartiesBlessees.Tete;
				var oeildroit = injurymodel.PartiesBlessees.OeilDroit;
				var oeilgauche = injurymodel.PartiesBlessees.OeilGauche;

				if (tete && oeildroit && oeilgauche) {
					that.getView().byId("Tete").setSrc("resource/TeteBothEyeSelect.png");
				} else if (tete && oeildroit) {
					that.getView().byId("Tete").setSrc("resource/TeteEyeRightSelect.png");
				} else if (tete && oeilgauche) {
					that.getView().byId("Tete").setSrc("resource/TeteEyeLeftSelect.png");
				} else if (tete) {
					that.getView().byId("Tete").setSrc("resource/TeteSelect.png");
				} else if (oeildroit && oeilgauche) {
					that.getView().byId("Tete").setSrc("resource/TeteSelectBothEye.png");
				} else if (oeildroit) {
					that.getView().byId("Tete").setSrc("resource/TeteSelectEyeRight.png");
				} else if (oeilgauche) {
					that.getView().byId("Tete").setSrc("resource/TeteSelectEyeLeft.png");
				} else {
					that.getView().byId("Tete").setSrc("resource/Tete.png");
				}
			}

		},

		_onObjectMatched: function(oEvent) {

			this.usr = oEvent.getParameter("arguments").usrNumber;
			this.visite = oEvent.getParameter("arguments").Id;
			this.getView().setModel(this.getOwnerComponent().getModel("ComboBox"));
			this.getView().bindElement({
				path: "/injuries/" + that.visite,
				model: "injuries"
			});
			that = this;
		},
		_onObjectMatchedAdmin: function(oEvent) {

			this.usrNumber = oEvent.getParameter("arguments").usrNumber;
			that = this;
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
			var comex = this.getView().byId("comex").getSelected();
			var hse = this.getView().byId("hse").getSelected();
			var intranet = this.getView().byId("intranet").getSelected();
			var encadrement = this.getView().byId("encadrement").getSelected();

			var model = this.getOwnerComponent().getModel("Contact");
			var data='{ "data" :[';
			if (comex) {
				for (var i in model.getProperty("/comex")) {
					data += JSON.stringify(model.getProperty("/comex/" + i));
					data += ",";
				}
			}
			if (hse) {
				for (var j in model.getProperty("/hse")) {
					data += JSON.stringify(model.getProperty("/hse/" + j));
					data += ",";
				}
			}
			if (intranet) {
				for (var k in model.getProperty("/intranet")) {
					data += JSON.stringify(model.getProperty("/intranet/" + k));
					data += ",";
				}
			}
			if (encadrement) {
				for (var l in model.getProperty("/encadrement")) {
					data += JSON.stringify(model.getProperty("/encadrement/" + l));
					data += ",";
				}
			}
			
			if(data.substring(data.length - 1) === ","){
				data = data.substring(0,data.length - 1);
			}
			data += "]}";
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(JSON.parse(data));
			sap.ui.getCore().setModel(oModel);
			var list = new sap.ui.core.ListItem({text:"{mail}"});
			var oComboBox = new sap.m.MultiComboBox({id: "newEmail",width: "100%",
			items:{
				path:"/data",
				template:list
			}
			});
			//oComboBox.bindAggregation("items",JSON.parse(data),list);
			var dialog = new sap.m.Dialog({
				title: "Envoi vers un nouveau destinataire",
				type: "Message",
				content: [
					oComboBox
					
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

			CSV += "Site, Victime, Gravité, Date, Domaine, Société, Nature Dommage, Cause" + "\r\n";

			//loop is to extract each row

			for (var i = 0; i < arrData.length; i++) {

				var row = "";
				row += arrData[i].Site + ',' + arrData[i].victime + ',' + arrData[i].gravite + ',' + arrData[i].Date + ',' + arrData[i].Domaine +
					',' + arrData[i].Societe +
					',' + arrData[i].natureDommage + ',' + arrData[i].Cause;
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
			var currentdate = new Date();
			var datetime = currentdate.getDate() + "/" +
				(currentdate.getMonth() + 1) + "/" +
				currentdate.getFullYear() + "@" +
				currentdate.getHours() + ":" +
				currentdate.getMinutes() + ":" +
				currentdate.getSeconds();
			this.JSONToCSVConvertor(data, datetime);

		},
		InjurySelect: function(oEvent) {
			var part = oEvent.getSource().data("desc");
			var id = part;
			var status = oEvent.getSource().data("status");
			var select = ".png";
			if (part === "Tete") {
				if (!this.popupHead) {
					this.popupHead = sap.ui.xmlfragment("fr.ar.cia.view.fragment.dialogTete", that);
					this.getView().addDependent(this.popupHead);
				}
				that = this;
				this.popupHead.open();
			}
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
					// destinationType: Camera.DestinationType.FILE_URI,
					// // In this app, dynamically set the picture source, Camera or photo gallery
					// encodingType: Camera.EncodingType.JPEG,
					// mediaType: Camera.MediaType.PICTURE,
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
		},
		closeDialog: function(oEvent) {
			oEvent.getSource().getParent().close();
			that.renderHurtStickMan("Tete");
		},
		Validation: function(oEvent) {

			that.renderHurtStickMan("Tete");

			oEvent.getSource().getParent().close();
		}
	});

});