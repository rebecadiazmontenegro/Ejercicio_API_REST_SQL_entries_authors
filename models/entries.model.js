const queries = require("../queries/entries.queries"); // Queries SQL
const pool = require("../config/db_pgsql");

// GET http://localhost:3000/api/entries --> ALL
const getAllEntries = async () => {
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getAllEntries);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }

  return result;
};

// GET http://localhost:3000/api/entries?email=[email] --> por email
const getEntriesByEmail = async (email) => {
  let client, result;

  try {
    client = await pool.connect(); // Espera a abrir conexion
    const data = await client.query(queries.getEntriesByEmail, [email]);
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

// PUT http://localhost:3000/api/entries
const editEntry = async (entryData) => {
  const { title, content, id_author, category, title_original } = entryData;
  let client, result;

  try {
    client = await pool.connect();
    const values = [title, content, id_author, category, title_original];
    const res = await client.query(queries.editEntry, values);
    result = res.rowCount; // número de filas afectadas
  } catch (err) {
    console.error("Error al editar la entry:", err);
    throw err;
  } finally {
    if (client) client.release();
  }

  return result;
};

// DELETE http://localhost:3000/api/entries
const deleteEntry = async (title) => {
  let client, result;
  try {
    client = await pool.connect(); // Conexión a la BD
    const res = await client.query(queries.deleteEntry, [title]);
    result = res.rowCount; // Dice el número de filas eliminadas
  } catch (err) {
    console.error("Error al eliminar la entry:", err);
    throw err;
  } finally {
    if (client) client.release();
  }
  return result;
};

const entries = {
  getEntriesByEmail,
  getAllEntries,
  editEntry,
  deleteEntry
};

module.exports = entries;
