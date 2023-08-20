sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/ui/model/FilterOperator",
    "sap/m/GroupHeaderListItem",
    "sap/ui/Device",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/core/UIComponent",
  ],
  function (
    BaseController,
    JSONModel,
    Filter,
    Sorter,
    FilterOperator,
    GroupHeaderListItem,
    Device,
    Fragment,
    MessageToast,
    UIComponent
  ) {
    "use strict";

    return BaseController.extend("zrntcrprentalcars.controller.Vehicles", {
      onInit: function () {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("RouteVehicles")
          .attachPatternMatched(this._onObjectMatched, this);
        this.getView().addEventDelegate({
          onAfterShow: function () {}.bind(this),
        });
      },

      _onObjectMatched: function (oEvent) {
        //-----------------Maneiras de resgatar a chave do oEvent
        //---1
        //var BrandId = oEvent.mParameters.arguments.BrandId
        //---2
        var BrandId = oEvent.getParameter("arguments").BrandId

        this.getView().bindElement("/ZRNTCRI_BRAND('" + BrandId + "')")

        // let BrandId = window.decodeURIComponent(
        //   oEvent.getParameter("arguments").BrandId
        // );

        // var oTable = this.byId("StVehicles");
        // oTable.attachEventOnce("modelContextChange", function () {
        //   oTable.rebindTable();
        // });
        //this.byId('StVehicles').rebindTable()

        // this.getView().bindElement("/ZRNTCRI_VEHICLE('" + BrandId + "')");
        // this.getView().getObjectBinding().refresh(true);
      },
      //formatter: formatter,
      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */
      // -------------------------------------------------------------CREDI_BLOCK_EXAMPLE
      // onInit: function (oEvent) {
      //   this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      //   this.oRouter
      //     .getTarget("TargetVehicles")
      //     .attachDisplay(this.handleRouteMatched, this);
      // },
      // handleRouteMatched: function (oEvent) {
      //   // recupera o modelo "Outsourcing"
      //   //var oModel = this.getOwnerComponent().getModel("Outsourcing");
      //   //var oModelDataOutsourcing = [];
      //   // recupera a propriedade "SelectedItems"
      //   //var oModelData = oModel.getProperty("/SelectedItems");
      //   //if (oModelData.length === 0) {
      //   //  this.getRouter().navTo("RouteBrands");
      //   //return;
      // },
      // -------------------------------------------------------------CREDI_BLOCK_EXAMPLE
      // onInit: function () {
      //   // Model used to manipulate control states. The chosen values make sure,
      //   // detail page is busy indication immediately so there is no break in
      //   // between the busy indication for loading the view's meta data
      //   // var oViewModel = new JSONModel({
      //   //   busy: false,
      //   //   delay: 0,
      //   //   lineItemListTitle: this.getResourceBundle().getText(
      //   //     "detailLineItemTableHeading"
      //   //   ),
      //   // });
      //   this.getRouter()
      //     .getRoute("RouteVehicles")
      //     .attachPatternMatched(this._onObjectMatched, this);
      //   //this.setModel(oViewModel, "detailView");
      //   this.getOwnerComponent()
      //     .getModel()
      //     .metadataLoaded()
      //     .then(this._onMetadataLoaded.bind(this));
      // },
      // /* =========================================================== */
      // /* event handlers                                              */
      // /* =========================================================== */
      // /**
      //  * Event handler when the share by E-Mail button has been clicked
      //  * @public
      //  */
      // onSendEmailPress: function () {
      //   var oViewModel = this.getModel("detailView");
      //   URLHelper.triggerEmail(
      //     null,
      //     oViewModel.getProperty("/shareSendEmailSubject"),
      //     oViewModel.getProperty("/shareSendEmailMessage")
      //   );
      // },
      // // handleSaveBtnPress: function (oEvent) {
      // //   var logSmartTable = this.getView().byId("st_log");
      // //   var oModelMonitor = this.getOwnerComponent().getModel("Monitor");
      // //   var oModel = this.getView().getModel();
      // //   var Quantity = this.byId("Quantity").mProperties.value;
      // //   var Reason = this.byId("Reason").mProperties.value;
      // //   var RefDoc = this.byId("RefDoc").mProperties.value;
      // //   if (Quantity) {
      // //     if (Quantity == oModelMonitor.oData.Quantity) {
      // //       var Status = "1";
      // //     } else if (Quantity < oModelMonitor.oData.Quantity) {
      // //       var Status = "2";
      // //     } else {
      // //       MessageToast.show(
      // //         "Quantidade não pode ser maior do que a quantidade bloqueada"
      // //       );
      // //     }
      // //     if (Status) {
      // //       var creditBlock = [
      // //         {
      // //           BlockNumber: oModelMonitor.oData.BlockNumber,
      // //           Reason: Reason,
      // //           RefDoc: RefDoc,
      // //           Status: "",
      // //           Quantity: Quantity,
      // //           Operation: "1",
      // //           Status: Status,
      // //           Company: oModelMonitor.oData.Company,
      // //         },
      // //       ];
      // //       var payload = {
      // //         Action: "CRCRBLCD",
      // //         Json: JSON.stringify(creditBlock),
      // //       };
      // //       oModel.create("/JsonCommSet", payload, {
      // //         success: function (oData, oResponse) {
      // //           if (oResponse.statusCode == "201") {
      // //             if (!oResponse.data.Returnmessage) {
      // //               var msg = this.getOwnerComponent()
      // //                 .getModel("i18n")
      // //                 .getResourceBundle()
      // //                 .getText("discharged");
      // //               this.getSmartTable("st_monitor").rebindTable();
      // //               logSmartTable.rebindTable();
      // //               MessageToast.show(msg);
      // //               this.handleCancelBtnPress();
      // //             } else {
      // //               MessageToast.show(oResponse.data.Returnmessage);
      // //             }
      // //           }
      // //         }.bind(this),
      // //         error: function (oError) {
      // //           var oSapMessage = JSON.parse(oError.responseText);
      // //           var msg = oSapMessage.error.message.value;
      // //           // MessageBox.error(msg);
      // //           MessageToast.show(msg);
      // //         },
      // //       });
      // //     }
      // //   } else {
      // //     MessageToast.show("Preencha os campos obrigatórios");
      // //   }
      // // },
      // // handleCancelBtnPress: function () {
      // //   this.byId("Quantity").mProperties.value = "";
      // //   this.byId("Reason").mProperties.value = "";
      // //   this.byId("RefDoc").mProperties.value = "";
      // //   this.byId("openDialog").destroy();
      // // },
      // /**
      //  * Updates the item count within the line item table's header
      //  * @param {object} oEvent an event containing the total number of items in the list
      //  * @private
      //  */
      // onListUpdateFinished: function (oEvent) {
      //   var sTitle,
      //     iTotalItems = oEvent.getParameter("total"),
      //     oViewModel = this.getModel("detailView");
      //   // only update the counter if the length is final
      //   // if (this.byId("lineItemsList").getBinding("items").isLengthFinal()) {
      //   //   if (iTotalItems) {
      //   //     sTitle = this.getResourceBundle().getText(
      //   //       "detailLineItemTableHeadingCount",
      //   //       [iTotalItems]
      //   //     );
      //   //   } else {
      //   //     //Display 'Line Items' instead of 'Line items (0)'
      //   //     sTitle = this.getResourceBundle().getText(
      //   //       "detailLineItemTableHeading"
      //   //     );
      //   //   }
      //   //   oViewModel.setProperty("/lineItemListTitle", sTitle);
      //   // }
      // },
      // /* =========================================================== */
      // /* begin: internal methods                                     */
      // /* =========================================================== */
      // /**
      //  * Binds the view to the object path and expands the aggregated line items.
      //  * @function
      //  * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
      //  * @private
      //  */
      // _onObjectMatched: function (oEvent) {
      //   debugger;
      //   var sBrandId = oEvent.getParameter("arguments").BrandId;
      //   this.getModel("appView").setProperty(
      //     "/layout",
      //     "TwoColumnsBeginExpanded"
      //   );
      //   this.getModel()
      //     .metadataLoaded()
      //     .then(
      //       function () {
      //         var sObjectPath = this.getModel().createKey(
      //           "ZRNTCRI_VEHICLE",
      //           {
      //             BrandId: sBrandId,
      //           }
      //         );
      //         this._bindView("/" + sObjectPath);
      //       }.bind(this)
      //     );
      // },
      // /**
      //  * Binds the view to the object path. Makes sure that detail view displays
      //  * a busy indicator while data for the corresponding element binding is loaded.
      //  * @function
      //  * @param {string} sObjectPath path to the object to be bound to the view.
      //  * @private
      //  */
      // _bindView: function (sObjectPath) {
      //   // Set busy indicator during view binding
      //   var oViewModel = this.getModel("detailView");
      //   // If the view was not bound yet its not busy, only if the binding requests data it is set to busy again
      //   oViewModel.setProperty("/busy", false);
      //   this.getView().bindElement({
      //     path: sObjectPath,
      //     events: {
      //       change: this._onBindingChange.bind(this),
      //       dataRequested: function () {
      //         oViewModel.setProperty("/busy", true);
      //       },
      //       dataReceived: function () {
      //         oViewModel.setProperty("/busy", false);
      //       },
      //     },
      //   });
      // },
      // expandMonitor: function () {
      //   this.getModel("appView").setProperty("/layout", "OneColumn");
      // },
      // _onBindingChange: function () {
      //   var oView = this.getView(),
      //     oElementBinding = oView.getElementBinding();
      //   // No data for the binding
      //   // if (!oElementBinding.getBoundContext()) {
      //   //   this.getRouter().getTargets().display("detailObjectNotFound");
      //   //   // if object could not be found, the selection in the list
      //   //   // does not make sense anymore.
      //   //   this.getOwnerComponent().oListSelector.clearListListSelection();
      //   //   return;
      //   // }
      //   var sPath = oElementBinding.getPath(),
      //     oResourceBundle = this.getResourceBundle(),
      //     oObject = oView.getModel().getObject(sPath),
      //     //sBrandId = oObject.BrandId,
      //     //sObjectName = oObject.EdcNum,
      //     oViewModel = this.getModel("detailView");
      //   this.getOwnerComponent().oListSelector.selectAListItem(sPath);
      //   // oViewModel.setProperty(
      //   //   "/shareSendEmailSubject",
      //   //   oResourceBundle.getText("shareSendEmailObjectSubject", [sBrandId])
      //   // );
      //   // oViewModel.setProperty(
      //   //   "/shareSendEmailMessage",
      //   //   oResourceBundle.getText("shareSendEmailObjectMessage", [
      //   //     sBrandId,
      //   //     location.href,
      //   //   ])
      //   // );
      // },
      // _onMetadataLoaded: function () {
      //   // Store original busy indicator delay for the detail view
      //   //var iOriginalViewBusyDelay = this.getView().getBusyIndicatorDelay(),
      //   debugger;
      //     var oViewModel = this.getModel("detailView")
      //     var oLineItemTable = this.byId("lineItemsList")
      //     // iOriginalLineItemTableBusyDelay =
      //       //  oLineItemTable.getBusyIndicatorDelay();
      //   // Make sure busy indicator is displayed immediately when
      //   // detail view is displayed for the first time
      //  // oViewModel.setProperty("/delay", 0);
      //   //oViewModel.setProperty("/lineItemTableDelay", 0);
      //   // oLineItemTable.attachEventOnce("updateFinished", function () {
      //   //   // Restore original busy indicator delay for line item table
      //   //   oViewModel.setProperty(
      //   //     "/lineItemTableDelay",
      //   //     iOriginalLineItemTableBusyDelay
      //   //   );
      //   // });
      //   // Binding the view will set it to not busy - so the view is always busy if it is not bound
      //   //oViewModel.setProperty("/busy", true);
      //   // Restore original busy indicator delay for the detail view
      //   //oViewModel.setProperty("/delay", iOriginalViewBusyDelay);
      // },
      // /**
      //  * Set the full screen mode to false and navigate to list page
      //  */
      // onCloseDetailPress: function () {
      //   this.getModel("appView").setProperty(
      //     "/actionButtonsInfo/midColumn/fullScreen",
      //     false
      //   );
      //   var stMonitor = this.getSmartTable("StBrands").getTable();
      //   stMonitor.removeSelections();
      //   this.getRouter().navTo("RouteBrands");
      // },
      // // onDischarge: function (oEvent) {
      // //   var oSmartTable1 = this.getSmartTable("StBrands");
      // //   let oSmartTable = oSmartTable1.getTable();
      // //   var SmartTableLine = oSmartTable._aSelectedPaths;
      // //   var SelectedItem = oSmartTable
      // //     .getModel()
      // //     .getProperty(SmartTableLine.toString());
      // //   var oView = this.getView();
      // //   // var modelMonitor = oView.getModel("Monitor");
      // //   // modelMonitor.refresh();
      // //   // modelMonitor.setData(SelectedItem);
      // //   // var monitorModel = this.getOwnerComponent().getModel("Monitor");
      // //   if (SmartTableLine.length < 1) {
      // //     MessageToast.show(
      // //       this.getOwnerComponent()
      // //         .getModel("i18n")
      // //         .getResourceBundle()
      // //         .getText("nullRegisterNotAllowed")
      // //     );
      // //   } else if (monitorModel.getData().Balance == 0) {
      // //     MessageToast.show("Este bloqueio já está completamente baixado");
      // //   } else {
      // //     // var actualBalance = parseFloat(monitorModel.getData().Quantity);
      // //     // monitorModel.setProperty(
      // //     //   "/Balance",
      // //     //   this.getBalance(actualBalance)
      // //     // );
      // //     // monitorModel.setProperty("/Balance", "881.00");
      // //     if (!this.byId("openDialog")) {
      // //       Fragment.load({
      // //         id: oView.getId(),
      // //         name: "creditblock.zadocreditblock.view.fragments.Discharge",
      // //         controller: this,
      // //       }).then(function (oDialog) {
      // //         oView.addDependent(oDialog);
      // //         oDialog.open();
      // //       });
      // //     } else {
      // //       this.byId("openDialog").open();
      // //     }
      // //   }
      // // },
      // // getBalance: function (actualBalance) {
      // //   actualBalance = 0;
      // //   var balance = 0.0;
      // //   let oSmartTableLogs = this.getView().byId("st_log");
      // //   var items_length = oSmartTableLogs.getTable().getItems().length;
      // //   for (var i = 0; i < items_length; i++) {
      // //     var row = oSmartTableLogs
      // //       .getTable()
      // //       .getItems()
      // //       [i].getBindingContext()
      // //       .getObject();
      // //     if (!row.Quantity.includes(",") && !row.Quantity == "") {
      // //       row.Quantity = row.Quantity;
      // //       balance = balance + parseFloat(row.Quantity);
      // //     }
      // //   }
      // //   var sum = actualBalance - balance;
      // //   return (sum >= 0 ? sum : 0).toFixed(2).toString();
      // // },
      // /**
      //  * Toggle between full and non full screen mode.
      //  */
      // toggleFullScreen: function () {
      //   var bFullScreen = this.getModel("appView").getProperty(
      //     "/actionButtonsInfo/midColumn/fullScreen"
      //   );
      //   this.getModel("appView").setProperty(
      //     "/actionButtonsInfo/midColumn/fullScreen",
      //     !bFullScreen
      //   );
      //   if (!bFullScreen) {
      //     // store current layout and go full screen
      //     this.getModel("appView").setProperty(
      //       "/previousLayout",
      //       this.getModel("appView").getProperty("/layout")
      //     );
      //     this.getModel("appView").setProperty(
      //       "/layout",
      //       "MidColumnFullScreen"
      //     );
      //   } else {
      //     // reset to previous layout
      //     this.getModel("appView").setProperty(
      //       "/layout",
      //       this.getModel("appView").getProperty("/previousLayout")
      //     );
      //   }
      // },
      // // onDischargeDelete: function () {
      // //   let oSmartTable1 = this.getSmartTable("st_monitor");
      // //   let oSmartTable = oSmartTable1.getTable();
      // //   var SmartTableLine = oSmartTable._aSelectedPaths;
      // //   if (SmartTableLine.length < 1) {
      // //     MessageToast.show(
      // //       this.getOwnerComponent()
      // //         .getModel("i18n")
      // //         .getResourceBundle()
      // //         .getText("nullRegisterNotAllowed")
      // //     );
      // //   } else {
      // //     var SelectedHeader = oSmartTable
      // //       .getModel()
      // //       .getProperty(SmartTableLine.toString());
      // //     var oView = this.getView();
      // //     var oModel = oView.getModel();
      // //     var oModelMonitor = this.getOwnerComponent().getModel("Monitor");
      // //     let oSmartTableLog = this.getView().byId("st_log");
      // //     let oSmartTable2 = oSmartTableLog.getTable();
      // //     var SmartTableLogLine = oSmartTable2._aSelectedPaths;
      // //     if (SmartTableLogLine.length < 1) {
      // //       MessageToast.show(
      // //         this.getOwnerComponent()
      // //           .getModel("i18n")
      // //           .getResourceBundle()
      // //           .getText("nullRegisterNotAllowed")
      // //       );
      // //     } else {
      // //       var SelectedItem = oSmartTableLog
      // //         .getModel()
      // //         .getProperty(SmartTableLogLine.toString());
      // //       var oModelLog = oView.getModel("Discharge");
      // //       oModelLog.setData(SelectedItem);
      // //       var oModel = this.getView().getModel();
      // //       // var Balance = "0.00";
      // //       // Balance = oModelLog.getData().Balance.toString();
      // //       // var CreatedAt = new Date(oModelLog.getData().CreatedAt).toJSON();
      // //       // CreatedAt = CreatedAt.replaceAll('-', '');
      // //       // CreatedAt = CreatedAt.substring(0,8);
      // //       // var timeFormat = sap.ui.core.format.DateFormat.getTimeInstance({pattern:"KKmmss"});
      // //       // var TimeZone = new Date(0).getTimezoneOffset()*60*1000;
      // //       // var CreatedOn = oModelLog.getData().CreatedOn;
      // //       // CreatedOn = new Date(timeFormat.parse(CreatedOn).getTime() - TimeZone);
      // //       var creditBlock = [
      // //         {
      // //           BlockNumber: oModelMonitor.getData().BlockNumber,
      // //           Reason: oModelLog.getData().Reason,
      // //           RefDoc: oModelLog.getData().RefDoc,
      // //           Status: oModelLog.getData().Status,
      // //           // CreatedAt: CreatedAt,
      // //           // CreatedOn: CreatedOn,
      // //           CreatedBy: oModelLog.getData().CreatedBy,
      // //           Quantity: oModelLog.getData().Quantity,
      // //           Company: oModelMonitor.getData().Company,
      // //           Operation: "2",
      // //         },
      // //       ];
      // //       var payload = {
      // //         Action: "CRCRBLCD",
      // //         Json: JSON.stringify(creditBlock),
      // //       };
      // //       oModel.create("/JsonCommSet", payload, {
      // //         success: function (oData, oResponse) {
      // //           if (oResponse.statusCode == "201") {
      // //             var msg = this.getOwnerComponent()
      // //               .getModel("i18n")
      // //               .getResourceBundle()
      // //               .getText("discharged");
      // //             oSmartTable1.rebindTable();
      // //             MessageToast.show(msg);
      // //             oModelLog.setData(null);
      // //             oSmartTableLog.rebindTable();
      // //             oModelMonitor.refresh(true);
      // //           }
      // //         }.bind(this),
      // //         error: function (oError) {
      // //           var oSapMessage = JSON.parse(oError.responseText);
      // //           var msg = oSapMessage.error.message.value;
      // //           // MessageBox.error(msg);
      // //           MessageToast.show(msg);
      // //         },
      // //       });
      // //     }
      // //   }
      // // },
    });
  }
);
