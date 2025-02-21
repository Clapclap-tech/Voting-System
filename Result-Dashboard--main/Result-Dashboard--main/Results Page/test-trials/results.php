<?php
include '../ds.php';


$query = "SELECT name, gender, party, elected, vote_percent AS votePercent, total_votes AS totalVotes FROM candidates";
$result = $conn->query($query);

$candidates = [];
while ($row = $result->fetch_assoc()) {
    $candidates[] = $row;
}


header('Content-Type: application/json');
echo json_encode($candidates);
?>