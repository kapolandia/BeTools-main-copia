function getResults() {
    var bonusIniziale = parseFloat(document.getElementById("bonus-input").value);
    var wagIniziale = parseFloat(document.getElementById("wagering-input").value);
    var slotIniziale = parseFloat(document.getElementById("contribuzione-input").value);
    var capIniziale = parseFloat(document.getElementById("cap-input").value);
    var rollIniziale = parseFloat(document.getElementById("roll-input").value);
    var rtpIniziale = parseFloat(document.getElementById("rtp-input").value);
    var funbonusIniziale = parseFloat(document.getElementById("funbonus-input").value);

    var wageringReale = (wagIniziale / slotIniziale) * 100;
    var volumeRichiesto = wageringReale * bonusIniziale * ((100 - rollIniziale) / 100);

    var coefficienteElite;
    if (volumeRichiesto > 200) {
        coefficienteElite = 1 + (1 - rtpIniziale / 100 + 0.040) * wageringReale - (1 - rtpIniziale / 100 + 0.040) * wageringReale * (rollIniziale / 100);
    } else {
        coefficienteElite = 1 + (1 - rtpIniziale / 100 + 0.040) * wageringReale - (1 - rtpIniziale / 100 + 0.040) * wageringReale * (rollIniziale / 100) * 1.1;
    }

    var targetMinimo = capIniziale / 2 - bonusIniziale + coefficienteElite * bonusIniziale;

    var probMone;
    if (targetMinimo > 300) {
        probMone = (bonusIniziale / targetMinimo * 100) * 0.8;
    } else {
        probMone = (bonusIniziale / targetMinimo * 100) * 0.7;
    }

    var guadagno;
    if (bonusIniziale > capIniziale) {
        guadagno = (capIniziale * probMone / 100) * 0.8;
    } else {
        guadagno = ((bonusIniziale + capIniziale) / 2 * (probMone / 100)) * 0.8;
    }

    var guadagno1 = document.getElementById("guadagno1");
    guadagno1.innerHTML = guadagno.toFixed(2);

    var wageringReale1 = document.getElementById("wageringReale1");
    wageringReale1.innerHTML = wageringReale.toFixed(2);

    var volumeRichiesto1 = document.getElementById("volumeRichiesto1");
    volumeRichiesto1.innerHTML = volumeRichiesto.toFixed(2);

    var targetMinimo1 = document.getElementById("targetMinimo1");
    targetMinimo1.innerHTML = targetMinimo.toFixed(2);

    var probMone1 = document.getElementById("probMone1");
    probMone1.innerHTML = probMone.toFixed(2);

    var selectedOption = document.getElementById("selezione");
    var spin = document.getElementById("spin");
    var backupspin;

    if (selectedOption.innerHTML === "BASSA") {
        if (((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600) > (targetMinimo / 600)) {
            backupspin = ((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600);
            spin.innerHTML = backupspin.toFixed(2);
            document.getElementById("eur").innerHTML = "€";
        } else {
            backupspin = "Spin Minimo!";
            spin.innerHTML = backupspin;
            document.getElementById("eur").innerHTML = "";
        }

    } else if (selectedOption.innerHTML === "MEDIO-BASSA") {
        if (((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600) > (targetMinimo / 600)) {
            backupspin = (((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600) + ((targetMinimo - funbonusIniziale) / 170) + (targetMinimo / 1700)) / 2;
            spin.innerHTML = backupspin.toFixed(2);
            document.getElementById("eur").innerHTML = "€";
        } else {
            backupspin = "Spin Minimo!";
            spin.innerHTML = backupspin;
            document.getElementById("eur").innerHTML = "";
        }

    } else if (selectedOption.innerHTML === "MEDIA") {
        if (((targetMinimo - funbonusIniziale) / 170) + (targetMinimo / 1700) > (targetMinimo / 1700)) {
            backupspin = ((targetMinimo - funbonusIniziale) / 170) + (targetMinimo / 1700);
            spin.innerHTML = backupspin.toFixed(2);
            document.getElementById("eur").innerHTML = "€";
        } else {
            backupspin = "Spin Minimo!";
            spin.innerHTML = backupspin;
            document.getElementById("eur").innerHTML = "";

        }
    } else if (selectedOption.innerHTML === "MEDIO-ALTA") {
        if (((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600) > (targetMinimo / 600)) {
            backupspin = ((((targetMinimo - funbonusIniziale) / 500) + (targetMinimo / 5000)) + ((targetMinimo - funbonusIniziale) / 170) + (targetMinimo / 1700)) / 2;
            spin.innerHTML = backupspin.toFixed(2);
            document.getElementById("eur").innerHTML = "€";
        } else {
            backupspin = "Spin Minimo!";
            spin.innerHTML = backupspin;
            document.getElementById("eur").innerHTML = "";
        }

    } else if (selectedOption.innerHTML === "ALTA") {
        if ((((targetMinimo - funbonusIniziale) / 500) + (targetMinimo / 5000)) > (targetMinimo / 5000)) {
            backupspin = (((targetMinimo - funbonusIniziale) / 500) + (targetMinimo / 5000));
            spin.innerHTML = backupspin.toFixed(2);
            document.getElementById("eur").innerHTML = "€";

        } else {
            backupspin = "Spin Minimo!";
            spin.innerHTML = backupspin;
            document.getElementById("eur").innerHTML = "";
        }
    } else if (selectedOption.innerHTML === "BASSA") {
        if (((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600) > (targetMinimo / 600)) {
            backupspin = ((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600);
            spin.innerHTML = backupspin.toFixed(2);
            document.getElementById("eur").innerHTML = "€";
        } else {
            backupspin = "Spin Minimo!";
            spin.innerHTML = backupspin;
            document.getElementById("eur").innerHTML = "";
        }

    } else {
        if (((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600) > (targetMinimo / 600)) {
            backupspin = ((targetMinimo - funbonusIniziale) / 60) + (targetMinimo / 600);
            spin.innerHTML = backupspin.toFixed(2);
            document.getElementById("eur").innerHTML = "€";
        } else {
            backupspin = "Spin Minimo!";
            spin.innerHTML = backupspin;
            document.getElementById("eur").innerHTML = "";
        }

    }

}

function changeSpin() {
    var selectElement = document.getElementById("custom-select");
    var selectedOption = selectElement.value;
    var otherTextElement = document.getElementById("selezione");

    otherTextElement.innerHTML = selectedOption;
}
