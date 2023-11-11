const pool = require('../repositories/repository_postgre');
const format = require('pg-format');

exports.GetByFilter = async ( dateIni, dateFin, id ) =>{
    let filter = "";
    let at = [];
    if(dateIni) at.push(['ip.fecha','ini',dateIni])
    if(dateFin) at.push(['ip.fecha','fin',dateFin])
    if(id) at.push(['ip.producto_id','other',id])
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
        const response = await pool.query(`SELECT ip.id, ip.cantidad, to_char( ip.fecha, 'YYYY-MON-DD') as fecha, ip.producto_id, ip.usuario_id, producto.nombre as nombreProducto, usuario.nombre as nombreUsuario FROM ingreso_producto ip INNER JOIN producto ON producto.id = ip.producto_id INNER JOIN usuario ON usuario.cedula = ip.usuario_id ${filter}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-ingresoP.GetByDate = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Store = async ( ingresos ) =>{
    try{
        const response = await pool.query(format('INSERT INTO ingreso_producto (cantidad, fecha, producto_id, usuario_id) VALUES %L', ingresos));
        return true
    }catch(err){
        console.log(" err orm-ingresoP.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}