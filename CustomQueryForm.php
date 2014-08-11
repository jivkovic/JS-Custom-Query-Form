<?php 


$output = "SELECT * FROM ..(JOIN?).. WHERE ";

for ($i = 0; $i < count($_POST['Operators']); $i++){

	if ($i>0)
	switch ($_POST['DBoperators'][$i-1]){
		case '0':
			$output .= " AND ";
			break;
		case '1':
			$output .= " OR ";
			break;
	}
	
	$output .= $_POST['Fields'][$i];
	
	switch ($_POST['Operators'][$i]){
		case '0':
			$output .= " = ";
			break;
		case '1':
			$output .= " <> ";
			break;
		case '2':
			$output .= " > ";
			break;
		case '3':
			$output .= " < ";
			break;
	}
	
	$output .= $_POST['Inputs'][$i];

}

echo $output;

echo "<br><br><br>-----------------------------------<br>";


var_dump($_POST);

?>