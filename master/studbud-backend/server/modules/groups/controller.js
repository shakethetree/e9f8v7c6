import Group from "./model";
import { Meetup } from "../meetups";

export const createGroup = async (req, res) => {
  const { name, description, category } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ error: true, message: "Name must be provided!" });
  } else if (typeof name !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Name must be a string!" });
  } else if (name.length > 32) {
    return res.status(400).json({ error: true, message: "Name too long!" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "Description must be provided!" });
  } else if (typeof description !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Description must be a string!" });
  } else if (description.length > 256) {
    return res.status(400).json({
      error: true,
      message: "Description must be 10 characters long!"
    });
  }

  const newGroup = new Group({ name, description });

  try {
    return res.status(201).json({ group: await newGroup.save() });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Error creating Group" });
  }
};

// Greate a meetup contained within a group
export const createGroupMeetup = async (req, res) => {
  const { title, description, eventDate } = req.body;
  const { groupId } = req.params;

  if (!title) {
    return res
      .status(400)
      .json({ error: true, message: "Title must be provided!" });
  } else if (typeof title !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Title must be a string!" });
  } else if (title.length < 5) {
    return res
      .status(400)
      .json({ error: true, message: "Title must be 5 characters long!" });
  }

  if (!description) {
    return res
      .status(400)
      .json({ error: true, message: "Description must be provided!" });
  } else if (typeof description !== "string") {
    return res
      .status(400)
      .json({ error: true, message: "Description must be a string!" });
  } else if (description.length > 100) {
    return res.status(400).json({
      error: true,
      message: "Description too long!"
    });
  }

  if (!groupId) {
    return res
      .status(400)
      .json({ error: true, message: "Group ID must be provided" });
  }

  try {
    const { meetup } = await Group.addMeetup(groupId, {
      title,
      description,
      eventDate
    });

    return res.status(201).json({ error: false, meetup });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Meetup cannot be created!" });
  }
};

// When we want to get all the meetups contained in a group
export const getGroupMeetups = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res
      .status(400)
      .json({ error: true, message: "Group ID must be provided!" });
  }

  // Search to see if group exists
  const group = await Group.findById(groupId);

  // If no group has the ID provided
  if (!group) {
    return res
      .status(400)
      .json({ error: true, message: "Group does not exist." });
  }

  // If group ID exists, try to return meetups
  try {
    return res.status(200).json({
      error: false,
      meetups: await Meetup.find({ group: groupId }).populate("group", "name")
    });
  } catch (e) {
    return res
      .status(400)
      .json({ error: true, message: "Cannot fetch meetup" });
  }
};

export const getAllGroups = async (req, res) => {
  /*const { userId } = req.params;

  if(!userId) {
    return res.status(400).json({ error: true, message: 'Group ID must be provided!' });
  }

  // Search to see if group exists
  const user = await User.findById(userId);

  // If no group has the ID provided
  if(!user) {
    return res.status(400).json({ error: true, message: 'User does not exist.' });
  }*/

  // If group ID exists, try to return meetups
  /*try {
    return res.status(200).json({
      error: false,
      groups: await Group.find({ group: groupId }).populate('group', 'name')
    });
  } catch (e) {
    return res.status(400).json({ error: true, message: 'Cannot fetch meetup' });
  }*/

  try {
    return res.status(200).json({ groups: await Group.find({}) });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with Groups" });
  }
};
