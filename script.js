var socket = io()
var side = 25


function setup() {
    createCanvas(30 * side, 30 * side)

}


function changeColor(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            var tbot = side - side * 0.1
            textSize(tbot)

            if (matrix[y][x] == 1) {
                fill("green")
                rect(x * side, y * side, side, side)
                text("🌿", x * side, y * side + tbot)
            }
            else if (matrix[y][x] == 2) {
                fill("white")
                rect(x * side, y * side, side, side)
                text("🐼", x * side, y * side + tbot)
            }
            else if (matrix[y][x] == 3) {
                fill("red")
                rect(x * side, y * side, side, side)
                text("🙎🏻‍♂️", x * side, y * side + tbot)
            }
            else if (matrix[y][x] == 4) {
                fill("aqua")
                rect(x * side, y * side, side, side)
                text("💦", x * side, y * side + tbot)
            }
            else if (matrix[y][x] == 5) {
                fill("orange")
                rect(x * side, y * side, side, side)
                text("🌞", x * side, y * side + tbot)
            }
            else if (matrix[y][x] == 6) {
                fill("yellow")
                rect(x * side, y * side, side, side)
                text("🌼", x * side, y * side + tbot)
            }
            else {
                fill("brown")
                rect(x * side, y * side, side, side)
            }
        }
    }
}
socket.on('send matrix',changeColor)

function AddGrass(){
    socket.emit('addGrass');
}

function AddGrassEater(){
    socket.emit('addGrassEater');
}

function Kill(){
    socket.emit('killall');
}

function AddPredator(){
    socket.emit('addPredator');
}

function AddSun(){
    socket.emit('addSun');
}

function AddWater(){
    socket.emit('addWater');
}

