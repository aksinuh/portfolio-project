// Theme Toggle Functionality
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme or prefer color scheme
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set initial theme
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            document.body.classList.add('light-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });

        // Contact Form Functionality
        const contactForm = document.getElementById('contactForm');
        const submitBtn = contactForm.querySelector('.submit-btn');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 3000);
            }, 2000);
        });

        // Notification System
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

        // Form Validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '' && this.hasAttribute('required')) {
                    this.style.borderColor = 'var(--error-color)';
                } else {
                    this.style.borderColor = 'var(--glass-border)';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.style.borderColor = 'var(--accent-color)';
                }
            });
        });

        // Contact Items Animation
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = `all 0.6s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 500 + index * 200);
        });

        // Social Links Animation
        const socialLinks = document.querySelectorAll('.social-link-contact');
        
        socialLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'scale(0)';
            link.style.transition = `all 0.4s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'scale(1)';
            }, 1000 + index * 100);
        });

        // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
            }
        });

        // Auto-resize textarea
        const messageTextarea = document.getElementById('message');
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        console.log('📞 Contact səhifəsi gündüz/gecə modu ilə hazırdır!');