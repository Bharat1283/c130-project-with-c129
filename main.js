interbgm="";
starwarsbgm="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_inter = "";
song_sw = "";

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    interbgm = loadSound("inter.mp3");
    starwarsbgm = loadSound("sw.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_inter = interbgm.isPlaying();
    console.log(song_inter);

    song_sw = starwarsbgm.isPlaying();
    console.log(song_sw);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        starwarsbgm.stop();
        if(song_inter == false){
            interbgm.play();
        }
        else{
            console.log("Song Name: Interstellar");
            document.getElementById("song_id").innerHTML = "Song Name: Interstellar Main Theme";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        interbgm.stop();
        if(song_sw == false){
            starwarsbgm.play();
        }
        else{
            console.log("Song Name: Star Wars Main Theme");
            document.getElementById("song_id").innerHTML = "Song Name: Star Wars Main Theme";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}
