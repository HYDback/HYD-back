const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT egreso_producto.id, egreso_producto.cantidad, to_char( egreso_producto.fecha, 'YYYY-MON-DD') as fecha, egreso_producto.producto_id, egreso_producto.usuario_id, egreso_producto.cliente_id, producto.nombre, usuario.nombre, cliente.nombre FROM egreso_producto INNER JOIN producto ON producto.id = egreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = egreso_producto.usuario_id INNER JOIN cliente ON cliente.cedula = egreso_producto.cliente_id`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT egreso_producto.id, egreso_producto.cantidad, to_char( egreso_producto.fecha, 'YYYY-MON-DD') as fecha, egreso_producto.producto_id, egreso_producto.usuario_id, egreso_producto.cliente_id, producto.nombre, usuario.nombre, cliente.nombre FROM egreso_producto INNER JOIN producto ON producto.id = egreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = egreso_producto.usuario_id INNER JOIN cliente ON cliente.cedula = egreso_producto.cliente_id WHERE producto_id = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT egreso_producto.id, egreso_producto.cantidad, to_char( egreso_producto.fecha, 'YYYY-MON-DD') as fecha, egreso_producto.producto_id, egreso_producto.usuario_id, egreso_producto.cliente_id, producto.nombre, usuario.nombre, cliente.nombre FROM egreso_producto INNER JOIN producto ON producto.id = egreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = egreso_producto.usuario_id INNER JOIN cliente ON cliente.cedula = egreso_producto.cliente_id WHERE usuario_id = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetByUsu = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByCli = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT egreso_producto.id, egreso_producto.cantidad, to_char( egreso_producto.fecha, 'YYYY-MON-DD') as fecha, egreso_producto.producto_id, egreso_producto.usuario_id, egreso_producto.cliente_id, producto.nombre, usuario.nombre, cliente.nombre FROM egreso_producto INNER JOIN producto ON producto.id = egreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = egreso_producto.usuario_id INNER JOIN cliente ON cliente.cedula = egreso_producto.cliente_id WHERE cliente_id = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetByCli = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT egreso_producto.id, egreso_producto.cantidad, to_char( egreso_producto.fecha, 'YYYY-MON-DD') as fecha, egreso_producto.producto_id, egreso_producto.usuario_id, egreso_producto.cliente_id, producto.nombre, usuario.nombre, cliente.nombre FROM egreso_producto INNER JOIN producto ON producto.id = egreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = egreso_producto.usuario_id INNER JOIN cliente ON cliente.cedula = egreso_producto.cliente_id WHERE fecha >= '${Dateini}' AND fecha <= '${Datefin}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-egresoP.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( egresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO egreso_producto (cantidad, producto_id, usuario_id, cliente_id) VALUES %L', egresos));
        return true
    }catch(err){
        console.log(" err orm-egresoP.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}