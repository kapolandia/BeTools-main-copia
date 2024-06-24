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

let impostazioniTipologia = "NORMALE";
let impostazioniEventi = 3;
let impostazioniDecimali = false;
let impostazioniCambiaPuntate = false;

//risultati

let rating = null;
let guadagnoMinimo = null;

console.log({
    puntataBookA,
    puntataBookB,
    puntataBookC,
    puntataBookD,
    puntataBookE,
    potenziamentoBookA,
    potenziamentoBookB,
    potenziamentoBookC,
    potenziamentoBookD,
    potenziamentoBookE,
    quotaBookA,
    quotaBookB,
    quotaBookC,
    quotaBookD,
    quotaBookE,
    impostazioniTipologia,
    impostazioniEventi,
    impostazioniDecimali,
    impostazioniCambiaPuntate,
    rating,
    guadagnoMinimo
});

function getResults(){
    let checkPotenziamentoVar = checkPotenziamento();
    checkTipologia();
    checkEventi();
    checkIndicazioni();
    checkPuntateBloccate();
    let tipologia = checkRimborso();
}

function checkPotenziamento(){
    let selectValue = document.getElementById("potenziamento-quote").value;
    let potenziamentoCol = document.getElementById("col-potenziate");
    if(selectValue == "SI"){
        potenziamentoCol.classList.remove("display-none");
        return true;
    } else{
        potenziamentoCol.classList.add("display-none");
        return false;
    }
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
        quotabookD.classList.add("display-none");
        quotabookE.classList.remove("display-none");
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
}

function checkPuntateBloccate(){
    let puntateBloccate = document.getElementById("three-1");
    let puntateModificabili = document.getElementById("three-2");
    let inputs = ["book-b", "book-c", "book-d", "book-e"];

    inputs.forEach(id => {
        let input = document.getElementById(id);
        if(puntateBloccate.checked){
            input.classList.add("input-disabled");
            input.disabled = true; // Disable the input
        } else if(puntateModificabili.checked){
            input.classList.remove("input-disabled");
            input.disabled = false; // Enable the input
        }
    });
}

function checkRimborso(){
    let selectRimborso = document.getElementById("tipologia").value;
    let wrapperRimborso = document.getElementById("wrapper-rimborso");
    if(selectRimborso == "RIMBORSO"){
        wrapperRimborso.classList.remove("display-none");
    } else {
        wrapperRimborso.classList.add("display-none");
    }
    return (selectRimborso);
}
