"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();*/
/*
const connection = mysql.createConnection(keys.database);
  
  connection.connect((err) => {
      if(err) throw err;
      console.log('Base de datos: '+ keys.database.database+' is connected ');
  });
  

const pool = mysql.createPool(keys.database);

pool.getConnection((err, connection) => {
    console.log('entro a GetConnection ');
    if (err) {
        console.log (err);
        return;
    } else{
        connection.release();
             
    }
})

export default connection;

*/
const mysql = require('mysql2');
const { Client } = require('ssh2');
const sshClient = new Client();
const dbServer = {
    connectionLimit: 1000,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: 'https://vps-1869856-x.dattaweb.com:2095/extra_soft/phpMyAdmin',
    user: 'root',
    password: 'bfCzAW3UFwYv',
    database: 'appcarne_app',
    port: 5997
};
const tunnelConfig = {
    host: process.env.DB_SSH_HOST,
    port: 5997,
    username: process.env.DB_SSH_USER,
    password: process.env.DB_SSH_PASSWORD
};
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 3306,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};
const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(forwardConfig.srcHost, forwardConfig.srcPort, forwardConfig.dstHost, forwardConfig.dstPort, (err, stream) => {
            if (err)
                reject(err);
            const updatedDbServer = Object.assign(Object.assign({}, dbServer), { stream });
            const connection = mysql.createConnection(updatedDbServer);
            connection.connect((error) => {
                if (error) {
                    reject(error);
                }
                resolve(connection);
            });
        });
    }).connect(tunnelConfig);
});
exports.default = SSHConnection;
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
