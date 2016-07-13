window.onload = init;



/* ------------ BACKGROUND ------------ */
var layer01,
    layer02,
    layer03,
    layer04,
    layer05,
    layerCanvas01,
    layerCanvas02,
    layerCanvas03,
    layerCanvas04,
    layerCanvas05,
    backgroundWidth = 960,
    backgroundHeight = 540;



/* ------------ PLAYER ------------ */
var playerDOM,
    playerCanvas,
    playerWidth = 130,
    playerHeight = 110;



/* ------------ ENEMY ------------ */
var enemyDOM,
    enemyCanvas,
    enemyWidth = 64,
    enemyHeight = 96,
    enemiesNumber = 10;



/* ------------ INFOPANEL ------------ */
var infoPanelDOM,
    infoPanelCanvas;



/* ------------ RESOURSES ------------ */
// Layers
var layerImage01 = new Image(),
    layerImage02 = new Image(),
    layerImage03 = new Image(),
    layerImage04 = new Image(),
    layerImage05 = new Image(),
    layerImage01_copy = new Image(),
    layerImage02_copy = new Image(),
    layerImage03_copy = new Image(),
    layerImage04_copy = new Image(),
    layerImage05_copy = new Image(),
    playerImage = new Image(),
    enemyImage = new Image();

layerImage01.src = "assets/images/backgrounds/forest_day/layer_05.png";
layerImage02.src = "assets/images/backgrounds/forest_day/layer_04.png";
layerImage03.src = "assets/images/backgrounds/forest_day/layer_03.png";
layerImage04.src = "assets/images/backgrounds/forest_day/layer_02.png";
layerImage05.src = "assets/images/backgrounds/forest_day/layer_01.png";
layerImage01_copy.src = "assets/images/backgrounds/forest_day/layer_05.png";
layerImage02_copy.src = "assets/images/backgrounds/forest_day/layer_04.png";
layerImage03_copy.src = "assets/images/backgrounds/forest_day/layer_03.png";
layerImage04_copy.src = "assets/images/backgrounds/forest_day/layer_02.png";
layerImage05_copy.src = "assets/images/backgrounds/forest_day/layer_01.png";

// Characters
playerImage.src = "assets/images/ships/protagonist/protagonist.png";
enemyImage.src = "assets/images/ships/enemies/01_enemy.png";



/* ------------ OTHER ------------ */
var player,
    enemies = [];

var isPlaying,
    health,
    mapX_layer01 = 0,
    mapX_layer02 = 0,
    mapX_layer03 = 0,
    mapX_layer04 = 0,
    mapX_layer05 = 0,
    mapX2_layer01 = backgroundWidth,
    mapX2_layer02 = backgroundWidth,
    mapX2_layer03 = backgroundWidth,
    mapX2_layer04 = backgroundWidth,
    mapX2_layer05 = backgroundWidth;

var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

// Speed
var layerSpeed01 = 1;
var layerSpeed02 = 2;
var layerSpeed03 = 3;
var layerSpeed04 = 4;
var layerSpeed05 = 6;


/* ------------ OBJECTS ------------ */
function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.width = playerWidth;
    this.height = playerHeight;

    this.speed = 5;

    // For keys
    this.isUp;
    this.isDown;
    this.isRight;
    this.isLeft;
}

