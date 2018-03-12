var numsquares = 6
var colors = generaterandomcolor(numsquares)
var pickcolor = pickColor()
var colordisplay = document.querySelector('#colordisplay');
var squares = document.querySelectorAll('.square');
var messagedisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetbutton = document.querySelector('#reset')
var easy = document.querySelector('#easy')
var hard = document.querySelector('#hard')

easy.addEventListener('click',function(){
	h1.style.background = 'steelblue';
	easy.classList.add('selected')
	hard.classList.remove('selected')
	numsquares = 3
	colors = generaterandomcolor(numsquares)
	pickcolor = pickColor()	
	colordisplay.textContent = pickcolor;
	for (var i = 0;i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.background = colors[i]
		}
		else{
			squares[i].style.display = 'none'
		}
	}
})
hard.addEventListener('click',function(){
	h1.style.background = 'steelblue';
	easy.classList.remove('selected')
	hard.classList.add('selected');
	numsquares = 6
	colors = generaterandomcolor(numsquares)
	pickcolor = pickColor();
	colordisplay.textContent = pickcolor; 
	for (var i = 0;i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].style.background = colors[i]
		}
	}
})

resetbutton.addEventListener('click',function(){
	messagedisplay.textContent = ''
	this.textContent = 'New Colors';
	if (colors.length === 3){
		colors = generaterandomcolor(3)
	}
	else{
		colors = generaterandomcolor(6)
	}
	pickcolor = pickColor();
	colordisplay.textContent = pickcolor;
	for(var i = 0; i < squares.length; i++){
	squares[i].style.background = colors[i]}
	h1.style.background = 'steelblue';
})


colordisplay.textContent = pickcolor;
for(var i = 0; i < squares.length; i++){
	squares[i].style.background = colors[i];
	squares[i].addEventListener("click", function() {
		var clickcolor = this.style.background;
		if(clickcolor === pickcolor) {
			messagedisplay.textContent = 'Correct!'
			h1.style.background = clickcolor
			changecolors(pickcolor)
			resetbutton.textContent = 'Play Again!'
		} else {
			this.style.background = "#232323"
			messagedisplay.textContent = 'Try Again!'
		}	
	});
}

function changecolors(color){
	for (var i = 0; i < squares.length;i++) {
		squares[i].style.background = color
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length)
	return colors[random];
}

function generaterandomcolor(num){
	var arr = []
	for(var i = 0;i < num; i++){
		arr.push(randomcolor())
	}
	return arr;
}
function randomcolor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b +")"
}
