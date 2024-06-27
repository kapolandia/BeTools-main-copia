// Wertigkeiten der Flags für spezielle Blätter:
var soft = 1;                  // Softhand (mit As als 11)
var first = 2;                 // Blatt, das aus einer Karte besteht
var second = 4;                // Blatt, das aus zwei Karten besteht 
var Dd_poss = 8;               // Double down: jetzt oder später erlaubt (bei 0-2 Karten)
var Split_poss = 16;           // Teilen: jetzt oder später erlaubt (bei 0-2 Karten)
var noBJ = 32;                 // Kein Black Jack möglich (z.B. nach Splitting)
var x = 0;
var y = 1;
var spanText;



// == Black-Jack-Hand =================================================== 


function BJ_Hand(KartSum, Flags) {
  // Eigenschaften:
  this.KartSum = KartSum; // Summe der Kartenwerte (As möglichst mit 11, max. 22)
  this.Flags = Flags; // Summe der Flags (soft, first, second, Dd_poss, Split_poss)

  this.GewinnErwStand = -100; // Init. für Gewinnerw. bei Stand
  this.GewinnErwOpt = -100; // Initialisierung für Gewinnerw. bei opt.Spiel
  this.ZugOpt = ""; // Initialisierung für optimalen Zug


  // Methoden:
  this.AsString = Bezeichnung; // eindeutige Kennung
  this.Flag = Flag; // Bestimmung eines Flags
  this.IsBJ = IsBJ; // Flag, ob Black Jack
  this.Ziehe = Ziehe; // Kartenblatt nach dem Ziehen einer Karte

  this.WvHandNachKarte = WvHandNachKarte;
  // Wahr.vert. nach Ziehung einer Karte
}


function Bezeichnung()
// derart gleich bezeichnete Hände sind spielerisch äquivalent:
{
  if (this.KartSum == 22)
    return "verk";
  if (this.IsBJ())
    return "BJ";
  if (this.Flags > 0)
    return this.KartSum + "f" + this.Flags;

  return this.KartSum + "";
}


function Flag(Gewicht)
// für ein oder mehrere Gewichte (z.B. Flag(soft+second))
{
  return ((this.Flags & Gewicht) == Gewicht);
}

function IsBJ() {
  return (this.Flag(second) && (this.KartSum == 21) && !(this.Flag(noBJ)));
}

function Ziehe(Karte)
// ermittelt neue BJ-Hand, die durch Ziehen einer Karte zur
// aktuellen BJ-Hand entsteht (Karte=2..11).
// 11s ist das Pseudo-Blatt, das aus einem Ass besteht, aber (z.B. nach einem
// Splitt keinen Black Jack hervorbringen kann).
{

  var flagsneu;
  var As11Anz;

  if (this.KartSum == 0)
    // es handelt sich um die erste Karte:
    return new BJ_Hand(Karte, this.Flags + first + (Karte == 11 ? soft : 0));

  if (this.Flag(first)) {
    // es handelt sich um die zweite Karte:
    flagsneu = second + ((this.KartSum == 11) || (Karte == 11) ? soft : 0);
    sum = this.KartSum + Karte;
    if ((sum == 21) && this.Flag(noBJ))
      flagsneu = flagsneu + noBJ;                    // Sonderfall "kein Black Jack" nur bei 21 möglich
    if (sum == 22)
      sum = 12;
    // prüfe, ob bestehende Flags Dd_poss und Split_poss beibehalten werden:
    if (this.Flag(Dd_poss)) {
      if ((sum >= 9) && (sum <= 11))
        flagsneu = flagsneu + Dd_poss;
      if ((sum >= 19) && (sum <= 20) && ((flagsneu & soft) == soft))
        flagsneu = flagsneu + Dd_poss;
    }
    if (this.Flag(Split_poss))
      if (this.KartSum == Karte)
        flagsneu = flagsneu + Split_poss;
    return new BJ_Hand(sum, flagsneu);
  }

  // es handelt sich mind. um die dritte Karte:
  As11Anz = (this.Flag(soft) ? 1 : 0) + ((Karte == 11) ? 1 : 0);
  sum = this.KartSum + Karte;
  if ((sum >= 22) && (As11Anz > 0)) {
    As11Anz--;
    sum = sum - 10;
  }
  if (sum > 22)
    sum = 22;
  return new BJ_Hand(sum, (As11Anz > 0) ? soft : 0);

}

