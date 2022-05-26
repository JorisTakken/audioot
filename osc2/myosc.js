
    // const options = {
    //     key: fs.readFileSync('../key.pem'),
    //     cert: fs.readFileSync('../cert.pem'),
    //     requestCert: false,
    //     rejectUnauthorized: false
    // };

    // //  var server = https.createServer(options, app);
    // //  server.listen(8080);




    var osc = new OSC();
    osc.open(); // connect by default to ws://localhost:8080

    document.getElementById('send').addEventListener('click', () => {
        var message = new OSC.Message('/test/random', Math.random());
        osc.send(message);
    });