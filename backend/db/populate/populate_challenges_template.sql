-- Inserir categorias de desafios
INSERT INTO challenge_categories (name) VALUES 
('Criatividade'),
('Fitness'),
('Culinária'),
('Fotografia'),
('Social'),
('Conhecimento'),
('Aventura'),
('Arte'),
('Música'),
('Sustentabilidade');

-- Inserir templates de desafios

-- Criatividade
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Desenho em 5 minutos', 'Desenha algo que vês à tua volta em apenas 5 minutos', (SELECT id FROM challenge_categories WHERE name = 'Criatividade'), 1),
('História em 3 palavras', 'Conta uma história completa usando apenas 3 palavras', (SELECT id FROM challenge_categories WHERE name = 'Criatividade'), 2),
('Origami criativo', 'Faz uma figura de origami e partilha o resultado', (SELECT id FROM challenge_categories WHERE name = 'Criatividade'), 3),
('Poesia improvisada', 'Escreve um poema sobre o que acabaste de comer', (SELECT id FROM challenge_categories WHERE name = 'Criatividade'), 2),
('Invenção do dia', 'Inventa um objeto útil para resolver um problema do teu dia-a-dia', (SELECT id FROM challenge_categories WHERE name = 'Criatividade'), 4);

-- Fitness
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('10 flexões', 'Faz 10 flexões (adapta à tua condição física)', (SELECT id FROM challenge_categories WHERE name = 'Fitness'), 1),
('Caminhada de 15min', 'Faz uma caminhada de 15 minutos e partilha onde foste', (SELECT id FROM challenge_categories WHERE name = 'Fitness'), 1),
('Desafio do equilíbrio', 'Fica em equilíbrio numa perna só durante 30 segundos', (SELECT id FROM challenge_categories WHERE name = 'Fitness'), 2),
('Dança livre', 'Dança a tua música favorita durante 5 minutos', (SELECT id FROM challenge_categories WHERE name = 'Fitness'), 2),
('Treino em casa', 'Cria e executa um treino de 20 minutos apenas com o peso corporal', (SELECT id FROM challenge_categories WHERE name = 'Fitness'), 4);

-- Culinária
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Receita com 3 ingredientes', 'Prepara algo delicioso usando apenas 3 ingredientes', (SELECT id FROM challenge_categories WHERE name = 'Culinária'), 2),
('Pequeno-almoço criativo', 'Reinventa o teu pequeno-almoço de forma criativa', (SELECT id FROM challenge_categories WHERE name = 'Culinária'), 1),
('Sobremesa saudável', 'Cria uma sobremesa saudável sem açúcar refinado', (SELECT id FROM challenge_categories WHERE name = 'Culinária'), 3),
('Prato da avó', 'Recria uma receita tradicional da tua família', (SELECT id FROM challenge_categories WHERE name = 'Culinária'), 3),
('Jantar internacional', 'Prepara um prato típico de um país que nunca visitaste', (SELECT id FROM challenge_categories WHERE name = 'Culinária'), 4);

-- Fotografia
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Foto macro', 'Tira uma foto bem de perto de algo pequeno', (SELECT id FROM challenge_categories WHERE name = 'Fotografia'), 1),
('Golden hour', 'Captura uma foto durante o nascer ou pôr do sol', (SELECT id FROM challenge_categories WHERE name = 'Fotografia'), 2),
('Sombras interessantes', 'Encontra e fotografa sombras com formas interessantes', (SELECT id FROM challenge_categories WHERE name = 'Fotografia'), 2),
('Reflexos', 'Tira uma foto criativa usando reflexos (água, espelhos, vidros)', (SELECT id FROM challenge_categories WHERE name = 'Fotografia'), 3),
('Perspetiva única', 'Fotografa algo comum de um ângulo completamente diferente', (SELECT id FROM challenge_categories WHERE name = 'Fotografia'), 3);

-- Social
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Elogio genuíno', 'Faz um elogio sincero a alguém que não esperava', (SELECT id FROM challenge_categories WHERE name = 'Social'), 1),
('Conversa com estranho', 'Inicia uma conversa amigável com alguém que não conheces', (SELECT id FROM challenge_categories WHERE name = 'Social'), 3),
('Ajuda inesperada', 'Ajuda alguém sem que te peçam', (SELECT id FROM challenge_categories WHERE name = 'Social'), 2),
('Telefonema especial', 'Liga para alguém de quem tens saudades', (SELECT id FROM challenge_categories WHERE name = 'Social'), 2),
('Ato de bondade', 'Faz algo gentil por um completo estranho', (SELECT id FROM challenge_categories WHERE name = 'Social'), 3);

