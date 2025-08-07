// DOM Elements
const setupSection = document.getElementById('setup-section');
const questionsUrlInput = document.getElementById('questions-url');
const answersUrlInput = document.getElementById('answers-url');
const loadDataButton = document.getElementById('load-data-button');
const statusArea = document.getElementById('status-area');
const gameBoard = document.getElementById('game-board');
const mainScoreArea = document.getElementById('main-score-area');
const questionModal = document.getElementById('question-modal');
const modalScoreArea = document.getElementById('modal-score-area');
const modalScoreDisplay = document.getElementById('modal-score');
const teamNameInputsContainer = document.getElementById('team-names-inputs');
const numTeamsRadios = document.querySelectorAll('input[name="numTeams"]');
const modalCategory = document.getElementById('modal-category');
const modalPoints = document.getElementById('modal-points');
const modalQuestion = document.getElementById('modal-question');
const modalAnswerArea = document.getElementById('modal-answer-area');
const modalAnswer = document.getElementById('modal-answer');
const showAnswerButton = document.getElementById('show-answer-button');
const closeModalButton = document.getElementById('close-modal-button');
const correctButton = document.getElementById('correct-button');
const incorrectButton = document.getElementById('incorrect-button');

// Game State
let categories = [];
let questions = {};
let teams = []; // Array to hold team objects { name: string, score: number }
let currentTeamIndex = 0; // Index of the team whose turn it is
let currentAnswer = '';
let currentPoints = 0;
let currentCellElement = null;

// --- Team Selection Logic ---
numTeamsRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        const numTeams = parseInt(event.target.value);
        // Loop up to 5 now
        for (let i = 1; i <= 5; i++) {
            const container = document.getElementById(`team-${i}-name-input-container`);
            if (container) {
                container.classList.toggle('hidden', i > numTeams);
            }
        }
    });
});

// --- Load Data & Initialize Game ---
async function loadData() {
    const questionsUrl = questionsUrlInput.value;
    const answersUrl = answersUrlInput.value;

    if (!questionsUrl || !answersUrl) {
        alert('Please provide both URLs.');
        return;
    }

    // Get Team Info
    const selectedNumTeams = parseInt(document.querySelector('input[name="numTeams"]:checked').value);
    teams = [];
    // Loop up to the selected number of teams (max 5)
    for (let i = 1; i <= selectedNumTeams; i++) {
        const nameInput = document.getElementById(`team-${i}-name`);
        // Check if nameInput exists before accessing value
        const name = nameInput ? (nameInput.value.trim() || `Team ${i}`) : `Team ${i}`; // Default name if empty
        teams.push({ name: name, score: 0 });
    }

    statusArea.classList.remove('hidden');
    statusArea.textContent = 'Loading data...';
    loadDataButton.disabled = true;

    try {
        const questionsResponse = await fetch(questionsUrl);
        const answersResponse = await fetch(answersUrl);

        if (!questionsResponse.ok || !answersResponse.ok) {
            throw new Error(`HTTP error! status: ${questionsResponse.status} or ${answersResponse.status}`);
        }

        const questionsText = await questionsResponse.text();
        const answersText = await answersResponse.text();

        // Wrap parseData in its own try...catch or check its return
        try {
            parseData(questionsText, answersText);
        } catch (parseError) {
            console.error('Error parsing CSV data:', parseError);
            statusArea.textContent = `Failed to parse game data: ${parseError.message}. Please check CSV format and content.`;
            loadDataButton.disabled = false;
            return; // Stop execution if parsing fails
        }

        buildGameBoard();
        initializeScoreboard(); // Setup the main scoreboard

        statusArea.classList.add('hidden');
        setupSection.classList.add('hidden'); // Hide the entire setup section
        gameBoard.classList.remove('hidden');
        mainScoreArea.classList.remove('hidden'); // Show main score display

    } catch (error) {
        console.error('Error loading data:', error);
        // Keep the generic fetch error handling
        statusArea.textContent = `Failed to load data. Error: ${error.message}. Please check URLs, CORS, and sheet sharing settings.`;
        loadDataButton.disabled = false;
    }
}

