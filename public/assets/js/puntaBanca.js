function getResults(){
    console.log("ciaos");
}

function checkStrumentoAvanzato(){
    let base = document.getElementById("three-1");
    let avanzato = document.getElementById("three-2");
    

    if(puntateBloccate.checked){
        input.classList.add("input-disabled");
        input.disabled = true;
    } else if(puntateModificabili.checked){
        input.classList.remove("input-disabled");
        input.disabled = false; 
    }
}