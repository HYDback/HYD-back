const pool = require('../repositories/repository_postgre');

exports.GetAll = async () =>{
    try{
        const response = await pool.query('SELECT * FROM producto ORDER BY id');
        return response.rows;
    }catch(err){
        console.log(" err orm-product.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM producto WHERE id = '${Id}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-product.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByFilter = async ( nombre, estado, categoria_id) => {
    let filter = "";
    let at = [];
    if(nombre) at.push(['p.nombre',nombre])
    if(estado) at.push(['p.estado',estado])
    if(categoria_id) at.push(['p.categoria_id',categoria_id])
    if(at.length > 0) filter += 'WHERE '
    for (let index = 0; index < at.length; index++) {
        if(index == 0){
            if(at[index][0]=='nombre'){
                filter+= `${at[index][0]} LIKE '%${at[index][1]}%'`
            }else{
                filter+= `${at[index][0]} = '${at[index][1]}'`
            }
        }else{
            filter+= ` AND ${at[index][0]} = '${at[index][1]}'`
        }
    }
    try{
        const response = await pool.query(`SELECT p.*, c.nombre as categoria_nombre FROM producto as p INNER JOIN categoria as c ON p.categoria_id = c.id  ${filter} ORDER BY id`);
        return response.rows;
    }catch(err){
        console.log(" err orm-product.GetByFilter = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( nombre, descripcion, cantidad, estado, categoria_id ) =>{
    try{
        const response = await pool.query(`INSERT INTO producto (nombre, descripcion, cantidad, estado, categoria_id) VALUES ($1, $2, $3, $4, $5)`, [nombre, descripcion, cantidad, estado, categoria_id]);
        return true
    }catch(err){
        console.log(" err orm-product.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Update = async ( estado, id ) =>{
    try{
        const response = await pool.query(`UPDATE producto SET estado = $1 WHERE id = $2`, [estado, id]);
        return true
    }catch(err){
        console.log(" err orm-producto.Update = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}