<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include_once '../include/DbConnect.php';
$conn = DbConnect::connect();

$data = json_decode( file_get_contents('php://input') );
$page = isset($data->page) ? $data->page : 0;
$noOfRecords = isset($data->noOfRecords) ? $data->noOfRecords : 50;
$offset = $page * $noOfRecords;

$searchStr = isset($data->search) ? $data->search : false;
$addWhere='';
if($searchStr){
	$addWhere = " WHERE title LIKE '%$searchStr%' ";
}

$sql = "select 
			title, `desc`, date_format(posts.created_at, '%Y-%m-%d %H-%i') as created_at, users.name as userName, users.id as userId, TO_BASE64(concat(posts.id, '_', posts.created_by)) as id
		from 
			posts inner join users on created_by = users.id 
		 ".$addWhere." 
		order by 
			posts.id desc 
		limit $offset, $noOfRecords";

$stmt = $conn->prepare($sql);
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);
exit;