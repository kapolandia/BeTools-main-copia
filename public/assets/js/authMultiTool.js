import "https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.2.10/firebase-auth.js";
import "https://www.gstatic.com/firebasejs/8.2.10/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAvitDeakWR3NfFELI43u99axe3FeYBkmQ",
  authDomain: "betools-bbbcc.firebaseapp.com",
  projectId: "betools-bbbcc",
  storageBucket: "betools-bbbcc.appspot.com",
  messagingSenderId: "208819114612",
  appId: "1:208819114612:web:a5b91631b36654c0053721",
  measurementId: "G-40LPYEGYP0",
};

firebase.initializeApp(firebaseConfig);

// Function to check if a user is logged in
// Function to check if a user is logged in and get user email
const checkUserLoggedIn = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve({
          user: user,
          email: user.email // Access user email
        });
      } else {
        resolve(null);
      }
    });
  });
};

var userEmail = "";
checkUserLoggedIn().then((userData) => {
  //console.log('entrato checkUserLoggedIn  userData:');
  //console.log(userData);
  
  if (userData) {
    userEmail = userData.email;  
  } else {
    //console.log('User not logged in');
    // Handle case where user is not logged in
  }
});
//console.log("dopo di checkUser");


function formatDate(timestamp) {
  const dateObject = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date object
  const month = dateObject.toLocaleString('default', { month: 'short' }).replace(/^\w/, (c) => c.toUpperCase()); // Get and capitalize abbreviated month name
  const day = dateObject.getDate(); // Get day of the month
  const year = dateObject.getFullYear(); // Get full year

  return `${month} ${day}, ${year}`; // Return formatted date string
}

function formatDate1(timestamp) {
  const dateObject = new Date(timestamp); // Convert timestamp to JavaScript Date object
  const month = dateObject.toLocaleString('default', { month: 'short' }).replace(/^\w/, (c) => c.toUpperCase()); // Get abbreviated month name
  const day = dateObject.getDate(); // Get day of the month
  const year = dateObject.getFullYear(); // Get full year

  return `${month} ${day}, ${year}`; // Return formatted date string
}

function formatDate2(timestamp) {
  const date = new Date(timestamp.seconds * 1000); 
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');  // months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function startSpinner() {
  $(".spinner").show();
}
// Function to stop the spinner
function stopSpinner() {
  $(".spinner").hide();
}

// Reference to Firestore collection
const db = firebase.firestore();
const multitoolRef = db.collection('multitool');

function checkName() {
  if ($("#thisMultiName")[0].innerHTML) {
    $("#thisMultiNameBox").show();
  } else {
    $("#thisMultiNameBox").hide();
  }
}


const numeroSalvateMax = 25;
var numeroSalvate = 0;
//SALVA MULTIPLA

//controllo che nel db non ci siano più di 25 multiple salvate altrimenti do errore
$(".salvaMultiplaDB").click(function() {
  //console.log("entrato salva");
  if ($('input#mult_myname')[0].value == '') {
    //alert("campo vuoto");
    return false;
  }else{
    $('.second.mySave.modal')
    .modal({
      onHidden: function () {
        $('.second.mySave.modal#SAVE_res > div:first-child')
          .removeClass('red')
          .removeClass('green');
        $('.second.mySave.modal#SAVE_res > div:nth-child(2) > div:first-child')
          .removeClass('red')
          .removeClass('green');
        $('#SAVE_res i.green').remove();
        $('#SAVE_res i.red').remove();
        $('#saveSecond_header').html('');
        $('#msg_save').html('');
      },
    }).modal('show');
    startSpinner();
    multitoolRef.where('userName', '==', userEmail).orderBy('dataSalvataggio','desc').get().then((querySnapshot) => {
      numeroSalvate =  querySnapshot.size;
      if(numeroSalvate < numeroSalvateMax){
        //salva la multipla perchè c'è posto
        document.getElementById('saveSecond_header').innerHTML = "SUCCESSO";
        document.getElementById('msg_save').innerHTML = "Multipla salvata correttamente";
        $('input#mult_myname_copy')[0].value = $('input#mult_myname')[0].value;
        $('#thisMultiName')[0].innerHTML = $('input#mult_myname')[0].value;
        startSpinner();
        multitoolRef.add({
          userName: userEmail,
          dataSalvataggio: new Date(),
          nomeMultipla: $('input#mult_myname')[0].value,
          puntata: $('input#puntata_copy')[0].value,
          rimbTipo: $('input#mult_myRimbo')[0].value,
          totSelezioni: $('input#quantieventi_copy')[0].value,
          datiMult: $("#formString")[0].value        
        }).then(function() {
          //console.log("Document successfully saved!");
        })
        .catch(function(error) {
          console.error("Error saving the document: ", error);
        }).finally(() => {
          stopSpinner(); // Stop the spinner once Firestore call is done
        });
        
        $('.second.mySave.modal#SAVE_res > div:first-child').addClass('green').removeClass('red');
        $('.second.mySave.modal#SAVE_res > div:nth-child(2) > div:first-child')
          .addClass('green')
          .removeClass('red');
        $('#SAVE_res i.red').remove();
        $("<i class='check green icon'></i>").prependTo(
          '.second.mySave.modal#SAVE_res > div:first-child'
        );
        checkName();
      }else{
        //non salvare la multipla e fai uscire fuori l'errore
        document.getElementById('saveSecond_header').innerHTML = "ATTENZIONE";
        document.getElementById('msg_save').innerHTML = "Numero massimo di multiple salvabili (" + numeroSalvateMax + ") raggiunto. Elimina qualche multipla prima di continuare.";

        $('.second.mySave.modal#SAVE_res > div:first-child').addClass('red').removeClass('green');
        $('.second.mySave.modal#SAVE_res > div:nth-child(2) > div:first-child')
          .addClass('red')
          .removeClass('green');
        $('#SAVE_res i.green').remove();
        $("<i class='ban red icon'></i>").prependTo(
          '.second.mySave.modal#SAVE_res > div:first-child'
        );
      }
    }).catch((error) => {
        console.error("Error saving the document: ", error);
    }).finally(() => {
      stopSpinner(); // Stop the spinner once Firestore call is done
    });
  }
  

  

});


