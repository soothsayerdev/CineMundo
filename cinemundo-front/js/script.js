// URL da tua API (Ajusta se a porta mudar)
const API_URL = 'http://localhost:3000/api/clientes';

// Espera o HTML carregar completamente antes de rodar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DO CARROSSEL DE FILMES 🎡
    // ==========================================
    const filmesContainer = document.querySelector('.filme-container');
    const filmes = document.querySelectorAll('.filme');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    
    // Só executa se existirem filmes na página
    if (filmesContainer && filmes.length > 0) {
        let currentIndex = 0;
        const filmesPorPagina = 4; 
        const totalFilmes = filmes.length;

        function updateCarousel() {
            // Calcula quantos % deve mover para a esquerda
            // Ex: index 1 * (100 / 4) = 25% de deslocamento
            const offset = -(currentIndex * (100 / filmesPorPagina)); 
            filmesContainer.style.transform = `translateX(${offset}%)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                // Impede de avançar se chegar ao fim
                if (currentIndex < totalFilmes - filmesPorPagina) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                // Impede de voltar se estiver no início
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
    }

    // ==========================================
    // 2. LÓGICA DE CADASTRO (REGISTER) 📝
    // ==========================================
    const formCadastro = document.getElementById('form-cadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede a página de recarregar

            // Pega os valores dos inputs
            const nome = document.getElementById('cadastro-nome').value;
            const email = document.getElementById('cadastro-email').value;
            const senha = document.getElementById('cadastro-senha').value;

            try {
                const response = await fetch(API_URL, { // POST para /api/clientes
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Cadastro realizado com sucesso! 🎉');
                    // Opcional: Mudar para a tela de login
                    // container.classList.remove("active"); 
                } else {
                    alert('Erro: ' + data.message);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar com o servidor.');
            }
        });
    }

    // ==========================================
    // 3. LÓGICA DE LOGIN 🔐
    // ==========================================
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            try {
                const response = await fetch(`${API_URL}/login`, { // POST para /api/clientes/login
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Bem-vindo de volta, ${data.nome}! 🍿`);
                    window.location.href = 'index.html'; // Redireciona para a página principal
                } else {
                    alert('Login falhou: ' + data.message);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao conectar com o servidor.');
            }
        });
    }
});