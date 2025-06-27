import express from "express";
import { Router } from "express";

const router = Router();

router.get("/ping", (req, res) => {
  res.status(200).json({ message: "Pong!" });
});

export default router;
