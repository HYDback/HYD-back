const request = require('supertest');
const app = require('../server');

describe('Producto Endpoints', () => {
    test('deberia obtener todos los productos', async () => {
        const res = await request(app)
            .get('/api/products/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener productos filtrados por nombre', async () => {
        const res = await request(app)
            .post('/api/products/filter')
            .send({
                nombre: "Mesa de centro",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    })

    test('deberia obtener productos filtrados por estado', async () => {
        const res = await request(app)
            .post('/api/products/filter')
            .send({
                estado: "",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    })
});
