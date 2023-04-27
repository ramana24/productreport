sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library',
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Spreadsheet,exportLibrary) {
        "use strict";
        var EdmType = exportLibrary.EdmType;
        return Controller.extend("ux.freestylereport.controller.View1", {
            onInit: function () {

            },

            createColumnConfig: function() {
                var aCols = [];
    
                aCols.push({
                    label: 'ID',
                    property: 'Id',
                    type: EdmType.String,
                    
                });
    
                aCols.push({
                    label: 'Name',
                    type: EdmType.String,
                    property: 'Name',
                   
                });
    
                aCols.push({
                    property: 'Description',
                    type: EdmType.String
                });
    
                aCols.push({
                    property: 'Price',
                    type: EdmType.Number,
                    scale: 0
                });
    
                aCols.push({
                    property: 'AverageRating',
                    type: EdmType.Number
                });
    
               
    
                return aCols;
            },
    
            onExport: function() {
                var aCols, oRowBinding, oSettings, oSheet, oTable;
    
                if (!this._oTable) {
                    this._oTable = this.byId('table');
                }
    
                oTable = this._oTable;
                oRowBinding = oTable.getBinding('items');
                aCols = this.createColumnConfig();
    
                oSettings = {
                    workbook: {
                        columns: aCols,
                        hierarchyLevel: 'Level'
                    },
                    dataSource: oRowBinding,
                    fileName: 'Table export sample.xlsx',
                    worker: false // We need to disable worker because we are using a MockServer as OData Service
                };
    
                oSheet = new Spreadsheet(oSettings);
                oSheet.build().finally(function() {
                    oSheet.destroy();
                });
            },
    
        });
    });
