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

        // Filter functionality
        const filterTags = document.querySelectorAll('.filter-tag');
        const projectCards = document.querySelectorAll('.project-card');
        const searchInput = document.getElementById('searchInput');

        filterTags.forEach(tag => {
            tag.addEventListener('click', () => {
                filterTags.forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                
                const category = tag.dataset.category;
                
                projectCards.forEach(card => {
                    if (category === 'all' || card.dataset.category.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Stat Cards Animation
        document.addEventListener('DOMContentLoaded', function() {
            const statCards = document.querySelectorAll('.stat-card');
            const statNumbers = document.querySelectorAll('.stat-number');
            
            // Intersection Observer for scroll animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Start counting animation
                        if (entry.target.querySelector('.stat-number')) {
                            animateCounter(entry.target.querySelector('.stat-number'));
                        }
                    }
                });
            }, { threshold: 0.5 });

            statCards.forEach(card => {
                observer.observe(card);
            });

            // Counter Animation Function
            function animateCounter(element) {
                const target = parseInt(element.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        element.textContent = target + (target === 99 ? '%' : '+');
                        clearInterval(timer);
                    } else {
                        element.textContent = Math.floor(current) + (target === 99 ? '%' : '+');
                    }
                }, 16);
            }

            // Hover effects for progress bars
            statCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const progressBar = this.querySelector('.stat-progress-bar');
                    progressBar.style.width = '100%';
                });

                card.addEventListener('mouseleave', function() {
                    const progressBar = this.querySelector('.stat-progress-bar');
                    setTimeout(() => {
                        progressBar.style.width = '0%';
                    }, 500);
                });
            });

            // Click effects
            statCards.forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                });
            });

            // Random color pulse on hover
            statCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    const colors = [
                        'rgba(0, 242, 254, 0.4)',
                        'rgba(102, 126, 234, 0.4)',
                        'rgba(118, 75, 162, 0.4)',
                        'rgba(240, 147, 251, 0.4)'
                    ];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    this.style.setProperty('--pulse-color', randomColor);
                });
            });
        });

        // Parallax effect for stats section
        window.addEventListener('scroll', function() {
            const statsSection = document.querySelector('.project-stats');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            statsSection.style.transform = `translateY(${rate}px)`;
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const statCards = document.querySelectorAll('.stat-card');
            let currentIndex = Array.from(statCards).findIndex(card => 
                card === document.activeElement
            );

            if (e.key === 'ArrowRight' && currentIndex < statCards.length - 1) {
                statCards[currentIndex + 1].focus();
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                statCards[currentIndex - 1].focus();
            }
        });

        // Touch device optimizations
        let touchStartY = 0;
        document.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const diff = touchStartY - touchY;
            
            if (Math.abs(diff) > 10) {
                document.querySelectorAll('.stat-card').forEach(card => {
                    card.style.transform = `translateY(${diff * 0.1}px)`;
                });
            }
        });

        document.addEventListener('touchend', function() {
            document.querySelectorAll('.stat-card').forEach(card => {
                card.style.transform = '';
            });
        });

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('.project-title').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const category = card.dataset.category.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Smooth reveal animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
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

        console.log('🚀 Projects səhifəsi gündüz/gecə modu ilə hazırdır!');