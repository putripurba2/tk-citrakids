<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'config.php';

$input = file_get_contents("php://input");
$data = json_decode($input);

// Validasi JSON
if (!$data || !is_object($data)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Data JSON tidak valid!"]);
    exit();
}

// Cek semua input
if (
    isset($data->nama_lengkap) &&
    isset($data->tanggal_lahir) &&
    isset($data->jenis_kelamin) &&
    isset($data->nama_ortu) &&
    isset($data->alamat) &&
    isset($data->no_hp) &&
    isset($data->email) &&
    isset($data->tanggal_daftar)
) {
    $stmt = $conn->prepare("INSERT INTO pendaftaran_siswa 
        (nama_lengkap, tanggal_lahir, jenis_kelamin, nama_ortu, alamat, no_hp, email, tanggal_daftar) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "ssssssss",
        $data->nama_lengkap,
        $data->tanggal_lahir,
        $data->jenis_kelamin,
        $data->nama_ortu,
        $data->alamat,
        $data->no_hp,
        $data->email,
        $data->tanggal_daftar
    );

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Pendaftaran berhasil!"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Gagal menyimpan data!"]);
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Data tidak lengkap!"]);
}

$conn->close();
?>
