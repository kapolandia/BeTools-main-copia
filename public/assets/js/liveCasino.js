let wasBaccarat = true;
let wasRoulette = false;
let tipologiaGiocataGlobal = null;
let tipologiaTavoloGlobal = null;
let puntateModificate = null;
let boolModifica = false;

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

function customRound(value) {
    let decimalPart = value - Math.floor(value);

    if (value >= 1) {
        if (decimalPart <= 0.1) {
            return Math.floor(value);
        } else {
            return Math.ceil(value);
        }
    }

    if (value < 1) {
        let roundedValue = Math.ceil(decimalPart * 10) / 10;
        return roundedValue;
    }

    return Math.ceil(value);
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



function checkTipologia(){
    let tipologiaGiocata = document.getElementById("tipologiaPuntata").value;
    tipologiaGiocataGlobal = tipologiaGiocata;
    let rimborsoRow = document.getElementById("rimborsoRow");
    let crOpt = document.getElementById("crOpt");
    console.log(tipologiaGiocata);
    
    //check cr o normale
    if(tipologiaGiocata == "CR"){
        crOpt.classList.remove("display-none");
        rimborsoRow.classList.remove("display-none");
    } else{
        crOpt.classList.add("display-none");
        rimborsoRow.classList.add("display-none");
    }

    //check rimborso anticipato e puntate modificabili
    let rimborsoNormale = document.getElementById("three-1");
    let rimborsoOttimizzato = document.getElementById("three-2");
    let puntateNormali = document.getElementById("three-3");
    let puntateModificateBtn = document.getElementById("three-4");
    let rimborsoLimite = document.getElementById("rimborsoLimite");
    if(rimborsoNormale.checked){
        console.log("rimborso normale");
        rimborsoLimite.classList.add("display-none");
    } else if(rimborsoOttimizzato.checked){
        console.log("rimborso ott");
        rimborsoLimite.classList.remove("display-none");
    }

    let puntataMod1 = document.getElementById("result-a");
    let puntataMod2 = document.getElementById("result-b");
    let puntataMod3 = document.getElementById("result-c");
    let puntataMod4 = document.getElementById("result-d");
    if(puntateNormali.checked){
        puntateModificate = false;
        puntataMod1.disabled = true;
        puntataMod2.disabled = true;
        puntataMod3.disabled = true;
        puntataMod4.disabled = true;
        puntataMod1.classList.add("input-disabled");
        puntataMod2.classList.add("input-disabled");
        puntataMod3.classList.add("input-disabled");
        puntataMod4.classList.add("input-disabled");
        boolModifica + false
    } else if(puntateModificateBtn.checked){
        puntateModificate = true;
        puntataMod1.disabled = false;
        puntataMod2.disabled = false;
        puntataMod3.disabled = false;
        puntataMod4.disabled = false;
        puntataMod1.classList.remove("input-disabled");
        puntataMod2.classList.remove("input-disabled");
        puntataMod3.classList.remove("input-disabled");
        puntataMod4.classList.remove("input-disabled");
        boolModifica = true;
    }

    let tipologiaCopertura = document.getElementById("tipologiaCopertura");
    let tipologiaTavolo = document.getElementById("tipologiaTavolo").value;
    tipologiaTavoloGlobal = tipologiaTavolo;
    const option2 = tipologiaCopertura.querySelector('option[value="2"]');
    const option3 = tipologiaCopertura.querySelector('option[value="3"]');
    const option4 = tipologiaCopertura.querySelector('option[value="4"]');
    if(tipologiaTavolo == "BACCARAT"){
        option2.disabled = false;
        option3.disabled = true;
        option4.disabled = true;

        if(wasRoulette){
            wasRoulette = false;
            wasBaccarat = true;
            tipologiaCopertura.value = "2";
        }
    } else if(tipologiaTavolo == "ROULETTE" || tipologiaTavolo == "FROULETTE"){
        if(tipologiaTavolo == "ROULETTE"){
            option2.disabled = true;
            option3.disabled = false;
            option4.disabled = false;
        } else{
            if(tipologiaTavolo == "FROULETTE"){
                option2.disabled = true;
                option3.disabled = false;
                option4.disabled = true;
                tipologiaCopertura.value = "3";
            }
        }


        if(wasBaccarat){
            wasBaccarat = false;
            wasRoulette = true;
            tipologiaCopertura.value = "3";
        }
    }

    let resultC = document.getElementById("result-c-cont");
    let resultZero = document.getElementById("result-zero-cont");

    if(tipologiaCopertura.value == 2){
        document.getElementById("play-1").innerHTML = "Player";
        document.getElementById("play-2").innerHTML = "Banco";
        document.getElementById("column-1").innerHTML = "Vince<br>Player";
        document.getElementById("column-2").innerHTML = "Vince<br>Banco";
        document.getElementById("row-a-title").innerHTML = "Player";
        document.getElementById("row-b-title").innerHTML = "Banco";
        document.getElementById("row-c-id").classList.add("display-none");
        document.getElementById("row-zero-id").classList.add("display-none");
        document.getElementById("column-3").classList.add("display-none");
        document.getElementById("column-4").classList.add("display-none");
        // Nascondere la seconda colonna della tabella
        var table = document.getElementById('results-table');
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[3].innerHTML = ''; // La seconda colonna ha index 1
        }
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[4].innerHTML = ''; // La seconda colonna ha index 1
        }
        resultC.classList.add("display-none");
        resultZero.classList.add("display-none");
    } else if(tipologiaCopertura.value == 3){
        document.getElementById("play-1").innerHTML = "Rosso";
        document.getElementById("play-2").innerHTML = "Nero";
        document.getElementById("column-1").innerHTML = "Vince<br>Rosso";
        document.getElementById("column-2").innerHTML = "Vince<br>Nero";
        document.getElementById("row-a-title").innerHTML = "Rosso";
        document.getElementById("row-b-title").innerHTML = "Nero";
        document.getElementById("row-c-id").classList.add("display-none");
        document.getElementById("row-zero-id").classList.remove("display-none");
        document.getElementById("column-3").classList.add("display-none");
        document.getElementById("column-4").classList.remove("display-none");
        resultC.classList.add("display-none");
        resultZero.classList.remove("display-none");
        var table = document.getElementById('results-table');
        for (var i = 0; i < table.rows.length; i++) {
            table.rows[i].cells[4].innerHTML = ''; 
        }
        document.getElementById("column-4").innerHTML = "Vince<br>Zero";

    } else if(tipologiaCopertura.value == 4){
        document.getElementById("play-1").innerHTML = "1 - 12";
        document.getElementById("play-2").innerHTML = "13 - 24";
        document.getElementById("column-1").innerHTML = "Vince<br>1 - 12";
        document.getElementById("column-2").innerHTML = "Vince<br>13 - 24";
        document.getElementById("column-3").innerHTML = "Vince<br>25 - 36";
        document.getElementById("column-4").innerHTML = "Vince<br>Zero";
        document.getElementById("row-a-title").innerHTML = "1 - 12";
        document.getElementById("row-b-title").innerHTML = "13 - 24";
        document.getElementById("row-c-id").classList.remove("display-none");
        document.getElementById("column-3").classList.remove("display-none");
        document.getElementById("column-4").classList.remove("display-none");
        resultC.classList.remove("display-none");
        resultZero.classList.remove("display-none");

    }
    if(tipologiaGiocataGlobal == "CR"){
        document.getElementById("cr-row").classList.remove("display-none");
    } else{
        document.getElementById("cr-row").classList.add("display-none");
    }
    updateTableStriping();
}

