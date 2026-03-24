var canvas=$("#canvas").get(0);
var ctx=canvas.getContext('2d');

w = window.innerWidth;
h = window.innerHeight;

canvas.width = w;
canvas.height = h;

var cnt = 0;

var message = "Type to Make Message";

function render() {
	var tmp = $("#text").val();
	if(tmp.length > 0 || message.length < 5){
		message = tmp;
	}

	// wipe the canvas
	ctx.fillStyle = "#44bbff";
	ctx.fillRect(0,0,10000,100000);

	ctx.strokeStyle = '#FFF'; // red
	ctx.lineWidth   = 200;
	ctx.font = "50px CuteFont";
	ctx.fillStyle = "#F05";
	ctx.strokeText(message, 50 , h/2-25);
	ctx.fillText(message, 50 , h/2-25);

	cnt++;
	$("#text").focus();
};

$("#canvas").click(function(){
	$("#text").focus();
});

$("#text").keydown(function(event){
	if(event.which == 13){
		event.preventDefault();
	}
	render();
});

$(window).resize(function(){
	w = window.innerWidth;
	h = window.innerHeight;
	canvas.width = w;
	canvas.height = h;
});

setInterval(render, 1000);
/* UTILITY FUNCTIONS */

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {r: parseInt(r * 255),g: parseInt(g * 255),b: parseInt(b * 255)};
}

function rgbToHex(x) {
    return "#" + ((1 << 24) + (x.r << 16) + (x.g << 8) + x.b).toString(16).slice(1);
}
