const container = document.querySelector(".heart-container");

const hearts = ["💗", "💖", "💕", "💘", "💝", "❤️", "💓", "💋"];

function createHeart() {
    const heart = document.createElement("span");

    heart.classList.add("heart");
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    heart.style.animationDuration = Math.random() * 4 + 4 + "s";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8500);
}

// Initial burst of falling hearts
for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 100);
}

// Continuous heart rain
setInterval(createHeart, 400);



const correctPasscode = "2511";

let enteredPin = "";

const pinDots = document.querySelectorAll("#pinDots span");
const pinMessage = document.getElementById("pinMessage");

const keys = document.querySelectorAll("[data-number]");
const deletePin = document.getElementById("deletePin");
const submitPin = document.getElementById("submitPin");

function updateDots() {
    pinDots.forEach((dot, index) => {
        dot.classList.toggle("filled", index < enteredPin.length);
    });
}

keys.forEach(key => {
    key.addEventListener("click", () => {

        if (enteredPin.length < 4) {
            enteredPin += key.dataset.number;
            updateDots();
        }

    });
});

deletePin.addEventListener("click", () => {
    enteredPin = enteredPin.slice(0, -1);
    updateDots();
});

submitPin.addEventListener("click", () => {

    if (enteredPin.length !== 4) {
        pinMessage.textContent = "Enter all 4 digit💗";
        return;
    }

    if (enteredPin === correctPasscode) {

        pinMessage.textContent = "Correct, muuahh to my baby 💗";

        document.getElementById("lockScreen").style.display = "none";

        document.getElementById("birthdayContent")
            .classList.remove("hidden");

        heartBurst();

    } else {

        pinMessage.textContent = "ohhh 🥺, litttle wronggg.";

        enteredPin = "";
        updateDots();

    }

});
const noBtn = document.querySelector(".no-btn");

noBtn.addEventListener("mouseenter", moveButton);

noBtn.addEventListener("click", moveButton);

function moveButton() {

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}
// BALLOON INTERACTION

const balloons = document.querySelectorAll(".balloon");

const balloonMessage = document.getElementById("balloonMessage");

const nextScreen = document.getElementById("nextScreen");

let poppedCount = 0;

balloons.forEach((balloon) => {

    balloon.addEventListener("click", () => {

        if (balloon.classList.contains("popped")) return;

        balloon.classList.add("popped");

        poppedCount++;

        balloonMessage.textContent =
            `${poppedCount} out of 4 balloons popped! 💗`;

        if (poppedCount === 4) {

            balloonMessage.textContent =
                "Yayyy! You popped all 4 balloons 🎉";

            nextScreen.classList.remove("hidden");

        }

    });

});

// BALLOON SURPRISE DATA

const balloonData = [
    {
        color: "#ff8db3",
        message: "happyyyy birthday darlinggg  . 💗"
    },
    {
        color: "#82b9f5",
        message: "you are sooo kinddd and sweetest. ✨"
    },
    {
        color: "#8dd5ad",
        message: "You deserve all the happiness, love and cuddles. 🌷"
    },
    {
        color: "#b99be8",
        message: "i wishh you get all hapiness , muaah ❤️"
    }
];

let currentBalloon = 0;
let isPopping = false;

const balloonStage = document.getElementById("balloonStage");
const activeBalloon = document.getElementById("activeBalloon");
const balloonsMessage = document.getElementById("balloonMessage");
const messageBox = document.getElementById("messageBox");
const balloonProgress = document.getElementById("balloonProgress");

const nextBalloonBtn = document.getElementById("nextBalloonBtn");


// DISPLAY CURRENT BALLOON

function showBalloon() {

    const data = balloonData[currentBalloon];

    activeBalloon.style.display = "block";
    activeBalloon.classList.remove("popping");

    activeBalloon.style.setProperty(
        "--balloon-color",
        data.color
    );

    messageBox.classList.remove("show");

    balloonMessage.textContent = "";

    balloonProgress.textContent =
        `0${currentBalloon + 1} / 04`;

    isPopping = false;
}


