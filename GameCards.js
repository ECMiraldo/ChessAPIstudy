
//                     .Ratings {
//                         padding-left: 15px;
//                         text-align: end;
//                     }
//                     .Players{
//                         width: 10vw;
//                         padding-left: 15px;
//                         text-align: start;
//                     }
//                     .Accuracy{
//                         padding-left: 12vw;
//                     }
//                     .Date { 
//                         padding-left: 15vw;
//                     }
//                     .Url {
//                         padding-left: 12vw;
//                     }

//                 </style>
//                 <li class= "CardContainer">
//                     <div class= "TimeControl">
//                         <p> ${this.timeControl}</p>
//                     </div>
//                     <div class = "Colors">
//                         <div class = "white"> </div>
//                         <div class = "black"> </div>
//                     </div>
//                     <div class= "Ratings">
//                         <p> ${this.whiteRating}</p>
//                         <p> ${this.blackRating}</p>
//                     </div>
                    
//                     <div class= "Players">
//                         <p> ${this.whiteUsername}</p>
//                         <p> ${this.blackUsername}</p>
//                     </div>
//                     <div class= "Accuracy">
//                         <p> ${this.whiteAccuracy}</p>
//                         <p> ${this.blackAccuracy}</p>
//                     </div>
//                     <div class= "Date">
//                         <p> ${this.date.toISOString().slice(0,10)}  </p>
//                     </div>
//                     <div class= "Url">
//                         <p> url</p>
//                     </div>

               

class GameCard extends HTMLElement {
    constructor(gameData, id) {
        super();
        this.selfID = id;
        this.gameData = gameData; 
        this.expanded = false; // Track expansion state
        this.attachShadow({ mode: "open" });
        this.timeControl = gameData["time_control"];
        this.blackUsername = gameData["black"]["username"];
        this.whiteUsername = gameData["white"]["username"];
        this.date = new Date(gameData["end_time"] * 1000);
        this.whiteAccuracy = gameData["accuracies"]["white"];
        this.blackAccuracy = gameData["accuracies"]["black"];
        this.whiteRating = gameData["white"]["rating"];
        this.blackRating = gameData["black"]["rating"];
        this.gameRating = (gameData["white"]["rating"] + gameData["black"]["rating"]) / 2;
        this.url = gameData["url"];
        this.winner = this.checkWinner(gameData["white"]["result"]);
    }
    
    checkWinner(whiteResult) {
        switch (whiteResult) {
            case "win": return "White";
            case "agreed": return "Draw";
            case "repetition": return "Draw";
            case "timeout": return "Black";
            case "resigned": return "Black";
            case "stalemate": return "Draw";
            case "lose": return "Black";
            case "insufficient": return "Draw";
            case "50move": return "Draw";
            case "abandoned": return "Black";
            case "timevinsuffient": return "Draw";
            default: return "NoInfo";
        }
    }

    connectedCallback() {
        this.render();
    }

    expandClickHandler = () => {
        // Toggle expansion state
        this.expanded = !this.expanded;
        // Re-render the component to reflect the updated expansion state
        this.render();
    };

