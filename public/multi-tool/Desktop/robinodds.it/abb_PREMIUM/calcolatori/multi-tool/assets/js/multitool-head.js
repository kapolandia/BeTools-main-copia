/** @format */

const API_BASE_URL = '/api/multitool/';

const blockedSetUp = { value: false };

var MX1, COS1, B_MX, B_COS;

var startB1, startB2, startB3, startB4, startB5;

var benchB1, benchB2, benchB3, benchB4, benchB5, bench_gain, bench_rating, bench_CR;

var benchB2v, benchB2p;
var benchB3vv, benchB3vp, benchB3pv, benchB3pp;
var benchB4vvv, benchB4vvp, benchB4vpv, benchB4vpp, benchB4pvv, benchB4pvp, benchB4ppv, benchB4ppp;
var benchB5vvvv,
  benchB5vvvp,
  benchB5vvpv,
  benchB5vvpp,
  benchB5vpvv,
  benchB5vpvp,
  benchB5vppv,
  benchB5vppp,
  benchB5pvvv,
  benchB5pvvp,
  benchB5pvpv,
  benchB5pvpp,
  benchB5ppvv,
  benchB5ppvp,
  benchB5pppv,
  benchB5pppp;

var matrix,
  myConst,
  bench_vector_res,
  vector_res,
  num_ev = 2,
  puntata = 0,
  rimborso = 0,
  qTot;

var rStd, rFor1; //AGGIUNTA 04/09/2019 14:41

var quota1, quota2, quota3, quota4, quota5;
var qbanca1, qbanca2, qbanca3, qbanca4, qbanca5;
var bonus, com;
var gain, banca1, banca2, banca3, banca4, banca5;

var romeM1, romeM2, romeM3, romeM4, romeM5;

var banca2v, banca2p;
var banca3vv, banca3vp, banca3pv, banca3pp;
var banca4vvv, banca4vvp, banca4vpv, banca4vpp, banca4pvv, banca4pvp, banca4ppv, banca4ppp;
var banca5vvvv,
  banca5vvvp,
  banca5vvpv,
  banca5vvpp,
  banca5vpvv,
  banca5vpvp,
  banca5vppv,
  banca5vppp,
  banca5pvvv,
  banca5pvvp,
  banca5pvpv,
  banca5pvpp,
  banca5ppvv,
  banca5ppvp,
  banca5pppv,
  banca5pppp;

var Tresp1, Tresp2, Tresp3, Tresp4, Tresp5;

var Tresp2v, Tresp2p;
var Tresp3vv, Tresp3vp, Tresp3pv, Tresp3pp;
var Tresp4vvv, Tresp4vvp, Tresp4vpv, Tresp4vpp, Tresp4pvv, Tresp4pvp, Tresp4ppv, Tresp4ppp;
var Tresp5vvvv,
  Tresp5vvvp,
  Tresp5vvpv,
  Tresp5vvpp,
  Tresp5vpvv,
  Tresp5vpvp,
  Tresp5vppv,
  Tresp5vppp,
  Tresp5pvvv,
  Tresp5pvvp,
  Tresp5pvpv,
  Tresp5pvpp,
  Tresp5ppvv,
  Tresp5ppvp,
  Tresp5pppv,
  Tresp5pppp;

var TAbbG1, TAbbG2, TAbbG3, TAbbG4, TAbbG5;
var n_perse = 0,
  contaP,
  multiStatus;
var AggOpn = 0;
var Win1, Loos1, Win2, Loos2, Win3, Loos3, Win4, Loos4, Win5, Loos5;
var win, grossWin, netWin, WOW, DEFEAT, ENDGain;
var gainOnGo_P, gainOnGoVP, gainOnGoVVP, gainOnGoVVVP, gainOnGoVVVVP, gainOnGoVVVVV;
var ratingOnGo_P,
  ratingOnGo_VP,
  ratingOnGo_VVP,
  ratingOnGo_VVVP,
  ratingOnGo_VVVVP,
  ratingOnGo_VVVVV;
var CR_OnGo_P, CR_OnGo_VP, CR_OnGo_VVP, CR_OnGo_VVVP, CR_OnGo_VVVVP, CR_OnGo_VVVVV;

//DOPPIA
var gainOG2_vv, gainOG2_vp, gainOG2_pv, gainOG2_pp;
var ratOG2_vv, ratOG2_vp, ratOG2_pv, ratOG2_pp;
var CR_OG2_vv, CR_OG2_vp, CR_OG2_pv, CR_OG2_pp;

//TRIPLA
var gainOG3_vvv,
  gainOG3_vvp,
  gainOG3_vpv,
  gainOG3_vpp,
  gainOG3_pvv,
  gainOG3_pvp,
  gainOG3_ppv,
  gainOG3_ppp;
var ratOG3_vvv, ratOG3_vvp, ratOG3_vpv, ratOG3_vpp, ratOG3_pvv, ratOG3_pvp, ratOG3_ppv, ratOG3_ppp;
var CR_OG3_vvv, CR_OG3_vvp, CR_OG3_vpv, CR_OG3_vpp, CR_OG3_pvv, CR_OG3_pvp, CR_OG3_ppv, CR_OG3_ppp;

//QUADRUPLA
var gainOG4_vvvv,
  gainOG4_vvvp,
  gainOG4_vvpv,
  gainOG4_vvpp,
  gainOG4_vpvv,
  gainOG4_vpvp,
  gainOG4_vppv,
  gainOG4_vppp,
  gainOG4_pvvv,
  gainOG4_pvvp,
  gainOG4_pvpv,
  gainOG4_pvpp,
  gainOG4_ppvv,
  gainOG4_ppvp,
  gainOG4_pppv,
  gainOG4_pppp;
var ratOG4_vvvv,
  ratOG4_vvvp,
  ratOG4_vvpv,
  ratOG4_vvpp,
  ratOG4_vpvv,
  ratOG4_vpvp,
  ratOG4_vppv,
  ratOG4_vppp,
  ratOG4_pvvv,
  ratOG4_pvvp,
  ratOG4_pvpv,
  ratOG4_pvpp,
  ratOG4_ppvv,
  ratOG4_ppvp,
  ratOG4_pppv,
  ratOG4_pppp;
var CR_OG4_vvvv,
  CR_OG4_vvvp,
  CR_OG4_vvpv,
  CR_OG4_vvpp,
  CR_OG4_vpvv,
  CR_OG4_vpvp,
  CR_OG4_vppv,
  CR_OG4_vppp,
  CR_OG4_pvvv,
  CR_OG4_pvvp,
  CR_OG4_pvpv,
  CR_OG4_pvpp,
  CR_OG4_ppvv,
  CR_OG4_ppvp,
  CR_OG4_pppv,
  CR_OG4_pppp;

//QUINTUPLA
var gainOG5_vvvvv,
  gainOG5_vvvvp,
  gainOG5_vvvpv,
  gainOG5_vvvpp,
  gainOG5_vvpvv,
  gainOG5_vvpvp,
  gainOG5_vvppv,
  gainOG5_vvppp,
  gainOG5_vpvvv,
  gainOG5_vpvvp,
  gainOG5_vpvpv,
  gainOG5_vpvpp,
  gainOG5_vppvv,
  gainOG5_vppvp,
  gainOG5_vpppv,
  gainOG5_vpppp,
  gainOG5_pvvvv,
  gainOG5_pvvvp,
  gainOG5_pvvpv,
  gainOG5_pvvpp,
  gainOG5_pvpvv,
  gainOG5_pvpvp,
  gainOG5_pvppv,
  gainOG5_pvppp,
  gainOG5_ppvvv,
  gainOG5_ppvvp,
  gainOG5_ppvpv,
  gainOG5_ppvpp,
  gainOG5_pppvv,
  gainOG5_pppvp,
  gainOG5_ppppv,
  gainOG5_ppppp;
var ratOG5_vvvvv,
  ratOG5_vvvvp,
  ratOG5_vvvpv,
  ratOG5_vvvpp,
  ratOG5_vvpvv,
  ratOG5_vvpvp,
  ratOG5_vvppv,
  ratOG5_vvppp,
  ratOG5_vpvvv,
  ratOG5_vpvvp,
  ratOG5_vpvpv,
  ratOG5_vpvpp,
  ratOG5_vppvv,
  ratOG5_vppvp,
  ratOG5_vpppv,
  ratOG5_vpppp,
  ratOG5_pvvvv,
  ratOG5_pvvvp,
  ratOG5_pvvpv,
  ratOG5_pvvpp,
  ratOG5_pvpvv,
  ratOG5_pvpvp,
  ratOG5_pvppv,
  ratOG5_pvppp,
  ratOG5_ppvvv,
  ratOG5_ppvvp,
  ratOG5_ppvpv,
  ratOG5_ppvpp,
  ratOG5_pppvv,
  ratOG5_pppvp,
  ratOG5_ppppv,
  ratOG5_ppppp;
var CR_OG5_vvvvv,
  CR_OG5_vvvvp,
  CR_OG5_vvvpv,
  CR_OG5_vvvpp,
  CR_OG5_vvpvv,
  CR_OG5_vvpvp,
  CR_OG5_vvppv,
  CR_OG5_vvppp,
  CR_OG5_vpvvv,
  CR_OG5_vpvvp,
  CR_OG5_vpvpv,
  CR_OG5_vpvpp,
  CR_OG5_vppvv,
  CR_OG5_vppvp,
  CR_OG5_vpppv,
  CR_OG5_vpppp,
  CR_OG5_pvvvv,
  CR_OG5_pvvvp,
  CR_OG5_pvvpv,
  CR_OG5_pvvpp,
  CR_OG5_pvpvv,
  CR_OG5_pvpvp,
  CR_OG5_pvppv,
  CR_OG5_pvppp,
  CR_OG5_ppvvv,
  CR_OG5_ppvvp,
  CR_OG5_ppvpv,
  CR_OG5_ppvpp,
  CR_OG5_pppvv,
  CR_OG5_pppvp,
  CR_OG5_ppppv,
  CR_OG5_ppppp;

var gain2 = [],
  gain3 = [],
  gain4 = [],
  gain5 = [];
var rat2 = [],
  rat3 = [],
  rat4 = [],
  rat5 = [];

var input_quote;
var qualecarico;
var myDef = $.Deferred();
var qualeiframe, iframeCont, ifh, lastHeight, newHeight, onElementHeightChangeTimer;
var rimboType = 0;

const romeOpt = {
  weekStart: moment().weekday(1).day(),
  inputFormat: 'DD/MM/YYYY HH:mm',
  dayFormat: 'DD',
  timeInterval: 900,
};

var mulArray, fromOdd;
if (parent.document.getElementById('iframeNewMulti')) {
  var mulRef = parent.document.referrer; //parent.window.location.href; //document.referrer;
  // console.log('comefrom: ' + mulRef);
} else {
  var mulRef = document.referrer; //window.location.href; //document.referrer;
  // console.log('comefrom: ' + mulRef);
}

if (localStorage.getItem('multiBuffer')) {
  var multiLocBuf = localStorage.getItem('multiBuffer');
} else {
  var multiLocBuf = undefined;
}

$(document).ready(function () {
  if (parent.document.getElementById('iframeNewMulti')) {
    lastHeight = $('#lastElm')[0].offsetTop; //+ $("#lastElm")[0].offsetHeight;
    qualeiframe = parent.document.getElementById('iframeNewMulti');
    iframeCont = qualeiframe.contentWindow;

    onElementHeightChange2(function () {
      //onElementHeightChange(iframeCont.document.body, function(){
      //alert('Body height changed');

      //ifh = iframeCont.document.body.offsetHeight;
      ifh = $('#lastElm')[0].offsetTop + $('#lastElm')[0].offsetHeight;
      // console.log("alt.: "+ifh+"px");
      parent.document.getElementById('iframeNewMulti').height = ifh;

      // console.log('height has changed');
      // console.log("il frame è alto: "+ parent.document.getElementById("iframeNewMulti").height);
    });
  }

  $(document)
    .ajaxSend(function () {
      $('.spinner img').prop('src', 'Spin200_' + randomSpin(1, 8) + '.gif');
      $('.spinner').show();
      // console.log("partiti");
    })
    .ajaxComplete(function () {
      $('.spinner').hide();
      // console.log("FINE");
    });

  $('.ui.dropdown').dropdown();
  $('.ui.toggle.checkbox').checkbox();

  $('.ui.dropdown#labelRimbo').dropdown({
    onChange: function (val, tex) {
      if ($('#boxGridSviluppo').is(':visible') || $('#boxSviluppo').is(':visible')) {
        if (rimborso == 0) {
          $('#boxGridSviluppo').removeClass('vis-hidden');
          $('#boxSviluppo').addClass('vis-hidden');
        } else {
          if (tex == 'Rimborso') {
            $('#boxGridSviluppo').removeClass('vis-hidden');
            $('#boxSviluppo').addClass('vis-hidden');
          } else if (tex == '1 perde') {
            $('#boxGridSviluppo').addClass('vis-hidden');
            $('#boxSviluppo').removeClass('vis-hidden');
          }
        }
      }
      if (tex == 'Rimborso') {
        rimboType = 0;
        $('#labelRimbo').removeClass('inRosso');
      } else if (tex == '1 perde') {
        rimboType = 1;
        $('#labelRimbo').addClass('inRosso');
      }
      // console.log("Tipo rimborso: " + rimboType);
      $('#mult_myRimbo').val(rimboType + '-' + rimborso);
      ricalcola();

      stopAccum();
    },
  });

  romeM1 = rome(dateH_M1, romeOpt);
  romeM2 = rome(dateH_M2, romeOpt);
  romeM3 = rome(dateH_M3, romeOpt);
  romeM4 = rome(dateH_M4, romeOpt);
  romeM5 = rome(dateH_M5, romeOpt);

  $('#mult_lamiapuntata')
    .keyup(function () {
      if ($('#mult_lamiapuntata').val()) {
        $('#AgendeBtnBox button').removeClass('disabled');
      } else {
        $('#AgendeBtnBox button').addClass('disabled');
      }
    })
    .change(function () {
      if ($('#mult_lamiapuntata').val()) {
        $('#AgendeBtnBox button').removeClass('disabled');
      } else {
        $('#AgendeBtnBox button').addClass('disabled');
      }
    });

  $('#mymultipla input').keyup(function () {
    ricalcola();
    formToJson();
    stopAccum();
  });

  $('#mymultipla input').change(function () {
    ricalcola();
    formToJson();
    stopAccum();
  });

  $('#mult_quantieventi').change(function () {
    $("[id*='grigliaSV_'] > div > div")
      .removeClass('lightMe0')
      .removeClass('lightMe1')
      .removeClass('lightMe2')
      .removeClass('lightMe3')
      .removeClass('lightMe4'); // AGGIUNTA 04/09/2019 12:13
    showtutto();
    var qp = $('#mult_quantieventi')[0].value;
    if (qp > 1 && qp < 5) {
      setTimeout(which_hide(qp), 100);
    }
    loopState();
    checkLosing();
    ricalcola();
    formToJson();
  });

  $("div[type='button']").click(function () {
    var rAgg = '.grid_rigaAgg_' + this.innerText; //.split("#")[1];
    var abbINITIAL = '#abb_New0_M' + this.innerText; //.split("#")[1];
    if ($(rAgg).css('display') == 'none') {
      $(rAgg).css('display', 'grid');
      $(abbINITIAL).focus();
      $('#iconB_M' + this.innerText)
        .toggleClass('up')
        .toggleClass('down');
      AggOpn = ++AggOpn;
    } else {
      $(rAgg).hide();
      $('#iconB_M' + this.innerText)
        .toggleClass('up')
        .toggleClass('down');
      AggOpn = --AggOpn;
    }
    checkOpn();
  });

  $('#myBlockcheck').on('change', function () {
    if ($('#myBlockcheck')[0].checked == true) {
      blockedSetUp.value = true;
      $('.dutcher-button').addClass('disabled');

      $('.grid_row_1 input[type="text"]').prop('disabled', true);
      $('.grid_row_2 input[type="text"]').prop('disabled', true);
      $('.grid_row_3 input[type="text"]').prop('disabled', true);
      $('.grid_row_4 input[type="text"]').prop('disabled', true);
      $('.grid_row_5 input[type="text"]').prop('disabled', true);
      $('#blocMsgContent')
        .html("<b><i class='key icon'></i><b>SET-UP</b> 'bloccato'")
        .addClass('redBloc')
        .removeClass('normalBloc');
    } else {
      blockedSetUp.value = false;
      $('.dutcher-button').removeClass('disabled');

      $('.grid_row_1 input[type="text"]').prop('disabled', false);
      $('.grid_row_2 input[type="text"]').prop('disabled', false);
      $('.grid_row_3 input[type="text"]').prop('disabled', false);
      $('.grid_row_4 input[type="text"]').prop('disabled', false);
      $('.grid_row_5 input[type="text"]').prop('disabled', false);
      $('#blocMsgContent')
        .html(
          "<b><i class='caret left icon'></i>'Blocca' il SET-UP iniziale per evitare modifiche accidentali.</b>"
        )
        .addClass('normalBloc')
        .removeClass('redBloc');
    }
  });

  $('#rigaAgg_1 input').on('keyup', function () {
    // console.log(this.id.substr(-2));
    totalizza(this.id, bancate);
    CP_teorica(this.id.substr(-2));
    setTimeout(showCop(this.id.substr(-2)), 200);
    ricalcola();
  });

  $('#rigaAgg_2 input').on('keyup', function () {
    // console.log(this.id.substr(-2));
    totalizza(this.id, bancate);
    CP_teorica(this.id.substr(-2));
    setTimeout(showCop(this.id.substr(-2)), 200);
    ricalcola();
  });

  $('#rigaAgg_3 input').on('keyup', function () {
    // console.log(this.id.substr(-2));
    totalizza(this.id, bancate);
    CP_teorica(this.id.substr(-2));
    setTimeout(showCop(this.id.substr(-2)), 200);
    ricalcola();
  });

  $('#rigaAgg_4 input').on('keyup', function () {
    // console.log(this.id.substr(-2));
    totalizza(this.id, bancate);
    CP_teorica(this.id.substr(-2));
    setTimeout(showCop(this.id.substr(-2)), 200);
    ricalcola();
  });

  $('#rigaAgg_5 input').on('keyup', function () {
    // console.log(this.id.substr(-2));
    totalizza(this.id, bancate);
    CP_teorica(this.id.substr(-2));
    setTimeout(showCop(this.id.substr(-2)), 200);
    ricalcola();
  });

  input_quote = $("input[id*='mult_quotaP_set']").add($("input[id*='mult_quotaB_set']"));
  $(input_quote).on('keyup', function () {
    for (var z = 1; z <= num_ev; z++) {
      var p = 'M' + z;
      CP_teorica(p);
      setTimeout(showCop(p), 200);
    }
  });

  $(input_quote).on('change', function () {
    for (var z = 1; z <= num_ev; z++) {
      var p = 'M' + z;
      CP_teorica(p);
      setTimeout(showCop(p), 200);
    }
  });

  $("input[id*='abb_New']").addClass('inputAbb');

  $("div[id*='banca_New']").addClass('bancaTEOR');

  $('.boxDCH_dx').hide();

  //$("#boxGridRisultatiIniziali").hide();

  //$("#boxGridSviluppo").hide();

  $('.mySWcheck').on('change', function () {
    var chepartita = this.id.substr(-2);
    // console.log(chepartita);
    var switch_elm = 'mySWcheck_' + chepartita;
    var lab_elem = 'labelSep_' + chepartita;
    var key_elm = '#provaDCH1_Q_' + chepartita;
    var keyCP_elm = '#provaCP_Q_' + chepartita;
    if ($(eval(switch_elm))[0].checked == true) {
      var hide_elm = 'boxCP_dx_' + chepartita;
      var show_elm = '.boxDCH_dx_' + chepartita;
      var radio_elm = '#boxRadioDch_' + chepartita;
      $(eval(hide_elm)).hide();
      $(show_elm).show();
      $(eval(lab_elem)).removeClass('label_CP').addClass('label_DCH');
      // console.log("Dutching");
      $(radio_elm).show();
      $(key_elm).keyup();
    } else {
      var hide_elm = '.boxDCH_dx_' + chepartita;
      var show_elm = 'boxCP_dx_' + chepartita;
      var quota_elm = 'provaCP_Q_' + chepartita;
      var punta_elm = 'provaCP_' + chepartita;
      var radio_elm = '#boxRadioDch_' + chepartita;
      var NO_elm = '#NO_Dch_' + chepartita;
      $(hide_elm).hide();
      $(eval(show_elm)).show();
      $(eval(lab_elem)).removeClass('label_DCH').addClass('label_CP');
      // console.log("Contropunta")
      $(radio_elm).hide();
      $(eval(quota_elm))[0].value = '';
      $(eval(punta_elm))[0].value = '';
      $(eval(quota_elm)).keyup();
      $(NO_elm)[0].checked = true;
      $(keyCP_elm).keyup();
    }
  });

  $('.boxDCH_dx input').on('keyup', function () {
    var thisMatch = this.id.substr(-2);
    var boxDCH_elem = '.boxDCH_dx_' + thisMatch + ' input';
    // console.log(boxDCH_elem);
    var dch1Odd_elem = 'provaDCH1_Q_' + thisMatch;
    var dch2Odd_elem = 'provaDCH2_Q_' + thisMatch;
    var dch1Punta_elem = 'provaDCH1_' + thisMatch;
    var dch2Punta_elem = 'provaDCH2_' + thisMatch;
    // console.log(dch1Odd_elem);
    // console.log(dch2Odd_elem);
    // console.log(dch1Punta_elem);
    // console.log(dch2Punta_elem);
    var dch1_win =
      qbToMath($(eval(dch1Odd_elem))[0].value) * DolToMath($(eval(dch1Punta_elem))[0].value);
    var dch2_win =
      qbToMath($(eval(dch2Odd_elem))[0].value) * DolToMath($(eval(dch2Punta_elem))[0].value);
    var sumDch =
      DolToMath($(eval(dch1Punta_elem))[0].value) + DolToMath($(eval(dch2Punta_elem))[0].value);
    // console.log(dch1_win);
    // console.log(dch2_win);
    // console.log(sumDch);
    var minDCH = Math.min(dch1_win, dch2_win);
    // console.log(minDCH);
    if (sumDch == 0) {
      var equiv_Odd = 1;
    } else {
      var equiv_Odd = minDCH / sumDch;
    }
    // console.log(equiv_Odd);
    var cpOdd_elm = 'provaCP_Q_' + thisMatch;
    var cpDoll_elm = 'provaCP_' + thisMatch;
    $(eval(cpOdd_elm))[0].value = equiv_Odd.toFixed(3);
    $(eval(cpDoll_elm))[0].value = sumDch.toFixed(2);
    $(eval(cpDoll_elm)).keyup();
  });

  $('#DivIntestazioneGrid').on('click', function () {
    $('#boxGridRisultatiIniziali').toggleClass('vis-hidden');
    if ($('#boxGridRisultatiIniziali').css('display') == 'none') {
      $('#occhio_set').toggleClass('slash').toggleClass('outline');
      //$("#DivIntestazioneGrid")[0].innerHTML = "MOSTRA CALCOLI INIZIALI";
    } else {
      $('#occhio_set').toggleClass('slash').toggleClass('outline');
      //$("#DivIntestazioneGrid")[0].innerHTML = "NASCONDI CALCOLI INIZIALI";
    }
  });

  //Commentato 04/09/2019 13:36
  /* $("#DivIntestazioneGrid_2").on('click', function() {
    $("#boxGridSviluppo").toggleClass('vis-hidden');
    if ($("#boxGridSviluppo").css("display") == "none") {
      $("#occhio_res").toggleClass("slash").toggleClass("outline");
      //$("#DivIntestazioneGrid_2")[0].innerHTML = "MOSTRA CALCOLI SVILUPPO";
    } else {
      $("#occhio_res").toggleClass("slash").toggleClass("outline");
      //$("#DivIntestazioneGrid_2")[0].innerHTML = "NASCONDI CALCOLI SVILUPPO";
    }
  }); */

  //AGIUNTO 04/09/2019 13:36
  $('#DivIntestazioneGrid_2').on('click', function () {
    if (rimboType == 1 && rimborso !== 0) {
      if ($('#boxGridSviluppo').is(':visible')) $('#boxGridSviluppo').toggleClass('vis-hidden');
      $('#boxSviluppo').toggleClass('vis-hidden');
      if ($('#boxSviluppo').css('display') == 'none') {
        $('#occhio_res').toggleClass('slash').toggleClass('outline');
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "MOSTRA CALCOLI SVILUPPO";
      } else {
        $('#occhio_res').toggleClass('slash').toggleClass('outline');
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "NASCONDI CALCOLI SVILUPPO";
      }
    } else if (rimboType == 0 || rimborso == 0) {
      if ($('#boxSviluppo').is(':visible')) $('#boxSviluppo').toggleClass('vis-hidden');
      $('#boxGridSviluppo').toggleClass('vis-hidden');
      if ($('#boxGridSviluppo').css('display') == 'none') {
        $('#occhio_res').toggleClass('slash').toggleClass('outline');
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "MOSTRA CALCOLI SVILUPPO";
      } else {
        $('#occhio_res').toggleClass('slash').toggleClass('outline');
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "NASCONDI CALCOLI SVILUPPO";
      }
    }
  });

  $('#mult_ilmiorimborso').on('keyup', function () {
    if ($('#boxGridSviluppo').is(':visible') || $('#boxSviluppo').is(':visible')) {
      if (rimborso == 0) {
        $('#boxGridSviluppo').removeClass('vis-hidden');
        $('#boxSviluppo').addClass('vis-hidden');
      } else {
        if (rimboType == 1) {
          $('#boxGridSviluppo').addClass('vis-hidden');
          $('#boxSviluppo').removeClass('vis-hidden');
        } else if (rimboType == 0) {
          $('#boxGridSviluppo').removeClass('vis-hidden');
          $('#boxSviluppo').addClass('vis-hidden');
        }
      }
    }

    stopAccum();
    /* if (rimboType == 1 && rimborso !==0) {
      $("#boxSviluppo").toggleClass('vis-hidden');
      if ($("#boxSviluppo").css("display") == "none") {
        $("#occhio_res").toggleClass("slash").toggleClass("outline");
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "MOSTRA CALCOLI SVILUPPO";
      } else {
        $("#occhio_res").toggleClass("slash").toggleClass("outline");
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "NASCONDI CALCOLI SVILUPPO";
      }
    } else if (rimboType == 0 || rimborso == 0) {
      $("#boxGridSviluppo").toggleClass('vis-hidden');
        if ($("#boxGridSviluppo").css("display") == "none") {
        $("#occhio_res").toggleClass("slash").toggleClass("outline");
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "MOSTRA CALCOLI SVILUPPO";
      } else {
        $("#occhio_res").toggleClass("slash").toggleClass("outline");
        //$("#DivIntestazioneGrid_2")[0].innerHTML = "NASCONDI CALCOLI SVILUPPO";
      }
    } */
  });

  $("input[id*='radio'][id*='M']")
    .on('click', function () {
      OnOffThisAgg(this.id);
      loopState();
      for (var x = 0; x < num_ev; x++) {
        actualGain(x + 1);
      }
      ricalcola();
      checkLosing();

      lighter(); // AGGIUNTA 04/09/2019 11:30

      var Mthis = parseFloat(this.id.substr(-2)[1]) + 1; // AGGIUNTA 06/09/2019 10:30
      // console.log(Mthis);
      for (var w = Mthis; w <= num_ev; w++) {
        // console.log("M"+w);
        totalizza('M' + w, bancate);
        showCop('M' + w);
      } // FINE AGGIUNTA 06/09/2019 10:30

      //OnOffThisAgg(this.id);
      // console.log("rimbotype: ", rimboType);
    })
    .on('change', function () {
      OnOffThisAgg(this.id);
      loopState();
      for (var x = 0; x < num_ev; x++) {
        actualGain(x + 1);
      }
      ricalcola();
      checkLosing();

      lighter(); // AGGIUNTA 04/09/2019 11:30

      var Mthis = parseFloat(this.id.substr(-2)[1]) + 1; // AGGIUNTA 06/09/2019 10:30
      // console.log(Mthis);
      for (var w = Mthis; w <= num_ev; w++) {
        // console.log("M"+w);
        totalizza('M' + w, bancate);
        showCop('M' + w);
      } // FINE AGGIUNTA 06/09/2019 10:30

      //OnOffThisAgg(this.id);
      stopAccum();
    });

  /*$(".ui.radio.checkbox input").on("click", function() {
    var radioM = this.id.split("_M")[1];
    var radioT = this.value.split("_")[0];
    radio_manage(radioM, radioT);
  });*/

  $(".boxRadioDch input[type='radio']").on('change', function () {
    var questomatch = this.id.substr(-2);
    var keyAp_elm = '#provaDCH1_Q_' + questomatch;
    $(keyAp_elm).keyup();
  });

  $('#btn_SAV').on('click', function () {
    openSaveDlg();
  });

  $('#btn_LOAD').on('click', function () {
    openLoadDlg();
  });

  $('#btn_UPD').on('click', function () {
    openUpdDlg();
  });

  $('#btn_RESET').on('click', function () {
    resetAll();
  });

  $('#sendToExc').on('click', function () {
    copyForEx();
  });

  $('#sendToOnline').on('click', function () {
    // if (rimboType == 0) {
    // 	if ($('[id*=statusResults].badgeOnGo.lightMe.theEnd').length > 0) {
    // 		ENDGain = $('[id*=statusResults].badgeOnGo.lightMe.theEnd')[
    // 			$('[id*=statusResults].badgeOnGo.lightMe.theEnd').length - 1
    // 		].innerHTML;
    // 	}
    // } else if ((rimboType = 1)) {
    // 	if ($('.lightMe0').length == 1) {
    // 		ENDGain = $('.lightMe0 .SVresultBox .SV_earn').html();
    // 	}
    // }
    // aprimaschera();
    _toNewAol();
  });

  $('#bypLocStMul').on('click', function () {
    $('#confermaLocal').modal('hide');
    $('#mult_quantieventi')[0].value = 2;
    $('#mult_quantieventi').change();
  });

  document.querySelectorAll('.dutcher-button').forEach(btn => {
    const match = btn.dataset.match;
    btn.addEventListener('click', pasteDutcherData.bind(null, match));
  });

  ricalcola();

  //splitDocumentUrl();
  manageLocalBuf();

  //$("#mult_quantieventi")[0].value = 2;
  //$("#mult_quantieventi").change();

  checkOpn();

  $("[class*='grid_rigaAgg_']")
    .on('focusin', function () {
      var rigaHover = this.id.substr(-1);
      // console.log('Riga: ' + rigaHover);
      $("[class*='grid_row_" + rigaHover + "']").addClass('hoverMe');
    })
    .on('focusout', function () {
      var rigaHover = this.id.substr(-1);
      // console.log('Riga: ' + rigaHover);
      $("[class*='grid_row_" + rigaHover + "']").removeClass('hoverMe');
    });
});

