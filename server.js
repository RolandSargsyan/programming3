var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, function () {
    console.log("Server is run");
});


function matrixGenerator(matrixSize, grass, grassEater, predator, jur, arev, YGrass) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)

        }
    }


    for (let i = 0; i < grass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1

    }

    for (let i = 0; i < grassEater; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2

    }



    for (let i = 0; i < predator; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3


    }


    for (let i = 0; i < jur; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4

    }


    for (let i = 0; i < arev; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 5

    }

    for (let i = 0; i < YGrass; i++) {

        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 6

    }




    return matrix
}

matrix = matrixGenerator(30, 45, 15, 5, 2, 2)

io.sockets.emit('send matrix', matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
waterArr = []
sunArr = []
yGrassArr = []


Grass = require("./grass")
GrassEater = require("./grassEater")
Predator = require("./predator")
Water = require("./jur")
Sun = require("./arev")
YGRass = require("./yGrass")

function createObject() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                var wat = new Water(x, y)
                waterArr.push(wat)
            }
            else if (matrix[y][x] == 5) {
                var su = new Sun(x, y)
                sunArr.push(su)
            }
            else if (matrix[y][x] == 6) {
                var yGr = new YGRass(x, y)
                yGrassArr.push(yGr)
            }
        }

    }
    io.sockets.emit('send matrix', matrix)
}



function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()

    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in waterArr) {
        waterArr[i].move()
    }
    for (let i in sunArr) {
        sunArr[i].eat()
    }
    for (let i in yGrassArr) {
        yGrassArr[i].mul()
    }
    io.sockets.emit('send matrix', matrix)
}
setInterval(game, 300);


function Kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    waterArr = [];
    sunArr = [];
    yGrassArr = [];
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            var gr = new Grass(x, y);
            grassArr.push(gr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function AddGrassEater() {
    let count = 0;
    for (var i = 0; i < 50; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (count < 7) {
            if (i < 30) {
                if (matrix[y][x] == 0) {
                    count++;
                    matrix[y][x] = 2;
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }

            } else if (i >= 30) {
                if (matrix[y][x] == 0 || matrix[y][x] == 1) {
                    count++;
                    matrix[y][x] = 2;
                    var grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }
            }
        }


    }

    io.sockets.emit("send matrix", matrix);
}

function AddPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            var predator = new Predator(x, y);
            predatorArr.push(predator);
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function AddWater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            var wat = new Water(x, y);
            waterArr.push(wat);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addYGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6;
            var yGr = new YGRass(x, y);
            yGrassArr.push(yGr);
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function AddSun() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            var su = new Sun(x, y);
            sunArr.push(su);
        }
    }
    io.sockets.emit("send matrix", matrix);
}


var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.water = waterArr.length;
    statistics.sun = sunArr.length;
    statistics.yGrass = yGrassArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000);



io.on('connection', function (socket) {
    createObject();
    socket.on("addGrass", AddGrass);
    socket.on("addGrassEater", AddGrassEater);
    socket.on("killAll", Kill);
    socket.on("addPredator", AddPredator);
    socket.on("addSun", AddSun);
    socket.on("addWater", AddWater);
    socket.on("addYGrass", addYGrass);
})