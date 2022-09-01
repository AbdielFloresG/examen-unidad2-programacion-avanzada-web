
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
var speed = 10




var player1 = null
var player2 = null
var paredes = []
var pared = null


var apuntadorOpcion = 0
var apuntador = null

var direccion = 'R'
var pause = false

var car = new Image()
var apple = new Image()
var lava = new Image()

var state = null


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

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };  
}());

document.addEventListener('keydown', e => {

    if(state==='juego'){
        //Arriba
        if(e.key ==='ArrowUp'){
            direccion = 'U'
            if (player1.y>0){
                player1.y-=speed
            }  
        }
        //Abajo
        if(e.key === 'ArrowDown'){
            direccion = 'D'
            if (player1.y<Limits.y-Limits.grid){
                player1.y+=speed; 
            }  
        }
        //Izq
        if(e.key === 'ArrowLeft'){
            direccion = 'L'
            if (player1.x>0){
                player1.x-=speed; 
            }  
        }
        //Derecha
        if(e.key === 'ArrowRight'){
            direccion = 'R'
            if (player1.x<Limits.x-Limits.grid){
                player1.x+=speed; 
            }  
        }
        if(e.keyCode == 32){
            pause = (!pause)
        }
    }


    if (state==='menu'){
        //Arriba
        if(e.key ==='ArrowUp'){
            if(apuntadorOpcion>0){
                apuntador.y-=100
                apuntadorOpcion-=1
            }
        }
        //Abajo
        if(e.key === 'ArrowDown'){
            if(apuntadorOpcion<1){
                apuntador.y+=100
                apuntadorOpcion+=1
            }
        }
        //Enter
        if(e.key === 'Enter'){
            if(apuntadorOpcion===0){
                state='juego'
            }else if(apuntadorOpcion===1){
                
            }
        }

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
        
    state = 'menu'
    canvas = document.getElementById('mycanvas')
    ctx = canvas.getContext('2d')
    ctx.font = '20px serif';
    player1 = new Cuadro(mainX,mainY,30,30,r,g,b)
    apuntador = new Pointer(400,270,ctx)
    //player2 = new Cuadro((Math.random() * (470-0) + 1),Math.floor(Math.random() * (470-0) + 1),30,30,r,g,b)
    
    car.src = 'assets/car.png'
    apple.src = 'assets/apple.png'
    sound.src = 'assets/siiiu.mp3'
    lava.src = 'assets/lava.jpeg'

    crearMapa()
    loop()

}

function Cuadro(x,y,w,h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h

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

function Pointer(x,y,ctx){
    this.x = x
    this.y = y
    this.ctx = ctx
    this.pintar = function(ctx){
        ctx.fillStyle = 'rgba(200,200,200,0.8)'
        ctx.fillRect(this.x,this.y,15,15)
    }


}

function loop(){
    window.requestAnimationFrame(loop)

    if(state==='menu'){
        menu()
    }else{
        cambiarColor()
    
        ctx.fillStyle='rgb('+80+','+200+','+80+')'
        ctx.fillRect(0,0,1200,800)
    
        ctx.drawImage(car, player1.x,player1.y, 30,30,)
    
        paredes.map((item)=>{
            item.pintar(ctx)
        })
    
        if (!pause){
            update()
        }else{
            ctx.fillStyle = 'rgba(200,200,200,0.5)'
            ctx.fillRect(0,0,500,500)
            ctx.fillStyle = 'white'
            ctx.fillText("Pausa", 230,230)
        }

    }
}


function menu (){
    ctx.fillStyle='rgb('+80+','+200+','+80+')'
    ctx.fillRect(0,0,1200,800)
    ctx.font = '80px Arial';
    ctx.fillStyle = 'Black'
    ctx.fillText("Laberinto", 430,100)

    apuntador.pintar(ctx)

    ctx.font = '80px Arial';
    ctx.fillStyle = 'Black'
    ctx.fillText("Laberinto", 430,100)

    ctx.font = '60px Arial';
    ctx.fillStyle = 'Black'
    ctx.fillText("Iniciar juego", 430,300)

    ctx.font = '60px Arial';
    ctx.fillStyle = 'Black'
    ctx.fillText("Creditos", 470,400)

    ctx.font = '60px Arial';
    ctx.fillStyle = 'Black'
    ctx.fillText("Cerrar", 495,500)





}

function update () {
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


