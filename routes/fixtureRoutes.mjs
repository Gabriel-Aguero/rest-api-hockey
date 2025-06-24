import express from "express";
import { Router } from "express";
import { getFixturesController } from "../controllers/fixtureController.mjs";

const router = Router();

router.get("/", getFixturesController);

export default router;
