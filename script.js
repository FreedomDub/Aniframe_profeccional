// Data Storage (In a real app, this would be a database)
let employees = [
    {
        id: 1,
        name: "Анна Иванова",
        role: "Актриса озвучки",
        bio: "Опыт работы в дубляже - 5 лет. Участвовала в озвучке более 30 анимационных проектов.",
        image: "🎭"
    },
    {
        id: 2,
        name: "Михаил Петров",
        role: "Звукорежиссер",
        bio: "Специалист по звуковому пост-продакшену. Работает в индустрии более 8 лет.",
        image: "🎧"
    },
    {
        id: 3,
        name: "Елена Смирнова",
        role: "Переводчик",
        bio: "Литературный переводчик с английского и японского языков. Стаж - 6 лет.",
        image: "📝"
    }
];

let projects = [
    {
        id: 1,
        title: "Анимационный сериал 'Звездные приключения'",
        description: "Полный цикл локализации 24 серий анимационного сериала.",
        status: "Завершен",
        image: "🌟"
    },
    {
        id: 2,
        title: "Фильм 'Тайны океана'",
        description: "Дубляж документального фильма о морских глубинах.",
        status: "В работе",
        image: "🌊"
    },
    {
        id: 3,
        title: "Игра 'Космические рейнджеры'",
        description: "Озвучка персонажей мобильной игры.",
        status: "Завершен",
        image: "🚀"
    }
];

let aboutText = "Aniframe Studio - это современная студия дубляжа, специализирующаяся на озвучке анимационных проектов, фильмов и сериалов. Мы работаем с 2015 года и успешно реализовали более 200 проектов.";

// DOM Elements
const modals = {
    login: document.getElementById('loginModal'),
    register: document.getElementById('registerModal'),
    resume: document.getElementById('resumeModal'),
    question: document.getElementById('questionModal')
};

const forms = {
    login: document.getElementById('loginForm'),
    register: document.getElementById('registerForm'),
    resume: document.getElementById('resumeForm'),
    question: document.getElementById('questionForm')
};

const buttons = {
    login: document.getElementById('loginBtn'),
    admin: document.getElementById('adminBtn'),
    resume: document.getElementById('resumeBtn'),
    question: document.getElementById('questionBtn'),
    sendResume: document.getElementById('sendResume'),
    askQuestion: document.getElementById('askQuestion'),
    closeAdmin: document.getElementById('closeAdmin'),
    addEmployee: document.getElementById('addEmployeeBtn'),
    addProject: document.getElementById('addProjectBtn'),
    saveAbout: document.getElementById('saveAboutText')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadEmployees();
    loadProjects();
    setupEventListeners();
    checkAdminStatus();
}

function loadEmployees() {
    const grid = document.getElementById('employeesGrid');
    grid.innerHTML = employees.map(employee => `
        <div class="employee-card">
            <div class="employee-image">${employee.image}</div>
            <div class="employee-info">
                <h3>${employee.name}</h3>
                <div class="employee-role">${employee.role}</div>
                <p class="employee-bio">${employee.bio}</p>
            </div>
        </div>
    `).join('');
}

