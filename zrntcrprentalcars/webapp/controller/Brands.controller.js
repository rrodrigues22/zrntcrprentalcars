sap.ui.define(
  [
    "./BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (
    Controller,
    Fragment,
    JSONModel,
    MessageToast,
    MessageBox,
    Filter,
    FilterOperator
  ) {
    "use strict";

    return Controller.extend("zrntcrprentalcars.controller.Brands", {
      OnInit: function () {},

      onPressEditBrand: function () {
        const Edit = true;

        var oSmartTable = this.byId("StBrands");
        var oTable = oSmartTable.getTable();
        var oSelectedItem = oTable.getSelectedItem();
        var oSelectedItems = oTable.getSelectedItems();

        if (oSelectedItems.length > 1) {
          var oResourceBundle = this.getView()
            .getModel("i18n")
            .getResourceBundle();
          var sMessage = oResourceBundle.getText("selectOnlyLine");
          MessageToast.show(sMessage);
          //MessageToast.show(this.ResourceBundle.getText("selectOnlyLine"));
          return;
        }

        if (!oSelectedItem) {
          var oResourceBundle = this.getView()
            .getModel("i18n")
            .getResourceBundle();
          var sMessage = oResourceBundle.getText("selectLineOnTable");
          MessageToast.show(sMessage);
          //MessageToast.show(this.ResourceBundle.getText("selectLineOnTable"));
          return;
        }

        this._createPopUpModel(Edit, oSelectedItem);

        this._showDialog();
      },

      onPressAddBrand: function () {
        const Edit = false;

        var oSmartTable = this.byId("StBrands");
        var oTable = oSmartTable.getTable();
        var oSelectedItem = oTable.getSelectedItem();

        if (oSelectedItem) {
          var oResourceBundle = this.getView()
            .getModel("i18n")
            .getResourceBundle();
          var sMessage = oResourceBundle.getText("notSelectedLine");
          MessageToast.show(sMessage);
          return;
        }

        this._createPopUpModel(Edit, oSelectedItem);

        this._showDialog();
      },

      handleCancelBtnPress: function (oEvent) {
        this.byId("openDialogBrand").destroy();
      },

      _createPopUpModel: function (Edit, oSelectedItem) {
        // criar um novo modelo JSON
        var brandModel = new sap.ui.model.json.JSONModel();

        // definir dados iniciais
        if (Edit) {
          var oSmartTable = this.byId("StBrands");
          var oTable = oSmartTable.getTable();
          var oSelectedItem = oTable.getSelectedItem();
          var oObject = oSelectedItem.getBindingContext().getObject();

          brandModel.setData({
            Edit: Edit,
            BrandId: oObject.BrandId,
            BrandName: oObject.BrandName,
            BrandText: oObject.BrandText,
            CountryId: oObject.CountryId,
            CountryName: oObject.CountryName,
            FoundationYear: oObject.FoundationYear,
          });
        }
        // se Edit for false, inicializar o modelo com valores vazios
        else {
          brandModel.setData({
            Edit: Edit,
            BrandId: "",
            BrandName: "",
            BrandText: "",
            CountryId: "",
            CountryName: "",
            FoundationYear: "",
          });
        }

        // definir o modelo para a view
        this.getView().setModel(brandModel, "brandModel");
      },

      _showDialog: function () {
        var oView = this.getView();
        if (!this.byId("openDialogBrand")) {
          Fragment.load({
            id: oView.getId(),
            name: "zrntcrprentalcars.view.Brand",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            oDialog.open();
          });
        } else {
          this.byId("openDialogBrand").open();
        }
      },

      showConfirmationPopup: function () {
        var that = this;

        MessageBox.show(
          "Tem certeza que deseja excluir as linhas selecionadas?",
          {
            icon: MessageBox.Icon.WARNING,
            title: "Confirmação",
            actions: [MessageBox.Action.YES, MessageBox.Action.NO],
            onClose: function (oAction) {
              if (oAction === MessageBox.Action.YES) {
                debugger;
                var oSmartTable = that.byId("StBrands");
                var oTable = oSmartTable.getTable();
                var oSelectedItems = oTable.getSelectedItems();
                that._deleteSelectedRows(oSelectedItems);
              } else {
                return;
              }
            },
          }
        );
      },

      _deleteSelectedRows: function (oSelectedItems) {
        if (!oSelectedItems.length) {
          MessageToast.show("Selecione pelo menos uma linha");
          return;
        }

        var payloadData = [];
        oSelectedItems.forEach(function (oSelectedItem) {
          var oObject = oSelectedItem.getBindingContext().getObject();
          payloadData.push({
            brand_id: oObject.BrandId,
            brand: oObject.BrandName,
            country_id: oObject.CountryId,
            country: oObject.CountryName,
            foundation: oObject.FoundationYear,
            text: oObject.BrandText,
          });
        });

        var payload = {
          Action: "DELETEBRAND",
          Json: JSON.stringify(payloadData),
        };
        var oModel = this.getView().getModel();

        oModel.create("/JsonCommSet", payload, {
          success: function (oData, oResponse) {
            MessageToast.show("Veículo excluído com sucesso");
            oSmartTable.rebindTable();
            oModel.refresh();
            this.handleCancelBtnPress(oEvent);
          }.bind(this),

          error: function (oError) {
            var oSapMessage = JSON.parse(oError.responseText);
            var msg = oSapMessage.error.message.value;
            MessageToast.show(msg);
          },
        });
      },

      handleSaveBtnPress: function (oEvent) {
        debugger;
        var brandModel = this.getView().getModel("brandModel");
        var InputModel = brandModel.getData();
        var oSmartTable = this.getView().byId("StBrands");

        if (!InputModel.Edit === false) {
          var SelectedItem = this.getView()
            .byId("StBrands")
            .getTable()
            .getSelectedItem()
            .getBindingContext()
            .getObject();
        }

        var payloadData = [];
        payloadData.push({
          brand_id: SelectedItem ? SelectedItem.BrandId : "",
          brand: InputModel.BrandName,
          country_id: SelectedItem ? SelectedItem.CountryId : "",
          country: InputModel.CountryName,
          foundation: InputModel.FoundationYear,
          text: InputModel.BrandText,
        });

        var payload = {
          Action: InputModel.Edit ? "UPDATEBRAND" : "REGISTERBRAND",
          Json: JSON.stringify(payloadData),
        };

        var oModel = this.getView().getModel();

        oModel.create("/JsonCommSet", payload, {
          success: function (oData, oResponse) {
            MessageToast.show("Operação realizada com sucesso");
            oSmartTable.rebindTable();
            oModel.refresh();
            this.handleCancelBtnPress(oEvent);
          }.bind(this),

          error: function (oError) {
            var oSapMessage = JSON.parse(oError.responseText);
            var msg = oSapMessage.error.message.value;
            MessageToast.show(msg);
          },
        });
      },

      onValueHelpCountry: function (oEvent) {
        var sInputValue = oEvent.getSource().getValue(),
          oView = this.getView();

        if (!this._pValueHelpDialog) {
          this._pValueHelpDialog = Fragment.load({
            id: oView.getId(),
            name: "zrntcrprentalcars.view.CountryValueHelp",
            controller: this,
          }).then(function (oDialog) {
            oView.addDependent(oDialog);
            return oDialog;
          });
        }
        this._pValueHelpDialog.then(function (oDialog) {
          // Create a filter for the binding
          oDialog
            .getBinding("items")
            .filter([
              new Filter("CountryName", FilterOperator.Contains, sInputValue),
            ]);
          // Open ValueHelpDialog filtered by the input's value
          oDialog.open(sInputValue);
        });
      },

      onValueHelpDialogSearch: function (oEvent) {
        var sValue = oEvent.getParameter("value");
        var oFilter = new Filter(
          "CountryName",
          FilterOperator.Contains,
          sValue
        );

        oEvent.getSource().getBinding("items").filter([oFilter]);
      },

      onValueHelpDialogClose: function (oEvent) {
        var sDescription,
          oSelectedItem = oEvent.getParameter("selectedItem");
        oEvent.getSource().getBinding("items").filter([]);

        if (
          !oSelectedItem.mProperties.title &&
          !oSelectedItem.mProperties.description
        ) {
          return;
        }

        sDescription = oSelectedItem.getDescription();
        var sKey = oSelectedItem.mProperties.title;

        //this.byId("CountryValueHelp").setValue(sDescription);
        var oBrandModel = this.getView().getModel("brandModel");

        oBrandModel.setProperty("/CountryName", sDescription);
        oBrandModel.setProperty("/CountryId", sKey);

        oBrandModel.refresh(true);

        // oPopupModel.refresh(true);
        //this.byId("selectedKeyIndicator").setText(sDescription);
      },

      onSuggestionItemSelected: function (oEvent) {
        var oItem = oEvent.getParameter("selectedItem");

        if (oItem === undefined) {
          // A variável é undefined
          // Cenário de Pesquisa diretamente no SH
          this.onValueHelpDialogSearch(oEvent);
        }

        var sDescription = oItem.mProperties.text;
        var sKey = oItem.mProperties.key;

        var oBrandModel = this.getView().getModel("brandModel");

        oBrandModel.setProperty("/CountryName", sDescription);
        oBrandModel.setProperty("/CountryId", sKey);
        oBrandModel.refresh(true);
      },

      onSelectionChange: function (oEvent) {
        let oSmartTable1 = this.getView().byId("StBrands");
        let oSmartTable = oSmartTable1.getTable();
        var SmartTableLine = oSmartTable._aSelectedPaths;
        var SelectedItem = oSmartTable
          .getModel()
          .getProperty(SmartTableLine.toString());

        this._createPopUpModel(true, SelectedItem);
        var oBrandModel = this.getView().getModel("brandModel");
        oBrandModel.setData(SelectedItem);

        var oList = oEvent.getSource(),
          bSelected = oEvent.getParameter("selected");

        // skip navigation when deselecting an item in multi selection mode
        if (!(oList.getMode() === "MultiSelect" && !bSelected)) {
          // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
          this._showDetail(
            oEvent.getParameter("listItem") || oEvent.getSource()
          );
        }
      },

      _showDetail: function (oItem) {
        //var bReplace = !Device.system.phone;
        // set the layout property of FCL control to show two columns
        this.getModel("appView").setProperty(
          "/layout",
          "TwoColumnsBeginExpanded"
        );
        this.getRouter().navTo(
          "RouteVehicles",
          {
            BrandId: oItem.getBindingContext().getProperty("BrandId"),
          },
          //bReplace
        );
      },
    });
  }
);
