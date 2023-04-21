
var side = 25


var grassArr = []
var grassEaterArr = []
var predatorArr = []
var waterArr = []
var sunArr = []
var yGrassArr = []



function setup() {
    frameRate(10)
    createCanvas(matrix[0].length * side, matrix.length * side)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                var grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            } else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if(matrix[y][x] == 4){
                var wat = new Water(x,y)
                waterArr.push(wat)
            }
            else if(matrix[y][x] == 5){
                var su = new Sun(x,y)
                sunArr.push(su)
            }
            else if(matrix[y][x] == 6){
                var yGr = new YGRass(x,y)
                yGrassArr.push(yGr)
            }
        }

    }
}







function draw() {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            var tbot = side-side*0.1
            textSize(tbot)

            if (matrix[y][x] == 1) {
                fill("green")
                rect(x * side, y * side, side, side)
                text("🌿",x * side,y * side + tbot)
            } else if (matrix[y][x] == 2) {
                fill("white")
                rect(x * side, y * side, side, side)
                text("🐼",x * side,y * side + tbot)
            } else if (matrix[y][x] == 3) {
                fill("red")
                rect(x * side, y * side, side, side)
                text("🙎🏻‍♂️",x * side,y * side + tbot)
            }
            else if(matrix[y][x] == 4){
                fill("aqua")
                rect(x * side, y * side, side, side)
                text("💦",x * side,y * side + tbot)
            }
            else if(matrix[y][x] == 5){
                fill("orange")
                rect(x * side, y * side, side, side)
                text("🌞",x * side,y * side + tbot)
            }
            else if(matrix[y][x] == 6){
                fill("yellow")
                rect(x * side, y * side, side, side)
                text("🌼",x * side,y * side + tbot)
            }
            else {
                fill("gray")
                rect(x * side, y * side, side, side)
            }
           
        }

    }

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
}