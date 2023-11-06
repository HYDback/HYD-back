const userServices = require('../controller/user');
const productServices = require('../controller/product');
const materialServices = require('../controller/categoria');
const clienteServices = require('../controller/cliente');
const ingresoPServices = require('../controller/ingresoP');
const egresoPServices = require('../controller/egresoP');

const routers = (app) =>{
    app.use('/api/', userServices);
    app.use('/api/', productServices);
    app.use('/api/', materialServices);
    app.use('/api/', clienteServices);
    app.use('/api/', ingresoPServices);
    app.use('/api/', egresoPServices);
};

module.exports = routers;