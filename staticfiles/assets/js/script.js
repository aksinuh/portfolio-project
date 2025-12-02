(function() {
    // Script-in bir dəfə yükləndiyini yoxla
    if (window.scriptLoaded) {
        console.log('Script already loaded, skipping...');
        return;
    }
    window.scriptLoaded = true;

    // Enhanced cursor trail effect
    const mouseTrail = [];
    const maxTrailLength = 20;

    // Qalan bütün kodlar burada...
    // Typing effect, animateCounters, createParticles, vs.

})();

// Typing effect for hero section
function typeWriter(element, texts, speed = 120) {
    if (!element) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const typeSpeed = isDeleting ? speed / 2 : speed;
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Animated counter for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    let hasAnimated = false;
    
    if (hasAnimated) return;
    hasAnimated = true;
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + (target === 99 ? '%' : '+');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
            }
        }, 16);
    });
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Notification system - DİLƏ UYĞUN
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = 'info-circle';
    let bgColor = 'var(--accent-color)';
    
    if (type === 'success') {
        icon = 'check-circle';
        bgColor = 'var(--success-color)';
    } else if (type === 'error') {
        icon = 'exclamation-circle';
        bgColor = 'var(--error-color)';
    }
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Skill tags staggered animation
function animateSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px) scale(0.8)';
        tag.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
    });
}

// Theme Toggle Functionality
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const themeIcon = document.querySelector('#themeToggle i');
    
    if (themeIcon) {
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }
}

