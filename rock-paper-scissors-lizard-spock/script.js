window.addEventListener('DOMContentLoaded', () => {
    setup();
});

// The general idea here is that these represent all the possible ways to
// win for a given choice. So, for example, if you were to lookup "scissors",
// you can see that it cuts paper and decapitates lizard.
const shapes = {
    scissors: {paper: 'cuts', lizard: 'decapitates'},
    paper: {rock: 'covers', spock: 'disproves'},
    rock: {lizard: 'crushes', scissors: 'crushes'},
    lizard: {spock: 'poisons', paper: 'eats'},
    spock: {scissors: 'smashes', rock: 'vaporizes'},
};

let aiChoice = null;
let playerChoice = null;
let score = [0, 0];


// This sets up the choices by creating elements programmatically, and then
// assigning the images to them and setting the onclick handler to handle
// player choices.
function setup() {
    for (const k in shapes) {
        const div1 = document.createElement('div');
        const div2 = document.createElement('div');
        const img = document.createElement('img');
        img.src = k + '.png';
        div1.id = k;
        div1.className = 'base unselected';
        div1.appendChild(img);
        div1.onclick = (e) => {
            select(e);
        };

        div2.id = 'ai-' + k;
        div2.className = 'base unselected';
        div2.appendChild(div1);

        document.getElementById('selection').appendChild(div2);
    }
    updateScore();
}

function updateScore() {
    document.getElementById('score').innerText = score[0] + ':' + score[1];
}

// This is called when a player selects one of the choices, ie. rock, paper, etc...
function select(evt) {
    for (const k in shapes) {
        const node = document.getElementById(k);
        node.className = "base unselected";
    }
    evt.currentTarget.className = "base selected";

    playerChoice = evt.currentTarget.id;

    aiChoose(50);
}

function aiChoose(delay) {
    for (const k in shapes) {
        const node = document.getElementById(k);
        node.parentNode.className = "base unselected";
    }

    const possibleSelections = Object.keys(shapes);
    const roll = Math.floor(Math.random() * possibleSelections.length);

    const choice = possibleSelections[roll];
    const node = document.getElementById(choice);
    node.parentNode.className = "base aiSelected";
    aiChoice = choice;

    if (delay < 200) {
        setTimeout(() => {
            aiChoose(delay + 5);
        }, delay);
    } else {
        resolveWinner();
    }
}

function resolveWinner() {
    let text = '';
    if (aiChoice == playerChoice) {
        text = 'Tie game.'
    } else if (aiChoice in shapes[playerChoice]) {
        text = 'Player Wins: ';
        text += (playerChoice + ' ' + shapes[playerChoice][aiChoice] +
            ' ' + aiChoice + '.');
        score[0] += 1;
    } else {
        text = 'AI Wins: ';
        text += (aiChoice + ' ' + shapes[aiChoice][playerChoice] +
            ' ' + playerChoice + '.');
        score[1] += 1;
    }
    document.getElementById('description').innerText = text;
    updateScore();
}


function _isWinner(player1, player2) {
    return player2 in _choices[player1];
}

document.getElementById("btn").addEventListener("click", )