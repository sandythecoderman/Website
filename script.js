// Navbar Scroll Effect
let lastScrollTop = 0;
let navbar = null;

// PC Eyes Mouse Tracking - REDESIGNED
let pcContainer = null;
let leftPupil = null;
let rightPupil = null;
let isEyeTracking = false;

function initPCEyes() {
    pcContainer = document.body; // Changed to entire page for maximum trigger area
    leftPupil = document.querySelector('.left-pupil');
    rightPupil = document.querySelector('.right-pupil');
    
    console.log('PC Eyes Init:', { pcContainer, leftPupil, rightPupil });
    
    if (pcContainer && leftPupil && rightPupil) {
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
        
        // Click animation for eyes
        pcContainer.addEventListener('click', handleEyeClick);
        
        console.log('PC Eyes event listeners added successfully');
        
        // Test eye movement on load
        setTimeout(() => {
            console.log('Testing eye movement...');
            leftPupil.style.transform = 'translate(calc(-50% + 10px), calc(-50% + 10px))';
            rightPupil.style.transform = 'translate(calc(-50% + 10px), calc(-50% + 10px))';
            setTimeout(() => {
                leftPupil.style.transform = 'translate(-50%, -50%)';
                rightPupil.style.transform = 'translate(-50%, -50%)';
            }, 1000);
        }, 2000);
    } else {
        console.error('PC Eyes elements not found:', { pcContainer, leftPupil, rightPupil });
    }
}

function handleEyeMouseMove(e) {
    if (!isEyeTracking || !leftPupil || !rightPupil) {
        console.log('Eye tracking not active:', { isEyeTracking, leftPupil, rightPupil });
        return;
    }
    
    // Get the PC monitor element for proper positioning
    const pcMonitor = document.querySelector('.pc-monitor');
    if (!pcMonitor) return;
    
    const rect = pcMonitor.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;
    
    // Constrain eye movement to stay within screen boundaries
    const maxEyeMovement = 18; // Increased for more visible movement
    const eyeX = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaX / centerX) * maxEyeMovement));
    const eyeY = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaY / centerY) * maxEyeMovement));
    
    console.log('Eye movement:', { eyeX, eyeY, mouseX, mouseY, centerX, centerY });
    
    // Apply smooth eye movement with boundary constraints
    leftPupil.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
    rightPupil.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
    
    // Enhanced eye glow effect based on mouse position
    const intensity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / (centerX * 0.5);
    const eyeWhites = document.querySelectorAll('.eye-white');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const glowColor = currentTheme === 'light' ? '139, 92, 246' : '0, 255, 136';
    
    eyeWhites.forEach(eye => {
        const glowIntensity = Math.min(1, intensity);
        eye.style.boxShadow = `0 0 ${40 + glowIntensity * 30}px rgba(${glowColor}, ${1 + glowIntensity * 0.4}), inset 0 0 20px rgba(${glowColor}, 0.6)`;
    });
}

function handleEyeTouchMove(e) {
    if (!isEyeTracking || !leftPupil || !rightPupil) return;
    
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
    const maxEyeMovement = 18;
    const eyeX = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaX / centerX) * maxEyeMovement));
    const eyeY = Math.max(-maxEyeMovement, Math.min(maxEyeMovement, (deltaY / centerY) * maxEyeMovement));
    
    leftPupil.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
    rightPupil.style.transform = `translate(calc(-50% + ${eyeX}px), calc(-50% + ${eyeY}px))`;
}

function resetEyePosition() {
    if (leftPupil && rightPupil) {
        leftPupil.style.transform = 'translate(-50%, -50%)';
        rightPupil.style.transform = 'translate(-50%, -50%)';
        
        const eyeWhites = document.querySelectorAll('.eye-white');
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const glowColor = currentTheme === 'light' ? '139, 92, 246' : '0, 255, 136';
        
        eyeWhites.forEach(eye => {
            eye.style.boxShadow = `0 0 40px rgba(${glowColor}, 1), inset 0 0 20px rgba(${glowColor}, 0.6)`;
        });
    }
}