//CARICA MULTIPLA
var response = "";
var elabMessage = "";
var qualecarico;

function caricaMult(id,mobile) {
  qualecarico = id.split("_")[1];
  //  console.log(qualecarico);
  if (mobile) {
    //console.log("entrato carica mult");
    $("#mult_myname_copy")[0].value = $("#content_Name_" + qualecarico + " span:nth-child(2)")[0].innerHTML;
    $("#thisMultiName")[0].innerHTML = $("#content_Name_" + qualecarico + " span:nth-child(2)")[0].innerHTML;
  }else{
    $("#mult_myname_copy")[0].value  = $("#content_Name_" + qualecarico)[0].innerHTML; // span:nth-child(2) 
    $("#thisMultiName")[0].innerHTML = $("#content_Name_" + qualecarico)[0].innerHTML; //span:nth-child(2)
  }
  startSpinner();
  multitoolRef.doc(qualecarico).get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();     
        if (data['rimbTipo'].split("-")[0] == "0") {
          rimboType = 0;
          $(".ui.dropdown#labelRimbo").dropdown("set text", "Rimborso");
          $("#labelRimbo").removeClass("inRosso");
        } else if (data["rimbTipo"].split("-")[0] == "1") {
          rimboType = 1;
          $(".ui.dropdown#labelRimbo").dropdown("set text", "1 perde");
          $("#labelRimbo").addClass("inRosso");
        }
        $("#idMulti")[0].value = qualecarico;

        fill_form(data["datiMult"].replace(/\\/g, ""));
        $(".myLoad#LOAD_dlg").hide();
        $("#shrinkMe").show();
        $(window).scrollTop("0");
        $("#mult_lamiapuntata").keyup();
        checkName(); 
      } else {
        //console.log("No such document!");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);
    }).finally(() => {
      $('.first.myLoad.modal#LOAD_dlg').modal('hide');
      if(mobile){
        console.log("entrato top");
        var topscroll = $(window).scrollTop();
        if (topscroll != 0) {
          $("html").animate({ scrollTop: 0 }, 300, "swing", function () {
            // console.log(topscroll);
          });
        }
      }
      stopSpinner(); // Stop the spinner once Firestore call is done
    });
  
}

function elimMult(id,mobile) {
  //elimino la multipla
  qualecarico = id.split("_")[1];
  // console.log(qualecarico);
   //.split(": ")[1];
  var punta_Del = "";
  var nome_Del = "";
  var data_Del = "";
  if(mobile){
    punta_Del = ($("[id*='content_Doll_" + qualecarico + "']")[0].innerHTML).split(": ")[1];
    nome_Del = $("#content_Name_" + qualecarico + " span:nth-child(2)")[0].innerHTML; //.split(' ').slice(1).join(' ');
    data_Del = ($("[id*='content_Date_" + qualecarico + "']")[0].innerHTML).split(": ")[1];
  }else{
    punta_Del = $("[id*='content_Doll_" + qualecarico + "']")[0].innerHTML;
    nome_Del = $("[id*='content_Name_" + qualecarico + "']")[0].innerHTML;
    data_Del = $("[id*='content_Date_" + qualecarico + "']")[0].innerHTML; //.split(": ")[1];
  }
  
  console.log("punta_Del : " ,punta_Del);
  console.log("nome_Del : " ,nome_Del);
  console.log("data_Del : " ,data_Del);
  $("#msg_load")[0].innerHTML =
    "<div class='confermaDel' id='confDel_Box'>" +
    "<div class='confermaDel' id='confDel_Name'>" +
    nome_Del +
    "</div>" +
    "<span class='confermaDel' id='confDel_Doll'>di &nbsp;" +
    punta_Del +
    "</span>" +
    "<br>" +
    "<span class='confermaDel' id='confDel_Date'> registrata il: &nbsp;" +
    data_Del.split(" ")[0] +
    "&nbsp; alle h: " +
    data_Del.split(" ")[1] +
    "</span>" +
    "</div>";

  $(".second.myLoad.modal#LOAD_res")
    .modal({
      onApprove: function () {
        const id = qualecarico;
        const docRef = multitoolRef.doc(id);
        // Delete the document
        docRef.delete().then(() => {
              //console.log(`Documento con ID ${id} eliminato con successo.`);
              if (qualecarico == $("#idMulti").val()) {
                $("#thisMultiNameBox").hide();
                $("#thisMultiName").html("");
              }
              $("body, html", window.parent.document).animate({ scrollTop: 0 }, 200);
              $("#btn_LOAD").click();
            })
            .catch((error) => {
              console.error("Errore durante l'eliminazione del documento:", error);
            });     
        },
      })
      .modal("show");
}