// CREATE CONFETTI

function createConfetti() {

    const colors = [
        "#ff5c96",
        "#ffc857",
        "#55aaff",
        "#65c98b",
        "#b99be8",
        "#ff8066"
    ];

    const balloonRect = activeBalloon.getBoundingClientRect();
    const stageRect = balloonStage.getBoundingClientRect();

    const centerX =
        balloonRect.left + balloonRect.width / 2 - stageRect.left;

    const centerY =
        balloonRect.top + balloonRect.height / 2 - stageRect.top;

    for (let i = 0; i < 45; i++) {

        const particle = document.createElement("span");

        particle.classList.add("confetti");

        particle.style.left = centerX + "px";
        particle.style.top = centerY + "px";

        particle.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.borderRadius =
            Math.random() > 0.5 ? "50%" : "2px";

        const angle = Math.random() * Math.PI * 2;
        const distance = 70 + Math.random() * 120;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);

        particle.style.setProperty(
            "--rotation",
            `${Math.random() * 720}deg`
        );

        balloonStage.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1100);
    }
}


// POP BALLOON

activeBalloon.addEventListener("click", () => {

    if (isPopping) return;

    isPopping = true;

    createConfetti();

    activeBalloon.classList.add("popping");

    setTimeout(() => {

        activeBalloon.style.display = "none";

        // SHOW MESSAGE ONLY AFTER POPPING

        balloonMessage.textContent =
            balloonData[currentBalloon].message;

        messageBox.classList.add("show");

    }, 350);

});


// NEXT BALLOON

nextBalloonBtn.addEventListener("click", () => {

    currentBalloon++;

    if (currentBalloon < balloonData.length) {

        showBalloon();

    } else {

        messageBox.classList.remove("show");

        balloonProgress.textContent = "04 / 04 COMPLETE";

        nextScreen.classList.remove("hidden");

    }

});



