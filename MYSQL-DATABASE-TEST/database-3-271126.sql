-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fittrack
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `fittrack` ;

-- -----------------------------------------------------
-- Schema fittrack
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fittrack` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `fittrack` ;

-- -----------------------------------------------------
-- Table `fittrack`.`ai_coach`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`ai_coach` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`ai_coach` (
  `AI_Coach_ID` INT NOT NULL AUTO_INCREMENT,
  `Advies` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`AI_Coach_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fittrack`.`bibliotheek`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`bibliotheek` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`bibliotheek` (
  `Bibliotheek_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Categorie` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Bibliotheek_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fittrack`.`routine`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`routine` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`routine` (
  `Routine_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Routine` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Routine_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fittrack`.`voedingsdagboek`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`voedingsdagboek` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`voedingsdagboek` (
  `Voedingsdagboek_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Voeding` VARCHAR(100) NOT NULL,
  `Aantal_Proteinen` DECIMAL(6,1) NOT NULL DEFAULT '0.0',
  `Aantal_Calorieen` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`Voedingsdagboek_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fittrack`.`sporter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`sporter` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`sporter` (
  `Sporter_ID` INT NOT NULL AUTO_INCREMENT,
  `Routine_ID` INT NULL DEFAULT NULL,
  `AI_Coach_ID` INT NULL DEFAULT NULL,
  `Voedingsdagboek_ID` INT NULL DEFAULT NULL,
  `Email` VARCHAR(100) NOT NULL,
  `Rol` ENUM('sporter', 'admin') NOT NULL DEFAULT 'sporter',
  `Wachtwoord` VARCHAR(255) NOT NULL,
  `Voornaam_Sporter` VARCHAR(50) NOT NULL,
  `Naam_Sporter` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`Sporter_ID`),
  CONSTRAINT `sporter_ibfk_2`
    FOREIGN KEY (`Routine_ID`)
    REFERENCES `fittrack`.`routine` (`Routine_ID`)
    ON DELETE SET NULL,
  CONSTRAINT `sporter_ibfk_3`
    FOREIGN KEY (`AI_Coach_ID`)
    REFERENCES `fittrack`.`ai_coach` (`AI_Coach_ID`)
    ON DELETE SET NULL,
  CONSTRAINT `sporter_ibfk_4`
    FOREIGN KEY (`Voedingsdagboek_ID`)
    REFERENCES `fittrack`.`voedingsdagboek` (`Voedingsdagboek_ID`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE UNIQUE INDEX `Email` ON `fittrack`.`sporter` (`Email` ASC) VISIBLE;

CREATE INDEX `Routine_ID` ON `fittrack`.`sporter` (`Routine_ID` ASC) VISIBLE;

CREATE INDEX `AI_Coach_ID` ON `fittrack`.`sporter` (`AI_Coach_ID` ASC) VISIBLE;

CREATE INDEX `Voedingsdagboek_ID` ON `fittrack`.`sporter` (`Voedingsdagboek_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `fittrack`.`logboek`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`logboek` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`logboek` (
  `Logboek_ID` INT NOT NULL AUTO_INCREMENT,
  `Sporter_ID` INT NOT NULL,
  `Datum` DATE NOT NULL,
  PRIMARY KEY (`Logboek_ID`),
  CONSTRAINT `logboek_ibfk_1`
    FOREIGN KEY (`Sporter_ID`)
    REFERENCES `fittrack`.`sporter` (`Sporter_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `Sporter_ID` ON `fittrack`.`logboek` (`Sporter_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `fittrack`.`machine`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`machine` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`machine` (
  `Machine_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Machine` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Machine_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fittrack`.`oefening`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`oefening` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`oefening` (
  `Oefening_ID` INT NOT NULL AUTO_INCREMENT,
  `Bibliotheek_ID` INT NULL DEFAULT NULL,
  `Naam_Oefening` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Oefening_ID`),
  CONSTRAINT `oefening_ibfk_2`
    FOREIGN KEY (`Bibliotheek_ID`)
    REFERENCES `fittrack`.`bibliotheek` (`Bibliotheek_ID`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `Bibliotheek_ID` ON `fittrack`.`oefening` (`Bibliotheek_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `fittrack`.`oefeningmachine`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`oefeningmachine` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`oefeningmachine` (
  `OefeningMachine_ID` INT NOT NULL AUTO_INCREMENT,
  `Oefening_ID` INT NOT NULL,
  `Machine_ID` INT NOT NULL,
  PRIMARY KEY (`OefeningMachine_ID`),
  CONSTRAINT `oefeningmachine_ibfk_1`
    FOREIGN KEY (`Oefening_ID`)
    REFERENCES `fittrack`.`oefening` (`Oefening_ID`)
    ON DELETE CASCADE,
  CONSTRAINT `oefeningmachine_ibfk_2`
    FOREIGN KEY (`Machine_ID`)
    REFERENCES `fittrack`.`machine` (`Machine_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `Oefening_ID` ON `fittrack`.`oefeningmachine` (`Oefening_ID` ASC) VISIBLE;

CREATE INDEX `Machine_ID` ON `fittrack`.`oefeningmachine` (`Machine_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `fittrack`.`spier`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`spier` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`spier` (
  `Spier_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Spier` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Spier_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `fittrack`.`oefeningspier`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`oefeningspier` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`oefeningspier` (
  `OefeningSpier_ID` INT NOT NULL AUTO_INCREMENT,
  `Oefening_ID` INT NOT NULL,
  `Spier_ID` INT NOT NULL,
  PRIMARY KEY (`OefeningSpier_ID`),
  CONSTRAINT `oefeningspier_ibfk_1`
    FOREIGN KEY (`Oefening_ID`)
    REFERENCES `fittrack`.`oefening` (`Oefening_ID`)
    ON DELETE CASCADE,
  CONSTRAINT `oefeningspier_ibfk_2`
    FOREIGN KEY (`Spier_ID`)
    REFERENCES `fittrack`.`spier` (`Spier_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `Oefening_ID` ON `fittrack`.`oefeningspier` (`Oefening_ID` ASC) VISIBLE;

CREATE INDEX `Spier_ID` ON `fittrack`.`oefeningspier` (`Spier_ID` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `fittrack`.`sporteroefening`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fittrack`.`sporteroefening` ;

CREATE TABLE IF NOT EXISTS `fittrack`.`sporteroefening` (
  `SporterOefening_ID` INT NOT NULL AUTO_INCREMENT,
  `Sporter_ID` INT NOT NULL,
  `Oefening_ID` INT NOT NULL,
  PRIMARY KEY (`SporterOefening_ID`),
  CONSTRAINT `sporteroefening_ibfk_1`
    FOREIGN KEY (`Sporter_ID`)
    REFERENCES `fittrack`.`sporter` (`Sporter_ID`)
    ON DELETE CASCADE,
  CONSTRAINT `sporteroefening_ibfk_2`
    FOREIGN KEY (`Oefening_ID`)
    REFERENCES `fittrack`.`oefening` (`Oefening_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

CREATE INDEX `Sporter_ID` ON `fittrack`.`sporteroefening` (`Sporter_ID` ASC) VISIBLE;

CREATE INDEX `Oefening_ID` ON `fittrack`.`sporteroefening` (`Oefening_ID` ASC) VISIBLE;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `fittrack`.`spier` (`Spier_ID`, `Naam_Spier`) VALUES ('1', 'arm');
INSERT INTO `fittrack`.`spier` (`Spier_ID`, `Naam_Spier`) VALUES ('2', 'been');
INSERT INTO `fittrack`.`spier` (`Spier_ID`, `Naam_Spier`) VALUES ('3', 'rug');

