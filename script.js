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
	
	// --- SCRIPT PER PARTICELLE ANIMATE SULLA HOMEPAGE ---

// Eseguiamo lo script solo se esiste l'elemento #particle-canvas
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    // Impostiamo la dimensione del canvas uguale alla finestra
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Costruttore delle Particelle
    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }

        // Metodo per disegnare la singola particella
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        // Metodo per aggiornare la posizione della particella
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y < 0) {
                // Se la particella esce in alto, la facciamo ripartire dal basso
                this.y = canvas.height + this.size;
            }

            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    // Creiamo l'array di particelle
    function init() {
        particlesArray = [];
        let numberOfParticles = 50; // Aumenta o diminuisci per più o meno particelle
        for (let i = 0; i < numberOfParticles; i++) {
            let size = Math.random() * 2 + 0.5; // Grandezza da 0.5 a 2.5
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let directionX = (Math.random() * 0.4) - 0.2; // Movimento orizzontale lento
            let directionY = -Math.random() * 0.4 - 0.1; // Movimento verso l'alto costante
            let color = 'rgba(51, 176, 255, 0.5)'; // Colore (blu primario semi-trasparente)

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    // Loop di animazione
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }

    // Aggiorna la dimensione del canvas se la finestra viene ridimensionata
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); // Ricalcola le particelle per la nuova dimensione
    });

    init();
    animate();
}

});