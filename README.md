# Typing Speed Test — Project Guide (Small Build #12)

<img width="1024" height="572" alt="image" src="https://github.com/user-attachments/assets/5f8461fa-ddb6-4171-aa41-41df281f4352" />


A professional typing speed test application featuring real-time WPM tracking, accuracy calculation, and dynamic difficulty levels. Built with vanilla JavaScript and sleek black & white premium design for an elegant user experience.

## 🚀 Features

* **Real-Time Statistics:** Live WPM (Words Per Minute), accuracy percentage, error count, and timer display.
* **3 Difficulty Levels:** Easy (simple sentences), Medium (moderate complexity), and Hard (advanced vocabulary).
* **60-Second Timer:** Countdown timer with automatic test completion.
* **Character-by-Character Feedback:** Instant visual feedback (black/white highlighting) for correct and incorrect typing.
* **Performance Analytics:** Comprehensive results modal with final stats and personalized performance messages.
* **Smart Text Highlighting:** Current character highlighted, typed characters marked (correct in gray, incorrect in black).
* **Responsive Grid Layout:** 4-column stats grid adapts seamlessly across devices.
* **Premium Black & White UI:** Minimalist design with elegant shadows, smooth transitions, and modern typography.
* **No Dependencies:** Pure vanilla JavaScript with efficient event handling and state management.
* **Keyboard Shortcuts:** Press Enter to start test, automatic focus management.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3
* **Logic:** Vanilla JavaScript (ES6+) with real-time input validation, character comparison algorithms.
* **Styling:** CSS Custom Properties with responsive grid (repeat(4, 1fr)), optimized black & white theme.
* **Typography:** Modern sans-serif stack with refined letter spacing and font weights.
* **Architecture:** State-driven design with clean separation of concerns (rendering, stats, timer management).

## 📂 File Structure

* `index.html` - DOM structure with stats grid, difficulty selector, text display area, and results modal.
* `style.css` - Premium black & white styling with responsive design and smooth animations.
* `script.js` - Core logic for typing test, WPM calculation, accuracy tracking, and timer management.

## ⚙️ How It Works

The application manages state with the following structure:

```javascript
// State Management
let currentText = '';           // Text to be typed
let currentDifficulty = 'easy'; // Selected difficulty level
let timeLeft = 60;              // Countdown timer in seconds
let timerInterval = null;       // Timer reference
let isTestActive = false;       // Test running state
let startTime = null;           // Test start timestamp
let totalErrors = 0;            // Total incorrect characters
let correctChars = 0;           // Total correct characters typed
let totalChars = 0;             // Total characters typed

// Text Samples Structure
const textSamples = {
  easy: ["Simple sentences...", ...],
  medium: ["Moderate complexity...", ...],
  hard: ["Advanced terminology...", ...]
}
```

## 📝 Usage Examples

**WPM Calculation:**
```javascript
// Calculate Words Per Minute
function updateStats() {
  const timeElapsed = (60 - timeLeft) || 1;
  const wordsTyped = correctChars / 5;  // Average word length = 5 chars
  const wpm = Math.round((wordsTyped / timeElapsed) * 60);
  wpmElement.textContent = wpm || 0;
  
  // Calculate Accuracy
  const accuracy = totalChars > 0 
    ? Math.round((correctChars / totalChars) * 100) 
    : 100;
  accuracyElement.textContent = accuracy;
  
  // Update Errors
  errorsElement.textContent = totalErrors;
}
```

**Character-by-Character Validation:**
```javascript
function handleInput(e) {
  if (!isTestActive) return;
  
  const typed = e.target.value;
  totalChars = typed.length;
  correctChars = 0;
  let currentErrors = 0;
  
  // Reset all character styling
  for (let i = 0; i < currentText.length; i++) {
    const charSpan = document.getElementById(`char-${i}`);
    charSpan.className = '';
  }
  
  // Validate each character
  for (let i = 0; i < typed.length; i++) {
    const charSpan = document.getElementById(`char-${i}`);
    
    if (i < currentText.length) {
      if (typed[i] === currentText[i]) {
        charSpan.classList.add('correct');  // Gray background
        correctChars++;
      } else {
        charSpan.classList.add('incorrect'); // Black background
        currentErrors++;
      }
    }
  }
  
  // Highlight current character
  if (typed.length < currentText.length) {
    const currentCharSpan = document.getElementById(`char-${typed.length}`);
    currentCharSpan.classList.add('current');  // Black highlight
  }
  
  totalErrors = currentErrors;
  updateStats();
  
  // Auto-complete if text matches
  if (typed === currentText) {
    endTest();
  }
}
```

