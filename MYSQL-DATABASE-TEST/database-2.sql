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

-- -----------------------------------------------------
-- Schema fittrack
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fittrack` DEFAULT CHARACTER SET utf8mb4 ;
USE `fittrack` ;

-- -----------------------------------------------------
-- Table `fittrack`.`ai_coach`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`ai_coach` (
  `AI_Coach_ID` INT NOT NULL AUTO_INCREMENT,
  `Advies` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`AI_Coach_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`bibliotheek`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`bibliotheek` (
  `Bibliotheek_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Categorie` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Bibliotheek_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`routine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`routine` (
  `Routine_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Routine` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Routine_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`voedingsdagboek`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`voedingsdagboek` (
  `Voedingsdagboek_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Voeding` VARCHAR(100) NOT NULL,
  `Aantal_Proteinen` DECIMAL(6,1) NOT NULL DEFAULT '0.0',
  `Aantal_Calorieen` INT NOT NULL DEFAULT '0',
  PRIMARY KEY (`Voedingsdagboek_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`sporter`
-- -----------------------------------------------------
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
  UNIQUE INDEX `Email` (`Email` ASC) VISIBLE,
  INDEX `Routine_ID` (`Routine_ID` ASC) VISIBLE,
  INDEX `AI_Coach_ID` (`AI_Coach_ID` ASC) VISIBLE,
  INDEX `Voedingsdagboek_ID` (`Voedingsdagboek_ID` ASC) VISIBLE,
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
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`logboek`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`logboek` (
  `Logboek_ID` INT NOT NULL AUTO_INCREMENT,
  `Sporter_ID` INT NOT NULL,
  `Datum` DATE NOT NULL,
  PRIMARY KEY (`Logboek_ID`),
  INDEX `Sporter_ID` (`Sporter_ID` ASC) VISIBLE,
  CONSTRAINT `logboek_ibfk_1`
    FOREIGN KEY (`Sporter_ID`)
    REFERENCES `fittrack`.`sporter` (`Sporter_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`machine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`machine` (
  `Machine_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Machine` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Machine_ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`oefening`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`oefening` (
  `Oefening_ID` INT NOT NULL AUTO_INCREMENT,
  `Bibliotheek_ID` INT NULL DEFAULT NULL,
  `Naam_Oefening` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Oefening_ID`),
  INDEX `Bibliotheek_ID` (`Bibliotheek_ID` ASC) VISIBLE,
  CONSTRAINT `oefening_ibfk_2`
    FOREIGN KEY (`Bibliotheek_ID`)
    REFERENCES `fittrack`.`bibliotheek` (`Bibliotheek_ID`)
    ON DELETE SET NULL)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`spier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`spier` (
  `Spier_ID` INT NOT NULL AUTO_INCREMENT,
  `Naam_Spier` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`Spier_ID`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`tbloefeningmachine`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`tbloefeningmachine` (
  `OefeningMachine_ID` INT NOT NULL AUTO_INCREMENT,
  `Oefening_ID` INT NOT NULL,
  `Machine_ID` INT NOT NULL,
  PRIMARY KEY (`OefeningMachine_ID`),
  INDEX `Oefening_ID` (`Oefening_ID` ASC) VISIBLE,
  INDEX `Machine_ID` (`Machine_ID` ASC) VISIBLE,
  CONSTRAINT `tbloefeningmachine_ibfk_1`
    FOREIGN KEY (`Oefening_ID`)
    REFERENCES `fittrack`.`oefening` (`Oefening_ID`)
    ON DELETE CASCADE,
  CONSTRAINT `tbloefeningmachine_ibfk_2`
    FOREIGN KEY (`Machine_ID`)
    REFERENCES `fittrack`.`machine` (`Machine_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`tbloefeningspier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`tbloefeningspier` (
  `OefeningSpier_ID` INT NOT NULL AUTO_INCREMENT,
  `Oefening_ID` INT NOT NULL,
  `Spier_ID` INT NOT NULL,
  PRIMARY KEY (`OefeningSpier_ID`),
  INDEX `Oefening_ID` (`Oefening_ID` ASC) VISIBLE,
  INDEX `Spier_ID` (`Spier_ID` ASC) VISIBLE,
  CONSTRAINT `tbloefeningspier_ibfk_1`
    FOREIGN KEY (`Oefening_ID`)
    REFERENCES `fittrack`.`oefening` (`Oefening_ID`)
    ON DELETE CASCADE,
  CONSTRAINT `tbloefeningspier_ibfk_2`
    FOREIGN KEY (`Spier_ID`)
    REFERENCES `fittrack`.`spier` (`Spier_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `fittrack`.`tblsporteroefening`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fittrack`.`tblsporteroefening` (
  `SporterOefening_ID` INT NOT NULL AUTO_INCREMENT,
  `Sporter_ID` INT NOT NULL,
  `Oefening_ID` INT NOT NULL,
  PRIMARY KEY (`SporterOefening_ID`),
  INDEX `Sporter_ID` (`Sporter_ID` ASC) VISIBLE,
  INDEX `Oefening_ID` (`Oefening_ID` ASC) VISIBLE,
  CONSTRAINT `tblsporteroefening_ibfk_1`
    FOREIGN KEY (`Sporter_ID`)
    REFERENCES `fittrack`.`sporter` (`Sporter_ID`)
    ON DELETE CASCADE,
  CONSTRAINT `tblsporteroefening_ibfk_2`
    FOREIGN KEY (`Oefening_ID`)
    REFERENCES `fittrack`.`oefening` (`Oefening_ID`)
    ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