// Click animation for eyes
function handleEyeClick(e) {
    if (!leftPupil || !rightPupil) return;
    
    // Detect current theme
    const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';
    const accentColor = isLightMode ? '#8b5cf6' : '#00ff88';
    const accentColorRgba = isLightMode ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0, 255, 136, 0.2)';
    const glowColor = isLightMode ? 'rgba(139, 92, 246, 1)' : 'rgba(0, 255, 136, 1)';
    const glowColorDim = isLightMode ? 'rgba(139, 92, 246, 0.6)' : 'rgba(0, 255, 136, 0.6)';
    
    // Create a ripple effect at click position
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = (e.clientX - 25) + 'px';
    ripple.style.top = (e.clientY - 25) + 'px';
    ripple.style.width = '50px';
    ripple.style.height = '50px';
    ripple.style.border = '2px solid ' + accentColor;
    ripple.style.borderRadius = '50%';
    ripple.style.background = accentColorRgba;
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1000';
    ripple.style.animation = 'ripple 0.6s ease-out forwards';
    document.body.appendChild(ripple);
    
    // Eye blink animation
    const eyeWhites = document.querySelectorAll('.eye-white');
    const pupils = [leftPupil, rightPupil];
    
    // Blink effect - close eyes
    eyeWhites.forEach(eye => {
        eye.style.transform = 'scaleY(0.1)';
        eye.style.transition = 'transform 0.1s ease';
    });
    
    pupils.forEach(pupil => {
        pupil.style.transform = 'translate(-50%, -50%) scale(0.1)';
        pupil.style.transition = 'transform 0.1s ease';
    });
    
    // Open eyes after blink
    setTimeout(() => {
        eyeWhites.forEach(eye => {
            eye.style.transform = 'scaleY(1)';
            eye.style.transition = 'transform 0.15s ease';
        });
        
        pupils.forEach(pupil => {
            pupil.style.transform = 'translate(-50%, -50%) scale(1)';
            pupil.style.transition = 'transform 0.15s ease';
        });
    }, 100);
    
    // Pulse glow effect
    setTimeout(() => {
        eyeWhites.forEach(eye => {
            eye.style.boxShadow = '0 0 60px ' + glowColor;
            setTimeout(() => {
                eye.style.boxShadow = '0 0 20px ' + glowColorDim;
            }, 200);
        });
    }, 150);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
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
    // Add click animation
    themeToggle.classList.add('clicked');
    
    // Remove animation class after animation completes
    setTimeout(() => {
        themeToggle.classList.remove('clicked');
    }, 600);
    
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

// Remove the old animation observer that was causing conflicts
// document.addEventListener('DOMContentLoaded', () => {
//     const impactNumbers = document.querySelectorAll('.impact-number');
//     impactNumbers.forEach(number => {
//         impactObserver.observe(number);
//     });
// });

// ROI Number Animation
function animateROINumbers() {
    const numberElements = document.querySelectorAll('.impact-number[data-value]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetValue = element.getAttribute('data-value');
                
                // Check if the value is numeric (for percentage animation)
                if (!isNaN(parseInt(targetValue)) && targetValue !== "24/7") {
                    animateNumber(element, parseInt(targetValue));
                } else {
                    // For non-numeric values like "24/7", just ensure it's displayed correctly
                    element.textContent = targetValue;
                }
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

// Synapse section animations
function initSynapseAnimations() {
    const sectionTitle = document.querySelector('.section-title');
    const synapseDiagram = document.querySelector('.enhanced-synapse-diagram');
    const synapseInput = document.querySelector('.synapse-input');
    const synapseOutput = document.querySelector('.synapse-output');
    const synapseCore = document.querySelector('.synapse-core-enhanced');
    
    // Section title click animation
    if (sectionTitle) {
        sectionTitle.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.left = (e.clientX - 25) + 'px';
            ripple.style.top = (e.clientY - 25) + 'px';
            ripple.style.width = '50px';
            ripple.style.height = '50px';
            ripple.style.border = '2px solid #00ff88';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 255, 136, 0.2)';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '1000';
            ripple.style.animation = 'ripple 0.6s ease-out forwards';
            document.body.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    }
    
    // Synapse diagram click animation
    if (synapseDiagram) {
        synapseDiagram.addEventListener('click', (e) => {
            // Create particle burst effect
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.left = (e.clientX - 5) + 'px';
                particle.style.top = (e.clientY - 5) + 'px';
                particle.style.width = '10px';
                particle.style.height = '10px';
                particle.style.background = '#00ff88';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1000';
                particle.style.animation = `particle-burst 0.8s ease-out forwards`;
                particle.style.transform = `translate(${Math.cos(i * 45 * Math.PI / 180) * 100}px, ${Math.sin(i * 45 * Math.PI / 180) * 100}px)`;
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 800);
            }
        });
    }
    
    // Individual component click effects
    [synapseInput, synapseOutput, synapseCore].forEach(component => {
        if (component) {
            component.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering diagram click
                
                // Create glow effect
                const glow = document.createElement('div');
                glow.style.position = 'absolute';
                glow.style.left = (e.clientX - 30) + 'px';
                glow.style.top = (e.clientY - 30) + 'px';
                glow.style.width = '60px';
                glow.style.height = '60px';
                glow.style.background = 'radial-gradient(circle, rgba(0, 255, 136, 0.6) 0%, transparent 70%)';
                glow.style.borderRadius = '50%';
                glow.style.pointerEvents = 'none';
                glow.style.zIndex = '999';
                glow.style.animation = 'glow-pulse 0.5s ease-out forwards';
                document.body.appendChild(glow);
                
                setTimeout(() => {
                    if (glow.parentNode) {
                        glow.parentNode.removeChild(glow);
                    }
                }, 500);
            });
        }
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

