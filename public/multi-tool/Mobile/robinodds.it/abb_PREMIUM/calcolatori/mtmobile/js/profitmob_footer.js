function calcoli() {
	var quP,
		quB,
		quD,
		real,
		BON,
		bank,
		bon_ex,
		real_dch,
		bon_dch,
		inc_p,
		inc_b,
		inc_d,
		net,
		net_ex,
		net_dc,
		gFin,
		kind,
		stat,
		dutch,
		comz,
		res;

	quP = parseFloat(document.getElementById("quotaPnt").value, 2);
	quB = parseFloat(document.getElementById("quotaBnc").value, 2);
	quD = parseFloat(document.getElementById("quotaDch").value, 2);
	real = parseFloat(document.getElementById("saldoReal_Bk").value, 2);
	BON = parseFloat(document.getElementById("saldoBonus_Bk").value, 2);
	bank = parseFloat(document.getElementById("saldoReal_Ex").value, 2);
	bon_ex = parseFloat(document.getElementById("saldoBonus_Ex").value, 2);
	real_dch = parseFloat(document.getElementById("saldoReal_Dc").value, 2);
	bon_dch = parseFloat(document.getElementById("saldoBonus_Dc").value, 2);
	comz = parseFloat(document.getElementById("comz").value, 2);

	kind = document.getElementById("tipo").value;
	stat = document.getElementById("esito").value;

	/* 	console.log("stato: " + stat);
	console.log("tipo: " + kind);
	console.log("quota P: " + quP);
	console.log("quota B: " + quB);
	console.log("reale: " + real);
	console.log("BONUS: " + BON);
	console.log("copertura: " + bank);
	console.log("commiss: " + comz); */

	if (kind == "Punta-Banca") {
		// bank = parseFloat((((real + BON) * quP) / (quB - comz/100)), 2);
		res = parseFloat(bank * (quB - 1), 2);
		// console.log("resp: " + res);

		if (stat == "vincePnt") {
			inc_p = (zeroIfNull(real) + zeroIfNull(BON)) * quP;
			inc_b = -res;
			inc_d = 0;
			net = inc_p - real;
			net_ex = inc_b;
			net_dc = inc_d;
			gFin = net + net_ex + net_dc;
		} else {
			inc_p = -real;
			inc_b = bank * (1 - comz / 100);
			inc_d = 0;
			net = inc_p;
			net_ex = inc_b;
			net_dc = inc_d;
			gFin = net + net_ex + net_dc;
		}
	} else if (kind == "Punta-Punta") {
		// res = parseFloat(((real + BON) * quP) / (quB), 0);

		if (stat == "vincePnt") {
			inc_p = (real + BON) * quP;
			inc_b = -bank;
			inc_d = 0;
			net = inc_p - real;
			net_ex = inc_b;
			net_dc = inc_d;
			gFin = net + net_ex + net_dc;
		} else {
			inc_p = -real;
			inc_b = (bank + bon_ex) * quB;
			inc_d = 0;
			net = -real;
			net_ex = inc_b - bank;
			net_dc = inc_d;
			gFin = net + net_ex + net_dc;
		}
	} else {
		if (stat == "vincePnt") {
			inc_p = (real + BON) * quP;
			inc_b = -bank;
			inc_d = -real_dch;
			net = inc_p - real;
			net_ex = inc_b;
			net_dc = inc_d;
			gFin = net + net_ex + net_dc;
		} else if (stat == "vinceBnc") {
			inc_p = -real;
			inc_b = (bank + bon_ex) * quB;
			inc_d = -real_dch;
			net = inc_p;
			net_ex = inc_b - bank;
			net_dc = inc_d;
			gFin = net + net_ex + net_dc;
		} else {
			inc_p = -real;
			inc_b = -bank;
			inc_d = (real_dch + bon_dch) * quD;
			net = inc_p;
			net_ex = inc_b;
			net_dc = inc_d - real_dch;
			gFin = net + net_ex + net_dc;
		}
	}

	net = zeroIfNull(net);
	net_ex = zeroIfNull(net_ex);
	net_dc = zeroIfNull(net_dc);

	document.getElementById("incPnt").value = parseFloat(net, 2).toFixed(2);
	document.getElementById("incBnc").value = parseFloat(net_ex, 2).toFixed(2);
	document.getElementById("incDch").value = parseFloat(net_dc, 2).toFixed(2);
	//document.getElementById("guadFin").value = parseFloat(gFin, 2).toFixed(2);

	tot_calc();
}

