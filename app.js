// Application state
const app = {
    courses: [],
    currentCourse: null,
    currentQuiz: null,
    currentQuestionIndex: 0,
    userAnswers: {},
    questions: [],
    checkedQuestions: {}, // Thêm để lưu trạng thái đã nhấn "Kiểm tra" hay chưa

    // Initialize the application
    init: async function() {
        console.log('Initializing application...');
        await this.loadCourses();
        this.setupMarked();
        this.setupKeyboardNavigation();
    },

    setupKeyboardNavigation: function() {
        document.addEventListener('keydown', (e) => {
            const quizPage = document.getElementById('quiz-page');
            if (!quizPage || !quizPage.classList.contains('active')) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousQuestion();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                this.nextQuestion();
            }
        });
    },

    setupMarked: function() {
        // Simple markdown renderer setup
    },

    loadCourses: async function() {
        try {
            const response = await fetch('/api/list-courses');
            if (!response.ok) throw new Error('Failed to load courses');
            this.courses = await response.json();
            this.displayCourses();
        } catch (error) {
            console.error('Error loading courses:', error);
            this.courses = [
                { name: 'Data Visualization', path: 'courses/data-visualization' },
                { name: 'Operating System', path: 'courses/operating-system' }
            ];
            this.displayCourses();
        }
    },

    displayCourses: function() {
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        this.courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `<h3>${course.name}</h3>`;
            courseCard.onclick = () => this.selectCourse(course);
            courseList.appendChild(courseCard);
        });
    },

    selectCourse: async function(course) {
        this.currentCourse = course;
        document.getElementById('course-title').textContent = course.name;
        await this.loadCourseFiles();
        this.showPage('course-detail');
    },

    loadCourseFiles: async function() {
        const course = this.currentCourse;
        try {
            const response = await fetch(`/api/list-files?path=${course.path}`);
            const files = await response.json();
            this.displayMarkdownFiles(files.filter(f => f.endsWith('.md')));
            this.displayQuestionFiles(files.filter(f => f.endsWith('.json') && f !== 'index.json'));
        } catch (error) {
            console.error('Error:', error);
        }
    },

    displayMarkdownFiles: function(files) {
        const container = document.getElementById('markdown-files');
        container.innerHTML = files.length ? '' : '<p>Không có lecture notes</p>';
        files.forEach(file => {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.textContent = file;
            item.onclick = () => this.viewMarkdown(file);
            container.appendChild(item);
        });
    },

    displayQuestionFiles: function(files) {
        const container = document.getElementById('question-files');
        container.innerHTML = files.length ? '' : '<p>Không có question bank</p>';
        files.forEach(file => {
            const item = document.createElement('div');
            item.className = 'file-item';
            item.textContent = file;
            item.onclick = () => this.startQuiz(file);
            container.appendChild(item);
        });
    },

    viewMarkdown: async function(filename) {
        const filepath = `${this.currentCourse.path}/${filename}`;
        try {
            const response = await fetch(filepath);
            const content = await response.text();
            document.getElementById('markdown-title').textContent = filename;
            document.getElementById('markdown-content').innerHTML = typeof SimpleMarkdown !== 'undefined' 
                ? SimpleMarkdown.parse(content) 
                : `<pre>${content}</pre>`;
            this.showPage('markdown-viewer');
        } catch (error) { alert('Lỗi tải file'); }
    },

    shuffle: function(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    },

    startQuiz: async function(filename) {
        const filepath = `${this.currentCourse.path}/${filename}`;
        try {
            const response = await fetch(filepath);
            let rawQuestions = await response.json();
            
            this.questions = rawQuestions.map((q, qIdx) => {
                let processedAnswers = q.answers.map((ansText, aIdx) => {
                    const isCorrect = ansText.includes('(T)');
                    const cleanText = ansText.replace(/\s*\(T\)$|\s*\(F\)$/, '').trim();
                    return { uid: `q${qIdx}-a${aIdx}`, text: cleanText, isCorrect: isCorrect };
                });
                this.shuffle(processedAnswers);
                return { ...q, id: q.id || `q-${qIdx}`, processedAnswers };
            });

            this.currentQuiz = filename;
            this.currentQuestionIndex = 0;
            this.userAnswers = {};
            this.checkedQuestions = {};
            this.loadProgress();
            
            document.getElementById('quiz-title').textContent = filename;
            document.getElementById('total-questions').textContent = this.questions.length;
            this.displayQuestion();
            this.showPage('quiz-page');
        } catch (error) { console.error('Error loading quiz:', error); }
    },

    // --- HÀM BỊ THIẾU CẦN THÊM LẠI ---
    displayQuestion: function() {
        const question = this.questions[this.currentQuestionIndex];
        const container = document.getElementById('question-container');
        const isChecked = this.checkedQuestions[question.id];
        
        container.innerHTML = `
            <div class="question-text">
                Câu ${this.currentQuestionIndex + 1}: ${question.question}
            </div>
            <div class="answers-grid" id="answers-grid">
                ${this.renderAnswers(question, isChecked)}
            </div>
            <div class="check-answer-section">
                ${!isChecked ? `
                    <button id="check-answer-btn" class="btn btn-warning" onclick="app.checkAnswer()">
                        ✓ Kiểm tra đáp án
                    </button>
                ` : ''}
            </div>
            <div id="answer-feedback" class="answer-feedback" style="display: ${isChecked ? 'block' : 'none'};"></div>
        `;
        
        this.updateProgress();
        this.setupAnswerSelection();
        this.updateQuizButtons();
        if (isChecked) this.showAnswerFeedback();
    },

    renderAnswers: function(question, isChecked = false) {
        const savedAnswers = this.userAnswers[question.id] || [];
        return question.processedAnswers.map((ans, index) => {
            const charLabel = String.fromCharCode(65 + index);
            const isSelected = savedAnswers.includes(ans.uid);
            const isCorrect = ans.isCorrect;
            let classes = 'answer-option' + (isSelected ? ' selected' : '');
            if (isChecked) {
                if (isCorrect) classes += ' correct';
                else if (isSelected && !isCorrect) classes += ' incorrect';
            }
            return `
                <div class="answer-option ${classes}" data-uid="${ans.uid}">
                    <div class="answer-checkbox"></div>
                    <div class="answer-label">${charLabel}. </div>
                    <div class="answer-text">${ans.text}</div>
                    ${isChecked && isCorrect ? '<div class="correct-mark">✓</div>' : ''}
                    ${isChecked && isSelected && !isCorrect ? '<div class="incorrect-mark">✗</div>' : ''}
                </div>`;
        }).join('');
    },

    setupAnswerSelection: function() {
        const question = this.questions[this.currentQuestionIndex];
        if (this.checkedQuestions[question.id]) return;
        document.querySelectorAll('.answer-option').forEach(option => {
            option.onclick = () => {
                const uid = option.dataset.uid;
                if (!this.userAnswers[question.id]) this.userAnswers[question.id] = [];
                const idx = this.userAnswers[question.id].indexOf(uid);
                if (idx > -1) this.userAnswers[question.id].splice(idx, 1);
                else this.userAnswers[question.id].push(uid);
                this.displayQuestion(); // Re-render to show selected state
            };
        });
    },

    checkAnswer: function() {
        const question = this.questions[this.currentQuestionIndex];
        if (!(this.userAnswers[question.id]?.length > 0)) {
            alert('Vui lòng chọn ít nhất một đáp án!');
            return;
        }
        this.checkedQuestions[question.id] = true;
        this.displayQuestion();
    },

    showAnswerFeedback: function() {
        const question = this.questions[this.currentQuestionIndex];
        const userSelection = this.userAnswers[question.id] || [];
        const correctUids = question.processedAnswers.filter(a => a.isCorrect).map(a => a.uid);
        const isCorrect = userSelection.length === correctUids.length && userSelection.every(u => correctUids.includes(u));
        
        const feedbackDiv = document.getElementById('answer-feedback');
        let feedbackHTML = `<div class="feedback-result ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng!'}</div>`;
        
        if (!isCorrect) {
            const correctLabels = question.processedAnswers
                .map((a, i) => a.isCorrect ? String.fromCharCode(65 + i) : null)
                .filter(l => l).join(', ');
            feedbackHTML += `<div class="correct-answer-display"><strong>Đáp án đúng:</strong> ${correctLabels}</div>`;
        }
        if (question.explanation) feedbackHTML += `<div class="explanation-box"><strong>Giải thích:</strong> ${question.explanation}</div>`;
        feedbackDiv.innerHTML = feedbackHTML;
    },

    updateProgress: function() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
    },

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

    previousQuestion: function() { if (this.currentQuestionIndex > 0) { this.currentQuestionIndex--; this.displayQuestion(); } },
    nextQuestion: function() { if (this.currentQuestionIndex < this.questions.length - 1) { this.currentQuestionIndex++; this.displayQuestion(); } },

    saveProgress: function() {
        const key = `progress_${this.currentCourse.path}_${this.currentQuiz}`;
        localStorage.setItem(key, JSON.stringify({
            questionIndex: this.currentQuestionIndex,
            answers: this.userAnswers
        }));
        this.showToast('Đã lưu!');
    },

    loadProgress: function() {
        const key = `progress_${this.currentCourse.path}_${this.currentQuiz}`;
        const saved = localStorage.getItem(key);
        if (saved) {
            const data = JSON.parse(saved);
            this.currentQuestionIndex = data.questionIndex || 0;
            this.userAnswers = data.answers || {};
        }
    },

    calculateResults: function() {
        let correctCount = 0;
        const wrongAnswers = [];
        this.questions.forEach(q => {
            const userSelection = this.userAnswers[q.id] || [];
            const correctUids = q.processedAnswers.filter(a => a.isCorrect).map(a => a.uid);
            const isCorrect = userSelection.length === correctUids.length && userSelection.every(u => correctUids.includes(u));
            if (isCorrect) correctCount++;
            else wrongAnswers.push({ question: q, userSelection, correctUids });
        });
        return { correct: correctCount, total: this.questions.length, percentage: (correctCount / this.questions.length * 100).toFixed(1), wrongAnswers };
    },

    displayResults: function(results) {
        document.getElementById('results-summary').innerHTML = `
            <div class="score-display">${results.correct}/${results.total}</div>
            <p>Bạn đúng ${results.percentage}%</p>`;
        
        const wrongDiv = document.getElementById('wrong-answers');
        wrongDiv.innerHTML = results.wrongAnswers.length ? '<h3>❌ Các câu sai:</h3>' : '<h3>🎉 Hoàn hảo!</h3>';
        results.wrongAnswers.forEach(item => {
            const q = item.question;
            const correctTexts = q.processedAnswers.filter(a => a.isCorrect).map(a => a.text).join(', ');
            const userTexts = q.processedAnswers.filter(a => item.userSelection.includes(a.uid)).map(a => a.text).join(', ') || 'Không chọn';
            
            wrongDiv.innerHTML += `
                <div class="wrong-answer-item" style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                    <div class="wrong-answer-question"><strong>${q.question}</strong></div>
                    <div style="color: red;">Bạn chọn: ${userTexts}</div>
                    <div style="color: green;">Đáp án đúng: ${correctTexts}</div>
                </div>`;
        });
    },

    // Show a page
    showPage: function(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    },    

    submitQuiz: function() {
        this.displayResults(this.calculateResults());
        localStorage.removeItem(`progress_${this.currentCourse.path}_${this.currentQuiz}`);
        this.showPage('results-page');
    },

    retakeQuiz: function() {
        this.currentQuestionIndex = 0;
        this.userAnswers = {};
        this.checkedQuestions = {};
        this.displayQuestion();
        this.showPage('quiz-page');
    },

    // Show course selection
    showCourseSelection: function() {
        this.showPage('course-selection');
    },

    // Show course detail
    showCourseDetail: function() {
        this.showPage('course-detail');
    },

    showPage: function(id) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    showToast: function(msg) {
        const t = document.createElement('div');
        t.className = 'toast'; t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());