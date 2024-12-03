const image = document.querySelector('.rotatable-image');

image.addEventListener('click', () => {
    image.classList.remove('rotate');
    void image.offsetWidth; // Force a reflow to remove the existing class
    image.classList.add('rotate');
});






function increaseBoxShadow() {
    var button = document.querySelector('.buttonrtp');
    button.style.boxShadow = '0px 4px 20px #00000050';
}

function resetBoxShadow() {
    var button = document.querySelector('.buttonrtp');
    button.style.boxShadow = '0px 2px 10px #00000030';
}

function runFunction(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Call your function here
        getResults();
    }
}

let stoploss;
let ev;
let roi;

function getResults() {
    var omega, cap, meta, takeprofit, spinminore;

    var saldoAttuale = parseFloat(document.getElementById("saldo-iniziale").value);
    var importoRimborso = parseFloat(document.getElementById("importo-rimborso").value);
    var percentualeRimbors = parseFloat(document.getElementById("percentuale-rimborso").value);
    var wagering = parseFloat(document.getElementById("wagering").value);
    var rtp = parseFloat(document.getElementById("rtp").value);
    var percentualeRimborso = percentualeRimbors * 0.01;
    var rtpslot = rtp * 0.01;

    var strat = document.getElementById("strat");
    var volat = document.getElementById("volat");
    volatilita = volat.value;
    strategia = strat.value;

    if (volatilita === "BASSA") {
        omega = 4;
    } else if (volatilita === "MEDIA") {
        omega = 8;
    } else if (volatilita === "ALTA") {
        omega = 15;
    }

    if (strategia === "MODERATA") {
        meta = 4;
    } else if (strategia === "STANDARD") {
        meta = 5;
    } else if (strategia === "AGGRESSIVA") {
        meta = 6;
    }

    ev = (importoRimborso * (meta - (3 - percentualeRimborso * 2)) / meta) + (importoRimborso / percentualeRimborso) * (rtpslot - 1) - (wagering * importoRimborso * 0.01);
    roi = ((importoRimborso / percentualeRimborso + ev) / (importoRimborso / percentualeRimborso)) * 10;
    stoploss = importoRimborso / percentualeRimborso * -1;
    takeprofit = importoRimborso * meta + stoploss;
    spinminore = (takeprofit - stoploss) / omega;

    document.getElementById("spinminore").innerHTML = spinminore.toFixed(2) + "€";
    document.getElementById("ev").innerHTML = ev.toFixed(2);
    document.getElementById("roi").innerHTML = roi.toFixed(2);
    document.getElementById("takeprofit").innerHTML = takeprofit.toFixed(2);
    document.getElementById("stoploss").innerHTML = stoploss.toFixed(2);


}

function checkPromo() {

    var winbanner = document.getElementById("promowin");
    winbanner.style.display = "none";
    var loosebanner = document.getElementById("promoloose");
    loosebanner.style.display = "none";
    var saldoIniziale = parseFloat(document.getElementById("saldo-iniziale").value);
    var saldoAttuale = parseFloat(document.getElementById("saldo-attuale").innerHTML);
    var takeprofit = parseFloat(document.getElementById("takeprofit").innerHTML);
    var stoploss = parseFloat(document.getElementById("stoploss").innerHTML);


    var saldoprofit = saldoIniziale + takeprofit;
    var saldoloss = saldoIniziale + stoploss;

    if (saldoAttuale >= saldoprofit) {
        winbanner.style.display = "flex";

    }

    if (saldoloss >= saldoAttuale) {
        loosebanner.style.display = "flex";

    }
}


function win() {
    if(!started){
        return;
    }
    var win = parseFloat(document.getElementById("rtpwin").value);
    var winbanner = document.getElementById("promowin")
    winbanner.style.display = "none";
    var saldoIniziale = parseFloat(document.getElementById("saldo-iniziale").value)
    var saldoAttuale = parseFloat(document.getElementById("saldo-attuale").innerHTML);
    var takeprofit = parseFloat(document.getElementById("takeprofit").innerHTML);
    console.log(win);
    if (!isNaN(win)) {
        document.getElementById("saldo-attuale").innerHTML = (saldoAttuale + win).toFixed(2);
    }
    var value = document.getElementById("rtpwin");
    value.value = "";

    checkPromo();
    chooseSpin();
}

function rtploss() {
    if(!started){
        return;
    }
    var win = parseFloat(document.getElementById("rtploss").value);
    var winbanner = document.getElementById("promowin")
    winbanner.style.display = "none";
    var saldoIniziale = parseFloat(document.getElementById("saldo-iniziale").value)
    var saldoAttuale = parseFloat(document.getElementById("saldo-attuale").innerHTML);
    var takeprofit = parseFloat(document.getElementById("takeprofit").innerHTML);
    console.log(win);
    if (!isNaN(win)) {
        document.getElementById("saldo-attuale").innerHTML = win.toFixed(2);
    }
    var value = document.getElementById("rtploss");
    value.value = "";

    checkPromo();
    chooseSpin();
}

