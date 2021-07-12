let db = window.localStorage;

let dbKey = 'babyTrackDB';

let dbStructure = JSON.stringify({
    db: []
});

let checkDb = db.getItem(dbKey)

let currentData = (checkDb === null) ? dbStructure : checkDb;

let currentDataParsed = JSON.parse(currentData);


function printToSreen() {
    let display = document.getElementById('displayDiv');

    let numberOfItems = currentDataParsed.db.length-1;

    let latestDate = currentDataParsed.db[numberOfItems].time;
    
    let parsedDate = new Date(latestDate);

    let displayHour = (parsedDate.getHours() < 10) ? '0' + parsedDate.getHours() : parsedDate.getHours();

    let displayMin = (parsedDate.getMinutes() < 10) ? '0' + parsedDate.getMinutes() : parsedDate.getMinutes(); 

    let displayDate = displayHour + ':' + displayMin;

    let displayHeader = document.createElement('h1');

    displayHeader.innerText = displayDate;
    display.appendChild(displayHeader);
}



function addData(newItem) {
    currentDataParsed.db.push(newItem);

    db.setItem(dbKey, JSON.stringify(currentDataParsed));
};


function clearDiv() {
    let display = document.getElementById('displayDiv');

    display.innerText = '';

}

function logTime() {
    let currentDate = new Date();

    let unixTime = currentDate.valueOf();

    let newItem = {
        time: unixTime  
    };
    addData(newItem);
    clearDiv();
    printToSreen();
};


printToSreen();

