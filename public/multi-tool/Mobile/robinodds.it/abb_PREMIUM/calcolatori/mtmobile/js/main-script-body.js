/** @format */

/////////////////////////////////////////////////////////////////////////////
//

const stat2 = ["P", "VP", "VV"];
const stat3 = ["P", "VP", "VVP", "VVV"];
const stat4 = ["P", "VP", "VVP", "VVVP", "VVVV"];
const stat5 = ["P", "VP", "VVP", "VVVP", "VVVVP", "VVVVV"];

const stDoppia = ["VV", "VP", "PV", "PP"];
const stTripla = ["VVV", "VVP", "VPV", "VPP", "PVV", "PVP", "PPV", "PPP"];

var arrPartite = ["#1", "#2", "#3", "#4", "#5"];
var theEnd = false;

var allgridrows = $(".grid_row_5").add($("#riga_tabRisult_M5")).add($(".grid_Risult_M5")).add($(".grid_row_4")).add($("#riga_tabRisult_M4")).add($(".grid_Risult_M4")).add($(".grid_row_3")).add($("#riga_tabRisult_M3")).add($(".grid_Risult_M3")).add($(".grid_row_2")).add($("#riga_tabRisult_M2")).add($(".grid_Risult_M2")).add($(".grid_row_1")).add($("#riga_tabRisult_M1")).add($(".grid_Risult_M1")).add($(".badgeOnGo.statusSet[myindex=0]")).add($(".badgeOnGo.statusSet[myindex=1]")).add($(".badgeOnGo.statusSet[myindex=2]")).add($(".badgeOnGo.statusSet[myindex=3]")).add($(".badgeOnGo.statusSet[myindex=4]")).add($(".badgeOnGo.statusSet[myindex=5]")).add($("#flexmatch_5")).add($("#flexmatch_4")).add($("#flexmatch_3")).add($("#flexmatch_2")).add($("#flexmatch_1"));
var less_3 = $(".grid_row_5").add($("#riga_tabRisult_M5")).add($(".grid_rigaAgg_5")).add($(".grid_Risult_M5")).add($(".grid_row_4")).add($("#riga_tabRisult_M4")).add($(".grid_rigaAgg_4")).add($(".grid_Risult_M4")).add($(".grid_row_3")).add($("#riga_tabRisult_M3")).add($(".grid_rigaAgg_3")).add($(".grid_Risult_M3")).add($(".badgeOnGo.statusSet[myindex=4]")).add($(".badgeOnGo.statusSet[myindex=3]")).add($(".badgeOnGo.statusSet[myindex=2]")).add($("#flexmatch_5")).add($("#flexmatch_4")).add($("#flexmatch_3"));
var less_2 = $(".grid_row_5").add($("#riga_tabRisult_M5")).add($(".grid_rigaAgg_5")).add($(".grid_Risult_M5")).add($(".grid_row_4")).add($("#riga_tabRisult_M4")).add($(".grid_rigaAgg_4")).add($(".grid_Risult_M4")).add($(".badgeOnGo.statusSet[myindex=4]")).add($(".badgeOnGo.statusSet[myindex=3]")).add($("#flexmatch_5")).add($("#flexmatch_4"));
var less_1 = $(".grid_row_5").add($("#riga_tabRisult_M5")).add($(".grid_rigaAgg_5")).add($(".grid_Risult_M5")).add($(".badgeOnGo.statusSet[myindex=4]")).add($("#flexmatch_5"));

var all_radioBox = $(".box_M5 input").add($(".box_M4 input")).add($(".box_M3 input")).add($(".box_M2 input")).add($(".box_M1 input"));
var less_3_radioBox = $(".box_M5 input").add($(".box_M4 input")).add($(".box_M3 input"));
var less_2_radioBox = $(".box_M5 input").add($(".box_M4 input"));
var less_1_radioBox = $(".box_M5 input");

var all_checkBoxA = $(".box_M5 #radioA_M5").add($(".box_M4 #radioA_M4")).add($(".box_M3 #radioA_M3")).add($(".box_M2 #radioA_M2")).add($(".box_M1 #radioA_M1"));
var less_3_checkBoxA = $(".box_M5 #radioA_M5").add($(".box_M4 #radioA_M4")).add($(".box_M3 #radioA_M3"));
var less_2_checkBoxA = $(".box_M5 #radioA_M5").add($(".box_M4 #radioA_M4"));
var less_1_checkBoxA = $(".box_M5 #radioA_M5");

myDef
  .done(JsonToForm)
  .done(refill_hedge)
  .done(keiap)
  .done(loopState, checkLosing, resetDef, function () {
    $('.first.myLoad.modal#LOAD_dlg')
      .modal('hide');
  })
  .done($("#abb_New0_M1").keyup())
  .done($("#abb_New0_M2").keyup())
  .done($("#abb_New0_M3").keyup())
  .done($("#abb_New0_M4").keyup())
  .done($("#abb_New0_M5").keyup())
  .done(lighter)
  .done(isOpen)
  .done($("input[id*='radioV']").change())
  .done($("input[id*='radioP']").change())
  .done($('#myBlockcheck').change());

/* var allgridrows = $(".grid_row_5").add($(".grid_row_4")).add($(".grid_row_3")).add($(".grid_row_2")).add($(".grid_row_1"));
var less_3 = $(".grid_row_5").add($(".grid_row_4")).add($(".grid_row_3"));
var less_2 = $(".grid_row_5").add($(".grid_row_4"));
var less_1 = $(".grid_row_5"); */

var less_3_input = $(".grid_row_5 input[type!='radio']").add($(".grid_row_4 input[type!='radio']")).add($(".grid_row_3 input[type!='radio']"));
var less_2_input = $(".grid_row_5 input[type!='radio']").add($(".grid_row_4 input[type!='radio']"));
var less_1_input = $(".grid_row_5 input[type!='radio']");
/* var less_3_input = $(".grid_row_5 input").add($(".grid_row_4 input")).add($(".grid_row_3 input"));
var less_2_input = $(".grid_row_5 input").add($(".grid_row_4 input"));
var less_1_input = $(".grid_row_5 input"); */

