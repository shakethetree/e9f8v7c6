import Meetup from "./model";

export const createMeetup = async (req, res) => {
  const { title, description, eventDate } = req.body;
  const newMeetup = new Meetup({ title, description, eventDate });

  try {
    return res.status(201).json({ meetup: await newMeetup.save() });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with Meetup" });
  }
};

export const getAllMeetups = async (req, res) => {
  try {
    return res.status(200).json({ meetups: await Meetup.find({}) });
  } catch (e) {
    return res
      .status(e.status)
      .json({ error: true, message: "Error with Meetup" });
  }
};

export const deleteMeetup = async (req, res) => {
  const { meetupId } = req.params;

  Meetup.findOneAndRemove({ _id: meetupId }).then(() =>
    res.json({ success: true })
  );
};