function checkIndicazioni(){
    let indicazioniAlert = document.getElementById("indicazioni-alert");
    let indicazioniContainer = document.getElementById("dutcher-indicazioni-container");
    let riepilogoContainer = document.getElementById("dutcher-riepilogo-container");
    
    if (tipologiaGiocataGlobal == "NORMALE") {
        let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
        if(isNaN(importoPuntata)){
            console.log("nessuna puntata");
            indicazioniAlert.classList.remove("display-none");
            indicazioniContainer.classList.add("display-none");
            riepilogoContainer.classList.add("display-none");
        } else{
            console.log("puntata ok");
            indicazioniAlert.classList.add("display-none");
            indicazioniContainer.classList.remove("display-none");
            riepilogoContainer.classList.remove("display-none");
            return true;
        }
    }
    
    if (tipologiaGiocataGlobal == "BONUS") {
        let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
        if(isNaN(importoPuntata)){
            console.log("nessuna puntata");
            indicazioniAlert.classList.remove("display-none");
            indicazioniContainer.classList.add("display-none");
            riepilogoContainer.classList.add("display-none");
        } else{
            console.log("puntata ok");
            indicazioniAlert.classList.add("display-none");
            indicazioniContainer.classList.remove("display-none");
            riepilogoContainer.classList.remove("display-none");
            return true;
        }
    }

    if(tipologiaGiocataGlobal == "CR"){
        let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
        let importoRimborso = parseFloat(document.getElementById("importo-rimborso").value);
        if(isNaN(importoPuntata) || isNaN(importoRimborso)){
            console.log("nessuna puntata");
            indicazioniAlert.classList.remove("display-none");
            indicazioniContainer.classList.add("display-none");
            riepilogoContainer.classList.add("display-none");
        } else{
            console.log("puntata ok");
            indicazioniAlert.classList.add("display-none");
            indicazioniContainer.classList.remove("display-none");
            riepilogoContainer.classList.remove("display-none");
            return true;
        }
    }
}