function norm_quotaT(quota) {
  quota == ''
    ? (myquotta = 1)
    : quota.substr(0, 1) == '@'
    ? (myquotta = parseFloat(quota.split('@')[1]))
    : (myquotta = parseFloat(quota));
  return myquotta;
}

function zero_quotaT(quota) {
  quota == ''
    ? (myquotta = 0)
    : quota.substr(0, 1) == '@'
    ? (myquotta = parseFloat(quota.split('@')[1]))
    : (myquotta = parseFloat(quota));
  return myquotta;
}

function norm_com(com) {
  com == '' ? (myComz = 0) : (myComz = parseFloat(com.split('%')[0]));
  return myComz;
}

function ret_qb(q_lay) {
  var q;
  typeof q_lay == 'string'
    ? q_lay == ''
      ? //? q = "@1.00" // MODIFICA 19/08/2019 h18:19
        (q = '')
      : q_lay.substr(0, 1) == '@'
      ? (q = '@' + parseFloat(q_lay.split('@')[1]).toFixed(2))
      : (q = '@' + parseFloat(q_lay.split('@')[0]).toFixed(2))
    : (q = '@' + q_lay.toFixed(2));
  return q;
}

function qbToMath(odd) {
  var q;
  typeof odd == 'string'
    ? odd == ''
      ? (q = 1)
      : odd.substr(0, 1) == '@'
      ? (q = parseFloat(odd.split('@')[1]))
      : (q = parseFloat(odd.split('@')[0]))
    : (q = odd);
  return q;
}

function DolToMath(dol) {
  var d;
  typeof dol == 'string'
    ? dol == ''
      ? (d = 0)
      : dol.substr(-1) == '€'
      ? (d = parseFloat(dol.split('€')[0]))
      : (d = parseFloat(dol))
    : (d = dol);
  return d;
}

function ret_com(comz) {
  typeof comz == 'string'
    ? comz == ''
      ? (c = '')
      : (c = parseFloat(comz).toFixed(2) + '%')
    : (c = comz.toFixed(2) + '%');
  return c;
}

function ret_doll(imp) {
  typeof imp == 'string'
    ? imp == ''
      ? (i = '')
      : (i = parseFloat(imp).toFixed(2) + '€')
    : (i = imp.toFixed(2) + '€');
  return i;
}

function matrici(num, c, b1, b2, b3, b4, b5) {
  b1 = norm_quotaT(b1);
  b2 = norm_quotaT(b2);
  b3 = norm_quotaT(b3);
  b4 = norm_quotaT(b4);
  b5 = norm_quotaT(b5);

  c = norm_com(c) / 100;
  //c2 = norm_quotaT(c2)/100;
  //c3 = norm_quotaT(c3)/100;
  //c4 = norm_quotaT(c4)/100;
  //c5 = norm_quotaT(c5)/100;

  if (num == '') num = '2';

  switch (num) {
    case '2':
      matrix = [
        [1, b1 - 1, b2 - 1, 0], //VV
        [1, b1 - 1, -(1 - c), 0], //VP
        [1, -(1 - c), 0, b2 - 1], //PV
        [1, -(1 - c), 0, -(1 - c)],
      ]; //PP
      break;
    case '3':
      matrix = [
        [1, b1 - 1, b2 - 1, 0, b3 - 1, 0, 0, 0], //VVV
        [1, b1 - 1, b2 - 1, 0, -(1 - c), 0, 0, 0], //VVP
        [1, b1 - 1, -(1 - c), 0, 0, b3 - 1, 0, 0], //VPV
        [1, b1 - 1, -(1 - c), 0, 0, -(1 - c), 0, 0], //VPP
        [1, -(1 - c), 0, b2 - 1, 0, 0, b3 - 1, 0], //PVV
        [1, -(1 - c), 0, b2 - 1, 0, 0, -(1 - c), 0], //PVP
        [1, -(1 - c), 0, -(1 - c), 0, 0, 0, b3 - 1], //PPV
        [1, -(1 - c), 0, -(1 - c), 0, 0, 0, -(1 - c)],
      ]; //PPP
      break;
    case '4':
      matrix = [
        [1, b1 - 1, b2 - 1, 0, b3 - 1, 0, 0, 0, b4 - 1, 0, 0, 0, 0, 0, 0, 0], //VVVV
        [1, b1 - 1, b2 - 1, 0, b3 - 1, 0, 0, 0, -(1 - c), 0, 0, 0, 0, 0, 0, 0], //VVVP
        [1, b1 - 1, b2 - 1, 0, -(1 - c), 0, 0, 0, 0, b4 - 1, 0, 0, 0, 0, 0, 0], //VVPV
        [1, b1 - 1, b2 - 1, 0, -(1 - c), 0, 0, 0, 0, -(1 - c), 0, 0, 0, 0, 0, 0], //VVPP
        [1, b1 - 1, -(1 - c), 0, 0, b3 - 1, 0, 0, 0, 0, b4 - 1, 0, 0, 0, 0, 0], //VPVV
        [1, b1 - 1, -(1 - c), 0, 0, b3 - 1, 0, 0, 0, 0, -(1 - c), 0, 0, 0, 0, 0], //VPVP
        [1, b1 - 1, -(1 - c), 0, 0, -(1 - c), 0, 0, 0, 0, 0, b4 - 1, 0, 0, 0, 0], //VPPV
        [1, b1 - 1, -(1 - c), 0, 0, -(1 - c), 0, 0, 0, 0, 0, -(1 - c), 0, 0, 0, 0], //VPPP
        [1, -(1 - c), 0, b2 - 1, 0, 0, b3 - 1, 0, 0, 0, 0, 0, b4 - 1, 0, 0, 0], //PVVV
        [1, -(1 - c), 0, b2 - 1, 0, 0, b3 - 1, 0, 0, 0, 0, 0, -(1 - c), 0, 0, 0], //PVVP
        [1, -(1 - c), 0, b2 - 1, 0, 0, -(1 - c), 0, 0, 0, 0, 0, 0, b4 - 1, 0, 0], //PVPV
        [1, -(1 - c), 0, b2 - 1, 0, 0, -(1 - c), 0, 0, 0, 0, 0, 0, -(1 - c), 0, 0], //PVPP
        [1, -(1 - c), 0, -(1 - c), 0, 0, 0, b3 - 1, 0, 0, 0, 0, 0, 0, b4 - 1, 0], //PPVV
        [1, -(1 - c), 0, -(1 - c), 0, 0, 0, b3 - 1, 0, 0, 0, 0, 0, 0, -(1 - c), 0], //PPVP
        [1, -(1 - c), 0, -(1 - c), 0, 0, 0, -(1 - c), 0, 0, 0, 0, 0, 0, 0, b4 - 1], //PPPV
        [1, -(1 - c), 0, -(1 - c), 0, 0, 0, -(1 - c), 0, 0, 0, 0, 0, 0, 0, -(1 - c)],
      ]; //PPPP
      break;
    case '5':
      matrix = [
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          b3 - 1,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVVVV
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          b3 - 1,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVVVP
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          b3 - 1,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVVPV
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          b3 - 1,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVVPP
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVPVV
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVPVP
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVPPV
        [
          1,
          b1 - 1,
          b2 - 1,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VVPPP
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPVVV
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPVVP
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPVPV
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPVPP
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPPVV
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPPVP
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPPPV
        [
          1,
          b1 - 1,
          -(1 - c),
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //VPPPP
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //PVVVV
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //PVVVP
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
        ], //PVVPV
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
        ], //PVVPP
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
          0,
        ], //PVPVV
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
        ], //PVPVP
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
          0,
        ], //PVPPV
        [
          1,
          -(1 - c),
          0,
          b2 - 1,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
        ], //PVPPP
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
          0,
        ], //PPVVV
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
        ], //PPVVP
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
          0,
        ], //PPVPV
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          b3 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
        ], //PPVPP
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
          0,
        ], //PPPVV
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b4 - 1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
        ], //PPPVP
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          b5 - 1,
        ], //PPPPV
        [
          1,
          -(1 - c),
          0,
          -(1 - c),
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          -(1 - c),
        ],
      ]; //PPPPP
      break;
  }
  return matrix;
}

function costanti(
  num,
  p,
  r,
  q1,
  cp1,
  qCp1,
  q2,
  cp2,
  qCp2,
  q3,
  cp3,
  qCp3,
  q4,
  cp4,
  qCp4,
  q5,
  cp5,
  qCp5
) {
  q1 = norm_quotaT(q1);
  q2 = norm_quotaT(q2);
  q3 = norm_quotaT(q3);
  q4 = norm_quotaT(q4);
  q5 = norm_quotaT(q5);
  qCp1 = norm_quotaT(qCp1);
  qCp2 = norm_quotaT(qCp2);
  qCp3 = norm_quotaT(qCp3);
  qCp4 = norm_quotaT(qCp4);
  qCp5 = norm_quotaT(qCp5);

  if (num == '') num = '2';
  if (p == '') p = '0';
  if (r == '') r = '0';
  if (cp1 == '') cp1 = '0';
  if (cp2 == '') cp2 = '0';
  if (cp3 == '') cp3 = '0';
  if (cp4 == '') cp4 = '0';
  if (cp5 == '') cp5 = '0';

  //qTot = norm_quotaT(q1)*norm_quotaT(q2)*norm_quotaT(q3)*norm_quotaT(q4)*norm_quotaT(q5);
  qTot = q1 * q2 * q3 * q4 * q5;
  p = parseFloat(p);
  r = parseFloat(r);
  cp1 = parseFloat(cp1);
  cp2 = parseFloat(cp2);
  cp3 = parseFloat(cp3);
  cp4 = parseFloat(cp4);
  cp5 = parseFloat(cp5);

  switch (num) {
    case '2':
      if (rimboType == 0) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2], //VV
          [-p + r - cp1 + cp2 * (qCp2 - 1)], //VP
          [-p + r + cp1 * (qCp1 - 1) - cp2], //PV
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1)],
        ]; //PP
      } else if (rimboType == 1) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2], //VV
          [-p + r - cp1 + cp2 * (qCp2 - 1)], //VP
          [-p + r + cp1 * (qCp1 - 1) - cp2], //PV
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1)],
        ]; //PP
      }
      break;
    case '3':
      if (rimboType == 0) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2 - cp3], //VVV
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1)], //VVP
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3], //VPV
          [-p + r - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1)], //VPP
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3], //PVV
          [-p + r + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1)], //PVP
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3], //PPV
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1)],
        ]; //PPP
      } else if (rimboType == 1) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2 - cp3], //VVV
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1)], //VVP
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3], //VPV
          [-p - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1)], //VPP
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3], //PVV
          [-p + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1)], //PVP
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3], //PPV
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1)],
        ]; //PPP
      }
      break;
    case '4':
      if (rimboType == 0) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2 - cp3 - cp4], //VVVV
          [-p + r - cp1 - cp2 - cp3 + cp4 * (qCp4 - 1)], //VVVP
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) - cp4], //VVPV
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)], //VVPP
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 - cp4], //VPVV
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1)], //VPVP
          [-p + r - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4], //VPPV
          [-p + r - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)], //VPPP
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 - cp4], //PVVV
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 + cp4 * (qCp4 - 1)], //PVVP
          [-p + r + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) - cp4], //PVPV
          [-p + r + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)], //PVPP
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 - cp4], //PPVV
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1)], //PPVP
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4], //PPPV
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)],
        ]; //PPPP
      } else if (rimboType == 1) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2 - cp3 - cp4], //VVVV
          [-p + r - cp1 - cp2 - cp3 + cp4 * (qCp4 - 1)], //VVVP
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) - cp4], //VVPV
          [-p - cp1 - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)], //VVPP
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 - cp4], //VPVV
          [-p - cp1 + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1)], //VPVP
          [-p - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4], //VPPV
          [-p - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)], //VPPP
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 - cp4], //PVVV
          [-p + cp1 * (qCp1 - 1) - cp2 - cp3 + cp4 * (qCp4 - 1)], //PVVP
          [-p + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) - cp4], //PVPV
          [-p + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)], //PVPP
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 - cp4], //PPVV
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1)], //PPVP
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4], //PPPV
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1)],
        ]; //PPPP
      }
      break;
    case '5':
      if (rimboType == 0) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2 - cp3 - cp4 - cp5], //VVVVV
          [-p + r - cp1 - cp2 - cp3 - cp4 + cp5 * (qCp5 - 1)], //VVVVP
          [-p + r - cp1 - cp2 - cp3 + cp4 * (qCp4 - 1) - cp5], //VVVPV
          [-p + r - cp1 - cp2 - cp3 + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //VVVPP
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) - cp4 - cp5], //VVPVV
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) - cp4 + cp5 * (qCp5 - 1)], //VVPVP
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) - cp5], //VVPPV
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //VVPPP
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 - cp4 - cp5], //VPVVV
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 - cp4 + cp5 * (qCp5 - 1)], //VPVVP
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1) - cp5], //VPVPV
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //VPVPP
          [-p + r - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4 - cp5], //VPPVV
          [-p + r - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4 + cp5 * (qCp5 - 1)], //VPPVP
          [-p + r - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) - cp5], //VPPPV
          [
            -p +
              r -
              cp1 +
              cp2 * (qCp2 - 1) +
              cp3 * (qCp3 - 1) +
              cp4 * (qCp4 - 1) +
              cp5 * (qCp5 - 1),
          ], //VPPPP
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 - cp4 - cp5], //PVVVV
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 - cp4 + cp5 * (qCp5 - 1)], //PVVVP
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 + cp4 * (qCp4 - 1) - cp5], //PVVPV
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //PVVPP
          [-p + r + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) - cp4 - cp5], //PVPVV
          [-p + r + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) - cp4 + cp5 * (qCp5 - 1)], //PVPVP
          [-p + r + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) - cp5], //PVPPV
          [
            -p +
              r +
              cp1 * (qCp1 - 1) -
              cp2 +
              cp3 * (qCp3 - 1) +
              cp4 * (qCp4 - 1) +
              cp5 * (qCp5 - 1),
          ], //PVPPP
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 - cp4 - cp5], //PPVVV
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 - cp4 + cp5 * (qCp5 - 1)], //PPVVP
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1) - cp5], //PPVPV
          [
            -p +
              r +
              cp1 * (qCp1 - 1) +
              cp2 * (qCp2 - 1) -
              cp3 +
              cp4 * (qCp4 - 1) +
              cp5 * (qCp5 - 1),
          ], //PPVPP
          [-p + r + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4 - cp5], //PPPVV
          [
            -p +
              r +
              cp1 * (qCp1 - 1) +
              cp2 * (qCp2 - 1) +
              cp3 * (qCp3 - 1) -
              cp4 +
              cp5 * (qCp5 - 1),
          ], //PPPVP
          [
            -p +
              r +
              cp1 * (qCp1 - 1) +
              cp2 * (qCp2 - 1) +
              cp3 * (qCp3 - 1) +
              cp4 * (qCp4 - 1) -
              cp5,
          ], //PPPPV
          [
            -p +
              r +
              cp1 * (qCp1 - 1) +
              cp2 * (qCp2 - 1) +
              cp3 * (qCp3 - 1) +
              cp4 * (qCp4 - 1) +
              cp5 * (qCp5 - 1),
          ],
        ]; //PPPPP
      } else if (rimboType == 1) {
        myConst = [
          [p * (qTot - 1) - cp1 - cp2 - cp3 - cp4 - cp5], //VVVVV
          [-p + r - cp1 - cp2 - cp3 - cp4 + cp5 * (qCp5 - 1)], //VVVVP
          [-p + r - cp1 - cp2 - cp3 + cp4 * (qCp4 - 1) - cp5], //VVVPV
          [-p - cp1 - cp2 - cp3 + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //VVVPP
          [-p + r - cp1 - cp2 + cp3 * (qCp3 - 1) - cp4 - cp5], //VVPVV
          [-p - cp1 - cp2 + cp3 * (qCp3 - 1) - cp4 + cp5 * (qCp5 - 1)], //VVPVP
          [-p - cp1 - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) - cp5], //VVPPV
          [-p - cp1 - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //VVPPP
          [-p + r - cp1 + cp2 * (qCp2 - 1) - cp3 - cp4 - cp5], //VPVVV
          [-p - cp1 + cp2 * (qCp2 - 1) - cp3 - cp4 + cp5 * (qCp5 - 1)], //VPVVP
          [-p - cp1 + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1) - cp5], //VPVPV
          [-p - cp1 + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //VPVPP
          [-p - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4 - cp5], //VPPVV
          [-p - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4 + cp5 * (qCp5 - 1)], //VPPVP
          [-p - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) - cp5], //VPPPV
          [-p - cp1 + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //VPPPP
          [-p + r + cp1 * (qCp1 - 1) - cp2 - cp3 - cp4 - cp5], //PVVVV
          [-p + cp1 * (qCp1 - 1) - cp2 - cp3 - cp4 + cp5 * (qCp5 - 1)], //PVVVP
          [-p + cp1 * (qCp1 - 1) - cp2 - cp3 + cp4 * (qCp4 - 1) - cp5], //PVVPV
          [-p + cp1 * (qCp1 - 1) - cp2 - cp3 + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //PVVPP
          [-p + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) - cp4 - cp5], //PVPVV
          [-p + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) - cp4 + cp5 * (qCp5 - 1)], //PVPVP
          [-p + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) - cp5], //PVPPV
          [-p + cp1 * (qCp1 - 1) - cp2 + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //PVPPP
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 - cp4 - cp5], //PPVVV
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 - cp4 + cp5 * (qCp5 - 1)], //PPVVP
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1) - cp5], //PPVPV
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) - cp3 + cp4 * (qCp4 - 1) + cp5 * (qCp5 - 1)], //PPVPP
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4 - cp5], //PPPVV
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) - cp4 + cp5 * (qCp5 - 1)], //PPPVP
          [-p + cp1 * (qCp1 - 1) + cp2 * (qCp2 - 1) + cp3 * (qCp3 - 1) + cp4 * (qCp4 - 1) - cp5], //PPPPV
          [
            -p +
              cp1 * (qCp1 - 1) +
              cp2 * (qCp2 - 1) +
              cp3 * (qCp3 - 1) +
              cp4 * (qCp4 - 1) +
              cp5 * (qCp5 - 1),
          ],
        ]; //PPPPP
      }
      break;
  }
  return myConst;
}

