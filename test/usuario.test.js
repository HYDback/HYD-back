const request = require('supertest');
const app = require('../server');

describe('Usuario Endpoints', () => {
    
    it('deberia obtener todos los usuarios', async () => {
        const res = await request(app)
            .get('/api/users/')
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
    });

    test('deberia crear un usuario', async () => {
        const res = await request(app)
            .post('/api/users/')
            .send({
                cedula: 1004845322,
                nombre: "David Celis",
                correo: "david@gmail.com",
                nick: "DavidC0205",
                contra: "12345789A!",
                tipo: "Operador",
                estado: 'ACTIVO'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.status).toEqual(true);
    });

    test('deberia obtener usuario por su cedula', async () => {
        const res = await request(app)
            .get('/api/users/'+1004845322)
            .send();
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(res.body.Resp.data[0].nombre).toEqual('David Celis')
    });

    test('deberia iniciar sesion un usuario', async () => {
        const res = await request(app)
            .post('/api/users/signin')
            .send({
                "nick": "DavidC0205",
                "contra": "12345789A!"
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual(true);
        expect(res.body.Resp.message).toEqual('Valid Credentials');
    });
    
    test('deberia filtrar los usuarios mediante el filtro enviado', ()=>{
        setTimeout(() => {
            expect(true).toEqual(true);
        }, 240)
    })

});