Player.prototype.draw = function() {
    clearCanvas( playerCanvas );
    playerCanvas.drawImage(playerImage, this.srcX, this.srcY, this.width * 2, this.height * 2, this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function() {
    if ( this.drawX < 0 ) { this.drawX = 0; }
    if ( this.drawX > backgroundWidth - this.width ) { this.drawX = backgroundWidth - this.width; }
    if ( this.drawY < 0 ) { this.drawY = 0; }
    if ( this.drawY > backgroundHeight - this.height ) { this.drawY = backgroundHeight - this.height; }

    for (var i = 0; i < enemies.length; i++) {
        if (this.drawX >= enemies[i].drawX &&
            this.drawY >= enemies[i].drawY &&
            this.drawX <= enemies[i].drawX + enemies[i].width &&
            this.drawY <= enemies[i].drawY + enemies[i].height) {
            --health;
        }
    }

    this.chooseDirection();
};

Player.prototype.chooseDirection = function() {
    if ( this.isUp ) {
        this.drawY -= this.speed;
    }

    if ( this.isDown ) {
        this.drawY += this.speed;
    }

    if ( this.isRight ) {
        this.drawX += this.speed;
    }

    if ( this.isLeft ) {
        this.drawX -= this.speed;
    }

};

function Enemy() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = Math.floor(Math.random() * backgroundWidth) + backgroundWidth;
    this.drawY = Math.floor(Math.random() * backgroundHeight);
    this.width = enemyWidth;
    this.height = enemyHeight / 3;
    this.stepsY = 3;
    this.stepsX = 1;
    this.stepHeight = 32;
    this.currentFrame = 0;

    this.speed = 2;
}

Enemy.prototype.draw = function() {
    enemyCanvas.drawImage(enemyImage, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function() {
    this.drawX -= 10;

    if (this.drawX < 0) {
        this.drawX = Math.floor(Math.random() * 10) + backgroundWidth;
        this.drawY = Math.floor(Math.random() * backgroundHeight);
    }
};



/* ------------ FUNCTIONS ------------ */
function init() {
    layer01 = document.getElementById("layer_01");
    layerCanvas01 = layer01.getContext("2d");
    layer01.width = backgroundWidth;
    layer01.height = backgroundHeight;

    layer02 = document.getElementById("layer_02");
    layerCanvas02 = layer02.getContext("2d");
    layer02.width = backgroundWidth;
    layer02.height = backgroundHeight;

    layer03 = document.getElementById("layer_03");
    layerCanvas03 = layer03.getContext("2d");
    layer03.width = backgroundWidth;
    layer03.height = backgroundHeight;

    layer04 = document.getElementById("layer_04");
    layerCanvas04 = layer04.getContext("2d");
    layer04.width = backgroundWidth;
    layer04.height = backgroundHeight;

    layer05 = document.getElementById("layer_05");
    layerCanvas05 = layer05.getContext("2d");
    layer05.width = backgroundWidth;
    layer05.height = backgroundHeight;

    playerDOM = document.getElementById("player");
    playerCanvas = playerDOM.getContext("2d");
    playerDOM.width = backgroundWidth;
    playerDOM.height = backgroundHeight;

    enemyDOM = document.getElementById("enemy");
    enemyCanvas = enemyDOM.getContext("2d");
    enemyDOM.width = backgroundWidth;
    enemyDOM.height = backgroundHeight;

    infoPanelDOM = document.getElementById("infoPanel");
    infoPanelCanvas = infoPanelDOM.getContext("2d");
    infoPanelDOM.width = backgroundWidth;
    infoPanelDOM.height = backgroundHeight;
    infoPanelCanvas.fillStyle = "#3d3d3d";
    infoPanelCanvas.font = "bold 15pt Audiowide";

    player = new Player();
    createEnemies( enemiesNumber );
    health = 100;

    startLoop();

    document.addEventListener( "keydown", checkKeyState, false );
    document.addEventListener( "keyup", checkKeyState, false );
}

function loop() {
    if ( isPlaying ) {
        draw();
        update();
        requestAnimFrame( loop );
    } else {
    }
}

function startLoop() {
    isPlaying = true;
    loop();
}

function stopLoop() {
    isPlaying = false;
}

function draw() {
    player.draw();

    clearCanvas( enemyCanvas );
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }

}

function update() {
    drawBackground();
    moveBackground();
    updateInfoPanel();
    player.update();

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
}

function createEnemies( number ) {
    for (var i = 0; i < number; i++) {
        enemies[i] = new Enemy();
    }
}

function updateInfoPanel() {
    clearCanvas( infoPanelCanvas );
    infoPanelCanvas.fillText("Artem " + health, 20, 30);
}

function checkKeyState( e ) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode( keyID );

    var upArrow = 38;
    var downArrow = 40;
    var leftArrow = 37;
    var rightArrow = 39;

    // Flag for event's type
    var state = false;

    // Checking the type of the event
    if ( e.type.localeCompare("keydown") ) {
        state = false;
    } else if ( e.type.localeCompare("keyup") ) {
        state = true;
    }

    // Change a direction
    if ( keyChar == "W" || keyID == upArrow ) {
        player.isUp = state;
    }

    if ( keyChar == "S" || keyID == downArrow ) {
        player.isDown = state;
    }

    if ( keyChar == "D" || keyID == rightArrow ) {
        player.isRight = state;
    }

    if ( keyChar == "A" || keyID == leftArrow ) {
        player.isLeft = state;
    }

    e.preventDefault();
}

function clearCanvas( canvas ) {
    canvas.clearRect(0, 0, backgroundWidth, backgroundWidth);
}

function drawBackground() {
    clearCanvas( layerCanvas01 );
    layerCanvas01.drawImage(layerImage01, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX_layer01, 0, backgroundWidth, backgroundHeight);
    layerCanvas01.drawImage(layerImage01_copy, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX2_layer01, 0, backgroundWidth, backgroundHeight);

    /*    clearCanvas( layerCanvas02 );
    layerCanvas02.drawImage(layerImage02, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX_layer02, 0, backgroundWidth, backgroundHeight);
    layerCanvas02.drawImage(layerImage02_copy, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX2_layer02, 0, backgroundWidth, backgroundHeight);*/

    clearCanvas( layerCanvas03 );
    layerCanvas03.drawImage(layerImage03, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX_layer03, 0, backgroundWidth, backgroundHeight);
    layerCanvas03.drawImage(layerImage03_copy, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX2_layer03, 0, backgroundWidth, backgroundHeight);

    /*     clearCanvas( layerCanvas04 );
    layerCanvas04.drawImage(layerImage04, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX_layer04, 0, backgroundWidth, backgroundHeight);
    layerCanvas04.drawImage(layerImage04_copy, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX2_layer04, 0, backgroundWidth, backgroundHeight);*/

    clearCanvas( layerCanvas05 );
    layerCanvas05.drawImage(layerImage05, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX_layer05, 0, backgroundWidth, backgroundHeight);
    layerCanvas05.drawImage(layerImage05_copy, 0, 0, backgroundWidth * 2, backgroundHeight * 2,
                            mapX2_layer05, 0, backgroundWidth, backgroundHeight);
}

function moveBackground() {

    mapX_layer01 -= layerSpeed01;
    mapX_layer02 -= layerSpeed02;
    mapX_layer03 -= layerSpeed03;
    mapX_layer04 -= layerSpeed04;
    mapX_layer05 -= layerSpeed05;
    mapX2_layer01 -= layerSpeed01;
    mapX2_layer02 -= layerSpeed02;
    mapX2_layer03 -= layerSpeed03;
    mapX2_layer04 -= layerSpeed04;
    mapX2_layer05 -= layerSpeed05;

    if (mapX_layer01 + backgroundWidth < 0) { mapX_layer01 = backgroundWidth - 10; }
    if (mapX2_layer01 + backgroundWidth < 0) { mapX2_layer01 = backgroundWidth - 10; }

    if (mapX_layer02 + backgroundWidth < 0) { mapX_layer02 = backgroundWidth - 10; }
    if (mapX2_layer02 + backgroundWidth < 0) { mapX2_layer02 = backgroundWidth - 10; }

    if (mapX_layer03 + backgroundWidth < 0) { mapX_layer03 = backgroundWidth - 10; }
    if (mapX2_layer03 + backgroundWidth < 0) { mapX2_layer03 = backgroundWidth - 10; }

    if (mapX_layer04 + backgroundWidth < 0) { mapX_layer04 = backgroundWidth - 10; }
    if (mapX2_layer04 + backgroundWidth < 0) { mapX2_layer04 = backgroundWidth - 10; }

    if (mapX_layer05 + backgroundWidth < 0) { mapX_layer05 = backgroundWidth - 10; }
    if (mapX2_layer05 + backgroundWidth < 0) { mapX2_layer05 = backgroundWidth - 10; }
}

// Cross-browser solution for events
function addEvent(el, e, func) {
    if (el.addEventListener) {
        el.addEventListener(e, func);
    } else if (el.attachEvent) {
        el.attachEvent("on" + e, func);
    } else {
        el["on" + e] = func;
    }
}