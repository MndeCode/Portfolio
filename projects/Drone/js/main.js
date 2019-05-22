let mask = document.querySelector('.mobile__aside');
let cart = document.querySelector('.cart .icon');
let checkout = document.querySelector('.cart-checkout');
let cartClose = checkout.querySelector('a');
let cartCount = 0;
let total = 0;
const carts = [...document.querySelectorAll('.cart-count')];
const menu = document.querySelector('.menu-icon');
const close = document.querySelector('.close-icon');
const addTos = [...document.querySelectorAll('.drones a.slick')];

const controller = new ScrollMagic.Controller();

const sections = document.querySelectorAll('section').forEach(section => {
    new ScrollMagic.Scene({
        triggerElement: section,
        triggerHook: 0.75,
        reverse: false
    })
    .setClassToggle(section, 'fade-in')
    .addTo(controller);
})

function openMenu() {
    mask.style.visibility = 'visible';
    anime.timeline({
        targets: mask,
        duration: 200,
        translateX: ['100%', 0],
        easing: 'easeInOutSine'
    })
    .add({
        targets: mask.querySelectorAll('ul li'),
        duration: 300,
        translateX: ['100%', 0],
        opacity: [0, 1],
        delay: anime.stagger(50)
    })
}

function closeMenu() {
    anime.timeline({
        targets: mask,
        duration: 200,
        translateX: [0, '100%'],
        easing: 'easeInOutSine'
    })
    .add({
        targets: mask.querySelectorAll('ul li'),
        duration: 300,
        translateX: [0, '100%'],
        opacity: [1, 0],
        delay: anime.stagger(50),
        complete: () => {
            mask.style.visibility = 'hidden'
        }
    });
}


menu.addEventListener('click', openMenu);

close.addEventListener('click', closeMenu);

addTos.forEach(addTo => {
    addTo.addEventListener('click', e => {
        e.preventDefault();
        cartCount++;
        let tbooty = checkout.querySelector('table tbody');
        let tr = document.createElement('tr');
        let tdProd = document.createElement('td');
        tdProd.textContent = addTo.dataset.product;
        let tdPric = document.createElement('td');
        tdPric.textContent = `R ${addTo.dataset.price}`;
        tr.appendChild(tdProd);
        tr.appendChild(tdPric);
        tbooty.appendChild(tr);

        total += parseInt(addTo.dataset.price);
        checkout.querySelector('table .total-cost').textContent = `R ${total}`;
        carts.forEach(cart => {
            cart.textContent = cartCount;
        })
        addTo.textContent = 'Added to cart';
        addTo.style.pointerEvents = 'none';
    })
})

cart.addEventListener('click', () => {
    checkout.style.visibility = 'visible';
    anime({
        targets: checkout,
        duration: 300,
        translateX: ['100%', 0],
        easing: 'easeInOutSine'
    })
})

cartClose.addEventListener('click', () => {
    anime({
        targets: checkout,
        duration: 300,
        translateX: [0, '100%'],
        easing: 'easeInOutSine',
        complete: () => {
            checkout.style.visibility = 'hidden';            
        }
    })
})