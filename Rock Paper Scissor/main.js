let playgame = confirm("Shall we play Rock, Paper, Scissors");

if (playgame) {
    do {
        RockPaperScissor();
        var replay = confirm("Play Again..?");
    } while (replay);
    alert("Thanks for Playing");
} else {
    alert("We will play next time...");
}

function RockPaperScissor() {
    let playerchoice = prompt("Enter Rock / Paper / Scissors.");
    if (playerchoice === null || playerchoice.trim() === "") {
        alert("Empty Input");
        return;
    }

    playerchoice = playerchoice.trim().toLowerCase();
    let computerOption = ["rock", "paper", "scissors"];
    let number = Math.random() * 3;
    let roundoff = Math.floor(number);
    let computerchoice = computerOption[roundoff];
    
    let result =
        playerchoice === computerchoice ? "Tie Game" :
        (playerchoice === "rock" && computerchoice === "paper") ? "Computer Wins..!" :
        (playerchoice === "rock" && computerchoice === "scissors") ? "You Won..!" :
        (playerchoice === "scissors" && computerchoice === "paper") ? "You Won..!" :
        (playerchoice === "scissors" && computerchoice === "rock") ? "Computer Wins..!" :
        (playerchoice === "paper" && computerchoice === "rock") ? "You Won..!" :
        (playerchoice === "paper" && computerchoice === "scissors") ? "Computer Wins..!" :
        "Invalid Input. Please Enter a valid Input.";

    alert(result);
}
