const router = require('express').Router();


//Get all Users
const {
getUsers,
getSingleUser,
createNewUser,
updateUser,
deleteUser,

} = require('../../controllers/userController');


// /api/users
router.route('/')
    .get(getUsers)
    .post(createNewUser)

router
    .route('/:userId')
    .get(getSingleUser)
    .post(updateUser)
    .delete(deleteUser)

module.exports = router;