window.caricaMult = caricaMult;
window.elimMult = elimMult;


$('#btn_LOAD').on('click', function () {
  //controllo se count è zero mostro messaggio di errore
  $("body, html", window.parent.document).animate({ scrollTop: 0 }, 200);
  startSpinner();
   multitoolRef.where('userName', '==', userEmail).orderBy('dataSalvataggio','desc').get().then((querySnapshot) => {
     numeroSalvate =  querySnapshot.size;
      if (numeroSalvate == 0){
          $('.first.myLoad.modal#LOAD_dlg').addClass('tiny');
          $('#loadListBox_msg').addClass('red');
        document.getElementById('loadListHeader').innerHTML = "ATTENZIONE";
        document.getElementById('loadListContent').innerHTML = "Non hai nessuna multipla salvata";
      }else{
        $('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
        $('#loadListBox_msg').removeClass('red');
        document.getElementById('loadListHeader').innerHTML = "LISTA MULTIPLE SALVATE";
        response = "";
        response += "<div class='tab_salva' id='int_row'><div class='tab_salva' style='padding-left:15px'>Nome</div><div class='tab_salva'>Data salvataggio</div><div class='tab_salva' style='text-align: center' title='\"std\"= rimborso normale - \"x 1\"= rimborso per 1 perdente'>N.eventi - Rimb.</div><div class='tab_salva' style='text-align: center'>Puntata di €</div><div class='tab_salva'></div><div class='tab_salva'></div></div><div class='tab_salva' id='list_Box'>";
        //for per ogni multipla
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const docId = doc.id;
          //recupero dati
          elabMessage = "";
          elabMessage = elabMulti(data);

          //riempio la riga con i dati elaborati
          response += "<div class='tab_salva content_row' id='content_row_" + docId + "'>";
          response += "<div class='tab_salva tab_salva_dati tab_salva_Name' style='padding-left:15px' id='content_Name_"+ docId +"'>"+ elabMessage.nome_multipla +"</div>";
          response += "<div class='ui popup selPopup' match='"+ docId +"' id='mulPopUp_"+ docId +"'>";
          response += elabMessage.multimatches;
          response += "</div>";
          response += "<div class='tab_salva tab_salva_dati tab_salva_Date' id='content_Date_"+ docId +"'>"+ formatDate2(elabMessage.data_salva) +"</div>";      

          response += "<div class='tab_salva tab_salva_dati tab_salva_HowMany' style='text-align: center' title='\"std\"= rimborso normale - \"x 1\"= rimborso per 1 perdente' id='content_HowMany_"+ docId +"'>"+ elabMessage.tot_selezioni +" ev.";
          response += elabMessage.rimbTyp == "No Rimborso" ? "" : " - "+ elabMessage.rimbTyp ;
          response += "</div>";
          response += "<div class='tab_salva tab_salva_dati tab_salva_Doll' style='text-align: center' id='content_Doll_"+ docId +"'>"+ elabMessage.puntata +"€</div>";
          response += "<div class='tab_salva tab_salva_btn'>";
          response += "<button type='button' class='listBox_btn ui blue mini button caricaN' title='Carica sul multiplicatore' onclick='caricaMult(this.id,false)' id='caricaN_"+ docId +"'>Carica</button>"; //
          response += "</div>";
          response += "<div class='tab_salva tab_salva_btn'>";
          response += "<button type='button' class='listBox_btn ui red mini button' title='Elimina dai tuoi salvataggi' onclick='elimMult(this.id,false)' id='eliminaN_"+ docId +"'>Elimina</button>";
          response += "</div>";          
          response += "</div>";
        });
        response += "</div>";
        document.getElementById("loadListContent").innerHTML = response;
      } 
        $('.first.myLoad.modal#LOAD_dlg')
        .modal({
          onVisible: function () {
            var hh = $('.first.myLoad.modal#LOAD_dlg')[0].offsetHeight;
            // console.log("sono alta: " + hh);
            var diffH = lastHeight - hh;
            if (diffH < 50) {
              $('#lastElm').css('min-height', 250 - diffH + 50);
              //$("#lastElm").height(50 - diffH);
            }
            $('[id*=content_Name_]').popup({
              inline: true,
              position: 'left center',
            });
          },
          onHidden: function () {
            $('#lastElm').height('0');
            $('#lastElm').css('min-height', '250px');
            setTimeout(function () {
              $('#mult_lamiapuntata').keyup();
            }, 500);
          },
        })
        .modal('show');

      $('.content_row').on('mouseover', function () {
        var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
        var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
        $(thisBtnLoad).toggleClass('topoOn');
        $(thisBtnDel).toggleClass('topoOn');
        $(this).css({ cursor: 'context-menu', background: '#e2e2e2' });
      });

      $('.content_row').on('mouseout', function () {
        var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
        var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
        $(thisBtnLoad).toggleClass('topoOn');
        $(thisBtnDel).toggleClass('topoOn');
        $(this).css({ cursor: 'unset', background: 'unset' });
      });

      var lL = 0;
      lL = $('[id*=content_Name_]').length;
      // for (var i = 0; i < lL; i++) {
      // 	if ($('[id*=content_Name_]')[i].innerHTML == $('#thisMultiName').html()) {
      // 		$('[id*=content_Name_]')[i].classList.add('aiem');
      // 	} else {
      // 		$('[id*=content_Name_]')[i].classList.remove('aiem');
      // 	}
      // }
      for (var i = 0; i < lL; i++) {
        if ($('[id*=content_Name_]')[i].id.split('_Name_')[1] === $('#idMulti').val()) {
          $('[id*=content_Name_]')[i].classList.add('aiem');
        } else {
          $('[id*=content_Name_]')[i].classList.remove('aiem');
        }
      }         
  }).catch((error) => {
      console.error("Error getting documents: ", error);
  }).finally(() => {
      stopSpinner(); // Stop the spinner once Firestore call is done     
    });
});

