const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.nav-menu');
const closeMenu = document.querySelector('.close-menu')

navToggler.addEventListener('click', () => navMenu.classList.add('collapseActive'))
closeMenu.addEventListener('click', () => navMenu.classList.remove('collapseActive'))

const items = document.querySelectorAll('header .collapse .bottom .box p');
for (let i of items) {
    let itmCount = i.childElementCount;

    i.addEventListener('mouseover', () => {
        for (let idx = 0; idx< itmCount; idx++) {
            i.children[idx].classList.add('child-hovered')
        }
    })
    i.addEventListener('mouseout', () => {
        for (let idx = 0; idx< itmCount; idx++) {
            i.children[idx].classList.remove('child-hovered')
        }
    })
}