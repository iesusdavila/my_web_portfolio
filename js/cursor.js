export function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    let posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0;

    // Animate cursor movement
    function animate() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        follower.style.transform = `translate3d(${posX - 4}px, ${posY - 4}px, 0)`;
        cursor.style.transform = `translate3d(${mouseX - 10}px, ${mouseY - 10}px, 0)`;

        requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Efecto hover en elementos interactivos
    const hoverElements = document.querySelectorAll('a, button, .btn');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor--hover');
            follower.classList.add('cursor--hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor--hover');
            follower.classList.remove('cursor--hover');
        });
    });

    // Hide cursor on mobile devices
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    } else {
        animate();
    }
}