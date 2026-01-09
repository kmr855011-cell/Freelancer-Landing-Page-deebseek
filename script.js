// =============================
// تهيئة الصفحة والأحداث
// =============================
document.addEventListener('DOMContentLoaded', function() {
    // تعيين سنة حقوق النشر الحالية
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // تهيئة القائمة المتحركة للهواتف
    initMobileMenu();
    
    // تهيئة نموذج التواصل
    initContactForm();
    
    // إضافة تأثير التمرير السلس للروابط الداخلية
    initSmoothScrolling();
});

// =============================
// القائمة المتحركة للهواتف
// =============================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // حدث النقر على زر القائمة
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // إغلاق القائمة عند النقر على رابط
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // إغلاق القائمة عند النقر خارجها
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navList.contains(event.target) || menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && navList.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
}

// =============================
// التمرير السلس للروابط الداخلية
// =============================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================
// نموذج التواصل والتحقق
// =============================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // عناصر الحقول وأخطائها
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // التحقق من صحة الاسم
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'الاسم مطلوب';
            nameInput.style.borderColor = '#dc2626';
            return false;
        }
        
        if (name.length < 2) {
            nameError.textContent = 'الاسم يجب أن يكون على الأقل حرفين';
            nameInput.style.borderColor = '#dc2626';
            return false;
        }
        
        nameError.textContent = '';
        nameInput.style.borderColor = '#e2e8f0';
        return true;
    }
    
    // التحقق من صحة البريد الإلكتروني
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            emailError.textContent = 'البريد الإلكتروني مطلوب';
            emailInput.style.borderColor = '#dc2626';
            return false;
        }
        
        if (!emailRegex.test(email)) {
            emailError.textContent = 'البريد الإلكتروني غير صالح';
            emailInput.style.borderColor = '#dc2626';
            return false;
        }
        
        emailError.textContent = '';
        emailInput.style.borderColor = '#e2e8f0';
        return true;
    }
    
    // التحقق من صحة الرسالة
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageError.textContent = 'الرسالة مطلوبة';
            messageInput.style.borderColor = '#dc2626';
            return false;
        }
        
        if (message.length < 10) {
            messageError.textContent = 'الرسالة قصيرة جداً (10 أحرف على الأقل)';
            messageInput.style.borderColor = '#dc2626';
            return false;
        }
        
        messageError.textContent = '';
        messageInput.style.borderColor = '#e2e8f0';
        return true;
    }
    
    // أحداث التحقق أثناء الكتابة
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // التحقق عند إرسال النموذج
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // التحقق من جميع الحقول
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // إذا كانت جميع الحقول صالحة
        if (isNameValid && isEmailValid && isMessageValid) {
            // عرض حالة التحميل
            submitBtn.disabled = true;
            submitBtn.textContent = 'جاري الإرسال...';
            
            // محاكاة إرسال النموذج (في حالة حقيقية سيتم إرسال البيانات لخادم)
            setTimeout(function() {
                // إعادة تعيين النموذج
                contactForm.reset();
                
                // عرض رسالة النجاح
                formMessage.textContent = 'شكراً لك! تم إرسال رسالتك بنجاح. سأتواصل معك في أقرب وقت.';
                formMessage.className = 'form-message success';
                
                // إعادة تعيين الزر
                submitBtn.disabled = false;
                submitBtn.textContent = 'إرسال الرسالة';
                
                // إخفاء رسالة النجاح بعد 5 ثوانٍ
                setTimeout(function() {
                    formMessage.className = 'form-message';
                }, 5000);
                
            }, 1500);
        } else {
            // عرض رسالة الخطأ
            formMessage.textContent = 'يرجى تصحيح الأخطاء في النموذج';
            formMessage.className = 'form-message error';
            
            // إخفاء رسالة الخطأ بعد 5 ثوانٍ
            setTimeout(function() {
                formMessage.className = 'form-message';
            }, 5000);
        }
    });
}
