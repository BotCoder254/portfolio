// Initialize GSAP

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);



// Global cursor instance

let globalCursor;

let cursorTrail;



// Custom Cursor Setup with enhanced interactivity

function initCustomCursor() {

    // Remove existing cursors if any

    if (globalCursor) {

        globalCursor.remove();

        cursorTrail.remove();

    }



    // Create new cursor

    globalCursor = document.createElement('div');

    globalCursor.className = 'custom-cursor';

    document.body.appendChild(globalCursor);



    // Create cursor trail

    cursorTrail = document.createElement('div');

    cursorTrail.className = 'cursor-trail';

    document.body.appendChild(cursorTrail);



    // Enhanced cursor movement with smooth animation



    document.addEventListener('mousemove', (e) => {

        requestAnimationFrame(() => {

            gsap.to(globalCursor, {

                x: e.clientX,

                y: e.clientY,

                duration: 0.1,

                ease: "power2.out"

            });

            gsap.to(cursorTrail, {

                x: e.clientX,

                y: e.clientY,

                duration: 0.3,

                ease: "power2.out"

            });

        });

    });



    // Enhanced hover effects for interactive elements

    const interactiveElements = document.querySelectorAll(

        'a, button, .nav-dot, .social-dot, .project-card, input, textarea, .tech-item'

    );



    interactiveElements.forEach(element => {

        element.addEventListener('mouseenter', () => {

            globalCursor.classList.add('hover');

            cursorTrail.classList.add('hover');

            element.classList.add('element-hover');

        });



        element.addEventListener('mouseleave', () => {

            globalCursor.classList.remove('hover');

            cursorTrail.classList.remove('hover');

            element.classList.remove('element-hover');

        });

    });



    // Force cursor visibility



    document.body.style.cursor = 'none';

    document.documentElement.style.cursor = 'none';

}







// Tech Stack Animations



function initTechStackAnimations() {



    // Animate tech categories entrance



    gsap.from('.tech-category', {



        y: 50,



        opacity: 0,

        duration: 0.8,



        stagger: 0.2,



        ease: "power3.out",



        scrollTrigger: {



            trigger: '.tech-category',



            start: "top bottom-=100",



            toggleActions: "play none none reverse"



        }



    });







    // Animate tech items with hover effects



    document.querySelectorAll('.tech-item').forEach((item, index) => {



        // Create hover effect timeline



        const tl = gsap.timeline({ paused: true });



        tl.to(item, {



            y: -10,



            scale: 1.05,



            duration: 0.3,



            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",



            ease: "power2.out"



        });




        // // Show/hide mobile navigation based on scroll
        // let lastScrollTop = 0;
        // window.addEventListener('scroll', () => {
        //     const mobileNav = document.querySelector('.mobile-nav');
        //     if (!mobileNav) return;

        //     const st = window.pageYOffset || document.documentElement.scrollTop;
        //     if (st > lastScrollTop) {
        //         // Scrolling down
        //         mobileNav.classList.remove('visible');
        //     } else {
        //         // Scrolling up
        //         mobileNav.classList.add('visible');
        //     }
        //     lastScrollTop = st <= 0 ? 0 : st;
        // }, false);

        // Show mobile nav on page load
        document.addEventListener('DOMContentLoaded', () => {
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav) {
                setTimeout(() => {
                    mobileNav.classList.add('visible');
                }, 1000);
            }
        });


        // Add hover listeners



        item.addEventListener('mouseenter', () => tl.play());



        item.addEventListener('mouseleave', () => tl.reverse());







        // Add floating animation



        gsap.to(item, {



            y: "random(-5, 5)",



            duration: "random(2, 3)",



            repeat: -1,



            yoyo: true,



            ease: "sine.inOut",



            delay: index * 0.1



        });







        // Animate icons



        gsap.from(item.querySelector('.tech-icon-wrapper'), {



            rotate: 360,



            scale: 0,



            duration: 0.6,



            delay: index * 0.1,



            ease: "back.out(1.7)",



            scrollTrigger: {



                trigger: item,



                start: "top bottom-=100",



                toggleActions: "play none none reverse"



            }



        });



    });



}







// Loading Screen Animation



function createLoadingScreen() {

    const loadingScreen = document.createElement('div');

    loadingScreen.className = 'loading-screen';

    loadingScreen.innerHTML = `

        <div class="loading-content">

            <div class="loading-spinner">

                <div class="spinner-outer">

                    <div class="spinner-inner"></div>

                </div>

                <div class="loading-percentage">0%</div>

            </div>

            <div class="loading-text">

                Loading<span class="loading-dots">...</span>

            </div>

        </div>

    `;

    document.body.appendChild(loadingScreen);



    // Animate percentage

    const percentage = loadingScreen.querySelector('.loading-percentage');

    const spinnerInner = loadingScreen.querySelector('.spinner-inner');



    gsap.to(percentage, {

        textContent: 100,

        duration: 1.5,

        snap: { textContent: 1 },

        ease: "power1.inOut",

        onUpdate: () => {

            const value = Math.round(gsap.getProperty(percentage, "textContent"));

            percentage.textContent = `${value}%`;

            spinnerInner.style.transform = `rotate(${value * 3.6}deg)`;

        }

    });



    // Remove loading screen

    return new Promise(resolve => {

        setTimeout(() => {

            gsap.to(loadingScreen, {

                opacity: 0,

                duration: 0.5,

                onComplete: () => {

                    loadingScreen.remove();

                    resolve();

                }

            });

        }, 2000);

    });

}







