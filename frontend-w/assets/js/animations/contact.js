gsap.registerPlugin(ScrollTrigger);

const form = document.querySelector('.contact-form');
const formRow = form.querySelectorAll('.row');
const formInput = [...form.querySelectorAll('input')];
const btnInput = form.querySelectorAll('input[type="button"]')

// Convert NodeList to Array for letters
const formLetters = [...document.querySelectorAll('.letter')];

// Get letter groups
let l1 = formLetters.slice(0, 22);  // Changed from -1 to 0
let l2 = formLetters.slice(22, 36);
let l3 = formLetters.slice(36, 75);
let l4 = formLetters.slice(75, 104);
let l5 = formLetters.slice(104, 116);

let i1 = formInput.slice(2, 5);
let i2 = formInput.slice(5, 10);

// Create a flat array of all elements to animate
const allFormElements = [
    ...l1,            // Spread the array of letters
    formInput[0],     // Individual input element
    ...l2,            // Spread the array of letters
    formInput[1],
    ...l3,
    ...i1,            // Spread the array of input elements
    ...l4,
    ...i2,
    ...l5,
    formInput[7]      // Changed from 8 to 7 (arrays are 0-indexed)
].filter(el => el);   // Filter out any undefined/null elements

const formTL = gsap.timeline({
    scrollTrigger: {
        trigger: form,
        start: '90% 90%',
        end: '+=1300',
        scrub: true,
        pin: true,
        anticipatePin: 1,
    }
});

formTL
    .to(allFormElements, {
        opacity: 1,
        stagger: 0.2,
    })
    .to(btnInput, {
        borderColor: 'black',
        color: 'black'
    })
    .to(form, {
        background: 'linear-gradient(to right, var(--pink), var(--sky))',
        color: 'black',
    }, '-=1.0');