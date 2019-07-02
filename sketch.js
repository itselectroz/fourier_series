
let t = 0;

let path = [];
let xvals;
let yvals;

const USER = 0;
const FOURIER = 1;


function fourierTransform(values)
{
	let returns = [];
	
	let N = values.length;

	for(let k = 0; k < N; k++)
	{
		let real = 0;
		let imag = 0;

		for(let n = 0; n < N; n++)
		{
			let angle = (TWO_PI*k*n)/N;
			real += values[n] * cos(angle);
			imag -= values[n] * sin(angle);
		}

		real = real / N;
		imag = imag / N;

		let freq = k;
		let amp = sqrt(real * real + imag * imag);
		let phase = atan2(imag, real);

		returns.push({
			re: real,
			im: imag,
			freq: freq,
			amp: amp,
			phase: phase
		});
	}

	//returns.sort((x,y) => y.amp - x.amp);

	return returns;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	let xx = [];
	let yy = [];

	for(let i = 0; i < 100; i++)
	{
		xx[i] = 100 * cos(map(i, 0, 100, 0, TWO_PI));
		yy[i] = 100 * sin(map(i, 0, 100, 0, TWO_PI));
	}

	xvals = fourierTransform(xx); // sine wave with weird change at the end
	yvals = fourierTransform(yy); // sine wave with weird change at the end

	xvals.sort((x,y) => y.amp - x.amp);
	yvals.sort((x,y) => y.amp - x.amp);

	console.log(xvals);
}

let x = 0;
let y = 0;

function doCircle(vals, sx, sy, rot)
{
	x = sx;
	y = sy;

	let n = vals.length;

	for(let i = 0; i < n; i++)
	{
		let px = x;
		let py = y;

		let circle = vals[i];

		let r = circle.amp;

		ellipse(px,py, r*2, r*2);

		x += r*cos(circle.freq * t + circle.phase + rot);
		y += r*sin(circle.freq * t + circle.phase + rot);

		line(px, py, x, y);
	}

	return createVector(x, y);
}

function draw() {
	background(0);
	stroke(255);
	noFill();

	let vec1 = doCircle(xvals, (3*width)/4, height/5, 0);
	let vec2 = doCircle(yvals, width/5, 2*height/3,HALF_PI);

	let v = createVector(vec1.x, vec2.y);
	path.unshift(v);

	line(vec1.x, vec1.y, v.x, v.y);
	line(vec2.x, vec2.y, v.x, v.y);

	

	beginShape();
	for(let i = path.length-1; i >= 0; i--)
	{
		let vec = path[i];
		vertex(vec.x, vec.y);
	}
	endShape();

	t += (TWO_PI/yvals.length);

	if(t > TWO_PI)
	{
		t = 0;
		path = [];
	}
}