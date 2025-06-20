document.addEventListener('DOMContentLoaded', () => {

    // ---- FUNZIONALITÀ MENU HAMBURGER (MOBILE) ----
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Puoi aggiungere un'animazione all'icona del burger se vuoi
        });
    }


    // ---- ANIMAZIONE FADE-IN SUGLI ELEMENTI ----
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px" // Appare quando l'elemento è a 100px dal fondo della finestra
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // ---- GESTIONE LINK ATTIVO NELLA NAVIGAZIONE ----
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        // Se il link corrisponde alla pagina corrente, o se è la home (index.html o vuoto)
        if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

});