**Performance Rating System:**
```javascript
function showResults() {
  const timeElapsed = 60 - timeLeft;
  const wordsTyped = correctChars / 5;
  const wpm = Math.round((wordsTyped / timeElapsed) * 60);
  const accuracy = totalChars > 0 
    ? Math.round((correctChars / totalChars) * 100) 
    : 100;
  
  // Dynamic performance message
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
```

**Timer Management:**
```javascript
function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    
    if (timeLeft <= 0) {
      endTest();
    }
  }, 1000);
}

function endTest() {
  isTestActive = false;
  clearInterval(timerInterval);
  userInput.disabled = true;
  
  resetBtn.style.display = 'inline-block';
  difficultyBtns.forEach(btn => btn.disabled = false);
  
  showResults();
}
```

**Dynamic Text Rendering:**
```javascript
function displayText() {
  // Wrap each character in a span for individual styling
  textDisplay.innerHTML = currentText.split('').map((char, index) => 
    `<span id="char-${index}">${char}</span>`
  ).join('');
}

function loadNewText() {
  const samples = textSamples[currentDifficulty];
  currentText = samples[Math.floor(Math.random() * samples.length)];
  displayText();
}
```

## 💻 Run Locally

1. Clone the repository or download the files:
   ```bash
   git clone https://github.com/Niteshagarwal01/basic-projects.git
   cd basic-projects/17-typing-speed-test
   ```
2. Open `index.html` in your browser.
3. **No Installation Required:** Pure vanilla JavaScript - works immediately in any modern browser.
4. **No External Dependencies:** Completely self-contained with no API calls or libraries.

## 🔧 Customization

* **Color Scheme:** Modify CSS custom properties to change the theme:
  ```css
  :root {
    --bg-dark: #0a0a0a;           /* Background color */
    --bg-white: #ffffff;          /* Card background */
    --text-black: #000000;        /* Primary text */
    --text-gray: #666666;         /* Secondary text */
    --border-gray: #e0e0e0;       /* Border color */
    --shadow-dark: rgba(0, 0, 0, 0.5); /* Shadow color */
  }
  ```

* **Timer Duration:** Change test length in `script.js`:
  ```javascript
  let timeLeft = 90;  // 90-second test
  ```

* **Add Custom Text Samples:**
  ```javascript
  const textSamples = {
    easy: [
      "Your custom easy text here.",
      "Another simple sentence."
    ],
    medium: [
      "Your medium difficulty text with more complexity."
    ],
    hard: [
      "Your advanced text with sophisticated vocabulary and terminology."
    ]
  };
  ```

* **Modify Performance Thresholds:**
  ```javascript
  // Adjust WPM and accuracy requirements
  if (wpm >= 100 && accuracy >= 98) {
    message = '🔥 Legendary! Professional typist level!';
  }
  ```

* **Change Stats Grid Layout:**
  ```css
  .stats-container {
    grid-template-columns: repeat(2, 1fr);  /* 2 columns instead of 4 */
  }
  ```

## 🎨 UI/UX Features