(() => {
    const balloonScreen = document.getElementById("balloonScreen");
    const nextScreen = document.getElementById("nextScreen");

    const introScreen = document.getElementById("gameIntroScreen");
    const gameScreen = document.getElementById("flowerGameScreen");

    const playButton = document.getElementById("playGameBtn");
    const gameArea = document.getElementById("flowerGameArea");
    const basket = document.getElementById("flowerBasket");

    const scoreDisplay = document.getElementById("flowerScore");
    const timerDisplay = document.getElementById("flowerTimer");

    const result = document.getElementById("bouquetResult");
    const resultScore = document.getElementById("bouquetScore");

    const retryButton = document.getElementById("retryFlowerGame");
    const continueButton = document.getElementById("continueFlowerGame");

    // Check that the required HTML exists
    if (
        !nextScreen || !introScreen || !gameScreen ||
        !playButton || !gameArea || !basket
    ) {
        console.error("Flower game: Missing HTML element. Check the game section IDs.");
        return;
    }

    let score = 0;
    let timeLeft = 60;
    let running = false;
    let spawnInterval;
    let timerInterval;
    let animationFrame;
    let flowers = [];

    const flowerTypes = ["🌷", "🌸", "🌼", "🌻", "🌹", "💮"];

    // BALLOONS -> GAME INTRO
    nextScreen.addEventListener("click", () => {
        balloonScreen.classList.add("hidden");
        introScreen.classList.remove("hidden");
    });

    // INTRO -> GAME
    playButton.addEventListener("click", () => {
        introScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        startGame();
    });

    function startGame() {
        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        cancelAnimationFrame(animationFrame);

        flowers.forEach(flower => flower.element.remove());
        flowers = [];

        score = 0;
        timeLeft = 60;
        running = true;

        scoreDisplay.textContent = "0";
        timerDisplay.textContent = "60";
        result.classList.add("hidden");

        basket.style.left = "50%";

        spawnInterval = setInterval(createFlower, 550);

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;

            if (timeLeft <= 0) {
                finishGame();
            }
        }, 1000);

        animationFrame = requestAnimationFrame(updateFlowers);
    }

    // CREATE FALLING FLOWER
    function createFlower() {
        if (!running) return;

        const element = document.createElement("div");
        element.className = "falling-flower";
        element.textContent =
            flowerTypes[Math.floor(Math.random() * flowerTypes.length)];

        const x = Math.random() * (gameArea.clientWidth - 35);

        element.style.transform = `translate(${x}px, -40px)`;
        gameArea.appendChild(element);

        flowers.push({
            element,
            x,
            y: -40,
            speed: 110 + Math.random() * 100
        });
    }

    // MOVE FLOWERS AND CHECK CATCHES
    function updateFlowers() {
        if (!running) return;

        const basketRect = basket.getBoundingClientRect();

        flowers.forEach((flower, index) => {
            flower.y += flower.speed / 60;

            flower.element.style.transform =
                `translate(${flower.x}px, ${flower.y}px)`;

            const rect = flower.element.getBoundingClientRect();

            const caught =
                rect.right > basketRect.left &&
                rect.left < basketRect.right &&
                rect.bottom > basketRect.top + 8 &&
                rect.top < basketRect.bottom;

            if (caught) {
                score++;
                scoreDisplay.textContent = score;
                flower.element.remove();
                flower.remove = true;
            } else if (flower.y > gameArea.clientHeight) {
                flower.element.remove();
                flower.remove = true;
            }
        });

        flowers = flowers.filter(flower => !flower.remove);

        animationFrame = requestAnimationFrame(updateFlowers);
    }

    // MOVE BASKET WITH MOUSE OR FINGER
    function moveBasket(event) {
        if (!running) return;

        const rect = gameArea.getBoundingClientRect();
        const half = basket.offsetWidth / 2;

        const x = Math.max(
            half,
            Math.min(rect.width - half, event.clientX - rect.left)
        );

        basket.style.left = x + "px";
    }

    gameArea.addEventListener("pointermove", moveBasket);

    // FINISH GAME: ALWAYS WIN
    function finishGame() {
        if (!running) return;

        running = false;

        clearInterval(spawnInterval);
        clearInterval(timerInterval);
        cancelAnimationFrame(animationFrame);

        flowers.forEach(flower => flower.element.remove());
        flowers = [];

        resultScore.textContent =
            `You collected ${score} ${score === 1 ? "flower" : "flowers"}! Your bouquet is ready. 💐`;

        result.classList.remove("hidden");
    }

    // RETRY
    retryButton.addEventListener("click", startGame);

    // NEXT SURPRISE
   continueButton.addEventListener("click", () => {
    gameScreen.classList.add("hidden");

    document.getElementById("letterScreen").classList.remove("hidden");
});

})();

// INITIALIZE

showBalloon();
document.querySelector(".yes-btn").addEventListener("click", () => {

    document.querySelector(".birthday-card").classList.add("hidden");

    document.getElementById("balloonScreen")
        .classList.remove("hidden");

});
document.getElementById("replayBirthdayBtn").addEventListener("click", () => {
    window.location.reload();
});
// OPEN FINAL BIRTHDAY SCREEN AFTER THE LETTER

const finalLetterButton = document.getElementById("letterNextBtn");

if (finalLetterButton) {
    finalLetterButton.addEventListener("click", function () {
        document.getElementById("letterScreen").classList.add("hidden");
        document.getElementById("finalScreen").classList.remove("hidden");
    });
} else {
    console.error("letterNextBtn button not found!");
}
document.getElementById("letterNextBtn").addEventListener("click", () => {
    document.getElementById("letterScreen").classList.add("hidden");
    document.getElementById("finalScreen").classList.remove("hidden");
});