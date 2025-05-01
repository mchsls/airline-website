document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    
    // Header scroll effect
    const header = document.querySelector('.glass-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Swap destinations
    const swapBtn = document.querySelector('.swap-btn');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    
    swapBtn.addEventListener('click', function() {
        const temp = fromInput.value;
        fromInput.value = toInput.value;
        toInput.value = temp;
        
        // Add animation
        this.classList.add('animate');
        setTimeout(() => {
            this.classList.remove('animate');
        }, 500);
    });
    
    // Initialize date inputs
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    document.getElementById('departure').valueAsDate = today;
    document.getElementById('return').valueAsDate = tomorrow;
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabForms = document.querySelectorAll('.booking-form');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            tabForms.forEach(form => {
                form.classList.remove('active');
                if (form.dataset.tab === tabName) {
                    form.classList.add('active');
                }
            });
        });
    });
    
    // Update world clocks
    function updateWorldClocks() {
        const timeZones = [
            'Europe/Moscow',
            'Asia/Dubai',
            'America/New_York',
            'Europe/London',
            'Asia/Tokyo',
            'Australia/Sydney'
        ];
        
        timeZones.forEach(zone => {
            const options = {
                timeZone: zone,
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
            };
            
            const dateOptions = {
                timeZone: zone,
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            };
            
            const timeString = new Date().toLocaleTimeString('ru-RU', options);
            const dateString = new Date().toLocaleDateString('ru-RU', dateOptions);
            
            const timeElements = document.querySelectorAll(`.time[data-timezone="${zone}"]`);
            const dateElements = document.querySelectorAll(`.date[data-timezone="${zone}"]`);
            
            timeElements.forEach(el => {
                el.textContent = timeString;
            });
            
            dateElements.forEach(el => {
                el.textContent = dateString;
            });
        });
    }
    
    updateWorldClocks();
    setInterval(updateWorldClocks, 60000);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission
    const flightForm = document.getElementById('flight-search');
    
    flightForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here would be the actual form submission to the server
        console.log('Form submitted:', {
            from: fromInput.value,
            to: toInput.value,
            departure: document.getElementById('departure').value,
            return: document.getElementById('return').value,
            passengers: document.getElementById('passengers').value,
            class: document.getElementById('class').value
        });
        
        // Scroll to flights section
        document.querySelector('#flights').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Initialize animations for sections when they come into view
    const sections = document.querySelectorAll(
        '.section-popular, .section-fleet, .section-seat-selection, .section-facts, .section-world-time, .section-offers'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Parallax effect for flying plane
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const plane = document.querySelector('.flying-plane');
        
        if (plane) {
            plane.style.transform = `translateX(${scrollPosition * 0.5}px) translateY(${scrollPosition * 0.2}px)`;
        }
    });
});
// Header scroll behavior
let lastScrollPosition = 0;
const header = document.querySelector('.glass-header');
const headerHeight = header.offsetHeight;
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', function() {
    const currentScrollPosition = window.scrollY;
    
    // Для десктопной версии
    if (currentScrollPosition > lastScrollPosition && currentScrollPosition > headerHeight) {
        // Прокрутка вниз
        header.classList.add('header-hidden');
    } else {
        // Прокрутка вверх
        header.classList.remove('header-hidden');
    }
    
    // Для мобильной версии - закрываем меню при прокрутке
    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
    
    // Добавляем тень при прокрутке
    if (currentScrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollPosition = currentScrollPosition;
});
