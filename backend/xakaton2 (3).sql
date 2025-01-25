-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 24 2025 г., 21:37
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `xakaton2`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Feedback`
--

CREATE TABLE `Feedback` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `text` text,
  `createdAt` datetime NOT NULL,
  `rating` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

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
(7, 6, 'ывмап', '2025-01-24 18:13:49', 2),
(8, 5, 'gggg', '2025-01-24 19:48:43', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `Interviews`
--

CREATE TABLE `Interviews` (
  `id` int NOT NULL,
  `candidate` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `notes` text,
  `status` enum('Scheduled','Completed') DEFAULT 'Scheduled',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Дамп данных таблицы `Interviews`
--

INSERT INTO `Interviews` (`id`, `candidate`, `position`, `date`, `notes`, `status`, `createdAt`) VALUES
(1, 'Олег Львович', 'Режиссёр', '2025-01-24', 'Ждём с нетерпением', 'Scheduled', '2025-01-24 01:10:34'),
(2, 'Евгений Шеляки', 'Режиссёр', '2025-01-24', 'Интересно', 'Completed', '2025-01-24 02:26:42'),
(3, 'Test', 'Test', '2025-01-30', 'Test Test Test', 'Scheduled', '2025-01-24 16:47:49');

-- --------------------------------------------------------

--
-- Структура таблицы `TestResults`
--

CREATE TABLE `TestResults` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `score` int DEFAULT NULL,
  `completedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Дамп данных таблицы `TestResults`
--

INSERT INTO `TestResults` (`id`, `userId`, `score`, `completedAt`) VALUES
(1, 5, 4, '2025-01-24 19:56:09'),
(2, 5, 4, '2025-01-24 19:57:13'),
(3, 5, 4, '2025-01-24 20:00:48'),
(4, 5, 4, '2025-01-24 20:01:40'),
(5, 5, 4, '2025-01-24 20:02:08'),
(6, 5, 4, '2025-01-24 20:28:33'),
(7, 5, 4, '2025-01-24 20:41:57'),
(8, 5, 4, '2025-01-24 20:42:49'),
(9, 1, 7, '2025-01-24 20:43:22'),
(10, 1, 4, '2025-01-24 20:51:58');

-- --------------------------------------------------------

--
-- Структура таблицы `Tests`
--

CREATE TABLE `Tests` (
  `id` int NOT NULL,
  `description` text NOT NULL,
  `questions` json NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

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
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Денис', 'honorxpremium75@gmail.com', '$2b$10$JKYfD6iDVYSi0KJBn14CI.f/4fEBGk5TKmMCwUrTPASGfe7SxsKBe', 'user', '2025-01-24 00:29:45', '2025-01-24 00:29:45'),
(5, 'Наталья', 'nata@mail.ru', '$2b$10$TwvxZXtLdqqQIxJsA.BmQeU7JMB7g26xxicwoA4QqYES0DUKd8dj2', 'user', '2025-01-24 02:44:59', '2025-01-24 02:44:59'),
(6, 'миронова наталья', 'mir13@mail.ru', '$2b$10$IkrnC4IChGabGaSRkknviuQj7a/IcPvpVUHAnHjeuOJDeE39Kpk9e', 'user', '2025-01-24 03:39:27', '2025-01-24 03:39:27'),
(7, 'Иван', 'ivan@mail.ru', '$2b$10$Fq.zY1Wv581KsWOkKK68lePlFKh19uGs0FcBC0XewinX92BikxpDq', 'user', '2025-01-24 04:55:22', '2025-01-24 04:55:22');

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
  ADD PRIMARY KEY (`id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `Interviews`
--
ALTER TABLE `Interviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `TestResults`
--
ALTER TABLE `TestResults`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `Tests`
--
ALTER TABLE `Tests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
