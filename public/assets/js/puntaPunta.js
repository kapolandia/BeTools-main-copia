let importoPuntata = null;
let importoRimborso = null;
let quotaPuntata = null;
let quotaBancata = null;
let commissione = null;
let maggiorazione = null;
let selectRimborso = document.getElementById("tipologia").value;
let sbilanciamentoValue = null;
let isAvanzato;
let isRimborso = false;

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

function updateTableStriping() {
    const table = document.getElementById('results-table');
    const rows = table.querySelectorAll('tr');
    let visibleRowIndex = 0;

    rows.forEach(row => {
        if (!row.classList.contains('display-none')) {
            row.style.backgroundColor = (visibleRowIndex % 2 === 0) ? '#ffffff' : '#f2f2f2';
            visibleRowIndex++;
        }
    });
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

function getResults(){
    let isCR = checkRimborso();
    checkStrumentoAvanzato();
    checkIndicazioni();
    importoRimborso = document.getElementById('importoRimborso').value;

    if(isRimborso && importoRimborso != 0){
        crPuntaPunta();
    } else{
        normalPuntaPunta();
    }
    updateTableStriping();
}

function checkStrumentoAvanzato(){
    let base = document.getElementById("three-1");
    let avanzato = document.getElementById("three-2");
    let maggCont = document.getElementById("maggiorazione-container");
    let sbilanciamento = document.getElementById("sbilanciamento-bancata-container");

    if(base.checked){
        maggCont.classList.add("display-none");
        sbilanciamento.classList.add("display-none");
        isAvanzato = false;
    } else if(avanzato.checked){
        maggCont.classList.remove("display-none");
        sbilanciamento.classList.remove("display-none");
        isAvanzato = true;
    }
}

function checkRimborso() {
    selectRimborso = document.getElementById("tipologia").value;
    let formRimborso = document.getElementById("rimborso-importo");
    let formRollover = document.getElementById("rollover");

    if (selectRimborso == "RIMBORSO"){
        formRimborso.classList.remove("display-none");
        isRimborso = true
    } else if(selectRimborso == "BONUS"){
        formRimborso.classList.add("display-none");
        formRollover.classList.remove("display-none");
        isRimborso = false;
    } else if(selectRimborso == "NORMALE"){
        formRimborso.classList.add("display-none");
        formRollover.classList.add("display-none");
        isRimborso = false;
    }
}

function checkIndicazioni() {
    let importoPuntataElement = document.getElementById("importoPuntata");
    let importoRimborsoElement = document.getElementById("importoRimborso");
    let quotaPuntataElement = document.getElementById("quotaPuntata");
    let maggiorazioneElement = document.getElementById("maggiorazionePuntata");
    let quotaBancataElement = document.getElementById("quotaBancata");
    let commissioneElement = document.getElementById("commissione");
    let indicazioniAlert = document.getElementById("indicazioni-alert");
    let indicazoniContainer = document.getElementById("dutcher-indicazioni-container");
    let riepilogoContainer = document.getElementById("dutcher-riepilogo-container");

    if (!importoPuntataElement || !quotaPuntataElement ||
        !quotaBancataElement || !commissioneElement ||
        importoPuntataElement.value === "" || quotaPuntataElement.value === "" ||
        quotaBancataElement.value === "" || commissioneElement.value === "") {
        indicazioniAlert.classList.remove("display-none");
        indicazoniContainer.classList.add("display-none");
        riepilogoContainer.classList.add("display-none");
        return;
    }

    importoPuntata = importoPuntataElement.value;
    importoRimborso = importoRimborsoElement.value;
    quotaPuntata = quotaPuntataElement.value;
    quotaBancata =  quotaBancataElement.value;
    commissione =  commissioneElement.value;
    maggiorazione = maggiorazioneElement.value;

    indicazioniAlert.classList.add("display-none");
    indicazoniContainer.classList.remove("display-none");
    riepilogoContainer.classList.remove("display-none");
}

function normalPuntaPunta(){
    selectRimborso = document.getElementById("tipologia").value;
    if(!isAvanzato){
        if(selectRimborso == "NORMALE" || (isRimborso && importoRimborso == 0)){
            console.log("Normale");
            let importoBookA = parseFloat(document.getElementById("importoPuntata").value);
            let quotaBookA = parseFloat(document.getElementById("quotaPuntata").value);
            let quotaBookB = parseFloat(document.getElementById("quotaBancata").value);
            let isDecimal = document.getElementById("isDecimal").value

            let importoBookB = (importoBookA * quotaBookA) / quotaBookB;
            if(isDecimal == "NO"){
                importoBookB = Math.round(importoBookB);
            }
            let vinceBookA = (importoBookA * quotaBookA) - importoBookA;
            let vinceBookB = (importoBookB * quotaBookB) - importoBookB;
            let perdeBookA = -importoBookA;
            let perdeBookB = -importoBookB;
            let totaleBookA = vinceBookA + perdeBookB;
            let totaleBookB = vinceBookB + perdeBookA;

            let guadagnoMinimo = Math.min(totaleBookA, totaleBookB);
            let rating = ((importoBookA + (importoBookA * quotaBookA - importoBookA - (quotaBookA * importoBookA) / quotaBookB)) / importoBookA) * 100;

            document.getElementById("importo-a").value = importoBookA;
            document.getElementById("quota-a").value = quotaBookA;
            document.getElementById("importo-b").value = formatToTwoDecimals(importoBookB);
            document.getElementById("quota-b").value = quotaBookB;
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("cr-rating").innerHTML = "Rating";
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(guadagnoMinimo < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoMinimo > 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }

            //inserimento tabella
            let crRow = document.getElementById("cr-row");
            crRow.classList.add("display-none");

             //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vinceBookA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdeBookA);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdeBookB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vinceBookB);
            
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(totaleBookA);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(totaleBookB);
            updateElement("totale-1", totaleBookA);
            updateElement("totale-2", totaleBookB);
        } else if(selectRimborso == "BONUS" || (isRimborso && importoRimborso == 0)){
            let importoBookA = parseFloat(document.getElementById("importoPuntata").value);
            let quotaBookA = parseFloat(document.getElementById("quotaPuntata").value);
            let quotaBookB = parseFloat(document.getElementById("quotaBancata").value);
            let isDecimal = document.getElementById("isDecimal").value

            let importoBookB = (importoBookA * quotaBookA) / quotaBookB;
            if(isDecimal == "NO"){
                importoBookB = Math.round(importoBookB);
            }
            document.getElementById("importo-bonus").innerHTML = "Importo Bonus";
            let vinceBookA = (importoBookA * quotaBookA);
            let vinceBookB = (importoBookB * quotaBookB) - importoBookB;
            let perdeBookA = 0;
            let perdeBookB = -importoBookB;
            let totaleBookA = vinceBookA + perdeBookB;
            let totaleBookB = vinceBookB + perdeBookA;

            let guadagnoMinimo = Math.min(totaleBookA, totaleBookB);
            let rating = ((importoBookA + (importoBookA * quotaBookA - importoBookA - (quotaBookA * importoBookA) / quotaBookB)) / importoBookA) * 100;

            document.getElementById("importo-a").value = importoBookA;
            document.getElementById("quota-a").value = quotaBookA;
            document.getElementById("importo-b").value = formatToTwoDecimals(importoBookB);
            document.getElementById("quota-b").value = quotaBookB;
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("cr-rating").innerHTML = "Rating";
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(guadagnoMinimo < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoMinimo > 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }

            //inserimento tabella
            let crRow = document.getElementById("cr-row");
            crRow.classList.add("display-none");

             //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vinceBookA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdeBookA);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdeBookB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vinceBookB);
            
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(totaleBookA);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(totaleBookB);
            updateElement("totale-1", totaleBookA);
            updateElement("totale-2", totaleBookB);
        }
    } else if(isAvanzato){
        if(selectRimborso == "NORMALE"){
            let importoBookA = parseFloat(document.getElementById("importoPuntata").value);
            let quotaBookA = parseFloat(document.getElementById("quotaPuntata").value);
            let quotaBookB = parseFloat(document.getElementById("quotaBancata").value);
            let isDecimal = document.getElementById("isDecimal").value

            let importoBookB = (importoBookA * quotaBookA) / quotaBookB;
            if(isDecimal == "NO"){
                importoBookB = Math.round(importoBookB);
            }
            let vinceBookA = (importoBookA * quotaBookA) - importoBookA;
            let vinceBookB = (importoBookB * quotaBookB) - importoBookB;
            let perdeBookA = -importoBookA;
            let perdeBookB = -importoBookB;
            let totaleBookA = vinceBookA + perdeBookB;
            let totaleBookB = vinceBookB + perdeBookA;

            let guadagnoMinimo = Math.min(totaleBookA, totaleBookB);
            let rating = ((importoBookA + (importoBookA * quotaBookA - importoBookA - (quotaBookA * importoBookA) / quotaBookB)) / importoBookA) * 100;

            document.getElementById("importo-a").value = importoBookA;
            document.getElementById("quota-a").value = quotaBookA;
            document.getElementById("importo-b").value = formatToTwoDecimals(importoBookB);
            document.getElementById("quota-b").value = quotaBookB;
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("cr-rating").innerHTML = "Rating";
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(guadagnoMinimo < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoMinimo > 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }

            //inserimento tabella
            let crRow = document.getElementById("cr-row");
            crRow.classList.add("display-none");

             //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vinceBookA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdeBookA);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdeBookB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vinceBookB);
            
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(totaleBookA);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(totaleBookB);
            updateElement("totale-1", totaleBookA);
            updateElement("totale-2", totaleBookB);
        } else if(selectRimborso == "BONUS"){

        }
    }
}

function crPuntaPunta(){
    if(!isAvanzato){
        console.log("Rimborso");
        importoRimborso = parseFloat(document.getElementById('importoRimborso').value);

        let importoBookA = parseFloat(document.getElementById("importoPuntata").value);
        let quotaBookA = parseFloat(document.getElementById("quotaPuntata").value);
        let quotaBookB = parseFloat(document.getElementById("quotaBancata").value);
        let isDecimal = document.getElementById("isDecimal").value

        let importoBookB = ((importoBookA * quotaBookA - importoRimborso) / quotaBookB);
        if(isDecimal == "NO"){
            importoBookB = Math.round(importoBookB);
        }
        let vinceBookA = (importoBookA * quotaBookA) - importoBookA;
        let vinceBookB = (importoBookB * quotaBookB) - importoBookB + importoRimborso;
        let perdeBookA = -importoBookA;
        let perdeBookB = -importoBookB;
        let totaleBookA = vinceBookA + perdeBookB;
        let totaleBookB = vinceBookB + perdeBookA;

        

        let guadagnoMinimo = Math.min(totaleBookA, totaleBookB);
        let rating = (((importoBookA * quotaBookA - importoBookA - (importoBookA * quotaBookA - importoRimborso) / quotaBookB) * 100) / 100 / importoRimborso) * 100;

        document.getElementById("importo-a").value = importoBookA;
        document.getElementById("quota-a").value = quotaBookA;
        document.getElementById("importo-b").value = formatToTwoDecimals(importoBookB);
        document.getElementById("quota-b").value = quotaBookB;
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("cr-rating").innerHTML = "CR %";
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
        if(guadagnoMinimo < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoMinimo > 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }

        //inserimento tabella
        let crRow = document.getElementById("cr-row");
        crRow.classList.remove("display-none");

         //inserimento risultati tabella
        document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vinceBookA);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdeBookA);

        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdeBookB);
        document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vinceBookB);

        document.getElementById("row-cr-1").innerHTML = "+0.00";
        document.getElementById("row-cr-2").innerHTML = "+"+formatToTwoDecimals(importoRimborso);
        
        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(totaleBookA);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(totaleBookB);
        updateElement("totale-1", totaleBookA);
        updateElement("totale-2", totaleBookB);
    } else if(isAvanzato){

    }
}


