const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet,
        usersPost,
        usersPut,
        usersDelete,
        usersPatch } = require('../controllers/users.controller');
const { isRoleValid, emailExistInDb, userExistsById } = require('../helpers/db-validators');
const { validateField } = require('../middelwares/validate-fields');
const router = Router();


router.get('/', usersGet);

router.post('/',[
    check('username','username is required').not().isEmpty(),
    check('password','password is required and minimum 8 characters').isLength({min: 6}),
    check('email').custom( emailExistInDb ),
    check('rol').custom( isRoleValid ),
    validateField
] , usersPost);

router.put('/:id',[
    check('id', 'it is not a valid id').isMongoId(),
    check('id').custom(userExistsById),
    check('rol').custom( isRoleValid ),
    validateField
], usersPut);

router.delete('/:id',[
    check('id', 'it is not a valid id').isMongoId(),
    check('id').custom(userExistsById),
    validateField
], usersDelete);

router.patch('/', usersPatch);




module.exports = router;