var idx, base, base_input;

function which_hide(hm) {
  idx = 5 - hm;
  base = "less_" + idx;
  base_input = "less_" + idx + "_input";
  base_radioBox = "less_" + idx + "_radioBox";
  base_checkBoxA = "less_" + idx + "_checkBoxA";

  $("#status_VVVVV")[0].innerHTML = victoryString(hm);

  switch (hm) {
    case "2":
      $("i#iconB_M3").addClass('down').removeClass('up');
      $("i#iconB_M4").addClass('down').removeClass('up');
      $("i#iconB_M5").addClass('down').removeClass('up');
      /* $('#rigaAgg_3 input[type=text]').val('');
      $('#abb_New0_M3').keyup();
      $('#rigaAgg_4 input[type=text]').val('');
      $('#abb_New0_M4').keyup();
      $('#rigaAgg_5 input[type=text]').val('');
      $('#abb_New0_M5').keyup(); */
      $("#grigliaSV_doppia").show();
      $("#grigliaSV_tripla").hide();
      $("#grigliaSV_quadrupla").hide();
      $("#grigliaSV_quintupla").hide();
      break;
    case "3":
      $("i#iconB_M4").addClass('down').removeClass('up');
      $("i#iconB_M5").addClass('down').removeClass('up');
      /* $('#rigaAgg_4 input[type=text]').val('');
      $('#abb_New0_M4').keyup();
      $('#rigaAgg_5 input[type=text]').val('');
      $('#abb_New0_M5').keyup(); */
      $("#grigliaSV_doppia").hide();
      $("#grigliaSV_tripla").show();
      $("#grigliaSV_quadrupla").hide();
      $("#grigliaSV_quintupla").hide();
      break;
    case "4":
      $("i#iconB_M5").addClass('down').removeClass('up');
      /* $('#rigaAgg_5 input[type=text]').val('');
      $('#abb_New0_M5').keyup(); */
      $("#grigliaSV_doppia").hide();
      $("#grigliaSV_tripla").hide();
      $("#grigliaSV_quadrupla").show();
      $("#grigliaSV_quintupla").hide();
  }

  resetDetails(hm);

  /*var arrSt = "stat"+hm;
  for(k=0;k<=hm;k++) {	
    $(".badgeOnGo.statusSet[myindex=" + k + "]")[0].innerHTML = eval(arrSt)[k];
  } */
  for (i = 0; i < eval(base_input).length; ++i) {
    eval(base_input)[i].value = "";
    /* eval(base).hide();
    eval(base_checkBoxA).prop("checked",true);
    $(all_checkBoxA).change();
    eval(base_radioBox).prop("disabled",true); */
    ricalcola();
  }

  eval(base).hide();
  eval(base_checkBoxA).prop("checked", true);
  $(base_checkBoxA).change();
  eval(base_radioBox).prop("disabled", true);
}

function showtutto() {
  allgridrows.show();
  for (k = 0; k < 6; k++) {
    $(".badgeOnGo.statusSet[myindex=" + k + "]")[0].innerHTML = stat5[k];
  }
  all_radioBox.prop("disabled", false);
  all_checkBoxA.prop("checked", true);
  all_checkBoxA.change();
  $("#grigliaSV_doppia").hide();
  $("#grigliaSV_tripla").hide();
  $("#grigliaSV_quadrupla").hide();
  $("#grigliaSV_quintupla").show();

  ricalcola();
}

function radio_manage(M_num, type) {
  console.log("GESTIONE RADIO... MATCH: " + M_num + "... TYPE: " + type);
  var l = $("#mult_quantieventi")[0].value;
  console.log(l);
  for (var i = 1; i <= l; i++) {
    console.log("i: " + i);
    var btn_elem = "#button_M" + i;
    var box_elem = ".box_M" + i + " input";
    var chk_elem = ".box_M" + i + " #radioA_M" + i;
    if (type == "V" && M_num == (i - 1)) {
      var questo = eval(i);
      console.log("indice attivo: " + questo);
      console.log("boxElementActive:" + box_elem);
      $(box_elem).prop("disabled", false);
      console.log("buttonElementActive:" + btn_elem);

      $(btn_elem).attr("type", "button");
      $(btn_elem).on('click', function () {
        abilitaBtn(questo);
      });
    } else if (i > M_num) {
      $(box_elem).prop("disabled", true);
      $(chk_elem).prop("checked", true);
      $(btn_elem).attr("type", "button disabled");
      $(btn_elem).off('click');
    }
  }

}

