const express = require("express"); //Esta importando express

const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

require("dotenv").config();

app.use(express.json());

//Middleware para 404 not found
const error404 = require("./middlewares/error404");

//Morgan
const morgan = require("./middlewares/morgan");
// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));

const entriesRoutes = require("./routes/entries.routes");
const authorsRoutes = require("./routes/authors.routes");

// http://localhost:3000/
app.get("/", (request, response) => {
  //El primer parametro envia petición y el siguiente respustas
  response.send("Hello World!");
});

//Rutas creadas
app.use('/api/entries',entriesRoutes); 
app.use('/api/authors',authorsRoutes); 

app.use(error404); // Manejo de rutras no encontradas

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});