function ricalcola() {
  num_ev = $('#mult_quantieventi')[0].value;
  puntata = $('#mult_lamiapuntata')[0].value;
  rimborso = DolToMath($('#mult_ilmiorimborso').val());

  com = $('#mult_lamiacommissione')[0].value;
  bonus = $('#mult_ilmiobonus')[0].value;

  controP1 = $('#provaCP_M1')[0].value;
  qCP1 = $('#provaCP_Q_M1')[0].value;
  controP2 = $('#provaCP_M2')[0].value;
  qCP2 = $('#provaCP_Q_M2')[0].value;
  controP3 = $('#provaCP_M3')[0].value;
  qCP3 = $('#provaCP_Q_M3')[0].value;
  controP4 = $('#provaCP_M4')[0].value;
  qCP4 = $('#provaCP_Q_M4')[0].value;
  controP5 = $('#provaCP_M5')[0].value;
  qCP5 = $('#provaCP_Q_M5')[0].value;

  quota1 = $('#mult_quotaP_set1')[0].value;
  quota2 = $('#mult_quotaP_set2')[0].value;
  quota3 = $('#mult_quotaP_set3')[0].value;
  quota4 = $('#mult_quotaP_set4')[0].value;
  quota5 = $('#mult_quotaP_set5')[0].value;

  qbanca1 = $('#mult_quotaB_set1')[0].value;
  qbanca2 = $('#mult_quotaB_set2')[0].value;
  qbanca3 = $('#mult_quotaB_set3')[0].value;
  qbanca4 = $('#mult_quotaB_set4')[0].value;
  qbanca5 = $('#mult_quotaB_set5')[0].value;

  //com1 = $("#mult_comm_set1")[0].value;
  //com2 = $("#mult_comm_set2")[0].value;
  //com3 = $("#mult_comm_set3")[0].value;
  //com4 = $("#mult_comm_set4")[0].value;
  //com5 = $("#mult_comm_set5")[0].value;

  MX1 = matrici(num_ev, com, qbanca1, qbanca2, qbanca3, qbanca4, qbanca5);
  COS1 = costanti(
    num_ev,
    puntata,
    rimborso,
    quota1,
    controP1,
    qCP1,
    quota2,
    controP2,
    qCP2,
    quota3,
    controP3,
    qCP3,
    quota4,
    controP4,
    qCP4,
    quota5,
    controP5,
    qCP5
  );

  vector_res = math.multiply(math.inv(MX1), COS1);

  gain = vector_res[0][0] + DolToMath(bonus);

  banca1 = vector_res[1][0];

  banca2v = vector_res[2][0];
  banca2p = vector_res[3][0];

  banca2 = trovaR('banca', 2);

  /* if (rimboType == 0) {
    banca2 = vector_res[2][0];
  } else if (rimboType == 1) {
    //fai qualcosa (funzione)
    banca2 = trovaR("banca", 2);
  } */

  if (num_ev > 2) {
    if (typeof vector_res[4][0] !== undefined) banca3vv = vector_res[4][0];
    if (typeof vector_res[5][0] !== undefined) banca3vp = vector_res[5][0];
    if (typeof vector_res[6][0] !== undefined) banca3pv = vector_res[6][0];
    if (typeof vector_res[7][0] !== undefined) banca3pp = vector_res[7][0];

    banca3 = trovaR('banca', 3);

    /* if (rimboType == 0) {
      banca3 = vector_res[4][0];
    } else if (rimboType == 1) {
      //fai qualcosa (funzione)
      banca3 = trovaR("banca", 3);
    } */
  }

  if (num_ev > 3) {
    if (typeof vector_res[8][0] !== undefined) banca4vvv = vector_res[8][0];
    if (typeof vector_res[9][0] !== undefined) banca4vvp = vector_res[9][0];
    if (typeof vector_res[10][0] !== undefined) banca4vpv = vector_res[10][0];
    if (typeof vector_res[11][0] !== undefined) banca4vpp = vector_res[11][0];
    if (typeof vector_res[12][0] !== undefined) banca4pvv = vector_res[12][0];
    if (typeof vector_res[13][0] !== undefined) banca4pvp = vector_res[13][0];
    if (typeof vector_res[14][0] !== undefined) banca4ppv = vector_res[14][0];
    if (typeof vector_res[15][0] !== undefined) banca4ppp = vector_res[15][0];

    banca4 = trovaR('banca', 4);

    /* if (rimboType == 0) {
      banca4 = vector_res[8][0];
    } else if (rimboType == 1) {
      //fai qualcosa (funzione)
      banca4 = trovaR("banca", 4);
    } */
  }

  if (num_ev > 4) {
    if (typeof vector_res[16][0] !== undefined) banca5vvvv = vector_res[16][0];
    if (typeof vector_res[17][0] !== undefined) banca5vvvp = vector_res[17][0];
    if (typeof vector_res[18][0] !== undefined) banca5vvpv = vector_res[18][0];
    if (typeof vector_res[19][0] !== undefined) banca5vvpp = vector_res[19][0];
    if (typeof vector_res[20][0] !== undefined) banca5vpvv = vector_res[20][0];
    if (typeof vector_res[21][0] !== undefined) banca5vpvp = vector_res[21][0];
    if (typeof vector_res[22][0] !== undefined) banca5vppv = vector_res[22][0];
    if (typeof vector_res[23][0] !== undefined) banca5vppp = vector_res[23][0];
    if (typeof vector_res[24][0] !== undefined) banca5pvvv = vector_res[24][0];
    if (typeof vector_res[25][0] !== undefined) banca5pvvp = vector_res[25][0];
    if (typeof vector_res[26][0] !== undefined) banca5pvpv = vector_res[26][0];
    if (typeof vector_res[27][0] !== undefined) banca5pvpp = vector_res[27][0];
    if (typeof vector_res[28][0] !== undefined) banca5ppvv = vector_res[28][0];
    if (typeof vector_res[29][0] !== undefined) banca5ppvp = vector_res[29][0];
    if (typeof vector_res[30][0] !== undefined) banca5pppv = vector_res[30][0];
    if (typeof vector_res[31][0] !== undefined) banca5pppp = vector_res[31][0];

    banca5 = trovaR('banca', 5);

    /* if (rimboType == 0) {
      banca5 = vector_res[16][0];
    } else if (rimboType == 1) {
      //fai qualcosa (funzione)
      banca5 = trovaR ("banca", 5);
    } */
  }

  grossWin =
    DolToMath(puntata) *
    qbToMath(quota1) *
    qbToMath(quota2) *
    qbToMath(quota3) *
    qbToMath(quota4) *
    qbToMath(quota5);
  netWin = grossWin - DolToMath(puntata) + DolToMath(bonus);

  // console.log(vector_res);

  B_MX = matrici(num_ev, com, qbanca1, qbanca2, qbanca3, qbanca4, qbanca5);
  B_COS = costanti(
    num_ev,
    puntata,
    rimborso,
    quota1,
    0,
    0,
    quota2,
    0,
    0,
    quota3,
    0,
    0,
    quota4,
    0,
    0,
    quota5,
    0,
    0
  );

  bench_vector_res = math.multiply(math.inv(B_MX), B_COS);

  bench_gain = bench_vector_res[0][0] + DolToMath(bonus);

  benchB1 = bench_vector_res[1][0];
  startB1 = bench_vector_res[1][0];

  benchB2v = bench_vector_res[2][0];
  benchB2p = bench_vector_res[3][0];
  startB2 = bench_vector_res[2][0];

  if (rimboType == 0) {
    benchB2 = bench_vector_res[2][0];
  } else if (rimboType == 1) {
    //fai qualcosa (funzione)
    benchB2 = trovaR('benchB', 2);
  }

  if (num_ev > 2) {
    if (typeof bench_vector_res[4][0] !== undefined) benchB3vv = bench_vector_res[4][0];
    if (typeof bench_vector_res[5][0] !== undefined) benchB3vp = bench_vector_res[5][0];
    if (typeof bench_vector_res[6][0] !== undefined) benchB3pv = bench_vector_res[6][0];
    if (typeof bench_vector_res[7][0] !== undefined) benchB3pp = bench_vector_res[7][0];
    startB3 = bench_vector_res[4][0];
    if (rimboType == 0) {
      benchB3 = bench_vector_res[4][0];
    } else if (rimboType == 1) {
      //fai qualcosa (funzione)
      benchB3 = trovaR('benchB', 3);
    }
  }

  if (num_ev > 3) {
    if (typeof bench_vector_res[8][0] !== undefined) benchB4vvv = bench_vector_res[8][0];
    if (typeof bench_vector_res[9][0] !== undefined) benchB4vvp = bench_vector_res[9][0];
    if (typeof bench_vector_res[10][0] !== undefined) benchB4vpv = bench_vector_res[10][0];
    if (typeof bench_vector_res[11][0] !== undefined) benchB4vpp = bench_vector_res[11][0];
    if (typeof bench_vector_res[12][0] !== undefined) benchB4pvv = bench_vector_res[12][0];
    if (typeof bench_vector_res[13][0] !== undefined) benchB4pvp = bench_vector_res[13][0];
    if (typeof bench_vector_res[14][0] !== undefined) benchB4ppv = bench_vector_res[14][0];
    if (typeof bench_vector_res[15][0] !== undefined) benchB4ppp = bench_vector_res[15][0];
    startB4 = bench_vector_res[8][0];
    if (rimboType == 0) {
      benchB4 = bench_vector_res[8][0];
    } else if (rimboType == 1) {
      //fai qualcosa (funzione)
      benchB4 = trovaR('benchB', 4);
    }
  }

  if (num_ev > 4) {
    if (typeof bench_vector_res[16][0] !== undefined) benchB5vvvv = bench_vector_res[16][0];
    if (typeof bench_vector_res[17][0] !== undefined) benchB5vvvp = bench_vector_res[17][0];
    if (typeof bench_vector_res[18][0] !== undefined) benchB5vvpv = bench_vector_res[18][0];
    if (typeof bench_vector_res[19][0] !== undefined) benchB5vvpp = bench_vector_res[19][0];
    if (typeof bench_vector_res[20][0] !== undefined) benchB5vpvv = bench_vector_res[20][0];
    if (typeof bench_vector_res[21][0] !== undefined) benchB5vpvp = bench_vector_res[21][0];
    if (typeof bench_vector_res[22][0] !== undefined) benchB5vppv = bench_vector_res[22][0];
    if (typeof bench_vector_res[23][0] !== undefined) benchB5vppp = bench_vector_res[23][0];
    if (typeof bench_vector_res[24][0] !== undefined) benchB5pvvv = bench_vector_res[24][0];
    if (typeof bench_vector_res[25][0] !== undefined) benchB5pvvp = bench_vector_res[25][0];
    if (typeof bench_vector_res[26][0] !== undefined) benchB5pvpv = bench_vector_res[26][0];
    if (typeof bench_vector_res[27][0] !== undefined) benchB5pvpp = bench_vector_res[27][0];
    if (typeof bench_vector_res[28][0] !== undefined) benchB5ppvv = bench_vector_res[28][0];
    if (typeof bench_vector_res[29][0] !== undefined) benchB5ppvp = bench_vector_res[29][0];
    if (typeof bench_vector_res[30][0] !== undefined) benchB5pppv = bench_vector_res[30][0];
    if (typeof bench_vector_res[31][0] !== undefined) benchB5pppp = bench_vector_res[31][0];
    startB5 = bench_vector_res[16][0];
    if (rimboType == 0) {
      benchB5 = bench_vector_res[16][0];
    } else if (rimboType == 1) {
      //fai qualcosa (funzione)
      benchB5 = trovaR('benchB', 5);
    }
  }

  if (!puntata) {
    bench_rating = 100;
    bench_CR = 0;
  } else {
    if (bench_rating > 100) {
      bench_rating = 100 + 100 * ((bench_gain - bonus) / puntata);
    } else {
      bench_rating = 100 + 100 * ((bench_gain - bonus) / puntata);
    }

    if (rimborso != 0) {
      bench_CR = 100 * ((bench_gain - bonus) / rimborso);
    } else {
      bench_CR = 0;
    }
  }

  $('#qTot_div')[0].innerHTML = ret_qb(qTot);

  if (!puntata) {
    /*$("#lay_tabRisult_M1")[0].innerHTML = DashForZero(startB1); //startB1.toFixed(2) + " €";
    $("#lay_tabRisult_M1").removeClass('righty');
  	
    $("#lay_tabRisult_M2")[0].innerHTML = DashForZero(startB2); //startB2.toFixed(2) + " €";
    $("#lay_tabRisult_M2").removeClass('waitLay');
    $("#lay_tabRisult_M2").removeClass('righty');
  	
    $("#lay_tabRisult_M3")[0].innerHTML = DashForZero(startB3); //startB3.toFixed(2) + " €";
    $("#lay_tabRisult_M3").removeClass('waitLay');
    $("#lay_tabRisult_M3").removeClass('righty');
  	
    $("#lay_tabRisult_M4")[0].innerHTML = DashForZero(startB4); //startB4.toFixed(2) + " €";
    $("#lay_tabRisult_M4").removeClass('waitLay');
    $("#lay_tabRisult_M4").removeClass('righty');
  	
    $("#lay_tabRisult_M5")[0].innerHTML = DashForZero(startB5); //startB5.toFixed(2) + " €";
    $("#lay_tabRisult_M5").removeClass('waitLay');
    $("#lay_tabRisult_M5").removeClass('righty');*/
  } else {
    $('#lay_tabRisult_M1')[0].innerHTML =
      /*startB1.toFixed(2) + " €" + */ '<div class="layYES" id="warnS_M1">BANCA</div>';
    $('#lay_tabRisult_M1').addClass('righty');

    $('#lay_tabRisult_M2')[0].innerHTML =
      /*startB2.toFixed(2) + " €" + */ '<div class="layNO" id="warnS_M2">NO</div>';
    $('#lay_tabRisult_M2').addClass('waitLay');
    $('#lay_tabRisult_M2').addClass('righty');

    $('#lay_tabRisult_M3')[0].innerHTML =
      /*startB3.toFixed(2) + " €" + */ '<div class="layNO" id="warnS_M3">NO</div>';
    $('#lay_tabRisult_M3').addClass('waitLay');
    $('#lay_tabRisult_M3').addClass('righty');

    $('#lay_tabRisult_M4')[0].innerHTML =
      /*startB4.toFixed(2) + " €" + */ '<div class="layNO" id="warnS_M4">NO</div>';
    $('#lay_tabRisult_M4').addClass('waitLay');
    $('#lay_tabRisult_M4').addClass('righty');

    $('#lay_tabRisult_M5')[0].innerHTML =
      /*startB5.toFixed(2) + " €" + */ '<div class="layNO" id="warnS_M5">NO</div>';
    $('#lay_tabRisult_M5').addClass('waitLay');
    $('#lay_tabRisult_M5').addClass('righty');
  }

  $('#qb_tabRisult_M1')[0].innerHTML = '@' + qbToMath(qbanca1).toFixed(2); //ret_qb(qbanca1);
  $('#qb_tabRisult_M2')[0].innerHTML = '@' + qbToMath(qbanca2).toFixed(2); //ret_qb(qbanca2);
  $('#qb_tabRisult_M3')[0].innerHTML = '@' + qbToMath(qbanca3).toFixed(2); //ret_qb(qbanca3);
  $('#qb_tabRisult_M4')[0].innerHTML = '@' + qbToMath(qbanca4).toFixed(2); //ret_qb(qbanca4);
  $('#qb_tabRisult_M5')[0].innerHTML = '@' + qbToMath(qbanca5).toFixed(2); //ret_qb(qbanca5);

  $('#respo_tabRisult_M1')[0].innerHTML = DashForZero(startB1 * (qbToMath(qbanca1) - 1)); //(startB1 * (qbToMath(qbanca1) - 1)).toFixed(2) + "€";
  $('#respo_tabRisult_M2')[0].innerHTML = DashForZero(startB2 * (qbToMath(qbanca2) - 1)); //(startB2 * (qbToMath(qbanca2) - 1)).toFixed(2) + "€";
  $('#respo_tabRisult_M3')[0].innerHTML = DashForZero(startB3 * (qbToMath(qbanca3) - 1)); //(startB3 * (qbToMath(qbanca3) - 1)).toFixed(2) + "€";
  $('#respo_tabRisult_M4')[0].innerHTML = DashForZero(startB4 * (qbToMath(qbanca4) - 1)); //(startB4 * (qbToMath(qbanca4) - 1)).toFixed(2) + "€";
  $('#respo_tabRisult_M5')[0].innerHTML = DashForZero(startB5 * (qbToMath(qbanca5) - 1)); //(startB5 * (qbToMath(qbanca5) - 1)).toFixed(2) + "€";

  var zumTot = 0;
  for (var zum = 1; zum <= 5; zum++) {
    // console.log(zum + ": " + parseFloat($("#respo_tabRisult_M" + zum).html()));
    if (isNaN(parseFloat($('#respo_tabRisult_M' + zum).html()))) {
      continue;
    } else {
      zumTot += parseFloat($('#respo_tabRisult_M' + zum).html());
    }
  }
  //$("#respo_Totale").html(DashForZero(zumTot));
  $('#respo_Totale').html('+' + zumTot.toFixed(2) + '€');

  //$("#respo_Totale").html((parseFloat($("#respo_tabRisult_M1").html()) + parseFloat($("#respo_tabRisult_M2").html()) + parseFloat($("#respo_tabRisult_M3").html()) + parseFloat($("#respo_tabRisult_M4").html()) + parseFloat($("#respo_tabRisult_M5").html())).toFixed(2) + "€");

  $('#match_tabRisult_M1')[0].innerHTML = $('#matchName_M1')[0].value;
  $('#match_tabRisult_M2')[0].innerHTML = $('#matchName_M2')[0].value;
  $('#match_tabRisult_M3')[0].innerHTML = $('#matchName_M3')[0].value;
  $('#match_tabRisult_M4')[0].innerHTML = $('#matchName_M4')[0].value;
  $('#match_tabRisult_M5')[0].innerHTML = $('#matchName_M5')[0].value;

  $('#quotaB_New0_M1')[0].innerHTML = '@' + qbToMath(qbanca1).toFixed(2); //ret_qb(qbanca1);
  $('#banca_New0_M1')[0].innerHTML = banca1.toFixed(2) + ' €';
  $('#respo_Cal0_M1')[0].innerHTML = (banca1 * (qbToMath(qbanca1) - 1)).toFixed(2) + '€';
  //$("#banca_New0_M1")[0].innerHTML = benchB1.toFixed(2) + " €";
  //$("#respo_Cal0_M1")[0].innerHTML = (benchB1 * (qbToMath(qbanca1) - 1)).toFixed(2) + "€";
  $('#comm_New0_M1')[0].innerHTML = com;

  $('#quotaB_New0_M2')[0].innerHTML = '@' + qbToMath(qbanca2).toFixed(2); //ret_qb(qbanca2);
  $('#banca_New0_M2')[0].innerHTML = banca2.toFixed(2) + ' €';
  $('#respo_Cal0_M2')[0].innerHTML = (banca2 * (qbToMath(qbanca2) - 1)).toFixed(2) + '€';
  //$("#banca_New0_M2")[0].innerHTML = benchB2.toFixed(2) + " €";
  //$("#respo_Cal0_M2")[0].innerHTML = (benchB2 * (qbToMath(qbanca2) - 1)).toFixed(2) + "€";
  $('#comm_New0_M2')[0].innerHTML = com;

  /* if($("input[name='situazione_M1']:checked").val() == "V_M1") {
    $("#rigaAgg_2 input").prop('disabled', false).css('background','#ffffff').css('border','0px');
    $("#quotaB_New0_M2")[0].innerHTML = "@" + qbToMath(qbanca2).toFixed(2); //ret_qb(qbanca2);
    $("#banca_New0_M2")[0].innerHTML = banca2.toFixed(2) + " €";
    $("#respo_Cal0_M2")[0].innerHTML = (banca2 * (qbToMath(qbanca2) - 1)).toFixed(2) + "€";
    //$("#banca_New0_M2")[0].innerHTML = benchB2.toFixed(2) + " €";
    //$("#respo_Cal0_M2")[0].innerHTML = (benchB2 * (qbToMath(qbanca2) - 1)).toFixed(2) + "€";
    $("#comm_New0_M2")[0].innerHTML = com;
  } else {
    $("#rigaAgg_2 input").prop('disabled', true).css('background','#f4f4f4').css('border','1px solid #d5d5d5');
    $("#quotaB_New0_M2")[0].innerHTML = "";
    $("#banca_New0_M2")[0].innerHTML = "";
    $("#respo_Cal0_M2")[0].innerHTML = "";
    $("#comm_New0_M2")[0].innerHTML = "";
  } */

  $('#quotaB_New0_M3')[0].innerHTML = '@' + qbToMath(qbanca3).toFixed(2); //ret_qb(qbanca3);
  $('#banca_New0_M3')[0].innerHTML = banca3.toFixed(2) + ' €';
  $('#respo_Cal0_M3')[0].innerHTML = (banca3 * (qbToMath(qbanca3) - 1)).toFixed(2) + '€';
  //$("#banca_New0_M3")[0].innerHTML = benchB3.toFixed(2) + " €";
  //$("#respo_Cal0_M3")[0].innerHTML = (benchB3 * (qbToMath(qbanca3) - 1)).toFixed(2) + "€";
  $('#comm_New0_M3')[0].innerHTML = com;

  /* if($("input[name='situazione_M1']:checked").val() == "V_M1" && $("input[name='situazione_M2']:checked").val() == "V_M2") {
    $("#rigaAgg_3 input").prop('disabled', false).css('background','#ffffff').css('border','0px');
    $("#quotaB_New0_M3")[0].innerHTML = "@" + qbToMath(qbanca3).toFixed(2); //ret_qb(qbanca3);
    $("#banca_New0_M3")[0].innerHTML = banca3.toFixed(2) + " €";
    $("#respo_Cal0_M3")[0].innerHTML = (banca3 * (qbToMath(qbanca3) - 1)).toFixed(2) + "€";
    //$("#banca_New0_M3")[0].innerHTML = benchB3.toFixed(2) + " €";
    //$("#respo_Cal0_M3")[0].innerHTML = (benchB3 * (qbToMath(qbanca3) - 1)).toFixed(2) + "€";
    $("#comm_New0_M3")[0].innerHTML = com;
  } else {
    $("#rigaAgg_3 input").prop('disabled', true).css('background','#f4f4f4').css('border','1px solid #d5d5d5');
    $("#quotaB_New0_M3")[0].innerHTML = "";
    $("#banca_New0_M3")[0].innerHTML = "";
    $("#respo_Cal0_M3")[0].innerHTML = "";
    $("#comm_New0_M3")[0].innerHTML = "";
  } */

  $('#quotaB_New0_M4')[0].innerHTML = '@' + qbToMath(qbanca4).toFixed(2); //ret_qb(qbanca4);
  $('#banca_New0_M4')[0].innerHTML = banca4.toFixed(2) + ' €';
  $('#respo_Cal0_M4')[0].innerHTML = (banca4 * (qbToMath(qbanca4) - 1)).toFixed(2) + '€';
  //$("#banca_New0_M4")[0].innerHTML = benchB4.toFixed(2) + " €";
  //$("#respo_Cal0_M4")[0].innerHTML = (benchB4 * (qbToMath(qbanca4) - 1)).toFixed(2) + "€";
  $('#comm_New0_M4')[0].innerHTML = com;

  /* if($("input[name='situazione_M1']:checked").val() == "V_M1" && $("input[name='situazione_M2']:checked").val() == "V_M2" && $("input[name='situazione_M3']:checked").val() == "V_M3") {
    $("#rigaAgg_4 input").prop('disabled', false).css('background','#ffffff').css('border','0px');
    $("#quotaB_New0_M4")[0].innerHTML = "@" + qbToMath(qbanca4).toFixed(2); //ret_qb(qbanca4);
    $("#banca_New0_M4")[0].innerHTML = banca4.toFixed(2) + " €";
    $("#respo_Cal0_M4")[0].innerHTML = (banca4 * (qbToMath(qbanca4) - 1)).toFixed(2) + "€";
    //$("#banca_New0_M4")[0].innerHTML = benchB4.toFixed(2) + " €";
    //$("#respo_Cal0_M4")[0].innerHTML = (benchB4 * (qbToMath(qbanca4) - 1)).toFixed(2) + "€";
    $("#comm_New0_M4")[0].innerHTML = com;
  } else {
    $("#rigaAgg_4 input").prop('disabled', true).css('background','#f4f4f4').css('border','1px solid #d5d5d5');
    $("#quotaB_New0_M4")[0].innerHTML = "";
    $("#banca_New0_M4")[0].innerHTML = "";
    $("#respo_Cal0_M4")[0].innerHTML = "";
    $("#comm_New0_M4")[0].innerHTML = "";
  } */

  $('#quotaB_New0_M5')[0].innerHTML = '@' + qbToMath(qbanca5).toFixed(2); //ret_qb(qbanca5);
  $('#banca_New0_M5')[0].innerHTML = banca5.toFixed(2) + ' €';
  $('#respo_Cal0_M5')[0].innerHTML = (banca5 * (qbToMath(qbanca5) - 1)).toFixed(2) + '€';
  //$("#banca_New0_M5")[0].innerHTML = benchB5.toFixed(2) + " €";
  //$("#respo_Cal0_M5")[0].innerHTML = (benchB5 * (qbToMath(qbanca5) - 1)).toFixed(2) + "€";
  $('#comm_New0_M5')[0].innerHTML = com;

  /* if($("input[name='situazione_M1']:checked").val() == "V_M1" && $("input[name='situazione_M2']:checked").val() == "V_M2" && $("input[name='situazione_M3']:checked").val() == "V_M3" && $("input[name='situazione_M4']:checked").val() == "V_M4") {
    $("#rigaAgg_5 input").prop('disabled', false).css('background','#ffffff').css('border','0px');
    $("#quotaB_New0_M5")[0].innerHTML = "@" + qbToMath(qbanca5).toFixed(2); //ret_qb(qbanca5);
    $("#banca_New0_M5")[0].innerHTML = banca5.toFixed(2) + " €";
    $("#respo_Cal0_M5")[0].innerHTML = (banca5 * (qbToMath(qbanca5) - 1)).toFixed(2) + "€";
    //$("#banca_New0_M5")[0].innerHTML = benchB5.toFixed(2) + " €";
    //$("#respo_Cal0_M5")[0].innerHTML = (benchB5 * (qbToMath(qbanca5) - 1)).toFixed(2) + "€";
    $("#comm_New0_M5")[0].innerHTML = com;
  } else {
    $("#rigaAgg_5 input").prop('disabled', true).css('background','#f4f4f4').css('border','1px solid #d5d5d5');
    $("#quotaB_New0_M5")[0].innerHTML = "";
    $("#banca_New0_M5")[0].innerHTML = "";
    $("#respo_Cal0_M5")[0].innerHTML = "";
    $("#comm_New0_M5")[0].innerHTML = "";
  } */

  Tresp1 =
    DolToMath($('#respo_New0_M1')[0].innerHTML) +
    DolToMath($('#respo_New1_M1')[0].innerHTML) +
    DolToMath($('#respo_New2_M1')[0].innerHTML) +
    DolToMath($('#respo_New3_M1')[0].innerHTML) +
    DolToMath($('#respo_New4_M1')[0].innerHTML) +
    DolToMath($('#respo_New5_M1')[0].innerHTML);

  TAbbG1 = totAbbGain(1);

  Win1 = -(Tresp1 + DolToMath($('#provaCP_M1')[0].value));
  if ($("input[type='radio'][name='Dch_M1']:checked")[0].value == 'Win_A') {
    Loos1 =
      TAbbG1 +
      DolToMath($('#provaDCH1_M1')[0].value) * (qbToMath($('#provaDCH1_Q_M1')[0].value) - 1) -
      DolToMath($('#provaDCH2_M1')[0].value);
  } else if ($("input[type='radio'][name='Dch_M1']:checked")[0].value == 'Win_B') {
    Loos1 =
      TAbbG1 +
      DolToMath($('#provaDCH2_M1')[0].value) * (qbToMath($('#provaDCH2_Q_M1')[0].value) - 1) -
      DolToMath($('#provaDCH1_M1')[0].value);
  } else {
    Loos1 =
      TAbbG1 + DolToMath($('#provaCP_M1')[0].value) * (qbToMath($('#provaCP_Q_M1')[0].value) - 1);
  }
  //Loos1 = TAbbG1 + (DolToMath($("#provaCP_M1")[0].value)*(qbToMath($("#provaCP_Q_M1")[0].value)-1));

  Tresp2 =
    DolToMath($('#respo_New0_M2')[0].innerHTML) +
    DolToMath($('#respo_New1_M2')[0].innerHTML) +
    DolToMath($('#respo_New2_M2')[0].innerHTML) +
    DolToMath($('#respo_New3_M2')[0].innerHTML) +
    DolToMath($('#respo_New4_M2')[0].innerHTML) +
    DolToMath($('#respo_New5_M2')[0].innerHTML);

  TAbbG2 = totAbbGain(2);

  Win2 = -(Tresp2 + DolToMath($('#provaCP_M2')[0].value));
  if ($("input[type='radio'][name='Dch_M2']:checked")[0].value == 'Win_A') {
    Loos2 =
      TAbbG2 +
      DolToMath($('#provaDCH1_M2')[0].value) * (qbToMath($('#provaDCH1_Q_M2')[0].value) - 1) -
      DolToMath($('#provaDCH2_M2')[0].value);
  } else if ($("input[type='radio'][name='Dch_M2']:checked")[0].value == 'Win_B') {
    Loos2 =
      TAbbG2 +
      DolToMath($('#provaDCH2_M2')[0].value) * (qbToMath($('#provaDCH2_Q_M2')[0].value) - 1) -
      DolToMath($('#provaDCH1_M2')[0].value);
  } else {
    Loos2 =
      TAbbG2 + DolToMath($('#provaCP_M2')[0].value) * (qbToMath($('#provaCP_Q_M2')[0].value) - 1);
  }
  //Loos2 = TAbbG2 + (DolToMath($("#provaCP_M2")[0].value)*(qbToMath($("#provaCP_Q_M2")[0].value)-1));

  Tresp3 =
    DolToMath($('#respo_New0_M3')[0].innerHTML) +
    DolToMath($('#respo_New1_M3')[0].innerHTML) +
    DolToMath($('#respo_New2_M3')[0].innerHTML) +
    DolToMath($('#respo_New3_M3')[0].innerHTML) +
    DolToMath($('#respo_New4_M3')[0].innerHTML) +
    DolToMath($('#respo_New5_M3')[0].innerHTML);

  TAbbG3 = totAbbGain(3);

  Win3 = -(Tresp3 + DolToMath($('#provaCP_M3')[0].value));
  if ($("input[type='radio'][name='Dch_M3']:checked")[0].value == 'Win_A') {
    Loos3 =
      TAbbG3 +
      DolToMath($('#provaDCH1_M3')[0].value) * (qbToMath($('#provaDCH1_Q_M3')[0].value) - 1) -
      DolToMath($('#provaDCH2_M3')[0].value);
  } else if ($("input[type='radio'][name='Dch_M3']:checked")[0].value == 'Win_B') {
    Loos3 =
      TAbbG3 +
      DolToMath($('#provaDCH2_M3')[0].value) * (qbToMath($('#provaDCH2_Q_M3')[0].value) - 1) -
      DolToMath($('#provaDCH1_M3')[0].value);
  } else {
    Loos3 =
      TAbbG3 + DolToMath($('#provaCP_M3')[0].value) * (qbToMath($('#provaCP_Q_M3')[0].value) - 1);
  }
  //Loos3 = TAbbG3 + (DolToMath($("#provaCP_M3")[0].value)*(qbToMath($("#provaCP_Q_M3")[0].value)-1));

  Tresp4 =
    DolToMath($('#respo_New0_M4')[0].innerHTML) +
    DolToMath($('#respo_New1_M4')[0].innerHTML) +
    DolToMath($('#respo_New2_M4')[0].innerHTML) +
    DolToMath($('#respo_New3_M4')[0].innerHTML) +
    DolToMath($('#respo_New4_M4')[0].innerHTML) +
    DolToMath($('#respo_New5_M4')[0].innerHTML);

  TAbbG4 = totAbbGain(4);

  Win4 = -(Tresp4 + DolToMath($('#provaCP_M4')[0].value));
  if ($("input[type='radio'][name='Dch_M4']:checked")[0].value == 'Win_A') {
    Loos4 =
      TAbbG4 +
      DolToMath($('#provaDCH1_M4')[0].value) * (qbToMath($('#provaDCH1_Q_M4')[0].value) - 1) -
      DolToMath($('#provaDCH2_M4')[0].value);
  } else if ($("input[type='radio'][name='Dch_M4']:checked")[0].value == 'Win_B') {
    Loos4 =
      TAbbG4 +
      DolToMath($('#provaDCH2_M4')[0].value) * (qbToMath($('#provaDCH2_Q_M4')[0].value) - 1) -
      DolToMath($('#provaDCH1_M4')[0].value);
  } else {
    Loos4 =
      TAbbG4 + DolToMath($('#provaCP_M4')[0].value) * (qbToMath($('#provaCP_Q_M4')[0].value) - 1);
  }
  //Loos4 = TAbbG4 + (DolToMath($("#provaCP_M4")[0].value)*(qbToMath($("#provaCP_Q_M4")[0].value)-1));

  Tresp5 =
    DolToMath($('#respo_New0_M5')[0].innerHTML) +
    DolToMath($('#respo_New1_M5')[0].innerHTML) +
    DolToMath($('#respo_New2_M5')[0].innerHTML) +
    DolToMath($('#respo_New3_M5')[0].innerHTML) +
    DolToMath($('#respo_New4_M5')[0].innerHTML) +
    DolToMath($('#respo_New5_M5')[0].innerHTML);

  TAbbG5 = totAbbGain(5);

  Win5 = -(Tresp5 + DolToMath($('#provaCP_M5')[0].value));
  if ($("input[type='radio'][name='Dch_M5']:checked")[0].value == 'Win_A') {
    Loos5 =
      TAbbG5 +
      DolToMath($('#provaDCH1_M5')[0].value) * (qbToMath($('#provaDCH1_Q_M5')[0].value) - 1) -
      DolToMath($('#provaDCH2_M5')[0].value);
  } else if ($("input[type='radio'][name='Dch_M5']:checked")[0].value == 'Win_B') {
    Loos5 =
      TAbbG5 +
      DolToMath($('#provaDCH2_M5')[0].value) * (qbToMath($('#provaDCH2_Q_M5')[0].value) - 1) -
      DolToMath($('#provaDCH1_M5')[0].value);
  } else {
    Loos5 =
      TAbbG5 + DolToMath($('#provaCP_M5')[0].value) * (qbToMath($('#provaCP_Q_M5')[0].value) - 1);
  }
  //Loos5 = TAbbG5 + (DolToMath($("#provaCP_M5")[0].value)*(qbToMath($("#provaCP_Q_M5")[0].value)-1));

  $('#Grid_StartGain_span')[0].innerHTML = bench_gain.toFixed(2) + '€';
  if (bench_gain < 0) {
    $('#Grid_StartGain_span').css('color', 'red');
  } else {
    $('#Grid_StartGain_span').css('color', '#009c00');
    $('#Grid_StartGain_span').prepend('+');
  }

  if (rimborso != 0) {
    $('#Grid_StartRating span:first-child').text('CR% iniziale stimato: ');
    $('#Grid_StartRating_span')[0].innerHTML = bench_CR.toFixed(2) + '%';
    if (bench_CR < 0) {
      $('#Grid_StartRating_span').css('color', 'red');
    } else {
      $('#Grid_StartRating_span').css('color', '#009c00');
      $('#Grid_StartRating_span').prepend('+');
    }
  } else {
    $('#Grid_StartRating span:first-child').text('RATING iniziale stimato: ');
    $('#Grid_StartRating_span')[0].innerHTML = bench_rating.toFixed(2) + '%';
    if (bench_rating < 100) {
      $('#Grid_StartRating_span').css('color', 'red');
    } else {
      $('#Grid_StartRating_span').css('color', '#009c00');
      $('#Grid_StartRating_span').prepend('+');
    }
  }

  $('#TotRespo_M1')[0].innerHTML = Tresp1;
  $('#TotAbb_M1')[0].innerHTML = TAbbG1;
  $('#GainIfWin_M1')[0].innerHTML = Win1.toFixed(2) + ' €';
  $('#GainIfLose_M1')[0].innerHTML = Loos1.toFixed(2) + ' €';

  $('#TotRespo_M2')[0].innerHTML = Tresp2;
  $('#TotAbb_M2')[0].innerHTML = TAbbG2;
  $('#GainIfWin_M2')[0].innerHTML = Win2.toFixed(2) + ' €';
  $('#GainIfLose_M2')[0].innerHTML = Loos2.toFixed(2) + ' €';

  $('#TotRespo_M3')[0].innerHTML = Tresp3;
  $('#TotAbb_M3')[0].innerHTML = TAbbG3;
  $('#GainIfWin_M3')[0].innerHTML = Win3.toFixed(2) + ' €';
  $('#GainIfLose_M3')[0].innerHTML = Loos3.toFixed(2) + ' €';

  $('#TotRespo_M4')[0].innerHTML = Tresp4;
  $('#TotAbb_M4')[0].innerHTML = TAbbG4;
  $('#GainIfWin_M4')[0].innerHTML = Win4.toFixed(2) + ' €';
  $('#GainIfLose_M4')[0].innerHTML = Loos4.toFixed(2) + ' €';

  $('#TotRespo_M5')[0].innerHTML = Tresp5;
  $('#TotAbb_M5')[0].innerHTML = TAbbG5;
  $('#GainIfWin_M5')[0].innerHTML = Win5.toFixed(2) + ' €';
  $('#GainIfLose_M5')[0].innerHTML = Loos5.toFixed(2) + ' €';

  for (var x = 0; x < num_ev; x++) {
    actualGain(x + 1);
  }

  if (rimborso != 0) {
    $('#statusRating_Box_Int').html('CR%');
    $('.esiti_int span:first-child').html('CR%');
  } else {
    $('#statusRating_Box_Int').html('RATING%');
    $('.esiti_int span:first-child').html('RATING%');
  }

  //gainOnGo_P = (-puntata + Loos1 + DolToMath($("#FinGain_M2")[0].innerHTML) + DolToMath($("#FinGain_M3")[0].innerHTML) + DolToMath($("#FinGain_M4")[0].innerHTML) + DolToMath($("#FinGain_M5")[0].innerHTML) + DolToMath(bonus));
  gainOnGo_P =
    -puntata +
    rimborso +
    Loos1 +
    DolToMath($('#FinGain_M2')[0].innerHTML) +
    DolToMath($('#FinGain_M3')[0].innerHTML) +
    DolToMath($('#FinGain_M4')[0].innerHTML) +
    DolToMath($('#FinGain_M5')[0].innerHTML) +
    DolToMath(bonus);
  $('#statusResults_P')[0].innerHTML = DashForZero(gainOnGo_P); //gainOnGo_P.toFixed(2) + " €";
  if (!puntata) {
    ratingOnGo_P = 100;
    CR_OnGo_P = 0;
  } else {
    ratingOnGo_P = 100 + 100 * ((gainOnGo_P - bonus) / puntata);
    if (rimborso != 0) {
      CR_OnGo_P = 100 * ((gainOnGo_P - bonus) / rimborso);
    } else {
      CR_OnGo_P = 0;
    }
  }

  if (rimborso != 0) {
    $('#statusRating_P')[0].innerHTML = CR_OnGo_P.toFixed(2) + '%';
  } else {
    $('#statusRating_P')[0].innerHTML = ratingOnGo_P.toFixed(2) + '%';
  }

  //$("#statusRating_P")[0].innerHTML = ratingOnGo_P.toFixed(2) + "%"; //COMMENTATA 10/09/2019 h11:37

  //gainOnGoVP = (-puntata + Win1 + Loos2 + DolToMath($("#FinGain_M3")[0].innerHTML) + DolToMath($("#FinGain_M4")[0].innerHTML) + DolToMath($("#FinGain_M5")[0].innerHTML) + DolToMath(bonus));
  gainOnGoVP =
    -puntata +
    rimborso +
    Win1 +
    Loos2 +
    DolToMath($('#FinGain_M3')[0].innerHTML) +
    DolToMath($('#FinGain_M4')[0].innerHTML) +
    DolToMath($('#FinGain_M5')[0].innerHTML) +
    DolToMath(bonus);
  $('#statusResults_VP')[0].innerHTML = DashForZero(gainOnGoVP); //gainOnGoVP.toFixed(2) + " €";
  if (!puntata) {
    ratingOnGo_VP = 100;
    CR_OnGo_VP = 0;
  } else {
    ratingOnGo_VP = 100 + 100 * ((gainOnGoVP - bonus) / puntata);
    if (rimborso != 0) {
      CR_OnGo_VP = 100 * ((gainOnGoVP - bonus) / rimborso);
    } else {
      CR_OnGo_VP = 0;
    }
  }

  if (rimborso != 0) {
    $('#statusRating_VP')[0].innerHTML = CR_OnGo_VP.toFixed(2) + '%';
  } else {
    $('#statusRating_VP')[0].innerHTML = ratingOnGo_VP.toFixed(2) + '%';
  }

  //$("#statusRating_VP")[0].innerHTML = ratingOnGo_VP.toFixed(2) + "%"; //COMMENTATA 10/09/2019 h11:37

  //gainOnGoVVP = (-puntata + Win1 + Win2 + Loos3 + DolToMath($("#FinGain_M4")[0].innerHTML) + DolToMath($("#FinGain_M5")[0].innerHTML) + DolToMath(bonus));
  gainOnGoVVP =
    -puntata +
    rimborso +
    Win1 +
    Win2 +
    Loos3 +
    DolToMath($('#FinGain_M4')[0].innerHTML) +
    DolToMath($('#FinGain_M5')[0].innerHTML) +
    DolToMath(bonus);
  $('#statusResults_VVP')[0].innerHTML = DashForZero(gainOnGoVVP); //gainOnGoVVP.toFixed(2) + " €";
  if (!puntata) {
    ratingOnGo_VVP = 100;
    CR_OnGo_VVP = 0;
  } else {
    ratingOnGo_VVP = 100 + 100 * ((gainOnGoVVP - bonus) / puntata);
    if (rimborso != 0) {
      CR_OnGo_VVP = 100 * ((gainOnGoVVP - bonus) / rimborso);
    } else {
      CR_OnGo_VVP = 0;
    }
  }

  if (rimborso != 0) {
    $('#statusRating_VVP')[0].innerHTML = CR_OnGo_VVP.toFixed(2) + '%';
  } else {
    $('#statusRating_VVP')[0].innerHTML = ratingOnGo_VVP.toFixed(2) + '%';
  }

  //$("#statusRating_VVP")[0].innerHTML = ratingOnGo_VVP.toFixed(2) + "%"; //COMMENTATA 10/09/2019 h11:37

  //gainOnGoVVVP = (-puntata + Win1 + Win2 + Win3 + Loos4 + DolToMath($("#FinGain_M5")[0].innerHTML) + DolToMath(bonus));
  gainOnGoVVVP =
    -puntata +
    rimborso +
    Win1 +
    Win2 +
    Win3 +
    Loos4 +
    DolToMath($('#FinGain_M5')[0].innerHTML) +
    DolToMath(bonus);
  $('#statusResults_VVVP')[0].innerHTML = DashForZero(gainOnGoVVVP); //gainOnGoVVVP.toFixed(2) + " €";
  if (!puntata) {
    ratingOnGo_VVVP = 100;
    CR_OnGo_VVVP = 0;
  } else {
    ratingOnGo_VVVP = 100 + 100 * ((gainOnGoVVVP - bonus) / puntata);
    if (rimborso != 0) {
      CR_OnGo_VVVP = 100 * ((gainOnGoVVVP - bonus) / rimborso);
    } else {
      CR_OnGo_VVVP = 0;
    }
  }

  if (rimborso != 0) {
    $('#statusRating_VVVP')[0].innerHTML = CR_OnGo_VVVP.toFixed(2) + '%';
  } else {
    $('#statusRating_VVVP')[0].innerHTML = ratingOnGo_VVVP.toFixed(2) + '%';
  }

  //$("#statusRating_VVVP")[0].innerHTML = ratingOnGo_VVVP.toFixed(2) + "%"; //COMMENTATA 10/09/2019 h11:37

  //gainOnGoVVVVP = (-puntata + Win1 + Win2 + Win3 + Win4 + Loos5 + DolToMath(bonus));
  gainOnGoVVVVP = -puntata + rimborso + Win1 + Win2 + Win3 + Win4 + Loos5 + DolToMath(bonus);
  $('#statusResults_VVVVP')[0].innerHTML = DashForZero(gainOnGoVVVVP); //gainOnGoVVVVP.toFixed(2) + " €";
  if (!puntata) {
    ratingOnGo_VVVVP = 100;
    CR_OnGo_VVVVP = 0;
  } else {
    ratingOnGo_VVVVP = 100 + 100 * ((gainOnGoVVVVP - bonus) / puntata);
    if (rimborso != 0) {
      CR_OnGo_VVVVP = 100 * ((gainOnGoVVVVP - bonus) / rimborso);
    } else {
      CR_OnGo_VVVVP = 0;
    }
  }

  if (rimborso != 0) {
    $('#statusRating_VVVVP')[0].innerHTML = CR_OnGo_VVVVP.toFixed(2) + '%';
  } else {
    $('#statusRating_VVVVP')[0].innerHTML = ratingOnGo_VVVVP.toFixed(2) + '%';
  }

  //$("#statusRating_VVVVP")[0].innerHTML = ratingOnGo_VVVVP.toFixed(2) + "%"; //COMMENTATA 10/09/2019 h11:37

  //gainOnGoVVVVV = (netWin + Win1 + Win2 + Win3 + Win4 + Win5);
  gainOnGoVVVVV = netWin + Win1 + Win2 + Win3 + Win4 + Win5;
  $('#statusResults_VVVVV')[0].innerHTML = DashForZero(gainOnGoVVVVV); //gainOnGoVVVVV.toFixed(2) + " €";
  if (!puntata) {
    ratingOnGo_VVVVV = 100;
    CR_OnGo_VVVVV = 0;
  } else {
    ratingOnGo_VVVVV = 100 + 100 * ((gainOnGoVVVVV - bonus) / puntata);
    if (rimborso != 0) {
      CR_OnGo_VVVVV = 100 * ((gainOnGoVVVVV - bonus) / rimborso);
    } else {
      CR_OnGo_VVVVV = 0;
    }
  }

  if (rimborso != 0) {
    $('#statusRating_VVVVV')[0].innerHTML = CR_OnGo_VVVVV.toFixed(2) + '%';
  } else {
    $('#statusRating_VVVVV')[0].innerHTML = ratingOnGo_VVVVV.toFixed(2) + '%';
  }

  // $("#statusRating_VVVVV")[0].innerHTML = ratingOnGo_VVVVV.toFixed(2) + "%"; //COMMENTATA 10/09/2019 h11:37

  gainOnGoW =
    netWin +
    DolToMath($('#FinGain_M1')[0].innerHTML) +
    DolToMath($('#FinGain_M2')[0].innerHTML) +
    DolToMath($('#FinGain_M3')[0].innerHTML) +
    DolToMath($('#FinGain_M4')[0].innerHTML) +
    DolToMath($('#FinGain_M5')[0].innerHTML);

  gainOG2_vv = gainOG3_vvv = gainOG4_vvvv = gainOG5_vvvvv = gainOnGoVVVVV;
  if (rimboType == 0) {
    rStd = DolToMath(rimborso);
    // console.log("rimborso standard: "+rStd);
    rFor1 = 0;
  } else {
    rStd = 0;
    rFor1 = DolToMath(rimborso);
  }

  //GUADAGNI DOPPIA (INIZIO)
  $('#douRes_VV').html(DashForZero(gainOG2_vv)); //gainOG2_vv.toFixed(2) + "€");

  gainOG2_vp = -DolToMath(puntata) + rStd + rFor1 + Win1 + Loos2 + DolToMath(bonus);
  $('#douRes_VP').html(DashForZero(gainOG2_vp)); //gainOG2_vp.toFixed(2) + "€");

  gainOG2_pv = -DolToMath(puntata) + rStd + rFor1 + Loos1 + Win2 + DolToMath(bonus);
  $('#douRes_PV').html(DashForZero(gainOG2_pv)); //gainOG2_pv.toFixed(2) + "€");

  gainOG2_pp = -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + DolToMath(bonus);
  $('#douRes_PP').html(DashForZero(gainOG2_pp)); //gainOG2_pp.toFixed(2) + "€");

  /* for(var counter=0;counter<4;counter++) {
    var myDopStatus = stDoppia[counter];
    // console.log(myDopStatus);
    var elemento = "gainOG2_" + myDopStatus.toLowerCase();
    // console.log(elemento);
    $("#douRes_" + myDopStatus).html(eval(elemento).toFixed(2)+"€")
  } */

  if (!puntata) {
    ratOG2_vv = ratOG2_vp = ratOG2_pv = ratOG2_pp = 100;
    CR_OG2_vv = CR_OG2_vp = CR_OG2_pv = CR_OG2_pp = 0;
  } else {
    ratOG2_vv = 100 + 100 * ((gainOG2_vv - bonus) / puntata);
    ratOG2_vp = 100 + 100 * ((gainOG2_vp - bonus) / puntata);
    ratOG2_pv = 100 + 100 * ((gainOG2_pv - bonus) / puntata);
    ratOG2_pp = 100 + 100 * ((gainOG2_pp - bonus) / puntata);
    if (rimborso != 0) {
      CR_OG2_vv = 100 * ((gainOG2_vv - bonus) / rimborso);
      CR_OG2_vp = 100 * ((gainOG2_vp - bonus) / rimborso);
      CR_OG2_pv = 100 * ((gainOG2_pv - bonus) / rimborso);
      CR_OG2_pp = 100 * ((gainOG2_pp - bonus) / rimborso);
    } else {
      CR_OG2_vv = 0;
      CR_OG2_vp = 0;
      CR_OG2_pv = 0;
      CR_OG2_pp = 0;
    }
  }

  if (rimborso != 0) {
    $('#douRat_VV').html(CR_OG2_vv.toFixed(2) + '%');
    $('#douRat_VP').html(CR_OG2_vp.toFixed(2) + '%');
    $('#douRat_PV').html(CR_OG2_pv.toFixed(2) + '%');
    $('#douRat_PP').html(CR_OG2_pp.toFixed(2) + '%');
  } else {
    $('#douRat_VV').html(ratOG2_vv.toFixed(2) + '%');
    $('#douRat_VP').html(ratOG2_vp.toFixed(2) + '%');
    $('#douRat_PV').html(ratOG2_pv.toFixed(2) + '%');
    $('#douRat_PP').html(ratOG2_pp.toFixed(2) + '%');
  }
  //GUADAGNI DOPPIA (FINE)

  //GUADAGNI TRIPLA (INIZIO)
  $('#triRes_VVV').html(DashForZero(gainOG3_vvv)); //gainOG3_vvv.toFixed(2)+"€");

  gainOG3_vvp = -DolToMath(puntata) + rStd + rFor1 + Win1 + Win2 + Loos3 + DolToMath(bonus);
  $('#triRes_VVP').html(DashForZero(gainOG3_vvp)); //gainOG3_vvp.toFixed(2) + "€");

  gainOG3_vpv = -DolToMath(puntata) + rStd + rFor1 + Win1 + Loos2 + Win3 + DolToMath(bonus);
  $('#triRes_VPV').html(DashForZero(gainOG3_vpv)); //gainOG3_vpv.toFixed(2) + "€");

  gainOG3_vpp = -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Loos3 + DolToMath(bonus);
  $('#triRes_VPP').html(DashForZero(gainOG3_vpp)); //gainOG3_vpp.toFixed(2) + "€");

  gainOG3_pvv = -DolToMath(puntata) + rStd + rFor1 + Loos1 + Win2 + Win3 + DolToMath(bonus);
  $('#triRes_PVV').html(DashForZero(gainOG3_pvv)); //gainOG3_pvv.toFixed(2) + "€");

  gainOG3_pvp = -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Loos3 + DolToMath(bonus);
  $('#triRes_PVP').html(DashForZero(gainOG3_pvp)); //gainOG3_pvp.toFixed(2) + "€");

  gainOG3_ppv = -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Win3 + DolToMath(bonus);
  $('#triRes_PPV').html(DashForZero(gainOG3_ppv)); //gainOG3_ppv.toFixed(2) + "€");

  gainOG3_ppp = -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Loos3 + DolToMath(bonus);
  $('#triRes_PPP').html(DashForZero(gainOG3_ppp)); //gainOG3_ppp.toFixed(2) + "€");

  if (!puntata) {
    ratOG3_vvv =
      ratOG3_vvp =
      ratOG3_vpv =
      ratOG3_vpp =
      ratOG3_pvv =
      ratOG3_pvp =
      ratOG3_ppv =
      ratOG3_ppp =
        100;
    CR_OG3_vvv =
      CR_OG3_vvp =
      CR_OG3_vpv =
      CR_OG3_vpp =
      CR_OG3_pvv =
      CR_OG3_pvp =
      CR_OG3_ppv =
      CR_OG3_ppp =
        0;
  } else {
    ratOG3_vvv = 100 + 100 * ((gainOG3_vvv - bonus) / puntata);
    ratOG3_vvp = 100 + 100 * ((gainOG3_vvp - bonus) / puntata);
    ratOG3_vpv = 100 + 100 * ((gainOG3_vpv - bonus) / puntata);
    ratOG3_vpp = 100 + 100 * ((gainOG3_vpp - bonus) / puntata);
    ratOG3_pvv = 100 + 100 * ((gainOG3_pvv - bonus) / puntata);
    ratOG3_pvp = 100 + 100 * ((gainOG3_pvp - bonus) / puntata);
    ratOG3_ppv = 100 + 100 * ((gainOG3_ppv - bonus) / puntata);
    ratOG3_ppp = 100 + 100 * ((gainOG3_ppp - bonus) / puntata);
    if (rimborso != 0) {
      CR_OG3_vvv = 100 * ((gainOG3_vvv - bonus) / rimborso);
      CR_OG3_vvp = 100 * ((gainOG3_vvp - bonus) / rimborso);
      CR_OG3_vpv = 100 * ((gainOG3_vpv - bonus) / rimborso);
      CR_OG3_vpp = 100 * ((gainOG3_vpp - bonus) / rimborso);
      CR_OG3_pvv = 100 * ((gainOG3_pvv - bonus) / rimborso);
      CR_OG3_pvp = 100 * ((gainOG3_pvp - bonus) / rimborso);
      CR_OG3_ppv = 100 * ((gainOG3_ppv - bonus) / rimborso);
      CR_OG3_ppp = 100 * ((gainOG3_ppp - bonus) / rimborso);
    } else {
      CR_OG3_vvv = 0;
      CR_OG3_vvp = 0;
      CR_OG3_vpv = 0;
      CR_OG3_vpp = 0;
      CR_OG3_pvv = 0;
      CR_OG3_pvp = 0;
      CR_OG3_ppv = 0;
      CR_OG3_ppp = 0;
    }
  }

  if (rimborso != 0) {
    $('#triRat_VVV').html(CR_OG3_vvv.toFixed(2) + '%');
    $('#triRat_VVP').html(CR_OG3_vvp.toFixed(2) + '%');
    $('#triRat_VPV').html(CR_OG3_vpv.toFixed(2) + '%');
    $('#triRat_VPP').html(CR_OG3_vpp.toFixed(2) + '%');
    $('#triRat_PVV').html(CR_OG3_pvv.toFixed(2) + '%');
    $('#triRat_PVP').html(CR_OG3_pvp.toFixed(2) + '%');
    $('#triRat_PPV').html(CR_OG3_ppv.toFixed(2) + '%');
    $('#triRat_PPP').html(CR_OG3_ppp.toFixed(2) + '%');
  } else {
    $('#triRat_VVV').html(ratOG3_vvv.toFixed(2) + '%');
    $('#triRat_VVP').html(ratOG3_vvp.toFixed(2) + '%');
    $('#triRat_VPV').html(ratOG3_vpv.toFixed(2) + '%');
    $('#triRat_VPP').html(ratOG3_vpp.toFixed(2) + '%');
    $('#triRat_PVV').html(ratOG3_pvv.toFixed(2) + '%');
    $('#triRat_PVP').html(ratOG3_pvp.toFixed(2) + '%');
    $('#triRat_PPV').html(ratOG3_ppv.toFixed(2) + '%');
    $('#triRat_PPP').html(ratOG3_ppp.toFixed(2) + '%');
  }
  //GUADAGNI TRIPLA (FINE)

  //GUADAGNI QUADRUPLA (INIZIO)
  $('#quaRes_VVVV').html(DashForZero(gainOG4_vvvv)); //gainOG4_vvvv.toFixed(2)+"€");

  gainOG4_vvvp = -DolToMath(puntata) + rStd + rFor1 + Win1 + Win2 + Win3 + Loos4 + DolToMath(bonus);
  $('#quaRes_VVVP').html(DashForZero(gainOG4_vvvp)); //gainOG4_vvvp.toFixed(2) + "€");

  gainOG4_vvpv = -DolToMath(puntata) + rStd + rFor1 + Win1 + Win2 + Loos3 + Win4 + DolToMath(bonus);
  $('#quaRes_VVPV').html(DashForZero(gainOG4_vvpv)); //gainOG4_vvpv.toFixed(2) + "€");

  gainOG4_vvpp = -DolToMath(puntata) + rStd + 0 + Win1 + Win2 + Loos3 + Loos4 + DolToMath(bonus);
  $('#quaRes_VVPP').html(DashForZero(gainOG4_vvpp)); //gainOG4_vvpp.toFixed(2) + "€");

  gainOG4_vpvv = -DolToMath(puntata) + rStd + rFor1 + Win1 + Loos2 + Win3 + Win4 + DolToMath(bonus);
  $('#quaRes_VPVV').html(DashForZero(gainOG4_vpvv)); //gainOG4_vpvv.toFixed(2) + "€");

  gainOG4_vpvp = -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Win3 + Loos4 + DolToMath(bonus);
  $('#quaRes_VPVP').html(DashForZero(gainOG4_vpvp)); //gainOG4_vpvp.toFixed(2) + "€");

  gainOG4_vppv = -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Loos3 + Win4 + DolToMath(bonus);
  $('#quaRes_VPPV').html(DashForZero(gainOG4_vppv)); //gainOG4_vppv.toFixed(2) + "€");

  gainOG4_vppp = -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Loos3 + Loos4 + DolToMath(bonus);
  $('#quaRes_VPPP').html(DashForZero(gainOG4_vppp)); //gainOG4_vppp.toFixed(2) + "€");

  gainOG4_pvvv = -DolToMath(puntata) + rStd + rFor1 + Loos1 + Win2 + Win3 + Win4 + DolToMath(bonus);
  $('#quaRes_PVVV').html(DashForZero(gainOG4_pvvv)); //gainOG4_pvvv.toFixed(2) + "€");

  gainOG4_pvvp = -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Win3 + Loos4 + DolToMath(bonus);
  $('#quaRes_PVVP').html(DashForZero(gainOG4_pvvp)); //gainOG4_pvvp.toFixed(2) + "€");

  gainOG4_pvpv = -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Loos3 + Win4 + DolToMath(bonus);
  $('#quaRes_PVPV').html(DashForZero(gainOG4_pvpv)); //gainOG4_pvpv.toFixed(2) + "€");

  gainOG4_pvpp = -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Loos3 + Loos4 + DolToMath(bonus);
  $('#quaRes_PVPP').html(DashForZero(gainOG4_pvpp)); //gainOG4_pvpp.toFixed(2) + "€");

  gainOG4_ppvv = -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Win3 + Win4 + DolToMath(bonus);
  $('#quaRes_PPVV').html(DashForZero(gainOG4_ppvv)); //gainOG4_ppvv.toFixed(2) + "€");

  gainOG4_ppvp = -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Win3 + Loos4 + DolToMath(bonus);
  $('#quaRes_PPVP').html(DashForZero(gainOG4_ppvp)); //gainOG4_ppvp.toFixed(2) + "€");

  gainOG4_pppv = -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Loos3 + Win4 + DolToMath(bonus);
  $('#quaRes_PPPV').html(DashForZero(gainOG4_pppv)); //gainOG4_pppv.toFixed(2) + "€");

  gainOG4_pppp = -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Loos3 + Loos4 + DolToMath(bonus);
  $('#quaRes_PPPP').html(DashForZero(gainOG4_pppp)); //gainOG4_pppp.toFixed(2) + "€");

  if (!puntata) {
    ratOG4_vvvv =
      ratOG4_vvvp =
      ratOG4_vvpv =
      ratOG4_vvpp =
      ratOG4_vpvv =
      ratOG4_vpvp =
      ratOG4_vppv =
      ratOG4_vppp =
      ratOG4_pvvv =
      ratOG4_pvvp =
      ratOG4_pvpv =
      ratOG4_pvpp =
      ratOG4_ppvv =
      ratOG4_ppvp =
      ratOG4_pppv =
      ratOG4_pppp =
        100;
    CR_OG4_vvvv =
      CR_OG4_vvvp =
      CR_OG4_vvpv =
      CR_OG4_vvpp =
      CR_OG4_vpvv =
      CR_OG4_vpvp =
      CR_OG4_vppv =
      CR_OG4_vppp =
      CR_OG4_pvvv =
      CR_OG4_pvvp =
      CR_OG4_pvpv =
      CR_OG4_pvpp =
      CR_OG4_ppvv =
      CR_OG4_ppvp =
      CR_OG4_pppv =
      CR_OG4_pppp =
        0;
  } else {
    ratOG4_vvvv = 100 + 100 * ((gainOG4_vvvv - bonus) / puntata);
    ratOG4_vvvp = 100 + 100 * ((gainOG4_vvvp - bonus) / puntata);
    ratOG4_vvpv = 100 + 100 * ((gainOG4_vvpv - bonus) / puntata);
    ratOG4_vvpp = 100 + 100 * ((gainOG4_vvpp - bonus) / puntata);
    ratOG4_vpvv = 100 + 100 * ((gainOG4_vpvv - bonus) / puntata);
    ratOG4_vpvp = 100 + 100 * ((gainOG4_vpvp - bonus) / puntata);
    ratOG4_vppv = 100 + 100 * ((gainOG4_vppv - bonus) / puntata);
    ratOG4_vppp = 100 + 100 * ((gainOG4_vppp - bonus) / puntata);
    ratOG4_pvvv = 100 + 100 * ((gainOG4_pvvv - bonus) / puntata);
    ratOG4_pvvp = 100 + 100 * ((gainOG4_pvvp - bonus) / puntata);
    ratOG4_pvpv = 100 + 100 * ((gainOG4_pvpv - bonus) / puntata);
    ratOG4_pvpp = 100 + 100 * ((gainOG4_pvpp - bonus) / puntata);
    ratOG4_ppvv = 100 + 100 * ((gainOG4_ppvv - bonus) / puntata);
    ratOG4_ppvp = 100 + 100 * ((gainOG4_ppvp - bonus) / puntata);
    ratOG4_pppv = 100 + 100 * ((gainOG4_pppv - bonus) / puntata);
    ratOG4_pppp = 100 + 100 * ((gainOG4_pppp - bonus) / puntata);
    if (rimborso != 0) {
      CR_OG4_vvvv = 100 * ((gainOG4_vvvv - bonus) / rimborso);
      CR_OG4_vvvp = 100 * ((gainOG4_vvvp - bonus) / rimborso);
      CR_OG4_vvpv = 100 * ((gainOG4_vvpv - bonus) / rimborso);
      CR_OG4_vvpp = 100 * ((gainOG4_vvpp - bonus) / rimborso);
      CR_OG4_vpvv = 100 * ((gainOG4_vpvv - bonus) / rimborso);
      CR_OG4_vpvp = 100 * ((gainOG4_vpvp - bonus) / rimborso);
      CR_OG4_vppv = 100 * ((gainOG4_vppv - bonus) / rimborso);
      CR_OG4_vppp = 100 * ((gainOG4_vppp - bonus) / rimborso);
      CR_OG4_pvvv = 100 * ((gainOG4_pvvv - bonus) / rimborso);
      CR_OG4_pvvp = 100 * ((gainOG4_pvvp - bonus) / rimborso);
      CR_OG4_pvpv = 100 * ((gainOG4_pvpv - bonus) / rimborso);
      CR_OG4_pvpp = 100 * ((gainOG4_pvpp - bonus) / rimborso);
      CR_OG4_ppvv = 100 * ((gainOG4_ppvv - bonus) / rimborso);
      CR_OG4_ppvp = 100 * ((gainOG4_ppvp - bonus) / rimborso);
      CR_OG4_pppv = 100 * ((gainOG4_pppv - bonus) / rimborso);
      CR_OG4_pppp = 100 * ((gainOG4_pppp - bonus) / rimborso);
    } else {
      CR_OG4_vvvv = 0;
      CR_OG4_vvvp = 0;
      CR_OG4_vvpv = 0;
      CR_OG4_vvpp = 0;
      CR_OG4_vpvv = 0;
      CR_OG4_vpvp = 0;
      CR_OG4_vppv = 0;
      CR_OG4_vppp = 0;
      CR_OG4_pvvv = 0;
      CR_OG4_pvvp = 0;
      CR_OG4_pvpv = 0;
      CR_OG4_pvpp = 0;
      CR_OG4_ppvv = 0;
      CR_OG4_ppvp = 0;
      CR_OG4_pppv = 0;
      CR_OG4_pppp = 0;
    }
  }

  if (rimborso != 0) {
    $('#quaRat_VVVV').html(CR_OG4_vvvv.toFixed(2) + '%');
    $('#quaRat_VVVP').html(CR_OG4_vvvp.toFixed(2) + '%');
    $('#quaRat_VVPV').html(CR_OG4_vvpv.toFixed(2) + '%');
    $('#quaRat_VVPP').html(CR_OG4_vvpp.toFixed(2) + '%');
    $('#quaRat_VPVV').html(CR_OG4_vpvv.toFixed(2) + '%');
    $('#quaRat_VPVP').html(CR_OG4_vpvp.toFixed(2) + '%');
    $('#quaRat_VPPV').html(CR_OG4_vppv.toFixed(2) + '%');
    $('#quaRat_VPPP').html(CR_OG4_vppp.toFixed(2) + '%');
    $('#quaRat_PVVV').html(CR_OG4_pvvv.toFixed(2) + '%');
    $('#quaRat_PVVP').html(CR_OG4_pvvp.toFixed(2) + '%');
    $('#quaRat_PVPV').html(CR_OG4_pvpv.toFixed(2) + '%');
    $('#quaRat_PVPP').html(CR_OG4_pvpp.toFixed(2) + '%');
    $('#quaRat_PPVV').html(CR_OG4_ppvv.toFixed(2) + '%');
    $('#quaRat_PPVP').html(CR_OG4_ppvp.toFixed(2) + '%');
    $('#quaRat_PPPV').html(CR_OG4_pppv.toFixed(2) + '%');
    $('#quaRat_PPPP').html(CR_OG4_pppp.toFixed(2) + '%');
  } else {
    $('#quaRat_VVVV').html(ratOG4_vvvv.toFixed(2) + '%');
    $('#quaRat_VVVP').html(ratOG4_vvvp.toFixed(2) + '%');
    $('#quaRat_VVPV').html(ratOG4_vvpv.toFixed(2) + '%');
    $('#quaRat_VVPP').html(ratOG4_vvpp.toFixed(2) + '%');
    $('#quaRat_VPVV').html(ratOG4_vpvv.toFixed(2) + '%');
    $('#quaRat_VPVP').html(ratOG4_vpvp.toFixed(2) + '%');
    $('#quaRat_VPPV').html(ratOG4_vppv.toFixed(2) + '%');
    $('#quaRat_VPPP').html(ratOG4_vppp.toFixed(2) + '%');
    $('#quaRat_PVVV').html(ratOG4_pvvv.toFixed(2) + '%');
    $('#quaRat_PVVP').html(ratOG4_pvvp.toFixed(2) + '%');
    $('#quaRat_PVPV').html(ratOG4_pvpv.toFixed(2) + '%');
    $('#quaRat_PVPP').html(ratOG4_pvpp.toFixed(2) + '%');
    $('#quaRat_PPVV').html(ratOG4_ppvv.toFixed(2) + '%');
    $('#quaRat_PPVP').html(ratOG4_ppvp.toFixed(2) + '%');
    $('#quaRat_PPPV').html(ratOG4_pppv.toFixed(2) + '%');
    $('#quaRat_PPPP').html(ratOG4_pppp.toFixed(2) + '%');
  }
  //GUADAGNI QUADRUPLA (FINE)

  //GUADAGNI QUINTUPLA (INIZIO)
  //PRIMA PARTE (V)
  $('#quiRes_VVVVV').html(DashForZero(gainOG5_vvvvv)); //gainOG5_vvvvv.toFixed(2)+"€");

  gainOG5_vvvvp =
    -DolToMath(puntata) + rStd + rFor1 + Win1 + Win2 + Win3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VVVVP').html(DashForZero(gainOG5_vvvvp)); //gainOG5_vvvvp.toFixed(2) + "€");

  gainOG5_vvvpv =
    -DolToMath(puntata) + rStd + rFor1 + Win1 + Win2 + Win3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_VVVPV').html(DashForZero(gainOG5_vvvpv)); //gainOG5_vvvpv.toFixed(2) + "€");

  gainOG5_vvvpp =
    -DolToMath(puntata) + rStd + 0 + Win1 + Win2 + Win3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VVVPP').html(DashForZero(gainOG5_vvvpp)); //gainOG5_vvvpp.toFixed(2) + "€");

  gainOG5_vvpvv =
    -DolToMath(puntata) + rStd + rFor1 + Win1 + Win2 + Loos3 + Win4 + Win5 + DolToMath(bonus);
  $('#quiRes_VVPVV').html(DashForZero(gainOG5_vvpvv)); //gainOG5_vvpvv.toFixed(2) + "€");

  gainOG5_vvpvp =
    -DolToMath(puntata) + rStd + 0 + Win1 + Win2 + Loos3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VVPVP').html(DashForZero(gainOG5_vvpvp)); //gainOG5_vvpvp.toFixed(2) + "€");

  gainOG5_vvppv =
    -DolToMath(puntata) + rStd + 0 + Win1 + Win2 + Loos3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_VVPPV').html(DashForZero(gainOG5_vvppv)); //gainOG5_vvppv.toFixed(2) + "€");

  gainOG5_vvppp =
    -DolToMath(puntata) + rStd + 0 + Win1 + Win2 + Loos3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VVPPP').html(DashForZero(gainOG5_vvppp)); //gainOG5_vvppp.toFixed(2) + "€");

  gainOG5_vpvvv =
    -DolToMath(puntata) + rStd + rFor1 + Win1 + Loos2 + Win3 + Win4 + Win5 + DolToMath(bonus);
  $('#quiRes_VPVVV').html(DashForZero(gainOG5_vpvvv)); //gainOG5_vpvvv.toFixed(2) + "€");

  gainOG5_vpvvp =
    -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Win3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VPVVP').html(DashForZero(gainOG5_vpvvp)); //gainOG5_vpvvp.toFixed(2) + "€");

  gainOG5_vpvpv =
    -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Win3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_VPVPV').html(DashForZero(gainOG5_vpvpv)); //gainOG5_vpvpv.toFixed(2) + "€");

  gainOG5_vpvpp =
    -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Win3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VPVPP').html(DashForZero(gainOG5_vpvpp)); //gainOG5_vpvpp.toFixed(2) + "€");

  gainOG5_vppvv =
    -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Loos3 + Win4 + Win5 + DolToMath(bonus);
  $('#quiRes_VPPVV').html(DashForZero(gainOG5_vppvv)); //gainOG5_vppvv.toFixed(2) + "€");

  gainOG5_vppvp =
    -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Loos3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VPPVP').html(DashForZero(gainOG5_vppvp)); //gainOG5_vppvp.toFixed(2) + "€");

  gainOG5_vpppv =
    -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Loos3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_VPPPV').html(DashForZero(gainOG5_vpppv)); //gainOG5_vpppv.toFixed(2) + "€");

  gainOG5_vpppp =
    -DolToMath(puntata) + rStd + 0 + Win1 + Loos2 + Loos3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_VPPPP').html(DashForZero(gainOG5_vpppp)); //gainOG5_vpppp.toFixed(2) + "€");

  //SECONDA PARTE (P)
  gainOG5_pvvvv =
    -DolToMath(puntata) + rStd + rFor1 + Loos1 + Win2 + Win3 + Win4 + Win5 + DolToMath(bonus);
  $('#quiRes_PVVVV').html(DashForZero(gainOG5_pvvvv)); //gainOG5_pvvvv.toFixed(2)+"€");

  gainOG5_pvvvp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Win3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PVVVP').html(DashForZero(gainOG5_pvvvp)); //gainOG5_pvvvp.toFixed(2) + "€");

  gainOG5_pvvpv =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Win3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_PVVPV').html(DashForZero(gainOG5_pvvpv)); //gainOG5_pvvpv.toFixed(2) + "€");

  gainOG5_pvvpp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Win3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PVVPP').html(DashForZero(gainOG5_pvvpp)); //gainOG5_pvvpp.toFixed(2) + "€");

  gainOG5_pvpvv =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Loos3 + Win4 + Win5 + DolToMath(bonus);
  $('#quiRes_PVPVV').html(DashForZero(gainOG5_pvpvv)); //gainOG5_pvpvv.toFixed(2) + "€");

  gainOG5_pvpvp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Loos3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PVPVP').html(DashForZero(gainOG5_pvpvp)); //gainOG5_pvpvp.toFixed(2) + "€");

  gainOG5_pvppv =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Loos3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_PVPPV').html(DashForZero(gainOG5_pvppv)); //gainOG5_pvppv.toFixed(2) + "€");

  gainOG5_pvppp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Win2 + Loos3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PVPPP').html(DashForZero(gainOG5_pvppp)); //gainOG5_pvppp.toFixed(2) + "€");

  gainOG5_ppvvv =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Win3 + Win4 + Win5 + DolToMath(bonus);
  $('#quiRes_PPVVV').html(DashForZero(gainOG5_ppvvv)); //gainOG5_ppvvv.toFixed(2) + "€");

  gainOG5_ppvvp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Win3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PPVVP').html(DashForZero(gainOG5_ppvvp)); //gainOG5_ppvvp.toFixed(2) + "€");

  gainOG5_ppvpv =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Win3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_PPVPV').html(DashForZero(gainOG5_ppvpv)); //gainOG5_ppvpv.toFixed(2) + "€");

  gainOG5_ppvpp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Win3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PPVPP').html(DashForZero(gainOG5_ppvpp)); //gainOG5_ppvpp.toFixed(2) + "€");

  gainOG5_pppvv =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Loos3 + Win4 + Win5 + DolToMath(bonus);
  $('#quiRes_PPPVV').html(DashForZero(gainOG5_pppvv)); //gainOG5_pppvv.toFixed(2) + "€");

  gainOG5_pppvp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Loos3 + Win4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PPPVP').html(DashForZero(gainOG5_pppvp)); //gainOG5_pppvp.toFixed(2) + "€");

  gainOG5_ppppv =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Loos3 + Loos4 + Win5 + DolToMath(bonus);
  $('#quiRes_PPPPV').html(DashForZero(gainOG5_ppppv)); //gainOG5_ppppv.toFixed(2) + "€");

  gainOG5_ppppp =
    -DolToMath(puntata) + rStd + 0 + Loos1 + Loos2 + Loos3 + Loos4 + Loos5 + DolToMath(bonus);
  $('#quiRes_PPPPP').html(DashForZero(gainOG5_ppppp)); //gainOG5_ppppp.toFixed(2) + "€");

  if (!puntata) {
    ratOG5_vvvvv =
      ratOG5_vvvvp =
      ratOG5_vvvpv =
      ratOG5_vvvpp =
      ratOG5_vvpvv =
      ratOG5_vvpvp =
      ratOG5_vvppv =
      ratOG5_vvppp =
      ratOG5_vpvvv =
      ratOG5_vpvvp =
      ratOG5_vpvpv =
      ratOG5_vpvpp =
      ratOG5_vppvv =
      ratOG5_vppvp =
      ratOG5_vpppv =
      ratOG5_vpppp =
      ratOG5_pvvvv =
      ratOG5_pvvvp =
      ratOG5_pvvpv =
      ratOG5_pvvpp =
      ratOG5_pvpvv =
      ratOG5_pvpvp =
      ratOG5_pvppv =
      ratOG5_pvppp =
      ratOG5_ppvvv =
      ratOG5_ppvvp =
      ratOG5_ppvpv =
      ratOG5_ppvpp =
      ratOG5_pppvv =
      ratOG5_pppvp =
      ratOG5_ppppv =
      ratOG5_ppppp =
        100;
    CR_OG5_vvvvv =
      CR_OG5_vvvvp =
      CR_OG5_vvvpv =
      CR_OG5_vvvpp =
      CR_OG5_vvpvv =
      CR_OG5_vvpvp =
      CR_OG5_vvppv =
      CR_OG5_vvppp =
      CR_OG5_vpvvv =
      CR_OG5_vpvvp =
      CR_OG5_vpvpv =
      CR_OG5_vpvpp =
      CR_OG5_vppvv =
      CR_OG5_vppvp =
      CR_OG5_vpppv =
      CR_OG5_vpppp =
      CR_OG5_pvvvv =
      CR_OG5_pvvvp =
      CR_OG5_pvvpv =
      CR_OG5_pvvpp =
      CR_OG5_pvpvv =
      CR_OG5_pvpvp =
      CR_OG5_pvppv =
      CR_OG5_pvppp =
      CR_OG5_ppvvv =
      CR_OG5_ppvvp =
      CR_OG5_ppvpv =
      CR_OG5_ppvpp =
      CR_OG5_pppvv =
      CR_OG5_pppvp =
      CR_OG5_ppppv =
      CR_OG5_ppppp =
        0;
  } else {
    ratOG5_vvvvv = 100 + 100 * ((gainOG5_vvvvv - bonus) / puntata);
    ratOG5_vvvvp = 100 + 100 * ((gainOG5_vvvvp - bonus) / puntata);
    ratOG5_vvvpv = 100 + 100 * ((gainOG5_vvvpv - bonus) / puntata);
    ratOG5_vvvpp = 100 + 100 * ((gainOG5_vvvpp - bonus) / puntata);
    ratOG5_vvpvv = 100 + 100 * ((gainOG5_vvpvv - bonus) / puntata);
    ratOG5_vvpvp = 100 + 100 * ((gainOG5_vvpvp - bonus) / puntata);
    ratOG5_vvppv = 100 + 100 * ((gainOG5_vvppv - bonus) / puntata);
    ratOG5_vvppp = 100 + 100 * ((gainOG5_vvppp - bonus) / puntata);
    ratOG5_vpvvv = 100 + 100 * ((gainOG5_vpvvv - bonus) / puntata);
    ratOG5_vpvvp = 100 + 100 * ((gainOG5_vpvvp - bonus) / puntata);
    ratOG5_vpvpv = 100 + 100 * ((gainOG5_vpvpv - bonus) / puntata);
    ratOG5_vpvpp = 100 + 100 * ((gainOG5_vpvpp - bonus) / puntata);
    ratOG5_vppvv = 100 + 100 * ((gainOG5_vppvv - bonus) / puntata);
    ratOG5_vppvp = 100 + 100 * ((gainOG5_vppvp - bonus) / puntata);
    ratOG5_vpppv = 100 + 100 * ((gainOG5_vpppv - bonus) / puntata);
    ratOG5_vpppp = 100 + 100 * ((gainOG5_vpppp - bonus) / puntata);

    ratOG5_pvvvv = 100 + 100 * ((gainOG5_pvvvv - bonus) / puntata);
    ratOG5_pvvvp = 100 + 100 * ((gainOG5_pvvvp - bonus) / puntata);
    ratOG5_pvvpv = 100 + 100 * ((gainOG5_pvvpv - bonus) / puntata);
    ratOG5_pvvpp = 100 + 100 * ((gainOG5_pvvpp - bonus) / puntata);
    ratOG5_pvpvv = 100 + 100 * ((gainOG5_pvpvv - bonus) / puntata);
    ratOG5_pvpvp = 100 + 100 * ((gainOG5_pvpvp - bonus) / puntata);
    ratOG5_pvppv = 100 + 100 * ((gainOG5_pvppv - bonus) / puntata);
    ratOG5_pvppp = 100 + 100 * ((gainOG5_pvppp - bonus) / puntata);
    ratOG5_ppvvv = 100 + 100 * ((gainOG5_ppvvv - bonus) / puntata);
    ratOG5_ppvvp = 100 + 100 * ((gainOG5_ppvvp - bonus) / puntata);
    ratOG5_ppvpv = 100 + 100 * ((gainOG5_ppvpv - bonus) / puntata);
    ratOG5_ppvpp = 100 + 100 * ((gainOG5_ppvpp - bonus) / puntata);
    ratOG5_pppvv = 100 + 100 * ((gainOG5_pppvv - bonus) / puntata);
    ratOG5_pppvp = 100 + 100 * ((gainOG5_pppvp - bonus) / puntata);
    ratOG5_ppppv = 100 + 100 * ((gainOG5_ppppv - bonus) / puntata);
    ratOG5_ppppp = 100 + 100 * ((gainOG5_ppppp - bonus) / puntata);

    if (rimborso != 0) {
      CR_OG5_vvvvv = 100 * ((gainOG5_vvvvv - bonus) / rimborso);
      CR_OG5_vvvvp = 100 * ((gainOG5_vvvvp - bonus) / rimborso);
      CR_OG5_vvvpv = 100 * ((gainOG5_vvvpv - bonus) / rimborso);
      CR_OG5_vvvpp = 100 * ((gainOG5_vvvpp - bonus) / rimborso);
      CR_OG5_vvpvv = 100 * ((gainOG5_vvpvv - bonus) / rimborso);
      CR_OG5_vvpvp = 100 * ((gainOG5_vvpvp - bonus) / rimborso);
      CR_OG5_vvppv = 100 * ((gainOG5_vvppv - bonus) / rimborso);
      CR_OG5_vvppp = 100 * ((gainOG5_vvppp - bonus) / rimborso);
      CR_OG5_vpvvv = 100 * ((gainOG5_vpvvv - bonus) / rimborso);
      CR_OG5_vpvvp = 100 * ((gainOG5_vpvvp - bonus) / rimborso);
      CR_OG5_vpvpv = 100 * ((gainOG5_vpvpv - bonus) / rimborso);
      CR_OG5_vpvpp = 100 * ((gainOG5_vpvpp - bonus) / rimborso);
      CR_OG5_vppvv = 100 * ((gainOG5_vppvv - bonus) / rimborso);
      CR_OG5_vppvp = 100 * ((gainOG5_vppvp - bonus) / rimborso);
      CR_OG5_vpppv = 100 * ((gainOG5_vpppv - bonus) / rimborso);
      CR_OG5_vpppp = 100 * ((gainOG5_vpppp - bonus) / rimborso);

      CR_OG5_pvvvv = 100 * ((gainOG5_pvvvv - bonus) / rimborso);
      CR_OG5_pvvvp = 100 * ((gainOG5_pvvvp - bonus) / rimborso);
      CR_OG5_pvvpv = 100 * ((gainOG5_pvvpv - bonus) / rimborso);
      CR_OG5_pvvpp = 100 * ((gainOG5_pvvpp - bonus) / rimborso);
      CR_OG5_pvpvv = 100 * ((gainOG5_pvpvv - bonus) / rimborso);
      CR_OG5_pvpvp = 100 * ((gainOG5_pvpvp - bonus) / rimborso);
      CR_OG5_pvppv = 100 * ((gainOG5_pvppv - bonus) / rimborso);
      CR_OG5_pvppp = 100 * ((gainOG5_pvppp - bonus) / rimborso);
      CR_OG5_ppvvv = 100 * ((gainOG5_ppvvv - bonus) / rimborso);
      CR_OG5_ppvvp = 100 * ((gainOG5_ppvvp - bonus) / rimborso);
      CR_OG5_ppvpv = 100 * ((gainOG5_ppvpv - bonus) / rimborso);
      CR_OG5_ppvpp = 100 * ((gainOG5_ppvpp - bonus) / rimborso);
      CR_OG5_pppvv = 100 * ((gainOG5_pppvv - bonus) / rimborso);
      CR_OG5_pppvp = 100 * ((gainOG5_pppvp - bonus) / rimborso);
      CR_OG5_ppppv = 100 * ((gainOG5_ppppv - bonus) / rimborso);
      CR_OG5_ppppp = 100 * ((gainOG5_ppppp - bonus) / rimborso);
    } else {
      CR_OG5_vvvvv = 0;
      CR_OG5_vvvvp = 0;
      CR_OG5_vvvpv = 0;
      CR_OG5_vvvpp = 0;
      CR_OG5_vvpvv = 0;
      CR_OG5_vvpvp = 0;
      CR_OG5_vvppv = 0;
      CR_OG5_vvppp = 0;
      CR_OG5_vpvvv = 0;
      CR_OG5_vpvvp = 0;
      CR_OG5_vpvpv = 0;
      CR_OG5_vpvpp = 0;
      CR_OG5_vppvv = 0;
      CR_OG5_vppvp = 0;
      CR_OG5_vpppv = 0;
      CR_OG5_vpppp = 0;

      CR_OG5_pvvvv = 0;
      CR_OG5_pvvvp = 0;
      CR_OG5_pvvpv = 0;
      CR_OG5_pvvpp = 0;
      CR_OG5_pvpvv = 0;
      CR_OG5_pvpvp = 0;
      CR_OG5_pvppv = 0;
      CR_OG5_pvppp = 0;
      CR_OG5_ppvvv = 0;
      CR_OG5_ppvvp = 0;
      CR_OG5_ppvpv = 0;
      CR_OG5_ppvpp = 0;
      CR_OG5_pppvv = 0;
      CR_OG5_pppvp = 0;
      CR_OG5_ppppv = 0;
      CR_OG5_ppppp = 0;
    }
  }

  if (rimborso != 0) {
    $('#quiRat_VVVVV').html(CR_OG5_vvvvv.toFixed(2) + '%');
    $('#quiRat_VVVVP').html(CR_OG5_vvvvp.toFixed(2) + '%');
    $('#quiRat_VVVPV').html(CR_OG5_vvvpv.toFixed(2) + '%');
    $('#quiRat_VVVPP').html(CR_OG5_vvvpp.toFixed(2) + '%');
    $('#quiRat_VVPVV').html(CR_OG5_vvpvv.toFixed(2) + '%');
    $('#quiRat_VVPVP').html(CR_OG5_vvpvp.toFixed(2) + '%');
    $('#quiRat_VVPPV').html(CR_OG5_vvppv.toFixed(2) + '%');
    $('#quiRat_VVPPP').html(CR_OG5_vvppp.toFixed(2) + '%');
    $('#quiRat_VPVVV').html(CR_OG5_vpvvv.toFixed(2) + '%');
    $('#quiRat_VPVVP').html(CR_OG5_vpvvp.toFixed(2) + '%');
    $('#quiRat_VPVPV').html(CR_OG5_vpvpv.toFixed(2) + '%');
    $('#quiRat_VPVPP').html(CR_OG5_vpvpp.toFixed(2) + '%');
    $('#quiRat_VPPVV').html(CR_OG5_vppvv.toFixed(2) + '%');
    $('#quiRat_VPPVP').html(CR_OG5_vppvp.toFixed(2) + '%');
    $('#quiRat_VPPPV').html(CR_OG5_vpppv.toFixed(2) + '%');
    $('#quiRat_VPPPP').html(CR_OG5_vpppp.toFixed(2) + '%');

    $('#quiRat_PVVVV').html(CR_OG5_pvvvv.toFixed(2) + '%');
    $('#quiRat_PVVVP').html(CR_OG5_pvvvp.toFixed(2) + '%');
    $('#quiRat_PVVPV').html(CR_OG5_pvvpv.toFixed(2) + '%');
    $('#quiRat_PVVPP').html(CR_OG5_pvvpp.toFixed(2) + '%');
    $('#quiRat_PVPVV').html(CR_OG5_pvpvv.toFixed(2) + '%');
    $('#quiRat_PVPVP').html(CR_OG5_pvpvp.toFixed(2) + '%');
    $('#quiRat_PVPPV').html(CR_OG5_pvppv.toFixed(2) + '%');
    $('#quiRat_PVPPP').html(CR_OG5_pvppp.toFixed(2) + '%');
    $('#quiRat_PPVVV').html(CR_OG5_ppvvv.toFixed(2) + '%');
    $('#quiRat_PPVVP').html(CR_OG5_ppvvp.toFixed(2) + '%');
    $('#quiRat_PPVPV').html(CR_OG5_ppvpv.toFixed(2) + '%');
    $('#quiRat_PPVPP').html(CR_OG5_ppvpp.toFixed(2) + '%');
    $('#quiRat_PPPVV').html(CR_OG5_pppvv.toFixed(2) + '%');
    $('#quiRat_PPPVP').html(CR_OG5_pppvp.toFixed(2) + '%');
    $('#quiRat_PPPPV').html(CR_OG5_ppppv.toFixed(2) + '%');
    $('#quiRat_PPPPP').html(CR_OG5_ppppp.toFixed(2) + '%');
  } else {
    $('#quiRat_VVVVV').html(ratOG5_vvvvv.toFixed(2) + '%');
    $('#quiRat_VVVVP').html(ratOG5_vvvvp.toFixed(2) + '%');
    $('#quiRat_VVVPV').html(ratOG5_vvvpv.toFixed(2) + '%');
    $('#quiRat_VVVPP').html(ratOG5_vvvpp.toFixed(2) + '%');
    $('#quiRat_VVPVV').html(ratOG5_vvpvv.toFixed(2) + '%');
    $('#quiRat_VVPVP').html(ratOG5_vvpvp.toFixed(2) + '%');
    $('#quiRat_VVPPV').html(ratOG5_vvppv.toFixed(2) + '%');
    $('#quiRat_VVPPP').html(ratOG5_vvppp.toFixed(2) + '%');
    $('#quiRat_VPVVV').html(ratOG5_vpvvv.toFixed(2) + '%');
    $('#quiRat_VPVVP').html(ratOG5_vpvvp.toFixed(2) + '%');
    $('#quiRat_VPVPV').html(ratOG5_vpvpv.toFixed(2) + '%');
    $('#quiRat_VPVPP').html(ratOG5_vpvpp.toFixed(2) + '%');
    $('#quiRat_VPPVV').html(ratOG5_vppvv.toFixed(2) + '%');
    $('#quiRat_VPPVP').html(ratOG5_vppvp.toFixed(2) + '%');
    $('#quiRat_VPPPV').html(ratOG5_vpppv.toFixed(2) + '%');
    $('#quiRat_VPPPP').html(ratOG5_vpppp.toFixed(2) + '%');

    $('#quiRat_PVVVV').html(ratOG5_pvvvv.toFixed(2) + '%');
    $('#quiRat_PVVVP').html(ratOG5_pvvvp.toFixed(2) + '%');
    $('#quiRat_PVVPV').html(ratOG5_pvvpv.toFixed(2) + '%');
    $('#quiRat_PVVPP').html(ratOG5_pvvpp.toFixed(2) + '%');
    $('#quiRat_PVPVV').html(ratOG5_pvpvv.toFixed(2) + '%');
    $('#quiRat_PVPVP').html(ratOG5_pvpvp.toFixed(2) + '%');
    $('#quiRat_PVPPV').html(ratOG5_pvppv.toFixed(2) + '%');
    $('#quiRat_PVPPP').html(ratOG5_pvppp.toFixed(2) + '%');
    $('#quiRat_PPVVV').html(ratOG5_ppvvv.toFixed(2) + '%');
    $('#quiRat_PPVVP').html(ratOG5_ppvvp.toFixed(2) + '%');
    $('#quiRat_PPVPV').html(ratOG5_ppvpv.toFixed(2) + '%');
    $('#quiRat_PPVPP').html(ratOG5_ppvpp.toFixed(2) + '%');
    $('#quiRat_PPPVV').html(ratOG5_pppvv.toFixed(2) + '%');
    $('#quiRat_PPPVP').html(ratOG5_pppvp.toFixed(2) + '%');
    $('#quiRat_PPPPV').html(ratOG5_ppppv.toFixed(2) + '%');
    $('#quiRat_PPPPP').html(ratOG5_ppppp.toFixed(2) + '%');
  }
  //GUADAGNI QUINTUPLA (FINE)

  if (!puntata) {
    ratingOnGoW = 100;
  } else {
    ratingOnGoW = 100 + 100 * ((gainOnGoW - bonus) / puntata);
  }
  /* $("#onGoW_figure")[0].innerHTML = ratingOnGoW.toFixed(2)+"%";
  if (ratingOnGoW < 100) {
    $("#onGoW_figure").css("color", "red");
  } else {
    $("#onGoW_figure").css("color", "#009c00");
    $("#onGoW_figure").prepend("+");
  } */

  gainOnGoL =
    -puntata +
    DolToMath($('#FinGain_M1')[0].innerHTML) +
    DolToMath($('#FinGain_M2')[0].innerHTML) +
    DolToMath($('#FinGain_M3')[0].innerHTML) +
    DolToMath($('#FinGain_M4')[0].innerHTML) +
    DolToMath($('#FinGain_M5')[0].innerHTML);

  if (!puntata) {
    ratingOnGoL = 100;
  } else {
    ratingOnGoL = 100 + 100 * (gainOnGoL / puntata);
  }
  /* $("#onGoL_figure")[0].innerHTML = ratingOnGoL.toFixed(2)+"%";
  if (ratingOnGoL < 100) {
    $("#onGoL_figure").css("color", "red");
  } else {
    $("#onGoL_figure").css("color", "#009c00");
    $("#onGoL_figure").prepend("+");
  } */

  $('input#puntata_copy')[0].value = $('#mult_lamiapuntata')[0].value;
  $('input#quantieventi_copy')[0].value = $('#mult_quantieventi')[0].value;
  $('#mult_myRimbo').val(rimboType + '-' + rimborso);

  if (rimboType == 0 || rimborso == 0) {
    if ($("input[name='situazione_M1']:checked").val() == 'V_M1') {
      $('#rigaAgg_2').addClass('green').removeClass('red');
      $('#warning_M2').addClass('verde').removeClass('rosso');
      $('#warning_M2').html(
        'EV#2 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M2').removeClass('waitLay');
      $('#warnS_M2').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_2').addClass('red').removeClass('green');
      $('#warning_M2').addClass('rosso').removeClass('verde');
      $('#warning_M2').html(
        'EV#2 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M2').addClass('waitLay');
      $('#warnS_M2').removeClass('layYES').addClass('layNO').html('NO');
    }

    if (
      $("input[name='situazione_M1']:checked").val() == 'V_M1' &&
      $("input[name='situazione_M2']:checked").val() == 'V_M2'
    ) {
      $('#rigaAgg_3').addClass('green').removeClass('red');
      $('#warning_M3').addClass('verde').removeClass('rosso');
      $('#warning_M3').html(
        'EV#3 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M3').removeClass('waitLay');
      $('#warnS_M3').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_3').addClass('red').removeClass('green');
      $('#warning_M3').addClass('rosso').removeClass('verde');
      $('#warning_M3').html(
        'EV#3 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M3').addClass('waitLay');
      $('#warnS_M3').removeClass('layYES').addClass('layNO').html('NO');
    }

    if (
      $("input[name='situazione_M1']:checked").val() == 'V_M1' &&
      $("input[name='situazione_M2']:checked").val() == 'V_M2' &&
      $("input[name='situazione_M3']:checked").val() == 'V_M3'
    ) {
      $('#rigaAgg_4').addClass('green').removeClass('red');
      $('#warning_M4').addClass('verde').removeClass('rosso');
      $('#warning_M4').html(
        'EV#4 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M4').removeClass('waitLay');
      $('#warnS_M4').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_4').addClass('red').removeClass('green');
      $('#warning_M4').addClass('rosso').removeClass('verde');
      $('#warning_M4').html(
        'EV#4 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M4').addClass('waitLay');
      $('#warnS_M4').removeClass('layYES').addClass('layNO').html('NO');
    }

    if (
      $("input[name='situazione_M1']:checked").val() == 'V_M1' &&
      $("input[name='situazione_M2']:checked").val() == 'V_M2' &&
      $("input[name='situazione_M3']:checked").val() == 'V_M3' &&
      $("input[name='situazione_M4']:checked").val() == 'V_M4'
    ) {
      $('#rigaAgg_5').addClass('green').removeClass('red');
      $('#warning_M5').addClass('verde').removeClass('rosso');
      $('#warning_M5').html(
        'EV#5 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M5').removeClass('waitLay');
      $('#warnS_M5').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_5').addClass('red').removeClass('green');
      $('#warning_M5').addClass('rosso').removeClass('verde');
      $('#warning_M5').html(
        'EV#5 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M5').addClass('waitLay');
      $('#warnS_M5').removeClass('layYES').addClass('layNO').html('NO');
    }
  } else if (rimboType == 1) {
    var p1L, p2L, p3L, p4L;
    if (multiStatus.substr(0, 1).search(/P/g) != -1) {
      p1L = multiStatus.substr(0, 1).match(/P/g).length;
    } else {
      p1L = 0;
    }

    if (multiStatus.substr(0, 2).search(/P/g) != -1) {
      var p2L = multiStatus.substr(0, 2).match(/P/g).length;
    } else {
      var p2L = 0;
    }

    if (multiStatus.substr(0, 3).search(/P/g) != -1) {
      var p3L = multiStatus.substr(0, 3).match(/P/g).length;
    } else {
      var p3L = 0;
    }

    if (multiStatus.substr(0, 4).search(/P/g) != -1) {
      var p4L = multiStatus.substr(0, 4).match(/P/g).length;
    } else {
      var p4L = 0;
    }

    if ($("input[name='situazione_M1']:checked").val() !== 'A_M1' && p1L <= 1) {
      $('#rigaAgg_2').addClass('green').removeClass('red');
      $('#warning_M2').addClass('verde').removeClass('rosso');
      $('#warning_M2').html(
        'EV#2 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M2').removeClass('waitLay');
      $('#warnS_M2').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_2').addClass('red').removeClass('green');
      $('#warning_M2').addClass('rosso').removeClass('verde');
      $('#warning_M2').html(
        'EV#2 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M2').addClass('waitLay');
      $('#warnS_M2').removeClass('layYES').addClass('layNO').html('NO');
    }

    if (
      $("input[name='situazione_M1']:checked").val() !== 'A_M1' &&
      $("input[name='situazione_M2']:checked").val() !== 'A_M2' &&
      p2L <= 1
    ) {
      $('#rigaAgg_3').addClass('green').removeClass('red');
      $('#warning_M3').addClass('verde').removeClass('rosso');
      $('#warning_M3').html(
        'EV#3 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M3').removeClass('waitLay');
      $('#warnS_M3').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_3').addClass('red').removeClass('green');
      $('#warning_M3').addClass('rosso').removeClass('verde');
      $('#warning_M3').html(
        'EV#3 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M3').addClass('waitLay');
      $('#warnS_M3').removeClass('layYES').addClass('layNO').html('NO');
    }

    if (
      $("input[name='situazione_M1']:checked").val() !== 'A_M1' &&
      $("input[name='situazione_M2']:checked").val() !== 'A_M2' &&
      $("input[name='situazione_M3']:checked").val() !== 'A_M3' &&
      p3L <= 1
    ) {
      $('#rigaAgg_4').addClass('green').removeClass('red');
      $('#warning_M4').addClass('verde').removeClass('rosso');
      $('#warning_M4').html(
        'EV#4 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M4').removeClass('waitLay');
      $('#warnS_M4').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_4').addClass('red').removeClass('green');
      $('#warning_M4').addClass('rosso').removeClass('verde');
      $('#warning_M4').html(
        'EV#4 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M4').addClass('waitLay');
      $('#warnS_M4').removeClass('layYES').addClass('layNO').html('NO');
    }

    if (
      $("input[name='situazione_M1']:checked").val() !== 'A_M1' &&
      $("input[name='situazione_M2']:checked").val() !== 'A_M2' &&
      $("input[name='situazione_M3']:checked").val() !== 'A_M3' &&
      $("input[name='situazione_M4']:checked").val() !== 'A_M4' &&
      p4L <= 1
    ) {
      $('#rigaAgg_5').addClass('green').removeClass('red');
      $('#warning_M5').addClass('verde').removeClass('rosso');
      $('#warning_M5').html(
        'EV#5 <i class="ui thumbs up outline green icon"></i> <i class="ui check green icon"></i>BANCA<i class="ui check green icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M5').removeClass('waitLay');
      $('#warnS_M5').addClass('layYES').removeClass('layNO').html('BANCA');
    } else {
      $('#rigaAgg_5').addClass('red').removeClass('green');
      $('#warning_M5').addClass('rosso').removeClass('verde');
      $('#warning_M5').html(
        'EV#5 <i class="ui thumbs down outline red icon"></i> <i class="ui ban red icon"></i><u>NON BANCARE </u><i class="ui ban red icon"></i>'
      );
      if (puntata) $('#lay_tabRisult_M5').addClass('waitLay');
      $('#warnS_M5').removeClass('layYES').addClass('layNO').html('NO');
    }
  }

  if (multiStatus && multiStatus.length == num_ev) {
    if (WOW) {
      $('#messaggioSV_tagL').html('MULTIPLA VINTA');
      $('#messaggioSV_tagL')
        .removeClass('blue')
        .removeClass('red')
        .removeClass('brown')
        .addClass('green');
    } else if (DEFEAT) {
      $('#messaggioSV_tagL').html('MULTIPLA TERMINATA');
      $('#messaggioSV_tagL')
        .removeClass('blue')
        .removeClass('red')
        .removeClass('green')
        .addClass('brown');
    }
    $('#messaggioSV_txt').html('');
  } else if (n_perse > 1) {
    var msgHtml = 'Non bancare le partite ';
    $('#messaggioSV_tagL').html('! STOP ALLE BANCATE !');
    $('#messaggioSV_tagL')
      .addClass('red')
      .removeClass('blue')
      .removeClass('brown')
      .removeClass('green');
    var PPP = '';
    var whenStop;
    for (var i = 0; i < multiStatus.length; i++) {
      if (multiStatus[i] == 'P') {
        ++PPP;
        // console.log(PPP);
        if (PPP == 2) {
          whenStop = i + 1;
          break;
        }
      }
    }
    for (var j = 1; j <= num_ev; j++) {
      if (j <= whenStop) {
        continue;
      } else if (num_ev - j >= 1) {
        msgHtml += '#' + j + ', ';
        // console.log(msgHtml);
      } else {
        msgHtml += 'e #' + j + '.';
        // console.log(msgHtml);
      }
      msgHtml = msgHtml.replace(/, e/g, ' e').replace(/le partite e/, 'la partita');
    }
    $('#messaggioSV_txt').html(msgHtml);
  } else if (multiStatus == '') {
    $('#messaggioSV_tagL').html('IN ATTESA DEGLI ESITI...');
    $('#messaggioSV_tagL')
      .addClass('blue')
      .removeClass('red')
      .removeClass('brown')
      .removeClass('green');
    $('#messaggioSV_txt').html('');
  } else {
    $('#messaggioSV_tagL').html('MULTIPLA IN CORSO');
    $('#messaggioSV_tagL')
      .removeClass('blue')
      .removeClass('red')
      .removeClass('brown')
      .removeClass('green');
    $('#messaggioSV_txt').html('');
  }
}

