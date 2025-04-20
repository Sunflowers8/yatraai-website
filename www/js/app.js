// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');
const userAvatar = document.getElementById('user-avatar');
const navButtons = document.querySelectorAll('.nav-btn');
const ridePanel = document.getElementById('ride-panel');
const closePanel = document.getElementById('close-panel');
const quickroutePanel = document.getElementById('quickroute-panel');
const closeQuickroute = document.getElementById('close-quickroute');
const settingsPanel = document.getElementById('settings-panel');
const backFromSettings = document.getElementById('back-from-settings');
const logoutBtn = document.getElementById('logout-btn');

// Sample Ride Data
const rideOptions = [
    {
        type: 'Standard',
        icon: 'car',
        time: '5 min away',
        price: '₹250',
        description: 'Affordable everyday ride'
    },
    {
        type: 'Premium',
        icon: 'car',
        time: '7 min away',
        price: '₹400',
        description: 'Extra comfort and space'
    },
    {
        type: 'Bike',
        icon: 'motorcycle',
        time: '3 min away',
        price: '₹150',
        description: 'Quick and economical'
    },
    {
        type: 'XL',
        icon: 'car',
        time: '8 min away',
        price: '₹500',
        description: 'For groups up to 6'
    }
];

// Initialize the app
function initApp() {
    // Load user data
    loadUserData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize current page
    showPage('explore');
}

// Load user data from localStorage
function loadUserData() {
    const username = localStorage.getItem('userName') || 'Guest User';
    const email = localStorage.getItem('userEmail') || 'guest@example.com';
    
    document.getElementById('menu-username').textContent = username;
    document.getElementById('menu-email').textContent = email;
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    menuToggle.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', toggleMobileMenu);
    userAvatar.addEventListener('click', toggleMobileMenu);
    
    // Navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            showPage(page);
            setActiveNavButton(button);
        });
    });
    
    // Ride panel
    document.querySelector('[data-page="ridenow"]').addEventListener('click', showRidePanel);
    closePanel.addEventListener('click', hideRidePanel);
    
    // QuickRoute panel
    document.querySelector('[data-page="quickroute"]').addEventListener('click', showQuickroutePanel);
    closeQuickroute.addEventListener('click', hideQuickroutePanel);
    
    // Settings panel
    document.querySelector('[data-section="settings"]').addEventListener('click', showSettingsPanel);
    backFromSettings.addEventListener('click', hideSettingsPanel);
    
    // Payment methods
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', selectPaymentMethod);
    });
    
    // Logout
    logoutBtn.addEventListener('click', logoutUser);
    
    // Menu items
    document.querySelectorAll('[data-section]').forEach(item => {
        item.addEventListener('click', handleMenuItemClick);
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : 'auto';
}

// Show specific page
function showPage(page) {
    console.log(`Showing page: ${page}`);
    
    switch(page) {
        case 'explore':
            // Already shown by default
            break;
        case 'quickroute':
            // Handled by quickroute panel
            break;
        case 'ridenow':
            // Handled by ride panel
            break;
        case 'subscription':
            // In a real app, this would show subscription options
            alert('Premium subscription features would be shown here');
            break;
    }
}

// Set active nav button
function setActiveNavButton(activeButton) {
    navButtons.forEach(button => button.classList.remove('active'));
    activeButton.classList.add('active');
}

// Show ride options panel
function showRidePanel() {
    populateRideOptions();
    ridePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hide ride options panel
function hideRidePanel() {
    ridePanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show QuickRoute panel
function showQuickroutePanel() {
    quickroutePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Hide QuickRoute panel
function hideQuickroutePanel() {
    quickroutePanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show settings panel
function showSettingsPanel(e) {
    e.preventDefault();
    settingsPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleMobileMenu(); // Close side menu if open
}

// Hide settings panel
function hideSettingsPanel() {
    settingsPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Populate ride options
function populateRideOptions() {
    const rideOptionsContainer = document.querySelector('.ride-options');
    rideOptionsContainer.innerHTML = '';
    
    rideOptions.forEach(option => {
        const rideOption = document.createElement('div');
        rideOption.className = 'ride-option';
        rideOption.innerHTML = `
            <div class="option-info">
                <i class="fas fa-${option.icon}"></i>
                <div class="option-details">
                    <h4>${option.type}</h4>
                    <p>${option.time} • ${option.price}</p>
                    <p class="description">${option.description}</p>
                </div>
            </div>
            <button class="select-btn">Select</button>
        `;
        rideOptionsContainer.appendChild(rideOption);
    });
}

// Select payment method
function selectPaymentMethod() {
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('active');
    });
    this.classList.add('active');
}

// Handle menu item clicks
function handleMenuItemClick(e) {
    e.preventDefault();
    const section = this.getAttribute('data-section');
    console.log(`Menu item clicked: ${section}`);
    
    switch(section) {
        case 'profile':
            alert('Profile section would open here');
            break;
        case 'history':
            alert('Ride history would be shown here');
            break;
        case 'payment':
            alert('Payment methods would be managed here');
            break;
        case 'settings':
            showSettingsPanel(e);
            break;
        case 'help':
            alert('Help center would open here');
            break;
    }
    
    toggleMobileMenu(); // Close the side menu
}

// Logout user
function logoutUser() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);