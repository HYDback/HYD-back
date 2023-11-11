const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetByFilter = async ( dateIni, dateFin, producto_id, cliente_id ) =>{
    let filter = "";
    let at = [];
    if(dateIni) at.push(['ep.fecha','ini',dateIni])
    if(dateFin) at.push(['ep.fecha','fin',dateFin])
    if(producto_id) at.push(['ep.producto_id','other',producto_id])
    if(cliente_id) at.push(['ep.cliente_id','other',cliente_id])
    if(at.length > 0) filter += 'WHERE '
    for (let index = 0; index < at.length; index++) {
        if(index == 0){
            if(at[index][1]=='ini'){
                filter+= `${at[index][0]} >= '%${at[index][2]}%'`
            }else if(at[index][1]=='fin'){
                filter+= `${at[index][0]} <= '%${at[index][2]}%'`
            }else{
                filter+= `${at[index][0]} = '${at[index][2]}'`
            }
        }else{
            if(at[index][1]=='ini'){
                filter+= ` AND ${at[index][0]} >= '%${at[index][2]}%'`
            }else if(at[index][1]=='fin'){
                filter+= ` AND ${at[index][0]} <= '%${at[index][2]}%'`
            }else{
                filter+= ` AND ${at[index][0]} = '${at[index][2]}'`
            }
        }
    }
    try{
        const response = await pool.query(`SELECT ep.id, ep.cantidad, to_char( ep.fecha, 'YYYY-MON-DD') as fecha, ep.producto_id, ep.usuario_id, ep.cliente_id, producto.nombre as nombreproducto, usuario.nombre as nombreusuario, cliente.nombre as nombrecliente FROM egreso_producto ep INNER JOIN producto ON producto.id = ep.producto_id INNER JOIN usuario ON usuario.cedula = ep.usuario_id INNER JOIN cliente ON cliente.cedula = ep.cliente_id ${filter}`);
        console.log(response)
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( egresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO egreso_producto (cantidad, fecha, producto_id, usuario_id, cliente_id) VALUES %L', egresos));
        return true
    }catch(err){
        console.log(" err orm-egresoP.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}