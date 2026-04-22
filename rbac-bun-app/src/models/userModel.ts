import pool from "../config/database";

export const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

export const createUser = async (data: any) => {
  await pool.query(
    "INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)",
    [data.username, data.password, data.role_id]
  );
};

export const deleteUser = async (id: number) => {
  await pool.query("DELETE FROM users WHERE id = ?", [id]);
};