document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const startGameButton = document.getElementById('startGameButton');
    const levelElement = document.getElementById('level');
    const colors = ['red', 'green', 'blue', 'yellow'];
    let sequence = [];
    let playerSequence = [];
    let level = 0;

    function createButton(color) {
        const button = document.createElement('button');
        button.classList.add('game-button', `color-${color}`);
        button.addEventListener('click', () => handlePlayerInput(color));
        gameBoard.appendChild(button);
    }

    colors.forEach(createButton);

    function lightUp(color) {
        const button = document.querySelector(`.color-${color}`);
        button.classList.add('active');
        playSound(color);
        setTimeout(() => button.classList.remove('active'), 300);
    }
    
    let highScore = 0;

function handlePlayerInput(color) {
    playerSequence.push(color);
    playSound(color);
    lightUp(color);
    const currentLevel = playerSequence.length;
    if (playerSequence[currentLevel - 1] !== sequence[currentLevel - 1]) {
        alert('Wrong! Game over.');
        resetGame();
        return;
    }
    if (playerSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
    }
}
    
    function updateLevelDisplay() {
        levelElement.textContent = `Level: ${level}`;
    }

    function startGame() {
        level = 0;
    updateLevelDisplay(); 
        sequence = [];
        playerSequence = [];
        nextLevel();
    }

    function nextLevel() {
        level++;
        updateLevelDisplay();
        playerSequence = [];
    
        if (level > highScore) {
            highScore = level;
            updateHighScoreDisplay();
        }
    
        let nextColor;
        do {
            nextColor = colors[Math.floor(Math.random() * colors.length)];
        } while (sequence.length > 0 && nextColor === sequence[sequence.length - 1]);
    
        sequence.push(nextColor);
        showSequence();
    }
    

    function updateHighScoreDisplay() {
        const highScoreElement = document.getElementById('Record');
        highScoreElement.textContent = `Record: ${highScore}`;
    }
    
    

    function resetGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        updateLevelDisplay();
    }
    
    function showSequence() {
        let i = 0;
        const interval = setInterval(() => {
            lightUp(sequence[i]);
            i++;
            if (i >= sequence.length) {
                clearInterval(interval);
            }
        }, 600);
    }

    startGameButton.addEventListener('click', startGame);
});

const sounds = {
    red: new Audio('./Sounds/sound1.wav'),
    green: new Audio('./Sounds/sound2.wav'),
    blue: new Audio('./Sounds/sound3.wav'),
    yellow: new Audio('./Sounds/sound4.wav')
};

function playSound(color) {
    if (isSoundEnabled) {
        sounds[color].play().catch(e => console.error('Error playing sound:', e));
    }
}

let isSoundEnabled = true;

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    document.getElementById('soundToggleButton').textContent = isSoundEnabled ? 'Turn off the sound' : 'Turn on the sound';
}

document.getElementById('soundToggleButton').addEventListener('click', toggleSound);