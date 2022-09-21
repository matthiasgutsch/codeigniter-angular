-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Set 21, 2022 alle 07:36
-- Versione del server: 10.3.36-MariaDB-cll-lve
-- Versione PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eyrafmzx_dbapi33pro`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `admin_user`
--

CREATE TABLE `admin_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `api_url` varchar(244) DEFAULT NULL,
  `token` varchar(2550) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `lang` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `admin_user`
--

INSERT INTO `admin_user` (`id`, `username`, `password`, `first_name`, `last_name`, `api_url`, `token`, `is_active`, `created_at`, `lang`) VALUES
(1, 'admin', '7bd223b311462a0ac074d084101cd79c', 'Matthias', 'Gutsch', 'https://api.typopress.it', 'C5fdC4dfd1613C2AAb2Ab26dC21d1fCbA5E2E36A42A1CCE2Ad3C4E25bEdfA3E3b1db52AAEA4bfC64A1225bfbAEb3d1Edf545Af2EE52f14bd125223d12ACdEf4b25fdfdEdA1E16A664Edff4b42d1db142AAE6521Af3b31dC251AA3366C636ECf3AEC4E25CAC12b1d1C63AEd3EA64d2C5b2bfd6bdf232CA1b35Afdfd52AfCE554Cdbd51125Cd222A22A166Ef55A6142126Ed1b2A24Af16', 1, '2018-10-27 05:25:13', 'it'),
(2, 'matthias', '7bd223b311462a0ac074d084101cd79c', 'Nicola', 'Sacchi', 'https://api.typopress.it', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzMzMjU0NTksImV4cCI6MTY2NDg2MTQ1OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.7VWl7dwF4ao2ciqD7pKMI6uLguZJ71UVlJpEFl3YtqQ', 1, '2018-10-27 05:25:13', 'en'),
(20, 'nicola', '7bd223b311462a0ac074d084101cd79c', 'Nicola', 'Sacchi', 'https://api.typopress.it', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzMzMjU0NTksImV4cCI6MTY2NDg2MTQ1OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.7VWl7dwF4ao2ciqD7pKMI6uLguZJ71UVlJpEFl3YtqQ', 1, '0000-00-00 00:00:00', 'it');

-- --------------------------------------------------------

--
-- Struttura della tabella `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `location_id` int(10) DEFAULT NULL,
  `works_id` varchar(1022) NOT NULL,
  `employee_id` int(10) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(233) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `appointments`
--

INSERT INTO `appointments` (`id`, `title`, `user_id`, `category_id`, `location_id`, `works_id`, `employee_id`, `description`, `image`, `is_featured`, `is_active`, `created_at`, `date`) VALUES
(2, 'trtrt', 2, 121, 8, '42,45', 8, 'ddd', 'DCE090ZX1_1100x1.jpeg', 0, 1, '2018-10-27 06:12:09', '2021-10-07 00:00'),
(3, 'Intervento chirurgico Sera', 2, 122, 14, '45,42', 42, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', 'img3.jpg', 0, 1, '2018-10-27 07:12:09', '2021-11-02 00:00'),
(8, 'Altro', 1, 102, 8, '7,39,44', 102, 'verificare', NULL, 1, 0, '2021-07-21 20:52:50', '2022-03-11 08:00'),
(9, 'Intervento ordinario', 1, 110, 14, '7,39', 14, 'dsdssdf', NULL, 0, 1, '2021-07-21 20:52:59', '2021-11-28 12:00'),
(10, 'Intervento', 1, 110, 0, '7,14', 102, '<p>rtttrt</p>', NULL, 0, 0, '2021-07-21 20:58:22', '2021-10-28 00:00'),
(11, 'Intervento ordinario', 1, 111, 8, '39,7', 116, 'gttertetret', NULL, 1, 0, '2021-07-21 20:58:32', '2022-03-25 00:00'),
(13, 'Visita di controllo', 1, 110, NULL, '0', 0, '<p>bvggfg</p>', NULL, 0, 0, '2021-07-21 23:34:56', '2021-10-07 00:00'),
(16, 'Amministrazione', 1, 102, 14, '7,14,39', 14, '', NULL, 0, 0, '2021-07-25 09:38:35', '2021-11-02 00:00'),
(17, 'Intervento', 1, 111, NULL, '0', 0, '<p>matthias</p>', NULL, 0, 1, '2021-07-25 09:38:51', '2021-11-02 00:00'),
(19, 'Intervento ordinario', 1, 102, 14, '14,39,42', 14, '<p>trrrtrttrtr</p>', NULL, 0, 0, '2021-07-25 16:09:11', '2021-11-02 00:00'),
(40, 'Intervento ordinario', 1, 110, 14, '43,39', 8, 'ytututtyttyuuuuty', 'DCE090ZX1_1100x.jpeg', 1, 0, '2021-08-05 14:01:44', '2022-03-09 08:00'),
(42, 'Intervento ordinario', 1, 102, 8, '7,39,43,42', 8, 'sddds', NULL, 0, 0, '2021-08-05 15:02:24', '2021-11-02 00:00'),
(43, 'Interventi di controllo', 1, 102, 8, '14,39,42,43', 8, 'Controllo Motore', NULL, 1, 0, '2021-08-05 15:02:42', '2021-11-02 00:00'),
(44, 'Intervento chirurgico', 1, 110, 8, '7', 8, '<p>uyuyyu</p>', NULL, 1, 0, '2021-08-05 15:03:14', '2021-11-02 00:00'),
(45, 'Intervento ordinario', 1, 102, 8, '7,14,39', 8, 'hello', NULL, 0, 0, '2021-08-09 07:43:13', '2022-03-29 06:45'),
(46, 'Altro', 1, 102, 8, '39', 8, 'ddssdsdsd dsdsdsds dsdsdsd ddssdsd', 'logo__nuovo_2021_def3.png', 0, 1, '2021-08-10 16:59:38', '2021-11-02 00:00'),
(49, 'Interventi di controllo', 1, 102, 8, '39', 8, 'controllo macchina', NULL, 1, 0, '2021-08-24 07:04:29', '2021-10-07 00:00'),
(50, 'Intervento ordinario', 1, 102, 14, '7', 8, 'trtryytyrrytyrty', NULL, 0, 0, '2021-08-27 07:02:25', '2021-10-07 00:00'),
(51, 'Intervento ordinario', 1, 102, 8, '7,46,44,39', 41, 'tyrytytryrrtytr', NULL, 1, 1, '2021-08-29 23:21:44', '2022-04-22 09:15'),
(52, 'Intervento chirurgico', 1, 102, 8, '14', 14, '', NULL, 0, 1, '2021-08-31 07:17:02', '2022-03-30 00:00'),
(53, 'Intervento ordinario', 1, 102, 14, '7,39', 8, 'dggfgfgdfgd', NULL, 1, 1, '2021-09-02 14:05:48', '2022-04-02 00:00'),
(55, 'Intervento ordinario', 1, 102, 8, '7,39,44', 14, 'ttryt', NULL, 1, 0, '2021-09-03 07:38:20', '2022-03-29 05:45'),
(56, 'Altro', 1, 110, 8, '39,7,44,46', 102, 'rtertr', NULL, 0, 1, '2021-09-04 07:12:29', '2022-04-23 05:30'),
(57, 'Intervento ordinario', 1, 100002, 8, '7,39', 120, 'yuyuuuy', NULL, 1, 0, '2021-09-13 07:50:37', '2022-09-09 14:30');

-- --------------------------------------------------------

--
-- Struttura della tabella `appointment_type`
--

CREATE TABLE `appointment_type` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `appointment_type`
--

INSERT INTO `appointment_type` (`id`, `category_name`, `category_description`, `user_id`) VALUES
(8, 'Intervento ordinario', 'sdssdssddsd trytyrtyrty', '1'),
(14, 'Altro', 'asasassa', '1'),
(39, 'Intervento chirurgico Sera', '', '2'),
(40, 'Interventi di controllo', 'saaas', '1'),
(43, 'prova categoria', '', '2'),
(44, 'trtrt', '', '2'),
(46, 'Amministrazione', 'Amministrazione', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `billings`
--

CREATE TABLE `billings` (
  `id` int(11) NOT NULL,
  `number` varchar(10) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `appointment_id` int(10) DEFAULT NULL,
  `order_id` varchar(122) DEFAULT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(244) DEFAULT NULL,
  `works_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `subtotal` varchar(255) DEFAULT NULL,
  `vat` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL,
  `is_paid` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `billings`
--

INSERT INTO `billings` (`id`, `number`, `title`, `user_id`, `appointment_id`, `order_id`, `category_id`, `description`, `image`, `is_featured`, `is_active`, `created_at`, `date`, `works_id`, `skills`, `subtotal`, `vat`, `total`, `is_paid`) VALUES
(54, '1', 'trtrt', 2, 2, NULL, 121, 'ddd', NULL, 0, 0, '2021-10-04 22:57:38', '2021-11-14', '42', '[{\"description\":\"sdsdsdsd\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12}]', '12', '0', '12', 0),
(55, '2', 'Intervento chirurgico Sera', 2, 3, NULL, 122, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', NULL, 0, 0, '2021-10-04 23:04:49', '2021-10-12', '45,42', '[{\"description\":\"Prodotto\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"fdfddf\",\"qty\":1,\"price\":\"34\",\"itemTotal\":34}]', '46', '0', '46', 1),
(57, '3', 'Intervento ordinario', 1, 9, NULL, 110, 'dsdssdf', NULL, 0, 0, '2021-10-25 22:32:16', '2021-10-12', '7,14,39,42,43', '[{\"description\":\"Prodotto 1\",\"qty\":\"22\",\"price\":\"102\",\"itemTotal\":2244},{\"description\":\"Prodotto 2\",\"qty\":\"20\",\"price\":\"1.50\",\"itemTotal\":30},{\"description\":\"323223\",\"qty\":1,\"price\":\"233\",\"itemTotal\":233},{\"description\":\"3232233232\",\"qty\":1,\"price\":\"233\",\"itemTotal\":233},{\"description\":\"ewewwerww\",\"qty\":1,\"price\":\"123\",\"itemTotal\":123},{\"description\":\"werrwrwrw\",\"qty\":1,\"price\":\"123\",\"itemTotal\":123}]', '2986', '656.92', '3642.92', 1),
(85, '1', 'Amministrazione', 1, 56, NULL, 110, 'sddfsffdsdsfdfdsf', NULL, 0, 0, '2021-11-13 21:08:08', '2021-10-19', '14,39,7,43,44', '[{\"description\":\"rrtre fdgfgddfgdgf\",\"qty\":\"123\",\"price\":\"34\",\"itemTotal\":4182},{\"description\":\"treret\",\"qty\":1,\"price\":\"45\",\"itemTotal\":45},{\"description\":\"fdgfdgdfgfgfgfdg\",\"qty\":1,\"price\":\"323\",\"itemTotal\":323},{\"description\":\"yyytutyuytyutyt\",\"qty\":1,\"price\":\"23\",\"itemTotal\":23},{\"description\":\"dsgfhjgfhj\",\"qty\":1,\"price\":\"23\",\"itemTotal\":23},{\"description\":\"gjhghhjgjhghgf\",\"qty\":1,\"price\":\"554\",\"itemTotal\":554},{\"description\":\"fdfgggdf\",\"qty\":1,\"price\":\"54\",\"itemTotal\":54},{\"description\":\"gfdggff\",\"qty\":1,\"price\":\"55\",\"itemTotal\":55},{\"description\":\"ddgg\",\"qty\":1,\"price\":\"54\",\"itemTotal\":54},{\"description\":\"ddg\",\"qty\":1,\"price\":\"34\",\"itemTotal\":34},{\"description\":\"gdfgdfg\",\"qty\":1,\"price\":\"55\",\"itemTotal\":55},{\"description\":\"fdfggf\",\"qty\":1,\"price\":\"54\",\"itemTotal\":54}]', '5456', '1200.3200000000002', '6656.32', 1),
(86, '2', 'Intervento ordinario', 1, 45, NULL, 102, 'hello dsfsffs', NULL, 0, 0, '2021-11-13 21:08:38', '2021-10-30 08:30', '7,14,39', '[{\"description\":\"gdfgfdgfgfgfg\",\"qty\":\"121\",\"price\":\"34\",\"itemTotal\":4114}]', '4114', '905.08', '5019.08', 1),
(87, '4', 'Fattura', 1, NULL, NULL, 111, 'tttrrttrtyyyytytr', NULL, 0, 0, '2021-11-14 18:53:28', '2021-12-14', '', '[{\"description\":\"yyttyy\",\"qty\":\"12\",\"price\":\"4554.50\",\"itemTotal\":31881.5},{\"description\":\"ytrryryt\",\"qty\":1,\"price\":\"55\",\"itemTotal\":55},{\"description\":\"ertttrre\",\"qty\":1,\"price\":\"122\",\"itemTotal\":122}]', '54831', '12062.82', '66893.82', 1),
(88, '7', 'Amministrazione', 1, 14, NULL, 110, '<p>fdgfdfgfgdffg</p>', NULL, 1, 0, '2021-11-16 21:38:54', '2021-07-05 23:35', '', '[{\"description\":\"Prodotto\",\"qty\":1,\"price\":\"12\",\"itemTotal\":\"\"},{\"description\":\"Prodotto 3\",\"qty\":1,\"price\":\"33\",\"itemTotal\":\"\"}]', '45', '9.9', '54.9', 1),
(89, '8', 'Fattura', 1, 57, NULL, 111, '', NULL, 1, 0, '2021-11-16 21:40:45', '2021-09-21', '7,14', '[{\"description\":{\"id\":\"100011\",\"title\":\"Beta Tools Cacciavite - 23 cm\",\"description\":\"\",\"description_full\":\"\",\"works_id\":\"\",\"category_id\":\"Attrezzatura Casa\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"1232\",\"code_int\":\"32322323\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"12\",\"price_extra\":\"9.50\",\"image\":\"https://api.typopress.it/media/images/x05_01_thumbnail_011.jpg\",\"created_at\":\"2022-02-16 07:44:27\",\"skills\":\"[]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100001\"},\"qty\":1,\"price\":12,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100008\",\"title\":\"yytyutuyyu\",\"description\":\"3ds\",\"description_full\":\"dsfsdffsdf\",\"works_id\":\"49\",\"category_id\":\"Attrezzatura Casa\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"222\",\"code_int\":\"323\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"33\",\"price_extra\":\"323\",\"image\":\"https://api.typopress.it/media/images/\",\"created_at\":\"2022-02-15 11:31:00\",\"skills\":\"[]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"\"},\"qty\":\"22\",\"price\":1,\"itemTotal\":32},{\"description\":{\"id\":\"100003\",\"title\":\"240 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"48,7\",\"category_id\":\"Matonelle\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"32323423423\",\"code_int\":\"342234234322\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"322\",\"price_extra\":\"34343\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_015.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":23,\"itemTotal\":23232}]', '57', '12.54', '69.53999999999999', 1),
(90, '10', 'Amministrazione', 1, 8, NULL, 102, 'verificare', NULL, 1, 0, '2021-11-24 07:27:48', '2021-11-24 10:00', '7,14', '[{\"description\":\"yryyrtrty\",\"qty\":1,\"price\":\"5544\",\"itemTotal\":5544},{\"description\":\"tryyt\",\"qty\":1,\"price\":\"554\",\"itemTotal\":554}]', '6098', '1341.56', '7439.5599999999995', 1),
(91, '5', '', 1, NULL, NULL, 110, 'sdsdsddsfdfdfffsdf', NULL, 0, 0, '2022-01-06 08:27:28', '2022-01-05', '', '[{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":\"12\",\"price\":\"127\",\"itemTotal\":1524},{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":{\"id\":\"100002\",\"title\":\"200 mm\",\"description\":\"5446\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556131-1\",\"code_int\":\"4015275556131-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"10.5\",\"price_extra\":\"9\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_014.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":\"12\",\"itemTotal\":12}]', '1548', '340.56', '1888.56', 1),
(92, '54', 'Fattura', 1, NULL, NULL, 100002, 'ttryt', NULL, 1, 0, '2022-01-15 08:15:20', '2021-10-31 07:38', '7,14,39,43,44', '[{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":\"1.89\",\"itemTotal\":1.89},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":\"1.23\",\"itemTotal\":1.23}]', '3.12', '0.6864', '3.8064', 0),
(93, '65', 'Fattura', 1, NULL, NULL, 102, 'ttryt', NULL, 1, 0, '2022-01-15 08:17:10', '2021-10-31 07:38', '7,14,39,43,44', '[{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"1114\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":1.81,\"itemTotal\":1.89},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":\"8989\",\"price\":1.23,\"itemTotal\":1.23},{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"12\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":120,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":1220,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"12\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":10,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":10,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"12\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":10,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":120,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":10,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":230,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":330,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":3330,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"12\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":330,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":120,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"12\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":120,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"12\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":30,\"itemTotal\":\"\"},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://demo.api.nexosuite.com/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":450,\"itemTotal\":\"\"}]', '17498.28', '3849.6216', '21347.901599999997', 1),
(96, '32', 'Fattura', 1, NULL, '78', 110, '', NULL, 0, 0, '2022-01-15 08:31:19', '2021-11-23', '', '[{\"description\":\"design check\",\"qty\":1,\"price\":\"1232\",\"itemTotal\":1232}]', '1232', '271.04', '1503.04', 1),
(97, '12', 'Fattura', 1, NULL, '81', 102, 'yttyuyuyutyutytyu', NULL, 0, 0, '2022-01-15 08:44:20', '2022-01-04', '', '[{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":{\"id\":\"100003\",\"title\":\"240 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"48,7\",\"category_id\":\"Matonelle\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"32323423423\",\"code_int\":\"342234234322\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"322\",\"price_extra\":\"34343\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_015.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100000\"},\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":{\"id\":\"100011\",\"title\":\"Beta Tools Cacciavite - 23 cm\",\"description\":\"\",\"description_full\":\"\",\"works_id\":\"\",\"category_id\":\"Attrezzatura Casa\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"9772280776005\",\"code_int\":\"32322323\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"12\",\"price_extra\":\"9.50\",\"image\":\"https://api.typopress.it/media/images/x05_01_thumbnail_011.jpg\",\"created_at\":\"2022-02-16 07:44:27\",\"skills\":\"[]\",\"dimensions\":null,\"weight\":null,\"product_id\":\"100001\"},\"qty\":1,\"price\":10,\"itemTotal\":\"\"}]', '34', '7.48', '41.480000000000004', 0),
(98, '3', 'Fattura', 1, 11, NULL, 110, 'gttertetret', NULL, 1, 0, '2022-01-24 12:41:32', '2021-08-25 15:00', '39,7,14,42,43', '[{\"description\":{\"id\":\"100000\",\"title\":\"160 mm\",\"description\":\"Pinze universali a grande effetto, cromate impugnatura bimateriale\",\"description_full\":\"66646\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Beta\",\"location_id\":null,\"code\":\"4015275556133-1\",\"code_int\":\"CO4015275556133-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_011.jpg\",\"created_at\":\"2021-11-08 22:45:43\",\"skills\":\"[{\\\"qty\\\":\\\"8\\\",\\\"price\\\":\\\"323232\\\"},{\\\"qty\\\":\\\"14\\\",\\\"price\\\":\\\"7878\\\"}]\",\"dimensions\":null,\"pieces\":\"1248\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":\"2\",\"price\":17.49,\"itemTotal\":34.98},{\"description\":{\"id\":\"100001\",\"title\":\"180 mm\",\"description\":\"retrteret\",\"description_full\":\"tteetrter\",\"works_id\":\"\",\"category_id\":\"\",\"brand_id\":\"Bauhaus\",\"location_id\":null,\"code\":\"4015275556132-1\",\"code_int\":\"4015275556132-1\",\"is_active\":\"1\",\"status\":\"Disponibile\",\"user_id\":\"1\",\"price\":\"17.49\",\"price_extra\":\"15.49\",\"image\":\"https://api.typopress.it/media/images/1150bm_foto_012.jpg\",\"created_at\":\"2021-11-28 10:53:30\",\"skills\":\"[]\",\"dimensions\":null,\"pieces\":\"0\",\"weight\":null,\"product_id\":\"100000\"},\"qty\":\"2\",\"price\":12,\"itemTotal\":24}]', '58.98', '12.9756', '71.9556', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `document` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `user_id`, `category_id`, `description`, `image`, `document`, `is_featured`, `is_active`, `created_at`, `date`) VALUES
(106, 'Visita di controllo', 1, '111', '<p>ddddd</p>', NULL, NULL, 0, 0, '2021-07-16 22:09:24', '2021-07-19 22:09'),
(108, 'Amministrazione', 1, '102', '<p>rtettrtr</p>', NULL, NULL, 0, 0, '2021-07-17 08:33:40', '2021-07-21 08:34'),
(109, 'Visita di controllo', 1, '110', '<p>retrtterrt</p>', NULL, NULL, 0, 0, '2021-07-17 11:11:52', '2021-07-05 11:11'),
(110, 'Intervento', 1, '110', '<p>yutuyyu</p>', NULL, NULL, 0, 0, '2021-07-18 22:14:29', '2021-07-05 22:14'),
(111, 'Visita', 1, '110', '<p>sdfsdfsdffdsfd</p>', NULL, NULL, 0, 0, '2021-07-19 07:47:43', '2021-07-05 07:47');

-- --------------------------------------------------------

--
-- Struttura della tabella `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `brands`
--

INSERT INTO `brands` (`id`, `category_name`, `category_description`, `user_id`) VALUES
(8, 'Makita', '', '1'),
(14, 'Gardena', '', '2'),
(41, 'Beta', '', '1'),
(42, 'Bosch', '', '1'),
(43, 'Robur', '', '1'),
(44, 'Karcher', '', '1'),
(45, 'Obi', '', '1'),
(46, 'Bauhaus', '', '1'),
(47, 'Flower', '', '2'),
(48, 'Gardena', '', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `category_seo_url` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `category_description`, `category_seo_url`, `is_active`, `user_id`) VALUES
(8, 'Casa e Giardino', 'sdssdssddsd trytyrtyrty', 'casa-giardino', 1, '1'),
(39, 'Edilizia', '', 'edilizia', 1, '1'),
(43, 'Falegnameria', '', 'falegnameria', 1, '1'),
(46, 'Ferramenta', '', 'ferramenta', 1, '1'),
(47, 'Utensili', '', 'utensili', 1, '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fiscalcode` varchar(255) DEFAULT NULL,
  `fiscalnumber` varchar(233) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `document` varchar(255) NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(100) NOT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `clients`
--

INSERT INTO `clients` (`id`, `name`, `surname`, `username`, `city`, `zip`, `address`, `province`, `region`, `email`, `fiscalcode`, `fiscalnumber`, `phone`, `user_id`, `category_id`, `description`, `image`, `document`, `is_featured`, `is_active`, `created_at`, `date`, `skills`) VALUES
(102, 'Matthias', 'Gutscho', 'Matthias Gutscho', 'Castelbelforte', '46029', 'Via Nino Bixio 11', 'Ascoli Piceno', 'null', 'dsdsddssdsd@dsd.de', 'GTSMTH79M28Z112T', '', '3493269896', 1, '44', 'jhjhhgjhjhg', 'diamond-painting-corso.jpg', '', 0, 1, '2021-07-16 13:49:46', '20/12/2006', '[{\"qty\":\"8\",\"price\":\"si\"},{\"qty\":\"14\",\"price\":\"Intertraco\"}]'),
(110, 'Cristina', 'Montanelli', 'Cristina Montanelli', 'Mantova', '46100', 'Via Ludovico Ariosto, 2/B', 'Mantova', 'null', 's.schiraldi@virglio.it', 'GTSMTH79M28Z112T', 'null', '3498701633', 1, '42', '<p>erewerw</p>', '', '', 0, 1, '2021-07-17 11:59:50', '28/08/1979', '[{\"qty\":\"14\",\"price\":\"345355\"}]'),
(111, 'Cristina', 'Montanelli', 'Cristina Montanelli', 'Suzzara', '35432', 'Via MAntova', 'Asti', 'null', 'olga.gutsch@gmail.com', 'GTSMTH79M28Z112R', 'null', '3336532363', 1, '20', 'sdddssddds', 'a-startups-guide-to-success-with-sustainable-agri-business.jpg', '', 0, 1, '2021-07-17 15:35:18', '20/12/2005', '[{\"qty\":\"8\",\"price\":\"12\"},{\"qty\":\"8\",\"price\":\"12\"}]'),
(114, 'Matthias', 'Gutsch', 'Matthias Gutsch', 'Suzzara', '46029', 'Via nino bixio 11', 'Mantova', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', 'null', 'ttrrttrttr', 1, '84', '<p>gfdggffgd</p>', '', '', 0, 1, '2021-08-10 15:35:52', '12/12/1222', '[]'),
(120, 'Carmen', 'Gutsch', 'Carmen Gutsch', 'Suzzara', '46029', 'Via Nino Bixio 11', 'Mantova', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', '', '33454422323', 1, '35', '', '', '', 1, 1, '2021-08-24 07:43:22', '20/12/1984', '[{\"qty\":\"14\",\"price\":\"\"}]'),
(121, 'Valeria', 'Bellimboli', 'Valeria Bellimboli', 'Mantova', '46029', 'Via Nino Bixio 11', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', '', '324555445545', 2, '84', '', '', '', 0, 1, '2021-08-31 07:20:37', '20/12/2004', '[]'),
(122, 'Nicola', 'Sacchi', 'Nicola Sacchi', '46029', '46029', 'Via Nino Bixio 11', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', '4343443334', '43434343343434554', 2, '84', '', '', '', 1, 1, '2021-10-02 12:25:52', '12/12/2005', '[{\"qty\":\"Descrizione 1\",\"price\":\"teiueiuio\"},{\"qty\":\"Descrizione 2\",\"price\":\"34343443\"}]'),
(124, 'Hello', 'Matthias', 'Hello Matthias', '46029', '46029', 'Via Nino Bixio', 'Agrigento', '', 'matthias.gutsch@gmail.com', '', '4344443', '343344343', 1, '84', '', NULL, '', 1, 1, '2021-10-08 16:03:58', '13/23/3232', '[]'),
(125, 'Matthias', 'Gutsche', 'Matthias Gutsche', '46029', '46029', 'Via Nino Bixio 11', 'Arezzo', '', 'matthias.gutsch@gmail.com', '', '3434434323', '3434343234', 1, '6', '', NULL, '', 1, 1, '2021-10-08 16:05:51', '33/34/3443', '[]'),
(100002, 'Mario', 'Rossi', 'Mario Rossi', 'Suzzara', '46029', 'Via Nino Bixio 11', 'Milano', '', 'mario.rossi@email.it', 'MTSMTH79M28Z112T', '', '3493269896', 1, '15', '', NULL, '', 0, 1, '2022-02-27 09:56:10', '12/12/1987', '[]'),
(100003, 'Sebastiano ', 'Curo', 'Sebastiano  Curo', 'Milano ', '45633', 'Via roma', 'Milano', '', 'Hbbhg@hgf.de', 'Gtsmth79m28z112f', '', '54367788', 1, '42', '', NULL, '', 0, 1, '2022-04-21 06:46:00', '24/08/1956', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fiscalcode` varchar(255) NOT NULL,
  `fiscalnumber` varchar(233) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `document` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(100) NOT NULL,
  `fiscaltype` varchar(22) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `company`
--

INSERT INTO `company` (`id`, `name`, `city`, `zip`, `address`, `province`, `region`, `email`, `fiscalcode`, `fiscalnumber`, `phone`, `user_id`, `category_id`, `description`, `image`, `document`, `is_featured`, `is_active`, `created_at`, `date`, `fiscaltype`) VALUES
(1, 'Matthias Gutsch srl', 'Castelbelforte', '46029', 'Via Nino Bixio 11', 'Mantova', 'null', 'dsdsddssdsd@dsd.de', 'GTSMTH79M28Z112T', 'IT220394832323', '3493269896', 1, '20', 'jhjhhgjhjhg', 'fiu6Uh-m_400x400.jpg', NULL, 1, 1, '2021-07-16 13:49:46', '12/12/1213', '22'),
(2, 'Engimec SRL', 'Castelbelforte', '46029', 'Via Nino Bixio 11', 'Mantova', 'null', 'dsdsddssdsd@dsd.de', 'GTSMTH79M28Z112T', '', '3493269896', 1, '20', 'jhjhhgjhjhg', 'twWgJA_z_400x400_(1)1.jpeg', NULL, 0, 1, '2021-07-16 13:49:46', '20/12/2005', '0');

-- --------------------------------------------------------

--
-- Struttura della tabella `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `title` varchar(234) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `user_id` varchar(12) DEFAULT NULL,
  `ref_id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  `sender_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `title`, `message`, `created_at`, `user_id`, `ref_id`, `status`, `sender_id`) VALUES
(1, 'Ujjwal Gaur', 'demoang@rsgitech.com', '9999999999', 'Intervento 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet mi ut sapien aliquet consequat non sed augue. Sed quis augue fringilla massa ullamcorper varius. Aliquam eget sem quis lorem cursus blandit. Integer tincidunt neque eget bibendum malesuada. Morbi sit amet ipsum iaculis, sollicitudin lorem id, ornare ipsum. Vestibulum a ligula sit amet ligula pharetra molestie in a est. Quisque bibendum sem ac mi ullamcorper vehicula. Aenean eu hendrerit urna. Cras mattis scelerisque odio, non placerat leo tincidunt eget. Aenean ex turpis, bibendum a massa a, faucibus cursus nunc. Mauris gravida eros eu velit fermentum, nec aliquet nunc facilisis. Pellentesque fermentum, ligula eget dictum pulvinar, orci justo placerat neque, sagittis posuere felis nulla non tellus. Nulla vitae nulla sed eros aliquam gravida nec vitae urna.', '2021-10-28 05:19:18', '1', 0, '1', '0'),
(2, 'eerre', 'matthias.gutsch@gmail.com', 'eerre', 'Intervento 1', 'This is test message', '2021-10-28 06:19:18', '1', 1, '0', '1'),
(3, 'eerre', 'matthias.gutsch@gmail.com', 'eerre', 'Intervento 1', 'eerer', '2021-10-28 06:19:19', '1', 1, '0', '1'),
(9, 'ssddsds', 'matthias.gutsch@gmail.com', '3493269896', 'Intervento 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet mi ut sapien aliquet consequat non sed augue. Sed quis augue fringilla massa ullamcorper varius. Aliquam eget sem quis lorem cursus blandit. Integer tincidunt neque eget bibendum malesuada. Morbi sit amet ipsum iaculis, sollicitudin lorem id, ornare ipsum. Vestibulum a ligula sit amet ligula pharetra molestie in a est. Quisque bibendum sem ac mi ullamcorper vehicula. Aenean eu hendrerit urna. Cras mattis scelerisque odio, non placerat leo tincidunt eget. Aenean ex turpis, bibendum a massa a, faucibus cursus nunc. Mauris gravida eros eu velit fermentum, nec aliquet nunc facilisis. Pellentesque fermentum, ligula eget dictum pulvinar, orci justo placerat neque, sagittis posuere felis nulla non tellus. Nulla vitae nulla sed eros aliquam gravida nec vitae urna.\r\n\r\n', '2021-10-28 06:24:05', '1', 1, '0', 'admin'),
(11, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '3493269896', '', 'uuu', '2021-11-03 23:21:56', '1', 1, '0', '1'),
(12, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '3493269896', '', 'uuu', '2021-11-03 23:21:58', '1', 1, '0', 'admin'),
(13, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '3493269896', '', 'uuu', '2021-11-03 23:21:58', '1', 1, '0', '1'),
(14, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '3493269896', '', 'uuu', '2021-11-03 23:21:59', '1', 1, '0', '1'),
(15, 'sddds', 'sdsddd@sdd.de', '32322332', '', '32333223', '2021-11-04 22:10:55', '', 0, '', ''),
(16, 'sddds', 'sdsddd@sdd.de', '32322332', '', '32333223', '2021-11-04 22:10:58', '', 0, '', ''),
(17, 'sddds', 'sdsddd@sdd.de', '32322332', '', '32333223', '2021-11-04 22:11:12', '', 0, '', ''),
(18, 'ewew', 'matthias.gutsch@gmail.com', '3493269896', '', 'ewweewwe', '2021-11-04 22:12:15', '', 0, '', ''),
(19, 'weewew', 'matthias.gutsch@gmail.com', '3493269896', '', 'ewewewe', '2021-11-04 22:13:01', '', 0, '', ''),
(20, 'ereere', 'ererr@dell.com', '3433434', '', 'rererere', '2021-11-04 22:20:53', NULL, 0, '', ''),
(21, 'dfdfdf', 'dfgdfdfgfgfddfg@ddssd.de', '34434', '', '343434343434', '2021-11-04 22:21:55', NULL, 0, '', '');

-- --------------------------------------------------------

--
-- Struttura della tabella `documents`
--

CREATE TABLE `documents` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `folder_id` varchar(256) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `status` varchar(254) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `documents`
--

INSERT INTO `documents` (`id`, `title`, `user_id`, `folder_id`, `description`, `image`, `is_featured`, `is_active`, `created_at`, `status`) VALUES
(54, 'Chianti Classico DOCG Brolio 2019 - Barone Ricasoli', 2, '102', 'werwererwer', 'rosso-montepulciano-1-600x600-1.jpg', 0, 1, '2021-10-03 06:25:10', 'Esaurito'),
(56, 'Sassicaia Bolgheri Sassicaia DOC 2018 - Tenuta San Guido', 2, '2', '343rtertrt', 'sassicaia-bolgheri-sassicaia-doc-2018-tenuta-san-guido.jpeg', 1, 0, '2021-10-04 23:01:13', 'Disponibile'),
(57, 'Chianti DOCG 2020 - Ruffino', 2, NULL, 'Il Chianti di Ruffino è etichetta storica, vanta infatti come prima vendemmia il 1877. È composto da Sangiovese al 70% e da Merlot per il rimanente 30%; le uve provengono dalle varie tenute all\'interno della denominazione: Poggio Casciano a pochi km da Firenze, Castello di Montemasso nel comune di Greve, Sante Dame e Gretole nel comune di Castellina in Chianti, La Solatia a Monteriggioni. La fermentazione alcolica e la macerazione sono svolte in tini di acciaio inox a temperatura controllata per circa 10 giorni, con frequenti rimontaggi. Al termine della malolattica, l’affinamento è condotto in grandi recipienti d’acciaio e cemento, a temperatura controllata, per alcuni mesi prima di essere imbottigliato.', 'chianti-docg-2020-ruffino.jpg', 0, 0, '2021-10-06 06:58:58', 'Disponibile'),
(60, 'Chianti Classico DOCG Brolio 2019 - Barone Ricasoli', 2, NULL, 'dfsdddfsfdf', 'rosso-montepulciano-1-600x600-1-2.jpg', 0, 0, '2021-11-01 09:02:14', 'Disponibile'),
(100000, '160 mm', 1, NULL, 'Pinze universali a grande effetto, cromate impugnatura bimateriale', '1150bm_foto_011.jpg', 0, 1, '2021-11-08 22:45:43', 'Disponibile'),
(100001, '180 mm', 1, '102', 'retrteret', '1150bm_foto_012.jpg', 1, 1, '2021-11-28 10:53:30', 'Disponibile'),
(100002, '200 mm', 1, '102', '5446', '1150bm_foto_014.jpg', 0, 1, '2021-11-08 22:45:43', 'Disponibile'),
(100003, '240 mm', 1, '102', 'retrteret', '1150bm_foto_015.jpg', 1, 1, '2021-11-28 10:53:30', 'Disponibile'),
(100007, '260 mm', 1, '2', 'retrteret', '1150bm_foto_016.jpg', 1, 0, '2021-11-28 10:53:30', 'Disponibile'),
(100008, 'yytyutuyyu', 1, '2', '3ds', NULL, 0, 1, '2022-02-15 11:31:00', 'Disponibile'),
(100009, 'dssdsdsds', 1, NULL, 'ewew', NULL, 1, 0, '2022-02-15 21:21:58', 'Disponibile'),
(100010, '220 mm', 1, NULL, '3223', '1150bm_foto_013.jpg', 0, 1, '2022-02-15 21:30:25', 'Disponibile'),
(100011, 'Beta Tools Cacciavite - 23 cm', 1, NULL, '', 'x05_01_thumbnail_011.jpg', 0, 1, '2022-02-16 07:44:27', 'Disponibile');

-- --------------------------------------------------------

--
-- Struttura della tabella `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fiscalcode` varchar(255) DEFAULT NULL,
  `fiscalnumber` varchar(233) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `document` varchar(255) NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(100) NOT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `contract` varchar(255) DEFAULT NULL,
  `vacations` varchar(12) DEFAULT NULL,
  `permissions` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `employees`
--

INSERT INTO `employees` (`id`, `name`, `surname`, `username`, `city`, `zip`, `address`, `province`, `region`, `email`, `fiscalcode`, `fiscalnumber`, `phone`, `user_id`, `category_id`, `description`, `image`, `document`, `is_featured`, `is_active`, `created_at`, `date`, `skills`, `contract`, `vacations`, `permissions`) VALUES
(102, 'Matthias', 'Gutscho', 'Matthias Gutscho', 'Castelbelforte', '46029', 'Via Nino Bixio 11', 'Agrigento', 'null', 'dsdsddssdsd@dsd.de', 'GTSMTH79M28Z112T', 'GTSMYGSC232', '3493269896', 1, '84', 'jhjhhgjhjhg', 'diamond-painting-corso.jpg', '', 0, 1, '2021-07-16 13:49:46', '20/12/2006', NULL, '48.60', '125', '58'),
(110, 'Sergio', 'Olivieri', 'Sergio Olivieri', 'Mantova', '46100', 'Via Ludovico Ariosto, 2/B', 'Mantova', 'null', 's.schiraldi@virglio.it', 'GTSMTH79M28Z112T', 'AX2312', '3498701633', 1, '42', '<p>erewerw</p>', '', '', 0, 0, '2021-07-17 11:59:50', '28/08/1979', '[{\"qty\":\"14\",\"price\":\"345355\"}]', '54', '100', '32'),
(111, 'Olga', 'Gutsch', 'Olga Gutsch', 'Suzzara', '35432', 'Via MAntova', 'Asti', 'null', 'olga.gutsch@gmail.com', 'GTSMTH79M28Z112R', 'IT12', '3336532363', 1, '20', 'sdddssddds', 'a-startups-guide-to-success-with-sustainable-agri-business.jpg', '', 0, 1, '2021-07-17 15:35:18', '20/12/2005', '[{\"qty\":\"8\",\"price\":\"12\"},{\"qty\":\"8\",\"price\":\"12\"}]', '39.40', '12', '21'),
(114, 'Fabio Rossi', 'Gutsch', 'Fabio Rossi Gutsch', 'Suzzara', '46029', 'Via nino bixio 11', 'Mantova', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', 'AX342', 'ttrrttrttr', 1, '84', '<p>gfdggffgd</p>', '', '', 0, 0, '2021-08-10 15:35:52', '12/12/1222', '[]', '83.00', '125', '12'),
(116, 'Thomas', 'Gutsch', 'Thomas Gutsch', 'Reggio Emilia', '46029', 'Via Nino Bixio', 'Reggio nell\'Emilia', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', 'AQED123', '2324334433443434', 1, '6', 'rerereerer', '', '', 1, 1, '2021-08-11 19:49:31', '12/12/2005', '[{\"qty\":\"14\",\"price\":\"dsdddssd\"}]', '23.00', '12', '1'),
(120, 'Carmela', 'Rossi', 'Carmela Rossi', 'Suzzara', '46029', 'Via Nino Bixio 11', 'Mantova', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', 'AX123', '33454422323', 1, '35', '', '', '', 0, 1, '2021-08-24 07:43:22', '20/12/1984', '[]', '25', '122', '12'),
(121, 'Valeria', 'Bellimboli', 'Valeria Bellimboli', 'Mantova', '46029', 'Via Nino Bixio 11', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', '', '324555445545', 2, '84', '', '', '', 0, 1, '2021-08-31 07:20:37', '20/12/2004', '[]', NULL, NULL, NULL),
(122, 'Nicola', 'Sacchi', 'Nicola Sacchi', '46029', '46029', 'Via Nino Bixio 11', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', '4343443334', '43434343343434554', 2, '84', '', '', '', 1, 1, '2021-10-02 12:25:52', '12/12/2005', '[{\"qty\":\"Descrizione 1\",\"price\":\"teiueiuio\"},{\"qty\":\"Descrizione 2\",\"price\":\"34343443\"}]', NULL, NULL, NULL),
(124, 'Hello', 'Matthias', 'Hello Matthias', '46029', '46029', 'Via Nino Bixio', 'Agrigento', '', 'matthias.gutsch@gmail.com', '', 'AX125', '343344343', 1, '84', '', NULL, '', 0, 1, '2021-10-08 16:03:58', '12/12/2432', '[]', '12', '20', '20'),
(126, 'Teodoro', 'Pattipaglia', 'Teodoro Pattipaglia', '46029', '46029', 'Via Kennedy 19', 'Alessandria', '', 'matthias.gutsch@gmail.com', '', '3232323232', '23323223323323', 1, '84', '', NULL, '', 1, 0, '2021-10-08 18:35:12', '12/08/1967', '[]', '34', '1', '1'),
(100001, 'Schiraldi', 'Cesario', 'Schiraldi Cesario', '46029', '46029', 'Via Kennedy 19', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', 'GTSMTH79M28Z112T', '433435355335', 1, '84', '', NULL, '', 0, 1, '2021-11-25 06:18:41', '12/12/2021', '[{\"qty\":\"14\",\"price\":\"7798998789\"}]', '23.50', NULL, NULL),
(100002, 'Catia', 'Fornese', 'Catia Fornese', '46029', '46029', 'Via Nino Bixio 11', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', 'AX124', '3493269896', 1, '84', '', NULL, '', 0, 1, '2022-03-17 07:36:00', '12/04/1984', NULL, '', '', ''),
(100003, 'Rosa', 'Benevelli', 'Rosa Benevelli', '46029', '46029', 'Via Nino Bixio 11', 'Ascoli Piceno', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', 'AX23542', '3493269896', 1, '44', '', NULL, '', 0, 1, '2022-03-17 07:37:09', '06/07/1956', NULL, '', '', '');

-- --------------------------------------------------------

--
-- Struttura della tabella `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `locations`
--

INSERT INTO `locations` (`id`, `category_name`, `category_description`, `user_id`) VALUES
(8, 'Cappanone 1 ', 'Mantova', '1'),
(14, 'Cappanone 22', 'Valdaro', '2'),
(41, 'Capanone 3', 'Pisa', '1'),
(43, 'ewwew', 'wewewe', '2'),
(44, 'ewrwre', 'wrree', '2');

-- --------------------------------------------------------

--
-- Struttura della tabella `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `appointment_id` int(10) DEFAULT NULL,
  `quotes_id` varchar(123) DEFAULT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(244) DEFAULT NULL,
  `works_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `subtotal` varchar(255) DEFAULT NULL,
  `vat` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `orders`
--

INSERT INTO `orders` (`id`, `title`, `user_id`, `appointment_id`, `quotes_id`, `category_id`, `description`, `image`, `is_featured`, `is_active`, `created_at`, `date`, `works_id`, `skills`, `subtotal`, `vat`, `total`) VALUES
(54, 'trtrt', 2, 2, NULL, 121, 'ddd', NULL, 0, 0, '2021-10-04 22:57:38', '2021-10-04 10:30', '42', '[{\"description\":\"sdsdsdsd\",\"qty\":1,\"price\":\"12\",\"itemTotal\":\"\"}]', '12', '0', '12'),
(55, 'Intervento chirurgico Sera', 2, 3, NULL, 122, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', NULL, 0, 0, '2021-10-04 23:04:49', '2021-10-04 21:03', '45,42', '[{\"description\":\"Prodotto\",\"qty\":1,\"price\":\"12\",\"itemTotal\":10}]', '12', '0', '12'),
(72, '', 1, NULL, '72', 102, 'saasassaasas', NULL, 0, 0, '2022-01-14 16:07:23', '2022-01-14', '', '[{\"description\":\"rererererre\",\"qty\":1,\"price\":\"45\",\"itemTotal\":45},{\"description\":\"dsdsssdsdsdd\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"eweeeewwe\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12}]', '69', '15.18', '84.18'),
(73, '', 1, NULL, 'undefined', 110, '', NULL, 0, 0, '2022-01-14 16:11:09', '2021-11-09', '', '[{\"description\":\"ewee\",\"qty\":1,\"price\":\"3445\",\"itemTotal\":3445},{\"description\":\"Prodotto alta qualità\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"gffghfhhgfgh\",\"qty\":1,\"price\":\"554\",\"itemTotal\":554}]', '4011', '882.42', '4893.42'),
(74, '', 1, NULL, 'undefined', 110, '', NULL, 0, 0, '2022-01-14 16:11:51', '2021-11-09', '', '[{\"description\":\"ewee\",\"qty\":1,\"price\":\"3445\",\"itemTotal\":3445},{\"description\":\"Prodotto alta qualità\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"gffghfhhgfgh\",\"qty\":1,\"price\":\"554\",\"itemTotal\":554}]', '4011', '882.42', '4893.42'),
(75, '', 1, NULL, 'undefined', 110, '', NULL, 0, 0, '2022-01-14 16:12:44', '2021-11-09', '', '[{\"description\":\"ewee\",\"qty\":1,\"price\":\"3445\",\"itemTotal\":3445},{\"description\":\"Prodotto alta qualità\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"gffghfhhgfgh\",\"qty\":1,\"price\":\"554\",\"itemTotal\":554}]', '4011', '882.42', '4893.42'),
(76, '', 1, NULL, 'undefined', 110, '', NULL, 0, 0, '2022-01-14 16:15:52', '2021-11-09', '', '[{\"description\":\"ewee\",\"qty\":1,\"price\":\"3445\",\"itemTotal\":3445},{\"description\":\"Prodotto alta qualità\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"gffghfhhgfgh\",\"qty\":1,\"price\":\"554\",\"itemTotal\":554}]', '4011', '882.42', '4893.42'),
(77, '', 1, NULL, '71', 110, '', NULL, 0, 0, '2022-01-14 16:20:26', '2021-11-09', '', '[{\"description\":\"ewee\",\"qty\":1,\"price\":\"3445\",\"itemTotal\":3445},{\"description\":\"Prodotto alta qualità\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"gffghfhhgfgh\",\"qty\":1,\"price\":\"554\",\"itemTotal\":554}]', '4011', '882.42', '4893.42'),
(78, 'Fattura', 1, NULL, '70', 110, '', NULL, 0, 0, '2022-01-14 17:07:17', '2021-11-23', '', '[{\"description\":\"design check\",\"qty\":1,\"price\":\"1232\",\"itemTotal\":1232}]', '1232', '271.04', '1503.04'),
(80, 'Intervento ordinario', 1, NULL, '69', 102, 'ttryt', NULL, 1, 0, '2022-01-14 17:19:12', '2021-10-31', '7,14,39,43,44', '[{\"description\":\"fraz\",\"qty\":1,\"price\":\"1.89\",\"itemTotal\":1.89},{\"description\":\"design of value\",\"qty\":1,\"price\":\"1.23\",\"itemTotal\":1.23}]', '3.12', '0.6864', '3.8064'),
(81, '', 1, NULL, NULL, 102, 'yttyuyuyutyutytyu', NULL, 0, 0, '2022-01-15 08:43:05', '2022-01-04', '', '[{\"description\":\"trtyyrttyr\",\"qty\":1,\"price\":\"12\",\"itemTotal\":\"\"},{\"description\":\"yrytyt\",\"qty\":1,\"price\":\"12\",\"itemTotal\":\"\"}]', '24', '5.279999999999999', '29.28'),
(131, '', 1, NULL, NULL, 110, '', NULL, 0, 0, '2022-01-15 23:59:24', '2022-01-04', '', '[]', '1.35', '1.35', '29.35'),
(132, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:00:24', '2022-01-11', '', '[]', '1.35', '1.35', '29.35'),
(133, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:05:57', '2022-01-05', '', '[]', '1.35', '1.35', '29.35'),
(134, '', 1, NULL, NULL, 102, 'dsdddsdd', NULL, 0, 0, '2022-01-16 00:06:59', '2022-01-03', '', '\"[{\\\"id\\\":315,\\\"name\\\":\\\"Woo Single #1\\\",\\\"product_id\\\":93,\\\"variation_id\\\":0,\\\"quantity\\\":2,\\\"tax_class\\\":\\\"\\\",\\\"subtotal\\\":\\\"6.00\\\",\\\"subtotal_tax\\\":\\\"0.45\\\",\\\"total\\\":\\\"6.00\\\",\\\"total_tax\\\":\\\"0.45\\\",\\\"taxes\\\":[{\\\"id\\\":75,\\\"total\\\":\\\"0.45\\\",\\\"subtotal\\\":\\\"0.45\\\"}],\\\"meta_data\\\":[],\\\"sku\\\":\\\"\\\",\\\"price\\\":3},{\\\"id\\\":316,\\\"name\\\":\\\"Ship Your Idea &ndash; Color: Black, Size: M Test\\\",\\\"product_id\\\":22,\\\"variation_id\\\":23,\\\"quantity\\\":1,\\\"tax_class\\\":\\\"\\\",\\\"subtotal\\\":\\\"12.00\\\",\\\"subtotal_tax\\\":\\\"0.90\\\",\\\"total\\\":\\\"12.00\\\",\\\"total_tax\\\":\\\"0.90\\\",\\\"taxes\\\":[{\\\"id\\\":75,\\\"total\\\":\\\"0.9\\\",\\\"subtotal\\\":\\\"0.9\\\"}],\\\"meta_data\\\":[{\\\"id\\\":2095,\\\"key\\\":\\\"pa_color\\\",\\\"value\\\":\\\"black\\\"},{\\\"id\\\":2096,\\\"key\\\":\\\"size\\\",\\\"value\\\":\\\"M Test\\\"}],\\\"sku\\\":\\\"Bar3\\\",\\\"price\\\":12}]\"', '1.35', '1.35', '29.35'),
(135, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:11:04', '2022-01-06', '', '3', '1.35', '1.35', '29.35'),
(136, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:15:07', '2022-01-04', '', 'Woo Single #1,Ship Your Idea &ndash; Color: Black, Size: M Test', '1.35', '1.35', '29.35'),
(137, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:19:14', '2022-01-03', '', 'Woo Single #1,,3,NaN,Ship Your Idea &ndash; Color: Black, Size: M Test,,12,NaN', '1.35', '1.35', '29.35'),
(138, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:46:16', '2022-01-26', '', '[{\"description\":\"dfdffd\",\"qty\":1,\"price\":\"333\",\"itemTotal\":333},{\"description\":\"fdfddfdf\",\"qty\":1,\"price\":\"33\",\"itemTotal\":33},{\"description\":\"dsdsdds\",\"qty\":1,\"price\":\"34\",\"itemTotal\":34},{\"description\":\"1232\",\"qty\":1,\"price\":\"33\",\"itemTotal\":33},{\"description\":\"3434443\",\"qty\":1,\"price\":\"44\",\"itemTotal\":44}]', '477', '104.94', '581.94'),
(139, '', 1, NULL, NULL, 102, 'ewrrrewrwerwerre', NULL, 0, 0, '2022-01-16 00:47:01', '2022-01-04', '', '[{\"name\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"name\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '1.35', '1.35', '29.35'),
(140, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:49:05', '2022-01-04', '', '[{\"description\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"description\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '1.35', '1.35', '29.35'),
(141, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 11:34:34', 'undefined', '', '[{\"description\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"description\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '18', '1.35', '29.35'),
(142, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 13:13:16', '2022-01-07', '', '[{\"description\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"description\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '18', '1.35', '29.35'),
(143, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 19:14:28', 'undefined', '', '[{\"description\":\"gallina da brodo tagliata in 4 pezzi\",\"qty\":1,\"price\":1.75,\"itemTotal\":1.75},{\"description\":\"Petto di pollo a fette 350 gr\",\"qty\":2,\"price\":3.43,\"itemTotal\":6.86},{\"description\":\"Petto di tacchino arrosto 150 gr\",\"qty\":2,\"price\":2.37,\"itemTotal\":4.74},{\"description\":\"Alette di pollo 500 gr\",\"qty\":2,\"price\":1.9,\"itemTotal\":3.8},{\"description\":\"Merluzzo panato\",\"qty\":3,\"price\":5,\"itemTotal\":15},{\"description\":\"Involtini di pollo agli aromi 300 gr\",\"qty\":2,\"price\":3.3,\"itemTotal\":6.6},{\"description\":\"Lasagne alla bolognese 300 gr\",\"qty\":2,\"price\":4.47,\"itemTotal\":8.94},{\"description\":\"Cannelloni prosciutto e formaggio 300 gr\",\"qty\":1,\"price\":4.44,\"itemTotal\":4.44},{\"description\":\"Arrosto di vitello\",\"qty\":1,\"price\":5.5,\"itemTotal\":5.5},{\"description\":\"Pesto per risotto500 gr\",\"qty\":2,\"price\":4.25,\"itemTotal\":8.5},{\"description\":\"Salsicce di pollo e tacchino 400 gr\",\"qty\":1,\"price\":3.4,\"itemTotal\":3.4}]', '69.53', '0.00', '69.53'),
(146, '', 1, NULL, NULL, 110, '', NULL, 0, 0, '2022-01-26 22:12:06', '2022-01-20', '', '[{\"description\":\"ereretetrert\",\"qty\":\"22\",\"price\":34.23,\"itemTotal\":753.06},{\"description\":\"77777667\",\"qty\":1,\"price\":\"34\",\"itemTotal\":34},{\"description\":\"rereeertert\",\"qty\":1,\"price\":41,\"itemTotal\":41}]', '828.06', '182.1732', '1010.2331999999999');

-- --------------------------------------------------------

--
-- Struttura della tabella `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `pages`
--

INSERT INTO `pages` (`id`, `title`, `slug`, `description`, `is_active`, `created_at`) VALUES
(1, 'About', 'about', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 1, '2018-10-27 06:10:00'),
(2, 'Services', 'services', '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\r\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>', 1, '2018-10-27 06:10:00');

-- --------------------------------------------------------

--
-- Struttura della tabella `personal_data`
--

CREATE TABLE `personal_data` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `personal_data`
--

INSERT INTO `personal_data` (`id`, `category_name`, `category_description`, `user_id`) VALUES
(8, 'Cliente Fumatore', '', '1'),
(14, 'Luogo di lavoro', '', '1'),
(39, 'Intervento chirurgico Sera', '', '2'),
(43, 'prova categoria', '', '2'),
(44, 'trtrt', '', '2');

-- --------------------------------------------------------

--
-- Struttura della tabella `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `location_id` varchar(256) DEFAULT NULL,
  `works_id` varchar(1022) DEFAULT NULL,
  `tags_id` varchar(255) DEFAULT NULL,
  `brand_id` varchar(255) NOT NULL,
  `category_id` varchar(245) NOT NULL,
  `description` text DEFAULT NULL,
  `description_full` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `code` varchar(244) DEFAULT NULL,
  `code_int` varchar(255) DEFAULT NULL,
  `status` varchar(254) DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `price` varchar(22) DEFAULT NULL,
  `price_extra` varchar(22) DEFAULT NULL,
  `dimensions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `weight` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `products`
--

INSERT INTO `products` (`id`, `title`, `user_id`, `location_id`, `works_id`, `tags_id`, `brand_id`, `category_id`, `description`, `description_full`, `image`, `is_featured`, `is_active`, `created_at`, `code`, `code_int`, `status`, `skills`, `price`, `price_extra`, `dimensions`, `weight`) VALUES
(100000, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'cd33bfadc3091317b08e5ee6c034002b.jpeg', 1, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100001, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100002, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100003, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100004, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100005, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100006, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', '8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'fdc698c0e5db2a49db38a9aeb1e8b88b.jpeg', 1, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100007, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100008, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '2342', '2115.49', NULL, NULL),
(100009, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100010, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100011, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100012, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100013, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100014, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100015, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100016, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'cccdda140b4fbc0c7cbfeb71d7f9a3bf.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100017, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100018, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100019, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100020, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100021, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100022, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100023, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100024, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100025, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100026, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100027, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100028, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100029, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100030, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100031, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100032, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100033, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100034, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100035, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100036, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', '39,43', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '9f29f737266e16d93392819c12d1406b.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100037, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100038, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100039, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100040, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100041, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100042, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100043, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100044, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100045, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100046, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100047, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100048, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100049, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100050, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100051, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100052, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100053, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100054, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100055, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100056, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100057, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100058, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100059, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100060, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100061, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100062, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100063, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100064, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100065, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100066, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100067, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100068, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100069, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1150bm_foto_01.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100070, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL);
INSERT INTO `products` (`id`, `title`, `user_id`, `location_id`, `works_id`, `tags_id`, `brand_id`, `category_id`, `description`, `description_full`, `image`, `is_featured`, `is_active`, `created_at`, `code`, `code_int`, `status`, `skills`, `price`, `price_extra`, `dimensions`, `weight`) VALUES
(100071, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', '8', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'fd5640d6fdfa812bbdd7ffa3af098cf7.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100072, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100073, 'Makita DHP453Z Trapano avvitatore a percussione 18v', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8', 'senza Batteria senza Caricatore', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '13edfef1a8733b266ab123d37126aee6.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100074, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', '7,48,49', 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100075, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2dd2b0b451c03a373949c5fed8a429fc.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100076, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100077, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '1cc073c57aa98e792fd1c66ffe53a3ee.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100078, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Beta', 'Matonelle', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '33300.4', '33303', NULL, NULL),
(100079, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', NULL, 'Beta', 'Attrezzatura Casa,Matonelle', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '44b353d5d78b1e49a3fa4c599a5646d4.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '17.49', '15.49', NULL, NULL),
(100080, 'Beta Tools Cacciavite, Cacciavite torx', 1, NULL, '48,7,49', NULL, 'Gardena', '8', 'Giravite, chiavi maschio e inserti', 'La famiglia di giravite, chiavi maschio e inserti Beta è pensata per soddisfare l\'utilizzatore finale che ricerca elevate prestazioni e il massimo comfort d\'uso.', 'x05_01_thumbnail_01.jpg', 1, 1, '2021-11-28 10:53:30', '9772280', '342234234322', 'Disponibile', '[]', '22', '33303', NULL, NULL),
(100081, 'Pinze universali a grande effetto', 1, NULL, '7,48,49', '7,48,49', 'Beta', '8,46', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore e', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Dhp453_790x790.jpeg', 0, 1, '2021-11-08 22:45:43', '4015275556134', 'CO4015275556134', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"8\",\"price\":\"232332\"},{\"qty\":\"14\",\"price\":\"23\"},{\"qty\":\"8\",\"price\":\"12\"}]', '2231', '23', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `products_variations`
--

CREATE TABLE `products_variations` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `location_id` varchar(256) DEFAULT NULL,
  `works_id` varchar(1022) DEFAULT NULL,
  `tags_id` varchar(255) DEFAULT NULL,
  `brand_id` varchar(255) NOT NULL,
  `category_id` varchar(245) NOT NULL,
  `description` text DEFAULT NULL,
  `description_full` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `code` varchar(244) DEFAULT NULL,
  `code_int` varchar(255) DEFAULT NULL,
  `status` varchar(254) DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `price` varchar(22) DEFAULT NULL,
  `price_extra` varchar(22) DEFAULT NULL,
  `dimensions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `weight` text DEFAULT NULL,
  `product_id` varchar(122) DEFAULT NULL,
  `pieces` varchar(23) NOT NULL,
  `boxes` varchar(234) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `products_variations`
--

INSERT INTO `products_variations` (`id`, `title`, `user_id`, `location_id`, `works_id`, `tags_id`, `brand_id`, `category_id`, `description`, `description_full`, `image`, `is_featured`, `is_active`, `created_at`, `code`, `code_int`, `status`, `skills`, `price`, `price_extra`, `dimensions`, `weight`, `product_id`, `pieces`, `boxes`) VALUES
(100000, '160 mm', 1, NULL, '', NULL, 'Beta', '', 'Pinze universali a grande effetto, cromate impugnatura bimateriale', '66646', '1150bm_foto_011.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556133-1', 'CO4015275556133-1', 'Disponibile', '[{\"qty\":\"8\",\"price\":\"323232\"},{\"qty\":\"14\",\"price\":\"7878\"}]', '17.49', '15.49', NULL, NULL, '100000', '12', NULL),
(100001, '180 mm', 1, NULL, '', NULL, 'Bauhaus', '', 'retrteret', 'tteetrter', '1150bm_foto_012.jpg', 1, 1, '2021-11-28 10:53:30', '4015275556132-1', '4015275556132-1', 'Disponibile', '[]', '17.49', '15.49', NULL, NULL, '100000', '0', NULL),
(100002, '200 mm', 1, NULL, '', NULL, 'Beta', '', '5446', '66646', '1150bm_foto_014.jpg', 0, 1, '2021-11-08 22:45:43', '4015275556131-1', '4015275556131-1', 'Disponibile', '[]', '10.5', '9', NULL, NULL, '100000', '0', NULL),
(100003, '240 mm', 1, NULL, '48,7', NULL, 'Bauhaus', 'Matonelle', 'retrteret', 'tteetrter', '1150bm_foto_015.jpg', 1, 1, '2021-11-28 10:53:30', '32323423423', '342234234322', 'Disponibile', '[]', '322', '34343', NULL, NULL, '100000', '0', NULL),
(100007, '260 mm', 1, NULL, '', NULL, 'Bauhaus', '', 'retrteret', 'tteetrter', '1150bm_foto_016.jpg', 1, 0, '2021-11-28 10:53:30', '32323423423', '342234234322', 'Disponibile', '[]', '322', '34343', NULL, NULL, '100000', '0', NULL),
(100010, '220 mm', 1, NULL, '48', NULL, 'Bauhaus', '', '3223', '332', '1150bm_foto_013.jpg', 0, 1, '2022-02-15 21:30:25', '33232', '323223', 'Disponibile', '[]', '3223', '3232', NULL, NULL, '100000', '0', NULL),
(100011, 'Beta Tools Cacciavite - 23 cm', 1, NULL, '', NULL, 'Beta', 'Attrezzatura Casa', '', '', 'x05_01_thumbnail_011.jpg', 0, 1, '2022-02-16 07:44:27', '9772280776005', '32322323', 'Disponibile', '[]', '12', '9.50', NULL, NULL, '100001', '390', NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `location_id` varchar(256) DEFAULT NULL,
  `works_id` varchar(1022) DEFAULT NULL,
  `date_from` varchar(23) DEFAULT NULL,
  `date_to` varchar(23) DEFAULT NULL,
  `employee_id` varchar(255) DEFAULT NULL,
  `client_id` varchar(255) NOT NULL,
  `category_id` varchar(245) NOT NULL,
  `description` text DEFAULT NULL,
  `description_full` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `code` varchar(244) DEFAULT NULL,
  `code_int` varchar(255) DEFAULT NULL,
  `status` varchar(254) DEFAULT NULL,
  `price` varchar(22) DEFAULT NULL,
  `price_extra` varchar(22) DEFAULT NULL,
  `dimensions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `weight` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `projects`
--

INSERT INTO `projects` (`id`, `title`, `user_id`, `location_id`, `works_id`, `date_from`, `date_to`, `employee_id`, `client_id`, `category_id`, `description`, `description_full`, `image`, `is_featured`, `is_active`, `created_at`, `code`, `code_int`, `status`, `price`, `price_extra`, `dimensions`, `weight`) VALUES
(100004, 'Cantiere Napoli - Via Umbria', 1, NULL, '', '2022-01-21', '2022-02-09', NULL, '', 'Attrezzatura Casa,Matonelle', 'reretrerter', 'tertrrt', NULL, 0, 1, '2021-12-25 18:34:25', 'UTCANNAPOL', 'Milano', 'Fase di Esecuzione', '14500', '12000', NULL, NULL),
(100005, 'Progetto cantiere Milano', 1, NULL, '', '2022-01-26', '2022-02-24', NULL, '', 'Attrezzatura Casa', '', '', NULL, 0, 1, '2021-12-27 07:34:42', '120000', 'Palermo', 'Disponibile', '12000', '2342343423', NULL, NULL),
(100006, 'Ristrutturazione Palazzo - Via Mercenate', 1, NULL, '', '2022-03-24', '2022-04-28', NULL, '', '', '', '', NULL, 0, 0, '2021-12-27 07:36:41', '234432', 'Pistoia', 'Disponibile', '65000', '', NULL, NULL);

-- --------------------------------------------------------

--
-- Struttura della tabella `province`
--

CREATE TABLE `province` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `id_regione` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `province`
--

INSERT INTO `province` (`id`, `nome`, `id_regione`) VALUES
(1, 'Torino', 1),
(2, 'Vercelli', 1),
(3, 'Novara', 1),
(4, 'Cuneo', 1),
(5, 'Asti', 1),
(6, 'Alessandria', 1),
(7, 'Valle d\'Aosta / Vallée d\'Aoste', 2),
(8, 'Imperia', 7),
(9, 'Savona', 7),
(10, 'Genova', 7),
(11, 'La Spezia', 7),
(12, 'Varese', 3),
(13, 'Como', 3),
(14, 'Sondrio', 3),
(15, 'Milano', 3),
(16, 'Bergamo', 3),
(17, 'Brescia', 3),
(18, 'Pavia', 3),
(19, 'Cremona', 3),
(20, 'Mantova', 3),
(21, 'Bolzano / Bozen', 4),
(22, 'Trento', 4),
(23, 'Verona', 5),
(24, 'Vicenza', 5),
(25, 'Belluno', 5),
(26, 'Treviso', 5),
(27, 'Venezia', 5),
(28, 'Padova', 5),
(29, 'Rovigo', 5),
(30, 'Udine', 6),
(31, 'Gorizia', 6),
(32, 'Trieste', 6),
(33, 'Piacenza', 8),
(34, 'Parma', 8),
(35, 'Reggio nell\'Emilia', 8),
(36, 'Modena', 8),
(37, 'Bologna', 8),
(38, 'Ferrara', 8),
(39, 'Ravenna', 8),
(40, 'Forlì-Cesena', 8),
(41, 'Pesaro e Urbino', 11),
(42, 'Ancona', 11),
(43, 'Macerata', 11),
(44, 'Ascoli Piceno', 11),
(45, 'Massa-Carrara', 9),
(46, 'Lucca', 9),
(47, 'Pistoia', 9),
(48, 'Firenze', 9),
(49, 'Livorno', 9),
(50, 'Pisa', 9),
(51, 'Arezzo', 9),
(52, 'Siena', 9),
(53, 'Grosseto', 9),
(54, 'Perugia', 10),
(55, 'Terni', 10),
(56, 'Viterbo', 12),
(57, 'Rieti', 12),
(58, 'Roma', 12),
(59, 'Latina', 12),
(60, 'Frosinone', 12),
(61, 'Caserta', 15),
(62, 'Benevento', 15),
(63, 'Napoli', 15),
(64, 'Avellino', 15),
(65, 'Salerno', 15),
(66, 'L\'Aquila', 13),
(67, 'Teramo', 13),
(68, 'Pescara', 13),
(69, 'Chieti', 13),
(70, 'Campobasso', 14),
(71, 'Foggia', 16),
(72, 'Bari', 16),
(73, 'Taranto', 16),
(74, 'Brindisi', 16),
(75, 'Lecce', 16),
(76, 'Potenza', 17),
(77, 'Matera', 17),
(78, 'Cosenza', 18),
(79, 'Catanzaro', 18),
(80, 'Reggio di Calabria', 18),
(81, 'Trapani', 19),
(82, 'Palermo', 19),
(83, 'Messina', 19),
(84, 'Agrigento', 19),
(85, 'Caltanissetta', 19),
(86, 'Enna', 19),
(87, 'Catania', 19),
(88, 'Ragusa', 19),
(89, 'Siracusa', 19),
(90, 'Sassari', 20),
(91, 'Nuoro', 20),
(92, 'Cagliari', 20),
(93, 'Pordenone', 6),
(94, 'Isernia', 14),
(95, 'Oristano', 20),
(96, 'Biella', 1),
(97, 'Lecco', 3),
(98, 'Lodi', 3),
(99, 'Rimini', 8),
(100, 'Prato', 9),
(101, 'Crotone', 18),
(102, 'Vibo Valentia', 18),
(103, 'Verbano-Cusio-Ossola', 1),
(104, 'Olbia-Tempio', 20),
(105, 'Ogliastra', 20),
(106, 'Medio Campidano', 20),
(107, 'Carbonia-Iglesias', 20),
(108, 'Monza Brianza', 3),
(109, 'Fermo', 11),
(110, 'Barletta-Andria-Trani', 16);

-- --------------------------------------------------------

--
-- Struttura della tabella `purchase_orders`
--

CREATE TABLE `purchase_orders` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `appointment_id` int(10) DEFAULT NULL,
  `quotes_id` varchar(123) DEFAULT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(244) DEFAULT NULL,
  `works_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `subtotal` varchar(255) DEFAULT NULL,
  `vat` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `purchase_orders`
--

INSERT INTO `purchase_orders` (`id`, `title`, `user_id`, `appointment_id`, `quotes_id`, `category_id`, `description`, `image`, `is_featured`, `is_active`, `created_at`, `date`, `works_id`, `skills`, `subtotal`, `vat`, `total`) VALUES
(54, 'trtrt', 2, 2, NULL, 121, 'ddd', NULL, 0, 0, '2021-10-04 22:57:38', '2021-10-04 10:30', '42', '[{\"description\":\"sdsdsdsd\",\"qty\":1,\"price\":\"12\",\"itemTotal\":\"\"}]', '12', '0', '12'),
(55, 'Intervento chirurgico Sera', 2, 3, NULL, 122, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', NULL, 0, 0, '2021-10-04 23:04:49', '2021-10-04 21:03', '45,42', '[{\"description\":\"Prodotto\",\"qty\":1,\"price\":\"12\",\"itemTotal\":10}]', '12', '0', '12'),
(138, '', 1, NULL, NULL, 110, '', NULL, 0, 0, '2022-01-16 00:46:16', '2022-01-26', '', '[{\"description\":\"1232\",\"qty\":1,\"price\":\"33\",\"itemTotal\":33},{\"description\":\"dfdffd\",\"qty\":1,\"price\":\"333\",\"itemTotal\":333},{\"description\":\"fdfddfdf\",\"qty\":1,\"price\":\"33\",\"itemTotal\":33},{\"description\":\"dsdsdds\",\"qty\":1,\"price\":\"34\",\"itemTotal\":34},{\"description\":\"3434443\",\"qty\":1,\"price\":\"44\",\"itemTotal\":44}]', '477', '104.94', '581.94'),
(139, '', 1, NULL, NULL, 102, 'ewrrrewrwerwerre', NULL, 0, 0, '2022-01-16 00:47:01', '2022-01-04', '', '[{\"name\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"name\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '1.35', '1.35', '29.35'),
(140, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 00:49:05', '2022-01-04', '', '[{\"description\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"description\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '1.35', '1.35', '29.35'),
(141, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 11:34:34', 'undefined', '', '[{\"description\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"description\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '18', '1.35', '29.35'),
(142, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 13:13:16', '2022-01-07', '', '[{\"description\":\"Woo Single #1\",\"qty\":2,\"price\":3,\"itemTotal\":6},{\"description\":\"Ship Your Idea &ndash; Color: Black, Size: M Test\",\"qty\":1,\"price\":12,\"itemTotal\":12}]', '18', '1.35', '29.35'),
(143, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-16 19:14:28', 'undefined', '', '[{\"description\":\"gallina da brodo tagliata in 4 pezzi\",\"qty\":1,\"price\":1.75,\"itemTotal\":1.75},{\"description\":\"Petto di pollo a fette 350 gr\",\"qty\":2,\"price\":3.43,\"itemTotal\":6.86},{\"description\":\"Petto di tacchino arrosto 150 gr\",\"qty\":2,\"price\":2.37,\"itemTotal\":4.74},{\"description\":\"Alette di pollo 500 gr\",\"qty\":2,\"price\":1.9,\"itemTotal\":3.8},{\"description\":\"Merluzzo panato\",\"qty\":3,\"price\":5,\"itemTotal\":15},{\"description\":\"Involtini di pollo agli aromi 300 gr\",\"qty\":2,\"price\":3.3,\"itemTotal\":6.6},{\"description\":\"Lasagne alla bolognese 300 gr\",\"qty\":2,\"price\":4.47,\"itemTotal\":8.94},{\"description\":\"Cannelloni prosciutto e formaggio 300 gr\",\"qty\":1,\"price\":4.44,\"itemTotal\":4.44},{\"description\":\"Arrosto di vitello\",\"qty\":1,\"price\":5.5,\"itemTotal\":5.5},{\"description\":\"Pesto per risotto500 gr\",\"qty\":2,\"price\":4.25,\"itemTotal\":8.5},{\"description\":\"Salsicce di pollo e tacchino 400 gr\",\"qty\":1,\"price\":3.4,\"itemTotal\":3.4}]', '69.53', '0.00', '69.53'),
(146, '', 1, NULL, NULL, 102, '', NULL, 0, 0, '2022-01-26 22:12:06', '2022-01-19', '', '[{\"description\":\"77777667\",\"qty\":1,\"price\":\"34\",\"itemTotal\":34},{\"description\":\"rereeertert\",\"qty\":1,\"price\":\"43\",\"itemTotal\":43},{\"description\":\"ereretetrert\",\"qty\":1,\"price\":\"34\",\"itemTotal\":34}]', '111', '24.42', '135.42000000000002');

-- --------------------------------------------------------

--
-- Struttura della tabella `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `appointment_id` int(10) DEFAULT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(244) DEFAULT NULL,
  `works_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `subtotal` varchar(255) DEFAULT NULL,
  `vat` varchar(255) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `quotes`
--

INSERT INTO `quotes` (`id`, `title`, `user_id`, `appointment_id`, `category_id`, `description`, `image`, `is_featured`, `is_active`, `created_at`, `date`, `works_id`, `skills`, `subtotal`, `vat`, `total`) VALUES
(54, 'trtrt', 2, 2, 121, 'ddd', NULL, 0, 0, '2021-10-04 22:57:38', '2021-10-04 10:30', '42', '[{\"description\":\"sdsdsdsd\",\"qty\":1,\"price\":\"12\",\"itemTotal\":\"\"}]', '12', '0', '12'),
(55, 'Intervento chirurgico Sera', 2, 3, 122, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', NULL, 0, 0, '2021-10-04 23:04:49', '2021-10-04 21:03', '45,42', '[{\"description\":\"Prodotto\",\"qty\":1,\"price\":\"12\",\"itemTotal\":10}]', '12', '0', '12'),
(69, 'Intervento ordinario', 1, 55, 102, 'ttryt', NULL, 1, 0, '2021-11-01 10:25:21', '2021-10-31 07:38', '7,14,39,43,44', '[{\"description\":\"fraz\",\"qty\":1,\"price\":\"1.89\",\"itemTotal\":\"\"},{\"description\":\"design of value\",\"qty\":1,\"price\":\"1.23\",\"itemTotal\":\"\"}]', '3.12', '0.6864', '3.8064'),
(70, 'Fattura', 1, 0, 110, '', NULL, 0, 0, '2021-11-01 10:26:44', '2021-11-23', '', '[{\"description\":\"design check\",\"qty\":1,\"price\":\"1232\",\"itemTotal\":\"\"}]', '1232', '271.04', '1503.04'),
(71, '', 1, 0, 110, '', NULL, 0, 0, '2021-11-01 10:28:51', '2021-11-09', '', '[{\"description\":\"ewee\",\"qty\":1,\"price\":\"3445\",\"itemTotal\":3445},{\"description\":\"Prodotto alta qualità\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"gffghfhhgfgh\",\"qty\":1,\"price\":\"554\",\"itemTotal\":\"\"}]', '4011', '882.42', '4893.42'),
(72, '', 1, 0, 111, 'saasassaasas', NULL, 0, 0, '2022-01-14 15:05:43', '2022-01-14', '', '[{\"description\":\"sssddssdsd\",\"qty\":1,\"price\":\"3\",\"itemTotal\":3},{\"description\":\"dsdsssdsdsdd\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12},{\"description\":\"eweeeewwe\",\"qty\":1,\"price\":\"12\",\"itemTotal\":12}]', '27', '5.94', '32.94');

-- --------------------------------------------------------

--
-- Struttura della tabella `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fiscalcode` varchar(255) DEFAULT NULL,
  `fiscalnumber` varchar(233) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `document` varchar(255) NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(100) NOT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `surname`, `company_name`, `city`, `zip`, `address`, `province`, `region`, `email`, `fiscalcode`, `fiscalnumber`, `phone`, `user_id`, `category_id`, `description`, `image`, `document`, `is_featured`, `is_active`, `created_at`, `date`, `skills`) VALUES
(102, 'Magenta Group Srl', 'Matthias', 'Magenta Group Matthias', 'Castelbelforte', '46029', 'Via Nino Bixio 11', 'Agrigento', 'null', 'dsdsddssdsd@dsd.de', 'GTSMTH79M28Z112T', '23344343443', '3493269896', 1, '84', 'jhjhhgjhjhg', 'diamond-painting-corso.jpg', '', 1, 1, '2021-07-16 13:49:46', '20/12/2006', '[]'),
(110, 'Cristina', 'Montanelli', 'Cristina Montanelli srl', 'Mantova', '46100', 'Via Ludovico Ariosto, 2/B', 'Mantova', 'null', 's.schiraldi@virglio.it', 'GTSMTH79M28Z112T', 'null', '3498701633', 1, '42', '<p>erewerw</p>', '', '', 0, 1, '2021-07-17 11:59:50', '28/08/1979', '[]'),
(121, 'Valeria', 'Bellimboli', 'Valeria Bellimboli', 'Mantova', '46029', 'Via Nino Bixio 11', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', '', '324555445545', 2, '84', '', '', '', 0, 1, '2021-08-31 07:20:37', '20/12/2004', '[]'),
(122, 'Nicola', 'Sacchi', 'Nicola Sacchi', '46029', '46029', 'Via Nino Bixio 11', 'Agrigento', '', 'matthias.gutsch@gmail.com', 'GTSMTH79M28Z112T', '4343443334', '43434343343434554', 2, '84', '', '', '', 1, 1, '2021-10-02 12:25:52', '12/12/2005', '[{\"qty\":\"Descrizione 1\",\"price\":\"teiueiuio\"},{\"qty\":\"Descrizione 2\",\"price\":\"34343443\"}]');

-- --------------------------------------------------------

--
-- Struttura della tabella `supports`
--

CREATE TABLE `supports` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `title` varchar(234) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `user_id` varchar(12) DEFAULT NULL,
  `ref_id` varchar(11) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `sender_id` varchar(12) NOT NULL,
  `is_active` varchar(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `supports`
--

INSERT INTO `supports` (`id`, `name`, `email`, `phone`, `title`, `message`, `created_at`, `user_id`, `ref_id`, `status`, `sender_id`, `is_active`) VALUES
(1, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet mi ut sapien aliquet consequat non sed augue. Sed quis augue fringilla massa ullamcorper varius. Aliquam eget sem quis lorem cursus blandit. Integer tincidunt neque eget bibendum malesuada. Morbi sit amet ipsum iaculis, sollicitudin lorem id, ornare ipsum. Vestibulum a ligula sit amet ligula pharetra molestie in a est. Quisque bibendum sem ac mi ullamcorper vehicula. Aenean eu hendrerit urna. Cras mattis scelerisque odio, non placerat leo tincidunt eget. Aenean ex turpis, bibendum a massa a, faucibus cursus nunc. Mauris gravida eros eu velit fermentum, nec aliquet nunc facilisis. Pellentesque fermentum, ligula eget dictum pulvinar, orci justo placerat neque, sagittis posuere felis nulla non tellus. Nulla vitae nulla sed eros aliquam gravida nec vitae urna.', '2021-10-28 05:19:18', '1', '0', '1', '1', '0'),
(2, 'eerre', 'matthias.gutsch@gmail.com', 'eerre', 'Intervento 1', 'This is test message', '2021-10-28 06:19:18', '1', '1', '0', '1', NULL),
(3, 'eerre', 'matthias.gutsch@gmail.com', 'eerre', 'Intervento 1', 'eerer', '2021-10-28 06:19:19', '1', '1', '0', '1', NULL),
(9, 'ssddsds', 'matthias.gutsch@gmail.com', '3493269896', 'Intervento 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit amet mi ut sapien aliquet consequat non sed augue. Sed quis augue fringilla massa ullamcorper varius. Aliquam eget sem quis lorem cursus blandit. Integer tincidunt neque eget bibendum malesuada. Morbi sit amet ipsum iaculis, sollicitudin lorem id, ornare ipsum. Vestibulum a ligula sit amet ligula pharetra molestie in a est. Quisque bibendum sem ac mi ullamcorper vehicula. Aenean eu hendrerit urna. Cras mattis scelerisque odio, non placerat leo tincidunt eget. Aenean ex turpis, bibendum a massa a, faucibus cursus nunc. Mauris gravida eros eu velit fermentum, nec aliquet nunc facilisis. Pellentesque fermentum, ligula eget dictum pulvinar, orci justo placerat neque, sagittis posuere felis nulla non tellus. Nulla vitae nulla sed eros aliquam gravida nec vitae urna.\r\n\r\n', '2021-10-28 06:24:05', '1', '1', '0', 'admin', NULL),
(11, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '3493269896', '', 'uuu', '2021-11-03 23:21:56', '1', '1', '0', '1', NULL),
(12, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '3493269896', '', 'uuu', '2021-11-03 23:21:58', '1', '1', '0', 'admin', NULL),
(56, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'fsffssfsfd', '2021-11-04 23:46:16', '1', '56', '1', '0', NULL),
(69, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'rwereerewr', '2021-11-05 07:17:53', '1', '0', '1', '1', '1'),
(70, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', '335534553435', '2021-11-05 07:27:43', '1', '69', '0', '1', NULL),
(71, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'rrtttryytyrryty', '2021-11-05 07:28:05', '1', '69', '0', '1', NULL),
(72, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', '', '2021-11-05 07:36:09', '1', '69', '', '', NULL),
(75, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'sdffsfdsfdfgfgd', '2021-11-05 08:00:54', '1', '74', '', '', NULL),
(76, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'sddff', 'sfdfsfsff', 'rerrrrrwre', '2021-11-05 08:07:56', '1', '0', '', '1', '1'),
(77, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'sddff', 'sfdfsfsff', 'cosa posso fare ?', '2021-11-05 08:13:24', '1', '76', '', '1', NULL),
(78, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'rereretr', '2021-11-05 08:14:38', '1', '1', '', '1', NULL),
(79, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'fdsfffssfdf\r\nsdffsfddfs\r\nsdfsfssdds', '2021-11-05 08:26:15', '1', '1', '', '1', NULL),
(99999, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'sddff', 'sfdfsfsff', 'tyyutyuuty', '2021-11-05 08:36:26', '1', '76', '', '1', NULL),
(100000, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'rtrerrtterert', '2021-11-05 08:36:54', '1', '0', '', '1', '1'),
(100001, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'gfhrytrtyfgfgfgh', '2021-11-05 08:40:31', '1', '1', '', '1', NULL),
(100002, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'coem si potrebbe fare ?', '2021-11-05 11:19:41', '1', '100000', '', '1', NULL),
(100003, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'coem si potrebbe fare ?', '2021-11-05 11:20:13', '1', '100000', '', '1', NULL),
(100004, 'Nicola Sacchi', 'nic.sacchi@gmail.com', '23243545', 'Problemi di visualizzazione', 'Problemi di visualizzazione', '2021-11-05 13:19:49', '2', '0', '', '2', '1'),
(100005, 'Nicola Sacchi', 'nic.sacchi@gmail.com', '23243545', 'Problemi di visualizzazione', 'volevo aggiungere questo', '2021-11-05 13:20:08', '2', '100004', '', '2', NULL),
(100006, 'Nicola Sacchi', 'ewrrwrerewe@dsd.es', '324234', 'wewer', 'dsfssdfdfds', '2021-11-05 14:08:00', '2', '0', '', '2', '0'),
(100007, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'sdfsfffsfs', '2021-11-05 17:45:40', '1', '1', '', '1', '0'),
(100008, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'sdffsdsdf', '2021-11-05 17:46:03', '1', '1', '', '1', NULL),
(100009, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'rwrrwrewrewre', '2021-11-05 17:50:48', '1', '1', '', '1', NULL),
(100010, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'sddsfsfssd', '2021-11-05 18:23:49', '1', '1', '', '1', NULL),
(100011, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'sddsfsfssd  erettrrrtter', '2021-11-05 18:23:57', '1', '1', '', '1', NULL),
(100012, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', '', '2021-11-05 20:55:52', '1', '100000', '', '1', NULL),
(100013, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', '', '2021-11-05 20:55:53', '1', '100000', '', '1', NULL),
(100014, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', '', '2021-11-05 20:56:22', '1', '100000', '', '1', NULL),
(100015, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'dssdsdsfs', '2021-11-05 20:56:31', '1', '100000', '', '1', NULL),
(100016, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'fssfff', '2021-11-05 20:58:17', '1', '100000', '', '1', NULL),
(100017, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'daddadds', '2021-11-05 21:00:08', '1', '100000', '', '1', NULL),
(100018, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'wewerrewrewewerrew', '2021-11-06 12:50:27', '1', '100000', '', '1', NULL),
(100019, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'Cod', '2021-11-07 04:19:07', '1', '100000', '', '1', NULL),
(100020, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'sr', '2021-11-07 08:08:13', '1', '100000', '', '1', NULL),
(100021, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'fgddfdfggd', '2021-11-09 22:45:58', '1', '100000', '', '1', NULL),
(100022, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'si ciao ', '2021-11-10 14:38:59', '1', '100000', '', '1', NULL),
(100023, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'uiyuiy', '2021-11-10 22:27:02', '1', '100000', '', '1', NULL),
(100024, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'sddff', 'sfdfsfsff', 'uuyiuiyuiu', '2021-11-11 10:33:31', '1', '76', '', '1', NULL),
(100025, 'Nicola Sacchi', 'ewrrwrerewe@dsd.es', '324234', 'wewer', 'fgdgffdgdgggdfgg', '2021-11-12 14:07:54', '2', '100006', '', '2', NULL),
(100026, 'Nicola Sacchi', 'nic.sacchi@gmail.com', '23243545', 'Problemi di visualizzazione', 'ertterrtrt', '2021-11-13 10:58:00', '2', '100004', '', '2', NULL),
(100027, 'Nicola Sacchi', 'nic.sacchi@gmail.com', '23243545', 'Problemi di visualizzazione', 'jhjhghjghhjg', '2021-11-13 10:59:27', '2', '100004', '', '2', NULL),
(100028, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'dfsdsfsfddf', '2021-11-13 12:52:30', '1', '1', '', '1', NULL),
(100029, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'dgfdgdgfdfg', '2021-11-13 12:53:43', '1', '1', '', '1', NULL),
(100030, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'wewrewrwrrwe', '2021-11-13 13:30:45', '1', '1', '', '1', NULL),
(100031, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'fdgfgfgfg', '2021-11-13 13:31:38', '1', '1', '', '1', NULL),
(100032, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'dffddffg', '2021-11-13 13:33:31', '1', '1', '', '1', NULL),
(100033, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'dffddffg', '2021-11-13 13:33:35', '1', '1', '', '1', NULL),
(100034, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'sdffffsdf', '2021-11-13 13:34:55', '1', '1', '', '1', NULL),
(100035, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'dfssddf', '2021-11-13 16:24:08', '1', '74', '', '', NULL),
(100036, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'ttrytrytr trtryyytr', '2021-11-14 22:28:47', '1', '74', '', '', NULL),
(100037, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'Bgc', '2021-11-30 04:51:06', '1', '74', '', '', NULL),
(100038, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'Bgc', '2021-11-30 04:51:26', '1', '74', '', '', NULL),
(100039, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'Dgff', '2021-11-30 04:57:08', '1', '74', '', '', NULL),
(100040, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'Dgff', '2021-11-30 04:57:08', '1', '74', '', '', NULL),
(100041, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'Dgff', '2021-11-30 04:57:12', '1', '74', '', '', NULL),
(100042, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'Dgff', '2021-11-30 04:57:13', '1', '74', '', '', NULL),
(100043, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'Dgff', '2021-11-30 04:57:15', '1', '74', '', '', NULL),
(100044, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'sdadadssd', '2021-12-14 21:02:26', '1', '69', '', '1', NULL),
(100045, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'efrrer', '2021-12-18 08:59:30', '1', '1', '', '1', NULL),
(100046, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'come posso fare ?', '2021-12-24 06:45:45', '1', '74', '', '', NULL),
(100047, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'asasassa', '2021-12-24 06:49:11', '1', '74', '', '', NULL),
(100048, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'sddsdssd', '2021-12-24 06:49:54', '1', '74', '', '', NULL),
(100049, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'sffssfsfdsdf', '2021-12-24 06:50:56', '1', '74', '', '', NULL),
(100050, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'dsfsdffdd', '2021-12-24 06:51:20', '1', '74', '', '', NULL),
(100051, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'tyuytyu', '2021-12-24 07:10:51', '1', '74', '', '', NULL),
(100052, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'fsdfffsd', '2021-12-24 07:11:27', '1', '74', '', '', NULL),
(100053, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'yryyutyyu', '2021-12-24 07:13:13', '1', '74', '', '', NULL),
(100054, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', 'sdfsfffdsdf', '2021-12-24 07:14:06', '1', '74', '', '', NULL),
(100055, 'Schiraldi Cesario', 'matthias.gutsch@gmail.com', '44344', 'ticket per problemju', '45yryytrryt', '2021-12-24 07:15:05', '1', '74', '', '', NULL),
(100056, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'tyttytyyuytuty', '2021-12-24 08:32:31', '1', '1', '', '1', NULL),
(100057, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf trrtttrtttr', 'rttrtrt', '2021-12-25 00:00:00', '1', '69', '', '1', NULL),
(100058, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1 78', ' iuuiuiiu', '2021-12-28 14:11:18', '1', '1', '', '1', NULL),
(100059, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'ytyyyuuy', '2022-01-15 15:36:29', '1', '1', '', '1', NULL),
(100060, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '44354353453', 'Ciao Helpdesk', 'Bhjn', '2022-01-16 22:47:50', '1', '100000', '', '1', NULL),
(100061, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'jhgjhhjhg', '2022-01-28 14:13:53', '1', '1', '', '1', NULL),
(100062, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'rerert', '2022-01-29 10:59:16', '1', '1', '', '1', NULL),
(100063, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'Hhh', '2022-02-01 15:04:40', '1', '1', '', '1', NULL),
(100064, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'tytyytt', '2022-02-26 11:27:05', '1', '1', '', '1', NULL),
(100065, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'oi8909890', '2022-03-28 07:39:46', '1', '69', '', '1', NULL),
(100066, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'dfdfddf', '2022-03-28 07:43:27', '1', '69', '', '1', NULL),
(100067, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'dfddfdgddgg', '2022-03-28 07:45:39', '1', '69', '', '1', NULL),
(100068, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'dfffdffd', '2022-03-28 07:47:08', '1', '69', '', '1', NULL),
(100069, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'fddffdfd', '2022-03-28 07:48:11', '1', '69', '', '1', NULL),
(100070, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'dffdfd', '2022-03-28 07:48:42', '1', '69', '', '1', NULL),
(100071, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'dfdfdf', '2022-03-28 07:49:11', '1', '69', '', '1', NULL),
(100072, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'fsdfsff', '2022-03-28 07:49:51', '1', '69', '', '1', NULL),
(100073, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'ytytty', '2022-04-12 22:00:14', '1', '1', '', '1', NULL),
(100074, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'ttrrt', '2022-04-20 11:33:30', '1', '1', '', '1', NULL),
(100077, 'Matthias Gutsch', 'erwrrewreer@dddsd.de', '23442', 'dsdsdsfd', 'fsdfffsf', '2022-04-21 19:30:24', '1', '0', '', '1', '1'),
(100078, 'Matthias Gutsch', 'erwrrewreer@dddsd.de', '23442', 'dsdsdsfd', 'rttyyryyryt', '2022-04-21 19:30:36', '1', '100077', '', '1', '1'),
(100079, 'Matthias Gutsch', 'erwrrewreer@dddsd.de', '23442', 'dsdsdsfd', 'trtytyry', '2022-04-21 19:30:43', '1', '100077', '', '1', '1'),
(100080, 'Matthias Gutsch', 'erwrrewreer@dddsd.de', '23442', 'dsdsdsfd', 'ytyutuytuy', '2022-04-26 14:01:06', '1', '100077', '', '1', '1'),
(100081, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', '9999999999', 'Intervento 1', 'dsffdf', '2022-07-26 14:13:31', '1', '1', '', '1', '1'),
(100082, 'Matthias Gutsch', 'matthias.gutsch@gmail.com', 'fsffdssfd', 'sdsdf', 'cxvvxxcvvxcxcv', '2022-09-17 09:38:58', '1', '69', '', '1', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `category_seo_url` varchar(244) NOT NULL,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `tags`
--

INSERT INTO `tags` (`id`, `category_name`, `category_description`, `category_seo_url`, `user_id`) VALUES
(7, 'Tag Motosega', '', 'motosega', '1'),
(42, 'Tag 1', '', '', '2'),
(45, 'Tag 2', '', '', '2'),
(46, 'Tag 3', '', '', '2'),
(48, 'Legno', '', 'legno', '1'),
(49, 'Ferro', '', 'ferro-tag', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `location_id` varchar(256) DEFAULT NULL,
  `works_id` varchar(1022) DEFAULT NULL,
  `project_id` varchar(255) DEFAULT NULL,
  `brand_id` varchar(255) NOT NULL,
  `category_id` varchar(245) NOT NULL,
  `employee_id` varchar(233) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `description_full` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `code` varchar(244) DEFAULT NULL,
  `code_int` varchar(255) DEFAULT NULL,
  `status` varchar(254) DEFAULT NULL,
  `skills` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `price` varchar(22) DEFAULT NULL,
  `price_extra` varchar(22) DEFAULT NULL,
  `dimensions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `weight` text DEFAULT NULL,
  `priority` varchar(23) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `user_id`, `location_id`, `works_id`, `project_id`, `brand_id`, `category_id`, `employee_id`, `description`, `description_full`, `image`, `is_featured`, `is_active`, `created_at`, `code`, `code_int`, `status`, `skills`, `price`, `price_extra`, `dimensions`, `weight`, `priority`) VALUES
(100027, 'dfggdfgf', 1, NULL, NULL, '100004', '', '', '111', 'fdgfgdgfgd', NULL, NULL, 0, 0, '2021-12-25 18:34:34', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4'),
(100028, 'sddsds', 1, NULL, NULL, '100004', '', '', '111', '<p>Cantiere Urbanfile, itinerari nella città che cambia, ha l’obiettivo di accompagnare gli utenti del nostro blog alla scoperta dei quartieri in evoluzio<a href=\"ne di Milano Si tratta di \" rel=\"noopener noreferrer\" target=\"_blank\">ne di Milano Si tratta di </a>passeggiate c<u>he hanno lo scopo d</u>i mostrare ai parte</p><p><br></p><h2>iooiioooiioioio</h2><ol><li>cipanti le zone della città, con un racconto che parte dalla storia del territorio e arriva alla descrizione dei cantieri conclusi e in evoluzione. Dopo Cascina Merlata e Bicocca il 13 febbraio 2021 saremo a City Life</li></ol>', NULL, NULL, 0, 0, '2021-12-25 19:33:21', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2'),
(100030, 'gftyyyryt', 1, NULL, NULL, '100005', '', '', '102', '555654', NULL, NULL, 0, 0, '2021-12-27 07:35:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3'),
(100031, 'trrtrtyty', 1, NULL, NULL, '100006', '', '', '102', 'tryyrrtyytrtry', NULL, NULL, 0, 0, '2022-01-01 12:39:32', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '4'),
(100032, 'dsfsfsfdf', 1, NULL, NULL, '100006', '', '', '111', 'sdfsdfsdfdssdfs', NULL, NULL, 0, 0, '2022-01-01 12:40:54', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '3');

-- --------------------------------------------------------

--
-- Struttura della tabella `technical_data`
--

CREATE TABLE `technical_data` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `technical_data`
--

INSERT INTO `technical_data` (`id`, `category_name`, `category_description`, `user_id`) VALUES
(8, 'Giri potenza', '', '1'),
(14, 'Alimentazione motore', '', '1'),
(39, 'Intervento chirurgico Sera', '', '2'),
(43, 'prova categoria', '', '2'),
(44, 'trtrt', '', '2');

-- --------------------------------------------------------

--
-- Struttura della tabella `timesheets`
--

CREATE TABLE `timesheets` (
  `id` int(11) NOT NULL,
  `timesheets_type` varchar(12) DEFAULT NULL,
  `date_from` varchar(255) DEFAULT NULL,
  `date_to` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `location_id` varchar(256) DEFAULT NULL,
  `works_id` varchar(1022) DEFAULT NULL,
  `employee_id` varchar(255) NOT NULL,
  `project_id` varchar(245) NOT NULL,
  `description` text DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `status` varchar(254) DEFAULT NULL,
  `hours` varchar(22) DEFAULT NULL,
  `hours_extra` varchar(22) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `timesheets`
--

INSERT INTO `timesheets` (`id`, `timesheets_type`, `date_from`, `date_to`, `user_id`, `location_id`, `works_id`, `employee_id`, `project_id`, `description`, `is_featured`, `is_active`, `created_at`, `status`, `hours`, `hours_extra`) VALUES
(100000, '1', '2022-01-24 14:29', '2022-01-24 14:29', 1, NULL, NULL, '110', '100004', NULL, 0, 1, '2022-01-14 08:48:16', NULL, '14', '1'),
(100004, '1', '2022-01-10 14:50', '2022-01-10 18:50', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-14 08:59:13', NULL, '6', '0'),
(100005, '1', '2022-01-04 14:57', '2022-01-18 14:57', 1, NULL, NULL, '102', '100005', NULL, 0, 0, '2022-01-07 14:57:27', NULL, '8', '0'),
(100006, '1', '2022-01-17 14:57', '2022-01-10 14:57', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-07 14:57:53', NULL, '8', '1'),
(100007, '1', '2022-01-17 15:02', '2022-01-10 15:02', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-01-24 12:22:13', NULL, '8', '0'),
(100008, '1', '2022-01-05 17:37', '2022-01-05 17:37', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-07 17:38:02', NULL, '6', '0'),
(100009, '1', '2022-01-07 14:00', '2022-01-07 17:00', 1, NULL, NULL, '102', '100005', NULL, 0, 0, '2022-01-07 17:38:48', NULL, '4', '4'),
(100010, '1', '2022-01-12 17:51', '2022-01-12 17:51', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-07 17:51:17', NULL, '6', '5'),
(100011, '1', '2022-01-12 17:51', '2022-01-12 17:51', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-07 17:51:31', NULL, '3', '3'),
(100012, '1', '2022-01-12 17:51', '2022-01-12 17:51', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-07 17:51:50', NULL, '21', '23'),
(100013, '1', '2022-02-25 17:53', '2022-02-13 17:53', 1, NULL, NULL, '111', '100004', NULL, 0, 0, '2022-01-15 15:33:59', NULL, '25', '0'),
(100014, '1', '2022-01-25 18:14', '2022-01-06 18:14', 1, NULL, NULL, '102', '100006', NULL, 0, 0, '2022-01-14 08:54:17', NULL, '120', '2'),
(100015, '1', '2022-01-12 18:16', '2022-01-12 18:16', 1, NULL, NULL, '102', '100006', NULL, 0, 0, '2022-01-07 18:16:45', NULL, '5', '3'),
(100016, '1', '2022-01-11 20:51', '2022-01-06 20:51', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-07 20:51:16', NULL, '12', '2'),
(100017, '1', '2022-01-09 00:04', '2022-01-09 00:04', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-09 00:04:21', NULL, '5', '1'),
(100018, '2', '2022-01-09 00:04', '2022-01-09 00:04', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-09 00:04:31', NULL, '4', '1'),
(100019, '1', '2022-01-12 19:43', '2022-01-12 19:43', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-09 19:43:40', NULL, '6', '0'),
(100020, '1', '2022-01-19 22:33', '2022-01-20 22:33', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-10 22:33:20', NULL, '8', '0'),
(100021, '1', '2022-01-19 22:33', '2022-01-20 22:33', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-10 22:33:55', NULL, '7', '0'),
(100022, '1', '2022-03-09 22:33', '2022-03-17 22:33', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-10 22:34:39', NULL, '8', '0'),
(100023, '1', '2022-03-09 22:33', '2022-03-09 22:33', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-10 22:35:42', NULL, '7', '0'),
(100024, '1', '2022-03-09 23:18', '2022-03-09 23:19', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-10 23:19:11', NULL, '9', '0'),
(100025, '2', '2022-02-25 09:19', '2022-02-25 09:19', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-24 18:16:56', NULL, '12', '1'),
(100026, '3', '2022-01-12 10:47', '2022-01-12 10:47', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-31 21:52:40', NULL, '3', '2'),
(100027, '1', '2022-01-05 18:37', '2022-01-05 18:37', 1, NULL, NULL, '102', '100005', NULL, 0, 0, '2022-01-13 18:37:43', NULL, '7', '0'),
(100028, '1', '2022-01-10 14:29', '2022-01-10 14:29', 1, NULL, NULL, '110', '100006', NULL, 0, 0, '2022-01-14 08:30:52', NULL, '8', '1'),
(100029, '1', '2022-01-10 14:29', '2022-01-10 14:29', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-01-14 08:32:08', NULL, '12', '1'),
(100030, '1', '2022-01-10 14:29', '2022-01-10 14:29', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-01-14 08:32:36', NULL, '12', '1'),
(100031, '1', '2022-01-10 14:29', '2022-01-10 14:29', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-01-14 08:35:36', NULL, '8', '1'),
(100032, '1', '2022-01-10 14:29', '2022-01-10 14:29', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-01-14 08:36:01', NULL, '8', '2'),
(100033, '1', '2022-01-10 14:29', '2022-01-10 14:29', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-01-14 08:37:01', NULL, '1', '1'),
(100034, '1', '2022-01-10 14:29', '2022-01-10 14:29', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-01-14 08:37:30', NULL, '1', '1'),
(100035, '3', '2022-01-20 08:53', '2022-01-20 08:53', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-02-26 12:12:01', NULL, '12', '2'),
(100036, '1', '2022-01-19 07:57', '2022-01-18 07:57', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-18 07:57:22', NULL, '8', '1'),
(100037, '3', '2022-01-19 07:57', '2022-01-18 07:57', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-31 21:48:40', NULL, '4', '1'),
(100038, '2', '2022-01-20 08:00', '2022-01-20 12:00', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-02-26 12:11:54', NULL, '8', '1'),
(100039, '1', '2022-01-03 12:09', '2022-01-25 12:09', 1, NULL, NULL, '114', '100004', NULL, 0, 0, '2022-01-24 12:09:52', NULL, '12', '2'),
(100040, '2', '2022-01-24 12:11', '2022-01-25 12:11', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-01-24 12:11:52', NULL, '8', '0'),
(100041, '1', '2022-02-17 07:51', '2022-02-17 07:51', 1, NULL, NULL, '102', '100004', NULL, 0, 0, '2022-02-26 12:12:15', NULL, '9', '1'),
(100042, '1', '2022-03-11 19:53', '2022-03-09 19:53', 1, NULL, NULL, '120', '100004', NULL, 0, 0, '2022-03-05 19:53:31', NULL, '12', '0'),
(100043, '1', '2022-03-01 08:04', '2022-03-01 08:04', 1, NULL, NULL, '116', '100005', NULL, 0, 0, '2022-03-08 08:04:14', NULL, '12', '1'),
(100044, '1', '2022-03-09 09:00', '2022-03-09 16:00', 1, NULL, NULL, '110', '100004', NULL, 0, 0, '2022-03-09 22:02:15', NULL, '9', '0'),
(100045, '1', '2022-03-09 09:00', '2022-03-09 16:00', 1, NULL, NULL, '110', '100005', NULL, 0, 0, '2022-03-09 22:02:30', NULL, '11', '1'),
(100046, '1', '2022-03-31 08:02', '2022-03-31 16:03', 1, NULL, NULL, '120', '100004', NULL, 0, 0, '2022-03-31 08:03:10', NULL, '12', '1'),
(100047, '1', '2022-08-04 21:21', '2022-08-05 21:21', 1, NULL, NULL, '120', '100004', NULL, 0, 0, '2022-08-04 21:21:53', NULL, '8', '1'),
(100048, '1', '2022-09-13 09:42', '2022-09-22 09:42', 1, NULL, NULL, '126', '100004', NULL, 0, 0, '2022-09-17 09:42:20', NULL, '12', '0');

-- --------------------------------------------------------

--
-- Struttura della tabella `type`
--

CREATE TABLE `type` (
  `id` int(11) NOT NULL,
  `type_name` varchar(255) DEFAULT NULL,
  `type_order` varchar(255) DEFAULT NULL,
  `type_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `type`
--

INSERT INTO `type` (`id`, `type_name`, `type_order`, `type_description`) VALUES
(7, 'Matthias Gutsch rerer', 'Bologna', '<p>sasas	</p><p>sasssa</p>'),
(8, 'Mario Rossi', 'Bologna', 'dsdsdsds dfddfssdf'),
(14, 'Mario Baltasario', 'Agrigento', '<p>hghggh</p>'),
(18, 'Elisa Ferri', 'Aosta', '<p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ffddffdfd tgttrtrttryt</p>'),
(19, 'Logopedia', 'Alessandria', '<p>dsdfffddf</p>'),
(20, 'Appuntamento', 'Ancona', '<p>dfddfdf</p>'),
(21, 'Francesca', 'Arezzo', ''),
(22, 'Francesca', 'Biella', ''),
(23, 'Francesca', 'Bologna', '<p>trrtrrt</p>'),
(24, 'Francesca Rossi', 'Agrigento', '<p>trrtrrt</p>'),
(25, 'Francesca', 'Alessandria', '<p>trrtrrt</p>');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `api_url` varchar(244) DEFAULT NULL,
  `token` varchar(2550) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `lang` varchar(7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `first_name`, `last_name`, `api_url`, `token`, `is_active`, `created_at`, `lang`) VALUES
(1, 'admin', '7bd223b311462a0ac074d084101cd79c', 'Matthias', 'Gutsch', 'https://api.typopress.it', '1664d2E25AddEf53A231666d2332fEbbf2A6dbC3AC2414E64514Eb5ACd26Cdb3bb4446A41323f1ffC54Af461A2AdC16dd6426d66EA1C2A63Ed3E4E2Af14fEbAAEA23331d5fE33E4bC2C6E2AC4C3E261C6Ab13424EC1546455d656E1fd14b12546fC656f152ddCf61f66fb213b3fE1352b32fd1d6bdf4E61AE3115f26Edb625E64C25b256532CfC5d3E1AC2bf6553C2b2b3bb311dA5EA', 1, '2018-10-27 05:25:13', 'it'),
(2, 'matthias', '7bd223b311462a0ac074d084101cd79c', 'Nicola', 'Sacchi', 'https://api.typopress.it', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzMzMjU0NTksImV4cCI6MTY2NDg2MTQ1OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.7VWl7dwF4ao2ciqD7pKMI6uLguZJ71UVlJpEFl3YtqQ', 1, '2018-10-27 05:25:13', 'en'),
(20, 'nicola', '7bd223b311462a0ac074d084101cd79c', 'Nicola', 'Sacchi', 'https://api.typopress.it', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MzMzMjU0NTksImV4cCI6MTY2NDg2MTQ1OSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.7VWl7dwF4ao2ciqD7pKMI6uLguZJ71UVlJpEFl3YtqQ', 1, '0000-00-00 00:00:00', 'it');

-- --------------------------------------------------------

--
-- Struttura della tabella `warehouses`
--

CREATE TABLE `warehouses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `date` varchar(244) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `warehouses`
--

INSERT INTO `warehouses` (`id`, `title`, `user_id`, `description`, `image`, `is_featured`, `is_active`, `created_at`, `date`) VALUES
(2, 'trtrt', 2, 'ddd', 'DCE090ZX1_1100x1.jpeg', 0, 1, '2018-10-27 06:12:09', '2021-10-07 10:30'),
(3, 'Intervento chirurgico Sera', 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s', 'img3.jpg', 0, 1, '2018-10-27 07:12:09', '2021-11-02 21:03'),
(8, 'Magazzino 2', 1, 'verificare', NULL, 1, 0, '2021-07-21 20:52:50', '2022-02-01 10:00'),
(59, 'Magazzino 1', 1, 'rrreeererer', NULL, 0, 1, '2022-02-03 07:14:43', '2022-02-16 07:14'),
(60, 'Magazzino 3', 1, '', NULL, 0, 1, '2022-07-19 08:42:07', '2022-07-19 08:42');

-- --------------------------------------------------------

--
-- Struttura della tabella `warehouses_checkins`
--

CREATE TABLE `warehouses_checkins` (
  `id` int(11) NOT NULL,
  `warehouse_id` varchar(12) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `supplier_id` varchar(256) DEFAULT NULL,
  `location_id` varchar(233) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `product_id` varchar(245) NOT NULL,
  `description` text DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `status` varchar(254) DEFAULT NULL,
  `pieces` varchar(22) DEFAULT NULL,
  `boxes` varchar(22) DEFAULT NULL,
  `type` varchar(12) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `warehouses_checkins`
--

INSERT INTO `warehouses_checkins` (`id`, `warehouse_id`, `user_id`, `supplier_id`, `location_id`, `employee_id`, `product_id`, `description`, `is_featured`, `is_active`, `created_at`, `status`, `pieces`, `boxes`, `type`) VALUES
(1, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-16 17:27:02', NULL, '12', '1', '1'),
(2, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-16 17:27:22', NULL, '12', '1', '1'),
(3, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-16 21:08:53', NULL, '11', '1', '1'),
(4, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-16 21:54:43', NULL, '98', '2', '1'),
(5, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-17 09:18:48', NULL, '1', '1', '1'),
(6, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-18 22:14:27', NULL, '12', '1', '1'),
(7, '59', 1, '110', '', '', '100011', NULL, 0, 0, '2022-04-21 19:54:56', NULL, '12', '1', '1'),
(8, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-06-18 08:39:21', NULL, '120', '1', '1'),
(9, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-06-18 08:50:14', NULL, '121', '1', '1'),
(10, '8', 1, '102', '', '', '100000', NULL, 0, 0, '2022-06-22 13:15:49', NULL, '12', '1', '1'),
(11, '59', 1, '110', '', '', '100011', NULL, 0, 0, '2022-06-30 07:43:53', NULL, '123', '1', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `warehouses_checkouts`
--

CREATE TABLE `warehouses_checkouts` (
  `id` int(11) NOT NULL,
  `warehouse_id` varchar(12) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `supplier_id` varchar(256) DEFAULT NULL,
  `location_id` varchar(233) NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `product_id` varchar(245) NOT NULL,
  `description` text DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `status` varchar(254) DEFAULT NULL,
  `pieces` varchar(22) DEFAULT NULL,
  `boxes` varchar(22) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `warehouses_checkouts`
--

INSERT INTO `warehouses_checkouts` (`id`, `warehouse_id`, `user_id`, `supplier_id`, `location_id`, `employee_id`, `product_id`, `description`, `is_featured`, `is_active`, `created_at`, `status`, `pieces`, `boxes`) VALUES
(12, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-17 11:12:55', NULL, '12', '1'),
(13, '59', 1, '102', '', '', '100011', NULL, 0, 0, '2022-04-17 11:14:15', NULL, '120', '1');

-- --------------------------------------------------------

--
-- Struttura della tabella `works`
--

CREATE TABLE `works` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  `category_description` text DEFAULT NULL,
  `user_id` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `works`
--

INSERT INTO `works` (`id`, `category_name`, `category_description`, `user_id`) VALUES
(7, 'Revisione auto completa 2', 'descrizione cosa ce da fare', '1'),
(39, 'Revisione auto paraziale', 'descrizione cosa ce da fare', '1'),
(42, 'Lavorazione 3', '12', '2'),
(44, 'lavorazione 24', 'descrizione cosa ce da fare', '1'),
(45, 'Works 32', '12', '2'),
(46, 'mettere giu la posa', 'mettere giu la posa', '1'),
(47, 'Tipo di lavorazione 1', 'sss', '1'),
(49, 'Tipo di lavorazione 1', 'ewwewe', '1'),
(50, 'sddsdsffsf 33232', 'ssseseseew', '1'),
(51, '33 weewewwerrew', 'rrewrwewer ', '1'),
(52, 'sdsddsd', 'dssddssdsd', '1'),
(53, 'yuyuyuyy', 'gfttuy', '1'),
(54, 'ddsdsdsd', 'sdsdsd', '1'),
(55, 'reteerter', 'retrteter', '1'),
(56, 'sdsdd', 'dssdsd', '1');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `appointment_type`
--
ALTER TABLE `appointment_type`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `billings`
--
ALTER TABLE `billings`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indici per le tabelle `personal_data`
--
ALTER TABLE `personal_data`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `products_variations`
--
ALTER TABLE `products_variations`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_regione` (`id_regione`);

--
-- Indici per le tabelle `purchase_orders`
--
ALTER TABLE `purchase_orders`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `supports`
--
ALTER TABLE `supports`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `technical_data`
--
ALTER TABLE `technical_data`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `timesheets`
--
ALTER TABLE `timesheets`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `warehouses`
--
ALTER TABLE `warehouses`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `warehouses_checkins`
--
ALTER TABLE `warehouses_checkins`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `warehouses_checkouts`
--
ALTER TABLE `warehouses_checkouts`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT per la tabella `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT per la tabella `appointment_type`
--
ALTER TABLE `appointment_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT per la tabella `billings`
--
ALTER TABLE `billings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT per la tabella `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT per la tabella `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT per la tabella `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT per la tabella `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100004;

--
-- AUTO_INCREMENT per la tabella `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT per la tabella `documents`
--
ALTER TABLE `documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100012;

--
-- AUTO_INCREMENT per la tabella `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100004;

--
-- AUTO_INCREMENT per la tabella `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT per la tabella `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT per la tabella `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `personal_data`
--
ALTER TABLE `personal_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT per la tabella `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100082;

--
-- AUTO_INCREMENT per la tabella `products_variations`
--
ALTER TABLE `products_variations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100012;

--
-- AUTO_INCREMENT per la tabella `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100007;

--
-- AUTO_INCREMENT per la tabella `province`
--
ALTER TABLE `province`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT per la tabella `purchase_orders`
--
ALTER TABLE `purchase_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT per la tabella `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT per la tabella `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100002;

--
-- AUTO_INCREMENT per la tabella `supports`
--
ALTER TABLE `supports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100083;

--
-- AUTO_INCREMENT per la tabella `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT per la tabella `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100033;

--
-- AUTO_INCREMENT per la tabella `technical_data`
--
ALTER TABLE `technical_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT per la tabella `timesheets`
--
ALTER TABLE `timesheets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100049;

--
-- AUTO_INCREMENT per la tabella `type`
--
ALTER TABLE `type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT per la tabella `warehouses`
--
ALTER TABLE `warehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT per la tabella `warehouses_checkins`
--
ALTER TABLE `warehouses_checkins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la tabella `warehouses_checkouts`
--
ALTER TABLE `warehouses_checkouts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT per la tabella `works`
--
ALTER TABLE `works`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