// --- Initialize Scoreboard ---
function initializeScoreboard() {
    mainScoreArea.innerHTML = ''; // Clear previous scores
    teams.forEach((team, index) => {
        const teamScoreDiv = document.createElement('div');
        teamScoreDiv.id = `team-${index}-display`;
        teamScoreDiv.className = 'text-center text-white p-2 border-2 border-transparent rounded'; // Start transparent
        teamScoreDiv.innerHTML = `
            <div class="text-xl font-bold">${team.name}</div>
            <div id="team-${index}-score" class="text-3xl font-bold">$${team.score}</div>
        `;
        mainScoreArea.appendChild(teamScoreDiv);
    });
    updateScoreboardHighlight(); // Initial highlight
    updateModalScoreDisplay(); // Initial modal score display
}

// --- Highlight Current Team on Scoreboard ---
function updateScoreboardHighlight() {
    teams.forEach((_, index) => {
        const teamDisplay = document.getElementById(`team-${index}-display`);
        if (teamDisplay) {
            if (index === currentTeamIndex) {
                teamDisplay.classList.remove('border-transparent');
                teamDisplay.classList.add('border-yellow-400'); // Highlight with yellow border
            } else {
                teamDisplay.classList.remove('border-yellow-400');
                teamDisplay.classList.add('border-transparent'); // Make others transparent
            }
        }
    });
}

// --- Update Score ---
function updateScore(points) {
    if (teams.length > 0) {
        teams[currentTeamIndex].score += points;
        // Update main scoreboard
        const teamScoreElement = document.getElementById(`team-${currentTeamIndex}-score`);
        if (teamScoreElement) {
            teamScoreElement.textContent = `$${teams[currentTeamIndex].score}`;
        }
        updateModalScoreDisplay(); // Update score in modal
    }
}

// Update the score displayed in the modal (shows current team's score)
function updateModalScoreDisplay() {
     if (teams.length > 0) {
        modalScoreDisplay.textContent = teams[currentTeamIndex].score;
        // Optional: Update label to show current team name
        modalScoreArea.firstChild.textContent = `${teams[currentTeamIndex].name}'s Score: $`;
     } else {
         modalScoreDisplay.textContent = '0';
         modalScoreArea.firstChild.textContent = `Score: $`;
     }
}

// --- Handle Correct/Incorrect ---
function handleCorrect() {
    updateScore(currentPoints);
    markCellAnswered();
    // Switch to the next team
    currentTeamIndex = (currentTeamIndex + 1) % teams.length;
    updateScoreboardHighlight(); // Update highlight after switching turn
    closeModal();
}

function handleIncorrect() {
    updateScore(-currentPoints);
    markCellAnswered();
    // Switch to the next team
    currentTeamIndex = (currentTeamIndex + 1) % teams.length;
    updateScoreboardHighlight(); // Update highlight after switching turn
    closeModal();
}

// --- Open Question Modal ---
function openQuestionModal(key, category, points, cellElement) {
    const questionData = questions[key];
    if (!questionData || cellElement.classList.contains('answered')) return;

    modalCategory.textContent = category;
    modalPoints.textContent = `Points: $${points}`;
    modalQuestion.textContent = questionData.question;
    currentAnswer = questionData.answer;
    currentPoints = points;
    currentCellElement = cellElement;

    modalAnswerArea.classList.add('hidden');
    showAnswerButton.classList.remove('hidden');
    correctButton.classList.add('hidden');
    incorrectButton.classList.add('hidden');

    updateModalScoreDisplay(); // Show current team's score when opening
    questionModal.classList.remove('hidden');
}

