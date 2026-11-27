<?php
require_once "../PHP-DATABASE-TEST/include/connectie.php";

$query = "SELECT * FROM fittrack.spier";

$stmt = $verbinding->prepare($query);
$stmt->execute();

// Blijf fetchen zolang er een volgende rij is
while ($test = $stmt->fetch()) {
    echo $test["Spier_ID"] . " - " . $test["Naam_Spier"] . "<br>";
}
?>