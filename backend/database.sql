-- =============================================
-- database.sql
-- Run this file in MySQL to set up your database
-- HOW TO RUN:
--   Open MySQL Workbench or terminal and run:
--   mysql -u root -p < database.sql
-- =============================================

-- Create the database
CREATE DATABASE IF NOT EXISTS student_management;

-- Use this database
USE student_management;

-- Create the students table
CREATE TABLE IF NOT EXISTS students (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(100)  NOT NULL UNIQUE,
  age         INT           NOT NULL,
  course      VARCHAR(100)  NOT NULL,
  grade       VARCHAR(5)    DEFAULT 'N/A',
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample students so you can see data right away
INSERT INTO students (name, email, age, course, grade) VALUES
  ('Ali Hassan',     'ali@example.com',     20, 'Computer Science',  'A'),
  ('Sara Khan',      'sara@example.com',    22, 'Mathematics',       'B+'),
  ('Ahmed Raza',     'ahmed@example.com',   19, 'Physics',           'A-'),
  ('Fatima Malik',   'fatima@example.com',  21, 'Data Science',      'A+'),
  ('Usman Sheikh',   'usman@example.com',   23, 'Software Engineering', 'B');

-- Verify the data was inserted
SELECT * FROM students;
