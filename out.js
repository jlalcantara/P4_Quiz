const chalk = require ('chalk');
const figlet = require('figlet');


/** Dar color a un string
 *
 */

const colorize = (msg, color) =>{
    if  ( typeof color !== "undefined"){
        msg = chalk[color].bold(msg);
    }
    return msg;
};

/**
 * Escribe mensaje de log
 */

const log = (socket, msg, color) =>{
    socket.write(colorize(msg, color) + "\n");
};

/**
 * Escribe mensaje de log grande
 */

const biglog = (socket, msg,color)=>{
    log(socket, figlet.textSync(msg, {horizontalLayaout: 'full'}), color);
};

/**
 * Escribe mensaje de error
 *
 */

const errorlog = (socket, emsg) =>{
    socket.write(`${colorize("Error", "red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")}\n`);
};
exports= module.exports = {
    colorize,
    log,
    biglog,
    errorlog
};