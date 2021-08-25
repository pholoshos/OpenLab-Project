-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2021 at 02:13 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `openlab`
--

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `title` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `body` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `title` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `id` int(11) NOT NULL,
  `state` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `user` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_work_id` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `author_work_id` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`title`, `id`, `state`, `description`, `user`, `author`, `user_work_id`, `author_work_id`) VALUES
('goto get more pens', 5, 'open', 'default description', 'John', 'pholosho', '', '201817990'),
('call marie', 6, 'open', 'tell her to bring everything here', 'Victor', 'pholosho', '', '201817990'),
('call the lawyer', 7, 'open', 'hello, i would like you to ask the lawyer about the construct, let me know what happens', 'John', 'pholosho', '', '201817990'),
('hello', 8, 'open', 'default description', 'Phora', 'pholosho', '', '201817990');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `authkey` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `work_id` varchar(11) COLLATE utf8_unicode_ci NOT NULL,
  `position` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `account` varchar(12) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `phone`, `authkey`, `email`, `work_id`, `position`, `state`, `password`, `account`) VALUES
(1, 'pholosho', '0720648709', 'udCTsMQ0y2IXRzFmlpfw4AK78oNxYct6GjZ1qHPvnOB5g3brSD', 'pholosho@gmail.com', '201817990', 'manager', 'active', '12345678', 'manager'),
(13, 'Phora ', '0720648709', 'Yei8rO7VdWcwjTpNqs1UG0t93oMEQCzB26hZn4FuDgR5IlKfLx', 'iamaemail@gmail.com', '201901723', 'intern', '', '12345678', 'employee'),
(14, 'default name', '0720648709', 'X8fmnYasPuxNIRE9d7OVpjF0AkKcJSyZBTCez51Ltg4MbD3vqo', 'example@email.com', 'admin_phlos', 'worker', '', '12345678', 'employee'),
(15, 'default name', '0720648709', 'R3yFgALXV12Dd9zOSIBWqvxw4sMcNlnaorZfp6kJHY8jbPE5K7', 'example@email.com', 'ckRLMxCzNv', 'worker', '', '12345678', 'employee'),
(16, 'carol', '0720648709', 'B04IhJbReYSvNnUZlcgXwA5zqf6C197iyPsDjxGQWVrTH2pFdO', 'example@email.com', 'Q5oqut0EtQ', 'worker', '', '12345678', 'employee');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `work_id` (`work_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
