include("javascript/patches.js")
include("javascript/canvasTools.js")
include("javascript/eventHandlers.js")

$(document).ready(function(){
  var onPlay = false;
  var canvas = new Canvas("field");
  var gridAttr = { count: {x: 40, y: 40}, cell: {x: 10, y: 10}, lineWidth: 1};

  canvas.makeGrid(gridAttr);
  canvas.grid.clear();

  bindHandlers(canvas, onPlay);
});