function CP_teorica(M_num) {
  //var startSum_elem = "#lay_tabRisult_" + M_num;
  //var startSum = DolToMath(ret_doll($(startSum_elem).html()));
  var startSum = eval("benchB" + M_num.substr(-1)); // MODIFICA PER 1 Perdente

  var startOdd_elem = "#qb_tabRisult_" + M_num;
  var startOdd = qbToMath(ret_qb($(startOdd_elem).html()));
  var refComz = norm_com($("#mult_lamiacommissione").val()) / 100;
  var begin = startSum * (startOdd - refComz);
  //console.log("INIZIO: " + begin);
  for (i = 0; i < 6; i++) {
    var abb_elem = "#abb_New" + i + "_" + M_num;
    var com_elem = "#comm_New" + i + "_" + M_num;
    var odd_elem = "#quotaB_New" + i + "_" + M_num;
    if ($(abb_elem)[0].nodeName == "INPUT") {
      var loop_abb = DolToMath($(abb_elem).val());
    } else {
      var loop_abb = DolToMath($(abb_elem).html());
    }

    if ($(com_elem)[0].nodeName == "INPUT") {
      if ($(com_elem).val() != "") {
        var loop_com = norm_com($(com_elem).val()) / 100;
      } else {
        var loop_com = refComz;
      }
    } else {
      var loop_com = norm_com($(com_elem).html()) / 100;
    }

    if ($(odd_elem)[0].nodeName == "INPUT") {
      var loop_odd = qbToMath($(odd_elem).val());
    } else {
      var loop_odd = qbToMath($(odd_elem).html());
    }

    begin = begin - (loop_abb * (loop_odd - loop_com));
    var endCP_elm = "#provaCP_Q_" + M_num;
    var endDCH1_elm = "#provaDCH1_Q_" + M_num;
    var endDCH2_elm = "#provaDCH2_Q_" + M_num;
    var endCP = (begin / qbToMath($(endCP_elm).val()));
    var endDCH1 = (begin / qbToMath($(endDCH1_elm).val()));
    var endDCH2 = (begin / qbToMath($(endDCH2_elm).val()));
    //console.log(loop_abb);
    //console.log(loop_com);
    //console.log(loop_odd);
  }
  //console.log("FINE: " + end);
  var boxInfoCP_elem = "#boxInfoCP_" + M_num;
  var infoCP_elem = "#info_CP1_" + M_num;
  var infoCPOdd_elem = "#info_qCP1_" + M_num;
  var CPOdd_elem = "#provaCP_Q_" + M_num;
  if ($(endCP_elm).val()) {
    //console.log("eccerto!" +i);
    var contOfTheCPBox = 'copertura completa con:</br>👉 <span class="" id="info_CP1_' + M_num + '">' +
      endCP.toFixed(2) + "€" +
      '</span> 👈';
    $(boxInfoCP_elem).html(contOfTheCPBox);
  } else {
    var contOfTheCPBox = 'inserisci una quota';
    $(boxInfoCP_elem).html(contOfTheCPBox);
  }
  //$(infoCP_elem).html(endCP.toFixed(3) + "€");

  var boxInfoDCH1_elem = "#boxInfoDCH1_" + M_num;
  var infoDCH1_elem = "#info_DCH1_" + M_num;
  var infoDCH1Odd_elem = "#info_qCP1_" + M_num;
  var DCH1Odd_elem = "#provaDCH1_Q_" + M_num;
  if ($(endDCH1_elm).val()) {
    var contOfTheDCH1Box = 'copertura completa con:</br>👉 <span class="" id="info_DCH1_' + M_num + '">' +
      endDCH1.toFixed(2) + "€" +
      '</span> 👈';
    $(boxInfoDCH1_elem).html(contOfTheDCH1Box);
  } else {
    var contOfTheDCH1Box = 'inserisci una quota';
    $(boxInfoDCH1_elem).html(contOfTheDCH1Box);
  }
  //$(infoDCH1_elem).html(endDCH1.toFixed(3) + "€");

  var boxInfoDCH2_elem = "#boxInfoDCH2_" + M_num;
  var infoDCH2_elem = "#info_DCH2_" + M_num;
  var infoDCH2Odd_elem = "#info_qCP1_" + M_num;
  var DCH2Odd_elem = "#provaDCH2_Q_" + M_num;
  if ($(endDCH2_elm).val()) {
    var contOfTheDCH2Box = 'copertura completa con:</br>👉 <span class="" id="info_DCH2_' + M_num + '">' +
      endDCH2.toFixed(2) + "€" +
      '</span> 👈';
    $(boxInfoDCH2_elem).html(contOfTheDCH2Box);
  } else {
    var contOfTheDCH2Box = 'inserisci una quota';
    $(boxInfoDCH2_elem).html(contOfTheDCH2Box);
  }
  //$(infoDCH2_elem).html(endDCH2.toFixed(3) + "€");

  var cfr_layOdd_Box = "#optimalOddBox_" + M_num;
  var cfr_lay_elem = "#cfrOdd_" + M_num;
  if ($(endCP_elm).val() && $(endCP_elm).val() > 1) {
    $(cfr_layOdd_Box).show();
    var cfr_layOdd = (qbToMath($(endCP_elm).val()) - refComz) / (qbToMath($(endCP_elm).val()) - 1);
    $(cfr_lay_elem).html("@" + cfr_layOdd.toFixed(3));
  } else {
    $(cfr_layOdd_Box).hide();
    var cfr_layOdd = "";
    $(cfr_lay_elem).html("---");
  }

  var cfr_DCH_Box = "#optimalDCHBox_" + M_num;
  var cfr_DCH_elem = "#cfrDCH_" + M_num;
  var DCH1Odd = qbToMath($(DCH1Odd_elem).val());
  var DCH2Odd = qbToMath($(DCH2Odd_elem).val());
  var DCH1_dol_elm = "#info_DCH1_" + M_num;
  var DCH2_dol_elm = "#info_DCH2_" + M_num;
  var DCH1_dol = Math.round(DolToMath($(DCH1_dol_elm).html()));
  var DCH2_dol = Math.round(DolToMath($(DCH2_dol_elm).html()));
  var winDCH1 = DCH1Odd * DCH1_dol;
  var winDCH2 = DCH2Odd * DCH2_dol;
  var minWinDCH = Math.min(winDCH1, winDCH2);
  var DCH_eq_ODD = (minWinDCH) / (DCH1_dol + DCH2_dol);

  if ($(endDCH1_elm).val() && $(endDCH1_elm).val() > 1 && $(endDCH2_elm).val() && $(endDCH2_elm).val() > 1) {
    $(cfr_DCH_Box).show();
    var cfr_DCHOdd = (DCH_eq_ODD - refComz) / (DCH_eq_ODD - 1);
    $(cfr_DCH_elem).html("@" + cfr_DCHOdd.toFixed(3));
  } else {
    $(cfr_DCH_Box).hide();
    var cfr_DCHOdd = "";
    $(cfr_DCH_elem).html("---");
  }
}

