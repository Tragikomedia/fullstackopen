import express from "express";
import diagnoseService from "../services/diagnosesService";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/ping", (_req, res) => {
  res.send("PONG");
});

router.get("/diagnoses", (_req, res) => {
  const diagnoses = diagnoseService.getDiagnoses();
  res.status(200).json(diagnoses);
});

router.get("/patients", (_req, res) => {
  const patients = patientsService.getPatients();
  res.status(200).json(patients);
});

export default router;
