// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle && themeIcon) {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

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
}

// Mobile Menu Functionality
const mobileMenuToggle = document.querySelector('.menu-toggle');
const mobileNavMenu = document.querySelector('.nav-menu');

function initializeMobileMenu(toggleBtn, menu) {
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        menu.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.menu-toggle')) {
            menu.classList.remove('active');
            toggleBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            menu.classList.remove('active');
            toggleBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

if (mobileMenuToggle && mobileNavMenu) {
    initializeMobileMenu(mobileMenuToggle, mobileNavMenu);
}

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const originalText = submitBtn.innerHTML;
        
        // DİLƏ UYĞUN: Göndərilir...
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${window.DJANGO_CONTEXT?.translations?.sending}`;
        submitBtn.disabled = true;
        
        const formData = new FormData(this);
        
        fetch('', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken':  window.DJANGO_CONTEXT?.csrfToken || ''
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // DİLƏ UYĞUN: Göndərildi!
                submitBtn.innerHTML = `<i class="fas fa-check"></i> ${window.DJANGO_CONTEXT?.translations?.sentSuccess}`;
                submitBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
                
                // DİLƏ UYĞUN: Uğur mesajı
                showNotification(window.DJANGO_CONTEXT?.translations?.successMessage, 'success');
                
                setTimeout(() => {
                    contactForm.reset();
                    resetSubmitButton();
                }, 2000);
            } else {
                handleFormError(data, submitBtn);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            handleFormError({}, submitBtn);
        });
    });

    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = 'var(--accent-color)';
            }
        });
    });

    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}

function resetSubmitButton() {
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        // DİLƏ UYĞUN: Mesaj Göndər
        submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> ${window.DJANGO_CONTEXT?.translations?.sendMessage}`;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
    }
}

function validateField(field) {
    if (field.value.trim() === '' && field.hasAttribute('required')) {
        field.style.borderColor = 'var(--error-color)';
        
        // DİLƏ UYĞUN: Validation mesajları
        let errorMessage = window.DJANGO_CONTEXT?.translations?.requiredField;
        
        if (field.id === 'name') errorMessage = window.DJANGO_CONTEXT?.translations?.nameRequired;
        if (field.id === 'email') errorMessage = window.DJANGO_CONTEXT?.translations?.emailRequired;
        if (field.id === 'message') errorMessage = window.DJANGO_CONTEXT?.translations?.messageRequired;
        if (field.id === 'subject') errorMessage = window.DJANGO_CONTEXT?.translations?.subjectRequired;
        
        showNotification(errorMessage, 'error');
        return false;
    } else {
        field.style.borderColor = 'var(--glass-border)';
        return true;
    }
}

function handleFormError(data, submitBtn) {
    // DİLƏ UYĞUN: Xəta!
    submitBtn.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${window.DJANGO_CONTEXT?.translations?.error}`;
    submitBtn.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
    
    // DİLƏ UYĞUN: Form xətası
    let errorMessage = window.DJANGO_CONTEXT?.translations?.formError;
    if (data.errors) {
        errorMessage = Object.values(data.errors).flat().join(', ');
    }
    
    showNotification(errorMessage, 'error');
    
    setTimeout(() => {
        resetSubmitButton();
    }, 3000);
}

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