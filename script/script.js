//Main function of the program - draws the gradient on the screen
function drawGradient() {
  //Get canvas variables used for drawing
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  //Make sure that the canvas size fills the whole browser window
  canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

  //set the intial tilt, or slope of the gradient
  var initial_tilt = randomRange(-4, 4);

  //Set the original direction/modifier for the vertical hue shift
  var hue_constant = 5;
  if (randomRange(0, 1) > 0.5) hue_constant = -5;

  //Initialize hue and horizontal_hue, variables that keep track of the hue as the canvas is looped through
  var hue = randomRange(0, 360);
  var horizontal_hue = 0;
  //Loop through the canvas
  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 20; x++) {
      //Calculate and add to the horizontal hue, which determines slope/tilt
      horizontal_hue += initial_tilt * randomRange(0.5, 1.5);

      //Calculate the new hue of this particular 'block' and set the color
      var new_hue = Math.floor(hue + horizontal_hue + 10 * randomRange(-0.5, 0.5));
      //If this new hue exceeds the argument bounds, reset it
      if (new_hue < 0) new_hue = 360 - new_hue;
      else if (new_hue > 360) new_hue = new_hue - 360;
      //Set color as new hue
      var new_hue_string = 'hsl(' + new_hue + ', 65%, 40%)';
      ctx.fillStyle = new_hue_string;

      //Calculate the size the block should be
      var x_size = canvas.width/20;
      var y_size = canvas.height/20;

      //Fill in the rectangle
      ctx.fillRect(Math.floor(x * x_size), Math.floor(y * y_size), Math.ceil(x_size), Math.ceil(y_size));
    }
    //Increase the hue vertically, and reset the slope/tilt
    hue += hue_constant * randomRange(0.5, 1.5);
    horizontal_hue = 0;
  }
}

//Return a random number in the specified range
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

//Set custom window resize function
window.onresize = onResize;
function onResize() {
	//Get canvas and set
  var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
  //Redraw the gradient everytime the window is resized
  drawGradient();
}