function calculateNormal(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    if(puntateModificate){
        importoPuntata = parseFloat(document.getElementById("result-a").value);
    }
    if (tipologiaTavoloGlobal == "BACCARAT") {
        let importoBancata = Math.round((importoPuntata*2)/1.95);
        if(puntateModificate){
            importoBancata = parseFloat(document.getElementById("result-b").value);
        }
        let netto = (importoPuntata * 2 - importoBancata - importoPuntata);
        let rating = ((importoPuntata + netto) / importoPuntata) * 100;

        let vincePlayer1 = importoPuntata*2 - importoPuntata;
        let vincePlayer2 = importoBancata*1.95 - importoBancata;

        let guadagnoPlayer1 = (vincePlayer1 - importoBancata) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2 - importoPuntata) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2);

        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "Rating";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

        //compilazione tabella
        document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);

        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoBancata);
        document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);

        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
        updateElement("totale-1",guadagnoPlayer1);
        updateElement("totale-2",guadagnoPlayer2);
    } else if(tipologiaTavoloGlobal == "ROULETTE"){
        let tipologiaCopertura = document.getElementById("tipologiaCopertura");
        if(tipologiaCopertura.value == 3){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = customRound(importoPuntata*2/36);
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-d").value);
            }
            let netto = (importoPuntata * 2 - importoPuntata2 - importoPuntata - importoPuntata3);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata * 2 - importoPuntata;
            let vincePlayer2 = importoPuntata2 * 2 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 36 - importoPuntata3;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2 - importoPuntata - importoPuntata3) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3 - importoPuntata - importoPuntata2) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
            }
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "Rating";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata);

            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);

            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);

            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
        } else if(tipologiaCopertura.value == 4){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = importoPuntata;
            let importoPuntata4 = customRound(importoPuntata*3/36);
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-c").value);
                importoPuntata4 = parseFloat(document.getElementById("result-d").value);
            }
            let netto = (importoPuntata * 3 - importoPuntata2 - importoPuntata - importoPuntata3 - importoPuntata4);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata * 3 - importoPuntata;
            let vincePlayer2 = importoPuntata2 * 3 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 3 - importoPuntata3;
            let vincePlayer4 = importoPuntata4 * 36 - importoPuntata4;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2 - importoPuntata - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3 - importoPuntata - importoPuntata2 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer4 = (vincePlayer4 - importoPuntata - importoPuntata2 - importoPuntata3) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3, guadagnoPlayer4);
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-c").value = formatToTwoDecimals(importoPuntata3);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata4);
            }

            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "Rating";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(-importoPuntata);
        
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(-importoPuntata2);
        
            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-3").innerHTML = formatToTwoDecimals(vincePlayer3);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(-importoPuntata3);

            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-4").innerHTML = formatToTwoDecimals(vincePlayer4);
        
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer4);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
            updateElement("totale-4",guadagnoPlayer4);
        }
    } else if(tipologiaTavoloGlobal == "FROULETTE"){
        let importoPuntata2 = importoPuntata;
        let importoPuntata3 = customRound(importoPuntata*2/72);
        if(puntateModificate){
            importoPuntata2 = parseFloat(document.getElementById("result-b").value);
            importoPuntata3 = parseFloat(document.getElementById("result-d").value);
        }
        let netto = (importoPuntata * 2 - importoPuntata2 - importoPuntata - importoPuntata3);
        let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
        let vincePlayer1 = importoPuntata * 2 - importoPuntata;
        let vincePlayer2 = importoPuntata2 * 2 - importoPuntata2;
        let vincePlayer3 = importoPuntata3 * 36 - importoPuntata3;
    
        let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2 - importoPuntata - importoPuntata3) * 100 / 100;
        let guadagnoPlayer3 = (vincePlayer3 - importoPuntata) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
    
        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "Rating";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

        //compilazione tabella
        document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
        document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata/2);
    
        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
        document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
        document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2/2);
    
        document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
        document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
        document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);
    
        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
        document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
        updateElement("totale-1",guadagnoPlayer1);
        updateElement("totale-2",guadagnoPlayer2);
        updateElement("totale-3",guadagnoPlayer3);
    }
}

