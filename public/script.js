let currentIndex = 0;
const filmes = document.querySelectorAll('.filme');
const totalFilmes = filmes.length;
const filmesPorPagina = 4; 

function mostrarFilmes() {
    // Oculta todos os filmes
    filmes.forEach((filme, index) => {
        filme.style.display = 'none'; // Oculta todos os filmes
        if (index >= currentIndex && index < currentIndex + filmesPorPagina) {
            filme.style.display = 'block'; // Mostra apenas os filmes da sessão atual
        }
    });
}

function updateCarousel() {
    const offset = -currentIndex * (100 / filmesPorPagina); // Ajusta a posição com base no número de filmes visíveis
    document.querySelector('.filme-container').style.transform = `translateX(${offset}%)`;
}

document.getElementById('next').addEventListener('click', () => {
    if (currentIndex < Math.ceil(totalFilmes / filmesPorPagina) - 1) {
        currentIndex++;
        mostrarFilmes();
        updateCarousel();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        mostrarFilmes();
        updateCarousel();
    }
});

// Inicializa a exibição dos filmes
mostrarFilmes();