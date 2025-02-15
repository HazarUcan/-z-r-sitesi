var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// Image URLs for each text
var images = [
    "https://github.com/HazarUcan/-z-r-sitesi/blob/main/5DC788E6-D94A-4527-B073-940E41C483F0.jpg?raw=true",
    "https://github.com/HazarUcan/-z-r-sitesi/blob/main/5175D03F-5744-4374-BBEC-8161B2EF1DF1.jpg?raw=true",
    "https://github.com/HazarUcan/-z-r-sitesi/blob/main/IMG_8967.jpeg?raw=true",
    "https://github.com/HazarUcan/-z-r-sitesi/blob/main/IMG_9401.PNG?raw=true",
    "https://github.com/HazarUcan/-z-r-sitesi/blob/main/fb072237-7cc3-4f53-8450-95f628973749.jpg?raw=true",
    "https://github.com/HazarUcan/-z-r-sitesi/blob/main/IMG_0936.jpeg?raw=true"
];

// Text for each transition
var texts = [
    "Her gün seninle birlikte olduğum için ne kadar şanslı olduğumu düşünüyorum",
    "Yaşayabileceğim onca hayattan, Yaşar hazırlığında tanışmak",
    "Arada çok salak bir adam olabiliyorum",
    "Bazen konuşurken çok sinir bozucu da olabiliyoruz",
    "Ama ağzımdan çıkanlar yüzünden, En son kaybetmek isticeğim insan sensin",
    "Umarım ömrüm boyunca, Geceleri sinirimi bozmaya devam edersin"
];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
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
var textIndex = 0;

// Function to draw an image under the text
function drawImage(index) {
    var img = new Image();
    img.src = images[index]; // Load the correct image

    img.onload = function() {
        var imgWidth = canvas.width * 0.6; // Scale the image
        var imgHeight = imgWidth * (img.height / img.width); // Maintain aspect ratio
        var imgX = (canvas.width - imgWidth) / 2;
        var imgY = canvas.height / 2 + 50;  // Position under text
        context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    };
}

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

// Function to display text with fade-in and fade-out effect
function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;
    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    
    // Glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;

    let duration = 500; // Time for fade-in & fade-out per text
    let totalFrames = texts.length * duration; // Total animation cycle

    // Calculate which text & image to display
    textIndex = Math.floor(frameNumber / duration) % texts.length;

    let localFrame = frameNumber % duration;
    if (localFrame < duration / 2) {
        opacity += 0.01;
    } else {
        opacity -= 0.01;
    }

    context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
    context.fillText(texts[textIndex], canvas.width / 2, canvas.height / 2);
    drawImage(textIndex);

    // Reset shadow effect
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawStars();
    updateStars();
    drawText();

    frameNumber++;
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.requestAnimationFrame(draw);
