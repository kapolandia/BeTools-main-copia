
var ag_table;
var betdata = {};

//var linktool;
//var UA = navigator.appVersion;
//console.log(UA);

/* $.fn.dataTableExt.afnFiltering.push( function(Settings, Dati, Index) {
		
		if (!$("#mioBook")[0].value) {
			return true;
		} else if (Dati[5].match(new RegExp ($("#mioBook")[0].value, "i")) || Dati[6].match(new RegExp ($("#mioBook")[0].value, "i")) || Dati[7].match(new RegExp ($("#mioBook")[0].value, "i"))) {
			return true;
		} else {
			return false;
		}
    });
	
$.fn.dataTableExt.afnFiltering.push( function(Settings, Dati, Index) {
	
	if (!$("#dataMin")[0].value) {
		return true;
	} else if (Dati[0] >= $("#dataMin")[0].value) {
		return true;
	} else {
		return false;
	}
});

$.fn.dataTableExt.afnFiltering.push( function(Settings, Dati, Index) {
	
	if (!$("#dataMax")[0].value) {
		return true;
	} else if (Dati[0] <= $("#dataMax")[0].value) {
		return true;
	} else {
		return false;
	}
});

$.fn.dataTableExt.afnFiltering.push( function(Settings, Dati, Index) {
	
	if (!$("#fltCategoria")[0].value) {
		return true;
	} else if (Dati[1] == $("#fltCategoria")[0].value) {
		return true;
	} else {
		return false;
	}
});

$.fn.dataTableExt.afnFiltering.push( function(Settings, Dati, Index) {
	
	if (!$("#fltTipo")[0].value) {
		return true;
	} else if (Dati[2] == $("#fltTipo")[0].value) {
		return true;
	} else {
		return false;
	}
});

$.fn.dataTableExt.afnFiltering.push( function(Settings, Dati, Index) {
	
	if (!$("#fltTipo")[0].value) {
		return true;
	} else if (Dati[2] == $("#fltTipo")[0].value) {
		return true;
	} else {
		return false;
	}
});

$.fn.dataTableExt.afnFiltering.push( function(Settings, Dati, Index) {
	
	if ($("#radioEnd input[name='timeStatus']:checked").val()== "all") {
		return true;
	} else if (Dati[9] === $("#radioEnd input[name='timeStatus']:checked").val()) {
		return true;
	} else {
		return false;
	}
});
 */
