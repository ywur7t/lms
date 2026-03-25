-- Таблица с тестами
CREATE TABLE quizzes (
    id SERIAL PRIMARY KEY,
    type VARCHAR(10) NOT NULL CHECK (type IN ('M', 'S', 'ONE', 'MULTI')),
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица для Matching заданий (вопрос-ответ)
CREATE TABLE matching_tasks (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Таблица для Sorting заданий (варианты для сортировки)
CREATE TABLE sorting_options (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    correct_order INTEGER NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Таблица для Single/Multi Choice заданий (варианты ответов)
CREATE TABLE choice_options (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0
);

-- Таблица для хранения правильных ответов (для универсальности)
CREATE TABLE correct_answers (
    id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
    answer_value TEXT NOT NULL,
    answer_order INTEGER DEFAULT 0
);


-- Вставка тестов
INSERT INTO quizzes (id, type, title) VALUES
(1, 'M', 'Сопоставьте спортсмена и страну'),
(2, 'M', 'Титл'),
(3, 'S', 'Отсортируйте спортсменов по популярности'),
(4, 'ONE', 'Где проходили Олимпийские игры 2024?'),
(5, 'MULTI', 'Какие виды спорта входят в Олимпиаду?'),
(6, 'ONE', 'В каком году прошли первые Олимпийские игры?');

-- Matching задания для quiz_id = 1
INSERT INTO matching_tasks (quiz_id, question, answer, sort_order) VALUES
(1, 'Thomas Ceccon', 'Italy', 1),
(1, 'Yusuf Dikec', 'Turkey', 2),
(1, 'Kim Ye-ji', 'South Korea', 3),
(1, 'Stephen Nedoroscik', 'USA', 4);

-- Matching задания для quiz_id = 2
INSERT INTO matching_tasks (quiz_id, question, answer, sort_order) VALUES
(2, 'Вар1', 'Отв1', 1),
(2, 'Вар2', 'Отв2', 2),
(2, 'Вар3', 'Отв3', 3),
(2, 'Вар4', 'Отв4', 4);

-- Sorting задания для quiz_id = 3
INSERT INTO sorting_options (quiz_id, option_text, correct_order, sort_order) VALUES
(3, 'Michael Phelps', 1, 1),
(3, 'Snoop Dogg', 2, 2),
(3, 'Kim Ye-ji', 3, 3),
(3, 'Thomas Ceccon', 4, 4);

-- Choice options для quiz_id = 4 (Single Choice)
INSERT INTO choice_options (quiz_id, option_text, is_correct, sort_order) VALUES
(4, 'Paris', TRUE, 1),
(4, 'Tokyo', FALSE, 2),
(4, 'London', FALSE, 3),
(4, 'Berlin', FALSE, 4);

-- Choice options для quiz_id = 5 (Multi Choice)
INSERT INTO choice_options (quiz_id, option_text, is_correct, sort_order) VALUES
(5, 'Swimming', TRUE, 1),
(5, 'Football', TRUE, 2),
(5, 'Chess', FALSE, 3),
(5, 'Athletics', TRUE, 4);

-- Choice options для quiz_id = 6 (Single Choice)
INSERT INTO choice_options (quiz_id, option_text, is_correct, sort_order) VALUES
(6, '1896', TRUE, 1),
(6, '1900', FALSE, 2),
(6, '1924', FALSE, 3),
(6, '2000', FALSE, 4);

-- Правильные ответы для универсального доступа
INSERT INTO correct_answers (quiz_id, answer_value, answer_order) VALUES
(1, 'Italy', 1),
(1, 'Turkey', 2),
(1, 'South Korea', 3),
(1, 'USA', 4),
(2, 'Отв1', 1),
(2, 'Отв2', 2),
(2, 'Отв3', 3),
(2, 'Отв4', 4),
(3, 'Michael Phelps', 1),
(3, 'Snoop Dogg', 2),
(3, 'Kim Ye-ji', 3),
(3, 'Thomas Ceccon', 4),
(4, 'Paris', 1),
(5, 'Swimming', 1),
(5, 'Football', 2),
(5, 'Athletics', 3),
(6, '1896', 1);