// stile selettore
function updateBoxShadow() {
    const segmentedControls = document.querySelector('.segmented-controls');
    const three1Checked = document.getElementById('three-1').checked;
    
    if (three1Checked) {
        segmentedControls.style.boxShadow = '0 0 0 0.2rem #404040';
    } else {
        segmentedControls.style.boxShadow = '0 0 0 0.2rem #5865f1';
    }
}

// Add event listeners to radio buttons
document.getElementById('three-1').addEventListener('change', updateBoxShadow);
document.getElementById('three-2').addEventListener('change', updateBoxShadow);
document.querySelector('.segmented-controls').addEventListener('focusout', function() {
    this.style.boxShadow = 'none';
});


// Range input
const rangeInput = document.getElementById('sbilanciamento-input');
const rangeValue = document.getElementById('sbilanciamento-value');

rangeInput.addEventListener('input', function() {
    rangeValue.value = rangeInput.value;
    getResults();
});


function calculate() {

	var P1 = parseFloat(P1_text);
	var Q1 = parseFloat(Q1_text);
	var Q2 = parseFloat(Q2_text);

	var quota_new_2_text = Quota_nuova_2.value;
	var Q_n_2 = parseFloat(quota_new_2_text);
	var Slider_value = parseFloat(document.getElementById('slider_value').textContent);

	if (x == 'Normal') {
		var P2 = ((Q1 * P1) / Q2) * Slider_value;
		P2 = Math.round(P2 * 20) / 20;
		var win_B1 = P1 * Q1 - P1;
		var win_B2 = P2 * Q2 - P2;
		var lose_B1 = -P1;
		var lose_B2 = -P2;

		var Q_n_1 = Q2;
		var CP_1_val_text = CP_1.value;
		CP_1_val_text = CP_1_val_text.replace(',', '.');
		var CP_1_val = parseFloat(CP_1_val_text);
		var CP_2_val_text = CP_2.value;
		CP_2_val_text = CP_2_val_text.replace(',', '.');
		var CP_2_val = parseFloat(CP_2_val_text);
		var CP_3_val_text = CP_3.value;
		CP_3_val_text = CP_3_val_text.replace(',', '.');
		var CP_3_val = parseFloat(CP_3_val_text);
		var Q_n_3_text = Quota_nuova_3.value;
		Q_n_3_text = Q_n_3_text.replace(',', '.');
		var Q_n_3 = parseFloat(Q_n_3_text);
		var scoperto1 = Math.round((P1 * Q1) / Q_n_1);
		var residuo2 = Math.round(P1 - (Q_n_1 * CP_1_val) / Q1);
		//Resi_tot.value = residuo2;
		var scoperto2 = Math.round((residuo2 * Q1) / Q_n_2);
		var residuo3 = Math.round(residuo2 - (Q_n_2 * CP_2_val) / Q1);
		//document.getElementById("residuo_tot_2").value = Math.floor(residuo3);
		if (Q_n_2 > 0) {
			if (
				residuo3 == '1' ||
				residuo3 == '-1' ||
				residuo3 == '0' ||
				residuo2 == '1' ||
				residuo2 == '-1' ||
				residuo2 == '0'
			) {
				document.getElementById('copertura_val').innerHTML = 'Completa';
				document.getElementById('copertura_val').style.color = 'green';
				document.getElementById('copertura_val').style.fontWeight = 'bold';
			} else {
				document.getElementById('copertura_val').innerHTML = 'Incompleta';
				document.getElementById('copertura_val').style.color = 'red';
				document.getElementById('copertura_val').style.fontWeight = 'bold';
			}
			var W1 = Q_n_1 * CP_1_val;
			var W2 = Q_n_2 * CP_2_val;
			var WA = P1 * Q1;
			var WB = W1 + W2;
			var GA = WA - P1 - CP_1_val - CP_2_val;
			var GB = WB - P1 - CP_1_val - CP_2_val;
			var Gtot = (document.getElementById('g3').innerHTML = Math.min(GA, GB).toFixed(2) + ' € ');
			if (CP_2_val < scoperto2) {
				document.getElementById('robetta_parziale_2').style.display = 'block';
				var scoperto3 = Math.round((residuo3 * Q1) / Q_n_3);
				var residuo4 = Math.round(residuo3 - (Q_n_3 * CP_3_val) / Q1);
				document.getElementById('residuo_3').value = scoperto3;
				document.getElementById('pp5').innerHTML = CP_3_val.toFixed(2) + ' € ';
				document.getElementById('qq5').innerHTML = Q_n_3.toFixed(2);
				var W1 = Q_n_1 * CP_1_val;
				var W2 = Q_n_2 * CP_2_val;
				var W3 = Q_n_3 * CP_3_val;
				var WA = P1 * Q1;
				var WB = W1 + W2 + W3;
				var GA = WA - P1 - CP_1_val - CP_2_val - CP_3_val;
				var GB = WB - P1 - CP_1_val - CP_2_val - CP_3_val;
				//document.getElementById("g3").innerHTML = GA.toFixed(2) + " € ";
				//document.getElementById("g5").innerHTML = GB.toFixed(2) + " € ";
				var Gtot = (document.getElementById('g3').innerHTML = Math.min(GA, GB).toFixed(2) + ' € ');
				var iframeWin = parent.document.getElementById('iframePP');
				if (iframeWin != undefined) iframeWin.height = document.body.scrollHeight;
				if (CP_3_val == scoperto3) {
					document.getElementById('copertura_val').innerHTML = 'Completa';
					document.getElementById('copertura_val').style.color = 'green';
					document.getElementById('copertura_val').style.fontWeight = 'bold';
				} else {
					document.getElementById('copertura_val').innerHTML = 'Incompleta';
					document.getElementById('copertura_val').style.color = 'red';
					document.getElementById('copertura_val').style.fontWeight = 'bold';
				}
			} else {
				document.getElementById('robetta_parziale_2').style.display = 'none';
			}
			document.getElementById('g3').style.fontWeight = 'bold';
			if (Gtot > '0') {
				document.getElementById('g3').style.color = 'green';
			}
			if (Gtot < '0,1') {
				document.getElementById('g3').style.color = 'red';
			}
		}
		G1 = Math.round((win_B1 + lose_B2) * 100) / 100;
		G2 = Math.round((lose_B1 + win_B2) * 100) / 100;
		Gtot = Math.min(G1, G2);
		Net = P1 * Q1 - P1 - P2;
		rating = ((P1 + (P1 * Q1 - P1 - (Q1 * P1) / Q2)) / P1) * 100;

	} else if (x == 'RF') {
		var F = R.value; //rimborso
		F = parseFloat(F);
		var P2_RF = ((P1 * Q1 - F) / Q2) * Slider_value;
		P2_RF = Math.round(P2_RF * 20) / 20;
		var win_B1 = P1 * Q1 - P1;
		var win_B2 = P2_RF * Q2 - P2_RF;
		win_B1 = Math.round(win_B1 * 100) / 100;
		win_B2 = Math.round(win_B2 * 100) / 100;
		var lose_B1 = -P1;
		var lose_B2 = -P2_RF;


		G1 = document.getElementById('tot1').innerHTML = Math.round((win_B1 + lose_B2) * 100) / 100;
		rf_percent = (Math.round((P1 * Q1 - P1 - (P1 * Q1 - F) / Q2) * 100) / 100 / F) * 100;
		//rf_percent = Math.round(rf_percent*100)/100;
		document.getElementById('rf_percentuale').innerHTML = rf_percent.toFixed(2);
		var Q_n_1 = Q2;
		document.getElementById('Quota_nuova_1').value = Q_n_1;
		var CP_1_val_text = CP_1.value;
		CP_1_val_text = CP_1_val_text.replace(',', '.');
		var CP_1_val = parseFloat(CP_1_val_text);
		var CP_2_val_text = CP_2.value;
		CP_2_val_text = CP_2_val_text.replace(',', '.');
		var CP_2_val = parseFloat(CP_2_val_text);
		var CP_3_val_text = CP_3.value;
		CP_3_val_text = CP_3_val_text.replace(',', '.');
		var CP_3_val = parseFloat(CP_3_val_text);
		var Q_n_3_text = Quota_nuova_3.value;
		Q_n_3_text = Q_n_3_text.replace(',', '.');
		var Q_n_3 = parseFloat(Q_n_3_text);
		var scoperto1 = Math.round(P2_RF); //residuo
		var residuo2 = Math.round(P1 - (Q_n_1 * CP_1_val) / Q1); //scoperto
		//100-(2.5*30)/2
		//Resi_tot.value = residuo2;
		var scoperto2 = Math.round((residuo2 * Q1 - F) / Q_n_2);
		document.getElementById('residuo_1').value = scoperto1;
		document.getElementById('residuo_2').value = scoperto2; //10
		var residuo3 = Math.round(residuo2 - (Q_n_2 * CP_2_val) / Q1);
		//document.getElementById("residuo_tot_2").value = Math.floor(residuo3);
		if (Q_n_2 > 0) {
			document.getElementById('ref').style.display = 'none';
			document.getElementById('pp1').innerHTML = P1.toFixed(2) + ' € ';
			document.getElementById('pp3').innerHTML = CP_1_val.toFixed(2) + ' € ';
			document.getElementById('pp4').innerHTML = CP_2_val.toFixed(2) + ' € ';
			document.getElementById('qq1').innerHTML = Q1.toFixed(2);
			document.getElementById('qq3').innerHTML = Q_n_1.toFixed(2);
			document.getElementById('qq4').innerHTML = Q_n_2.toFixed(2);
			if (CP_1_val == scoperto1 || CP_2_val == scoperto2) {
				document.getElementById('copertura_val').innerHTML = 'Completa';
				document.getElementById('copertura_val').style.color = 'green';
				document.getElementById('copertura_val').style.fontWeight = 'bold';
			} else {
				document.getElementById('copertura_val').innerHTML = 'Incompleta';
				document.getElementById('copertura_val').style.color = 'red';
				document.getElementById('copertura_val').style.fontWeight = 'bold';
			}
			var W1 = Q_n_1 * CP_1_val;
			var W2 = Q_n_2 * CP_2_val;
			var WA = P1 * Q1;
			var WB = W1 + W2;
			var GA = WA - P1 - CP_1_val - CP_2_val;
			var GB = F + WB - P1 - CP_1_val - CP_2_val;
			var Gtot = (document.getElementById('g3').innerHTML = Math.min(GA, GB).toFixed(2) + ' € ');
			if (CP_2_val < scoperto2) {
				document.getElementById('robetta_parziale_2').style.display = 'block';
				var scoperto3 = Math.round((residuo3 * Q1 - F) / Q_n_3);
				var residuo4 = Math.round(residuo3 - (Q_n_3 * CP_3_val) / Q1);
				document.getElementById('residuo_3').value = scoperto3;
				document.getElementById('pp5').innerHTML = CP_3_val.toFixed(2) + ' € ';
				document.getElementById('qq5').innerHTML = Q_n_3.toFixed(2);
				var W1 = Q_n_1 * CP_1_val;
				var W2 = Q_n_2 * CP_2_val;
				var W3 = Q_n_3 * CP_3_val;
				var WA = P1 * Q1;
				var WB = W1 + W2 + W3;
				var GA = WA - P1 - CP_1_val - CP_2_val - CP_3_val;
				var GB = F + WB - P1 - CP_1_val - CP_2_val - CP_3_val;
				var Gtot = (document.getElementById('g3').innerHTML = Math.min(GA, GB).toFixed(2) + ' € ');
				if (CP_3_val == scoperto3) {
					document.getElementById('copertura_val').innerHTML = 'Completa';
					document.getElementById('copertura_val').style.color = 'green';
					document.getElementById('copertura_val').style.fontWeight = 'bold';
				} else {
					document.getElementById('copertura_val').innerHTML = 'Incompleta';
					document.getElementById('copertura_val').style.color = 'red';
					document.getElementById('copertura_val').style.fontWeight = 'bold';
				}
			} else {
				document.getElementById('robetta_parziale_2').style.display = 'none';
			}
			document.getElementById('g3').style.fontWeight = 'bold';
			if (Gtot > '0') {
				document.getElementById('g3').style.color = 'green';
			}
			if (Gtot < '0,1') {
				document.getElementById('g3').style.color = 'red';
			}
		}
		G2 = document.getElementById('tot2').innerHTML = Math.round((lose_B1 + win_B2 + F) * 100) / 100;
		Gtot = Math.min(G1, G2);
		document.getElementById('pp1').innerHTML = P1.toFixed(2) + ' € ';
		document.getElementById('pp2').innerHTML = P2_RF.toFixed(2) + ' € ';
		document.getElementById('qq1').innerHTML = Q1.toFixed(2);
		document.getElementById('qq2').innerHTML = Q2.toFixed(2);
		document.getElementById('guadagno1').innerHTML = Gtot.toFixed(2);

	} else if (x == 'BR') {
		var P2_BR = ((Q1 * P1) / Q2) * Slider_value;
		P2_BR = Math.round(P2_BR * 20) / 20;
		var win_B1 = P1 * Q1;
		var win_B2 = P2_BR * Q2 - P2_BR;
		win_B1 = Math.round(win_B1 * 100) / 100;
		win_B2 = Math.round(win_B2 * 100) / 100;
		var lose_B1 = 0;
		var lose_B2 = -P2_BR;
		if (P2_BR > 0) {
			document.getElementById('robetta').style.display = 'block';
			document.getElementById('tabella_profitti').style.display = 'block';
			document.getElementById('ref').style.display = 'none';
			document.getElementById('div_rating').style.display = 'block';
			//document.getElementById("robetta_parziale").style.display = "block";
			var iframeWin = parent.document.getElementById('iframePP');
			if (iframeWin != undefined) iframeWin.height = document.body.scrollHeight;
		}
		document.getElementById('A_bookmaker').innerHTML = '+' + win_B1.toFixed(2);
		document.getElementById('B_bookmaker2').innerHTML = '+' + win_B2.toFixed(2);
		document.getElementById('A_lose_book2').innerHTML = lose_B2.toFixed(2);
		document.getElementById('B_lose_book').innerHTML = '+' + lose_B1.toFixed(2);
		var Q_n_1 = Q2;
		document.getElementById('Quota_nuova_1').value = Q_n_1;
		var CP_1_val_text = CP_1.value;
		CP_1_val_text = CP_1_val_text.replace(',', '.');
		var CP_1_val = parseFloat(CP_1_val_text);
		var CP_2_val_text = CP_2.value;
		CP_2_val_text = CP_2_val_text.replace(',', '.');
		var CP_2_val = parseFloat(CP_2_val_text);
		var CP_3_val_text = CP_3.value;
		CP_3_val_text = CP_3_val_text.replace(',', '.');
		var CP_3_val = parseFloat(CP_3_val_text);
		var Q_n_3_text = Quota_nuova_3.value;
		Q_n_3_text = Q_n_3_text.replace(',', '.');
		var Q_n_3 = parseFloat(Q_n_3_text);
		var scoperto1 = Math.round((P1 * Q1) / Q_n_1);
		var residuo2 = Math.round(P1 - (Q_n_1 * CP_1_val) / Q1);
		//Resi_tot.value = residuo2;
		var scoperto2 = Math.round((residuo2 * Q1) / Q_n_2);
		document.getElementById('residuo_1').value = scoperto1;
		document.getElementById('residuo_2').value = scoperto2;
		var residuo3 = Math.round(residuo2 - (Q_n_2 * CP_2_val) / Q1);
		//document.getElementById("residuo_tot_2").value = Math.floor(residuo3);
		if (Q_n_2 > 0) {
			if (
				residuo3 == '1' ||
				residuo3 == '-1' ||
				residuo3 == '0' ||
				residuo2 == '1' ||
				residuo2 == '-1' ||
				residuo2 == '0'
			) {
				document.getElementById('copertura_val').innerHTML = 'Completa';
				document.getElementById('copertura_val').style.color = 'green';
				document.getElementById('copertura_val').style.fontWeight = 'bold';
			} else {
				document.getElementById('copertura_val').innerHTML = 'Incompleta';
				document.getElementById('copertura_val').style.color = 'red';
				document.getElementById('copertura_val').style.fontWeight = 'bold';
			}
			var W1 = Q_n_1 * CP_1_val;
			var W2 = Q_n_2 * CP_2_val;
			var WA = P1 * Q1;
			var WB = W1 + W2;
			var GA = WA - CP_1_val - CP_2_val;
			var GB = WB - CP_1_val - CP_2_val;
			//  document.getElementById("g3").innerHTML = GA.toFixed(2) + " € ";
			//  document.getElementById("g5").innerHTML = GB.toFixed(2) + " € ";
			var Gtot = (document.getElementById('g3').innerHTML = Math.min(GA, GB).toFixed(2) + ' € ');
			if (CP_2_val < scoperto2) {
				document.getElementById('robetta_parziale_2').style.display = 'block';
				var scoperto3 = Math.round((residuo3 * Q1) / Q_n_3);
				var residuo4 = Math.round(residuo3 - (Q_n_3 * CP_3_val) / Q1);
				document.getElementById('residuo_3').value = scoperto3;
				document.getElementById('pp5').innerHTML = CP_3_val.toFixed(2) + ' € ';
				document.getElementById('qq5').innerHTML = Q_n_3.toFixed(2);
				var W1 = Q_n_1 * CP_1_val;
				var W2 = Q_n_2 * CP_2_val;
				var W3 = Q_n_3 * CP_3_val;
				var WA = P1 * Q1;
				var WB = W1 + W2 + W3;
				var GA = WA - CP_1_val - CP_2_val - CP_3_val;
				var GB = WB - CP_1_val - CP_2_val - CP_3_val;
				//  document.getElementById("g3").innerHTML = GA.toFixed(2) + " € ";
				//  document.getElementById("g5").innerHTML = GB.toFixed(2) + " € ";
				var Gtot = (document.getElementById('g3').innerHTML = Math.min(GA, GB).toFixed(2) + ' € ');
				if (CP_3_val == scoperto3) {
					document.getElementById('copertura_val').innerHTML = 'Completa';
					document.getElementById('copertura_val').style.color = 'green';
					document.getElementById('copertura_val').style.fontWeight = 'bold';
				} else {
					document.getElementById('copertura_val').innerHTML = 'Incompleta';
					document.getElementById('copertura_val').style.color = 'red';
					document.getElementById('copertura_val').style.fontWeight = 'bold';
				}
			} else {
				document.getElementById('robetta_parziale_2').style.display = 'none';
			}
			document.getElementById('g3').style.fontWeight = 'bold';
			if (Gtot > '0') {
				document.getElementById('g3').style.color = 'green';
			}
			if (Gtot < '0,1') {
				document.getElementById('g3').style.color = 'red';
			}
		}
		G1 = Math.round((win_B1 + lose_B2) * 100) / 100;
		G2 = Math.round((lose_B1 + win_B2) * 100) / 100;
		Gtot = Math.min(G1, G2);
		Net = P1 * Q1 - P1 - P2_BR;
		rating = ((P1 + (P1 * Q1 - P1 - (Q1 * P1) / Q2)) / P1) * 100;
		//rating = Math.round(((rating_1 + rating_2)/2)*100);
		document.getElementById('Percentuale_totale').innerHTML = rating.toFixed(2);
		document.getElementById('pp1').innerHTML = P1.toFixed(2) + ' € ';
		document.getElementById('pp2').innerHTML = P2_BR.toFixed(2) + ' € ';
		document.getElementById('qq1').innerHTML = Q1.toFixed(2);
		document.getElementById('qq2').innerHTML = Q2.toFixed(2);
		document.getElementById('guadagno1').innerHTML = Gtot.toFixed(2);
		if (G1 < 0) {
			document.getElementById('tot1').style.color = 'red';
			document.getElementById('tot1').style.fontSize = 'bold';
			document.getElementById('tot1').innerHTML = G1.toFixed(2) + ' € ';
		} else {
			document.getElementById('tot1').style.color = 'green';
			document.getElementById('tot1').innerHTML = '+' + G1.toFixed(2) + ' € ';
			document.getElementById('tot1').style.fontWeight = 'bold';
		}
		if (G2 < 0) {
			document.getElementById('tot2').style.color = 'red';
			document.getElementById('tot2').style.fontSize = 'bold';
			document.getElementById('tot2').innerHTML = G2.toFixed(2) + ' € ';
		} else {
			document.getElementById('tot2').style.color = 'green';
			document.getElementById('tot2').innerHTML = '+' + G2.toFixed(2) + ' € ';
			document.getElementById('tot2').style.fontWeight = 'bold';
		}
		if (Gtot < 0) {
			document.getElementById('guadagno1').style.color = 'red';
		} else {
			document.getElementById('guadagno1').style.color = 'green';
		}
		/*
    if(win_B1 < 0){
        document.getElementById("A_bookmaker").innerHTML ="-" + win_B1.toFixed(2);
    }else{
        document.getElementById("A_bookmaker").innerHTML = "+" + win_B1.toFixed(2);
    }
    if(win_B2 < 0){
        document.getElementById("B_bookmaker2").innerHTML ="-" + win_B2.toFixed(2);
    }else{
        document.getElementById("B_bookmaker2").innerHTML = "+" + win_B2.toFixed(2);
    }
    if(lose_B2 < 0){
        document.getElementById("A_lose_book2").innerHTML =lose_B2.toFixed(2);
    }else{
        document.getElementById("A_lose_book2").innerHTML = "+" + lose_B2.toFixed(2);
    }
        if(lose_B1 < 0){
        document.getElementById("B_lose_book").innerHTML =lose_B1.toFixed(2);
    }else{
        document.getElementById("B_lose_book").innerHTML = "+" + lose_B1.toFixed(2);
    } */
	}
}