$(document).ready ( function() {
	
	autoCalc();
	hidden_input();
	hidden_input_TOT();
	tot_calc();
	
	$("#AGRecord").mark("BONUS");
	
 	/*if (UA.includes("iPhone")) {
		var device = "iPhone";
		linktool = "http://www.tuttosport.com";
	} else {
		var device = "device";
		linktool = "http://www.ansa.it";
	} */
	
	//$('#examplink').attr("href", linktool);
	//$('#ua').html(device);
	
	// AGGIUNTA DROPDOWN ACCOUNT 2019-12-16
	$("#acc_list_drop").on('change', function() {
		if($("#acc_list_drop").val() != '') {
			$("#myAcc_name").val($("#acc_list_drop").val());
		} else {
			$("#myAcc_name").val('');
		}
	});
	
	$("#myAcc_name").on('change', function() {
		if($("#myAcc_name").val() != '' && $("#acc_list_drop option[value='" + $("#myAcc_name")[0].value + "]").length > 0) {
			$("#acc_list_drop").val($("#myAcc_name").val());
		} else {
			$("#acc_list_drop").val(null);
		}
	});	
	// FINE AGGIUNTA DROPDOWN ACCOUNT 2019-12-16
	
	$("#AGModalCalc :input").filter('[value="gg/mm/aaaa hh:mm"]').inputmask("99/99/9999 h99:99");
	
	$('#AGModalCalc').on('show.bs.modal', function (evt) {
		if (evt.relatedTarget) {
			//console.log(evt.relatedTarget.innerHTML);
			$(".salva-footer").css("display", "flex");
			$(".update-footer").css("display", "none");
			var note_txt ="cod. AAMS multipla: " + "\n" + "Altre note: " + "\n";
			document.getElementById('note').value = note_txt;
		} else {
			//console.log("no event");
			$(".salva-footer").css("display", "none");
			$(".update-footer").css("display", "flex");
		}
		$("#tipo").keyup();
		insertToday(document.getElementById('dataIN'));
		document.getElementById('tipo').disabled = false;
		setTimeout (function () {
			document.getElementById('checkAuto').checked = false;
			document.getElementById('checkAuto').disabled = true;
			autoCalc();
			
			setTimeout (populate(), 300);
		}, 300);
		
	});
	
	$('#AGModalCalc').on('hidden.bs.modal', function () {
		//$("#AGModalCalc").remove();
		//$('body').append(modalbackup);
		$(this).find('form').trigger('reset');
		$("#guadFin")[0].innerHTML="0.00";
		$("#AGRecord #finished").removeClass("on");
	});
	
	//document.getElementById('checkAuto').checked = true;
	
	$("#esito")
		.keyup(calcoli)
		.change(calcoli);
	
	$("#AGRecord .calcoli:input")
		.keyup(calcoli)
		.change(calcoli);
	
	$("#checkAuto")
		.keyup(auto_hide)
		.change(auto_hide);
		
	$("#AGRecord .calcoli:input")
		.keyup(hidden_input)
		.change(hidden_input);
	
	$("#AGRecord .calcoli:input")
		.keyup(hidden_input_TOT)
		.change(hidden_input_TOT);
	
	$("#AGRecord .calcoli:input")
		.keyup(tot_calc)
		.change(tot_calc);


	
 	$("#tipo")
		.keyup(cambiaTipo)
		.change(cambiaTipo);
		
	/*$("#AGRecord :input")
		.keyup(hidden_input)
		.change(hidden_input);
		
	$("#AGRecord :input")
		.keyup(hidden_input_TOT)
		.change(hidden_input_TOT);
	
/* 	$("#AGRecord :input")
		.keyup(tot_calc)
		.change(tot_calc); */
	
 	$("#categoria")
		.keyup(catChange)
		.change(catChange);

	/*$("#esito")
		.change(cambiaTipo)
		.keyup(cambiaTipo);
		
	$("#tipo")
		.change(cambiaTipo)
		.keyup(cambiaTipo); */

	//$("#categoria").keyup()
});

function insertToday (tag) {
	bt_oggi = new Date();
	
	var bt_mm = bt_oggi.getMinutes();
	if (bt_mm <10) {
		bt_mm = "0" + bt_mm;
	} else {
		bt_mm = "" + bt_mm;
	}
	
	var bt_hh = bt_oggi.getHours();
	if (bt_hh <10) {
		bt_hh = "0" + bt_hh;
	} else {
		bt_hh = "" + bt_hh;
	}
	
	var bt_gg = bt_oggi.getDate();
	if (bt_gg <10) {
		bt_gg = "0" + bt_gg;
	} else {
		bt_gg = "" + bt_gg;
	}
	
	var bt_mth = bt_oggi.getMonth()+1;
	if (bt_mth <10) {
		bt_mth = "0" + bt_mth;
	} else {
		bt_mth = "" + bt_mth;
	}
	
	var bt_yr = bt_oggi.getFullYear();
	
	var insT = moment(bt_oggi).format("DD/MM/gggg [h]HH:mm");
	
	// var insT = bt_yr + "-" + bt_mth + "-" + bt_gg + "T" + bt_hh + ":" + bt_mm;
	//console.log(insT);
	
	tag.value = insT;
}

