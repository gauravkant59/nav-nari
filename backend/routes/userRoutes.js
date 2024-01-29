import express from "express";

import { createUser, createWorker, logoutCurrentUser, loginUser } from "../controllers/userControllers.js";
import { authenticate } from "../middlware/authMiddleWare.js";

const router = express.Router();


router.route("/").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutCurrentUser);


router.route("/worker").post(authenticate,createWorker);



// router.route("/:id").get((req, res)=>{
//   res.send("hello")
// })


export default router;