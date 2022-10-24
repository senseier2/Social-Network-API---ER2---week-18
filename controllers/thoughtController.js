const { thought, Thought, User } = require('../models');

module.export = {

//Get all thoughts
getThoughts(req, res) {
    Thought.find()
    .select('-_v')
    .sort({ createdAt: -1 })
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
},

//Get a single thought by the thought ID
getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .select('-_v')
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},

//Create a thought (associate user ID)
createThought(req, res) {
    Thought.create(req.body)
    .then((thought => {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { thoughts: thought._id }},
            { new: true, runValidators: true }
        )
        console.log(thought);
        res.json(thought);
    }))
    .catch((err) => res.status(500).json(err));
},

//Update existing Thought
updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thoughts with this ID'})
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},

deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
        then((thought) =>
        !thought    
            ? res.status(404).json({ message: 'No thought with that ID '})
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
},

    
}