//carica-mobile
$("#btn_LOAD_mobile").on("click", function () {
 $("body, html", window.parent.document).animate({ scrollTop: 0 }, 200);
 startSpinner();
 multitoolRef.where('userName', '==', userEmail).orderBy('dataSalvataggio','desc').get().then((querySnapshot) => {
   numeroSalvate =  querySnapshot.size;
    if (numeroSalvate == 0){
        $('.first.myLoad.modal#LOAD_dlg').addClass('tiny');
        $('#loadListBox_msg').addClass('red');
      document.getElementById('loadListHeader').innerHTML = "ATTENZIONE";
      document.getElementById('loadListContent').innerHTML = "Non hai nessuna multipla salvata";
    }else{
      $('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
      $('#loadListBox_msg').removeClass('red');
      document.getElementById('loadListHeader').innerHTML = "LISTA MULTIPLE SALVATE";
      response = "";
      //for per ogni multipla
      var count = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const docId = doc.id;
        count++;
        //recupero dati
        elabMessage = "";
        elabMessage = elabMulti(data);

        //riempio la riga con i dati elaborati
        response += '<div class="loadbox">';
        response += '<div class="loadbox_nome" id="content_Name_' + docId +'"><span>#' + count +" </span><span>" + elabMessage.nome_multipla +"</span></div>";
        response += '<div class="loadbox_btn elimina">';
        response += '<button type="button" class="listBox_btn ui red mini icon button" onclick="elimMult(this.id,true)" id="eliminaN_' + docId + '"><i class="trash icon"></i></button>';
        response += '</div>';
        response += '<div class="loadbox_data" id="content_Date_' + docId + '">Salvata il: ' + formatDate2(elabMessage.data_salva) + '</div>';
        response += '<div class="loadbox_sel"><button class="ui icon button detListBtn" id="btn_DET_' + docId + '">' + elabMessage.tot_selezioni + ' EVENTI<i class="caret down icon"></i></button></div>';
        response += elabMessage.rimbTyp == "No Rimborso" ? '<div class="loadbox_rimboT">' +  elabMessage.rimbTyp + "</div>" : '<div class="loadbox_rimboT">' + elabMessage.rimbTyp +" - " + elabMessage.rimbFig +"€</div>";
        //console.log("elabMessage.rimbFig: " + elabMessage.rimbFig);
        response += '<div class="loadbox_datimul" id="list_DET_' + docId + '">' + elabMessage.multimatches +"</div>";
        response += '<div class="loadbox_punta" id="content_Doll_' + docId + '">Puntata: ' + elabMessage.puntata + "€</div>";
        response += '<div class="loadbox_btn carica">';
        response += '<button type="button" class="listBox_btn ui blue mini button" onclick="caricaMult(this.id,true)" id="caricaN_' + docId + '">Carica</button>';
        response += "</div>";
        response += "</div>";
      });
      document.getElementById("loadListContent").innerHTML = response;
      
      $(".detListBtn").on("click", function () {
        var identifica = this.id.split("_")[2];
        // console.log(identifica);
        $("#list_DET_" + identifica).toggle();

        $("#btn_DET_" + identifica + " i")
          .toggleClass("down")
          .toggleClass("up");
      });
      
    }
   
   
    $("#shrinkMe").hide();

    var topscroll = $(window).scrollTop();
    if (topscroll != 0) {
      $("html").animate({ scrollTop: 0 }, 300, "swing", function () {
        // console.log(topscroll);
      });
    }

    $(".myLoad#LOAD_dlg").show();

    $("#close_loadDlg").click(function () {
      $(".myLoad#LOAD_dlg").hide();
      $("#shrinkMe").show();
      setTimeout(function () {
        $("#mult_lamiapuntata").keyup();
      }, 500);
    });
   
   
   var lL = 0;
   lL = $("[id*=content_Name_]").length;
   for (var i = 0; i < lL; i++) {
      if ($('[id*=content_Name_]')[i].id.split('_Name_')[1] === $('#idMulti').val()) {
        $('[id*=content_Name_]')[i].classList.add('aiem');
      } else {
        $('[id*=content_Name_]')[i].classList.remove('aiem');
      }
    }         
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    }).finally(() => {
        stopSpinner(); // Stop the spinner once Firestore call is done     
    });
  
});




