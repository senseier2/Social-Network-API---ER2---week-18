const router = require('express').Router();


//Get all Users
const {
getUsers,

} = require('../../controllers/userController');


// /api/users
router.route('/').get(getUsers)

module.exports = router;