-- Conhecimento
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Facto curioso', 'Aprende um facto interessante e partilha-o', (SELECT id FROM challenge_categories WHERE name = 'Conhecimento'), 1),
('Palavra nova', 'Aprende uma palavra nova noutra língua e usa-a numa frase', (SELECT id FROM challenge_categories WHERE name = 'Conhecimento'), 2),
('História local', 'Descobre algo interessante sobre a história da tua cidade', (SELECT id FROM challenge_categories WHERE name = 'Conhecimento'), 2),
('Skill de 10 minutos', 'Aprende o básico de uma nova habilidade em 10 minutos', (SELECT id FROM challenge_categories WHERE name = 'Conhecimento'), 3),
('Documentário mini', 'Vê um documentário curto sobre algo que não conheces', (SELECT id FROM challenge_categories WHERE name = 'Conhecimento'), 2);

-- Aventura
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Lugar novo', 'Visita um lugar na tua cidade onde nunca foste', (SELECT id FROM challenge_categories WHERE name = 'Aventura'), 2),
('Rua aleatória', 'Escolhe uma rua aleatoriamente e explora-a', (SELECT id FROM challenge_categories WHERE name = 'Aventura'), 1),
('Transporte diferente', 'Vai a algum lado usando um meio de transporte que raramente usas', (SELECT id FROM challenge_categories WHERE name = 'Aventura'), 2),
('Geocaching', 'Procura um tesouro escondido usando uma app de geocaching', (SELECT id FROM challenge_categories WHERE name = 'Aventura'), 4),
('Micro-aventura', 'Cria uma aventura de 1 hora na tua própria área', (SELECT id FROM challenge_categories WHERE name = 'Aventura'), 3);

-- Arte
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Arte urbana', 'Encontra e fotografa arte de rua interessante', (SELECT id FROM challenge_categories WHERE name = 'Arte'), 1),
('Escultura natural', 'Cria uma pequena escultura usando apenas elementos naturais', (SELECT id FROM challenge_categories WHERE name = 'Arte'), 2),
('Autorretrato criativo', 'Faz um autorretrato de forma não convencional', (SELECT id FROM challenge_categories WHERE name = 'Arte'), 3),
('Arte reciclada', 'Cria algo artístico usando apenas materiais reciclados', (SELECT id FROM challenge_categories WHERE name = 'Arte'), 3),
('Instalação temporária', 'Cria uma pequena instalação artística em espaço público (respeitando o local)', (SELECT id FROM challenge_categories WHERE name = 'Arte'), 4);

-- Música
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Playlist temática', 'Cria uma playlist de 5 músicas sobre um tema específico', (SELECT id FROM challenge_categories WHERE name = 'Música'), 1),
('Ritmo com objetos', 'Cria um ritmo musical usando apenas objetos do quotidiano', (SELECT id FROM challenge_categories WHERE name = 'Música'), 2),
('Karaoke improvisado', 'Canta uma música (pode ser no chuveiro!) e grava 30 segundos', (SELECT id FROM challenge_categories WHERE name = 'Música'), 2),
('Instrumento DIY', 'Constrói um instrumento musical simples com materiais caseiros', (SELECT id FROM challenge_categories WHERE name = 'Música'), 4),
('Descoberta musical', 'Encontra um artista novo de um género que não costumas ouvir', (SELECT id FROM challenge_categories WHERE name = 'Música'), 2);

-- Sustentabilidade
INSERT INTO challenge_templates (title, description, category_id, difficulty) VALUES 
('Dia sem plástico', 'Passa o dia sem usar plásicos descartáveis', (SELECT id FROM challenge_categories WHERE name = 'Sustentabilidade'), 2),
('Reutilização criativa', 'Dá uma nova vida a algo que ias deitar fora', (SELECT id FROM challenge_categories WHERE name = 'Sustentabilidade'), 2),
('Refeição zero waste', 'Prepara uma refeição sem produzir lixo', (SELECT id FROM challenge_categories WHERE name = 'Sustentabilidade'), 3),
('Transporte verde', 'Faz todas as deslocações do dia de forma ecológica', (SELECT id FROM challenge_categories WHERE name = 'Sustentabilidade'), 2),
('Audit energético', 'Identifica 3 formas de poupar energia em casa e implementa uma', (SELECT id FROM challenge_categories WHERE name = 'Sustentabilidade'), 3);