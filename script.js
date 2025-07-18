// 模拟的选题数据库
const mockTopicsDatabase = {
    // 这里只列出了5个学生作为示例，实际应该有30+个学生
    "张三": [
        "基于机器学习的图像识别技术研究",
        "区块链技术在金融领域的应用分析",
        "智能推荐系统的设计与实现"
    ],
    "李四": [
        "大数据分析在电商中的应用",
        "物联网技术在智能家居中的实现",
        "自然语言处理中的情感分析研究"
    ],
    "王五": [
        "云计算环境下的数据安全研究",
        "移动应用开发中的用户体验设计",
        "计算机视觉在自动驾驶中的应用"
    ],
    "赵六": [
        "人工智能在医疗诊断中的应用",
        "虚拟现实技术在教育中的应用研究",
        "数据挖掘技术在金融风险评估中的应用"
    ],
    "钱七": [
        "软件开发中的敏捷方法研究",
        "社交媒体中的信息传播模型研究",
        "基于深度学习的语音识别系统设计"
    ],
    // 可以继续添加更多学生...
    "学生1": ["题目1-1", "题目1-2", "题目1-3"],
    "学生2": ["题目2-1", "题目2-2", "题目2-3"],
    "学生3": ["题目3-1", "题目3-2", "题目3-3"],
    "学生4": ["题目4-1", "题目4-2", "题目4-3"],
    "学生5": ["题目5-1", "题目5-2", "题目5-3"],
    "学生6": ["题目6-1", "题目6-2", "题目6-3"],
    "学生7": ["题目7-1", "题目7-2", "题目7-3"],
    "学生8": ["题目8-1", "题目8-2", "题目8-3"],
    "学生9": ["题目9-1", "题目9-2", "题目9-3"],
    "学生10": ["题目10-1", "题目10-2", "题目10-3"],
    "学生11": ["题目11-1", "题目11-2", "题目11-3"],
    "学生12": ["题目12-1", "题目12-2", "题目12-3"],
    "学生13": ["题目13-1", "题目13-2", "题目13-3"],
    "学生14": ["题目14-1", "题目14-2", "题目14-3"],
    "学生15": ["题目15-1", "题目15-2", "题目15-3"],
    "学生16": ["题目16-1", "题目16-2", "题目16-3"],
    "学生17": ["题目17-1", "题目17-2", "题目17-3"],
    "学生18": ["题目18-1", "题目18-2", "题目18-3"],
    "学生19": ["题目19-1", "题目19-2", "题目19-3"],
    "学生20": ["题目20-1", "题目20-2", "题目20-3"],
    "学生21": ["题目21-1", "题目21-2", "题目21-3"],
    "学生22": ["题目22-1", "题目22-2", "题目22-3"],
    "学生23": ["题目23-1", "题目23-2", "题目23-3"],
    "学生24": ["题目24-1", "题目24-2", "题目24-3"],
    "学生25": ["题目25-1", "题目25-2", "题目25-3"],
    "学生26": ["题目26-1", "题目26-2", "题目26-3"],
    "学生27": ["题目27-1", "题目27-2", "题目27-3"],
    "学生28": ["题目28-1", "题目28-2", "题目28-3"],
    "学生29": ["题目29-1", "题目29-2", "题目29-3"],
    "学生30": ["题目30-1", "题目30-2", "题目30-3"],
};

// 模拟的已选题记录（实际应用中应该存储在服务器端）
let selectedTopics = JSON.parse(localStorage.getItem('selectedTopics')) || {};

// 管理员密码（实际应用中应该存储在服务器端）
const ADMIN_PASSWORD = "admin123";

// DOM元素
const selectionForm = document.getElementById('selectionForm');
const studentNameInput = document.getElementById('studentName');
const selectButton = document.getElementById('selectButton');
const resultSection = document.getElementById('resultSection');
const initialPrompt = document.getElementById('initialPrompt');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const selectedTopicElement = document.getElementById('selectedTopic');
const selectionTimeElement = document.getElementById('selectionTime');
const participantCountElement = document.getElementById('participantCount');
const selectedCountElement = document.getElementById('selectedCount');
const topicCountElement = document.getElementById('topicCount');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminSection = document.getElementById('adminSection');
const closeAdminBtn = document.getElementById('closeAdminBtn');
const adminTableBody = document.getElementById('adminTableBody');
const adminSearch = document.getElementById('adminSearch');
const noResults = document.getElementById('noResults');
const adminLoginModal = document.getElementById('adminLoginModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModalBtn');
const adminLoginForm = document.getElementById('adminLoginForm');
const adminPassword = document.getElementById('adminPassword');
const loginError = document.getElementById('loginError');

// 页面加载时更新统计信息
updateStatistics();

// 表单提交事件
selectionForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const studentName = studentNameInput.value.trim();
    
    // 验证姓名
    if (!studentName) {
        showError('请输入您的姓名');
        return;
    }
    
    // 检查学生是否存在于题库中
    if (!mockTopicsDatabase[studentName]) {
        showError('未找到您的选题信息，请确认姓名是否正确');
        return;
    }
    
    // 检查是否已选题
    if (selectedTopics[studentName]) {
        // 已选题，直接显示结果
        displayResult(studentName);
        return;
    }
    
    // 显示加载状态
    showLoading();
    
    try {
        // 模拟网络请求延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 获取该学生的所有可选题目
        const topics = mockTopicsDatabase[studentName];
        
        // 随机选择一个题目
        const randomIndex = Math.floor(Math.random() * topics.length);
        const selectedTopic = topics[randomIndex];
        
        // 记录选题结果
        const selectionTime = new Date().toLocaleString();
        selectedTopics[studentName] = {
            topic: selectedTopic,
            time: selectionTime,
            allTopics: topics
        };
        
        // 保存到本地存储（实际应用中应该发送到服务器）
        localStorage.setItem('selectedTopics', JSON.stringify(selectedTopics));
        
        // 显示结果
        displayResult(studentName);
        
        // 更新统计信息
        updateStatistics();
    } catch (error) {
        console.error('选题过程中出现错误:', error);
        showError('选题过程中出现错误，请稍后再试');
    }
});

