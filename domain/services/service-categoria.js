const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormCategoria = require('../orm/orm-categoria');

exports.GetAll = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        respOrm = await ormCategoria.GetAll();
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.GetNombres = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        respOrm = await ormCategoria.GetNombres();
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = data.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}

exports.GetById = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const id = req.params.id;
        respOrm = await ormCategoria.GetById(id);
        if(respOrm && respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            if (respOrm) {
                message = 'Success Response', data= respOrm, statusCode = enum_.CODE_OK;
            }else{
                status = false, errorCode = enum_.ID_NOT_FOUND, message = 'ID NOT FOUND', statusCode = enum_.CODE_NOT_FOUND;
            }
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}

exports.GetByFilter = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { nombre, estado } = req.body;
        respOrm = await ormCategoria.GetByFilter( nombre, estado );
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = enum_.CODE_OK;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
}

exports.GetFilters = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        respOrm = await ormCategoria.getFilters();
        if(respOrm.err){
            status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
        }else{
            message = 'Success Response', data = respOrm, statusCode = enum_.CODE_OK;
        }
        resp = await magic.ResponseService(status,errorCode,message,data);
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        resp = await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,'');
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp);
    }
}


exports.Store = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { nombre, descripcion, estado } = req.body;
        if( nombre && descripcion && estado ){
            respOrm = await ormCategoria.Store( nombre, descripcion, estado );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Material created', statusCode = enum_.CODE_CREATED;
            }
        }else{
            status = false, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,'err',''));
    }
}

exports.UpdateById = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { estado, id } = req.body;
        if( estado && id ){
            respOrm = await ormCategoria.Update( estado, id );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Categoria actualizada', statusCode = enum_.CODE_CREATED;
            }
        }else{
            status = false, errorCode = enum_.ERROR_REQUIRED_FIELD, message = 'All fields are required', statusCode = enum_.CODE_BAD_REQUEST;
        }
        resp = await magic.ResponseService(status,errorCode,message,data)
        return res.status(statusCode).send(resp);
    } catch(err) {
        console.log("err = ", err);
        return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(await magic.ResponseService('Failure',enum_.CRASH_LOGIC,err,''));
    }
}