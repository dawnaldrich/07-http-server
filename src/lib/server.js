const http = require('http');
const cowsay = require('cowsay');
const bodyParser = require('./body-parser');
// const faker = require('faker');

const server = module.exports = {};

const app = http.createServer((req, res) => {
  bodyParser(req)
    .then((parsedRequest) => {
      // 1. write status head to headers
      // 2. write responsebody
      // 3. END the response


      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/time') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
          date: new Date(),
        }));
        // REMEMBER TO DO THIS
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/cowsay') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cowsayText = cowsay.say({ text: parsedRequest.url.query.text });
        res.write(`<section><h3><a href="/time">Click here for current time</a></h3><pre>${cowsayText}</pre></section>`);
        res.end();
        return undefined;
      }

      if (parsedRequest.method === 'GET' && parsedRequest.url.pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<header><nav><ul><li><a href="/cowsay">cowsay</a></li></ul></nav></header><main>This is' +
          ' a Vanilla HTTP Server defining all route behavior and exporting an interface to start and stop the server.</main>');
        res.end();
        return undefined;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.write('NOT FOUND');
      res.end();
      return undefined;
    })

    .catch((err) => {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('BAD REQUEST', err);
      res.end();
      return undefined;
    });
});

server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