function elabMulti(ogg) {
  var risult = {};
  risult.nome_multipla = ogg.nomeMultipla;
  risult.data_salva = ogg.dataSalvataggio;
  risult.tot_selezioni = ogg.totSelezioni;
  risult.puntata = ogg.puntata;

  if (ogg.rimbTipo.split("-")[1] == "0") risult.rimbTyp = "No Rimborso";
  if (ogg.rimbTipo.split("-")[1] !== "0" && ogg.rimbTipo.split("-")[0] == "0")
    risult.rimbTyp = "Std";
  if (ogg.rimbTipo.split("-")[1] !== "0" && ogg.rimbTipo.split("-")[0] == "1")
    risult.rimbTyp = "x1";
  risult.rimbFig = ogg.rimbTipo.split("-")[1];

  risult.dati_mul = JSON.parse(ogg.datiMult.replace(/\\/g, ""));

  risult.multimatches = "<div class='header'>Selezioni</div>";
  if (
    risult.dati_mul.matchName_M1 ||
    risult.dati_mul.matchName_M2 ||
    risult.dati_mul.matchName_M3 ||
    risult.dati_mul.matchName_M4 ||
    risult.dati_mul.matchName_M5
  ) {   
    for (var z = 0; z < ogg.totSelezioni; z++) {
      risult.multimatches += "<p>";
      risult.multimatches +=
        "#" + (z + 1) + " " + risult.dati_mul["matchName_M" + (z + 1)];
      risult.multimatches += "</p>";
    }
  } else {
    risult.multimatches += "<p>Nessuna partita inserita</p>";
  }
  return risult;
}


//AGGIORNA MULTIPLA

