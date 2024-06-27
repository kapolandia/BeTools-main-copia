
  
var mazzi, KartAnz;



async function Start()
// Initialisierung von Variablen:
{
  var i;
  mazzi=1;
  KartAnz=new Array();
  for (i=1;i<=11;i++)
    KartAnz[i]=4;
  KartAnz[10]=16;
  await RefreshPage();
}

function RefreshPage() {
  return new Promise((resolve) => {

    document.form1.mazzi.value = "Mazzi: " + mazzi;


    let sum = 0;
    for (let i = 2; i <= 11; i++) {
      sum = sum + KartAnz[i];
    }


    for (let i = 2; i <= 9; i++) {
      document.form1["KW" + i].value = new String(4 * mazzi - KartAnz[i]);
      document.form1["KW" + i + "r"].value = new String(KartAnz[i]);

    }

    document.form1.KW10.value = new String(16 * mazzi - KartAnz[10]);
    document.form1.KW10r.value = new String(KartAnz[10]);


    document.form1.KW11.value = new String(4 * mazzi - KartAnz[11]);
    document.form1.KW11r.value = new String(KartAnz[11]);


    document.form1.KWges.value = new String(52 * mazzi - sum);
    document.form1.KWgesr.value = new String(sum);


    resolve();
  });
}

async function DecksPlus1()
{
  var i;
  mazzi=mazzi+1;
  KartAnz[10]=KartAnz[10]+12;
  for (i=2;i<=11;i++)
    KartAnz[i]=KartAnz[i]+4;
  check();
  await RefreshPage();
}
async function KarteZurueck(k)
{
  if ((KartAnz[k]<4*mazzi) && (k!=10))
    KartAnz[k]=KartAnz[k]+1;
  if ((KartAnz[k]<16*mazzi) && (k==10))
    KartAnz[k]=KartAnz[k]+1;
  check();
  await RefreshPage();
}

async function KarteWeg(k)
{
  // minimal 12 Karten werden zugelassen, Warnung bei
  var sum,i;
  sum=0;
  for (i=2;i<=11;i++)
    sum=sum+KartAnz[i];
  if ((sum>10) && (KartAnz[k]>0))
  {
    KartAnz[k]=KartAnz[k]-1;
    if (!check())
    KartAnz[k]=KartAnz[k]+1;
  }
  if (sum==18)
    alert("Nota bene: le statistiche con poche carte non sono precise!");
  await RefreshPage();
}

function check()
{
  // checkt den GUI-Status: (zur Vermeidung numerischer Instabilitäten bei mehrfachem Teilen):
  var ok=true;                      // es sei denn ...
  var sum=0;
  for (i=2;i<=11;i++)
    sum=sum+KartAnz[i];
  for (i=2;i<=11;i++)
    if (KartAnz[i]>0.44*sum)
    ok=false;
  if (ok)
  {
    document.form1.regelvar.options[1].disabled=false;
    document.form1.regelvar.options[2].disabled=false;
    return true;
  }
  // ein Kartenwert ist häufiger als 44%:	
  sel=document.form1.regelvar.options.selectedIndex;
  if ((sel==1) || (sel==2))
    return false;
  else
  {  
    document.form1.regelvar.options[1].disabled=true;
    document.form1.regelvar.options[2].disabled=true;
  return true;
  }
}


function Compute2()
{
  var WvK, BJ, i, txt, flag, flag2;
  

  WvK=new WahrVert();
  for (i=2;i<=11;i++)
    WvK.AddProb(i, ((KartAnz[i]>0)?KartAnz[i]:0.000001));    // vermeidet Probleme mit unmöglichen Black-Jack-Ständen
  WvK.Normiere();    

  flag=(document.form1.regelvar1.selectedIndex==1);
  flag2=(document.form1.regelvar2.selectedIndex==1);
  BJ=new BJ_Analyse(WvK, document.form1.regelvar.selectedIndex, flag, flag2, document.form1.details.checked);
    BJ.Compute();
    txt="<b><br><br>Carte rimaste:</b> ";
    for (i=2;i<=10;i++)
      txt=txt+KartAnz[i]+"-";
      txt = txt + "<span>" + KartAnz[11] + "</span><br>";
      txt = txt + "<span style='color:#FF8888;'>" + document.form1.regelvar.options[document.form1.regelvar.selectedIndex].text + "</span>. ";
      txt = txt + "<br>Il dealer controlla subito se ha un blackjack servito: ";
      txt = txt + "<span style='color: #FF8888;'>" + document.form1.regelvar1.options[document.form1.regelvar1.selectedIndex].text + "</span>. ";
      txt = txt + "<br>Il dealer chiama con un soft 17: ";
      txt = txt + "<span style='color:#FF8888;'>" + document.form1.regelvar2.options[document.form1.regelvar2.selectedIndex].text + "<br></span>";
      window.document.getElementById("result").innerHTML = BJ.PrintResult(txt);
}

//logica delle azioni

