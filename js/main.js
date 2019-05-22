class Link {
    constructor(el){
        this.el = el;
    }

    setCurrent(isCurrent = true) {
        this.el.classList[isCurrent ? 'add' : 'remove']('current');
    }
}

class Main {
    constructor(el) {
        this.DOM = {
            el: el
        };
        this.links = [];
        this.sections = [];
        this.DOM.nav = this.DOM.el.querySelector('nav');
        this.DOM.openResume = this.DOM.el.querySelector('#open-resume');
        this.DOM.resumeView = document.querySelector('.resume-view');
        this.DOM.nav.querySelectorAll('a').forEach(link => {
            this.links.push(new Link(link));
        })
        this.DOM.el.querySelectorAll('section').forEach(section => {
            this.sections.push(section);
        })

        this.init()
    }

    init() {
        this.load();
        this.checkScrollPos();
        if(window.innerWidth >= 1280)
            this.position();
        this.initEvent()
    }

    initEvent() {
        window.addEventListener('resize', _.throttle(() => {
                if(window.innerWidth >= 1280) {
                    this.position();
                }
                else
                    this.DOM.nav.removeAttribute('style');
            }, 100)
        );

        this.DOM.nav.querySelectorAll('a').forEach(navlink => {
            navlink.addEventListener('click', (e) => {
                e.preventDefault();
                let scrollTo;
                this.links.forEach(link => {
                    link.setCurrent(false)
                })
                new Link(navlink).setCurrent();
                if(navlink.dataset.section == 'home') {
                    scrollTo = 0;
                } else {
                    scrollTo = (this.DOM.el.querySelector(`#${navlink.dataset.section}`).offsetTop);
                } 
                window.scrollTo(0, scrollTo)
            })
        })

        window.addEventListener('scroll', _.throttle(() => {
                this.checkScrollPos();
            }, 100)
        );

        this.DOM.openResume.addEventListener('click', e => {
            e.preventDefault();
            this.DOM.resumeView.classList.add('opened');
        })

        this.DOM.resumeView.querySelector('.resume-mask').addEventListener('click', () => {
            this.DOM.resumeView.classList.remove('opened');
        })
    }
    
    // Fix postion the element relative to its parent
    position() {
        const box = document.querySelector('.att');
        // The bounding info of the container
        const mainBox = {
            width:  this.DOM.el.offsetWidth,
            heigt: this.DOM.el.offsetHeight
        };

        // Positoning the elements
        this.DOM.nav.style.left = box.style.left = `${mainBox.width - (450 - main.offsetLeft)}px`;
        this.DOM.nav.style.top = `${main.offsetTop - (main.offsetHeight / 2)}px`;        
    }

    // Check the position of the scrollbar and determine which 
    // link should be active depending on the scroll position
    checkScrollPos() {
        let fromTop = window.scrollY;
        this.links.forEach(link => {
            let section = document.querySelector(`#${link.el.dataset.section}`);
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.setCurrent();
            } else {
                link.setCurrent(false);
            }
        })
    }

    // Loader 
    load() {
        anime.timeline({
            targets: this.DOM.el.parentElement.querySelectorAll('.loader svg path'),
            delay: anime.stagger(100),
            strokeDashoffset: [anime.setDashoffset, 0],
            opacity: [0, 1],
            duration: 1500,
            easing: 'easeInSine'
        }).add({
            fill: '#fff',
            delay: anime.stagger(150)
        }).add({
            targets: this.DOM.el.parentElement.querySelectorAll('.loader svg'),
            opacity: [1, 0],
            complete: () => {
                document.body.classList.remove('loading');
            }
        })
    }
}

document.querySelectorAll('.work a').forEach(work => {
    work.addEventListener('focus', () => work.parentElement.parentElement.parentElement.classList.add('onhover'));
    work.addEventListener('blur', () => work.parentElement.parentElement.parentElement.classList.remove('onhover'));
})

const main = document.querySelector('main');
new Main(document.querySelector('main'))