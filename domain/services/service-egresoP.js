const magic = require('../../util/magic');
const enum_ = require('../../util/enum');
const ormEgresoP = require('../orm/orm-egresoP');

exports.GetByFilter = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const {dateIni, dateFin, producto_id, cliente_id} = req.body;
        respOrm = await ormEgresoP.GetByFilter(dateIni, dateFin, producto_id, cliente_id);
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

exports.Store = async (req, res) =>{
    let status = true, errorCode ='', message='', data='', statusCode=0, resp={};
    try{
        const { egresos } = req.body;
        if( egresos ){
            respOrm = await ormEgresoP.Store( egresos );
            if(respOrm.err){
                status = false, errorCode = respOrm.err.code, message = respOrm.err.messsage, statusCode = enum_.CODE_BAD_REQUEST;
            }else{
                message = 'Egreso created', statusCode = enum_.CODE_CREATED;
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
