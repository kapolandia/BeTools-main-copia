let puntataBookA = null;
let puntataBookB = null;
let puntataBookC = null;
let puntataBookD = null;
let puntataBookE = null;

let potenziamentoBookA = null;
let potenziamentoBookB = null;
let potenziamentoBookC = null;
let potenziamentoBookD = null;
let potenziamentoBookE = null;

let quotaBookA = null;
let quotaBookB = null;
let quotaBookC = null;
let quotaBookD = null;
let quotaBookE = null;
let tipologia = null;

let importoRimborso1 = 0;
let importoRimborso2 = 0;
let importoRimborso3 = 0;
let importoRimborso4 = 0;
let importoRimborso5 = 0;

let impostazioniTipologia = "NORMALE";
let impostazioniEventi = 3;
let impostazioniDecimali = "NO";
let impostazioniCambiaPuntate = false;

//risultati

let rating = null;
let guadagnoMinimo = null;

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

function hideColumnD() {
    // Select all the rows in the table
    const rows = document.querySelectorAll('table tr');
    
    // Loop through each row and hide the 5th cell
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if (cells.length > 4) {
            cells[4].classList.add("display-none"); // Hide the cell at index 4 (5th cell)
        }
    });
}

function showColumnD(){
    const rows = document.querySelectorAll('table tr');
    
    // Loop through each row and hide the 5th cell
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if (cells.length > 4) {
            cells[4].classList.remove("display-none"); // Hide the cell at index 4 (5th cell)
        }
    });
}

function hideColumnE() {
    // Select all the rows in the table
    const rows = document.querySelectorAll('table tr');
    
    // Loop through each row and hide the 5th cell
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if (cells.length > 5) {
            cells[5].classList.add("display-none");  // Hide the cell at index 4 (5th cell)
        }
    });
}

function showColumnE(){
    const rows = document.querySelectorAll('table tr');
    
    // Loop through each row and hide the 5th cell
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        if (cells.length > 5) {
            cells[5].classList.remove("display-none"); // Hide the cell at index 4 (5th cell)
        }
    });
}

function updateTableStriping() {
    const table = document.getElementById('results-table');
    const rows = table.querySelectorAll('tr');
    let visibleRowIndex = 0;

    rows.forEach(row => {
        if (row.style.display !== 'none' && !row.classList.contains('display-none')) {
            row.style.backgroundColor = (visibleRowIndex % 2 === 0) ? '#ffffff' : '#f2f2f2';
            visibleRowIndex++;
        }
    });
}

function copyImportiCr() {
    importoRimborso1 = parseFloat(document.getElementById("importo-cr-1").value);
    importoRimborso2 = parseFloat(document.getElementById("importo-cr-2").value);
    importoRimborso3 = parseFloat(document.getElementById("importo-cr-3").value);
    importoRimborso4 = parseFloat(document.getElementById("importo-cr-4").value);
    importoRimborso5 = parseFloat(document.getElementById("importo-cr-5").value);

    // Initialize to 0 if NaN
    importoRimborso1 = isNaN(importoRimborso1) ? 0 : importoRimborso1;
    importoRimborso2 = isNaN(importoRimborso2) ? 0 : importoRimborso2;
    importoRimborso3 = isNaN(importoRimborso3) ? 0 : importoRimborso3;
    importoRimborso4 = isNaN(importoRimborso4) ? 0 : importoRimborso4;
    importoRimborso5 = isNaN(importoRimborso5) ? 0 : importoRimborso5;
}


function getResults(){
    checkIndicazioni();
    checkTipologia();
    checkDecimali();
    checkEventi();
    checkPuntateBloccate();
    checkIndicazioni();
    checkRimborso();
    normalDutcher();
    updateTableStriping();
    
}

function checkDecimali(){
    impostazioniDecimali = document.getElementById("decimali").value;
}

function checkTipologia(){
    impostazioniTipologia = document.getElementById("tipologia").value;
}

function checkEventi(){
    impostazioniEventi = document.getElementById("eventi").value;
    let quotaPuntaD = document.getElementById("quota-punta-d");
    let quotaPuntaE = document.getElementById("quota-punta-e");
    let potQuotaPuntaD = document.getElementById("pot-quota-punta-d");
    let potQuotaPuntaE = document.getElementById("pot-quota-punta-e");
    let bookD = document.getElementById("bookD");
    let bookE = document.getElementById("bookE");
    let quotabookD = document.getElementById("quote-book-d");
    let quotabookE = document.getElementById("quote-book-e");

    if(impostazioniEventi == 3){
        quotaPuntaD.classList.add("display-none");
        quotaPuntaE.classList.add("display-none");
        potQuotaPuntaD.classList.add("display-none");
        potQuotaPuntaE.classList.add("display-none");
        bookD.classList.add("display-none");
        bookE.classList.add("display-none");
        quotabookD.classList.add("display-none");
        quotabookE.classList.add("display-none");
    } else if(impostazioniEventi == 4){
        quotaPuntaD.classList.remove("display-none");
        quotaPuntaE.classList.add("display-none");
        potQuotaPuntaD.classList.remove("display-none");
        potQuotaPuntaE.classList.add("display-none");
        bookD.classList.remove("display-none");
        bookE.classList.add("display-none");
        quotabookD.classList.remove("display-none");
        quotabookE.classList.add("display-none");
    } else if(impostazioniEventi == 5){
        quotaPuntaD.classList.remove("display-none");
        quotaPuntaE.classList.remove("display-none");
        potQuotaPuntaD.classList.remove("display-none");
        potQuotaPuntaE.classList.remove("display-none");
        bookD.classList.remove("display-none");
        bookE.classList.remove("display-none");
        quotabookD.classList.remove("display-none");
        quotabookE.classList.remove("display-none");
    }
}

