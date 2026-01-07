const slides = document.querySelectorAll('.slide');
const music = document.getElementById('bgMusic');

let current = 0;
let musicStarted = false;

// Cambio de diapositiva + corazones + música
document.body.addEventListener('click', (event) => {

    // Iniciar música solo al primer toque
    if (!musicStarted) {
        music.volume = 0;
        music.play();
        musicStarted = true;
        fadeInMusic();
    }

    nextSlide();
    createHeart(event.clientX, event.clientY);
});

// Cambiar diapositivas
function nextSlide() {
    slides[current].classList.remove('active');
    current++;

    if (current >= slides.length) {
        current = 0;
    }

    slides[current].classList.add('active');
}

// Corazones
function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '24px';
    heart.style.animation = 'float 2s ease forwards';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
}

// Botón final
document.getElementById('loveButton').addEventListener('click', (e) => {
    e.stopPropagation();

    const message = document.getElementById('loveMessage');
    message.style.display = 'flex';

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }

    setTimeout(() => {
        message.style.display = 'none';
        current = 0;
        slides.forEach(s => s.classList.remove('active'));
        slides[0].classList.add('active');
    }, 4000);
});

// Fade in de la música
function fadeInMusic() {
    let vol = 0;
    const fade = setInterval(() => {
        if (vol < 0.35) {
            vol += 0.02;
            music.volume = vol;
        } else {
            clearInterval(fade);
        }
    }, 200);
}
