import express from 'express';
const patientRoutes = express.Router();

import { getPatients, getPatient, createPatient, updatePatient, deletePatient } from '../controller/patient.controller.js';



// create user and Auth 
patientRoutes.post("/register", createPatient);

// Get patients 
patientRoutes.get("/", getPatients);
patientRoutes.get("/:id", getPatient);

// update and delete
patientRoutes
    .put("/:id", updatePatient);
patientRoutes
    .delete("/:id", deletePatient);

/*patientRoutes.route('/')
    .get(getPatients)
    .post(createPatient);

patientRoutes.route('/:id')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);
*/

export default patientRoutes;