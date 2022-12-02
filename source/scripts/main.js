'use strict'

let runnerCanvas = document.getElementById('runner');
let runnerContext = runnerCanvas.getContext('2d');

let timeCount = 0; //Отвечает за паузы между рендерингом

function grass(){
    runnerContext.fillStyle = '#025415';
    runnerContext.fillRect(0, 580, 1000, 50);
}

let personage = {

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
                console.log(1);
            }, 1200)
        },

        render(){
            runnerContext.fillStyle = this.color;
            runnerContext.fillRect(this.x, this.y, this.width, this.height);
        },
    },

    eyes: {
        color: '#71c2f5',
        leftX: 20,
        rightX: 33,
        y: 555,
        width: 8,
        heihgt: 8,
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
        },
    },

    render(){
        this.body.render();
        this.leg.render();
        this.eyes.render();
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
        this.render();
        grass();
    },

    dead(){

    }
}

grass();
personage.render();
personage.body.moveBody();

document.onkeydown = (event)=>{
    if(timeCount == 0){
        timeCount = 1;
        if(event.keyCode == 37){
            personage.moveLeft();
        }
    
        if(event.keyCode == 39){
            personage.moveRight();
    
        }

        setTimeout(()=>{
            timeCount = 0;
        }, 100)
    }
    
}