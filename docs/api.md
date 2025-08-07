# API Documentation
## Jeopardy Web App

### API Overview
**API Type:** External Integration (Google Sheets CSV Export)  
**Architecture:** Client-side HTTP requests to Google Sheets  
**Authentication:** None required (public access)  
**Data Format:** CSV (Comma-Separated Values)

### External API Endpoints

#### Google Sheets CSV Export
**Base URL:** `https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}`

**Parameters:**
- `{sheet_id}`: Google Sheets document ID
- `{sheet_name}`: Specific sheet name (e.g., "Sheet1")

**Example URLs:**
```
Questions: https://docs.google.com/spreadsheets/d/1ABC123.../gviz/tq?tqx=out:csv&sheet=Sheet1
Answers: https://docs.google.com/spreadsheets/d/1ABC123.../gviz/tq?tqx=out:csv&sheet=Sheet2
```

### Data Format Specifications

#### Questions CSV Format
**Structure:** 6 columns × 6 rows (header + 5 data rows)

**Header Row (Row 1):**
```
Category1,Category2,Category3,Category4,Category5,Category6
```

**Data Rows (Rows 2-6):**
```
Question1,Question2,Question3,Question4,Question5,Question6
Question1,Question2,Question3,Question4,Question5,Question6
Question1,Question2,Question3,Question4,Question5,Question6
Question1,Question2,Question3,Question4,Question5,Question6
Question1,Question2,Question3,Question4,Question5,Question6
```

**Point Values:** Row 2 = 100 points, Row 3 = 200 points, etc.

#### Answers CSV Format
**Structure:** 6 columns × 6 rows (header + 5 data rows)

**Header Row (Row 1):**
```
Category1,Category2,Category3,Category4,Category5,Category6
```

**Data Rows (Rows 2-6):**
```
Answer1,Answer2,Answer3,Answer4,Answer5,Answer6
Answer1,Answer2,Answer3,Answer4,Answer5,Answer6
Answer1,Answer2,Answer3,Answer4,Answer5,Answer6
Answer1,Answer2,Answer3,Answer4,Answer5,Answer6
Answer1,Answer2,Answer3,Answer4,Answer5,Answer6
```

### API Communication Implementation

#### Data Fetching
```javascript
async function loadData() {
    const questionsUrl = questionsUrlInput.value;
    const answersUrl = answersUrlInput.value;

    try {
        const questionsResponse = await fetch(questionsUrl);
        const answersResponse = await fetch(answersUrl);

        if (!questionsResponse.ok || !answersResponse.ok) {
            throw new Error(`HTTP error! status: ${questionsResponse.status} or ${answersResponse.status}`);
        }

        const questionsText = await questionsResponse.text();
        const answersText = await answersResponse.text();

        parseData(questionsText, answersText);
    } catch (error) {
        console.error('Error loading data:', error);
        // Handle error appropriately
    }
}
```

#### CSV Parsing
```javascript
function parseCsvLine(line) {
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
                inQuotes = true;
            } else {
                currentField += char;
            }
        } else {
            if (char === '"') {
                if (nextChar === '"') {
                    currentField += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                currentField += char;
            }
        }
    }
    result.push(currentField.trim());
    return result;
}
```

### Error Handling

#### HTTP Status Codes
- **200 OK:** Successful data retrieval
- **404 Not Found:** Sheet not found or not published
- **403 Forbidden:** Access denied (sharing settings)
- **500 Internal Server Error:** Google Sheets server error

#### Common Error Scenarios
1. **Invalid URL Format**
   - Error: Malformed Google Sheets URL
   - Solution: Verify URL format and sheet ID

2. **Sheet Not Published**
   - Error: 404 Not Found
   - Solution: Publish sheet to web as CSV

3. **CORS Issues**
   - Error: Cross-origin request blocked
   - Solution: Ensure proper sharing settings

4. **Data Format Mismatch**
   - Error: Category headers don't match
   - Solution: Align question and answer sheet formats

### Rate Limiting
**Google Sheets Limits:**
- No specific rate limits for CSV export
- Standard Google Sheets API quotas apply
- Recommended: Cache data when possible

### Data Validation

#### Input Validation
```javascript
function validateData(questionsText, answersText) {
    // Check for empty data
    if (!questionsText.trim() || !answersText.trim()) {
        throw new Error("Empty CSV data received");
    }

    // Parse and validate structure
    const questionsLines = questionsText.split('\n').filter(line => 
        line.trim() !== '' && !line.trim().startsWith('#')
    );
    const answersLines = answersText.split('\n').filter(line => 
        line.trim() !== '' && !line.trim().startsWith('#')
    );

    if (questionsLines.length < 2 || answersLines.length < 2) {
        throw new Error("Insufficient data rows");
    }

    // Validate category headers match
    const questionCategories = parseCsvLine(questionsLines[0]);
    const answerCategories = parseCsvLine(answersLines[0]);

    if (questionCategories.join(',') !== answerCategories.join(',')) {
        throw new Error("Category headers do not match between questions and answers");
    }

    return true;
}
```

#### Data Structure Validation
- Category count validation (must be 6)
- Row count validation (must be 6 total: 1 header + 5 data)
- Column count validation per row
- Empty field handling

### Security Considerations

#### Data Privacy
- No sensitive data transmitted
- Public Google Sheets access only
- No authentication required
- No user data collection

#### CORS Policy
- Google Sheets handles CORS
- No additional CORS configuration needed
- Public access sheets only

### Performance Optimization

#### Caching Strategy
```javascript
// Session storage for loaded data
function cacheGameData(categories, questions) {
    try {
        sessionStorage.setItem('jeopardy_categories', JSON.stringify(categories));
        sessionStorage.setItem('jeopardy_questions', JSON.stringify(questions));
    } catch (error) {
        console.warn('Failed to cache game data:', error);
    }
}

function loadCachedData() {
    try {
        const categories = JSON.parse(sessionStorage.getItem('jeopardy_categories'));
        const questions = JSON.parse(sessionStorage.getItem('jeopardy_questions'));
        return { categories, questions };
    } catch (error) {
        return null;
    }
}
```

#### Parallel Loading
- Questions and answers loaded simultaneously
- Reduced total loading time
- Better user experience

### Future API Enhancements

#### Potential Backend API
If moving to a traditional backend:

**Endpoints:**
```
GET /api/games - List available game sets
GET /api/games/{id} - Get specific game data
POST /api/games - Create new game set
PUT /api/games/{id} - Update game set
DELETE /api/games/{id} - Delete game set
```

**Data Format:**
```json
{
  "id": "game-123",
  "title": "Science Trivia",
  "categories": ["Physics", "Chemistry", "Biology", "Astronomy", "Geology", "Technology"],
  "questions": {
    "Physics_100": {
      "question": "What is the SI unit of force?",
      "answer": "Newton"
    }
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Authentication (Future)
- JWT token-based authentication
- User account management
- Private game set sharing
- Usage analytics and tracking
