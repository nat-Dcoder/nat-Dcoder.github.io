const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = innerWidth;//Set the width & height of the canvas to match the viewport dimensions
const height = canvas.height = 300;
//-------------- Get access to the player sprite sheet ------------------------
const playerObj = {
    //So the source position can be updated
    srcX : 0,
    srcY : 0,
    //Work out the size of individual sprites because they are evenly spaced apart
    frameWidth : 302 / 7,
    frameHeight : 280 / 2,
    //So the animation can play
    totalFrames : 7, //Because there are 6 sprites in total. Therefore the animation will take place over 6 frames
    currentFrame : 0,
    //Record the number of times the 'animate' function has been called
    framesDrawn : 0,
};
const playerSpriteSheet = new Image();
playerSpriteSheet.src = "subZeroSpriteSheet.png";
playerSpriteSheet.onload = loadImages;
//<------------------End------------------------------>
//<-------------------- Bricks wall sprites --------------------------->
const bricksObj = {
    //So the source position can be updated
    srcX : 500,
    srcY : 153,
    //There are 6 different sprites on 1 rows
    cols : 2,
    rows : 5,
    //Work out the size of individual sprites because they are evenly spaced apart
    frameWidth : 766 / 2,
    frameHeight : 737 / 8.6,
    //So the animation can play
    totalFrames : 2, //Because there are 6 sprites in total. Therefore the animation will take place over 6 frames
    currentFrame : 0,
    //Record the number of times the 'animate' function has been called
    framesDrawn : 0,
};
const bricksSpriteSheet = new Image();
bricksSpriteSheet.src = "bricks.jpg";
bricksSpriteSheet.onload = loadImages;

//<-------------------- box sprites --------------------------->
const boxObj = {
    //So the source position can be updated
    srcX : 79.5,
    srcY : 0,
    //There are 6 different sprites on 1 rows
    cols : 10,
    rows : 8,
    //Work out the size of individual sprites because they are evenly spaced apart
    frameWidth : 310 / 9.5,
    frameHeight : 312 / 10,
    //So the animation can play
    totalFrames : 10, //Because there are 6 sprites in total. Therefore the animation will take place over 6 frames
    currentFrame : 0,
    //Record the number of times the 'animate' function has been called
    framesDrawn : 0,
};
const boxSpriteSheet = new Image();
boxSpriteSheet.src = "box.png";
boxSpriteSheet.onload = loadImages;

//<-------------------- box2 sprites --------------------------->
const box2Obj = {
    //So the source position can be updated
    srcX : 0,
    srcY : 0,
    //Work out the size of individual sprites because they are evenly spaced apart
    frameWidth : 100,
    frameHeight : 100,
    //So the animation can play
    totalFrames : 1, //Because there are 6 sprites in total. Therefore the animation will take place over 6 frames
    currentFrame : 0,
    //Record the number of times the 'animate' function has been called
    framesDrawn : 0,
};
const box2SpriteSheet = new Image();
box2SpriteSheet.src = "Crate.png";
box2SpriteSheet.onload = loadImages;

//So increased image size can still retain its pixel art style
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height); // So the contents of the previous frame can be cleared
    requestAnimationFrame(animate); //The function will be called repeatedly on each new frame

    playerObj.currentFrame = playerObj.currentFrame % playerObj.totalFrames; //Work out the current frame of the animation. Remember that 0 counts as the first image of the animation.
    playerObj.srcX = playerObj.currentFrame * playerObj.frameWidth; //Src position is updated to show the new sprite image
    //bricksObj.currentFrame = bricksObj.currentFrame % bricksObj.totalFrames; //Work out the current frame of the animation. Remember that 0 counts as the first image of the animation.
    //bricksObj.srcX = bricksObj.currentFrame * bricksObj.spriteWidth; //Src position is updated to show the new sprite image

    //image, srcX, srcY, srcWidth, srcHeight, destX, destY, destWidth, destHeight
    ctx.save();
    resizeImage();
    ctx.drawImage(playerSpriteSheet, playerObj.srcX, playerObj.srcY, playerObj.frameWidth, playerObj.frameHeight, -150, -175, playerObj.frameWidth, playerObj.frameHeight);
    ctx.drawImage(bricksSpriteSheet, bricksObj.srcX, bricksObj.srcY, bricksObj.frameWidth, bricksObj.frameHeight, -160, -55, bricksObj.frameWidth, bricksObj.frameHeight);
    ctx.drawImage(bricksSpriteSheet, bricksObj.srcX, bricksObj.srcY, bricksObj.frameWidth, bricksObj.frameHeight, 100, -55, bricksObj.frameWidth, bricksObj.frameHeight);
    ctx.drawImage(boxSpriteSheet, boxObj.srcX, boxObj.srcY, boxObj.frameWidth, boxObj.frameHeight, -4, 80, boxObj.frameWidth, boxObj.frameHeight);
    ctx.drawImage(boxSpriteSheet, boxObj.srcX, boxObj.srcY, boxObj.frameWidth, boxObj.frameHeight, 65, 80, boxObj.frameWidth, boxObj.frameHeight);
    ctx.drawImage(boxSpriteSheet, boxObj.srcX, boxObj.srcY, boxObj.frameWidth, boxObj.frameHeight, -70, 80, boxObj.frameWidth, boxObj.frameHeight);
    ctx.drawImage(boxSpriteSheet, boxObj.srcX, boxObj.srcY, boxObj.frameWidth, boxObj.frameHeight, -140, 80, boxObj.frameWidth, boxObj.frameHeight);
    ctx.drawImage(box2SpriteSheet, box2Obj.srcX, box2Obj.srcY, box2Obj.frameWidth, box2Obj.frameHeight, 10, -55, box2Obj.frameWidth, box2Obj.frameHeight);
    ctx.restore();

    playerObj.framesDrawn++;
    if(playerObj.framesDrawn >= 10){
        playerObj.currentFrame++;
        playerObj.framesDrawn = 0;
    }
    //bricksObj.framesDrawn++;
    //if(bricksObj.framesDrawn >= 2){
        //bricksObj.currentFrame++;
        //bricksObj.framesDrawn = 0;
    //}
}

function resizeImage() {
    let scaleFactor = 1;
    let midXPos = innerWidth / 2 - (playerObj.frameWidth * scaleFactor) / 2;
    let midYPos = innerHeight / 2 - (playerObj.frameHeight * scaleFactor) / 2;
    ctx.translate(midXPos, midYPos);
    ctx.scale(scaleFactor, scaleFactor);

}

addEventListener("keydown", e => {
    if(e.key === "ArrowLeft"){
        playerObj.srcY = 1 * playerObj.frameHeight;
    }
});

addEventListener("keydown", e => {
    if(e.key === "ArrowRight"){
        playerObj.srcY = 0 * playerObj.frameHeight;
    }
});

//So the canvas can't be rendered before the image
let numOfImages = 1;
function loadImages() {
    if(--numOfImages < 0) return;
    animate();
}
