<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once '../include/DbConnect.php';
$conn = DbConnect::connect();

$data = json_decode( file_get_contents('php://input') );
$sql = "select id,name,email from users where email='".$data->email."' and password='".md5($data->password)."'";
$stmt = $conn->prepare($sql);
$stmt->execute();
$data = $stmt->fetch();

$return['status'] = '0';
if($stmt->rowCount() > 0){
	$return['status'] = '1';
	$return['name'] = $data['name'];
	$return['id'] = $data['id'];
}

echo json_encode($return);
exit;