/* function totalizza(M_num, callback) {
  var start = 0;
  var match = M_num.substr(-2);
  var lay_s = parseFloat($("#banca_New0_M1")[0].innerHTML.replace(/€/g,''));
  var odd_s = parseFloat($("#quotaB_New0_M1")[0].innerHTML.replace(/@/g,''));
  if($("#comm_New0_M1")[0].value) {
    var com_s = parseFloat($("#comm_New0_M1")[0].value.replace(/%/g,''))/100
  } else {
    var com_s = parseFloat($("#mult_lamiacommissione")[0].value.replace(/%/g,''))/100
  }
  start = lay_s * (odd_s - com_s);
	
  for (var i=0;i<6;i++) {
    var O = "quotaB_New" + i + "_" + match;
    if(i==0) {
      var OO = odd_s
    } else {
      if($(eval(O))[0].value) {
      var OO = parseFloat($(eval(O))[0].value.replace(/@/g,''))
      } else {
        var OO = 0
      }
    }
  	
    var L = "abb_New" + i + "_" + match;
    if($(eval(L))[0].value) {
      var LL = parseFloat($(eval(L))[0].value)
    } else {
      LL = 0
    }
  	
    var C = "comm_New" + i + "_" + match;
    if ($(eval(C))[0].value) {
      var CC = parseFloat($(eval(C))[0].value.replace(/%/g,''))/100
    } else {
      var CC = parseFloat($("#mult_lamiacommissione")[0].value.replace(/%/g,''))/100
    }
  	
    start = start - (LL * (OO - CC));
  }
  console.log(start);
  callback(start, match);
}
 */

