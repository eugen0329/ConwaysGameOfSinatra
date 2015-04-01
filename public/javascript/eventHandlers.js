function bindHandlers(canvas, onPlay) {
  setIntervalSync(function() {
      if(onPlay) mainLoop(canvas);
  }, 0);

  $("#btn-clear").on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    canvas.grid.clear();
  });

  $("#btn-rand").on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    $.get("/randomized", function(data) {
      canvas.grid.read(data);
    });
  });

  $("#btn-step").on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    $.post("/next-gen", "cells=" + canvas.grid.flatten().join(""), function(data) {
      canvas.grid.read(data);
    });
  });

  $("#field").mousedown(function(event) {
    event.preventDefault();
    event.stopPropagation();

    var mousePos = canvas.getMousePos(event);
    var i = Math.floor(mousePos.y/10);
    var j = Math.floor(mousePos.x/10);

    if(canvas.grid[i][j] == 0) {
      canvas.grid.fillCell(i, j, "blue");
      canvas.grid[i][j] = 1;
    } else {
      canvas.grid.fillCell(i, j, "white");
      canvas.grid[i][j] = 0;
    }
  });

  $("#btn-play").on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();

    if(onPlay) {
      setBtnsDisabled(false);
      onPlay = false;
    } else {
      setBtnsDisabled(true);
      onPlay = true;
    }
  });
}

function setBtnsDisabled(state) {
  $("#btn-step").attr("disabled", state);
  $("#btn-clear").attr("disabled",state);
  $("#btn-rand").attr("disabled", state);
}

function mainLoop(canvas) {
  $.ajax({
    type: "POST",
    url: "/next-gen",
    data: "cells=" + canvas.grid.flatten().join(""),
    async: false
    }).done(function(data) {
      //console.log(data);
      canvas.grid.read(data);
    });
}

var setIntervalSync = function(func, delay) {
  var intervalFunction, timeoutId, clear;
  // clear the interval.
  clear = function () {
    clearTimeout(timeoutId);
  };
  intervalFunction = function () {
    func();
    timeoutId = setTimeout(intervalFunction, delay);
  }
  // delay start.
  timeoutId = setTimeout(intervalFunction, delay);
  // for clearing(capture the ret funct)
  return clear;
};

