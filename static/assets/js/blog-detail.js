  // Mobile menu toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                navMenu.classList.remove('active');
            }
        });

        // Smooth scroll for table of contents
        document.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });

        // Theme toggle functionality
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            
            if (document.body.classList.contains('light-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });

        // Add light theme styles
        const style = document.createElement('style');
        style.textContent = `
            .light-theme {
                --dark-gradient: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                --text-primary: #2d3748;
                --text-secondary: #4a5568;
                --glass-bg: rgba(255, 255, 255, 0.7);
                --glass-border: rgba(102, 126, 234, 0.3);
                --menu-bg: rgba(255, 255, 255, 0.95);
            }
            
            .light-theme .blog-detail-content pre {
                background: rgba(0, 0, 0, 0.05);
            }
            
            .light-theme footer {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            }

            .light-theme .tag:hover {
                background: var(--primary-gradient);
                color: white;
            }

            .light-theme .tag {
                background: rgba(255, 255, 255, 0.9);
                border: 2px solid #00f2fe;
                color: #030427;
            }
            
            .light-theme .back-to-blog {
                color: #030427;
                background: rgba(255, 255, 255, 0.7);
                border: 1px solid #00f2fe;
            }

            .light-theme .back-to-blog:hover {
                color: #ffffff;
                background: var(--primary-gradient);
            }
        `;
        document.head.appendChild(style);

                // Footer scroll animation
        const footer = document.getElementById('footer');

        const footerObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('animate');
                }
            });
        }, footerObserverOptions);

        footerObserver.observe(footer);

        // Smooth scroll for footer links
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Add hover effect to tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });

        // Ensure footer stays at bottom
        function adjustFooter() {
            const container = document.querySelector('.blog-detail-container');
            const footer = document.querySelector('footer');
            const windowHeight = window.innerHeight;
            const containerHeight = container.offsetHeight;
            const footerHeight = footer.offsetHeight;
            
            if (containerHeight + footerHeight < windowHeight) {
                container.style.minHeight = (windowHeight - footerHeight - 100) + 'px';
            }
        }
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

        // Adjust on load and resize
        window.addEventListener('load', adjustFooter);
        window.addEventListener('resize', adjustFooter);