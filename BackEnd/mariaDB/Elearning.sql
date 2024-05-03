CREATE TABLE `users` (
  `user_id` varchar(100) PRIMARY KEY,
  `user_email` varchar(200) NOT NULL,
  `user_name` varchar(150) DEFAULT '',
  `user_phone` varchar(50),
  `user_password` char(100) NOT NULL,
  `user_address` varchar(200),
  `user_avatar` varchar(250),
  `email_verify_token` varchar(300),
  `forgot_password_token` varchar(300),
  `verify` varchar(50) DEFAULT 'Unverified',
  `user_date_of_birth` varchar(100),
  `user_website` varchar(200),
  `user_bio` varchar(500),
  `user_role` varchar(50) DEFAULT '1',
  `user_active` varchar(50) DEFAULT '0',
  `user_create_at` varchar(100),
  `user_update_at` varchar(100),
  `user_language` varchar(10) DEFAULT 'vi',
  `user_time_zone` varchar(10) DEFAULT '7'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `refresh_token` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `token` varchar(300),
  `create_at` varchar(100),
  `user_id` varchar(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `courses` (
  `course_id` varchar(100) PRIMARY KEY,
  `user_id` varchar(100),
  `course_price` decimal(18,2),
  `course_discount` decimal(18,2),
  `course_name` varchar(150) UNIQUE NOT NULL,
  `course_create_by` varchar(100),
  `course_create_at` varchar(100),
  `course_update_at` varchar(100),
  `course_desc` varchar(500),
  `course_rate` decimal(10,1),
  `course_number_buyers` int,
  `course_active` varchar(50) DEFAULT '0',
  `course_comming_soon` tinyint(1) DEFAULT 1,
  `course_icon` varchar(100),
  `course_intro_video` varchar(100),
  `course_total_time_video` varchar(50)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `courses_content` (
  `courses_content_id` int PRIMARY KEY AUTO_INCREMENT,
  `courses_id` varchar(100),
  `courses_content_videos` varchar(100),
  `courses_content_videos_type` varchar(50),
  `courses_content_images` varchar(100),
  `courses_content_chapter_name` varchar(200),
  `courses_content_chapter_code` varchar(100),
  `courses_content_chapter_parent_code` varchar(100),
  `courses_content_level` varchar(50),
  `courses_content_tilte` varchar(100),
  `courses_content_desc` varchar(150),
  `courses_content_create_at` varchar(100),
  `courses_content_update_at` varchar(100),
  `courses_content_note` varchar(300),
  `courses_content_active` varchar(50) DEFAULT '0'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `course_comments` (
  `course_comment_id` varchar(100) PRIMARY KEY,
  `course_id` varchar(100),
  `user_id` varchar(100),
  `course_comment_content` text,
  `course_comment_create_at` varchar(100),
  `course_comment_update_at` varchar(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `categories` (
  `category_id` varchar(100) PRIMARY KEY,
  `course_id` varchar(100),
  `category_name` varchar(150) UNIQUE NOT NULL,
  `category_desc` varchar(200),
  `catefory_total_course` int,
  `category_active` varchar(50) DEFAULT '0',
  `category_parent_code` varchar(100),
  `category_create_by` varchar(100),
  `category_create_at` varchar(100),
  `category_update_at` varchar(100)
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `refresh_token` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `courses` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `courses_content` ADD FOREIGN KEY (`courses_id`) REFERENCES `courses` (`course_id`);

ALTER TABLE `course_comments` ADD FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`);

-- Tạo bảng course_categories
CREATE TABLE `course_categories` (
  `course_id` varchar(100),
  `category_id` varchar(100),
  PRIMARY KEY (`course_id`, `category_id`),
  FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