function tot_calc() {
	hidden_input();
	hidden_input_TOT();
	var bk = parseFloat(document.getElementById("incPnt_h").value, 2);
	var exc = parseFloat(document.getElementById("incBnc_h").value, 2);
	var dch = parseFloat(document.getElementById("incDch_h").value, 2);
	var total = bk + exc + dch;
	document.getElementById("guadFin").innerHTML = total.toFixed(2);
	document.getElementById("guadFin_h").value =
		document.getElementById("guadFin").innerHTML;
}

function hidden_input() {
	input_zeroIfNull(
		document.getElementById("quotaPnt"),
		document.getElementById("quotaPnt_h"),
		allthesame
	);
	input_zeroIfNull(
		document.getElementById("quotaBnc"),
		document.getElementById("quotaBnc_h"),
		allthesame
	);
	input_zeroIfNull(
		document.getElementById("quotaDch"),
		document.getElementById("quotaDch_h"),
		allthesame
	);
	input_zeroIfNull(
		document.getElementById("comz"),
		document.getElementById("comz_h"),
		allthesame
	);
	input_zeroIfNull(
		document.getElementById("saldoReal_Ex"),
		document.getElementById("saldoReal_Ex_h"),
		allthesame
	);
	input_zeroIfNull(
		document.getElementById("saldoBonus_Ex"),
		document.getElementById("saldoBonus_Ex_h"),
		allthesame
	);
	input_zeroIfNull(
		document.getElementById("saldoReal_Dc"),
		document.getElementById("saldoReal_Dc_h"),
		allthesame
	);
	input_zeroIfNull(
		document.getElementById("saldoBonus_Dc"),
		document.getElementById("saldoBonus_Dc_h"),
		allthesame
	);
	//document.getElementById('quotaPnt_h').value = document.getElementById('quotaPnt').value;
	//document.getElementById('quotaBnc_h').value = document.getElementById('quotaBnc').value;
	//document.getElementById('quotaDch_h').value = document.getElementById('quotaDch').value;
	//document.getElementById('comz_h').value = document.getElementById('comz').value;
	//document.getElementById('saldoReal_Ex_h').value = document.getElementById('saldoReal_Ex').value;
	//document.getElementById('saldoBonus_Ex_h').value = document.getElementById('saldoBonus_Ex').value;
	//document.getElementById('saldoReal_Dc_h').value = document.getElementById('saldoReal_Dc').value;
	//document.getElementById('saldoBonus_Dc_h').value = document.getElementById('saldoBonus_Dc').value;

	if (document.getElementById("checkOpn").checked) {
		var terminata = "1";
		$("#AGRecord #finished").addClass("on");
	} else {
		var terminata = "0";
		$("#AGRecord #finished").removeClass("on");
	}

	document.getElementById("checkBool_h").value = terminata;
	// console.log("terminata: " + terminata);
}

function auto_hide() {
	if (document.getElementById("checkAuto").checked) {
		var autoC = "1";
	} else {
		var autoC = "0";
	}

	document.getElementById("checkAuto_h").value = autoC;
}

function hidden_input_TOT() {
	document.getElementById("incPnt_h").value =
		document.getElementById("incPnt").value;
	document.getElementById("incBnc_h").value =
		document.getElementById("incBnc").value;
	document.getElementById("incDch_h").value =
		document.getElementById("incDch").value;
	document.getElementById("guadFin_h").value =
		document.getElementById("guadFin").innerHTML;
}

