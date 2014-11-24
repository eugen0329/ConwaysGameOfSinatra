function setBtnsDisabled(state) {
  $("#btn-step").attr("disabled", state);
  $("#btn-clear").attr("disabled",state);
  $("#btn-rand").attr("disabled", state);
}

function bindHandlers(canvas, onPlay) {
  $("#btn-clear").on("click", function(event) {  
    event.preventDefault(); 
    event.stopPropagation();
    canvas.clearGrid();
  });

  $("#btn-rand").on("click", function(event) {  
    event.preventDefault(); 
    event.stopPropagation();
    $.get("/randomized", function(data) {
      canvas.readGrid(data);
    });
  });

  $("#btn-step").on("click", function(event) {  
    event.preventDefault(); 
    event.stopPropagation();
    $.post("/next-gen", "cells=" + canvas.grid.flatten().join(""), function(data) {
      canvas.readGrid(data);
    });
  });

  $("#field").mousedown(function(event) {
    event.preventDefault(); 
    event.stopPropagation();

    var mousePos = canvas.getMousePos(event);
    var i = Math.floor(mousePos.y/10);
    var j = Math.floor(mousePos.x/10);

    if(canvas.grid[i][j] == 0) {
      canvas.fillCell(i, j, "blue");
      canvas.grid[i][j] = 1;
    } else {
      canvas.fillCell(i, j, "white");
      canvas.grid[i][j] = 0;
    }
  });

  $("#btn-play").on("click", function(event) {  
    event.preventDefault(); 
    event.stopPropagation();

    var gameLoop = function() {
      var a = 3;
      while(onPlay) {
        $.ajax({
          type: "POST", 
          url: "/next-gen", 
          data: "cells=" + canvas.grid.flatten().join(""), 
          async: false
          }).done(function(data) {
            console.log(data);
            canvas.readGrid(data);
          });
      }
    };

    if(onPlay) {
      setBtnsDisabled(false);
      onPlay = false;
    } else {
      setBtnsDisabled(true);
      onPlay = true;
      setTimeout(gameLoop, 0);
    }
  });
}