function findSiblingValue(index) {
    var siblingIndex = index + 1;
    var siblingElement = document.getElementById("spin" + siblingIndex);
    var leftSiblingIndex = index - 1;
    var leftSiblingElement = document.getElementById("spin" + leftSiblingIndex);
    
    if (siblingElement && siblingElement.value !== "") {
        return parseFloat(siblingElement.value);
    } else if (leftSiblingElement && leftSiblingElement.value !== "") {
        return parseFloat(leftSiblingElement.value);
    }
    
    return NaN;
}

function chooseSpin(result) {
    for (var i = 1; i <= 7; i++) {
        var spinValue = parseFloat(document.getElementById("spin" + i).value);
        var spinElement = document.getElementById("spin" + i);
        
        if (isNaN(spinValue)) {
            var siblingValue = findSiblingValue(i);
            if (!isNaN(siblingValue)) {
                spinValue = siblingValue;
                spinElement.value = siblingValue;
                spinElement.innerHTML = siblingValue;
            }
        }
    }

    var spin1 = parseFloat(document.getElementById("spin1").value);
    var spin2 = parseFloat(document.getElementById("spin2").value);
    var spin3 = parseFloat(document.getElementById("spin3").value);
    var spin4 = parseFloat(document.getElementById("spin4").value);
    var spin5 = parseFloat(document.getElementById("spin5").value);
    var spin6 = parseFloat(document.getElementById("spin6").value);
    var spin7 = parseFloat(document.getElementById("spin7").value);


    var spin1Element = document.getElementById("spin1");
    var spin2Element = document.getElementById("spin2");
    var spin3Element = document.getElementById("spin3");
    var spin4Element = document.getElementById("spin4");
    var spin5Element = document.getElementById("spin5");
    var spin6Element = document.getElementById("spin6");
    var spin7Element = document.getElementById("spin7");
    var saldoIniziale = parseFloat(document.getElementById("saldo-iniziale").value);
    var saldoAttuale = parseFloat(document.getElementById("saldo-attuale").innerHTML);
    var takeprofit = parseFloat(document.getElementById("takeprofit").innerHTML);
    var volat = document.getElementById("volat");
    volatilita = volat.value;
    spin1Element.style.backgroundColor = "#fff"
    spin2Element.style.backgroundColor = "#fff"
    spin3Element.style.backgroundColor = "#fff"
    spin4Element.style.backgroundColor = "#fff"
    spin5Element.style.backgroundColor = "#fff"
    spin6Element.style.backgroundColor = "#fff"
    spin7Element.style.backgroundColor = "#fff"

    spin1Element.style.boxShadow = "none";
    spin2Element.style.boxShadow = "none";
    spin3Element.style.boxShadow = "none";
    spin4Element.style.boxShadow = "none";
    spin5Element.style.boxShadow = "none";
    spin6Element.style.boxShadow = "none";
    spin7Element.style.boxShadow = "none";

    if (volatilita === "BASSA") {
        omega = 4;
    } else if (volatilita === "MEDIA") {
        omega = 8;
    } else if (volatilita === "ALTA") {
        omega = 15;
    }

    var trueSpin = (saldoIniziale - saldoAttuale + takeprofit) / omega;

    let giocato = saldoIniziale - saldoAttuale;
    let saldoDaGiocare = -stoploss-giocato;

    let spinFinaleValue;
    if (trueSpin < spin2) {
        spin1Element.style.backgroundColor = "#5865f12b";
        spin1Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
        spinFinaleValue = spin1;
    } else if (trueSpin >= spin2 && trueSpin < spin3) {
        spin2Element.style.backgroundColor = "#5865f12b";
        spin2Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
        spinFinaleValue = spin2;
    } else if (trueSpin >= spin3 && trueSpin < spin4) {
        spin3Element.style.backgroundColor = "#5865f12b";
        spin3Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
        spinFinaleValue = spin3;
    } else if (trueSpin >= spin4 && trueSpin < spin5) {
        spin4Element.style.backgroundColor = "#5865f12b";
        spin4Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
        spinFinaleValue = spin4;
    } else if (trueSpin >= spin5 && trueSpin < spin6) {
        spin5Element.style.backgroundColor = "#5865f12b";
        spin5Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
        spinFinaleValue = spin5;
    } else if (trueSpin >= spin6 && trueSpin < spin7) {
        spin6Element.style.backgroundColor = "#5865f12b";
        spin6Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
        spinFinaleValue = spin6;
    } else if (trueSpin >= spin7) {
        spin7Element.style.backgroundColor = "#5865f12b";
        spin7Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
        spinFinaleValue = spin7;
    }
    console.log(saldoDaGiocare);
    
    if(spinFinaleValue > saldoDaGiocare){
        for (var i = 1; i <= 7; i++) {
            var spinElement = document.getElementById("spin" + i);
            spinElement.style.backgroundColor = "#fff";
            spinElement.style.boxShadow = "none";
        }
        
        if(saldoDaGiocare >= spin7){
            spin7Element.style.backgroundColor = "#5865f12b";
            spin7Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
            spinFinaleValue = spin7;
        } else if(saldoDaGiocare > spin6){
            spin7Element.style.backgroundColor = "#5865f12b";
            spin7Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
            spinFinaleValue = spin7;
        } else if(saldoDaGiocare > spin5){
            spin6Element.style.backgroundColor = "#5865f12b";
            spin6Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
            spinFinaleValue = spin6;
        } else if(saldoDaGiocare > spin4){
            spin5Element.style.backgroundColor = "#5865f12b";
            spin5Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
            spinFinaleValue = spin5;
        } else if(saldoDaGiocare > spin3){
            spin4Element.style.backgroundColor = "#5865f12b";
            spin4Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
            spinFinaleValue = spin4;
        } else if(saldoDaGiocare > spin2){
            spin3Element.style.backgroundColor = "#5865f12b";
            spin3Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
            spinFinaleValue = spin3;
        } else{
            spin2Element.style.backgroundColor = "#5865f12b";
            spin2Element.style.boxShadow = "0px 0px 15px 0px #5865f1";
            spinFinaleValue = spin2;
        }
    }
    console.log(spinFinaleValue);
    
    return spinFinaleValue;

}