function autoCalc() {
	var state = document.getElementById("checkAuto").checked;
	var off = "1px solid rgb(255, 255, 255, 0)";
	var on = "1px solid rgb(187, 187, 187)";

	// console.log("auto: " + state);

	switch (state) {
		case true:
			$("#incPnt").prop("disabled", true);
			$("#incBnc").prop("disabled", true);
			$("#incDch").prop("disabled", true);

			$("#incPnt").css("border", off);
			$("#incPnt").css("background", "transparent");
			$("#incBnc").css("border", off);
			$("#incBnc").css("background", "transparent");
			$("#incDch").css("border", off);
			$("#incDch").css("background", "transparent");

			$("#AGRecord .calcoli:input").on("keyup", calcoli).on("change", calcoli);

			calcoli();
			hidden_input();
			hidden_input_TOT();
			tot_calc();

			break;

		case false:
			if (
				$("select#tipo")[0].value == "Punta-Banca" ||
				$("select#tipo")[0].value == "Punta-Punta"
			) {
				$("#incPnt").prop("disabled", false);
				$("#incPnt").css("border", on);
				$("#incPnt").css("background", "#ffffff");

				$("#incBnc").prop("disabled", false);
				$("#incBnc").css("border", on);
				$("#incBnc").css("background", "#ffffff");
			} else if ($("select#tipo")[0].value == "Dutching") {
				$("#incPnt").prop("disabled", false);
				$("#incPnt").css("border", on);
				$("#incPnt").css("background", "#ffffff");

				$("#incBnc").prop("disabled", false);
				$("#incBnc").css("border", on);
				$("#incBnc").css("background", "#ffffff");

				$("#incDch").prop("disabled", false);
				$("#incDch").css("border", on);
				$("#incDch").css("background", "#ffffff");
			} else if ($("select#tipo")[0].value == "Altro") {
				$("#incPnt").prop("disabled", false);
				$("#incPnt").css("border", on);
				$("#incPnt").css("background", "#ffffff");

				$("#incBnc").prop("disabled", true);
				$("#incBnc").css("border", off);
				$("#incBnc").css("background", "#transparent");

				$("#incDch").prop("disabled", true);
				$("#incDch").css("border", off);
				$("#incDch").css("background", "#transparent");
			}

			/*$("#incBnc").css('border', on);
			$("#incBnc").css('background', "#ffffff");*/

			$("#AGRecord .calcoli:input")
				.off("keyup", calcoli)
				.off("change", calcoli);

			break;
	}

	/*$("#incPnt").prop('disabled', function(i, v) {return !v;});
	$("#incBnc").prop('disabled', function(i, v) {return !v;});
	$("#guadFin").prop('disabled', function(i, v) {return !v;});
	
	auto_calc = !auto_calc;
	// console.log("auto-Calc: "+auto_calc);
	
	if (auto_calc)  {
		$("#AGRecord :input")
			.on("keyup", cambiaTipo)
			.on("change", cambiaTipo);
		
		$("#incPnt").css('border', function(i,v){return off});
		$("#incPnt").css('background', function(i,v){return "transparent"});
		$("#incBnc").css('border', function(i,v){return off});
		$("#incBnc").css('background', function(i,v){return "transparent"});
		$("#guadFin").css('border', function(i,v){return off});
		$("#guadFin").css('background', function(i,v){return "transparent"});		
		
		calcoli();
	} else {
		$("#AGRecord")
			.off("keyup", ":input", calcoli)
			.off("change", ":input", calcoli);	
			
		$("#AGRecord :input")
			.on("keyup", hidden_input)
			.on("change", hidden_input);
		
		$("#categoria")
			.on("keyup", catChange)
			.on("change", catChange);
			
		$("#AGRecord :input")
			.on("keyup", cambiaTipo)
			.on("change", cambiaTipo);
		
		$("#incPnt").css('border', function(i,v){return on});
		$("#incPnt").css('background', function(i,v){return "#ffffff"});	
		$("#incBnc").css('border', function(i,v){return on});
		$("#incBnc").css('background', function(i,v){return "#ffffff"});
		$("#guadFin").css('border', function(i,v){return on});
		$("#guadFin").css('background', function(i,v){return "#ffffff"});		
	}*/
}

