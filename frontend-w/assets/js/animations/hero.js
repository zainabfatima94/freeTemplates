gsap.registerPlugin(ScrollTrigger);

const heroSection = document.querySelector('.hero');
const heroHead = document.querySelector('.hero-head');
const overlay = document.querySelector('.overlay');
const overlayTopLinks = overlay.querySelector('.overlay-top .links');
const overlayBottomBoxes = overlay.querySelectorAll('.overlay-bottom .box');
const heroImg = document.querySelector('.hero-img');

// Set initial mixBlendMode
gsap.set([heroHead, overlayTopLinks], { mixBlendMode: 'difference' });

// Create a timeline with ScrollTrigger
const heroTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: '+=1200', // Increased for smoother animation
        scrub: 2, // Smoother scrub (higher value = smoother)
        pin: true,
        anticipatePin: 1, // Smooths out pinning
        pinSpacing: false,
    }
});

// Add smoother animations with better timing and easing
heroTimeline
    .to([heroHead, overlayTopLinks], {
        opacity: 0,
        scale: 0.8,
        y: 40,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.1
    })
    .to(overlayBottomBoxes, {
        opacity: 0,
        scale: 0.8,
        y: -30,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: 0.2
    }, 0)
    .to(heroImg, {
        filter: 'blur(5px)',
        y: 50,
        zIndex: -1, // Changed to number (no quotes)
        scale: 1.01,
        duration: 2, // Longer for smoother effect
        ease: "power2.inOut"
    }, "-=0.8"); // Start when box animation is 80% done