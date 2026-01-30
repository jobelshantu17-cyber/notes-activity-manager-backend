//Import Note model
const Note = require("../models/noteModel")

//Create note controller
const createNote = async (req, res) => {
      
    try{
        // 1. Get title and sections
        const { title, sections } = req.body;

        // 2. Validate input
        if (!title || !sections || sections.length === 0) {
            return res.status(400).json({ message: "Title and sections are required" })
        }

        // 3. Get userId from req.user
        const userId = req.user.userId;

        //crete note // 4. Save note
        const note = await Note.create({
            title,
            sections,
            userId
        });

        // 5. Send response
        res.status(201).json({
            message: "Note created successfully",
            note
        });



    }catch(err){
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }

}


//Get all notes controller
const getAllNotes = async (req, res) => {
    try{
        // 1. Get userId from req.user
        const userId = req.user.userId

        // 2. Fetch notes for this user
        const notes = await Note.find({ userId }).sort({ updatedAt: -1 });

        // 3. Return notes
        res.status(200).json({
            count: notes.length,
            notes
        });
        
    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" })

    }
};

//Update note controller
const updateNote = async (req, res) => {
    try{
        // 1. Get noteId from params
        // 2. Get userId from req.user
        const { noteId } = req.params;
        const userId = req.user.userId;
        const { title, sections } = req.body;

        // 3. Find note by id
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" })
        }

        // 4. Check ownership
        if (note.userId.toString() !== userId){
            return res.status(403).json({ message: "Not authorized to update this note" });
        }

        // 5. Update note
        if (title) note.title = title;
        if (sections) note.sections = sections;

        await note.save();

        // 6. Send response
        res.status(200).json({
            message: "Note updated successfully",
            note
        });



    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" })
    }
}



//Delete note controller

const deleteNote = async (req, res) => {
    try{
        // 1. Get noteId from params
        const { noteId } = req.params

        // 2. Get userId from req.user
        const userId = req.user.userId;

        // 3. Find note by id
        const note = await Note.findById(noteId);
        if(!note){
            return res.status(404).json({ message: "Note not found" })
        }

        // 4. Check ownership
        if (note.userId.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this note" })
        }

        // 5. Delete note
        await note.deleteOne();

        // 6. Send response
        res.status(200).json({ message: "Note deleted successfully" })
        
    }catch(err){
        console.log(error);
        res.status(500).json({ message: "Server error" })
        
    }
};



module.exports = { 
    createNote, 
    getAllNotes,
    updateNote,
    deleteNote
 }









