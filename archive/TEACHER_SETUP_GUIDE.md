# 🎓 Teacher Setup Guide - Jeopardy Classroom Game

## 🚀 Quick Start (5 Minutes)

### Option 1: Use Built-in Examples (Easiest)
1. **Open the game**: Double-click `jeopardy_teacher_edition.html`
2. **Choose content**: Click one of the quick start buttons:
   - 📚 **Presidents** - U.S. Presidents trivia
   - ➗ **Math** - Elementary math problems
   - 🔬 **Science** - Middle school science facts
   - 📖 **History** - High school history
   - 📝 **Language Arts** - Middle school English
3. **Set up teams**: Choose number of teams and enter team names
4. **Start playing**: Click "Start Game" and begin!

### Option 2: Create Your Own Content
1. **Use Google Sheets** (see detailed instructions below)
2. **Use the templates** provided in the project
3. **Publish your sheets** and paste the URLs

## 🎯 Teacher Features

### Enhanced Teacher Edition Includes:
- **⏱️ Timer Control** - Add time pressure to questions
- **📊 Live Statistics** - Track team performance in real-time
- **🔄 Game Reset** - Start over without losing setup
- **🎮 Quick Start** - Pre-loaded content for immediate play
- **📈 Progress Tracking** - See which questions are answered
- **🎯 Turn Indicators** - Clear visual cues for current team

### Classroom Management Tools:
- **Team Highlighting** - Current team is clearly marked
- **Score Tracking** - Automatic point calculation
- **Question Status** - Answered questions are grayed out
- **Statistics Panel** - Detailed performance analytics

## 📚 Sample Content Included

### Ready-to-Use Games:
1. **Elementary Math** (`sample_content/math_elementary.csv`)
   - Categories: Addition, Subtraction, Shapes, Money, Time, Word Problems
   - Perfect for grades 2-4

2. **Middle School Science** (`sample_content/science_middle.csv`)
   - Categories: Chemistry, Biology, Physics, Earth Science, Lab Safety, Famous Scientists
   - Perfect for grades 6-8

3. **High School History** (`sample_content/history_high_school.csv`)
   - Categories: American Revolution, Civil War, World Wars, Presidents, Civil Rights, Geography
   - Perfect for grades 9-12

4. **Middle School Language Arts** (`sample_content/language_arts_middle.csv`)
   - Categories: Literary Terms, Authors, Grammar, Vocabulary, Poetry, Figurative Language
   - Perfect for grades 6-8

5. **U.S. Presidents** (built-in example)
   - Categories: Firsts, Nicknames, Quotes, Before Presidency, Vice Presidents, Assassinations
   - Perfect for all ages

## 🛠️ Creating Your Own Content

### Step 1: Use the Templates
1. Open `questions_template.csv` and `answers_template.csv`
2. These show the exact format needed
3. Copy the structure for your content

### Step 2: Google Sheets Method (Recommended)
1. **Create a new Google Sheet**
2. **Create two tabs**: "Questions" and "Answers"
3. **Fill in your content** following the template structure
4. **Publish both tabs** as CSV files
5. **Copy the URLs** and paste them into the game

### Step 3: Direct CSV Method
1. **Create two CSV files** with your content
2. **Place them in your project folder**
3. **Use the file names** in the game setup

## 📋 Content Structure

### Questions File Format:
```
Category1,Category2,Category3,Category4,Category5,Category6
$200 Question 1,$200 Question 2,$200 Question 3,$200 Question 4,$200 Question 5,$200 Question 6
$400 Question 1,$400 Question 2,$400 Question 3,$400 Question 4,$400 Question 5,$400 Question 6
$600 Question 1,$600 Question 2,$600 Question 3,$600 Question 4,$600 Question 5,$600 Question 6
$800 Question 1,$800 Question 2,$800 Question 3,$800 Question 4,$800 Question 5,$800 Question 6
$1000 Question 1,$1000 Question 2,$1000 Question 3,$1000 Question 4,$1000 Question 5,$1000 Question 6
```

### Answers File Format:
```
Category1,Category2,Category3,Category4,Category5,Category6
Answer 1,Answer 2,Answer 3,Answer 4,Answer 5,Answer 6
Answer 1,Answer 2,Answer 3,Answer 4,Answer 5,Answer 6
Answer 1,Answer 2,Answer 3,Answer 4,Answer 5,Answer 6
Answer 1,Answer 2,Answer 3,Answer 4,Answer 5,Answer 6
Answer 1,Answer 2,Answer 3,Answer 4,Answer 5,Answer 6
```

## 🎮 How to Play

### Game Setup:
1. **Choose content** (built-in or custom)
2. **Set number of teams** (1-5)
3. **Enter team names** (optional)
4. **Click "Start Game"**

### During Play:
1. **Click any dollar amount** to reveal a question
2. **Read the question** aloud to students
3. **Click "Show Answer"** when ready
4. **Click "Correct" or "Incorrect"** to score
5. **Game automatically** moves to next team

### Teacher Controls:
- **⏱️ Timer**: Toggle 30-second timer for questions
- **📊 Stats**: View detailed game statistics
- **🔄 Reset**: Start over with same content
- **🎯 Current Turn**: Highlighted team indicator

## 💡 Classroom Tips

### For Different Class Sizes:
- **Small Class (10-15)**: 2-3 teams of 3-5 students
- **Medium Class (20-25)**: 3-4 teams of 4-6 students
- **Large Class (30+)**: 4-5 teams of 6-8 students

### Engagement Strategies:
- **Let students choose** their own team names
- **Use the timer** to add excitement
- **Show statistics** between rounds
- **Create themed games** for different units
- **Use as review** before tests

### Content Ideas by Subject:
- **Math**: Equations, word problems, geometry, fractions
- **Science**: Lab safety, scientific method, famous discoveries
- **History**: Dates, events, historical figures, geography
- **English**: Grammar, vocabulary, literary terms, authors
- **Foreign Language**: Vocabulary, grammar, culture
- **Art/Music**: Artists, composers, techniques, periods

## 🔧 Troubleshooting

### Common Issues:
**Game won't load?**
- Check that both CSV files are in the correct format
- Verify URLs are correct (if using Google Sheets)
- Make sure files are accessible

**Questions don't match answers?**
- Ensure Questions and Answers files have identical layouts
- Check that category names match exactly
- Verify no extra spaces or characters

**Timer not working?**
- Click the "Timer" button to enable it
- Timer only works during question display

**Need to reset?**
- Use the "Reset Game" button to start over
- All progress will be lost

## 📞 Support

### Files Included:
- `jeopardy_teacher_edition.html` - Enhanced teacher version
- `jeopardy2.html` - Original version
- `sample_content/` - Ready-to-use content files
- `questions_template.csv` - Template for creating content
- `answers_template.csv` - Template for creating content
- `google_sheets_instructions.txt` - Detailed Google Sheets guide

### Getting Help:
1. Check the `google_sheets_instructions.txt` for detailed setup
2. Use the sample content files as examples
3. Test with built-in examples first
4. Ensure your CSV files follow the exact template format

## 🎉 Ready to Engage!

Your students will love this interactive way to review material. The game automatically handles scoring, turn management, and keeps everyone engaged while providing you with powerful classroom management tools.

**Happy Teaching! 🎓✨**
