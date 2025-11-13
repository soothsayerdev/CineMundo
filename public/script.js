/*
HEAD: Event Listeners e Manipulação do DOM
- DOMContentLoaded: Inicializa o script após o carregamento completo do DOM.
- Seletores: Armazena referências a elementos-chave (track, botões, slides) para manipulação.
- Validação: Interrompe a execução se os componentes essenciais do carrossel não forem encontrados.

CORE: Lógica do Carrossel (Slide-a-Slide, Loop Infinito)
- Variáveis de Controle: Define 'currentIndex' para rastrear o slide ativo e 'totalSlides'.
- Cálculo de Deslocamento: Utiliza 'getBoundingClientRect()' para obter a largura dinâmica do slide e adiciona a margem (20px) para definir o 'slideWidth' exato por translação.
- Função 'moveToSlide': Abstrai a lógica de movimento. Aplica um 'transform: translateX()' ao 'track' para movê-lo para o índice alvo.
- Event Handlers (Click):
    - 'nextButton': Incrementa 'currentIndex'. Implementa a lógica de loop (reseta para 0 se 'nextIndex >= totalSlides').
    - 'prevButton': Decrementa 'currentIndex'. Implementa a lógica de loop (define como 'totalSlides - 1' se 'prevIndex < 0').
*/

document.addEventListener('DOMContentLoaded', () => {

    const track = document.querySelector('.carrossel-track');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const slides = Array.from(track.children);

    if (!track || !prevButton || !nextButton || slides.length === 0) {
        console.error('Elementos do carrossel não foram encontrados!');
        return;
    }

    let currentIndex = 0;
    const totalSlides = slides.length;
    
    const slideWidth = slides[0].getBoundingClientRect().width + 20;

    const moveToSlide = (targetIndex) => {
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        currentIndex = targetIndex;
    }

    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        moveToSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        moveToSlide(prevIndex);
    });
});