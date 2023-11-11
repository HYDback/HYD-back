const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        egresosP       = require('../domain/services/service-egresoP');

console.log('[[ EGRESO PRODUCTOS ]]'); 
magic.LogInfo('[GET] = /egresosP/')
magic.LogInfo('[GET] = /egresosP/id/:id')
magic.LogInfo('[GET] = /egresosP/usu/:id')
magic.LogSuccess('[POST] = /egresosP/')

router.post('/egresosP/', egresosP.Store);
router.post('/egresosP/filter', egresosP.GetByFilter);


module.exports = router;