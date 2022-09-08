import mysql from 'mysql';
import dotenv from "dotenv";


dotenv.config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    multipleStatements: true
  });
 
  con.connect(function(err) {
    if (err){
        console.log(process.env.DB_NAME + " connection failed \n ERROR : " + json.stringify(err, undefined, 2));
    }else{

        console.log("Connected to " + process.env.DB_NAME + " mysql database!");
    }
    
  });

  export default con;