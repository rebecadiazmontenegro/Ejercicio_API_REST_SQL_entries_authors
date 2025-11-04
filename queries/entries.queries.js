const queries = {
  getAllEntries: `
    SELECT * FROM entries
    `,

  getEntriesByEmail: `
    SELECT 
        e.title,
        e.content,
        e.date,
        e.category,
        a.name,
        a.surname,
        a.email AS email_author,
        a.image
    FROM entries e
    INNER JOIN authors a
    ON e.id_author = a.id_author
    WHERE a.email = $1
    `,

  editEntry: `
    UPDATE entries
    SET 
        title = $1,
        content = $2,
        date = CURRENT_DATE,
        id_author = $3,
        category = $4
    WHERE title = $5
    `,

  deleteEntry: `
    DELETE FROM entries
    WHERE title = $1
    `,
};

module.exports = queries;
