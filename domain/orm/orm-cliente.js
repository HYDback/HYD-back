const pool = require('../repositories/repository_postgre');

exports.GetAll = async () =>{
    try{
        const response = await pool.query('SELECT * FROM cliente');
        return response.rows;
    }catch(err){
        console.log(" err orm-cliente.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM cliente WHERE cedula = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-cliente.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByFilter = async ( cedula, nombre, estado ) =>{
    let filter = "";
    let at = [];
    if(nombre != "") at.push(['nombre',nombre])
    if(cedula != "") at.push(['cedula',cedula])
    if(estado != "") at.push(['estado',estado])
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
        const response = await pool.query(`SELECT * FROM cliente WHERE ${filter}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-product.GetByFilter = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Store = async ( cedula, nombre, apellido, celular, correo, estado ) =>{
    try{
        const response = await pool.query(`INSERT INTO cliente (cedula, nombre, apellido, celular, correo, estado) VALUES ($1, $2, $3, $4, $5, $6)`, [cedula, nombre, apellido, celular, correo, estado]);
        return true
    }catch(err){
        console.log(" err orm-cliente.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}