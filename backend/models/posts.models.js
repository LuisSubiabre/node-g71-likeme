import pool from "../database/connection.js";

export const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

export const create = async (todo) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *";
  const { rows } = await pool.query(query, [
    todo.titulo,
    todo.img,
    todo.descripcion,
    todo.likes,
  ]);
  return rows[0];
};

// export const deletePost = async (id) => {
//   const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
//   const { rows } = await pool.query(query, [id]);
//   return rows[0];
// };