function parseData(questionsCsv, answersCsv) {
    // Robust CSV line parser
    const parseCsvLine = (line) => {
        const result = [];
        let currentField = '';
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];

            if (!inQuotes) {
                if (char === ',') {
                    result.push(currentField.trim());
                    currentField = '';
                } else if (char === '"' && currentField === '') {
                    // Start quoted field only if quote is the first char of the field
                    inQuotes = true;
                } else {
                    currentField += char;
                }
            } else { // Inside quotes
                if (char === '"') {
                    if (nextChar === '"') {
                        // Escaped quote
                        currentField += '"';
                        i++; // Skip next quote
                    } else {
                        // End of quoted field
                        inQuotes = false;
                        // We expect a comma or end of line next,
                        // but don't strictly enforce for robustness
                    }
                } else {
                    currentField += char;
                }
            }
        }
        result.push(currentField.trim()); // Add the last field
        return result;
    };

    // Filter out comment lines starting with '#' and empty lines
    const questionsLines = questionsCsv.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));
    const answersLines = answersCsv.split('\n').filter(line => line.trim() !== '' && !line.trim().startsWith('#'));

    if (questionsLines.length === 0 || answersLines.length === 0) {
        throw new Error("CSV data is empty or invalid (after filtering comments).");
    }

    // The first non-comment line is the header
    categories = parseCsvLine(questionsLines[0]);
    const answerCategories = parseCsvLine(answersLines[0]);

    // Basic validation: Check if category headers match
    if (categories.join(',') !== answerCategories.join(',')) {
        console.warn("Warning: Category headers in questions and answers CSV files do not match.");
        // Decide how to handle: throw error, use questions categories, etc.
        // For now, we'll proceed using the questions categories.
    }

    // Check if the number of data rows match (excluding header)
    if (questionsLines.length !== answersLines.length) {
         console.warn("Warning: Question and Answer CSVs have different numbers of data rows (after filtering comments).");
    }

    questions = {};
    const numDataRows = Math.min(questionsLines.length, answersLines.length) - 1; // Use the minimum number of rows, excluding header
    const numCategories = categories.length;

    for (let i = 1; i <= numDataRows; i++) { // Start from 1 to skip header
        const questionRow = parseCsvLine(questionsLines[i]);
        const answerRow = parseCsvLine(answersLines[i]);
        const points = i * 100; // Assuming points are 100, 200, etc. based on row index

        if (questionRow.length !== numCategories || answerRow.length !== numCategories) {
            console.warn(`Warning: Row ${i+1} in CSV does not have the expected number of columns (${numCategories}). Skipping potentially mismatched data.`);
            // Optionally skip this row or handle partial data
        }

        for (let j = 0; j < numCategories; j++) {
            // Check bounds defensively, though the warning above might cover this
            if (j < questionRow.length && j < answerRow.length) {
                const key = `${categories[j]}_${points}`;
                questions[key] = {
                    question: questionRow[j] || "N/A",
                    answer: answerRow[j] || "N/A"
                };
            }
        }
    }
    console.log("Parsed Categories:", categories);
}

function buildGameBoard() {
    gameBoard.innerHTML = '';
    categories.forEach(category => {
        const categoryCell = document.createElement('div');
        categoryCell.className = 'bg-blue-900 text-white font-bold text-sm h-16 flex items-center justify-center text-center border border-black p-2';
        categoryCell.textContent = category;
        gameBoard.appendChild(categoryCell);
    });

    const numRows = 5;
    for (let i = 1; i <= numRows; i++) {
        categories.forEach(category => {
            const points = i * 100;
            const key = `${category}_${points}`;

            const questionCell = document.createElement('div');
            questionCell.className = 'jeopardy-cell bg-blue-800 text-yellow-400 font-bold text-2xl h-24 flex items-center justify-center cursor-pointer border border-black transition duration-200 ease-in-out hover:bg-blue-700';
            questionCell.textContent = `$${points}`;
            questionCell.dataset.key = key;

            if (questions[key]) {
                questionCell.addEventListener('click', () => openQuestionModal(key, category, points, questionCell));
            } else {
                questionCell.textContent = '';
                questionCell.classList.add('opacity-50', 'cursor-not-allowed');
            }

            gameBoard.appendChild(questionCell);
        });
    }
}

function showAnswer() {
    modalAnswerArea.classList.remove('hidden');
    modalAnswer.textContent = currentAnswer;
    showAnswerButton.classList.add('hidden');
    correctButton.classList.remove('hidden');
    incorrectButton.classList.remove('hidden');
}

function markCellAnswered() {
    if (currentCellElement) {
        currentCellElement.classList.remove('bg-blue-800', 'hover:bg-blue-700', 'cursor-pointer');
        currentCellElement.classList.add('answered', 'bg-gray-600', 'text-gray-400', 'cursor-not-allowed', 'pointer-events-none');
        currentCellElement.textContent = '';
        currentCellElement.replaceWith(currentCellElement.cloneNode(true));
    }
}

function closeModal() {
    questionModal.classList.add('hidden');
    modalAnswerArea.classList.add('hidden');
    showAnswerButton.classList.remove('hidden');
    correctButton.classList.add('hidden');
    incorrectButton.classList.add('hidden');
    currentCellElement = null;
    currentPoints = 0;
    currentAnswer = '';
}

// Event Listeners
loadDataButton.addEventListener('click', loadData);
showAnswerButton.addEventListener('click', showAnswer);
closeModalButton.addEventListener('click', closeModal);
correctButton.addEventListener('click', handleCorrect);
incorrectButton.addEventListener('click', handleIncorrect);

// Initialize
mainScoreArea.classList.add('hidden'); // Hide main score initially
document.querySelector('input[name="numTeams"]:checked').dispatchEvent(new Event('change'));