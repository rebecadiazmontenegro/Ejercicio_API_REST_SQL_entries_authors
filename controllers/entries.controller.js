const pool = require("../config/db_pgsql");
const entry = require("../models/entries.model"); // Importar el modelo de la BBDD

// GET http://localhost:3000/api/entries --> ALL
// GET http://localhost:3000/api/entries?email=[email] --> por email
const getEntries = async (req, res) => {
  try {
    let entries;
    if (req.query.email) {
      entries = await entry.getEntriesByEmail(req.query.email);
      if (!entries || entries.length === 0) {
        return res
          .status(404).json({
            message: `No se han encontrado entries con el email: ${req.query.email}`,
          });
      }
    } else {
      entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
  } catch (error) {
    console.error("Error al obtener las entries:", error);
    res
      .status(500)
      .json({ message: "Error del servidor al obtener las entries" });
  }
};

// PUT http://localhost:3000/api/entries
const editEntry = async (req, res) => {
  try {
    const { title, content, id_author, category, title_original } = req.body;

    // Si no encuentra el título enseña este mensaje
    if (!title_original) {
      return res.status(400).json({
        message: "Debe especificarse eL título original de la entrada",
      });
    }

    // Llamar a la función creada en entries.model
    const result = await entry.editEntry({
      title,
      content,
      id_author,
      category,
      title_original,
    });

    if (result === 0) {
      // Si no encuentra ninguna entrada con ese título:
      return res
        .status(404)
        .json({ message: "No se encontró ninguna entrada con ese título." });
    }

    res.status(200).json({ message: `Se ha modificado la entry ${title}` });
  } catch (error) {
    console.error("Error al actualizar la entrada:", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};

// DELETE http://localhost:3000/api/entries?email=[email]
const deleteEntry = async (req, res) => {
  const { title } = req.query;

  if (!title) {
    return res
      .status(400)
      .json({ message: "Debe especificarse el título de la entrada" });
  }

  try {
    const deletedCount = await entry.deleteEntry(title);

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró ninguna entrada con ese título." });
    }

    res.status(200).json({ message: `Se ha borrado la entry ${title}` });
  } catch (err) {
    console.error("Error al eliminar la entry:", err);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

module.exports = {
  getEntries,
  editEntry,
  deleteEntry,
};
