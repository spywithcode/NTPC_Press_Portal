// NTPC Press Clippings Portal - JavaScript

// Application State
let currentUser = null;
let currentPage = 'loginPage';
let currentClippings = [];
let filteredClippings = [];
let currentFilters = {
    search: '',
    category: '',
    dateFrom: '',
    dateTo: ''
};
let currentPageNumber = 1;
const itemsPerPage = 9;

// Application Data
const appData = {
    credentials: {
        username: "ntpc",
        password: "admin123"
    },
    categories: [
        "Financial", "Projects", "Green Energy", "Environment", "Safety", "Operations", 
        "Research", "Technology", "HR", "CSR", "Corporate Governance", "Sustainability"
    ],
    sampleClippings: [
        {
            id: 1,
            title: "NTPC Announces Q4 FY2025 Results - Record Breaking Performance",
            date: "2025-08-20",
            category: "Financial",
            description: "NTPC Limited reports exceptional financial performance for Q4 FY2025",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_20.08.2025_NTPC_Q4_Results.pdf"
        },
        {
            id: 2,
            title: "World's Largest Solar Power Plant Inaugurated in Rajasthan",
            date: "2025-08-18",
            category: "Projects",
            description: "NTPC inaugurates 1000 MW solar power facility contributing to India's renewable energy goals",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_18.08.2025_Solar_Plant_Rajasthan.pdf"
        },
        {
            id: 3,
            title: "NTPC Wins National Excellence Award for Safety Practices",
            date: "2025-08-15",
            category: "Safety",
            description: "Recognition for implementing world-class safety protocols across all operations",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_15.08.2025_Safety_Award.pdf"
        },
        {
            id: 4,
            title: "Green Hydrogen Production MOU Signed with International Partners",
            date: "2025-08-12",
            category: "Green Energy",
            description: "Strategic partnership to establish India's largest green hydrogen production facility",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_12.08.2025_Green_Hydrogen_MOU.pdf"
        },
        {
            id: 5,
            title: "Chairman Addresses COP30 Climate Change Summit",
            date: "2025-08-10",
            category: "Environment",
            description: "NTPC's commitment to carbon neutrality by 2032 highlighted at global summit",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_10.08.2025_Climate_Summit.pdf"
        },
        {
            id: 6,
            title: "Zero Liquid Discharge Achieved at All Thermal Power Plants",
            date: "2025-08-08",
            category: "Environment",
            description: "Milestone achievement in water conservation and environmental protection",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_08.08.2025_Zero_Discharge.pdf"
        },
        {
            id: 7,
            title: "NTPC Stock Reaches All-Time High on Market Confidence",
            date: "2025-08-05",
            category: "Financial",
            description: "Strong financial performance drives investor confidence to record levels",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_05.08.2025_Stock_High.pdf"
        },
        {
            id: 8,
            title: "Advanced Employee Training Program Launched Nationwide",
            date: "2025-08-03",
            category: "HR",
            description: "Comprehensive skill development initiative for 50,000+ employees",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_03.08.2025_Training_Program.pdf"
        },
        {
            id: 9,
            title: "Digital Transformation Initiative Shows Outstanding Results",
            date: "2025-08-01",
            category: "Technology",
            description: "AI and automation implementation improves operational efficiency by 35%",
            url: "http://10.0.60.24/2025/AUGUST_2025/Press_Clippings_01.08.2025_Digital_Transform.pdf"
        },
        {
            id: 10,
            title: "Rural Electrification Program Reaches 1 Million Households",
            date: "2025-07-30",
            category: "CSR",
            description: "NTPC's commitment to social responsibility transforms rural communities",
            url: "http://10.0.60.24/2025/JULY_2025/Press_Clippings_30.07.2025_Rural_Electrification.pdf"
        },
        {
            id: 11,
            title: "New Coal Mine Operations Begin in Odisha with Clean Technology",
            date: "2025-07-28",
            category: "Operations",
            description: "State-of-the-art mining facility incorporates latest environmental technologies",
            url: "http://10.0.60.24/2025/JULY_2025/Press_Clippings_28.07.2025_Coal_Mine_Odisha.pdf"
        },
        {
            id: 12,
            title: "NTPC Partners with IIT for Advanced Research Initiative",
            date: "2025-07-25",
            category: "Research",
            description: "Collaboration focuses on next-generation clean energy technologies",
            url: "http://10.0.60.24/2025/JULY_2025/Press_Clippings_25.07.2025_IIT_Partnership.pdf"
        },
        {
            id: 13,
            title: "Board Approves ₹50,000 Crore Renewable Energy Investment",
            date: "2025-07-22",
            category: "Corporate Governance",
            description: "Major board decision accelerates transition to renewable energy portfolio",
            url: "http://10.0.60.24/2025/JULY_2025/Press_Clippings_22.07.2025_Board_Decision.pdf"
        },
        {
            id: 14,
            title: "Sustainability Report 2025 Highlights Carbon Reduction Progress",
            date: "2025-07-20",
            category: "Sustainability",
            description: "Annual report showcases 40% reduction in carbon intensity over 5 years",
            url: "http://10.0.60.24/2025/JULY_2025/Press_Clippings_20.07.2025_Sustainability_Report.pdf"
        },
        {
            id: 15,
            title: "NTPC Wins Global Award for Innovation in Power Generation",
            date: "2025-07-18",
            category: "Technology",
            description: "International recognition for breakthrough in efficient power generation",
            url: "http://10.0.60.24/2025/JULY_2025/Press_Clippings_18.07.2025_Innovation_Award.pdf"
        }
    ]
};

