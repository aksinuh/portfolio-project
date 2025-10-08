// Blog data for modal content
        const blogPosts = {
            blog1: {
                title: "Building Scalable APIs with FastAPI",
                content: `
                    <h3>Introduction</h3>
                    <p>FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints. In this comprehensive guide, we'll explore how to build scalable APIs that can handle millions of requests.</p>
                    
                    <h3>Key Features of FastAPI</h3>
                    <p>FastAPI provides automatic API documentation, data validation, serialization, and authentication. Its async capabilities make it perfect for high-performance applications that need to handle concurrent requests efficiently.</p>
                    
                    <h3>Performance Optimization</h3>
                    <p>We'll cover database connection pooling, caching strategies with Redis, and async/await patterns to maximize your API's performance. Learn how to implement proper error handling and request validation.</p>
                    
                    <h3>Best Practices</h3>
                    <p>Discover industry best practices for API design, security measures, testing strategies, and deployment techniques that will make your FastAPI applications production-ready.</p>
                `
            },
            blog2: {
                title: "PostgreSQL Performance Optimization",
                content: `
                    <h3>Database Performance Fundamentals</h3>
                    <p>PostgreSQL is a powerful open-source relational database system, but proper configuration and optimization are crucial for achieving peak performance in production environments.</p>
                    
                    <h3>Indexing Strategies</h3>
                    <p>Learn about different index types including B-tree, Hash, GIN, and GiST indexes. Understand when to use each type for optimal query performance and how to avoid common indexing pitfalls.</p>
                    
                    <h3>Query Optimization</h3>
                    <p>Master the art of reading and interpreting EXPLAIN plans, understanding query execution paths, and writing efficient SQL queries that scale with your data growth.</p>
                    
                    <h3>Connection Pooling</h3>
                    <p>Implement connection pooling with PgBouncer and optimize connection management for high-traffic applications. Learn about connection limits and performance tuning.</p>
                `
            },
            blog3: {
                title: "Containerizing Python Applications",
                content: `
                    <h3>Docker Fundamentals</h3>
                    <p>Docker revolutionizes application deployment by providing consistent environments across different platforms. Learn the basics of containerization and why it's essential for modern development.</p>
                    
                    <h3>Multi-stage Builds</h3>
                    <p>Discover how to create efficient Docker images using multi-stage builds to reduce image size, improve security, and optimize build times for your Python applications.</p>
                    
                    <h3>Security Best Practices</h3>
                    <p>Implement security measures in Docker containers, including running as non-root users, image scanning, vulnerability management, and secure secrets handling.</p>
                    
                    <h3>Deployment Strategies</h3>
                    <p>Explore different deployment options including Docker Swarm, Kubernetes, and cloud-native solutions. Learn about container orchestration and scaling strategies.</p>
                `
            },
            blog4: {
                title: "API Security Best Practices",
                content: `
                    <h3>Authentication & Authorization</h3>
                    <p>Implement robust authentication systems using JWT tokens, OAuth2, and API keys. Learn about different authentication methods and when to use each approach for securing your endpoints.</p>
                    
                    <h3>Rate Limiting</h3>
                    <p>Protect your APIs from abuse and DoS attacks using rate limiting strategies and throttling mechanisms. Implement both per-user and global rate limits effectively.</p>
                    
                    <h3>Input Validation</h3>
                    <p>Prevent injection attacks and data corruption through comprehensive input validation and sanitization techniques. Learn about request validation and data normalization.</p>
                    
                    <h3>Monitoring & Logging</h3>
                    <p>Set up comprehensive monitoring and logging systems to detect and respond to security threats. Implement audit trails and security event logging.</p>
                `
            },
            blog5: {
                title: "Integrating ML Models in Production",
                content: `
                    <h3>Model Serving Architecture</h3>
                    <p>Design scalable architectures for serving machine learning models in production environments. Learn about different serving patterns and when to use each approach.</p>
                    
                    <h3>Model Versioning</h3>
                    <p>Implement effective model versioning strategies to manage different model iterations, enable safe rollbacks, and maintain model lineage for reproducibility.</p>
                    
                    <h3>Performance Monitoring</h3>
                    <p>Monitor model performance in production, detect model drift, and implement automated retraining pipelines to maintain model accuracy over time.</p>
                    
                    <h3>A/B Testing</h3>
                    <p>Implement A/B testing frameworks to safely deploy and evaluate new model versions, compare model performance, and make data-driven decisions about model updates.</p>
                `
            },
            blog6: {
                title: "Microservices vs Monolith",
                content: `
                    <h3>Architecture Comparison</h3>
                    <p>Understand the fundamental differences between microservices and monolithic architectures, including their respective advantages, challenges, and use cases.</p>
                    
                    <h3>When to Use Each</h3>
                    <p>Learn decision frameworks for choosing the right architecture based on team size, project complexity, scalability requirements, and business constraints.</p>
                    
                    <h3>Migration Strategies</h3>
                    <p>Explore step-by-step approaches for migrating from monolith to microservices, including the strangler fig pattern, database decomposition, and service boundary identification.</p>
                    
                    <h3>Challenges & Solutions</h3>
                    <p>Address common pitfalls in microservices adoption, including service discovery, data consistency, distributed tracing, and inter-service communication patterns.</p>
                `
            }
        };

        // Blog modal functions
        function openBlogModal(blogId) {
            const modal = document.getElementById('blogModal');
            const title = document.getElementById('blogModalTitle');
            const body = document.getElementById('blogModalBody');
            
            if (blogPosts[blogId]) {
                title.textContent = blogPosts[blogId].title;
                body.innerHTML = blogPosts[blogId].content;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeBlogModal() {
            const modal = document.getElementById('blogModal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.getElementById('blogModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeBlogModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeBlogModal();
            }
        });

        // Loader functionality
        window.addEventListener('load', () => {
            const loadingMessages = [
                'Initializing backend systems...',
                'Loading Python modules...',
                'Connecting to databases...',
                'Optimizing performance...',
                'Almost ready...'
            ];
            
            let messageIndex = 0;
            const loaderText = document.querySelector('.loader-text');
            
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
                document.getElementById('loader').classList.add('hidden');
            }, 2000);
        });

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
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

        // Typing effect for hero section
        function typeWriter(element, texts, speed = 120) {
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
                    document.getElementById('mobileMenu').classList.remove('active');
                }
            });
        });

        // Mobile menu toggle
        document.getElementById('mobileToggle').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('mobileMenu').classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileToggle = document.getElementById('mobileToggle');
            
            if (!mobileMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });

        // Navbar scroll effects
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
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
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
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
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

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

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                    
                    // Show success notification
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                }, 3000);
            }, 2000);
        });

        // Notification system
        function showNotification(message, type = 'info') {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: ${type === 'success' ? 'var(--success-color)' : 'var(--accent-color)'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                z-index: 10001;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
            }, 4000);
        }

        // Scroll to top functionality
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

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

        // Responsive navigation handling
        function handleResize() {
            const mobileToggle = document.getElementById('mobileToggle');
            const navMenu = document.getElementById('navMenu');
            const navActions = document.querySelector('.nav-actions');
            
            if (window.innerWidth <= 968) {
                mobileToggle.style.display = 'block';
                navMenu.style.display = 'none';
                navActions.style.display = 'none';
            } else {
                mobileToggle.style.display = 'none';
                navMenu.style.display = 'flex';
                navActions.style.display = 'flex';
                document.getElementById('mobileMenu').classList.remove('active');
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            // Create particles
            createParticles();
            
            // Start typing animation after delay
            setTimeout(() => {
                const typingElement = document.getElementById('typingText');
                const texts = [
                    'Python Backend Developer',
                    'API Architecture Expert',
                    'Cloud Solutions Engineer',
                    'Microservices Specialist',
                    'DevOps Enthusiast',
                    'Full Stack Developer'
                ];
                typeWriter(typingElement, texts, 100);
            }, 3000);
        });

        // Enhanced cursor trail effect
        let mouseTrail = [];
        const maxTrailLength = 20;

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

        // Easter egg: Konami code
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                activateMatrixMode();
            }
        });

        function activateMatrixMode() {
            // Change background and particles to matrix theme
            document.body.style.background = 'linear-gradient(135deg, #0c0c0c 0%, #001100 100%)';
            
            document.querySelectorAll('.particle').forEach(particle => {
                particle.style.background = '#00ff00';
                particle.innerHTML = Math.random() > 0.5 ? '0' : '1';
                particle.style.fontSize = '12px';
                particle.style.color = '#00ff00';
                particle.style.textAlign = 'center';
                particle.style.lineHeight = '4px';
            });
            
            // Show matrix message
            const matrixMsg = document.createElement('div');
            matrixMsg.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔓</div>
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">Matrix Mode Activated!</div>
                    <div style="font-size: 1rem;">Welcome to the code matrix...</div>
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
            
            // Reset after 5 seconds
            setTimeout(() => {
                location.reload();
            }, 5000);
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

        // Console welcome message
        console.log(`
        🚀 Welcome to John Smith's Portfolio!
        
        ═══════════════════════════════════════
        
        Built with:
        ✓ HTML5 & CSS3 (Advanced)
        ✓ Vanilla JavaScript (ES6+)
        ✓ CSS Grid & Flexbox
        ✓ CSS Animations & Transitions
        ✓ Intersection Observer API
        ✓ Responsive Design
        ✓ Performance Optimizations
        
        Features:
        ✓ Loading screen with messages
        ✓ Animated tech orbit around profile
        ✓ Typing text animation
        ✓ Smooth scroll animations
        ✓ Blog modal system
        ✓ Contact form with validation
        ✓ Mobile responsive design
        ✓ Scroll to top functionality
        ✓ Easter egg (Konami code)
        ✓ Cursor trail effects
        ✓ Performance optimized
        
        ═══════════════════════════════════════
        
        📧 Contact: john.smith@email.com
        🌐 Let's build something amazing together!
        
        Try the Konami code: ↑↑↓↓←→←→BA
        `);

        // Initialize performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page loaded in ${loadTime}ms`);
            });
        }

        // Add smooth reveal for sections
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

        const techItems = document.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                item.addEventListener('mouseenter', function () {
                    this.style.transform = 'translateX(10px)';
                });

                item.addEventListener('mouseleave', function () {
                    this.style.transform = 'translateX(0)';
                });
            });

            console.log('🚀 Footer yükləndi və əsas skriptlə birləşdirildi!');

        