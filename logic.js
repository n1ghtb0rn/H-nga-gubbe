let words = [];
let answer = "";
let hp = 10;
let allLetterNodes = [];
let answerNodes = [];
let hpBlockNodes;
let gameOver = false;

function initiate() {

    words.push("SLANGBELLA");
    words.push("KATAPULT");
    words.push("TEGELPANNA");
    words.push("UTOMHUS");
    words.push("FLYGPLAN");
    words.push("SKOSULA");
    words.push("HUVUDBRY");
    words.push("METAFOR");
    words.push("REGERINGSKANSLI");
    words.push("BADBYXOR");
    words.push("FRUKTANSVÄRD");
    words.push("ÖVNINGSKÖR");
    words.push("RESPEKTLÖS");
    words.push("ÅBEROPA");
    words.push("KANELBULLE");
    words.push("HAMNKAPTEN");
    words.push("TRÄSKTROLL");
    words.push("FULLSTÄNDIG");
    words.push("ENTUSIASM");
    words.push("LÄNGDSKIDOR");

    hpBlockNodes = document.getElementsByClassName("hp-block");

    let index = randomIntInRange(0, words.length);
    answer = words[index];

    let guessedLettersContainer = document.getElementById("guessed-letters");

    for (let letter of answer) {
        let p = document.createElement("p");
        //p.innerHTML = "0";
        p.letter = letter;
        guessedLettersContainer.append(p);
        p.style.color = "rgba(0,0,0,0)";
        answerNodes.push(p);
    }

    allLetterNodes = document.querySelectorAll("#letters-container > p");
    for (let i = 0; i < allLetterNodes.length; i++) {
        let letterNode = allLetterNodes[i];
        letterNode.style.color = "black";

    }

    document.getElementById("hp").innerHTML = hp;

}

function randomIntInRange(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    if (gameOver) {
        return;
    }

    let key = event.key.toLowerCase();

    console.log(key);

    proccessInput(key);

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window

function proccessInput(key) {

    for (let i = 0; i < allLetterNodes.length; i++) {
        let letterNode = allLetterNodes[i];
        let letter = letterNode.innerHTML.toLowerCase();
        if (key == letter && letterNode.style.color == "black") {
            let correctGuess = isCorrectGuess(letter);
            if (correctGuess) {
                console.log("Correct guess!");
                showAnswerLetter(letter);
                checkVictory();
            }
            else {
                takeDamage();
            }
            updateLetterColor(letterNode, correctGuess);
        }

    }

}

function takeDamage() {
    hp--;
    document.getElementById("hp").innerHTML = hp;

    let damageColor = "lightgray";

    let hpBlocks = [];

    

    for (let i = 0; i < hpBlockNodes.length; i++) {
        if (hpBlockNodes[i].style.backgroundColor != damageColor) {
            hpBlocks.push(hpBlockNodes[i]);
        }
    }

    let lastIndex = hpBlocks.length - 1;
    hpBlocks[lastIndex].style.backgroundColor = damageColor;

    if (hp <= 0) {
        performGameOver();
    }
}

function isCorrectGuess(letter) {

    for (let i = 0; i < answer.length; i++) {
        if (letter == answer[i].toLowerCase()) {
            return true;
        }
    }

    return false;
}

function showAnswerLetter(letter) {

    for (let i = 0; i < answerNodes.length; i++) {
        let p = answerNodes[i];
        if (letter == p.letter.toLowerCase()) {
            p.innerHTML = p.letter;
            p.style.color = "black";
        }
    }

}

function checkVictory() {

    for (let i = 0; i < answerNodes.length; i++) {
        let p = answerNodes[i];
        if (p.style.color != "black") {
            return;
        }
    }

    document.getElementById("game-over-container").style.visibility = "visible";
    document.getElementById("game-over-paragraph").innerHTML = "Victory!";
    console.log("VICTORY!!!");
    gameOver = true;
}

function updateLetterColor(node, correctGuess) {
    correctGuess ? node.style.color = "lightgreen" : node.style.color = "red";
    node.style.boxShadow = "0px 0px";
}

function performGameOver() {

    for (let i = 0; i < answerNodes.length; i++) {
        let node = answerNodes[i];
        node.innerHTML = answer[i];
    }

    document.getElementById("game-over-container").style.visibility = "visible";
    document.getElementById("game-over-paragraph").innerHTML = "Game over!";

    for (let i = 0; i < answerNodes.length; i++) {
        answerNodes[i].style.color = "black";
    }

    console.log("GAME OVER!");
    gameOver = true;
}