function newhand(){
var addbank1Element = document.getElementById("addbank1");
addbank1Element.innerHTML = "0";

var sumplayer1Element = document.getElementById("sumplayer1");
sumplayer1Element.innerHTML = "0";

var sumplayer2Element = document.getElementById("sumplayer2");
sumplayer2Element.innerHTML = "0";

var sumplayer3Element = document.getElementById("sumplayer3");
sumplayer3Element.innerHTML = "0";

document.getElementById("azione1").innerHTML = "";
document.getElementById("azione2").innerHTML = "";
document.getElementById("azione3").innerHTML = "";

var sumpsplit1Element = document.getElementById("sumsplit1");
sumpsplit1Element.innerHTML = "0";

var sumpsplit2Element = document.getElementById("sumsplit2");
sumpsplit2Element.innerHTML = "0";

var sumpsplit3Element = document.getElementById("sumsplit3");
sumpsplit3Element.innerHTML = "0";

document.getElementById("azionesplit1").innerHTML = "";
document.getElementById("azionesplit2").innerHTML = "";
document.getElementById("azionesplit3").innerHTML = "";

this.sumcardsPlayer1=0;
this.sumcardsPlayer2=0;
this.sumcardsPlayer3=0;

this.sumcardsPlayerSplit1=0;
this.sumcardsPlayerSplit2=0;
this.sumcardsPlayerSplit3=0; 

this.isSoft1 = false;
this.isSoft2 = false;
this.isSoft3 = false;

this.isSoft1_1 = false;
this.isSoft2_1 = false;
this.isSoft3_1 = false;

this.isSplit1 = false;
this.isSplit2 = false;
this.isSplit3 = false;

this.handValue1="";
this.handValue2="";
this.handValue3="";
this.handValue1_1="";
this.handValue2_1="";
this.handValue3_1="";

}

function Compute1() {
  return new Promise((resolve) => {
    window.document.getElementById("result").innerHTML = "Carico...";
    window.setTimeout(() => {
      Compute2();
      resolve();
    }, 200);
  });
}

// inizio logica mani 

var handValue1="";
var handValue2="";
var handValue3="";

var handValue1_1="";
var handValue2_1="";
var handValue3_1="";

var sumcardsPlayer1=0;
var sumcardsPlayer2=0;
var sumcardsPlayer3=0;

var sumcardsPlayerSplit1=0;
var sumcardsPlayerSplit2=0;
var sumcardsPlayerSplit3=0;

var number1;
var number2;
var number3;

var number1_1;
var number2_1;
var number3_1;

var isSoft1 = false;
var isSoft2 = false;
var isSoft3 = false;

var isSoft1_1 = false;
var isSoft2_1 = false;
var isSoft3_1 = false;

var isSplit1 = false;
var isSplit2 = false;
var isSplit3 = false;


async function addsumplayer3(number) {
  var sumplayer3Element = document.getElementById("sumplayer3");
  var currentSum = parseInt(sumplayer3Element.innerHTML);
  var newSum = currentSum + number;
  sumplayer3Element.innerHTML = newSum;
  this.sumcardsPlayer3+=1;
  check();
  await RefreshPage();

  await Compute1();

  if(number == 11 && (currentSum+number) < 22){
    this.isSoft3 = true;
  } else if(((currentSum+number) >= 22 && this.isSoft3)&& number != 11){
    this.isSoft3 = false;
    sumplayer3Element.innerHTML = (newSum - 10);
  } else if(((currentSum+number) >= 22 && !this.isSoft3)&& number == 11){
    sumplayer3Element.innerHTML = (newSum - 10);
  } else if((sumcardsPlayer3 > 2 && this.isSoft3)&& number == 11){
    sumplayer3Element.innerHTML = (newSum - 10);
  }

  this.number3 = number;
  actionPlayer3();


}

async function addsumplayer2(number) {
  var sumplayer2Element = document.getElementById("sumplayer2");
  var currentSum = parseInt(sumplayer2Element.innerHTML);
  var newSum = currentSum + number;
  sumplayer2Element.innerHTML = newSum;
  this.sumcardsPlayer2+=1;
  check();
  await RefreshPage();

  await Compute1();

  if(number == 11 && (currentSum+number) < 22){
    this.isSoft2 = true;
  } else if(((currentSum+number) >= 22 && this.isSoft2)&& number != 11){
    this.isSoft2 = false;
    sumplayer2Element.innerHTML = (newSum - 10);
  } else if(((currentSum+number) >= 22 && !this.isSoft2)&& number == 11){
    sumplayer2Element.innerHTML = (newSum - 10);
  } else if((sumcardsPlayer2 > 2 && this.isSoft2)&& number == 11){
      sumplayer2Element.innerHTML = (newSum - 10);
  }

  this.number2 = number;
  actionPlayer2();


}

async function addsumplayer1(number) {
  var sumplayer1Element = document.getElementById("sumplayer1");
  var currentSum = parseInt(sumplayer1Element.innerHTML);
  var newSum = currentSum + number;
  sumplayer1Element.innerHTML = newSum;
  this.sumcardsPlayer1+=1;
  check();
  await RefreshPage();

  await Compute1();

  if(number == 11 && (currentSum+number) < 22){
    this.isSoft1 = true;
  } else if(((currentSum+number) >= 22 && this.isSoft1)&& number != 11){
    this.isSoft1 = false;
    sumplayer1Element.innerHTML = (newSum - 10);
  } else if(((currentSum+number) >= 22 && !this.isSoft1)&& number == 11){
    sumplayer1Element.innerHTML = (newSum - 10);
  } else if((sumcardsPlayer1 > 2 && this.isSoft1)&& number == 11){
    sumplayer1Element.innerHTML = (newSum - 10);
  }

  this.number1 = number;
  actionPlayer1();


}

