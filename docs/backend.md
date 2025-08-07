# Backend Documentation
## Jeopardy Web App

### Backend Architecture
**Architecture Type:** Client-Side Only (No Traditional Backend)  
**Rationale:** Chosen for simplicity, zero server costs, and immediate deployment capability. The application leverages Google Sheets as a data source, eliminating the need for a custom backend server.

### Data Source Architecture
**Primary Data Source:** Google Sheets CSV Export  
**Secondary Data Source:** Local CSV files (for development/testing)

#### Google Sheets Integration
**Data Flow:**
1. User creates Google Sheets with questions and answers
2. Sheets are published as CSV files to the web
3. Application fetches CSV data via HTTP requests
4. Client-side JavaScript parses and processes the data

**Advantages:**
- No server infrastructure required
- Familiar interface for content creators
- Real-time data updates (when sheets are modified)
- Free hosting and storage
- Collaborative editing capabilities

**Limitations:**
- Dependency on Google's infrastructure
- CORS considerations
- Data format constraints (CSV only)
- No server-side validation

### API Design
**API Type:** External API Integration (Google Sheets)  
**Communication Protocol:** HTTP/HTTPS  
**Data Format:** CSV (Comma-Separated Values)

#### External API Endpoints
**Google Sheets CSV Export:**
- **Method:** GET
- **URL Pattern:** `https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}`
- **Response:** CSV formatted data
- **Authentication:** Public access (no authentication required)

#### Data Fetching Implementation
```javascript
// Questions data fetch
const questionsResponse = await fetch(questionsUrl);
const questionsText = await questionsResponse.text();

// Answers data fetch  
const answersResponse = await fetch(answersUrl);
const answersText = await answersResponse.text();
```

### Data Processing Layer
**Location:** Client-side JavaScript  
**Purpose:** Parse and validate CSV data, transform into application format

#### CSV Parser
**Features:**
- Robust CSV line parsing with quote handling
- Comment line filtering (lines starting with #)
- Error handling for malformed data
- Support for escaped quotes and special characters

**Implementation:**
```javascript
const parseCsvLine = (line) => {
    const result = [];
    let currentField = '';
    let inQuotes = false;
    // ... parsing logic
    return result;
};
```

#### Data Validation
**Validation Rules:**
- Category headers must match between questions and answers sheets
- Row count validation (questions vs answers)
- Column count validation per row
- Empty field handling

**Error Handling:**
- HTTP error responses
- CSV parsing errors
- Data format mismatches
- Network connectivity issues

### Database Schema (Conceptual)
**Data Structure:** In-memory JavaScript objects  
**Persistence:** Session-only (no permanent storage)

#### Data Models

**Categories Array:**
```javascript
categories = ["Category1", "Category2", "Category3", "Category4", "Category5", "Category6"]
```

**Questions Object:**
```javascript
questions = {
    "Category1_100": {
        question: "Question text",
        answer: "Answer text"
    },
    "Category1_200": {
        question: "Question text", 
        answer: "Answer text"
    }
    // ... more questions
}
```

**Teams Array:**
```javascript
teams = [
    { name: "Team 1", score: 0 },
    { name: "Team 2", score: 0 }
    // ... more teams
]
```

**Game State:**
```javascript
gameState = {
    currentTeamIndex: 0,
    answeredQuestions: new Set(),
    currentQuestion: null,
    currentAnswer: null,
    currentPoints: 0
}
```

### Authentication and Authorization
**Authentication:** None required  
**Authorization:** None required  
**Security Model:** Public access application

**Security Considerations:**
- No sensitive data stored
- No user accounts or personal information
- Public Google Sheets access
- Client-side only processing

### Third-Party Integrations

#### Google Sheets API
**Integration Type:** CSV Export  
**Authentication:** Public access  
**Rate Limits:** Google Sheets standard limits  
**Error Handling:** Network errors, CORS issues, format errors

**Setup Requirements:**
1. Create Google Sheets with proper format
2. Publish sheets to web as CSV
3. Ensure proper sharing settings
4. Validate CSV format compliance

### Error Handling Strategy

#### Network Errors
- Connection timeout handling
- Retry logic for failed requests
- User-friendly error messages
- Fallback to local data (if available)

#### Data Format Errors
- CSV parsing error detection
- Malformed data handling
- Missing or empty field handling
- Category mismatch warnings

#### User Experience Errors
- Clear error messaging
- Guidance for fixing common issues
- Graceful degradation
- Recovery options

### Performance Considerations

#### Data Loading
- Parallel fetching of questions and answers
- Minimal data transfer (CSV format)
- Client-side caching (session storage)
- Efficient parsing algorithms

#### Memory Management
- In-memory data structures
- Garbage collection optimization
- Minimal object creation
- Efficient DOM manipulation

### Scalability Considerations

#### Current Limitations
- Single-page application architecture
- Client-side processing only
- Google Sheets dependency
- No server-side caching

#### Future Enhancement Options
- Backend API for data management
- Database storage for question sets
- User account system
- Advanced caching strategies
- CDN integration for static assets

### Monitoring and Logging
**Client-Side Logging:**
- Console logging for debugging
- Error tracking via browser console
- Performance monitoring via browser dev tools
- User interaction tracking (if needed)

**No Server-Side Monitoring Required:**
- No server infrastructure to monitor
- No database performance metrics
- No API rate limiting monitoring
- No server resource utilization tracking
