const express = require("express")
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")
const { createActivity, getTodayActivities, updateActivityStatus, deleteActivity } = require("../controllers/activityController")

//protected Routes
router.post("/", authMiddleware, createActivity)
router.get("/", authMiddleware, getTodayActivities)
router.patch("/:activityId/status", authMiddleware,updateActivityStatus)
router.delete("/:activityId",authMiddleware, deleteActivity)

module.exports = router;