// Matrix Background Animation
let matrixCanvas, matrixCtx;
let matrixChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let matrixDrops = [];
let mouseX = 0, mouseY = 0;
let isMouseMoving = false;
let mouseTimeout;

function initMatrixAnimation() {
    matrixCanvas = document.getElementById('matrixCanvas');
    if (!matrixCanvas) return;
    
    matrixCtx = matrixCanvas.getContext('2d');
    
        // Set canvas size
    function resizeCanvas() {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
        
        // Recalculate columns after resize
        const fontSize = currentTheme === 'light' ? 18 : 16;
        const newColumns = Math.floor(matrixCanvas.width / fontSize);
        
        // Adjust drops array if needed
        if (newColumns > matrixDrops.length) {
            for (let i = matrixDrops.length; i < newColumns; i++) {
                matrixDrops[i] = 1;
            }
        } else if (newColumns < matrixDrops.length) {
            matrixDrops.length = newColumns;
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize drops
    const fontSize = currentTheme === 'light' ? 18 : 16;
    const columns = Math.floor(matrixCanvas.width / fontSize);

    for (let i = 0; i < columns; i++) {
        matrixDrops[i] = 1;
    }
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    });
    
    // Start animation
    animateMatrix();
}

function animateMatrix() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const textColor = currentTheme === 'light' ? '#4c1d95' : '#00ff88';

    // Clear canvas with fade effect
    if (currentTheme === 'light') {
        matrixCtx.fillStyle = `rgba(255, 255, 255, 0.05)`;
    } else {
        matrixCtx.fillStyle = `rgba(0, 0, 0, 0.05)`;
    }
    matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    // Set text properties
    matrixCtx.fillStyle = textColor;
    matrixCtx.font = currentTheme === 'light' ? '18px monospace' : '16px monospace';
    
    const fontSize = currentTheme === 'light' ? 18 : 16;
    const columns = Math.floor(matrixCanvas.width / fontSize);
    
    // Ensure we have enough drops for all columns
    while (matrixDrops.length < columns) {
        matrixDrops.push(1);
    }
    
    // Draw matrix characters
    for (let i = 0; i < columns; i++) {
        // Get random character
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Calculate position
        const x = i * fontSize + (fontSize / 2);
        const y = matrixDrops[i] * fontSize;
        
        // Mouse interaction - intensify around cursor
        const distanceFromMouse = Math.sqrt((mouseX - x) * (mouseX - x) + (mouseY - y) * (mouseY - y));
        const mouseRadius = 100;
        
        if (distanceFromMouse < mouseRadius && isMouseMoving) {
            // Intensify effect around mouse
            matrixCtx.fillStyle = currentTheme === 'light' ? 
                `rgba(76, 29, 149, ${0.9 + (mouseRadius - distanceFromMouse) / mouseRadius * 0.1})` :
                `rgba(0, 255, 136, ${0.8 + (mouseRadius - distanceFromMouse) / mouseRadius * 0.2})`;
            
            // Add glow effect
            matrixCtx.shadowBlur = currentTheme === 'light' ? 15 : 10;
            matrixCtx.shadowColor = textColor;
        } else {
            matrixCtx.fillStyle = textColor;
            matrixCtx.shadowBlur = 0;
        }
        
        // Draw character
        matrixCtx.fillText(char, x, y);
        
        // Reset shadow
        matrixCtx.shadowBlur = 0;
        
        // Move drop down
        if (y > matrixCanvas.height && Math.random() > 0.975) {
            matrixDrops[i] = 0;
        }
        matrixDrops[i]++;
    }
    
    requestAnimationFrame(animateMatrix);
}

