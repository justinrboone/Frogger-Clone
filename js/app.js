
// Enemy class, which takes two parameters indicating position on screen
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    // Set speed for enemy randomly 
    this.speed = 100 + Math.floor(Math.random() * 250);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Create left and right boundary for enemies.
    if (this.x > 700) {
        this.x = -100;
    }

    //Check for collision with player and, if true, reset player to 
    //original position.
    if (this.y == player.y && (this.x > player.x - 20 && 
        this.x < player.x + 20)) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Player class, which takes two parameters indicating position on screen
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

    //Store original x and y values for Player.
    this.originalX = x;
    this.originalY = y;
};

Player.prototype.update = function() {
    this.x = this.x;
    this.y = this.y;

    //Set left boundary for player.
    if (this.x < 0) {
        this.x = 0;
    }

    //Set right boundary for player.
    if (this.x > 403) {
        this.x = 403;
    }

    //Set upper (water) boundary for player. crossing this boundary resets 
    //the game.
    if (this.y < 60) {
        this.reset();
    }

    //Set lower boundary for player.
    if (this.y > 380) {
        this.y = 380;
    }
};

//Draw player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move player based on directional key pressed.
Player.prototype.handleInput = function(dir) {
    switch (dir) {
        case 'left':
            this.x = this.x - 101;
            break;
        case 'up':
            this.y = this.y - 80;
            break;
        case 'right':
            this.x = this.x + 101;
            break;
        case 'down':
            this.y = this.y + 80;
            break;
    }
};

// Reset player to it's original position.
Player.prototype.reset = function() {
    this.x = this.originalX;
    this.y = this.originalY;
};

// Now instantiate your objects.
var enemy1 = new Enemy(-100, 60);
var enemy2 = new Enemy(-100, 140);
var enemy3 = new Enemy(-100, 220);

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(202, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});