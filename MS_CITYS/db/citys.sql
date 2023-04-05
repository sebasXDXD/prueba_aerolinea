CREATE DATABASE citysdb;
CREATE TABLE countrys (
  country_id INT AUTO_INCREMENT PRIMARY KEY,
  country_iata VARCHAR(3) NOT NULL,
  country_name VARCHAR(255) NOT NULL
);

CREATE TABLE citys (
  city_id INT AUTO_INCREMENT PRIMARY KEY,
  city_iata VARCHAR(3) NOT NULL,
  city_name VARCHAR(255) NOT NULL,
  country_id INT NOT NULL,
  FOREIGN KEY (country_id) REFERENCES country(country_id)
);
INSERT INTO countrys (country_iata, country_name) VALUES ('CO', 'Colombia');
INSERT INTO countrys (country_iata, country_name) VALUES ('MX', 'México');
INSERT INTO citys (city_iata, city_name, country_id)
VALUES 
  ('BOG', 'Bogotá', 1),
  ('CTG', 'Cartagena', 1),
  ('MDE', 'Medellín', 1);

INSERT INTO citys (city_iata, city_name, country_id)
VALUES 
    ('MEX', 'Ciudad de México', 2),
    ('CUN', 'Cancún', 2),
    ('GDL', 'Guadalajara', 2);