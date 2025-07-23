-- Utilizadores
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Grupos
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Membros do grupo
CREATE TABLE group_members (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    group_nickname VARCHAR(50) NOT NULL,
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (group_id, user_id)
);

-- Categorias de desafios
CREATE TABLE challenge_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- Templates de desafios, com categoria e dificuldade
CREATE TABLE challenge_templates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category_id INT,
    difficulty INT DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES challenge_categories(id) ON DELETE SET NULL
);


-- Competição semanal por grupo
CREATE TABLE weekly_competitions (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    winner_user_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (winner_user_id) REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE (group_id, start_date)
);

-- Desafios diários atribuídos a grupos — **instâncias concretas dos desafios do dia**
CREATE TABLE challenges (
    id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    competition_id INT,
    template_id INT NOT NULL,
    challenge_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (competition_id) REFERENCES weekly_competitions(id) ON DELETE SET NULL,
    FOREIGN KEY (template_id) REFERENCES challenge_templates(id) ON DELETE RESTRICT,
    UNIQUE (group_id, challenge_date)
);



-- Submissões dos utilizadores por desafio
CREATE TABLE challenge_submissions (
    id SERIAL PRIMARY KEY,
    challenge_id INT NOT NULL,
    user_id INT NOT NULL,
    submission_text TEXT,
    submission_media_url TEXT,
    submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenge_id) REFERENCES challenges(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (challenge_id, user_id)
);

-- Avaliações das submissões feitas pelos membros
CREATE TABLE challenge_ratings (
    id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL,
    rater_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    rated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (submission_id) REFERENCES challenge_submissions(id) ON DELETE CASCADE,
    FOREIGN KEY (rater_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (submission_id, rater_id)
);

-- Pontuações semanais para ranking
CREATE TABLE weekly_scores (
    id SERIAL PRIMARY KEY,
    competition_id INT NOT NULL,
    user_id INT NOT NULL,
    total_points INT NOT NULL DEFAULT 0,
    FOREIGN KEY (competition_id) REFERENCES weekly_competitions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (competition_id, user_id)
);
