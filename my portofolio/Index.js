const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const filePath = req.url === "/" ? "Index.html" : `.${req.url}`;

  const extname = path.extname(filePath);
  const contentType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".jpeg": "image/jpeg",
  }[extname] || "text/plain"; 

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/plain");
      res.end("404 Not Found");
      return;
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.end(data);
  });
});

const port = 1234;
server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
