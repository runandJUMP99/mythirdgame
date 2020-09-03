const alertMessage = document.getElementById("alert");
const alertMessages = ["Press Spacebar to Jump", "Use the Up and Down Arrows To Move", "How Long Can You Last?"]
const dino = document.querySelector(".dino");
const grid = document.querySelector(".grid");
const score = document.getElementById("score");
let count = 1;
let isJumping = false;
let isGameOver = false;
let position = 0;
let time = 0;

document.addEventListener("keyup", control);
alertMessage.innerHTML = alertMessages[0];
score.innerHTML = "Score: " + time;

function control(event) {
    if (!isJumping) {
        if (event.key === " ") {
            isJumping = true;
            jump();
        } else if (event.key === "ArrowUp") {
            isJumping = true;
            move("up");
        } else if (event.key === "ArrowDown") {
            isJumping = true;
            move("down");            
        }
    }
}

function jump() {
    let count = 0;
    
    if (position <= 0) {
        const timerId = setInterval(() => {
            if (count === 6) {
                clearInterval(timerId);
    
                const downTimerId = setInterval(() => {
                    if (count === 1) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
    
                    position -= 20;
                    dino.style.bottom = position + "px";
                    count--; 
                }, 25);
            }            
            
        position += 20;
        dino.style.bottom = position + "px";
        count++;
       }, 25);

    } else if (position >= 239) {
        const timerId = setInterval(() => {
            if (count === 6) {
                clearInterval(timerId);
    
                const downTimerId = setInterval(() => {
                    if (count === 1) {
                        clearInterval(downTimerId);
                        isJumping = false;
                    }
    
                    position += 20; 
                    dino.style.bottom = position + "px";
                    count--; 
                }, 25);
            }            
            
            position -= 20;
            dino.style.bottom = position + "px";
            count++;
        }, 25);
    }
}

function move(direction) {
    let height = grid.clientHeight;

    const timerId = setInterval(() => {
        if (height === 90) {
            clearInterval(timerId);
            isJumping = false;
        }
        
        if (direction === "up" && position !== 240) {
            position += 30;
        } else if (direction === "down" && position !== 0) {
            position -= 30;
        }

        dino.style.bottom = position + "px";
        height -= 30;
    }, 20);
}

function updateTime() {
    const newTime = setTimeout(() => {
        if (!isGameOver) {
            score.innerHTML = "Score: " + time;
            time++;

            updateTime();
        } else {
            clearTimeout(newTime);
        }
    }, 1000);
}

function updateAlertMessage() {
    const newAlertMessage = setTimeout(() => {
        if (!isGameOver) {
            alertMessage.innerHTML = alertMessages[count];
            count++;

            if (count >= alertMessages.length) {
                count = 0;
            }

            updateAlertMessage();
        } else {
            clearTimeout(newAlertMessage);
        }
    }, 5000);
}

function generateObstacle(location) {
    const obstacle = document.createElement("div");
    let obstacleDistance = 1000;

    if (!isGameOver) {
        obstacle.classList.add("obstacle");

        if (location === "bottom") {
            obstacle.style.bottom = 0;
        } else {
            obstacle.style.top = 0;
        }
    }

    obstacle.style.left = obstacleDistance + "px";
    grid.appendChild(obstacle);

    let timerId = setInterval(() => {
        if (obstacleDistance > 0 && obstacleDistance < 60 && ((obstacle.style.bottom === "0px" && position <= 60) || (obstacle.style.top === "0px" && position >= 240))) {
            clearInterval(timerId);
            alertMessage.innerHTML = "Game Over";
            isGameOver = true;

            while (grid.firstChild) {
                grid.removeChild(grid.lastChild);
            }
        }

       obstacleDistance -= 10;
       obstacle.style.left = obstacleDistance + "px"; 
    }, 20);
}

function levelOne() {
    generateObstacle("bottom");

    setTimeout(() => {
        generateObstacle("bottom");

        setTimeout(() => {
            generateObstacle("bottom");

            setTimeout(() => {
                generateObstacle("bottom");
            }, 1000);
        }, 500);
    }, 1000);

    setTimeout(() => {
        let count = 0;

        let timerId = setInterval(() => {
            if (count === 200) {
                clearInterval(timerId);
            }

            generateObstacle("bottom");
            count++;
        }, 10);
    }, 4000);
}

updateAlertMessage(); 
updateTime();

levelOne();