-- CREATE DATABASE IF NOT EXISTS companydb;
CREATE DATABASE usersdb;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  identification_number VARCHAR(50) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  age INT NOT NULL,
    origin_date DATE NOT NULL,
  visa_expiration_date DATE,
  ticket_price DECIMAL(10,2) NOT NULL,
  millas DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);
