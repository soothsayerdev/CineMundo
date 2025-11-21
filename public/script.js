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

/* ===========================================================
       5. PÁGINA DE COMPRA - AIDICONAR AO CARRINHO
       =========================================================== */
function adicionarAoCarrinho(nomeFilme) {
    if(!localStorage.getItem('usuario')) {
        alert("Faça login primeiro!");
        window.location.href = "login.html";
        return;
    }
    localStorage.setItem('filmeSelecionado', nomeFilme);
    window.location.href = "carrinho.html";
}

// Atualiza o numerozinho vermelho no carrinho
function atualizarIconeCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const icon = document.getElementById('contagem-carrinho');
    if(icon) icon.innerText = carrinho.length;
}

// Função genérica para adicionar qualquer coisa
function adicionarItem(titulo, preco, tipo) {
    // Verifica login antes
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        alert("Por favor, faça login para comprar.");
        window.location.href = "login.html";
        return;
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    carrinho.push({
        titulo: titulo,
        preco: preco,
        tipo: tipo // 'ingresso' ou 'combo'
    });

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarIconeCarrinho();
    
    // Feedback visual simples
    alert(`"${titulo}" (${tipo}) adicionado ao carrinho!`);
}

// Funções específicas para os botões do HTML
function comprarIngresso(nomeFilme, tipoEntrada) {
    let preco = (tipoEntrada === 'inteira') ? 20.00 : 10.00;
    let nomeItem = `${nomeFilme} - ${tipoEntrada.toUpperCase()}`;
    adicionarItem(nomeItem, preco, 'ingresso');
}

function comprarCombo(nomeCombo) {
    // Define preços fixos para combos ou recebe como parametro
    let preco = 45.00; // Valor exemplo para combos
    adicionarItem(nomeCombo, preco, 'combo');
}

// Ao carregar a página
document.addEventListener("DOMContentLoaded", atualizarIconeCarrinho);

function irParaCarrinho() {
    //  Verificar login antes
    if(!localStorage.getItem('usuario')) { alert('Faça login'); return; }
    window.location.href = 'compra.html';
}
