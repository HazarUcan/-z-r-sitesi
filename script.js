var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// Load the image
var img = new Image();
img.src = "your-image-path.jpg";  // Replace with the actual image URL

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars with random opacity values
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

// Function to draw the image under the text
function drawImage() {
    var imgWidth = canvas.width * 0.6; // Scale image to fit
    var imgHeight = imgWidth * (img.height / img.width); // Maintain aspect ratio
    var imgX = (canvas.width - imgWidth) / 2;
    var imgY = canvas.height / 2 + 30;  // Adjust placement to be under text
    context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    // Glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;

    if(frameNumber < 250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Her gün seninle birlikte olduğum için ne kadar şanslı olduğumu düşünüyorum", canvas.width/2, canvas.height/2);
        drawImage(); // Draw image under text
        opacity += 0.01;
    }
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Her gün seninle birlikte olduğum için ne kadar şanslı olduğumu düşünüyorum", canvas.width/2, canvas.height/2);
        drawImage();
        opacity -= 0.01;
    }

    if(frameNumber == 500) opacity = 0;

    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Yaşayabileceğim onca hayattan, Yaşar hazırlığında tanışmak", canvas.width/2, canvas.height/2);
        drawImage();
        opacity += 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Yaşayabileceğim onca hayattan, Yaşar hazırlığında tanışmak", canvas.width/2, canvas.height/2);
        drawImage();
        opacity -= 0.01;
    }

    if(frameNumber == 1000) opacity = 0;

    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Arada çok salak bir adam olabiliyorum", canvas.width/2, canvas.height/2);
        drawImage();
        opacity += 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Arada çok salak bir adam olabiliyorum", canvas.width/2, canvas.height/2);
        drawImage();
        opacity -= 0.01;
    }

    if(frameNumber == 1500) opacity = 0;

    if(frameNumber > 1500 && frameNumber < 1750){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Bazen konuşurken çok sinir bozucu da olabiliyoruz", canvas.width/2, canvas.height/2);
        drawImage();
        opacity += 0.01;
    }
    if(frameNumber >= 1750 && frameNumber < 2000){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Bazen konuşurken çok sinir bozucu da olabiliyoruz", canvas.width/2, canvas.height/2);
        drawImage();
        opacity -= 0.01;
    }

    if(frameNumber == 2000) opacity = 0;

    if(frameNumber > 2000 && frameNumber < 2250){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Ama ağzımdan çıkanlar yüzünden, En son kaybetmek isticeğim insan sensin", canvas.width/2, canvas.height/2);
        drawImage();
        opacity += 0.01;
    }
    if(frameNumber >= 2250 && frameNumber < 2500){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Ama ağzımdan çıkanlar yüzünden, En son kaybetmek isticeğim insan sensin", canvas.width/2, canvas.height/2);
        drawImage();
        opacity -= 0.01;
    }

    if(frameNumber == 2500) opacity = 0;

    if(frameNumber > 2500 && frameNumber < 99999){
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Umarım ömrüm boyunca, Geceleri sinirimi bozmaya devam edersin", canvas.width/2, canvas.height/2);
        drawImage();
        opacity += 0.01;
    }

    // Reset shadow effect
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.requestAnimationFrame(draw);
