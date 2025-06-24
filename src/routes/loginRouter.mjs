import express from "express";
import { Router } from "express";
import { loginController } from "../controllers/loginController.mjs";

const router = Router();

router.post("/", loginController);

export default router;
