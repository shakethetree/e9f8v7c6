import mongoose, { Schema } from "mongoose";

const MeetupSchema = new Schema(
  {
    //change to name
    title: {
      type: String,
      required: true
      //maxLength: [25, 'Title must be at least 5 characters long']
    },
    description: {
      type: String
      //required: true,
      //maxLength: [256, 'Description must be at least 10 characters long']
    },
    //date
    eventDate: {
      type: Date
    },
    location: {
      type: String
      //required: true <--- UPDATE
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    ]
  } /*{ timestamps: true }*/
);

export default mongoose.model("Meetup", MeetupSchema);
