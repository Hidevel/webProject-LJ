-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema ColorfulDomination
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ColorfulDomination
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ColorfulDomination` DEFAULT CHARACTER SET utf8 ;
USE `ColorfulDomination` ;

-- -----------------------------------------------------
-- Table `ColorfulDomination`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ColorfulDomination`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `create_time` DATE GENERATED ALWAYS AS (CURRENT_TIMESTAMP) VIRTUAL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `username_UNIQUE` ON `ColorfulDomination`.`user` (`username` ASC);


-- -----------------------------------------------------
-- Table `ColorfulDomination`.`statistics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ColorfulDomination`.`statistics` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `games_played` INT NOT NULL DEFAULT 0,
  `games_won` INT NOT NULL DEFAULT 0,
  `routes_built` INT NOT NULL DEFAULT 0,
  `routes_destroyed` INT NOT NULL DEFAULT 0,
  `towers_built` INT NOT NULL DEFAULT 0,
  `towers_destroyed` INT NOT NULL DEFAULT 0,
  `fields_occupied` INT NOT NULL DEFAULT 0,
  `points_total` INT NOT NULL DEFAULT 0,
  `games_left` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `ColorfulDomination`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = dec8;

CREATE UNIQUE INDEX `user_id_UNIQUE` ON `ColorfulDomination`.`statistics` (`user_id` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