function spin() {
    var result = chooseSpin();
    var saldoAttuale = parseFloat(document.getElementById("saldo-attuale").innerHTML);
    document.getElementById("saldo-attuale").innerHTML = (saldoAttuale - result).toFixed(2);
    checkPromo();
    chooseSpin();
}

let started = false;

function display() {
    var saldoAttuale = parseFloat(document.getElementById("saldo-iniziale").value);
    let errorRtp = document.getElementById("error-rtp");
    let playBtn = document.getElementById("inizia-rtp-btn");
    console.log(saldoAttuale, stoploss);
    // Check if saldoAttuale is NaN, and if it is, return without executing the rest of the code
    if (isNaN(saldoAttuale) || saldoAttuale === 0) {
        errorRtp.style.display = "block";
        return;
    }

    let stoplossReversed = stoploss *(-1);
    if(saldoAttuale < stoplossReversed|| isNaN(stoploss)) {
        errorRtp.style.display = "block";
        return;
    }

    var spin1 = parseFloat(document.getElementById("spin1").value);
    var spin2 = parseFloat(document.getElementById("spin2").value);
    var spin3 = parseFloat(document.getElementById("spin3").value);
    var spin4 = parseFloat(document.getElementById("spin4").value);
    var spin5 = parseFloat(document.getElementById("spin5").value);
    var spin6 = parseFloat(document.getElementById("spin6").value);
    var spin7 = parseFloat(document.getElementById("spin7").value);

    if (isNaN(spin1) && isNaN(spin2) && isNaN(spin3) && isNaN(spin4) && isNaN(spin5) && isNaN(spin6) && isNaN(spin7)) {
        // All of the spin variables are NaN
        console.log("All spin variables are NaN.");
        errorRtp.style.display = "block";
        return;
    }

    errorRtp.style.display = "none";
    playBtn.style.display = "none";

    var div = document.getElementById("nodisplay");
    var div2 = document.getElementById("footer");
    div.style.display = "none";
    div2.style.marginTop = "190px";

    // Rest of your code to display saldoAttuale
    var saldoAttualeElement = document.getElementById("saldo-attuale");
    saldoAttualeElement.innerHTML = saldoAttuale;
    started = true;
}

function rtpModalInfo(){
    if(started){
        const esitoAgenda = document.getElementById("esito-agenda");
        const ritornoAgenda = parseInt(document.getElementById("ritorno-agenda").value);
        let saldoIniziale = parseFloat(document.getElementById("saldo-iniziale").value);
        let saldoAttuale = parseFloat(document.getElementById("saldo-attuale").innerHTML);

        if(saldoIniziale > saldoAttuale){
            esitoAgenda.value = "perso";
        } else {
            esitoAgenda.value = "vinto";
        }
        var inputElement = document.getElementById('ritorno-agenda');
        inputElement.value =  saldoAttuale - saldoIniziale;
    }
}

