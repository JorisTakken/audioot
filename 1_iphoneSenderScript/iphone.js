let button
let permissionGranted = false
let nonios13device = false

let cx, cy

function setup() {
  createCanvas(windowWidth, windowHeight)

  if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
    button = createButton('click to allow access to sensors')
    button.style("font-size", "24px")
    button.center()
    button.mousePressed(requestAccess)
  } else {
    // non ios 13 devices
    nonios13device = true
  }
}

function draw() {
  if (!permissionGranted && !nonios13device) {
    // I am simply not running draw, but you can treat in different ways.
    return
  }

  background('lightblue')
  textSize(72)
  text(rotationX, 100, 100)
}

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true
      }
    })
    .catch(console.error)
  button.remove()
}