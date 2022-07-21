const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Connect DB
        this.connnectDB();
        
        //Middlewares
        this.middelwares();

        //Routs App
        this.routes();

    }

   async connnectDB(){

    await dbConnection();

    }

    middelwares(){

        //CORS
        this.app.use(cors());

        //reading and parsing the body
        this.app.use(express.json())

        //Direct Public
        this.app.use(express.static('public'));
    }

    routes(){

        this.app.use(this.usersPath, require('../routes/users.routes'));
        
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;