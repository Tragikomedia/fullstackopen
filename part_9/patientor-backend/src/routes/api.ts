import express from "express";
import diagnoseService from "../services/diagnosesService";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.send("PONG");
});

router.get("/diagnoses", (_req, res) => {
  const diagnoses = diagnoseService.getDiagnoses();
  res.status(200).json(diagnoses);
});

export default router;
