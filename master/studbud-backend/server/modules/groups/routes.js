import { Router } from "express";
import * as GroupController from "./controller";
import passport from "passport";

const routes = new Router();

routes.get("/groups/test", (req, res) => res.json({ msg: "Groups Works" }));

// @desc   Creates a new group
routes.post(
  "/groups/new",
  passport.authenticate("jwt", { session: false }),
  GroupController.createGroup
);

// @desc   Creates a new meetup with groupId
routes.post(
  "/groups/:groupId/meetups/new",
  passport.authenticate("jwt", { session: false }),
  GroupController.createGroupMeetup
);

// @desc   Gets all meetups with groupId
routes.get(
  "/groups/:groupId/meetups",
  //passport.authenticate("jwt", { session: false }),
  GroupController.getGroupMeetups
);

// @desc   Gets all groups
routes.get("/groups", GroupController.getAllGroups);

export default routes;
