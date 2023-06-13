<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once '../include/DbConnect.php';
$conn = DbConnect::connect();

$data = json_decode( file_get_contents('php://input') );
$sql = "INSERT INTO 
                posts(id, title, `desc`, created_at, created_by) 
                VALUES(null, :title, :desc, :created_at, :created_by)";

$stmt = $conn->prepare($sql);
$created_at = date('Y-m-d H:i:s');
$stmt->bindParam(':title', addslashes($data->title));
$stmt->bindParam(':desc', addslashes($data->desc));
$stmt->bindParam(':created_at', $created_at);
$stmt->bindParam(':created_by', $data->userId);

if($stmt->execute()) {
    $response = ['status' => 1, 'message' => 'Record created successfully.'];
} else {
    $response = ['status' => 0, 'message' => 'Failed to create record.'];
}
echo json_encode($response);
exit;