async function addbank1(number) {
var addbank1Element = document.getElementById("addbank1");
var currentSum = parseInt(addbank1Element.innerHTML);
var newSum = currentSum + number;
addbank1Element.innerHTML = newSum;
check();
await RefreshPage();

await Compute1();

actionPlayer1();
actionPlayer2();
actionPlayer3();
actionPlayerSplit3();
actionPlayerSplit2();
actionPlayerSplit1();
}


function actionPlayer3() {

var sumplayer3Element = document.getElementById("sumplayer3");
var halfsum = parseInt(sumplayer3Element.innerHTML);
halfsum = halfsum / 2;
var addbank1Element = document.getElementById("addbank1");
var sumbankparsed = parseInt(addbank1Element.innerHTML);
var sumplayer3parsed = parseInt(sumplayer3Element.innerHTML);
var id;
var x = 0;
var y;
console.log(this.isSoft3);

if(addbank1Element.innerHTML >1){
  
if(this.sumcardsPlayer3 == 0){
  this.handValue3 = "Non seduto o senza carte servite";

} else if(parseInt(sumplayer3Element.innerHTML) > 21 && (this.number3 + parseInt(sumplayer3Element.innerHTML) != 33)){
  this.handValue3 = "Sballato!";

} else {

  //split aces
  if(this.number3 == 11 && parseInt(sumplayer3Element.innerHTML) == 22){
    var sumbankparsed = parseInt(addbank1Element.innerHTML);
    id = "table" + sumbankparsed + "_27";
    this.handValue3 = document.getElementById(id).innerHTML;
  //split aces
  
  //equalnumber   lo so non é una x non rompe il cazzo
  } else if((this.sumcardsPlayer3 == 2 && (this.number3 == halfsum)) && isSplit3 == false){
    
    if(this.number3 == 10){
      x=28;
    } else if(this.number3 == 9){
      x=29;
    } else if(this.number3 == 8){
      x=30;
    } else if(this.number3 == 7){
      x=31;
    } else if(this.number3 == 6){
      x=32;
    } else if(this.number3 == 5){
      x=33;
    } else if(this.number3 == 4){
      x=34;
    } else if(this.number3 == 3){
      x=35;
    } else if(this.number3 == 2){
      x=36;
    }

    id = "table" + sumbankparsed + "_"+x;
    this.handValue3 = document.getElementById(id).innerText;
  //equal number

  }else{

    //cover non soft cases
      if(sumplayer3parsed == 11 && this.sumcardsPlayer3 ==2 && isSplit3 == false){
        x=23;
      } else if(sumplayer3parsed == 10 && this.sumcardsPlayer3 ==2 && isSplit3 == false){
        x=24;
      } else if(sumplayer3parsed == 9 && this.sumcardsPlayer3 ==2 && isSplit3 == false){
        x=25;
      } else if(isSoft3 && sumplayer3parsed == 20 && isSplit3 == false){
        x = 21;
      } else if(isSoft3 && sumplayer3parsed == 19 && isSplit3 == false){
        x = 22;
      //inizio tabella superiore
      } else if((isSoft3 && sumplayer3parsed == 20) && this.sumcardsPlayer3 >= 2) {
        x = 12;
      } else if((isSoft3 && sumplayer3parsed == 19) && this.sumcardsPlayer3 >= 2) {
        x = 13;
      } else if(isSoft3 && sumplayer3parsed == 18){
        x = 14;
      } else if(isSoft3 && sumplayer3parsed == 17){
        x = 15;
      } else if(isSoft3 && sumplayer3parsed == 16){
        x = 16;
      } else if(isSoft3 && sumplayer3parsed == 15){
        x = 17;
      } else if(isSoft3 && sumplayer3parsed == 14){
        x = 18;
      } else if(isSoft3 && sumplayer3parsed == 13){
        x = 19;
      } else if(sumplayer3parsed == 11 && this.sumcardsPlayer3 > 2){
        x=11;
      } else if(sumplayer3parsed == 12){
        x=10;
      } else if(sumplayer3parsed == 13){
        x=9;
      } else if(sumplayer3parsed == 14){
        x=8;
      } else if(sumplayer3parsed == 15){
        x=7;
      } else if(sumplayer3parsed == 16){
        x=6;
      } else if(sumplayer3parsed == 17){
        x=5;
      } else if(sumplayer3parsed == 18){
        x=4;
      } else if(sumplayer3parsed == 19){
        x=3;
      } else if(sumplayer3parsed == 20){
        x=2;
      } else if(sumplayer3parsed == 21){
        x=2;
      }

      if(x != 0){
      id = "table" + sumbankparsed + "_"+x;
      this.handValue3 = document.getElementById(id).innerText;
      } else {
        if(sumplayer3parsed == 21){
          this.handValue3 = "Stai";
        } else{
        this.handValue3 = "Carta";
        }
      }
  }
  
}
} else{  
  this.handValue3 = "Aggiungi la carta del banco";
}
  var span = document.getElementById("azione3");
  var spanText = this.handValue3;
  span.innerHTML = "";
  var txt = document.createTextNode(spanText);
  span.appendChild(txt);

}

