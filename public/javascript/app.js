include("javascript/patches.js")
include("javascript/canvasTools.js")
include("javascript/eventHandlers.js")

$(document).ready(function(){
  var onPlay = false;
  var canvas = new Canvas("field", 0);
  var gridAttr = { count: {x: 20, y: 20}, cell: {x: 10, y: 10}};

  canvas.makeGrid(gridAttr);
  canvas.clearGrid();

  bindHandlers(canvas, onPlay);
});
