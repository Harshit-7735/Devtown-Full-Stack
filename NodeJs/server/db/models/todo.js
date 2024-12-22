const mongoose = require('mongoose')
const TodoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true,
        maxlength: 50 
    },

    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // it is a reference to the User model in the database 
        ref: 'User', // the name of the model to which it refers
    }
})
const Todo = mongoose.model('Todo', TodoSchema);
module.exports = {Todo}; // exporting the Todo model