// 显示结果
function displayResult(studentName) {
    const selection = selectedTopics[studentName];
    
    // 显示选中的题目
    selectedTopicElement.textContent = selection.topic;
    selectionTimeElement.textContent = `选题时间: ${selection.time}`;
    
    // 显示结果区域，隐藏其他区域
    resultSection.classList.remove('hidden');
    initialPrompt.classList.add('hidden');
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    
    // 平滑滚动到结果区域
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // 添加动画效果
    setTimeout(() => {
        resultSection.classList.add('animate-fadeIn');
    }, 10);
}

// 显示加载状态
function showLoading() {
    loadingState.classList.remove('hidden');
    initialPrompt.classList.add('hidden');
    resultSection.classList.add('hidden');
    errorState.classList.add('hidden');
}

// 显示错误信息
function showError(message) {
    errorMessage.textContent = message;
    errorState.classList.remove('hidden');
    initialPrompt.classList.add('hidden');
    resultSection.classList.add('hidden');
    loadingState.classList.add('hidden');
    
    // 添加错误动画
    errorState.classList.add('animate-shake');
    setTimeout(() => {
        errorState.classList.remove('animate-shake');
    }, 500);
}

// 更新统计信息
function updateStatistics() {
    const totalStudents = Object.keys(mockTopicsDatabase).length;
    const selectedStudents = Object.keys(selectedTopics).length;
    const totalTopics = Object.values(mockTopicsDatabase).flat().length;
    
    participantCountElement.textContent = totalStudents;
    selectedCountElement.textContent = selectedStudents;
    topicCountElement.textContent = totalTopics;
    
    // 检查当前用户是否已经选过题
    const studentName = studentNameInput.value.trim();
    if (studentName && selectedTopics[studentName]) {
        selectButton.innerHTML = '<i class="fa fa-eye mr-2"></i><span>查看已选题目</span>';
        selectButton.classList.remove('bg-primary', 'hover:bg-primary/90');
        selectButton.classList.add('bg-gray-600', 'hover:bg-gray-700');
    } else {
        selectButton.innerHTML = '<i class="fa fa-random mr-2"></i><span>抽选题目</span>';
        selectButton.classList.remove('bg-gray-600', 'hover:bg-gray-700');
        selectButton.classList.add('bg-primary', 'hover:bg-primary/90');
    }
}

// 输入框事件 - 实时检查是否已选题
studentNameInput.addEventListener('input', updateStatistics);

// 管理员登录按钮点击事件
adminLoginBtn.addEventListener('click', () => {
    adminLoginModal.classList.remove('hidden');
    // 添加动画效果
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    adminPassword.focus();
});

// 关闭管理员面板按钮点击事件
closeAdminBtn.addEventListener('click', () => {
    adminSection.classList.add('hidden');
});

// 关闭模态框按钮点击事件
closeModalBtn.addEventListener('click', closeLoginModal);

// 点击模态框外部关闭
adminLoginModal.addEventListener('click', (e) => {
    if (e.target === adminLoginModal) {
        closeLoginModal();
    }
});

// 关闭登录模态框
function closeLoginModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        adminLoginModal.classList.add('hidden');
        loginError.classList.add('hidden');
    }, 300);
}

// 管理员登录表单提交事件
adminLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = adminPassword.value;
    
    if (password === ADMIN_PASSWORD) {
        // 登录成功
        closeLoginModal();
        adminPassword.value = '';
        loadAdminTable();
        adminSection.classList.remove('hidden');
        // 平滑滚动到管理员区域
        adminSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // 登录失败
        loginError.classList.remove('hidden');
        // 添加错误动画
        loginError.classList.add('animate-shake');
        setTimeout(() => {
            loginError.classList.remove('animate-shake');
        }, 500);
    }
});

// 加载管理员表格数据
function loadAdminTable() {
    const students = Object.keys(selectedTopics);
    const sortedStudents = students.sort((a, b) => {
        return new Date(selectedTopics[a].time) - new Date(selectedTopics[b].time);
    });
    
    if (sortedStudents.length === 0) {
        adminTableBody.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    adminTableBody.innerHTML = '';
    
    sortedStudents.forEach((student, index) => {
        const selection = selectedTopics[student];
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors duration-200';
        
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${student}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${selection.topic}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${selection.time}
            </td>
        `;
        
        adminTableBody.appendChild(row);
    });
}

// 管理员搜索功能
adminSearch.addEventListener('input', () => {
    const searchTerm = adminSearch.value.toLowerCase().trim();
    const rows = adminTableBody.querySelectorAll('tr');
    
    let hasResults = false;
    
    rows.forEach(row => {
        const studentName = row.querySelector('td:nth-child(2) div div').textContent.toLowerCase();
        if (studentName.includes(searchTerm)) {
            row.classList.remove('hidden');
            hasResults = true;
        } else {
            row.classList.add('hidden');
        }
    });
    
    if (!hasResults && searchTerm) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
});