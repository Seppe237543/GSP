-- FitTrack database, gebaseerd op ERD_GSP_V3
-- Importeren: phpMyAdmin > tabblad "Importeren" > dit bestand kiezen.
-- Opnieuw beginnen? Verwijder eerst de database 'fittrack'.

CREATE DATABASE IF NOT EXISTS fittrack
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_general_ci;

USE fittrack;

-- ===== tabellen zonder afhankelijkheden =====

CREATE TABLE Routine (
    Routine_ID   INT AUTO_INCREMENT PRIMARY KEY,
    Naam_Routine VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE AI_Coach (
    AI_Coach_ID INT AUTO_INCREMENT PRIMARY KEY,
    Advies      TEXT
) ENGINE=InnoDB;

CREATE TABLE Voedingsdagboek (
    Voedingsdagboek_ID INT AUTO_INCREMENT PRIMARY KEY,
    Naam_Voeding       VARCHAR(100) NOT NULL,
    Aantal_Proteinen   DECIMAL(6,1) NOT NULL DEFAULT 0,
    Aantal_Calorieen   INT NOT NULL DEFAULT 0
) ENGINE=InnoDB;

CREATE TABLE Bibliotheek (
    Bibliotheek_ID INT AUTO_INCREMENT PRIMARY KEY,
    Naam_Categorie VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE Spier (
    Spier_ID   INT AUTO_INCREMENT PRIMARY KEY,
    Naam_Spier VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- ===== Sporter =====
-- Admin_ID wijst naar een andere sporter met Rol = 'admin'
-- (het ERD heeft geen aparte Admin-tabel).

CREATE TABLE Sporter (
    Sporter_ID         INT AUTO_INCREMENT PRIMARY KEY,
    Admin_ID           INT NULL,
    Routine_ID         INT NULL,
    AI_Coach_ID        INT NULL,
    Voedingsdagboek_ID INT NULL,
    Email              VARCHAR(100) NOT NULL UNIQUE,
    Rol                ENUM('sporter', 'admin') NOT NULL DEFAULT 'sporter',
    Wachtwoord         VARCHAR(255) NOT NULL,  -- hash, nooit het echte wachtwoord
    Voornaam_Sporter   VARCHAR(50) NOT NULL,
    Naam_Sporter       VARCHAR(50) NOT NULL,
    FOREIGN KEY (Admin_ID)           REFERENCES Sporter(Sporter_ID)             ON DELETE SET NULL,
    FOREIGN KEY (Routine_ID)         REFERENCES Routine(Routine_ID)             ON DELETE SET NULL,
    FOREIGN KEY (AI_Coach_ID)        REFERENCES AI_Coach(AI_Coach_ID)           ON DELETE SET NULL,
    FOREIGN KEY (Voedingsdagboek_ID) REFERENCES Voedingsdagboek(Voedingsdagboek_ID) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ===== Logboek =====

CREATE TABLE Logboek (
    Logboek_ID INT AUTO_INCREMENT PRIMARY KEY,
    Sporter_ID INT NOT NULL,
    Datum      DATE NOT NULL,
    FOREIGN KEY (Sporter_ID) REFERENCES Sporter(Sporter_ID) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ===== Oefening, Machine en koppeltabellen =====

CREATE TABLE Oefening (
    Oefening_ID    INT AUTO_INCREMENT PRIMARY KEY,
    Admin_ID       INT NULL,
    Bibliotheek_ID INT NULL,
    Naam_Oefening  VARCHAR(100) NOT NULL,
    FOREIGN KEY (Admin_ID)       REFERENCES Sporter(Sporter_ID)       ON DELETE SET NULL,
    FOREIGN KEY (Bibliotheek_ID) REFERENCES Bibliotheek(Bibliotheek_ID) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE Machine (
    Machine_ID   INT AUTO_INCREMENT PRIMARY KEY,
    Oefening_ID  INT NULL,
    Naam_Machine VARCHAR(100) NOT NULL,
    FOREIGN KEY (Oefening_ID) REFERENCES Oefening(Oefening_ID) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE tblSporterOefening (
    SporterOefening_ID INT AUTO_INCREMENT PRIMARY KEY,
    Sporter_ID         INT NOT NULL,
    Oefening_ID        INT NOT NULL,
    FOREIGN KEY (Sporter_ID)  REFERENCES Sporter(Sporter_ID)  ON DELETE CASCADE,
    FOREIGN KEY (Oefening_ID) REFERENCES Oefening(Oefening_ID) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tblOefeningMachine (
    OefeningMachine_ID INT AUTO_INCREMENT PRIMARY KEY,
    Oefening_ID        INT NOT NULL,
    Machine_ID         INT NOT NULL,
    FOREIGN KEY (Oefening_ID) REFERENCES Oefening(Oefening_ID) ON DELETE CASCADE,
    FOREIGN KEY (Machine_ID)  REFERENCES Machine(Machine_ID)   ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE tblOefeningSpier (
    OefeningSpier_ID INT AUTO_INCREMENT PRIMARY KEY,
    Oefening_ID      INT NOT NULL,
    Spier_ID         INT NOT NULL,
    FOREIGN KEY (Oefening_ID) REFERENCES Oefening(Oefening_ID) ON DELETE CASCADE,
    FOREIGN KEY (Spier_ID)    REFERENCES Spier(Spier_ID)       ON DELETE CASCADE
) ENGINE=InnoDB;

-- ===== testgegevens =====

INSERT INTO Bibliotheek (Naam_Categorie) VALUES
    ('Barbell'), ('Dumbbell'), ('Machine'), ('Lichaamsgewicht');

INSERT INTO Spier (Naam_Spier) VALUES
    ('Borst'), ('Rug'), ('Benen'), ('Schouders'), ('Armen'), ('Core');

INSERT INTO Oefening (Bibliotheek_ID, Naam_Oefening) VALUES
    (1, 'Bankdrukken'), (2, 'Dumbbell press'), (3, 'Lat pulldown'),
    (4, 'Optrekken'), (1, 'Squat'), (4, 'Plank');

INSERT INTO tblOefeningSpier (Oefening_ID, Spier_ID) VALUES
    (1, 1), (2, 1), (3, 2), (4, 2), (5, 3), (6, 6);
