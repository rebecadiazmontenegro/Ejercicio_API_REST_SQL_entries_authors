const queries = {
  getAllAuthors: `
    SELECT * FROM authors
    `,

  getAuthorsByEmail: `
    SELECT *
    FROM authors
    WHERE email = $1
    `,

  createAuthor: `
    INSERT INTO authors (name, surname, email, image)
    VALUES ($1, $2, $3, $4)
    `,

  editAuthor: `
    UPDATE authors
    SET 
        name = $1,
        surname = $2,
        email = $3,
        image = $4
    WHERE id_author = $5
    `,

  deleteAuthor: `
    DELETE FROM authors
    WHERE email = $1
    `,
};

module.exports = queries;
