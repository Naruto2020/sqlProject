// import dependencies & files 

import  express  from "express";
import ip from 'ip';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Response from './domain/response.js'
import logger from './utils/logger.js';
import HTTPStatus from './controller/patient.controller.js';
import patientRoutes from './routes/patient.route.js';
//import {mysql} from "./Config/db";


dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

const app = express();


const corsOptions = {
  // cors policy from dev or prod 
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions));
app.use(express.json());

// gestions des dossiers 

app.use("/uploads", express.static('client/uploads/profiles'));
app.use("/uploads", express.static('client/uploads/products'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


app.use('api/patients', patientRoutes);
app.get('/', (req, res) => res.send(new Response(HTTPStatus.OK.code, HTTPStatus.OK.status, 'patient API V1.0')));
app.all('*', (req, res) => res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'Route does not exist on the server ')));




// server
//console.log(process.env);
app.listen(PORT, ()=>{
    logger.info(`server running on :${ip.address()} :  ${PORT}`);
});
