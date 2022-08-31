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


var r =0
var g =0
var b =0

// var score=0
var speed = 5

var player1 = null
var player2 = null
// var pared = []

var direccion = 'R'
var pause = false

var car = new Image()
// var apple = new Image()

// var sound = new Audio()


const cambiarColor =() =>{
    r = Math.floor(Math.random() * (255-0) + 1)
    g = Math.floor(Math.random() * (255-0) + 1)
    b = Math.floor(Math.random() * (255-0) + 1)
    ctx.fillStyle='rgba('+r+','+g+','+b+',0.5)'
    ctx.fill()
}

// // canvas.addEventListener('click', e => {  
    
// //     if(figura=='arc'){
// //         ctx.beginPath();
// //         ctx.arc(e.offsetX,e.offsetY,50,0,2*Math.PI);
// //         // ctx.strokeStyle = 'red'
// //         // ctx.stroke();
// //         ctx.fillStyle='rgba('+r+','+g+','+b+',0.5)'
// //         ctx.fill()
// //         ctx.stroke();
// //     }else{
// //         ctx.fillStyle='rgba('+r+','+g+','+b+',0.5)'
// //         ctx.fillRect(e.offsetX,e.offsetY,50,50)
// //     }
    
// // })

document.addEventListener('keydown', e => {
    //Arriba
    if(e.key ==='ArrowUp'){
        if (player1.y>0){
            player1.y-=Limits.grid; 
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
    //player2 = new Cuadro((Math.random() * (470-0) + 1),Math.floor(Math.random() * (470-0) + 1),30,30,r,g,b)

    // pared[0] = new Cuadro(70,170,30,150,r,g,b)
    // pared[1] = new Cuadro(400,170,30,150,r,g,b)
    // pared[2] = new Cuadro(170,70,150,30,r,g,b)
    // pared[3] = new Cuadro(170,400,150,30,r,g,b)

    car.src = './assets/car.png'
    // apple.src = './assets/apple.png'
    // sound.src = './assets/siiiu.mp3'

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


function loop(){
    window.requestAnimationFrame(loop)

    //cambiarColor()

    //ctx.fillStyle='rgb('+255+','+255+','+255+')'
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,Limits.x,Limits.y)

    // var img = document.getElementById('imagen')
    
    ctx.drawImage(car, player1.x,player1.y, 35,35)
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

    // pared.map(item =>{
    //     if(player1.intersects(item)){   
    //         if (direccion == 'U' ) {
    //             player1.y += speed;
    //         }
    //         //abajo
    //         if (direccion== 'D') {
    //             player1.y-= speed;
    //         }
    //         //izquierda
    //         if (direccion =='L') {
    //             player1.x += speed;
    //         }
    //         //derecha
    //         if (direccion =='R') {
    //             player1.x -= speed;
    //         }
    //     }
    // })


}
window.addEventListener('load',run,false)

