function Personaje(x,y,w,h){
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

export {Personaje}