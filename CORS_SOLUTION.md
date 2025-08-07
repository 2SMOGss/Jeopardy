# CORS Error Solution Guide

## The Problem
You're getting a CORS error because you're running the HTML file directly from your file system. Browsers block cross-origin requests when using the `file://` protocol for security reasons.

## Solution 1: Use a Local Web Server (Recommended)

### Option A: Python (if you have Python installed)
1. Open Command Prompt/Terminal
2. Navigate to your project folder: `cd "D:\Download_Other\Projects\jeopardy"`
3. Run one of these commands:
   - **Python 3**: `python -m http.server 8000`
   - **Python 2**: `python -m SimpleHTTPServer 8000`
4. Open your browser and go to: `http://localhost:8000/jeopardy_teacher_edition.html`

### Option B: Node.js (if you have Node.js installed)
1. Install a simple server: `npm install -g http-server`
2. Navigate to your project folder
3. Run: `http-server -p 8000`
4. Open: `http://localhost:8000/jeopardy_teacher_edition.html`

### Option C: Live Server Extension (VS Code)
1. Install the "Live Server" extension in VS Code
2. Right-click on `jeopardy_teacher_edition.html`
3. Select "Open with Live Server"

## Solution 2: Use the Built-in Sample Content

The teacher edition includes sample content that works without external URLs:

1. Open `jeopardy_teacher_edition.html` in your browser
2. Click any of the "Quick Start" buttons:
   - **Load Presidents** - U.S. Presidents trivia
   - **Load Math** - Elementary math problems
   - **Load Science** - Middle school science
   - **Load History** - High school history
   - **Load Language Arts** - Middle school language arts
3. Click "Start Game" - no external URLs needed!

## Solution 3: Download CSV Files Locally

If you want to use your own Google Sheets data:

1. In Google Sheets, go to **File → Download → CSV**
2. Save the files in your project folder
3. Use local file paths instead of Google Sheets URLs:
   - `./questions.csv` instead of the Google Sheets URL
   - `./answers.csv` instead of the Google Sheets URL

## Solution 4: Use a CORS Proxy (Temporary)

For testing purposes only:
1. Replace your Google Sheets URLs with:
   - `https://cors-anywhere.herokuapp.com/YOUR_GOOGLE_SHEETS_URL`
2. Note: This is not recommended for production use

## Quick Test

Try this right now:
1. Open `jeopardy_teacher_edition.html` in your browser
2. Click "Load Presidents" 
3. Click "Start Game"
4. The game should work immediately with the built-in content!

## Why This Happens

- **Security**: Browsers prevent `file://` pages from accessing external resources
- **Same-Origin Policy**: Web pages can only access resources from the same origin
- **Google Sheets**: Doesn't allow cross-origin requests from `file://` origins

## Best Practice

Always use a local web server when developing web applications that need to make external API calls or fetch data from other domains.
