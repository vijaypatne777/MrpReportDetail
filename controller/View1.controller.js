sap.ui.define(["sap/m/MessageToast", "sap/ui/core/mvc/Controller", "sap/ui/model/Filter", "sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType", "sap/ui/model/Sorter", "sap/ui/core/util/Export", "sap/ui/core/util/ExportTypeCSV", "sap/m/MessageBox",
	"sap/ui/core/util/MockServer", "sap/ui/export/Spreadsheet", "sap/ui/model/odata/v2/ODataModel", "sap/ui/model/json/JSONModel",
	"sap/ui/core/util/Export", "sap/ui/core/util/ExportTypeCSV"
], function (e, t, a, o, n, s, r, i, l, d, u, _, c, p, m) {
	"use strict";
	var M = new t;
	var O = {
		pList: []
	};
	var u = {
		newList: []
	};
	var S = {
		BotList: []
	};
	var v = {
		carrList: []
	};
	return t.extend("YY1_MAT_CONSUME_UI5.Material_Consume_13.controller.View1", {
		onInit: function () {},
		abcd: function () {
			for (var e = 0; e < O.pList.length; e++) {
				v.carrList[e] = O.pList[e].Plant;
			}
			var t = v.carrList.filter(function (e, t, a) {
				return a.indexOf(e) === t;
			});
			this.h = t;
			var a = {
				pList: []
			};
			for (var o = 0; o < t.length; o++) {
				a.pList.push({
					Plant: t[o]
				});
			}
			var n = new sap.ui.model.json.JSONModel;
			n.setData(a);
			this.getView().setModel(n);
			this.getView().byId("mb").setValue(null);
		},
		_getMatStock: function (e, t, a) {
			var o = this.getOwnerComponent().getModel("MATSTOCK");
			var n = {
				MatStock: []
			};
			var s = e;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, s);
			var i = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var l = new Array(new sap.ui.model.Filter({
				filters: [i],
				and: true
			}));
			o.read("/YY1_MatStock", {
				urlParameters: {
					$select: "Material, Plant, CreationDate, MatlCnsmpnQtyInMatlBaseUnit, MaterialBaseUnit, ProductDescription, CrossPlantStatus, On_Hand_Qty"
				},
				filters: [l],
				success: function (e, a) {
					var o = e.results;
					o.sort();
					var s = o.length;
					if (s !== 0) {
						sap.m.MessageToast.show("Getting Material stock!!! ");
						for (var r = 0; r < s; r++) {
							if (o[r].Material !== "" && o[r].Plant !== "") {
								n.MatStock.push({
									Material: o[r].Material,
									Plant: o[r].Plant,
									CreationDate: o[r].CreationDate,
									MaterialBaseUnit: o[r].MaterialBaseUnit,
									MatlCnsmpnQtyInMatlBaseUnit: o[r].MatlCnsmpnQtyInMatlBaseUnit,
									On_Hand_Qty: o[r].On_Hand_Qty,
									SLoc_S099_Qty: o[r].on_hnd_s099,
									ProductDescription: o[r].ProductDescription,
									CrossPlantStatus: o[r].CrossPlantStatus
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No Material stock data found!!! ");
					}
					t(n.MatStock);
				},
				error: function () {
					a();
				}
			});
		},
		_getStd_Price: function (e, t, a) {
			var o = this.getOwnerComponent().getModel("STDPRICE");
			var n = {
				StdPrice: []
			};
			var s = e;
			var r = new sap.ui.model.Filter("ValuationArea", sap.ui.model.FilterOperator.EQ, s);
			var i = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var l = new Array(new sap.ui.model.Filter({
				filters: [i],
				and: true
			}));
			o.read("/YY1_Prod_Std_Price", {
				urlParameters: {
					$select: "Product, ValuationArea, Std_Price"
				},
				filters: [l],
				success: function (e, a) {
					var o = e.results;
					o.sort();
					var s = o.length;
					if (s !== 0) {
						sap.m.MessageToast.show("Getting standard price!!! ");
						for (var r = 0; r < s; r++) {
							if (o[r].Material !== "" && o[r].ValuationArea !== "") {
								n.StdPrice.push({
									Material: o[r].Product,
									Std_Price: o[r].Std_Price,
									ValuationArea: o[r].ValuationArea
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}
					t(n.StdPrice);
				},
				error: function () {
					a();
				}
			});
		},
		_getGoods_Mvnt: function (e, t, a) {
			var o = this.getOwnerComponent().getModel("GOODSMVNT");
			var n = {
				GOODS_MVMT: []
			};
			var s = e;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, s);
			var i = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			// 
			var l = new Date;
			var d = this.getView().byId("idDatePicker").getValue().toUpperCase();
			var u = new Date(d);
			var _ = d.slice(0, 4) - 2;
			var c = d.slice(5, 7);
			var p = d.slice(8, 11);
			var m = _ + "-" + c + "-" + p;
			var m = new Date(m);
			// 
			var M = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.LE, u.toISOString());
			var O = new sap.ui.model.Filter({
				filters: [M],
				and: true
			});
			var S = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.GE, m.toISOString());
			var v = new sap.ui.model.Filter({
				filters: [S],
				and: true
			});
			var f = new Array(new sap.ui.model.Filter({
				filters: [i, O, v],
				and: true
			}));
			// 
			o.read("/YY1_GOODS_MVMT", {
				urlParameters: {
					$select: "Material, Plant, MaterialBaseUnit, DocumentDate, TotalGdsMvtQtyInBaseUnit, CreationDate, GoodsMovementType"
				},
				filters: [f],
				success: function (e, a) {
					var o = e.results;
					o.sort();
					var s = o.length;
					if (s !== 0) {
						sap.m.MessageToast.show("Getting goods movement data!!! ");
						for (var r = 0; r < s; r++) {
							if (o[r].Material !== "" && o[r].Plant !== "" && (o[r].GoodsMovementType === "201" || o[r].GoodsMovementType === "202" || o[
									r].GoodsMovementType === "602" || o[r].GoodsMovementType === "601")) {
								n.GOODS_MVMT.push({
									Material: o[r].Material,
									Plant: o[r].Plant,
									MaterialBaseUnit: o[r].MaterialBaseUnit,
									DocumentDate: o[r].DocumentDate,
									TotalGdsMvtQtyInBaseUnit: o[r].TotalGdsMvtQtyInBaseUnit,
									CreationDate: o[r].CreationDate,
									GoodsMovementType: o[r].GoodsMovementType
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}
					t(n.GOODS_MVMT);
				},
				error: function () {
					a();
				}
			});
		},
		_getGoods_MvntQty: function (e, t, a) {
			var o = this.getOwnerComponent().getModel("GOODSMVNT");
			var n = {
				Goods_MvntQty: []
			};
			var s = e;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, s);
			var i = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var l = new Date;
			var d = this.getView().byId("idDatePicker").getValue().toUpperCase();
			var u = new Date(d);
			// 
			var _ = d.slice(0, 4) - 2;
			var c = d.slice(5, 7);
			var p = d.slice(8, 11);
			var m = _ + "-" + c + "-" + p;
			var m = new Date(m);
			var M = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.LE, u.toISOString());
			var O = new sap.ui.model.Filter({
				filters: [M],
				and: true
			});
			var S = new sap.ui.model.Filter("DocumentDate", sap.ui.model.FilterOperator.GE, m.toISOString());
			var v = new sap.ui.model.Filter({
				filters: [S],
				and: true
			});
			// 
			var f = new Array(new sap.ui.model.Filter({
				filters: [i, O, v],
				and: true
			}));
			// 
			o.read("/YY1_GOODS_MVMT", {
				urlParameters: {
					$select: "Material, Plant, TotalGdsMvtQtyInBaseUnit, CreationDate, GoodsMovementType"
				},
				filters: [f],
				success: function (e, a) {
					// 
					var o = e.results;
					o.sort();
					var s = o.length;
					if (s !== 0) {
						sap.m.MessageToast.show("Getting goods movement data!!! ");
						for (var r = 0; r < s; r++) {
							if (o[r].Material !== "" && o[r].Plant !== "" && (o[r].GoodsMovementType === "201" || o[r].GoodsMovementType === "202" || o[
									r].GoodsMovementType === "602" || o[r].GoodsMovementType === "601")) {
								n.Goods_MvntQty.push({
									Material: o[r].Material,
									Plant: o[r].Plant,
									TotalGdsMvtQtyInBaseUnit: o[r].TotalGdsMvtQtyInBaseUnit,
									CreationDate: o[r].CreationDate,
									GoodsMovementType: o[r].GoodsMovementType
										// DocumentDate: o[r].DocumentDate
								});
							}
						}
						// 
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}
					t(n.Goods_MvntQty);
				},
				error: function () {
					a();
				}
			});
		},
		_getSL099_QUANTITY: function (e, t, a) {
			var o = this.getOwnerComponent().getModel("MATSTOCK");
			var n = {
				SL099_QUANTITY: []
			};
			var s = e;
			var r = new sap.ui.model.Filter("Plant", sap.ui.model.FilterOperator.EQ, s);
			var i = new sap.ui.model.Filter({
				filters: [r],
				and: true
			});
			var l = "S099";
			var d = new sap.ui.model.Filter("StorageLocation", sap.ui.model.FilterOperator.EQ, l);
			var u = new sap.ui.model.Filter({
				filters: [d],
				and: true
			});
			var _ = new Array(new sap.ui.model.Filter({
				filters: [i, u],
				and: true
			}));
			o.read("/YY1_MatStock", {
				urlParameters: {
					$select: "Material, Plant, StorageLocation, On_Hand_Qty"
				},
				filters: [_],
				success: function (e, a) {
					var o = e.results;
					o.sort();
					var s = o.length;
					if (s !== 0) {
						sap.m.MessageToast.show("Getting goods movement data!!! ");
						for (var r = 0; r < s; r++) {
							if (o[r].Material !== "" && o[r].Plant !== "") {
								n.SL099_QUANTITY.push({
									Material: o[r].Material,
									Plant: o[r].Plant,
									On_Hand_Qty: o[r].On_Hand_Qty
								});
							}
						}
					} else {
						sap.m.MessageToast.show("No goods movement data found!!! ");
					}
					t(n.SL099_QUANTITY);
				},
				error: function () {
					a();
				}
			});
		},
		_buildFinalData: function (e) {
			//  
			var t = 0;
			var a = {};
			var o = [];
			var n = 0;

			for (var s = 0; s < e.StdPrice.length; s++) {
				for (var r = 0; r < e.MatStock.length; r++) {
					if (e.MatStock[r].Material === e.StdPrice[s].Material && e.MatStock[r].Plant === e.StdPrice[s].ValuationArea) {
						for (var i = 0; i < e.SL099_QUANTITY.length; i++) {
							if (e.MatStock[r].Material === e.SL099_QUANTITY[i].Material) {
								a.SLoc_S099_Qty = parseFloat(e.SL099_QUANTITY[i].On_Hand_Qty);
								break;
							}
						}
						var l = this.getView().byId("idDatePicker").getValue().toUpperCase();
						var d = l.slice(0, 4);
						var u = l.slice(5, 7);
						u = parseFloat(u);
						var _ = e.MatStock[r].CreationDate.getFullYear();
						var c = e.MatStock[r].CreationDate.getMonth();
						t = (d - _) * 12 + (u - c);
						a.Material = e.MatStock[r].Material;
						a.ProductDescription = e.MatStock[r].ProductDescription;
						a.Plant = e.MatStock[r].Plant;
						a.CrossPlantStatus = e.MatStock[r].CrossPlantStatus;
						a.On_Hand_Qty = parseFloat(n) + parseFloat(e.MatStock[r].On_Hand_Qty);
						a.Tot_Std_Cost = parseFloat(e.MatStock[r].On_Hand_Qty) * parseFloat(e.StdPrice[s].Std_Price);
						a.Tot_Std_Cost = parseFloat(a.Tot_Std_Cost).toFixed(2);
						a.Std_Price = parseFloat(e.StdPrice[s].Std_Price).toFixed(2);
						a.CreationDate = e.MatStock[r].CreationDate.toISOString().slice(0, 10);
						a.Consumption = 0;
						a.Consumption201 = 0;
						a.Consumption202 = 0;
						a.GoodsShipped = 0;
						a.GoodsShipped601 = 0;
						a.GoodsShipped602 = 0;
						a.ExcessQOH = "0";
						for (var p = 0; p < e.GOODS_MVMT_CUM.length; p++) {
							if (e.MatStock[r].Material === e.GOODS_MVMT_CUM[p].Material && e.MatStock[r].Plant === e.GOODS_MVMT_CUM[p].Plant) {
								a.GoodsShipped = 0;
								a.GoodsShipped601 = 0;
								a.GoodsShipped602 = 0;
								if ((e.GOODS_MVMT_CUM[p].Plant === "US01" || e.GOODS_MVMT_CUM[p].Plant === "US02" || e.GOODS_MVMT_CUM[p].Plant === "US03") &&
									e.GOODS_MVMT_CUM[p].GoodsMovementType === "601" || e.GOODS_MVMT_CUM[p].GoodsMovementType === "602") {

									for (var x = 0; x < e.GOODS_MVMT_CUM.length; x++) {
										if (e.GOODS_MVMT_CUM[x].Material === e.GOODS_MVMT_CUM[p].Material &&
											e.GOODS_MVMT_CUM[x].Plant === e.GOODS_MVMT_CUM[p].Plant &&
											e.GOODS_MVMT_CUM[x].GoodsMovementType === "601"
										) {

											a.GoodsShipped601 = parseFloat(e.GOODS_MVMT_CUM[x].TotalGdsMvtQtyInBaseUnit);
										}
										if (e.GOODS_MVMT_CUM[x].Material === e.GOODS_MVMT_CUM[p].Material &&
											e.GOODS_MVMT_CUM[x].Plant === e.GOODS_MVMT_CUM[p].Plant &&
											e.GOODS_MVMT_CUM[x].GoodsMovementType === "602"
										) {

											a.GoodsShipped602 = parseFloat(e.GOODS_MVMT_CUM[x].TotalGdsMvtQtyInBaseUnit);
										}
									}
								}
								a.Consumption = 0;
								a.Consumption201 = 0;
								a.Consumption202 = 0;
								if ((e.GOODS_MVMT_CUM[p].Plant === "US01" || e.GOODS_MVMT_CUM[p].Plant === "US02" || e.GOODS_MVMT_CUM[p].Plant === "US03") &&
									e.GOODS_MVMT_CUM[p].GoodsMovementType === "201" || e.GOODS_MVMT_CUM[p].GoodsMovementType === "202") {

									for (var x = 0; x < e.GOODS_MVMT_CUM.length; x++) {
										if (e.GOODS_MVMT_CUM[x].Material === e.GOODS_MVMT_CUM[p].Material &&
											e.GOODS_MVMT_CUM[x].Plant === e.GOODS_MVMT_CUM[p].Plant &&
											e.GOODS_MVMT_CUM[x].GoodsMovementType === "201"
										) {

											a.Consumption201 = parseFloat(e.GOODS_MVMT_CUM[x].TotalGdsMvtQtyInBaseUnit);
										}
										if (e.GOODS_MVMT_CUM[x].Material === e.GOODS_MVMT_CUM[p].Material &&
											e.GOODS_MVMT_CUM[x].Plant === e.GOODS_MVMT_CUM[p].Plant &&
											e.GOODS_MVMT_CUM[x].GoodsMovementType === "202"
										) {

											a.Consumption202 = parseFloat(e.GOODS_MVMT_CUM[x].TotalGdsMvtQtyInBaseUnit);
										}
									}

								}
								if (t <= 24) {
									a.MonthUsage24 = parseFloat(a.Consumption) + parseFloat(a.GoodsShipped);
									a.MonthUsage24 = parseFloat(a.MonthUsage24) / parseFloat(t) * 24;
									a.MonthUsage24 = parseFloat(a.MonthUsage24).toFixed(2);
								} else {
									a.MonthUsage24 = parseFloat(a.Consumption) + parseFloat(a.GoodsShipped);
								}
							}
						}

						if (a.GoodsShipped601 === 'undefined') {
							a.GoodsShipped601 = 0;
						}
						if (a.GoodsShipped602 === 'undefined') {
							a.GoodsShipped602 = 0;
						}
						if (a.Consumption201 === 'undefined') {
							a.Consumption201 = 0;
						}
						if (a.Consumption202 === 'undefined') {
							a.Consumption202 = 0;
						}
						a.Consumption = parseFloat(a.Consumption201) + parseFloat(a.Consumption202);
						a.GoodsShipped = parseFloat(a.GoodsShipped601) + parseFloat(a.GoodsShipped602);

						if (a.CrossPlantStatus === "05") {
							a.ExcessQOH = a.On_Hand_Qty;
						}
						if (a.CrossPlantStatus === "03") {
							var m = parseFloat(a.MonthUsage24) - parseFloat(a.On_Hand_Qty);
							if (m > 0) {
								a.ExcessQOH = m;
							} else {
								a.ExcessQOH = "0";
							}
						}
						var l = this.getView().byId("idDatePicker").getValue().toUpperCase();
						var d = l.slice(0, 4);
						var u = l.slice(5, 7);
						u = parseFloat(u);
						var _ = e.MatStock[r].CreationDate.getFullYear();
						var c = e.MatStock[r].CreationDate.getMonth();
						t = (d - _) * 12 + (u - c);
						if (t <= 24) {
							a.Months_Usage_Life_in_months = t;
						} else {
							a.Months_Usage_Life_in_months = "0";
						}

						if (a.CrossPlantStatus === "05" || a.MonthUsage24 === "0") {
							a.NEW_OBS_EXC_or_GOOD = "OBS";
						}
						if (a.ExcessQOH === "0") {
							a.NEW_OBS_EXC_or_GOOD = "GOOD";
						}
						if ((a.CrossPlantStatus === "02" || a.CrossPlantStatus === "03" || a.CrossPlantStatus === "04") && a.ExcessQOH > "0") {
							a.NEW_OBS_EXC_or_GOOD = "EXC";
						}
						if (t < "12") {
							a.NEW_OBS_EXC_or_GOOD = "NEW";
						}

						if (a.NEW_OBS_EXC_or_GOOD === "EXC") {
							a.Excess_OH_FIFO = a.ExcessQOH * a.Std_Price;
						} else {
							a.Excess_OH_FIFO = "0";
						}
						if (a.NEW_OBS_EXC_or_GOOD === "OBS") {
							a.Obsolete_OH_FIFO = a.ExcessQOH * a.Std_Price;
						} else {
							a.Obsolete_OH_FIFO = "0";
						}

						a.E_O_OH_FIFO = a.Excess_OH_FIFO + a.Obsolete_OH_FIFO;
						if (a.E_O_OH_FIFO === "undefined" || a.E_O_OH_FIFO === "") {
							a.E_O_OH_FIFO = "0";
						}
						if (a.Tot_Std_Cost === "undefined" || a.Tot_Std_Cost === "") {
							a.Tot_Std_Cost = "0";
						}
						if (a.Std_Price === "undefined" || a.Std_Price === "") {
							a.Std_Price = "0";
						}
						if (a.GoodsShipped === "undefined" || a.GoodsShipped === "") {
							a.GoodsShipped = "0";
						}
						if (a.Consumption === "undefined" || a.Consumption === "") {
							a.Consumption = "0";
						}
						if (a.MonthUsage24 === "undefined" || a.MonthUsage24 === "") {
							a.MonthUsage24 = "0";
						}
						if (a.Months_Usage_Life_in_months === "undefined" || a.Months_Usage_Life_in_months === "") {
							a.Months_Usage_Life_in_months = "0";
						}
						if (a.ExcessQOH === "undefined" || a.ExcessQOH === "") {
							a.ExcessQOH = "0";
						}
						if (a.NEW_OBS_EXC_or_GOOD === "undefined" || a.NEW_OBS_EXC_or_GOOD === "") {
							a.NEW_OBS_EXC_or_GOOD = "0";
						}
						if (a.Excess_OH_FIFO === "undefined" || a.Excess_OH_FIFO === "") {
							a.Excess_OH_FIFO = "0";
						}
						if (a.Obsolete_OH_FIFO === "undefined" || a.Obsolete_OH_FIFO === "") {
							a.Obsolete_OH_FIFO = "0";
						}
						o.push(a);
						a = {};
					}
				}
			}
			S.BotList = o;
			var M = [];
			var O = {};
			O.columnName = "Material";
			M.push(O);
			O = {};
			O.columnName = "ProductDescription";
			M.push(O);
			O = {};
			O.columnName = "Plant";
			M.push(O);
			O = {};
			O.columnName = "CrossPlantStatus";
			M.push(O);
			O = {};
			O.columnName = "On_Hand_Qty";
			M.push(O);
			O = {};
			O.columnName = "Tot_Std_Cost";
			M.push(O);
			O = {};
			O.columnName = "Std_Price";
			M.push(O);
			O = {};
			O.columnName = "GoodsShipped";
			M.push(O);
			O = {};
			O.columnName = "Consumption";
			M.push(O);
			O = {};
			O.columnName = "SLoc_S099_Qty";
			M.push(O);
			O = {};
			O.columnName = "MonthUsage24";
			M.push(O);
			O = {};
			O.columnName = "ExcessQOH";
			M.push(O);
			O = {};
			O.columnName = "NEW_OBS_EXC_or_GOOD";
			M.push(O);
			O = {};
			O.columnName = "Excess_OH_FIFO";
			M.push(O);
			O = {};
			O.columnName = "Obsolete_OH_FIFO";
			M.push(O);
			O = {};
			O.columnName = "E_O_OH_FIFO";
			M.push(O);
			O = {};
			O.columnName = "Months_Usage_Life_in_months";
			M.push(O);
			O = {};
			O.columnName = "CreationDate";
			M.push(O);
			O = {};
			var v = sap.ui.getCore().byId("container-Material_Consume_13---View1--idTable");
			var f = new sap.ui.model.json.JSONModel;
			f.setData({
				rows: o,
				columns: M,
				width: "11rem"
			});
			v.setModel(f);
			v.bindColumns("/columns", function (e, t) {
				var a = t.getObject().columnName;
				return new sap.ui.table.Column({
					label: a,
					template: a
				});
			});
			v.bindRows("/rows");
		},
		onSearch: function () {
			sap.ui.core.BusyIndicator.show();
			var e = {
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
			var a = this.getView().byId("idDatePicker").getValue().toUpperCase();
			var o = this;
			var n;
			var s;
			var r;
			var s;
			var i;
			var l = new Promise(function (e, a) {
				o._getMatStock(t, e, a);
			});
			l.then(function (a) {
				e.MatStock = a;
				n = new Promise(function (e, a) {
					o._getStd_Price(t, e, a);
				});
				n.then(function (a) {
					e.StdPrice = a;
					s = new Promise(function (e, a) {
						o._getSL099_QUANTITY(t, e, a);
					});
					s.then(function (a) {
						r = new Promise(function (n, s) {
							e.SL099_QUANTITY = a;
							o._getGoods_Mvnt(t, n, s);
						});
						r.then(function (a) {
							i = new Promise(function (n, s) {
								e.GOODS_MVMT = a;
								o._getGoods_MvntQty(t, n, s);
							});
							i.then(function (t) {
								e.GOODS_MVMT_CUM = t;
								o._buildFinalData(e);
								sap.ui.core.BusyIndicator.hide();
							}, function () {});
						}, function () {});
					}, function () {}, function () {});
				}, function () {});
			}, function () {});
		},
		onDataExport: function (e) {
			var t = new sap.ui.model.json.JSONModel;
			t.setData(S.BotList);
			var a = new p({
				exportType: new sap.ui.core.util.ExportTypeCSV({
					separatorChar: ",",
					charset: "utf-8"
				}),
				models: t,
				rows: {
					path: "/"
				},
				columns: [{
					name: "Material",
					template: {

						content: "'{Material}"
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
						content: "'{CrossPlantStatus}"
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
			a.saveFile().always(function () {
				this.destroy();
			});
		}
	});
});