function totalizza(M_num, callback) {
  var shiftArr = [];
  var cop_orig_remain;
  var start = 0;
  var match = M_num.substr(-2);
  var lay_elem = '#banca_New0_' + match; //"lay_tabRisult_" + match;

  //var layBench_elem = "#lay_tabRisult_" + match;
  var layBench_elem = 'benchB' + match.substr(-1);

  var odd_elem = '#quotaB_New0_' + match;
  var cop_elem = '#copLab_' + match;
  var abbin_elem_0 = '#abb_New0_' + match;
  var respo_elem = '#respo_New0_' + match;

  var lay_s = parseFloat($(lay_elem)[0].innerHTML.replace(/€/g, ''));
  //var lay_s = parseFloat($(layBench_elem)[0].innerHTML.replace(/€/g,''));

  //var lay_s = parseFloat($("#banca_New0_M1")[0].innerHTML.replace(/€/g,''));

  //var layBench = parseFloat($(layBench_elem)[0].innerHTML.replace(/€/g,''));
  var layBench = parseFloat(eval(layBench_elem).toFixed(2));

  var odd_s = parseFloat($(odd_elem)[0].innerHTML.replace(/@/g, ''));
  shiftArr[0] = lay_s;
  var comm_elem = '#comm_New0_' + match;
  if ($(comm_elem)[0].value) {
    var com_s = parseFloat($(comm_elem)[0].value.replace(/%/g, '')) / 100;
  } else {
    var com_s = parseFloat($('#mult_lamiacommissione')[0].value.replace(/%/g, '')) / 100;
  }
  start = lay_s * (odd_s - com_s);

  for (var i = 0; i < 6; i++) {
    var O = '#quotaB_New' + i + '_' + match;
    if (i == 0) {
      var OO = odd_s;
    } else {
      if ($(O)[0].value) {
        var OO = parseFloat($(O)[0].value.replace(/@/g, ''));
      } else {
        var OO = 0;
      }
    }

    var L = '#abb_New' + i + '_' + match;
    if ($(L)[0].value) {
      var LL = parseFloat($(L)[0].value);
    } else {
      LL = 0;
    }

    var C = '#comm_New' + i + '_' + match;
    if ($(C)[0].value) {
      var CC = parseFloat($(C)[0].value.replace(/%/g, '')) / 100;
    } else {
      var CC = parseFloat($('#mult_lamiacommissione')[0].value.replace(/%/g, '')) / 100;
    }

    start = start - LL * (OO - CC);
  }

  if (DolToMath($(abbin_elem_0)[0].value) == DolToMath($(lay_elem)[0].innerHTML)) {
    // console.log("100%");
    var cop_orig_remain_FRAC = 100;
  } else {
    var mySum_abb = 0;
    var mySum_teor = 0;
    var myDiff = 0;
    for (k = 1; k <= 5; k++) {
      mySum_abb = mySum_abb + DolToMath($('#abb_New' + k + '_' + match)[0].value);
      mySum_teor = mySum_teor + DolToMath($('#banca_New' + k + '_' + match)[0].innerHTML);
      myDiff = mySum_abb - mySum_teor;
    }
    // console.log("mySum abbinata:" + mySum_abb);
    // console.log("mySum teorica:" + mySum_teor);
    // console.log("myDiff: " + myDiff);
  }

  $(respo_elem)[0].innerHTML = (DolToMath($(abbin_elem_0)[0].value) * (odd_s - 1)).toFixed(2) + '€';
  cop_orig_remain = start / (odd_s - com_s);
  // console.log("Totalizz. = " + start);
  // console.log ("copertura residua = " + cop_orig_remain);
  var cop_orig_remain_FRAC = ((layBench - cop_orig_remain) / layBench) * 100;
  // console.log ("copertura residua% = " + cop_orig_remain_FRAC + "%");

  if (isNaN(cop_orig_remain_FRAC)) cop_orig_remain_FRAC = 0; // AGGIUNTA 06/09/2019 h10:22

  $(cop_elem)[0].innerHTML = cop_orig_remain_FRAC.toFixed(2) + '%';
  callback(start, match);
}

