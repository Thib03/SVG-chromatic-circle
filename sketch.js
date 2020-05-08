var scale = [[1,0],[2,1],[2,3],[3,4],[4,6],[6,8],[7,10]];

var PI = 3.14159265359;

var canvasWidth = 500;
var bigRadius = 180;
var littleRadius = 46.5;

var ep = 2.5;

function deg(d) {
  while(d < 1) {d += 7;}
  return (d-1)%7+1;
}

function ndt(n) {
  while(n < 0) {n += 12;}
  return n%12;
}

function alt(a) {
  while(a < -6) {a += 12;}
  while(a >  6) {a -= 12;}
  return a;
}

function degToNdt(d) {
  switch(deg(d)) {
    default:
    case 1: return 0;
    case 2: return 2;
    case 3:	return 4;
    case 4: return 5;
    case 5: return 7;
    case 6: return 9;
		case 7: return 11;
  }
}

function colour(d) {
  switch(deg(d)) {
    case 1: return "#6d9eeb";
    case 3: return "#92c47d";
    case 5: return "#e06665";
    case 7: return "#fed966";
    default:return "#d9d9d9";
  }
}

var canvas = d3.select("body")
             .append("svg")
             .attr("width", canvasWidth)
             .attr("height", canvasWidth);

var bigCircle = canvas.append("circle")
                .attr("cx", canvasWidth/2)
                .attr("cy", canvasWidth/2)
                .attr("r", bigRadius)
                .attr("fill-opacity", 0)
                .attr("stroke-width", ep)
                .attr("stroke", "black");

for(var n = 0; n < 12; n++) {
  var a = PI/2 - n*PI/6;
  var x1 = canvasWidth/2+(bigRadius-30)*Math.cos(a);
  var y1 = canvasWidth/2-(bigRadius-30)*Math.sin(a);
  var x2 = canvasWidth/2+(bigRadius+30)*Math.cos(a);
  var y2 = canvasWidth/2-(bigRadius+30)*Math.sin(a);
  var line = canvas.append("line")
             .attr("x1", x1)
             .attr("y1", y1)
             .attr("x2", x2)
             .attr("y2", y2)
             .attr("stroke-width", ep)
             .attr("stroke-linecap", "round")
             .attr("stroke", "black");
}

for(var d = 0; d < scale.length; d++) {
  var de = scale[d][0];
  var nd = scale[d][1];
  var al = alt(ndt(nd-scale[0][1])-degToNdt(de-scale[0][0]+1));
  var te = '';
  switch(al) {
    case -3: te += '---';break;
    case -2: te += '--'; break;
    case -1: te += '-';  break;
    case  0:             break;
    case  1: te += '+';  break;
    case  2: te += '++'; break;
    case  3: te += '+++';break;
    default: te += Math.abs(al) + (al>0?'+':'-');  break;
  }
  var a = PI/2 - nd*PI/6;
  var x = canvasWidth/2+bigRadius*Math.cos(a);
  var y = canvasWidth/2-bigRadius*Math.sin(a);
  var circle = canvas.append("circle")
               .attr("cx", x)
               .attr("cy", y)
               .attr("r", littleRadius)
               .attr("stroke-width", ep)
               .attr("stroke", "black")
               .attr("fill", colour(de));
  var text = canvas.append("text")
             .attr("font-family", "Nunito")
             .attr("x", x)
             .attr("y", y+17)
             //.attr("font-family", "nunito-extralight")
             .attr("font-size", 60)
             .attr("text-anchor", "middle")
             .attr("fill", "black")
             .text(te);
}
