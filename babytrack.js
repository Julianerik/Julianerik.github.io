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

    console.log(display);
    let numberOfItems = currentDataParsed.db.length-1;

    let latestDate = currentDataParsed.db[numberOfItems].time;
    
    let parsedDate = new Date(latestDate);

    let displayHour = (parsedDate.getHours() < 10) ? '0' + parsedDate.getHours() : parsedDate.getHours();

    let displayDate = displayHour + ':' + parsedDate.getMinutes();

    let displayHeader = document.createElement('h1');

    displayHeader.innerText = displayDate;
    document.body.appendChild(displayHeader);
}

printToSreen();


function addData(newItem) {
    currentDataParsed.db.push(newItem);

    db.setItem(dbKey, JSON.stringify(currentDataParsed));
};

function logTime() {
    let currentDate = new Date();

    let unixTime = currentDate.valueOf();

    let newItem = {
        time: unixTime  
    };
    addData(newItem);
};

