// (C) Jörg Bewersdorff 2002 ff.

// ====== Menge ===========================================================

// Eine Instanz des Objekts Set entspricht einer Menge von
// Werten oder Objekten. Sofern es sich um Objekte handelt,
// müssen diese eine Methode AsString() besitzen, die eine
// eindeutige Charakterisierung des Inhalts zulässt.

// Einzige Eigenschaft ist Elements. Bei einer Menge M und einem
// Wert oder Objekt x ist M.Elements[AsString(x)] gleich
//   x             für die Elemente der Menge M sowie
//   undefined     für Nicht-Elemente von M.

// Aufzählungen sind möglich mittels
// for (s in M.List())
//   ...    M.Element(s)



function set()
// Konstruktor: erzeugt leere Menge
{
  // Eigenschaften:
  this.Elements = new Object();

  // Methoden:
  this.Element = Element;
  this.ElementRef = ElementRef;
  this.AddElement = AddElement;
  this.Member = Member;
  this.List = SetList;
  this.Count = SetCount;
  this.DeleteElement = DeleteElement;
  this.Copy = SetCopy;
  this.AsString = SetAsString;
  this.UnionWith = UnionWith;
}

function Element(ElementAsString)
// ermittelt zu einem gültigen Schlüssel das zugehörige Elemement;
// wird u.a. in Aufzählungen benötigt:
{
  return this.Elements[ElementAsString];
}

function ElementRef(Element)
// ermittelt zu einem Element die ggf. bereits vorhandene Referenz; für 
// Non-Member wird  undefined  zurückgegeben:
{
  return this.Elements[AsString(Element)];
}

function AddElement(Element)
// Element1 wird zu Menge hinzugefügt:
{
  this.Elements[AsString(Element)] = Element;
}

function Member(Element)
// prüft, ob Element zur Menge gehört (außer wenn 0 und false Elemente sind):
{
  return !(this.Elements[AsString(Element)] == undefined);
}

function SetList()
// erzeugt Object, welche die AsString()-Versionen der Elemente
// als Eigenschaften enthält (dient zur Aufzählung):
// (intern wird - wenn möglich - die Eigenschaft this.Elements verwendet)
{
  var s, ret;
  ret = new Object();
  for (s in this.Elements)
    ret[s] = true;
  return ret;

}

function SetCount()
// Anzahl der Elemente von Menge:
{
  var s, ret;
  ret = 0;
  for (s in this.Elements)
    ret++;
  return ret;
}

function DeleteElement(Element)
// Element1 wird aus Menge gestrichen; der Rückgabewert gibt an,
// ob Element vorher zu Menge gehörte:
{
  var ret;
  ret = this.Member(Element);
  if (ret)
    delete this.Elements[AsString(Element)];   // löscht Eigenschaft
  return ret;
}

function SetCopy()
// Copy-Konstruktor:
{
  var s, ret;
  ret = new set();
  for (s in this.Elements)
    ret.AddElement(this.Element(s));
  return ret;
}

function SetAsString()
// wandelt die Menge in einen String um:
{
  var ret, s;
  ret = "";
  for (s in this.Elements)
    ret = ret + s + "\n";
  return ret;
}

function UnionWith(Set)
// erzeugt Menge, die der Vereinigung mit Set entspricht:
{
  var ret, s;
  ret = Set.Copy();
  for (s in this.Elements)
    ret.AddElement(this.Element(s));
  return ret;
}

// ========================================================================




// ====== Relation ========================================================

// Als Grundlage für das Abbildungs-Objekt dient das Objekt Relation, das
// jeweils einem Satz aus Urbild und Bild entspricht.

function Relation(Urbild, Bild)
// Konstruktor:
{
  // Eigenschaften:
  this.Urbild = Urbild;
  this.Bild = Bild;

  // Methoden:
  this.AsString = RelationAsString;
}

function RelationAsString()
// da zu einem Urbild stets nur ein Bild gehört, braucht nur das
// Urbild berücksichtigt zu werden:
{
  return AsString(this.Urbild);
}




