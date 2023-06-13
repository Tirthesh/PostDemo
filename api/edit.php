<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once '../include/DbConnect.php';
$conn = DbConnect::connect();

$editId = explode('_', base64_decode($_GET['id']));

$status=0;
if(isset($editId[0]) && isset($editId[1])){

	$sql = "select TO_BASE64(concat(posts.id, '_', posts.created_by)) as id, title, `desc` from posts where id=".$editId[0]." AND created_by = ".$editId[1];
	$stmt = $conn->prepare($sql);
	$stmt->execute();
	$data = $stmt->fetch(PDO::FETCH_ASSOC);

	$status = $stmt->rowCount();
}
$data['status'] = $status;


echo json_encode($data);
exit;