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

function buildNightObject(nObj) {
    let nightDiv = document.createElement("div");
    nightDiv.setAttribute("class", "nightDiv");

    let nightDate = document.createElement("h1");
    nightDate.innerText = nObj.date;
    nightDiv.appendChild(nightDate);

    let objProps = Object.entries(nObj);
    for (let i = 0; i < objProps.length; i++) {
        if (objProps[i][0] == "date") {
            objProps.splice([i], 1);
        };
    };

    for (let i = 0; i < objProps.length; i++) {
        let breakInfo = document.createElement("h2");
        let breakTime = new Date(objProps[i][1])
        let breakTimeHour = breakTime.getHours();
        let breakMinutes = breakTime.getMinutes();

        let displayTime = breakTimeHour + ":" + breakMinutes;

        breakInfo.innerText = displayTime;
        nightDiv.appendChild(breakInfo);
    }

    document.getElementById("night-data").appendChild(nightDiv);
}



let nightObjects = dataStorageObject.nights;
console.log(nightObjects);

for (let i = 0; i < nightObjects.length; i++) {
    let nightObject = {};
    let logDate = new Date(nightObjects[i].sleepStart);
    let logDateDay = ('0' + logDate.getDate());
    let logDateMonth = ('0' + logDate.getMonth());
    let logDateYear = (logDate.getFullYear());
    
    nightObject.date = logDateDay + "/" + logDateMonth + "/" + logDateYear; 
    
    //Här måste man komma på en loop för varje property 
    //och sedan plockar bort första och sista
    //eller kanske kan goöra en delete where = sleepstop/sleepstart
    
    let objProps = Object.entries(nightObjects[i]);

    //skapa loop, för att ta bort where och lägg till i nightObject
    for (let j = 0; j < objProps.length; j++) {
        if (objProps[j][0] == "sleepStart") {
            objProps.splice(j, 1);
        }
        if (objProps[j][0] == "sleepStop") {
            objProps.splice(j, 1);
        }
    
        console.log("objprops length = " + objProps.length);

        if (objProps.length != 0) {
            nightObject[objProps[j][0]] = objProps[j][1];
        }

    }

    
    buildNightObject(nightObject);
}