function bancate(sum, p) {
  for (var i = 1; i < 6; i++) {
    var respoCal_elem = '#respo_Cal' + i + '_' + p;
    var respoNew_elem = '#respo_New' + i + '_' + p;
    var abbin_elem = '#abb_New' + i + '_' + p;
    var O = '#quotaB_New' + i + '_' + p;
    if ($(O)[0].value) {
      var OO = parseFloat($(O)[0].value.replace(/@/g, ''));
    } else {
      var OO = 0;
    }
    var C = '#comm_New' + i + '_' + p;
    if ($(C)[0].value) {
      var CC = parseFloat($(C)[0].value.replace(/%/g, '')) / 100;
    } else {
      var CC = parseFloat($('#mult_lamiacommissione')[0].value.replace(/%/g, '')) / 100;
    }
    var B = '#banca_New' + i + '_' + p;
    if ($(O)[0].value) {
      $(B)[0].innerHTML = (sum / (OO - CC)).toFixed(2) + '€';
    } else {
      $(B)[0].innerHTML = '';
    }

    if ($(O)[0].value) {
      $(respoCal_elem)[0].innerHTML = ((sum / (OO - CC)) * (OO - 1)).toFixed(2) + '€';
    } else {
      $(respoCal_elem)[0].innerHTML = '';
    }

    if ($(abbin_elem)[0].value) {
      $(respoNew_elem)[0].innerHTML =
        (DolToMath($(abbin_elem)[0].value) * (OO - 1)).toFixed(2) + '€';
    } else {
      $(respoNew_elem)[0].innerHTML = '';
    }
  }
}

