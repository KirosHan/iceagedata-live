<?php
$sql ="SELECT * FROM live_stream WHERE stream = ".$stream; //SQL语句
//  $pdo = new PDO('mysql:host=localhost;dbname=iceagedata_live;port=3306','root','19920430vin');
$dbh = "mysql:host=localhost;dbname=iceagedata_live";
$db = new PDO($dbh, 'oeks', '11111111');
$db->query("set character set 'uft-8'");




?>
