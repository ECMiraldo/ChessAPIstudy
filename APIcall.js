const date = new Date()
const month = date.toJSON().slice(5,7)
const year = date.getFullYear()
const APIurl = "https://api.chess.com/pub/player/magnuscarlsen/games/"+year+"/"+month;

function fetchData(gameList) {
    fetch(APIurl,)
    .then(response => {
        if (!response.ok) {
            throw new Error("player API response error" + response.Error)
        }
        return response.json();
    })
    .then(data => {
        SetCardData(data["games"], gameList)

    })
    .catch(error => {
        console.log("Error: ", error);
    });
}

function SetCardData(gameData, gameList) {
    let cardArray = [];
    for(i = 0; i< 10; i++){
        cardArray[i] = new GameCard(gameData[i])
        console.log(gameData[i])
        gameList.appendChild(cardArray[i])
    }
}




document.addEventListener("DOMContentLoaded", function() {
    var gameList = document.getElementById("GameList");
    console.log(gameList);
    console.log(month, year)

    if (gameList) {
        fetchData(gameList)
    } else {
        console.error("GameList element not found.");
    }
    
});