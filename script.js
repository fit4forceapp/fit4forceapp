/* ========================================
   FIT4FORCE Landing Page - JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    lucide.createIcons();

    // ========================================
    // Navigation Scroll Effect
    // ========================================
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check initial state

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('svg');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // ========================================
    // Smooth Scrolling for Navigation Links
    // ========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Counter Animation
    // ========================================
    function animateCounter(element, start, end, duration, isFloat = false) {
        let startTimestamp = null;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            let currentValue;
            if (isFloat) {
                currentValue = (progress * (end - start) + start).toFixed(1);
            } else {
                currentValue = Math.floor(progress * (end - start) + start);
                currentValue = currentValue.toLocaleString();
            }
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // Observe counter elements
    const counterElements = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const endValue = parseFloat(element.dataset.count);
                const isFloat = endValue % 1 !== 0;
                
                animateCounter(element, 0, endValue, 2000, isFloat);
                counterObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(element => {
        counterObserver.observe(element);
    });

    // ========================================
    // Testimonials Carousel
    // ========================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Handle wrapping
        if (index < 0) index = testimonialCards.length - 1;
        if (index >= testimonialCards.length) index = 0;
        
        currentSlide = index;

        // Update cards
        testimonialCards.forEach((card, i) => {
            card.classList.remove('active');
            if (i === currentSlide) {
                card.classList.add('active');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Start auto-slide
    startAutoSlide();

    // Pause on hover
    const carouselWrapper = document.querySelector('.testimonials-carousel');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', stopAutoSlide);
        carouselWrapper.addEventListener('mouseleave', startAutoSlide);
    }

    // ========================================
    // Scroll Animations
    // ========================================
    const animatedElements = document.querySelectorAll('.section-header, .agency-card, .feature-block, .step, .pricing-card, .stat-item');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index within its container
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });

    // ========================================
    // Phone Mockup Feature Animation
    // ========================================
    const featureBlocks = document.querySelectorAll('.feature-block');
    
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const block = entry.target;
                const image = block.querySelector('.feature-image');
                const content = block.querySelector('.feature-content-block');
                
                if (image) {
                    image.style.opacity = '1';
                    image.style.transform = 'translateX(0)';
                }
                
                if (content) {
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateX(0)';
                    }, 200);
                }
                
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    featureBlocks.forEach(block => {
        const image = block.querySelector('.feature-image');
        const content = block.querySelector('.feature-content-block');
        const isReverse = block.classList.contains('reverse');
        
        if (image) {
            image.style.opacity = '0';
            image.style.transform = isReverse ? 'translateX(50px)' : 'translateX(-50px)';
            image.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = isReverse ? 'translateX(-50px)' : 'translateX(50px)';
            content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
        
        featureObserver.observe(block);
    });

    // ========================================
    // Agency Cards Stagger Animation
    // ========================================
    const agencyCards = document.querySelectorAll('.agency-card');
    
    const agencyObserver = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
            agencyCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 80);
            });
            
            agencyCards.forEach(card => {
                agencyObserver.unobserve(card);
            });
        }
    }, { threshold: 0.1 });

    agencyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        agencyObserver.observe(card);
    });

    // ========================================
    // Button Ripple Effect
    // ========================================
    const buttons = document.querySelectorAll('.nav-cta, .pricing-cta, .cta-btn, .feature-cta, .playstore-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple keyframes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // ========================================
    // Parallax Effect for Plus Decorations
    // ========================================
    const plusDecorations = document.querySelectorAll('.plus');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        plusDecorations.forEach((plus, index) => {
            const speed = 0.05 + (index % 3) * 0.02;
            const yPos = scrollY * speed;
            plus.style.transform = `translateY(${yPos}px)`;
        });
    });

    // ========================================
    // Typing Effect for Hero Tagline
    // ========================================
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.opacity = '1';
        
        let charIndex = 0;
        
        function typeCharacter() {
            if (charIndex < text.length) {
                tagline.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeCharacter, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeCharacter, 1000);
    }

    // ========================================
    // Progress Bar Animation in Hero Phone
    // ========================================
    const progressFill = document.querySelector('.phone-screen .progress-fill');
    if (progressFill) {
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.width = '68%';
        }, 1500);
    }

    // ========================================
    // Pricing Card Hover Effects
    // ========================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => {
                if (c !== this && !c.classList.contains('popular')) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    // ========================================
    // Touch Swipe for Testimonials (Mobile)
    // ========================================
    let touchStartX = 0;
    let touchEndX = 0;
    
    const testimonialsWrapper = document.getElementById('testimonialsWrapper');
    
    if (testimonialsWrapper) {
        testimonialsWrapper.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialsWrapper.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (diff > swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (diff < -swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    }

    // ========================================
    // Active Navigation Link Highlighting
    // ========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinkItems = document.querySelectorAll('.nav-links a');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);

    // ========================================
    // FAQ Functionality
    // ========================================
    function initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('FAQ items found:', faqItems.length);
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.style.cursor = 'pointer';
                
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log('FAQ item clicked:', index);
                    
                    // Toggle current item
                    const isActive = item.classList.contains('active');
                    
                    // Close all items first
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // If it wasn't active, make it active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                    
                    console.log('FAQ item active state:', item.classList.contains('active'));
                });
            }
        });
    }
    
    // Initialize FAQ with a slight delay to ensure DOM is fully loaded
    setTimeout(initializeFAQ, 100);

    // ========================================
    // Progressive Image Loading
    // ========================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loaded class when image is fully loaded
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', () => {
                        img.classList.add('loaded');
                    });
                }
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before image enters viewport
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Handle images that are already loaded (from cache)
    document.querySelectorAll('img[loading="eager"]').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // ========================================
    // Console Easter Egg
    // ========================================
    console.log('%c🛡️ FIT4FORCE', 'font-size: 24px; font-weight: bold; color: #00D4FF;');
    console.log('%cYour Journey from Civilian to Officer Starts Here!', 'font-size: 14px; color: #1A237E;');
    console.log('%cInterested in working with us? Email: careers@fit4force.ng', 'font-size: 12px; color: #64748B;');
});
