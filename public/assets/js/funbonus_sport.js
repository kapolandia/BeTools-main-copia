
function runFunction(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        // Call your function here
        getResults();
    }
}

var IsQuota = false;

function getResults() {
    var commissioniInput = parseFloat(document.getElementById("commissioni-input").value);
    var funbonusIniziale = parseFloat(document.getElementById("valore-funbonus").value);
    var rolloverFunbonus = parseFloat(document.getElementById("rollover-funbonus").value);
    var eventiFunbonus = parseFloat(document.getElementById("eventi-funbonus").value);
    var capFunbonus = parseFloat(document.getElementById("cap-input").value);
    var rolloverRealBonus = parseFloat(document.getElementById("rollover-real").value);
    var eventiRealBonus = parseFloat(document.getElementById("eventi-realbonus").value);
    var ratingInput = parseFloat(document.getElementById("rating-input").value);
    var quotaFunbonus = parseFloat(document.getElementById("quota-funbonus").value);

    var nuovaQuota;

    if (this.IsQuota === false) {
        if (((capFunbonus + funbonusIniziale * (rolloverFunbonus - 1)) / funbonusIniziale) > quotaFunbonus) {
            nuovaQuota = ((capFunbonus + funbonusIniziale * (rolloverFunbonus - 1)) / funbonusIniziale);
        } else {
            nuovaQuota = quotaFunbonus;
        }
    } else {
        if (Math.pow(quotaFunbonus, eventiFunbonus) < ((capFunbonus + funbonusIniziale * (rolloverFunbonus - 1)) / funbonusIniziale)){
            nuovaQuota = ((capFunbonus + funbonusIniziale * (rolloverFunbonus - 1)) / funbonusIniziale);
        } else{
            nuovaQuota = Math.pow(quotaFunbonus, eventiFunbonus);
        }
    }

    console.log(Math.pow(quotaFunbonus, eventiFunbonus));
    console.log(quotaFunbonus);
    var puntataBonus = capFunbonus*(1+rolloverRealBonus*(Math.pow((ratingInput/100),eventiRealBonus)-1));

    var bonusVinto = funbonusIniziale * (rolloverFunbonus - 1);

    var stimaQuotabancata = (nuovaQuota * 1.05 / Math.pow((ratingInput/100),eventiFunbonus)-1)*(1-(commissioniInput/100))+1;

    var stimaProfitto = puntataBonus /((stimaQuotabancata * (1 + eventiFunbonus/100 ) -1 ) / (1 - (commissioniInput/100)) +1);
    //////////////////////
    var nuovaQuotaElement = document.getElementById("quota-minima");
    nuovaQuotaElement.innerHTML = nuovaQuota.toFixed(2);

    var puntataBonusElement = document.getElementById("puntata-bonus");
    puntataBonusElement.innerHTML = puntataBonus.toFixed(2);

    var bonusVintoElement = document.getElementById("rigioco-fun");
    bonusVintoElement.innerHTML = bonusVinto.toFixed(2);

    var stimaQuotabancataElement = document.getElementById("stima-quota-bancata");
    stimaQuotabancataElement.innerHTML = stimaQuotabancata.toFixed(2);

    var stimaProfittoElement = document.getElementById("stima-profitto");
    stimaProfittoElement.innerHTML = stimaProfitto.toFixed(2);
}

function quotaMinima() {
    var quotaMinimaElement = document.getElementById("quotaMinima");

    if (this.IsQuota === false) {
        this.IsQuota = true;
        quotaMinimaElement.innerHTML = "Quota min. per evento:";
    } else {
        this.IsQuota = false;
        quotaMinimaElement.innerHTML = "Quota min. Funbonus:";
    }
}

