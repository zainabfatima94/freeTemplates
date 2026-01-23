gsap.registerPlugin(ScrollTrigger);

// Chirpley-1
// Define the element
const el1 = ".chirpley-1";

// Create timeline linked to scroll
let timeline1 = gsap.timeline({
    scrollTrigger: {
        trigger: el1,
        start: "top bottom",   // when top of element hits bottom of viewport → entry begins
        end: "bottom top",     // when bottom of element hits top of viewport → exit completes
        scrub: 1,
        // markers: true // useful for debugging
    }
});

// Animate: as we scroll from start → end,
// the element goes from off-screen → centered → off-screen again
timeline1
    .fromTo(
        el1,
        {
            // Initial state (just before entering): below and right, rotated
            x: 30,
            y: 50,
            rotation: 10
        },
        {
            // Final state (after fully exiting): above and left, rotated opposite way
            x: -50,
            y: 0,
            rotation: -20,
            ease: "none"
        }
    );

// Chirpley-2
// Define the element
const el2 = ".chirpley-2";

// Create timeline linked to scroll
let timeline2 = gsap.timeline({
    scrollTrigger: {
        trigger: el2,
        start: "top bottom",   // when top of element hits bottom of viewport → entry begins
        end: "bottom top",     // when bottom of element hits top of viewport → exit completes
        scrub: 1,
        // markers: true // useful for debugging
    }
});

// Animate: as we scroll from start → end,
// the element goes from off-screen → centered → off-screen again
timeline2
    .fromTo(
        el2,
        {
            // Initial state (just before entering): below and right, rotated
            x: 20,
            y: 100,
            rotation: -20
        },
        {
            // Final state (after fully exiting): above and left, rotated opposite way
            x: -100,
            y: -100,
            rotation: 40,
            ease: "none"
        }
    );

// Chirpley-3
// Define the element
const el3 = ".chirpley-3";

// Create timeline linked to scroll
let timeline3 = gsap.timeline({
    scrollTrigger: {
        trigger: el3,
        start: "top bottom",   // when top of element hits bottom of viewport → entry begins
        end: "bottom top",     // when bottom of element hits top of viewport → exit completes
        scrub: 1,
        // markers: true // useful for debugging
    }
});

// Animate: as we scroll from start → end,
// the element goes from off-screen → centered → off-screen again
timeline3
    .fromTo(
        el3,
        {
            // Initial state (just before entering): below and right, rotated
            x: -600,
            y: 250,
            rotation: -6
        },
        {
            // Final state (after fully exiting): above and left, rotated opposite way
            x: -600,
            y: 100,
            rotation: 15,
            ease: "none"
        }
    );


// Egg Grow animation
gsap.fromTo(".chirpley-video", 
  { scale: 0.5, transformOrigin: "center center" },
  {
    scale: 1,
    scrollTrigger: {
      trigger: ".chirpley-video",
      start: "top bottom",   // starts entering viewport
      end: "top 30%",        // ends when 70% of it is in view
      scrub: 1,
      // markers: true // for debugging
    }
  }
);

gsap.fromTo(".chirpley-circle", 
  { scale: 0.7, transformOrigin: "center center" },
  {
    scale: 1,
    scrollTrigger: {
      trigger: ".chirpley-circle",
      start: "top bottom",   // starts entering viewport
      end: "top 30%",        // ends when 70% of it is in view
      scrub: 1,
      // markers: true // for debugging
    }
  }
);

// Robot slow motion
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".chirpley-robot",
  { y: -50 }, // initial: slightly up
  {
    y: 70,       // final: normal position
    scrollTrigger: {
      trigger: ".chirpley-robot",
      start: "top bottom",   // when top of element hits bottom of viewport → starts entering
      end: "bottom top",     // when bottom of element hits top of viewport → fully exited
      scrub: 1,
      // markers: true // useful for debugging
    }
  }
);

// Titled Animations on the AI MATCHING heading
gsap.registerPlugin(ScrollTrigger);

const elem = document.querySelector(".chirpley-ai-head");
const height = elem ? elem.offsetHeight : 300; // fallback if not found

gsap.fromTo(
  ".chirpley-ai-head",
  { rotateX: 40, transformOrigin: "center top" }, // initial tilted back
  {
    rotateX: 0,
    scrollTrigger: {
      trigger: ".chirpley-ai-head",
      start: "top bottom",           // starts entering
      end: `+=${height * 1.5}`,      // animate over 150% of its own height
      scrub: 1,
      // markers: true
    }
  }
);
