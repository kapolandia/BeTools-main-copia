let importoPuntata = null;
let importoRimborso = null;
let quotaPuntata = null;
let quotaBancata = null;
let commissione = null;
let maggiorazione = null;
let selectRimborso = document.getElementById("tipologia").value;
let sbilanciamentoValue = null;
let isAvanzato;

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
    console.log(isAvanzato);
    
    if(!isAvanzato){
        if(isCR && importoRimborso != 0){
            crPuntaBanca();
        } else{
            normalPuntaBanca();
        }
        updateTableStriping();
    } else if(isAvanzato){
        isAvanzato = false;
    }
}

function checkStrumentoAvanzato(){
    let base = document.getElementById("three-1");
    let avanzato = document.getElementById("three-2");
    let maggCont = document.getElementById("maggiorazione-container");
    let puntataAvanzata = document.getElementById("puntata-avanzata");
    let sbilanciamento = document.getElementById("sbilanciamento-bancata-container");

    if(base.checked){
        maggCont.classList.add("display-none");
        puntataAvanzata.classList.add("display-none");
        sbilanciamento.classList.add("display-none");
        isAvanzato = false;
    } else if(avanzato.checked){
        isAvanzato = true;
        setTimeout(() => {
            base.click();  // Simula il clic su "Base"
        }, 1000); // Cambia il tempo come desideri
    }
}

