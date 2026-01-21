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
        this.setupKeyboardNavigation(); // Thêm dòng này
    },

// Thêm hàm mới này vào object app
setupKeyboardNavigation: function() {
    document.addEventListener('keydown', (e) => {
        // Chỉ xử lý khi đang ở trang quiz
        const quizPage = document.getElementById('quiz-page');
        if (! quizPage || !quizPage.classList.contains('active')) {
            return;
        }

        // Arrow Left = Previous question
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.previousQuestion();
        }
        
        // Arrow Right = Next question
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.nextQuestion();
        }
    });
},    

    // Setup marked.js for markdown rendering
    setupMarked: function() {
        // Using simple markdown renderer (lib/simple-markdown.js)
        // No setup needed
    },

    // Load available courses
    loadCourses:  async function() {
        try {
            const response = await fetch('/api/list-courses');
            if (!response.ok) {
                throw new Error('Failed to load courses');
            }
            this.courses = await response.json();
            this.displayCourses();
        } catch (error) {
            console.error('Error loading courses:', error);
            // Fallback to manual list
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

    loadCourseFiles: async function() {
        const course = this.currentCourse;
        
        document.getElementById('markdown-files').innerHTML = 'Đang tải... ';
        document.getElementById('question-files').innerHTML = 'Đang tải...';

        try {
            const response = await fetch(`/api/list-files?path=${course.path}`);
            if (!response.ok) {
                throw new Error('Failed to load course files');
            }
            
            const files = await response.json();
            
            const markdownFiles = files.filter(f => f.endsWith('.md'));
            const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'index.json');
            
            this.displayMarkdownFiles(markdownFiles);
            this.displayQuestionFiles(jsonFiles);
        } catch (error) {
            console.error('Error in loadCourseFiles:', error);
            document.getElementById('markdown-files').innerHTML = '<p>Lỗi khi tải danh sách file. </p>';
            document.getElementById('question-files').innerHTML = '<p>Lỗi khi tải danh sách file. </p>';
        }
    },

    // Scan course directory for files
    scanCourseDirectory: async function(coursePath) {
        /**
         * Giải pháp: Trình duyệt không thể tự "list files" trong folder cục bộ 
         * vì lý do bảo mật. Chúng ta sẽ fetch một file 'index.json' đóng vai trò 
         * là danh mục tệp tin của thư mục đó.
         */
        try {
            const response = await fetch(`${coursePath}/index.json`);
            if (!response.ok) {
                throw new Error('Không tìm thấy file index.json trong thư mục ' + coursePath);
            }
            const fileList = await response.json();
            return fileList; // Trả về mảng tên file: ["file1.md", "file2.json"]
        } catch (error) {
            console.warn(`Cảnh báo: Không thể quét thư mục ${coursePath}. Đảm bảo index.json tồn tại.`);
            return [];
        }
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
            
            if (typeof SimpleMarkdown !== 'undefined') {
                contentDiv.innerHTML = SimpleMarkdown.parse(content);
            } else {
                // Fallback to plain text with line breaks
                contentDiv.innerHTML = '<pre>' + content + '</pre>';
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
            this.checkedQuestions = {}; // Reset checked questions
            
            // Try to load saved progress
            this.loadProgress();
            
            document.getElementById('quiz-title').textContent = filename;
            document.getElementById('total-questions').textContent = questions. length;
            
            this. displayQuestion();
            this.showPage('quiz-page');
        } catch (error) {
            console. error('Error loading quiz:', error);
            alert('Không thể tải quiz. Vui lòng đảm bảo file JSON tồn tại.');
        }
    },

    // Display current question
    displayQuestion: function() {
        const question = this.questions[this.currentQuestionIndex];
        const container = document.getElementById('question-container');
        const isChecked = this.checkedQuestions[question.id];
        
        container.innerHTML = `
            <div class="question-text">
                Câu ${this.currentQuestionIndex + 1}:  ${question.question}
            </div>
            <div class="answers-grid" id="answers-grid">
                ${this.renderAnswers(question, isChecked)}
            </div>
            <div class="check-answer-section">
                <button id="check-answer-btn" class="btn btn-warning" onclick="app.checkAnswer()">
                    ✓ Kiểm tra đáp án
                </button>
            </div>
            <div id="answer-feedback" class="answer-feedback" style="display: none;">
                <!-- Feedback will be shown here -->
            </div>
        `;
        
        // Update progress
        this.updateProgress();
        
        // Setup answer selection
        this.setupAnswerSelection();
        
        // Update button visibility
        this.updateQuizButtons();
        
        // If already checked, show feedback
        if (isChecked) {
            this. showAnswerFeedback();
        }
    },

    // Render answer options
    renderAnswers: function(question, isChecked = false) {
        const savedAnswers = this.userAnswers[question.id] || [];
        const correctAnswers = question.correctAnswers || [];
        
        return Object.entries(question.answers).map(([key, value]) => {
            const isSelected = savedAnswers.includes(key);
            const isCorrect = correctAnswers.includes(key);
            
            let classes = 'answer-option';
            if (isSelected) classes += ' selected';
            if (isChecked) {
                if (isCorrect) classes += ' correct';
                else if (isSelected && !isCorrect) classes += ' incorrect';
            }
            
            return `
                <div class="answer-option ${classes}" data-answer="${key}">
                    <div class="answer-checkbox"></div>
                    <div class="answer-label">${key}. </div>
                    <div class="answer-text">${value}</div>
                    ${isChecked && isCorrect ? '<div class="correct-mark">✓</div>' : ''}
                    ${isChecked && isSelected && !isCorrect ? '<div class="incorrect-mark">✗</div>' : ''}
                </div>
            `;
        }).join('');
    },

    // Setup answer selection handlers
    setupAnswerSelection: function() {
        const question = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.answer-option');
        const isChecked = this.checkedQuestions[question.id];
        
        // Disable selection if already checked
        if (isChecked) {
            return;
        }
        
        options.forEach(option => {
            option.onclick = () => {
                const answer = option.dataset.answer;
                
                if (! this.userAnswers[question. id]) {
                    this. userAnswers[question.id] = [];
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

    // Check answer for current question
    checkAnswer: function() {
        const question = this.questions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[question. id] || [];
        
        if (userAnswer.length === 0) {
            this.showToast('Vui lòng chọn ít nhất một đáp án! ');
            return;
        }
        
        // Mark as checked
        this.checkedQuestions[question.id] = true;
        
        // Re-render with highlighting
        this.displayQuestion();
    },

    // Show answer feedback
    showAnswerFeedback: function() {
        const question = this.questions[this.currentQuestionIndex];
        const userAnswer = this.userAnswers[question.id] || [];
        const correctAnswer = question.correctAnswers || [];
        const isCorrect = this.arraysEqual(userAnswer, correctAnswer);
        
        const feedbackDiv = document.getElementById('answer-feedback');
        feedbackDiv. style.display = 'block';
        
        let feedbackHTML = `
            <div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
                ${isCorrect 
                    ? '<span class="feedback-icon">✓</span> <strong>Chính xác!</strong>' 
                    : '<span class="feedback-icon">✗</span> <strong>Chưa đúng!</strong>'}
            </div>
        `;
        
        if (! isCorrect) {
            const correctAnswerText = correctAnswer
                .map(a => `${a}. ${question.answers[a]}`)
                .join(', ');
            feedbackHTML += `
                <div class="correct-answer-display">
                    <strong>Đáp án đúng:</strong> ${correctAnswerText}
                </div>
            `;
        }
        
        // Show explanation if available
        if (question.explanation) {
            feedbackHTML += `
                <div class="explanation-box">
                    <strong>📖 Giải thích:</strong>
                    <p>${question. explanation}</p>
                </div>
            `;
        }
        
        feedbackDiv. innerHTML = feedbackHTML;
        
        // Hide check button
        const checkBtn = document.getElementById('check-answer-btn');
        if (checkBtn) {
            checkBtn.style.display = 'none';
        }
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
            
            // Check if arrays are equal
            const isCorrect = this.arraysEqual(userAnswer, correctAnswer);
            
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

    // Helper function to compare arrays
    arraysEqual: function(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        
        const sorted1 = [...arr1].sort();
        const sorted2 = [...arr2].sort();
        
        for (let i = 0; i < sorted1.length; i++) {
            if (sorted1[i] !== sorted2[i]) return false;
        }
        
        return true;
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
