<?php
require_once("functions.php");
require_once("sql.php");


if(file_get_contents("php://input")){

$getstr=file_get_contents("php://input");
//$exm = '{"message":"streamStatus","updatedAt":"2017-07-08T01:25:43.005664841+08:00","data":{"id":"z1.iceagedata-live.T4","url":"rtmp://pili-publish.iceagedata.com/iceagedata-live/T4","status":"disconnected"}}';
$arr = json_decode($getstr,true);
$updateAt = $arr['updatedAt'];
$timesplit = explode('.',$updateAt);
$time = $timesplit[0];
$time = str_replace("T"," ",$time);
$id = $arr['data']['id'];
$url = $arr['data']['url'];
$idsplit = explode('.',$id);
$stream = "";
foreach ($idsplit as $split) {
  $stream = $split;
}
$status = $arr['data']['status'];
$tittle = "通知";
$content = "";

$sql = 'SELECT * FROM live_stream WHERE stream = "'.$stream.'"';//.$stream;
$sth = $db->query($sql);
$co_uptime = "";
$un_uptime = "";
while($row = $sth->fetch()){
  $co_uptime = $row['co_updateAt'];
  $un_uptime = $row['un_updateAt'];
}

if($status=="connected"){
  $tittle = "直播开始通知";
  $content = '服务器已开始接收流"'.$id.'"<br>URL地址:"'.$url.'"<br>时间:'.$updateAt;
  $timecal = strtotime($time) - strtotime($co_uptime);
  if($timecal>180 || $timecal<-180){
    $flag = sendMail('kiros@onsigma.com',$tittle,$content);
    if($flag){
        echo "发送邮件成功！";
        echo "\br";
        echo $updateAt."  ".$id."  ".$url."  ".$status."  ".$stream;
        $sql1 = 'UPDATE live_stream SET co_updateAt = "'.$time.'",status = "connected" WHERE stream = "'.$stream.'"';//.$stream;
        $sth1 = $db->query($sql1);
    }else{
        echo "发送邮件失败！";
    }



  }
}else if($status=="disconnected"){
  $tittle = "直播结束通知";
  $content = '服务器已结束接收流"'.$id.'"<br>URL地址:"'.$url.'"<br>时间:'.$updateAt;
  $timecal = strtotime($time) - strtotime($un_uptime);
  if($timecal>180 || $timecal<-180){
    $flag = sendMail('kiros@onsigma.com',$tittle,$content);
    if($flag){
        echo "发送邮件成功！";
        echo "\br";
        echo $updateAt."  ".$id."  ".$url."  ".$status."  ".$stream;
        $sql1 = 'UPDATE live_stream SET un_updateAt = "'.$time.'",status = "disconnected" WHERE stream = "'.$stream.'"';//.$stream;
        $sth1 = $db->query($sql1);
    }else{
        echo "发送邮件失败！";
    }
  }
}

$db = null;



}
else{
  echo "Nothing Received! ";
$db = null;



//$getstr = '{"message":"streamStatus","updatedAt":"2017-07-08T01:03:00.005664841+08:00","data":{"id":"z1.iceagedata-live.T4","url":"rtmp://pili-publish.iceagedata.com/iceagedata-live/T4","status":"disconnected"}}';








    //查询数据
/*
  $sql = 'SELECT * FROM live_stream WHERE stream = "'.$stream.'"';//.$stream;
  $sth = $db->query($sql);
  $gettime = "";
  while($row = $sth->fetch()){
    echo "Stream:".$row['stream']."     ";
    echo "时间:".$row['updateAt']."<br />";
    $gettime = $row['updateAt'];
  }

    echo strtotime($gettime) - strtotime($time);
    */
//  写入数据




}

?>
