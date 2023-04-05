import {app} from '../app';
import request from 'supertest';

jest.mock('../controllers/tickets.controller', () => ({
  createTicket: jest.fn(),
}));

const { createTicket } = require('../controllers/tickets.controller');

describe('createTicketController', () => {
  it('should respond with status 200 and message "Correo enviado" if ticket is created and email is sent', async () => {
    // Mock the createTicket function to return a new ticket
    const mockTicket = {
      id: 1,
      passenger_name: 'John',
      passenger_lastname: 'Doe',
      origin: 'New York',
      origin_date: '2023-05-01',
      destination: 'Paris',
      return_date: '2023-05-10',
      flight_type: 'round-trip',
      chair_num: '12A',
    };
    createTicket.mockResolvedValue(mockTicket);

    const response = await request(app)
      .post('api/tickets')
      .send({
        mail: 'john.doe@example.com',
        passenger_name: 'John',
        passenger_lastname: 'Doe',
        origin: 'New York',
        origin_date: '2023-05-01',
        destination: 'Paris',
        return_date: '2023-05-10',
        flight_type: 'round-trip',
        price: 500,
        identification_number: '123456789',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Correo enviado');
  });

  it('should respond with status 500 and error message if there is an error', async () => {
    // Mock the createTicket function to throw an error
    const errorMessage = 'Error al guardar';
    createTicket.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const response = await request(app)
      .post('api/tickets')
      .send({
        mail: 'john.doe@example.com',
        passenger_name: 'John',
        passenger_lastname: 'Doe',
        origin: 'New York',
        origin_date: '2023-05-01',
        destination: 'Paris',
        return_date: '2023-05-10',
        flight_type: 'round-trip',
        price: 500,
        identification_number: '123456789',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(errorMessage);
  });
});
