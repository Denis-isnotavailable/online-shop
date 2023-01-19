const Router = require('express');
const brandController = require('../controllers/brandController');
const checkRole = require('../middleware/chekRoleMiddleware');

const router = new Router();

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);
router.delete('/:id', brandController.delete);

module.exports = router;