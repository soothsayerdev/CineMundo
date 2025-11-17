/*
HEAD: Script Principal - CineMundo
- Contém: Lógica do Carrossel de Filmes (Loop Infinito) e Hero Slider (Links Clicáveis).
*/

document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // 1. LÓGICA DO CARROSSEL DE FILMES
    // ==================================================

    const track = document.querySelector('.carrossel-track');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const viewport = document.querySelector('.carrossel-viewport');
    const itemsPerScreen = 4;

    if (track && prevButton && nextButton && viewport) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        const updateCarousel = () => {
            const slideWidth = viewport.offsetWidth / itemsPerScreen;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        };

        nextButton.addEventListener('click', () => {
            const totalSlides = slides.length;
            const maxIndex = totalSlides - itemsPerScreen;

            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop para o início
            }
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            const totalSlides = slides.length;
            const maxIndex = totalSlides - itemsPerScreen;

            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex; // Loop para o final
            }
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
        updateCarousel();
    }

    // ==================================================
    // 2. LÓGICA DO HERO SLIDER (LINKS)
    // ==================================================

    // Seleciona os LINKS (<a>) dentro do slider, não apenas as imagens
    const heroLinks = document.querySelectorAll('.hero-slider a');
    
    if (heroLinks.length > 0) {
        let currentHeroIndex = 0;
        const heroInterval = 5000; // 5 segundos

        const nextHeroImage = () => {
            // 1. Esconde o link atual
            heroLinks[currentHeroIndex].classList.remove('active');

            // 2. Calcula o próximo
            currentHeroIndex = (currentHeroIndex + 1) % heroLinks.length;

            // 3. Mostra o próximo link
            heroLinks[currentHeroIndex].classList.add('active');
        };

        setInterval(nextHeroImage, heroInterval);
    }
});