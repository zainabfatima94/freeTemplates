/* const video1 = document.getElementById('hero1');
const video2 = document.getElementById('hero2');

// When video1 ends, switch to video2 and play it in a loop
video1.addEventListener('ended', () => {
    video1.style.display = 'none';      // hide first video
    video2.style.display = 'block';     // show second video
    video2.play();                      // start looping video
    document.body.style.overflowY = 'auto'
});

// Start playing the first video automatically (if allowed)
video1.play(); */

const video1 = document.getElementById('hero1');
const video2 = document.getElementById('hero2');
const animatedElement = document.querySelector('.hero-content'); // ← update selector

// When video1 ends
video1.addEventListener('ended', () => {
  video1.style.display = 'none';
  video2.style.display = 'block';
  
  video2.play()
    .then(() => {
      // Video is playing — now animate!
      animateOnVideoStart();
    })
    .catch(err => {
      console.warn("Autoplay prevented:", err);
      // Optional: still animate if needed
      animateOnVideoStart();
    });

  document.body.style.overflowY = 'auto';
});

// Start video1
video1.play();

// 🔥 Animation function — runs only once
function animateOnVideoStart() {
  // Safety: prevent multiple runs
  if (animatedElement.hasAttribute('data-animated')) return;
  animatedElement.setAttribute('data-animated', 'true');

  gsap.fromTo(
    animatedElement,
    { scale: 0, transformOrigin: 'bottom' },
    {
      scale: 1,
      duration: 1.2,
      ease: "power3.out", // smooth, dynamic ease
      // No scrollTrigger — this is a simple timeline animation
    }
  );
}