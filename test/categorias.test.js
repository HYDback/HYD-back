const request = require('supertest');
const app = require('../server');

describe('categoria Endpoints', () => {
    test('deberia obtener todas las categorias', async () => {
        const res = await request(app)
            .get('/api/categoria/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener categoria por su nombre', async () => {
        const res = await request(app)
            .get('/api/products/'+1)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(res.body.Resp.data[0].nombre_prod).toEqual('Salas')
    });

    test('deberia obtener categorias filtradas por estado ', async () => {
        const res = await request(app)
            .post('/api/products/filter')
            .send({
                estado: "",
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    })
});
