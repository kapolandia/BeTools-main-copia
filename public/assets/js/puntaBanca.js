let importoPuntata = null;
let importoRimborso = null;
let quotaPuntata = null;
let quotaBancata = null;
let commissione = null;
let maggiorazione = null;

function getResults(){
    checkRimborso();
    checkStrumentoAvanzato();
    checkIndicazioni();
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
    } else if(avanzato.checked){
        maggCont.classList.remove("display-none");
        puntataAvanzata.classList.remove("display-none");
        sbilanciamento.classList.remove("display-none");
    }
}

function checkRimborso() {
    let selectRimborso = document.getElementById("tipologia").value;
    let formRimborso = document.getElementById("rimborso-importo");
    let rimborsoCr = document.getElementById("rimborso-cr");

    if (selectRimborso == "RIMBORSO"){
        formRimborso.classList.remove("display-none");
        rimborsoCr.classList.remove("display-none");
    } else{
        formRimborso.classList.add("display-none");
        rimborsoCr.classList.add("display-none");
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
        console.log("One or more elements are null");
        indicazioniAlert.classList.remove("display-none");
        indicazoniContainer.classList.add("display-none");
        riepilogoContainer.classList.add("display-none");
        return;
    }

    importoPuntata = importoPuntataElement;
    importoRimborso = importoRimborsoElement;
    quotaPuntata = quotaPuntataElement;
    quotaBancata =  quotaBancataElement;
    commissione =  commissioneElement;
    maggiorazione = maggiorazioneElement;

    indicazioniAlert.classList.add("display-none");
    indicazoniContainer.classList.remove("display-none");
    riepilogoContainer.classList.remove("display-none");
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
});

// rangeInput.addEventListener('input', function() {
//     rangeValue.value = rangeInput.value;
//     if(rangeValue.value < 100){
//         rangeInput.style.accentColor = "#5865f1";
//     } else if (rangeValue.value > 100){
//         rangeInput.style.accentColor = "rgb(255, 126, 126)";
//     }
// });