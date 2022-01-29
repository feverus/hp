<?php
header("Content-Type: application/json");
$fc = trim($_GET['filename']);
$fc = str_replace(array("'" , '"' , '\\' , '/'), ' ' , $fc);
$pass = crc32($fc.'Ula7NG39PK');
$fcversion = explode('|', $_COOKIE['hpcookie|'.$fc]);
$fcpass = trim($fcversion[1]); //пароль в куке
$fcversion = trim($fcversion[2]); //версия в куке
$filename = '../savedgames/'.$fc.'.json';
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
			file_put_contents($filename, $fcversion."\r\n".$data);
			echo $pass;
		} else {
			echo 'Error : слишком много данных';
		}
	}
} else {
	echo 'Error : отказано в доступе';
}
?>