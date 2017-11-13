<?php

    //http://stackoverflow.com/questions/18382740/cors-not-working-php
    header("Access-Control-Allow-Origin: *");

    $postdata = file_get_contents("php://input");
    if (isset($postdata)) {
        $request = json_decode($postdata);
        $value = $request->value;
        
        if ($value === 'true' ) {
            $bdd = new PDO('mysql:host=***;dbname=***', '***', '***', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
            
            $query = $bdd->prepare("SELECT * FROM projetsapparts") or die('Login invalide');
            $query->execute();
            $count = $query->rowCount();
            $liste = array();
            class projet1 {};
            while ($projet = $query->fetch()) {
                $projet1 = new projet1;
                $projet1->ville = $projet['ville'];
                $projet1->photo = $projet['photo'];
                $liste[] = $projet1;
            }
            echo json_encode($liste);
			//echo $liste;
            //return $liste;
        }
    }
    else {
        echo 'Erreur postdata';
    }
?>