function calculateBonus(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    if(puntateModificate){
        importoPuntata = parseFloat(document.getElementById("result-a").value);
    }
    if (tipologiaTavoloGlobal == "BACCARAT") {
        let importoBancata = Math.round((importoPuntata*2)/1.95);
        if(puntateModificate){
            importoBancata = parseFloat(document.getElementById("result-b").value);
        }
        let netto = (importoPuntata * 2 - importoBancata - importoPuntata);
        let rating = ((importoPuntata + netto) / importoPuntata) * 100;

        let vincePlayer1 = importoPuntata*2;
        let vincePlayer2 = importoBancata*1.95-importoBancata;

        let guadagnoPlayer1 = (vincePlayer1 - importoBancata) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2);

        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "Rating";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

        //compilazione tabella
        document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(0);
        
        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoBancata);
        document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
        
        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
        updateElement("totale-1",guadagnoPlayer1);
        updateElement("totale-2",guadagnoPlayer2);
    } else if(tipologiaTavoloGlobal == "ROULETTE"){
        let tipologiaCopertura = document.getElementById("tipologiaCopertura");
        if(tipologiaCopertura.value == 3){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = customRound(importoPuntata*2/36);
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-d").value);
            }
            let netto = (importoPuntata * 2 - importoPuntata2 - importoPuntata - importoPuntata3);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata * 2;
            let vincePlayer2 = importoPuntata2 * 2 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 36 - importoPuntata3;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2 - importoPuntata3) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3 - importoPuntata2) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
            }
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "Rating";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);
            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(0);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(0);
        
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);
        
            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);
        
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
        } else if(tipologiaCopertura.value == 4){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = importoPuntata;
            let importoPuntata4 = customRound(importoPuntata*3/36);
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-c").value);
                importoPuntata4 = parseFloat(document.getElementById("result-d").value);
            }
            let netto = (importoPuntata * 3 - importoPuntata2 - importoPuntata - importoPuntata3 - importoPuntata4);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata * 3;
            let vincePlayer2 = importoPuntata2 * 3 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 3 - importoPuntata3;
            let vincePlayer4 = importoPuntata4 * 36 - importoPuntata4;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3 - importoPuntata2 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer4 = (vincePlayer4 - importoPuntata2 - importoPuntata3) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3, guadagnoPlayer4);
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-c").value = formatToTwoDecimals(importoPuntata3);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata4);
            }
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata4);
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "Rating";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(-importoPuntata);
            
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(-importoPuntata2);
            
            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-3").innerHTML = formatToTwoDecimals(vincePlayer3);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(-importoPuntata3);
            
            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-4").innerHTML = formatToTwoDecimals(vincePlayer4);
            
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer4);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
            updateElement("totale-4",guadagnoPlayer4);
        }
    } else if(tipologiaTavoloGlobal == "FROULETTE"){
        let importoPuntata2 = importoPuntata;
        let importoPuntata3 = customRound(importoPuntata*2/72);
        if(puntateModificate){
            importoPuntata2 = parseFloat(document.getElementById("result-b").value);
            importoPuntata3 = parseFloat(document.getElementById("result-d").value);
        }
        let netto = (importoPuntata * 2 - importoPuntata2 - importoPuntata - importoPuntata3);
        let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
        let vincePlayer1 = importoPuntata * 2;
        let vincePlayer2 = importoPuntata2 * 2 - importoPuntata2;
        let vincePlayer3 = importoPuntata3 * 36 - importoPuntata3;
    
        let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2 - importoPuntata3) * 100 / 100;
        let guadagnoPlayer3 = (vincePlayer3) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
    
        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "Rating";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

        //compilazione tabella
        document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(0);
        document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(importoPuntata/2);
        
        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
        document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
        document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2/2);
        
        document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
        document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
        document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);
        
        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
        document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
        updateElement("totale-1",guadagnoPlayer1);
        updateElement("totale-2",guadagnoPlayer2);
        updateElement("totale-3",guadagnoPlayer3);
    }
}

