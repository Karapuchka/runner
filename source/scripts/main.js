'use strict'

let runnerCanvas = document.getElementById('runner');
let runnerContext = runnerCanvas.getContext('2d');

let timeCount = true; //Отвечает за паузы между рендерингом
let personageY = 0; // Текущее положение персонажа по оси Y

function grass(){
    runnerContext.fillStyle = '#025415';
    runnerContext.fillRect(0, 580, 1000, 50);
}

let personage = {
    
    currentPosition: { // Показывает текущюю позицию каждого елемента персонажа
        bodyX: 0,
        bodyY: 0,

        eyesRightX: 0,
        eyesLeftX:  0,
        eyesY:      0,

        legRightX: 0,
        legLeftX:  0,
        legY:      0,

        addValue(){
            this.bodyX = personage.body.x;
            this.bodyY = personage.body.y;
    
            this.eyesRightX = personage.eyes.rightX;
            this.eyesLeftX  = personage.eyes.leftX;
            this.eyesY      = personage.eyes.y;
    
            this.legRightX = personage.leg.rightX;
            this.legLeftX  = personage.leg.leftX;
            this.legY      = personage.leg.y;
        },
    },

    body: {

        color: '#0474ba',
        x: 10,
        y: 545,
        width: 33,
        height: 30,

        moveBody(){
            setInterval(()=>{
                setTimeout(()=>{
                    runnerContext.clearRect(0, 0, runnerCanvas.offsetWidth, runnerCanvas.offsetHeight);
                    this.y += 2;
                    personage.render();
                    grass();
                }, 400);

                setTimeout(()=>{
                    runnerContext.clearRect(0, 0, runnerCanvas.offsetWidth, runnerCanvas.offsetHeight);
                    this.y -= 2;
                    personage.render();
                    grass();
                }, 600);
            }, 1000)
        },

        render(){
            runnerContext.fillStyle = this.color;
            runnerContext.fillRect(this.x, this.y, this.width, this.height);

            personage.currentPosition.bodyX = this.x;
            personage.currentPosition.bodyY = this.y;
        },
    },

    eyes: {
        color: '#71c2f5',
        leftX: 20,
        rightX: 33,
        y: 555,
        width: 8,
        heihgt: 6,
        position: 'right', //Преднозначен для регулировки положения глаз во премя движения

        leftMove(){ //Поворачивает глаза ближе к левому краю
            this.leftX -= 6;
            this.rightX -= 5;
        },

        rightMove(){//Поворачивает глаза ближе к правому краю
            this.leftX += 6;
            this.rightX += 5;
        },

        render(){
            runnerContext.fillStyle = this.color;
            runnerContext.fillRect(this.leftX, this.y, this.width, this.heihgt);
            runnerContext.fillRect(this.rightX, this.y, this.width, this.heihgt);

            personage.currentPosition.eyesRightX = this.rightX;
            personage.currentPosition.eyesLeftX  = this.leftX;
            personage.currentPosition.eyesY      = this.y;
        },
    },

    leg: {
        color: '#4e738a',
        leftX: 10,
        rightX: 31,
        y: 575,
        width: 12,
        leftHeihgt:  5,
        rightHeihgt: 5,
        activeLeg: 'static', //Покозывает какая нога в данный момент активна

        moveLeg(){

            if(this.activeLeg == 'static'){

                this.activeLeg = 'left';
                this.leftHeihgt -= 2;
                
            } else if (this.activeLeg == 'left'){

                this.activeLeg = 'right';
                this.leftHeihgt = 5;
                this.rightHeihgt -= 2;

            } else if (this.activeLeg == 'right'){
                
                this.activeLeg = 'left';
                this.rightHeihgt = 5;
                this.leftHeihgt -= 2;

            }
        },

        render(){
            runnerContext.fillStyle = this.color;
            runnerContext.fillRect(this.leftX, this.y, this.width, this.leftHeihgt);
            runnerContext.fillRect(this.rightX, this.y, this.width, this.rightHeihgt);

            personage.currentPosition.legRightX = this.rightX;
            personage.currentPosition.legLeftX  = this.leftX;
            personage.currentPosition.legY      = this.y;
        },
    },

    render(){
        this.body.render();
        this.leg.render();
        this.eyes.render();

        personageY = personage.currentPosition.bodyY;
    },

    moveLeft(){

        runnerContext.clearRect(0, 0, runnerCanvas.offsetWidth, runnerCanvas.offsetHeight);
        
        if(this.eyes.position == 'right'){
            this.eyes.leftMove();
            this.eyes.position = 'left';
        }

        this.leg.moveLeg();

        this.body.x      -= 5;
        this.leg.leftX   -= 5;
        this.leg.rightX  -= 5;
        this.eyes.leftX  -= 5;
        this.eyes.rightX -= 5;

        this.currentPosition.addValue();

        this.render();
        grass();
    },

    moveRight(){
        runnerContext.clearRect(0, 0, runnerCanvas.offsetWidth, runnerCanvas.offsetHeight);
        
        if(this.eyes.position == 'left'){
            this.eyes.rightMove();
            this.eyes.position = 'right';
        }


        this.leg.moveLeg();

        this.body.x      += 5;
        this.leg.leftX   += 5;
        this.leg.rightX  += 5;
        this.eyes.leftX  += 5;
        this.eyes.rightX += 5;

        this.currentPosition.addValue();

        this.render();
        grass();
    },

    jumpUp(){

        let count = 0; //Счетчик для прыжков

        setInterval(()=>{
            if(count < 35){

                count += 7;
                runnerContext.clearRect(0, 0, runnerCanvas.offsetWidth, runnerCanvas.offsetHeight);

                if(this.eyes.position == 'right'){

                    this.body.x      += 7;
                    this.leg.leftX   += 7;
                    this.leg.rightX  += 7;
                    this.eyes.leftX  += 7;
                    this.eyes.rightX += 7;

                } else {

                    this.body.x      -= 7;
                    this.leg.leftX   -= 7;
                    this.leg.rightX  -= 7;
                    this.eyes.leftX  -= 7;
                    this.eyes.rightX -= 7;

                }

                this.body.y -= 5;
                this.eyes.y -= 5;
                this.leg.y  -= 5;

                this.currentPosition.addValue();
                
                this.render();
                grass();
            } else {
                return false;
            }
        }, 70)
    },

    jumpDowm(){
        let count = 0; //Счетчик для прыжков

        setInterval(()=>{
            if(count < 35){

                count += 7;
                runnerContext.clearRect(0, 0, runnerCanvas.offsetWidth, runnerCanvas.offsetHeight);

                if(this.eyes.position == 'right'){

                    this.body.x      += 2;
                    this.leg.leftX   += 2;
                    this.leg.rightX  += 2;
                    this.eyes.leftX  += 2;
                    this.eyes.rightX += 2;

                } else {

                    this.body.x      -= 2;
                    this.leg.leftX   -= 2;
                    this.leg.rightX  -= 2;
                    this.eyes.leftX  -= 2;
                    this.eyes.rightX -= 2;

                }
        
                this.body.y += 5;
                this.eyes.y += 5;
                this.leg.y  += 5;

                this.currentPosition.addValue();

                this.render();
                grass();
            } else {
                return false;
            }
        }, 70)
    },

    dead(){

    }
}

grass();
personage.render();
personage.body.moveBody();

document.onkeydown = (event)=>{
    if(timeCount){
        timeCount = false;

        switch (event.keyCode) {
            case 37:
                
                if(personage.currentPosition.bodyX < 5){

                    console.log('Край карты');
                } else{
    
                    personage.moveLeft();
                }
                break;
            
            case 38:

                if(personage.currentPosition.bodyY == personageY){
                    personage.jumpUp();

                    setTimeout(()=>{
                        personage.jumpDowm();
                    }, 390)
                }

                break;

            case 39:

                if(personage.currentPosition.bodyX > runnerCanvas.getAttribute('width') - personage.body.width - 10){

                    console.log('Край карты');
                } else{
    
                    personage.moveRight();
                }   
            
                break;
        }

        setTimeout(()=>{
            timeCount = true;
        }, 100)
    }
}
