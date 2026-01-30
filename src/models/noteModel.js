//Import mongoose
const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    //Create section schema (heading, content)
    heading: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    }
});

//Create note schema (title, sections, userId)
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    sections: {
        type: [sectionSchema],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

},

//Enable timestamps
{
    timestamps: true
});

//Export note model
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;

