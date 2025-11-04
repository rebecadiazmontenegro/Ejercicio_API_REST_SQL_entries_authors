const queries = require("../queries/authors.queries"); // Queries SQL
const pool = require("../config/db_pgsql");

// GET http://localhost:3000/api/authors
const getAllAuthors = async () => {
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getAllAuthors);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

// GET http://localhost:3000/api/authors?email=[email]
const getAuthorsByEmail = async (email) => {
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getAuthorsByEmail, [email]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    // Bloque opcional, cierra la conexión a la base de datos si hay algún problema
    client.release();
  }

  return result;
};

// POST http://localhost:3000/api/authors/ 
const createAuthor = async (author) => {
  const { name, surname, email, image } = author;
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.createAuthor, [
      name,
      surname,
      email,
      image,
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

// PUT http://localhost:3000/api/authors/
const editAuthor = async (authorData) => {
  const { name, surname, email, image, id_author } = authorData;
  let client, result;

  try {
    client = await pool.connect();
    const values = [name, surname, email, image, id_author];
    const res = await client.query(queries.editAuthor, values);
    result = res.rowCount; // número de filas afectadas
  } catch (err) {
    console.error("Error al editar la entry:", err);
    throw err;
  } finally {
    if (client) client.release();
  }

  return result;
};

// DELETE http://localhost:3000/api/authors?email=[email]
const deleteAuthor = async (email) => {
  let client, result;

  try {
    client = await pool.connect(); // Conexión a la BD
    const res = await client.query(queries.deleteAuthor, [email]);
    result = res.rowCount; // Dice el número de filas eliminadas
  } catch (err) {
    console.error("Error al eliminar la entry:", err);
    throw err;
  } finally {
    if (client) client.release();
  }
  
  return result;
};

const authors = {
  getAllAuthors,
  getAuthorsByEmail,
  createAuthor,
  editAuthor,
  deleteAuthor,
};

module.exports = authors;
