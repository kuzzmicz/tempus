const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
   title: {
     type: String, 
     required: true, 
     minlength: 1, 
     trim: true
   }, 
   text:{
    type: String, 
    required: true, 
    minlength: 1, 
    trim: true
   }
}) 


const Note = mongoose.model('Note', NoteSchema);
module.exports = { Note }