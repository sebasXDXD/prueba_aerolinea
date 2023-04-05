import { pool } from "../db.js";

export const getTickets = async () => {
  try {
    const [rows] = await pool.query("SELECT id,identification_number,passenger_name,passenger_lastname,origin,origin_date,destination, return_date, flight_type,chair_num FROM tickets;");
    return rows;
  } catch (error) {
    throw error;
  }
};

export const createTicket = async (identification_number,passenger_name,passenger_lastname,origin,origin_date,destination, return_date, flight_type,chair_num ) => {
    try {
      const [rows] = await pool.query(
        "INSERT INTO tickets (identification_number,passenger_name,passenger_lastname,origin,origin_date,destination, return_date ,flight_type,chair_num ) VALUES (?,?,?,?,?,?,?,?,?)",
        [identification_number,passenger_name,passenger_lastname,origin,origin_date,destination, return_date, flight_type,chair_num ]
      );
      return {id:rows.insertId,identification_number, passenger_name,passenger_lastname,origin,origin_date,destination, return_date, flight_type,chair_num };
    } catch (error) {
      throw error;
    }
  };