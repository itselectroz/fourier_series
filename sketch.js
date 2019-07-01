function setup() {
	createCanvas(windowWidth, windowHeight);
}

let t = 0;

let path = [];

function draw() {
	background(0);
	stroke(255);
	noFill();

	translate(width/4, height/2);

	let px = py = 0;

	let n = 200;

	for(let i = 0; i < n; i++)
	{
		let v = 2*i + 1;

		let r = (4/(v*PI))*400/2;

		ellipse(px,py, r*2, r*2);

		let x = px + r*cos(v*t);
		let y = py + r*sin(v*t);

		line(px, py, x, y);

		px = x;
		py = y;
	}

	line(px, py, width/3, py);

	path.unshift(py);

	beginShape();
	for(let i = path.length; i >= 0; i--)
	{
		vertex(width/3 + i, path[i]);
	}
	endShape();

	if(path.length > 1000)
		path.pop();

	t -= 0.01;

	if(t <= -TWO_PI)
		t = 0;
}