/* function bancate (sum, p) {
  for (var i=1; i<6; i++) {
    var respoCal_elem = "respo_Cal" + i + "_" + p;
    var respoNew_elem = "respo_New" + i + "_" + p;
    var abbin_elem = "abb_New" + i + "_" + p;
    var O = "quotaB_New" + i + "_" + p;
    if ($(eval(O))[0].value) {
      var OO = parseFloat($(eval(O))[0].value.replace(/@/g,''))
    } else {
      var OO = 0
    }
    var C = "comm_New" + i + "_" + p;
    if ($(eval(C))[0].value) {
      var CC = parseFloat($(eval(C))[0].value.replace(/%/g,''))/100
    } else {
      var CC = parseFloat($("#mult_lamiacommissione")[0].value.replace(/%/g,''))/100
    }
    var B = "banca_New" + i + "_" + p;
    if ($(eval(O))[0].value) {
      $(eval(B))[0].innerHTML = (sum / (OO-CC)).toFixed(2) + "€";
    } else {
      $(eval(B))[0].innerHTML = "";
    }
  	
    if ($(eval(O))[0].value) {
      $(eval(respoCal_elem))[0].innerHTML = ((sum / (OO-CC)) * (OO - 1)).toFixed(2) + "€";
    }
  	
    if ($(eval(abbin_elem))[0].value) {
      $(eval(respoNew_elem))[0].innerHTML = (DolToMath($(eval(abbin_elem))[0].value) * (OO - 1)).toFixed(2) + "€";
    }
  	
  }
} */

function bancataOrig(sum, o, c) {
  var originalLay = sum / (o - c);
  return originalLay;
  // console.log(originalLay);
}

function showCop(m) {
  var box_elem = '#copertura_' + m;
  var cop_elem = '#copLab_' + m;
  if (
    $(cop_elem)[0].innerHTML &&
    $(cop_elem)[0].innerHTML != NaN &&
    $(cop_elem)[0].innerHTML != undefined
  ) {
    $(box_elem).show();
    if (parseFloat($(cop_elem)[0].innerHTML) < 99) {
      $(cop_elem).addClass('rosso').removeClass('verde').removeClass('verdino').removeClass('blu');
    } else if (
      parseFloat($(cop_elem)[0].innerHTML) >= 99 &&
      parseFloat($(cop_elem)[0].innerHTML) < 99.99
    ) {
      $(cop_elem).addClass('verdino').removeClass('verde').removeClass('rosso').removeClass('blu');
    } else if (
      parseFloat($(cop_elem)[0].innerHTML) >= 99.99 &&
      parseFloat($(cop_elem)[0].innerHTML) <= 100.01
    ) {
      $(cop_elem).addClass('verde').removeClass('verdino').removeClass('rosso').removeClass('blu');
    } else if (
      parseFloat($(cop_elem)[0].innerHTML) > 100.01 &&
      parseFloat($(cop_elem)[0].innerHTML) <= 101
    ) {
      $(cop_elem).addClass('verdino').removeClass('blu').removeClass('rosso').removeClass('verde');
    } else {
      $(cop_elem).addClass('blu').removeClass('verdino').removeClass('rosso').removeClass('verde');
    }
  } else {
    $(box_elem).hide();
  }
}

function trovaR(elm, Npart) {
  if (multiStatus) {
    var L = multiStatus.length;
  } else {
    var L = 0;
  }
  var startP = Npart - 1;
  if (L >= startP) {
    var _str = multiStatus.substr(0, startP).toLowerCase();
    // console.log(eval(elm + Npart + _str));
    return eval(elm + Npart + _str);
  } else {
    // console.log(0);
    return 0;
  }
}

function se_popola(dest, cont) {
  if (dest) dest.innerHTML = cont;
}

function abilitaBtn(line) {
  var rAgg = '.grid_rigaAgg_' + line;
  var abbINITIAL = '#abb_New0_M' + line;
  if ($(rAgg).css('display') == 'none') {
    $(rAgg).css('display', 'grid');
    $(abbINITIAL).focus();
  } else {
    $(rAgg).hide();
  }
}

function actualGain(evt) {
  var elm_radio = '.checkbox.box_M' + evt + ' input:checked';
  var elm_source;
  var elm_dest = '#FinGain_M' + evt;
  var whathappen = $(elm_radio).val().split('_')[0];
  var writeThis;

  switch (whathappen) {
    case 'V':
      elm_source = '#GainIfWin_M' + evt;
      writeThis = DolToMath($(elm_source)[0].innerHTML);
      break;
    case 'P':
      elm_source = '#GainIfLose_M' + evt;
      writeThis = DolToMath($(elm_source)[0].innerHTML);
      break;
    case 'A':
      writeThis = 0;
      break;
  }
  $(elm_dest)[0].innerHTML = writeThis;
  // console.log("writeThis " + evt + ": " + writeThis);
  return writeThis;
}

function openSaveDlg() {
  formToJson();

  $('.coupled.modal.mySave').modal({
    allowMultiple: false,
  });

  /* $('.second.mySave.modal')
      .modal('attach events', '.first.mySave.modal .positive.button'); */

  $.ajax({
    type: 'POST',
    dataType: 'json',
    // url: 'api/multi_c.php',
    url: '/api/multitool/multi_c.php',
    success: function (Rmesg, Rstatus, RResponse) {
      // console.log(Rmesg);
      if (Rmesg['mess'] !== '') {
        //window.alert(Rmesg);
        document.getElementById('saveSecond_header').innerHTML = Rmesg['titolo'];
        document.getElementById('msg_save').innerHTML = Rmesg['mess'];
        $('.second.mySave.modal')
          .modal({
            onHidden: function () {
              $('.second.mySave.modal#SAVE_res > div:first-child')
                .removeClass('red')
                .removeClass('green');
              $('.second.mySave.modal#SAVE_res > div:nth-child(2) > div:first-child')
                .removeClass('red')
                .removeClass('green');
              $('#SAVE_res i.green').remove();
              $('#SAVE_res i.red').remove();
              $('#saveSecond_header').html('');
              $('#msg_save').html('');
            },
          })
          .modal('show');

        if (
          $('#msg_save').text() ==
          'Hai raggiunto il numero massimo di multiple salvabili (10).Cancellane qualcuna prima di continuare.'
        ) {
          $('.second.mySave.modal#SAVE_res > div:first-child').addClass('red').removeClass('green');
          $('.second.mySave.modal#SAVE_res > div:nth-child(2) > div:first-child')
            .addClass('red')
            .removeClass('green');
          $('#SAVE_res i.green').remove();
          $("<i class='ban red icon'></i>").prependTo(
            '.second.mySave.modal#SAVE_res > div:first-child'
          );
        }
      } else {
        $('.first.mySave.modal#SAVE_dlg')
          .modal({
            onApprove: function () {
              if ($('input#mult_myname')[0].value == '') {
                //alert("campo vuoto");
                return false;
              } else {
                var myForm = document.getElementById('sintesi_form');
                var multidata = new FormData(myForm);
                $.ajax({
                  type: 'POST',
                  dataType: 'json',
                  // url: 'api/multi_i.php',
                  url: '/api/multitool/multi_i.php',
                  data: multidata,
                  cache: false,
                  processData: false,
                  contentType: false,
                  success: function (mMesg, mStatus, mResponse) {
                    $('input#mult_myname_copy')[0].value = $('input#mult_myname')[0].value;
                    $('#thisMultiName')[0].innerHTML = $('input#mult_myname')[0].value;
                    // console.log("Messaggio " + mMesg);
                    // console.log("Stato " + mStatus);
                    $('input#mult_myname')[0].value = '';
                    document.getElementById('saveSecond_header').innerHTML = mMesg['titolo'];
                    document.getElementById('msg_save').innerHTML = mMesg['mess'];
                    setTimeout(function () {
                      $('.second.mySave.modal')
                        .modal({
                          onHidden: function () {
                            $('.second.mySave.modal#SAVE_res > div:first-child')
                              .removeClass('red')
                              .removeClass('green');
                            $('.second.mySave.modal#SAVE_res > div:nth-child(2) > div:first-child')
                              .removeClass('red')
                              .removeClass('green');
                            $('#SAVE_res i.green').remove();
                            $('#SAVE_res i.red').remove();
                            $('#saveSecond_header').html('');
                            $('#msg_save').html('');
                          },
                        })
                        .modal('show');

                      if ($('#msg_save').text() == 'Nuova multipla registrata correttamente') {
                        $('.second.mySave.modal#SAVE_res > div:first-child')
                          .addClass('green')
                          .removeClass('red');
                        $('.second.mySave.modal#SAVE_res > div:nth-child(2) > div:first-child')
                          .addClass('green')
                          .removeClass('red');
                        $('#SAVE_res i.red').remove();
                        $("<i class='check green icon'></i>").prependTo(
                          '.second.mySave.modal#SAVE_res > div:first-child'
                        );
                      }

                      checkName();
                    }, 1000);
                  },
                  error: function (xhr, status, error) {
                    alert(xhr.responseText);
                  },
                });
              }
            },
          })
          .modal('show');
      }
    },
  });
}

function openLoadDlg() {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    // url: 'api/multi_s.php',
    url: '/api/multitool/multi_s.php',
    success: function (Lmesg, Lstatus, LResponse) {
      // console.log(Lmesg);
      if (Lmesg['mess'] !== '') {
        if (Lmesg['mess'].search('Non hai multiple salvate') != -1) {
          $('.first.myLoad.modal#LOAD_dlg').addClass('tiny');
          $('#loadListBox_msg').addClass('red');
        } else {
          $('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
          $('#loadListBox_msg').removeClass('red');
        }
        document.getElementById('loadListHeader').innerHTML = Lmesg['titolo'];
        document.getElementById('loadListContent').innerHTML = Lmesg['mess'];
        $('.first.myLoad.modal#LOAD_dlg')
          .modal({
            onVisible: function () {
              var hh = $('.first.myLoad.modal#LOAD_dlg')[0].offsetHeight;
              // console.log("sono alta: " + hh);
              var diffH = lastHeight - hh;
              if (diffH < 50) {
                $('#lastElm').css('min-height', 250 - diffH + 50);
                //$("#lastElm").height(50 - diffH);
              }
              $('[id*=content_Name_]').popup({
                inline: true,
                position: 'left center',
              });
            },
            onHidden: function () {
              $('#lastElm').height('0');
              $('#lastElm').css('min-height', '250px');
              setTimeout(function () {
                $('#mult_lamiapuntata').keyup();
              }, 500);
            },
          })
          .modal('show');

        $('.content_row').on('mouseover', function () {
          var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
          var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
          $(thisBtnLoad).toggleClass('topoOn');
          $(thisBtnDel).toggleClass('topoOn');
          $(this).css({ cursor: 'context-menu', background: '#e2e2e2' });
        });

        $('.content_row').on('mouseout', function () {
          var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
          var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
          $(thisBtnLoad).toggleClass('topoOn');
          $(thisBtnDel).toggleClass('topoOn');
          $(this).css({ cursor: 'unset', background: 'unset' });
        });

        var lL = 0;
        lL = $('[id*=content_Name_]').length;
        // for (var i = 0; i < lL; i++) {
        // 	if ($('[id*=content_Name_]')[i].innerHTML == $('#thisMultiName').html()) {
        // 		$('[id*=content_Name_]')[i].classList.add('aiem');
        // 	} else {
        // 		$('[id*=content_Name_]')[i].classList.remove('aiem');
        // 	}
        // }
        for (var i = 0; i < lL; i++) {
          if ($('[id*=content_Name_]')[i].id.split('_Name_')[1] === $('#idMulti').val()) {
            $('[id*=content_Name_]')[i].classList.add('aiem');
          } else {
            $('[id*=content_Name_]')[i].classList.remove('aiem');
          }
        }
      }
    },
  });
}