function WvHandNachKarte(WvKartenwerte)
// erstellt eine Wahr.vert. für die BJ-Hände, wenn ausgehend von aktueller
// Hand eine Karte gemäß der der Wahr.vert. WvKartenwerte gezogen wird:
{
  var ret, s, Karte, HandNeu;
  ret = new WahrVert();
  for (s in WvKartenwerte.List()) {
    Karte = WvKartenwerte.ErgebnisLfd(s);
    HandNeu = this.Ziehe(Karte);
    ret.AddProb(HandNeu, WvKartenwerte.ProbLfd(s));
  }
  return ret;
}

function BJ_Hands(Bankkarte, WvKartenwerte, RegelVariante, BJ_Check, Draw17s) {
  var BJ;
  // Eigenschaften:
  this.Bankkarte = Bankkarte; // erste Karte der Bank
  this.WvKartenwerte = WvKartenwerte; // Wahr.vert. der Karten
  this.RegelVariante = RegelVariante; // Splitting-Variante




  // 0: kein Teilen und Doppeln nach Teilen
  // 1: mehrfaches Teilen möglich
  // 2: Doppeln und Teilen nach Teilen
  // 3: Doppeln, aber kein Teilen nach Teilen
  this.BJ_Check = BJ_Check; // Flag für US-Variante
  this.WvBankBlatt = WvBankBlatt(Bankkarte, WvKartenwerte, Draw17s); //Wahr.vert.d.Bank
  this.BJ_Bank = this.WvBankBlatt.Prob(new BJ_Hand(21, second + soft)); // Wahr. für direkt aufgedeckten Bank-BJ
  if (this.BJ_Check) {
    BJ = new BJ_Hand(21, second + soft);
    // Wahr. für direkt aufgedeckten Bank-BJ (bei der US-Variante):
    this.BJ_BankDirekt = this.WvBankBlatt.Prob(BJ);
    this.WvBankBlatt.SetProb(BJ, 0);
    this.WvBankBlatt.Normiere(); //bedingte Wahr.vert. der Bank (bedingt zum Ereignis "kein BJ")
  }

  else
    this.BJ_BankDirekt = 0;

  this.HandsAnalysiert = new set(); // bereits analysierte Hände


  // Methoden:
  this.GewinnErwStand = GewinnErwStand;
  this.GewinnErwOpt = GewinnErwOpt;
  this.GewinnErwDraw = GewinnErwDraw;
  this.GewinnErwDraw1 = GewinnErwDraw1;

  this.Analysiere = Analysiere;
}

function GewinnErwStand(Hand)
// Gewinnerwartung des Spielers, falls er mit Hand nicht mehr zieht
// (liest gespeicherten Wert bzw. berechnet ggf. vorher):
{
  var HandRef;
  HandRef = this.HandsAnalysiert.ElementRef(Hand);
  if (ObjectIsUndefined(HandRef)) {
    this.Analysiere(Hand);
    HandRef = Hand;

  }
  return HandRef.GewinnErwStand;
}

function GewinnErwOpt(Hand) {
  var HandRef;
  HandRef = this.HandsAnalysiert.ElementRef(Hand);
  if (ObjectIsUndefined(HandRef)) {
    this.Analysiere(Hand);
    HandRef = Hand;
  }
  return HandRef.GewinnErwOpt;
}

function ZugOpt(Hand)
// optimaler Zug für Hand
// (liest gespeicherten Wert bzw. berechnet ggf. vorher):
{
  var HandRef;
  HandRef = this.HandsAnalysiert.ElementRef(Hand);
  if (ObjectIsUndefined(HandRef)) {
    this.Analysiere(Hand);
    HandRef = Hand;
  }
  return HandRef.ZugOpt;
}

