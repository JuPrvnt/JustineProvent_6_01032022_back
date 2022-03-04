// Importation du package HTTP de node.js pour créer le serveur
const http = require("http");
const app = require("./app");

// La fonction normalizePort renvoie un port valide,
// qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
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

// Paramètrage du port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// La fonction errorHandler recherche les différentes erreurs et
// les gère de manière appropriée.
// Elle est ensuite enregistrée dans le serveur

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// La méthode createServer() prend en argument la fonction qui sera appelé à chaque
// requête reçue par le serveur -> les fonctions seront dans app.js
const server = http.createServer(app);

server.on("error", errorHandler);

// Un écouteur d'évènements est également enregistré,
// consignant le port ou le canal nommé sur lequel le serveur
// s'exécute dans la console.
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// Le serveur écoute les requêtes sur le port
server.listen(port);
