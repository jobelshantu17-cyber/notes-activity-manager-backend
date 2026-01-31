//Import mongoose
const mongoose = require("mongoose")

//Create activity schema
const activitySchema = new mongoose.Schema(
    {
        //Fields: title, date, status, userId
        title: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true
        },
        //Status should be pending by default
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending"
        },
        //userId should reference User
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    //Enable timestamps
    {
        timestamps: true
    }
);


//Export Activity model
const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;


