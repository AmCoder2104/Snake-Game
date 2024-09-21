// Audio files for game sounds  
const gameover = new Audio("music/gameover.mp3"); // Sound for game over  
const move = new Audio("music/move.mp3"); // Sound for moving the snake  
const Foood = new Audio("music/food.mp3"); // Sound for eating food  
const music = new Audio("music/music.mp3"); // Background music  

// Initialize high score and level from local storage or set defaults  
let understanding = parseInt(localStorage.getItem("HighScore")) || 0; // High score  
let understanding2 = localStorage.getItem("lvl") || "Beginner"; // Current level  

// Default direction for snake movement  
let inputDirection = { x: 0, y: 0 };  

// Initial snake position and food  
let snakeArr = [  
  { x: 13, y: 15 } // Starting position of the snake  
];  
let food = { x: 6, y: 7 }; // Initial position of the food  
let score = 0; // Player's score  

let speed = 6; // Speed of the game  
let render = 0; // Time tracking for rendering  

// Main game loop function  
function main(ctime) {  
  window.requestAnimationFrame(main); // Request the next frame  
  if ((ctime - render) / 1000 < 1 / speed) { // Control the speed of the game  
    return; // Exit if it's not time to render  
  }  
  render = ctime; // Update render time  
  gamerun(); // Call the function to run the game logic  
}  

// Function to check for collisions  
function isCollide(snake) {  
  // Check if the snake collides with itself  
  for (let i = 1; i < snakeArr.length; i++) {  
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {  
      return true; // Collision detected  
    }  
  }  
  // Check if the snake collides with the wall  
  if (snake[0].x >= 22 || snake[0].x <= 0 || snake[0].y >= 22 || snake[0].y <= 0) {  
    return true; // Collision detected  
  }  
  return false; // No collision  
}  

// Function to handle game logic  
function gamerun() {  
  // Check for collisions  
  if (isCollide(snakeArr)) {  
    gameover.play(); // Play game over sound  
    music.pause(); // Stop background music  
    inputDirection = { x: 0, y: 0 }; // Reset direction  
    alert("Game over!! Press any key to start over!"); // Alert player  

    // Reset snake and score  
    snakeArr = [  
      { x: 13, y: 15 } // Reset snake position  
    ];  
    score = 0; // Reset score  
    understanding2 = "Beginner"; // Reset level  
    localStorage.setItem("lvl", understanding2); // Update local storage  
    document.querySelector(".lvl").innerHTML = "Level Achieved: " + understanding2; // Update level display  
  }  
  
  // Check if the snake has eaten the food  
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {  
    Foood.play(); // Play food sound  
    score += 1; // Increment score  

    // Update score display  
    sd = document.querySelector(".scoredomain");  
    sd.innerHTML = "Score: " + score;  
    
    // Grow the snake  
    snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y });  

    // Randomly place food on the grid  
    let a = 2;  
    let b = 16;  
    food = { x: Math.round(a + Math.random() * (b - a)), y: Math.round(a + Math.random() * (b - a)) };  
  }  

  // Move the snake  
  for (let i = snakeArr.length - 2; i >= 0; i--) {  
    snakeArr[i + 1] = { ...snakeArr[i] }; // Shift the body segments  
  }  
  
  // Update the head position  
  snakeArr[0].x += inputDirection.x;  
  snakeArr[0].y += inputDirection.y;  

  // Update high score and level  
  displayHighScore();  
  lvl();  

  // Display the snake on the grid  
  area = document.querySelector('.area');  
  area.innerHTML = ""; // Clear previous snake  
  snakeArr.forEach((e, index) => {  
    div = document.createElement('div'); // Create a new div for each segment  

    // Add class for head and body  
    if (index === 0) {  
      div.classList.add('head'); // Head of the snake  
    } else {  
      div.classList.add('grow'); // Body of the snake  
    }  
    
    // Set position of the segment  
    div.style.gridRowStart = e.y;  
    div.style.gridColumnStart = e.x;  
    area.appendChild(div); // Add segment to the grid  
  });  

  // Display the food on the grid  
  meal = document.createElement('div');  
  meal.classList.add('food'); // Class for food  
  meal.style.gridRowStart = food.y; // Set food position  
  meal.style.gridColumnStart = food.x; // Set food position  
  area.appendChild(meal); // Add food to the grid  
}  