/* function CP_teorica (M_num) {
  var startSum_elem = "lay_tabRisult_" + M_num;
  var startSum = DolToMath(ret_doll(eval(startSum_elem).innerHTML));
  var startOdd_elem = "qb_tabRisult_" + M_num;
  var startOdd = qbToMath(ret_qb(eval(startOdd_elem).innerHTML));
  var refComz = norm_com($("#mult_lamiacommissione")[0].value)/100;
  var begin = startSum * (startOdd - refComz);
  //console.log("INIZIO: " + begin);
  for (i=0; i<6; i++) {
    var abb_elem = "abb_New" + i + "_" + M_num;
    var com_elem = "comm_New" + i + "_" + M_num;
    var odd_elem = "quotaB_New" + i + "_" + M_num;
    if ($(eval(abb_elem))[0].nodeName == "INPUT") {
      var loop_abb = DolToMath($(eval(abb_elem))[0].value);
    } else {
      var loop_abb = DolToMath($(eval(abb_elem))[0].innerHTML);
    }
  	
    if ($(eval(com_elem))[0].nodeName == "INPUT") {
      if ($(eval(com_elem))[0].value != "") {
        var loop_com = norm_com($(eval(com_elem))[0].value)/100;
      } else {
        var loop_com = refComz;
      }
    } else {
      var loop_com = norm_com($(eval(com_elem))[0].innerHTML)/100;
    }
  	
    if ($(eval(odd_elem))[0].nodeName == "INPUT") {
      var loop_odd = qbToMath($(eval(odd_elem))[0].value);
    } else {
      var loop_odd = qbToMath($(eval(odd_elem))[0].innerHTML);
    }
  	
    begin = begin - (loop_abb * (loop_odd - loop_com));
    var endCP_elm = "provaCP_Q_" + M_num;
    var endDCH1_elm = "provaDCH1_Q_" + M_num;
    var endDCH2_elm = "provaDCH2_Q_" + M_num;
    var endCP = (begin / qbToMath($(eval(endCP_elm))[0].value));
    var endDCH1 = (begin / qbToMath($(eval(endDCH1_elm))[0].value));
    var endDCH2 = (begin / qbToMath($(eval(endDCH2_elm))[0].value));
    //console.log(loop_abb);
    //console.log(loop_com);
    //console.log(loop_odd);
  }
  //console.log("FINE: " + end);
  var infoCP_elem = "info_CP1_" + M_num;
  var infoCPOdd_elem = "info_qCP1_" + M_num;
  var CPOdd_elem = "provaCP_Q_" + M_num;
  $(eval(infoCP_elem))[0].innerHTML = endCP.toFixed(3) + "€";
	
  var infoDCH1_elem = "info_DCH1_" + M_num;
  var infoDCH1Odd_elem = "info_qCP1_" + M_num;
  var DCH1Odd_elem = "provaDCH1_Q_" + M_num;
  $(eval(infoDCH1_elem))[0].innerHTML = endDCH1.toFixed(3) + "€";
	
  var infoDCH2_elem = "info_DCH2_" + M_num;
  var infoDCH2Odd_elem = "info_qCP1_" + M_num;
  var DCH2Odd_elem = "provaDCH2_Q_" + M_num;
  $(eval(infoDCH2_elem))[0].innerHTML = endDCH2.toFixed(3) + "€";
	
  var cfr_layOdd_Box = "optimalOddBox_" + M_num;
  var cfr_lay_elem = "cfrOdd_" + M_num;
  if($(eval(endCP_elm))[0].value && $(eval(endCP_elm))[0].value > 1) {
    $(eval(cfr_layOdd_Box)).show();
    var cfr_layOdd = (qbToMath($(eval(endCP_elm))[0].value) - refComz) / (qbToMath($(eval(endCP_elm))[0].value) - 1);
    $(eval(cfr_lay_elem))[0].innerHTML = "@" + cfr_layOdd.toFixed(3);
  } else {
    $(eval(cfr_layOdd_Box)).hide();
    var cfr_layOdd = "";
    $(eval(cfr_lay_elem))[0].innerHTML = "---"
  }
	
  var cfr_DCH_Box = "optimalDCHBox_" + M_num;
  var cfr_DCH_elem = "cfrDCH_" + M_num;
  var DCH1Odd = qbToMath($(eval(DCH1Odd_elem))[0].value);
  var DCH2Odd = qbToMath($(eval(DCH2Odd_elem))[0].value);
  var DCH1_dol_elm = "info_DCH1_" + M_num;
  var DCH2_dol_elm = "info_DCH2_" + M_num;
  var DCH1_dol = Math.round(DolToMath($(eval(DCH1_dol_elm))[0].innerHTML));
  var DCH2_dol = Math.round(DolToMath($(eval(DCH2_dol_elm))[0].innerHTML));
  var winDCH1 = DCH1Odd * DCH1_dol;
  var winDCH2 = DCH2Odd * DCH2_dol;
  var minWinDCH = Math.min(winDCH1, winDCH2);
  var DCH_eq_ODD = (minWinDCH) / (DCH1_dol + DCH2_dol);
	
  if($(eval(endDCH1_elm))[0].value && $(eval(endDCH1_elm))[0].value > 1 && $(eval(endDCH2_elm))[0].value && $(eval(endDCH2_elm))[0].value > 1) {
    $(eval(cfr_DCH_Box)).show();
    var cfr_DCHOdd = (DCH_eq_ODD - refComz) / (DCH_eq_ODD - 1);
    $(eval(cfr_DCH_elem))[0].innerHTML = "@" + cfr_DCHOdd.toFixed(3);
  } else {
    $(eval(cfr_DCH_Box)).hide();
    var cfr_DCHOdd = "";
    $(eval(cfr_DCH_elem))[0].innerHTML = "---"
  }
}*/

function loopState() {
  var str = "";
  for (var j = 1; j <= 5; j++) {
    var loopSelector = "input[id*='radio'][id*='M" + j + "']";
    var match = "M" + j;
    var L = $(loopSelector).length;
    for (var i = 0; i < L; i++) {
      if ($(loopSelector)[i].checked == true) {
        //M_Arr[match] = $(loopSelector)[i].value.substr(0,1);
        str = str + $(loopSelector)[i].value.substr(0, 1);
      }
    }
  }
  //console.log(str);
  a = str.split(/A/)[0];
  multiStatus = a;
  //console.log("status: " + a);
  n_perse = countPBefA(a);
  k = a.indexOf("P");
  k == -1
    ? $("#statusMatch")[0].innerHTML = a
    : $("#statusMatch")[0].innerHTML = a.slice(0, k + 1);
  RGX_cfr();
}

