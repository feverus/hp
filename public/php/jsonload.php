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
$fileversion = trim($out[0]);
if ($fcversion<$fileversion) {
	if (preg_match_all('/"gamename":"([^"]+)"/si', $out, $matches, PREG_PATTERN_ORDER)!==false) {
		$gamename = trim($matches[1][0]);	
	} else {
		$gamename = 'Игра';
	}	
	setcookie('hpcookie|'.$fc, $gamename.'|'.trim($out[1]).'|'.trim($out[0]), time()+(3600*24*50), '/');
    unset($out[0]);
    unset($out[1]);
	echo '{"version":"'.$fileversion.'",';
    foreach ($out as $key => $o) {
		if ($key==2) {
			$o=substr($o,1);
		}
        echo $o."\r\n";
    }
} else {
    echo '{"a":"0"}';
}
unset($out);
?>