// Navbar functionality
function initNavbar() {
    navbar = document.querySelector('.navbar');
    
    if (navbar) {
        // Add scroll effect
        window.addEventListener('scroll', handleNavbarScroll);
        
        // Add hover detection area at top of page
        const hoverArea = document.createElement('div');
        hoverArea.style.position = 'fixed';
        hoverArea.style.top = '0';
        hoverArea.style.left = '0';
        hoverArea.style.width = '100%';
        hoverArea.style.height = '20px';
        hoverArea.style.zIndex = '999';
        hoverArea.style.pointerEvents = 'auto';
        hoverArea.style.cursor = 'default';
        document.body.appendChild(hoverArea);
        
        // Show navbar when hovering near top
        hoverArea.addEventListener('mouseenter', () => {
            navbar.classList.remove('hidden');
        });
        
        // Hide navbar when leaving top area (if scrolling down)
        hoverArea.addEventListener('mouseleave', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 150) {
                navbar.classList.add('hidden');
            }
        });
        
        // Add hover effects to nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.style.animationDelay = `${index * 0.1}s`;
            link.style.animation = 'nav-link-fade-in 0.6s ease forwards';
            
            // Add click effect
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(0, 255, 136, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
                ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
                ripple.style.width = ripple.style.height = '20px';
                ripple.style.pointerEvents = 'none';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
        
        // Add logo glow effect
        const logo = document.querySelector('.nav-logo h2');
        if (logo) {
            logo.addEventListener('mouseenter', function() {
                this.style.animation = 'logo-glow 2s ease-in-out infinite';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        }
        
        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                // Animate hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach((bar, index) => {
                    if (hamburger.classList.contains('active')) {
                        if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                        if (index === 1) bar.style.opacity = '0';
                        if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                    } else {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    }
                });
            });
        }
    }
}

function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Smart navbar visibility - hide when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            // Scrolling down - hide navbar
            navbar.classList.add('hidden');
        } else if (scrollTop < lastScrollTop) {
            // Scrolling up - show navbar
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    }
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
    
    // Initialize Matrix Animation
    initMatrixAnimation();
    
    // Initialize Navbar
    initNavbar();
    
    // Initialize PC Eyes
    initPCEyes();
    
    // Initialize other components
    initDynamicGraph();
    initPCHoverEffects();
    initROIHoverEffects();
    initSynapseAnimations();
    
    // Initialize About Us page enhancements
    // Team modals and statistics removed
    
    // Fix 24/7 display immediately
    const proactiveMonitoringElement = document.querySelector('.impact-number[data-value="24/7"]');
    if (proactiveMonitoringElement) {
        proactiveMonitoringElement.textContent = '24/7';
    }
});

window.addEventListener('scroll', revealOnScroll);

// Team modal functionality removed

// Statistics animation removed 

// Industries Slider Functionality
function initIndustriesSlider() {
    const slider = document.getElementById('industriesSlider');
    const slides = document.querySelectorAll('.industry-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!slider || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isTransitioning = false;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSlider() {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Add active class to current dot
        dots[currentSlide].classList.add('active');
        
        // Smooth slide transition
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.style.transform = 'translateX(0)';
                slide.style.opacity = '1';
                slide.classList.add('active');
            } else {
                slide.style.transform = 'translateX(100%)';
                slide.style.opacity = '0';
                slide.classList.remove('active');
            }
        });
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
    
    function nextSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        resetAutoPlay();
    }
    
    function prevSlide() {
        if (isTransitioning) return;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        resetAutoPlay();
    }
    
    function goToSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        currentSlide = index;
        updateSlider();
        resetAutoPlay();
    }
    
    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        autoPlayInterval = setInterval(nextSlide, 6000);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 6000);
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Pause auto-play on hover
    slider.addEventListener('mouseenter', () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Initialize first slide
    updateSlider();
    
    // Auto-play is disabled by default - uncomment the line below to enable
    // startAutoPlay();
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initIndustriesSlider();
}); 