function actionPlayer2() {

var sumplayer2Element = document.getElementById("sumplayer2");
var halfsum = parseInt(sumplayer2Element.innerHTML);
halfsum = halfsum / 2;
var addbank1Element = document.getElementById("addbank1");
var sumbankparsed = parseInt(addbank1Element.innerHTML);
var sumplayer2parsed = parseInt(sumplayer2Element.innerHTML);
var id;
var x = 0;
var y;
console.log(this.isSoft2);

if(addbank1Element.innerHTML >1){
  
if(this.sumcardsPlayer2 == 0){
  this.handValue2 = "Non seduto o senza carte servite";

} else if(parseInt(sumplayer2Element.innerHTML) > 21 && (this.number2 + parseInt(sumplayer2Element.innerHTML) != 33)){
  this.handValue2 = "Sballato!";

} else {

  //split aces
  if(this.number2 == 11 && parseInt(sumplayer2Element.innerHTML) == 22){
    var sumbankparsed = parseInt(addbank1Element.innerHTML);
    id = "table" + sumbankparsed + "_27";
    this.handValue2 = document.getElementById(id).innerHTML;
  //split aces
  
  //equalnumber   lo so non é una x non rompe il cazzo
  } else if((this.sumcardsPlayer2 == 2 && (this.number2 == halfsum)) && isSplit2 == false){
    
    if(this.number2 == 10){
      x=28;
    } else if(this.number2 == 9){
      x=29;
    } else if(this.number2 == 8){
      x=30;
    } else if(this.number2 == 7){
      x=31;
    } else if(this.number2 == 6){
      x=32;
    } else if(this.number2 == 5){
      x=33;
    } else if(this.number2 == 4){
      x=34;
    } else if(this.number2 == 3){
      x=35;
    } else if(this.number2 == 2){
      x=36;
    }

    id = "table" + sumbankparsed + "_"+x;
    this.handValue2 = document.getElementById(id).innerText;
  //equal number

  }else{

    //cover non soft cases
      if(sumplayer2parsed == 11 && this.sumcardsPlayer2 ==2 && isSplit2 == false){
        x=23;
      } else if(sumplayer2parsed == 10 && this.sumcardsPlayer2 ==2 && isSplit2 == false){
        x=24;
      } else if(sumplayer2parsed == 9 && this.sumcardsPlayer2 ==2 && isSplit2 == false){
        x=25;
      } else if(isSoft2 && sumplayer2parsed == 20 && isSplit2 == false){
        x = 21;
      } else if(isSoft2 && sumplayer2parsed == 19 && isSplit2 == false){
        x = 22;
      //inizio tabella superiore
      } else if((isSoft2 && sumplayer2parsed == 20) && this.sumcardsPlayer2 >= 2) {
        x = 12;
      } else if((isSoft2 && sumplayer2parsed == 19) && this.sumcardsPlayer2 >= 2) {
        x = 13;
      } else if(isSoft2 && sumplayer2parsed == 18){
        x = 14;
      } else if(isSoft2 && sumplayer2parsed == 17){
        x = 15;
      } else if(isSoft2 && sumplayer2parsed == 16){
        x = 16;
      } else if(isSoft2 && sumplayer2parsed == 15){
        x = 17;
      } else if(isSoft2 && sumplayer2parsed == 14){
        x = 18;
      } else if(isSoft2 && sumplayer2parsed == 13){
        x = 19;
      } else if(sumplayer2parsed == 11 && this.sumcardsPlayer2 > 2){
        x=11;
      } else if(sumplayer2parsed == 12){
        x=10;
      } else if(sumplayer2parsed == 13){
        x=9;
      } else if(sumplayer2parsed == 14){
        x=8;
      } else if(sumplayer2parsed == 15){
        x=7;
      } else if(sumplayer2parsed == 16){
        x=6;
      } else if(sumplayer2parsed == 17){
        x=5;
      } else if(sumplayer2parsed == 18){
        x=4;
      } else if(sumplayer2parsed == 19){
        x=3;
      } else if(sumplayer2parsed == 20){
        x=2;
      } else if(sumplayer2parsed == 21){
        x=2;
      }

      if(x != 0){
      id = "table" + sumbankparsed + "_"+x;
      this.handValue2 = document.getElementById(id).innerText;
      } else {
        if(sumplayer2parsed == 21){
          this.handValue2 = "Stai";
        } else{
        this.handValue2 = "Carta";
        }
      }
  }
  
}
} else{  
  this.handValue2 = "Aggiungi la carta del banco";
}
  var span = document.getElementById("azione2");
  var spanText = this.handValue2;
  span.innerHTML = "";
  var txt = document.createTextNode(spanText);
  span.appendChild(txt);

}

