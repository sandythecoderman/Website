// PC Eyes Mouse Tracking
let pcContainer = null;
let leftEye = null;
let rightEye = null;
let isEyeTracking = false;

function initPCEyes() {
    pcContainer = document.querySelector('.pc-monitor'); // Changed from .pc-container to .pc-monitor
    leftEye = document.querySelector('.left-eye .pupil');
    rightEye = document.querySelector('.right-eye .pupil');
    
    console.log('PC Eyes Init:', { pcContainer, leftEye, rightEye });
    
    if (pcContainer && leftEye && rightEye) {
        // Mouse move tracking
        pcContainer.addEventListener('mousemove', handleEyeMouseMove);
        pcContainer.addEventListener('mouseenter', () => { 
            isEyeTracking = true;
            console.log('Eye tracking enabled');
        });
        pcContainer.addEventListener('mouseleave', () => { 
            isEyeTracking = false;
            resetEyePosition();
            console.log('Eye tracking disabled');
        });
        
        // Touch support for mobile
        pcContainer.addEventListener('touchmove', handleEyeTouchMove, { passive: true });
        pcContainer.addEventListener('touchstart', () => { isEyeTracking = true; });
        pcContainer.addEventListener('touchend', () => { 
            isEyeTracking = false;
            resetEyePosition();
        });
        
        console.log('PC Eyes event listeners added successfully');
        
        // Test eye movement on load
        setTimeout(() => {
            console.log('Testing eye movement...');
            leftEye.style.transform = 'translate(calc(-50% + 5px), calc(-50% + 5px))';
            rightEye.style.transform = 'translate(calc(-50% + 5px), calc(-50% + 5px))';
            setTimeout(() => {
                leftEye.style.transform = 'translate(-50%, -50%)';
                rightEye.style.transform = 'translate(-50%, -50%)';
            }, 1000);
        }, 2000);
    } else {
        console.error('PC Eyes elements not found:', { pcContainer, leftEye, rightEye });
    }
}

function handleEyeMouseMove(e) {
    if (!isEyeTracking || !leftEye || !rightEye) {
        console.log('Eye tracking not active:', { isEyeTracking, leftEye, rightEye });
        return;
    }
    
    const rect = pcContainer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    
    // Constrain eye movement to stay within screen boundaries
    const maxEyeMovement = 8; // Reduced for better boundary control
    const eyeX = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaX / centerX) * maxEyeMovement));
    const eyeY = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaY / centerY) * maxEyeMovement));
    
    console.log('Eye movement:', { eyeX, eyeY, mouseX, mouseY, centerX, centerY });
    
    // Apply smooth eye movement with boundary constraints
    // Combine the centering transform with the eye movement
    leftEye.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
    rightEye.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
    
    // Enhanced eye glow effect based on mouse position
    const intensity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / (centerX * 0.8);
    const eyeOuters = document.querySelectorAll('.eye-outer');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const glowColor = currentTheme === 'light' ? '139, 92, 246' : '0, 255, 136';
    
    eyeOuters.forEach(eye => {
        const glowIntensity = Math.min(1, intensity);
        eye.style.boxShadow = `0 0 ${20 + glowIntensity * 15}px rgba(${glowColor}, ${0.8 + glowIntensity * 0.2}), inset 0 0 10px rgba(${glowColor}, 0.3)`;
    });
}

function handleEyeTouchMove(e) {
    if (!isEyeTracking || !leftEye || !rightEye) return;
    
    e.preventDefault();
    const touch = e.touches[0];
    const rect = pcContainer.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    
    const deltaX = touchX - centerX;
    const deltaY = touchY - centerY;
    
    // Constrain eye movement to stay within screen boundaries
    const maxEyeMovement = 6;
    const eyeX = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaX / centerX) * maxEyeMovement));
    const eyeY = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaY / centerY) * maxEyeMovement));
    
    leftEye.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
    rightEye.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
}

function resetEyePosition() {
    if (leftEye && rightEye) {
        leftEye.style.transform = 'translate(-50%, -50%)';
        rightEye.style.transform = 'translate(-50%, -50%)';
        
        const eyeOuters = document.querySelectorAll('.eye-outer');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const glowColor = currentTheme === 'light' ? '139, 92, 246' : '0, 255, 136';
        
        eyeOuters.forEach(eye => {
            eye.style.boxShadow = `0 0 20px rgba(${glowColor}, 0.8), inset 0 0 10px rgba(${glowColor}, 0.3)`;
        });
    }
}

// Enhanced hover effects for PC components
function initPCHoverEffects() {
    const pcMonitor = document.querySelector('.pc-monitor');
    if (!pcMonitor) return;
    
    pcMonitor.addEventListener('mouseenter', () => {
        // Speed up animations on hover
        const screenGlow = pcMonitor.querySelector('.screen-glow');
        const waveformLine = pcMonitor.querySelector('.waveform-line');
        
        if (screenGlow) {
            screenGlow.style.animationDuration = '2s';
            screenGlow.style.opacity = '0.9';
        }
        
        if (waveformLine) {
            waveformLine.style.animationDuration = '1s';
        }
    });
    
    pcMonitor.addEventListener('mouseleave', () => {
        // Reset animation speeds
        const screenGlow = pcMonitor.querySelector('.screen-glow');
        const waveformLine = pcMonitor.querySelector('.waveform-line');
        
        if (screenGlow) {
            screenGlow.style.animationDuration = '4s';
            screenGlow.style.opacity = '0.4';
        }
        
        if (waveformLine) {
            waveformLine.style.animationDuration = '2s';
        }
    });
}

