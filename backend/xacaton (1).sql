-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 26 2025 г., 16:32
-- Версия сервера: 5.7.39
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `xacaton`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Feedback`
--

CREATE TABLE `Feedback` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `text` text,
  `createdAt` datetime NOT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Feedback`
--

INSERT INTO `Feedback` (`id`, `userId`, `text`, `createdAt`, `rating`) VALUES
(1, 1, '123', '2025-01-24 05:24:56', 5),
(2, 1, '5446', '2025-01-24 05:26:53', 5),
(3, 1, '124', '2025-01-24 05:31:30', 5),
(4, 1, 'test', '2025-01-24 05:32:20', 2),
(5, 1, 'Работает', '2025-01-24 05:32:43', 1),
(6, 6, 'запустился сервер', '2025-01-24 06:40:44', 5),
(10, 6, 'все хорошо', '2025-01-25 06:53:25', 2),
(11, 7, 'вкаеп7р989', '2025-01-26 14:40:46', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `Interviews`
--

CREATE TABLE `Interviews` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `position` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `notes` text,
  `status` enum('Scheduled','Completed') DEFAULT 'Scheduled',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Interviews`
--

INSERT INTO `Interviews` (`id`, `id_user`, `position`, `date`, `notes`, `status`, `createdAt`) VALUES
(8, 8, 'джун разработчик', '2025-01-15', 'dcvtuyb', 'Scheduled', '2025-01-26 12:54:08'),
(9, 8, 'сеньор разработчик', '2025-01-07', 'ычсям', 'Scheduled', '2025-01-26 12:58:00');

-- --------------------------------------------------------

--
-- Структура таблицы `TestResults`
--

CREATE TABLE `TestResults` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `score` json DEFAULT NULL,
  `completedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `TestResults`
--

INSERT INTO `TestResults` (`id`, `userId`, `score`, `completedAt`) VALUES
(6, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-25 13:09:42'),
(7, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 3, \"percentage\": 75}, \"Tectnick\": {\"score\": 4, \"percentage\": 100}}', '2025-01-25 13:10:36'),
(8, 6, '{\"Leader\": {\"score\": 2, \"percentage\": 50}, \"People\": {\"score\": 3, \"percentage\": 75}, \"Tectnick\": {\"score\": 4, \"percentage\": 100}}', '2025-01-25 13:15:17'),
(9, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 3, \"percentage\": 75}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-25 21:38:58'),
(10, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 4, \"percentage\": 100}}', '2025-01-25 21:50:57'),
(11, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-25 22:47:35'),
(12, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 12:01:21'),
(13, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 12:06:47'),
(14, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 3, \"percentage\": 75}}', '2025-01-26 12:10:06'),
(15, 11, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 12:13:14'),
(16, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 12:36:25'),
(17, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 12:38:44'),
(18, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 12:48:06'),
(19, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 3, \"percentage\": 75}, \"Tectnick\": {\"score\": 4, \"percentage\": 100}}', '2025-01-26 12:48:50'),
(20, 10, '{\"Leader\": {\"score\": 3, \"percentage\": 75}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 14:12:24'),
(21, 7, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 14:40:23'),
(22, 6, '{\"Leader\": {\"score\": 1, \"percentage\": 25}, \"People\": {\"score\": 1, \"percentage\": 25}, \"Tectnick\": {\"score\": 1, \"percentage\": 25}}', '2025-01-26 15:16:48');

-- --------------------------------------------------------

--
-- Структура таблицы `Tests`
--

CREATE TABLE `Tests` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `questions` json NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Tests`
--

INSERT INTO `Tests` (`id`, `description`, `questions`, `createdAt`) VALUES
(4, 'Как вы относитесь к работе в команде?', '{\"options\": [\"Предпочитаю работать самостоятельно\", \"Могу работать в команде при необходимости\", \"Люблю командную работу\", \"Эффективно работаю как в команде, так и самостоятельно\", \"Являюсь лидером команды\"]}', '2025-01-24 07:30:18'),
(5, 'Как вы справляетесь со стрессовыми ситуациями?', '{\"options\": [\"Избегаю стресса\", \"Стараюсь минимизировать стресс\", \"Справляюсь умеренно\", \"Хорошо работаю под давлением\", \"Превращаю стресс в продуктивность\"]}', '2025-01-24 07:30:18');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Денис', 'honorxpremium75@gmail.com', '$2b$10$JKYfD6iDVYSi0KJBn14CI.f/4fEBGk5TKmMCwUrTPASGfe7SxsKBe', 'user', '2025-01-24 00:29:45', '2025-01-24 00:29:45'),
(5, 'Наталья', 'nata@mail.ru', '$2b$10$TwvxZXtLdqqQIxJsA.BmQeU7JMB7g26xxicwoA4QqYES0DUKd8dj2', 'user', '2025-01-24 02:44:59', '2025-01-24 02:44:59'),
(6, 'миронова наталья', 'mir13@mail.ru', '$2b$10$IkrnC4IChGabGaSRkknviuQj7a/IcPvpVUHAnHjeuOJDeE39Kpk9e', 'admin', '2025-01-24 03:39:27', '2025-01-26 12:34:24'),
(7, 'Иван', 'ivan@mail.ru', '$2b$10$Fq.zY1Wv581KsWOkKK68lePlFKh19uGs0FcBC0XewinX92BikxpDq', 'user', '2025-01-24 04:55:22', '2025-01-24 04:55:22'),
(8, 'Иван', 'ivan1@mail.ru', '$2b$10$bZyhbGQmb3L7Enflt5q0I.tV4xP2T.pvqNVHtCGtuOhFcwGShcs8i', 'user', '2025-01-25 03:46:20', '2025-01-25 03:46:20'),
(9, 'Наталья', '1mir@mail.ru', '$2b$10$5eSYJLEJYqBwI6NMQplCl.1YOU4qMtSTfw/Lw4z2LYFkXqzALnOZa', 'user', '2025-01-25 03:51:53', '2025-01-25 03:51:53'),
(10, 'Иван', 'ivan11@mail.ru', '$2b$10$fCpef.8eTGTtg4rhQmRkp.ylUMb9yk/XSlBjV7eFQ5iWuEzplcRc2', 'user', '2025-01-25 14:30:08', '2025-01-25 14:30:08'),
(12, 'миронова наталья', 'mir113@mail.ru', '$2b$10$O4AYXYrk/0QX4lxKDOMQeuwEUFAl4zKcRveZ6y6c39gYQVXGquPDC', 'user', '2025-01-26 10:07:07', '2025-01-26 10:07:07');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Feedback`
--
ALTER TABLE `Feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `Interviews`
--
ALTER TABLE `Interviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`);

--
-- Индексы таблицы `TestResults`
--
ALTER TABLE `TestResults`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Индексы таблицы `Tests`
--
ALTER TABLE `Tests`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Feedback`
--
ALTER TABLE `Feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `Interviews`
--
ALTER TABLE `Interviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `TestResults`
--
ALTER TABLE `TestResults`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `Tests`
--
ALTER TABLE `Tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Interviews`
--
ALTER TABLE `Interviews`
  ADD CONSTRAINT `interviews_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
