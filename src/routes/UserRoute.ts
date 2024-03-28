import express from "express";
import { jwtCheck } from "../middleware/auth";
import { createCurrentUser } from "../controllers/UserController";

const router = express.Router();

router.post("/", jwtCheck, createCurrentUser);

export default router;