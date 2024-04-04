-- CREATE DATABASE IF NOT EXISTS ShopAppNodeJS;

CREATE TABLE `users` (
  `id` VARCHAR(100) COLLATE utf8mb4_general_ci NOT NULL,
  `name` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT '',
  `email` VARCHAR(100) COLLATE utf8mb4_general_ci NOT NULL,
  `date_of_birth` DATETIME,
  `password` CHAR(100) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` VARCHAR(100) NOT NULL,
  `updated_at` VARCHAR(100) DEFAULT NULL,
  `email_verify_token` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `username` VARCHAR(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `website` VARCHAR(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
