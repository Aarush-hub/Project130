left_WristX=0;
left_WristY=0;
right_WristX=0;
right_WristY=0;
score_leftWrist=0;
score_rightWrist=0;
song1="";
song2="";

function setup(){
canvas= createCanvas(500,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet= ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);
}

function modelLoaded(){
console.log("PoseNet is intialized");
}

function gotPoses(results){
if(results.length > 0){
console.log(results);
left_WristX=results[0].pose.leftWrist.x;
left_WristY=results[0].pose.leftWrist.y;
console.log("Left Wrist x"+ left_WristX + "Left Wrist y"+ left_WristY);
right_WristX=results[0].pose.rightWrist.x;
right_WristY=results[0].pose.rightWrist.y;
console.log("Right Wrist x"+ right_WristX+ "Right Wrist y"+ right_WristY);
score_rightWrist=results[0].pose.keypoint[10].score;
score_leftWrist=results[0].pose.keypoint[9].score;
}
}

function preload(){
song1=loadSound("music.mp3");
song2=loadSound("music2.mp3");
}

function draw(){
image(VIDEO,0,0,500,500);
circle(left_WristX,left_WristY,20);
fill("#FF0000");
stroke("#FF0000");
song1_status=song1.isPlaying;
song2_status=song2.isPlaying;

if(score_leftWrist>0.2){
circle(right_WristX,right_WristY,20);
song2.stop();
if(song1_status==false){
song1.play();
document.getElementById("song").innerHTML="Playing Harry Potter theme song";
}
}

if(score_rightWrist>0.2){
    circle(left_WristX,left_WristY,20);
    song1.stop();
    if(song2_status==false){
    song2.play();
    document.getElementById("song").innerHTML="Playing Peter Pan theme song";
    }
    }
}

