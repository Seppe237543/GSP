<?php
// 4 parameters
$host = "localhost"; // sever -> url/IP-adres
$dbname = "fittrack"; // database
$user = "root"; // locale server
$pass = ""; // default, eventueel aanpassen

// databasehosting
$dbh  = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

// try
try {
    $verbinding = new PDO($dbh, $user, $pass);
    // exxtra attributen aan de verbinding toevoegen
    $verbinding->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅<br>";
}
catch (PDOException $exception) {
    die("database connectie mislukt: " . $exception->getMessage());
}