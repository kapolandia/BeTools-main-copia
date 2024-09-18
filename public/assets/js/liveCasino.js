let wasBaccarat = true;
let wasRoulette = false;

function checkTipologia(){
    let tipologiaGiocata = document.getElementById("tipologiaPuntata").value;
    let rimborsoRow = document.getElementById("rimborsoRow");
    let crOpt = document.getElementById("crOpt");
    console.log(tipologiaGiocata);
    if(tipologiaGiocata == "CR"){
        crOpt.classList.remove("display-none");
        rimborsoRow.classList.remove("display-none");
    } else{
        crOpt.classList.add("display-none");
        rimborsoRow.classList.add("display-none");
    }

    let tipologiaCopertura = document.getElementById("tipologiaCopertura");
    let tipologiaTavolo = document.getElementById("tipologiaTavolo").value;
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
        option2.disabled = true;
        option3.disabled = false;
        option4.disabled = false;

        if(wasBaccarat){
            wasBaccarat = false;
            wasRoulette = true;
            tipologiaCopertura.value = "3";
        }
    }
}

function getResults(){
    checkTipologia()
}