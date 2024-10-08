let wasBaccarat = true;
let wasRoulette = false;
let tipologiaGiocataGlobal = null;
let tipologiaTavoloGlobal = null;

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

    if (decimalPart <= 0.1) {
        return Math.floor(value);
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
            console.log("ciao");
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

    //check rimborso anticipato
    let rimborsoNormale = document.getElementById("three-1");
    let rimborsoOttimizzato = document.getElementById("three-2");
    let rimborsoLimite = document.getElementById("rimborsoLimite");
    if(rimborsoNormale.checked){
        console.log("rimborso normale");
        rimborsoLimite.classList.add("display-none");
    } else if(rimborsoOttimizzato.checked){
        console.log("rimborso ott");
        rimborsoLimite.classList.remove("display-none");
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
        resultC.classList.add("display-none");
        resultZero.classList.add("display-none");
    } else if(tipologiaCopertura.value == 3){
        document.getElementById("play-1").innerHTML = "Rosso";
        document.getElementById("play-2").innerHTML = "Nero";
        resultC.classList.add("display-none");
        resultZero.classList.remove("display-none");
    } else if(tipologiaCopertura.value == 4){
        document.getElementById("play-1").innerHTML = "1 - 12";
        document.getElementById("play-2").innerHTML = "13 - 24";
        resultC.classList.remove("display-none");
        resultZero.classList.remove("display-none");
    }
}

/*
function checkIndicazioni(){
    let indicazioniAlert = document.getElementById("indicazioni-alert");
    let indicazioniContainer = document.getElementById("dutcher-indicazioni-container");

    if (tipologiaGiocataGlobal == "NORMALE") {
        let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
        if(isNaN(importoPuntata)){
            console.log("nessuna puntata");
            indicazioniAlert.classList.remove("display-none");
            indicazioniContainer.classList.add("display-none");
        } else{
            console.log("puntata ok");
            indicazioniAlert.classList.add("display-none");
            indicazioniContainer.classList.remove("display-none");
            
        }
    } else if(tipologiaTavoloGlobal == "CR"){

    }
}
*/

function calculateNormal(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    if (tipologiaTavoloGlobal == "BACCARAT") {
        let importoBancata = Math.round((importoPuntata*2)/1.95);
        let netto = (importoPuntata * 2 - importoBancata - importoPuntata);
        let rating = ((importoPuntata + netto) / importoPuntata) * 100;

        let vincePlayer1 = importoPuntata*2 - importoPuntata;
        let vincePlayer2 = importoBancata*1.95 - importoBancata;

        let guadagnoPlayer1 = (vincePlayer1 - importoBancata) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2 - importoPuntata) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2);

        //Compilazione indicazioni
        document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
        document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
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
    } else if(tipologiaTavoloGlobal == "ROULETTE"){
        let tipologiaCopertura = document.getElementById("tipologiaCopertura");
        if(tipologiaCopertura.value == 3){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = customRound(importoPuntata*2/36);
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
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
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
        } else if(tipologiaCopertura.value == 4){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = importoPuntata;
            let importoPuntata4 = customRound(importoPuntata*3/36);
            let netto = (importoPuntata * 3 - importoPuntata2 - importoPuntata - importoPuntata3 - importoPuntata4);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata * 3 - importoPuntata;
            let vincePlayer2 = importoPuntata2 * 3 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 3 - importoPuntata3;
            let vincePlayer4 = importoPuntata3 * 36 - importoPuntata3;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2 - importoPuntata - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3 - importoPuntata - importoPuntata2 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer4 = (vincePlayer4 - importoPuntata - importoPuntata2 - importoPuntata3) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3, guadagnoPlayer4);
    
            //Compilazione indicazioni
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-c").value = formatToTwoDecimals(importoPuntata3);
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
        }
    }
}

function calculateBonus(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    if (tipologiaTavoloGlobal == "BACCARAT") {
        let importoBancata = Math.round((importoPuntata*2)/1.95);
        let netto = (importoPuntata * 2 - importoBancata - importoPuntata);
        let rating = ((importoPuntata + netto) / importoPuntata) * 100;

        let vincePlayer1 = importoPuntata*2;
        let vincePlayer2 = importoBancata*1.95-importoBancata;

        let guadagnoPlayer1 = (vincePlayer1 - importoBancata) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2) * 100 / 100;
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2);

        //Compilazione indicazioni
        document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
        document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
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
    } else if(tipologiaTavoloGlobal == "ROULETTE"){
        let tipologiaCopertura = document.getElementById("tipologiaCopertura");
        if(tipologiaCopertura.value == 3){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = customRound(importoPuntata*2/36);
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
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
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
        } else if(tipologiaCopertura.value == 4){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = importoPuntata;
            let importoPuntata4 = customRound(importoPuntata*3/36);
            let netto = (importoPuntata * 3 - importoPuntata2 - importoPuntata - importoPuntata3 - importoPuntata4);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata * 3;
            let vincePlayer2 = importoPuntata2 * 3 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 3 - importoPuntata3;
            let vincePlayer4 = importoPuntata3 * 36 - importoPuntata3;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3 - importoPuntata2 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer4 = (vincePlayer4 - importoPuntata2 - importoPuntata3) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3, guadagnoPlayer4);
    
            //Compilazione indicazioni
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-c").value = formatToTwoDecimals(importoPuntata3);
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
        }
    }
}

