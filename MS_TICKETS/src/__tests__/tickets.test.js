import request from 'supertest';
import app from '../app';

describe('POST /api/tickets', () => {
  it('should create a new ticket and send an email', async () => {
    const newTicket = {
      mail: 'test@example.com',
      passenger_name: 'John',
      passenger_lastname: 'Doe',
      origin: 'Mexico City',
      origin_date: '2023-04-15',
      destination: 'New York',
      return_date: '2023-04-20',
      flight_type: 'round-trip',
      price: 25100,
      identification_number: '13213213213'
    };

    const response = await request(app)
      .post('/api/tickets')
      .send(newTicket)
      .set('Content-Type', 'application/json');

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Correo enviado');
  });
});