function GewinnErwDraw(Hand)
// Gewinnerwartung des Spielers, falls er eine Karte zieht und optimal
// weiterspielt:
{
  var ret, s, WvNeu;
  ret = 0;
  WvNeu = Hand.WvHandNachKarte(this.WvKartenwerte);
  for (s in WvNeu.List())
    ret = ret + this.GewinnErwOpt(WvNeu.ErgebnisLfd(s)) * WvNeu.ProbLfd(s);
  return ret;
}

function GewinnErwDraw1(Hand)
// Gewinnerwartung des Spielers, falls er genau eine weitere Karte zieht:
{
  var ret, s, WvNeu;
  ret = 0;
  WvNeu = Hand.WvHandNachKarte(this.WvKartenwerte);
  for (s in WvNeu.List())
    ret = ret + this.GewinnErwStand(WvNeu.ErgebnisLfd(s)) * WvNeu.ProbLfd(s);

  return ret;
}

function Analysiere(Hand)
// analysierte die Black-Jack-Hand Hand (Referenz "Hand" wird eingebaut!)
{
  var ErwAkt, s, sum, HandNeu, k, ProbRepeat, FlagsNeu;

  this.HandsAnalysiert.AddElement(Hand);  // Einträge erfolgen sogleich ...

  // berechne Erwartung bei Stand:
  sum = 0;
  for (s in this.WvBankBlatt.List())
    sum = sum + Gewinn(this.WvBankBlatt.ErgebnisLfd(s), Hand) * this.WvBankBlatt.ProbLfd(s);
  Hand.GewinnErwStand = sum;
  Hand.GewinnErwOpt = sum;
  Hand.ZugOpt = "Stai";

  // vergleiche nun mit Erwartung für das Ziehen einer weiteren Karte:
  ErwAkt = this.GewinnErwDraw(Hand);
  if (this.BJ_Check && (Hand.KartSum == 0))
    // Modifikation für amerikan. Variante: BJ der Bank gewinnt sofort (außer gegen BJ des Spielers):
    ErwAkt = this.BJ_BankDirekt * (1 - 2 * this.WvKartenwerte.Prob(10) * this.WvKartenwerte.Prob(11)) * (-1) + (1 - this.BJ_BankDirekt) * ErwAkt;

  if (ErwAkt > Hand.GewinnErwOpt) {
    Hand.GewinnErwOpt = ErwAkt;
    Hand.ZugOpt = "Carta";
  }

  // berechne ggf. Erwartung bei Double-Down:
  if (Hand.Flag(Dd_poss + second)) {
    if (Hand.Flag(soft))
      HandNeu = new BJ_Hand(Hand.KartSum - 10, second);
    else
      HandNeu = new BJ_Hand(Hand.KartSum, second);
    ErwAkt = 2 * this.GewinnErwDraw1(HandNeu);

    if (ErwAkt > Hand.GewinnErwOpt) {
      Hand.GewinnErwOpt = ErwAkt;
      Hand.ZugOpt = "x2";
    }
  }

  // berechne ggf. Erwartung beim Teilen:
  if (Hand.Flag(Split_poss + second)) {
    // bestimme zu splittende Karte:
    if (Hand.Flag(soft))
      k = 11;
    else
      k = Hand.KartSum / 2;                       // Splitting von "k-k"?

    if ((this.RegelVariante == 0) || (this.RegelVariante == 3)) {
      // kein Resplit möglich:
      if (k == 11) {
        HandNeu = new BJ_Hand(11, first + soft + noBJ);
        // zu geteiltem As nur noch eine Karte:
        ErwAkt = 2 * this.GewinnErwDraw1(HandNeu);
      }
      else {
        FlagsNeu = first;
        if ((this.RegelVariante == 2) || (this.RegelVariante == 3))
          FlagsNeu = FlagsNeu + Dd_poss;                       // ggf. Double down nach Split
        if (k == 10)
          FlagsNeu = FlagsNeu + noBJ;                          // kein Black Jack nach Split von 10-10
        HandNeu = new BJ_Hand(k, FlagsNeu);
        ErwAkt = 2 * this.GewinnErwDraw(HandNeu);
      }
    }
    else {
      // Regelvarianten 1 und 2, d.h.
      // Resplit ist möglich; zunächst Wahrscheinlichkeit für Folge-Splits:
      ProbRepeat = this.WvKartenwerte.Prob(k);

      // beachte: Erw(Teile k-k) = 2*(ProbRepeat*Erw(Teile k-k) + Summe[i ungleich k; Prob(i)*Erw(i+k)], also
      // Erw(Teile k-k)=2/(1-2*ProbRepeat)*Summe[...], wobei die Summe aus dem Fall "Ziehen zur Einzelkarte k"
      // berechenbar ist:

      if (k == 11) {
        FlagsNeu = first + soft + noBJ;
        // zu geteiltem As nur noch eine Karte:
        sum = this.GewinnErwDraw1(new BJ_Hand(11, FlagsNeu))
        sum = sum - this.GewinnErwStand(new BJ_Hand(12, soft)) * this.WvKartenwerte.Prob(11);
        ErwAkt = 2 / (1 - 2 * ProbRepeat) * sum;
      }
      else {
        FlagsNeu = first;
        if (this.RegelVariante == 2)
          FlagsNeu = FlagsNeu + Dd_poss;                       // ggf. Double down nach Split
        if (k == 10)
          FlagsNeu = FlagsNeu + noBJ;                           // kein Black Jack nach Split von 10-10
        sum = this.GewinnErwDraw(new BJ_Hand(k, FlagsNeu))
        sum = sum - this.GewinnErwOpt(new BJ_Hand(2 * k, ((k == 5) && (this.Regelvariante == 2)) ? second + Dd_poss : 0)) * this.WvKartenwerte.Prob(k);
        ErwAkt = 2 / (1 - 2 * ProbRepeat) * sum;
      }
    }

    if (ErwAkt > Hand.GewinnErwOpt) {
      Hand.GewinnErwOpt = ErwAkt;
      Hand.ZugOpt = "Split";
    }
  }
}