* **Premium Black & White Design:** Minimalist aesthetic with elegant contrast and shadows.
* **4-Column Stats Grid:** Real-time display of Timer, WPM, Accuracy, and Errors.
* **Smooth Transitions:** All interactive elements have 0.3s ease transitions.
* **Hover Effects:** Stats boxes lift on hover with subtle shadow changes.
* **Character Highlighting:** 
  - **Correct:** Gray background (#e8e8e8)
  - **Incorrect:** Black background (#000000) with white text
  - **Current:** Black highlight showing next character to type
* **Results Modal:** Centered modal with backdrop blur and slide-up animation.
* **Button Styling:** Rounded buttons with hover lift effects and shadow enhancements.
* **Responsive Layout:** Grid adapts from 4 columns (desktop) to 2 columns (tablet) to 1 column (mobile).
* **Disabled State Management:** Difficulty buttons disabled during active test.
* **Auto-Focus:** Input area automatically focused when test starts.

## ⚡ Key Functions

| Function | Purpose |
|----------|---------|
| `init()` | Initialize app, load text, setup event listeners |
| `setupEventListeners()` | Attach click and input event handlers |
| `loadNewText()` | Select random text from current difficulty level |
| `displayText()` | Render text as individual character spans |
| `startTest()` | Initialize test state, enable input, start timer |
| `startTimer()` | Begin countdown, auto-end test at 0 seconds |
| `handleInput(e)` | Validate typed characters, update stats in real-time |
| `updateStats()` | Calculate and display WPM, accuracy, errors |
| `endTest()` | Stop timer, disable input, show results |
| `showResults()` | Display modal with final stats and performance rating |
| `resetTest()` | Clear state, load new text, prepare for new test |

## 📊 Statistics Formulas

**Words Per Minute (WPM):**
```javascript
WPM = (correctChars / 5) / (timeElapsed / 60)
// Standard: 1 word = 5 characters
// timeElapsed in seconds, converted to minutes
```

**Accuracy Percentage:**
```javascript
Accuracy = (correctChars / totalChars) * 100
// Percentage of correctly typed characters
```

**Error Count:**
```javascript
Errors = totalChars - correctChars
// Total incorrect characters at any point
```

## 🎯 Features Comparison

| Feature | Basic Typing Test | Premium Typing Test ✨ |
|---------|------------------|------------------------|
| WPM Tracking | ✅ | ✅ Real-time |
| Accuracy % | ✅ | ✅ Live updates |
| Difficulty Levels | ❌ | ✅ 3 levels (Easy/Medium/Hard) |
| Character Feedback | ❌ | ✅ Color-coded highlighting |
| Timer | ✅ Fixed | ✅ 60-second countdown |
| Results Modal | ❌ | ✅ Detailed stats + rating |
| Premium UI | ❌ | ✅ Black & white minimal |
| Responsive Design | ❌ | ✅ Grid adapts to screen size |
| Performance Ratings | ❌ | ✅ 5-tier rating system |
| Auto-Complete | ❌ | ✅ Detects perfect match |
| Custom Samples | ❌ | ✅ 5 samples per difficulty |

## 📱 Responsive Design

**Desktop (>768px):**
- 4-column stats grid
- Wide text display area
- Side-by-side buttons

**Tablet (481px-768px):**
- 2-column stats grid
- Maintained text display width
- Stacked difficulty buttons

**Mobile (<480px):**
- 2-column stats grid (stacked vertically)
- Full-width buttons
- Reduced padding and font sizes
- Taller input area for better mobile typing

```css
@media (max-width: 768px) {
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .difficulty-selector {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .button-container {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
```

## 🚀 Future Enhancements

Potential features to add:

* **Historical Stats:** LocalStorage to track progress over time with charts.
* **Leaderboard:** Compare scores with friends or global rankings.
* **Custom Texts:** User-uploaded text samples for personalized practice.
* **Keyboard Heatmap:** Visual representation of most error-prone keys.
* **Sound Effects:** Audio feedback for correct/incorrect keystrokes.
* **Dark Mode Toggle:** Switch between black/white and white/black themes.
* **Multiplayer Mode:** Real-time typing races with other users.
* **Difficulty Auto-Adjust:** Dynamically increase difficulty based on performance.
* **Export Results:** Download stats as PDF or share on social media.
* **Keyboard Layout Support:** QWERTY, Dvorak, Colemak configurations.

---

*Contributions welcome — feel free to open issues or create PRs to add features like historical tracking, leaderboards, or custom text uploads.*
