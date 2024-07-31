let trueIndicazioni = false;
let tipoPuntata = "";
let tipoCondizione = "";
let condizoneBool = false;
let puntataBool = false;

function checkCoperture(){
    let coperturaPuntata = document.getElementById("coperturaPuntata").value;
    let coperturaCondizione = document.getElementById("coperturaCondizione").value;
    let labelPuntata1 = document.getElementById("quotaCoperturaPuntata");
    let labelPuntata2 = document.getElementById("quotaCoperturaPuntata2");
    let puntataCommissione = document.getElementById("puntataCommissione");
    let condizioneCommissione = document.getElementById("coperturaCommissione");
    let coperturaCondizioneBack = document.getElementById("coperturaCondizioneBack");
    let coperturaCondizioneTitle = document.getElementById("coperturaCondizioneTitle");
    let coperturaCondizioneLabel = document.getElementById("condizione-label");


    if(coperturaPuntata == "PUNTA"){
        puntataCommissione.classList.add("display-none");
        labelPuntata1.innerHTML = "Copertura";
        labelPuntata1.style.backgroundColor = "#5865f16e";
        labelPuntata2.style.backgroundColor = "#5865f16e";
    }else if (coperturaPuntata == "BANCA"){
        puntataCommissione.classList.remove("display-none");
        labelPuntata1.innerHTML = `Quota&nbsp;Banca`;
        labelPuntata1.style.backgroundColor = "rgba(255, 126, 126, 0.366)";
        labelPuntata2.style.backgroundColor = "rgba(255, 126, 126, 0.366)";
    }
    tipoPuntata = coperturaPuntata;

    if(coperturaCondizione == "PUNTA"){
        condizioneCommissione.classList.add("display-none");
        coperturaCondizioneBack.style.backgroundColor = "#5865f16e";
        coperturaCondizioneTitle.style.backgroundColor = "#5865f1";
        coperturaCondizioneLabel.innerHTML = `Quota&nbsp;Punta`;
    }else if (coperturaCondizione == "BANCA"){
        condizioneCommissione.classList.remove("display-none");
        coperturaCondizioneBack.style.backgroundColor = "rgba(255, 126, 126, 0.366)";
        coperturaCondizioneTitle.style.backgroundColor = "rgba(255, 126, 126";
        coperturaCondizioneLabel.innerHTML = `Quota&nbsp;Banca`;
    }

    tipoCondizione = coperturaCondizione;
}

function checkIndicazioni(){
    let importoPuntata = parseFloat(document.getElementById("puntataBookA").value);
    let importoRimborso = parseFloat(document.getElementById("importo-rimborso").value);
    let quotaBookA = parseFloat(document.getElementById("quotaBookA").value);
    let coperturaBookA = parseFloat(document.getElementById("coperturaBookA").value);
    let commissioneBookA = parseFloat(document.getElementById("commissioneBookA").value);
    let commissioneBookB = parseFloat(document.getElementById("commissioneBookB").value);
    let coperturaCondizioneQuota = parseFloat(document.getElementById("coperturaCondizioneQuota").value);

    if(tipoPuntata == "PUNTA"){
        if(isNaN(importoPuntata) || isNaN(importoRimborso) || isNaN(quotaBookA) || isNaN(importoPuntata) || isNaN(coperturaBookA) ){
            console.log("condizioni non ok");
        } else{
            puntataBool = true;
            console.log(puntataBool);
        }
    } else if(tipoPuntata == "BANCA"){
        if(isNaN(importoPuntata) || isNaN(importoRimborso) || isNaN(quotaBookA) || isNaN(importoPuntata) || isNaN(coperturaBookA) || isNaN(commissioneBookA)){
            console.log("condizioni non ok");
        } else{
            puntataBool = true;
            console.log(puntataBool);
        }
    }

    if(tipoPuntata == "PUNTA"){
        if(isNaN(coperturaCondizioneQuota) ){
            console.log("condizioni non ok");
        } else{
            condizoneBool = true;
            console.log(condizoneBool);
        }
    } else if(tipoPuntata == "BANCA"){
        if(isNaN(coperturaCondizioneQuota) || isNaN(commissioneBookB)){
            console.log("condizioni non ok");
        } else{
            condizoneBool = true;
            console.log(condizoneBool);
        }
    }
}

function displayIndicazioni(){
    let dutcherindicazionicontainer = document.getElementById("dutcher-indicazioni-container");
    let dutcherriepilogocontainer = document.getElementById("dutcher-riepilogo-container");
    if(condizoneBool && puntataBool){
        dutcherindicazionicontainer.classList.remove("display-none");
        dutcherriepilogocontainer.classList.remove("display-none");
    } else{
        dutcherindicazionicontainer.classList.add("display-none");
        dutcherriepilogocontainer.classList.add("display-none");
    }
}