// Dynamic Graph Node Initialization
function initDynamicGraph() {
    const graphNodes = document.querySelectorAll('.graph-node');
    
    graphNodes.forEach(node => {
        const iconClass = node.getAttribute('data-icon');
        if (iconClass) {
            const icon = document.createElement('i');
            icon.className = iconClass;
            node.appendChild(icon);
        }
    });
    
    console.log('Dynamic graph initialized with', graphNodes.length, 'nodes');
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
    
    // Update floating particles color
    updateParticlesColor(theme);
}

function updateParticlesColor(theme) {
    const particles = document.querySelectorAll('.floating-particle');
    const particleColor = theme === 'light' ? '#8b5cf6' : '#00ff88';
    
    particles.forEach(particle => {
        particle.style.background = particleColor;
    });
}

// Simple Style Selector
document.addEventListener('DOMContentLoaded', () => {
    const styleButtons = document.querySelectorAll('.style-btn');
    const visualComponents = document.querySelectorAll('.visual-component');

    styleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedStyle = button.dataset.style;
            
            // Remove active class from all buttons and components
            styleButtons.forEach(btn => btn.classList.remove('active'));
            visualComponents.forEach(comp => comp.classList.remove('active'));
            
            // Add active class to selected button and component
            button.classList.add('active');
            document.getElementById(selectedStyle).classList.add('active');
        });
    });

    // Typing animation for terminal
    const typingTexts = document.querySelectorAll('.typing-text');
    typingTexts.forEach((element, index) => {
        const text = element.dataset.text;
        let i = 0;
        
        setTimeout(() => {
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            typeWriter();
        }, (index + 1) * 1000);
    });
    
    // Initialize PC Eyes functionality
    initPCEyes();
    initPCHoverEffects();
    
    // Initialize ROI functionality
    animateROINumbers();
    initROIHoverEffects();
    
    // Initialize Dynamic Graph
    initDynamicGraph();
});

// Remove smooth scrolling since we're using separate pages now

// Tab Switching for Use Cases
const tabs = document.querySelectorAll('.tab');
const tabPanes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panes
        tabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding pane
        const targetPane = document.getElementById(tab.dataset.tab);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const company = formData.get('company');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !company || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(17, 17, 17, 0.98)';
        }
    } else {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(17, 17, 17, 0.95)';
        }
    }
});

// Intersection Observer for Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.problem-card, .impact-card, .team-member, .engine-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced Neural Network Animation
function createFloatingParticles() {
    const neuralNetwork = document.querySelector('.enhanced-neural-network');
    if (!neuralNetwork) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const particleColor = currentTheme === 'light' ? '#8b5cf6' : '#00ff88';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${particleColor};
            border-radius: 50%;
            opacity: 0.6;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        neuralNetwork.appendChild(particle);
    }
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 0.6;
        }
        90% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) translateX(50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize floating particles
document.addEventListener('DOMContentLoaded', createFloatingParticles);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Counter Animation for Impact Numbers
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (target.toString().includes('%')) {
                element.textContent = Math.floor(start) + '%';
            } else if (target.toString().includes('x')) {
                element.textContent = Math.floor(start) + 'x';
            } else {
                element.textContent = Math.floor(start);
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Observe impact numbers for animation
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target;
            const text = numberElement.textContent;
            
            if (text.includes('%')) {
                const number = parseInt(text);
                animateCounter(numberElement, number + '%');
            } else if (text.includes('x')) {
                const number = parseInt(text);
                animateCounter(numberElement, number + 'x');
            } else if (text === '24/7') {
                // Special case for 24/7 - no animation
                numberElement.style.animation = 'none';
            }
            
            impactObserver.unobserve(numberElement);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const impactNumbers = document.querySelectorAll('.impact-number');
    impactNumbers.forEach(number => {
        impactObserver.observe(number);
    });
});

// ROI Number Animation
function animateROINumbers() {
    const numberElements = document.querySelectorAll('.impact-number[data-value]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = parseInt(element.getAttribute('data-value'));
                animateNumber(element, targetValue);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    numberElements.forEach(element => {
        observer.observe(element);
    });
}

function animateNumber(element, targetValue) {
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const increment = targetValue / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue) + '%';
    }, 16);
}

// Enhanced hover effects for ROI cards
function initROIHoverEffects() {
    const impactCards = document.querySelectorAll('.enhanced-impact-card');
    
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Speed up animations on hover
            const icon = card.querySelector('.impact-icon');
            const particles = card.querySelectorAll('.impact-particles .particle');
            
            if (icon) {
                icon.style.animationDuration = '1.5s';
            }
            
            particles.forEach(particle => {
                particle.style.animationDuration = '2s';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            // Reset animation speeds
            const icon = card.querySelector('.impact-icon');
            const particles = card.querySelectorAll('.impact-particles .particle');
            
            if (icon) {
                icon.style.animationDuration = '3s';
            }
            
            particles.forEach(particle => {
                particle.style.animationDuration = '4s';
            });
        });
    });
}

// Smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll); 