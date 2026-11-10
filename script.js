
const pitch = document.getElementById("pitch");
const playersContainer = document.getElementById("players");
const formationSelect = document.getElementById("formation");
const teamInput = document.getElementById("teamName");
const displayTeam = document.getElementById("displayTeam");
const formationLabel = document.getElementById("formationLabel");
const drawingLayer = document.getElementById("drawingLayer");
const notesInput = document.getElementById("notes");



const formations = {
    "4-3-3": [
        ["GK", 50, 91],
        ["LB", 15, 75], ["CB", 38, 78],
        ["CB", 62, 78], ["RB", 85, 75],
        ["CM", 28, 55], ["CDM", 50, 65],
        ["CM", 72, 55],
        ["LW", 18, 28], ["ST", 50, 20],
        ["RW", 82, 28]
    ],

    "4-4-2": [
        ["GK", 50, 91],
        ["LB", 15, 75], ["CB", 38, 78],
        ["CB", 62, 78], ["RB", 85, 75],
        ["LM", 15, 52], ["CM", 38, 55],
        ["CM", 62, 55], ["RM", 85, 52],
        ["ST", 38, 25], ["ST", 62, 25]
    ],

    "4-2-3-1": [
        ["GK", 50, 91],
        ["LB", 15, 75], ["CB", 38, 78],
        ["CB", 62, 78], ["RB", 85, 75],
        ["CDM", 38, 63], ["CDM", 62, 63],
        ["LW", 20, 42], ["CAM", 50, 40],
        ["RW", 80, 42], ["ST", 50, 20]
    ],

    "3-5-2": [
        ["GK", 50, 91],
        ["CB", 25, 77], ["CB", 50, 80],
        ["CB", 75, 77],
        ["LWB", 10, 52], ["CM", 32, 55],
        ["CDM", 50, 62], ["CM", 68, 55],
        ["RWB", 90, 52],
        ["ST", 38, 25], ["ST", 62, 25]
    ]
};



function createPlayers() {

    playersContainer.innerHTML = "";

    const selectedFormation = formationSelect.value;
    const teamPlayers = formations[selectedFormation];

    teamPlayers.forEach((player, index) => {

        const playerElement = document.createElement("div");

        playerElement.className = "player";

        playerElement.style.left = player[1] + "%";
        playerElement.style.top = player[2] + "%";

        playerElement.innerHTML =
            `<span>${index + 1}</span>
             <small>${player[0]}</small>`;

        playerElement.dataset.x = player[1];
        playerElement.dataset.y = player[2];

        playersContainer.appendChild(playerElement);

    });

    formationLabel.textContent = selectedFormation;
}



formationSelect.addEventListener("change", createPlayers);


teamInput.addEventListener("input", function() {

    displayTeam.textContent =
        teamInput.value || "My Football Team";

});




let currentTool = "move";

const toolButtons = document.querySelectorAll(".tool");

toolButtons.forEach(button => {

    button.addEventListener("click", function() {

        currentTool = button.dataset.tool;

        toolButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        if (currentTool === "clear") {
            drawingLayer.innerHTML = "";
            currentTool = "move";
            toolButtons[0].classList.add("active");
            button.classList.remove("active");
        }

    });

});




let selectedPlayer = null;

pitch.addEventListener("pointerdown", function(event) {

    if (currentTool === "arrow") {
        startDrawing(event);
        return;
    }

    if (currentTool === "move") {

        selectedPlayer = event.target.closest(".player");

    }

});

pitch.addEventListener("pointermove", function(event) {

    if (!selectedPlayer) return;

    const rect = pitch.getBoundingClientRect();

    let x = ((event.clientX - rect.left) / rect.width) * 100;
    let y = ((event.clientY - rect.top) / rect.height) * 100;


    x = Math.max(4, Math.min(96, x));
    y = Math.max(4, Math.min(96, y));

    selectedPlayer.style.left = x + "%";
    selectedPlayer.style.top = y + "%";

    selectedPlayer.dataset.x = x;
    selectedPlayer.dataset.y = y;

});

pitch.addEventListener("pointerup", function() {
    selectedPlayer = null;
});

pitch.addEventListener("pointercancel", function() {
    selectedPlayer = null;
});



let drawing = false;
let startX = 0;
let startY = 0;

function startDrawing(event) {

    const rect = pitch.getBoundingClientRect();

    startX = event.clientX - rect.left;
    startY = event.clientY - rect.top;

    drawing = true;

}

pitch.addEventListener("pointerup", function(event) {

    if (!drawing) return;

    const rect = pitch.getBoundingClientRect();

    const endX = event.clientX - rect.left;
    const endY = event.clientY - rect.top;

    const svgNS = "http://www.w3.org/2000/svg";

    const line = document.createElementNS(svgNS, "line");

    line.setAttribute("x1", startX);
    line.setAttribute("y1", startY);
    line.setAttribute("x2", endX);
    line.setAttribute("y2", endY);

    line.setAttribute("stroke", "#ffdd57");
    line.setAttribute("stroke-width", "3");
    line.setAttribute("marker-end", "url(#arrowhead)");

    drawingLayer.appendChild(line);

    drawing = false;

});



document.getElementById("saveBtn").addEventListener("click", function() {

    const savedPlayers = [];

    document.querySelectorAll(".player").forEach(player => {

        savedPlayers.push({
            role: player.querySelector("small").textContent,
            number: player.querySelector("span").textContent,
            x: player.dataset.x,
            y: player.dataset.y
        });

    });

    const tactics = {
        team: teamInput.value,
        formation: formationSelect.value,
        notes: notesInput.value,
        players: savedPlayers,
        arrows: drawingLayer.innerHTML
    };

    localStorage.setItem("tactixData", JSON.stringify(tactics));

    alert("Your tactics have been saved successfully!");

});




document.getElementById("resetBtn").addEventListener("click", function() {

    const confirmReset = confirm("Are you sure you want to reset the board?");

    if (confirmReset) {

        teamInput.value = "My Football Team";
        displayTeam.textContent = "My Football Team";

        formationSelect.value = "4-3-3";
        notesInput.value = "";

        drawingLayer.innerHTML = "";

        createPlayers();

    }

});




function loadTactics() {

    const savedData = localStorage.getItem("tactixData");

    if (!savedData) {
        createPlayers();
        return;
    }

    const tactics = JSON.parse(savedData);

    teamInput.value = tactics.team;
    displayTeam.textContent = tactics.team;

    formationSelect.value = tactics.formation;

    notesInput.value = tactics.notes;

    createPlayers();

    const playerElements = document.querySelectorAll(".player");

    tactics.players.forEach((savedPlayer, index) => {

        const player = playerElements[index];

        if (player) {

            player.style.left = savedPlayer.x + "%";
            player.style.top = savedPlayer.y + "%";

            player.dataset.x = savedPlayer.x;
            player.dataset.y = savedPlayer.y;

        }

    });

    drawingLayer.innerHTML = tactics.arrows || "";

}


// START THE APPLICATION

loadTactics();