// Math Captcha
let captchaAnswer = 0;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check for existing session
    const savedUser = localStorage.getItem('ntpc_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showPage('dashboardPage');
    } else {
        showPage('loginPage');
    }
    
    // Initialize components
    setupEventListeners();
    generateCaptcha();
    populateCategories();
    
    // Initialize data
    currentClippings = [...appData.sampleClippings];
    filteredClippings = [...currentClippings];
}

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));
    
    // Filter functionality
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('dateFromFilter').addEventListener('change', applyFilters);
    document.getElementById('dateToFilter').addEventListener('change', applyFilters);
    
    // Upload form
    document.getElementById('uploadForm').addEventListener('submit', handleUpload);
    setupFileUpload();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(event) {
    if (event.ctrlKey || event.metaKey) {
        switch(event.key) {
            case '/':
                event.preventDefault();
                if (currentPage === 'viewPage') {
                    document.getElementById('searchInput').focus();
                }
                break;
            case 'h':
                event.preventDefault();
                showPage('dashboardPage');
                break;
        }
    }
    
    if (event.key === 'Escape') {
        // Close any modals or return to dashboard
        showPage('dashboardPage');
    }
}

// Authentication Functions
function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    document.getElementById('captchaQuestion').textContent = `${num1} + ${num2} = ?`;
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.querySelector('.password-toggle i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.className = 'fas fa-eye-slash';
    } else {
        passwordField.type = 'password';
        toggleButton.className = 'fas fa-eye';
    }
}

async function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const captchaValue = parseInt(formData.get('captcha'));
    
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoader = loginBtn.querySelector('.btn-loader');
    
    // Show loading state
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    loginBtn.disabled = true;
    
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Validate credentials
        if (username !== appData.credentials.username) {
            throw new Error('Invalid User ID');
        }
        
        if (password !== appData.credentials.password) {
            throw new Error('Invalid Password');
        }
        
        if (captchaValue !== captchaAnswer) {
            throw new Error('Incorrect security check. Please try again.');
        }
        
        // Successful login
        currentUser = {
            username: username,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('ntpc_user', JSON.stringify(currentUser));
        showToast('Login successful! Welcome to NTPC Press Clippings Portal.', 'success');
        
        setTimeout(() => {
            showPage('dashboardPage');
        }, 1000);
        
    } catch (error) {
        showToast(error.message, 'error');
        generateCaptcha(); // Generate new captcha on error
        document.getElementById('captcha').value = '';
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        loginBtn.disabled = false;
    }
}

function logout() {
    localStorage.removeItem('ntpc_user');
    currentUser = null;
    showToast('Logged out successfully', 'success');
    showPage('loginPage');
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.classList.add('hidden');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');
    targetPage.classList.remove('hidden');
    
    currentPage = pageId;
    
    // Page-specific initialization
    switch(pageId) {
        case 'dashboardPage':
            initializeDashboard();
            break;
        case 'viewPage':
            initializeViewPage();
            break;
        case 'uploadPage':
            initializeUploadPage();
            break;
    }
    
    // Add fade-in animation
    targetPage.classList.add('fade-in');
    setTimeout(() => {
        targetPage.classList.remove('fade-in');
    }, 300);
}

// Dashboard Functions
function initializeDashboard() {
    updateDashboardStats();
    displayRecentClippings();
}

function updateDashboardStats() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const thisMonthClippings = currentClippings.filter(clipping => {
        const clippingDate = new Date(clipping.date);
        return clippingDate.getMonth() === currentMonth && 
               clippingDate.getFullYear() === currentYear;
    }).length;
    
    document.getElementById('totalClippings').textContent = currentClippings.length;
    document.getElementById('totalCategories').textContent = appData.categories.length;
    document.getElementById('thisMonth').textContent = thisMonthClippings;
}

