sap.ui.define([
    "zrntcrprentalcars/controller/BaseController",
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Controllerv1) {
        "use strict";

        return Controller.extend("zrntcrprentalcars.controller.View1", {
            onInit: function () {

            },
            pressBrands : function(oEvent) {
                this.getRouter().navTo("RouteBrands");
            }
        });
    });
