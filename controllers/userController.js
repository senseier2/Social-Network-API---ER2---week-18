const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
//Get all users
getUsers(req, res) {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
},

//get a single user by their ID
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
        .select('-_v')
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID'})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},
    
//create a new user
createNewUser(req, res) {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
},

//update an existing user
updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No application with this id!'})
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},

//delete one user
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},

// Add user friend via POST route
addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId},
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((user) =>
    !user
        ? res.status(404).json({ message: 'No friends with that ID'})
        : res.json(user)
    )
    .catch(err => res.json(err));
},

// Remove friend via DELETE route from the users friend list
deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId }},
        {runValidators: true, new: true }
    )
    .then((user) => {
    !user
        ? res.status(404).json({ message: 'No friends with that ID. Try Again!'})
        : res.json(user)
    })
    .catch(err => res.json(err));
}

};



    
