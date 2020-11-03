<?php

// output headers so that the file is downloaded rather than displayed
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=data.csv');

// create a file pointer connected to the output stream
$output = fopen('StarWars.csv', 'w');

// fetch the data
    $dwn = file_get_contents('php://input');
    $decoded = json_decode($dwn, true);

    echo $decoded;
    echo $dwn;
    download($decoded);



function download($array, $filename = "StarWars.csv", $delimiter=";") {
    header('Content-Type: application/csv');
    header('Content-Disposition: attachment; filename="'.$filename.'";');

    $f = fopen($filename, 'w');

    foreach ($array as $line) {
        fputcsv($f, $line, $delimiter);
    }
}   

?>