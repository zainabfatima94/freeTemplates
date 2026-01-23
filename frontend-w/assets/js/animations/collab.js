gsap.registerPlugin(ScrollTrigger);

const collabRows = document.querySelectorAll('.collab .top .row');

collabRows.forEach((row) => {
  const wordsInRow = row.querySelectorAll('.word');
  
  // Create a timeline for this row's animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: row,
      start: 'top 80%',
      end: 'top 30%',
      scrub: 1, // Smooth scrubbing (adjust value for tighter/looser scrub)
      markers: false // Set to true for debugging
    }
  });
  
  // Animate words in this row
  tl.to(wordsInRow, {
    transform: 'translateY(0)',
    duration: 1,
    stagger: 0.15,
    ease: 'power3.out'
  });
});