    ChangeData(gameData) {
        this.timeControl = gameData["time_control"];
        this.blackUsername = gameData["black"]["username"];
        this.whiteUsername = gameData["white"]["username"];
        this.date = new Date(gameData["end_time"] * 1000);
        this.whiteAccuracy = gameData["accuracies"]["white"];
        this.blackAccuracy = gameData["accuracies"]["black"];
        this.whiteRating = gameData["white"]["rating"];
        this.blackRating = gameData["black"]["rating"];
        this.url = gameData["url"];
        this.render();
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <style>
                .CardRow {
                    display: flex;
                    border-style: groove;
                    border-width: 5px;
                    border-radius: 10px;
                    flex-direction: column;
                    align-items: center;
                    padding-bottom: 12px;
                    padding-top:12px;
                }
                .MinimizedRow {
                    display: flex;
                    width: 100%;
                    flex-direction: row;
                    align-items: center;
                }
                .TimeControl {
                    width: 35%;
                    text-align: center;
                }


                .PlayersDiv {
                    width: 55%;
                    text-overflow: ellipsis;
                    display: flex;
                    align-items: flex-start;
                    flex-direction: row;
                }

                .PlayersDiv p{
                    margin: 0px;
                    text-align: flex-start;
                }

                
                .Colors {
                    height: 100%;
                    padding-top: 4px;
                    padding-right: 10px;
                    width: min-content;
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                }
                
                .white {
                    background-color: white;
                    width: 10px;
                    height: 10px;
                    border-radius: 7px;
                }

                .black {
                    background-color: black;
                    margin-top: 28px;
                    width: 10px;
                    height: 10px;
                    border-radius: 7px;

                }

                .vs {
                    padding-top: 3px;
                    padding-bot: 4px;
                }

                .Expand {
                    object-fit: scale-down;
                    justify-self: flex-end;
                    padding-right: 5px;
                    width: 50px;
                    height: 50px;
                }
                .ExpandedDetails {
                    padding-top: 20px;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    display: ${this.expanded ? 'flex' : 'none'}; // Toggle visibility
                }
                .ExpandedRow1 {
                    display: flex;
                    padding: 0px;
                    margin: 0px;
                    flex-direction: column;
                }
                .ExpandedRow2 {
                    display: flex;
                    padding: 0px;
                    margin: 0px;
                    flex-direction: column;
                }

                .ExpandedRow1 p {
                    margin: 0px;
                    padding-bottom:5px;
                }
                .ExpandedRow2 p {
                    margin: 0px;
                    padding-bottom:5px;
                }

                .Winner {
                    margin: 0px;
                }


                @media (min-width: 768px) {
                    .CardRow {
                        flex-direction: row;
                    }

                    .MinimizedRow {
                        display: flex;
                        width: 35%;
                        flex-direction: row;
                        align-items: center;
                    }

                    .ExpandedDetails {
                        padding-top: 0px;
                        
                        width: 65%;
                        flex-direction: row;
                        display: flex;
                    }

                    .TimeControl {
                        width: 12%;
                        text-align: left;
                        padding-left: 30px;
                    }
                    .PlayersDiv {
                        width: min-content;
                        width: 35%;
                        padding-left: 50px;
                    }

                    .Expand {
                        width: 0px;
                        height 0px;
                        display: none;
                    }

                    .ExpandedRow1 {
                        display: flex;
                        width: 35%;
                        flex-direction: column;
                        text-align: center;
                        margin: 0px;
                    }
    
                    .ExpandedRow2 {
                        display: flex;
                        width: 35%;
                        flex-direction: column;
                        text-align: center;
                        margin: 0px;
                    }

                    .Winner {
                        justify-self: flex-end;
                        width: 20%;
                        align-self:center;
                        padding-right: 30px;
                    }


                }

                @media (min-width: 1400px) {
                    .TimeControl {
                        width: 18%;

                    }
                }

            </style>
            <div class = "CardRow">
                <div class="MinimizedRow">
                    <p class = "TimeControl"> ${this.timeControl}</p>
                    
                    <div class="PlayersDiv">
                        <div class = "Colors">
                            <div class = "white"> </div>
                            <div class = "black"> </div>
                        </div>
                        <div class="PlayersNames">
                            <p class = "Player1"> ${this.whiteUsername}</p>
                            <p class = "vs"> vs </p>
                            <p class = "Player2"> ${this.blackUsername}</p>
                        </div>
                    </div>
                    <img class ="Expand" src="./images/Expand.png" ></img>
                </div>
                <div class="ExpandedDetails">
                    <div class ="ExpandedRow2">
                            <p> Black Accuracy: ${this.blackAccuracy}% </p>
                            <p> White Accuracy: ${this.whiteAccuracy}% </p>
                    </div>
                    <div class ="ExpandedRow1">
                        <p class = "Date"> Date: ${this.date.toISOString().slice(0,10)}</p>
                        <p class = "AvgRating"> Game Rating: ${this.gameRating} </p>
                    </div>
                    <p class = "Winner"> Winner: ${this.winner == "Black" ? this.blackUsername : this.whiteUsername}
                </div>

            </div>

        `;
        const expandButton = this.shadowRoot.querySelector('.Expand');
        expandButton.removeEventListener('click', this.expandClickHandler);
        // Attach event listener
        expandButton.addEventListener('click', this.expandClickHandler);
        }
    }
}

customElements.define("game-card", GameCard);
