var database

var drawing = [];
var currentPath,button2,title,title2,title3,show;
var isDrawing = false;

function setup(){
  canvas = createCanvas(600,600);
  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  button2 = createButton('Other paintings from the database');
  button2.position(700,80)

  button2.size(250,75);
  button2.mousePressed(showDrawing,)
  var button1 = createButton('Upload Your Work');
  button1.position(700,220)
  button1.size(250,50);
  button1.mousePressed(saveDrawing)

  var config = {  
    apiKey: "AIzaSyB1kezEShlL80AvWYSgCAtteLB3AFUdluQ",
    authDomain: "the-world-is-our-canvas-7c3c0.firebaseapp.com",
    databaseURL: "https://the-world-is-our-canvas-7c3c0.firebaseio.com",
    projectId: "the-world-is-our-canvas-7c3c0",
    storageBucket: "the-world-is-our-canvas-7c3c0.appspot.com",
    messagingSenderId: "1050107457263",
    appId: "1:1050107457263:web:95ec5986b6c83501c2351a"
  };
  firebase.initializeApp(config);
  database = firebase.database();  
  

}


function startPath(){
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath(){
  isDrawing = false;
}

function draw(){

  

  background("yellow");
  

  if (isDrawing){
    var point = {
      x: mouseX,
      y:mouseY
    }
    currentPath.push(point);
  }



  fill("white");

  strokeWeight(10);
  noFill();
  for(var i = 0; i<drawing.length; i++){
    var path = drawing[i];
    beginShape();
    for(var j = 0; j<path.length; j++){
      vertex(path[j].x,path[j].y)
    }
    endShape();
  }
  

}



function saveDrawing(){
  
 
  var ref = database.ref('/').set({
    drawing : drawing
  });
 
}



function gotData(data){

  var ref = database.ref('/');
  ref.on('value', gotData, errData)

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i< keys.length; i++ ){
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    var ahref = createButton('#', key);  
    
    ahref.mousePressed(showDrawing);
    ahref.parent(li);     
    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(){


  var ref = database.ref('/');
  ref.on('value', oneDrawing, errData);

  function oneDrawing(data){
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing                                                                                                                  //.
  }
}