function cambiaTipo() {
	var type = document.getElementById("tipo");

	if (type.value == "Punta-Banca") {
		$("#checkAuto")[0].disabled = false;

		$("label").filter("[for='bk2']")[0].innerHTML = "Exchange:";
		$("label").filter("[for='quotaBnc']")[0].innerHTML = "Quota Banca:";
		$("label").filter("[for='saldoReal_Ex']")[0].innerHTML = "Bancata:";

		$("#bk2")[0].disabled = false;

		$("#saldoReal_Ex")[0].disabled = false;

		$("#quotaBnc")[0].disabled = false;

		$("#comz")[0].disabled = false;

		$("#saldoBonus_Ex")[0].disabled = true;
		$("#saldoBonus_Ex")[0].value = 0;

		$("#bk3")[0].disabled = true;
		$("#bk3")[0].value = "";

		$("#quotaDch")[0].disabled = true;
		$("#quotaDch")[0].value = 0;

		$("#saldoReal_Dc")[0].disabled = true;
		$("#saldoReal_Dc")[0].value = 0;

		$("#saldoBonus_Dc")[0].disabled = true;
		$("#saldoBonus_Dc")[0].value = 0;

		$("label").filter("[for='incBnc']")[0].innerHTML = "da Banca:";

		$("option").filter("#vinceBnc")[0].innerHTML = "Vince Banca";
		$("option").filter("#vinceBnc")[0].disabled = false;

		$("option#vinceDch")[0].disabled = true;

		$("#box_bonusEx").css("display", "none");
		$("#box_comz").css("display", "block");

		$("#incDch")[0].value = "0.00";
		$("#incDch")[0].disabled = true;
		$("#incDch").css("border", "1px solid rgb(255, 255, 255, 0)");
		$("#incDch").css("background", "transparent");

		if (!$("#checkAuto")[0].checked) {
			$("#incPnt")[0].disabled = false;
			$("#incPnt").css("border", "1px solid rgb(187, 187, 187)");
			$("#incPnt").css("background", "#ffffff");

			$("#incBnc")[0].disabled = false;
			$("#incBnc").css("border", "1px solid rgb(187, 187, 187)");
			$("#incBnc").css("background", "#ffffff");
		} else {
			$("#incPnt")[0].disabled = true;
			$("#incPnt").css("border", "1px solid rgb(255, 255, 255, 0)");
			$("#incPnt").css("background", "transparent");

			$("#incBnc")[0].disabled = true;
			$("#incBnc").css("border", "1px solid rgb(255, 255, 255, 0)");
			$("#incBnc").css("background", "transparent");
		}
	} else if (type.value == "Punta-Punta") {
		$("#checkAuto")[0].disabled = false;

		$("label").filter("[for='bk2']")[0].innerHTML = "Bookmaker 2:";
		$("label").filter("[for='quotaBnc']")[0].innerHTML = "Quota contropunta:";
		$("label").filter("[for='saldoReal_Ex']")[0].innerHTML =
			"Saldo contropunta Reale:";

		$("label").filter("[for='incBnc']")[0].innerHTML = "da Contropunta:";
		$("option").filter("#vinceBnc")[0].innerHTML = "Vince Contropunta";

		$("#saldoReal_Ex")[0].disabled = false;
		$("#saldoBonus_Ex")[0].disabled = false;

		$("option#vinceBnc")[0].disabled = false;
		$("option#vinceDch")[0].disabled = true;

		$("#bk2")[0].disabled = false;

		$("#bk3")[0].disabled = true;
		$("#bk3")[0].value = "";

		$("#quotaBnc")[0].disabled = false;
		/*$("#quotaBnc")[0].value = 0;*/

		$("#quotaDch")[0].disabled = true;
		$("#quotaDch")[0].value = 0;

		$("#saldoReal_Dc")[0].disabled = true;
		$("#saldoReal_Dc")[0].value = 0;

		$("#saldoBonus_Dc")[0].disabled = true;
		$("#saldoBonus_Dc")[0].value = 0;

		$("#comz")[0].value = 0;

		$("#box_bonusEx").css("display", "block");
		$("#box_comz").css("display", "none");

		$("#incDch")[0].value = "0.00";
		$("#incDch")[0].disabled = true;
		$("#incDch").css("border", "1px solid rgb(255, 255, 255, 0)");
		$("#incDch").css("background", "transparent");

		if (!$("#checkAuto")[0].checked) {
			$("#incPnt")[0].disabled = false;
			$("#incPnt").css("border", "1px solid rgb(187, 187, 187)");
			$("#incPnt").css("background", "#ffffff");

			$("#incBnc")[0].disabled = false;
			$("#incBnc").css("border", "1px solid rgb(187, 187, 187)");
			$("#incBnc").css("background", "#ffffff");
		} else {
			$("#incPnt")[0].disabled = true;
			$("#incPnt").css("border", "1px solid rgb(255, 255, 255, 0)");
			$("#incPnt").css("background", "transparent");

			$("#incBnc")[0].disabled = true;
			$("#incBnc").css("border", "1px solid rgb(255, 255, 255, 0)");
			$("#incBnc").css("background", "transparent");
		}
	} else if (type.value == "Dutching") {
		$("#checkAuto")[0].disabled = false;

		$("label").filter("[for='bk2']")[0].innerHTML = "Bookmaker 2:";
		$("label").filter("[for='quotaBnc']")[0].innerHTML = "Quota contropunta:";
		$("label").filter("[for='saldoReal_Ex']")[0].innerHTML =
			"Saldo contropunta Reale:";
		$("label").filter("[for='incBnc']")[0].innerHTML = "da Contropunta:";
		$("option").filter("#vinceBnc")[0].innerHTML = "Vince Contropunta";

		$("option#vinceBnc")[0].disabled = false;
		$("option#vinceDch")[0].disabled = false;

		$("#bk2")[0].disabled = false;
		$("#bk3")[0].disabled = false;

		$("#quotaBnc")[0].disabled = false;
		$("#quotaDch")[0].disabled = false;

		$("#saldoReal_Ex")[0].disabled = false;
		$("#saldoBonus_Ex")[0].disabled = false;

		$("#saldoReal_Dc")[0].disabled = false;
		$("#saldoBonus_Dc")[0].disabled = false;
		$("#box_bonusEx").css("display", "block");
		$("#box_comz").css("display", "none");

		if (!$("#checkAuto")[0].checked) {
			$("#incPnt")[0].disabled = false;
			$("#incPnt").css("border", "1px solid rgb(187, 187, 187)");
			$("#incPnt").css("background", "#ffffff");

			$("#incBnc")[0].disabled = false;
			$("#incBnc").css("border", "1px solid rgb(187, 187, 187)");
			$("#incBnc").css("background", "#ffffff");

			$("#incDch")[0].disabled = false;
			$("#incDch").css("border", "1px solid rgb(187, 187, 187)");
			$("#incDch").css("background", "#ffffff");
		} else {
			$("#incPnt")[0].disabled = true;
			$("#incPnt").css("border", "1px solid rgb(255, 255, 255, 0)");
			$("#incPnt").css("background", "transparent");

			$("#incBnc")[0].disabled = true;
			$("#incBnc").css("border", "1px solid rgb(255, 255, 255, 0)");
			$("#incBnc").css("background", "transparent");

			$("#incDch")[0].disabled = true;
			$("#incDch").css("border", "1px solid rgb(255, 255, 255, 0)");
			$("#incDch").css("background", "transparent");
		}
	} else if (type.value == "Altro") {
		$("#checkAuto")[0].checked = false;
		$("#checkAuto")[0].disabled = true;

		$("label").filter("[for='bk2']")[0].innerHTML = "Exchange:";
		$("label").filter("[for='quotaBnc']")[0].innerHTML = "Quota Banca:";
		$("label").filter("[for='saldoReal_Ex']")[0].innerHTML = "Bancata:";

		$("#quotaBnc")[0].value = 0;
		$("#quotaBnc")[0].disabled = true;

		$("#quotaDch")[0].value = 0;
		$("#quotaDch")[0].disabled = true;

		$("#saldoReal_Ex")[0].value = 0;
		$("#saldoReal_Ex")[0].disabled = true;

		$("#saldoReal_Dc")[0].value = 0;
		$("#saldoReal_Dc")[0].disabled = true;

		$("#saldoBonus_Ex")[0].value = 0;
		$("#saldoBonus_Ex")[0].disabled = true;

		$("#saldoBonus_Dc")[0].value = 0;
		$("#saldoBonus_Dc")[0].disabled = true;

		$("#comz")[0].value = 0;
		$("#comz")[0].disabled = true;

		$("#bk2")[0].disabled = true;
		$("#bk3")[0].disabled = true;
		$("#bk2")[0].value = "";
		$("#bk3")[0].value = "";

		/*$("label").filter("[for='incBnc']")[0].innerHTML = "---";
		$("label").filter("[for='incDch']")[0].innerHTML = "---";*/

		$("option#vinceBnc")[0].disabled = true;
		$("option#vinceDch")[0].disabled = true;

		$("#box_bonusEx").css("display", "none");
		$("#box_comz").css("display", "block");

		//$("#incPnt")[0].value = "0.00";
		$("#incPnt")[0].disabled = false;
		$("#incPnt").css("border", "1px solid rgb(187, 187, 187)");
		$("#incPnt").css("background", "#ffffff");

		$("#incBnc")[0].value = "0.00";
		$("#incBnc")[0].disabled = true;
		$("#incBnc").css("border", "1px solid rgb(255, 255, 255, 0)");
		$("#incBnc").css("background", "transparent");

		$("#incDch")[0].value = "0.00";
		$("#incDch")[0].disabled = true;
		$("#incDch").css("border", "1px solid rgb(255, 255, 255, 0)");
		$("#incDch").css("background", "transparent");
	}

	if ($("#checkAuto")[0].checked == true) {
		calcoli();
	}
	if ($("#checkAuto")[0].checked == false) {
		autoCalc();
		tot_calc();
	}
}

