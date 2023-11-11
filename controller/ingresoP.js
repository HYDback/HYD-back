const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        ingresosP       = require('../domain/services/service-ingresoP');

console.log('[[ INGRESO PRODUCTOS ]]'); 
magic.LogInfo('[GET] = /ingresosP/')
magic.LogInfo('[GET] = /ingresosP/id/:id')
magic.LogInfo('[GET] = /ingresosP/usu/:id')
magic.LogSuccess('[POST] = /ingresosP/')

router.post('/ingresosP/', ingresosP.Store);
router.post('/ingresosP/filter', ingresosP.GetByFilter);


module.exports = router;