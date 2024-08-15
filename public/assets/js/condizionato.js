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
        document.getElementById("id-copertura-1").innerHTML = `Book &nbsp;<strong>A</strong>`;
        puntataCommissione.classList.add("display-none");
        labelPuntata1.innerHTML = "Copertura";
        labelPuntata1.style.backgroundColor = "#5865f16e";
        labelPuntata2.style.backgroundColor = "#5865f16e";
    }else if (coperturaPuntata == "BANCA"){
        document.getElementById("id-copertura-1").innerHTML = `Banca`;
        puntataCommissione.classList.remove("display-none");
        labelPuntata1.innerHTML = `Quota&nbsp;Banca`;
        labelPuntata1.style.backgroundColor = "rgba(255, 126, 126, 0.366)";
        labelPuntata2.style.backgroundColor = "rgba(255, 126, 126, 0.366)";
    }
    tipoPuntata = coperturaPuntata;

    if(coperturaCondizione == "PUNTA"){
        document.getElementById("id-copertura-2").innerHTML = `Book &nbsp;<strong>B</strong>`;
        condizioneCommissione.classList.add("display-none");
        coperturaCondizioneBack.style.backgroundColor = "#5865f16e";
        coperturaCondizioneTitle.style.backgroundColor = "#5865f1";
        coperturaCondizioneLabel.innerHTML = `Quota&nbsp;Punta`;
    }else if (coperturaCondizione == "BANCA"){
        document.getElementById("id-copertura-2").innerHTML = `Banca`;
        condizioneCommissione.classList.remove("display-none");
        coperturaCondizioneBack.style.backgroundColor = "rgba(255, 126, 126, 0.366)";
        coperturaCondizioneTitle.style.backgroundColor = "rgba(255, 126, 126";
        coperturaCondizioneLabel.innerHTML = `Quota&nbsp;Banca`;
    }

    tipoCondizione = coperturaCondizione;

    let calcResp = document.getElementById("calc-responsabilita");
    if(coperturaPuntata == "PUNTA" && coperturaCondizione == "PUNTA"){
        calcResp.classList.add("display-none");
    } else{
        calcResp.classList.remove("display-none");
    }
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

function valoreResp (valoreBancata, quotaBancata) {
    return valoreBancata*(quotaBancata-1);
}

function formatToTwoDecimals(num) {
    let parts = num.toString().split(".");
    if (parts.length === 1) {
        // No decimal part, add ".00"
        return num.toString() + ".00";
    } else if (parts[1].length === 1) {
        // Only one decimal place, add a trailing "0"
        return num.toString() + "0";
    } else {
        // Two or more decimal places, truncate to two without rounding
        return parts[0] + "." + parts[1].substring(0, 2);
    }
}

function formatToTwoDecimalsTotal(num) {
    let sign = num >= 0 ? "+" : "";
    // Convert the number to a string and split it by the decimal point
    let parts = num.toString().split(".");
    
    if (parts.length === 1) {
        // No decimal part, add ".00"
        return sign + num.toString() + ".00" + " €";
    } else if (parts[1].length === 1) {
        // Only one decimal place, add a trailing "0"
        return sign + num.toString() + "0"  + " €";
    } else {
        // Two or more decimal places, truncate to two without rounding
        return sign + parts[0] + "." + parts[1].substring(0, 2)  + " €";
    }
}

function updateElement(id, value) {
    let element = document.getElementById(id);
    let formatted = value;
    formatted = parseFloat(formatted);

    // Set the color based on the value
    // Remove previous color classes
    element.classList.remove('positive', 'negative');
    
    // Set the color based on the value
    if (formatted >= 0) {
        element.classList.add('positive');
    } else {
        element.classList.add('negative');
    }
}

