// Application state
const app = {
    courses: [],
    currentCourse: null,
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    questions: [],
    
    // Initialize the application
    init: async function() {
        console.log('Initializing application...');
        await this.loadCourses();
        this.setupMarked();
    },

    // Setup marked.js for markdown rendering
    setupMarked: function() {
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                highlight: function(code, lang) {
                    if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
                        try {
                            return hljs.highlight(code, { language: lang }).value;
                        } catch (err) {
                            console.error('Highlight error:', err);
                        }
                    }
                    return code;
                },
                breaks: true,
                gfm: true
            });
        }
    },

    // Load available courses
    loadCourses: async function() {
        try {
            // Since we're running locally, we need to manually define courses
            // In a real scenario with a server, we'd fetch this from an API
            this.courses = [
                {
                    name: 'Data Visualization',
                    path: 'courses/data-visualization',
                    description: 'Học về trực quan hóa dữ liệu'
                },
                {
                    name: 'Operating System',
                    path: 'courses/operating-system',
                    description: 'Hệ điều hành và các khái niệm cơ bản'
                }
            ];
            this.displayCourses();
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    },

    // Display courses on the main page
    displayCourses: function() {
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        
        this.courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p>${course.description}</p>
            `;
            courseCard.onclick = () => this.selectCourse(course);
            courseList.appendChild(courseCard);
        });
    },

    // Select a course and load its files
    selectCourse: async function(course) {
        this.currentCourse = course;
        document.getElementById('course-title').textContent = course.name;
        
        // Load files for this course
        await this.loadCourseFiles();
        this.showPage('course-detail');
    },

    // Load markdown and JSON files for a course
    loadCourseFiles: async function() {
        const course = this.currentCourse;
        
        // For local development, we need to define the files manually
        // In a production environment, you'd scan the directory
        const files = await this.scanCourseDirectory(course.path);
        
        const markdownFiles = files.filter(f => f.endsWith('.md'));
        const jsonFiles = files.filter(f => f.endsWith('.json'));
        
        this.displayMarkdownFiles(markdownFiles);
        this.displayQuestionFiles(jsonFiles);
    },

    // Scan course directory for files
    scanCourseDirectory: async function(coursePath) {
        // For local file system access, we need to know the files in advance
        // This is a limitation of browser JavaScript
        const fileMap = {
            'courses/data-visualization': ['file_systems.md', 'file_systems.json', 'hdfs.json'],
            'courses/operating-system': ['lecture.md', 'questions.json']
        };
        
        return fileMap[coursePath] || [];
    },

    // Display markdown files
    displayMarkdownFiles: function(files) {
        const container = document.getElementById('markdown-files');
        container.innerHTML = '';
        
        if (files.length === 0) {
            container.innerHTML = '<p style="color: #6c757d;">Không có lecture notes</p>';
            return;
        }
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.textContent = file;
            fileItem.onclick = () => this.viewMarkdown(file);
            container.appendChild(fileItem);
        });
    },

    // Display question files
    displayQuestionFiles: function(files) {
        const container = document.getElementById('question-files');
        container.innerHTML = '';
        
        if (files.length === 0) {
            container.innerHTML = '<p style="color: #6c757d;">Không có question bank</p>';
            return;
        }
        
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.textContent = file;
            fileItem.onclick = () => this.startQuiz(file);
            container.appendChild(fileItem);
        });
    },

    // View a markdown file
    viewMarkdown: async function(filename) {
        const filepath = `${this.currentCourse.path}/${filename}`;
        
        try {
            const response = await fetch(filepath);
            const content = await response.text();
            
            document.getElementById('markdown-title').textContent = filename;
            const contentDiv = document.getElementById('markdown-content');
            
            if (typeof marked !== 'undefined') {
                contentDiv.innerHTML = marked.parse(content);
                
                // Highlight code blocks
                if (typeof hljs !== 'undefined') {
                    contentDiv.querySelectorAll('pre code').forEach((block) => {
                        hljs.highlightBlock(block);
                    });
                }
            } else {
                contentDiv.textContent = content;
            }
            
            this.showPage('markdown-viewer');
        } catch (error) {
            console.error('Error loading markdown:', error);
            alert('Không thể tải file markdown. Vui lòng đảm bảo file tồn tại.');
        }
    },

    // Start a quiz
    startQuiz: async function(filename) {
        const filepath = `${this.currentCourse.path}/${filename}`;
        
        try {
            const response = await fetch(filepath);
            const questions = await response.json();
            
            this.questions = questions;
            this.currentQuiz = filename;
            this.currentQuestionIndex = 0;
            this.userAnswers = {};
            
            // Try to load saved progress
            this.loadProgress();
            
            document.getElementById('quiz-title').textContent = filename;
            document.getElementById('total-questions').textContent = questions.length;
            
            this.displayQuestion();
            this.showPage('quiz-page');
        } catch (error) {
            console.error('Error loading quiz:', error);
            alert('Không thể tải quiz. Vui lòng đảm bảo file JSON tồn tại.');
        }
    },

    // Display current question
    displayQuestion: function() {
        const question = this.questions[this.currentQuestionIndex];
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <div class="question-text">
                Câu ${this.currentQuestionIndex + 1}: ${question.question}
            </div>
            <div class="answers-grid" id="answers-grid">
                ${this.renderAnswers(question)}
            </div>
        `;
        
        // Update progress
        this.updateProgress();
        
        // Setup answer selection
        this.setupAnswerSelection();
        
        // Update button visibility
        this.updateQuizButtons();
    },

    // Render answer options
    renderAnswers: function(question) {
        const savedAnswers = this.userAnswers[question.id] || [];
        
        return Object.entries(question.answers).map(([key, value]) => {
            const isSelected = savedAnswers.includes(key);
            return `
                <div class="answer-option ${isSelected ? 'selected' : ''}" data-answer="${key}">
                    <div class="answer-checkbox"></div>
                    <div class="answer-label">${key}.</div>
                    <div class="answer-text">${value}</div>
                </div>
            `;
        }).join('');
    },

    // Setup answer selection handlers
    setupAnswerSelection: function() {
        const question = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.answer-option');
        
        options.forEach(option => {
            option.onclick = () => {
                const answer = option.dataset.answer;
                
                if (!this.userAnswers[question.id]) {
                    this.userAnswers[question.id] = [];
                }
                
                const answerIndex = this.userAnswers[question.id].indexOf(answer);
                
                if (answerIndex > -1) {
                    // Remove answer
                    this.userAnswers[question.id].splice(answerIndex, 1);
                    option.classList.remove('selected');
                } else {
                    // Add answer
                    this.userAnswers[question.id].push(answer);
                    option.classList.add('selected');
                }
            };
        });
    },

    // Update progress bar
    updateProgress: function() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
    },

    // Update quiz control buttons
    updateQuizButtons: function() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    },

    // Previous question
    previousQuestion: function() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayQuestion();
        }
    },

    // Next question
    nextQuestion: function() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayQuestion();
        }
    },

    // Save progress to localStorage
    saveProgress: function() {
        const progressData = {
            course: this.currentCourse.path,
            quiz: this.currentQuiz,
            questionIndex: this.currentQuestionIndex,
            answers: this.userAnswers,
            timestamp: new Date().toISOString()
        };
        
        const key = `progress_${this.currentCourse.path}_${this.currentQuiz}`;
        localStorage.setItem(key, JSON.stringify(progressData));
        
        this.showToast('Đã lưu tiến độ!');
    },

    // Load progress from localStorage
    loadProgress: function() {
        const key = `progress_${this.currentCourse.path}_${this.currentQuiz}`;
        const saved = localStorage.getItem(key);
        
        if (saved) {
            const progressData = JSON.parse(saved);
            this.currentQuestionIndex = progressData.questionIndex || 0;
            this.userAnswers = progressData.answers || {};
            console.log('Loaded progress:', progressData);
        }
    },

    // Submit quiz and show results
    submitQuiz: function() {
        const results = this.calculateResults();
        this.displayResults(results);
        
        // Clear saved progress
        const key = `progress_${this.currentCourse.path}_${this.currentQuiz}`;
        localStorage.removeItem(key);
        
        this.showPage('results-page');
    },

    // Calculate quiz results
    calculateResults: function() {
        let correct = 0;
        let total = this.questions.length;
        const wrongAnswers = [];
        
        this.questions.forEach(question => {
            const userAnswer = this.userAnswers[question.id] || [];
            const correctAnswer = question.correctAnswers;
            
            // Sort for comparison
            const userSorted = [...userAnswer].sort();
            const correctSorted = [...correctAnswer].sort();
            
            const isCorrect = JSON.stringify(userSorted) === JSON.stringify(correctSorted);
            
            if (isCorrect) {
                correct++;
            } else {
                wrongAnswers.push({
                    question: question,
                    userAnswer: userAnswer,
                    correctAnswer: correctAnswer
                });
            }
        });
        
        return {
            correct,
            total,
            percentage: (correct / total * 100).toFixed(1),
            wrongAnswers
        };
    },

    // Display results
    displayResults: function(results) {
        const summaryDiv = document.getElementById('results-summary');
        const wrongDiv = document.getElementById('wrong-answers');
        
        summaryDiv.innerHTML = `
            <div class="score-display">${results.correct}/${results.total}</div>
            <div class="score-details">
                Bạn đã trả lời đúng ${results.correct} câu trên tổng số ${results.total} câu 
                (${results.percentage}%)
            </div>
        `;
        
        if (results.wrongAnswers.length > 0) {
            wrongDiv.innerHTML = `
                <h3>❌ Các câu trả lời sai</h3>
                ${results.wrongAnswers.map((item, index) => this.renderWrongAnswer(item, index)).join('')}
            `;
        } else {
            wrongDiv.innerHTML = '<h3 style="color: #28a745;">🎉 Hoàn hảo! Bạn đã trả lời đúng tất cả!</h3>';
        }
    },

    // Render a wrong answer
    renderWrongAnswer: function(item, index) {
        const question = item.question;
        
        const userAnswerText = item.userAnswer.length > 0 
            ? item.userAnswer.map(a => `${a}. ${question.answers[a]}`).join(', ')
            : 'Không có câu trả lời';
            
        const correctAnswerText = item.correctAnswer
            .map(a => `${a}. ${question.answers[a]}`).join(', ');
        
        return `
            <div class="wrong-answer-item">
                <div class="wrong-answer-question">${question.question}</div>
                <div class="answer-comparison">
                    <div class="your-answer">
                        <span class="answer-label-result">Câu trả lời của bạn:</span>
                        ${userAnswerText}
                    </div>
                    <div class="correct-answer">
                        <span class="answer-label-result">Đáp án đúng:</span>
                        ${correctAnswerText}
                    </div>
                </div>
            </div>
        `;
    },

    // Retake quiz
    retakeQuiz: function() {
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.displayQuestion();
        this.showPage('quiz-page');
    },

    // Show a page
    showPage: function(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    },

    // Show course selection
    showCourseSelection: function() {
        this.showPage('course-selection');
    },

    // Show course detail
    showCourseDetail: function() {
        this.showPage('course-detail');
    },

    // Show toast notification
    showToast: function(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
