document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const startGameButton = document.getElementById('startGameButton'); // Кнопка для початку гри
    const levelElement = document.getElementById('level');
    const colors = ['red', 'green', 'blue', 'yellow'];
    let sequence = [];
    let playerSequence = [];
    let level = 0;

    // Функція для створення кнопки
    function createButton(color) {
        const button = document.createElement('button');
        button.classList.add('game-button', `color-${color}`);
        button.addEventListener('click', () => handlePlayerInput(color));
        gameBoard.appendChild(button);
    }

    // Генерація ігрових кнопок
    colors.forEach(createButton);

    // Підсвічування кнопки
    function lightUp(color) {
        const button = document.querySelector(`.color-${color}`);
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 300);
    }

    let highScore = 0;

    // Обробка вводу гравця
    function handlePlayerInput(color) {
        playerSequence.push(color);
        const currentLevel = playerSequence.length;
        if (playerSequence[currentLevel - 1] !== sequence[currentLevel - 1]) {
            alert('Неправильно! Спробуйте знову.');
            resetGame();
            return;
        }
        if (playerSequence.length === sequence.length) {
            setTimeout(nextLevel, 1000);
        }
    }
    

    // Оновлення відображення рівня
    function updateLevelDisplay() {
        levelElement.textContent = `Рівень: ${level}`;
    }

    // Функція для старту гри
    function startGame() {
        level = 0; // або 1, залежно від того, з якого рівня ви хочете починати
    updateLevelDisplay(); 
        sequence = [];
        playerSequence = [];
        nextLevel();
    }

    // Перехід до наступного рівня
    function nextLevel() {
        level++;
        updateLevelDisplay();
        playerSequence = [];
    
        // Оновлення рекорду
        if (level > highScore) {
            highScore = level;
            updateHighScoreDisplay();
        }
    
        const nextColor = colors[Math.floor(Math.random() * colors.length)];
        sequence.push(nextColor);
        showSequence();
    }

    function updateHighScoreDisplay() {
        const highScoreElement = document.getElementById('Рекорд');
        highScoreElement.textContent = `Рекорд: ${highScore}`;
    }
    
    

    function resetGame() {
        sequence = [];
        playerSequence = [];
        level = 0;
        updateLevelDisplay();
    }
    

    // Демонстрація послідовності
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

    // Обробник події для кнопки "Почати гру"
    startGameButton.addEventListener('click', startGame);
});
