// const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
//Get all users
getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},

//get a single user by their ID
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userID })
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},
    
createNewUser(req, res) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
},

updateUser(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.applicationID },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) =>
         !user
            ? res.status(404).json({message: 'No application with this id!'})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},

},



    
}