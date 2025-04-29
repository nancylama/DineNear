-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 25, 2025 at 08:10 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DineNear`
--

-- --------------------------------------------------------

--
-- Table structure for table `adminuser`
--

CREATE TABLE `adminuser`(
`admin_id` varchar(10) NOT NULL, 
`email` varchar(30) DEFAULT NULL, 
`password` varchar(10) DEFAULT NULL, 
`name` varchar(30) DEFAULT NULL, 
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adminuser` 
--

INSERT INTO `adminuser`(`user_id`, `email`, `password`, `name`) VALUES
(`A101`, `as13933@nyu.edu`, `password10`,`Adiva Siddeky`), 
(`A202`, `aav7142@nyu.edu`, `password11`,`Ashley Varghese`), 
(`N303`, `nl2546@nyu.edu`, `password12`,`Nancy Lama`), 
(`K404`, `kjm7832@nyu.edu`, `password13`,`KJ Moses`);  

-- --------------------------------------------------------

--
-- Table structure for table `cuisine`
--

CREATE TABLE `cuisine` (
  `cuisine_id` varchar(10) NOT NULL,
  `name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cuisine`
--

INSERT INTO `cuisine` (`cuisine_id`, `name`) VALUES
('C001', 'Thai'),
('C002', 'Chinese'),
('C003', 'Mexican'),
('C004', 'Indian'),
('C005', 'Caribbean'),
('C006', 'Italian'),
('C007', 'American'),
('C008', 'African'),
('C009', 'Japanese'),
('C010', 'Middle Eastern');

-- --------------------------------------------------------

--
-- Table structure for table `deal`
--

CREATE TABLE `deal` (
  `deal_id` varchar(10) NOT NULL,
  `restaurant_id` varchar(10) DEFAULT NULL,
  `restaurant_name` varchar(20) DEFAULT NULL,
  `discount_details` varchar(50) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deal`
--

INSERT INTO `deal` (`deal_id`, `restaurant_id`, `restaurant_name`, `discount_details`, `discount_percent`) VALUES
('D001', 'Res001', 'RUA Thai', '50% OFF ON MEAL A', 50),
('D002', 'Res002', 'Han Dynasty', '20% OFF ON APPETIZERS', 20),
('D003', 'Res003', 'Tacombi', '40% OFF ON MEAL B', 40),
('D004', 'Res004', 'Red Onion', '5% OFF ON DRINKS', 5),
('D005', 'Res005', 'Healthy As A Motha', '10% OFF ON ENTREE', 10),
('D006', 'Res006', 'Via Carota', '25% OFF ON MEAL A', 25),
('D007', 'Res007', 'Freemans', '30% OFF ON MEAL C', 30),
('D008', 'Res008', 'Africana', '5% OFF ON MEAL D', 5),
('D009', 'Res009', 'Izakaya Fuku', '10% OFF ON MEAL A', 10),
('D010', 'Res010', 'Duzan', '15% OFF ON EVERYTHING', 15);

-- --------------------------------------------------------

--
-- Table structure for table `dietrestriction`
--

CREATE TABLE `dietrestriction` (
  `diet_id` varchar(10) NOT NULL,
  `diet_type` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dietrestriction`
--

INSERT INTO `dietrestriction` (`diet_id`, `diet_type`) VALUES
('Dr001', 'Vegan'),
('Dr002', 'Vegetarian'),
('Dr003', 'Gluten-Free'),
('Dr004', 'Dairy-Free'),
('Dr005', 'Nut-Free'),
('Dr006', 'Halal'),
('Dr007', 'Kosher'),
('Dr008', 'Low-Carb'),
('Dr009', 'Paleo'),
('Dr010', 'Keto');

-- --------------------------------------------------------

--
-- Table structure for table `menudietrestriction`
--

CREATE TABLE `menudietrestriction` (
  `diet_id` varchar(10) DEFAULT NULL,
  `menu_item_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menudietrestriction`
--

INSERT INTO `menudietrestriction` (`diet_id`, `menu_item_id`) VALUES
('Dr001', 'M001'),
('Dr002', 'M002'),
('Dr003', 'M003'),
('Dr004', 'M004'),
('Dr005', 'M005'),
('Dr006', 'M006'),
('Dr007', 'M007'),
('Dr008', 'M008'),
('Dr009', 'M009'),
('Dr010', 'M010');

-- --------------------------------------------------------

--
-- Table structure for table `menuitem`
--

CREATE TABLE `menuitem` (
  `menu_item_id` varchar(10) NOT NULL,
  `restaurant_id` varchar(10) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` varchar(20) DEFAULT NULL,
  `price` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menuitem`
--

INSERT INTO `menuitem` (`menu_item_id`, `restaurant_id`, `name`, `description`, `price`) VALUES
('M001', 'Res001', 'dish_1', 'entree', 19.99),
('M002', 'Res001', 'dish_2', 'appetizer', 12.50),
('M003', 'Res001', 'dish_3', 'dessert', 8.99),
('M004', 'Res001', 'dish_4', 'dessert', 4.99),
('M005', 'Res002', 'dish_5', 'drink', 2.99),
('M006', 'Res005', 'dish_6', 'appetizer', 10.99),
('M007', 'Res003', 'dish_7', 'entree', 21.99),
('M008', 'Res002', 'dish_8', 'dessert', 5.99),
('M009', 'Res007', 'dish_9', 'drink', 1.99),
('M010', 'Res004', 'dish_10', 'dessert', 6.99);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `quantity` int(11) DEFAULT NULL,
  `order_id` varchar(10) DEFAULT NULL,
  `menu_item_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`quantity`, `order_id`, `menu_item_id`) VALUES
(2, 'O001', 'M001'),
(4, 'O002', 'M002'),
(1, 'O003', 'M003'),
(3, 'O004', 'M004'),
(1, 'O005', 'M005'),
(3, 'O006', 'M001'),
(2, 'O101', 'M007'),
(3, 'O011', 'M008'),
(1, 'O231', 'M009'),
(1, 'O001', 'M010');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` varchar(10) NOT NULL,
  `price` decimal(5,2) DEFAULT NULL,
  `restaurant_id` varchar(10) DEFAULT NULL,
  `user_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `price`, `restaurant_id`, `user_id`) VALUES
('O001', 25.99, 'Res001', 'D123'),
('O002', 23.99, 'Res002', 'D123'),
('O003', 25.99, 'Res003', 'I034'),
('O004', 38.99, 'Res004', 'G999'),
('O005', 25.99, 'Res005', 'M888'),
('O006', 15.59, 'Res006', 'M888'),
('O011', 25.99, 'Res008', 'I034'),
('O101', 22.49, 'Res007', 'G999'),
('O121', 25.99, 'Res010', 'G999'),
('O231', 19.99, 'Res009', 'D123');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` varchar(10) NOT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `order_id` varchar(10) DEFAULT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `user_id`, `order_id`, `payment_method`, `payment_date`, `status`) VALUES
('P001', 'D123', 'O001', 'credit', '2025-03-19', 'pending'),
('P002', 'T678', 'O002', 'debit', '2025-03-18', 'complete'),
('P003', 'P731', 'O003', 'credit', '2025-03-15', 'failed'),
('P004', 'D123', 'O004', 'credit', '2025-03-13', 'refunded'),
('P005', 'D123', 'O005', 'gift card', '2025-03-12', 'pending'),
('P006', 'T678', 'O006', 'credit', '2025-03-12', 'pending'),
('P007', 'M888', 'O101', 'visa', '2025-03-09', 'complete'),
('P008', 'L590', 'O011', 'credit', '2025-03-08', 'complete'),
('P009', 'D123', 'O231', 'apple pay', '2025-03-05', 'pending'),
('P010', 'B835', 'O002', 'credit', '2025-03-04', 'complete');

-- --------------------------------------------------------

--
-- Table structure for table `reservation`
--

CREATE TABLE `reservation` (
  `reservation_id` varchar(10) NOT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `party_size` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation`
--

INSERT INTO `reservation` (`reservation_id`, `user_id`, `date`, `time`, `party_size`) VALUES
('Rv001', 'D123', '2025-03-23', '19:30:00', 6),
('Rv002', 'L590', '2025-03-20', '20:30:00', 3),
('Rv003', 'B835', '2025-03-12', '16:00:00', 4),
('Rv004', 'D123', '2025-03-10', '18:30:00', 2),
('Rv005', 'T678', '2025-03-09', '19:00:00', 5),
('Rv006', 'B835', '2025-03-09', '21:00:00', 8),
('Rv007', 'T678', '2025-03-09', '18:30:00', 4),
('Rv008', 'D123', '2025-03-03', '18:00:00', 3),
('Rv009', 'M888', '2025-03-02', '20:00:00', 7),
('Rv010', 'L590', '2025-03-01', '19:30:00', 5);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `restaurant_id` varchar(10) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `phonenum` varchar(20) DEFAULT NULL,
  `aboutinfo` varchar(200) DEFAULT NULL,
  `borough` varchar(15) DEFAULT NULL,
  `pricerange` varchar(3) DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT NULL,
  `cuisine_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`restaurant_id`, `name`, `address`, `phonenum`, `aboutinfo`, `borough`, `pricerange`, `rating`, `cuisine_id`) VALUES
('Res001', 'RUA Thai', '204 Smith St', '7187975121', 'Modern Thai Inspired by Floating Market Cuisine', 'Brooklyn', '$$', 4.70, 'C001'),
('Res002', 'Han Dynasty', '1 Dekalb Ave', '7188580588', 'Mother-Son restaurant bringing Sichuan style spice to the American audience.', 'Brooklyn', '$$', 3.80, 'C002'),
('Res003', 'Tacombi', '74 Broad Street', '9172617136', 'Tacombi has a dream of sharing the beauty of authentic Mexican culture with the world.', 'Brooklyn', '$', 4.40, 'C003'),
('Res004', 'Red Onion', '277 E 10th St', '6466091355', 'Stomach meets health and wealth in authentic Indian cuisine! ', 'Manhattan', '$$', 4.90, 'C004'),
('Res005', 'HAAM', '234 Union Ave', '2122710110', 'Specializes in Trinidadian and Dominican dishes with plant-based ingredients.', 'Brooklyn', '$$', 4.70, 'C005'),
('Res006', 'Via Carota', '51 Grove Street', '2122551962', 'Serves Italian food reminiscent of home', 'Manhattan', '$$', 4.00, 'C006'),
('Res007', 'Freemans', 'Freemans Alley', '2124200012', 'A rugged clandestine colonial American Tavern.', 'Manhattan', '$$$', 3.40, 'C007'),
('Res008', 'Africana', '14612 Liberty Ave', '7186588501', 'Nigerian restaurant serving comfort food', 'Queens', '$$', 4.10, 'C008'),
('Res009', 'Izakaya Fuku', '71-28 Roosevelt Ave', '7182551120', 'Vibrant restaurant with classic Japanese dishes.', 'Queens', '$$', 4.50, 'C009'),
('Res010', 'Duzan', '2411 Steinway St', '7182047488', 'Casual joint popular for shawarma sandwiches, hummus & falafel.', 'Queens', '$', 4.30, 'C010');

-- --------------------------------------------------------

--
-- Table structure for table `restaurantcuisine`
--

CREATE TABLE `restaurantcuisine` (
  `restaurant_id` varchar(10) DEFAULT NULL,
  `cuisine_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurantcuisine`
--

INSERT INTO `restaurantcuisine` (`restaurant_id`, `cuisine_id`) VALUES
('Res001', 'C001'),
('Res002', 'C002'),
('Res003', 'C003'),
('Res004', 'C004'),
('Res005', 'C005'),
('Res006', 'C006'),
('Res007', 'C007'),
('Res008', 'C008'),
('Res009', 'C009'),
('Res010', 'C010');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_list`
--

CREATE TABLE `restaurant_list` (
  `list_id` varchar(10) NOT NULL,
  `restaurant_id` varchar(10) DEFAULT NULL,
  `category` varchar(30) DEFAULT NULL,
  `ranking` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` varchar(10) NOT NULL,
  `user_id` varchar(10) DEFAULT NULL,
  `restaurant_id` varchar(10) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `user_id`, `restaurant_id`, `rating`, `comment`) VALUES
('R001', 'D123', 'Res001', 5, 'Amazing food.'),
('R002', 'T678', 'Res002', 3, 'Average food, slow service.'),
('R003', 'M888', 'Res003', 4, 'Pretty good.'),
('R004', 'I034', 'Res004', 2, 'Meh.'),
('R005', 'S877', 'Res005', 1, 'Horrible food and service.'),
('R006', 'G999', 'Res006', 5, 'Best food ever.'),
('R007', 'R765', 'Res007', 4, 'Decent.'),
('R008', 'G999', 'Res008', 3, 'Average food.'),
('R009', 'S877', 'Res009', 3, 'Not satisfied.'),
('R010', 'R765', 'Res010', 5, 'Great.');

-- --------------------------------------------------------

--
-- Table structure for table `userdietrestriction`
--

CREATE TABLE `userdietrestriction` (
  `user_id` varchar(10) DEFAULT NULL,
  `diet_id` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdietrestriction`
--

INSERT INTO `userdietrestriction` (`user_id`, `diet_id`) VALUES
('D123', 'Dr001'),
('T678', 'Dr002'),
('P731', 'Dr003'),
('I034', 'Dr004'),
('S877', 'Dr005'),
('L590', 'Dr006'),
('M888', 'Dr007'),
('B835', 'Dr008'),
('R765', 'Dr009'),
('G999', 'Dr010');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` varchar(10) NOT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(10) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `password`, `name`, `dob`) VALUES
('B835', 'belle774@newmail.com', 'password8', 'Belle', '2004-12-02'),
('D123', 'damian543@newmail.com', 'password1', 'Damian', '1995-06-15'),
('G999', 'george553@newmail.com', 'password10', 'George', '1989-08-16'),
('I034', 'issac542@newmail.com', 'password4', 'Issac', '1989-10-03'),
('L590', 'lisa2000@newmail.com', 'password6', 'Lisa', '1999-05-03'),
('M888', 'may1965@newmail.com', 'password7', 'May', '2000-01-05'),
('P731', 'patrick432@newmail.com', 'password3', 'Patrick', '1959-04-11'),
('R765', 'richard001@newmail.com', 'password9', 'Richard', '1989-03-03'),
('S877', 'sam256@newmail.com', 'password5', 'Sam', '1989-10-08'),
('T678', 'tim9032@newmail.com', 'password2', 'Tim', '1998-03-03');

--
-- Indexes for dumped tables
--

--
--Indexes for table 'adminuser'
--
ALTER TABLE `adminuser`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `cuisine`
--
ALTER TABLE `cuisine`
  ADD PRIMARY KEY (`cuisine_id`);

--
-- Indexes for table `deal`
--
ALTER TABLE `deal`
  ADD PRIMARY KEY (`deal_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `dietrestriction`
--
ALTER TABLE `dietrestriction`
  ADD PRIMARY KEY (`diet_id`);

--
-- Indexes for table `menudietrestriction`
--
ALTER TABLE `menudietrestriction`
  ADD KEY `diet_id` (`diet_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `menuitem`
--
ALTER TABLE `menuitem`
  ADD PRIMARY KEY (`menu_item_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD KEY `order_id` (`order_id`),
  ADD KEY `menu_item_id` (`menu_item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurant_id`),
  ADD KEY `cuisine_id` (`cuisine_id`);

--
-- Indexes for table `restaurantcuisine`
--
ALTER TABLE `restaurantcuisine`
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `cuisine_id` (`cuisine_id`);

--
-- Indexes for table `restaurant_list`
--
ALTER TABLE `restaurant_list`
  ADD PRIMARY KEY (`list_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- Indexes for table `userdietrestriction`
--
ALTER TABLE `userdietrestriction`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `diet_id` (`diet_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `deal`
--
ALTER TABLE `deal`
  ADD CONSTRAINT `deal_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `menudietrestriction`
--
ALTER TABLE `menudietrestriction`
  ADD CONSTRAINT `menudietrestriction_ibfk_1` FOREIGN KEY (`diet_id`) REFERENCES `dietrestriction` (`diet_id`),
  ADD CONSTRAINT `menudietrestriction_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menuitem` (`menu_item_id`);

--
-- Constraints for table `menuitem`
--
ALTER TABLE `menuitem`
  ADD CONSTRAINT `menuitem_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`menu_item_id`) REFERENCES `menuitem` (`menu_item_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisine` (`cuisine_id`);

--
-- Constraints for table `restaurantcuisine`
--
ALTER TABLE `restaurantcuisine`
  ADD CONSTRAINT `restaurantcuisine_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`),
  ADD CONSTRAINT `restaurantcuisine_ibfk_2` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisine` (`cuisine_id`);

--
-- Constraints for table `restaurant_list`
--
ALTER TABLE `restaurant_list`
  ADD CONSTRAINT `restaurant_list_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`restaurant_id`);

--
-- Constraints for table `userdietrestriction`
--
ALTER TABLE `userdietrestriction`
  ADD CONSTRAINT `userdietrestriction_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `userdietrestriction_ibfk_2` FOREIGN KEY (`diet_id`) REFERENCES `dietrestriction` (`diet_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
