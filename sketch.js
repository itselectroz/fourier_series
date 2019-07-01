
let t = 0;

let path = [];
let xvals = yvals = [];

const USER = 0;
const FOURIER = 1;

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
	xvals = fourierTransform([100, -100, 100, -100, 100, -100, 100, -100, -100, -100, -100, -100]); // sine wave with weird change at the end
	yvals = fourierTransform([100, -100, 100, -100, 100, -100, 100, -100, -100, -100, -100, -100]); // sine wave with weird change at the end
	console.log(xvals);
}

let x = y = 0;

function doCircle(vals, sx, sy)
{
	x = y = 0;

	let n = vals.length;

	for(let i = 0; i < n; i++)
	{
		let px = x;
		let py = y;

		let circle = vals[i];

		let r = circle.amp;

		ellipse(sx + px,sy + py, r*2, r*2);

		x += r*cos(circle.freq * t + circle.phase);
		y += r*sin(circle.freq * t + circle.phase);

		line(sx + px, sy + py, sx + x, sy + y);
	}

	return createVector(x, y);
}

function draw() {
	background(0);
	stroke(255);
	noFill();

	let vec1 = doCircle(xvals, (3*width)/4, height/5);
	let vec2 = doCircle(yvals, width/5, 2*height/3);

	path.unshift(createVector(vec1.x, vec2.y));

	line((3*width)/4 + vec1.x, vec1.y + height/5, (3*width)/4 + vec1.x, 2*height/3 + vec2.y);
	line(vec2.x + width/5, vec2.y + 2*height/3, vec1.x + (3*width)/4, vec2.y + 2*height/3);

	beginShape();
	for(let i = path.length-1; i >= 0; i--)
	{
		let vec = path[i];
		vertex((3*width)/4 + vec.x, 2*height/3 + vec.y);
	}
	endShape();

	if(path.length > 1000)
		path.pop();

	t -= 0.01;

	if(t <= -TWO_PI)
		t = 0;
}