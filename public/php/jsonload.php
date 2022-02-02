<?php
header("Content-Type: application/json");
$fc = trim($_GET['filename']);
$fc = str_replace(array("'" , '"' , '\\' , '/'), ' ' , $fc);
$fdir = explode('-',$fc)[0];
$fcversion = explode('|', $_COOKIE[$fc]);

$fcversion = trim($fcversion[2]); //версия в куке
$filename = '../savedgames/'.$fdir.'/'.$fc.'.json';
if (!file_exists($filename)) {
	echo '{"a":"404"}';
	exit;
}

$out = file($filename);
if ($fcversion!==trim($out[0])) {
    unset($out[0]);
    foreach ($out as $o) {
        echo $o."\r\n";
    }
} else {
    echo '{"a":"0"}';
}
unset($out);
?>