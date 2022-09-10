const http = require("http");
const app = require("./app");
const dbConfig = require("./config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.NODE_DOCKER_PORT || "8080");
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  // const address = server.address();
  //   const bind =
  //     typeof address === "string" ? "pipe " + address : "port: " + port;
  //   switch (error.code) {
  //     case "EACCES":
  //       console.error(bind + " requires privileges.");
  //       process.exit(1);
  //       break;
  //     case "EADDRINUSE":
  //       console.error(bind + " is alread in use.");
  //       process.exit(1);
  //       break;
  //     default:
  //       throw error;
  //   }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on(port, () => {
  // const address = server.address();
  // const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log(`Listening on  ${port}`);
  console.log(process.env.jwt);
});

server.listen(port);
