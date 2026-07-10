// ============================================
// VANILLA JAVASCRIPT - Portfolio Interactions
// ============================================

// ========== HAMBURGER MENU ==========

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu on nav link click
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ========== SCROLL ANIMATIONS ==========

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards for animation
const cards = document.querySelectorAll(
    '.feature-card, .skill-category, .project-card, .cert-card, .education-item'
);
cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// ========== SMOOTH SCROLL TRACKING ==========

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function highlightActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = 'var(--primary-color)';
        } else {
            item.style.color = 'var(--text-secondary)';
        }
    });
}

window.addEventListener('scroll', highlightActiveNavLink);

// ========== FORM INTERACTION ==========

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contact buttons interactions
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ========== RESPONSIVE NAVBAR ==========

// Add navbar shadow on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
});

// ========== DOWNLOAD RESUME ==========

// Resume download button
const downloadBtn = document.querySelector('.download-btn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        // The target="_blank" attribute in HTML will handle opening the PDF
    });
}

// ========== EXTERNAL LINKS ==========

// Ensure external links open in new tab
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// ========== KEYBOARD NAVIGATION ==========

// Close mobile menu on Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// ========== DARK MODE DETECTION ==========

// Check for dark mode preference
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
    document.documentElement.style.colorScheme = 'dark';
} else {
    document.documentElement.style.colorScheme = 'light';
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    document.documentElement.style.colorScheme = e.matches ? 'dark' : 'light';
});

// ========== PERFORMANCE OPTIMIZATION ==========

// Lazy load images (if browser supports)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ========== UTILITY FUNCTIONS ==========

// Scroll to top smoothly
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Get current scroll position
function getCurrentScrollPosition() {
    return window.scrollY || document.documentElement.scrollTop;
}

// Debounce function for better performance
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== ANIMATIONS ON LOAD ==========

// Animate hero on page load
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
});

// Add CSS animation to style if needed
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========== ES6+ CONCEPTS SHOWCASE ==========

// Variables — const and let
const portfolioOwner = 'Subham Kumar';
let currentSection = 'home';

// Data Types — string, number, boolean, array, object
const skills = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'];
const portfolioData = {
    name: portfolioOwner,
    role: 'Full-Stack Developer',
    experience: 8,
    projects: 2,
    available: true
};

// Destructuring — object and array
const { name, role, experience } = portfolioData;
const [primarySkill, secondarySkill] = skills;

// Template Literals
const intro = `Hi, I'm ${name} — a ${role} with ${experience}+ months of experience.`;

// Array Methods — map, filter, forEach
const techStack = skills.map(skill => skill.toUpperCase());
const webTech = skills.filter(skill => skill !== 'Node.js');

// Loops — forEach iterating portfolio skills
techStack.forEach(skill => {
    // Each skill is available in the skills section
});

// Functions — named and arrow
function getPortfolioSummary(data) {
    return `${data.name} has built ${data.projects} live projects.`;
}

const formatSkill = (skill) => `• ${skill}`;
const formattedSkills = skills.map(formatSkill);

// ========== PAGE VISIBILITY OPTIMIZATION ==========

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    // Pause or resume animations based on page visibility
});

// ========== END OF SCRIPT ==========
