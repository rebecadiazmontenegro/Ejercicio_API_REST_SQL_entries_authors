const express = require("express"); //Esta importando express

const app = express(); //Creando el servidor
const port = 3000; //Puerto de pruebas

app.use(express.json());

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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});


