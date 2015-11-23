$(document).ready(function() {

  // get a reference to the content p-tag by id
  var content = $('#content');

  // make an ajax request to the current url, plus /hello.
  $.ajax('/hello').done(function(data) {

    // fill in the p tag with the data
    content.text(data);
  });

});
