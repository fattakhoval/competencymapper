-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 24 2025 г., 05:48
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Feedback`
--

INSERT INTO `Feedback` (`id`, `userId`, `text`, `createdAt`, `rating`) VALUES
(1, 1, '123', '2025-01-24 05:24:56', 5),
(2, 1, '5446', '2025-01-24 05:26:53', 5),
(3, 1, '124', '2025-01-24 05:31:30', 5),
(4, 1, 'test', '2025-01-24 05:32:20', 2),
(5, 1, 'Работает', '2025-01-24 05:32:43', 1);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Interviews`
--

INSERT INTO `Interviews` (`id`, `candidate`, `position`, `date`, `notes`, `status`, `createdAt`) VALUES
(1, 'Олег Львович', 'Режиссёр', '2025-01-24', 'Ждём с нетерпением', 'Scheduled', '2025-01-24 01:10:34'),
(2, 'Евгений Шеляки', 'Режиссёр', '2025-01-24', 'Интересно', 'Completed', '2025-01-24 02:26:42');

-- --------------------------------------------------------

--
-- Структура таблицы `TestResults`
--

CREATE TABLE `TestResults` (
  `id` int NOT NULL,
  `userId` int NOT NULL,
  `testId` int NOT NULL,
  `score` int DEFAULT NULL,
  `completedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Tests`
--

CREATE TABLE `Tests` (
  `id` int NOT NULL,
  `description` text NOT NULL,
  `questions` json NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Денис', 'honorxpremium75@gmail.com', '$2b$10$JKYfD6iDVYSi0KJBn14CI.f/4fEBGk5TKmMCwUrTPASGfe7SxsKBe', 'user', '2025-01-24 00:29:45', '2025-01-24 00:29:45'),
(5, 'Наталья', 'nata@mail.ru', '$2b$10$TwvxZXtLdqqQIxJsA.BmQeU7JMB7g26xxicwoA4QqYES0DUKd8dj2', 'user', '2025-01-24 02:44:59', '2025-01-24 02:44:59');

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
  ADD KEY `userId` (`userId`),
  ADD KEY `testId` (`testId`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `Interviews`
--
ALTER TABLE `Interviews`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `TestResults`
--
ALTER TABLE `TestResults`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Tests`
--
ALTER TABLE `Tests`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `TestResults`
--
ALTER TABLE `TestResults`
  ADD CONSTRAINT `testresults_ibfk_2` FOREIGN KEY (`testId`) REFERENCES `Tests` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