function openUpdDlg() {
  formToJson();

  $.ajax({
    type: 'POST',
    dataType: 'json',
    // url: 'api/multi_o.php',
    url: '/api/multitool/multi_o.php',
    success: function (Lmesg, Lstatus, LResponse) {
      // console.log(Lmesg);
      if (Lmesg['mess'] !== '') {
        if (Lmesg['mess'].search('Non hai multiple salvate') != -1) {
          $('.first.myLoad.modal#LOAD_dlg').addClass('tiny');
          $('#loadListBox_msg').addClass('red');
        } else {
          $('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
          $('#loadListBox_msg').removeClass('red');
        }
        document.getElementById('loadListHeader').innerHTML = Lmesg['titolo'];
        document.getElementById('loadListContent').innerHTML = Lmesg['mess'];
        $('.first.myLoad.coupled.modal#LOAD_dlg')
          .modal({
            onVisible: function () {
              var hh = $('.first.myLoad.modal#LOAD_dlg')[0].offsetHeight;
              // console.log("sono alta: " + hh);
              var diffH = lastHeight - hh;
              if (diffH < 50) {
                $('#lastElm').css('min-height', 250 - diffH + 50);
                //$("#lastElm").height(50 - diffH);
              }
              setTimeout(function () {
                $('[id*=content_Name_].aiem input').blur();
                $('#loadListBox_msg').click();
                // console.log("funge?");
              }, 250);
              $('[id*=content_Name_]').popup({
                inline: true,
                position: 'left center',
              });
            },
            onHidden: function () {
              $('#lastElm').height('0');
              $('#lastElm').css('min-height', '250px');
            },
            allowMultiple: false,
          })
          .modal('show');

        // if ($('.first.modal .button[id*="overwrN_"]').length > 0) {
        // 	$('.second.myUpdate').modal('attach events', '.first.modal .button[id*="overwrN_"]');
        // }

        $('.content_row').on('mouseover', function () {
          var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
          var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
          $(thisBtnLoad).toggleClass('topoOn');
          $(thisBtnDel).toggleClass('topoOn');
          $(this).css({ cursor: 'context-menu', background: '#e2e2e2' });
        });

        $('.content_row').on('mouseout', function () {
          var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
          var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
          $(thisBtnLoad).toggleClass('topoOn');
          $(thisBtnDel).toggleClass('topoOn');
          $(this).css({ cursor: 'unset', background: 'unset' });
        });

        var lL = 0;
        lL = $('[id*=content_Name_]').length;
        // for (var i = 0; i < lL; i++) {
        // 	if ($('[id*=content_Name_] input')[i].value == $('#thisMultiName').html()) {
        // 		$('[id*=content_Name_]')[i].classList.add('aiem');
        // 	} else {
        // 		$('[id*=content_Name_]')[i].classList.remove('aiem');
        // 	}
        // }
        for (var i = 0; i < lL; i++) {
          if ($('[id*=content_Name_] input')[i].id.split('_')[1] === $('#idMulti').val()) {
            $('[id*=content_Name_]')[i].classList.add('aiem');
          } else {
            $('[id*=content_Name_]')[i].classList.remove('aiem');
          }
        }
      }
    },
  });
}

function carica_mult(quale_multi) {
  $('[id*=FinGain_M]').html(0); //istruzione che ripulisce tutti i #FinGain_M delle 5 righe eventualmente presenti da multiple precedenti

  var qualecarico = quale_multi.split('_')[1];
  // console.log(qualecarico);
  $('#mult_myname_copy')[0].value = $('#content_Name_' + qualecarico)[0].innerHTML;
  $('#thisMultiName')[0].innerHTML = $('#content_Name_' + qualecarico)[0].innerHTML;

  $.ajax({
    type: 'GET',
    // url: 'api/multi_m.php?act=load&multi=' + qualecarico,
    url: '/api/multitool/multi_m.php?act=load&multi=' + qualecarico,
    dataType: 'json',
    cache: false,
    success: function (data) {
      //AGGIUNTA NOME MULTIPLA 21-07-2019 h09:31
      //controlla_nome(data['nome_multipla']);
      //FINE AGGIUNTA NOME MULTIPLA 21-07-2019 h09:31

      if (data['rimbTipo'].split('-')[0] == '0') {
        // console.log("multipla con rimborso normale");
        rimboType = 0;
        $('.ui.dropdown#labelRimbo').dropdown('set text', 'Rimborso');
        $('#labelRimbo').removeClass('inRosso');
      } else if (data['rimbTipo'].split('-')[0] == '1') {
        // console.log("multipla con rimborso per 1 perdente");
        rimboType = 1;
        $('.ui.dropdown#labelRimbo').dropdown('set text', '1 perde');
        $('#labelRimbo').addClass('inRosso');
      }

      // console.log(data);
      $('#idMulti')[0].value = qualecarico;
      fill_form(data['dati_mul'].replace(/\\/g, ''));
    },
  });

  checkName();
}

function elim_mult(quale_multi) {
  qualecarico = quale_multi.split('_')[1];
  // console.log(qualecarico);
  var punta_Del = $("[id*='content_Doll_" + qualecarico + "']")[0].innerHTML;
  var nome_Del = $("[id*='content_Name_" + qualecarico + "']")[0].innerHTML;
  var data_Del = $("[id*='content_Date_" + qualecarico + "']")[0].innerHTML;

  $('#msg_load')[0].innerHTML =
    "<div class='confermaDel' id='confDel_Box'>" +
    "<div class='confermaDel' id='confDel_Name'>" +
    nome_Del +
    '</div>' +
    "<span class='confermaDel' id='confDel_Doll'>di &nbsp;" +
    punta_Del +
    '</span>' +
    '<br>' +
    "<span class='confermaDel' id='confDel_Date'> registrata il: &nbsp;" +
    data_Del.split(' ')[0] +
    '&nbsp; alle h:' +
    data_Del.split(' ')[1] +
    '</span>' +
    '</div>';

  $('.second.myLoad.modal#LOAD_res')
    .modal({
      onApprove: function () {
        $.ajax({
          type: 'GET',
          // url: 'api/multi_m.php?act=del&multi=' + qualecarico,
          url: '/api/multitool/multi_m.php?act=del&multi=' + qualecarico,
          success: function () {
            if (qualecarico == $('#idMulti').val()) {
              $('#thisMultiNameBox').hide();
              $('#thisMultiName').html('');
            }
            setTimeout(function () {
              openLoadDlg();
            }, 500);
          },
        });
      },
    })
    .modal('show');

  /* $.ajax ({
    type: "GET",
    url: "api/multi_m.php?act=del&multi=" + qualecarico,
    success: function(){
      setTimeout(function() {
        openLoadDlg();
      }, 500)
    }
  }) */
}

function overwrite_mult(nome, quale_multi, multName) {
  var qualecarico = quale_multi.split('_')[1];
  var qualeinput = "input[name='" + nome + qualecarico + "']";
  var myUPDForm = document.getElementById('sintesi_form');

  const isSameMult = qualecarico === $('#idMulti').val();
  if (!isSameMult && $('#idMulti').val() !== '') {
    $('#msg_update_same_warning').html(
      '<h3>Stai aggiornando una multipla diversa da quella caricata!</h3>'
    );
  } else {
    $('#msg_update_same_warning').html('');
  }

  const clonedPopup = $(`#${quale_multi}`).closest('.content_row').find('.popup').clone(false);
  const htmlContent = clonedPopup
    .html()
    .replace(/<div[^\n]*<\/div>/, `<div class="mult-name">${multName}</div>`);
  $('#msg_update_warning').html(htmlContent);

  // $('#idMulti')[0].value = qualecarico;
  // $('#mult_myname_copy')[0].value = $(qualeinput)[0].value;
  // $('#thisMultiName')[0].innerHTML = $(qualeinput)[0].value;

  // var multiUPDdata = new FormData(myUPDForm);

  $('.second.myUpdate#UPD_warn')
    .modal({
      allowMultiple: true,
      onApprove: function () {
        $('#idMulti')[0].value = qualecarico;
        $('#mult_myname_copy')[0].value = $(qualeinput)[0].value;

        var multiUPDdata = new FormData(myUPDForm);

        $.ajax({
          type: 'POST',
          dataType: 'json',
          // url: 'api/multi_u.php',
          url: '/api/multitool/multi_u.php',
          data: multiUPDdata,
          cache: false,
          processData: false,
          contentType: false,
          success: function (Umesg, Ustatus, UResponse) {
            $('#thisMultiName')[0].innerHTML = $(qualeinput)[0].value;

            myt = Umesg['titolo'];
            mym = Umesg['mess'];
            $('#updateSecond_header')[0].innerHTML = myt;
            $('#msg_update')[0].innerHTML = mym;

            // $('.first.myLoad.modal#LOAD_dlg').modal('hide');

            $('.second.myUpdate#UPD_res').modal('show');

            checkName();
          },
        });
      },
    })
    .modal('show');
}

function splitDocumentUrl() {
  //var mulUrl = document.referrer;
  //mulUrl = mulUrl.split('?')[1];
  if (mulUrl.split('?')[1]) {
    if (parent.document.getElementById('iframeNewMulti')) {
      mulUrl = '{' + mulUrl.split('?')[1] + '}';
    } else {
      mulUrl = '{' + mulUrl.split('?')[1] + '}';
    }
  } else {
    mulUrl = undefined;
    //$("#mult_quantieventi")[0].value = 2;
    //$("#mult_quantieventi").change();
  }
  if (mulUrl == undefined) {
    mulArray = undefined;
    $('#mult_quantieventi')[0].value = 2;
    $('#mult_quantieventi').change();
  } else {
    mulUrl = mulUrl.replace(/%22/g, '"').replace(/%20/g, ' ');
    mulUrlJ = JSON.parse(mulUrl);
    // console.log(mulUrlJ);
    $('#mult_quantieventi')[0].value = mulUrlJ['mult_quantieventi'];
    $('#mult_quantieventi').change();

    //IMPORTI & COMMISSIONI
    if (mulUrlJ['mult_lamiapuntata'])
      $('#mult_lamiapuntata')[0].value = mulUrlJ['mult_lamiapuntata'];
    if (mulUrlJ['mult_ilmiorimborso'])
      $('#mult_ilmiorimborso')[0].value = mulUrlJ['mult_ilmiorimborso'];
    if (mulUrlJ['mult_lamiacommissione']) {
      $('#mult_lamiacommissione')[0].value = mulUrlJ['mult_lamiacommissione'];
      $('#mult_lamiacommissione').blur();
    }

    //EVENTI
    if (mulUrlJ['matchName_M1']) $('#matchName_M1')[0].value = mulUrlJ['matchName_M1'];
    if (mulUrlJ['matchName_M2']) $('#matchName_M2')[0].value = mulUrlJ['matchName_M2'];
    if (mulUrlJ['matchName_M3']) $('#matchName_M3')[0].value = mulUrlJ['matchName_M3'];
    if (mulUrlJ['matchName_M4']) $('#matchName_M4')[0].value = mulUrlJ['matchName_M4'];
    if (mulUrlJ['matchName_M5']) $('#matchName_M5')[0].value = mulUrlJ['matchName_M5'];

    //DATE
    if (mulUrlJ['dateH_M1']) $('#dateH_M1')[0].value = mulUrlJ['dateH_M1'];
    if (mulUrlJ['dateH_M2']) $('#dateH_M2')[0].value = mulUrlJ['dateH_M2'];
    if (mulUrlJ['dateH_M2']) $('#dateH_M2')[0].value = mulUrlJ['dateH_M2'];
    if (mulUrlJ['dateH_M3']) $('#dateH_M3')[0].value = mulUrlJ['dateH_M3'];
    if (mulUrlJ['dateH_M4']) $('#dateH_M4')[0].value = mulUrlJ['dateH_M4'];
    if (mulUrlJ['dateH_M5']) $('#dateH_M5')[0].value = mulUrlJ['dateH_M5'];

    //QUOTE PUNTA
    if (mulUrlJ['mult_quotaP_set1']) {
      $('#mult_quotaP_set1')[0].value = mulUrlJ['mult_quotaP_set1'];
      $('#mult_quotaP_set1').blur();
    }
    if (mulUrlJ['mult_quotaP_set2']) {
      $('#mult_quotaP_set2')[0].value = mulUrlJ['mult_quotaP_set2'];
      $('#mult_quotaP_set2').blur();
    }
    if (mulUrlJ['mult_quotaP_set3']) {
      $('#mult_quotaP_set3')[0].value = mulUrlJ['mult_quotaP_set3'];
      $('#mult_quotaP_set3').blur();
    }
    if (mulUrlJ['mult_quotaP_set4']) {
      $('#mult_quotaP_set4')[0].value = mulUrlJ['mult_quotaP_set4'];
      $('#mult_quotaP_set4').blur();
    }
    if (mulUrlJ['mult_quotaP_set5']) {
      $('#mult_quotaP_set5')[0].value = mulUrlJ['mult_quotaP_set5'];
      $('#mult_quotaP_set5').blur();
    }

    //QUOTE BANCA
    if (mulUrlJ['mult_quotaB_set1']) {
      $('#mult_quotaB_set1')[0].value = mulUrlJ['mult_quotaB_set1'];
      $('#mult_quotaB_set1').blur();
    }
    if (mulUrlJ['mult_quotaB_set2']) {
      $('#mult_quotaB_set2')[0].value = mulUrlJ['mult_quotaB_set2'];
      $('#mult_quotaB_set2').blur();
    }
    if (mulUrlJ['mult_quotaB_set3']) {
      $('#mult_quotaB_set3')[0].value = mulUrlJ['mult_quotaB_set3'];
      $('#mult_quotaB_set3').blur();
    }
    if (mulUrlJ['mult_quotaB_set4']) {
      $('#mult_quotaB_set4')[0].value = mulUrlJ['mult_quotaB_set4'];
      $('#mult_quotaB_set4').blur();
    }
    if (mulUrlJ['mult_quotaB_set5']) {
      $('#mult_quotaB_set5')[0].value = mulUrlJ['mult_quotaB_set5'];
      $('#mult_quotaB_set5').blur();
    }

    //MERCATI
    if (mulUrlJ['market_M1']) $('#market_M1')[0].value = mulUrlJ['market_M1'];
    if (mulUrlJ['market_M2']) $('#market_M2')[0].value = mulUrlJ['market_M2'];
    if (mulUrlJ['market_M3']) $('#market_M3')[0].value = mulUrlJ['market_M3'];
    if (mulUrlJ['market_M4']) $('#market_M4')[0].value = mulUrlJ['market_M4'];
    if (mulUrlJ['market_M5']) $('#market_M5')[0].value = mulUrlJ['market_M5'];

    $('#mult_lamiapuntata').keyup();
  }
}

function manageLocalBuf() {
  if (mulRef.match(/multiplicatore_deluxe/) && localStorage.getItem('exportme') != undefined) {
    fill_form(localStorage.getItem('exportme'));
    localStorage.removeItem('exportme');
  } else {
    fromOdd = mulRef.match(/oddsmatcher/) || mulRef.match(/odds_V2/);
    if (multiLocBuf != undefined && fromOdd != null) {
      // console.log("Odds & Buffer");
      loadOdds(multiLocBuf);
    } else if (multiLocBuf != undefined && fromOdd == null) {
      // console.log("solo Buffer");

      var parsedLoc = JSON.parse(multiLocBuf);
      var quant = parsedLoc['mult_quantieventi'];
      switch (quant) {
        case '2':
          $('#locMulType').html('DOPPIA');
          break;
        case '3':
          $('#locMulType').html('TRIPLA');
          break;
        case '4':
          $('#locMulType').html('QUADRUPLA');
          break;
        case '5':
          $('#locMulType').html('QUINTUPLA');
          break;
      }
      var multLocHTML = '';
      multLocHTML +=
        '<div class="locMulTitles">PARTITA</div>' +
        '<div class="locMulTitles">DATA</div>' +
        '<div class="locMulTitles">MERCATO</div>' +
        '<div class="locMulTitles">Q.PUNTA</div>' +
        '<div class="locMulTitles">Q.BANCA</div>';
      for (var i = 1; i <= quant; i++) {
        multLocHTML +=
          '<div class="locMulData">' +
          parsedLoc['matchName_M' + i] +
          '</div>' +
          '<div class="locMulData">' +
          parsedLoc['dateH_M' + i] +
          '</div>' +
          '<div class="locMulData">' +
          parsedLoc['market_M' + i] +
          '</div>' +
          '<div class="locMulData">@' +
          parsedLoc['mult_quotaP_set' + i] +
          '</div>' +
          '<div class="locMulData">@' +
          parsedLoc['mult_quotaB_set' + i] +
          '</div>';
      }
      $('#multiLocalBufferDet').html(multLocHTML);

      $('#confermaLocal')
        .modal({
          onApprove: function () {
            loadOdds(multiLocBuf);
          },
          onDeny: function () {
            localStorage.removeItem('multiBuffer');
            $('#mult_quantieventi')[0].value = 2;
            $('#mult_quantieventi').change();
          },
        })
        .modal('show');
    } else {
      // console.log("no Odds o no Buffer");
      $('#mult_quantieventi')[0].value = 2;
      $('#mult_quantieventi').change();
    }
  }
}

function loadOdds(locVar) {
  mulJ = JSON.parse(locVar);
  // console.log(mulJ);
  $('#mult_quantieventi')[0].value = mulJ['mult_quantieventi'];
  $('#mult_quantieventi').change();

  //IMPORTI & COMMISSIONI
  if (mulJ['mult_lamiapuntata']) $('#mult_lamiapuntata')[0].value = mulJ['mult_lamiapuntata'];
  if (mulJ['mult_ilmiorimborso']) $('#mult_ilmiorimborso')[0].value = mulJ['mult_ilmiorimborso'];
  if (mulJ['mult_lamiacommissione']) {
    $('#mult_lamiacommissione')[0].value = mulJ['mult_lamiacommissione'];
    $('#mult_lamiacommissione').blur();
  }

  //EVENTI
  if (mulJ['matchName_M1']) $('#matchName_M1')[0].value = mulJ['matchName_M1'];
  if (mulJ['matchName_M2']) $('#matchName_M2')[0].value = mulJ['matchName_M2'];
  if (mulJ['matchName_M3']) $('#matchName_M3')[0].value = mulJ['matchName_M3'];
  if (mulJ['matchName_M4']) $('#matchName_M4')[0].value = mulJ['matchName_M4'];
  if (mulJ['matchName_M5']) $('#matchName_M5')[0].value = mulJ['matchName_M5'];

  //DATE
  if (mulJ['dateH_M1']) {
    $('#dateH_M1')[0].value = mulJ['dateH_M1'];
    romeM1.setValue(mulJ['dateH_M1']);
  }

  if (mulJ['dateH_M2']) {
    $('#dateH_M2')[0].value = mulJ['dateH_M2'];
    romeM2.setValue(mulJ['dateH_M2']);
  }

  if (mulJ['dateH_M3']) {
    $('#dateH_M3')[0].value = mulJ['dateH_M3'];
    romeM3.setValue(mulJ['dateH_M3']);
  }

  if (mulJ['dateH_M4']) {
    $('#dateH_M4')[0].value = mulJ['dateH_M4'];
    romeM4.setValue(mulJ['dateH_M4']);
  }

  if (mulJ['dateH_M5']) {
    $('#dateH_M5')[0].value = mulJ['dateH_M5'];
    romeM5.setValue(mulJ['dateH_M5']);
  }

  //QUOTE PUNTA
  if (mulJ['mult_quotaP_set1']) {
    $('#mult_quotaP_set1')[0].value = mulJ['mult_quotaP_set1'];
    $('#mult_quotaP_set1').blur();
  }
  if (mulJ['mult_quotaP_set2']) {
    $('#mult_quotaP_set2')[0].value = mulJ['mult_quotaP_set2'];
    $('#mult_quotaP_set2').blur();
  }
  if (mulJ['mult_quotaP_set3']) {
    $('#mult_quotaP_set3')[0].value = mulJ['mult_quotaP_set3'];
    $('#mult_quotaP_set3').blur();
  }
  if (mulJ['mult_quotaP_set4']) {
    $('#mult_quotaP_set4')[0].value = mulJ['mult_quotaP_set4'];
    $('#mult_quotaP_set4').blur();
  }
  if (mulJ['mult_quotaP_set5']) {
    $('#mult_quotaP_set5')[0].value = mulJ['mult_quotaP_set5'];
    $('#mult_quotaP_set5').blur();
  }

  //QUOTE BANCA
  if (mulJ['mult_quotaB_set1']) {
    $('#mult_quotaB_set1')[0].value = mulJ['mult_quotaB_set1'];
    $('#mult_quotaB_set1').blur();
  }
  if (mulJ['mult_quotaB_set2']) {
    $('#mult_quotaB_set2')[0].value = mulJ['mult_quotaB_set2'];
    $('#mult_quotaB_set2').blur();
  }
  if (mulJ['mult_quotaB_set3']) {
    $('#mult_quotaB_set3')[0].value = mulJ['mult_quotaB_set3'];
    $('#mult_quotaB_set3').blur();
  }
  if (mulJ['mult_quotaB_set4']) {
    $('#mult_quotaB_set4')[0].value = mulJ['mult_quotaB_set4'];
    $('#mult_quotaB_set4').blur();
  }
  if (mulJ['mult_quotaB_set5']) {
    $('#mult_quotaB_set5')[0].value = mulJ['mult_quotaB_set5'];
    $('#mult_quotaB_set5').blur();
  }

  //MERCATI
  if (mulJ['market_M1']) $('#market_M1')[0].value = mulJ['market_M1'];
  if (mulJ['market_M2']) $('#market_M2')[0].value = mulJ['market_M2'];
  if (mulJ['market_M3']) $('#market_M3')[0].value = mulJ['market_M3'];
  if (mulJ['market_M4']) $('#market_M4')[0].value = mulJ['market_M4'];
  if (mulJ['market_M5']) $('#market_M5')[0].value = mulJ['market_M5'];

  $('#mult_lamiapuntata').keyup();
}

function DashForZero(myNum) {
  var giveBack;
  if (myNum == 0 || isNaN(myNum) || myNum == '') {
    giveBack = '-';
  } else {
    giveBack = myNum.toFixed(2) + '€';
  }

  return giveBack;
}

function ctrlSVP() {
  var is_open;
  if ($('#boxGridSviluppo').css('display') == 'grid') {
    is_open = 0;
  } else if ($('#boxSviluppo').css('display') == 'grid') {
    is_open = 1;
  } else {
    is_open = 'false';
  }
  return is_open;
}

function isOpen() {
  if ((ctrlSVP() != 'false' && ctrlSVP() == rimboType) || ctrlSVP() == 'false') {
    // do nothing;
  } else if (
    (ctrlSVP() != 'false' && ctrlSVP() != rimboType && rimborso != 0) ||
    (ctrlSVP() != 'false' && ctrlSVP() != rimboType && rimboType == 0)
  ) {
    $('#boxGridSviluppo').toggleClass('vis-hidden');
    $('#boxSviluppo').toggleClass('vis-hidden');
  }
}

function OnOffThisAgg(row) {
  var whichA = row.substr(-2);
  var checkedBall = $('[name*="situazione_' + whichA + '"]:checked')
    .val()
    .split('_')[0];
  var keyIcon = '<i class="key small icon" title="Riquadro dettagli bloccato"></i>';
  if (checkedBall == 'V' || checkedBall == 'P') {
    $('.grid_cell.grid_lastCol.grid_row_' + whichA.substr(-1)).addClass('sonoBloc');
    $('#rigaAgg_' + whichA.substr(-1) + ' input').prop('disabled', true);
    if ($('.grid_cell.grid_lastCol.grid_row_' + whichA.substr(-1) + ' i.key.icon').length > 0) {
      //
    } else {
      $(keyIcon).appendTo($('.grid_cell.grid_lastCol.grid_row_' + whichA.substr(-1)));
    }
  } else if (checkedBall == 'A') {
    $('.grid_cell.grid_lastCol.grid_row_' + whichA.substr(-1)).removeClass('sonoBloc');
    $('#rigaAgg_' + whichA.substr(-1) + ' input').prop('disabled', false);
    $('.grid_cell.grid_lastCol.grid_row_' + whichA.substr(-1) + ' i.key.icon').detach();
  }
}

function onElementHeightChange(elm, callback) {
  //var lastHeight = elm.offsetHeight, newHeight;
  (lastHeight = elm.scrollHeight), newHeight;
  // console.log("last: "+ lastHeight);

  (function run() {
    //newHeight = elm.offsetHeight;
    newHeight = elm.scrollHeight;
    // console.log("new: "+ newHeight);
    if (lastHeight != newHeight) callback();
    lastHeight = newHeight;

    if (elm.onElementHeightChangeTimer) clearTimeout(elm.onElementHeightChangeTimer);

    elm.onElementHeightChangeTimer = setTimeout(run, 200);
  })();
}

function onElementHeightChange2(callback) {
  //var lastHeight = elm.offsetHeight, newHeight;
  //lastHeight = $("#lastElm")[0].offsetTop;
  // console.log("last: "+ lastHeight);

  (function run() {
    //newHeight = elm.offsetHeight;
    newHeight = $('#lastElm')[0].offsetTop + $('#lastElm')[0].offsetHeight; //newHeight = elm.scrollHeight;
    // console.log("new: "+ newHeight);
    if (lastHeight != newHeight) callback();
    lastHeight = newHeight;

    if (onElementHeightChangeTimer) clearTimeout(onElementHeightChangeTimer);

    onElementHeightChangeTimer = setTimeout(run, 200);
  })();
}

// funzione per calcolare la fine della multipla (indipendentemente dal tipo di rimborso)
function stopAccum() {
  let resp;

  if (
    (rimboType == 0 && n_perse >= 1) ||
    (rimboType == 1 && rimborso <= 0 && n_perse >= 1) ||
    (rimboType == 1 && rimborso > 0 && n_perse > 1)
  )
    resp = true;
  else resp = false;

  if (resp) {
    //
  } else {
    //
  }

  return resp;
}

//funzione per formattare un oggetto Data per i campi data della maschera
function _formatDate(d) {
  if (d == undefined || d == '' || d == null) return '';
  let dy, mo, yr, hr, mn;

  if (typeof d == 'object') {
    dy = d.getDate();
    mo = d.getMonth() + 1;
    yr = d.getFullYear();

    hr = d.getHours();
    mn = d.getMinutes();

    if (dy < 10) dy = '0' + dy;
    if (mo < 10) mo = '0' + mo;

    if (hr < 10) hr = '0' + hr;
    if (mn < 10) mn = '0' + mn;
  } else if (typeof d == 'string') {
    dy = d.split(' ')[0].split('-')[2];
    mo = d.split(' ')[0].split('-')[1];
    yr = d.split(' ')[0].split('-')[0];

    hr = d.split(' ')[1].split(':')[0];
    mn = d.split(' ')[1].split(':')[1];
  }

  let first = [dy, mo, yr].join('/');
  let second = [hr, mn].join(':');

  return [first, second].join(' | ');
}

// funzione per convertire un campo data della maschera in una stringa valida per sql
function _parseDate(d) {
  if (d == '' || d == undefined) return '';
  arr = d.split(' | ');

  let first = arr[0].split('/').reverse().join('-');
  let second;

  arr[1] == undefined ? (second = '00:00') : (second = arr[1] + ':00');

  return [first, second].join(' ');
}

// funzione per convertire una data oggetto javascript new Date() in una stringa per sql
function _parseJDO(d) {
  return _parseDate(_formatDate(d));
}

// funzione che incolla i dati del dutcher da localstorage
function pasteDutcherData(matchNumber) {
  if (!localStorage.getItem('dutcherData')) return;
  if (blockedSetUp.value === true) return;
  const data = JSON.parse(localStorage.getItem('dutcherData'));
  // console.log(data);
  const hedgeOdd = data.provaCP_Q_M;
  const commission =
    +document.getElementById('mult_lamiacommissione').value.replace(/[^\d\.]/, '') / 100;
  const equivalentLayOdd = (commission + (hedgeOdd * (1 - commission)) / (hedgeOdd - 1)).toFixed(2);

  $('#dutcher-paste__confirm')
    .modal({
      onShow: function () {
        const listElement = this.querySelector('ul');
        const listItems = listElement.querySelectorAll('li');
        // console.log(listItems);
        listItems[0].querySelector('span').innerText = data.matchName_M;
        listItems[1].querySelector('span').innerText = data.dateH_M;
        listItems[2].querySelector('span').innerText = data.market_M;
        listItems[3].querySelector('span').innerText = data.mult_quotaP_set;
        listItems[4].querySelector('span').innerText = equivalentLayOdd;
        listItems[5].querySelector('span').innerText = hedgeOdd;
      },
      onApprove: () => {
        const keyUpEvent = new Event('keyup');
        document.getElementById(`mult_quotaB_set${matchNumber}`).value = equivalentLayOdd;
        for (let key in data) {
          const element = document.getElementById(`${key}${matchNumber}`);
          element.value = data[key];

          if (key === 'dateH_M') {
            window[`romeM${matchNumber}`].setValue(data[key]);
          }

          element.dispatchEvent(keyUpEvent);
        }

        // localStorage.removeItem('dutcherData');
      },
    })
    .modal('show');
}

// funzione
function _toNewAol() {
  let mess = { fromRobinTools: true, type: 'accum', figures: {} };

  let bigObj = {};
  let states = { A: '0', V: '1', P: '2' };
  let type = $('#mult_ilmiorimborso').val() == '' ? '0' : '2';
  let outc = WOW == true ? '1' : DEFEAT == true ? '2' : '0';

  bigObj.nEvt = +$('#mult_quantieventi').val();
  bigObj.data = [];

  for (let count = 1; count <= +$('#mult_quantieventi').val(); ++count) {
    let dataObj = {
      puntate: {},
      multiple: {},
      bancate: [],
      coperture: [],
    };

    let mainState = states[$(`.box_M${count} :checked`).val().substr(0, 1)];
    let reimbAmt = '',
      reimbState = '3';

    if (type == '2' && outc == '2') {
      reimbAmt = $('#mult_ilmiorimborso').val();
      reimbState = '0';
    }

    // puntata
    dataObj.puntate = {
      // "id": "",
      // "id_user": "",
      // "id_book": "",
      data_aggiunta: _parseJDO(new Date()),
      descrizione_promo: '',
      squadre: `${+$('#mult_quantieventi').val()} eventi`,
      tipologia: '8',
      tipo_puntata: type,
      mercato_puntata: '',
      saldo: $('#mult_lamiapuntata').val() - $('#mult_ilmiobonus').val(),
      bonus: $('#mult_ilmiobonus').val(),
      quota: '', //+$("#qTot_div").html().replace(/@/,""),
      quota_attuale: '0',
      mercato: '99',
      esito: outc,
      data_partita: null,
      bonus_atteso: reimbAmt, //$("#mult_ilmiorimborso").val(),
      bonus_erogato: reimbState,
      rettifica: '0.00',
      note: '',
    };

    // singola partita della multipla
    dataObj.multiple = {
      // id: "",
      // id_user: "",
      // id_puntata: "",
      squadre: $(`#matchName_M${count}`).val(),
      sport: '',
      data_partita: _parseJDO(window[`romeM${count}`].getDate()),
      quota: $(`#mult_quotaP_set${count}`).val().replace(/@/, ''),
      mercato: '',
      esito_scelto: $(`#market_M${count}`).val(),
      stato: mainState,
      // n_puntate: "",
      // n_bancate: "",
      // saldo_coperture: "",
    };

    // bancate
    let layState, counterState;
    if (mainState == '0') {
      layState = '0';
      counterState = '0';
    }

    if (mainState == '1') {
      layState = '2';
      counterState = '2';
    }

    if (mainState == '2') {
      layState = '1';
      counterState = '1';
    }

    $(`[id^=quotaB_New][id$=_M${count}]`).filter(function () {
      let obj = {};
      let idx = this.id.split('_')[1].replace(/New/, '');

      if (
        (this.value && $(`[id^=abb_New${idx}_M${count}]`).val() != '') ||
        (this.innerHTML != '' && $(`[id^=abb_New${idx}_M${count}]`).val() != '')
      ) {
        obj.isnew = true;
        obj.commissione =
          $(`#comm_New${idx}_M${count}`).val().replace(/%/, '') ||
          $(`#comm_New${idx}_M${count}`).html().replace(/%/, '') ||
          $('#mult_lamiacommissione').val().replace(/%/, '');
        obj.esito = layState;
        // obj.id = null;
        // obj.id_book = null;
        // obj.id_multipla = null;
        // obj.id_puntata = null;
        // obj.mercato = "";
        // obj.mercato_puntata = "";
        obj.quota = (this.value || this.innerHTML).replace(/@/, '');
        obj.quota_attuale = '';
        obj.saldo = $(`[id^=abb_New${idx}_M${count}]`).val().replace(/€/, '');
        obj.idx = idx;

        dataObj.bancate.push(obj);
      }
    });

    // coperture
    let backType = $(`#mySWcheck_M${count}`).is(':checked') ? 'dutch' : 'counter';
    if (backType == 'counter') {
      if ($(`#provaCP_Q_M${count}`).val() != '' || $(`#provaCP_M${count}`).val() != '') {
        let obj = {};
        // obj.id = "",
        // obj.id_puntata = "";
        // obj.id_multipla = "";
        // obj.id_book = "";
        obj.saldo = $(`#provaCP_M${count}`).val();
        obj.bonus = '';
        obj.esito = counterState;
        obj.mercato = '';
        obj.mercato_puntata = '';
        obj.quota = $(`#provaCP_Q_M${count}`).val();
        obj.quota_attuale = '';

        dataObj.coperture.push(obj);
      }
    } else if (backType == 'dutch') {
      let dutchOutc = $(`.DchRadioBox_M${count} :checked`).val();

      if ($(`#provaDCH1_Q_M${count}`).val() != '' || $(`#provaDCH1_M${count}`).val() != '') {
        let obj = {};
        let dutchState = '0';

        if (dutchOutc == 'Win_A') dutchState = '1';
        if (dutchOutc != 'Win_A' && mainState != '0') dutchState = '2';
        // obj.id = "",
        // obj.id_puntata = "";
        // obj.id_multipla = "";
        // obj.id_book = "";
        obj.saldo = $(`#provaDCH1_M${count}`).val();
        obj.bonus = '';
        obj.esito = dutchState;
        obj.mercato = '';
        obj.mercato_puntata = '';
        obj.quota = $(`#provaDCH1_Q_M${count}`).val();
        obj.quota_attuale = '';

        dataObj.coperture.push(obj);
      }

      if ($(`#provaDCH2_Q_M${count}`).val() != '' || $(`#provaDCH2_M${count}`).val() != '') {
        let obj = {};
        let dutchState = '0';

        if (dutchOutc == 'Win_B') dutchState = '1';
        if (dutchOutc != 'Win_B' && mainState != '0') dutchState = '2';
        // obj.id = "",
        // obj.id_puntata = "";
        // obj.id_multipla = "";
        // obj.id_book = "";
        obj.saldo = $(`#provaDCH2_M${count}`).val();
        obj.bonus = '';
        obj.esito = dutchState;
        obj.mercato = '';
        obj.mercato_puntata = '';
        obj.quota = $(`#provaDCH2_Q_M${count}`).val();
        obj.quota_attuale = '';

        dataObj.coperture.push(obj);
      }
    }

    bigObj.data.push(dataObj);
  }

  mess.figures = bigObj;

  var destUrl = window.open('https://robinodds.it/agenda/giocate.html');

  destUrl.onload = function () {
    // console.log(destUrl, mess);
    destUrl.postMessage(JSON.stringify(mess), 'https://robinodds.it');
  };
}
