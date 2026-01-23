gsap.registerPlugin(ScrollTrigger);

const socialList = document.querySelector('.social-links .links');
const socialLinksA = socialList.querySelectorAll('.social-links .links li a');
const socialHeader = document.querySelector('.contact .section-header h1 span')

ScrollTrigger.create({
  trigger: socialList,
  start: "top 80%",
  onEnter: () => {
    gsap.to([socialLinksA, socialHeader], {
      y: 7,
      duration: 0.3,
      stagger: 0.1,
      ease: "power1.out"
    });
  },
  onLeaveBack: () => {
    gsap.to([socialLinksA, socialHeader], {
      y: 15,
      duration: 0.3,
      stagger: 0.1,
      ease: "power1.out"
    });
  }
});