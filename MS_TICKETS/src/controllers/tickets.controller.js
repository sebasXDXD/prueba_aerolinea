import { getTickets, createTicket } from "../models/ticketModel.js";
import PDFDocument from "pdfkit";

import nodemailer from "nodemailer";

export const getTicketsController = async (req, res) => {
  try {
    const tickets = await getTickets();
    res.json(tickets);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};


export const createTicketController = async (req, res) => {
  const num = Math.floor(Math.random() * 30) + 1; 
  const char = String.fromCharCode(Math.floor(Math.random() * 3) + 65); 
  const chair_num = num + char;
  try {
    const { mail, passenger_name, passenger_lastname, origin, origin_date, destination, return_date, flight_type,price,identification_number } = req.body;
  
    const newTicket = await createTicket(identification_number,passenger_name, passenger_lastname, origin, origin_date, destination, return_date, flight_type, chair_num);
    const doc = new PDFDocument();
    const filename = `ticket-${newTicket.id}.pdf`;

    // Crear un buffer en memoria
    const buffer = await new Promise((resolve, reject) => {
      let buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });

      // Generar el archivo PDF en memoria
      doc.text(`Nombre del pasajero: ${newTicket.passenger_name} ${newTicket.passenger_lastname}`);
      doc.text(`Origen: ${newTicket.origin}`);
      doc.text(`Fecha de salida: ${newTicket.origin_date}`);
      doc.text(`Destino: ${newTicket.destination}`);
      doc.text(`Fecha de regreso: ${newTicket.return_date}`);
      doc.text(`Tipo de vuelo: ${newTicket.flight_type}`);
      doc.text(`Número de asiento: ${newTicket.chair_num}`);
      doc.text(`Precio total del ticket: ${price}$ pesos`);
      doc.end();
    });

    const mailOptions = {
      from: "sebastianurbina.idetp@gmail.com",
      to: mail,
      subject: `Ticket de avion con identificacion ${newTicket.id}`,
      text: "Adjunto se encuentra su ticket de vuelo",
      attachments: [{ filename: filename, content: buffer }],
    };

    // Enviar el PDF del ticket por correo electrónico
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: "sebastianurbina.idetp@gmail.com",
        pass: "atukrffbdzagryne",
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });

    return res.status(200).json({ message: "Correo enviado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al guardar", error });
  }
};