function WvBankBlatt(Bankkarte, WvKartenwerte, Draw17s)
// berechnet die Endverteilung der Bank in Abhängigkeit der 
// (ersten) Bankkarte sowie Wahr.vert. der Kartenwerte
{
  var WvAlt, WvNeu, Karte, Hand, s, WvEnd;
  WvNeu = new WahrVert();
  Hand = new BJ_Hand(Bankkarte, ((Bankkarte == 11) ? soft : 0) + first);
  WvNeu.AddProb(Hand, 1.0);
  WvEnd = new WahrVert();

  do {
    // Ziehe eine (weitere) Karte, sofern noch nicht 17 erreicht:
    WvAlt = WvNeu.Copy();
    WvNeu = new WahrVert();
    for (s in WvAlt.List()) {
      Hand = WvAlt.ErgebnisLfd(s);
      if ((Hand.KartSum <= 16) || (Draw17s && Hand.Flag(soft) && (Hand.KartSum == 17)))
        // Bank zieht bis 16 (und ggf. auch bei soft-17):
        WvNeu.AddWv(WvAlt.ProbLfd(s), Hand.WvHandNachKarte(WvKartenwerte));
      else
        // Bank zieht über 16 nicht mehr (auch bei Softhands, außer ggf. bei 17):
        WvEnd.AddProb(Hand, WvAlt.ProbLfd(s));
    }
  }
  while (WvNeu.SumProb() > 0)

  // Endverteilung ist erreicht; wandle nun Softhands etc. in Hardhands um:
  WvNeu = new WahrVert();
  for (s in WvEnd.List()) {
    Hand = WvEnd.ErgebnisLfd(s);
    if (!Hand.IsBJ())
      Hand.Flags = 0;                                      // nur Black Jack wird separat berücksichtigt
    WvNeu.AddProb(Hand, WvEnd.ProbLfd(s));
  }
  return WvNeu;
}


