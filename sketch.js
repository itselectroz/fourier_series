
let t = 0;

let path = [];
let circles = [];

function fourierTransform(values)
{
	let returns = [];
	
	let N = values.length;

	for(let k = 0; k < N; ++k)
	{
		let real = 0;
		let imag = 0;

		for(let n = 0; n < N; ++n)
		{
			let angle = (TWO_PI*k*n)/N;
			real += values[n] * cos(angle);
			imag += values[n] * sin(angle);
		}

		real = real / N;
		imag = imag / N;

		let freq = k;
		let amp = sqrt(pow(real, 2) + pow(imag, 2));
		let phase = atan2(imag, real);

		returns.push({
			re: real,
			im: imag,
			freq: freq,
			amp: amp,
			phase: phase
		});
	}

	returns.sort((x,y) => y.amp - x.amp);

	return returns;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	circles = fourierTransform([100, -100, 100, -100, 100, -100, 100, -100, -100]);
	console.log(circles);
}

function draw() {
	background(0);
	stroke(255);
	noFill();

	translate(width/4, height/2);

	let px = py = 0;

	let n = circles.length;

	for(let i = 0; i < n; i++)
	{
		let circle = circles[i];

		let r = circle.amp;

		ellipse(px,py, r*2, r*2);

		let x = px + r*cos(circle.freq * t + circle.phase);
		let y = py + r*sin(circle.freq * t + circle.phase);

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