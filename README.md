# Jeopardy Web App!

A simple web-based Jeopardy game that loads questions and answers from publicly shared Google Sheets CSV files.

## Features

*   Loads game data (categories, questions, answers) dynamically from Google Sheets URLs.
*   Supports 1 to 5 teams with customizable names.
*   Classic Jeopardy board layout.
*   Interactive question modal with answer reveal.
*   Score tracking for each team.
*   Built with plain HTML, CSS (Tailwind via CDN), and JavaScript.

## Setup & Usage

1.  **Prepare Google Sheets:**
    *   Create two Google Sheets: one for questions and one for answers.
    *   Use the provided `questions_template.csv` and `answers_template.csv` as a guide for the structure.
        *   The first row should contain the category names.
        *   Subsequent rows contain the questions/answers for point values 100, 200, 300, 400, 500 respectively.
        *   Ensure the category columns align between the questions and answers sheets.
    *   **Important:** Publish each sheet to the web as a CSV file:
        *   Go to `File > Share > Publish to web`.
        *   In the dialog, select the specific sheet (e.g., `Sheet1`).
        *   Choose `Comma-separated values (.csv)` as the format.
        *   Click `Publish`.
        *   Copy the generated URL for both the questions sheet and the answers sheet.

2.  **Run the Game:**
    *   Open the `jeopardy2.html` file in your web browser.
    *   Paste the published CSV URL for your questions sheet into the "Questions CSV URL" field.
    *   Paste the published CSV URL for your answers sheet into the "Answers CSV URL" field.
    *   Select the number of teams.
    *   Enter team names (optional).
    *   Click "Start Game".

3.  **Play:**
    *   Click on a point value cell on the board to reveal the question.
    *   Click "Show Answer" to see the answer.
    *   Click "Correct" or "Incorrect" to adjust the current team's score and mark the question as answered.
    *   The turn automatically passes to the next team.

## File Structure

*   `jeopardy2.html`: The main file containing the game's HTML, CSS (via Tailwind CDN), and JavaScript logic.
*   `questions_template.csv` / `answers_template.csv`: Template files showing the expected CSV structure for Google Sheets.
*   `questions_example.csv` / `answers_example.csv`: Example CSV files with sample data.
*   `google_sheets_instructions.txt`: Text file with instructions on publishing Google Sheets as CSV.
*   `README.md`: This file.

## Dependencies

*   A modern web browser.
*   Internet connection (for loading Tailwind CSS and game data).