function calcCondizionato(){    
    if(tipoPuntata == "BANCA"){
        var myApprox = function(number, precision) {
            var factor = Math.pow(10, precision);
            var tempNumber = number * factor;
            var roundedTempNumber = Math.round(tempNumber);
            return roundedTempNumber / factor;
            };
    
        let puntataBookA = parseFloat(document.getElementById("puntataBookA").value);
        let rimborso = parseFloat(document.getElementById("importo-rimborso").value);
        let commissioneBookA = parseFloat(document.getElementById("commissioneBookA").value);
        let commissioneBookB = parseFloat(document.getElementById("commissioneBookB").value);
        commissioneBookA = commissioneBookA / 100;
        commissioneBookB = commissioneBookB / 100;
        let quotaPuntaBookA = parseFloat(document.getElementById("quotaBookA").value);
        let quotaCoperturaBookA = parseFloat(document.getElementById("coperturaBookA").value);
        let quotaCoperturaCondizione = parseFloat(document.getElementById("coperturaCondizioneQuota").value);
        
        let frac = quotaCoperturaBookA - commissioneBookA;
        let bancata = myApprox((puntataBookA*quotaPuntaBookA)/frac,2);
    
        let guad_A_book = puntataBookA*quotaPuntaBookA - puntataBookA;
        let guad_A_banc = bancata *(1-commissioneBookA);
        let guad_B_book = -puntataBookA + rimborso;
        let guad_C_book = -puntataBookA;

        if(tipoCondizione == "BANCA"){
            var Imp_Cop = rimborso/(quotaCoperturaCondizione - commissioneBookB);
            var RSP_cop = myApprox(valoreResp(Imp_Cop,quotaCoperturaCondizione),2);
            var guad_A_CND = Imp_Cop*(1-commissioneBookB);
            var guad_B_CND = -RSP_cop;
            var guad_C_CND = Imp_Cop*(1-commissioneBookB);
            
        } else if(tipoCondizione == "PUNTA"){
            var Imp_Cop = Math.round(rimborso/quotaCoperturaCondizione);
            var RSP_cop = myApprox(valoreResp(Imp_Cop,quotaCoperturaCondizione),2);
            bancata = myApprox(((puntataBookA*quotaPuntaBookA)+(Imp_Cop*quotaCoperturaCondizione)-rimborso)/frac,2);										
            var guad_A_CND = Imp_Cop*(quotaCoperturaCondizione-1);
            var guad_B_CND = -Imp_Cop;
            var guad_C_CND = Imp_Cop*(quotaCoperturaCondizione-1);            	    		
        }

        var RSP = myApprox(valoreResp(bancata,quotaCoperturaBookA),2);
        guad_A_banc= RSP*(-1);
        var guad_B_banc=bancata*(1-commissioneBookA);
        var guad_C_banc=bancata*(1-commissioneBookA); 

        //log all the function variables here
        console.log("puntataBookA:", puntataBookA);
        console.log("rimborso:", rimborso);
        console.log("commissioneBookA:", commissioneBookA);
        console.log("commissioneBookB:", commissioneBookB);
        console.log("quotaPuntaBookA:", quotaPuntaBookA);
        console.log("quotaCoperturaBookA:", quotaCoperturaBookA);
        console.log("quotaCoperturaCondizione:", quotaCoperturaCondizione);
        console.log("frac:", frac);
        console.log("bancata:", bancata);
        console.log("guad_A_book:", guad_A_book);
        console.log("guad_A_banc:", guad_A_banc);
        console.log("guad_B_book:", guad_B_book);
        console.log("guad_C_book:", guad_C_book);
        console.log("Imp_Cop:", Imp_Cop);
        console.log("RSP_cop:", RSP_cop);
        console.log("guad_A_CND:", guad_A_CND);
        console.log("guad_B_CND:", guad_B_CND);
        console.log("guad_C_CND:", guad_C_CND);
        console.log("RSP:", RSP);
        console.log("guad_B_banc:", guad_B_banc);
        console.log("guad_C_banc:", guad_C_banc);

        var TOT1 = guad_A_book + guad_A_banc + guad_A_CND;
        var TOT2 = guad_B_book + guad_B_banc + guad_B_CND;
        var TOT3 = guad_C_book + guad_C_banc + guad_C_CND;

        var guadagnoMinimo = Math.min(TOT1, TOT2, TOT3);

        //inserimento dati copertura
        document.getElementById("copertura-evento").value = formatToTwoDecimals(bancata);
        document.getElementById("quoteBookB").value = quotaPuntaBookA;

        document.getElementById("book-c").value = formatToTwoDecimals(Imp_Cop);
        document.getElementById("quoteBookC").value = quotaCoperturaCondizione;

        if(tipoCondizione == "BANCA" && tipoPuntata == "BANCA"){
            document.getElementById("responsabilita").innerHTML = formatToTwoDecimals(RSP + RSP_cop);
        } else if(tipoPuntata == "BANCA" && tipoCondizione == "PUNTA"){
            document.getElementById("responsabilita").innerHTML = formatToTwoDecimals(RSP);
        } else if(tipoPuntata == "PUNTA" && tipoCondizione == "BANCA"){
            document.getElementById("responsabilita").innerHTML = formatToTwoDecimals(RSP_cop);
        } else{
            document.getElementById("responsabilita").innerHTML = "0";
        }

        //inserimento boxes
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
        if(guadagnoMinimo < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoMinimo > 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }

        //inserimento tabella
        document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(guad_A_book);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(guad_B_book);
        document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(guad_C_book);

        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(guad_A_banc);
        document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(guad_B_banc);
        document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(guad_C_banc);

        document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(guad_A_CND);
        document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(guad_B_CND);
        document.getElementById("row-c-3").innerHTML = formatToTwoDecimals(guad_C_CND);

        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(TOT1);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(TOT2);
        document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(TOT3);
        updateElement("totale-1",TOT1);
        updateElement("totale-2",TOT2);
        updateElement("totale-3",TOT3);
    } else if(tipoPuntata == "PUNTA"){
        var myApprox = function(number, precision) {
            var factor = Math.pow(10, precision);
            var tempNumber = number * factor;
            var roundedTempNumber = Math.round(tempNumber);
            return roundedTempNumber / factor;
            };
    
        let puntataBookA = parseFloat(document.getElementById("puntataBookA").value);
        let rimborso = parseFloat(document.getElementById("importo-rimborso").value);
        let commissioneBookA = parseFloat(document.getElementById("commissioneBookA").value);
        let commissioneBookB = parseFloat(document.getElementById("commissioneBookB").value);
        commissioneBookA = commissioneBookA / 100;
        commissioneBookB = commissioneBookB / 100;
        let quotaPuntaBookA = parseFloat(document.getElementById("quotaBookA").value);
        let quotaCoperturaBookA = parseFloat(document.getElementById("coperturaBookA").value);
        let quotaCoperturaCondizione = parseFloat(document.getElementById("coperturaCondizioneQuota").value);
        
        let bancata = (puntataBookA*quotaPuntaBookA/quotaCoperturaBookA);
    
        let guad_A_book = puntataBookA*quotaPuntaBookA - puntataBookA;
        let guad_A_banc = bancata;
        let guad_B_book = rimborso - puntataBookA;
        let guad_C_book = -puntataBookA;
        
        if(tipoCondizione == "BANCA"){
            var Imp_Cop = rimborso/(quotaCoperturaCondizione - commissioneBookB);
            var RSP_cop = myApprox(valoreResp(Imp_Cop,quotaCoperturaCondizione),2);
            var guad_A_CND = Imp_Cop*(1-commissioneBookB);
            var guad_B_CND = -RSP_cop;
            var guad_C_CND = Imp_Cop*(1-commissioneBookB);
            
        } else if(tipoCondizione == "PUNTA"){
            var Imp_Cop = Math.round(rimborso/quotaCoperturaCondizione);
            var RSP_cop = myApprox(valoreResp(Imp_Cop,quotaCoperturaCondizione),2);
            var guad_A_CND = Imp_Cop*(quotaCoperturaCondizione-1);
            var guad_B_CND = -Imp_Cop;
            var guad_C_CND = Imp_Cop*(quotaCoperturaCondizione-1);            	    		
        }

        var RSP = bancata;
        guad_A_banc= -RSP;
        var guad_B_banc= bancata * quotaCoperturaBookA - bancata;
        var guad_C_banc= bancata * quotaCoperturaBookA - bancata; 

        //log all the function variables here
        console.log("puntataBookA:", puntataBookA);
        console.log("rimborso:", rimborso);
        console.log("commissioneBookA:", commissioneBookA);
        console.log("commissioneBookB:", commissioneBookB);
        console.log("quotaPuntaBookA:", quotaPuntaBookA);
        console.log("quotaCoperturaBookA:", quotaCoperturaBookA);
        console.log("quotaCoperturaCondizione:", quotaCoperturaCondizione);
        console.log("bancata:", bancata);
        console.log("guad_A_book:", guad_A_book);
        console.log("guad_A_banc:", guad_A_banc);
        console.log("guad_B_book:", guad_B_book);
        console.log("guad_C_book:", guad_C_book);
        console.log("Imp_Cop:", Imp_Cop);
        console.log("RSP_cop:", RSP_cop);
        console.log("guad_A_CND:", guad_A_CND);
        console.log("guad_B_CND:", guad_B_CND);
        console.log("guad_C_CND:", guad_C_CND);
        console.log("RSP:", RSP);
        console.log("guad_B_banc:", guad_B_banc);
        console.log("guad_C_banc:", guad_C_banc);

        var TOT1 = guad_A_book + guad_A_banc + guad_A_CND;
        var TOT2 = guad_B_book + guad_B_banc + guad_B_CND;
        var TOT3 = guad_C_book + guad_C_banc + guad_C_CND;

        var guadagnoMinimo = Math.min(TOT1, TOT2, TOT3);

        //inserimento dati copertura
        document.getElementById("copertura-evento").value = formatToTwoDecimals(bancata);
        document.getElementById("quoteBookB").value = quotaCoperturaBookA;

        document.getElementById("book-c").value = formatToTwoDecimals(Imp_Cop);
        document.getElementById("quoteBookC").value = quotaCoperturaCondizione;

        if(tipoCondizione == "BANCA" && tipoPuntata == "BANCA"){
            document.getElementById("responsabilita").innerHTML = formatToTwoDecimals(RSP + RSP_cop);
        } else if(tipoPuntata == "BANCA" && tipoCondizione == "PUNTA"){
            document.getElementById("responsabilita").innerHTML = formatToTwoDecimals(RSP);
        } else if(tipoPuntata == "PUNTA" && tipoCondizione == "BANCA"){
            document.getElementById("responsabilita").innerHTML = formatToTwoDecimals(RSP_cop);
        } else{
            document.getElementById("responsabilita").innerHTML = "0";
        }

        //inserimento boxes
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
        if(guadagnoMinimo < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoMinimo > 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }

        //inserimento tabella
        document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(guad_A_book);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(guad_B_book);
        document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(guad_C_book);

        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(guad_A_banc);
        document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(guad_B_banc);
        document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(guad_C_banc);

        document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(guad_A_CND);
        document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(guad_B_CND);
        document.getElementById("row-c-3").innerHTML = formatToTwoDecimals(guad_C_CND);

        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(TOT1);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(TOT2);
        document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(TOT3);
        updateElement("totale-1",TOT1);
        updateElement("totale-2",TOT2);
        updateElement("totale-3",TOT3);
    }

}

