x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
speak_data = "";
status_ = ""

draw_apple = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);

  content = event.results[0][0].transcript;

  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

  to_number = Number(content);
  if (Number.isInteger(to_number)) {
    status_ = "Started drawing the apple"
    draw_apple = "set"
  } else {
    status_ = "The speech has not recognized a number"
  }

}

function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height - 150);
  canvas.position(0, 150)
}

function draw() {
  if (draw_apple == "set") {
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    for (i = 0; i< to_number; i++) {
      x=Math.floor(Math.random())*700;
      y=Math.floor(Math.random())*400;
      image(apple, x, y, 50, 50)
    }
    document.getElementById("status").innerHTML=to_number + " Apples Drawn"
    speak_data=to_number + "Apples Drawn"
    speak()

  }
  
}

function speak() {
  var synth = window.speechSynthesis;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}

function preload() {
  apple = loadImage('apple.png');
}