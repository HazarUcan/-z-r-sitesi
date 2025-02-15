var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// Image URLs for each text
var images = [
    "https://raw.githubusercontent.com/HazarUcan/-z-r-sitesi/main/5DC788E6-D94A-4527-B073-940E41C483F0.jpg",
    "https://raw.githubusercontent.com/HazarUcan/-z-r-sitesi/main/5175D03F-5744-4374-BBEC-8161B2EF1DF1.jpg",
    "https://raw.githubusercontent.com/HazarUcan/-z-r-sitesi/main/IMG_8967.jpeg",
    "https://raw.githubusercontent.com/HazarUcan/-z-r-sitesi/main/IMG_9401.PNG",
    "https://raw.githubusercontent.com/HazarUcan/-z-r-sitesi/main/fb072237-7cc3-4f53-8450-95f628973749.jpg",
    "https://raw.githubusercontent.com/HazarUcan/-z-r-sitesi/main/IMG_0936.jpeg"
];

// Text for each transition
var texts = [
    "Her gün seninle birlikte olduğum için ne kadar şanslı olduğumu düşünüyorum",
    "Yaşayabileceğim onca hayattan, Yaşar hazırlığında tanışmak",
    "Arada çok salak bir adam olabiliyorum",
    "Bazen konuşurken çok sinir bozucu da olabiliyoruz",
    "Ama ağzımdan çıkanlar yüzünden, En son kaybetmek isteyeceğim insan sensin",
    "Umarım ömrüm boyunca, Geceleri sinirimi bozmaya devam edersin"
];

// Initialize stars
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.width;
    var y = Math.random() * canvas.height;
    var radius = Math.random() * 1.2;
    var hue = colorrange[Math.floor(Math.random() * colorrange.length)];
    var sat = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var textIndex = 0;
var fadeIn = true;

// Function to draw an image under the text
function drawImage(index) {
    var img = new Image();
    img.src = images[index]; // Load the correct image

    img.onload = function () {
        var imgWidth = canvas.width * 0.6; // Scale the image
        var imgHeight = imgWidth * (img.height / img.width); // Maintain aspect ratio
        var imgX = (canvas.width - imgWidth) / 2;
        var imgY = canvas.height / 2 + 50;  // Position under text
        context.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    };
}

// Function to update stars (twinkling effect)
function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

// Function to draw stars
function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

// Function to display text with fade-in and fade-out effect
function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;
    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    // Glow effect
    context.shadowColor = "rgba(255, 255, 255, 1)";
    context.shadowBlur = 10;

    // Fade-in and fade-out timing
    if (fadeIn) {
        opacity += 0.01; // Increase opacity
        if (opacity >= 1) {
            fadeIn = false;
        }
    } else {
        opacity -= 0.01; // Decrease opacity
        if (opacity <= 0) {
            fadeIn = true;
            textIndex = (textIndex + 1) % texts.length; // Move to the next text
        }
    }

    context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    context.fillText(texts[textIndex], canvas.width / 2, canvas.height / 2 - 50);
    drawImage(textIndex);

    // Reset shadow effect
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
}

// Function to draw everything in a loop
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    drawStars();
    updateStars();
    drawText();

    frameNumber++;
    window.requestAnimationFrame(draw);
}

// Resize canvas when the window resizes
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.requestAnimationFrame(draw);
