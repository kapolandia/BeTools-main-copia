var IsQuotaSlot = false;


function getResults() {
    var bonusPendente = parseFloat(document.getElementById("bonus-pendente").value);
    var wagering = parseFloat(document.getElementById("wagering").value);
    var contribuzione = parseFloat(document.getElementById("contribuzione-slot").value);
    var rtp = parseFloat(document.getElementById("rtp-slot").value);
    var importoSpin = parseFloat(document.getElementById("importo-spin").value);
    var deposito = parseFloat(document.getElementById("deposito").value);
    
    

    var pDraw;

    if (this.isQuotaSlot === false) {
        var wageringRichiesto = bonusPendente * (wagering / contribuzione) * 100;
    } else {
        var wageringRichiesto = deposito * (wagering / contribuzione) * 100;
    }

    var costoStatistico = wageringRichiesto * (100 - rtp) / 100;

    var volume = document.getElementById('volatilita'); // Get the select element by its ID
    var vol = volume.options[volume.selectedIndex];
    console.log(vol.innerHTML);

    if (vol.innerHTML === "BASSA") {

        pDraw = wageringRichiesto * (rtp / 100 - 1 - (20 / (0.6 + wageringRichiesto / importoSpin / 2000)) / 100) + bonusPendente;

    } else if (vol.innerHTML === "MEDIA" || vol.innerHTML === "N/D") {

        pDraw = wageringRichiesto * (rtp / 100 - 1 - (40 / (0.6 + wageringRichiesto / importoSpin / 2000)) / 100) + bonusPendente;

    } else if (vol.innerHTML === "ALTA") {

        pDraw = wageringRichiesto * (rtp / 100 - 1 - (60 / (0.6 + wageringRichiesto / importoSpin / 2000)) / 100) + bonusPendente;

    }

    var rischio;
    if (pDraw < -50) {
        rischio = "Alto";
    } else if (pDraw > -10) {
        rischio = "Basso";
    } else {
        rischio = "Medio";
    }

    var ev = bonusPendente - costoStatistico;
    var roi = (wageringRichiesto + ev) / wageringRichiesto * 100;

    var wageringElement = document.getElementById("volume-richiesto");
    wageringElement.innerHTML = wageringRichiesto.toFixed(2);

    var costoStatisticoElement = document.getElementById("costo-statistico");
    costoStatisticoElement.innerHTML = costoStatistico.toFixed(2);

    

    var rischioElement = document.getElementById("rischio");
    rischioElement.innerHTML = rischio;

    var evElement = document.getElementById("ev");
    evElement.innerHTML = ev.toFixed(2);

    var roiELement = document.getElementById("roi");
    roiELement.innerHTML = roi.toFixed(2);
}

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");

    setTimeout(function () {
        closePop();
    }, 5000);
}

function closePop() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

function quotaMinima() {
    var quotaMinimaElement = document.getElementById("quotaMinima");

    if (this.isQuotaSlot === false) {
        this.isQuotaSlot = true;
        quotaMinimaElement.innerHTML = "Wagering sul deposito:";
        getResults();
    } else {
        this.isQuotaSlot = false;
        quotaMinimaElement.innerHTML = "Wagering sul bonus:";
        getResults();
    }
}
