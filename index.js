var http = require("http");
var exec = require('child_process').exec;

var server = http.createServer(function(request, response) {
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  });
  if (request.method === 'OPTIONS') {
    response.end();
  } else {
    let body = '';
    request.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    request.on('end', () => {
      let base64data = Buffer.from(body).toString('base64');
      exec('./sendMessage.sh ' + base64data, function (err, stdout, stderr) {
        response.write(stdout);
        response.end();
      });
    });
  }
});

server.listen(9838);
