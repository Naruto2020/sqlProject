import database from '../config/mysql.config.js';
import con from "../config/db.js";
import Response from '../domain/response.js';
import logger from '../utils/logger.js';
import QUERY from '../query/patient.query.js';



const HTTPStatus = {
    OK: {code: 200, status: 'OK'},
    CREATED: {code: 201, status: 'CREATED'},
    NO_CONTENT: {code: 204, status: 'NO_CONTENT'},
    BAD_REQUEST: {code: 400, status: 'BAD_REQUEST'},
    NOT_FOUND: {code: 404, status: 'NOT_FOUND'},
    INTERNAL_SERVER_ERROR: {code: 500, status: 'INTERNAL_SERVER_ERROR'},
    
};


export const getPatients = (req, res)=>{
    logger.info(`${req.method} ${req.originalurl}, fetchings patients`);
    con.query(QUERY.SELECT_PATIENTS, (error, results) =>{
        if(!results){
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, `No patients found`));
        }else{
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, `Patients retrieved`, {patients: results}));
        }
    });
};


export const createPatient = (req, res)=>{
    logger.info(`${req.method} ${req.originalurl}, creating  patient`);
    con.query(QUERY.CREATE_PATIENT, Object.values(req.body), (error, results) =>{
        console.log("test : ",Object.values(req.body))
        if(!results){
            logger.error(error.message);
            res.status(HTTPStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HTTPStatus.INTERNAL_SERVER_ERROR.code, HTTPStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
        }else{
            const patient = {id: results.insertedId, ...req.body, created_at: new Date()};
            res.status(HTTPStatus.CREATED.code).send(new Response(HTTPStatus.CREATED.code, HTTPStatus.CREATED.status, `Patient created`, {patient}));
        }
    });
};


export const getPatient = (req, res)=>{
    logger.info(`${req.method} ${req.originalurl}, fetchings patient`);
    con.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) =>{
        if(!results[0]){
            res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found `));
        }else{
            
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, `Patient retrieve`, results[0]));
        }
    });
};


export const updatePatient = (req, res)=>{
    logger.info(`${req.method} ${req.originalurl}, fetchings patient`);
    con.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) =>{
        if(!results[0]){
            res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found `));
        }else{
            logger.info(`${req.method} ${req.originalurl}, updating patient`);
            database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body) ,req.params.id], (error, results) =>{
                if(!error){
                    res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, `Patient retrieve`, results[0]));

                }else{
                    logger.error(error.message);
                    res.status(HTTPStatus.INTERNAL_SERVER_ERROR.code).send(new Response(HTTPStatus.INTERNAL_SERVER_ERROR.code, HTTPStatus.INTERNAL_SERVER_ERROR.status, `Error occured`));
                }
            });

        }
    });
};


export const deletePatient = (req, res)=>{
    logger.info(`${req.method} ${req.originalurl}, deleting patient`);
    con.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) =>{
        
        if(results.affectedRows > 0){
            res.status(HTTPStatus.OK.code).send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, `Patient deleted`, results[0]));
        }else{
            
            res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, `Patient by id ${req.params.id} was not found `));
        }
    });
};

export default HTTPStatus;