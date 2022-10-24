const { thought, Thought } = require('../models');

module.export = {

getThoughts(req, res) {
    Thought.find()
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
},

getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
        !thought
            ? res.status(404).json({ message: 'No thought with that ID'})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},

createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => res.json)
    .catch((err) => res.status(500).json(err));
},

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