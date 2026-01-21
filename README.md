"# Exam Question Bank - Hệ thống hỗ trợ ôn tập

A local-first study and revision system built with pure HTML, CSS, and JavaScript. No backend required!

## Features

- 📚 **Course Management**: Organize your study materials by courses
- 📝 **Markdown Viewer**: Beautiful rendering of lecture notes
- ❓ **Question Banks**: Multiple-choice questions with support for multiple correct answers
- 💾 **Save Progress**: Save your progress using localStorage to continue later
- 📊 **Results Display**: Review your performance and see which questions you got wrong
- 🎨 **Beautiful UI**: Modern, responsive design with gradient backgrounds
- 🔄 **Retake Quizzes**: Practice as many times as you need

## Structure

```
exam-question-bank/
├── index.html          # Main application
├── styles.css          # Styling
├── app.js             # JavaScript logic
├── lib/
│   └── simple-markdown.js  # Markdown parser
└── courses/           # Your study materials
    ├── data-visualization/
    │   ├── file_systems.md      # Lecture notes
    │   ├── file_systems.json    # Question bank
    │   └── hdfs.json           # Question bank
    └── operating-system/
        ├── lecture.md          # Lecture notes
        └── questions.json      # Question bank
```

## How to Use

### 1. Running Locally

Simply open `index.html` in your web browser, or run a local server:

```bash
# Using Python 3
python3 -m http.server 8080

# Using Node.js
npx http-server -p 8080

# Then open http://localhost:8080 in your browser
```

### 2. Adding Courses

1. Create a new folder in the `courses` directory with your course name
2. Add your materials:
   - **Lecture Notes**: `.md` files for reading materials
   - **Question Banks**: `.json` files for practice questions

### 3. Question Format

Questions should be in JSON format with the following structure:

```json
[
  {
    "id": "unique_id",
    "question": "Your question here?",
    "answers": {
      "A": "First option",
      "B": "Second option",
      "C": "Third option",
      "D": "Fourth option"
    },
    "correctAnswers": ["A", "B"]
  }
]
```

**Note**: `correctAnswers` is an array and can contain multiple correct answers.

### 4. Markdown Format

Lecture notes support standard Markdown syntax:

- Headers (`#`, `##`, `###`)
- Bold text (`**bold**`)
- Lists (`-` or numbered)
- Code blocks (` ``` `)
- Inline code (`` `code` ``)

## Features in Detail

### Course Selection
Browse all available courses from the main page.

### Lecture Notes
Click on `.md` files to view beautifully rendered markdown content.

### Taking Quizzes
1. Click on a `.json` file to start a quiz
2. Select one or more answers (questions can have multiple correct answers)
3. Use "Câu sau" to move to the next question
4. Use "Câu trước" to go back
5. Use "Lưu tiến độ" to save your progress
6. Use "Nộp bài" on the last question to submit

### Viewing Results
After submitting, you'll see:
- Your score (e.g., 3/4 or 75%)
- A list of questions you got wrong
- The correct answers for each wrong question

### Progress Saving
Your progress is automatically saved to localStorage when you click "Lưu tiến độ". You can close your browser and come back later to continue where you left off.

## Customization

### Adding New Courses

To add a new course, edit `app.js` and update the `courses` array in the `loadCourses` function:

```javascript
this.courses = [
    {
        name: 'Your Course Name',
        path: 'courses/your-course-folder',
        description: 'Course description'
    },
    // ... other courses
];
```

Then update the `scanCourseDirectory` function to include your files:

```javascript
const fileMap = {
    'courses/your-course-folder': ['lecture.md', 'questions.json'],
    // ... other courses
};
```

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## License

Free to use for educational purposes." 
