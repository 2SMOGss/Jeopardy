# Database Schema Documentation
## Jeopardy Web App

### Database Architecture
**Type:** In-Memory Data Structures (No Persistent Database)  
**Storage:** JavaScript objects and arrays  
**Persistence:** Session-only (resets on page refresh)  
**Rationale:** Chosen for simplicity and zero infrastructure requirements

### Data Models

#### 1. Categories Array
**Purpose:** Store category names for the game board  
**Type:** Array of strings  
**Structure:** 6 categories per game

```javascript
categories = [
    "Category 1",
    "Category 2", 
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6"
]
```

**Validation Rules:**
- Must contain exactly 6 categories
- Categories cannot be empty strings
- Categories should be unique (recommended)

#### 2. Questions Object
**Purpose:** Store all questions and answers with their metadata  
**Type:** Object with composite keys  
**Structure:** Key-value pairs where key = "Category_Points"

```javascript
questions = {
    "Category1_100": {
        question: "What is the capital of France?",
        answer: "Paris"
    },
    "Category1_200": {
        question: "What is the largest planet in our solar system?",
        answer: "Jupiter"
    },
    "Category1_300": {
        question: "Who wrote 'Romeo and Juliet'?",
        answer: "William Shakespeare"
    },
    "Category1_400": {
        question: "What is the chemical symbol for gold?",
        answer: "Au"
    },
    "Category1_500": {
        question: "In what year did World War II end?",
        answer: "1945"
    },
    // ... 25 more questions (5 per category × 6 categories)
}
```

**Key Format:** `"{Category}_{Points}"`
- Category: Must match one of the categories in the categories array
- Points: Must be one of [100, 200, 300, 400, 500]

**Validation Rules:**
- All 30 questions must be present (6 categories × 5 point values)
- Questions and answers cannot be empty strings
- Keys must follow the exact format: "Category_Points"

#### 3. Teams Array
**Purpose:** Store team information and scores  
**Type:** Array of team objects  
**Structure:** Dynamic array based on user selection (1-5 teams)

```javascript
teams = [
    {
        name: "Team 1",
        score: 0
    },
    {
        name: "Team 2", 
        score: 0
    },
    {
        name: "Team 3",
        score: 0
    }
    // ... up to 5 teams
]
```

**Team Object Properties:**
- `name`: String - Team name (defaults to "Team X" if empty)
- `score`: Number - Current team score (can be negative)

**Validation Rules:**
- Must contain 1-5 teams
- Team names cannot be undefined
- Scores must be numbers (can be negative)

#### 4. Game State Object
**Purpose:** Track current game progress and state  
**Type:** Object with various state properties

```javascript
gameState = {
    currentTeamIndex: 0,           // Index of current team (0-based)
    answeredQuestions: new Set(),  // Set of answered question keys
    currentQuestion: null,         // Currently displayed question
    currentAnswer: null,           // Currently displayed answer
    currentPoints: 0,              // Points for current question
    currentCellElement: null,      // DOM element of current cell
    gameStarted: false,            // Whether game is active
    gameEnded: false               // Whether game is finished
}
```

**State Properties:**
- `currentTeamIndex`: Tracks whose turn it is
- `answeredQuestions`: Prevents re-answering questions
- `currentQuestion/Answer`: Modal display data
- `currentPoints`: Points value for current question
- `currentCellElement`: DOM reference for visual updates
- `gameStarted/Ended`: Game flow control

### Data Relationships

#### Primary Relationships
1. **Categories ↔ Questions:** One-to-many
   - Each category has 5 questions (100-500 points)
   - Questions are keyed by category name

2. **Teams ↔ Game State:** One-to-many
   - Multiple teams share the same game state
   - Current team is tracked by index

3. **Questions ↔ Game State:** Many-to-one
   - All questions share the same game state
   - Answered questions are tracked in a Set

#### Data Flow
```
CSV Data → Parse → Categories Array + Questions Object
User Input → Teams Array
Game Logic → Game State Object
```

### Data Validation Functions

#### Category Validation
```javascript
function validateCategories(categories) {
    if (!Array.isArray(categories)) {
        throw new Error("Categories must be an array");
    }
    
    if (categories.length !== 6) {
        throw new Error("Must have exactly 6 categories");
    }
    
    categories.forEach((category, index) => {
        if (typeof category !== 'string' || category.trim() === '') {
            throw new Error(`Category ${index + 1} must be a non-empty string`);
        }
    });
    
    return true;
}
```

