CREATE TABLE If not exists quizzes(


id SERIAL PRIMARY KEY,
type VARCHAR(1) NOT NULL,
title TEXT NOT NULL
);

CREATE TABLE if not EXISTS tasks(

id SERIAL PRIMARY KEY,
quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
question TEXT NOT NULL,
answer TEXT NOT NULL


);


INSERT INTO quizzes (id, type, title) VALUES
(1, 'M', 'Сопоставьте сооружение и город, в котором оно расположено.'),
(2, 'M', 'Сопоставьте сооружение и его высоту.');




INSERT INTO tasks (quiz_id, question, answer) VALUES

-- Quiz 1
(1, 'Башня Аль-Хамра', 'Кувейт'),
(1, 'Башня CITIC', 'Гуанчжоу'),
(1, 'Телебашня «Коктобе»', 'Алматы'),
(1, 'Си-Эн Тауэр', 'Торонто'),

-- Quiz 2
(2, 'Tokyo Skytree', '634'),
(2, 'Бурдж-Халифа', '838'),
(2, 'Эмпайр-стейт-билдинг', '448.7'),
(2, 'Останкинская башня', '540.1'),
(2, 'Lotte World Tower', '555');