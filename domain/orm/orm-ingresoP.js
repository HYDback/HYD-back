const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id, ingreso_producto.cantidad, to_char( ingreso_producto.fecha, 'YYYY-MON-DD') as fecha, ingreso_producto.producto_id, ingreso_producto.usuario_id, producto.nombre, usuario.nombre FROM ingreso_producto INNER JOIN producto ON producto.id = ingreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = ingreso_producto.usuario_id`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id, ingreso_producto.cantidad, to_char( ingreso_producto.fecha, 'YYYY-MON-DD') as fecha, ingreso_producto.producto_id, ingreso_producto.usuario_id, producto.nombre, usuario.nombre FROM ingreso_producto INNER JOIN producto ON producto.id = ingreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = ingreso_producto.usuario_id WHERE producto_id = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByUsu = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id, ingreso_producto.cantidad, to_char( ingreso_producto.fecha, 'YYYY-MON-DD') as fecha, ingreso_producto.producto_id, ingreso_producto.usuario_id, producto.nombre, usuario.nombre FROM ingreso_producto INNER JOIN producto ON producto.id = ingreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = ingreso_producto.usuario_id WHERE usuario_id = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByDate = async ( Dateini, Datefin ) =>{
    try{
        const response = await pool.query(`SELECT ingreso_producto.id, ingreso_producto.cantidad, to_char( ingreso_producto.fecha, 'YYYY-MON-DD') as fecha, ingreso_producto.producto_id, ingreso_producto.usuario_id, producto.nombre, usuario.nombre FROM ingreso_producto INNER JOIN producto ON producto.id = ingreso_producto.producto_id INNER JOIN usuario ON usuario.cedula = ingreso_producto.usuario_id WHERE fecha_ing >= '${Dateini}' AND fecha_ing <= '${Datefin}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Store = async ( ingresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO ingreso_producto (cantidad, producto_id, usuario_id) VALUES %L', ingresos));
        return true
    }catch(err){
        console.log(" err orm-ingresoP.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}