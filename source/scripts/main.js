'use strict'

import per from "../scripts/personage.js";

let runnerCanvas = document.getElementById('runner');
let runnerContext = runnerCanvas.getContext('2d');

let timeCount = true; //Отвечает за паузы между рендерингом

function clearCanvas(){
    runnerContext.clearRect(0, 0, runnerCanvas.offsetWidth, runnerCanvas.offsetHeight);
}

function renderCanvas(){
    grassMain();
    listGrass.map(item => item.render(runnerContext));
}

function grassMain(){
    runnerContext.fillStyle = '#025415';
    runnerContext.fillRect(0, 580, 880, 50);
}

let hero = {

    oldPosition: { // Показывает старое положение персонажа по оси Y
        y: 0,

        addValue(){
            this.y = hero.currentPosition.y;
        },
    },
    
    currentPosition: { // Показывает текущюю позицию каждого елемента персонажа
        x: 0,
        y: 0,

        addValue(){
            this.x = hero.body.x;
            this.y = hero.body.y;
        },
    },

    body: { // Тело героя

        color: '#0474ba',
        x: 10,
        y: 545,
        width: 33,
        height: 30,

        moveBody(){ //Движения тела

            setTimeout(()=>{

                clearCanvas();

                this.y += 2;

                renderCanvas();

                hero.render();

            }, 400);

            setTimeout(()=>{

                clearCanvas();

                this.y -= 2;

                renderCanvas();

                hero.render();

            }, 600);
        },

        render(){
            runnerContext.fillStyle = this.color;
            runnerContext.fillRect(this.x, this.y, this.width, this.height);

            hero.currentPosition.x = this.x;
            hero.currentPosition.y = this.y;
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

        this.currentPosition.addValue();

        this.render();
        grassMain();
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
        grassMain();
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
                renderCanvas();

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
                renderCanvas();

            }
        }, 70)
    },

    dead(){

    }
}

grassMain();
hero.render();
hero.body.moveBody();
hero.oldPosition.addValue();

document.onkeydown = (event)=>{
    if(timeCount){
        timeCount = false;

        switch (event.keyCode) { //Движение влево по нажатию на стрелку
            case 37:
                
                if(hero.currentPosition.x < 5){

                    console.log('Край карты');
                } else{
                    contactGrass()
    
                    hero.moveLeft();
                }
                break;
            
            case 38: //Прижок по нажатию на стрелку

                if(hero.eyes.position == 'left'){
                    if(hero.currentPosition.x < 45){
                        console.log('Прижок не возможен. Край карты слишком близко!');
                    } else{
                        if(hero.oldPosition.y == hero.currentPosition.y){
                            hero.jumpUp();
                            contactGrass()
                            setTimeout(()=>{
                                hero.jumpDowm();
                            }, 390)
                        }
                    }
                } else{

                    if((hero.currentPosition.x > runnerCanvas.getAttribute('width') - 90)){
                        console.log('Прижок не возможен. Край карты слишком близко!');
                    } else{
                        if(hero.oldPosition.y == hero.currentPosition.y){
                            hero.jumpUp();
                            contactGrass()
                            setTimeout(()=>{
                                hero.jumpDowm();
                            }, 390)
                        }
                    }
                }

                break;

            case 39: // Движение вправо по нажатию на стрелку

                if(hero.currentPosition.x > runnerCanvas.getAttribute('width') - hero.body.width - 10){

                    console.log('Край карты');
                } else{
                    contactGrass()
    
                    hero.moveRight();
                }   
            
                break;
        }
        renderCanvas();

        setTimeout(()=>{
            timeCount = true;
        }, 100)
    }
}
 
function obstacles(){

}

class Obstacles {
    constructor(id, color, x, y, width, height){
        this.height = height;
        this.width = width;
        this.color = color;
        this.x = x;
        this.y = y;
        this.id = id;
    }

    move = ()=>{
        this.y += 5;   
    }

    render = (canvas)=>{
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}

let listGrass = []

let grass1 = new Obstacles(1,'#025415', 50, 560, 80, 20);
let grass2 = new Obstacles(2,'#025415', 130, 570, 50, 20);
let grass3 = new Obstacles(3,'#025415', 180, 560, 700, 20);
listGrass.push(grass1);
listGrass.push(grass2);
listGrass.push(grass3);

function contactGrass(){
    console.log(hero.currentPosition);
    for(let i = 0; i < listGrass.length; i++){
        if(hero.currentPosition.y + 12 == listGrass[i].y && hero.currentPosition.x == listGrass[i].x){
            console.log(true);
        }
        if(hero.currentPosition.x == listGrass[i].x){
            console.log(false);
        }
    }
}

setInterval(()=>{
    renderCanvas();
    hero.render();
    hero.body.moveBody();
    hero.oldPosition.addValue(); 
}, 1000)

