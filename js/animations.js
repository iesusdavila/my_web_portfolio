export function initAnimations() {
    // Optimized Intersection Observer for animations
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-enter', 'visible');
                // Unobserve after animation to save resources
                sectionObserver.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        section.classList.add('section-enter');
        sectionObserver.observe(section);
    });

    // Optimized Parallax Effect
    let ticking = false;
    const parallaxElements = document.querySelectorAll('.parallax');

    if (parallaxElements.length > 0) {
        document.addEventListener('mousemove', (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    parallaxElements.forEach(element => {
                        const speed = element.getAttribute('data-speed') || 5;
                        const x = (window.innerWidth - e.pageX * speed) / 100;
                        const y = (window.innerHeight - e.pageY * speed) / 100;

                        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                    });
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Optimized Scroll Animations
    let scrollTicking = false;
    const scrollElements = document.querySelectorAll('.scroll-effect');

    if (scrollElements.length > 0) {
        window.addEventListener('scroll', () => {
            if (!scrollTicking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    scrollElements.forEach(element => {
                        const rate = scrolled * 0.5;
                        element.style.transform = `translate3d(0px, ${rate}px, 0px)`;
                    });
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }, { passive: true });
    }
}