/* voorbeeld-sketch voor het gebruik van Open Sound Control in P5js - client
 * Deze sketch stuurt berichten naar het IP-adres 127.0.0.1 en poort 9000
 */

//aanmaken van de benodigde variabelen.
let client;
let connect;
let x, y;


var px = 50; // Position x and y
var py = 50;
var vx = 0.0; // Velocity x and y
var vy = 0.0;
var updateRate = 1 / 60; // Sensor refresh rate


// function setup() {
//   createCanvas(640,640);
//   //maak een connect-object aan dat zorgt voor de communicatie met oscServer.js
//   connect = new Connect();
//   //maak verbinding met oscServer.js, en voer code tussen {} uit zodra deze verbinding tot stand is gekomen.
//   connect.connectToServer(function() {
//     //maak een nieuwe client-object aan.
//     client = new Client();

//     //start de client en laat deze berichten sturen naar het ip-adres 127.0.0.1 en poort 9000
//     client.startClient("127.0.0.1",9000); 
//   });

//   x = 100;
//   y = 100;
// }

// function draw() {

//   background(220,0,50);

//   //laat een ellipse zien op de positie van de muiscursor.
//   // ellipse(mouseX,mouseY,25);


//   // mouseX = mouseX + 1;
//   // console.log(mouseX);
//   getAccel();

// }

// function mouseMoved() {
//   if (client) {
//     //stuur een bericht naar het adres /x met als waarde de x-positie van de muis
//     client.sendMessage("/x",mouseX);
//     client.sendMessage("/y",mouseY);
//     //stuur een bericht naar het adres /y met als waarde de y-positie van de muis.
//   }
// }



function getAccel() {

  //console.log('1');
  DeviceMotionEvent.requestPermission().then(response => {
    
    if (response == 'granted') {

      // console.log('2');

        const element = document.getElementById('accelPermsButton');
       if (element) {
          element.remove(); // Removes the div with the 'div-02' id
        }
      // console.log('2');
      // alert('1');
          // Add a listener to get smartphone orientation 
          // in the alpha-beta-gamma axes (units in degrees)
      window.addEventListener('deviceorientation', (event) => {
            
    //    console.log('3');
      alert('1');
              // Expose each orientation angle in a more readable way
              rotation_degrees = event.alpha;
              frontToBack_degrees = event.beta;
              leftToRight_degrees = event.gamma;

              // Update velocity according to how tilted the phone is
              // Since phones are narrower than they are long, double the increase to the x velocity
              vx = vx + leftToRight_degrees * updateRate * 2;
              vy = vy + frontToBack_degrees * updateRate;

              // Update position and clip it to bounds
              px = px + vx * .5;
              if (px > 98 || px < 0) {
                  px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
                  vx = 0;
              }

              py = py + vy * .5;
              if (py > 98 || py < 0) {
                  py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
                  vy = 0;
              }

            px = px + 1;
          //  console.log(px);
        ellipse(px, py, 25);
        
        background(px, 0, 50);
        

         //   console.log(px);
              // dot = document.getElementsByClassName("indicatorDot")[0]
              // dot.setAttribute('style', "left:" + (px) + "%;" +
              //     "top:" + (py) + "%;");

          });
      }
      }
  );
}