// Page-specific animations



function initPageAnimations(pageName) {



    // Initialize custom cursor for each page



    initCustomCursor();







    switch (pageName) {



        case 'skills':



            initTechStackAnimations();



            break;



        case 'home':



            // Home page animations



            const heroTimeline = gsap.timeline({



                defaults: { ease: "power3.out", duration: 0.8 }



            });



            heroTimeline



                .from("#hero-greeting", { y: 20, opacity: 0 })



            .from("#hero-title", { y: 30, opacity: 0 }, "-=0.4")



            .from("#hero-role", { y: 30, opacity: 0 }, "-=0.6")



            .from("#hero-subtitle", { y: 30, opacity: 0 }, "-=0.4")



            .from("#hero-cta", { y: 20, opacity: 0 }, "-=0.2")



            .from("#hero-icons i", {



                y: 20,



                opacity: 0,



                stagger: 0.1,



                scale: 0.8,



                rotate: -15



            }, "-=0.4");



            break;



            // Add cases for other pages



    }



}







// Initialize animations when DOM is loaded



document.addEventListener('DOMContentLoaded', () => {



    initCustomCursor();



    createLoadingScreen();



});







// Reinitialize when page content changes



window.addEventListener('contentChanged', () => {



    initCustomCursor();



});







// Export for use in navigation.js



window.initPageAnimations = initPageAnimations;


// Tech Stack Animations
function initTechStackAnimations() {
    // Ensure items are visible
    document.querySelectorAll('.tech-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });

    // Add hover animations
    document.querySelectorAll('.tech-item').forEach((item, index) => {
        // Create hover effect
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });

            // Animate icon
            const icon = item.querySelector('.tech-icon-wrapper');
            gsap.to(icon, {
                scale: 1.1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            // Reset icon
            const icon = item.querySelector('.tech-icon-wrapper');
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Add entrance animation
        gsap.from(item, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: item,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Add this at the top of animations.js
const PAGES = ['home', 'about', 'projects', 'skills', 'contact'];
let currentPageIndex = 0;

// Update keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        let newIndex = currentPageIndex;

        switch (e.key) {
            case 'ArrowUp':
                newIndex = Math.max(0, currentPageIndex - 1);
                break;
            case 'ArrowDown':
                newIndex = Math.min(PAGES.length - 1, currentPageIndex + 1);
                break;
            case 'Home':
                newIndex = 0;
                break;
            case 'End':
                newIndex = PAGES.length - 1;
                break;
            default:
                // Number keys 1-5
                if (/^[1-5]$/.test(e.key)) {
                    newIndex = parseInt(e.key) - 1;
                }
                return;
        }

        if (newIndex !== currentPageIndex) {
            showNavigationHint(newIndex > currentPageIndex ? 'down' : 'up');
            loadPage(PAGES[newIndex]);
            currentPageIndex = newIndex;
        }
    });
}

// Add navigation hint
function showNavigationHint(direction) {
    const hint = document.createElement('div');
    hint.className = `navigation-hint ${direction}`;
    hint.innerHTML = `
        <div class="hint-content">
            <i class="fas fa-chevron-${direction}"></i>
            <span>${PAGES[currentPageIndex]}</span>
        </div>
    `;
    document.body.appendChild(hint);

    gsap.fromTo(hint, { opacity: 0, y: direction === 'up' ? 20 : -20 }, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        onComplete: () => {
            setTimeout(() => {
                gsap.to(hint, {
                    opacity: 0,
                    y: direction === 'up' ? -20 : 20,
                    duration: 0.3,
                    onComplete: () => hint.remove()
                });
            }, 1000);
        }
    });
}

// Update loading screen
function createLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">
                <div class="spinner-outer">
                    <div class="spinner-inner"></div>
                </div>
                <div class="loading-percentage">0%</div>
            </div>
            <div class="loading-text">
                Loading<span class="loading-dots">...</span>
            </div>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    // Animate percentage
    const percentage = loadingScreen.querySelector('.loading-percentage');
    const spinnerInner = loadingScreen.querySelector('.spinner-inner');

    gsap.to(percentage, {
        textContent: 100,
        duration: 1.5,
        snap: { textContent: 1 },
        ease: "power1.inOut",
        onUpdate: () => {
            const value = Math.round(gsap.getProperty(percentage, "textContent"));
            percentage.textContent = `${value}%`;
            spinnerInner.style.transform = `rotate(${value * 3.6}deg)`;
        }
    });

    // Remove loading screen
    return new Promise(resolve => {
        setTimeout(() => {
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    loadingScreen.remove();
                    resolve();
                }
            });
        }, 2000);
    });
}