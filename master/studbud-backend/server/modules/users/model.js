import mongoose, { Schema } from "mongoose";

// Create User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    /*providerData: {
      uid: String,
      provider: String,
    },*/
    groups: [
      {
        type: Schema.Types.ObjectId,
        ref: "Group"
      }
    ]
  },
  { timestamps: true }
);

/*UserSchema.statics.findOrCreate = async function(args) {
  try {
    const user = await this.findOne({
      email: args.email,
      fullName: args.fullName
    });

    if (!user) {
      return await this.create(args);
    }

    return user;
  } catch (e) {
    return e;
  }
};*/

export default mongoose.model("User", UserSchema);
