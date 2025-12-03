// Text samples for different difficulty levels
const textSamples = {
    easy: [
        "The quick brown fox jumps over the lazy dog near the old barn.",
        "She sells sea shells by the sea shore on sunny days.",
        "A journey of a thousand miles begins with a single step forward.",
        "Every cloud has a silver lining waiting to be discovered.",
        "Time flies like an arrow while fruit flies like a banana."
    ],
    medium: [
        "Technology has revolutionized the way we communicate and interact with each other in modern society.",
        "Practice makes perfect, but consistent effort and dedication lead to extraordinary achievements over time.",
        "The beautiful symphony orchestra performed magnificently under the conductor's expert guidance last night.",
        "Understanding complex algorithms requires patience, logical thinking, and continuous problem-solving practice.",
        "Creative writing allows imagination to flourish while developing unique storytelling capabilities and expression."
    ],
    hard: [
        "Simultaneously implementing sophisticated methodologies whilst maintaining impeccable standards exemplifies extraordinary professionalism.",
        "Quantum mechanics revolutionized theoretical physics by introducing probabilistic interpretations of subatomic particle behavior patterns.",
        "Cryptocurrency blockchain technology decentralizes financial transactions through cryptographic verification and distributed ledger systems.",
        "Neuroplasticity demonstrates the brain's remarkable adaptability through continuous synaptic reorganization and cognitive development processes.",
        "Entrepreneurship necessitates innovative problem-solving capabilities, calculated risk-taking, and unwavering determination despite inevitable obstacles."
    ]
};

// DOM Elements
const textDisplay = document.getElementById('textToType');
const userInput = document.getElementById('userInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const errorsElement = document.getElementById('errors');
const resultModal = document.getElementById('resultModal');
const closeModal = document.getElementById('closeModal');
const difficultyBtns = document.querySelectorAll('.difficulty-btn');

// Game State
let currentText = '';
let currentDifficulty = 'easy';
let timeLeft = 60;
let timerInterval = null;
let isTestActive = false;
let startTime = null;
let totalErrors = 0;
let correctChars = 0;
let totalChars = 0;

// Initialize
function init() {
    loadNewText();
    setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
    startBtn.addEventListener('click', startTest);
    resetBtn.addEventListener('click', resetTest);
    closeModal.addEventListener('click', hideResultModal);
    userInput.addEventListener('input', handleInput);
    
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (!isTestActive) {
                difficultyBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentDifficulty = e.target.dataset.difficulty;
                loadNewText();
            }
        });
    });
}

// Load new text based on difficulty
function loadNewText() {
    const samples = textSamples[currentDifficulty];
    currentText = samples[Math.floor(Math.random() * samples.length)];
    displayText();
}

// Display text with character spans
function displayText() {
    textDisplay.innerHTML = currentText.split('').map((char, index) => 
        `<span id="char-${index}">${char}</span>`
    ).join('');
}

// Start Test
function startTest() {
    isTestActive = true;
    timeLeft = 60;
    totalErrors = 0;
    correctChars = 0;
    totalChars = 0;
    
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    
    startBtn.style.display = 'none';
    difficultyBtns.forEach(btn => btn.disabled = true);
    
    startTime = Date.now();
    startTimer();
    updateStats();
}

// Start Timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

// Handle User Input
function handleInput(e) {
    if (!isTestActive) return;
    
    const typed = e.target.value;
    totalChars = typed.length;
    correctChars = 0;
    let currentErrors = 0;
    
    // Reset all characters
    for (let i = 0; i < currentText.length; i++) {
        const charSpan = document.getElementById(`char-${i}`);
        charSpan.className = '';
    }
    
    // Check each character
    for (let i = 0; i < typed.length; i++) {
        const charSpan = document.getElementById(`char-${i}`);
        
        if (i < currentText.length) {
            if (typed[i] === currentText[i]) {
                charSpan.classList.add('correct');
                correctChars++;
            } else {
                charSpan.classList.add('incorrect');
                currentErrors++;
            }
        }
    }
    
    // Highlight current character
    if (typed.length < currentText.length) {
        const currentCharSpan = document.getElementById(`char-${typed.length}`);
        currentCharSpan.classList.add('current');
    }
    
    totalErrors = currentErrors;
    updateStats();
    
    // Check if completed
    if (typed === currentText) {
        endTest();
    }
}

// Update Statistics
function updateStats() {
    // Calculate WPM
    const timeElapsed = (60 - timeLeft) || 1;
    const wordsTyped = correctChars / 5; // Average word length is 5 characters
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    wpmElement.textContent = wpm || 0;
    
    // Calculate Accuracy
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    accuracyElement.textContent = accuracy;
    
    // Update Errors
    errorsElement.textContent = totalErrors;
}

// End Test
function endTest() {
    isTestActive = false;
    clearInterval(timerInterval);
    userInput.disabled = true;
    
    resetBtn.style.display = 'inline-block';
    difficultyBtns.forEach(btn => btn.disabled = false);
    
    showResults();
}

// Show Results Modal
function showResults() {
    const timeElapsed = 60 - timeLeft;
    const wordsTyped = correctChars / 5;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    document.getElementById('finalWpm').textContent = wpm;
    document.getElementById('finalAccuracy').textContent = accuracy + '%';
    document.getElementById('finalErrors').textContent = totalErrors;
    document.getElementById('finalChars').textContent = totalChars;
    
    // Performance message
    let message = '';
    if (wpm >= 80 && accuracy >= 95) {
        message = '🏆 Outstanding! You\'re a typing master!';
    } else if (wpm >= 60 && accuracy >= 90) {
        message = '🌟 Excellent work! Very impressive speed!';
    } else if (wpm >= 40 && accuracy >= 85) {
        message = '👍 Good job! Keep practicing!';
    } else if (wpm >= 20) {
        message = '💪 Nice effort! Practice makes perfect!';
    } else {
        message = '🎯 Keep going! You\'ll improve with practice!';
    }
    
    document.getElementById('performanceMessage').textContent = message;
    resultModal.classList.add('show');
}

// Hide Results Modal
function hideResultModal() {
    resultModal.classList.remove('show');
}

// Reset Test
function resetTest() {
    clearInterval(timerInterval);
    isTestActive = false;
    timeLeft = 60;
    totalErrors = 0;
    correctChars = 0;
    totalChars = 0;
    
    timerElement.textContent = '60';
    wpmElement.textContent = '0';
    accuracyElement.textContent = '100';
    errorsElement.textContent = '0';
    
    userInput.value = '';
    userInput.disabled = true;
    
    startBtn.style.display = 'inline-block';
    resetBtn.style.display = 'none';
    difficultyBtns.forEach(btn => btn.disabled = false);
    
    loadNewText();
}

// Initialize app
init();
