document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }

    // 2. Rising Circle Scroll Animation
    const risingCircle = document.getElementById('rising-circle');
    if (risingCircle) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Move circle up as user scrolls down
            // Factor 0.4 determines speed relative to scroll
            risingCircle.style.transform = `translate(-50%, ${-scrollY * 0.4}px)`;
        });
    }

    // 3. Theme Preferences (Preserve user preference logic even if toggle is hidden)
    const htmlElement = document.documentElement;
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    // 4. Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between Menu and X
            const icon = mobileMenu.classList.contains('hidden') ? 'menu' : 'x';
            menuBtn.innerHTML = `<i data-lucide="${icon}" class="w-5 h-5"></i>`;
            lucide.createIcons();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuBtn.innerHTML = `<i data-lucide="menu" class="w-5 h-5"></i>`;
                lucide.createIcons();
            }
        });
    }

    // 5. Horizontal Scroll for Museum Page
    const scrollContainer = document.getElementById('museum-scroll-container');
    if (scrollContainer) {
        scrollContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                scrollContainer.scrollLeft += e.deltaY;
            }
        });
    }

    // 6. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <i data-lucide="loader-2" class="w-4 h-4 animate-spin ml-2"></i>`;
            if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();

            const formData = new FormData(contactForm);

            // Use AJAX submission to FormSubmit
            fetch("https://formsubmit.co/ajax/barcenajolo03@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Redirect to success page upon successful submission
                window.location.href = "success.html";
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Something went wrong. Please try again or email me directly at barcenajolo03@gmail.com");
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
            });
        });
    }

    // 7. Auto-Scroll Carousel Logic
    const speedPxPerSec = 120; 
    
    function initCarousel(el) {
        if (!el) return;
        // If not duplicated yet, duplicate content for seamless loop
        if (!el.dataset.looped) {
            el.innerHTML = el.innerHTML + el.innerHTML;
            el.dataset.looped = 'true';
        }
        // compute half width (single pass distance)
        requestAnimationFrame(() => {
            const totalWidth = el.scrollWidth / 2;
            // duration in seconds = px / pxPerSec
            const duration = Math.max(18, Math.round(totalWidth / speedPxPerSec)); 
            el.style.setProperty('--scroll-duration', duration + 's');
        });
    }

    const carousels = document.querySelectorAll('.auto-scroll');
    if (carousels.length > 0) {
        carousels.forEach(initCarousel);
        
        // Debounce resize handler
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                carousels.forEach(initCarousel);
            }, 150);
        });
        
        // Pause on interaction
        document.querySelectorAll('.auto-scroll-container').forEach(container => {
            const scroller = container.querySelector('.auto-scroll');
            if (scroller) {
                container.addEventListener('pointerdown', () => scroller.style.animationPlayState = 'paused');
                container.addEventListener('pointerup', () => scroller.style.animationPlayState = '');
                container.addEventListener('pointercancel', () => scroller.style.animationPlayState = '');
            }
        });
    }

    // 8. Dynamic Background on Home Page
    const dynamicBg = document.getElementById('dynamic-bg');
    if (dynamicBg) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.8) {
                dynamicBg.classList.add('is-active');
            } else {
                dynamicBg.classList.remove('is-active');
            }
        });
    }
});