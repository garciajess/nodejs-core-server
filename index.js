console.log('Hello from Node.js!');

// bring in object
// const person = require('./person.js');
// console.log(person.name);

// bring in Person Class
// const Person = require('./person');
// const person1 = new Person('John Doe', 30); // instantiate person1 from Person object
// person1.greeting();

/////////////////////////////////////////////////////////////////////////////////

const http = require('http');
const path = require('path');
const fs = require('fs');

// create new server object
const server = http.createServer((req, res) => {
  //   if (req.url === '/') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'index.html'),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-Type': 'text/html' });
  //         res.end(content);
  //       }
  //     );
  //   }
  //   if (req.url === '/about') {
  //     fs.readFile(
  //       path.join(__dirname, 'public', 'about.html'),
  //       (err, content) => {
  //         if (err) throw err;
  //         res.writeHead(200, { 'Content-Type': 'text/html' });
  //         res.end(content);
  //       }
  //     );
  //   }
  //   if (req.url === '/api/users') {
  //     const users = [
  //       { name: 'Bob Smith', age: 40 },
  //       { name: 'John Doe', age: 30 },
  //     ];
  //     res.writeHead(200, { 'Content-Type': 'application/json' });
  //     res.end(JSON.stringify(users));
  //   }

  // build file path
  // loads index.html else loads whatever file specified
  let filePath = path.join(
    __dirname,
    'public',
    req.url === '/' ? 'index.html' : req.url
  );
  // extension of file
  let extname = path.extname(filePath);
  // initial content type
  let contentType = 'text/html';
  // check ext and set content type to serve correct response
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // means page not found
        fs.readFile(
          path.join(__dirname, 'public', '404.html'),
          (err, content) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf8');
          }
        );
      } else {
        // some server error
        res.writeHead(500);
        res.end(`Sever Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});
const PORT = process.env.PORT | 5300; // if not found
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