function Gewinn(BankHand, SpielerHand)
// Gewinn(saldo) abhängig von den BJ-Händen von Bank und Spieler:
{
  if (SpielerHand.KartSum > 21)
    return -1;

  if (SpielerHand.IsBJ()) {
    if (BankHand.IsBJ())
      return 0;
    else
      return 1.5;
  }

  if (BankHand.IsBJ())
    return -1;

  if (BankHand.KartSum > 21)
    return 1;
  if (SpielerHand.KartSum > BankHand.KartSum)
    return 1;
  if (SpielerHand.KartSum < BankHand.KartSum)
    return -1;
  return 0;
}


function BJ_Analyse(WvKartenwerte, RegelVariante, BJ_Check, Draw17s, Details) {
  // Eigenschaften:
  this.WvKartenwerte = WvKartenwerte; // Wahr.vert. der Karten
  this.RegelVariante = RegelVariante; // Regelvariante bzgl."nach Splitt" (0..3)
  this.BJ_Check = BJ_Check; // direkter Black-Jack-Check der Bank (US-Regel)
  this.Draw17s = Draw17s; // Bank zieht bei soft-17
  this.Details = Details;
  this.BJ_Hands = new Array();

  // Methoden:
  this.Compute = Compute;
  this.PrintResult = PrintResult;
}


function Compute()
// führt die gesamte Berechnung zu einer vorgegebenen Wahr.vert. der
// Kartenwerte durch:
{
  var Bankkarte;
  for (Bankkarte = 2; Bankkarte <= 11; Bankkarte++) {
    this.BJ_Hands[Bankkarte] = new BJ_Hands(Bankkarte, this.WvKartenwerte, this.RegelVariante, this.BJ_Check, this.Draw17s);
    this.BJ_Hands[Bankkarte].Analysiere(new BJ_Hand(0, Dd_poss + Split_poss));

    this.BJ_Hands[Bankkarte].Analysiere(new BJ_Hand(0, 0));                  //ohne Split, Dd
    this.BJ_Hands[Bankkarte].Analysiere(new BJ_Hand(10, second + Split_poss));  //ohne Dd.
    // letztere wg. der BJ-Hände, die in den Strategie-Tabellen vorkommen
  }
}

