# 🎯 Jeopardy Teacher Edition - Interactive Classroom Game

A modern, web-based Jeopardy game designed specifically for teachers to engage students in the classroom. Features built-in content, custom CSV support, teacher controls, and real-time statistics.

## 🚀 Quick Start

### Option 1: Use Built-in Content (Recommended for First Time)
1. **Start the local server**: `http-server -p 8000`
2. **Open**: `http://localhost:8000/jeopardy_teacher_edition.html`
3. **Click any Quick Start button**:
   - 📚 **Load Presidents** - U.S. Presidents trivia
   - ➗ **Load Math** - Elementary math problems  
   - 🔬 **Load Science** - Middle school science
   - 📖 **Load History** - High school history
   - 📝 **Load Language Arts** - Middle school language arts
4. **Click "Start Game"** - Play immediately!

### Option 2: Use Custom Content
1. **Create your CSV files** using the templates provided
2. **Publish to Google Sheets** or save locally
3. **Click "Custom Content"** in the game
4. **Enter your CSV URLs** and start playing

## 🎮 Features

### Teacher Controls
- ⏱️ **Timer Control** - Set 30-second timers for questions
- 🔄 **Reset Game** - Start fresh anytime
- 📊 **Live Statistics** - Track progress and scores
- 🎯 **Current Turn Indicator** - Shows which team is up

### Game Features
- 🏆 **Multi-team Support** - 1-5 teams with custom names
- 💰 **Progressive Scoring** - $200 to $1000 questions
- ✅ **Answer Tracking** - Prevents duplicate questions
- 🎉 **Game Over Summary** - Winner announcement and final scores

### Content Management
- 📋 **Built-in Examples** - 5 different subject areas
- 📝 **Custom CSV Support** - Use your own questions
- 🔍 **Format Validation** - CSV checker tool included
- 📚 **Google Sheets Integration** - Easy online content management

## 📁 Project Structure

```
jeopardy/
├── jeopardy_teacher_edition.html    # Main game file
├── csv_format_checker.html          # CSV validation tool
├── questions_template.csv           # Template for custom questions
├── answers_template.csv             # Template for custom answers
├── sample_content/                  # Built-in example content
├── docs/                           # Documentation
├── archive/                        # Old/original files
└── README.md                       # This file
```

## 📋 Creating Custom Content

### Using CSV Templates
1. **Download templates**: `questions_template.csv` and `answers_template.csv`
2. **Edit in Excel/Google Sheets** or any text editor
3. **Follow the format**: 6 categories, 5 difficulty levels ($200-$1000)
4. **Test with CSV checker** before using

### CSV Format Requirements
- **Exactly 6 columns** (categories)
- **Exactly 6 rows** (1 header + 5 question rows)
- **No empty cells**
- **Matching categories** in both files
- **Progressive difficulty** from $200 (easiest) to $1000 (hardest)

### Example Structure
```
Row 1: Math, Science, History, Geography, Literature, Sports
Row 2: $200 questions (easiest)
Row 3: $400 questions
Row 4: $600 questions
Row 5: $800 questions
Row 6: $1000 questions (hardest)
```

## 🔧 Setup Instructions

### Local Development Server
```bash
# Install http-server (if not already installed)
npm install -g http-server

# Start server
http-server -p 8000

# Open in browser
http://localhost:8000/jeopardy_teacher_edition.html
```

### Google Sheets Integration
1. **Create your content** in Google Sheets
2. **File → Share → Publish to web**
3. **Copy the CSV URLs** (replace `/edit` with `/export?format=csv`)
4. **Use URLs in the game**

### Local CSV Files
1. **Save CSV files** in the project folder
2. **Use file names** like `my_questions.csv`
3. **Enter file names** in the game

## 🛠️ Troubleshooting

### CORS Errors
- **Use local web server** (not file:// protocol)
- **Check CSV format** with the validation tool
- **Verify URLs** are accessible

### CSV Format Issues
- **Use CSV checker tool** to validate format
- **Check for empty cells** or extra commas
- **Ensure matching structure** between files

### Game Not Loading
- **Check console** for error messages
- **Verify CSV URLs** are correct
- **Test with built-in content** first

## 📚 Built-in Content

The game includes 5 ready-to-use content sets:

1. **U.S. Presidents** - Historical trivia and facts
2. **Elementary Math** - Basic arithmetic and problem solving
3. **Middle School Science** - Scientific concepts and discoveries
4. **High School History** - World history and events
5. **Language Arts** - Literature and grammar

## 🎯 Best Practices

### For Teachers
- **Test content** before using in class
- **Adjust difficulty** based on student level
- **Use timer** to maintain engagement
- **Review statistics** to assess learning

### For Content Creation
- **Keep questions concise** (under 100 characters)
- **Ensure single correct answers**
- **Progressive difficulty** within categories
- **Test with students** for appropriate level

## 📖 Documentation Files

- `CSV_TEMPLATE_INSTRUCTIONS.md` - Detailed CSV creation guide
- `CORS_SOLUTION.md` - Troubleshooting CORS issues
- `google_sheets_instructions.txt` - Google Sheets setup guide

## 🤝 Contributing

This project is designed for educational use. Feel free to:
- Create custom content for your subject area
- Share CSV templates with other teachers
- Suggest improvements or new features

## 📄 License

This project is open source and available for educational use.

---

**Happy Teaching! 📚✨**

*For support or questions, check the troubleshooting section or use the built-in CSV checker tool.*