function calcCondizionato(){

}

function getResults(){
    checkCoperture();
    checkIndicazioni();
    if(condizoneBool && puntataBool){
        calcCondizionato();
    }
    displayIndicazioni();
}

function calculate() {

	var myApprox = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
	};


	var P = parseFloat(Punta_text);
	var Rmb = parseFloat(Rimb_text);
	var C1 = parseFloat(Comm_ev_text)/100;
	var C2 = parseFloat(Comm_cond_text)/100;
	var QP = parseFloat(Q_Punta_text);
	var QB = parseFloat(Q_BancaEv_text);
	var Q_Cop=parseFloat(Q_Copert_text);
	var Frac = QB-C1;
	var Bancata = myApprox((P*QP)/Frac,2);
	var B_diff_decimal = (Bancata + 0.5) - Math.floor(Bancata + 0.5);
    // VARIABILI GUADAGNI
    var vincita = P*QP-P;
    var guad_A_book=vincita;
    var guad_A_banc= Bancata *(1-C1);
    var guad_B_book= -P+Rmb;
    var guad_C_book=-P;



	    if (tipoBet == 'Normal') {
				// Valori variabili in caso di bancata
					var Imp_Cop = Rmb/(Q_Cop - C2);
					var B_CND_diff_decimal =(Imp_Cop + 0.5) - Math.floor(Imp_Cop + 0.5);
					var RSP_cop = myApprox(valoreResp(Imp_Cop,Q_Cop),2);
					var guad_A_CND = Imp_Cop*(1-C2);
					var guad_B_CND = -RSP_cop;
					var guad_C_CND = Imp_Cop*(1-C2);

				if (tipoExc_CND==2) {

					if (B_CND_diff_decimal >= .25 && B_CND_diff_decimal <= .75) {

    					Imp_Cop = Math.floor(Imp_Cop + 0.5);
    					RSP_cop = myApprox(valoreResp(Imp_Cop,Q_Cop),2);
    					var guad_A_CND = Imp_Cop*(1-C2);
    					var guad_B_CND = -RSP_cop;
						var guad_C_CND = Imp_Cop*(1-C2);

    				} else {
    					Imp_Cop = Math.floor(Imp_Cop)+0.5;
    					RSP_cop = myApprox(valoreResp(Imp_Cop,Q_Cop),2);
    					var guad_A_CND = Imp_Cop*(1-C2);
    					var guad_B_CND = -RSP_cop;
						var guad_C_CND = Imp_Cop*(1-C2);    					

    			}}	


    		} else {
					// Valori variabili in caso di contropuntata
					var Imp_Cop = Math.round(Rmb/Q_Cop);
					var RSP_cop = myApprox(valoreResp(Imp_Cop,Q_Cop),2);
					var Bancata = myApprox(((P*QP)+(Imp_Cop*Q_Cop)-Rmb)/Frac,2);										
    				var guad_A_CND = Imp_Cop*(Q_Cop-1);
    				var guad_B_CND = -Imp_Cop;
					var guad_C_CND = Imp_Cop*(Q_Cop-1);	    				

    	}


    	if (tipoExc_EV==2) {

    		if (B_diff_decimal >= .25 && B_diff_decimal <= .75) {
    			
    			Bancata = Math.floor(Bancata+0.5);
    			var RSP = myApprox(valoreResp(Bancata,QB),2);
    			var guad_A_banc=-RSP;
    			var guad_B_banc=Bancata*(1-C1);
    			var guad_C_banc=Bancata*(1-C1);

    		} else {

    			Bancata = Math.floor(Bancata)+0.5;
    			var RSP = myApprox(valoreResp(Bancata,QB),2);
    			var guad_A_banc=-RSP;
    			var guad_B_banc=Bancata*(1-C1);
    			var guad_C_banc=Bancata*(1-C1);    			

    		}
        } else {
    			var RSP = myApprox(valoreResp(Bancata,QB),2);
    			var guad_A_banc=-RSP;
    			var guad_B_banc=Bancata*(1-C1);
    			var guad_C_banc=Bancata*(1-C1);    			
	
	}


	var TOT1 = guad_A_book + guad_A_banc + guad_A_CND;
	var TOT2 = guad_B_book + guad_B_banc + guad_B_CND;
	var TOT3 = guad_C_book + guad_C_banc + guad_C_CND;

	var guadagno_min = Math.min(TOT1, TOT2, TOT3);
	


                
}