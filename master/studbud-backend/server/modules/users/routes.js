import { Router } from "express";
import * as UserController from "./controller";
import passport from "passport";

//import * as UserController from "./controller";

const routes = new Router();

routes.get("/users/test", (req, res) => res.json({ msg: "Users works! " }));

// @desc    Register a new user
routes.post("/users/register", UserController.registerUser);

// @desc    Login an existing user, gen JWT token
routes.post("/users/login", UserController.loginUser);

// @desc    Return current user
// @access  private
routes.get(
  "/users/current",
  passport.authenticate("jwt", { session: false }),
  UserController.currentUser
);

/*routes.post("/users/auth0", UserController.loginWithAuth0);
routes.post("/users/:userId/groups/new", GroupController.createGroupMeetup);
routes.get("/users/:userId/groups", GroupController.getGroupMeetups);*/

export default routes;