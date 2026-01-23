document.querySelectorAll('.about .experience article').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;  // x position inside the card
        const y = e.clientY - rect.top;   // y position inside the card
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // REVERSED tilt: now pushes AWAY from cursor
        const rotateY = ((x - centerX) / centerX) * -18;   // negative = away horizontally
        const rotateX = ((y - centerY) / centerY) * -18;   // negative = away vertically
        
        box.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.95)`;
        box.style.filter = 'brightness(110%)';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
        box.style.filter = 'brightness(100%)';
    });

    // Optional: add a subtle entrance animation when card comes into view
    box.addEventListener('mouseenter', () => {
        box.style.transition = 'transform 0.1s ease-out, box-shadow 0.4s ease';
    });
});