function RGX_cfr() {
  for (i = 0; i < $("#statusSet_Box")[0].children.length; i++) {
    str = $("#statusSet_Box")[0].children[i].innerHTML;
    //console.log("str: " + str);
    state = $("#statusMatch")[0].innerHTML;
    //console.log("stato attuale: " + state);
    var pattern = "^" + state;
    //console.log("pattern: " + pattern);
    var rgXp = new RegExp(pattern);
    var res = str.match(rgXp);
    //var id_elm = ".statusSet[mystate='" + (str) + "']";
    var id_elm = ".statusSet[myindex='" + (i) + "']";
    var Res_id_elm = ".statusResults[myindex='" + (i) + "']";
    var RAT_id_elm = ".statusRating[myindex='" + (i) + "']";
    if (res && res[0] != "") {
      //console.log("indice " + (i) + " - " + res);
      $(id_elm).addClass("lightMe").removeClass("turnOffme");
      $(Res_id_elm).addClass("lightMe").removeClass("turnOffme");
      $(RAT_id_elm).addClass("lightMe").removeClass("turnOffme");
    } else {
      $(id_elm).addClass("turnOffme").removeClass("lightMe");
      $(Res_id_elm).addClass("turnOffme").removeClass("lightMe");
      $(RAT_id_elm).addClass("turnOffme").removeClass("lightMe");
    }
  }
}

function lighter() {
  if (multiStatus) {
    //console.log("multiStatus presente e pari a: " + multiStatus);
    var ty = num_ev - multiStatus.length;
    //console.log("ty: " + ty);
    switch (num_ev) {
      case "2":
        $("#grigliaSV_doppia [id^='doppia_" + multiStatus + "']").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4').addClass('lightMe' + ty);
        //$("#grigliaSV_doppia > div >:not([id^='doppia_"+ multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        $("#grigliaSV_doppia > div:not([id^='doppia_" + multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        //console.log('accendo doppia ' + multiStatus);
        break;
      case "3":
        $("#grigliaSV_tripla [id^='tripla_" + multiStatus + "']").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4').addClass('lightMe' + ty);
        //$("#grigliaSV_tripla > div >:not([id^='tripla_"+ multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        $("#grigliaSV_tripla > div:not([id^='tripla_" + multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        //console.log('accendo tripla ' + multiStatus);
        break;
      case "4":
        $("#grigliaSV_quadrupla [id^='quadrupla_" + multiStatus + "']").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4').addClass('lightMe' + ty);
        //$("#grigliaSV_quadrupla > div >:not([id^='quadrupla_"+ multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        $("#grigliaSV_quadrupla > div:not([id^='quadrupla_" + multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        //console.log('accendo quadrupla ' + multiStatus);
        break;
      case "5":
        $("#grigliaSV_quintupla [id^='quintupla_" + multiStatus + "']").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4').addClass('lightMe' + ty);
        //$("#grigliaSV_quintupla > div >:not([id^='quintupla_"+ multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        $("#grigliaSV_quintupla > div:not([id^='quintupla_" + multiStatus + "'])").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
        //console.log('accendo quintupla ' + multiStatus);
        break;
    }
  } else {
    //$("[id*='grigliaSV_'] > div > div").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
    $("[id*='grigliaSV_'] > div").removeClass('lightMe0').removeClass('lightMe1').removeClass('lightMe2').removeClass('lightMe3').removeClass('lightMe4');
  }
}

function countPBefA(stringa) {
  var contaP = 0;
  for (i = 0; i < stringa.length; i++) {
    if (stringa[i] == "P") ++contaP;
  }
  //console.log("perse: " + contaP);
  return contaP;
}

function totAbbGain(macc) {
  g = 0;
  for (j = 0; j < 6; j++) {
    if ($("#abb_New" + j + "_M" + macc)[0].nodeName != "DIV") {
      a = DolToMath($("#abb_New" + j + "_M" + macc)[0].value);
      //console.log(a);
    } else {
      a = DolToMath($("#abb_New" + j + "_M" + macc)[0].innerHTML);
      //console.log(a);
    }

    /* if ($("#quotaB_New"+j+"_M"+macc)[0].nodeName != "DIV") {
      b = qbToMath($("#quotaB_New"+j+"_M"+macc)[0].value);
      console.log(b);
    } else {
      b = qbToMath($("#quotaB_New"+j+"_M"+macc)[0].innerHTML);
      console.log(b);
    } */

    if ($("#comm_New" + j + "_M" + macc)[0].nodeName != "DIV") {
      if ($("#comm_New" + j + "_M" + macc)[0].value) {
        c = norm_com($("#comm_New" + j + "_M" + macc)[0].value) / 100;
        //console.log(c);
      } else {
        c = norm_com($("#mult_lamiacommissione")[0].value) / 100;
        //console.log(c);
      }
    } else {
      if ($("#comm_New" + j + "_M" + macc)[0].innerHTML) {
        c = norm_com($("#comm_New" + j + "_M" + macc)[0].innerHTML) / 100;
        //console.log(c);
      } else {
        c = norm_com($("#mult_lamiacommissione")[0].value) / 100;
        //console.log(c);
      }
    }
    g = g + (a * (1 - c));
    //console.log(g);
  }
  //console.log(g);
  return g;
}

function victoryString(numb) {
  var vicStr = "";
  for (i = 0; i < numb; i++) {
    vicStr = vicStr + "V";
  }
  return vicStr;
}