function checkIndicazioni(){
    puntataBookA = document.getElementById("puntataBookA").value;
    quotaBookA = document.getElementById("quotaBookA").value;
    quotaBookB = document.getElementById("quotaBookB").value;
    quotaBookC = document.getElementById("quotaBookC").value;
    quotaBookD = document.getElementById("quotaBookD").value;
    quotaBookE = document.getElementById("quotaBookE").value;
    
    let indicazioniAlert = document.getElementById("indicazioni-alert");
    let indicazioniAlertContainer = document.getElementById("dutcher-indicazioni-container");
    let dutcherRiepilogo = document.getElementById("dutcher-riepilogo-container");

    if(impostazioniEventi == 3){
        if((puntataBookA == "" || puntataBookA == null) ||
           (quotaBookA == "" || quotaBookA == null) ||
           (quotaBookB == "" || quotaBookB == null) || 
           (quotaBookC == "" || quotaBookC == null)){
            indicazioniAlert.classList.remove("display-none");
            indicazioniAlertContainer.classList.add("display-none");
            dutcherRiepilogo.classList.add("display-none");
        } else {
            indicazioniAlert.classList.add("display-none");
            indicazioniAlertContainer.classList.remove("display-none");
            dutcherRiepilogo.classList.remove("display-none");
        }
    } else if(impostazioniEventi == 4){
        if((puntataBookA == "" || puntataBookA == null) ||
            (quotaBookA == "" || quotaBookA == null) ||
            (quotaBookB == "" || quotaBookB == null) || 
            (quotaBookC == "" || quotaBookC == null) ||
            (quotaBookD == "" || quotaBookD == null)){
            indicazioniAlert.classList.remove("display-none");
            indicazioniAlertContainer.classList.add("display-none");
            dutcherRiepilogo.classList.add("display-none");
        } else {
            indicazioniAlert.classList.add("display-none");
            indicazioniAlertContainer.classList.remove("display-none");
            dutcherRiepilogo.classList.remove("display-none");
        }
    } else if(impostazioniEventi == 5){
        if((puntataBookA == "" || puntataBookA == null) ||
            (quotaBookA == "" || quotaBookA == null) ||
            (quotaBookB == "" || quotaBookB == null) || 
            (quotaBookC == "" || quotaBookC == null) ||
            (quotaBookD == "" || quotaBookD == null) ||
            (quotaBookE == "" || quotaBookE == null)){
            indicazioniAlert.classList.remove("display-none");
            indicazioniAlertContainer.classList.add("display-none");
            dutcherRiepilogo.classList.add("display-none");
        } else {
            indicazioniAlert.classList.add("display-none");
            indicazioniAlertContainer.classList.remove("display-none");
            dutcherRiepilogo.classList.remove("display-none");
        }
    }
    puntataBookA = parseFloat(puntataBookA);
    quotaBookA = parseFloat(quotaBookA);
    quotaBookB = parseFloat(quotaBookB);
    quotaBookC = parseFloat(quotaBookC);
    quotaBookD = parseFloat(quotaBookD);
    quotaBookE = parseFloat(quotaBookE);
}

function checkPuntateBloccate(){
    let puntateBloccate = document.getElementById("three-1");
    let puntateModificabili = document.getElementById("three-2");
    let inputs = ["book-b", "book-c", "book-d", "book-e"];

    inputs.forEach(id => {
        let input = document.getElementById(id);
        if(puntateBloccate.checked){
            input.classList.add("input-disabled");
            input.disabled = true;
            impostazioniCambiaPuntate = false;
        } else if(puntateModificabili.checked){
            input.classList.remove("input-disabled");
            input.disabled = false;
            impostazioniCambiaPuntate = true;
        }
    });
}

function checkRimborso(){
    let selectRimborso = document.getElementById("tipologia").value;
    let potenziamentoCol = document.getElementById("col-potenziate");
    if(selectRimborso == "RIMBORSO"){
        potenziamentoCol.classList.remove("display-none");
    } else {
        potenziamentoCol.classList.add("display-none");
    }

    tipologia = selectRimborso;
}
function hasRimborsi(){
    if(impostazioniEventi == 3){
        let importi = [importoRimborso1, importoRimborso2, importoRimborso3];
        return importi.some(importo => importo !== 0);
    } else if(impostazioniEventi == 4){
        let importi = [importoRimborso1, importoRimborso2, importoRimborso3, importoRimborso4];
        return importi.some(importo => importo !== 0);
    } else if(impostazioniEventi == 5){
        let importi = [importoRimborso1, importoRimborso2, importoRimborso3, importoRimborso4, importoRimborso5];
        return importi.some(importo => importo !== 0);
    }
}

