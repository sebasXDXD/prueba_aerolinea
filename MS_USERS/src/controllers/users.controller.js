import { getUsers, createUser, getUsersMillas } from "../models/usersModel.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const createUserController = async (req, res) => {
  const { millas, age, identification_number } = req.body;
  const userMillas = await getUsersMillas(identification_number);
  const millasC = parseFloat(userMillas[0][0].millas_totales);
  const millasT = millasC + millas;
  const ticket_price = millas * 100;
  const traveler = {
    ticketPrice: ticket_price,
    age: age, // Edad del viajero
    frequency: userMillas[0][0].num_viajes, // Número de veces que ha viajado este año//
  };

  // Reglas de negocio
  const frequentDiscount = traveler.frequency >= 10 ? 0.1 : 0.05; // Descuento por ser viajero frecuente
  const seniorDiscount = traveler.age >= 65 ? 0.03 : 0; // Descuento por ser mayor de 65 años

  let finalPrice;
  let discount
  if (traveler.age <= 2) {
    finalPrice = traveler.ticketPrice * 0.1; // Niños menores de 2 años pagan el 10% de la tarifa
    discount = 0.9;
  } else {
    discount = frequentDiscount + seniorDiscount; // Descuento total
    finalPrice = traveler.ticketPrice * (1 - discount); // Precio final con descuentos
  }

  // Actualizar el precio del tiquete del viajero
  traveler.ticketPrice = finalPrice;

  try {
    const { first_name, last_name, phone_number, email, visa_expiration_date, origin_date } = req.body;
    const newUser = await createUser(identification_number, first_name, last_name, phone_number, email, age, visa_expiration_date, traveler.ticketPrice, millas, origin_date);

    const newUserReturn = {
      id: newUser.id,
      identification_number: newUser.identification_number,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      phone_number: newUser.phone_number,
      email: newUser.email,
      age: newUser.age,
      visa_expiration_date: newUser.visa_expiration_date,
      ticket_price: newUser.ticket_price,
      millas: millasT,
      total_discount:discount * 100,
      origin_date:origin_date
    };

    res.status(201).json(newUserReturn);
  } catch (error) {
    return res.status(500).json({ message: "Error al guardar" });
  }
};
