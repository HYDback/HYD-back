const   express     = require('express'),
        router      = express.Router(),
        magic       = require('../util/magic'),
        categories       = require('../domain/services/service-categoria');

console.log('[[ CATEGORIES ]]'); 
magic.LogInfo('[GET] = /categories/')
magic.LogInfo('[GET] = /categories/:id')
magic.LogSuccess('[POST] = /categories/')
magic.LogSuccess('[POST] = /categories/filter')

router.get('/categories/', categories.GetAll);
router.get('/categories/nombres', categories.GetNombres);
router.get('/categories/filters', categories.GetFilters);
router.get('/categories/:id', categories.GetById);
router.post('/categories/', categories.Store);
router.put('/categories/', categories.UpdateById);
router.post('/categories/filter', categories.GetByFilter);

module.exports = router;