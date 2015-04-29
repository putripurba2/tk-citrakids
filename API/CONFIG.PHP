<?php
$host = "localhost";
$user = "root";       // default XAMPP user
$pass = "";           // kosongkan jika belum diubah
$db   = "citrakids";

$conn = mysqli_connect($host, $user, $pass, $db);

if (!$conn) {
    die("Koneksi gagal: " . mysqli_connect_error());
}
?>
