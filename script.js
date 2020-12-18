const canvas =document.getElementById('canvas');
const ctx = canvas.getContext ('2d');

let numberOfParticle = 1000;
canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
let maxR = 20;
let minR = 2;

let mouse = {
	x : undefined,
	y : undefined
}
addEventListener('mousemove', (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
});

// PLAYER CLASS CREATION
class Particle {
	constructor (x,y,r,dx,dy,color){
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.dx = dx;
		this.dy = dy;
	}
	draw(){
		ctx.beginPath ()
	 	ctx.arc (this.x, this.y, this.r, 0, Math.PI*2, false)
	 	ctx.fillStyle = this.color
	 	ctx.fill ()
	 }
	 update(){
	 	if((this.x+this.r) > innerWidth || (this.x-this.r) < 0){
	 		this.dx = -this.dx;
	 	}
	 	if((this.y+this.r) > innerHeight || (this.y-this.r) < 0){
	 		this.dy = -this.dy;
	 	}
	 	if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
	 		if(this.r < maxR){
	 			this.r += 1;
	 		}
	 		
	 	}else {
	 		if(this.r > minR){
	 			this.r -=1;
	 		}
	 	}
	 	this.x = this.x + this.dx;
	 	this.y = this.y + this.dy; 	
	 }
}



for(let i = 0; i < numberOfParticle; i++){

	let x = Math.random() * innerWidth;
	let y = Math.random() * innerHeight;
	let dx = ( Math.random() - 0.5 ) * 5;
	let dy = ( Math.random() - 0.5 ) * 5;
	let r = Math.random() * 5;
	let color = 'hsl('+ Math.random() * 360 +', 50%, 50%)';
	particles.push(new Particle(x, y, r, dx, dy, color));
}
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	//DRAW PLLAYER
	for(let i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].draw();
		
	}
}
animate();