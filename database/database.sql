drop schema if exists cripto;
create schema cripto;

CREATE TABLE `cripto`.`coins` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(9) NOT NULL,
  `price` FLOAT NOT NULL,
  `insert_date` DATE NOT NULL,
  `update_date` DATE,
  PRIMARY KEY (`id`));



