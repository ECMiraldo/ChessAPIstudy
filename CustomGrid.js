let gridRowsData = [
    [
        { type: 'span', class: "class1", content: "text1"},
        { type: 'span', class: "class2", content: "text2"},
        { type: 'span', class: "class3", content: "text3"},
    ],
]

let shadow;
class CustomGrid extends HTMLElement {

  
    constructor() {
        super();

        // Create a shadow root
        shadow = this.attachShadow({mode: 'open'});

        // Define the CSS styles for the grid
        const style = document.createElement('style');
        style.textContent = `
            .row {
                display: flex;
                width: 100%;
                height: 50px;
                align-items: center;
                justify-content: flex-start;
                flex-direction: row;
            }
            .timeControl {
                width: 25%;
                padding-left: 5%;
                text-align: center;
            }
            
            .players {
                text-align: flex-start;
                padding-left: 7%;
                width: 35%;
            }

            .accuracies {
                display:none;
            }

            .info {
                display:none;

            }

            .winner {
                display:none;

            }

            @media (min-width: 768px) {
                .timeControl {
                    width: 12%;
                    text-align: left;
                    padding-left: 15px;
                    
                }
                .players {
                    text-align: left;
                    width: 20%;
                    padding-left: 20px;
                }

                .accuracies {
                    display: flex;
                    text-align: left;
                    width: 24%;
                    padding-left: 9%
                }
    
                .info {
                    display: flex;
                    text-align: left;
                    width: 14%;
    
                }
    
                .winner {
                    display: flex;
                    text-align: left;
                    width: 15%;
    
                }
    
              
                
                
            }
        `;
        // Append the style to the shadow root
        shadow.appendChild(style);
        this.MakeFirstRow();
    }

    MakeFirstRow() {
        const row = document.createElement('div');
        row.classList.add('row');
        //time control
        const timeControl = document.createElement('a');
        timeControl.textContent = "Time Control";
        timeControl.classList.add("timeControl")
        row.appendChild(timeControl);
        //players
        const players = document.createElement('a');
        players.textContent = "Players"
        players.classList.add("players")
        row.appendChild(players);

        const accuracies = document.createElement('a');
        accuracies.textContent = "Accuracies"
        accuracies.classList.add("accuracies")
        row.appendChild(accuracies);

        const info = document.createElement('a');
        info.textContent = "Game Info"
        info.classList.add("info")
        row.appendChild(info);

        const winner = document.createElement('a');
        winner.textContent = "Winner"
        winner.classList.add("winner")
        row.appendChild(winner);

        shadow.appendChild(row);
    }
    
    AddRow(gameCard) {
        shadow.appendChild(gameCard);
    }



}

// Define the custom element
customElements.define('custom-grid', CustomGrid);