# 🎯 Jeopardy Teacher Edition

An interactive, web-based Jeopardy game designed specifically for classroom use. Features a teacher control panel, team management, scoring, and easy CSV content import.

## ✨ Features

- **🎓 Teacher Controls**: Timer, game reset, statistics tracking
- **👥 Team Management**: Support for 1-5 teams with custom names
- **📊 Real-time Scoring**: Live score updates and team statistics
- **⏱️ Optional Timer**: Configurable countdown timer for questions
- **📁 CSV Import**: Easy content management via Google Sheets
- **🎨 Modern UI**: Clean, responsive design with Tailwind CSS
- **📱 Mobile Friendly**: Works on all devices

## 🚀 Quick Start

1. **Start the server**:
   ```bash
   python -m http.server 8000
   ```

2. **Open in browser**:
   ```
   http://localhost:8000/jeopardy_teacher_edition.html
   ```

3. **Choose content**:
   - Use built-in examples (Math, Science, History)
   - Or load custom CSV files

## 📋 Content Setup

### Using Built-in Examples
Click any of the quick start buttons:
- **Math Example**: Elementary math questions
- **Science Example**: Middle school science
- **History Example**: High school history

### Using Custom Content
1. Create two Google Sheets (Questions & Answers)
2. Export as CSV
3. Use the CSV URLs in the custom content section

### CSV Format
- **Questions**: Categories in header row, questions in subsequent rows
- **Answers**: Same structure as questions, with corresponding answers
- See `CSV_TEMPLATE_INSTRUCTIONS.md` for detailed format

## 🎮 How to Play

1. **Setup**: Choose number of teams and enter team names
2. **Load Content**: Select example or custom CSV files
3. **Start Game**: Click "Start Game" to begin
4. **Play**: Click on dollar amounts to reveal questions
5. **Score**: Use "Correct" or "Incorrect" buttons to award points
6. **Track**: Monitor scores and statistics in real-time

## 🛠️ Teacher Controls

- **⏱️ Timer**: Toggle 30-second countdown for questions
- **🔄 Reset Game**: Start over with same content
- **📊 Show Stats**: View detailed game statistics
- **🎯 Current Turn**: Visual indicator for active team

## 📁 Project Structure

```
jeopardy/
├── jeopardy_teacher_edition.html    # Main game file
├── csv_format_checker.html          # CSV validation tool
├── answers_template.csv             # Template for answers
├── questions_template.csv           # Template for questions
├── sample_content/                  # Example content
│   ├── math_elementary.csv
│   ├── science_middle.csv
│   └── history_high_school.csv
├── docs/                           # Documentation
│   ├── api.md
│   ├── backend.md
│   ├── frontend.md
│   └── user-flow.md
└── archive/                        # Legacy files
    ├── jeopardy2.html
    └── web_hosted/
```

## 🔧 Technical Details

- **Frontend**: HTML5, CSS3 (Tailwind), Vanilla JavaScript
- **No Backend Required**: Runs entirely in the browser
- **Data Format**: CSV files for easy content management
- **Responsive Design**: Works on desktop, tablet, and mobile

## 📖 Documentation

- `CSV_TEMPLATE_INSTRUCTIONS.md` - Detailed CSV format guide
- `CORS_SOLUTION.md` - Troubleshooting CORS issues
- `docs/` - Technical documentation

## 🎯 Use Cases

- **Classroom Review**: Test prep and knowledge assessment
- **Team Building**: Group activities and competitions
- **Remote Learning**: Virtual classroom engagement
- **Training**: Corporate training and workshops

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Ready to play?** Start the server and open `jeopardy_teacher_edition.html` in your browser!