function displayRecentClippings() {
    const recentContainer = document.getElementById('recentClippings');
    const recentClippings = currentClippings
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);
    
    recentContainer.innerHTML = recentClippings.map(clipping => `
        <div class="clipping-card" data-category="${clipping.category}">
            <div class="clipping-header">
                <span class="clipping-category">${clipping.category}</span>
                <h4 class="clipping-title">${clipping.title}</h4>
                <p class="clipping-date">${formatDate(clipping.date)}</p>
            </div>
            <div class="clipping-body">
                <p class="clipping-description">${clipping.description}</p>
                <div class="clipping-actions">
                    <button class="view-btn" onclick="viewClipping(${clipping.id})">
                        <i class="fas fa-external-link-alt"></i> View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// View Page Functions
function initializeViewPage() {
    applyFilters();
    document.getElementById('searchInput').value = currentFilters.search;
}

function populateCategories() {
    const categorySelects = ['categoryFilter', 'clippingCategory'];
    
    categorySelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            // Clear existing options (except first one for filters)
            const firstOption = select.querySelector('option');
            select.innerHTML = '';
            if (firstOption && selectId === 'categoryFilter') {
                select.appendChild(firstOption);
            }
            
            // Add category options
            appData.categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                select.appendChild(option);
            });
        }
    });
}

function handleSearch(event) {
    currentFilters.search = event.target.value.toLowerCase();
    applyFilters();
}

function applyFilters() {
    const searchTerm = currentFilters.search || document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const dateFromFilter = document.getElementById('dateFromFilter').value;
    const dateToFilter = document.getElementById('dateToFilter').value;
    
    currentFilters = {
        search: searchTerm,
        category: categoryFilter,
        dateFrom: dateFromFilter,
        dateTo: dateToFilter
    };
    
    filteredClippings = currentClippings.filter(clipping => {
        // Search filter
        if (searchTerm && !clipping.title.toLowerCase().includes(searchTerm) && 
            !clipping.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        // Category filter
        if (categoryFilter && clipping.category !== categoryFilter) {
            return false;
        }
        
        // Date filters
        const clippingDate = new Date(clipping.date);
        if (dateFromFilter && clippingDate < new Date(dateFromFilter)) {
            return false;
        }
        if (dateToFilter && clippingDate > new Date(dateToFilter)) {
            return false;
        }
        
        return true;
    });
    
    currentPageNumber = 1;
    displayClippings();
    updateResultsInfo();
}

function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('dateFromFilter').value = '';
    document.getElementById('dateToFilter').value = '';
    
    currentFilters = {
        search: '',
        category: '',
        dateFrom: '',
        dateTo: ''
    };
    
    filteredClippings = [...currentClippings];
    currentPageNumber = 1;
    displayClippings();
    updateResultsInfo();
}

function displayClippings() {
    const startIndex = (currentPageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const clippingsToShow = filteredClippings.slice(startIndex, endIndex);
    
    const grid = document.getElementById('clippingsGrid');
    grid.innerHTML = clippingsToShow.map(clipping => `
        <div class="clipping-card" data-category="${clipping.category}">
            <div class="clipping-header">
                <span class="clipping-category">${clipping.category}</span>
                <h4 class="clipping-title">${clipping.title}</h4>
                <p class="clipping-date">${formatDate(clipping.date)}</p>
            </div>
            <div class="clipping-body">
                <p class="clipping-description">${clipping.description}</p>
                <div class="clipping-actions">
                    <button class="view-btn" onclick="viewClipping(${clipping.id})">
                        <i class="fas fa-external-link-alt"></i> View PDF
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    displayPagination();
}

function updateResultsInfo() {
    const resultsInfo = document.getElementById('resultsCount');
    const total = filteredClippings.length;
    const showing = Math.min(itemsPerPage, total - (currentPageNumber - 1) * itemsPerPage);
    const start = total > 0 ? (currentPageNumber - 1) * itemsPerPage + 1 : 0;
    const end = start + showing - 1;
    
    if (total > 0) {
        resultsInfo.textContent = `Showing ${start}-${end} of ${total} clippings`;
    } else {
        resultsInfo.textContent = 'No clippings found matching your criteria';
    }
}

