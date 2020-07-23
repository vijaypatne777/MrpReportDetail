/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"YY1_MAT_CONSUME_UI5/Material_Consume_13/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});