document.addEventListener('DOMContentLoaded', () => {
    
    /* ===========================================================
       1. GERAL (Funcionalidades que podem ser usadas em todo o site)
       =========================================================== */
    console.log("CineMundo: Script carregado com sucesso! 🎬");


    /* ===========================================================
       2. PÁGINA PRINCIPAL - CARROSSEL DE FILMES
       =========================================================== */
    const track = document.querySelector('.carrossel-track');
    const btnPrev = document.getElementById('prevBtn');
    const btnNext = document.getElementById('nextBtn');

    // Só executa se o carrossel existir na página
    if (track && btnPrev && btnNext) {
        let scrollAmount = 0;
        const cardWidth = 240; // Largura do card + margem (ajuste se necessário)

        btnNext.addEventListener('click', () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            scrollAmount += cardWidth;
            if (scrollAmount > maxScroll) {
                scrollAmount = 0; // Volta ao início se chegar ao fim
            }
            track.style.transform = `translateX(-${scrollAmount}px)`;
        });

        btnPrev.addEventListener('click', () => {
            scrollAmount -= cardWidth;
            if (scrollAmount < 0) {
                // Vai para o final se estiver no início (opcional)
                scrollAmount = track.scrollWidth - track.clientWidth; 
            }
            track.style.transform = `translateX(-${scrollAmount}px)`;
        });
    }


    /* ===========================================================
       3. PÁGINA DE PROMOÇÕES - ANIMAÇÃO DOS CARDS
       =========================================================== */
    const promoCards = document.querySelectorAll('.promo-card');

    // Só executa se houver cards de promoção na página
    if (promoCards.length > 0) {
        promoCards.forEach((card, index) => {
            // Define estado inicial (invisível e deslocado)
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease';

            // Animação sequencial (um após o outro)
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * (index + 1)); // 200ms de intervalo entre cada card
        });
    }


    /* ===========================================================
       4. PÁGINA DE LOGIN - MODAL DE CADASTRO
       =========================================================== */
    const modal = document.getElementById('modalCadastro');
    const btnAbrir = document.getElementById('btnAbrirCadastro');
    const btnFechar = document.getElementById('btnFecharCadastro');

    // Só executa se o modal existir (ou seja, estamos na página de Login)
    if (modal && btnAbrir && btnFechar) {
        
        // Abrir o Modal
        btnAbrir.addEventListener('click', (e) => {
            e.preventDefault(); // Previne comportamento padrão do botão
            modal.style.display = 'flex';
        });

        // Fechar o Modal (Clicar no X)
        btnFechar.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Fechar o Modal (Clicar fora da caixa branca)
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

});