function calculateCR(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    if(puntateModificate){
        importoPuntata = parseFloat(document.getElementById("result-a").value);
    }
    let importoRimborso = parseFloat(document.getElementById("importo-rimborso").value);
    if (tipologiaTavoloGlobal == "BACCARAT") {
        let importoBancata = customRound((importoPuntata*2 - importoRimborso)/1.95);
        if(puntateModificate){
            importoBancata = parseFloat(document.getElementById("result-b").value);
        }

        let rating = (importoBancata*0.95-importoPuntata+importoRimborso)/importoRimborso * 100;

        let vincePlayer1 = importoPuntata*2 - importoPuntata;
        let vincePlayer2 = importoBancata*1.95 - importoBancata;

        let guadagnoPlayer1 = (vincePlayer1 - importoBancata) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2 - importoPuntata + importoRimborso) * 100 / 100;
        console.log(guadagnoPlayer1);
        console.log(guadagnoPlayer2);
        
        
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2);

        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "CR %";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

       //compilazione tabella
       document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
       document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
       
       document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoBancata);
       document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);

       document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
       
       //inserimento totale
       document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
       document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
       updateElement("totale-1",guadagnoPlayer1);
       updateElement("totale-2",guadagnoPlayer2);
    } else if(tipologiaTavoloGlobal == "ROULETTE"){
        let tipologiaCopertura = document.getElementById("tipologiaCopertura");
        if(tipologiaCopertura.value == 3){
            let importoPuntata2 = customRound((importoPuntata*2 - importoRimborso)/2);
            let importoPuntata3 = customRound((importoPuntata*2 - importoRimborso)/36);
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-d").value);
            }
            let vincePlayer1 = importoPuntata * 2 - importoPuntata;
            let vincePlayer2 = importoPuntata2 * 2 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 36 - importoPuntata3;
            
    
            let guadagnoPlayer1 = (importoPuntata - importoPuntata2 - importoPuntata3) * 100 / 100;
            let guadagnoPlayer2 = (importoPuntata2 - importoPuntata - importoPuntata3 + importoRimborso) * 100 / 100;
            let guadagnoPlayer3 = (importoPuntata3 * 36 - importoPuntata3 - importoPuntata2 - importoPuntata + importoRimborso) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
            let rating = vincePlayer2 / importoRimborso * 100;
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
            }
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "CR %";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata);
        
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);
        
            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);

            document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
            document.getElementById("row-cr-3").innerHTML = formatToTwoDecimals(importoRimborso);
        
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
        } else if(tipologiaCopertura.value == 4){
            let importoPuntata2 = customRound((importoPuntata * 3 - importoRimborso) / 3);
            let importoPuntata3 = customRound((importoPuntata * 3 - importoRimborso) / 3);
            let importoPuntata4 = customRound((importoPuntata*3 - importoRimborso)/36);
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-c").value);
                importoPuntata4 = parseFloat(document.getElementById("result-d").value);
            }
    
            let vincePlayer1 = importoPuntata * 3 - importoPuntata;
            let vincePlayer2 = importoPuntata2 * 3 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 3 - importoPuntata3;
            let vincePlayer4 = importoPuntata4 * 36 - importoPuntata4;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer2 = (importoPuntata2 - importoPuntata + importoRimborso - importoPuntata4) * 100 / 100;
            let guadagnoPlayer3 = (importoPuntata2 - importoPuntata + importoRimborso - importoPuntata4) * 100 / 100;
            let guadagnoPlayer4 = (vincePlayer4 - importoPuntata - importoPuntata2 - importoPuntata3 + importoRimborso) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3, guadagnoPlayer4);
            let rating = guadagnoPlayer2 / importoRimborso * 100;
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-c").value = formatToTwoDecimals(importoPuntata3);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata4);
            }
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "CR %";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(-importoPuntata);
            
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(-importoPuntata2);
            
            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-3").innerHTML = formatToTwoDecimals(vincePlayer3);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(-importoPuntata3);
        
            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-4").innerHTML = formatToTwoDecimals(vincePlayer4);

            document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
            document.getElementById("row-cr-3").innerHTML = formatToTwoDecimals(importoRimborso);
            document.getElementById("row-cr-4").innerHTML = formatToTwoDecimals(importoRimborso);
            
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer4);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
            updateElement("totale-4",guadagnoPlayer4);
        }
    } else if(tipologiaTavoloGlobal == "FROULETTE"){
        let importoPuntata2 = customRound((importoPuntata*2 - importoRimborso)/2);
        let importoPuntata3 = customRound((importoPuntata*2 - importoRimborso/2)/72);
        if(puntateModificate){
            importoPuntata2 = parseFloat(document.getElementById("result-b").value);
            importoPuntata3 = parseFloat(document.getElementById("result-d").value);
        }
        let vincePlayer1 = importoPuntata;
        let vincePlayer2 = importoPuntata2;
        let vincePlayer3 = importoPuntata3 * 35;
        
    
        let guadagnoPlayer1 = (importoPuntata - importoPuntata2 - importoPuntata3) * 100 / 100;
        let guadagnoPlayer2 = (importoPuntata2 - importoPuntata - importoPuntata3 + importoRimborso) * 100 / 100;
        let guadagnoPlayer3 = (importoPuntata3 * 35 - importoPuntata2 / 2 - importoPuntata / 2 + importoRimborso / 2) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
        let rating = vincePlayer2 / importoRimborso * 100;
    
        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "CR %";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

       //compilazione tabella
       document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
       document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
       document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata/2);
       
       document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
       document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
       document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2/2);
       
       document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
       document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
       document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);

       document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
       document.getElementById("row-cr-3").innerHTML = formatToTwoDecimals(importoRimborso/2);
       
       //inserimento totale
       document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
       document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
       document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
       updateElement("totale-1",guadagnoPlayer1);
       updateElement("totale-2",guadagnoPlayer2);
       updateElement("totale-3",guadagnoPlayer3);
    }
}

