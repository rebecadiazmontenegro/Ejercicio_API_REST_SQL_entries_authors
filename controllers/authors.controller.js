const pool = require("../config/db_pgsql");
const author = require("../models/authors.model"); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/authors --> ALL
// GET http://localhost:3000/api/authors?email=[email]

const getAuthors = async (req, res) => {
  try {
    let authors;
    if (req.query.email) {
      authors = await author.getAuthorsByEmail(req.query.email);
      if (!authors || authors.length === 0) {
        return res.status(404).json({ message: 'Autor no encontrado con ese correo electrónico' });
      }
    } else {
      authors = await author.getAllAuthors();
    }
    res.status(200).json(authors);
  } catch {
    console.error('Error al obtener los autores:', error);
    res.status(500).json({ message: 'Error al obtener los autores', error: error.message });
  }
};

// POST http://localhost:3000/api/authors/
const createAuthor = async (req, res) => {
  try{
  const newAuthor = req.body; // {title,content,email,category}
  const response = await author.createAuthor(newAuthor);
  res.status(201).json({
    message: `usuario creado: ${newAuthor.email}`,
  });
  } catch (error){
   console.error("Error al crear el autor:", error);
    res.status(500).json({
      message: "Error al crear el autor",
      error: error.message,
  });
  };
};

// PUT http://localhost:3000/api/authors/
const editAuthor = async (req, res) => {
  try {
    const { name, surname, email, image, id_author } = req.body;

    if (!id_author) {
      return res.status(400).json({
        message: "Debe especificarse el id del autor",
      });
    }

    const result = await author.editAuthor({
      name,
      surname,
      email,
      image,
      id_author,
    });

    if (result === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró ningún autor con ese id." });
    }

    res.status(200).json({ message: `usuario actualizado: ${email}` });
  } catch (error) {
    console.error("Error al actualizar el autor:", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

// DELETE http://localhost:3000/api/authors?email=[email]
const deleteAuthor = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Debe especificarse el email del autor" });
  }

  try {
    const deletedCount = await author.deleteAuthor(email);

    if (deletedCount === 0) {
      return res.status(404).json({ message: "No se encontró ningún autor" });
    }

    res.status(200).json({ message: `Se ha borrado ${email}` });
  } catch (err) {
    console.error("Error al eliminar la entry:", err);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  getAuthors,
  createAuthor,
  editAuthor,
  deleteAuthor
};
