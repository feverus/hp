<?php
header("Content-Type: application/json");

function password() {				
	$a = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
	$pass = ''; 
	for ($i=0;$i<12;$i++) {
		$pass.=$a[random_int(0, strlen($a)-1)]; 
	}
	return $pass;
}

$fc = trim($_GET['filename']);
$fc = str_replace(array("'" , '"' , '\\' , '/'), ' ' , $fc);
$fdir = explode('-',$fc)[0];
$fc = str_replace(array("'" , '"' , '\\' , '/'), ' ' , $fc);
$fcversion = explode('|', $_COOKIE['hpcookie|'.$fc]);
$fcpass = trim($fcversion[1]); //пароль в куке
$fcversion = trim($fcversion[2]); //версия в куке
mkdir('../savedgames/'.$fdir, 0777);
$filename = '../savedgames/'.$fdir.'/'.$fc.'.json';
if (!file_exists($filename)) {
	$pass = password();
} else {
	flock($file,LOCK_EX);
	$out = file($filename);
	$pass = trim($out[1]);
	$fcversion = trim($out[0]); //версия в файле
	unset($out);
	flock($file,LOCK_UN);
}
if (($fcpass==$pass) or (!file_exists($filename))) {
	if (isset($_GET['delete'])) {
		setcookie('hpcookie|'.$fc, "", time()-3600, '/');
		echo 'Удаление cookie';
	} else {
		$data = file_get_contents("php://input");
		//ограничение в 10кб
		if (strlen($data)<10000) {
			if (preg_match_all('/"gamename":"([^"]+)"/si', $data, $matches, PREG_PATTERN_ORDER)!==false) {
				$gamename = trim($matches[1][0]);	
			} else {
				$gamename = 'Игра';
			}		
			if (!file_exists($filename)) {
				setcookie('hpcookie|'.$fc, $gamename.'|'.$pass.'|0', time()+(3600*24*50), '/');
				$fcversion = 0;
			}
			$fcversion++;
			flock($file,LOCK_EX);
			file_put_contents($filename, $fcversion."\r\n".$pass."\r\n".$data);
			flock($file,LOCK_UN);
			echo $pass;
		} else {
			echo 'Error : слишком много данных';
		}
	}
} else {
	echo 'Error : отказано в доступе';
}
?>