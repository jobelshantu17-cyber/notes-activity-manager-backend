const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")
const { createNote, getAllNotes, updateNote, deleteNote } = require("../controllers/noteController");

//Protected route
router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getAllNotes)
router.put("/:noteId", authMiddleware, updateNote)
router.delete("/:noteId", authMiddleware, deleteNote)

module.exports = router;