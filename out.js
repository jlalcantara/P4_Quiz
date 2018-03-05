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

const log = (msg, color) =>{
    console.log(colorize(msg, color));
};

/**
 * Escribe mensaje de log grande
 */

const biglog = (msg,color)=>{
    log(figlet.textSync(msg, {horizontalLayaout: 'full'}), color);
};

/**
 * Escribe mensaje de error
 *
 */

const errorlog = (emsg) =>{
    console.log(`${colorize("Error", "red")}: ${colorize(colorize(emsg, "red"), "bgYellowBright")}`);
};
exports= module.exports = {
    colorize,
    log,
    biglog,
    errorlog
};