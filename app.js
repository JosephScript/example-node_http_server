var http = require('http');
var greetings = require('./greetings.js');
var fs = require('fs');

// instantiates the server object, using the http module
var server = http.createServer(function(request, response) {

  if(request.url === '/') {
    // if the URL is "/", respond with the index.html file
    response.writeHead(200, {'content-type': 'text/html'});
    fs.createReadStream('./index.html').pipe(response);
  } else if (request.url === '/hello') {
    // if the URL is "/hello", respond with the function "greetings.sayHello()"
    response.writeHead(200);
    response.write(greetings.sayHello());
    response.end();
  } else if (request.url.indexOf('/static/') === 0) {
    // if the url starts with '/static', then check to see if the file exists.
    // We have to prepend a '.' to tell it to look in our project.
    fs.exists('.' + request.url, function(exists) {
      if (exists) {
        // it exists, so send the file. We have to prepend a '.' to tell it to look in our project.
        fs.createReadStream('.' + request.url).pipe(response);
      } else {
        // if the file doesn't exist, response with a 404 not found
        response.writeHead(400);
        response.write('Not Found!');
        response.end();
      }
    });
  } else {
    // we don't have a URL for what the request asked for, so respond with a 404.
    response.writeHead(400);
    response.write('Not Found!');
    response.end();
  }
});

server.listen(8080);
