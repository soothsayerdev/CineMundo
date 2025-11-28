# 🧪 Guia de Testes - CineMundo

## 🚀 Passo a Passo para Testar as Correções

### 1️⃣ Preparar o Banco de Dados

Certifique-se de que você tem o banco de dados MySQL rodando com a tabela `clientes`:

```sql
CREATE DATABASE IF NOT EXISTS cinemundo;
USE cinemundo;

CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2️⃣ Configurar e Iniciar o Backend

```bash
# Navegar até a pasta da API
cd cinemundo-api

# Instalar dependências (se ainda não instalou)
npm install

# Verificar configuração do banco em config/database.js
# Certifique-se de que as credenciais estão corretas:
# - host: localhost
# - user: seu_usuario
# - password: sua_senha
# - database: cinemundo

# Iniciar o servidor
node server.js
```

**Saída esperada:**
```
Servidor rodando na porta 3000
Conectado ao banco de dados MySQL
```

### 3️⃣ Abrir o Frontend

Você tem duas opções:

#### Opção A: Abrir diretamente no navegador
```bash
# Abra o arquivo no seu navegador favorito
open cinemundo-front/principal.html
# ou
google-chrome cinemundo-front/principal.html
# ou
firefox cinemundo-front/principal.html
```

#### Opção B: Usar um servidor local (recomendado)
```bash
cd cinemundo-front

# Se tiver Python instalado:
python3 -m http.server 8000

# Ou use a extensão Live Server do VS Code
# Clique com botão direito em principal.html > "Open with Live Server"
```

Depois acesse: `http://localhost:8000/principal.html`

---

## ✅ Testes a Realizar

### Teste 1: Carrossel de Filmes

1. Abra `principal.html`
2. Role a página até a seção **"Filmes em Cartaz"**
3. Clique no botão **`<`** (anterior)
   - ✅ Não deve acontecer nada (já está no início)
4. Clique no botão **`>`** (próximo)
   - ✅ Os filmes devem deslizar para a esquerda mostrando os próximos 4
5. Continue clicando em **`>`**
   - ✅ Deve parar de avançar quando chegar nos últimos 4 filmes
6. Clique em **`<`** para voltar
   - ✅ Deve voltar deslizando suavemente

**Resultado esperado:** Navegação suave entre os filmes, 4 por vez.

---

### Teste 2: Slider de Promoções (Hero)

1. Permaneça na página principal
2. Observe o topo da página (hero section)
3. Aguarde 5 segundos
   - ✅ A imagem de promoção deve trocar automaticamente
4. Aguarde mais 5 segundos
   - ✅ Deve voltar para a primeira imagem

**Resultado esperado:** Alternância automática entre as promoções.

---

### Teste 3: Botão Cadastre-se e Toggle

1. Clique no botão **"Login"** no menu superior
2. Você deve ver a tela de login
3. No painel laranja à direita, clique no botão **"Cadastre-se"**
   - ✅ O formulário deve deslizar para mostrar o cadastro
   - ✅ Animação suave de transição
4. No painel laranja à esquerda, clique em **"Entrar"**
   - ✅ Deve voltar para a tela de login

**Resultado esperado:** Transição suave entre login e cadastro com animação de slide.

---

### Teste 4: Cadastro de Novo Usuário

1. Na tela de login, alterne para **Cadastro**
2. Preencha os campos:
   - **Nome:** João Silva
   - **Email:** joao@teste.com
   - **Senha:** 123456
3. Clique em **"Inscrever-se"**

**Resultados esperados:**

✅ **Sucesso:**
- Alert: "Cadastro realizado com sucesso! 🎉"
- Usuário criado no banco de dados

❌ **Erro - Email duplicado:**
- Alert: "Erro ao criar cliente. Verifique se o email já existe."

❌ **Erro - Campos vazios:**
- Alert: "Todos os campos são obrigatórios!"

❌ **Erro - Servidor offline:**
- Alert: "Erro ao conectar com o servidor."

---

### Teste 5: Login com Usuário Cadastrado

