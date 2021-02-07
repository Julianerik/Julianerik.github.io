/*let dataStorageObject = {
    nights: []
};

let key = "sleepTracker";

//currentData borde redan innehålla 
let currentData = db.getItem(key);

//hämta data
if (currentData == null) {
    currentData = dataStorageObject;
}
else {
    dataStorageObject = JSON.parse(currentData);
};*/

function parseNumber(num) {
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}

function buildNightObject(nObj) {
    let nightDiv = document.createElement("div");
    nightDiv.setAttribute("class", "nightDiv");

    let nightDate = document.createElement("h1");
    nightDate.innerText = nObj.date;
    nightDiv.appendChild(nightDate);

    let nightSleepStart = document.createElement("h2");
    nightSleepStart.innerText = "Went to sleep: " + nObj.sleepStart
    nightDiv.appendChild(nightSleepStart);

    let objProps = Object.entries(nObj);
    for (let i = 0; i < objProps.length; i++) {
        if (objProps[i][0] == "date") {
            objProps.splice([i], 1);
        };
    };

    for (let i = 0; i < objProps.length; i++) {
        if (objProps[i][0] == "sleepStart") {
            objProps.splice([i], 1);
        };
    };

    let wokeUp = document.createElement("h2");

    for (let i = 0; i < objProps.length; i++) {
        if (objProps[i][0] == "sleepStop") {
            wokeUp.innerText = "Stopped sleeping: " + objProps[i][1];
            objProps.splice([i], 1);
        }
        
    }

    for (let i = 0; i < objProps.length; i++) {
        let breakInfo = document.createElement("h3");
        let breakTime = new Date(objProps[i][1])
        let breakTimeHour = parseNumber(breakTime.getHours());
        let breakMinutes = parseNumber(breakTime.getMinutes());
        let breakSeconds = parseNumber(breakTime.getSeconds());

        let displayTime = "Woke up at: " + breakTimeHour + ":" + breakMinutes + ":" + breakSeconds;

        breakInfo.innerText = displayTime;
        nightDiv.appendChild(breakInfo);
    }
    nightDiv.appendChild(wokeUp);

    document.getElementById("night-data").appendChild(nightDiv);
}



let nightObjects = dataStorageObject.nights;

for (let i = 0; i < nightObjects.length; i++) {
    let nightObject = {};
    let logDate = new Date(nightObjects[i].sleepStart);
    let logDateDay = parseNumber(logDate.getDate());
    let logDateMonth = parseNumber(logDate.getMonth() + 1);
    let logDateYear = parseNumber(logDate.getFullYear());
    let logSleepStartHour = parseNumber(logDate.getHours());
    let logSleepStartMinute = parseNumber(logDate.getMinutes());

    nightObject.date = logDateDay + "/" + logDateMonth + "/" + logDateYear; 
    nightObject.sleepStart = logSleepStartHour + ":" + logSleepStartMinute;
    
    //Här måste man komma på en loop för varje property 
    //och sedan plockar bort första och sista
    //eller kanske kan goöra en delete where = sleepstop/sleepstart
    
    let objProps = Object.entries(nightObjects[i]);

    //skapa loop, för att ta bort where och lägg till i nightObject
    for (let j = 0; j < objProps.length; j++) {
        if (objProps[j][0] == "sleepStart") {
            objProps.splice(j, 1);
        }
    }


    //var tvungen att separera dessa för att det inte skulle bli fel i konsollen
    //Ta även och lägg till sleepstop innan borttagning
    for (let j = 0; j < objProps.length; j++) {
        if (objProps[j][0] == "sleepStop") {
            let sleepStartDate = new Date(objProps[j][1]);
            let sleepStarHour = sleepStartDate.getHours();
            let sleepstartMinute = sleepStartDate.getMinutes();
            let sleepStartSec = sleepStartDate.getSeconds();

            nightObject[objProps[j][0]] = sleepStarHour + ":" + sleepstartMinute + ":" + sleepStartSec;
            objProps.splice(j, 1);
        }        
    }

    if (objProps.length != 0) {
        for (let j = 0; j < objProps.length; j++) {
            nightObject[objProps[j][0]] = objProps[j][1];      
        }
    }

    buildNightObject(nightObject);

}


//Problem som kvarstår
//har fortfarande problem att läsa tomma arrays
//Chrome på PC och MAC läser errors olika.
