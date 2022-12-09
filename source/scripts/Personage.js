class Personage {

    position = {
            // За основу взяты позоции первой добавленной части тела персонажа

        oldPosition: { // Показывает старое положение персонажа по оси Y и X 
            y: 0,
            x: 0,

            addValue(obj){
                this.y = obj.position.currentPosition.y;
                this.x = obj.position.currentPosition.x;
            },
        },

        startPosition: {// Показывает стартовое положение персонажа по оси Y и X 
            y: 0,
            x: 0,

            addValue(partBody){
                this.y = partBody.y;
                this.x = partBody.x;
            },
        },

        currentPosition: { // Показывает текущюю позицию персонажа
            x: 0,
            y: 0,
    
            addValue(partBody){
                this.bodyX = partBody.x;
                this.bodyY = partBody.y;
            },
        },
    }

    addPosition(part){
        if(this.structure[part].mainPart){
            this.position.startPosition.addValue(this.structure[part]);
            this.position.currentPosition.addValue(this.structure[part]);
            this.position.oldPosition.addValue(this.structure[part]);
        }
    }

    structure = {

    }

    addRect(part, colorPart, partX, partY, partWidth, partHeigth, mainPart){
        this.structure[`${part}`] = {
            color: `${colorPart}`,
            x: partX,
            y: partY,
            width: partWidth,
            height: partHeigth,
            mainPart: mainPart, // Принимает true, если часть является главной и false, если нет. На основе главной части отслеживает позиция

            render(canvas){
                canvas.fillStyle = this.color;
                canvas.fillRect(this.x, this.y, this.width, this.height);
            },
        }
    }

    move = {

    }
}
export default Personage;