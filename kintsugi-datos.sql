-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-03-2021 a las 01:31:54
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `kintsugi`
--


--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `Name`, `Password`, `Phone`, `Email`, `admin`) VALUES
(2, 'Chicho', '$2b$10$N.68Jmje8CnDuVUGikKBK.gSv4t9nuZc5bjIrkTFmY.nALNQP1Lyy', 1234567, 'chicho@chicho', 'yes'),
(3, 'Carlos', '$2b$10$Vz4TQaK1Chumn2w7IYfG7u1iVw7nLAAVQ2YteohVTBWXjn5aD8cPe', 234234445, 'carlos@carlos', 'no');
COMMIT;


--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `Name`) VALUES
(1, 'Rolls'),
(2, 'Mixed'),
(3, 'Snacks'),
(4, 'Salads'),
(5, 'Tempura'),
(6, 'Dessert'),
(7, 'Drinks');

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `Name`, `Price`, `Description`, `Image`, `category_id`) VALUES
(10, 'Salmon And Avocado Salad', 500, 'Mixed lettuce, salmon, avocado, crab sticks, cucumber.', 'img-1614900265104.jpg', 4),
(11, 'Garlic Edamame', 350, 'Boiled soya beans with garlic.', 'img-1614901389161.jpg', 3),
(12, 'Ebi Tempura', 400, '4 pieces of Deep fried shrimp.', 'img-1614901691059.jpg', 5),
(13, 'Midnight', 550, 'Chocolate cake with vanilla ice cream and nuts.', 'img-1614903405554.jpg', 6),
(14, 'Kisha Maki', 600, '8 Pieces, breaded shrimp, cucumber, avocado, crispy spring roll wrapper', 'img-1614902490172.png', 1),
(15, 'Combo Maki Platter', 1200, '14 Pieces, California ura 3 Pieces, salmon avocado maki 3 Pieces, volcano 4 Pieces, fuji maki 4 Pieces.', 'img-1614885345602.png', 2),
(16, 'Fresh Lemon Juice W/ Mint', 250, 'Freshly made lemonade with mint herbs', 'img-1614903469247.jpg', 7),
(18, 'Seafood Salad', 500, 'Mixed lettuce, carrot, red and white cabbage, avocado, shrimp, crab sticks, tuna, salmon.', 'img-1614900984364.jpg', 4),
(19, 'Spicy Sweet Salad', 500, 'Mixed lettuce, crab sticks, avocado, sweet potato, tobiko.', 'img-1614903029943.jpg', 4),
(20, 'Spring Roll', 350, '3 Pieces of Deep fried mixed vegetables.', 'img-1614903018359.jpg', 3),
(21, 'Rock Shrimp', 350, 'Deep fried shrimp balls.', 'img-1614901862589.jpg', 3),
(22, 'Ebi Eel Ura (8 Pcs)', 600, 'Shrimp tempura, avocado, cucumber, eel.', 'img-1614902445586.jpg', 1),
(23, 'Volcano', 600, '8 Pieces, Shrimp, crab sticks, spring onion, crispy.', 'img-1614902736705.jpg', 1),
(24, 'Super Omega 3 Platter', 1200, 'Philadelphia maki (6 pcs) salmon nigiri (2 pcs) sushi ball salmon (3 pcs) salmon sashimi (6 pcs) salmon avocado maki (6 pcs) salmon carpaccio.', 'img-1614902869581.png', 2),
(25, 'Sushi Lover Platter', 1200, 'Kappa maki (6 pcs) california ura (6 pcs) royal fried maki (6 pcs) veggie tempura ura (8 pcs) ebinigiri (2 pcs) kaninigiri (2 pcs) tobikogunkan (2 pcs.', 'img-1614902925900.png', 2),
(26, 'Pina Colada', 250, 'Fresh smoothie of pineapple, coconut cream and rum', 'img-1614903590796.jpg', 7),
(27, 'Orange Juice', 250, 'Freshly squeezed orange juice.', 'img-1614903691521.jpg', 7);



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