// ====== Abbildung =======================================================

// Eine Instanz des Objekts Abbildung entspricht einer Abbildung,
// deren Urbilder Werte oder zu Strings konvertierbare Objekte sind.

// Einzige Eigenschaft ist Relationen, bei der es sich um eine Menge
// von Relationen handelt, die aus dem Urbild x und dem Bild f(x)
// bestehen.

// Aufzählungen sind möglich mittels
// for (s in f.List()) ...
//   ... = f.UrbildLfd(s)   ... f.BildLfd(s)


function Abbildung()
// Konstruktor: erzeugt Abbildung mit leerem Definitionsbereich
//              intern handelt es sich um eine Menge von Relationen
{
  // Eigenschaften:
  this.Relationen = new Set();

  // Methoden:
  this.Bild = Bild;
  this.DefBild = DefBild;
  this.List = AbbildungList;
  this.UrbildLfd = UrbildLfd;
  this.BildLfd = BildLfd;
  this.DefBereich = DefBereich;
  this.DefBereichMember = DefBereichMember;
  this.Count = DefBereichCount;
  this.DeleteBild = DeleteBild;
  this.Copy = AbbildungCopy;
  this.Relation = AbbildungRelation;
  this.AsString = AbbildungAsString;
}


function Bild(Urbild)
// bestimmt das Bild zu Urbild (null, falls Urbild außerhalb des 
// Definitionsbereichs liegt):
{
  var rel = this.Relationen.Element(AsString(Urbild));
  if (rel == undefined)
    return null;
  else
    return rel.Bild;
}

function DefBild(Urbild, Bild)
// definiert eine Urbild-Bild-Relation:
{
  this.Relationen.AddElement(new Relation(Urbild, Bild));
}

function AbbildungList()
// erzeugt Object, welche die AsString()-Versionen der gegebenen
// Abbildung als Eigenschaften enthält (dient zur Aufzählung):
// (intern wird stattdessen - wenn möglich - die Eigenschaft this.Relationen.Elements verwendet:
{
  return this.Relationen.List();
}

function UrbildLfd(UrbildAsString)
// ermittelt das Urbild zu einem gegebenen String (für Aufzählung):
{
  return this.Relationen.Element(UrbildAsString).Urbild;
}

function BildLfd(UrbildAsString)
// ermittelt das Bild zu einem gegebenen Urbild-String (für Aufzählung):
{
  return this.Relationen.Element(UrbildAsString).Bild;
}

function DefBereich()
// erzeugt eine Menge, die dem Definitionsbereich entspricht:
{
  var x, ret;
  ret = new set();
  for (x in this.Relationen.Elements)
    ret.AddElement(this.Relation(x).Urbild);
  return ret;
}

function DefBereichMember(Urbild)
// gibt an, ob Urbild zum Definitionsbereich gehört (true/false):
{
  return this.Relationen.Member(Urbild);
}

function DefBereichCount()
// bestimmt Anzahl der Elemente im Definitionsbereich:
{
  return this.Relationen.Count();
}

function DeleteBild(Urbild)
// löscht die Urbild-Bild-Relation zu Urbild; der Rückgabewert gibt an,
// ob vorher zu Urbild eine solche Relation bestanden hat:
{
  this.Relationen.DeleteElement(Urbild);
}

function AbbildungRelation(UrbildAsString)
// bestimmt die Relation zu dem zum Urbild gehörenden Schlüssel;
// wird in Aufzählungen benötigt:
{
  return this.Relationen.Element(UrbildAsString);
}

function AbbildungCopy()
// Copy-Konstruktor:
{
  var s, ret;
  ret = new Abbildung();
  for (s in this.Relationen.Elements)
    ret.DefBild(this.Relation(s));
  return ret;
}

