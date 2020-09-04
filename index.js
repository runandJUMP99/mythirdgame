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
            if (count === 7) {
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
            if (count === 7) {
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

function generateObstacle(location, length) {
    const obstacle = document.createElement("div");
    let obstacleDistance = 1500 ;
    let obstacleLength;

    if (!isGameOver) {
        obstacle.classList.add("obstacle");

        if (location === "bottom") {
            obstacle.style.bottom = 0;
        } else {
            obstacle.style.top = 0;
        }

        if (length) {
            obstacle.style.width = length + "px";
            obstacleLength = length;
        }
    }

    obstacle.style.left = obstacleDistance + "px";
    grid.appendChild(obstacle);

    let timerId = setInterval(() => {
        if (obstacleDistance < 0 && obstacleLength > 0) {
            obstacleDistance += 20;
            obstacleLength -= 20;
            obstacle.style.width = obstacleLength + "px";
        }

        if (obstacleDistance > 0 && obstacleDistance < 20 && ((obstacle.style.bottom === "0px" && position <= 60) || (obstacle.style.top === "0px" && position >= 240))) {
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
    //FIRST CHUNK
    generateObstacle("bottom", null);
    setTimeout(() => {
        generateObstacle("bottom", null);

        setTimeout(() => {
            generateObstacle("bottom", null);

            setTimeout(() => {
                generateObstacle("bottom", null);
            }, 1000);
        }, 500);
    }, 1000);

    //SECOND CHUNK
    setTimeout(() => {
        generateObstacle("bottom", 1500);

        setTimeout(() => {
            generateObstacle("top", null);
    
            setTimeout(() => {
                generateObstacle("top", null);
    
                setTimeout(() => {
                    generateObstacle("top", null);
                }, 1000);
            }, 500);
        }, 1000);
    }, 4500);

    //THIRD CHUNK
    setTimeout(() => {
        generateObstacle("top", 250);
        
        setTimeout(() => {
            generateObstacle("bottom", 250);
            
            setTimeout(() => {
                generateObstacle("top", 250);
                
                setTimeout(() => {
                    generateObstacle("bottom", 250);
                    
                    setTimeout(() => {
                        generateObstacle("top", 250);

                        setTimeout(() => {
                            generateObstacle("bottom");

                            setTimeout(() => {
                                generateObstacle("bottom");
                            }, 500);
                        }, 500);
                    }, 750);
                }, 1000);
            }, 1000)
        }, 1000);
    }, 8000)

    //FOURTH CHUNK
    setTimeout(() => {
        generateObstacle("bottom", 700);

        setTimeout(() => {
            generateObstacle("top");

            setTimeout(() => {
                generateObstacle("top");

                setTimeout(() => {
                    generateObstacle("top", 700);

                    setTimeout(() => {
                        generateObstacle("bottom")

                        setTimeout(() => {
                            generateObstacle("bottom");

                            setTimeout(() => {
                                generateObstacle("bottom", 700);

                                setTimeout(() => {
                                    generateObstacle("top");

                                    setTimeout(() => {
                                        generateObstacle("top");

                                        setTimeout(() => {
                                            generateObstacle("top", 700);

                                            setTimeout(() => {
                                                generateObstacle("bottom");

                                                setTimeout(() => {
                                                    generateObstacle("bottom");
                                                }, 500);
                                            }, 500)
                                        }, 600)
                                    }, 500);
                                }, 500);
                            }, 600);
                        }, 500)
                    }, 500);
                }, 600)
            }, 500);
        }, 500);
    }, 14000)
    
    //FIFTH CHUNK
    setTimeout(() => {
        generateObstacle("top", 250);

        setTimeout(() => {
            generateObstacle("bottom");

            setTimeout(() => {
                generateObstacle("bottom", 250);

                setTimeout(() => {
                    generateObstacle("top");

                    setTimeout(() => {
                        generateObstacle("top", 150)

                        setTimeout(() => {
                            generateObstacle("bottom", 150);

                            setTimeout(() => {
                                generateObstacle("top", 150);

                                setTimeout(() => {
                                    generateObstacle("bottom", 150);

                                    setTimeout(() => {
                                        generateObstacle("top", 150);

                                        setTimeout(() => {
                                            generateObstacle("bottom", 150);
                                        }, 500);
                                    }, 500);
                                }, 500);
                            }, 500);
                        }, 500)
                    }, 500);
                }, 500);
            }, 500);
        }, 500)
    }, 20500);
}



updateAlertMessage(); 
updateTime();

levelOne();