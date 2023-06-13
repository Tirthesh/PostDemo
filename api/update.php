<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once '../include/DbConnect.php';
$conn = DbConnect::connect();

$data = json_decode( file_get_contents('php://input') );
$editId = explode('_', base64_decode($data->id));

$status=0;
if(isset($editId[0]) && isset($editId[1])){

	$data = json_decode( file_get_contents('php://input') );
	$sql = "update posts set title='".addslashes($data->title)."',`desc`='".addslashes($data->desc)."' where id=".$editId[0];
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$status = $stmt->rowCount();
}
$data['status'] = $status;

echo json_encode($data);
exit;