function checkLosing() {
  var occ = $("#statusMatch")[0].innerHTML;
  var residuo = num_ev - occ.length;
  var noHedge = "";

  if (occ == "") {
    WOW = false;
    DEFEAT = false;
    $("#statusMessage_Box")[0].innerHTML = "IN ATTESA DEGLI ESITI...";
    $("#statusMessage_Box").addClass("waitingMsg").removeClass("endMsg").removeClass("warningMsg").removeClass("progressMsg").removeClass("winningMsg");
  } else {
    if (occ.match(/P/gi)) {
      var contaP = occ.match(/P/gi).length;
    } else {
      var contaP = 0;
    }

    if (contaP > 0) {
      if ($("#statusMatch")[0].innerHTML.length == num_ev) {
        theEnd = true;
        WOW = false;
        DEFEAT = true;
        $(".badgeOnGo").addClass("theEnd");
        $("#statusMessage_Box")[0].innerHTML = "FINE MULTIPLA";
        $("#statusMessage_Box").addClass("endMsg").removeClass("warningMsg").removeClass("progressMsg").removeClass("winningMsg").removeClass("waitingMsg");
      } else {
        theEnd = true;
        WOW = false;
        DEFEAT = true;
        $(".badgeOnGo").addClass("theEnd");
        $("#statusMessage_Box")[0].innerHTML = "STOP ALLE COPERTURE!";
        $("#statusMessage_Box").addClass("warningMsg").removeClass("endMsg").removeClass("progressMsg").removeClass("winningMsg").removeClass("waitingMsg");
      }

      for (i = occ.length; i < num_ev; i++) {
        if (i < (num_ev - 1)) {
          noHedge = noHedge + arrPartite[i] + ", ";
        } else {
          noHedge = noHedge.slice(0, -2) + " e " + arrPartite[i] + ".";
        }
      }

      if (residuo == 0) {
        var mess_copertura = "";
      } else if (residuo == 1) {
        var mess_copertura = "<div class=''>Non è necessario coprire la partita " + arrPartite[num_ev - 1] + ".</div>";
      } else {
        var mess_copertura = "<div class=''>Non è necessario coprire le partite " + noHedge + "</div>";
      }
      $(mess_copertura).appendTo($("#statusMessage_Box"));
    } else {
      if (occ.match(/V/g).length == num_ev) {
        theEnd = true;
        WOW = true;
        DEFEAT = false;
        $(".badgeOnGo").addClass("theEnd");
        $("#statusMessage_Box")[0].innerHTML = "MULTIPLA VINTA";
        $("#statusMessage_Box").addClass("winningMsg").removeClass("warningMsg").removeClass("endMsg").removeClass("progressMsg").removeClass("waitingMsg");
      } else {
        theEnd = false;
        WOW = false;
        DEFEAT = false;
        $(".badgeOnGo").removeClass("theEnd");
        $("#statusMessage_Box")[0].innerHTML = "MULTIPLA IN CORSO...";
        $("#statusMessage_Box").addClass("progressMsg").removeClass("warningMsg").removeClass("endMsg").removeClass("winningMsg").removeClass("waitingMsg");
      }
    }
  }
}

var myMultipla = {}, myMultipla_str;
function formToJson() {
  var myForm = $('form')[0];
  var myItem = [];
  var F_type;
  var F_value;
  var F_lab;
  myMultipla = {};
  myMultipla_str = "";
  for (var i = 0; i < myForm.length; i++) {
    F_type = myForm[i].type;
    F_lab = myForm[i].id;
    if (F_type == "text") {
      if (myForm[i].value) {
        F_value = myForm[i].value;
        myMultipla[F_lab] = F_value;
      } else {
        continue;
      }
    } else if (F_type == "select-one") {
      F_value = myForm[i].value;
      myMultipla[F_lab] = F_value;
    } else if (F_type == "radio") {
      F_value = myForm[i].checked;
      myMultipla[F_lab] = F_value;
    } else if (F_type == "checkbox") {
      F_value = myForm[i].checked;
      myMultipla[F_lab] = F_value;
    }
    //console.log(F_type);
    //console.log(F_value);
    //myMultipla[F_lab] = F_value;
  }
  //console.log(myMultipla);
  myMultipla_str = JSON.stringify(myMultipla);
  $("#formString")[0].value = myMultipla_str.replace(/\\/g, "");
}

var backMult;
function JsonToForm(js_var) {
  backMult = JSON.parse(js_var);
  //console.log(backMult);

  var myForm = $('form')[0];
  for (var i = 0; i < myForm.length; i++) {
    var myId = myForm[i].id;
    var myType = myForm[i].type;
    //console.log("i:"+ i + " - " + myId + " (" + myType + ") " + backMult[myId]);

    if (backMult[myId]) {
      switch (myType) {
        case "text":
          $("#" + myId)[0].value = backMult[myId];
          $("#" + myId).blur();
          //console.log(myId + " = " + backMult[myId]);
          break;
        case "select-one":
          $("#" + myId)[0].value = backMult[myId];
          $("#" + myId).change();
          //console.log(myId + " = " + backMult[myId]);
          break;
        case "radio":
          $("#" + myId)[0].checked = backMult[myId];
          //console.log(myId + " = " + backMult[myId]);
          break;
        case "checkbox":
          $("#" + myId)[0].checked = backMult[myId];
          $("#" + myId).change();
          //console.log(myId + " = " + backMult[myId]);
          break;
      }
    } else {
      switch (myType) {
        case "text":
          $("#" + myId)[0].value = "";
          //console.log(myId + " = " + backMult[myId]);
          break;
        case "select-one":
          $("#" + myId)[0].value = "";
          $("#" + myId).change();
          //console.log(myId + " = " + backMult[myId]);
          break;
        case "radio":
          $("#" + myId)[0].checked = false;
          //console.log(myId + " = " + backMult[myId]);
          break;
        case "checkbox":
          $("#" + myId)[0].checked = false;
          $("#" + myId).change();
          //console.log(myId + " = " + backMult[myId]);
          break;
      }
    }
  }

  for (var j = 1; j <= 5; j++) {
    $('input[type=radio][id*=radio][id*=_M' + j + ']:checked').length == 0
      ? $('#radioA_M' + j).prop('checked', true)
      : console.log();
  }

  /* setTimeout(function() {
    ricalcola();
    for (var j=1; j<=num_ev;j++) {
      var mN = "M"+j;
      totalizza (mN, bancate);
      CP_teorica (mN);
      showCop (mN);
    }
  }, 600); */
}

