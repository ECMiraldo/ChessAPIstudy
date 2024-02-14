const date = new Date()
const month = date.toJSON().slice(5,7)
const year = date.getFullYear()
let value = ""
let cardArray = [];


function GetURL() {
    value = document.getElementById("players").value;
    if (value == "Select Player") {
        return "";
    }
    return "https://api.chess.com/pub/player/"+value+"/games/"+year+"/"+month;   
}


function fetchData(grid) {
    value = document.getElementById("players").value;
    const url = GetURL(value)
    if (url == "") {
        return;
    }
    fetch(url,)
    .then(response => {
        if (!response.ok) {
            throw new Error("player API response error" + response.Error)
        }
        return response.json();
    })
    .then(data => {
        SetCardData(data["games"], grid)
    })
    .catch(error => {
        console.log("Error: ", error);
    });
}

function SetCardData(gameData, grid) {
    if (cardArray.length == 0) {
        for(i = 1; i< 11; i++){
            grid.AddRow(new GameCard(gameData[i]))
        }
    }
    else {
        for(i = 1; i< 11; i++){
            cardArray[i].ChangeData(gameData[i])
        }
    }
}



document.addEventListener("DOMContentLoaded", function() {
    var el = document.getElementById("FetchGames");
    let grid = CreateGrid()
    if (el.addEventListener)
        el.addEventListener("click", function() {
        fetchData(grid), false
    });
    else if (el.attachEvent)
        el.attachEvent('onclick',  function() {
            fetchData(grid)
        });

})

function CreateGrid(){
    var gridContainer = document.getElementById("GridContainer");
    let customGrid = new CustomGrid();
    gridContainer.appendChild(customGrid);
    console.log(customGrid.parentElement)
    return customGrid;
}