function PrintResult(subtitle) {
  var txt, s, bvar, Hand, sum;
  txt = "";
  var sum1 = 0;
  bvar = 0;
  Hand = new BJ_Hand(0, Split_poss + Dd_poss);


  for (bvar = 2; bvar <= 11; bvar++) {

    // Calculate the value to be added to sum1
    var handsAnalysiert = this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString());
    var gewinnErwOpt = handsAnalysiert.GewinnErwOpt;
    var prob = this.WvKartenwerte.Prob(bvar);
    var valueToAdd = gewinnErwOpt * prob;


    // Add the value to sum1
    sum1 = sum1 + valueToAdd;

    // Log the updated sum1 after the addition
  }



  txt = txt + "</tr>\n";

  txt = txt + "</table><br>";

  //rtp bar

  txt = txt + "<big>RTP: <b><span id='rtp'>" + (100 + (sum1 * 100000) / 1000) + "</span>%</b><br></big>";

  var sumbackup = (100 + (sum1 * 100000) / 1000);
  sumbackup = sumbackup.toFixed(3);
  var rtpshow = document.getElementById("rtpshow");
  rtpshow.innerHTML = sumbackup + "%";
  var rtpbar = document.getElementById("rtpbar");
  var widthbar = ((sumbackup - 90) * 0.02) * 200;

  //calcola larghezza
  if (widthbar > 100) {
    widthbar = 100;
    rtpbar.style.backgroundColor = "#93FAA5";
  } else if (sumbackup > 100) {
    rtpbar.style.backgroundColor = "#93FAA5";
  } else if (sumbackup > 95 && sumbackup < 100) {
    rtpbar.style.backgroundColor = "#d4ffb3";
  } else if (sumbackup < 95) {
    rtpbar.style.backgroundColor = "#FF8888";
  } else if (sumbackup < 91) {
    rtpbar.style.backgroundColor = "#ff3939";
  }


  rtpbar.style.width = widthbar + "%";


  // fine rtp bar

  myAss = document.getElementById("bljack-assurance")
  if (this.WvKartenwerte.Prob(10) <= 1 / 3){
    txt = txt + "(<b>Non</b> assicurarti)";
    myAss.innerHTML = "Non assicurarti.";
  }
  else {
    sum1 = sum1 + this.WvKartenwerte.Prob(11) * (3 * this.WvKartenwerte.Prob(10) - 1) / 2;
    txt = txt + "L'assicurazione aumenta l'RTP di ";
    txt = txt + "<b>" + Math.round(sum1 * 100000) / 1000 + "%</b>";
    myAss.innerHTML =  "Favorevole ed aumenta l'RTP di <span style='color:;background-color:#93FAA5;padding: 0px 4px;border-radius: 5px'>" + (sum1 * 100).toFixed(2) + "%</span>";
  }
  txt = txt + "<html><head><title>Blackjack Calculator</title></head>\n";
  txt = txt + "<body bgcolor='#DDDDDD'>";
  txt = txt + "<left><small>" + subtitle + "</small></left>";
  txt = txt + "<br><table><tr valign='top'>";
  if (this.Details) {
    txt = txt + LeereTabellenZeile(11);
    txt = txt + '<tr height="14"><td class="td1" align="left" valign="bottom" colspan="8" rowspan="2"><small>';
    txt = txt + '<tr><td class="td1" align="center" width="67"' + tdcolor("Carta") + '><small><b>Carta</b></small></td>';
    txt = txt + '<td class="td1" align="center" width="67"' + tdcolor("x2") + '><small><b>x2</b></small></td>';
    txt = txt + '<td class="td1" align="center" width="67"' + tdcolor("Split") + '><small><b>Split</b></small></td></tr>';
    txt = txt + LeereTabellenZeile(11);
  }

  txt = txt + td("Banco");
  for (bvar = 2; bvar <= 11; bvar++)
    txt = txt + td(bvar);
  txt = txt + "</tr>\n";

  for (s = 20; s >= 11; s--) {
    txt = txt + "<tr>" + td(s);
    Hand = new BJ_Hand(s, 0);
    for (bvar = 2; bvar <= 11; bvar++)
      txt = txt + StrategieOutput(this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()), this.Details);
    txt = txt + "</tr>\n";
  }

  for (s = 20; s >= 13; s--) {
    txt = txt + "<tr>" + td(s + " soft");
    Hand = new BJ_Hand(s, soft);
    for (bvar = 2; bvar <= 11; bvar++)
      txt = txt + StrategieOutput(this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()), this.Details);
    txt = txt + "</tr>\n";
  }

  txt = txt + LeereTabellenZeile(11);

  for (s = 20; s >= 19; s--) {
    txt = txt + "<tr>" + td(s + " soft");
    Hand = new BJ_Hand(s, second + soft + Dd_poss);
    for (bvar = 2; bvar <= 11; bvar++)
      txt = txt + StrategieOutput(this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()), this.Details);
    txt = txt + "</tr>\n";
  }

  for (s = 11; s >= 9; s--) {
    txt = txt + "<tr>" + td(s);
    Hand = new BJ_Hand(s, second + Dd_poss);
    for (bvar = 2; bvar <= 11; bvar++)
      txt = txt + StrategieOutput(this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()), this.Details);
    txt = txt + "</tr>\n";
  }

  txt = txt + LeereTabellenZeile(11);

  for (s = 11; s >= 2; s--) {
    txt = txt + "<tr>" + td(s + "-" + s);
    if (s == 11)
      Hand = new BJ_Hand(12, soft + second + Split_poss);
    else
      Hand = new BJ_Hand(2 * s, second + (s == 5 ? Dd_poss : 0) + Split_poss);

    for (bvar = 2; bvar <= 11; bvar++)
      txt = txt + StrategieOutput(this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()), this.Details);
    txt = txt + "</tr>\n";

    if ((s == 5) && (this.RegelVariante == 1)) {
      txt = txt + "<tr>" + td("5-5Respl.");
      Hand = new BJ_Hand(10, second + Split_poss);
      for (bvar = 2; bvar <= 11; bvar++)
        txt = txt + StrategieOutput(this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()), this.Details);
      txt = txt + "</tr>\n";
    }
  }

  txt = txt + LeereTabellenZeile(11);

  sum1 = 0;
  Hand = new BJ_Hand(0, Split_poss + Dd_poss);
  txt = txt + "<tr>" + td("<small>In base al banco</small>");
  for (bvar = 2; bvar <= 11; bvar++) {
    txt = txt + td("<small>" + Math.round(100 + (this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()).GewinnErwOpt * 10000) / 100) + "%</small>");
    sum1 = sum1 + this.BJ_Hands[bvar].HandsAnalysiert.Element(Hand.AsString()).GewinnErwOpt * this.WvKartenwerte.Prob(bvar);
  }
  txt = txt + "</tr>\n";

  txt = txt + "</table><br>";
  txt = txt + "RTP: <b>" + (100 + (sum1 * 100000) / 1000) + "%</b><br>";
  if (this.WvKartenwerte.Prob(10) <= 1 / 3)
    txt = txt + "(<b>Non</b> assicurarti)";
  else {
    sum1 = sum1 + this.WvKartenwerte.Prob(11) * (3 * this.WvKartenwerte.Prob(10) - 1) / 2;
    txt = txt + "Insurance is favourably and increases the everage to ";
    txt = txt + "<b>" + Math.round(sum1 * 100000) / 1000 + "%</b>";
  }

  return txt;
}

