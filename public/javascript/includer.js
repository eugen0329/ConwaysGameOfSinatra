function include(filename) {
  $.ajax({
    url: filename,
    async: false,
    success: function(data) {
      eval(data);
    },
    error: function () {
      throw new Error("Error while loading script" + script);
    }
  });
}
