
import { pool } from "../db.js";

export const getUsers = async () => {
  try {
    const [rows] = await pool.query("SELECT id, identification_number, first_name, last_name, phone_number, email, age, visa_expiration_date,ticket_price,millas,origin_date FROM users;");
    return rows;
  } catch (error) {
    throw error;
  }
};
export const getUsersMillas = async (identification_number) => {
  try {
    const row = await pool.query("SELECT identification_number, IFNULL(SUM(millas), 0) AS millas_totales, COALESCE(COUNT(*), 0) AS num_viajes " +
      "FROM users " +
      `WHERE identification_number = ${identification_number} AND YEAR(origin_date) = 2023 `);
    return row;

  } catch (error) {
    throw error;
  }
};

export const createUser = async (identification_number, first_name, last_name, phone_number, email, age, visa_expiration_date, ticket_price, millas,origin_date) => {
  
  try {
    const [rows] = await pool.query(
      "INSERT INTO users (identification_number, first_name, last_name, phone_number, email, age, visa_expiration_date,ticket_price,millas,origin_date) VALUES (?, ?,?,?,?,?,?,?,?,?)",
      [identification_number, first_name, last_name, phone_number, email, age, visa_expiration_date, ticket_price, millas,origin_date]
    );
    return { id: rows.insertId, identification_number, first_name, last_name, phone_number, email, age, visa_expiration_date, ticket_price, millas,origin_date };
  } catch (error) {
    throw error;
  }
};