function normalDutcher(){
    copyImportiCr();
    let normalDutcherFunction = hasRimborsi();
    if((tipologia == "NORMALE" || tipologia == "BONUS") || normalDutcherFunction == false){
        console.log("Dutcher Normale");
        document.getElementById("rating-cr").innerHTML = "Rating"
        if(impostazioniEventi == 3){
            if(!impostazioniCambiaPuntate){
                puntataBookB = (puntataBookA * quotaBookA) / quotaBookB;
                puntataBookC = (puntataBookA * quotaBookA) / quotaBookC;
                if(impostazioniDecimali == "NO"){
                    puntataBookB = Math.round(puntataBookB);
                    puntataBookC = Math.round(puntataBookC);
                }
            } else{
                puntataBookB = parseFloat(document.getElementById("book-b").value);
                puntataBookC = parseFloat(document.getElementById("book-c").value);
            }
            let vincitaPuntataA = (puntataBookA * quotaBookA) - puntataBookA;
            let vincitaPuntataB = (puntataBookB * quotaBookB) - puntataBookB;
            let vincitaPuntataC = (puntataBookC * quotaBookC) - puntataBookC;
            let perdePuntataA = -puntataBookA;
            let perdePuntataB = -puntataBookB;
            let perdePuntataC = -puntataBookC;

            let rowCr = document.getElementById("cr-row");
            let rowD = document.getElementById("row-d");
            let rowE = document.getElementById("row-e");
            rowCr.classList.add("display-none");
            rowD.classList.add("display-none");
            rowE.classList.add("display-none");
            hideColumnD();
            hideColumnE();
            if(tipologia == "BONUS"){
                vincitaPuntataA = (puntataBookA * quotaBookA);
                perdePuntataA = 0;
            }
            let guadagnoPuntata1 = vincitaPuntataA + perdePuntataB + perdePuntataC;
            let guadagnoPuntata2 = vincitaPuntataB + perdePuntataA + perdePuntataC;
            let guadagnoPuntata3 = vincitaPuntataC + perdePuntataB + perdePuntataA;
            
            guadagnoMinimo = Math.min(guadagnoPuntata1, guadagnoPuntata2, guadagnoPuntata3);
            let netto = (puntataBookA * quotaBookA) - puntataBookA - puntataBookB - puntataBookC;
            rating = ((puntataBookA + netto) / puntataBookA) * 100;

            //inserimento risultati
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("guadagno-minimo").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(!impostazioniCambiaPuntate){
                document.getElementById("book-b").value = formatToTwoDecimals(puntataBookB);
                document.getElementById("book-c").value = formatToTwoDecimals(puntataBookC);
            }
            document.getElementById("quoteBookB").value = formatToTwoDecimals(quotaBookB);
            document.getElementById("quoteBookC").value = formatToTwoDecimals(quotaBookC);

            //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(perdePuntataA);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataB);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(perdePuntataB);

            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-3").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataC);

            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata3);
            updateElement("totale-1", guadagnoPuntata1);
            updateElement("totale-2", guadagnoPuntata2);
            updateElement("totale-3", guadagnoPuntata3);

        } else if(impostazioniEventi == 4){
            if(!impostazioniCambiaPuntate){
                puntataBookB = (puntataBookA * quotaBookA) / quotaBookB;
                puntataBookC = (puntataBookA * quotaBookA) / quotaBookC;
                puntataBookD = (puntataBookA * quotaBookA) / quotaBookD;
                if(impostazioniDecimali == "NO"){
                    puntataBookB = Math.round(puntataBookB);
                    puntataBookC = Math.round(puntataBookC);
                    puntataBookD = Math.round(puntataBookD);
                }
            } else{
                puntataBookB = parseFloat(document.getElementById("book-b").value);
                puntataBookC = parseFloat(document.getElementById("book-c").value);
                puntataBookD = parseFloat(document.getElementById("book-d").value);
            }

            let vincitaPuntataA = (puntataBookA * quotaBookA) - puntataBookA;
            let vincitaPuntataB = (puntataBookB * quotaBookB) - puntataBookB;
            let vincitaPuntataC = (puntataBookC * quotaBookC) - puntataBookC;
            let vincitaPuntataD = (puntataBookD * quotaBookD) - puntataBookD;
            let perdePuntataA = -puntataBookA;
            let perdePuntataB = -puntataBookB;
            let perdePuntataC = -puntataBookC;
            let perdePuntataD = -puntataBookD;
            
            let rowCr = document.getElementById("cr-row");
            let rowD = document.getElementById("row-d");
            let rowE = document.getElementById("row-e");
            rowCr.classList.add("display-none");
            rowD.classList.remove("display-none");
            rowE.classList.add("display-none");
            showColumnD();
            hideColumnE();
            if(tipologia == "BONUS"){
                vincitaPuntataA = (puntataBookA * quotaBookA);
                perdePuntataA = 0;
            }
            let guadagnoPuntata1 = vincitaPuntataA + perdePuntataB + perdePuntataC + perdePuntataD;
            let guadagnoPuntata2 = vincitaPuntataB + perdePuntataA + perdePuntataC + perdePuntataD;
            let guadagnoPuntata3 = vincitaPuntataC + perdePuntataB + perdePuntataA + perdePuntataD;
            let guadagnoPuntata4 = vincitaPuntataD + perdePuntataA + perdePuntataB + perdePuntataC;
            
            guadagnoMinimo = Math.min(guadagnoPuntata1, guadagnoPuntata2, guadagnoPuntata3, guadagnoPuntata4);
            let netto = (puntataBookA * quotaBookA) - puntataBookA - puntataBookB - puntataBookC - puntataBookD;
            rating = ((puntataBookA + netto) / puntataBookA) * 100;

            //inserimento risultati
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("guadagno-minimo").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(!impostazioniCambiaPuntate){
                document.getElementById("book-b").value = formatToTwoDecimals(puntataBookB);
                document.getElementById("book-c").value = formatToTwoDecimals(puntataBookC);
                document.getElementById("book-d").value = formatToTwoDecimals(puntataBookD);
            }
            document.getElementById("quoteBookB").value = formatToTwoDecimals(quotaBookB);
            document.getElementById("quoteBookC").value = formatToTwoDecimals(quotaBookC);
            document.getElementById("quoteBookD").value = formatToTwoDecimals(quotaBookD);

            //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(perdePuntataA);
        
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataB);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(perdePuntataB);
        
            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-3").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataC);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(perdePuntataC);

            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-4").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataD);

            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata4);
            updateElement("totale-1", guadagnoPuntata1);
            updateElement("totale-2", guadagnoPuntata2);
            updateElement("totale-3", guadagnoPuntata3);
            updateElement("totale-4", guadagnoPuntata4);
        } else if(impostazioniEventi == 5){
            if(!impostazioniCambiaPuntate){
                puntataBookB = (puntataBookA * quotaBookA) / quotaBookB;
                puntataBookC = (puntataBookA * quotaBookA) / quotaBookC;
                puntataBookD = (puntataBookA * quotaBookA) / quotaBookD;
                puntataBookE = (puntataBookA * quotaBookA) / quotaBookE;
                if(impostazioniDecimali == "NO"){
                    puntataBookB = Math.round(puntataBookB);
                    puntataBookC = Math.round(puntataBookC);
                    puntataBookD = Math.round(puntataBookD);
                    puntataBookE = Math.round(puntataBookE);
                }
            } else{
                puntataBookB = parseFloat(document.getElementById("book-b").value);
                puntataBookC = parseFloat(document.getElementById("book-c").value);
                puntataBookD = parseFloat(document.getElementById("book-d").value);
                puntataBookE = parseFloat(document.getElementById("book-e").value);
            }
            let vincitaPuntataA = (puntataBookA * quotaBookA) - puntataBookA;
            let vincitaPuntataB = (puntataBookB * quotaBookB) - puntataBookB;
            let vincitaPuntataC = (puntataBookC * quotaBookC) - puntataBookC;
            let vincitaPuntataD = (puntataBookD * quotaBookD) - puntataBookD;
            let vincitaPuntataE = (puntataBookE * quotaBookE) - puntataBookE;
            let perdePuntataA = -puntataBookA;
            let perdePuntataB = -puntataBookB;
            let perdePuntataC = -puntataBookC;
            let perdePuntataD = -puntataBookD;
            let perdePuntataE = -puntataBookE;

            let rowCr = document.getElementById("cr-row");
            let rowD = document.getElementById("row-d");
            let rowE = document.getElementById("row-e");
            rowCr.classList.add("display-none");
            rowD.classList.remove("display-none");
            rowE.classList.remove("display-none");
            showColumnD();
            showColumnE();
            if(tipologia == "BONUS"){
                vincitaPuntataA = (puntataBookA * quotaBookA);
                perdePuntataA = 0;
            }
            let guadagnoPuntata1 = vincitaPuntataA + perdePuntataB + perdePuntataC + perdePuntataD + perdePuntataE;
            let guadagnoPuntata2 = vincitaPuntataB + perdePuntataA + perdePuntataC + perdePuntataD + perdePuntataE;
            let guadagnoPuntata3 = vincitaPuntataC + perdePuntataB + perdePuntataA + perdePuntataD + perdePuntataE;
            let guadagnoPuntata4 = vincitaPuntataD + perdePuntataA + perdePuntataB + perdePuntataC + perdePuntataE;
            let guadagnoPuntata5 = vincitaPuntataE + perdePuntataA + perdePuntataB + perdePuntataC + perdePuntataD;
            
            guadagnoMinimo = Math.min(guadagnoPuntata1, guadagnoPuntata2, guadagnoPuntata3, guadagnoPuntata4, guadagnoPuntata5);
            let netto = (puntataBookA * quotaBookA) - puntataBookA - puntataBookB - puntataBookC - puntataBookD - puntataBookE;
            rating = ((puntataBookA + netto) / puntataBookA) * 100;

            //inserimento risultati
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("guadagno-minimo").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(!impostazioniCambiaPuntate){
                document.getElementById("book-b").value = formatToTwoDecimals(puntataBookB);
                document.getElementById("book-c").value = formatToTwoDecimals(puntataBookC);
                document.getElementById("book-d").value = formatToTwoDecimals(puntataBookD);
                document.getElementById("book-e").value = formatToTwoDecimals(puntataBookE);
            }
            document.getElementById("quoteBookB").value = formatToTwoDecimals(quotaBookB);
            document.getElementById("quoteBookC").value = formatToTwoDecimals(quotaBookC);
            document.getElementById("quoteBookD").value = formatToTwoDecimals(quotaBookD);
            document.getElementById("quoteBookE").value = formatToTwoDecimals(quotaBookE);

            //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-5").innerHTML = formatToTwoDecimals(perdePuntataA);
            
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataB);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-5").innerHTML = formatToTwoDecimals(perdePuntataB);
            
            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-3").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataC);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-5").innerHTML = formatToTwoDecimals(perdePuntataC);
            
            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-4").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataD);
            document.getElementById("row-d-5").innerHTML = formatToTwoDecimals(perdePuntataD);

            document.getElementById("row-e-1").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-2").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-3").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-4").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-5").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataE);

            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata4);
            document.getElementById("totale-5").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata5);
            updateElement("totale-1", guadagnoPuntata1);
            updateElement("totale-2", guadagnoPuntata2);
            updateElement("totale-3", guadagnoPuntata3);
            updateElement("totale-4", guadagnoPuntata4);
            updateElement("totale-5", guadagnoPuntata5);
        }
    }else{
        console.log("Dutcher CR");
        document.getElementById("rating-cr").innerHTML = "CR %"
        if(impostazioniEventi == 3){
            if(!impostazioniCambiaPuntate){
                puntataBookB = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso2) / quotaBookB;
                puntataBookC = ((puntataBookA * quotaBookA) + importoRimborso3 - importoRimborso1) / quotaBookC;
                if(impostazioniDecimali == "NO"){
                    puntataBookB = Math.round(puntataBookB);
                    puntataBookC = Math.round(puntataBookC);
                }
            } else{
                puntataBookB = parseFloat(document.getElementById("book-b").value);
                puntataBookC = parseFloat(document.getElementById("book-c").value);
            }
            let vincitaPuntataA = (puntataBookA * quotaBookA) - puntataBookA;
            let vincitaPuntataB = (puntataBookB * quotaBookB) - puntataBookB;
            let vincitaPuntataC = (puntataBookC * quotaBookC) - puntataBookC;
            let vincitaPuntataARimborso = (puntataBookA * quotaBookA) - puntataBookA + importoRimborso2 + importoRimborso3;
            let vincitaPuntataBRimborso = (puntataBookB * quotaBookB) - puntataBookB + importoRimborso1 + importoRimborso3;
            let vincitaPuntataCRimborso = (puntataBookC * quotaBookC) - puntataBookC + importoRimborso1 + importoRimborso2;
            let perdePuntataA = -puntataBookA;
            let perdePuntataB = -puntataBookB;
            let perdePuntataC = -puntataBookC;

            let rowCr = document.getElementById("cr-row");
            let rowD = document.getElementById("row-d");
            let rowE = document.getElementById("row-e");
            rowCr.classList.remove("display-none");
            rowD.classList.add("display-none");
            rowE.classList.add("display-none");
            hideColumnD();
            hideColumnE();

            let guadagnoPuntata1 = vincitaPuntataARimborso + perdePuntataB + perdePuntataC;
            let guadagnoPuntata2 = vincitaPuntataBRimborso + perdePuntataA + perdePuntataC;
            let guadagnoPuntata3 = vincitaPuntataCRimborso + perdePuntataB + perdePuntataA;
            
            guadagnoMinimo = Math.min(guadagnoPuntata1, guadagnoPuntata2, guadagnoPuntata3);
            rating = (guadagnoMinimo / (importoRimborso1 + importoRimborso2 + importoRimborso3)) * 100;

            //inserimento risultati
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("guadagno-minimo").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            document.getElementById("book-b").value = formatToTwoDecimals(puntataBookB);
            if(!impostazioniCambiaPuntate){
                document.getElementById("book-b").value = formatToTwoDecimals(puntataBookB);
                document.getElementById("book-c").value = formatToTwoDecimals(puntataBookC);
            }
            document.getElementById("quoteBookB").value = formatToTwoDecimals(quotaBookB);
            document.getElementById("quoteBookC").value = formatToTwoDecimals(quotaBookC);

            //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(perdePuntataA);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataB);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(perdePuntataB);

            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-3").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataC);

            document.getElementById("row-cr-1").innerHTML = "+" + formatToTwoDecimals(importoRimborso2+importoRimborso3);
            document.getElementById("row-cr-2").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso3);
            document.getElementById("row-cr-3").innerHTML = "+"+ formatToTwoDecimals(importoRimborso1+importoRimborso2);

            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata3);
            updateElement("totale-1", guadagnoPuntata1);
            updateElement("totale-2", guadagnoPuntata2);
            updateElement("totale-3", guadagnoPuntata3);
        } else if(impostazioniEventi == 4){
            if(!impostazioniCambiaPuntate){
                puntataBookB = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso2) / quotaBookB;
                puntataBookC = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso3) / quotaBookC;
                puntataBookD = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso4) / quotaBookD;
                if(impostazioniDecimali == "NO"){
                    puntataBookB = Math.round(puntataBookB);
                    puntataBookC = Math.round(puntataBookC);
                    puntataBookD = Math.round(puntataBookD);
                }
            } else{
                puntataBookB = parseFloat(document.getElementById("book-b").value);
                puntataBookC = parseFloat(document.getElementById("book-c").value);
                puntataBookD = parseFloat(document.getElementById("book-d").value);

            }
            let vincitaPuntataA = (puntataBookA * quotaBookA) - puntataBookA;
            let vincitaPuntataB = (puntataBookB * quotaBookB) - puntataBookB;
            let vincitaPuntataC = (puntataBookC * quotaBookC) - puntataBookC;
            let vincitaPuntataD = (puntataBookD * quotaBookD) - puntataBookD;
            let vincitaPuntataARimborso = (puntataBookA * quotaBookA) - puntataBookA + importoRimborso2 + importoRimborso3 + importoRimborso4;
            let vincitaPuntataBRimborso = (puntataBookB * quotaBookB) - puntataBookB + importoRimborso1 + importoRimborso3 + importoRimborso4;
            let vincitaPuntataCRimborso = (puntataBookC * quotaBookC) - puntataBookC + importoRimborso1 + importoRimborso2 + importoRimborso4;
            let vincitaPuntataDRimborso = (puntataBookD * quotaBookD) - puntataBookD + importoRimborso1 + importoRimborso2 + importoRimborso3;
            let perdePuntataA = -puntataBookA;
            let perdePuntataB = -puntataBookB;
            let perdePuntataC = -puntataBookC;
            let perdePuntataD = -puntataBookD;

            let rowCr = document.getElementById("cr-row");
            let rowD = document.getElementById("row-d");
            let rowE = document.getElementById("row-e");
            rowCr.classList.remove("display-none");
            rowD.classList.remove("display-none");
            rowE.classList.add("display-none");
            showColumnD();
            hideColumnE();

            let guadagnoPuntata1 = vincitaPuntataARimborso + perdePuntataB + perdePuntataC + perdePuntataD;
            let guadagnoPuntata2 = vincitaPuntataBRimborso + perdePuntataA + perdePuntataC + perdePuntataD;
            let guadagnoPuntata3 = vincitaPuntataCRimborso + perdePuntataB + perdePuntataA + perdePuntataD;
            let guadagnoPuntata4 = vincitaPuntataDRimborso + perdePuntataB + perdePuntataA + perdePuntataC; 
            
            guadagnoMinimo = Math.min(guadagnoPuntata1, guadagnoPuntata2, guadagnoPuntata3, guadagnoPuntata4);
            rating = (guadagnoMinimo / (importoRimborso1 + importoRimborso2 + importoRimborso3 + importoRimborso4)) * 100;

            //inserimento risultati
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("guadagno-minimo").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(!impostazioniCambiaPuntate){
                document.getElementById("book-b").value = formatToTwoDecimals(puntataBookB);
                document.getElementById("book-c").value = formatToTwoDecimals(puntataBookC);
                document.getElementById("book-d").value = formatToTwoDecimals(puntataBookD);
            }
            document.getElementById("quoteBookB").value = formatToTwoDecimals(quotaBookB);
            document.getElementById("quoteBookC").value = formatToTwoDecimals(quotaBookC);
            document.getElementById("quoteBookD").value = formatToTwoDecimals(quotaBookD);

            //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(perdePuntataA);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataB);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(perdePuntataB);

            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-3").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataC);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(perdePuntataC);

            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-4").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataD);
            
            document.getElementById("row-cr-1").innerHTML = "+" + formatToTwoDecimals(importoRimborso2+importoRimborso3+importoRimborso4);
            document.getElementById("row-cr-2").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso3+importoRimborso4);
            document.getElementById("row-cr-3").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso2+importoRimborso4);
            document.getElementById("row-cr-4").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso2+importoRimborso3);

            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata4);
            updateElement("totale-1", guadagnoPuntata1);
            updateElement("totale-2", guadagnoPuntata2);
            updateElement("totale-3", guadagnoPuntata3);
            updateElement("totale-4", guadagnoPuntata4);
        } else if(impostazioniEventi == 5){
            if(!impostazioniCambiaPuntate){
                puntataBookB = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso2) / quotaBookB;
                puntataBookC = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso3) / quotaBookC;
                puntataBookD = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso4) / quotaBookD;
                puntataBookE = ((puntataBookA * quotaBookA) - importoRimborso1 + importoRimborso5) / quotaBookE;
                if(impostazioniDecimali == "NO"){
                    puntataBookB = Math.round(puntataBookB);
                    puntataBookC = Math.round(puntataBookC);
                    puntataBookD = Math.round(puntataBookD);
                    puntataBookE = Math.round(puntataBookE);
                }
            } else{
                puntataBookB = parseFloat(document.getElementById("book-b").value);
                puntataBookC = parseFloat(document.getElementById("book-c").value);
                puntataBookD = parseFloat(document.getElementById("book-d").value);
                puntataBookE = parseFloat(document.getElementById("book-e").value);

            }
            let vincitaPuntataA = (puntataBookA * quotaBookA) - puntataBookA;
            let vincitaPuntataB = (puntataBookB * quotaBookB) - puntataBookB;
            let vincitaPuntataC = (puntataBookC * quotaBookC) - puntataBookC;
            let vincitaPuntataD = (puntataBookD * quotaBookD) - puntataBookD;
            let vincitaPuntataE = (puntataBookE * quotaBookE) - puntataBookE;
            let vincitaPuntataARimborso = (puntataBookA * quotaBookA) - puntataBookA + importoRimborso2 + importoRimborso3 + importoRimborso4 + importoRimborso5;
            let vincitaPuntataBRimborso = (puntataBookB * quotaBookB) - puntataBookB + importoRimborso1 + importoRimborso3 + importoRimborso4 + importoRimborso5;
            let vincitaPuntataCRimborso = (puntataBookC * quotaBookC) - puntataBookC + importoRimborso1 + importoRimborso2 + importoRimborso4 + importoRimborso5;
            let vincitaPuntataDRimborso = (puntataBookD * quotaBookD) - puntataBookD + importoRimborso1 + importoRimborso2 + importoRimborso3 + importoRimborso5;
            let vincitaPuntataERimborso = (puntataBookE * quotaBookE) - puntataBookE + importoRimborso1 + importoRimborso2 + importoRimborso3 + importoRimborso4;
            let perdePuntataA = -puntataBookA;
            let perdePuntataB = -puntataBookB;
            let perdePuntataC = -puntataBookC;
            let perdePuntataD = -puntataBookD;
            let perdePuntataE = -puntataBookE;

            let rowCr = document.getElementById("cr-row");
            let rowD = document.getElementById("row-d");
            let rowE = document.getElementById("row-e");
            rowCr.classList.remove("display-none");
            rowD.classList.remove("display-none");
            rowE.classList.remove("display-none");
            showColumnD();
            showColumnE();

            let guadagnoPuntata1 = vincitaPuntataARimborso + perdePuntataB + perdePuntataC + perdePuntataD + perdePuntataE;
            let guadagnoPuntata2 = vincitaPuntataBRimborso + perdePuntataA + perdePuntataC + perdePuntataD + perdePuntataE;
            let guadagnoPuntata3 = vincitaPuntataCRimborso + perdePuntataB + perdePuntataA + perdePuntataD + perdePuntataE;
            let guadagnoPuntata4 = vincitaPuntataDRimborso + perdePuntataB + perdePuntataA + perdePuntataC + perdePuntataE; 
            let guadagnoPuntata5 = vincitaPuntataERimborso + perdePuntataB + perdePuntataA + perdePuntataC + perdePuntataD; 
            
            guadagnoMinimo = Math.min(guadagnoPuntata1, guadagnoPuntata2, guadagnoPuntata3, guadagnoPuntata4, guadagnoPuntata5);
            rating = (guadagnoMinimo / (importoRimborso1 + importoRimborso2 + importoRimborso3 + importoRimborso4 + importoRimborso5)) * 100;

            //inserimento risultati
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("guadagno-minimo").innerHTML = formatToTwoDecimals(guadagnoMinimo);
            if(!impostazioniCambiaPuntate){
                document.getElementById("book-b").value = formatToTwoDecimals(puntataBookB);
                document.getElementById("book-c").value = formatToTwoDecimals(puntataBookC);
                document.getElementById("book-d").value = formatToTwoDecimals(puntataBookD);
                document.getElementById("book-e").value = formatToTwoDecimals(puntataBookE);
            }
            document.getElementById("quoteBookB").value = formatToTwoDecimals(quotaBookB);
            document.getElementById("quoteBookC").value = formatToTwoDecimals(quotaBookC);
            document.getElementById("quoteBookD").value = formatToTwoDecimals(quotaBookD);
            document.getElementById("quoteBookE").value = formatToTwoDecimals(quotaBookE);

            //inserimento risultati tabella
            document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataA);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(perdePuntataA);
            document.getElementById("row-a-5").innerHTML = formatToTwoDecimals(perdePuntataA);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataB);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(perdePuntataB);
            document.getElementById("row-b-5").innerHTML = formatToTwoDecimals(perdePuntataB);

            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-3").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataC);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(perdePuntataC);
            document.getElementById("row-c-5").innerHTML = formatToTwoDecimals(perdePuntataC);

            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(perdePuntataD);
            document.getElementById("row-d-4").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataD);
            document.getElementById("row-d-5").innerHTML = formatToTwoDecimals(perdePuntataD);

            document.getElementById("row-e-1").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-2").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-3").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-4").innerHTML = formatToTwoDecimals(perdePuntataE);
            document.getElementById("row-e-5").innerHTML = "+"+formatToTwoDecimals(vincitaPuntataE);
            
            document.getElementById("row-cr-1").innerHTML = "+" + formatToTwoDecimals(importoRimborso2+importoRimborso3+importoRimborso4+importoRimborso5);
            document.getElementById("row-cr-2").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso3+importoRimborso4+importoRimborso5);
            document.getElementById("row-cr-3").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso2+importoRimborso4+importoRimborso5);
            document.getElementById("row-cr-4").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso2+importoRimborso3+importoRimborso5);
            document.getElementById("row-cr-5").innerHTML = "+" + formatToTwoDecimals(importoRimborso1+importoRimborso2+importoRimborso3+importoRimborso4);

            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata4);
            document.getElementById("totale-5").innerHTML = formatToTwoDecimalsTotal(guadagnoPuntata5);
            updateElement("totale-1", guadagnoPuntata1);
            updateElement("totale-2", guadagnoPuntata2);
            updateElement("totale-3", guadagnoPuntata3);
            updateElement("totale-4", guadagnoPuntata4);
            updateElement("totale-5", guadagnoPuntata5);
        }
    }

    if(guadagnoMinimo < 0){
        document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
        document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
    } else if (guadagnoMinimo >= 0) {
        document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
        document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
    }
}