function refill_hedge() {
  ricalcola();
  for (var j = 1; j <= num_ev; j++) {
    var mN = "M" + j;
    totalizza(mN, bancate);
    CP_teorica(mN);
    showCop(mN);
  }
}

function keiap() {
  $("#matchName_M1").keyup();
}

function fill_form(jeison) {
  myDef.resolve(jeison);
}

function resetDef() {
  myDef = $.Deferred();
  $.when(myDef)
    .done(JsonToForm)
    .done(refill_hedge)
    .done(keiap)
    .done(loopState, checkLosing, resetDef, function () {
      $('.first.myLoad.modal#LOAD_dlg')
        .modal('hide');
    })
    .done($("#abb_New0_M1").keyup())
    .done($("#abb_New0_M2").keyup())
    .done($("#abb_New0_M3").keyup())
    .done($("#abb_New0_M4").keyup())
    .done($("#abb_New0_M5").keyup())
    .done(lighter)
    .done(isOpen)
    .done($("input[id*='radioV']").change())
    .done($("input[id*='radioP']").change())
    .done($('#myBlockcheck').change());
}

function checkOpn() {
  if (AggOpn > 0) {
    //$("#qTot_div").hide();
  } else {
    //$("#qTot_div").show();
  }
}

function checkName() {
  if ($("#thisMultiName")[0].innerHTML) {
    $("#thisMultiNameBox").show();
  } else {
    $("#thisMultiNameBox").hide();
  }
}

function resetAll() {
  var N = num_ev;
  console.log("eventi: " + N);
  /* $("form").trigger('reset');
  $("#mult_quantieventi")[0].value = 2;
  $("#mult_lamiapuntata").keyup();
  $("#mult_quantieventi").change();
  $("#thisMultiName")[0].innerHTML =""; */

  for (i = 1; i <= N; i++) {
    if ($("#rigaAgg_" + i).css('display') == "grid") {
      //console.log(i + ": aperto");
      //console.log("chiudo " + i);
      $("#button_M" + i).click();
      $("#mysingledetailbtn_M" + i).click();

    }

    if (i == N) {
      $('.ui.dropdown#labelRimbo')
        .dropdown('set text', 'Rimborso');
      $("#labelRimbo").removeClass('inRosso');
      rimboType = 0;

      $("form").trigger('reset');
      $("#mult_quantieventi")[0].value = 2;
      $("#mult_lamiapuntata").keyup();
      $("#mult_quantieventi").change();
      $("#thisMultiName")[0].innerHTML = "";

      $("input[id*=abb_New0_M]").keyup();

      /* $('#radioA_M1').click();
      $('#radioA_M2').click();
      $('#radioA_M3').click();
      $('#radioA_M4').click();
      $('#radioA_M5').click(); */

      $("input[id*='radioA']").click();
      $("input[id*='radioA']").change();
    }
  }

  if ($("#boxGridRisultatiIniziali").css('display') == "flex") $("#DivIntestazioneGrid").click();
  //if ($("#boxGridSviluppo").css('display')=="grid") $("#DivIntestazioneGrid_2").click();
  //if ($("#boxSviluppo").css('display')=="grid") $("#DivIntestazioneGrid_2").click();
  if ($("#boxGridSviluppo").is(':visible')) $("#boxGridSviluppo").toggleClass('vis-hidden');
  if ($("#boxSviluppo").is(':visible')) $("#boxSviluppo").toggleClass('vis-hidden');

  $('#myBlockcheck').change();
  $('.grid_row_1 input[type="text"]').prop('disabled', false);
  $('.grid_row_2 input[type="text"]').prop('disabled', false);
  $('.grid_row_3 input[type="text"]').prop('disabled', false);
  $('.grid_row_4 input[type="text"]').prop('disabled', false);
  $('.grid_row_5 input[type="text"]').prop('disabled', false);

  checkName();
}

function resetDetails(num) {
  var start = parseFloat(num) + 1;
  var end = 5;
  for (var i = start; i <= end; i++) {
    $('#rigaAgg_' + i + ' input[type=text]').val('');
    totalizza("M" + i, bancate);
  }
}

