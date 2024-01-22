const winner = {White: 0, Black: 1}

class GameCard extends HTMLElement {
    constructor(gameData) {
        super();
        this.attachShadow({ mode: "open" });
        this.timeControl = gameData["time_control"];
        this.blackUsername = gameData["black"]["username"];
        this.whiteUsername = gameData["white"]["username"];
        this.date = new Date(gameData["end_time"] * 1000);
        this.whiteAccuracy = gameData["accuracies"]["white"];
        this.blackAccuracy = gameData["accuracies"]["black"];
        this.whiteRating = gameData["white"]["rating"];
        this.blackRating = gameData["black"]["rating"];
        this.url = gameData["url"];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    .CardContainer {
                        display: flex;
                        background-color: #161A30;
                        align-items: center;
                    }
           
                    .TimeControl {
                        padding-left:25px;
                        text-align: center;
                        width: 8vw;
                    }

                    .Colors {
                        width: 10vw;
                        padding-left: 5vw;
                        height: 80px;
                        display: flex;
                        align-items: end;
                        justify-content: flex-start;
                        flex-direction: column;
                    }

                    .white {
                        background-color: white;
                        width: 17px;
                        height: 17px;
                        border-radius: 7px;
                        margin-top: 15px;
                    }

                    .black {
                        background-color: black;
                        width: 20px;
                        height: 20px;
                        border-radius: 7px;
                        margin-top: 14px;
                    }

                    .Ratings {
                        padding-left: 15px;
                        text-align: end;
                    }
                    .Players{
                        width: 10vw;
                        padding-left: 15px;
                        text-align: start;
                    }
                    .Accuracy{
                        padding-left: 12vw;
                    }
                    .Date { 
                        padding-left: 15vw;
                    }
                    .Url {
                        padding-left: 12vw;
                    }

                </style>
                <li class= "CardContainer">
                    <div class= "TimeControl">
                        <p> ${this.timeControl}</p>
                    </div>
                    <div class = "Colors">
                        <div class = "white"> </div>
                        <div class = "black"> </div>
                    </div>
                    <div class= "Ratings">
                        <p> ${this.whiteRating}</p>
                        <p> ${this.blackRating}</p>
                    </div>
                    
                    <div class= "Players">
                        <p> ${this.whiteUsername}</p>
                        <p> ${this.blackUsername}</p>
                    </div>
                    <div class= "Accuracy">
                        <p> ${this.whiteAccuracy}</p>
                        <p> ${this.blackAccuracy}</p>
                    </div>
                    <div class= "Date">
                        <p> ${this.date.toISOString().slice(0,10)}  </p>
                    </div>
                    <div class= "Url">
                        <p> url</p>
                    </div>
                </li>
            `;
        } else {
            console.error("Shadow DOM not available.");
        }
    }
}

customElements.define("game-card", GameCard);

