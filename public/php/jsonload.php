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
if ($fcversion<trim($out[0])) {
	if (preg_match_all('/"gamename":"([^"]+)"/si', $out, $matches, PREG_PATTERN_ORDER)!==false) {
		$gamename = trim($matches[1][0]);	
	} else {
		$gamename = 'Игра';
	}	
	setcookie('hpcookie|'.$fc, $gamename.'|'.$out[1].'|'.$out[0], time()+(3600*24*50), '/');
    unset($out[0]);
    unset($out[1]);
    foreach ($out as $o) {
        echo $o."\r\n";
    }
} else {
    echo '{"a":"0"}';
}
unset($out);
?>