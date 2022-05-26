let xPos= 200;
let yPos = 200;

function setup() {
  createCanvas(windowWidth, windowHeight - 100);
  startDeviceRotationDetect();
}

function startDeviceRotationDetect() {
  // iOS 13 added a new security wall that prevents
  // access to sensors without requesting access through the OS
  // Access must be requested inside of a mousePressed event on
  // a HTML button
  //So first we check to see if this iOS by seeing if the
  // DeviceMotionEvent.requestPermission exists as a function
  // Otherwise it is not iOS 13+ so we can skip this step
  if (typeof(DeviceMotionEvent) !== "undefined" &&
  typeof(DeviceMotionEvent.requestPermission) === "function") {
    // If it does we make a button
    let button = createButton('click to allow access to sensors');
    // Then we set it's text big so it is easy to see
    button.style('font-size', '28px');
    // Then we make its 'mousePressed' functionality into another function
    // we write below
    button.mousePressed(DeviceMotionEvent.requestPermission);
  }
}

function draw() {
  background(220);
  // Check to make sure they exist before using
  // in iOS 13+ users these won't exist till they give permission
  if(rotationX && rotationZ) {
    fill(100, 100, 250);
    // Here I am multiplying these values by 2 to get them in a range
    // that I like but I could just as easily use map()
    // Note that rotationX corresponds to left and write movement
    // and rotationY corresponds to up and down movement
    // This is because the axes of your device are reversed
    circle(xPos + rotationY * 2, yPos + rotationX * 2, 100);
  }
  text('x:' + rotationX, 10, 10);
  text('y:' + rotationY, 10, 100);
}