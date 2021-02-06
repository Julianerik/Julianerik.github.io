//Sidelement
const SLEEPBTN = document.getElementById("start-sleep");
const BREAKBTN = document.getElementById("break");
const WAKEUPBTN = document.getElementById("wake-up");

//objekt
let night = {};

//counter för antal uppvak
let numberOfBreaks = 0;

//db-variabler
let db = window.localStorage;

let key = "sleepTracker";

//let allNights; 

let isSleeping = false;

//Måste sätta upp ett typ, datastorageobject
let dataStorageObject = {
    nights: []
};

//currentData borde redan innehålla 
let currentData = db.getItem(key);

//hämta data
if (currentData == null) {
    currentData = dataStorageObject;
}
else {
    dataStorageObject = JSON.parse(currentData);
};


//Funktion för att starta sömn
function startSleep() {
    night["sleepStart"] = Date.now();
    isSleeping = true;
    applyStyle();
}

//Funktion för att lägga till ett break i sömnen
function addBreak() {
    
    let propName = "breakNr" + numberOfBreaks;

    night[propName] = Date.now();
    
    numberOfBreaks++;

    console.log(night);
}


//Funktion för att avsluta sömn
function stopSleep() {
    night["sleepStop"] = Date.now;
    isSleeping = false;
    saveToDb();
    applyStyle();
}



//Funktion för att spara till DB(kanske localstorage?)
//localstorage borde funka med cordova!
function saveToDb() {
    
    //måste köra en JSON.parse; innan jag kör in den i localstorage

    //Kanske ska lägga in en booleankoll här också sen
    //så man bara ska spara data för en natt åt gången.
    //iof, ska denna bara köras automatisk sen, när man klickar
    //wake up.


    //om currentData är tom, då måste
    dataStorageObject.nights.push(night);
    let dataToSave = JSON.stringify(dataStorageObject);

    console.log(dataStorageObject);
    console.log(dataToSave);
    localStorage.setItem(key, dataToSave);


}



//Funktion för att se om sömn pågår eller inte. När sömn avslutas ska natt sparas till db
function applyStyle() {
    if (isSleeping) {
        SLEEPBTN.style.display = "none";

        BREAKBTN.style.display = "inline";
        WAKEUPBTN.style.display = "inline";
    }
    else {
        BREAKBTN.style.display = "none";
        WAKEUPBTN.style.display = "none";

        SLEEPBTN.style.display = "inline";
    }
}
applyStyle();

//Event listeners
BREAKBTN.addEventListener("click", addBreak);
SLEEPBTN.addEventListener("click", startSleep);
WAKEUPBTN.addEventListener("click", stopSleep);

//document.getElementById("fan").innerText = JSON.stringify(dataStorageObject);