function getResults(){
    checkCoperture();
    checkIndicazioni();
    let indicazioniAlert = document.getElementById("indicazioni-alert");
    if(condizoneBool && puntataBool){
        indicazioniAlert.classList.add("display-none");
        calcCondizionato();
    }else{
        indicazioniAlert.classList.remove("display-none");
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
    // VARIABILI GUADAGNI
    var vincita = P*QP-P;
    var guad_A_book=vincita;
    var guad_A_banc= Bancata *(1-C1);
    var guad_B_book= -P+Rmb;
    var guad_C_book=-P;



	    if (tipoBet == 'Normal') {
				// Valori variabili in caso di bancata
					var Imp_Cop = Rmb/(Q_Cop - C2);
					var RSP_cop = myApprox(valoreResp(Imp_Cop,Q_Cop),2);
					var guad_A_CND = Imp_Cop*(1-C2);
					var guad_B_CND = -RSP_cop;
					var guad_C_CND = Imp_Cop*(1-C2);



    		} else {
					// Valori variabili in caso di contropuntata
					var Imp_Cop = Math.round(Rmb/Q_Cop);
					var RSP_cop = myApprox(valoreResp(Imp_Cop,Q_Cop),2);
					var Bancata = myApprox(((P*QP)+(Imp_Cop*Q_Cop)-Rmb)/Frac,2);										
    				var guad_A_CND = Imp_Cop*(Q_Cop-1);
    				var guad_B_CND = -Imp_Cop;
					var guad_C_CND = Imp_Cop*(Q_Cop-1);	    				

    	}

        var RSP = myApprox(valoreResp(Bancata,QB),2);
        var guad_A_banc=-RSP;
        var guad_B_banc=Bancata*(1-C1);
        var guad_C_banc=Bancata*(1-C1); 


	var TOT1 = guad_A_book + guad_A_banc + guad_A_CND;
	var TOT2 = guad_B_book + guad_B_banc + guad_B_CND;
	var TOT3 = guad_C_book + guad_C_banc + guad_C_CND;

	var guadagno_min = Math.min(TOT1, TOT2, TOT3);
	


                
}