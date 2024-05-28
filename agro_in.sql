-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 28, 2024 at 08:02 AM
-- Server version: 8.0.30
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agro_in`
--

-- --------------------------------------------------------

--
-- Table structure for table `artikel`
--

CREATE TABLE `artikel` (
  `id` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `summary` varchar(255) NOT NULL,
  `featured_image` varchar(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `artikel`
--

INSERT INTO `artikel` (`id`, `created`, `title`, `slug`, `content`, `summary`, `featured_image`) VALUES
('1dc3957b-435b-47ec-bd82-6d32413ab005', '2024-05-21 20:23:26', 'Harga padi dan rumah apakah mahal', 'harga-pangan-yang-murah-dari-harga-pangan', 'Berikut adalah contoh artikel yang dapat membantu Anda memahami cara menulis artikel yang baik dan benar:\r\n\r\n11 Contoh Teks Artikel serta Langkah-langkah Penulisannya: Artikel ini menjelaskan definisi, ciri, dan jenis teks artikel, serta 11 contoh teks artikel ilmiah dan non-ilmiah yang bisa ditampilkan di media-media massa. Anda juga bisa mengetahui langkah-langkah penulisannya, mulai dari memilih topik, memahami pembaca, memulai menulis, hingga menyunting tulisan.\r\n\r\nContoh Teks Artikel dan Strukturnya: Artikel ini menjelaskan tentang jenis karya tulis yang memiliki tiga struktur, yaitu tesis, argumentasi, dan penegasan ulang. Artikel bisa berisi persuasi atau informasi tambahan untuk pembaca. Lihat contoh teks artikel tentang peregangan sebelum olahraga dan mengapa masih suka.\r\n\r\n10 Contoh Artikel Bahasa Indonesia Lengkap dengan Strukturnya: Artikel ini menunjukkan contoh artikel dengan berbagai tema, seperti komunikasi yang efektif bagi penolak vaksin, dan menjelangi pembaca.', 'Contoh Teks Artikel serta Langkah-langkah Penulisannya: Artikel ini menjelaskan definisi, ciri, dan jenis teks artikel, serta 11 contoh teks artikel ilmiah dan non-ilmiah yang bisa ditampilkan di media-media massa...', 'ppppppp'),
('dsfer4532fsfcfer343', '2024-05-21 00:00:00', 'Harga pangan yang murah dari harga pangan', 'harga-pangan-yang-murah-dari-harga-pangan', 'Berikut adalah contoh artikel yang dapat membantu Anda memahami cara menulis artikel yang baik dan benar:\\r\\n\\r\\n11 Contoh Teks Artikel serta Langkah-langkah Penulisannya: Artikel ini menjelaskan definisi, ciri, dan jenis teks artikel, serta 11 contoh teks artikel ilmiah dan non-ilmiah yang bisa ditampilkan di media-media massa. Anda juga bisa mengetahui langkah-langkah penulisannya, mulai dari memilih topik, memahami pembaca, memulai menulis, hingga menyunting tulisan.\\r\\n\\r\\nContoh Teks Artikel dan Strukturnya: Artikel ini menjelaskan tentang jenis karya tulis yang memiliki tiga struktur, yaitu tesis, argumentasi, dan penegasan ulang. Artikel bisa berisi persuasi atau informasi tambahan untuk pembaca. Lihat contoh teks artikel tentang peregangan sebelum olahraga dan mengapa masih suka.\\r\\n\\r\\n10 Contoh Artikel Bahasa Indonesia Lengkap dengan Strukturnya: Artikel ini menunjukkan contoh artikel dengan berbagai tema, seperti komunikasi yang efektif bagi penolak vaksin, dan menjelangi pembaca.', 'Contoh Teks Artikel serta Langkah-langkah Penulisannya: Artikel ini menjelaskan definisi, ciri, dan jenis teks artikel, serta 11 contoh teks artikel ilmiah dan non-ilmiah yang bisa ditampilkan di media-media massa...', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(155) NOT NULL,
  `name` varchar(225) NOT NULL,
  `email` varchar(225) NOT NULL,
  `profile_image` varchar(225) DEFAULT NULL,
  `job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `profile_image`, `job`, `password`) VALUES
('115748af-05bb-47a4-8af6-cef2eb83565b', 'Ikbal', 'ikbal@gmail.com', '1716271302781-david-wollschlegel-dRi6xP2ZPBk-unsplash.jpg', NULL, '$2a$10$Stl7EDwpUS5usCHBKUina.cIv6etCwKD1pDnAShMBmAS1Mr2oHlNS'),
('3e175786-b99b-4420-a34f-7b70a23e629b', 'Sahabat', 'sahabat@gmail.com', '1716278265314-david-wollschlegel-dRi6xP2ZPBk-unsplash.jpg', NULL, '$2a$10$0Uw2y146Tzxd9zDVMMg8p.ikxEe3WzlCTY5dU2cv72BPHuVzbsJqC'),
('57f18eba-a4e6-4e77-9d02-2024b7c044ec', 'Basofi', 'basofi@gmail.com', '1716272198318-david-wollschlegel-dRi6xP2ZPBk-unsplash.jpg', NULL, '$2a$10$GZOgOLtO/4KGeWsfTFg5FeKQnaW3mYZVMRM/wh.BaJPWENiHdBfOy'),
('8f7ac40b-dc90-4a7f-a83e-a6a2c5cd84fc', 'rezal nur syaifudin', 'rezal@gmail.com', '1716824097400-pexels-suju-1132558.jpg', 'Petani', '$2a$10$odBvSZJHFBlS54ZL7sLlOe8t1LcqHVRU8gl6ZAzQRc2pVn/tH7ka2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `artikel`
--
ALTER TABLE `artikel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
