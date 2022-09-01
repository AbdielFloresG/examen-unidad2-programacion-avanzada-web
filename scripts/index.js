//import Personaje from './Personaje'

mainX = 0
mainY = 0

var canvas = null
var ctx = null
var pressed = false

const Limits = {
    x : 1200,
    y : 800,
    grid : 40,

}

const mapa = [
    ['0','$','$','0','0','0','0','0','0','0','0','0','0','$','0','0','0','$','$','$','$','0','0','0','0','$','$','0','0','0','n'],
    ['0','0','0','0','$','$','$','$','$','$','0','$','0','$','0','$','0','0','0','0','0','0','$','$','$','$','$','0','$','0','n'],
    ['$','0','$','0','$','0','0','0','0','$','0','$','0','$','0','$','$','0','$','$','$','0','0','0','0','$','0','0','$','0','n'],
    ['$','0','$','0','$','0','$','$','0','$','0','$','0','$','0','$','$','0','$','0','$','$','$','$','0','0','0','$','$','0','n'],
    ['$','0','$','0','0','0','$','$','0','$','$','$','0','$','0','0','$','0','0','0','$','0','$','$','$','$','0','0','$','0','n'],
    ['$','0','$','$','$','$','$','0','0','$','$','$','0','$','$','$','$','0','$','0','$','0','0','0','$','$','$','0','$','0','n'],
    ['0','0','0','$','0','$','0','0','$','$','0','$','0','0','0','0','$','0','$','$','$','$','$','0','$','0','$','0','$','$','n'],
    ['0','$','0','$','0','$','0','$','$','$','0','$','$','0','$','0','$','0','$','0','0','0','0','0','$','0','0','0','0','0','n'],
    ['0','$','0','0','0','$','0','0','0','$','0','0','$','0','$','0','0','0','$','$','0','$','$','0','$','$','$','$','$','0','n'],
    ['0','$','0','$','0','0','0','$','0','$','$','0','0','0','$','$','$','$','$','$','0','$','$','0','0','0','0','$','$','0','n'],
    
    ['$','$','0','$','$','$','$','$','0','$','$','$','0','$','$','$','0','0','0','0','0','$','$','$','$','$','$','$','0','0','n'],
    ['0','0','0','0','0','0','0','0','0','$','0','$','0','$','$','$','0','$','$','$','$','$','$','0','$','0','0','0','0','$','n'],
    ['0','$','$','$','$','$','0','$','$','$','0','$','0','$','$','$','0','$','0','0','0','$','$','0','$','0','$','$','$','$','n'],
    ['0','$','0','0','0','$','0','$','0','0','0','0','0','$','0','$','0','$','0','$','0','0','0','0','$','0','0','0','0','$','n'],
    ['0','$','0','$','$','$','0','0','0','$','0','$','$','$','0','$','0','$','0','$','$','$','$','$','$','$','0','$','0','$','n'],
    ['0','$','0','$','$','$','$','$','$','$','0','0','0','0','0','0','0','$','0','0','0','0','0','$','$','$','0','$','0','$','n'],
    ['0','$','0','$','0','0','0','0','0','$','$','$','$','$','$','$','0','$','0','$','$','$','0','0','0','0','0','$','0','0','n'],
    ['0','$','0','0','0','$','0','$','$','$','0','0','0','0','$','$','0','$','0','0','0','$','$','$','$','$','$','$','$','0','n'],
    ['0','$','$','0','$','$','0','0','$','$','0','$','$','$','$','0','0','$','$','$','0','0','$','$','0','0','0','0','$','0','n'],
    ['0','0','0','0','$','$','$','0','0','0','0','0','$','0','0','0','$','$','$','$','$','0','0','0','0','$','$','0','$','0','n'],

]



var r =0
var g =0
var b =0

// var score=0
var speed = 5

var player1 = null
var obstaculo = null
var obstaculos = []
var grass = null
var camino = []

var pause = false

var car = new Image()
var lava = new Image()
var suelo = new Image()

// var sound = new Audio()

document.addEventListener('keydown', e => {
    //Arriba
    if(e.key ==='ArrowUp'){
        if (player1.y>0){

            player1.y-=Limits.grid; 

            obstaculos.map(item =>{
                if(player1.intersects(item)){   
                    player1.y += speed;
                
                    //abajo
 
                }
            })
            

        }  
        direccion = 'U'
    }
    //Abajo
    if(e.key === 'ArrowDown'){
        direccion = 'D'
        if (player1.y<Limits.y-35){
            player1.y+=Limits.grid; 

        }  
    }
    //Izq
    if(e.key === 'ArrowLeft'){
        direccion = 'L'
        if (player1.x>0){
            player1.x-=Limits.grid; 

        } 
    }
    //Derecha
    if(e.key === 'ArrowRight'){
        direccion = 'R'
        if (player1.x<Limits.x-35){
            player1.x+=Limits.grid; 

        }  
    }
    if(e.keyCode == 32){
        pause = (!pause)
    }


})

