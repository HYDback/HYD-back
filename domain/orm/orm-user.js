const pool = require('../repositories/repository_postgre');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../util/keys');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("../../util/account_transport.json");

exports.GetAll = async () =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE tipo = 'Operador'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetAll = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetById = async ( Id ) =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE cedula = ${Id}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByEmail = async ( email ) =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE correo = '${email}'`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetByEmail = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.GetByNick = async ( nick ) =>{
    try{
        const response = await pool.query(`SELECT * FROM usuario WHERE nick = ${nick}`);
        return response.rows;
    }catch(err){
        console.log(" err orm-user.GetByNick = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.Store = async ( cedula, nombre, correo, nick, contra, tipo, estado ) =>{
    try{
        const pswHash = bcrypt.hashSync(contra, 10);
        const response = await pool.query(`INSERT INTO usuario (cedula, nombre, correo, nick, contra, tipo, estado) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [cedula, nombre, correo, nick, pswHash, tipo, estado]);
        return true
    }catch(err){
        console.log(" err orm-user.Store = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.DeleteById = async ( Id ) =>{
    try{
        const response = await pool.query(`DELETE FROM usuario WHERE cedula = ${Id}`);
        return true
    }catch(err){
        console.log(" err orm-user.DeleteById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.UpdateById = async ( estado, cedula ) =>{
    try{
        const response = await pool.query(`UPDATE usuario SET estado = $1 WHERE cedula = $2`, [estado, cedula]);
        return true
    }catch(err){
        console.log(" err orm-user.UpdateById = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}


exports.Signin = async (nick, contra) => {
    try{
        const user = await pool.query(`SELECT * FROM usuario WHERE nick = $1 AND estado = $2`, [nick, 'ACTIVO']);
        if(user.rowCount>0){
            const dataUser = user.rows[0];
            const match = await bcrypt.compare(contra, dataUser.contra);
            if(match){
                return await {token: jwt.sign({ dataUser }, config.KEY)};
            }else{
                return false
            }
        }else{
            return false
        }      
    }catch(err){
        console.log(" err orm-user.Signin = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}

exports.verifyToken = async (token) => {
    try{
        const decoded = jwt.verify(token, config.KEY);
        if(decoded){
            return {decoded}
        }else{
            return false
        }    
    }catch(err){
        console.log(" err orm-user.verifyToken = ", err);
        return await {err:{code: 123, messsage: err}}
    }
}