function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = projects.map(project => `
        <div class="project-card">
            <div class="project-image">${project.image}</div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <span class="project-status">${project.status}</span>
            </div>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Modal open buttons
    buttons.login.addEventListener('click', () => openModal('login'));
    buttons.resume.addEventListener('click', () => openModal('resume'));
    buttons.question.addEventListener('click', () => openModal('question'));
    buttons.sendResume.addEventListener('click', () => openModal('resume'));
    buttons.askQuestion.addEventListener('click', () => openModal('question'));
    
    // Admin buttons
    buttons.admin.addEventListener('click', openAdminPanel);
    buttons.closeAdmin.addEventListener('click', closeAdminPanel);
    buttons.addEmployee.addEventListener('click', addEmployee);
    buttons.addProject.addEventListener('click', addProject);
    buttons.saveAbout.addEventListener('click', saveAboutText);
    
    // Form submissions
    forms.login.addEventListener('submit', handleLogin);
    forms.register.addEventListener('submit', handleRegister);
    forms.resume.addEventListener('submit', handleResume);
    forms.question.addEventListener('submit', handleQuestion);
    
    // Close modals when clicking X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeAllModals);
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Tab switching in admin panel
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Show register form
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        closeAllModals();
        openModal('register');
    });
}

function openModal(modalName) {
    closeAllModals();
    modals[modalName].style.display = 'block';
}

function closeAllModals() {
    Object.values(modals).forEach(modal => {
        modal.style.display = 'none';
    });
}

function openAdminPanel() {
    document.getElementById('adminPanel').style.display = 'block';
    loadAdminEmployees();
    loadAdminProjects();
    loadAboutText();
}

function closeAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
}

function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
}

// Form Handlers
function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simple admin check (in real app, this would be server-side)
    if (email === 'admin@aniframe.ru' && password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        buttons.admin.style.display = 'block';
        closeAllModals();
        showNotification('Успешный вход в систему!', 'success');
    } else {
        showNotification('Неверные учетные данные', 'error');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // In a real app, send to server
    showNotification('Регистрация успешна!', 'success');
    closeAllModals();
}

function handleResume(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fileInput = document.getElementById('resumeFile');
    
    // Simulate file upload and email/telegram notification
    if (fileInput.files.length > 0) {
        showNotification('Резюме отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
    } else {
        showNotification('Пожалуйста, прикрепите файл резюме', 'error');
        return;
    }
    
    // Here you would typically send the data to your backend
    // which would then forward to Telegram/email
    console.log('Resume submitted:', {
        name: formData.get('name'),
        email: formData.get('email'),
        files: fileInput.files
    });
    
    closeAllModals();
    e.target.reset();
}

function handleQuestion(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Simulate sending question to admin
    showNotification('Вопрос отправлен! Ответим в течение 24 часов.', 'success');
    
    // Here you would typically send to your backend/Telegram bot
    console.log('Question submitted:', {
        name: formData.get('name'),
        email: formData.get('email'),
        question: formData.get('question')
    });
    
    closeAllModals();
    e.target.reset();
}

// Admin Functions
function loadAdminEmployees() {
    const list = document.getElementById('adminEmployeesList');
    list.innerHTML = employees.map(employee => `
        <div class="admin-item">
            <h4>${employee.name}</h4>
            <p>${employee.role}</p>
            <button onclick="editEmployee(${employee.id})">Редактировать</button>
            <button onclick="deleteEmployee(${employee.id})">Удалить</button>
        </div>
    `).join('');
}

function loadAdminProjects() {
    const list = document.getElementById('adminProjectsList');
    list.innerHTML = projects.map(project => `
        <div class="admin-item">
            <h4>${project.title}</h4>
            <p>${project.status}</p>
            <button onclick="editProject(${project.id})">Редактировать</button>
            <button onclick="deleteProject(${project.id})">Удалить</button>
        </div>
    `).join('');
}

function loadAboutText() {
    document.getElementById('aboutText').value = aboutText;
}

function addEmployee() {
    const name = prompt('Введите имя сотрудника:');
    const role = prompt('Введите должность:');
    const bio = prompt('Введите описание:');
    
    if (name && role && bio) {
        const newEmployee = {
            id: employees.length + 1,
            name,
            role,
            bio,
            image: '👤'
        };
        employees.push(newEmployee);
        loadEmployees();
        loadAdminEmployees();
        showNotification('Сотрудник добавлен!', 'success');
    }
}

function addProject() {
    const title = prompt('Введите название проекта:');
    const description = prompt('Введите описание:');
    const status = prompt('Введите статус (Завершен/В работе):');
    
    if (title && description && status) {
        const newProject = {
            id: projects.length + 1,
            title,
            description,
            status,
            image: '📁'
        };
        projects.push(newProject);
        loadProjects();
        loadAdminProjects();
        showNotification('Проект добавлен!', 'success');
    }
}

function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
        const newName = prompt('Введите новое имя:', employee.name);
        const newRole = prompt('Введите новую должность:', employee.role);
        const newBio = prompt('Введите новое описание:', employee.bio);
        
        if (newName) employee.name = newName;
        if (newRole) employee.role = newRole;
        if (newBio) employee.bio = newBio;
        
        loadEmployees();
        loadAdminEmployees();
        showNotification('Данные сотрудника обновлены!', 'success');
    }
}

function deleteEmployee(id) {
    if (confirm('Вы уверены, что хотите удалить этого сотрудника?')) {
        employees = employees.filter(emp => emp.id !== id);
        loadEmployees();
        loadAdminProjects();
        showNotification('Сотрудник удален!', 'success');
    }
}

function editProject(id) {
    const project = projects.find(proj => proj.id === id);
    if (project) {
        const newTitle = prompt('Введите новое название:', project.title);
        const newDesc = prompt('Введите новое описание:', project.description);
        const newStatus = prompt('Введите новый статус:', project.status);
        
        if (newTitle) project.title = newTitle;
        if (newDesc) project.description = newDesc;
        if (newStatus) project.status = newStatus;
        
        loadProjects();
        loadAdminProjects();
        showNotification('Данные проекта обновлены!', 'success');
    }
}

function deleteProject(id) {
    if (confirm('Вы уверены, что хотите удалить этот проект?')) {
        projects = projects.filter(proj => proj.id !== id);
        loadProjects();
        loadAdminProjects();
        showNotification('Проект удален!', 'success');
    }
}

function saveAboutText() {
    aboutText = document.getElementById('aboutText').value;
    showNotification('Текст о компании сохранен!', 'success');
}

// Utility Functions
function checkAdminStatus() {
    if (localStorage.getItem('isAdmin') === 'true') {
        buttons.admin.style.display = 'block';
    }
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .admin-item {
        background: var(--beige-light);
        padding: 1rem;
        margin: 0.5rem 0;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .admin-item button {
        margin-left: 0.5rem;
        padding: 0.3rem 0.8rem;
        background: var(--gray-medium);
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);
