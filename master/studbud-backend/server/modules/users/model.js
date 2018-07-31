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

// Create a group and add it to the groups array in the group
UserSchema.statics.addGroup = async function(id, args) {
  const Group = mongoose.model("Group");

  // Add the User ID to the group user element
  // Keeps track of which user created the group
  const group = await new Group({ ...args, owner: id });

  // Find user with the given ID
  // Push the group id in the groups element
  await this.findByIdAndUpdate(id, { $push: { groups: group.id } });

  return {
    group: await group.save()
  };
};

export default mongoose.model("User", UserSchema);
