sap.ui.define(["sap/m/MessageToast", "sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType", "sap/ui/model/Sorter", "sap/ui/core/util/Export", "sap/ui/core/util/ExportTypeCSV", "sap/m/MessageBox",
	"sap/ui/core/util/MockServer", "sap/ui/export/Spreadsheet", "sap/ui/model/odata/v2/ODataModel", "sap/ui/model/json/JSONModel",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (MessageToast, t, Filter, FilterOperator, o, r, n, l, i, M, u, ODataModel, p, Export, ExportTypeCSV) {
	"use strict";
	var s = new t;
	var m = {
		pList: []
	};
	var u = {
		newList: []
	};
	var Data = {
		BotList: []
	};
	var D = {
		carrList: []
	};
	return t.extend("YY1_MAT_CONSUME_UI5.Material_Consume_13.controller.View1", {
		onInit: function () {},
		abcd: function () {
			for (var a = 0; a < m.pList.length; a++) {
				D.carrList[a] = m.pList[a].Plant;
			}
			var t = D.carrList.filter(function (a, t, e) {
				return e.indexOf(a) === t;
			});
			this.h = t;
			var e = {
				pList: []
			};
			for (var s = 0; s < t.length; s++) {
				e.pList.push({
					Plant: t[s]
				});
			}
			var o = new sap.ui.model.json.JSONModel();
			o.setData(e);
			this.getView().setModel(o);
			this.getView().byId("mb").setValue(null);
		},
		_getMatStock: function (t, resolve, reject) {

			var oModelMATSTOCK = this.getOwnerComponent().getModel("MATSTOCK");

			var a = {
				MatStock: []
			};
			// var e = "/S4HC/sap/opu/odata/sap/YY1_MATSTOCK_CDS";
			// var s = new sap.ui.model.odata.v2.ODataModel(e, true);
			var o = t;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, o);
			var n = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var l = new Array(new sap.ui.model.Filter({
				filters: [n],
				and: true
			}));
			oModelMATSTOCK.read("/YY1_MatStock", {
				urlParameters: {
					$select: "Material, Plant, CreationDate, MatlCnsmpnQtyInMatlBaseUnit, MaterialBaseUnit, ProductDescription, CrossPlantStatus, On_Hand_Qty"
				},
				// async: false,
				filters: [l],
				success: function (t, e) {
					var s = t.results;
					s.sort();
					var o = s.length;
					if (o !== 0) {
						sap.m.MessageToast.show("Getting Material stock!!! ");
						for (var r = 0; r < o; r++) {
							if (s[r].Material !== "" && s[r].Plant !== "") {
								a.MatStock.push({
									Material: s[r].Material,
									Plant: s[r].Plant,
									CreationDate: s[r].CreationDate,
									MaterialBaseUnit: s[r].MaterialBaseUnit,
									MatlCnsmpnQtyInMatlBaseUnit: s[r].MatlCnsmpnQtyInMatlBaseUnit,
									On_Hand_Qty: s[r].On_Hand_Qty,
									SLoc_S099_Qty: s[r].on_hnd_s099,
									ProductDescription: s[r].ProductDescription,
									CrossPlantStatus: s[r].CrossPlantStatus
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No Material stock data found!!! ");
					}

					resolve(a.MatStock);
				},
				error: function () {
					reject();
				}
			});
			// return a.MatStock;
		},
		_getStd_Price: function (t, resolve, reject) {

			var oModelSTD_PRICE = this.getOwnerComponent().getModel("STDPRICE");
			var a = {
				StdPrice: []
			};
			// var e = "/S4HC/sap/opu/odata/sap/YY1_PROD_STD_PRICE_CDS";
			// var s = new sap.ui.model.odata.v2.ODataModel(e, true);
			var o = t;
			var r = new sap.ui.model.Filter("ValuationArea", sap.ui.model.FilterOperator.EQ, o);
			var n = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var l = new Array(new sap.ui.model.Filter({
				filters: [n],
				and: true
			}));
			oModelSTD_PRICE.read("/YY1_Prod_Std_Price", {
				urlParameters: {
					$select: "Product, ValuationArea, Std_Price"
				},
				// async: false,
				filters: [l],
				success: function (t, e) {
					var s = t.results;
					s.sort();
					var o = s.length;
					if (o !== 0) {
						sap.m.MessageToast.show("Getting standard price!!! ");
						for (var r = 0; r < o; r++) {
							if (s[r].Material !== "" && s[r].ValuationArea !== "") {
								a.StdPrice.push({
									Material: s[r].Product,
									Std_Price: s[r].Std_Price,
									ValuationArea: s[r].ValuationArea
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}

					resolve(a.StdPrice);
				},
				error: function () {
					reject();
				}
			});
			// return a.StdPrice;
		},
		_getGoods_Mvnt: function (t, resolve, reject) {

			var oModelGOODSMVNT = this.getOwnerComponent().getModel("GOODSMVNT");
			var a = {
				GOODS_MVMT: []
			};
			// var e = "/S4HC/sap/opu/odata/sap/YY1_GOODS_MVMT_CDS";
			// var s = new sap.ui.model.odata.v2.ODataModel(e, true);
			var o = t;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, o);
			var n = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			debugger;
			// var ti = new Date().toISOString().slice(10,60);
			// DatePicker = DatePicker + ti;
			// var year2 = DatePicker.slice(0, 4);
			// var month2 = DatePicker.slice(5, 7);
			// month2 = parseFloat(month2);
			// var year1 = a.MatStock[w].CreationDate.getFullYear();
			// var month1 = a.MatStock[w].CreationDate.getMonth();
			// numberOfMonths = (year2 - year1) * 12 + (month2 - month1);

			var i = new Date;
			// var M = new Date;
			// var dd = DatePicker.toISOString().slice(0, 10);
			var DatePicker = this.getView().byId("idDatePicker").getValue().toUpperCase();
			var dd1 = new Date(DatePicker);

			var yy = DatePicker.slice(0, 4) - 2;
			var mm = DatePicker.slice(5, 7);
			var dd = DatePicker.slice(8, 11);
			var M = yy + "-" + mm + "-" + dd;
			var M = new Date(M);
			debugger;
			// M.setYear(i.getFullYear() - 2);
			// debugger;
			// $("#yearFromNow").append(M.toString());
			// var u = M.toISOString().slice(0, 10);

			var sl = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.LE, dd1.toISOString());
			var nSl = new sap.ui.model.Filter({
				filters: [sl],
				and: true
			});

			var sl2 = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.GE, M.toISOString());
			var nSl2 = new sap.ui.model.Filter({
				filters: [sl2],
				and: true
			});
			var l = new Array(new sap.ui.model.Filter({
				filters: [n, nSl, nSl2],
				and: true
			}));
			debugger;
			oModelGOODSMVNT.read("/YY1_GOODS_MVMT", {
				urlParameters: {
					$select: "Material, Plant, MaterialBaseUnit, DocumentDate, TotalGdsMvtQtyInBaseUnit, CreationDate, GoodsMovementType"
				},
				// async: false,
				filters: [l],
				success: function (t, e) {

					var s = t.results;
					s.sort();
					var o = s.length;
					if (o !== 0) {
						sap.m.MessageToast.show("Getting goods movement data!!! ");
						for (var r = 0; r < o; r++) {
							if ((s[r].Material !== "" && s[r].Plant !== "") &&
								(s[r].GoodsMovementType === '201' || s[r].GoodsMovementType === '601')
							) {
								a.GOODS_MVMT.push({
									Material: s[r].Material,
									Plant: s[r].Plant,
									MaterialBaseUnit: s[r].MaterialBaseUnit,
									DocumentDate: s[r].DocumentDate,
									// GoodsIssueQtyInBaseUnit: s[r].GoodsIssueQtyInBaseUnit,
									TotalGdsMvtQtyInBaseUnit: s[r].TotalGdsMvtQtyInBaseUnit,
									CreationDate: s[r].CreationDate,
									GoodsMovementType: s[r].GoodsMovementType
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}
					// sap.ui.core.BusyIndicator.hide();

					resolve(a.GOODS_MVMT);
				},
				error: function () {
					reject();
				}
			});
			// return a.GOODS_MVMT;
		},
		_getGoods_MvntQty: function (t, resolve, reject) {

			var oModelGOODSMVN = this.getOwnerComponent().getModel("GOODSMVNT");
			var a = {
				Goods_MvntQty: []
			};
			// var e = "/S4HC/sap/opu/odata/sap/YY1_GOODS_MVMT_CDS";
			// var s = new sap.ui.model.odata.v2.ODataModel(e, true);
			var o = t;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, o);
			var n = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var i = new Date();
			// var M = new Date;

			// var DatePicker = this.getView().byId("idDatePicker").getValue().toUpperCase();

			// var yy = DatePicker.slice(0, 4) - 2;
			// var mm = DatePicker.slice(5, 7);
			// var dd = DatePicker.slice(8, 11);
			// var M = yy + "-" + mm + "-" + dd;
			// var M = new Date(M);
			var DatePicker = this.getView().byId("idDatePicker").getValue().toUpperCase();
			var dd1 = new Date(DatePicker);
			debugger;
			var yy = DatePicker.slice(0, 4) - 2;
			var mm = DatePicker.slice(5, 7);
			var dd = DatePicker.slice(8, 11);
			var M = yy + "-" + mm + "-" + dd;
			var M = new Date(M);

			// M.setYear(i.getFullYear() - 2);
			// $("#yearFromNow").append(M.toString());
			// var u = M.toISOString().slice(0, 10);

			var sl = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.LE, dd1.toISOString());
			var nSl = new sap.ui.model.Filter({
				filters: [sl],
				and: true
			});

			var sl2 = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.GE, M.toISOString());
			var nSl2 = new sap.ui.model.Filter({
				filters: [sl2],
				and: true
			});
			debugger;
			var l = new Array(new sap.ui.model.Filter({
				filters: [n, nSl, nSl2],
				and: true
			}));
			debugger;
			oModelGOODSMVN.read("/YY1_GOODS_MVMT", {
				urlParameters: {
					$select: "Material, Plant, TotalGdsMvtQtyInBaseUnit, CreationDate, GoodsMovementType"
				},
				// async: false,
				filters: [l],
				success: function (t, e) {
					debugger;
					var s = t.results;
					s.sort();
					var o = s.length;
					if (o !== 0) {
						sap.m.MessageToast.show("Getting goods movement data!!! ");
						for (var r = 0; r < o; r++) {
							if (s[r].Material !== "" && s[r].Plant !== "" && (s[r].GoodsMovementType === '201' || s[r].GoodsMovementType === '601')) {
								a.Goods_MvntQty.push({
									Material: s[r].Material,
									Plant: s[r].Plant,
									TotalGdsMvtQtyInBaseUnit: s[r].TotalGdsMvtQtyInBaseUnit,
									CreationDate: s[r].CreationDate,
									GoodsMovementType: s[r].GoodsMovementType,
									DocumentDate: s[r].DocumentDate
								});
							}
						}
						debugger;
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}
					// sap.ui.core.BusyIndicator.hide();

					resolve(a.Goods_MvntQty);
				},
				error: function () {
					reject();
				}
			});
			// return a.Goods_MvntQty;
		},
		_getSL099_QUANTITY: function (t, resolve, reject) {

			var oModelGOODSMV = this.getOwnerComponent().getModel("MATSTOCK");
			var a = {
				SL099_QUANTITY: []
			};
			// var e = "/S4HC/sap/opu/odata/sap/YY1_MATSTOCK_CDS";
			// var s = new sap.ui.model.odata.v2.ODataModel(e, true);
			var o = t;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, o);
			var n = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var storage = "S099";
			var sl = new sap.ui.model.Filter("StorageLocation", sap.ui.model.FilterOperator.EQ, storage);
			var nSl = new sap.ui.model.Filter({
				filters: [sl],
				and: true
			});
			var l = new Array(new sap.ui.model.Filter({
				filters: [n, nSl],
				and: true
			}));
			oModelGOODSMV.read("/YY1_MatStock", {
				urlParameters: {
					$select: "Material, Plant, StorageLocation, On_Hand_Qty"
				},
				// async: false,
				filters: [l],
				success: function (t, e) {
					var s = t.results;
					s.sort();
					var o = s.length;
					if (o !== 0) {
						sap.m.MessageToast.show("Getting goods movement data!!! ");
						for (var r = 0; r < o; r++) {
							if (s[r].Material !== "" && s[r].Plant !== "") {
								a.SL099_QUANTITY.push({
									Material: s[r].Material,
									Plant: s[r].Plant,
									On_Hand_Qty: s[r].On_Hand_Qty
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}

					resolve(a.SL099_QUANTITY);
					// sap.ui.core.BusyIndicator.hide();
				},
				error: function () {
					reject();
				}
			});
		},
		_buildFinalData: function (a) {

			// // a.GOODS_MVMT_CUM

			// var DatePicker = this.getView().byId("idDatePicker").getValue().toUpperCase();
			// var dd1 = new Date(DatePicker);
			// debugger;
			// var yy = DatePicker.slice(0, 4) - 2;
			// var mm = DatePicker.slice(5, 7);
			// var dd = DatePicker.slice(8, 11);
			// var M = yy + "-" + mm + "-" + dd;
			// var M = new Date(M);

			// var amvt = [];
			// var mvt = {};
			// for (var y = 0; y < a.GOODS_MVMT.length; y++) {

			// 	if (a.GOODS_MVMT[y].DocumentDate >= M || a.GOODS_MVMT[y].DocumentDate <= dd1) {
			// 		mvt.TotalGdsMvtQtyInBaseUnit = a.GOODS_MVMT[y].TotalGdsMvtQtyInBaseUnit;
			// 		mvt.Material = a.GOODS_MVMT[y].Material;
			// 		mvt.Plant = a.GOODS_MVMT[y].Plant;
			// 		mvt.GoodsMovementType = a.GOODS_MVMT[y].GoodsMovementType;
			// 		amvt.push(mvt);
			// 		mvt = {};
			// 	}
			// }
			// a.GOODS_MVMT = amvt;
			// debugger;

			// var amvt = [];
			// var mvt = {};
			// var Total = 0;
			// for (var y = 0; y < a.GOODS_MVMT.length; y++) {
			// 	var count = y + 1;
			// 	if (a.GOODS_MVMT.length === count) {

			// 		mvt.TotalGdsMvtQtyInBaseUnit = Total + a.GOODS_MVMT[y].TotalGdsMvtQtyInBaseUnit;
			// 		Total = 0;
			// 		mvt.Material = a.GOODS_MVMT[y].Material;
			// 		mvt.Plant = a.GOODS_MVMT[y].Plant;
			// 		mvt.GoodsMovementType = a.GOODS_MVMT[y].GoodsMovementType;
			// 		amvt.push(mvt);
			// 		mvt = {};
			// 		break;
			// 	}
			// 	var gmvt = a.GOODS_MVMT[y].Material + a.GOODS_MVMT[y].Plant + a.GOODS_MVMT[y].GoodsMovementType;
			// 	var gmvtNxt = a.GOODS_MVMT[count].Material + a.GOODS_MVMT[count].Plant + a.GOODS_MVMT[count].GoodsMovementType;

			// 	// if current and next record are same - add current rec.
			// 	if (gmvtNxt === gmvt) {
			// 		// GoodsMovementType
			// 		// Material
			// 		// Plant
			// 		Total = Total + a.GOODS_MVMT[y].TotalGdsMvtQtyInBaseUnit;
			// 	}
			// 	if (gmvtNxt !== gmvt) {
			// 		mvt.TotalGdsMvtQtyInBaseUnit = Total + a.GOODS_MVMT[y].TotalGdsMvtQtyInBaseUnit;
			// 		Total = 0;
			// 		mvt.Material = a.GOODS_MVMT[y].Material;
			// 		mvt.Plant = a.GOODS_MVMT[y].Plant;
			// 		mvt.GoodsMovementType = a.GOODS_MVMT[y].GoodsMovementType;
			// 		amvt.push(mvt);
			// 		mvt = {};
			// 	}
			// }
			debugger;
			var numberOfMonths = 0;

			// Fill final structure
			var V = {};
			var h = [];
			var f = 0;
			for (var y = 0; y < a.StdPrice.length; y++) {
				for (var w = 0; w < a.MatStock.length; w++) {
					if (a.MatStock[w].Material === a.StdPrice[y].Material && a.MatStock[w].Plant === a.StdPrice[y].ValuationArea) {

						for (var sLoc = 0; sLoc < a.SL099_QUANTITY.length; sLoc++) {
							if (a.MatStock[w].Material === a.SL099_QUANTITY[sLoc].Material) {
								V.SLoc_S099_Qty = parseFloat(a.SL099_QUANTITY[sLoc].On_Hand_Qty);
								break;
							}
						}

						// var year2 = new Date().getFullYear();
						// var month2 = new Date().getMonth() + 1;

						var DatePicker = this.getView().byId("idDatePicker").getValue().toUpperCase();
						// var ti = new Date().toISOString().slice(10,60);
						// DatePicker = DatePicker + ti;
						var year2 = DatePicker.slice(0, 4);
						var month2 = DatePicker.slice(5, 7);
						month2 = parseFloat(month2);
						var year1 = a.MatStock[w].CreationDate.getFullYear();
						var month1 = a.MatStock[w].CreationDate.getMonth();
						numberOfMonths = (year2 - year1) * 12 + (month2 - month1);

						V.Material = a.MatStock[w].Material;
						V.ProductDescription = a.MatStock[w].ProductDescription;
						V.Plant = a.MatStock[w].Plant;
						V.CrossPlantStatus = a.MatStock[w].CrossPlantStatus;
						V.On_Hand_Qty = parseFloat(f) + parseFloat(a.MatStock[w].On_Hand_Qty);
						V.Tot_Std_Cost = parseFloat(a.MatStock[w].On_Hand_Qty) * parseFloat(a.StdPrice[y].Std_Price);
						V.Tot_Std_Cost = parseFloat(V.Tot_Std_Cost).toFixed(2);
						V.Std_Price = parseFloat(a.StdPrice[y].Std_Price).toFixed(2);
						V.CreationDate = a.MatStock[w].CreationDate.toISOString().slice(0, 10);

						for (var Q = 0; Q < a.GOODS_MVMT_CUM.length; Q++) {
							if (a.MatStock[w].Material === a.GOODS_MVMT_CUM[Q].Material && a.MatStock[w].Plant === a.GOODS_MVMT_CUM[Q].Plant) {
								V.GoodsShipped = 0;
								if ((a.GOODS_MVMT_CUM[Q].Plant === "US01" || a.GOODS_MVMT_CUM[Q].Plant === "US02" || a.GOODS_MVMT_CUM[Q].Plant === "US03") &&
									(a.GOODS_MVMT_CUM[Q].GoodsMovementType === "601")) {

									V.GoodsShipped = parseFloat(a.GOODS_MVMT_CUM[Q].TotalGdsMvtQtyInBaseUnit);
								}
								V.Consumption = 0;
								if ((a.GOODS_MVMT_CUM[Q].Plant === "US01" || a.GOODS_MVMT_CUM[Q].Plant === "US02" || a.GOODS_MVMT_CUM[Q].Plant === "US03") &&
									(a.GOODS_MVMT_CUM[Q].GoodsMovementType === "201")) {

									V.Consumption = parseFloat(a.GOODS_MVMT_CUM[Q].TotalGdsMvtQtyInBaseUnit);
								}

								if (numberOfMonths <= 24) {
									V.MonthUsage24 = parseFloat(V.Consumption) + parseFloat(V.GoodsShipped);
									V.MonthUsage24 = (parseFloat(V.MonthUsage24) / parseFloat(numberOfMonths)) * 24;
									V.MonthUsage24 = parseFloat(V.MonthUsage24).toFixed(2);

								} else {
									V.MonthUsage24 = parseFloat(V.Consumption) + parseFloat(V.GoodsShipped);
								}

							}
						}
						// N
						if (V.CrossPlantStatus === "05") {
							V.ExcessQOH = V.On_Hand_Qty;
						}
						if (V.CrossPlantStatus === "03") {
							var g = parseFloat(V.MonthUsage24) - parseFloat(V.On_Hand_Qty);
							if (g > 0) {
								V.ExcessQOH = g;
							} else {
								V.ExcessQOH = "0";
							}
						}

						// var year2 = new Date().getFullYear();
						// var month2 = new Date().getMonth() + 1;

						var DatePicker = this.getView().byId("idDatePicker").getValue().toUpperCase();
						// var year2 = DatePicker.getFullYear();
						// var month2 = DatePicker.getMonth() + 1;
						var year2 = DatePicker.slice(0, 4);
						var month2 = DatePicker.slice(5, 7);
						month2 = parseFloat(month2);
						var year1 = a.MatStock[w].CreationDate.getFullYear();
						var month1 = a.MatStock[w].CreationDate.getMonth();
						// numberOfMonths = (year2 - year1) * 12 + (month2 - month1) + 1;
						numberOfMonths = (year2 - year1) * 12 + (month2 - month1);

						if (numberOfMonths <= 24) {
							V.Months_Usage_Life_in_months = numberOfMonths;
						} else {
							V.Months_Usage_Life_in_months = '0';
						}

						if (numberOfMonths < '12') {
							V.NEW_OBS_EXC_or_GOOD = "NEW";
						}
						if (V.CrossPlantStatus === "05" || V.MonthUsage24 === '0') {
							V.NEW_OBS_EXC_or_GOOD = "OBS";
						}
						if (V.ExcessQOH === "0") {
							V.NEW_OBS_EXC_or_GOOD = "GOOD";
						}
						if (V.CrossPlantStatus === "03" && V.ExcessQOH > '0') {
							V.NEW_OBS_EXC_or_GOOD = "EXC";
						}
						//Q
						if (V.NEW_OBS_EXC_or_GOOD === "EXC") {
							V.Excess_OH_FIFO = V.ExcessQOH * V.Std_Price;
						} else {
							V.Excess_OH_FIFO = "0";
						}
						if (V.NEW_OBS_EXC_or_GOOD === "OBS") {
							V.Obsolete_OH_FIFO = V.ExcessQOH * V.Std_Price;
						} else {
							V.Obsolete_OH_FIFO = "0";
						}
						V.E_O_OH_FIFO = V.Excess_OH_FIFO + V.Obsolete_OH_FIFO;

						if (V.E_O_OH_FIFO === 'undefined' || V.E_O_OH_FIFO === "") {
							V.E_O_OH_FIFO = "0";
						}

						if (V.Tot_Std_Cost === 'undefined' || V.Tot_Std_Cost === "") {
							V.Tot_Std_Cost = "0";
						}

						if (V.Std_Price === 'undefined' || V.Std_Price === "") {
							V.Std_Price = "0";
						}

						if (V.GoodsShipped === 'undefined' || V.GoodsShipped === "") {
							V.GoodsShipped = "0";
						}

						if (V.Consumption === 'undefined' || V.Consumption === "") {
							V.Consumption = "0";
						}

						if (V.MonthUsage24 === 'undefined' || V.MonthUsage24 === "") {
							V.MonthUsage24 = "0";
						}

						if (V.Months_Usage_Life_in_months === 'undefined' || V.Months_Usage_Life_in_months === "") {
							V.Months_Usage_Life_in_months = "0";
						}

						if (V.ExcessQOH === 'undefined' || V.ExcessQOH === "") {
							V.ExcessQOH = "0";
						}

						if (V.NEW_OBS_EXC_or_GOOD === 'undefined' || V.NEW_OBS_EXC_or_GOOD === "") {
							V.NEW_OBS_EXC_or_GOOD = "0";
						}

						if (V.Excess_OH_FIFO === 'undefined' || V.Excess_OH_FIFO === "") {
							V.Excess_OH_FIFO = "0";
						}

						if (V.Obsolete_OH_FIFO === 'undefined' || V.Obsolete_OH_FIFO === "") {
							V.Obsolete_OH_FIFO = "0";
						}

						h.push(V);
						V = {};
					}
				}
			}

			Data.BotList = h;
			var F = [];
			var I = {};
			I.columnName = "Material";
			F.push(I);
			I = {};
			I.columnName = "ProductDescription";
			F.push(I);
			I = {};
			I.columnName =
				"Plant";
			F.push(I);
			I = {};
			I.columnName = "CrossPlantStatus";
			F.push(I);
			I = {};
			I.columnName = "On_Hand_Qty";
			F.push(I);
			I = {};
			I.columnName = "Tot_Std_Cost";
			F.push(I);
			I = {};
			I.columnName = "Std_Price";
			F.push(I);
			I = {};
			I.columnName = "GoodsShipped";
			F.push(
				I);
			I = {};
			I.columnName = "Consumption";
			F.push(I);
			I = {};
			I.columnName = "SLoc_S099_Qty";
			F.push(I);
			I = {};
			I.columnName =
				"MonthUsage24";
			F.push(I);
			I = {};
			I.columnName = "ExcessQOH";
			F.push(I);
			I = {};
			I.columnName = "NEW_OBS_EXC_or_GOOD";
			F.push(I);
			I = {};
			I.columnName = "Excess_OH_FIFO";
			F.push(I);
			I = {};
			I.columnName = "Obsolete_OH_FIFO";
			F.push(I);
			I = {};
			I.columnName =
				"E_O_OH_FIFO";
			F.push(I);
			I = {};
			I.columnName = "Months_Usage_Life_in_months";
			F.push(I);
			I = {};
			I.columnName = "CreationDate";
			F.push(I);
			I = {};
			var B = sap.ui.getCore().byId("container-Material_Consume_13---View1--idTable");
			var N = new sap.ui.model.json.JSONModel();
			N.setData({
				rows: h,
				columns: F,
				width: "11rem"
			});
			B.setModel(N);
			B.bindColumns("/columns", function (a, t) {
				var e = t.getObject().columnName;
				return new sap.ui.table.Column({
					label: e,
					template: e
				});
			});
			B.bindRows("/rows");
		},
		onSearch: function () {

			sap.ui.core.BusyIndicator.show();

			// if (!this.tableDialog) {
			// 	this.tableDialog = sap.ui.xmlfragment(
			// 		"YY1_MAT_CONSUME_UI5.Material_Consume_13.Fragments.BusyDialogLight", this);
			// 	this.getView().addDependent(this.tableDialog);
			// 	jQuery.sap.syncStyleClass("sapUiSizeCompact", this
			// 		.getView(), this.tableDialog);
			// }
			// this.tableDialog.open();

			var a = {
				items: [],
				Material: [],
				MatStock: [],
				StdPrice: [],
				GOODS_MVMT: [],
				GOODS_MVMT_CUM: [],
				Goods_MvntQty: [],
				SL099_QUANTITY: []
			};

			var t = this.getView().byId("idFieldPlant").getValue().toUpperCase();
			var DatePicker = this.getView().byId("idDatePicker").getValue().toUpperCase();

			var that = this;
			var promiseStd_Price;
			var promiseSL099_QUANTITY;
			var promiseGoods_Mvnt;
			var promiseSL099_QUANTITY;
			var promiseGoods_MvntQty;
			var promiseMatStock = new Promise(function (resolve, reject) {
				// a.MatStock = that._getMatStock(t, resolve, reject);
				that._getMatStock(t, resolve, reject);
			});
			promiseMatStock.then(function (mStock) {
				a.MatStock = mStock;

				promiseStd_Price = new Promise(function (resolve, reject) {
					// a.StdPrice = 
					that._getStd_Price(t, resolve, reject);
				});
				promiseStd_Price.then(function (stdPrice) {
					a.StdPrice = stdPrice;
					promiseSL099_QUANTITY = new Promise(function (resolve, reject) {
						// a.SL099_QUANTITY = 
						that._getSL099_QUANTITY(t, resolve, reject);

					});
					promiseSL099_QUANTITY.then(function (SL099_QUANTITY) {
						promiseGoods_Mvnt = new Promise(function (resolve, reject) {
							a.SL099_QUANTITY = SL099_QUANTITY;
							// a.GOODS_MVMT = 
							that._getGoods_Mvnt(t, resolve, reject);
						});

						promiseGoods_Mvnt.then(function (GOODS_MVMT) {
							promiseGoods_MvntQty = new Promise(function (resolve, reject) {
								a.GOODS_MVMT = GOODS_MVMT;
								// a.GOODS_MVMT_CUM = 
								that._getGoods_MvntQty(t, resolve, reject);
							});
							promiseGoods_MvntQty.then(function (GOODS_MVMT_CUM) {
								a.GOODS_MVMT_CUM = GOODS_MVMT_CUM;
								that._buildFinalData(a);
								sap.ui.core.BusyIndicator.hide();
							}, function () {});

						}, function () {

						});

					}, function () {
						// 4th

					}, function () {});

				}, function () {});
			}, function () {

			});

			// a.MatStock = this._getMatStock(t);
			// a.StdPrice = this._getStd_Price(t);
			// a.SL099_QUANTITY = this._getSL099_QUANTITY(t);
			// a.GOODS_MVMT = this._getGoods_Mvnt(t);
			// a.GOODS_MVMT_CUM = this._getGoods_MvntQty(t);

			// sap.ui.core.BusyIndicator.hide();

			// var numberOfMonths = 0;
			// for (var gmc = 0; gmc < a.GOODS_MVMT_CUM.length; gmc++) {
			// 	var year2 = new Date().getFullYear();
			// 	var month2 = new Date().getMonth() + 1;
			// 	var year1 = a.GOODS_MVMT[gmc].CreationDate.getFullYear();
			// 	var month1 = a.GOODS_MVMT[gmc].CreationDate.getMonth() + 1;
			// 	numberOfMonths = (year2 - year1) * 12 + (month2 - month1) + 1;
			// 	a.GOODS_MVMT_CUM[gmc].numberOfMonths = numberOfMonths;
			// }

			// // Fill final structure
			// var V = {};
			// var h = [];
			// var f = 0;
			// for (var y = 0; y < a.StdPrice.length; y++) {
			// 	for (var w = 0; w < a.MatStock.length; w++) {
			// 		if (a.MatStock[w].Material === a.StdPrice[y].Material && a.MatStock[w].Plant === a.StdPrice[y].ValuationArea) {

			// 			for (var sLoc = 0; sLoc < a.SL099_QUANTITY.length; sLoc++) {
			// 				if (a.MatStock[w].Material === a.SL099_QUANTITY[sLoc].Material) {
			// 					V.SLoc_S099_Qty = parseFloat(a.SL099_QUANTITY[sLoc].On_Hand_Qty);
			// 					break;
			// 				}
			// 			}
			// 			V.Material = a.MatStock[w].Material;
			// 			V.ProductDescription = a.MatStock[w].ProductDescription;
			// 			V.Plant = a.MatStock[w].Plant;
			// 			V.CrossPlantStatus = a.MatStock[w].CrossPlantStatus;
			// 			V.On_Hand_Qty = parseFloat(f) + parseFloat(a.MatStock[w].On_Hand_Qty);
			// 			V.Tot_Std_Cost = parseFloat(a.MatStock[w].On_Hand_Qty) * parseFloat(a.StdPrice[y].Std_Price);
			// 			V.Tot_Std_Cost = parseFloat(V.Tot_Std_Cost).toFixed(2);
			// 			V.Std_Price = parseFloat(a.StdPrice[y].Std_Price).toFixed(2);
			// 			V.CreationDate = a.MatStock[w].CreationDate.toISOString().slice(0, 10);

			// 			for (var Q = 0; Q < a.GOODS_MVMT_CUM.length; Q++) {
			// 				if (a.MatStock[w].Material === a.GOODS_MVMT_CUM[Q].Material && a.MatStock[w].Plant === a.GOODS_MVMT_CUM[Q].Plant) {
			// 					V.GoodsShipped = 0;
			// 					if ((a.GOODS_MVMT_CUM[Q].Plant === "US01" || a.GOODS_MVMT_CUM[Q].Plant === "US02" || a.GOODS_MVMT_CUM[Q].Plant === "US03") &&
			// 						(a.GOODS_MVMT_CUM[Q].GoodsMovementType === "601")) {

			// 						V.GoodsShipped = parseFloat(a.GOODS_MVMT_CUM[Q].TotalGdsMvtQtyInBaseUnit);
			// 					}
			// 					V.Consumption = 0;
			// 					if ((a.GOODS_MVMT_CUM[Q].Plant === "US01" || a.GOODS_MVMT_CUM[Q].Plant === "US02" || a.GOODS_MVMT_CUM[Q].Plant === "US03") &&
			// 						(a.GOODS_MVMT_CUM[Q].GoodsMovementType === "201")) {

			// 						V.Consumption = parseFloat(a.GOODS_MVMT_CUM[Q].TotalGdsMvtQtyInBaseUnit);
			// 					}

			// 					if (a.GOODS_MVMT_CUM[Q].numberOfMonths <= 24) {
			// 						V.MonthUsage24 = parseFloat(V.Consumption) + parseFloat(V.GoodsShipped);
			// 						V.MonthUsage24 = (parseFloat(V.MonthUsage24) / parseFloat(a.GOODS_MVMT_CUM[Q].numberOfMonths)) * 24;
			// 						V.MonthUsage24 = parseFloat(V.MonthUsage24).toFixed(2);

			// 					} else {
			// 						V.MonthUsage24 = parseFloat(V.Consumption) + parseFloat(V.GoodsShipped);
			// 					}

			// 					if (a.GOODS_MVMT_CUM[Q].numberOfMonths <= 24) {
			// 						V.Months_Usage_Life_in_months = a.GOODS_MVMT_CUM[Q].numberOfMonths;
			// 					} else {
			// 						V.Months_Usage_Life_in_months = '0';
			// 					}
			// 				}
			// 			}
			// 			// N
			// 			if (V.CrossPlantStatus === "05") {
			// 				V.ExcessQOH = V.On_Hand_Qty;
			// 			}
			// 			if (V.CrossPlantStatus === "03") {
			// 				var g = parseFloat(V.MonthUsage24) - parseFloat(V.On_Hand_Qty);
			// 				if (g > 0) {
			// 					V.ExcessQOH = g;
			// 				} else {
			// 					V.ExcessQOH = 0;
			// 				}
			// 			}

			// 			var year2 = new Date().getFullYear();
			// 			var month2 = new Date().getMonth() + 1;
			// 			var year1 = a.MatStock[w].CreationDate.getFullYear();
			// 			var month1 = a.MatStock[w].CreationDate.getMonth() + 1;
			// 			numberOfMonths = (year2 - year1) * 12 + (month2 - month1) + 1;

			// 			if (numberOfMonths < '12') {
			// 				V.NEW_OBS_EXC_or_GOOD = "NEW";
			// 			}
			// 			if (V.CrossPlantStatus === "05" || V.MonthUsage24 === '0') {
			// 				V.NEW_OBS_EXC_or_GOOD = "OBS";
			// 			}
			// 			if (V.ExcessQOH === "0") {
			// 				V.NEW_OBS_EXC_or_GOOD = "GOOD";
			// 			}
			// 			if (V.CrossPlantStatus === "03" && V.ExcessQOH > '0') {
			// 				V.NEW_OBS_EXC_or_GOOD = "EXC";
			// 			}
			// 			//Q
			// 			if (V.NEW_OBS_EXC_or_GOOD === "EXC") {
			// 				V.Excess_OH_FIFO = V.ExcessQOH * V.Std_Price;
			// 			} else {
			// 				V.Excess_OH_FIFO = "0";
			// 			}
			// 			if (V.NEW_OBS_EXC_or_GOOD === "OBS") {
			// 				V.Obsolete_OH_FIFO = V.ExcessQOH * V.Std_Price;
			// 			} else {
			// 				V.Obsolete_OH_FIFO = "0";
			// 			}
			// 			V.E_O_OH_FIFO = V.Excess_OH_FIFO + V.Obsolete_OH_FIFO;

			// 			if (V.E_O_OH_FIFO === 'undefined' || V.E_O_OH_FIFO === "") {
			// 				V.E_O_OH_FIFO = "0";
			// 			}

			// 			if (V.Tot_Std_Cost === 'undefined' || V.Tot_Std_Cost === "") {
			// 				V.Tot_Std_Cost = "0";
			// 			}

			// 			if (V.Std_Price === 'undefined' || V.Std_Price === "") {
			// 				V.Std_Price = "0";
			// 			}

			// 			if (V.GoodsShipped === 'undefined' || V.GoodsShipped === "") {
			// 				V.GoodsShipped = "0";
			// 			}

			// 			if (V.Consumption === 'undefined' || V.Consumption === "") {
			// 				V.Consumption = "0";
			// 			}

			// 			if (V.MonthUsage24 === 'undefined' || V.MonthUsage24 === "") {
			// 				V.MonthUsage24 = "0";
			// 			}

			// 			if (V.Months_Usage_Life_in_months === 'undefined' || V.Months_Usage_Life_in_months === "") {
			// 				V.Months_Usage_Life_in_months = "0";
			// 			}

			// 			if (V.ExcessQOH === 'undefined' || V.ExcessQOH === "") {
			// 				V.ExcessQOH = "0";
			// 			}

			// 			if (V.NEW_OBS_EXC_or_GOOD === 'undefined' || V.NEW_OBS_EXC_or_GOOD === "") {
			// 				V.NEW_OBS_EXC_or_GOOD = "0";
			// 			}

			// 			if (V.Excess_OH_FIFO === 'undefined' || V.Excess_OH_FIFO === "") {
			// 				V.Excess_OH_FIFO = "0";
			// 			}

			// 			if (V.Obsolete_OH_FIFO === 'undefined' || V.Obsolete_OH_FIFO === "") {
			// 				V.Obsolete_OH_FIFO = "0";
			// 			}

			// 			h.push(V);
			// 			V = {};
			// 		}
			// 	}
			// }

			// Data.BotList = h;
			// var F = [];
			// var I = {};
			// I.columnName = "Material";
			// F.push(I);
			// I = {};
			// I.columnName = "ProductDescription";
			// F.push(I);
			// I = {};
			// I.columnName =
			// 	"Plant";
			// F.push(I);
			// I = {};
			// I.columnName = "CrossPlantStatus";
			// F.push(I);
			// I = {};
			// I.columnName = "On_Hand_Qty";
			// F.push(I);
			// I = {};
			// I.columnName = "Tot_Std_Cost";
			// F.push(I);
			// I = {};
			// I.columnName = "Std_Price";
			// F.push(I);
			// I = {};
			// I.columnName = "GoodsShipped";
			// F.push(
			// 	I);
			// I = {};
			// I.columnName = "Consumption";
			// F.push(I);
			// I = {};
			// I.columnName = "SLoc_S099_Qty";
			// F.push(I);
			// I = {};
			// I.columnName =
			// 	"MonthUsage24";
			// F.push(I);
			// I = {};
			// I.columnName = "ExcessQOH";
			// F.push(I);
			// I = {};
			// I.columnName = "NEW_OBS_EXC_or_GOOD";
			// F.push(I);
			// I = {};
			// I.columnName = "Excess_OH_FIFO";
			// F.push(I);
			// I = {};
			// I.columnName = "Obsolete_OH_FIFO";
			// F.push(I);
			// I = {};
			// I.columnName =
			// 	"E_O_OH_FIFO";
			// F.push(I);
			// I = {};
			// I.columnName = "Months_Usage_Life_in_months";
			// F.push(I);
			// I = {};
			// I.columnName = "CreationDate";
			// F.push(I);
			// I = {};
			// var B = sap.ui.getCore().byId("container-Material_Consume_13---View1--idTable");
			// var N = new sap.ui.model.json.JSONModel();
			// N.setData({
			// 	rows: h,
			// 	columns: F,
			// 	width: "11rem"
			// });
			// B.setModel(N);
			// B.bindColumns("/columns", function (a, t) {
			// 	var e = t.getObject().columnName;
			// 	return new sap.ui.table.Column({
			// 		label: e,
			// 		template: e
			// 	});
			// });
			// B.bindRows("/rows");

			// this.tableDialog.close();
		},
		onDataExport: function (oEvent) {
			var dateModel = new sap.ui.model.json.JSONModel();
			dateModel.setData(Data.BotList);
			var oExport = new Export({
				exportType: new sap.ui.core.util.ExportTypeCSV({
					separatorChar: ",",
					charset: "utf-8"
				}),
				// Pass in the model created above
				models: dateModel,
				// binding information for the rows aggregation
				rows: {
					path: "/"
				},
				columns: [{
					name: "Material",
					template: {
						content: "{Material}"
					}
				}, {
					name: "Product Description",
					template: {
						content: "{ProductDescription}"
					}
				}, {
					name: "Plant",
					template: {
						content: "{Plant}"
					}
				}, {
					name: "Cross Plant Status",
					template: {
						content: "{CrossPlantStatus}"
					}
				}, {
					name: "On Hand Qty",
					template: {
						content: "{On_Hand_Qty}"
					}
				}, {
					name: "Total Std Cost",
					template: {
						content: "{Tot_Std_Cost}"
					}
				}, {
					name: "Std Price",
					template: {
						content: "{Std_Price}"
					}
				}, {
					name: "Goods Shipped",
					template: {
						content: "{GoodsShipped}"
					}
				}, {
					name: "Consumption",
					template: {
						content: "{Consumption}"
					}
				}, {
					name: "S.Loc S099 Qty",
					template: {
						content: "{SLoc_S099_Qty}"
					}
				}, {
					name: "24 Month Usage",
					template: {
						content: "{MonthUsage24}"
					}
				}, {
					name: "Excess QOH",
					template: {
						content: "{ExcessQOH}"
					}
				}, {
					name: "NEW, OBS, EXC or GOOD",
					template: {
						content: "{NEW_OBS_EXC_or_GOOD}"
					}
				}, {
					name: "Excess OH FIFO",
					template: {
						content: "{Excess_OH_FIFO}"
					}
				}, {
					name: "Obsolete OH FIFO",
					template: {
						content: "{Obsolete_OH_FIFO}"
					}
				}, {
					name: "E_O_OH_FIFO",
					template: {
						content: "{E_O_OH_FIFO}"
					}
				}, {
					name: "Months Usage Life in months",
					template: {
						content: "{Months_Usage_Life_in_months}"
					}
				}, {
					name: "Creation Date",
					template: {
						content: "{CreationDate}"
					}
				}]
			});

			oExport.saveFile().always(function () {
				this.destroy();
			});
		}
	});
});