// Dark mode functionality
let isDarkMode = false;

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    // Toggle dark class on body
    if (isDarkMode) {
        document.body.classList.add('dark');
    } else {
        document.body.classList.remove('dark');
    }
    
    // Update icon visibility for desktop
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');
    
    if (moonIcon && sunIcon) {
        if (isDarkMode) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        } else {
            moonIcon.classList.remove('hidden');
            sunIcon.classList.add('hidden');
        }
    }
    
    // Update icon visibility for mobile
    const moonIconMobile = document.getElementById('moonIconMobile');
    const sunIconMobile = document.getElementById('sunIconMobile');
    
    if (moonIconMobile && sunIconMobile) {
        if (isDarkMode) {
            moonIconMobile.classList.add('hidden');
            sunIconMobile.classList.remove('hidden');
        } else {
            moonIconMobile.classList.remove('hidden');
            sunIconMobile.classList.add('hidden');
        }
    }
    
    // Store preference in localStorage
    localStorage.setItem('darkMode', isDarkMode.toString());
}

// Mobile menu functionality
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    
    if (mobileMenu) {
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    }
    
    if (menuIcon && closeIcon) {
        if (isMobileMenuOpen) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }
}

// Initialize the application
function init() {
    // Check for stored dark mode preference
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
        isDarkMode = true;
        document.body.classList.add('dark');
        
        // Update icons
        const moonIcon = document.getElementById('moonIcon');
        const sunIcon = document.getElementById('sunIcon');
        const moonIconMobile = document.getElementById('moonIconMobile');
        const sunIconMobile = document.getElementById('sunIconMobile');
        
        if (moonIcon && sunIcon) {
            moonIcon.classList.add('hidden');
            sunIcon.classList.remove('hidden');
        }
        
        if (moonIconMobile && sunIconMobile) {
            moonIconMobile.classList.add('hidden');
            sunIconMobile.classList.remove('hidden');
        }
    }
    
    // Add event listeners for dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }
    
    // Add event listener for mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobileMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        
        if (isMobileMenuOpen && 
            mobileMenu && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click handlers for promotional cards
    const promoCards = document.querySelectorAll('.card .btn-primary');
    promoCards.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple alert for demo purposes
            // In a real application, this would navigate to the appropriate page
            const cardTitle = this.closest('.card').querySelector('h3');
            const title = cardTitle ? cardTitle.textContent : 'promotion';
            
            alert(`You clicked on: ${title}\n\nIn a real application, this would redirect to the ${title.toLowerCase()} page or show a signup modal.`);
        });
    });
    
    // Add click handlers for quick link cards
    const quickLinkCards = document.querySelectorAll('.card .btn-outline');
    quickLinkCards.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cardTitle = this.closest('.card').querySelector('h3');
            const title = cardTitle ? cardTitle.textContent : 'betting option';
            
            alert(`You clicked on: ${title}\n\nIn a real application, this would redirect to the ${title} betting page.`);
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for scroll animations
    const animatedElements = document.querySelectorAll('.card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Run initialization when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize to close mobile menu
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isMobileMenuOpen) {
        toggleMobileMenu();
    }
});

// Add some utility functions for future enhancements
const utils = {
    // Format currency
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },
    
    // Format odds
    formatOdds: (odds) => {
        const num = parseFloat(odds);
        return num > 0 ? `+${num}` : `${num}`;
    },
    
    // Debounce function for performance
    debounce: (func, wait) => {
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
};

// Export utils for potential use
window.WagerWebUtils = utils;