function overwriteMult(nome, quale_multi, multName, mobile){
  //console.log("nome: " + nome +", quale_multi: "+ quale_multi +" , multName: "+ multName);
  var qualecarico = quale_multi.split('_')[1];
  var qualeinput = "input[name='" + nome;
  if(mobile){
    qualeinput += qualecarico + "']"; //+ qualecarico +
  }else{
    qualeinput += "']";
  }
  
  const isSameMult = qualecarico === $('#idMulti').val();
  if (!isSameMult && $('#idMulti').val() !== '') {
    $('#msg_update_same_warning').html(
      '<h3>Stai aggiornando una multipla diversa da quella caricata!</h3>'
    );
  } else {
    $('#msg_update_same_warning').html('');
  }

  if(mobile){
    const clonedPopup = $(`#${quale_multi}`).closest('.updbox').find('[id*=list_DET_]').clone(false);
    const htmlContent = clonedPopup.html(`<div class="mult-name">${multName}</div>` + clonedPopup.html());
    $('#msg_update_warning').html(htmlContent);
    $('#UPD_warn').focus();
    //console.log(clonedPopup.html());
  }else{
    const clonedPopup = $(`#${quale_multi}`).closest('.content_row').find('.popup').clone(false);
    const htmlContent = clonedPopup
    .html()
    .replace(/<div[^\n]*<\/div>/, `<div class="mult-name">${multName}</div>`);
    $('#msg_update_warning').html(htmlContent);
    //console.log(clonedPopup.html());
  }
  
  


  // $('#idMulti')[0].value = qualecarico;
  // $('#mult_myname_copy')[0].value = $(qualeinput)[0].value;
  // $('#thisMultiName')[0].innerHTML = $(qualeinput)[0].value;

  // var multiUPDdata = new FormData(myUPDForm);
  //$('.second.myUpdate#UPD_warn').modal('destroy');
  //$('.second.myUpdate#UPD_warn').modal('setting', 'centered', true).modal('show');
  $('.second.myUpdate#UPD_warn')
    .modal({
      onApprove: function () {
        //console.log("entrato onapprove");
        startSpinner();
        $('#idMulti')[0].value = qualecarico;       
        $('#mult_myname_copy')[0].value = $(qualeinput)[0].value;
        var myUPDForm = document.getElementById('sintesi_form');
        var multiUPDdata = new FormData(myUPDForm);
        
        
        var docRef = multitoolRef.doc(qualecarico);
        docRef.update({
          userName: userEmail,
          dataSalvataggio: new Date(),
          nomeMultipla: $('input#mult_myname_copy')[0].value,
          puntata: $('input#puntata_copy')[0].value,
          rimbTipo: $('input#mult_myRimbo')[0].value,
          totSelezioni: $('input#quantieventi_copy')[0].value,
          datiMult: $("#formString")[0].value 
        })
        .then(function() {
          $('#thisMultiName')[0].innerHTML = $(qualeinput)[0].value;
          var myt = "SUCCESSO";
          var mym = "Aggiornamento multipla eseguito correttamente";
          $('#updateSecond_header')[0].innerHTML = myt;
          $('#msg_update')[0].innerHTML = mym;
          // $('.first.myLoad.modal#LOAD_dlg').modal('hide');
          $('.second.myUpdate#UPD_res').modal('show');
          checkName();
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        }).finally(() => {
          stopSpinner(); // Stop the spinner once Firestore call is done
        });
      },
    })
    .modal('show');
}
window.overwriteMult = overwriteMult;


