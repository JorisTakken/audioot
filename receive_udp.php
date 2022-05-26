<?php
//Reduce errors
error_reporting(~E_WARNING);

//Create a UDP socket
if (!($sock = socket_create(AF_INET, SOCK_DGRAM, 0))) {
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Couldn't create socket: [$errorcode] $errormsg \n");
}

echo "Socket created \n";

// Bind the source address
// if (!socket_bind($sock, "192.168.178.158", 1731)) { // lokaal thuis, router stuurt door naar dit nummer
if (!socket_bind($sock, "192.168.178.153", 1731)) { // lokaal studio
    $errorcode = socket_last_error();
    $errormsg = socket_strerror($errorcode);

    die("Could not bind socket : [$errorcode] $errormsg \n");
}

echo "Socket bind OK \n";

//Do some communication, this loop can handle multiple clients
while (1) {
    // echo "\n Waiting for data ... \n";

    //Receive some data
    $r = socket_recvfrom($sock, $buf, 512, 0, $remote_ip, $remote_port);
    //  echo "$remote_ip : $remote_port -- " . $buf;
    print $buf;
    $json = json_decode($buf, true);
    print_r($json);




    // print  $json['device']['uuid'] . ' - ' . $json['sensordata']['gyro']['z'] . "\n";
    //  print $json['sensordata']['accel']['x'] . "\n";

    //Send back the data to the client
    //socket_sendto($sock, "OK " . $buf , 100 , 0 , $remote_ip , $remote_port);

}

socket_close($sock);
