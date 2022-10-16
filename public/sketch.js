let currentWindow = 0;
let currentPage = 0;
let img;
let lightFont, bookFont, mediumFont, boldFont, extraBoldFont, blackFont;

let selectedCategory;
let currentHonorees = []
let currentName
let currentAge
let percent
let loadAmount = 0

let tombstoneMainBox = document.getElementById("hold-box-1")
let tombstoneOverlay = document.getElementById("second-image");
let tombstoneOverlayBox = document.getElementById("hold-box-2");

function preload() {
    lightFont = loadFont("Light.ttf");
    bookFont = loadFont("Book.ttf");
    mediumFont = loadFont("Medium.ttf");
    boldFont = loadFont("Bold.ttf");
    extraBoldFont = loadFont("ExtraBold.ttf");
    blackFont = loadFont("Black.ttf");
    img = loadImage('ColorTombstone.png');
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    textAlign(CENTER, CENTER);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(150);
    if (currentWindow === 0) {
        drawHomePage();
    } else {
        categorySelected();
    }
}

function drawHomePage() {
    fill(255);
    textFont(blackFont);
    textSize(height / 13);
    text("30 UNDER 30", width / 2, height / 10);
    textSize(height / 30);
    text("(Click on a category to see the honorees)", width / 2, height / 6);
    let startHeight = height / 4;
    for (var i = 0; i < categories.length; i++) {
        textFont(boldFont);
        textSize(height / 24);
        fill(categories[i].color);
        text(categories[i].name, width / 2, startHeight);
        startHeight += height / 13;
    }
}

function categorySelected() {
    push();
    fill(selectedCategory.color);
    textAlign(LEFT, CENTER);
    textFont(boldFont);
    textSize(height / 40);
    text("Go back", width / 18, height / 18);
    pop();

    push();
    fill(selectedCategory.color);
    textAlign(LEFT, CENTER);
    textFont(boldFont);
    textSize(height / 15);
    text(selectedCategory.name, width / 18, height / 8);
    pop();

    push();
    fill(selectedCategory.color);
    textAlign(LEFT, CENTER);
    textFont(boldFont);
    textSize(height / 35);
    text("(Select an honoree to learn more)", width / 18, height / 5.4);
    pop();

    let startHeight = height / 4.2;

    currentHonorees = []

    for (var i = currentPage * 10; i < (currentPage + 1) * 10; i++) {
        let currentHonoree = selectedCategory.honorees[i]
        currentHonorees.push(currentHonoree)
        push();
        fill(255);
        textAlign(LEFT, CENTER);
        textFont(boldFont);
        textSize(height / 25);
        text(currentHonoree.name, width / 18, startHeight);
        pop();
        startHeight += height / 18
    }

    if (currentPage > 0) {
        push();
        fill(selectedCategory.color);
        textAlign(LEFT, CENTER);
        textFont(boldFont);
        textSize(height / 35);
        text("Prev", width / 18, height - height / 5.4);
        pop();
    }

    if (currentPage < 2) {
        push();
        fill(selectedCategory.color);
        textAlign(LEFT, CENTER);
        textFont(boldFont);
        textSize(height / 35);
        text("Next", width / 4, height - height / 5.4);
        pop();
    }

    if (percent) {
        setTombstone()
    }
}

function setTombstone() {
    let toShow = 480 * loadAmount
    let toHide = 480 - toShow

    tombstoneOverlayBox.style.height = toShow + "px"
    tombstoneOverlayBox.style.marginTop = toHide + "px"
    tombstoneOverlay.style.marginTop = -toHide + "px"

    if (loadAmount < percent) {
        loadAmount = loadAmount + 0.005
    } else {
        loadAmount = percent
    }

    let remaining = 30 - currentAge
    let year = "years."

    if (remaining === 1) {
        year = "year."
    }

    push();
    fill(255);
    textAlign(CENTER, CENTER);
    textFont(boldFont);
    textSize(height / 25);
    text(currentName + "'s relevance will end in " + remaining + " " + year, 1000, height - height / 5.2);
    pop();
}

