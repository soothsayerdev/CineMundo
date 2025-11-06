// Espera todo o HTML ser carregado antes de executar o código.
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO CARROSSEL DE FILMES ---

    // 1. Selecionar os elementos do HTML
    const track = document.querySelector('.carrossel-track');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const slides = Array.from(track.children); // Transforma os slides em uma lista (array)

    // Medida de segurança: se os elementos não existirem, o código para.
    if (!track || !prevButton || !nextButton || slides.length === 0) {
        console.error('Elementos do carrossel não foram encontrados!');
        return;
    }

    // 2. Definir variáveis de controle
    let currentIndex = 0; // Começa no primeiro filme (índice 0)
    const totalSlides = slides.length; // O número total de filmes (12, no seu caso)
    
    // Pega a largura do primeiro slide + sua margem para saber o quanto mover
    const slideWidth = slides[0].getBoundingClientRect().width + 20; // 220px de largura + 20px de margem (10px de cada lado)

    // 3. Criar a função que move o carrossel
    const moveToSlide = (targetIndex) => {
        // Calcula a nova posição e aplica a transformação
        track.style.transform = `translateX(-${slideWidth * targetIndex}px)`;
        currentIndex = targetIndex; // Atualiza o índice atual
    }

    // 4. Adicionar os eventos de clique nos botões
    
    // Botão "Próximo"
    nextButton.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        
        // Se chegar ao final, volta para o primeiro filme (efeito de loop)
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        moveToSlide(nextIndex);
    });

    // Botão "Anterior"
    prevButton.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;

        // Se estiver no primeiro e clicar em voltar, vai para o último filme
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        moveToSlide(prevIndex);
    });
});