// 🌐 URL da API
const API_URL = 'http://localhost:3000/api/clientes';

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0️⃣ SLIDER DE PROMOÇÕES (HERO) 🎬
    // ==========================================
    const heroSlides = document.querySelectorAll('.hero-slider a');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        
        function nextSlide() {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }
        
        setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }
    
    // ==========================================
    // 1️⃣ CARROSSEL DE FILMES 🎡
    // ==========================================
    const carrosselTrack = document.querySelector('.carrossel-track');
    const carrosselSlides = document.querySelectorAll('.carrossel-slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (carrosselTrack && carrosselSlides.length > 0) {
        let currentIndex = 0;
        const slidesPorPagina = 4;
        const totalSlides = carrosselSlides.length;
        const slideWidth = 240;

        function updateCarousel() {
            const offset = -(currentIndex * slideWidth);
            carrosselTrack.style.transform = `translateX(${offset}px)`;
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentIndex < totalSlides - slidesPorPagina) {
                    currentIndex++;
                    updateCarousel();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarousel();
                }
            });
        }
    }

    // ==========================================
    // 2️⃣ CADASTRO 📝
    // ==========================================
    const formCadastro = document.getElementById('form-cadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nome = document.getElementById('cadastro-nome').value;
            const email = document.getElementById('cadastro-email').value;
            const senha = document.getElementById('cadastro-senha').value;

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nome, email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Cadastro realizado com sucesso! 🎉');
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
    // 3️⃣ LOGIN 🔐
    // ==========================================
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`Bem-vindo de volta, ${data.nome}! 🍿`);
                    localStorage.setItem('usuarioNome', data.nome);
                    localStorage.setItem('usuarioId', data.id);
                    window.location.href = 'principal.html';
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