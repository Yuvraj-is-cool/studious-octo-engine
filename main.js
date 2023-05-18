song1=music.mp3
song2=music2.mp3
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftwrist_score=0;
rightwrist_score=0;
song_state="";

function preload(){
    song1=loadSound("music.mp3")
    song2=loadSound("music2.mp3")
}
function setup(){
    canvas=createCanvas(650,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}
function draw(){
        image(video,0,0,650,500);
        fill(250,0,0);
        stroke(255,0,0);

        if(leftwrist_score>0.2){
            circle(leftWristX,leftWristY,20);
            song2.isPlaying(true);
            document.getElementById("song").innerHTML="Peter Pan song is Currently playing."
            if(rightwrist_score>0.2){
                circle(rightWristX,rightWristY,20);
                    song1.isPlaying(true);
                    document.getElementById("song").innerHTML="Harry Potter theme is currently playing."
            }
        }
}
function modelLoaded(){
    console.log("pose net has been initialized")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X= "+ leftWristX + "Left Wrist Y= "+ leftWristY);
        leftwrist_score=results[0].pose.keypoints[9].score;
        console.log("LeftWristscore"+leftwrist_score);
    
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    
        console.log("Right Wrist X= "+ rightWristX + "Right Wrist Y= "+ rightWristY);
    }
    
}