// Function to display high score  
function displayHighScore() {  
  const call = document.querySelector(".highScore");  
  if(score > understanding) { // Check if current score is higher than high score  
    understanding = score; // Update high score  
    localStorage.setItem("HighScore", understanding); // Save high score to local storage  
  }  
  call.innerHTML = " Hiscore :" + understanding; // Display high score  
}  

// Function to update level based on score  
function lvl() {  
  const call2 = document.querySelector(".lvl");  
  // Check score thresholds for level upgrades  
  if (score >= 5 && understanding2 != "Bronzelvl") {  
    understanding2 = "Bronzelvl"; // Update level  
    localStorage.setItem("lvl", understanding2); // Save level to local storage  
  }  
  
  if (score >= 10 && understanding2 != "Silverlvl") {  
    understanding2 = "Silverlvl"; // Update level  
    localStorage.setItem("lvl", understanding2); // Save level to local storage  
  }  

  if (score >= 15 && understanding2 != "Goldlvl") {  
    understanding2 = "Goldlvl"; // Update level  
    localStorage.setItem("lvl", understanding2); // Save level to local storage  
  }  
  
  if (score >= 20 && understanding2 != "Platinumlvl") {  
    understanding2 = "Platinumlvl"; // Update level  
    localStorage.setItem("lvl", understanding2); // Save level to local storage  
  }  
  
  if (score >= 25 && understanding2 != "Diamondlvl") {  
    understanding2 = "Diamondlvl"; // Update level  
    localStorage.setItem("lvl", understanding2); // Save level to local storage  
  }  
  
  if (score >= 30 && understanding2 != "Crownlvl") {  
    understanding2 = "Crownlvl"; // Update level  
    localStorage.setItem("lvl", understanding2); // Save level to local storage  
  }  
  
  call2.innerHTML = "Level Achieved: " + understanding2; // Display current level  
} 
function updateScore(newScore) {
  const scoreElement = document.querySelector('.scoredomain');
  scoreElement.classList.add('pulse');  // Add pulse animation
  scoreElement.textContent = `Score: ${newScore}`;

  // Remove pulse after animation ends
  setTimeout(() => {
      scoreElement.classList.remove('pulse');
  }, 1000);
}

function updateLevel(lvl) {
  const levelElement = document.querySelector('.lvl');
  levelElement.classList.add('fade-in');  // Fade-in effect
  levelElement.textContent = `Level Achieved: ${lvl}`;
}

// Example use: Trigger update when needed
updateScore(score);
updateLevel('Intermediate');


// Start the game loop  
window.requestAnimationFrame(main);  

// Event listener for keydown events  
window.addEventListener("keydown", (e) => {  
  music.play(); // Play background music  
  move.play(); // Play move sound  
  inputDirection = { x: 0, y: 1 }; // Default direction is down  
  
  // Change direction based on key pressed  
  switch (e.key) {  
    case "ArrowUp":  
      console.log("ArrowUp"); // Log direction  
      inputDirection.x = 0; // No horizontal movement  
      inputDirection.y = -1; // Move up  
      break;  

    case "ArrowDown":  
      console.log("ArrowDown"); // Log direction  
      inputDirection.x = 0; // No horizontal movement  
      inputDirection.y = 1; // Move down  
      break;  

    case "ArrowLeft":  
      console.log("ArrowLeft"); // Log direction  
      inputDirection.x = -1; // Move left  
      inputDirection.y = 0; // No vertical movement  
      break;  

    case "ArrowRight":  
      console.log("ArrowRight"); // Log direction  
      inputDirection.x = 1; // Move right  
      inputDirection.y = 0; // No vertical movement  
      break;  

    default:  
      break; // Do nothing for other keys  
  }  
});