function actionPlayer1() {

var sumplayer1Element = document.getElementById("sumplayer1");
var halfsum = parseInt(sumplayer1Element.innerHTML);
halfsum = halfsum / 2;
var addbank1Element = document.getElementById("addbank1");
var sumbankparsed = parseInt(addbank1Element.innerHTML);
var sumplayer1parsed = parseInt(sumplayer1Element.innerHTML);
var id;
var x = 0;
var y;
console.log(this.isSoft1);

if(addbank1Element.innerHTML >1){
  
if(this.sumcardsPlayer1 == 0){
  this.handValue1 = "Non seduto o senza carte servite";

} else if(parseInt(sumplayer1Element.innerHTML) > 21 && (this.number1 + parseInt(sumplayer1Element.innerHTML) != 33)){
  this.handValue1 = "Sballato!";

} else {

  //split aces
  if(this.number1 == 11 && parseInt(sumplayer1Element.innerHTML) == 22){
    var sumbankparsed = parseInt(addbank1Element.innerHTML);
    id = "table" + sumbankparsed + "_27";
    this.handValue1 = document.getElementById(id).innerHTML;
  //split aces
  
  //equalnumber   lo so non é una x non rompe il cazzo
  } else if((this.sumcardsPlayer1 == 2 && (this.number1 == halfsum)) && isSplit1 == false){
    
    if(this.number1 == 10){
      x=28;
    } else if(this.number1 == 9){
      x=29;
    } else if(this.number1 == 8){
      x=30;
    } else if(this.number1 == 7){
      x=31;
    } else if(this.number1 == 6){
      x=32;
    } else if(this.number1 == 5){
      x=33;
    } else if(this.number1 == 4){
      x=34;
    } else if(this.number1 == 3){
      x=35;
    } else if(this.number1 == 2){
      x=36;
    }

    id = "table" + sumbankparsed + "_"+x;
    this.handValue1 = document.getElementById(id).innerText;
  //equal number

  }else{

    //cover non soft cases
      if(sumplayer1parsed == 11 && this.sumcardsPlayer1 ==2 && isSplit1 == false){
        x=23;
      } else if(sumplayer1parsed == 10 && this.sumcardsPlayer1 ==2 && isSplit1 == false){
        x=24;
      } else if(sumplayer1parsed == 9 && this.sumcardsPlayer1 ==2 && isSplit1 == false){
        x=25;
      } else if(isSoft1 && sumplayer1parsed == 20 && isSplit1 == false){
        x = 21;
      } else if(isSoft1 && sumplayer1parsed == 19 && isSplit1 == false){
        x = 22;
      //inizio tabella superiore
      } else if((isSoft1 && sumplayer1parsed == 20) && this.sumcardsPlayer1 >= 2) {
        x = 12;
      } else if((isSoft1 && sumplayer1parsed == 19) && this.sumcardsPlayer1 >= 2) {
        x = 13;
      } else if(isSoft1 && sumplayer1parsed == 18){
        x = 14;
      } else if(isSoft1 && sumplayer1parsed == 17){
        x = 15;
      } else if(isSoft1 && sumplayer1parsed == 16){
        x = 16;
      } else if(isSoft1 && sumplayer1parsed == 15){
        x = 17;
      } else if(isSoft1 && sumplayer1parsed == 14){
        x = 18;
      } else if(isSoft1 && sumplayer1parsed == 13){
        x = 19;
      } else if(sumplayer1parsed == 11 && this.sumcardsPlayer1 > 2){
        x=11;
      } else if(sumplayer1parsed == 12){
        x=10;
      } else if(sumplayer1parsed == 13){
        x=9;
      } else if(sumplayer1parsed == 14){
        x=8;
      } else if(sumplayer1parsed == 15){
        x=7;
      } else if(sumplayer1parsed == 16){
        x=6;
      } else if(sumplayer1parsed == 17){
        x=5;
      } else if(sumplayer1parsed == 18){
        x=4;
      } else if(sumplayer1parsed == 19){
        x=3;
      } else if(sumplayer1parsed == 20){
        x=2;
      } else if(sumplayer1parsed == 21){
        x=2;
      }

      if(x != 0){
      id = "table" + sumbankparsed + "_"+x;
      this.handValue1 = document.getElementById(id).innerText;
      } else {
        if(sumplayer1parsed == 21){
          this.handValue1 = "Stai";
        } else{
        this.handValue1 = "Carta";
        }
      }
  }
  
}
} else{  
  this.handValue1 = "Aggiungi la carta del banco";
}
  var span = document.getElementById("azione1");
  var spanText = this.handValue1;
  span.innerHTML = "";
  var txt = document.createTextNode(spanText);
  span.appendChild(txt);

}
//fine logica mani 

