const {log, biglog, errorlog, colorize} = require('./out');
const model = require('./model');


exports.helpCmd = rl =>{
    console.log('Comandos:');
    console.log('  h|help - Muestra esta  ayuda.');
    console.log('   list - Listar quizzes existentes.');
    console.log('   show <id> - Muestra la pregunta y la respuesta el quiz indicado.');
    console.log('   add - Añadir un nuevo quiz interactivamente.');
    console.log('   delete <id> - Borrar el quiz indicado');
    console.log('   edit <id> - Editar el quiz indicado.');
    console.log('   test <id> - Probar el quiz indicado.');
    console.log('   p|play - Jugar a preguntar aleatoriamente todos los quizzes.');
    console.log('   credits - Créditos.');
    console.log('   q|quit - Salir del programa.');
    rl.prompt();


};

exports.listCmd = rl =>{

    model.getAll().forEach((quiz, id)=> {
       log(`[${colorize(id, 'magenta')}]: ${quiz.question}`);
    });
    rl.prompt();

};

exports.showCmd = (rl, id) =>{

    if ( typeof id === "undefined"){
        errorlog(`Falta el parametro id.`);
    }else{
        try{
            const quiz = model.getByIndex(id);
            log(`[${colorize(id,'magenta')}]: ${quiz.question} ${colorize("=>", 'magenta')} ${quiz.answer}`);
        }catch(error){
            errorlog(error.message);
        }
    }

    rl.prompt();


};
exports.testCmd = (rl, id) =>{
    if ( typeof id === "undefined") {
        errorlog(`Falta el parametro id.`);
    }else{
        try{

            const quiz = model.getByIndex(id);

            rl.question(colorize(quiz.question , 'red'), answer =>{
               if(answer.toLowerCase().trim()===quiz.answer.toLowerCase().trim()){
                   log("CORRECTO");
                   biglog("CORRECTA", 'green');
                   rl.prompt();

                }else{
                   log("INCORRECTA");
                   biglog("INCORRECTA" , 'red');
                   rl.prompt();
            }
            });
        }
        catch (error){
            errorlog(error.message);
            rl.prompt();
        }
    }

};
exports.addCmd = rl =>{
    rl.question(colorize('Introduzca una pregunta: ', 'red'), question =>{
        rl.question(colorize('Introduzca la respuesta: ', 'red'), answer=>{
            model.add(question, answer);
            log(` ${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>', 'magenta')} ${answer}`);
            rl.prompt();
    });
    });


};

exports.quitCmd = rl =>{

    rl.close();

};

exports.deleteCmd = (rl, id) =>{
    if ( typeof id === "undefined"){
        errorlog(`Falta el parametro id.`);
    }else{
        try{
            model.deleteByIndex(id);
        }catch(error){
            errorlog(error.message);
        }
    }

    rl.prompt();


};

exports.editCmd = (rl, id) =>{
    if ( typeof id === "undefined"){
        errorlog(`Falta el parametro id.`);
    }else{
        try{
            const quiz = model.getByIndex(id);
            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)}, 0);

            rl.question(colorize('Introduzca una pregunta: ', 'red'), question =>{

                process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)}, 0);

            rl.question(colorize('Introduzca la respuesta: ', 'red'), answer=>{
                model.update(id,question, answer);
            log(` ${colorize('Se ha cambiado el quiz', 'magenta')}: ${question} ${colorize('=>', 'magenta')} ${answer}`);
            rl.prompt();
        });
        });

        }catch(error){
            errorlog(error.message);
            rl.prompt;
        }
    }

};

exports.creditsCmd = rl =>{
    console.log('Autores de la practica');
    console.log('Juan Luis Alcántara Alcaide');
    rl.prompt();

};

exports.playCmd = rl =>{

    let score = 0;

    let toBeResolved = [];
    model.getAll().forEach((quiz, id) => {
        toBeResolved[id]=quiz;
    });

    const playOne = () => {

        if(toBeResolved.length === 0){
            log("No hay nada mas que preguntar");
            log (`Fin del juego. Aciertos ${score}`);
            biglog(`${score}`);
            rl.prompt();
        }else{
            let ranId = Math.floor(Math.random()*toBeResolved.length);
            let quiz = toBeResolved[ranId];
            rl.question(quiz.question, answer =>{

                if(answer.toLowerCase().trim() === quiz.answer.toLowerCase().trim()){

                    log(`CORRECTO - Llevas ${score} aciertos` )
                    score++;
                    biglog(`${score}`);

                    toBeResolved.splice(ranId, 1);
                    playOne();
            }else{
                log(`INCORRECTO - Fin del juego ${score} aciertos` )
                biglog(`${score}`);
                rl.prompt();

            }

            });
        }

    };

    playOne();
};