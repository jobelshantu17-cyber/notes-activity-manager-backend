//Import Activity model
const Activity = require("../models/activityModel")

//Create activity controller
const createActivity = async (req,res) => {
    try{
        // 1. Get title and date from request body
        const { title, date } = req.body;

        // 2. Validate input
        if (!title || !date) {
            return res.status(400).json({ message: "Title and date are required" })
        }

        // 3. Get userId from req.user
        const userId = req.user.userId

        // 4. Create activity (status defaults to pending)
        const activity = await Activity.create({
            title,
            date,
            userId
            //status default to pending
        });

        // 5. Send response
        res.status(201).json({
            message: "Activity created successfully",
            activity
        })

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });

    }
}


//Get today's activities controller
const getTodayActivities = async (req, res) => {
    try{

        // 1. Get userId from req.user
        const userId = req.user.userId;

        // 2. Calculate start of today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // 3. Calculate end of today
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);

        // 4. Find activities for this user within today
        const activities = await Activity.find({
            userId,
            date: {
                $gte: startOfToday,
                $lte: endOfToday
            }
        }).sort({ createdAt: -1 })

        // 5. Send response
        res.status(200).json({
            count: activities.length,
            activities
        });

    }catch(err){
        console.log(error);
        res.status(500).json({ message: "Server error" })
        
    }
}


//Update activity status controller
const updateActivityStatus = async (req, res) => {
    try{

        // 1. Get activityId from params
        const { activityId } = req.params;

        // 2. Get status from request body
        const { status } = req.body;
        
        //Validate status
        if (!status || !["pending", "completed"].includes(status)){
            return res.status(400).json({ message: "Invalid status" })
        }

        // 3. Get userId from req.user
        const userId = req.user.userId;

        // 4. Find activity by id
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" })
        }

        // 5. Check ownership 
        if (activity.userId.toString() !== userId){
            return res.status(403).json({ message: "Not authorized to update this activity" })
        }
        
        // 6. Update status
        activity.status = status;
        await activity.save();

        // 7. send response
        res.status(200).json({
            message: "Activity status updated",
            activity
        });


    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" })
        
    }
} 

//Delete activity controller
const deleteActivity = async (req, res) => {
    try{
        // 1. Get userId from params
        const { activityId } = req.params;

        // 2. Get userIdfrom req.user
        const userId = req.user.userId;

        // 3. Find activity by id
        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" })
        }

        // 4. Check ownership
        if (activity.userId.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this activity" })
        }

        // 5. Delete activity
        await activity.deleteOne();

        // 6. Send response
        res.status(200).json({ message: "Activity deleted successfully" })
        
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" })
        
    }
}


module.exports = { 
    createActivity,
    getTodayActivities,
    updateActivityStatus,
    deleteActivity
 };

