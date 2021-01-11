const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  let filename = `.${q.pathname}`;
  if (filename === './') filename += 'index.html';
  fs.readFile(filename, (err, data) => {
    if (err) {
      const file = fs.readFileSync('./404.html', 'utf8');
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end(file);
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);