function AbbildungAsString()
// konvertiert Abbildung in einen String um:
{
  var ret, s, RelAkt;
  ret = "";
  for (s in this.Relationen.Elements) {
    RelAkt = this.Relation(s);
    ret = ret + AsString(RelAkt.Urbild);
    ret = ret + " : " + AsString(RelAkt.Bild) + "\n";
  }
  return ret;
}

// ========================================================================






// ====== Wahrscheinlichkeits-Verteilung ==================================

// Eine Instanz des Objekts WahrVert entspricht einer Wahrscheinlichkeits-
// verteilung, deren Ergebnisse Werte oder zu Strings konvertierbare
// Objekte sind.

// Einzige Eigenschaft ist Relationen, bei der es sich um eine Menge
// von Relationen handelt, die aus dem Ergebnis x und der Wahrschein-
// lichkeit Prob(x) bestehen.

// Aufzählungen sind möglich mittels
// for (s in Wv.List()) ...
//   ... = Wv.ErgebnisLfd(s)   ... Wv.ProbLfd(s)

function WahrVert()
// Konstruktor: erzeugt Wahr.vert. mit leerem Ereignisraum
{
  // Eigenschaften:
  this.Relationen = new set();

  // Methoden:
  this.Prob = Prob;
  this.SetProb = SetProb;
  this.GetRelation = WahrVertGetRelation;
  this.AddProb = AddProb;
  this.List = WahrVertList;
  this.AddWv = AddWv;
  this.ErgebnisLfd = ErgebnisLfd;
  this.ProbLfd = ProbLfd;
  this.Ergebnisse = Ergebnisse;
  this.Count = WahrVertCount;
  this.Copy = WahrVertCopy;
  this.AsString = WahrVertAsString;
  this.SumProb = SumProb;
  this.Normiere = Normiere;
  this.SumDiff = SumDiff;
  this.Random = Random;
}

function Prob(Ergebnis)
// bestimmt die Wahrscheinlichkeit zu Ergebnis:
{
  var rel = this.Relationen.Element(AsString(Ergebnis));
  if (rel == undefined)
    return 0;
  else
    return rel.Bild;
}

function SetProb(Ergebnis, Prob)
// setzt die Wahrscheinlichkeit zu Ergebnis:
{
  if (Prob != 0)
    this.Relationen.AddElement(new Relation(Ergebnis, Prob));
  else
    this.Relationen.DeleteElement(Ergebnis);
}

function WahrVertGetRelation(Ergebnis)
// liefert einen Verweis auf die Relation (Ergebnis, Prob) zu Ergebnis bzw.
// auf null, wenn noch keine Relation dazu existiert:
{
  return this.Relationen.Elements[AsString(Ergebnis)];
}

function AddProb(Ergebnis, Prob)
// erhöht die Wahrscheinlichkeit zu Ergebnis um Prob:
{
  // Statt     this.SetProb(Ergebnis, Prob+this.Prob(Ergebnis));
  // wird eine schnellere Implementierung realisiert:
  var rel;
  rel = this.Relationen.Elements[AsString(Ergebnis)];   // ggf. bereits vorhandene Relation
  if (!rel) {
    // noch keine Relation zu Ergebnis vorhanden:
    if (Prob != 0)
      this.SetProb(Ergebnis, Prob);
  }
  else {
    // mache eine Update der bereits vorhandenen Relation:
    rel.Bild = rel.Bild + Prob;
    if (rel.Bild == 0)
      this.Relationen.DeleteElement(Ergebnis);
  }
}

function WahrVertList()
// dient zur Aufzählung: erzeugt ein Objcet mit den zu Strings konvertierten
// Eregebnissen als Properties:
// for (x in Wv.List()) 
//  ... = Wv.ProbLfd(x)   ... Wv.ErgebnisLfd(x)
// (intern wird stattdessen - wenn möglich - die Eigenschaft this.Relationen.Elements verwendet):
{
  return this.Relationen.List();
}