function mousePressed() {
    if (currentWindow === 0) {
        if (
            mouseY > height / 4 - height / 48 &&
            mouseY < height / 4 + height / 48
        ) {
            currentWindow = 1;
            selectedCategory = categories[0];
            console.log("Music");
        } else if (
            mouseY > height / 4 + height / 13 - height / 48 &&
            mouseY < height / 4 + height / 13 + height / 48
        ) {
            currentWindow = 1;
            selectedCategory = categories[1];
            console.log("Marketing & Advertising");
        } else if (
            mouseY > height / 4 + (height / 13) * 2 - height / 48 &&
            mouseY < height / 4 + (height / 13) * 2 + height / 48
        ) {
            currentWindow = 1;
            selectedCategory = categories[2];
            console.log("Retail & Ecommerce");
        } else if (
            mouseY > height / 4 + (height / 13) * 3 - height / 48 &&
            mouseY < height / 4 + (height / 13) * 3 + height / 48
        ) {
            currentWindow = 1;
            selectedCategory = categories[3];
            console.log("Science");
        } else if (
            mouseY > height / 4 + (height / 13) * 4 - height / 48 &&
            mouseY < height / 4 + (height / 13) * 4 + height / 48
        ) {
            currentWindow = 1;
            selectedCategory = categories[4];
            console.log("Consumer Technology");
        }
    } else {
        if (
            mouseY > height / 18 - height / 20 &&
            mouseY < height / 18 + height / 20
        ) {
            tombstoneMainBox.style.display = "none";
            percent = null;
            currentAge = null;
            currentName = null;
            loadAmount = 0;
            currentPage = 0;
            currentWindow = 0;
            console.log("Go back")
        } else if (
            mouseY > height / 4.2 - height / 25 &&
            mouseY < height / 4.2 + height / 25
        ) {
            console.log("Index: 0")
            console.log(currentHonorees[0])
            currentName = currentHonorees[0].name;
            currentAge = currentHonorees[0].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + height / 18 - height / 25 &&
            mouseY < height / 4.2 + height / 18 + height / 25
        ) {
            console.log("Index: 1")
            console.log(currentHonorees[1])
            currentName = currentHonorees[1].name;
            currentAge = currentHonorees[1].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 2 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 2 * height / 18 + height / 25
        ) {
            console.log("Index: 2")
            console.log(currentHonorees[2])
            currentName = currentHonorees[2].name;
            currentAge = currentHonorees[2].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 3 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 3 * height / 18 + height / 25
        ) {
            console.log("Index: 3")
            console.log(currentHonorees[3])
            currentName = currentHonorees[3].name;
            currentAge = currentHonorees[3].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 4 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 4 * height / 18 + height / 25
        ) {
            console.log("Index: 4")
            console.log(currentHonorees[4])
            currentName = currentHonorees[4].name;
            currentAge = currentHonorees[4].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 5 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 5 * height / 18 + height / 25
        ) {
            console.log("Index: 5")
            console.log(currentHonorees[5])
            currentName = currentHonorees[5].name;
            currentAge = currentHonorees[5].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 6 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 6 * height / 18 + height / 25
        ) {
            console.log("Index: 6")
            console.log(currentHonorees[6])
            currentName = currentHonorees[6].name;
            currentAge = currentHonorees[6].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 7 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 7 * height / 18 + height / 25
        ) {
            console.log("Index: 7")
            console.log(currentHonorees[7])
            currentName = currentHonorees[7].name;
            currentAge = currentHonorees[7].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 8 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 8 * height / 18 + height / 25
        ) {
            console.log("Index: 8")
            console.log(currentHonorees[8])
            currentName = currentHonorees[8].name;
            currentAge = currentHonorees[8].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height / 4.2 + 9 * height / 18 - height / 25 &&
            mouseY < height / 4.2 + 9 * height / 18 + height / 25
        ) {
            console.log("Index: 9")
            console.log(currentHonorees[9])
            currentName = currentHonorees[9].name;
            currentAge = currentHonorees[9].age;
            percent = currentAge / 30;
            loadAmount = 0;
            tombstoneMainBox.style.display = "block";
        } else if (
            mouseY > height - height / 5.4 - height / 35 &&
            mouseY < height - height / 5.4 + height / 35 &&
            mouseX > width / 18 &&
            mouseX < width / 4 &&
            currentPage > 0
        ) {
            console.log("Previous 10 names.")
            currentPage--
        } else if (
            mouseY > height - height / 5.4 - height / 35 &&
            mouseY < height - height / 5.4 + height / 35 &&
            mouseX > width / 4 &&
            currentPage < 2
        ) {
            console.log("Next 10 names.")
            currentPage++
        }
    }
}
 