function calculate() {
    var P1 = parseFloat(P1_text);
    var Q1 = parseFloat(Q1_text);
    var Q2 = parseFloat(Q2_text);
    var Q3 = parseFloat(Q3_text);
    if ((x == "Normal") || (x == "BR"))
    {
        var P2 = (P1 * Q1) / Q2;
        var P3 = (P1 * Q1) / Q3;
        P2 = Math.round(P2);
        P3 = Math.round(P3);
        var win_B1 = (P1 * Q1) - P1;
        var win_B2 = (P2 * Q2) - P2;
        var win_B3 = (P3 * Q3) - P3;
        win_B1 = Math.round(win_B1 * 100) / 100;
        win_B2 = Math.round(win_B2 * 100) / 100;
        win_B3 = Math.round(win_B3 * 100) / 100;
        var lose_B1 = -P1;
        var lose_B2 = -P2;
        var lose_B3 = -P3;

        if (x == "BR")
        {
            win_B1 = P1 * Q1;
            lose_B1 = 0;
        }

        G1 = Math.round((win_B1 + lose_B2 + lose_B3) * 100) / 100;
        G2 = Math.round((lose_B1 + win_B2 + lose_B3) * 100) / 100;
        G3 = Math.round((lose_B1 + lose_B2 + win_B3) * 100) / 100;
        Gtot = Math.min(G1, G2, G3);
        Net = (P1 * Q1 - P1 - P2 - P3);
        rating = ((P1 + Net) / P1) * 100;


    } else if (x == "RF") {
        var F = R.value; //rimborso
        var P2_RF = ((P1 * Q1) - F1 - F3 ) / Q2;
        var P3_RF = ((P1 * Q1) - F1 - F2) / Q3;
        P2_RF = Math.round(P2_RF);
        P3_RF = Math.round(P3_RF);
        var win_B1 = (P1 * Q1) - P1;
        var win_B2 = (P2_RF * Q2) - P2_RF;
        var win_B3 = (P3_RF * Q3) - P3_RF;
        win_B1 = Math.round(win_B1 * 100) / 100;
        win_B2 = Math.round(win_B2 * 100) / 100;
        win_B3 = Math.round(win_B3 * 100) / 100;
        var lose_B1 = -P1;
        var lose_B2 = -P2_RF;
        var lose_B3 = -P3_RF;

        G1 = document.getElementById("tot1").innerHTML = Math.round((win_B1 + lose_B2 + lose_B3) * 100) / 100;
        var rf_perc = (G1 / F) * 100;
        G2 = document.getElementById("tot2").innerHTML = Math.round((lose_B1 + win_B2 + lose_B3 + F) * 100) / 100;
        G3 = document.getElementById("tot3").innerHTML = Math.round((lose_B1 + lose_B2 + win_B3 + F) * 100) / 100;
        Gtot = Math.min(G1, G2, G3);
        
}}