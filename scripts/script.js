
mainX = 0
mainY = 0

// var img = document.getElementById('imagen')
// ctx.drawImage(img, 10,10, 200,240,)

var canvas = null
var ctx = null

var figura = 'arc'
var pressed = false

var r =0
var g =0
var b =0

var score=0
var speed = 5

var player1 = null
var player2 = null
var paredes = []
var pared = null

var direccion = 'R'
var pause = false

var car = new Image()
var apple = new Image()
var lava = new Image()


var sound = new Audio()
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



const cambiarColor =() =>{
    r = Math.floor(Math.random() * (255-0) + 1)
    g = Math.floor(Math.random() * (255-0) + 1)
    b = Math.floor(Math.random() * (255-0) + 1)
    ctx.fillStyle='rgba('+r+','+g+','+b+',0.5)'
    ctx.fill()
}


// canvas.addEventListener('click', e => {  
    
//     if(figura=='arc'){
//         ctx.beginPath();
//         ctx.arc(e.offsetX,e.offsetY,50,0,2*Math.PI);
//         // ctx.strokeStyle = 'red'
//         // ctx.stroke();
//         ctx.fillStyle='rgba('+r+','+g+','+b+',0.5)'
//         ctx.fill()
//         ctx.stroke();
//     }else{
//         ctx.fillStyle='rgba('+r+','+g+','+b+',0.5)'
//         ctx.fillRect(e.offsetX,e.offsetY,50,50)
//     }
    
// })
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };  
}());

document.addEventListener('keydown', e => {
    //Arriba
    if(e.keyCode == 87 || e.keyCode == 38){
        direccion = 'U'
    }
    //Abajo
    if(e.keyCode == 83 || e.keyCode == 40){
        direccion = 'D'
    }
    //Izq
    if(e.keyCode == 65 || e.keyCode == 37){
        direccion = 'L'
    }
    //Derecha
    if(e.keyCode == 68 || e.keyCode == 39){
        direccion = 'R'
    }
    if(e.keyCode == 32){
        pause = (!pause)
    }
})

function crearMapa(){
    let printX=0
    let printY=0
    mapa.map((row,index)=>{
        row.map((item,index)=>{
            if(item === '$'){
                obstaculo = new Obstaculo(printX,printY)
                paredes.push(obstaculo)
                printX+=40
            }
            if(item==='n'){
                printY+=40
                printX=0
            }
            if(item === '0'){
                // grass = new Suelo(printX,printY)
                // suelo.push(grass)
                printX+=40
            }
        })

    })
}

function run(){
    canvas = document.getElementById('mycanvas')
    ctx = canvas.getContext('2d')
    ctx.font = '20px serif';


    
    player1 = new Cuadro(mainX,mainY,40,40,r,g,b)
    //player2 = new Cuadro((Math.random() * (470-0) + 1),Math.floor(Math.random() * (470-0) + 1),30,30,r,g,b)


    crearMapa()
    // pared = new Obstaculo(70,170)
    // paredes.push(pared)
    // paredes[1] = new Cuadro(400,170,30,150,r,g,b)
    // paredes[2] = new Cuadro(170,70,150,30,r,g,b)
    // paredes[3] = new Cuadro(170,400,150,30,r,g,b)

    car.src = 'assets/car.png'
    apple.src = 'assets/apple.png'
    sound.src = 'assets/siiiu.mp3'
    lava.src = 'assets/lava.jpeg'

    paint()


}

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
    this.w = 40
    this.h = 40
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



function paint(){
    window.requestAnimationFrame(paint)
    cambiarColor()

    ctx.fillStyle='rgb('+80+','+200+','+80+')'
    ctx.fillRect(0,0,1200,800)

    // var img = document.getElementById('imagen')
    
    ctx.drawImage(car, player1.x,player1.y, 40,40,)
    //ctx.drawImage(apple, player2.x,player2.y, 30,30,)


    //player1.pintar(ctx)
    //player2.pintar(ctx)

    paredes.map((item)=>{
        item.pintar(ctx)
    })


    ctx.font = '20px serif';
    ctx.fillStyle = 'Black'
    ctx.fillText("score: "+score , 20,40)


    if (!pause){
        update()
    }else{
        ctx.fillStyle = 'rgba(200,200,200,0.5)'
        ctx.fillRect(0,0,500,500)
        ctx.fillStyle = 'white'
        ctx.fillText("Pausa", 230,230)
    }


    // ctx.fillStyle='rgb('+r+','+g+','+b+')'
    // ctx.fillRect(mainX,mainY,50,50)



}

function update () {

    if (direccion==='U'){
        //car.rotate(1)
        if (player1.y>0){

            player1.y-=speed; 
        }  
    }else if (direccion==='D'){
        if (player1.y<Limits.y-Limits.grid){
            player1.y+=speed; 
        }  
    }else if (direccion=== 'L'){
        if (player1.x>0){
            player1.x-=speed; 
        }  
    }else if (direccion==='R'){
        if (player1.x<Limits.x-Limits.grid){
            player1.x+=speed; 
        }  
    }
    // if(player1.intersects(player2)){
    //     player2.x=(Math.random() * (500-0) + 1)
    //     player2.y=(Math.random() * (500-0) + 1)
    //     score+=5
    //     sound.play()

    //     //speed+=1

    //     console.log("Se tocaron")
    // }

    paredes.map(item =>{
        if(player1.intersects(item)){   
            if (direccion == 'U' ) {
                player1.y += speed;
            }
            //abajo
            if (direccion== 'D') {
                player1.y-= speed;
            }
            //izquierda
            if (direccion =='L') {
                player1.x += speed;
            }
            //derecha
            if (direccion =='R') {
                player1.x -= speed;
            }
        }
    })


}
window.addEventListener('load',run,false)


