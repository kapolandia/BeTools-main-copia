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

function getResults(){
    let isCR = checkRimborso();
    checkStrumentoAvanzato();
    checkIndicazioni();
    importoRimborso = document.getElementById('importoRimborso').value;

    if(isCR && importoRimborso != 0){
        crPuntaBanca();
    } else{
        normalPuntaBanca();
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
        maggCont.classList.remove("display-none");
        puntataAvanzata.classList.remove("display-none");
        sbilanciamento.classList.remove("display-none");
        isAvanzato = true;
    }
}

function checkRimborso() {
    selectRimborso = document.getElementById("tipologia").value;
    let formRimborso = document.getElementById("rimborso-importo");

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
    let quotaPuntataBackup = null
    if(isAvanzato){
        quotaPuntataBackup = quotaPuntata;
        if(maggiorazione != 0){
            console.log(quotaPuntata);
            quotaPuntata =  parseInt(quotaPuntata) + ((quotaPuntata - 1) * maggiorazione / 100);;
        }
        quotaBancata2 = (((quotaPuntata * importoPuntata) / (quotaBancata - commissione / 100)) *(sbilanciamentoValue / 100));
    } else{
        quotaBancata2 = (((quotaPuntata * importoPuntata) / (quotaBancata - commissione / 100)));
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
    } else if (guadagnoMinimo > 0) {
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
    } else if (guadagnoMinimo > 0) {
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