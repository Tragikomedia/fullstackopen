import express from "express";
import diagnoseService from "../services/diagnosesService";
import patientsService from "../services/patientsService";
import { toNewPatient, toNewEntry } from "../utils";

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

router.post("/patients/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const patient = patientsService.addEntry(id, newEntry);
    if (!patient) return res.sendStatus(404);
    return res.status(200).json(patient);
  } catch (error) {
    //eslint-disable-next-line
    return res.status(400).json({ error: error.message });
  }
});

router.get("/patients/:id", (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatient(id);
  if (!patient) return res.sendStatus(404);
  return res.status(200).json(patient);
});

router.post("/patients", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error) {
    //eslint-disable-next-line
    res.status(400).json({ error: error.message });
  }
});

export default router;
