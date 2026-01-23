gsap.registerPlugin(ScrollTrigger);

// Get the projects container and all projects
const projectsContainer = document.querySelector('.projects');
const projects = document.querySelectorAll('.project');
const projectCount = projects.length;

// Create a timeline with scrub control
const projectsTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: projectsContainer,
        start: 'top top',
        end: `+=${projectCount * 100}%`, // Scroll distance based on number of projects
        pin: true,
        scrub: 1.5, // Increased scrub value for slower movement
        anticipatePin: 1,
    }
});

// Calculate the total movement needed
// Each project should stay on screen for a while before moving to the next
const totalMovement = -(projectCount - 1) * 100; // -200% for 3 projects

// Animate with a slower, smoother movement
projectsTimeline.to(projectsContainer, {
    x: `${totalMovement}%`,
    duration: projectCount * 2, // Longer duration for slower movement
    ease: "power2.inOut" // Smoother easing
});