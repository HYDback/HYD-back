const pool = require('../repositories/repository_postgre');

exports.GetAll = async () =>{
    try{
        const response = await pool.query('SELECT * FROM categoria');
        return response.rows;
    }catch(err){
        console.log(" err orm-categoria.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetNombres = async () =>{
    try{
        const response = await pool.query('SELECT nombre FROM categoria group by nombre');
        return response.rows;
    }catch(err){
        console.log(" err orm-categoria.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM categoria WHERE id = '${Id}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-categoria.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByFilter = async ( nombre, estado ) => {
    let filter = "";
    let at = [];
    if(nombre) at.push(['nombre',nombre])
    if(estado) at.push(['estado',estado])
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
        const response = await pool.query(`SELECT * FROM categoria ${filter} ORDER BY id`);
        return response.rows;
    }catch(err){
        console.log(" err orm-categoria.GetByFilter = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( nombre, descripcion, estado ) =>{
    try{
        const response = await pool.query(`INSERT INTO categoria (nombre, descripcion, estado) VALUES ($1, $2, $3)`, [nombre, descripcion, estado]);
        return true
    }catch(err){
        console.log(" err orm-categoria.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Update = async ( estado, id ) =>{
    try{
        const response = await pool.query(`UPDATE categoria SET estado = $1 WHERE id = $2`, [estado, id]);
        return true
    }catch(err){
        console.log(" err orm-categoria.Update = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}