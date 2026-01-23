gsap.registerPlugin(ScrollTrigger);

const about = document.querySelector('.about');
const maskImg = document.querySelector('.mask-img-child');
const aboutExp = document.querySelector('.about-experience');
const aboutMission = document.querySelector('.about .mission');
const missionRowText = aboutMission.querySelectorAll('.row .text')

const aboutTL = gsap.timeline({
    scrollTrigger: {
        trigger: about,
        start: '840px 90%',
        end: '+=1200', // Increased for smoother animation
        pin: true,
        // pinSpacing: false,
        scrub: true,
        anticipatePin: 1, // Smooths out pinning
    }
});

aboutTL
    .to(maskImg, {
        transform: 'scale(11)',
        duration: 5.5,
        ease: 'power2.inOut',
        stagger: 0.1,
    })
    .to([missionRowText[1], missionRowText[2]], {
        y: 0,
        duration: 2,
        ease: 'power1.in',
    }, 0.5)
    .to([missionRowText[0], missionRowText[3]], {
        y: 0,
        duration: 2,
        ease: 'power1.in',
    }, 1.2)
    .to([missionRowText[4], missionRowText[5]], {
        y: 0,
        duration: 2,
        ease: 'power1.in',
    }, 2)