function updateMultipla(){
  startSpinner();
   multitoolRef.where('userName', '==', userEmail).orderBy('dataSalvataggio','desc').get().then((querySnapshot) => {
     numeroSalvate =  querySnapshot.size;
      if (numeroSalvate == 0){
          $('.first.myLoad.modal#LOAD_dlg').addClass('tiny');
          $('#loadListBox_msg').addClass('red');
        document.getElementById('loadListHeader').innerHTML = "ATTENZIONE";
        document.getElementById('loadListContent').innerHTML = "Non hai nessuna multipla salvata";
      }else{
        $('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
        $('#loadListBox_msg').removeClass('red');
        document.getElementById('loadListHeader').innerHTML = "LISTA MULTIPLE PER AGGIORNAMENTO";
        response = "";
        response += "<div class='tab_update' id='int_row'><div class='tab_update' style='padding-left:15px'>Nome</div><div class='tab_update'>Data salvataggio</div><div class='tab_update' style='text-align: center' title='\"std\"= rimborso normale - \"x 1\"= rimborso per 1 perdente'>N.eventi - Rimb.</div><div class='tab_update' style='text-align: center'>Puntata di €</div><div class='tab_update'></div><div class='tab_update'></div></div><div class='tab_salva' id='list_Box'>";
        //for per ogni multipla
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const docId = doc.id;
          //recupero dati
          elabMessage = "";
          elabMessage = elabMulti(data);
          //riempio la riga con i dati elaborati
          response += "<div class='tab_salva content_row' id='content_row_" + docId + "'>";
          response += "<div class='tab_salva tab_salva_dati tab_update_Name ui input' style='padding-left:15px' id='content_Name_"+ docId +"'>";
          response += "<input type='text' name='nomenuovoN_"+ docId +"' id='nomenuovoN_"+ docId +"' value='"+ elabMessage.nome_multipla +"'>";
          response += "</div>";
          response += "<div class='ui popup selPopup' match='"+ docId +"' id='mulPopUp_"+ docId +"'>";
          response += elabMessage.multimatches;
          response += "</div>";
          
          response += "<div class='tab_update tab_update_dati tab_update_Date' id='content_Date_"+ docId +"'>"+ formatDate2(elabMessage.data_salva) +"</div>";  
          response += "<div class='tab_update tab_update_dati tab_update_HowMany' style='text-align: center' title='\"std\"= rimborso normale - \"x 1\"= rimborso per 1 perdente' id='content_HowMany_"+ docId +"'>"+ elabMessage.tot_selezioni +" ev.";
          response += elabMessage.rimbTyp == "No Rimborso" ? "" : " - "+ elabMessage.rimbTyp ;
          response += "</div>";



          response += "<div class='tab_update tab_update_dati tab_update_Doll' style='text-align: center' id='content_Doll_"+ docId +"'>"+ elabMessage.puntata +"€</div>";
          response += "<div class='tab_update tab_update_btn tab_UPD_btn'>";
          response += "<button type='button' class='listBox_btn ui green mini button' name='nomenuovoN_"+ docId +"' title='Aggiorna questa multipla coi nuovi dati' data-mult-name='"+ elabMessage.nome_multipla +"' onclick='overwriteMult(this.name, this.id, this.dataset.multName, false)' id='overwrN_"+ docId +"'>Aggiorna</button>";
          response += "</div>";        
          response += "</div>";
        });

        response += "</div>";
        document.getElementById("loadListContent").innerHTML = response;
      }
      $('.first.myLoad.coupled.modal#LOAD_dlg')
        .modal({
          onVisible: function () {
            var hh = $('.first.myLoad.modal#LOAD_dlg')[0].offsetHeight;
            // console.log("sono alta: " + hh);
            var diffH = lastHeight - hh;
            if (diffH < 50) {
              $('#lastElm').css('min-height', 250 - diffH + 50);
              //$("#lastElm").height(50 - diffH);
            }
            setTimeout(function () {
              $('[id*=content_Name_].aiem input').blur();
              $('#loadListBox_msg').click();
              // console.log("funge?");
            }, 250);
            $('[id*=content_Name_]').popup({
              inline: true,
              position: 'left center',
            });
          },
          onHidden: function () {
            $('#lastElm').height('0');
            $('#lastElm').css('min-height', '250px');
          },
          allowMultiple: false,
        })
        .modal('show');

      // if ($('.first.modal .button[id*="overwrN_"]').length > 0) {
      // 	$('.second.myUpdate').modal('attach events', '.first.modal .button[id*="overwrN_"]');
      // }

      $('.content_row').on('mouseover', function () {
        var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
        var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
        $(thisBtnLoad).toggleClass('topoOn');
        $(thisBtnDel).toggleClass('topoOn');
        $(this).css({ cursor: 'context-menu', background: '#e2e2e2' });
      });

      $('.content_row').on('mouseout', function () {
        var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
        var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
        $(thisBtnLoad).toggleClass('topoOn');
        $(thisBtnDel).toggleClass('topoOn');
        $(this).css({ cursor: 'unset', background: 'unset' });
      });

      var lL = 0;
      lL = $('[id*=content_Name_]').length;
      // for (var i = 0; i < lL; i++) {
      // 	if ($('[id*=content_Name_] input')[i].value == $('#thisMultiName').html()) {
      // 		$('[id*=content_Name_]')[i].classList.add('aiem');
      // 	} else {
      // 		$('[id*=content_Name_]')[i].classList.remove('aiem');
      // 	}
      // }
      for (var i = 0; i < lL; i++) {
        if ($('[id*=content_Name_] input')[i].id.split('_')[1] === $('#idMulti').val()) {
          $('[id*=content_Name_]')[i].classList.add('aiem');
        } else {
          $('[id*=content_Name_]')[i].classList.remove('aiem');
        }
      }
  }).catch((error) => {
      console.error("Error getting documents: ", error);
  }).finally(() => {
      stopSpinner(); // Stop the spinner once Firestore call is done
  });
}