function calculateCR(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    let importoRimborso = parseFloat(document.getElementById("importo-rimborso").value);
    if (tipologiaTavoloGlobal == "BACCARAT") {
        let importoBancata = Math.round((importoPuntata*2 - importoRimborso)/1.95);

        let rating = (importoBancata*0.95-importoPuntata+importoRimborso)/importoRimborso * 100;

        let vincePlayer1 = importoPuntata*2 - importoPuntata;
        let vincePlayer2 = importoBancata*1.95 - importoBancata;

        let guadagnoPlayer1 = (vincePlayer1 - importoBancata) * 100 / 100;
        let guadagnoPlayer2 = (vincePlayer2 - importoPuntata + importoRimborso) * 100 / 100;
        console.log(guadagnoPlayer1);
        console.log(guadagnoPlayer2);
        
        
        
        guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2);

        //Compilazione indicazioni
        document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
        document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
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
    } else if(tipologiaTavoloGlobal == "ROULETTE"){
        let tipologiaCopertura = document.getElementById("tipologiaCopertura");
        if(tipologiaCopertura.value == 3){
            let importoPuntata2 = (importoPuntata*2 - importoRimborso)/2;
            let importoPuntata3 = customRound((importoPuntata*2 - importoRimborso)/36);
            let netto = (importoPuntata * 2 - importoPuntata2 - importoPuntata - importoPuntata3);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata - importoPuntata2 - importoPuntata3;
            let vincePlayer2 = importoPuntata2 - importoPuntata - importoPuntata3 + importoRimborso;
            let vincePlayer3 = importoPuntata3 * 36 - importoPuntata3 - importoPuntata2 - importoPuntata + importoRimborso;
            
    
            let guadagnoPlayer1 = (vincePlayer1) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3);
    
            //Compilazione indicazioni
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-d").value = formatToTwoDecimals(importoPuntata3);
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
        } else if(tipologiaCopertura.value == 4){
            let importoPuntata2 = importoPuntata;
            let importoPuntata3 = importoPuntata;
            let importoPuntata4 = customRound(importoPuntata*3/36);
            let netto = (importoPuntata * 3 - importoPuntata2 - importoPuntata - importoPuntata3 - importoPuntata4);
            let rating = ((importoPuntata + netto) / importoPuntata) * 100;
    
            let vincePlayer1 = importoPuntata * 3 - importoPuntata;
            let vincePlayer2 = importoPuntata2 * 3 - importoPuntata2;
            let vincePlayer3 = importoPuntata3 * 3 - importoPuntata3;
            let vincePlayer4 = importoPuntata3 * 36 - importoPuntata3;
    
            let guadagnoPlayer1 = (vincePlayer1 - importoPuntata2 - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer2 = (vincePlayer2 - importoPuntata - importoPuntata3 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer3 = (vincePlayer3 - importoPuntata - importoPuntata2 - importoPuntata4) * 100 / 100;
            let guadagnoPlayer4 = (vincePlayer4 - importoPuntata - importoPuntata2 - importoPuntata3) * 100 / 100;
            
            guadagnoTotale = Math.min(guadagnoPlayer1, guadagnoPlayer2, guadagnoPlayer3, guadagnoPlayer4);
    
            //Compilazione indicazioni
            document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
            document.getElementById("result-b").value = formatToTwoDecimals(importoPuntata2);
            document.getElementById("result-c").value = formatToTwoDecimals(importoPuntata3);
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
        }
    }
}

function calculateOptiCR(){
    let importoPuntata = parseFloat(document.getElementById("importo-puntata").value);
    let importoRimborso = parseFloat(document.getElementById("importo-rimborso").value);
    let importoRimborso2 = (importoPuntata*2-(importoPuntata*4-importoRimborso)/1.95);
    let importoLimite = parseFloat(document.getElementById("importo-limite").value);
    let importoBancata = 0;
    if (tipologiaTavoloGlobal == "BACCARAT") {
        if ((importoPuntata * 2) <= importoLimite) {
            if (importoRimborso2 > 0) {
                importoBancata = (importoPuntata * 2 - importoRimborso + importoRimborso2) / 1.95;
            } else {
                importoBancata = (importoPuntata*2 - importoRimborso)/1.95;
            }
        } else {
            importoBancata = (importoPuntata*2 - importoRimborso)/1.95;
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
        document.getElementById("result-a").value = formatToTwoDecimals(importoPuntata);
        document.getElementById("result-b").value = formatToTwoDecimals(Math.round(importoBancata));
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
    }
}

function getResults(){
    checkTipologia();
    //let check = checkIndicazioni();
    check = true;
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