#### Questions Validation
```javascript
function validateQuestions(questions, categories) {
    const expectedKeys = [];
    
    // Generate expected keys
    categories.forEach(category => {
        [100, 200, 300, 400, 500].forEach(points => {
            expectedKeys.push(`${category}_${points}`);
        });
    });
    
    // Check all expected keys exist
    expectedKeys.forEach(key => {
        if (!questions[key]) {
            throw new Error(`Missing question for key: ${key}`);
        }
        
        if (!questions[key].question || !questions[key].answer) {
            throw new Error(`Invalid question data for key: ${key}`);
        }
    });
    
    return true;
}
```

#### Teams Validation
```javascript
function validateTeams(teams) {
    if (!Array.isArray(teams)) {
        throw new Error("Teams must be an array");
    }
    
    if (teams.length < 1 || teams.length > 5) {
        throw new Error("Must have between 1 and 5 teams");
    }
    
    teams.forEach((team, index) => {
        if (typeof team.name !== 'string') {
            throw new Error(`Team ${index + 1} must have a valid name`);
        }
        
        if (typeof team.score !== 'number') {
            throw new Error(`Team ${index + 1} must have a valid score`);
        }
    });
    
    return true;
}
```

### Data Persistence Strategy

#### Current Implementation
- **No persistence:** Data exists only in memory
- **Session reset:** All data lost on page refresh
- **No backup:** No recovery mechanism

#### Future Enhancement Options

##### Local Storage
```javascript
// Save game state
function saveGameState() {
    const gameData = {
        categories,
        questions,
        teams,
        gameState: {
            currentTeamIndex: gameState.currentTeamIndex,
            answeredQuestions: Array.from(gameState.answeredQuestions),
            gameStarted: gameState.gameStarted
        },
        timestamp: Date.now()
    };
    
    localStorage.setItem('jeopardy_game_state', JSON.stringify(gameData));
}

// Load game state
function loadGameState() {
    const saved = localStorage.getItem('jeopardy_game_state');
    if (saved) {
        const gameData = JSON.parse(saved);
        // Restore game state
        categories = gameData.categories;
        questions = gameData.questions;
        teams = gameData.teams;
        gameState.currentTeamIndex = gameData.gameState.currentTeamIndex;
        gameState.answeredQuestions = new Set(gameData.gameState.answeredQuestions);
        gameState.gameStarted = gameData.gameState.gameStarted;
    }
}
```

##### IndexedDB (Advanced)
For larger datasets or more complex persistence needs:
- Structured data storage
- Transaction support
- Better performance for large datasets
- Offline capability

### Data Migration Strategy

#### CSV to Application Data
```javascript
function migrateFromCSV(questionsCsv, answersCsv) {
    // Parse CSV data
    const questionsData = parseCSV(questionsCsv);
    const answersData = parseCSV(answersCsv);
    
    // Extract categories
    const categories = questionsData[0];
    
    // Build questions object
    const questions = {};
    for (let row = 1; row <= 5; row++) {
        const points = row * 100;
        categories.forEach((category, colIndex) => {
            const key = `${category}_${points}`;
            questions[key] = {
                question: questionsData[row][colIndex],
                answer: answersData[row][colIndex]
            };
        });
    }
    
    return { categories, questions };
}
```

### Performance Considerations

#### Memory Usage
- **Categories:** ~1KB (6 strings)
- **Questions:** ~50KB (30 question/answer pairs)
- **Teams:** ~1KB (5 team objects)
- **Game State:** ~1KB (state object + Set)

**Total:** ~53KB per game session

#### Optimization Strategies
1. **Lazy Loading:** Load data only when needed
2. **Data Compression:** Minimize string lengths
3. **Object Pooling:** Reuse objects where possible
4. **Memory Cleanup:** Clear references when done

### Future Database Considerations

#### If Moving to Backend Database

##### PostgreSQL Schema
```sql
-- Categories table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    game_set_id INTEGER REFERENCES game_sets(id)
);

-- Questions table  
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(id),
    points INTEGER NOT NULL CHECK (points IN (100, 200, 300, 400, 500)),
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    UNIQUE(category_id, points)
);

-- Game sets table
CREATE TABLE game_sets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Game sessions table
CREATE TABLE game_sessions (
    id SERIAL PRIMARY KEY,
    game_set_id INTEGER REFERENCES game_sets(id),
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP,
    final_scores JSONB
);
```

##### MongoDB Schema
```javascript
// Game Set Document
{
  _id: ObjectId,
  title: "Science Trivia",
  description: "Questions about various scientific topics",
  categories: [
    {
      name: "Physics",
      questions: [
        {
          points: 100,
          question: "What is the SI unit of force?",
          answer: "Newton"
        }
        // ... more questions
      ]
    }
    // ... more categories
  ],
  createdAt: ISODate,
  updatedAt: ISODate
}
```
