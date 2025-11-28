document.addEventListener('DOMContentLoaded', () => {
    
    console.log("CineMundo: Script carregado com sucesso! 🎬");
    atualizarIconeCarrinho(); 

    /* ===========================================================
       LÓGICA DE INTERFACE (MODAL)
       =========================================================== */
    const modal = document.getElementById('modal-cadastro');
    const btnAbrir = document.getElementById('btn-abrir-cadastro');
    const btnFechar = document.querySelector('.close-modal');

    if (modal && btnAbrir) {
        btnAbrir.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
        });

        if (btnFechar) {
            btnFechar.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    /* ===========================================================
       LÓGICA DE API - LOGIN
       =========================================================== */
    const formLogin = document.getElementById('form-login');

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            try {
                // A URL continua a mesma, pois a API roda na porta 3000
                const response = await fetch('http://localhost:3000/api/clientes/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('usuario', JSON.stringify(data.usuario));
                    alert("Bem-vindo de volta, " + data.usuario.nome + "!");
                    window.location.href = "principal.html";
                } else {
                    alert(data.message || "Erro no login.");
                }
            } catch (error) {
                console.error("Erro de Conexão:", error);
                alert("O servidor parece estar offline. Tente mais tarde.");
            }
        });
    }

    /* ===========================================================
       LÓGICA DE API - CADASTRO
       =========================================================== */
    const formCadastro = document.getElementById('form-cadastro');

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const dados = {
                nome: document.getElementById('cad-nome').value,
                cpf: document.getElementById('cad-cpf').value,
                email: document.getElementById('cad-email').value,
                senha: document.getElementById('cad-senha').value
            };

            try {
                const response = await fetch('http://localhost:3000/api/clientes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                const data = await response.json();

                if (response.ok) {
                    alert("Cadastro realizado! Por favor, faça login.");
                    if (modal) modal.style.display = "none";
                    
                    const inputLoginEmail = document.getElementById('login-email');
                    if(inputLoginEmail) inputLoginEmail.value = dados.email;
                    
                } else {
                    alert("Erro: " + (data.message || "Não foi possível cadastrar."));
                }
            } catch (error) {
                console.error("Erro:", error);
                alert("Erro de conexão com o servidor.");
            }
        });
    }
}); 

// Funções Globais (Carrinho) permanecem iguais...
function atualizarIconeCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const icon = document.getElementById('contagem-carrinho');
    if(icon) icon.innerText = carrinho.length;
}