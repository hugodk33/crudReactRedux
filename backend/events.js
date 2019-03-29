const server = require("http").createServer();

const io = require("socket.io")(server, {
  path: "/",
  serveClient: true
});

io.origins((origin, callback) => callback(null, true));

server.listen(3001);

module.exports = (req, res, next) => {
  if (
    req.url.toLowerCase().startsWith("/categories") &&
    res.locals &&
    res.locals.body
  ) {
    switch (req.method) {
      case "POST":
        io.emit("CATEGORY_CREATED", res.locals.body);
        break;
      case "PUT":
        io.emit("CATEGORY_UPDATED", res.locals.body);
        break;
      case "DELETE":
        io.emit("CATEGORY_DELETED", res.locals.body);
        break;
    }
  }
  next();
};