function catChange() {
	if ($("#categoria")[0].value == "Match-Bet") {
		$("#tipo")[0].value = "Punta-Banca";
		$("#tipo").change();
		$("#tipo")[0].disabled = false;
	} else if ($("#categoria")[0].value == "Surebet") {
		$("#tipo")[0].value = "Punta-Punta";
		$("#tipo").change();
		$("#tipo")[0].disabled = false;
	} else {
		$("#tipo")[0].value = "Altro";
		$("#tipo").change();
		$("#tipo")[0].disabled = true;
		$("#esito")[0].value = "vincePnt";
	}
}

function catChangeOpn() {
	if ($("#categoria")[0].value == "Match-Bet") {
		//$("#tipo")[0].value = "Punta-Banca";
		//$("#tipo").change();
		$("#tipo")[0].disabled = false;
	} else if ($("#categoria")[0].value == "Surebet") {
		//$("#tipo")[0].value = "Dutching";
		//$("#tipo").change();
		$("#tipo")[0].disabled = false;
	} else {
		$("#tipo")[0].value = "Altro";
		$("#tipo").change();
		$("#tipo")[0].disabled = true;
		$("#esito")[0].value = "vincePnt";
	}
}

function catChange_OLD() {
	var categ = document.getElementById("categoria").value;

	if (categ != "Match-Bet" && categ != "Surebet") {
		document.getElementById("checkAuto").checked = false;
		// autoCalc();

		document.getElementById("tipo").value = "";
		document.getElementById("tipo").disabled = true;
		document.getElementById("bk2").disabled = true;
		document.getElementById("bk3").disabled = true;
		document.getElementById("saldoReal_Ex").disabled = true;
		document.getElementById("saldoReal_Ex_h").value = 0;
		document.getElementById("saldoBonus_Ex").disabled = true;
		document.getElementById("saldoBonus_Ex_h").value = 0;
		document.getElementById("saldoReal_Dc").disabled = true;
		document.getElementById("saldoReal_Dc_h").value = 0;
		document.getElementById("saldoBonus_Dc").disabled = true;
		document.getElementById("saldoBonus_Dc_h").value = 0;
		document.getElementById("quotaPnt").disabled = true;
		document.getElementById("quotaPnt_h").value = 0;
		document.getElementById("quotaBnc").disabled = true;
		document.getElementById("quotaBnc_h").value = 0;
		document.getElementById("quotaDch").disabled = true;
		document.getElementById("quotaDch_h").value = 0;
		document.getElementById("comz").disabled = true;
		document.getElementById("comz_h").value = 0;
		document.getElementById("checkAuto").disabled = true;
		$("#AGRecord div #middle-field legend")[0].innerHTML = "Dati della Giocata";
		$("label").filter(" [for='match']")[0].innerHTML = "Gioco:";
		$("label").filter(" [for='dataMatch']")[0].innerHTML =
			"Data della giocata:";
		$("#esito")[0].disabled = true;

		/* $("#AGRecord :input")
				.off("keyup", hidden_input)
				.off("change", hidden_input); */
	} else {
		if ($("#tipo")[0].value == "Dutching") {
			document.getElementById("bk3").disabled = false;
			document.getElementById("saldoReal_Dc").disabled = false;
			document.getElementById("saldoBonus_Dc").disabled = false;
			document.getElementById("quotaDch").disabled = false;
		} else {
			document.getElementById("bk3").disabled = true;
			document.getElementById("saldoReal_Dc").disabled = true;
			document.getElementById("saldoBonus_Dc").disabled = true;
			document.getElementById("quotaDch").disabled = true;
		}

		document.getElementById("tipo").disabled = false;
		document.getElementById("bk2").disabled = false;
		document.getElementById("saldoReal_Ex").disabled = false;
		document.getElementById("saldoBonus_Ex").disabled = false;
		document.getElementById("quotaPnt").disabled = false;
		document.getElementById("quotaBnc").disabled = false;
		document.getElementById("comz").disabled = false;
		document.getElementById("checkAuto").disabled = false;
		$("#AGRecord div #middle-field legend")[0].innerHTML =
			"Dati della Scommessa";
		$("label").filter(" [for='match']")[0].innerHTML = "Partita:";
		$("label").filter(" [for='dataMatch']")[0].innerHTML =
			"Data della partita:";
		$("#esito")[0].disabled = false;

		/* $("#AGRecord :input")
				.on("keyup", hidden_input)
				.on("change", hidden_input); */
	}

	// $("#tipo").change();
	cambiaTipo();
	autoCalc();
}

function input_zeroIfNull(orig, dest, callback) {
	if (!orig.value || orig.value == "NaN") {
		dest.value = 0;
	} else {
		dest.value = callback(orig.value);
	}
}

function zeroIfNull(val) {
	if (!val || val == "NaN") {
		return 0;
	} else {
		return val;
	}
}

function allthesame(i) {
	return i;
}

function toggleDati() {
	$("#autocalc").toggle();
	$(".middleTop").toggle();
	$(".middleMid").toggle();
	$(".middleBot").toggle();
	$("legend.legendBtn > i").toggleClass("down").toggleClass("up");

	var iframeWin = parent.document.getElementById("iframePBm");
	if (iframeWin != undefined) iframeWin.height = document.body.scrollHeight + 6;
}
