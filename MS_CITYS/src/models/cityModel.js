import { pool } from "../db.js";

export const getCitys = async () => {
  try {
    const [rows] = await pool.query(`SELECT city_iata, city_name,country_id FROM citys;`);
    return rows;
  } catch (error) {
    throw error;
  }
};
export const getCountryCitys = async (country_id) => {
  console.log("el id es :", country_id);
  try {
    const [rows] = await pool.query(`SELECT city_iata, city_name FROM citys WHERE country_id = ${country_id};`);
    return rows;
  } catch (error) {
    throw error;
  }
};