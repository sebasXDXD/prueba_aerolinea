-- CREATE DATABASE IF NOT EXISTS companydb;
CREATE DATABASE tickets;
-- USE companydb;
CREATE TABLE tickets (
  id INT NOT NULL AUTO_INCREMENT,
  identification_number VARCHAR(50) NOT NULL,
  passenger_name VARCHAR(255) NOT NULL,
  passenger_lastname VARCHAR(255) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  origin_date DATE NOT NULL,
  destination VARCHAR(255) NOT NULL,
  return_date DATE,
  flight_type VARCHAR(255) NOT NULL,
  chair_num VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);


