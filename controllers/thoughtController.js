const { Thought, User } = require('../models');

module.exports = {
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

//delete a thought by its id, remove the thought from its user document.
deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) =>
        !thought    
            ? res.status(404).json({ message: 'No thought with that ID '})
            : User.findOneAndUpdate(
                { username: req.params.username },
                {$pull: {thoughtText: params.id}},
                {new: true }
            )
        )
        .then(() => res.json({ message: 'Thought has been deleted.'}))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
},

//post a reaction stored with a thought - this affects the reaction array
createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
    .then((thought) => {
    !thought
        ? res.status(404).json({ message: 'No thought found with that ID.'})
        : res.json(thought);
    })
    .then(() => res.json({ message: 'The reaction has been created'}))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
},

//delete a reaction by its ID from thought
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        {$pull: {reactions: {reactionId: params.reactionId } } },
        { new: true }
    )
    .then(thought => res.json(thought))
    .catch(err => res.json(err));
}
    
};