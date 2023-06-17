const express=require('express');
const router=express.Router();
const {userLogin,registerUser,getAllUsers,getUserById,updateUser}=require('../controllers/userController');
const jwtAuthorization = require('../middlewares/jwtMiddleware');

router.get('/',jwtAuthorization.verifyToken,getAllUsers);
router.get('/:id',jwtAuthorization.verifyToken,getUserById);
router.route('/').post(userLogin).post(registerUser);
router.put('/',jwtAuthorization.verifyToken,updateUser);

module.exports=router;

