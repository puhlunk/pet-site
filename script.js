// Parkside Pet Grooming - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initBeforeAfterSliders();
    initTestimonialSlider();
    initBackToTopButton();
    initBookingForm();
    initSmoothScrolling();
    initObserverAnimations();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const mainNav = document.querySelector('.main-nav');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Active link highlighting based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Change nav background on scroll
        if (scrollPosition > 100) {
            mainNav.classList.remove('transparent');
        } else {
            mainNav.classList.add('transparent');
        }
        
        // Highlight active nav item
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Before/After Image Sliders
function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const afterImage = slider.querySelector('.after-image');
        
        let isDragging = false;
        
        // Set initial position
        positionHandle(50);
        
        // Handle click anywhere on slider
        slider.addEventListener('click', function(e) {
            if (e.target !== handle) {
                const sliderRect = slider.getBoundingClientRect();
                const position = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
                positionHandle(position);
            }
        });
        
        // Handle drag interaction
        handle.addEventListener('mousedown', startDragging);
        handle.addEventListener('touchstart', startDragging);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
        
        function startDragging(e) {
            e.preventDefault();
            isDragging = true;
            slider.classList.add('active');
        }
        
        function stopDragging() {
            isDragging = false;
            slider.classList.remove('active');
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            const sliderRect = slider.getBoundingClientRect();
            let x;
            
            if (e.type === 'touchmove') {
                x = e.touches[0].clientX - sliderRect.left;
            } else {
                x = e.clientX - sliderRect.left;
            }
            
            const position = (x / sliderRect.width) * 100;
            positionHandle(position);
        }
        
        function positionHandle(position) {
            // Constrain position within slider bounds
            position = Math.max(0, Math.min(position, 100));
            
            // Update handle and after image positions
            handle.style.left = `${position}%`;
            afterImage.style.width = `${position}%`;
        }
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (testimonials.length === 0) return;
    
    let currentIndex = 0;
    
    // Set initial active testimonial
    showTestimonial(currentIndex);
    
    // Event listeners for control buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
    
    // Auto-advance testimonials
    let testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    // Pause auto-advance on hover
    document.querySelector('.testimonials-slider')?.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    document.querySelector('.testimonials-slider')?.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }, 5000);
    });
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Show selected testimonial
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
}

// Back to Top Button
function initBackToTopButton() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Booking Form
function initBookingForm() {
    const bookingForm = document.getElementById('booking-form');
    const bookingConfirmation = document.querySelector('.booking-confirmation');
    const newBookingBtn = document.getElementById('new-booking-btn');
    
    if (!bookingForm || !bookingConfirmation) return;
    
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const petName = document.getElementById('pet-name').value;
        const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').options[document.getElementById('time').selectedIndex].text;
        
        // Set confirmation values
        document.getElementById('confirm-pet').textContent = petName;
        document.getElementById('confirm-service').textContent = service;
        document.getElementById('confirm-date').textContent = formatDate(date);
        document.getElementById('confirm-time').textContent = time;
        
        // Hide form, show confirmation
        bookingForm.style.display = 'none';
        bookingConfirmation.style.display = 'block';
        
        // Scroll to confirmation
        bookingConfirmation.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Reset form
    if (newBookingBtn) {
        newBookingBtn.addEventListener('click', function() {
            bookingForm.reset();
            bookingForm.style.display = 'grid';
            bookingConfirmation.style.display = 'none';
        });
    }
    
    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations with Intersection Observer
function initObserverAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .groomer-card, .about-stats .stat, .gallery-item, .contact-card, .info-card'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        // Add initial animation class
        element.classList.add('fade-in-up');
        
        // Observe element
        observer.observe(element);
    });
    
    // Add animation CSS
    const animationStyles = document.createElement('style');
    animationStyles.innerHTML = `
        .fade-in-up {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity 0.8s ease, transform 0.8s ease;
            transition-delay: calc(var(--animation-order, 0) * 0.1s);
        }
        
        .fade-in-up.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Assign animation order
    animatedElements.forEach((element, index) => {
        const order = index % 4; // Reset counter every 4 elements
        element.style.setProperty('--animation-order', order);
    });
}