function Canvas(selector) {
  thisCanvas = this;

  this.impl = document.getElementById("field");
  this.size = {
    x: parseInt(this.impl.getAttribute("width")), 
    y: parseInt(this.impl.getAttribute("height"))
  };
  this.grid = null;

  this.makeGrid = function(attr) {
    this.grid = new Array(attr.count.y);
    for(var i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(attr.count.x);
    }

    this.grid.lineWidth = typeof attr.lineWidth == "undefined" ? 0 : attr.lineWidth;
    if(this.grid.lineWidth != 0) this.drawGrid(attr);

    this.grid.fillCell = function(i, j, color) {
      var context = thisCanvas.impl.getContext("2d"); 
    
      context.beginPath();
      context.rect(j * 10, i * 10, 10 - this.lineWidth, 10 - this.lineWidth);
      context.fillStyle = color;
      context.fill();
    };

    this.grid.clear = function() {
      for(var i = 0; i < this.length; i++) {
        for (var j = 0; j < this[0].length; j++) {
          this[i][j] = 0;
          this.fillCell(i, j, "white");
        }
      }
    };
    
    this.grid.read = function(string) {
      var cells = string.split("");
      for(var i = 0; i < this.length; i++) {
        for (var j = 0; j < this[0].length; j++) {
          this[i][j] = parseInt(cells.shift());
          this.fillCell(i, j, (this[i][j] == 1 ? "blue" : "white"));
        }
      }
    };

  };

  this.drawGrid= function(attr) {
    var context = this.impl.getContext("2d"); 
    var lim = {
      x: attr.count.x * attr.cell.x - 0.5, 
      y: attr.count.y * attr.cell.y - 0.5};
  
    context.beginPath();
    context.moveTo(0, 0);
    for (var x = 0; x <= lim.x; x += attr.cell.x) {
      context.moveTo(x - 0.5, 0);
      context.lineTo(x - 0.5, lim.y);
    }
    for (var y = 0; y <= lim.y; y += attr.cell.y) {
      context.moveTo(0, y - 0.5);
      context.lineTo(lim.x, y - 0.5);
    }
  
    context.lineWidth = this.lineWidth;
    context.strokeStyle = "black";
    context.stroke();
  }

  this.getMousePos = function(event) {
    var rect = this.impl.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }
}