function displayPagination() {
    const totalPages = Math.ceil(filteredClippings.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPageNumber - 1})" 
                ${currentPageNumber === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPageNumber - 2 && i <= currentPageNumber + 2)) {
            paginationHTML += `
                <button onclick="changePage(${i})" 
                        ${i === currentPageNumber ? 'class="active"' : ''}>
                    ${i}
                </button>
            `;
        } else if (i === currentPageNumber - 3 || i === currentPageNumber + 3) {
            paginationHTML += '<span>...</span>';
        }
    }
    
    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPageNumber + 1})" 
                ${currentPageNumber === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    if (page < 1 || page > Math.ceil(filteredClippings.length / itemsPerPage)) {
        return;
    }
    currentPageNumber = page;
    displayClippings();
    updateResultsInfo();
    
    // Scroll to top of results
    document.getElementById('clippingsGrid').scrollIntoView({ behavior: 'smooth' });
}

function viewClipping(clippingId) {
    const clipping = currentClippings.find(c => c.id === clippingId);
    if (clipping) {
        window.open(clipping.url, '_blank');
        showToast('Opening press clipping...', 'success');
    }
}

// Upload Functions
function initializeUploadPage() {
    resetUploadForm();
    document.getElementById('clippingDate').value = new Date().toISOString().split('T')[0];
}

function setupFileUpload() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
}

function handleFileSelect(file) {
    if (file.type !== 'application/pdf') {
        showToast('Please select a PDF file only', 'error');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
        showToast('File size must be less than 10MB', 'error');
        return;
    }
    
    // Display file preview
    const dropZoneContent = document.querySelector('.drop-zone-content');
    const filePreview = document.querySelector('.file-preview');
    
    dropZoneContent.classList.add('hidden');
    filePreview.classList.remove('hidden');
    
    document.querySelector('.file-name').textContent = file.name;
    document.querySelector('.file-size').textContent = formatFileSize(file.size);
    
    // Add remove functionality
    document.querySelector('.file-remove').onclick = () => {
        dropZoneContent.classList.remove('hidden');
        filePreview.classList.add('hidden');
        document.getElementById('fileInput').value = '';
    };
}

async function handleUpload(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const date = formData.get('date');
    const category = formData.get('category');
    const description = formData.get('description');
    const file = formData.get('file') || document.getElementById('fileInput').files[0];
    
    // Validation
    if (!title || !date || !category) {
        showToast('Please fill in all required fields', 'error');
        return;
    }
    
    if (!file) {
        showToast('Please select a PDF file', 'error');
        return;
    }
    
    const uploadBtn = document.querySelector('.upload-btn');
    const btnText = uploadBtn.querySelector('.btn-text');
    const btnLoader = uploadBtn.querySelector('.btn-loader');
    const progressBar = document.querySelector('.progress-bar');
    const progressFill = document.querySelector('.progress-fill');
    
    try {
        // Show loading state
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
        uploadBtn.disabled = true;
        progressBar.classList.remove('hidden');
        
        // Simulate upload progress
        for (let i = 0; i <= 100; i += 10) {
            progressFill.style.width = i + '%';
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // Create new clipping object
        const newClipping = {
            id: Math.max(...currentClippings.map(c => c.id)) + 1,
            title: title,
            date: date,
            category: category,
            description: description || `Press clipping uploaded on ${formatDate(new Date().toISOString().split('T')[0])}`,
            url: `http://10.0.60.24/2025/UPLOADS/Press_Clippings_${date}_${title.replace(/\s+/g, '_')}.pdf`
        };
        
        // Add to clippings
        currentClippings.unshift(newClipping);
        filteredClippings = [...currentClippings];
        
        showToast('Press clipping uploaded successfully!', 'success');
        
        setTimeout(() => {
            showPage('dashboardPage');
        }, 1500);
        
    } catch (error) {
        showToast('Upload failed. Please try again.', 'error');
    } finally {
        // Reset button state
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        uploadBtn.disabled = false;
        progressBar.classList.add('hidden');
        progressFill.style.width = '0%';
    }
}

function resetUploadForm() {
    document.getElementById('uploadForm').reset();
    document.querySelector('.drop-zone-content').classList.remove('hidden');
    document.querySelector('.file-preview').classList.add('hidden');
    document.getElementById('fileInput').value = '';
    document.getElementById('clippingDate').value = new Date().toISOString().split('T')[0];
}

// Utility Functions
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    switch(type) {
        case 'success':
            toastIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            toastIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            toastIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            toastIcon.innerHTML = '<i class="fas fa-info-circle"></i>';
    }
    
    // Show toast
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Hide toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 4000);
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Loading States
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
}

function hideLoading() {
    document.getElementById('loading').classList.add('hidden');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}