//inizio logica split e mani splittate
async function splitHand1() {
await Compute1();

var sumplayer1Element = document.getElementById("sumplayer1");
var currentSum = parseInt(sumplayer1Element.innerHTML);
var sumSplit1 = document.getElementById("sumsplit1");

if(this.number1 == (currentSum/2) && sumcardsPlayer1 == 2){
  sumplayer1Element.innerHTML = (currentSum /2);
  sumcardsPlayer1--;
  sumSplit1.innerHTML = this.number1;
  isSplit1 = true;
  console.log("issplit" + isSplit1);

  var sumSplit1Value = parseInt(document.getElementById("sumsplit1").innerHTML);
  if(sumSplit1Value == 11){
    this.isSoft1_1 = true;
  }
}



}

async function splitHand3() {
await Compute1();

var sumplayer3Element = document.getElementById("sumplayer3");
var currentSum = parseInt(sumplayer3Element.innerHTML);
var sumSplit3 = document.getElementById("sumsplit3");

if(this.number3 == (currentSum/2) && sumcardsPlayer3 == 2){
  sumplayer3Element.innerHTML = (currentSum /2);
  sumcardsPlayer3--;
  sumSplit3.innerHTML = this.number3;
  isSplit3 = true;
  console.log("issplit3" + isSplit3);

  var sumSplit3Value = parseInt(document.getElementById("sumsplit3").innerHTML);
  if(sumSplit3Value == 11){
    this.isSoft3_1 = true;
  }
} 


}

async function splitHand2() {
await Compute1();

var sumplayer2Element = document.getElementById("sumplayer2");
var currentSum = parseInt(sumplayer2Element.innerHTML);
var sumSplit2 = document.getElementById("sumsplit2");

if(this.number2 == (currentSum/2) && sumcardsPlayer2 == 2){
  sumplayer2Element.innerHTML = (currentSum /2);
  sumcardsPlayer2--;
  sumSplit2.innerHTML = this.number2;
  isSplit2 = true;
  
  console.log("issplit" + isSplit2);

  var sumSplit2Value = parseInt(document.getElementById("sumsplit2").innerHTML);
  if(sumSplit2Value == 11){
    this.isSoft2_1 = true;
  }
} 


}

//fine logica split

// inizio azioni add
async function addsumplayerSplit3(number){
  console.log(isSoft3_1);
var sumplayersplit3Element = document.getElementById("sumsplit3");
var currentSum = parseInt(sumplayersplit3Element.innerHTML);

if(currentSum > 1){
  var newSum = currentSum + number;
  sumplayersplit3Element.innerHTML = newSum;
  this.sumcardsPlayerSplit3+=1;
  check();
  await RefreshPage();
  await Compute1();


  if(number == 11 && (currentSum+number) < 22){
    this.isSoft3_1 = true;
  } else if(((currentSum+number) >= 22 && this.isSoft3_1)&& number != 11){
    this.isSoft3_1 = false;
    sumplayersplit3Element.innerHTML = (newSum - 10);
  } else if(((currentSum+number) >= 22 && this.isSoft3_1)&& number == 11){
    sumplayersplit3Element.innerHTML = (newSum - 10);
  } else if(((currentSum+number) >= 22 && !this.isSoft3_1)&& number == 11){ 
    this.isSoft3_1 = false;
    sumplayersplit3Element.innerHTML = (newSum - 10);
  } else if((sumcardsPlayerSplit3 > 2 && this.isSoft3_1)&& number == 11){
    sumplayersplit3Element.innerHTML = (newSum - 10);
  }

  this.number3_1 = number;
  actionPlayerSplit3();

}
  
}

async function addsumplayerSplit2(number){

var sumplayersplit2Element = document.getElementById("sumsplit2");
var currentSum = parseInt(sumplayersplit2Element.innerHTML);

if(currentSum > 1){
var newSum = currentSum + number;
sumplayersplit2Element.innerHTML = newSum;
this.sumcardsPlayerSplit2+=1;
check();
await RefreshPage();
await Compute1();


if(number == 11 && (currentSum+number) < 22){
  this.isSoft2_1 = true;
} else if(((currentSum+number) >= 22 && this.isSoft2_1)&& number != 11){
  this.isSoft2_1 = false;
  sumplayersplit2Element.innerHTML = (newSum - 10);
} else if(((currentSum+number) >= 22 && this.isSoft2_1)&& number == 11){
  sumplayersplit2Element.innerHTML = (newSum - 10);
} else if(((currentSum+number) >= 22 && !this.isSoft2_1)&& number == 11){ 
  this.isSoft2_1 = false;
  sumplayersplit2Element.innerHTML = (newSum - 10);
}else if((sumcardsPlayerSplit2 > 2 && this.isSoft2_1)&& number == 11){
  sumplayersplit2Element.innerHTML = (newSum - 10);
}

this.number2_1 = number;
actionPlayerSplit2();

}

}

