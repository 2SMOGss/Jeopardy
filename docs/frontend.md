# Frontend Documentation
## Jeopardy Web App

### UI Framework
**Framework:** Vanilla JavaScript with HTML5 and CSS3  
**Rationale:** Chosen for simplicity, zero build process, and immediate deployment capability. Perfect for a single-page application that needs to work without any build tools or dependencies.

### UI Library
**Styling Framework:** Tailwind CSS (via CDN)  
**Rationale:** Provides utility-first CSS framework for rapid development and consistent design. CDN approach eliminates build complexity while providing modern styling capabilities.

### Navigation Structure
**Single-Page Application:** No traditional navigation required
- **Setup Phase:** Game configuration screen (URL inputs, team setup)
- **Game Phase:** Jeopardy board with modal interactions
- **Modal System:** Question display and answer reveal

### Styling Approach
**Design System:**
- **Color Palette:** Classic Jeopardy blue (#060ce9) with yellow accents
- **Typography:** Inter font family for modern, readable text
- **Layout:** CSS Grid for game board, Flexbox for responsive layouts
- **Responsive Design:** Mobile-first approach with breakpoint considerations

**Key Styling Components:**
- Game board grid layout (6 columns × 6 rows)
- Modal overlay system
- Score display cards
- Interactive button states
- Hover effects and transitions

### State Management

#### Local State
**Component-Specific Data:**
- Form input values (URLs, team names, team count)
- Modal visibility states
- Current question/answer display
- Button states (enabled/disabled)

**Implementation:** Direct DOM manipulation and CSS class toggling

#### Global State
**Application-Wide Data:**
- Game data (categories, questions, answers)
- Team information (names, scores)
- Current game state (current team, answered questions)
- Game board state

**Implementation:** JavaScript variables and functions for state management

#### Server State
**External Data:**
- Google Sheets CSV data (questions and answers)
- Loading states during data fetch

**Implementation:** Async/await with fetch API and error handling

#### Persistence
**Session Storage:**
- No persistent storage required for MVP
- Game state resets on page refresh
- Future enhancement: localStorage for game progress

### Key Components and Functionality

#### 1. Setup Section Component
**Purpose:** Game initialization and configuration
**Features:**
- URL input fields for Google Sheets CSV files
- Team count selection (1-5 teams)
- Team name input fields
- Start game button
- Play again and start over buttons

**HTML Structure:**
```html
<div id="setup-section" class="bg-blue-900 p-6 rounded-lg shadow-lg">
  <!-- URL inputs -->
  <!-- Team selection -->
  <!-- Team name inputs -->
  <!-- Action buttons -->
</div>
```

#### 2. Game Board Component
**Purpose:** Display the Jeopardy game board
**Features:**
- 6×6 grid layout (categories + 5 point values)
- Dynamic category headers
- Interactive point value cells
- Visual feedback for answered questions

**Implementation:**
- CSS Grid layout
- Dynamic cell generation via JavaScript
- Click event handlers for question selection
- Visual state management (answered/unanswered)

#### 3. Question Modal Component
**Purpose:** Display questions and handle answer flow
**Features:**
- Question display
- Answer reveal functionality
- Correct/incorrect scoring buttons
- Current team score display
- Close modal functionality

**Modal States:**
1. **Question Display:** Shows question text with "Show Answer" button
2. **Answer Display:** Shows answer with "Correct"/"Incorrect" buttons
3. **Closed:** Hidden state

#### 4. Score Display Component
**Purpose:** Show team scores and current turn
**Features:**
- Individual team score cards
- Current team highlighting
- Real-time score updates
- Team name display

**Visual Indicators:**
- Yellow border for current team
- Large, readable score numbers
- Team name labels

### Responsive Design Considerations

#### Mobile Optimization
- Touch-friendly button sizes
- Simplified layout for small screens
- Modal full-screen on mobile
- Flexible grid adjustments

#### Desktop Experience
- Larger game board for better visibility
- Hover effects for interactive elements
- Optimal spacing for mouse interaction

### Accessibility Features
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility
- High contrast color scheme
- Focus indicators for interactive elements

### Performance Optimization
- Minimal DOM manipulation
- Efficient event handling
- CSS transitions for smooth animations
- Optimized image loading (if added)
- Minimal external dependencies

### Browser Compatibility
**Target Browsers:**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Required Features:**
- ES6+ JavaScript support
- CSS Grid support
- Fetch API support
- Modern CSS features (flexbox, grid, custom properties)