function checkRimborso() {
    selectRimborso = document.getElementById("tipologia").value;
    let formRollover = document.getElementById("rollover-form");
    let formRimborso = document.getElementById("rimborso-importo");

    if(selectRimborso == "BONUS"){
        formRollover.classList.remove("display-none");
    } else{
        formRollover.classList.add("display-none");
    }

    if (selectRimborso == "RIMBORSO"){
        formRimborso.classList.remove("display-none");
        return true;
    } else{
        formRimborso.classList.add("display-none");
        return false;
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

function normalPuntaBanca(){
    console.log(maggiorazione);
    sbilanciamentoValue = document.getElementById('sbilanciamento-value').value;
    let labelPuntata = document.getElementById("importo-bonus");
    let quotaBancata2 = null;
    let quotaPuntataBackup = null;
    let rollover = parseFloat(document.getElementById("importoRollover").value);
    if(isAvanzato){
        quotaPuntataBackup = quotaPuntata;
        if(maggiorazione != 0){
            console.log(quotaPuntata);
            quotaPuntata =  parseInt(quotaPuntata) + ((quotaPuntata - 1) * maggiorazione / 100);;
        }
        if(selectRimborso == "BONUS"){
            quotaBancata2 = ((((quotaPuntata * importoPuntata) - (5*importoPuntata*(rollover-1) / 100))  / (quotaBancata - commissione / 100)) *(sbilanciamentoValue / 100));
        }else{
            quotaBancata2 = (((quotaPuntata * importoPuntata) / (quotaBancata - commissione / 100)) *(sbilanciamentoValue / 100));
        }
    } else{
        if(selectRimborso =="BONUS"){
            quotaBancata2 = ((((quotaPuntata * importoPuntata)- (5*importoPuntata*(rollover-1) / 100)) / (quotaBancata - commissione / 100)));
        } else{
            quotaBancata2 = (((quotaPuntata * importoPuntata) / (quotaBancata - commissione / 100)));
        }
    }
    let quotaPuntaEq = ((quotaBancata - commissione / 100) / (quotaBancata - 1));
    let rating = ((importoPuntata*quotaPuntata - importoPuntata - (((quotaPuntata*importoPuntata)/(quotaBancata - commissione / 100)) * quotaBancata - (quotaPuntata*importoPuntata) / (quotaBancata - commissione / 100)) + importoPuntata) / importoPuntata) *100;
    let responsabilita = quotaBancata2 * quotaBancata - quotaBancata2;
    let book = quotaPuntata * importoPuntata - importoPuntata;
    let noExchange = responsabilita * (-1);
    let noBook = importoPuntata * (-1);
    let totExchange = quotaBancata2 - (quotaBancata2 * (commissione / 100));
    let vinceBook = book + noExchange;
    console.log(vinceBook);
    let vinceExchange = noBook + totExchange;

    let rowCr = document.getElementById("cr-row");
    rowCr.classList.add("display-none");
    if(selectRimborso == "BONUS"){
        labelPuntata.innerHTML = "Importo Bonus";
        book = quotaPuntata * importoPuntata;
        vinceBook = book + noExchange;
        noBook = 0;
        vinceExchange = noBook + totExchange;
        console.log(vinceBook);
    } else{
        labelPuntata.innerHTML = "Importo Puntata";
    }
    vinceBook = Math.round(vinceBook * 100) / 100;
    vinceExchange = Math.round(vinceExchange * 100) / 100;
    let guadagnoMinimo = Math.min(vinceExchange, vinceBook);
    guadagnoMinimo = formatToTwoDecimals(guadagnoMinimo);
    responsabilita = formatToTwoDecimals(responsabilita);
    //visualizzazione dati
    document.getElementById("rating").innerHTML = Math.round((100 + rating)*100 )/100;
    document.getElementById("cr-rating").innerHTML = "Rating";
    document.getElementById("responsabilita").innerHTML = Math.round((responsabilita)*100 )/100;
    document.getElementById("punta-eq").value = Math.round(quotaPuntaEq*1000)/1000;
    if(guadagnoMinimo < 0){
        document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
        document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
    } else if (guadagnoMinimo >= 0) {
        document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
        document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
    }
    document.getElementById("guadagno").innerHTML = guadagnoMinimo;
    document.getElementById("bancata-input").value = formatToTwoDecimals(quotaBancata2) + " €";
    document.getElementById("quota-bancata-2").value = formatToTwoDecimals(quotaBancata);
    document.getElementById("puntata-input").value = formatToTwoDecimals(importoPuntata) + " €";
    if(quotaPuntataBackup != quotaPuntata && quotaPuntataBackup != null){
        document.getElementById("quota-puntata-2").value = formatToTwoDecimals(quotaPuntataBackup) + String.fromCharCode(8594) + formatToTwoDecimals(quotaPuntata);
    } else {
        document.getElementById("quota-puntata-2").value = formatToTwoDecimals(quotaPuntata);
    }

    //inserimento risultati tabella
    document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(book);
    document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(noBook);

    document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(noExchange);
    document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(totExchange);
    
    //inserimento totale
    document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(vinceBook);
    document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(vinceExchange);
    updateElement("totale-1", vinceBook);
    updateElement("totale-2", vinceExchange);
}

function crPuntaBanca(){
    sbilanciamentoValue = document.getElementById('sbilanciamento-value').value;
    importoRimborso = document.getElementById('importoRimborso').value;
    importoRimborso = parseInt(importoRimborso);
    console.log(importoRimborso);
    let quotaBancata2 = null;
    let quotaPuntataBackup = null
    if(isAvanzato){
        quotaPuntataBackup = quotaPuntata;
        if(maggiorazione != 0){
            quotaPuntata =  parseInt(quotaPuntata) + ((quotaPuntata - 1) * maggiorazione / 100);;
        }
        quotaBancata2 = (((quotaPuntata * importoPuntata - importoRimborso) / (quotaBancata - commissione / 100)) *(sbilanciamentoValue / 100));
    } else{
        quotaBancata2 = (((quotaPuntata * importoPuntata - importoRimborso) / (quotaBancata - commissione / 100)));
    }
    let quotaPuntaEq = ((quotaBancata - commissione / 100) / (quotaBancata - 1));
    let rating = ((importoPuntata*quotaPuntata - importoPuntata - (((quotaPuntata*importoPuntata)/(quotaBancata - commissione / 100)) * quotaBancata - (quotaPuntata*importoPuntata) / (quotaBancata - commissione / 100)) + importoPuntata) / importoPuntata) *100;
    let responsabilita = quotaBancata2 * quotaBancata - quotaBancata2;
    
    let rowCr = document.getElementById("cr-row");
    rowCr.classList.remove("display-none");
    let book = quotaPuntata * importoPuntata - importoPuntata;
    let noExchange = responsabilita * (-1);
    let noBook = importoPuntata * (-1);
    let totExchange = quotaBancata2 - (quotaBancata2 * (commissione / 100));
    console.log(totExchange);
    let vinceBook = book + noExchange;
    let crRating = ((importoPuntata * quotaPuntata - importoPuntata - (((quotaPuntata * importoPuntata - importoRimborso)/(quotaBancata - commissione /100)) * quotaBancata - (quotaPuntata * importoPuntata - importoRimborso)/(quotaBancata-commissione/100))) / importoRimborso) *100;
    let vinceExchange = noBook + totExchange + importoRimborso;
    console.log(vinceExchange);
    vinceBook = Math.round(vinceBook * 100) / 100;
    vinceExchange = Math.round(vinceExchange * 100) / 100;
    let guadagnoMinimo = Math.min(vinceExchange, vinceBook);

    //visualizzazione dati
    document.getElementById("rating").innerHTML = Math.round((100 + rating)*100 )/100;
    document.getElementById("responsabilita").innerHTML = formatToTwoDecimals(responsabilita);
    document.getElementById("punta-eq").value = Math.round(quotaPuntaEq*1000)/1000;
    if(guadagnoMinimo < 0){
        document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
        document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
    } else if (guadagnoMinimo >= 0) {
        document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
        document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
    }
    document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoMinimo);
    document.getElementById("cr-rating").innerHTML = "CR";
    document.getElementById("rating").innerHTML = formatToTwoDecimals(crRating);
    document.getElementById("bancata-input").value = formatToTwoDecimals(quotaBancata2) + " €";
    document.getElementById("quota-bancata-2").value = formatToTwoDecimals(quotaBancata);
    document.getElementById("puntata-input").value = formatToTwoDecimals(importoPuntata) + " €";
    if(quotaPuntataBackup != quotaPuntata && quotaPuntataBackup != null){
        document.getElementById("quota-puntata-2").value = formatToTwoDecimals(quotaPuntataBackup) + String.fromCharCode(8594) + formatToTwoDecimals(quotaPuntata);
    } else {
        document.getElementById("quota-puntata-2").value = formatToTwoDecimals(quotaPuntata);
    }

    //inserimento risultati tabella
    document.getElementById("row-a-1").innerHTML = "+"+formatToTwoDecimals(book);
    document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(noBook);

    document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(noExchange);
    document.getElementById("row-b-2").innerHTML = "+"+formatToTwoDecimals(totExchange);

    document.getElementById("row-cr-1").innerHTML = "+0.00";
    document.getElementById("row-cr-2").innerHTML = "+"+formatToTwoDecimals(importoRimborso);
    
    //inserimento totale
    document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(vinceBook);
    document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(vinceExchange);
    updateElement("totale-1", vinceBook);
    updateElement("totale-2", vinceExchange);
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

// rangeInput.addEventListener('input', function() {
//     rangeValue.value = rangeInput.value;
//     if(rangeValue.value < 100){
//         rangeInput.style.accentColor = "#5865f1";
//     } else if (rangeValue.value > 100){
//         rangeInput.style.accentColor = "rgb(255, 126, 126)";
//     }
// });