async function addsumplayerSplit1(number){
console.log(isSoft1_1);
var sumplayersplit1Element = document.getElementById("sumsplit1");
var currentSum = parseInt(sumplayersplit1Element.innerHTML);

if(currentSum > 1){
var newSum = currentSum + number;
sumplayersplit1Element.innerHTML = newSum;
this.sumcardsPlayerSplit1+=1;
check();
await RefreshPage();
await Compute1();


if(number == 11 && (currentSum+number) < 22){
  this.isSoft1_1 = true;
} else if(((currentSum+number) >= 22 && this.isSoft1_1)&& number != 11){
  this.isSoft1_1 = false;
  sumplayersplit1Element.innerHTML = (newSum - 10);
} else if(((currentSum+number) >= 22 && this.isSoft1_1)&& number == 11){
  sumplayersplit1Element.innerHTML = (newSum - 10);
} else if(((currentSum+number) >= 22 && !this.isSoft1_1)&& number == 11){ 
  this.isSoft1_1 = false;
  sumplayersplit1Element.innerHTML = (newSum - 10);
} else if((sumcardsPlayerSplit1 > 2 && this.isSoft1_1)&& number == 11){
  sumplayersplit1Element.innerHTML = (newSum - 10);
}

this.number1_1 = number;
actionPlayerSplit1();

}

}
//fine azioni add

//inizio azioni mani splittate

function actionPlayerSplit3(){


var sumsplit3Element = document.getElementById("sumsplit3");
var halfsum = parseInt(sumsplit3Element.innerHTML);
halfsum = halfsum / 2;
var addbank1Element = document.getElementById("addbank1");
var sumbankparsed = parseInt(addbank1Element.innerHTML);
var sumplayer3parsedSplit = parseInt(sumsplit3Element.innerHTML);
var id;
var x = 0;
var y;
console.log(this.isSoft3_1);


if(sumbankparsed >1){
  
  if(this.sumcardsPlayerSplit3 == 0){
    this.handValue3_1 = "";
  
  } else if(parseInt(sumsplit3Element.innerHTML) > 21 && (this.number3_1 + parseInt(sumsplit3Element.innerHTML) != 33)){
    this.handValue3_1 = "Sballato!";
  
  } else {
        
        if((isSoft3_1 && sumplayer3parsedSplit == 20) && this.sumcardsPlayerSplit3 >= 2) {
          x = 12;
        } else if((isSoft3_1 && sumplayer3parsedSplit == 19) && this.sumcardsPlayerSplit3 >= 2) {
          x = 13;
        } else if(isSoft3_1 && sumplayer3parsedSplit == 18){
          x = 14;
        } else if(isSoft3_1 && sumplayer3parsedSplit == 17){
          x = 15;
        } else if(isSoft3_1 && sumplayer3parsedSplit == 16){
          x = 16;
        } else if(isSoft3_1 && sumplayer3parsedSplit == 15){
          x = 17;
        } else if(isSoft3_1 && sumplayer3parsedSplit == 14){
          x = 18;
        } else if(isSoft3_1 && sumplayer3parsedSplit == 13){
          x = 19;
        } else if(sumplayer3parsedSplit == 11 && this.sumcardsPlayerSplit3 > 2){
          x=11;
        } else if(sumplayer3parsedSplit == 12){
          x=10;
        } else if(sumplayer3parsedSplit == 13){
          x=9;
        } else if(sumplayer3parsedSplit == 14){
          x=8;
        } else if(sumplayer3parsedSplit == 15){
          x=7;
        } else if(sumplayer3parsedSplit == 16){
          x=6;
        } else if(sumplayer3parsedSplit == 17){
          x=5;
        } else if(sumplayer3parsedSplit == 18){
          x=4;
        } else if(sumplayer3parsedSplit == 19){
          x=3;
        } else if(sumplayer3parsedSplit == 20){
          x=2;
        } else if(sumplayer3parsedSplit == 21){
          x=2;
        }

        if(x != 0){
        id = "table" + sumbankparsed + "_"+x;
        this.handValue3_1 = document.getElementById(id).innerText;
        } else {
          if(sumplayer3parsedSplit == 21){
            this.handValue3_1 = "Stai";
          } else{
          this.handValue3_1 = "Carta";
          }
        }
    
  }
} else{  
    this.handValue3_1 = "Aggiungi la carta del banco";
}
    var span = document.getElementById("azionesplit3");
    var spanText = this.handValue3_1;
    span.innerHTML = "";
    var txt = document.createTextNode(spanText);
    span.appendChild(txt);

}

