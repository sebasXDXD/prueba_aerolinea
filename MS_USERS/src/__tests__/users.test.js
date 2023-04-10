import request from 'supertest';
import app from '../app';

describe('POST /api/users', () => {
    it('should create a new ticket and send an email', async () => {
        const newTicket = {
            identification_number: "21321323131213",
            first_name: "Pedro",
            last_name: "Mendoza",
            phone_number: "555-1234",
            email: "juan.perez@example.com",
            age: 66,
            visa_expiration_date: "2024-12-31",
            origin_date: "2024-12-31",
            millas: 300
        }

        const response = await request(app)
            .post('/api/users')
            .send(newTicket)
            .set('Content-Type', 'application/json');
        expect(response.statusCode).toBe(201); // 201 indica que el usuario ha sido creado satisfactoriamente
        expect(response.body).toMatchObject({
            id: 14,
            identification_number: "21321323131213",
            first_name: "Pedro",
            last_name: "Mendoza",
            phone_number: "555-1234",
            email: "juan.perez@example.com",
            age: 66,
            visa_expiration_date: "2024-12-31",
            ticket_price: 27600,
            millas: 300,
            total_discount: 8,
            origin_date: "2024-12-31"
        });

    });
});