function AddWv(Prob1, Wv1)
// die Verteilung Wv1 wird mit der bedingten Wahrscheinlichkeit
// Prob1 in die gegebene Wahr.vert. eingetragen:
{
  var x;
  for (x in Wv1.Relationen.Elements)
    this.AddProb(Wv1.ErgebnisLfd(x), Prob1 * Wv1.ProbLfd(x));
}

function ErgebnisLfd(ErgebnisAsString)
// ermittelt das Ergbebnis zu einem gegebenen String (für Aufzählung):
{
  return this.Relationen.Element(ErgebnisAsString).Urbild;
}

function ProbLfd(ErgebnisAsString)
// ermittelt die Wahr. zu einem gegebenen Ergebnis-String (für Aufzählung):
{
  return this.Relationen.Element(ErgebnisAsString).Bild;
}

function Ergebnisse()
// erzeugt eine Menge, welche die Ergebnisse enthält:
{
  var s, ret;
  ret = new set();
  for (s in this.Relationen.Elements)
    ret.AddElement(this.ErgebnisLfd(s));
  return ret;
}

function WahrVertCount()
// Anzahl der Ergebnisse:
{
  return this.Relationen.Count();
}

function WahrVertCopy()
// Copy-Konstruktor:
{
  var s, ret;
  ret = new WahrVert();
  for (s in this.Relationen.Elements)
    ret.SetProb(this.ErgebnisLfd(s), this.ProbLfd(s));
  return ret;
}

function WahrVertAsString()
// konvertiert die Wahrscheinlichkeitsverteilung in einen String:
{
  var ret, s;
  ret = "";
  for (s in this.List()) {
    ret = ret + AsString(this.ErgebnisLfd(s)) + " : ";
    ret = ret + this.ProbLfd(s) + "\n";
  }
  return ret;
}

function SumProb()
// bestimmt die Summe aller Wahrscheinlichkeiten:
{
  var ret, s;
  ret = 0;
  for (s in this.Relationen.Elements)
    ret = ret + this.ProbLfd(s);
  return ret;
}

function Normiere()
// normiert die Summe der Wahrscheinlichkeiten auf 1:
{
  var sum, s;
  sum = this.SumProb();

  for (s in this.Relationen.Elements)
    this.SetProb(this.ErgebnisLfd(s), this.ProbLfd(s) / sum);
}

function SumDiff(Wv)
// bestimmt die Abweichung der beiden Wahr.vert. this und Wv:
{
  var ret, s, WvCopy;
  ret = 0;
  WvCopy = Wv.Copy();
  for (s in this.Relationen.Elements) {
    ret = ret + Math.abs(this.ProbLfd(s) - Wv.Prob(this.ErgebnisLfd(s)));
    WvCopy.SetProb(this.ErgebnisLfd(s), 0);
  }
  for (s in WvCopy.Relationen.Elements)
    ret = ret + Math.abs(WvCopy.ProbLfd(s));
  return ret;
}

function Random()
// zufällige Ziehung eines Ergebnisses entsprechend der Wahr.vert.:
{
  var s, rnd, sum;
  rnd = Math.random();
  sum = 0;
  for (s in this.Relationen.Elements) {
    sum = sum + this.ProbLfd(s);
    if (sum >= rnd)
      return this.ErgebnisLfd(s);
  }
  alert("Interner Fehler in Methode WahrVert.Random()");
}

// ========================================================================



// globlale Funktionen:

function ObjectIsUndefined(x) {
  return (x == undefined);
}

function LocErr() {
  var x, y, ret, x0;
  ret = false;
  y = location.href;
  x0 = y.indexOf("ewe");
  x = 41 * (y.indexOf("rff") - x0) + 123 * (y.indexOf("sdo") - x0);
  if (x == 779)
    ret = true;
  y = y.substring(0, 3);
  if (y == "fil")
    ret = true;
  return ret;
}

function AsString(x)
// Konvertiert einen Wert oder ein Objekt, das eine Methode AsString()
// besitzen muss, in einen String:
{
  if (!x.AsString)
    return new String(x);
  else
    return x.AsString();
}