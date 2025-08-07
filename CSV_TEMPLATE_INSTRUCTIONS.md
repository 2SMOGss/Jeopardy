# CSV Template Instructions for Jeopardy Game

## 📋 Overview
This guide will help you create your own custom Jeopardy content using the provided CSV templates.

## 📁 Files You Need
1. `questions_template.csv` - For your questions
2. `answers_template.csv` - For your answers

## 🎯 How to Use the Templates

### Step 1: Download the Templates
1. Right-click on `questions_template.csv` and select "Save As"
2. Right-click on `answers_template.csv` and select "Save As"
3. Save them to your computer where you can easily edit them

### Step 2: Edit the Questions File
1. Open `questions_template.csv` in Excel, Google Sheets, or any text editor
2. Replace the placeholder text with your actual content:

**Row 1 (Categories):**
```
Replace: Category 1,Category 2,Category 3,Category 4,Category 5,Category 6
With:    Math,Science,History,Geography,Literature,Sports
```

**Rows 2-6 (Questions by Point Value):**
- Row 2 = $200 questions (easiest)
- Row 3 = $400 questions
- Row 4 = $600 questions  
- Row 5 = $800 questions
- Row 6 = $1000 questions (hardest)

### Step 3: Edit the Answers File
1. Open `answers_template.csv`
2. **IMPORTANT:** The first row must match your questions file exactly
3. Fill in the corresponding answers for each question

## 📝 Example: Math Theme

### Questions File:
```
Math,Science,History,Geography,Literature,Sports
What is 15 + 27?,What is the chemical symbol for gold?,Who was the first President of the United States?,What is the capital of France?,Who wrote Romeo and Juliet?,In what year did the first modern Olympics take place?
What is 34 x 8?,What planet is known as the Red Planet?,In what year did World War II end?,What is the largest ocean on Earth?,What is the name of the wizard in The Wizard of Oz?,How many players are on a basketball team?
What is the square root of 144?,What is the atomic number of carbon?,Who was the first Emperor of Rome?,What is the longest river in the world?,Who wrote To Kill a Mockingbird?,What is the national sport of Japan?
What is 15% of 200?,What is the chemical formula for water?,In what year did Columbus discover America?,What is the smallest continent?,Who wrote The Great Gatsby?,What is the fastest land animal?
What is the value of pi to 3 decimal places?,What is the speed of light in miles per second?,When did the American Civil War begin?,What is the highest mountain in the world?,Who wrote Pride and Prejudice?,What is the most popular sport in the world?
```

### Answers File:
```
Math,Science,History,Geography,Literature,Sports
42,Au,George Washington,Paris,William Shakespeare,1896
272,Mars,1945,Pacific Ocean,Oz,5
12,6,Augustus Caesar,Nile River,Harper Lee,Sumo wrestling
30,H2O,1492,Australia,F. Scott Fitzgerald,Cheetah
3.142,186,282,1861,Mount Everest,Jane Austen,Soccer
```

## ⚠️ Important Rules

### ✅ DO:
- Keep exactly 6 categories
- Keep exactly 6 rows (1 header + 5 question rows)
- Make sure questions and answers files have identical structure
- Use clear, concise questions
- Make answers specific and correct
- Test your content before using in class

### ❌ DON'T:
- Leave any cells empty
- Use commas within your text (use semicolons or periods instead)
- Make questions too long (keep them readable on screen)
- Use the same answer for multiple questions
- Forget to match categories between files

## 🔧 Tips for Creating Good Content

### Difficulty Progression:
- **$200:** Basic facts, simple calculations, common knowledge
- **$400:** Moderate difficulty, some thinking required
- **$600:** More challenging, requires knowledge
- **$800:** Difficult, requires specific knowledge
- **$1000:** Expert level, very specific or complex

### Question Writing Tips:
- Start with "What is..." or "Who is..." (like real Jeopardy)
- Keep questions under 100 characters when possible
- Make sure there's only one correct answer
- Test questions on students to ensure appropriate difficulty

### Category Ideas:
- **Academic:** Math, Science, History, Literature, Geography, Art
- **Pop Culture:** Movies, Music, TV Shows, Video Games, Sports, Celebrities
- **Current Events:** News, Politics, Technology, Environment, Health, Business
- **Fun:** Food, Animals, Travel, Holidays, Inventions, Famous Quotes

## 📤 Using Your Custom Content

### Option 1: Google Sheets (Recommended)
1. Copy your CSV content into Google Sheets
2. Publish as CSV (see `google_sheets_instructions.txt`)
3. Use the published URLs in the game

### Option 2: Local Files
1. Save your CSV files in the same folder as the game
2. Use file names like `my_questions.csv` and `my_answers.csv`
3. Enter the file names in the game (e.g., `my_questions.csv`)

## 🧪 Testing Your Content

1. Use the CSV Format Checker tool (`csv_format_checker.html`)
2. Copy your CSV content into the checker
3. Verify there are no formatting errors
4. Test with a small group before using in class

## 🆘 Troubleshooting

### Common Issues:
- **"No categories found"** - Check that your first row has category names
- **"Expected 6 rows"** - Make sure you have exactly 6 rows
- **"Empty cell"** - Fill in all cells, no blanks allowed
- **"Categories don't match"** - Ensure both files have identical first rows

### Need Help?
- Use the built-in examples as reference
- Check the console for specific error messages
- Verify your CSV format with the checker tool

## 🎉 You're Ready!

Once you've created your CSV files, you can:
1. Load them into the game
2. Customize team names and settings
3. Start playing with your own content!

Happy teaching! 📚✨
