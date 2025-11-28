-- ==================================================================
-- BANCO DE DADOS CINEMUNDO (ATUALIZADO)
-- ==================================================================

USE database CINEMUNDO;
GO
-- ==================================================================
-- CRIAÇÃO DAS TABELAS

-- 1. Tabela CLIENTE (Essencial para o Login e Recuperação)
CREATE TABLE Cliente (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Nome_Completo NVARCHAR(150) NOT NULL,
    CPF VARCHAR(14) NULL,            -- Para nota fiscal
    Email NVARCHAR(100) UNIQUE NOT NULL, -- Usado no Login
    Senha NVARCHAR(255) NOT NULL,    -- Obrigatório para acesso
    Celular VARCHAR(20) NULL,        -- Para SMS/Spam
    Data_Cadastro DATETIME DEFAULT GETDATE()
);

-- 2. Tabela FILME (Lista dos 8 filmes do projeto)
CREATE TABLE Filme (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(150) NOT NULL,
    Genero NVARCHAR(50),             -- Ex: Ação, Drama
    Duracao INT,                     -- Minutos
    Classificacao VARCHAR(10),       -- 12, 14, 16, 18
    Poster NVARCHAR(255),            -- Caminho da imagem (img/filme.jpg)
    Em_Cartaz BIT DEFAULT 1          -- 1 = Ativo
);

-- 3. Tabela PROMOCOES (Para os Combos)
CREATE TABLE Promocao (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Titulo NVARCHAR(100) NOT NULL,
    Descricao NVARCHAR(255),
    Preco DECIMAL(10,2) NOT NULL,
    Imagem NVARCHAR(255)
);

-- 4. Tabela COMPRA (O "Carrinho" Finalizado)
-- Esta tabela é fundamental para a lógica dos 15 minutos (Drama)
CREATE TABLE Compra (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Cliente_ID INT NOT NULL,
    Data_Hora DATETIME DEFAULT GETDATE(),
    Valor_Total DECIMAL(10,2) NOT NULL,
    Metodo_Pagamento VARCHAR(20),    -- 'PIX' ou 'CARTAO'
    Codigo_Pix NVARCHAR(MAX) NULL,   -- O código aleatório gerado
    
    -- Status: 'PENDENTE', 'PAGO', 'CANCELADO' (Pelo drama de 15min)
    Status_Compra VARCHAR(20) DEFAULT 'PENDENTE', 
    
    CONSTRAINT FK_Compra_Cliente FOREIGN KEY (Cliente_ID) REFERENCES Cliente(ID)
);

-- 5. Tabela ITENS_COMPRA (O que tem dentro da compra)
-- Guarda o histórico mesmo que o preço do filme mude no futuro
CREATE TABLE Itens_Compra (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    Compra_ID INT NOT NULL,
    Descricao_Item NVARCHAR(255) NOT NULL, -- Ex: "Ingresso: Sharknado (Meia)"
    Quantidade INT DEFAULT 1,
    Valor_Unitario DECIMAL(10,2) NOT NULL,
    Tipo_Item VARCHAR(20),           -- 'INGRESSO' ou 'COMBO'
    
    CONSTRAINT FK_Itens_Compra FOREIGN KEY (Compra_ID) REFERENCES Compra(ID)
);

-- ==================================================================
-- CARGA DE DADOS OBRIGATÓRIA (INSERTS)
-- ==================================================================

-- Inserir os teus 8 Filmes Específicos
INSERT INTO Filme (Titulo, Genero, Classificacao, Poster) VALUES 
('O Auto da Compadecida 2', 'Comédia', '12', 'img/autodacompadecida.jpg'),
('Bailarina - John Wick', 'Ação', '16', 'img/bailarinajohn.jpg'),
('Ainda Estou Aqui', 'Drama', '14', 'img/aindaestouaqui.jpg'),
('Capitão América: Admirável Mundo Novo', 'Ação', '12', 'img/capitaoamerica.jpg'),
('A Garota Dinamarquesa', 'Drama', '16', 'img/garotadinarmaquesa.jpg'),
('Segundo Tempo', 'Drama', '12', 'img/segundotempo.jpg'),
('Sharknado', 'Ficção/Trash', '14', 'img/skarnado.jpg'),
('O Menino e a Garça', 'Animação', 'Livre', 'img/meninoegarca.jpg');

-- Inserir Promoções Básicas
INSERT INTO Promocao (Titulo, Preco, Descricao) VALUES
('Combo Pipoca M + Refri', 35.00, 'Pipoca Manteiga e Refrigerante 500ml'),
('Combo Casal', 55.00, '2 Pipocas M e 2 Bebidas'),
('Balde Colecionável', 45.00, 'Balde exclusivo do filme Sharknado');

-- Inserir um Usuário Teste (Senha 12345 simples)
INSERT INTO Cliente (Nome_Completo, Email, Senha, CPF) VALUES
('Usuario Teste', 'teste@cinemundo.com', '12345', '000.000.000-00');
