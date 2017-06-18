-- phpMyAdmin SQL Dump
-- version 4.6.4deb1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 19, 2017 at 12:49 AM
-- Server version: 5.7.18-0ubuntu0.16.10.1
-- PHP Version: 7.0.18-0ubuntu0.16.10.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testing_task_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `testing_task_table`
--

CREATE TABLE `testing_task_table` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `parent` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `lft` int(11) NOT NULL,
  `rgt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `testing_task_table`
--

INSERT INTO `testing_task_table` (`id`, `item_id`, `title`, `image`, `parent`, `level`, `lft`, `rgt`) VALUES
(1, 1, 'Parent', 'http://localhost:3050/images/img02.jpg', 0, 1, 1, 8),
(2, 2, 'Child1', 'http://localhost:3050/images/img01.jpg', 1, 2, 4, 7),
(3, 3, 'Child2', 'http://localhost:3050/images/img03.jpg', 1, 2, 2, 3),
(4, 4, 'Sub_child1', 'http://localhost:3050/images/img04.jpg', 2, 3, 5, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `testing_task_table`
--
ALTER TABLE `testing_task_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `testing_task_table`
--
ALTER TABLE `testing_task_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