function updateMultiplaMobile(){
  $("body, html", window.parent.document).animate({ scrollTop: 0 }, 200);
  startSpinner();
   multitoolRef.where('userName', '==', userEmail).orderBy('dataSalvataggio','desc').get().then((querySnapshot) => {
     numeroSalvate =  querySnapshot.size;
      if (numeroSalvate == 0){
          $('.first.myLoad.modal#LOAD_dlg').addClass('tiny');
          $('#loadListBox_msg').addClass('red');
        document.getElementById('loadListHeader').innerHTML = "ATTENZIONE";
        document.getElementById('loadListContent').innerHTML = "Non hai nessuna multipla salvata";
      }else{
        $('.first.myLoad.modal#LOAD_dlg').removeClass('tiny');
        $('#loadListBox_msg').removeClass('red');
        document.getElementById('loadListHeader').innerHTML = "LISTA MULTIPLE PER AGGIORNAMENTO";
        response = "";
        //for per ogni multipla
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const docId = doc.id;
          //recupero dati
          elabMessage = "";
          elabMessage = elabMulti(data);
          //riempio la riga con i dati elaborati
          response += '<div class="updbox">';
          response += '<div class="updbox_nome ui input tab_update_Name" id="content_Name_'+ docId +'">';
          response += '<input type="text" name="nomenuovoN_' +
              docId +
              '" id="nomenuovoN_' +
              docId +
              '" value="' +
              elabMessage.nome_multipla +
              '">';
          response += "</div>";
          
          response +=
            '<div class="updbox_data" id="content_Date_' +
            docId +
            '">Salvata il: ' +
            formatDate2(elabMessage.data_salva) +
            "</div>";
            response +=
                '<div class="updbox_sel"><button class="ui icon button detListBtn" id="btn_DET_' +
                docId +
                '">' +
                elabMessage.tot_selezioni +
                ' EVENTI<i class="caret down icon"></i></button></div>';
          
          if (elabMessage.rimbTyp == "No Rimborso") {
              response +=
                '<div class="updbox_rimboT">' + elabMessage.rimbTyp + "</div>";
            } else {
              response +=
                '<div class="updbox_rimboT">' +
                elabMessage.rimbTyp +
                " - " +
                elabMessage.rimbFig +
                "€</div>";
            }
            response +=
              '<div class="updbox_datimul" id="list_DET_' +
              docId +
              '">' +
              elabMessage.multimatches +
              "</div>";

            response +=
              '<div class="updbox_punta" id="content_Doll_' +
              docId +
              '">Puntata: ' +
              elabMessage.puntata +
              "€</div>";

            response += '<div class="updbox_btn aggiorna">';
            response +=
              `<button type="button" data-multi-name = "${elabMessage.nome_multipla}" class="listBox_btn ui green mini button" name="nomenuovoN_" onclick="overwriteMult(this.name, this.id, this.dataset.multiName, true)" id="overwrN_${ docId }">Aggiorna</button>`;
            response += "</div>";

            response += "</div>";
        });
        document.getElementById("loadListContent").innerHTML = response;
        
        $(".detListBtn").on("click", function () {
          var identifica = this.id.split("_")[2];
          // console.log(identifica);
          $("#list_DET_" + identifica).toggle();

          $("#btn_DET_" + identifica + " i")
            .toggleClass("down")
            .toggleClass("up");
        });     
      }
     
     
      $("#shrinkMe").hide();

      /*var topscroll = $(window).scrollTop();
      if (topscroll != 0) {
        $("html").animate({ scrollTop: 0 }, 300, "swing", function () {
          // console.log(topscroll);
        });
      }*/

      //console.log("prima finestra");
      $(".myLoad#LOAD_dlg").show();
      
      $("#close_loadDlg").click(function () {
        $(".myLoad#LOAD_dlg").hide();
        $("#shrinkMe").show();
        //console.log("dopo finestra");
      });


      var lL = 0;
      lL = $("[id*=content_Name_]").length;
      // for (var i = 0; i < lL; i++) {
      // 	if (
      // 		$("[id*=content_Name_] input")[i].value ==
      // 		$("#thisMultiName").html()
      // 	) {
      // 		$("[id*=content_Name_]")[i].classList.add("aiem");
      // 	} else {
      // 		$("[id*=content_Name_]")[i].classList.remove("aiem");
      // 	}
      // }
      for (var i = 0; i < lL; i++) {
        if ($('[id*=content_Name_] input')[i].id.split('_')[1] === $('#idMulti').val()) {
          $('[id*=content_Name_]')[i].classList.add('aiem');
        } else {
          $('[id*=content_Name_]')[i].classList.remove('aiem');
        }
      }

      // if ($('.first.modal .button[id*="overwrN_"]').length > 0) {
      // 	$('.second.myUpdate').modal('attach events', '.first.modal .button[id*="overwrN_"]');
      // }

      $('.content_row').on('mouseover', function () {
        var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
        var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
        $(thisBtnLoad).toggleClass('topoOn');
        $(thisBtnDel).toggleClass('topoOn');
        $(this).css({ cursor: 'context-menu', background: '#e2e2e2' });
      });

      $('.content_row').on('mouseout', function () {
        var thisBtnLoad = '#' + this.id + ' div:nth-child(5)';
        var thisBtnDel = '#' + this.id + ' div:nth-child(6)';
        $(thisBtnLoad).toggleClass('topoOn');
        $(thisBtnDel).toggleClass('topoOn');
        $(this).css({ cursor: 'unset', background: 'unset' });
      });

      var lL = 0;
      lL = $('[id*=content_Name_]').length;
      // for (var i = 0; i < lL; i++) {
      // 	if ($('[id*=content_Name_] input')[i].value == $('#thisMultiName').html()) {
      // 		$('[id*=content_Name_]')[i].classList.add('aiem');
      // 	} else {
      // 		$('[id*=content_Name_]')[i].classList.remove('aiem');
      // 	}
      // }
      for (var i = 0; i < lL; i++) {
        if ($('[id*=content_Name_] input')[i].id.split('_')[1] === $('#idMulti').val()) {
          $('[id*=content_Name_]')[i].classList.add('aiem');
        } else {
          $('[id*=content_Name_]')[i].classList.remove('aiem');
        }
      }
  }).catch((error) => {
      console.error("Error getting documents: ", error);
  }).finally(() => {
      stopSpinner(); // Stop the spinner once Firestore call is done
  });
}

window.updateMultipla = updateMultipla;
window.updateMultiplaMobile = updateMultiplaMobile;


export { checkUserLoggedIn };