function LeereTabellenZeile(SpaltenZahl) {
  var b, ret;
  ret = '<tr height="12">';
  for (b = 1; b <= SpaltenZahl; b++)
    ret = ret + td(" ");
  ret = ret + "</tr>\n";
  return ret;
}


function td(inhalt) {
  var txt;

  if (this.x < 11) {
    this.x++;
    if (this.y > 37)
      this.y = 0;
  } else {
    this.x = 1;
    this.y++;
  }

  switch (inhalt) {
    case "Stai":
      txt = "<p id='" + "table" + this.x + "_" + this.y + "' style='color:#AAAAAA'>Stai</p>";
      break;
    case "Carta":
      txt = "<p id='" + "table" + this.x + "_" + this.y + "' style='color:#33CC33'>Carta</p>";
      break;
    case "Split":
      txt = "<p id='" + "table" + this.x + "_" + this.y + "' style='color:#FF0000'>Split</p>";
      break;
    case "x2":
      txt = "<p id='" + "table" + this.x + "_" + this.y + "' style='color:#0000FF'>x2</p>";
      break;
    default:
      txt = inhalt;
  }

  return "<td class='td1' align='center' width='67'>" + txt + "</td>";
}


function tdcolor(Zug) {
  switch (Zug) {
    case "Carta": return ' bgcolor="#44CC44"';
    case "Split": return ' bgcolor="#FF6666"';
    case "x2": return ' bgcolor="#6666FF"';
    default: return '';
  }
}

function StrategieOutput(Hand, DetailFlag) {
  var erw, color;
  if (!DetailFlag)
    return td(Hand.ZugOpt);
  else {
    erw = Hand.GewinnErwOpt;
    erw = new String(Math.round(erw * 10000) / 10000);
    if (erw.indexOf(".") == -1)
      erw = erw + ".";
    while (erw.indexOf(".") + 4 >= erw.length)       // vier Nachkommastellen
      erw = erw + "0";
    return '<td class="td1" align="right" width="67"' + tdcolor(Hand.ZugOpt) + '>' + erw + '</td>';
  }
}


