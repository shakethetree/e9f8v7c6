import { Router } from "express";

const routes = new Router();

routes.get("/profiles/test", (req, res) =>
  res.json({ msg: "Profiles works! " })
);

export default routes;