1. Alterne para a tela de **Login**
2. Preencha os campos:
   - **Email:** joao@teste.com
   - **Senha:** 123456
3. Clique em **"Entrar"**

**Resultados esperados:**

✅ **Sucesso:**
- Alert: "Bem-vindo de volta, João Silva! 🍿"
- Redirecionamento automático para `principal.html`
- Nome e ID salvos no localStorage

❌ **Erro - Usuário não encontrado:**
- Alert: "Usuário não encontrado ou senha incorreta."

❌ **Erro - Senha incorreta:**
- Alert: "Usuário não encontrado ou senha incorreta."

---

### Teste 6: Verificar LocalStorage (Opcional)

Após fazer login com sucesso:

1. Abra o **DevTools** do navegador (F12)
2. Vá para a aba **Application** (Chrome) ou **Storage** (Firefox)
3. Expanda **Local Storage** > `http://localhost:8000`
4. Verifique se existem:
   - ✅ `usuarioNome`: João Silva
   - ✅ `usuarioId`: 1 (ou outro número)

**Uso futuro:** Esses dados podem ser usados para mostrar o nome do usuário em outras páginas.

---

## 🐛 Possíveis Problemas e Soluções

### Problema: "Erro ao conectar com o servidor"

**Causa:** Backend não está rodando ou porta errada.

**Solução:**
1. Verifique se o backend está rodando: `node server.js`
2. Confirme que está na porta 3000
3. Verifique o console do navegador (F12) para erros de CORS

---

### Problema: Carrossel não funciona

**Causa:** JavaScript não foi carregado corretamente.

**Solução:**
1. Abra o DevTools (F12) > Console
2. Veja se há erros de carregamento
3. Verifique se o caminho está correto: `<script src="js/script.js"></script>`
4. Recarregue a página com Ctrl+Shift+R (hard reload)

---

### Problema: Login não redireciona

**Causa:** Caminho errado ou bloqueio do navegador.

**Solução:**
1. Verifique o console do navegador para erros
2. Confirme que `principal.html` está no mesmo diretório
3. Se usar `file://`, troque por servidor local (http.server)

---

### Problema: Animação do toggle não funciona

**Causa:** CSS não foi carregado ou classe `active` não está sendo aplicada.

**Solução:**
1. Verifique o console para erros de CSS
2. Inspecione o elemento `.container` e veja se a classe `active` está sendo adicionada/removida
3. Confirme que o `login.css` está vinculado corretamente

---

## 📊 Teste com Múltiplos Usuários

1. Cadastre vários usuários com emails diferentes
2. Faça login com cada um
3. Verifique se o nome correto aparece no alert

---

## 🎯 Checklist Final

- [ ] Backend rodando sem erros
- [ ] Banco de dados criado e acessível
- [ ] Carrossel de filmes navegando corretamente
- [ ] Slider de promoções alternando automaticamente
- [ ] Toggle login/cadastro funcionando
- [ ] Cadastro de usuário salvando no banco
- [ ] Login validando credenciais
- [ ] Redirecionamento após login funcionando
- [ ] LocalStorage armazenando dados do usuário

---

## 💡 Dicas Extras

### Ver requisições HTTP no navegador
1. Abra DevTools (F12)
2. Vá para a aba **Network**
3. Clique em "Cadastrar" ou "Login"
4. Veja as requisições POST para `/api/clientes`

### Testar API diretamente (Postman/Insomnia)

**Cadastro:**
```http
POST http://localhost:3000/api/clientes
Content-Type: application/json

{
  "nome": "Maria Santos",
  "email": "maria@teste.com",
  "senha": "senha123"
}
```

**Login:**
```http
POST http://localhost:3000/api/clientes/login
Content-Type: application/json

{
  "email": "maria@teste.com",
  "senha": "senha123"
}
```

---

## 📝 Relatório de Bugs

Se encontrar algum problema, anote:
1. O que você estava fazendo
2. O que esperava que acontecesse
3. O que realmente aconteceu
4. Mensagens de erro (console ou alert)
5. Capturas de tela (se possível)

---

**Boa sorte com os testes! 🎬🍿**