function run(){
    canvas = document.getElementById('mycanvas')
    ctx = canvas.getContext('2d')
    ctx.font = '20px serif';

    player1 = new Cuadro(mainX,mainY,50,50,r,g,b)
    player2 = new Obstaculo(mainX,mainY)
    


    
    //player2 = new Cuadro((Math.random() * (470-0) + 1),Math.floor(Math.random() * (470-0) + 1),30,30,r,g,b)

    // pared[0] = new Cuadro(70,170,30,150,r,g,b)
    // pared[1] = new Cuadro(400,170,30,150,r,g,b)
    // pared[2] = new Cuadro(170,70,150,30,r,g,b)
    // pared[3] = new Cuadro(170,400,150,30,r,g,b)

    suelo.src = 'assets/grass.jpeg'
    car.src = 'assets/car.png'
    lava.src = 'assets/lava.jpeg'
    // sound.src = './assets/siiiu.mp3'

    crearMapa()
    //pintarMapa()
    loop()

}

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };  
}());

function Cuadro(x,y,w,h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    let r = Math.floor(Math.random() * (255-0) + 1)
    let g = Math.floor(Math.random() * (255-0) + 1)
    let b = Math.floor(Math.random() * (255-0) + 1)
    
    this.pintar = function(ctx){
        ctx.fillStyle= `rgb(${r},${g},${b})`
        //ctx.fillStyle = 'black'
        ctx.fillRect(this.x,this.y,this.w,this.h)
        ctx.strokeRect(this.x,this.y,this.w,this.h)
    }
    this.intersects = function (target) { 
        if(this.x < target.x + target.w &&
        this.x + this.w > target.x && 
        this.y < target.y + target.h && 
        this.y + this.h > target.y){
            return true;	
        }
    };
}

function Obstaculo(x,y,ctx){
    this.x = x
    this.y = y
    this.ctx = ctx
    this.pintar = function(ctx){
        ctx.drawImage(lava, this.x,this.y, Limits.grid,Limits.grid)
    }
    this.intersects = function (target) { 
        if(this.x < target.x + target.w &&
        this.x + this.w > target.x && 
        this.y < target.y + target.h && 
        this.y + this.h > target.y){
            return true;	
        }
    };
}
function Suelo(x,y,ctx){
    this.x = x
    this.y = y
    this.ctx = ctx
    this.pintar = function(ctx){
        ctx.drawImage(suelo, this.x,this.y, Limits.grid,Limits.grid)
    }
    this.intersects = function (target) { 
        if(this.x < target.x + target.w &&
        this.x + this.w > target.x && 
        this.y < target.y + target.h && 
        this.y + this.h > target.y){
            return true;	
        }
    };
}

function crearMapa(){
    let printX=0
    let printY=0
    mapa.map((row,index)=>{
        row.map((item,index)=>{
            if(item === '$'){
                obstaculo = new Obstaculo(printX,printY)
                obstaculos.push(obstaculo)
                printX+=40
    
            }
            if(item==='n'){
                printY+=40
                printX=0
            }
            if(item === '0'){
                grass = new Suelo(printX,printY)
                camino.push(grass)
                printX+=40
    
            }
        })

    })
    console.log(obstaculos)
}

function pintarMapa(ctx){
    obstaculos.map((item,index)=>{
        item.pintar(ctx)
    })
    camino.map((item,index)=>{
        item.pintar(ctx)
    })
}


function loop(){
    window.requestAnimationFrame(loop)

    //cambiarColor()
    //ctx.fillStyle='rgb('+255+','+255+','+255+')'
    // ctx.fillStyle = 'white'
    // ctx.fillRect(0,0,Limits.x,Limits.y)
    // // var img = document.getElementById('imagen')

    player2.pintar(ctx)
    pintarMapa(ctx)

    ctx.drawImage(car, player1.x,player1.y, 40,40)
    //pintarMapa()

    //player1.pintar(ctx)
    //player2.pintar(ctx)

    // pared.map((item)=>{
    //     item.pintar(ctx)
    // })

    // ctx.font = '20px serif';
    // ctx.fillStyle = 'Black'
    // ctx.fillText("score: "+score , 20,40)

    if (!pause){
        update()
    }else{
        ctx.fillStyle = 'rgba(200,200,200,0.5)'
        ctx.fillRect(0,0,Limits.x,Limits.y )
        ctx.fillStyle = 'white'
        ctx.fillText("Pausa", 400 ,230)
    }


//     // ctx.fillStyle='rgb('+r+','+g+','+b+')'
//     // ctx.fillRect(mainX,mainY,50,50)



}

function update () {


    // if(player1.intersects(player2)){
    //     player2.x=(Math.random() * (500-0) + 1)
    //     player2.y=(Math.random() * (500-0) + 1)
    //     score+=5
    //     sound.play()

    //     //speed+=1

    //     console.log("Se tocaron")
    // }



}
window.addEventListener('load',run,false)