// Responsive navigation handling
function handleResize() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navActions = document.querySelector('.nav-actions');
    
    if (!mobileToggle || !navMenu || !navActions) return;
    
    if (window.innerWidth <= 968) {
        mobileToggle.style.display = 'block';
        navMenu.style.display = 'none';
        navActions.style.display = 'none';
    } else {
        mobileToggle.style.display = 'none';
        navMenu.style.display = 'flex';
        navActions.style.display = 'flex';
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Enhanced cursor trail effect
let mouseTrail = [];
const maxTrailLength = 20;

function createTrailParticle(x, y) {
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        z-index: 9999;
        left: ${x}px;
        top: ${y}px;
        animation: trailFade 1s ease-out forwards;
    `;
    document.body.appendChild(trail);
    
    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 1000);
}

// Easter egg: Konami code - DİLƏ UYĞUN
function activateMatrixMode() {
    document.body.style.background = 'linear-gradient(135deg, #0c0c0c 0%, #001100 100%)';
    
    document.querySelectorAll('.particle').forEach(particle => {
        particle.style.background = '#00ff00';
        particle.innerHTML = Math.random() > 0.5 ? '0' : '1';
        particle.style.fontSize = '12px';
        particle.style.color = '#00ff00';
        particle.style.textAlign = 'center';
        particle.style.lineHeight = '4px';
    });
    
    const matrixMsg = document.createElement('div');
    matrixMsg.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔓</div>
            <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">${window.DJANGO_CONTEXT?.translations?.matrixMode || 'Matrix Mode Activated!'}</div>
            <div style="font-size: 1rem;">${window.DJANGO_CONTEXT?.translations?.welcomeMatrix || 'Welcome to the code matrix...'}</div>
        </div>
    `;
    matrixMsg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #00ff00;
        padding: 3rem;
        border-radius: 15px;
        z-index: 10000;
        font-family: 'Courier New', monospace;
        text-align: center;
        border: 2px solid #00ff00;
        box-shadow: 0 0 50px rgba(0, 255, 0, 0.3);
    `;
    document.body.appendChild(matrixMsg);
    
    setTimeout(() => {
        location.reload();
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeIcon = document.querySelector('#themeToggle i');
    
    if ((savedTheme === 'light' || (!savedTheme && !prefersDark)) && themeIcon) {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Create particles
    createParticles();
    
    // Start typing animation after delay - DİLƏ UYĞUN
    setTimeout(() => {
        const typingElement = document.getElementById('typingText');
        if (typingElement) {
            const texts = [
                window.DJANGO_CONTEXT?.translations?.typingText1 || 'Python Backend Developer',
                window.DJANGO_CONTEXT?.translations?.typingText2 || 'API Architecture Expert',
                window.DJANGO_CONTEXT?.translations?.typingText3 || 'Microservices Specialist',
                window.DJANGO_CONTEXT?.translations?.typingText4 || 'Full Stack Developer'
            ];
            typeWriter(typingElement, texts, 100);
        }
    }, 3000);

    // Close modal when clicking outside
    const modal = document.getElementById('blogModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBlogModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBlogModal();
        }
    });

    // Loader functionality - DİLƏ UYĞUN
    window.addEventListener('load', () => {
        const loadingMessages = [
            window.DJANGO_CONTEXT?.translations?.loadingMessage1 || 'Initializing backend systems...',
            window.DJANGO_CONTEXT?.translations?.loadingMessage2 || 'Loading Python modules...',
            window.DJANGO_CONTEXT?.translations?.loadingMessage3 || 'Connecting to databases...',
            window.DJANGO_CONTEXT?.translations?.loadingMessage4 || 'Optimizing performance...',
            window.DJANGO_CONTEXT?.translations?.loadingMessage5 || 'Almost ready...'
        ];
        
        let messageIndex = 0;
        const loaderText = document.querySelector('.loader-text');
        const loader = document.getElementById('loader');
        
        if (!loaderText || !loader) return;
        
        const messageInterval = setInterval(() => {
            if (messageIndex < loadingMessages.length) {
                loaderText.textContent = loadingMessages[messageIndex];
                messageIndex++;
            } else {
                clearInterval(messageInterval);
            }
        }, 300);

        setTimeout(() => {
            clearInterval(messageInterval);
            loader.classList.add('hidden');
        }, 2000);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('active');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (mobileMenu && mobileToggle && 
            !mobileMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Navbar scroll effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(() => {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(12, 12, 12, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(12, 12, 12, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, 100));

    // Active navigation highlighting
    window.addEventListener('scroll', throttle(() => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-item');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href')?.substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100));

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation when stats section comes into view
                if (entry.target.querySelector('[data-count]')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // Contact form submission - DİLƏ UYĞUN
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            if (!submitBtn) return;
            
            const originalText = submitBtn.innerHTML;
            
            // Show loading state - DİLƏ UYĞUN
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${window.DJANGO_CONTEXT?.translations?.sending || 'Sending...'}`;
            submitBtn.disabled = true;
            
            // Form məlumatlarını topla
            const formData = new FormData(this);
            
            // AJAX sorğusu göndər - CSRF token ilə
            fetch('', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': window.DJANGO_CONTEXT?.csrfToken || ''
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Uğurlu göndərilmə - DİLƏ UYĞUN
                    submitBtn.innerHTML = `<i class="fas fa-check"></i> ${window.DJANGO_CONTEXT?.translations?.sentSuccess || 'Message Sent!'}`;
                    submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                    
                    // Uğur mesajını göstər - DİLƏ UYĞUN
                    showNotification(window.DJANGO_CONTEXT?.translations?.successMessage || 'Your message has been sent successfully!', 'success');
                    
                    // Formu sıfırla
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        this.reset();
                        
                        // Textarea hündürlüyünü sıfırla
                        const messageTextarea = document.getElementById('message');
                        if (messageTextarea) {
                            messageTextarea.style.height = 'auto';
                        }
                    }, 3000);
                } else {
                    // Xəta mesajı - DİLƏ UYĞUN
                    submitBtn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${window.DJANGO_CONTEXT?.translations?.error || 'Error!'}`;
                    submitBtn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                    
                    // Xəta mesajlarını göstər - DİLƏ UYĞUN
                    let errorMessage = window.DJANGO_CONTEXT?.translations?.formError || 'Form submission failed. Please try again.';
                    if (data.errors) {
                        errorMessage = Object.values(data.errors).flat().join(', ');
                    }
                    showNotification(errorMessage, 'error');
                    
                    // Düyməni yenidən aktiv et
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                    }, 3000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${window.DJANGO_CONTEXT?.translations?.error || 'Error!'}`;
                submitBtn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
                
                showNotification(window.DJANGO_CONTEXT?.translations?.formError || 'Form submission failed. Please try again.', 'error');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            });
        });
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, 100));

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Tech icons hover effects
    document.querySelectorAll('.tech-icon').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    // Project cards enhanced hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Blog cards hover effects
    document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.blog-image i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.blog-image i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Initialize skill tags animation when skills section is visible
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillTags();
                skillsObserver.unobserve(entry.target);
            }
        });
    });

    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) {
        skillsObserver.observe(skillsContainer);
    }

    // Theme toggle event listeners
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', () => {
            toggleTheme();
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    }

    // Mouse trail effect
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (mouseTrail.length > maxTrailLength) {
            mouseTrail.shift();
        }
        
        // Clean up old trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
        
        // Create occasional trail particles
        if (Math.random() > 0.85) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });

    // Konami code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateMatrixMode();
        }
    });

    // Add trail fade animation
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            0% {
                opacity: 0.6;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0.2);
            }
        }
    `;
    document.head.appendChild(trailStyle);

    // Smooth reveal for sections
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    // Tech items hover effects
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.transform = 'translateX(0)';
        });
    });

    // Initial resize handling
    handleResize();
    window.addEventListener('resize', handleResize);
});
        