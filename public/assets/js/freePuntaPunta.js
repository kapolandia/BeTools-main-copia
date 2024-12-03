let importoPuntata = null;
let importoRimborso = null;
let quotaPuntata = null;
let quotaBancata = null;
let commissione = null;
let maggiorazione = null;
let selectRimborso = document.getElementById("tipologia").value;
let sbilanciamentoValue = null;
let isAvanzato;
let isSbila = false;
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
	checkSbilanciamento();
    checkIndicazioni();
    importoRimborso = document.getElementById('importoRimborso').value;

    if(!isAvanzato){
        if(isRimborso && importoRimborso != 0){
            crPuntaPunta();
        } else{
            normalPuntaPunta();
        }
    } else if(isAvanzato){
        isAvanzato = false;
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
        isAvanzato = true;
        setTimeout(() => {
            base.click();  // Simula il clic su "Base"
        }, 1000); // Cambia il tempo come desideri
    }
}

function checkSbilanciamento(){
	let sbilanciamento = document.getElementById("sbila-1");
    let parziale = document.getElementById("sbila-2");
    let sbilanciamentoCont = document.getElementById("sbila-container");
    let parzialeCont = document.getElementById("parziale-container");	

    if(sbilanciamento.checked){
		isSbila = true;
		sbilanciamentoCont.classList.remove("display-none");
        parzialeCont.classList.add("display-none");
    } else if(parziale.checked){
		isSbila = false;
		sbilanciamentoCont.classList.add("display-none");
        parzialeCont.classList.remove("display-none");
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
    let commissioneElement = document.getElementById("importo-rollover");
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
        let indicazioniParziali = document.getElementById("parziale-container-2");
        indicazioniParziali.classList.add("display-none");
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
            } else if (guadagnoMinimo >= 0) {
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
            let isDecimal = document.getElementById("isDecimal").value;
			let rollover = parseFloat( document.getElementById("importo-rollover").value);

            let importoBookB = ((importoBookA * quotaBookA)- (5*importoBookA*(rollover-1) / 100)) / quotaBookB;
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
            } else if (guadagnoMinimo >= 0) {
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
            let isDecimal = document.getElementById("isDecimal").value;
			let quotaPuntataBackup = null;
			let importoBookB = null;

            let totalePerdeB = 0;
            let totaleVinceB = 0;
            let indicazioniParziali = document.getElementById("parziale-container-2");
            indicazioniParziali.classList.add("display-none");

			if(isSbila){
				quotaPuntataBackup = quotaBookA;
				sbilanciamentoValue = parseFloat(document.getElementById("sbilanciamento-input").value);
				if(maggiorazione != 0){
					quotaBookA =  quotaBookA + ((quotaBookA - 1) * maggiorazione / 100);;
				}
				importoBookB = ((importoBookA * quotaBookA) / quotaBookB)*(sbilanciamentoValue / 100);
			} else if(!isSbila){
				quotaPuntataBackup = quotaBookA;
				sbilanciamentoValue = parseFloat(document.getElementById("sbilanciamento-input").value);
				if(maggiorazione != 0){
					quotaBookA =  quotaBookA + ((quotaBookA - 1) * maggiorazione / 100);;
				}
                importoBookB = (importoBookA * quotaBookA) / quotaBookB;
                if(isDecimal == "NO"){
                    importoBookB = Math.round(importoBookB);
                }
                document.getElementById("su-a").value = formatToTwoDecimals(importoBookB);

                document.getElementById("quota-parz-a").value = formatToTwoDecimals(quotaBookB);
                // si passa al calcolatore parziale vero se si inserisce un valore nell'input
                let importoParzialeA = parseFloat(document.getElementById("puntata-parz-a").value);
                if(!isNaN(importoParzialeA)){
                    let nuovaQuotaB1 = parseFloat(document.getElementById("quota-parz-b").value);
                    let importoBookB2 = (importoBookB - importoParzialeA)*(quotaBookB/nuovaQuotaB1);
                    if(isDecimal == "NO"){
                        importoBookB2 = Math.round(importoBookB2);
                    }
                    document.getElementById("su-b").value = formatToTwoDecimals(importoBookB2);
                    let sbilaRow3 = document.getElementById("sbila-row-3");
                    let importoParzialeB = parseFloat(document.getElementById("puntata-parz-b").value);
                    
                    if(!isNaN(importoParzialeB)){
                        let importoParzialeB3 = parseFloat(document.getElementById("puntata-parz-c").value);
                        console.log(importoParzialeB3);
                        if(importoParzialeB < importoBookB2 * 0.99 && !isNaN(importoParzialeB3)){
                            sbilaRow3.classList.remove("display-none");
                            sbilaRow3.classList.add("display-flex");
    
                            let nuovaQuotaB2 = parseFloat(document.getElementById("quota-parz-c").value);
                            let importoBookB3 = (importoBookB2 - importoParzialeB)*(nuovaQuotaB1/nuovaQuotaB2);
                            if(isDecimal == "NO"){
                                importoBookB3 = Math.round(importoBookB3);
                            }
                            document.getElementById("su-c").value = formatToTwoDecimals(importoBookB3);
                            
                            totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA) + ((importoParzialeB * nuovaQuotaB1)-importoParzialeB) + ((importoParzialeB3 * nuovaQuotaB2)-importoParzialeB3);
                            totalePerdeB = -importoParzialeA - importoParzialeB - importoParzialeB3;
    
                            //display dati
                            indicazioniParziali.classList.remove("display-none");
                            document.getElementById("punta-parz-row-1").value = formatToTwoDecimals(importoParzialeB);
                            document.getElementById("quota-parz-row-1").value = formatToTwoDecimals(nuovaQuotaB1);
                            document.getElementById("punta-parz-row-2").value = formatToTwoDecimals(importoParzialeB3);
                            document.getElementById("quota-parz-row-2").value = formatToTwoDecimals(nuovaQuotaB2);
                            let rowParz = document.getElementById("parz-row-2");
                            rowParz.classList.remove("display-none");
                            rowParz.classList.add("display-flex");
                            console.log(totaleVinceB);
                        } else{
                            if(importoParzialeB < importoBookB2 * 0.99){
                                sbilaRow3.classList.remove("display-none");
                                sbilaRow3.classList.add("display-flex");
                            } else{
                                sbilaRow3.classList.add("display-none");
                                sbilaRow3.classList.remove("display-flex");
                            }

                            let nuovaQuotaB2 = parseFloat(document.getElementById("quota-parz-c").value);
                            let importoBookB3 = (importoBookB2 - importoParzialeB)*(nuovaQuotaB1/nuovaQuotaB2);
                            if(isDecimal == "NO"){
                                importoBookB3 = Math.round(importoBookB3);
                            }
                            document.getElementById("su-c").value = formatToTwoDecimals(importoBookB3);
                            
                            totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA) + ((importoParzialeB * nuovaQuotaB1)-importoParzialeB);
                            totalePerdeB = -importoParzialeA - importoParzialeB;
    
                            //display dati
                            indicazioniParziali.classList.remove("display-none");
                            document.getElementById("punta-parz-row-1").value = formatToTwoDecimals(importoParzialeB);
                            document.getElementById("quota-parz-row-1").value = formatToTwoDecimals(nuovaQuotaB1);
                            let rowParz = document.getElementById("parz-row-2");
                            rowParz.classList.add("display-none");
                            rowParz.classList.remove("display-flex");
                        }
                    } else{
                        sbilaRow3.classList.add("display-none");
                        sbilaRow3.classList.remove("display-flex");
                        totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA);
                        totalePerdeB = -importoParzialeA;
                    }
                }
                
			}

            
            if(isDecimal == "NO"){
                importoBookB = Math.round(importoBookB);
            }

            let vinceBookA = (importoBookA * quotaBookA) - importoBookA;
            let vinceBookB = (importoBookB * quotaBookB) - importoBookB;
            if(totaleVinceB != 0){
                vinceBookB = totaleVinceB;
            }
            let perdeBookA = -importoBookA;
            let perdeBookB = -importoBookB;
            if(totalePerdeB != 0){
                perdeBookB = totalePerdeB;
            }
            let totaleBookA = vinceBookA + perdeBookB;
            let totaleBookB = vinceBookB + perdeBookA;

            let guadagnoMinimo = Math.min(totaleBookA, totaleBookB);
            let rating = ((importoBookA + (importoBookA * quotaBookA - importoBookA - (quotaBookA * importoBookA) / quotaBookB)) / importoBookA) * 100;

            document.getElementById("importo-a").value = importoBookA;
			if(quotaPuntataBackup != quotaBookA && quotaPuntataBackup != null){
				document.getElementById("quota-a").value = formatToTwoDecimals(quotaPuntataBackup) + String.fromCharCode(8594) + formatToTwoDecimals(quotaBookA);
			} else {
				document.getElementById("quota-a").value = quotaBookA;
			}
            let importoParzialeA = parseFloat(document.getElementById("puntata-parz-a").value);
            if(isNaN(importoParzialeA)){
                document.getElementById("importo-b").value = formatToTwoDecimals(importoBookB);
            } else{
                document.getElementById("importo-b").value = formatToTwoDecimals(importoParzialeA);
            }
            
            document.getElementById("quota-b").value = quotaBookB;
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("cr-rating").innerHTML = "Rating";
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(guadagnoMinimo < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoMinimo >= 0) {
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
			let importoBookA = parseFloat(document.getElementById("importoPuntata").value);
            let quotaBookA = parseFloat(document.getElementById("quotaPuntata").value);
            let quotaBookB = parseFloat(document.getElementById("quotaBancata").value);
            let isDecimal = document.getElementById("isDecimal").value;
			let rollover = parseFloat( document.getElementById("importo-rollover").value);
			let quotaPuntataBackup = null;
			let importoBookB = null;

            let totalePerdeB = 0;
            let totaleVinceB = 0;
            let indicazioniParziali = document.getElementById("parziale-container-2");
            indicazioniParziali.classList.add("display-none");

			if(isSbila){
				quotaPuntataBackup = quotaBookA;
				sbilanciamentoValue = parseFloat(document.getElementById("sbilanciamento-input").value);
				if(maggiorazione != 0){
					quotaBookA =  quotaBookA + ((quotaBookA - 1) * maggiorazione / 100);;
				}
				importoBookB = ((importoBookA * quotaBookA)- (5*importoBookA*(rollover-1) / 100)) / quotaBookB*(sbilanciamentoValue / 100);
			} else if(!isSbila){
				quotaPuntataBackup = quotaBookA;
				sbilanciamentoValue = parseFloat(document.getElementById("sbilanciamento-input").value);
				if(maggiorazione != 0){
					quotaBookA =  quotaBookA + ((quotaBookA - 1) * maggiorazione / 100);;
				}
                importoBookB = ((importoBookA * quotaBookA)- (5*importoBookA*(rollover-1) / 100)) / quotaBookB;
                if(isDecimal == "NO"){
                    importoBookB = Math.round(importoBookB);
                }
                document.getElementById("su-a").value = formatToTwoDecimals(importoBookB);

                document.getElementById("quota-parz-a").value = formatToTwoDecimals(quotaBookB);
                // si passa al calcolatore parziale vero se si inserisce un valore nell'input
                let importoParzialeA = parseFloat(document.getElementById("puntata-parz-a").value);
                if(!isNaN(importoParzialeA)){
                    let nuovaQuotaB1 = parseFloat(document.getElementById("quota-parz-b").value);
                    let importoBookB2 = (importoBookB - importoParzialeA)*(quotaBookB/nuovaQuotaB1);
                    if(isDecimal == "NO"){
                        importoBookB2 = Math.round(importoBookB2);
                    }
                    document.getElementById("su-b").value = formatToTwoDecimals(importoBookB2);
                    let sbilaRow3 = document.getElementById("sbila-row-3");
                    let importoParzialeB = parseFloat(document.getElementById("puntata-parz-b").value);
                    
                    if(!isNaN(importoParzialeB)){
                        let importoParzialeB3 = parseFloat(document.getElementById("puntata-parz-c").value);
                        console.log(importoParzialeB3);
                        if(importoParzialeB < importoBookB2 * 0.99 && !isNaN(importoParzialeB3)){
                            sbilaRow3.classList.remove("display-none");
                            sbilaRow3.classList.add("display-flex");
    
                            let nuovaQuotaB2 = parseFloat(document.getElementById("quota-parz-c").value);
                            let importoBookB3 = (importoBookB2 - importoParzialeB)*(nuovaQuotaB1/nuovaQuotaB2);
                            if(isDecimal == "NO"){
                                importoBookB3 = Math.round(importoBookB3);
                            }
                            document.getElementById("su-c").value = formatToTwoDecimals(importoBookB3);
                            
                            totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA) + ((importoParzialeB * nuovaQuotaB1)-importoParzialeB) + ((importoParzialeB3 * nuovaQuotaB2)-importoParzialeB3);
                            totalePerdeB = -importoParzialeA - importoParzialeB - importoParzialeB3;
    
                            //display dati
                            indicazioniParziali.classList.remove("display-none");
                            document.getElementById("punta-parz-row-1").value = formatToTwoDecimals(importoParzialeB);
                            document.getElementById("quota-parz-row-1").value = formatToTwoDecimals(nuovaQuotaB1);
                            document.getElementById("punta-parz-row-2").value = formatToTwoDecimals(importoParzialeB3);
                            document.getElementById("quota-parz-row-2").value = formatToTwoDecimals(nuovaQuotaB2);
                            let rowParz = document.getElementById("parz-row-2");
                            rowParz.classList.remove("display-none");
                            rowParz.classList.add("display-flex");
                            console.log(totaleVinceB);
                        } else{
                            console.log("here");
                            if(importoParzialeB < importoBookB2 * 0.99){
                                sbilaRow3.classList.remove("display-none");
                                sbilaRow3.classList.add("display-flex");
                            } else{
                                sbilaRow3.classList.add("display-none");
                                sbilaRow3.classList.remove("display-flex");
                            }
                            let nuovaQuotaB2 = parseFloat(document.getElementById("quota-parz-c").value);
                            let importoBookB3 = (importoBookB2 - importoParzialeB)*(nuovaQuotaB1/nuovaQuotaB2);
                            if(isDecimal == "NO"){
                                importoBookB3 = Math.round(importoBookB3);
                            }
                            document.getElementById("su-c").value = formatToTwoDecimals(importoBookB3);
                            
                            totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA) + ((importoParzialeB * nuovaQuotaB1)-importoParzialeB);
                            totalePerdeB = -importoParzialeA - importoParzialeB;
    
                            //display dati
                            indicazioniParziali.classList.remove("display-none");
                            document.getElementById("punta-parz-row-1").value = formatToTwoDecimals(importoParzialeB);
                            document.getElementById("quota-parz-row-1").value = formatToTwoDecimals(nuovaQuotaB1);
                            let rowParz = document.getElementById("parz-row-2");
                            rowParz.classList.add("display-none");
                            rowParz.classList.remove("display-flex");
                        }
                    } else{
                        sbilaRow3.classList.add("display-none");
                        sbilaRow3.classList.remove("display-flex");
                        totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA);
                        totalePerdeB = -importoParzialeA;
                    }
                }
                
			}
			
            if(isDecimal == "NO"){
                importoBookB = Math.round(importoBookB);
            }

            document.getElementById("importo-bonus").innerHTML = "Importo Bonus";
            let vinceBookA = (importoBookA * quotaBookA);
            let vinceBookB = (importoBookB * quotaBookB) - importoBookB;
            if(totaleVinceB != 0){
                vinceBookB = totaleVinceB;
            }
            let perdeBookA = 0;
            let perdeBookB = -importoBookB;
            if(totalePerdeB != 0){
                perdeBookB = totalePerdeB;
            }
            let totaleBookA = vinceBookA + perdeBookB;
            let totaleBookB = vinceBookB + perdeBookA;

            let guadagnoMinimo = Math.min(totaleBookA, totaleBookB);
            let rating = ((importoBookA + (importoBookA * quotaBookA - importoBookA - (quotaBookA * importoBookA) / quotaBookB)) / importoBookA) * 100;

            document.getElementById("importo-a").value = importoBookA;
			if(quotaPuntataBackup != quotaBookA && quotaPuntataBackup != null){
				document.getElementById("quota-a").value = formatToTwoDecimals(quotaPuntataBackup) + String.fromCharCode(8594) + formatToTwoDecimals(quotaBookA);
			} else {
				document.getElementById("quota-a").value = quotaBookA;
			}
            let importoParzialeA = parseFloat(document.getElementById("puntata-parz-a").value);
            if(isNaN(importoParzialeA)){
                document.getElementById("importo-b").value = formatToTwoDecimals(importoBookB);
            } else{
                document.getElementById("importo-b").value = formatToTwoDecimals(importoParzialeA);
            }
            document.getElementById("quota-b").value = quotaBookB;
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("cr-rating").innerHTML = "Rating";
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(guadagnoMinimo < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoMinimo >= 0) {
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
        } else if (guadagnoMinimo >= 0) {
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
		console.log("Rimborso");
        importoRimborso = parseFloat(document.getElementById('importoRimborso').value);

        let importoBookA = parseFloat(document.getElementById("importoPuntata").value);
        let quotaBookA = parseFloat(document.getElementById("quotaPuntata").value);
        let quotaBookB = parseFloat(document.getElementById("quotaBancata").value);
        let isDecimal = document.getElementById("isDecimal").value
		let quotaPuntataBackup = null;
		let importoBookB = null;

        let totalePerdeB = 0;
        let totaleVinceB = 0;
        let indicazioniParziali = document.getElementById("parziale-container-2");
        indicazioniParziali.classList.add("display-none");

		if(isSbila){
			quotaPuntataBackup = quotaBookA;
			sbilanciamentoValue = parseFloat(document.getElementById("sbilanciamento-input").value);
			console.log(maggiorazione);
			if(maggiorazione != 0){
				quotaBookA =  quotaBookA + ((quotaBookA - 1) * maggiorazione / 100);;
			}
			importoBookB = (importoBookA * quotaBookA - importoRimborso) / quotaBookB*(sbilanciamentoValue / 100);
		} else if(!isSbila){
            quotaPuntataBackup = quotaBookA;
            sbilanciamentoValue = parseFloat(document.getElementById("sbilanciamento-input").value);
            if(maggiorazione != 0){
                quotaBookA =  quotaBookA + ((quotaBookA - 1) * maggiorazione / 100);;
            }
            importoBookB = (importoBookA * quotaBookA - importoRimborso) / quotaBookB;
            if(isDecimal == "NO"){
                importoBookB = Math.round(importoBookB);
            }
            document.getElementById("su-a").value = formatToTwoDecimals(importoBookB);

            document.getElementById("quota-parz-a").value = formatToTwoDecimals(quotaBookB);
            // si passa al calcolatore parziale vero se si inserisce un valore nell'input
            let importoParzialeA = parseFloat(document.getElementById("puntata-parz-a").value);
            if(!isNaN(importoParzialeA)){
                let nuovaQuotaB1 = parseFloat(document.getElementById("quota-parz-b").value);
                let importoBookB2 = (importoBookB - importoParzialeA)*(quotaBookB/nuovaQuotaB1);
                if(isDecimal == "NO"){
                    importoBookB2 = Math.round(importoBookB2);
                }
                document.getElementById("su-b").value = formatToTwoDecimals(importoBookB2);
                let sbilaRow3 = document.getElementById("sbila-row-3");
                let importoParzialeB = parseFloat(document.getElementById("puntata-parz-b").value);
                
                if(!isNaN(importoParzialeB)){
                    let importoParzialeB3 = parseFloat(document.getElementById("puntata-parz-c").value);
                    console.log(importoParzialeB3);
                    if(importoParzialeB < importoBookB2 * 0.99 && !isNaN(importoParzialeB3)){
                        sbilaRow3.classList.remove("display-none");
                        sbilaRow3.classList.add("display-flex");

                        let nuovaQuotaB2 = parseFloat(document.getElementById("quota-parz-c").value);
                        let importoBookB3 = (importoBookB2 - importoParzialeB)*(nuovaQuotaB1/nuovaQuotaB2);
                        if(isDecimal == "NO"){
                            importoBookB3 = Math.round(importoBookB3);
                        }
                        document.getElementById("su-c").value = formatToTwoDecimals(importoBookB3);
                        
                        totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA) + ((importoParzialeB * nuovaQuotaB1)-importoParzialeB) + ((importoParzialeB3 * nuovaQuotaB2)-importoParzialeB3);
                        totalePerdeB = -importoParzialeA - importoParzialeB - importoParzialeB3;

                        //display dati
                        indicazioniParziali.classList.remove("display-none");
                        document.getElementById("punta-parz-row-1").value = formatToTwoDecimals(importoParzialeB);
                        document.getElementById("quota-parz-row-1").value = formatToTwoDecimals(nuovaQuotaB1);
                        document.getElementById("punta-parz-row-2").value = formatToTwoDecimals(importoParzialeB3);
                        document.getElementById("quota-parz-row-2").value = formatToTwoDecimals(nuovaQuotaB2);
                        let rowParz = document.getElementById("parz-row-2");
                        rowParz.classList.remove("display-none");
                        rowParz.classList.add("display-flex");
                        console.log(totaleVinceB);
                    } else{
                        console.log("here");
                        if(importoParzialeB < importoBookB2 * 0.99){
                            sbilaRow3.classList.remove("display-none");
                            sbilaRow3.classList.add("display-flex");
                        } else{
                            sbilaRow3.classList.add("display-none");
                            sbilaRow3.classList.remove("display-flex");
                        }
                        let nuovaQuotaB2 = parseFloat(document.getElementById("quota-parz-c").value);
                        let importoBookB3 = (importoBookB2 - importoParzialeB)*(nuovaQuotaB1/nuovaQuotaB2);
                        if(isDecimal == "NO"){
                            importoBookB3 = Math.round(importoBookB3);
                        }
                        document.getElementById("su-c").value = formatToTwoDecimals(importoBookB3);
                        
                        totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA) + ((importoParzialeB * nuovaQuotaB1)-importoParzialeB);
                        totalePerdeB = -importoParzialeA - importoParzialeB;

                        //display dati
                        indicazioniParziali.classList.remove("display-none");
                        document.getElementById("punta-parz-row-1").value = formatToTwoDecimals(importoParzialeB);
                        document.getElementById("quota-parz-row-1").value = formatToTwoDecimals(nuovaQuotaB1);
                        let rowParz = document.getElementById("parz-row-2");
                        rowParz.classList.add("display-none");
                        rowParz.classList.remove("display-flex");
                    }
                } else{
                    sbilaRow3.classList.add("display-none");
                    sbilaRow3.classList.remove("display-flex");
                    totaleVinceB = ((importoParzialeA * quotaBookB)-importoParzialeA);
                    totalePerdeB = -importoParzialeA;
                }
            }
            
        }
		
		if(isDecimal == "NO"){
			importoBookB = Math.round(importoBookB);
		}

        if(isDecimal == "NO"){
            importoBookB = Math.round(importoBookB);
        }
        let vinceBookA = (importoBookA * quotaBookA) - importoBookA;
        let vinceBookB = (importoBookB * quotaBookB) - importoBookB + importoRimborso;
        if(totaleVinceB != 0){
            vinceBookB = totaleVinceB + importoRimborso;
        }
        let perdeBookA = -importoBookA;
        let perdeBookB = -importoBookB;
        if(totalePerdeB != 0){
            perdeBookB = totalePerdeB;
        }
        let totaleBookA = vinceBookA + perdeBookB;
        let totaleBookB = vinceBookB + perdeBookA;

        

        let guadagnoMinimo = Math.min(totaleBookA, totaleBookB);
        let rating = (((importoBookA * quotaBookA - importoBookA - (importoBookA * quotaBookA - importoRimborso) / quotaBookB) * 100) / 100 / importoRimborso) * 100;

        document.getElementById("importo-a").value = importoBookA;
		if(quotaPuntataBackup != quotaBookA && quotaPuntataBackup != null){
			document.getElementById("quota-a").value = formatToTwoDecimals(quotaPuntataBackup) + String.fromCharCode(8594) + formatToTwoDecimals(quotaBookA);
		} else {
			document.getElementById("quota-a").value = quotaBookA;
		}
        let importoParzialeA = parseFloat(document.getElementById("puntata-parz-a").value);
        if(isNaN(importoParzialeA)){
            document.getElementById("importo-b").value = formatToTwoDecimals(importoBookB);
        } else{
            document.getElementById("importo-b").value = formatToTwoDecimals(importoParzialeA);
        }
        document.getElementById("quota-b").value = quotaBookB;
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("cr-rating").innerHTML = "CR %";
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
        if(guadagnoMinimo < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoMinimo >= 0) {
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