function salvaRiga() {
	
	$("#AGRecord").find('input[name]').each(function(index, node) {
		if (node.type == "checkbox") {
			betdata[node.name] = node.checked;
		} else {
			betdata[node.name] = node.value;
		}
	});

	$("#AGRecord").find('select[name]').each(function(index, node) {
		betdata[node.name] = node.value;
	});
	
	$("#AGRecord").find('textarea[name]').each(function(index, node) {
		betdata[node.name] = node.value;
	});
	
	console.log(betdata);
	
	$.ajax({
		type: "POST",
		url: "/abb_PREMIUM/agenda/profit_boh.php",
		data: betdata,
		dataType: "json",
		//processData: false,
		//contentType: false,
		success: [

			function(Lmesg, Lstatus, LResponse) {
				//console.log(Lmesg);
				if (Lmesg["mess"] !== "") {
					if (Lmesg["titolo"].search("ATTENZIONE") != -1){
						$("#loadListBox_msg").addClass("red");
					} else {
						$("#loadListBox_msg").removeClass("red");
					}
					document.getElementById("loadListHeader").innerHTML = Lmesg["titolo"];
					document.getElementById("loadListContent").innerHTML = Lmesg["mess"];
					
					$('.first.myLoad.modal#LOAD_dlg').addClass('tiny');
					
					$('.first.myLoad.modal#LOAD_dlg')
						.modal ({
							onHidden: function() {
								$('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
								$("#loadListBox_msg").removeClass("red");
							}
						})
						.modal('show');
				}
			},//ag_table.ajax.reload()
			
			function() {
				$("#AGModalCalc").css("display","none");
				//$("#formPunta").modal("hide");
				$("#shrinkMe").css("display","block");
			},
			// AGGIUNTA DROPDOWN ACCOUNT 2019-12-16
			function() {	
				$.ajax({
					url: 'php/profit_acc.php',
					type: 'post',
					dataType: 'json',
					success:function(response) {

						var len = response.length;

						$("#acc_list_drop").empty();
						$("#acc_list_drop").append("<option value=''></option>");
						for(var i = 0; i<len; i++) {
							var name = response[i]['bt_ACCname'];
							$("#acc_list_drop").append("<option value='"+ name +"'>" + name + "</option>");

						}
					}
				});	
			}
			// FINE AGGIUNTA DROPDOWN ACCOUNT
		],
		
		error: function (xhr, status, error) {
			alert(xhr.responseText);
		}
	});

}

function populate() {
	//moment.locale("it");
	//$("#dataIN")[0].value = moment().locale("it").format("DD/MM/YYYY LT");
	$("#myAcc_name").val(null); //AGGIUNTA DROPDOWN ACCOUNT 2019-12-16
	$("#categoria")[0].value = "Match-Bet";
	$("#tipo")[0].value = "Punta-Banca";
	$("#match")[0].value = "MULTIPLA" ;
	//$("#market")[0].value = $("#home")[0].innerHTML;
	//var dt = moment("#dateH_M1").format("YYYY/MM/DD LT").split(" ")[0];
	//var tm = moment("#dateH_M1").format("YYYY/MM/DD LT").split(" ")[1];
	//var dt = $("#data1")[0].value.split(" ")[0];
	//var tm = $("#data1")[0].value.split(" ")[1];
	var dt = $("#dateH_M1").val();
	$("#dataMatch")[0].value = dt;
	
	//var dataEV = dt.split("/")[2]+dt.split("/")[1]+dt.split("/")[0];
	//var tempoEV = tm.split(":")[0]+tm.split(":")[1];
	
	//$("#dataMatch")[0].value = dataEV + tempoEV;
	
	$("#bk1").attr('placeholder', '(inserisci nome Book)');
	//$("#bk2")[0].value = $("#thisisExch")[0].innerHTML;
	$("#quotaPnt")[0].value = $("#qTot_div")[0].innerHTML.replace(/@/g,"");
	
	
	if(WOW == true || DEFEAT == true) {
		console.log("finita: SI");
		//$("#incPnt")[0].value = ENDGain; //comment. 25/10/2019 h18:06 correzione guadagno Ag.Online
		
		// AGGIUNTA 25/10/2019 h18:06 correzione guadagno Ag.Online
		if(WOW == true) {
			$("#incPnt")[0].value = ENDGain;
		} else if(DEFEAT == true) {
			if(rimboType == 0) {
				$("#incPnt")[0].value = (parseFloat(ENDGain)-rimborso);
			} else if(rimboType == 1 && n_perse == 1) {
				$("#incPnt")[0].value = (parseFloat(ENDGain)-rimborso);
			} else {
				$("#incPnt")[0].value = ENDGain;
			}
		}
		// FINE AGGIUNTA 25/10/2019 h18:06 correzione guadagno Ag.Online
		
		$("#checkOpn").prop('checked',true);
		auto_hide();
	} else {
		console.log("finita: NO");
		$("#incPnt")[0].value = parseFloat($("#Grid_StartGain_span")[0].innerHTML.replace(/€/,''));
	}
	
	$("[id*=statusResults].badgeOnGo.lightMe.theEnd:hidden")
	//$("#quotaBnc")[0].value = $("#q2")[0].innerHTML;
	
	//$("#saldoReal_Bk")[0].value = parseFloat($("#mult_lamiapuntata")[0].value,2);
	if ($("#mult_ilmiobonus").val()) {
		$("#saldoReal_Bk")[0].value = parseFloat($("#mult_lamiapuntata")[0].value,2)- parseFloat($("#mult_ilmiobonus")[0].value,2);
		$("#saldoBonus_Bk")[0].value = parseFloat($("#mult_ilmiobonus")[0].value,2);
	} else {
		$("#saldoReal_Bk")[0].value = parseFloat($("#mult_lamiapuntata")[0].value,2);
		$("#saldoBonus_Bk")[0].value = 0;
	}
	//$("#saldoReal_Ex")[0].value = parseFloat($("#pp2")[0].innerHTML,2);
	//$("#comz")[0].value = $("#commissione")[0].value;
	$("#incPnt").keyup();
}


function aprimaschera() {
	// AGGIUNTA DROPDOWN ACCOUNT 2019-12-16
	$.ajax({
		url: 'php/profit_acc.php',
		type: 'post',
		dataType: 'json',
		success:function(response) {

			var len = response.length;

			$("#acc_list_drop").empty();
			$("#acc_list_drop").append("<option value=''></option>");
			for(var i = 0; i<len; i++) {
				var name = response[i]['bt_ACCname'];
				$("#acc_list_drop").append("<option value='"+ name +"'>" + name + "</option>");

			}
		}
	});
	// FINE AGGIUNTA DROPDOWN ACCOUNT
	$("#shrinkMe").css("display", "none");
	$("#AGModalCalc").css("display", "block");
	$(".salva-footer").css("display", "flex");
	$(".update-footer").css("display", "none");
	var note_txt ="cod. AAMS" + ":" + "\n" + "Altre note: " + "\n";
	document.getElementById('note').value = note_txt;
	
	$("#tipo").keyup();
	insertToday(document.getElementById('dataIN'));
	document.getElementById('tipo').disabled = false;
	setTimeout (function () {
		document.getElementById('checkAuto').checked = false;
		document.getElementById('checkAuto').disabled = true;
		$("#checkAuto_h")[0].value = 0 // AGGIUNTA 26/08/2019 8:51
		autoCalc();
		
		setTimeout (populate(), 300);
	}, 300);
	
	//populate();
	//insertToday(document.getElementById('dataIN'));
	//document.getElementById('tipo').disabled = false;
	//document.getElementById('checkAuto').checked = true;
	//document.getElementById('checkAuto').disabled = false;
	//autoCalc();
	$("#tipo").keyup();
}

function chiudimaschera() {
	$("#shrinkMe").css("display", "block");
	$("#AGModalCalc").css("display", "none");
	$("#AGModalCalc").find('form').trigger('reset');
	$("#guadFin")[0].innerHTML="0.00";
	$("#AGRecord #finished").removeClass("on");
}