function copyForEx() {
  var generatedString = "&M2";

  if ($("#mult_lamiapuntata").val()) {
    generatedString += "&" + document.getElementById("mult_lamiapuntata").value;
  } else {
    generatedString += "&0";
  }

  var numeroEventi = parseInt(document.getElementById("mult_quantieventi").value);
  generatedString += "&" + numeroEventi;

  if (document.getElementById("mult_ilmiobonus").value == "") {
    generatedString += "&" + "NR";
  } else {
    generatedString += "&BR";
  }

  //da qui iniziano le partite
  for (var i = 1; i <= num_ev; i++) {
    generatedString += "&";
    generatedString += moment($("#dateH_M" + i).val().replace(/h/g, ""), 'DD/MM/YYYY HH:mm').locale("it").format("L LT");

    generatedString += "&";
    generatedString += $("#matchName_M" + i).val();

    generatedString += "&";
    generatedString += $("#market_M" + i).val();

    generatedString += "&";
    generatedString += $("#mult_quotaP_set" + i).val().replace(/@/g, "");

    generatedString += "&";
    generatedString += $("#mult_quotaB_set" + i).val().replace(/@/g, "");

    generatedString += "&";
    generatedString += parseFloat($("#mult_lamiacommissione").val()) / 100;
  }
  generatedString += "&" + moment().format('DD/MM/YYYY HH:mm');

  // MODIFICA RISPETTO ORIGINALE (per tener conto del BONUS)
  if ($("#mult_ilmiobonus").val()) {
    generatedString += "&" + parseFloat($("#mult_ilmiobonus").val());
  } else {
    generatedString += "&0";
  }
  // FINE MODIFICA ORIGINALE (BONUS)

  setClipboard(generatedString);

  //var copyText = document.getElementById("mult_myEx_copy");
  //copyText.value=generatedString;
  /* Select the text field */
  //copyText.select();

  console.log(generatedString.split("&"));

  /* Copy the text inside the text field */
  //document.execCommand("copy");
  document.getElementById("loadListHeader").innerHTML = "<span style='color:#1EBC30'>SALVATAGGIO OK</span>";
  document.getElementById("loadListContent").innerHTML = "Apri l'<b>Agenda Excel</b> (se non l'hai già fatto puoi scaricarla <a href='https://robinodds.it/agenda-guadagni/#download' target='_blank'>qui</a>), posizionati sulla prima cella della prima riga libera ed esegui il comando '<i><b>Incolla</b></i>'";

  $("#loadListBox_msg").addClass("green");
  $('.first.myLoad.modal#LOAD_dlg').addClass("tiny");

  $('.first.myLoad.modal#LOAD_dlg')
    .modal({
      onHidden: function () {
        $('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
        $("#loadListBox_msg").removeClass("green");
      }
    })
    .modal('show');
}

function setClipboard(value) {
  var tempInput = document.createElement("input");
  tempInput.style = "position: absolute; left: -1000px; top: -1000px";
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

function randomSpin(min, max) {
  var R = Math.floor(Math.random() * (max + 1 - min)) + min;
  return R;
}

function OLD_JsonToForm(js_var) {
  backMult = JSON.parse(js_var);
  var myKeys = Object.keys(backMult);
  var myValues = Object.values(backMult);
  var count = myKeys.length;
  var myForm = $('form')[0];

  /* for (var i=0; i<count; i++) {
    var myInput = $(eval(myKeys[i]));
    var myType = $(eval(myKeys[i]))[0].type;
    if (myType == "text") {
        myInput[0].value = myValues[i];
      } else if (myType == "select-one") {
        myInput[0].value = myValues[i];
        myInput.change();
      } else if (myType == "radio") {
        myInput[0].checked = myValues[i];
      } else if (myType == "checkbox") {
        myInput[0].checked = myValues[i];
        myInput.change();
      }
  } */

  for (var i = 0; i < myForm.length; i++) {
    var myId = myForm[i].id;
    var myType = myForm[i].type;
    //console.log(backMult[myId]);
    console.log("i:" + i + " - " + myId + " (" + myType + ") " + backMult[myId]);

    if (backMult[myId]) {
      switch (myType) {
        case "text":
          $("#" + myId)[0].value = backMult[myId];
          break;
        case "select-one":
          $("#" + myId)[0].value = backMult[myId];
          $("#" + myId).change();
          break;
        case "radio":
          $("#" + myId)[0].checked = backMult[myId];
          break;
        case "checkbox":
          $("#" + yId)[0].checked = backMult[myId];
          $("#" + myId).change();
          break;
      }
      /* if (myType == "text") {
        $(eval(myId))[0].value = backMult[myId];
      } else if (myType == "select-one") {
        $(eval(myId))[0].value = backMult[myId];
        $(eval(myId)).change();
      } else if (myType == "radio") {
        //console.log(myId + " tipo: " + myType + " radio: " + backMult[myId]);
        //console.log($(eval(myId))[0].checked);
        $(eval(myId))[0].checked = backMult[myId];
      } else if (myType == "checkbox") {
        $(eval(myId))[0].checked = backMult[myId];
        $(eval(myId)).change();
      } */
    }
    /* else {
      continue;
    } */
  }

  /* if (myType == "text") {
    if (backMult[myId]) {
      $(eval(myId))[0].value = backMult[myId];
    } else {
      continue;
    }
  } else if (myType == "select-one") {
    if (backMult[myId]) {
      $(eval(myId))[0].value = backMult[myId];
      $(eval(myId)).change();
    } else {
      continue;
    }
  } else if (myType == "radio") {
    if (backMult[myId]) {
      //console.log(myId + " tipo: " + myType + " radio: " + backMult[myId]);
      $(eval(myId))[0].checked = backMult[myId];
    } else {
      continue;
    }
  } else if (myType == "checkbox") {
    if (backMult[myId]) {
      $(eval(myId))[0].checked = backMult[myId];
      $(eval(myId)).change();
    } else {
      continue;
    }
  } */

  //console.log(myId);
  //console.log(myType);

  $("#mult_quantieventi").change();

  /* setTimeout(function() {
    ricalcola();
    for (var j=1; j<=num_ev;j++) {
      var mN = "M"+j;
      totalizza (mN, bancate);
      CP_teorica (mN);
      showCop (mN);
    }
  }, 200); */
}

function OLD_formToJson() {
  var myForm = $('form')[0];
  var myItem = [];
  var F_type;
  var F_value;
  var F_lab;
  for (var i = 0; i < myForm.length; i++) {
    F_type = myForm[i].type;
    F_lab = myForm[i].id;
    if (F_type == "text") {
      if (myForm[i].value) {
        F_value = myForm[i].value;
        myMultipla[F_lab] = F_value;
      } else {
        continue;
      }
    } else if (F_type == "select-one") {
      F_value = myForm[i].value;
      myMultipla[F_lab] = F_value;
    } else if (F_type == "radio") {
      F_value = myForm[i].checked;
      myMultipla[F_lab] = F_value;
    } else if (F_type == "checkbox") {
      F_value = myForm[i].checked;
      myMultipla[F_lab] = F_value;
    }
    //console.log(F_type);
    //console.log(F_value);
    //myMultipla[F_lab] = F_value;
  }
  console.log(myMultipla);
  myMultipla_str = JSON.stringify(myMultipla);
  $("#formString")[0].value = myMultipla_str.replace(/\\/g, "");
}