function calculateOptiCR(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    if(puntateModificate){
        importoPuntata = parseFloat(document.getElementById("result-a").value);
    }
    let importoRimborso = parseFloat(document.getElementById("importo-rimborso").value);
    let importoLimite = parseFloat(document.getElementById("importo-limite").value);
    let importoBancata = 0;
    if (tipologiaTavoloGlobal == "BACCARAT") {
        let importoRimborso2 = (importoPuntata*2-(importoPuntata*4-importoRimborso)/1.95);
        if ((importoPuntata * 2) <= importoLimite) {
            if (importoRimborso2 > 0) {
                importoBancata = (importoPuntata * 2 - importoRimborso + importoRimborso2) / 1.95;
            } else {
                importoBancata = (importoPuntata*2 - importoRimborso)/1.95;
            }
        } else {
            importoBancata = (importoPuntata*2 - importoRimborso)/1.95;
        }
        if(puntateModificate){
            importoBancata = parseFloat(document.getElementById("result-b").value);
        }

        let rating = (Math.round(importoBancata)*0.95-importoPuntata+importoRimborso)/importoRimborso * 100;

        let vincePlayer1 = importoPuntata*2 - importoPuntata;
        let vincePlayer2 = importoBancata*1.95 - importoBancata;

        let guadagnoPlayer1 = (vincePlayer1 - importoBancata) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2 - importoPuntata + importoRimborso) * 100 / 100;
        console.log(guadagnoPlayer1);
        console.log(guadagnoPlayer2);
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2);

        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "CR %";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

        //compilazione tabella
        document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
        document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
        
        document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoBancata);
        document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);

        document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
        
        //inserimento totale
        document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
        document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
    } else if(tipologiaTavoloGlobal == "ROULETTE"){
        if(tipologiaCopertura.value == 3){
            let importoRimborso2 = (importoPuntata*2-(importoPuntata*4-importoRimborso)/2-(importoPuntata*4-importoRimborso)/36);
            let importoPuntata2 = 0;
            let importoPuntata3 = 0;
            if ((importoPuntata * 2) <= importoLimite) {
                if (importoRimborso2 > 0) {
                    importoPuntata2 = customRound((importoPuntata*2 - importoRimborso + importoRimborso2)/2);
                    importoPuntata3 = customRound((importoPuntata*2 - importoRimborso + importoRimborso2)/36);
                } else {
                    importoPuntata2 = customRound((importoPuntata*2 - importoRimborso)/2);
                    importoPuntata3 = customRound((importoPuntata*2 - importoRimborso)/36);
                }
            } else {
                importoPuntata2 = customRound((importoPuntata*2 - importoRimborso)/2);
                importoPuntata3 = customRound((importoPuntata*2 - importoRimborso)/36);
            }
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-d").value);
            }
    
            let vincePlayer1 = importoPuntata - importoPuntata2 - importoPuntata3;
            let vincePlayer2 = importoPuntata2 - importoPuntata - importoPuntata3 + importoRimborso;
            let vincePlayer3 = importoPuntata3 * 36 - importoPuntata3 - importoPuntata2 - importoPuntata + importoRimborso;
            
    
            let guadagnoPlayer1 = (vincePlayer1) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
            let rating = vincePlayer2 / importoRimborso * 100;
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
            }
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "CR %";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata);
            
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);
            
            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);
        
            document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
            document.getElementById("row-cr-3").innerHTML = formatToTwoDecimals(importoRimborso);
            
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
        } else if(tipologiaCopertura.value == 4){

            let importoRimborso2 = (importoPuntata*3-(importoPuntata*9-importoRimborso)/3-(importoPuntata*3-importoRimborso)/36);
            let importoPuntata2 = 0;
            let importoPuntata3 = 0;
            let importoPuntata4 = 0;
            if ((importoPuntata * 2) <= importoLimite) {
                if (importoRimborso2 > 0) {
                    importoPuntata2 = customRound((importoPuntata * 3 - importoRimborso + importoRimborso2) / 3);
                    importoPuntata3 = customRound((importoPuntata * 3 - importoRimborso + importoRimborso2) / 3);
                    importoPuntata4 = customRound((importoPuntata * 3 - importoRimborso + importoRimborso2) /36);
                } else {
                    importoPuntata2 = customRound((importoPuntata * 3 - importoRimborso) / 3);
                    importoPuntata3 = customRound((importoPuntata * 3 - importoRimborso) / 3);
                    importoPuntata4 = customRound((importoPuntata * 3 - importoRimborso) /36);
                }
            } else {
                importoPuntata2 = customRound((importoPuntata * 3 - importoRimborso) / 3);
                importoPuntata3 = customRound((importoPuntata * 3 - importoRimborso) / 3);
                importoPuntata4 = customRound((importoPuntata * 3 - importoRimborso) /36);
            }
            if(puntateModificate){
                importoPuntata2 = parseFloat(document.getElementById("result-b").value);
                importoPuntata3 = parseFloat(document.getElementById("result-c").value);
                importoPuntata4 = parseFloat(document.getElementById("result-d").value);
            }
            
    
            let vincePlayer1 = importoPuntata * 3 - importoPuntata;
            let vincePlayer2 = importoPuntata2 * 3 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 3 - importoPuntata3;
            let vincePlayer4 = importoPuntata4 * 36 - importoPuntata4;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer2 = (importoPuntata2 - importoPuntata + importoRimborso - importoPuntata4) * 100 / 100;
            let guadagnoPlayer3 = (importoPuntata2 - importoPuntata + importoRimborso - importoPuntata4) * 100 / 100;
            let guadagnoPlayer4 = (vincePlayer4 - importoPuntata - importoPuntata2 - importoPuntata3 + importoRimborso) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3, guadagnoPlayer4);
            let rating = guadagnoPlayer2 / importoRimborso * 100;
    
            //Compilazione indicazioni
            if(!puntateModificate){
                document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
                document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
                document.getElementById("result-c").value = formatToTwoDecimals(importoPuntata3);
                document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata4);
            }
            document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
            document.getElementById("rating-cr").innerHTML = "CR %";
            //compilazione guadagno
            if(guadagnoTotale < 0){
                document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
                document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
            } else if (guadagnoTotale >= 0) {
                document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
                document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
            }
            document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);
            //compilazione tabella
            document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
            document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata);
            document.getElementById("row-a-4").innerHTML = formatToTwoDecimals(-importoPuntata);
            
            document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
            document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2);
            document.getElementById("row-b-4").innerHTML = formatToTwoDecimals(-importoPuntata2);
            
            document.getElementById("row-c-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
            document.getElementById("row-c-3").innerHTML = formatToTwoDecimals(vincePlayer3);
            document.getElementById("row-c-4").innerHTML = formatToTwoDecimals(-importoPuntata3);
            
            document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(-importoPuntata4);
            document.getElementById("row-d-4").innerHTML = formatToTwoDecimals(vincePlayer4);
            
            document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
            document.getElementById("row-cr-3").innerHTML = formatToTwoDecimals(importoRimborso);
            document.getElementById("row-cr-4").innerHTML = formatToTwoDecimals(importoRimborso);
            
            //inserimento totale
            document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
            document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
            document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
            document.getElementById("totale-4").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer4);
            updateElement("totale-1",guadagnoPlayer1);
            updateElement("totale-2",guadagnoPlayer2);
            updateElement("totale-3",guadagnoPlayer3);
            updateElement("totale-4",guadagnoPlayer4);
        } 
    } else if(tipologiaTavoloGlobal == "FROULETTE"){
        let importoRimborso2 = (importoPuntata*2-(importoPuntata*4-importoRimborso)/2-(importoPuntata*4-importoRimborso)/72);
        let importoPuntata2 = 0;
        let importoPuntata3 = 0;
        if ((importoPuntata * 2) <= importoLimite) {
            if (importoRimborso2 > 0) {
                importoPuntata2 = customRound((importoPuntata*2 - importoRimborso + importoRimborso2)/2);
                importoPuntata3 = customRound((importoPuntata*2 - importoRimborso/2 + importoRimborso2)/72);
            } else {
                importoPuntata2 = customRound((importoPuntata*2 - importoRimborso)/2);
                importoPuntata3 = customRound((importoPuntata*2 - importoRimborso/2)/72);
            }
        } else {
            importoPuntata2 = customRound((importoPuntata*2 - importoRimborso)/2);
            importoPuntata3 = customRound((importoPuntata*2 - importoRimborso/2)/72);
        }
        if(puntateModificate){
            importoPuntata2 = parseFloat(document.getElementById("result-b").value);
            importoPuntata3 = parseFloat(document.getElementById("result-d").value);
        }

        let vincePlayer1 = importoPuntata - importoPuntata2 - importoPuntata3;
        let vincePlayer2 = importoPuntata2 - importoPuntata - importoPuntata3;
        let vincePlayer3 = importoPuntata3 * 35;
        

        let guadagnoPlayer1 = (importoPuntata - importoPuntata2 - importoPuntata3) * 100 / 100;
        let guadagnoPlayer2 = (importoPuntata2 - importoPuntata - importoPuntata3 + importoRimborso) * 100 / 100;
        let guadagnoPlayer3 = (importoPuntata3 * 35 - importoPuntata2 / 2 - importoPuntata / 2 + importoRimborso / 2) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
        let rating = vincePlayer2 / importoRimborso * 100;

        //Compilazione indicazioni
        if(!puntateModificate){
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
        }
        document.getElementById("rating").innerHTML = formatToTwoDecimals(rating);
        document.getElementById("rating-cr").innerHTML = "CR %";
        //compilazione guadagno
        if(guadagnoTotale < 0){
            document.getElementById("border-guadagno").style.border = "3px solid rgb(255, 126, 126)";
            document.getElementById("guadagno-color").style.color = " rgb(255, 126, 126)";
        } else if (guadagnoTotale >= 0) {
            document.getElementById("border-guadagno").style.border = "3px solid rgb(97, 163, 113)";
            document.getElementById("guadagno-color").style.color = " rgb(97, 163, 113)";
        }
        document.getElementById("guadagno").innerHTML = formatToTwoDecimals(guadagnoTotale);

               //compilazione tabella
       document.getElementById("row-a-1").innerHTML = formatToTwoDecimals(vincePlayer1);
       document.getElementById("row-a-2").innerHTML = formatToTwoDecimals(-importoPuntata);
       document.getElementById("row-a-3").innerHTML = formatToTwoDecimals(-importoPuntata/2);
       
       document.getElementById("row-b-1").innerHTML = formatToTwoDecimals(-importoPuntata2);
       document.getElementById("row-b-2").innerHTML = formatToTwoDecimals(vincePlayer2);
       document.getElementById("row-b-3").innerHTML = formatToTwoDecimals(-importoPuntata2/2);
       
       document.getElementById("row-d-1").innerHTML = formatToTwoDecimals(-importoPuntata3);
       document.getElementById("row-d-2").innerHTML = formatToTwoDecimals(-importoPuntata3);
       document.getElementById("row-d-3").innerHTML = formatToTwoDecimals(vincePlayer3);

       document.getElementById("row-cr-2").innerHTML = formatToTwoDecimals(importoRimborso);
       document.getElementById("row-cr-3").innerHTML = formatToTwoDecimals(importoRimborso/2);
       
       //inserimento totale
       document.getElementById("totale-1").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer1);
       document.getElementById("totale-2").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer2);
       document.getElementById("totale-3").innerHTML = formatToTwoDecimalsTotal(guadagnoPlayer3);
       updateElement("totale-1",guadagnoPlayer1);
       updateElement("totale-2",guadagnoPlayer2);
       updateElement("totale-3",guadagnoPlayer3);
    }
}

function getResults(){
    checkTipologia();
    let check = false;
    check = checkIndicazioni();
    if(check){
        if(tipologiaGiocataGlobal == "CR"){
            let rimborsoOttimizzato = document.getElementById("three-2");
            if(rimborsoOttimizzato.checked){
                calculateOptiCR();
            } else{
                calculateCR();
            }
        } else if(tipologiaGiocataGlobal == "NORMALE"){
            calculateNormal();
        } else if(tipologiaGiocataGlobal == "BONUS"){
            calculateBonus();
        }
    }
}