function actionPlayerSplit2(){


var sumsplit2Element = document.getElementById("sumsplit2");
var halfsum = parseInt(sumsplit2Element.innerHTML);
halfsum = halfsum / 2;
var addbank1Element = document.getElementById("addbank1");
var sumbankparsed = parseInt(addbank1Element.innerHTML);
var sumplayer2parsedSplit = parseInt(sumsplit2Element.innerHTML);
var id;
var x = 0;
var y;
console.log(this.isSoft2_1);


if(sumbankparsed >1){

if(this.sumcardsPlayerSplit2 == 0){
  this.handValue2_1 = "";

} else if(parseInt(sumsplit2Element.innerHTML) > 21 && (this.number2_1 + parseInt(sumsplit2Element.innerHTML) != 33)){
  this.handValue2_1 = "Sballato!";

} else {
      
      if((isSoft2_1 && sumplayer2parsedSplit == 20) && this.sumcardsPlayerSplit2 >= 2) {
        x = 12;
      } else if((isSoft2_1 && sumplayer2parsedSplit == 19) && this.sumcardsPlayerSplit2 >= 2) {
        x = 13;
      } else if(isSoft2_1 && sumplayer2parsedSplit == 18){
        x = 14;
      } else if(isSoft2_1 && sumplayer2parsedSplit == 17){
        x = 15;
      } else if(isSoft2_1 && sumplayer2parsedSplit == 16){
        x = 16;
      } else if(isSoft2_1 && sumplayer2parsedSplit == 15){
        x = 17;
      } else if(isSoft2_1 && sumplayer2parsedSplit == 14){
        x = 18;
      } else if(isSoft2_1 && sumplayer2parsedSplit == 13){
        x = 19;
      } else if(sumplayer2parsedSplit == 11 && this.sumcardsPlayerSplit2 > 2){
        x=11;
      } else if(sumplayer2parsedSplit == 12){
        x=10;
      } else if(sumplayer2parsedSplit == 13){
        x=9;
      } else if(sumplayer2parsedSplit == 14){
        x=8;
      } else if(sumplayer2parsedSplit == 15){
        x=7;
      } else if(sumplayer2parsedSplit == 16){
        x=6;
      } else if(sumplayer2parsedSplit == 17){
        x=5;
      } else if(sumplayer2parsedSplit == 18){
        x=4;
      } else if(sumplayer2parsedSplit == 19){
        x=3;
      } else if(sumplayer2parsedSplit == 20){
        x=2;
      } else if(sumplayer2parsedSplit == 21){
        x=2;
      }

      if(x != 0){
      id = "table" + sumbankparsed + "_"+x;
      this.handValue2_1 = document.getElementById(id).innerText;
      } else {
        if(sumplayer2parsedSplit == 21){
          this.handValue2_1 = "Stai";
        } else{
        this.handValue2_1 = "Carta";
        }
      }
  
}
} else{  
  this.handValue2_1 = "Aggiungi la carta del banco";
}
  var span = document.getElementById("azionesplit2");
  var spanText = this.handValue2_1;
  span.innerHTML = "";
  var txt = document.createTextNode(spanText);
  span.appendChild(txt);

}

function actionPlayerSplit1(){


var sumsplit1Element = document.getElementById("sumsplit1");
var halfsum = parseInt(sumsplit1Element.innerHTML);
halfsum = halfsum / 2;
var addbank1Element = document.getElementById("addbank1");
var sumbankparsed = parseInt(addbank1Element.innerHTML);
var sumplayer1parsedSplit = parseInt(sumsplit1Element.innerHTML);
var id;
var x = 0;
var y;
console.log(this.isSoft1_1);


if(sumbankparsed >1){

if(this.sumcardsPlayerSplit1 == 0){
  this.handValue1_1 = "";

} else if(parseInt(sumsplit1Element.innerHTML) > 21 && (this.number1_1 + parseInt(sumsplit1Element.innerHTML) != 33)){
  this.handValue1_1 = "Sballato!";

} else {
      
      if((isSoft1_1 && sumplayer1parsedSplit == 20) && this.sumcardsPlayerSplit1 >= 2) {
        x = 12;
      } else if((isSoft1_1 && sumplayer1parsedSplit == 19) && this.sumcardsPlayerSplit1 >= 2) {
        x = 13;
      } else if(isSoft1_1 && sumplayer1parsedSplit == 18){
        x = 14;
      } else if(isSoft1_1 && sumplayer1parsedSplit == 17){
        x = 15;
      } else if(isSoft1_1 && sumplayer1parsedSplit == 16){
        x = 16;
      } else if(isSoft1_1 && sumplayer1parsedSplit == 15){
        x = 17;
      } else if(isSoft1_1 && sumplayer1parsedSplit == 14){
        x = 18;
      } else if(isSoft1_1 && sumplayer1parsedSplit == 13){
        x = 19;
      } else if(sumplayer1parsedSplit == 11 && this.sumcardsPlayerSplit1 > 2){
        x=11;
      } else if(sumplayer1parsedSplit == 12){
        x=10;
      } else if(sumplayer1parsedSplit == 13){
        x=9;
      } else if(sumplayer1parsedSplit == 14){
        x=8;
      } else if(sumplayer1parsedSplit == 15){
        x=7;
      } else if(sumplayer1parsedSplit == 16){
        x=6;
      } else if(sumplayer1parsedSplit == 17){
        x=5;
      } else if(sumplayer1parsedSplit == 18){
        x=4;
      } else if(sumplayer1parsedSplit == 19){
        x=3;
      } else if(sumplayer1parsedSplit == 20){
        x=2;
      } else if(sumplayer1parsedSplit == 21){
        x=2;
      }

      if(x != 0){
      id = "table" + sumbankparsed + "_"+x;
      this.handValue1_1 = document.getElementById(id).innerText;
      } else {
        if(sumplayer1parsedSplit == 21){
          this.handValue1_1 = "Stai";
        } else{
        this.handValue1_1 = "Carta";
        }
      }
  
}
} else{  
  this.handValue1_1 = "Aggiungi la carta del banco";
}
  var span = document.getElementById("azionesplit1");
  var spanText = this.handValue1_1;
  span.innerHTML = "";
  var txt = document.createTextNode(spanText);
  span.appendChild(txt);

}