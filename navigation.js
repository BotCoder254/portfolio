// Page Navigation Handler



const pageContainer = document.getElementById('page-container');



const pages = {



    home: '/pages/home.html',



    about: '/pages/about.html',



    projects: '/pages/projects.html',



    skills: '/pages/skills.html',



    contact: '/pages/contact.html'



};







// Function to update active navigation state



function updateNavigation(pageName) {



    document.querySelectorAll('.nav-dot').forEach(dot => {



        dot.classList.remove('active');



        if (dot.dataset.page === pageName) {



            dot.classList.add('active');



        }



    });



}







// Function to load page content



async function loadPage(pageName) {



    try {



        // Show loading screen



        const loadingScreen = createLoadingScreen();







        const response = await fetch(pages[pageName]);



        if (!response.ok) throw new Error('Page not found');







        const content = await response.text();







        // Get the content wrapper



        const contentWrapper = document.querySelector('.content-wrapper');



        if (!contentWrapper) {



            console.error('Content wrapper not found');



            return;



        }







        // Update content with fade effect



        gsap.to(contentWrapper, {



            opacity: 0,



            duration: 0.3,



            onComplete: () => {



                contentWrapper.innerHTML = content;



                gsap.to(contentWrapper, {



                    opacity: 1,



                    duration: 0.3,



                    onComplete: () => {



                        initPageAnimations(pageName);



                    }



                });



            }



        });







        // Update navigation and URL



        updateNavigation(pageName);



        updateFooterVisibility(pageName);



        history.pushState({ page: pageName }, '', `#${pageName}`);







    } catch (error) {



        console.error('Error loading page:', error);



        const contentWrapper = document.querySelector('.content-wrapper');



        if (contentWrapper) {



            contentWrapper.innerHTML = '<div class="text-center py-20">Error loading content</div>';



        }



    }



}







// Add click handlers to navigation



document.querySelectorAll('.nav-dot').forEach(dot => {



    dot.addEventListener('click', (e) => {



        e.preventDefault();



        const pageName = dot.dataset.page;



        loadPage(pageName);



    });



});







// Handle browser back/forward buttons



window.addEventListener('popstate', (event) => {



    if (event.state && event.state.page) {



        loadPage(event.state.page);



    }



});







// Initialize page on load



document.addEventListener('DOMContentLoaded', () => {



    const initialPage = window.location.hash.slice(1) || 'home';



    loadPage(initialPage);



    updateFooterVisibility(initialPage);



});







// Page-specific animations



function initPageAnimations(pageName) {



    switch (pageName) {



        case 'skills':



            // Animate tech items



            gsap.from('.tech-category', {



                y: 50,



                opacity: 0,



                duration: 0.8,



                stagger: 0.2,



                ease: "power3.out"



            });







            // Floating animation for tech items



            document.querySelectorAll('.tech-item').forEach((item, index) => {



                gsap.to(item, {



                    y: "random(-5, 5)",



                    duration: "random(2, 3)",



                    repeat: -1,



                    yoyo: true,



                    ease: "sine.inOut",



                    delay: index * 0.1



                });



            });



            break;



            // Add cases for other pages



    }



}







// Add keyboard navigation function



function initKeyboardNavigation() {



    document.addEventListener('keydown', (e) => {



        let newIndex = currentPageIndex;



        let shouldNavigate = true;







        switch (e.key) {



            case 'ArrowUp':



            case 'ArrowLeft':



                newIndex = Math.max(0, currentPageIndex - 1);



                break;



            case 'ArrowDown':



            case 'ArrowRight':



                newIndex = Math.min(PAGES.length - 1, currentPageIndex + 1);



                break;



            case 'Home':



                newIndex = 0;



                break;



            case 'End':



                newIndex = PAGES.length - 1;



                break;



            case '1':



            case '2':



            case '3':



            case '4':



            case '5':



                newIndex = parseInt(e.key) - 1;



                break;



            default:



                shouldNavigate = false;



        }







        if (shouldNavigate && newIndex !== currentPageIndex) {



            showNavigationIndicator(newIndex > currentPageIndex ? 'down' : 'up', PAGES[newIndex]);



            loadPage(PAGES[newIndex]);



            currentPageIndex = newIndex;



        }



    });



}







// Add navigation indicator



function showNavigationIndicator(direction, pageName) {



    const indicator = document.createElement('div');



    indicator.className = `navigation-indicator ${direction}`;



    indicator.innerHTML = `



        <div class="indicator-content">



            <i class="fas fa-chevron-${direction} text-2xl"></i>



            <span class="text-lg capitalize">${pageName}</span>



        </div>



    `;



    document.body.appendChild(indicator);







    gsap.fromTo(indicator,



        {



            opacity: 0,



            y: direction === 'up' ? 20 : -20



        },



        {



            opacity: 1,



            y: 0,



            duration: 0.3,



            onComplete: () => {



                setTimeout(() => {



                    gsap.to(indicator, {



                        opacity: 0,



                        y: direction === 'up' ? -20 : 20,



                        duration: 0.3,



                        onComplete: () => indicator.remove()



                    });



                }, 1000);



            }



        }



    );



}







// Add loading screen function



function showLoadingScreen() {



    return new Promise(resolve => {



        const loadingScreen = document.createElement('div');



        loadingScreen.className = 'loading-screen';



        loadingScreen.innerHTML = `



            <div class="loading-content">



                <div class="loading-spinner">



                    <div class="spinner-outer"></div>



                    <div class="spinner-inner"></div>



                    <div class="loading-percentage">0%</div>



                </div>



                <div class="loading-text">



                    Loading<span class="loading-dots">...</span>



                </div>



            </div>



        `;



        document.body.appendChild(loadingScreen);







        const percentage = loadingScreen.querySelector('.loading-percentage');







        gsap.to(percentage, {



            textContent: 100,



            duration: 0.8,



            snap: { textContent: 1 },



            ease: "power1.inOut",



            onUpdate: () => {



                const value = Math.round(gsap.getProperty(percentage, "textContent"));



                percentage.textContent = `${value}%`;



            },



            onComplete: () => {



                setTimeout(() => {



                    gsap.to(loadingScreen, {



                        opacity: 0,



                        duration: 0.3,



                        onComplete: () => {



                            loadingScreen.remove();



                            resolve();



                        }



                    });



                }, 200);



            }



        });



    });



}







// Initialize keyboard navigation



document.addEventListener('DOMContentLoaded', () => {



    initKeyboardNavigation();



});







// Add this function to handle footer visibility



function updateFooterVisibility(pageName) {



    const footer = document.querySelector('.main-page-footer');



    if (footer) {



        if (pageName === 'home') {



            footer.style.display = 'block';



            footer.style.opacity = '1';



        } else {



            gsap.to(footer, {



                opacity: 0,



                duration: 0.3,



                onComplete: () => {



                    footer.style.display = 'none';



                }



            });



        }



    }



}