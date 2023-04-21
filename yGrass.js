let LivingCreature = require("./LivingCreature")

module.exports = class YGRass extends LivingCreature{
    constructor(x,y){
            super(x,y)
            this.multiply = 0
            this.directions = [
                [this.x - 1, this.y - 1],
                [this.x    , this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y    ],
                [this.x + 1, this.y    ],
                [this.x - 1, this.y + 1],
                [this.x    , this.y + 1],
                [this.x + 1, this.y + 1]
            ];
        
    }

    
    mul(){
        this.multiply++
        var emptyCell = this.chooseCell(0)
        var newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)]

            if(this.multiply >= 8 && newCell){
                  var newX  = newCell[0]
                  var newY = newCell[1]

                  matrix[newY][newX] = 1

                  var yGr  = new YGrass(newX,newY)
                  yGrassArr.push(yGr)
                  this.multiply = 0
            }

    }
}