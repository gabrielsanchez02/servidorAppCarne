"use strict";
/*
const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();

var sshConf = {
  host: 'vps-1869856-x.dattaweb.com',
  port: 5997,
  username: 'root',
  password: 'bfCzAW3UFwYv',
};

var sqlConf = {
    host: 'vps-1869856-x.dattaweb.com',
    user: 'appcarne',
    password: 'D*4eF3o4hW',
    database: 'appcarne_app',
    port: 3306
};

const dbServer = {
    host: 'vps-1869856-x.dattaweb.com:2095',
    user: 'root',
    password: 'bfCzAW3UFwYv',
    database: 'appcarne_app',
    port: 3306
}
const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 5997,
    username: process.env.DB_SSH_USER,
    password: process.env.DB_SSH_PASSWORD
}

const forwardConfig = {
    srcHost: '127.0.0.1', // cualquier dirección válida
    srcPort: 3306, // cualquier puerto válido
    dstHost: sqlConf.host, // base de datos de destino
    dstPort: sqlConf.port // puerto de destino
};

const database = new Promise((resolve, reject) => {
    var pool ;
    sshClient.on('ready', () => {
        sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err: any, stream: any) => {
             if (err) reject(err);
             const updatedDbServer = {
                 ...sqlConf,
                 stream
            };
            const connection =  mysql.createConnection(updatedDbServer);
            connection.connect((error: any) => {
            if (error) {
                reject(error);
            }
            console.log('Base de datos: '+updatedDbServer.database+' is connected ');
           // pool = connection.createPool(updatedDbServer);

            resolve(connection);
            
            });
        });
    }).connect(sshConf);
    
});



module.exports = database;*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();*/
const mysql_1 = __importDefault(require("mysql"));
const keys_1 = __importDefault(require("./keys"));
const connection = mysql_1.default.createPool(keys_1.default.database);
connection.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        connection.release();
        console.log("Base de datos: " + keys_1.default.database.database + " is connected ");
    }
});
exports.default = connection;
/*

var http = require("http");
var mysql2 = require('mysql2');
var SSH2Client = require('ssh2').Client;

var sshConf = {
  host: 'vps-1869856-x.dattaweb.com',
  port: 5997,
  username: 'root',
  password: 'bfCzAW3UFwYv',
};

var sqlConf = {
    host: 'vps-1869856-x.dattaweb.com',
    user: 'appcarne',
    password: 'D*4eF3o4hW',
    database: 'appcarne_app',
    port: 3306
};

var ssh = new SSH2Client();
ssh.on('ready', function() {
  ssh.forwardOut(
    // source IP the connection would have came from. this can be anything since we
    // are connecting in-process
    '127.0.0.1',
    // source port. again this can be randomized and technically should be unique
    24000,
    // destination IP on the remote server
    '127.0.0.1',
    // destination port at the destination IP
    3306,
    function(err: any, stream: any) {
      // you will probably want to handle this better,
      // in case the tunnel couldn't be created due to server restrictions
      if (err) throw err;

      // if you use `sqlConf` elsewhere, be aware that the following will
      // mutate that object by adding the stream object for simplification purposes
    //  sqlConf.stream = stream;
      var db = mysql2.createConnection(sqlConf);

      // now use `db` to make your queries
    }
  );
});
ssh.connect(sshConf);


/*
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'vps-1869856-x.dattaweb.com',
    user: 'root',
    password: 'bfCzAW3UFwYv ',
    database: 'appcarne_app',
    port: 5997
});
connection.connect(function(error: any){
   if(error){
      throw error;
   }else{
    
      console.log('Base de datos is connected');
   }
});
connection.end();*/
